import { Axios } from "./axios";
import { AxiosResponse } from "axios";

interface ApiConfig {
  URL: string;
  METHOD: string;
}

export const invokeApi = async <T>(
  config: ApiConfig,
  payload?: unknown,
): Promise<AxiosResponse<T>> => {
  debugger;
  if (config.METHOD === "GET") {
    return Axios({
      method: config.METHOD,
      url: config.URL,
      params: payload || null,
    });
  } else if (config.METHOD === "POST") {
    return Axios({
      method: config.METHOD,
      url: config.URL,
      data: payload || null,
    });
  } else if (config.METHOD === "PUT") {
    return Axios({
      method: config.METHOD,
      url: config.URL,
      data: payload || null,
    });
  } else if (config.METHOD === "DELETE") {
    return Axios({
      method: config.METHOD,
      url: config.URL,
      data: payload || null,
    });
  } else if (config.METHOD === "PATCH") {
    return Axios({
      method: config.METHOD,
      url: config.URL,
      data: payload || null,
    });
  } else {
    throw new Error(`Unsupported HTTP method: ${config.METHOD}`);
  }
};
