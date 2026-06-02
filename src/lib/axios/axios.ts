import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const tokenService = {
  getAccessToken: () => localStorage.getItem("accessToken"),
  setAccessToken: (token: string) => {
    localStorage.setItem("accessToken", token);
  },
  clearAccessToken: () => {
    localStorage.removeItem("accessToken");
  },
};

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * Validate ENV
 */
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is missing");
}

/**
 * Axios Instance
 */
export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Refresh state
 */
let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

/**
 * Process queued requests
 */
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Request Interceptor
 */
Axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (process.env.NODE_ENV === "development") {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Response Interceptor
 */
Axios.interceptors.response.use(
  (response) => {
    // debugger;
    /**
     * Return only API data
     */
    if (response?.data?.data?.accessToken) {
      tokenService.setAccessToken(response.data.data.accessToken);
    }
    return response.data;
  },

  async (
    error: AxiosError<{
      errorType?: string;
      message?: string;
      multipleErrors?: unknown[];
      statusCode?: number;
      success?: boolean;
    }>,
  ) => {
    // debugger;
    const originalRequest = error.config as RetryAxiosRequestConfig;

    /**
     * Handle 401
     */
    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      error.response.data?.message !== "Invalid password"
    ) {
      originalRequest._retry = true;

      /**
       * Queue requests while refreshing
       */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }

              resolve(Axios(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        /**
         * Refresh token request
         */
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          {
            withCredentials: true,
          },
        );

        const newAccessToken = response.data.data.accessToken;

        /**
         * Save token
         */
        tokenService.setAccessToken(newAccessToken);

        /**
         * Retry queued requests
         */
        processQueue(null, newAccessToken);

        /**
         * Retry original request
         */
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return Axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        tokenService.clearAccessToken();

        /**
         * Redirect to login
         */
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject({
          success: false,
          message: "Session expired",
        });
      } finally {
        isRefreshing = false;
      }
    }

    /**
     * Timeout
     */
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        success: false,
        message: "Request timeout",
      });
    }

    /**
     * Network error
     */
    if (!error.response) {
      return Promise.reject({
        success: false,
        message: "Network error",
      });
    }

    /**
     * Backend error response
     */
    return Promise.reject({
      success: false,
      status: error.response.status,
      message: error.response.data?.message || "Something went wrong",
      errors: error.response.data?.multipleErrors || [],
    });
  },
);
