import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

/**
 * ----------------------------------------------------------------
 * Token Service
 * ----------------------------------------------------------------
 */
export const tokenService = {
  getAccessToken: () => {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem("accessToken");
  },

  setAccessToken: (token: string) => {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem("accessToken", token);
  },

  clearAccessToken: () => {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.removeItem("accessToken");
  },
};

/**
 * ----------------------------------------------------------------
 * Logout Helper
 * ----------------------------------------------------------------
 */
export const logoutUser = () => {
  tokenService.clearAccessToken();
  if (typeof window !== "undefined") {
    window.location.replace("/login");
  }
};

/**
 * ----------------------------------------------------------------
 * Types
 * ----------------------------------------------------------------
 */
interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * ----------------------------------------------------------------
 * ENV Validation
 * ----------------------------------------------------------------
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is missing");
}

/**
 * ----------------------------------------------------------------
 * Axios Instance
 * ----------------------------------------------------------------
 */
export const Axios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: process.env.NODE_ENV === "development" ? 60000 : 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * ----------------------------------------------------------------
 * Refresh State
 * ----------------------------------------------------------------
 */
let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

/**
 * ----------------------------------------------------------------
 * Process Queue
 * ----------------------------------------------------------------
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
 * ----------------------------------------------------------------
 * Public Routes
 * ----------------------------------------------------------------
 */
const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/refresh-token",
];

/**
 * ----------------------------------------------------------------
 * Request Interceptor
 * ----------------------------------------------------------------
 */
Axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = tokenService.getAccessToken();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (process.env.NODE_ENV === "development") {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * ----------------------------------------------------------------
 * Response Interceptor
 * ----------------------------------------------------------------
 */
Axios.interceptors.response.use(
  (response) => {
    /**
     * Store access token automatically
     */
    if (response?.data?.data?.accessToken) {
      tokenService.setAccessToken(response.data.data.accessToken);
    }
    /**
     * Return only response.data
     */
    return response.data;
  },

  async (
    error: AxiosError<{
      success?: boolean;
      statusCode?: number;
      message?: string;
      multipleErrors?: unknown[];
    }>,
  ) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    /**
     * ------------------------------------------------------------
     * Timeout
     * ------------------------------------------------------------
     */
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        success: false,
        message: "Request timeout",
      });
    }
    /**
     * ------------------------------------------------------------
     * Network Error
     * ------------------------------------------------------------
     */
    if (!error.response) {
      return Promise.reject({
        success: false,
        message: "Network error",
      });
    }

    /**
     * ------------------------------------------------------------
     * Skip Refresh For Public APIs
     * ------------------------------------------------------------
     */
    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      originalRequest?.url?.includes(route),
    );

    if (isPublicRoute) {
      return Promise.reject({
        success: false,
        statusCode: error.response.status,
        message: error.response.data?.message || "Something went wrong",
        errors: error.response.data?.multipleErrors || [],
      });
    }

    /**
     * ------------------------------------------------------------
     * Handle 401
     * ------------------------------------------------------------
     */
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      /**
       * Queue requests while refresh in progress
       */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }

              resolve(Axios.request(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        /**
         * Refresh Access Token
         *
         * IMPORTANT:
         * Use raw axios.
         * Do NOT use Axios instance.
         */
        const refreshResponse = await axios.get(
          `${API_URL}/auth/refresh-token`,
          {
            withCredentials: true,
          },
        );

        const newAccessToken = refreshResponse.data.data.accessToken;

        /**
         * Save Token
         */
        tokenService.setAccessToken(newAccessToken);

        /**
         * Retry queued requests
         */
        processQueue(null, newAccessToken);

        /**
         * Retry current request
         */
        if (originalRequest) {
          originalRequest.headers = axios.AxiosHeaders.from({
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          });
        }
        return Axios.request(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        logoutUser();
        return Promise.reject({
          success: false,
          statusCode: 401,
          message: "Session expired. Please login again.",
        });
      } finally {
        isRefreshing = false;
      }
    }

    /**
     * ------------------------------------------------------------
     * Backend Error
     * ------------------------------------------------------------
     */
    return Promise.reject({
      success: false,
      statusCode: error.response.status,
      message: error.response.data?.message || "Something went wrong",
      errors: error.response.data?.multipleErrors || [],
    });
  },
);
