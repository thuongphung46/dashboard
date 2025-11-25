/** @format */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Create an axios instance with sane defaults
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// Request interceptor: attach auth token if present
api.interceptors.request.use(
  (config: any) => {
    try {
      const token = window.localStorage.getItem("authToken");
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore (non-browser or sandboxed)
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response interceptor: unwrap data and handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    // you can centralize error handling here (toast, logging, redirect on 401, etc.)
    const status = error?.response?.status;
    if (status === 401) {
      // optional: clear auth and redirect to login
      try {
        window.localStorage.removeItem("authToken");
      } catch (e) {}
    }
    return Promise.reject(error);
  }
);

// Helper wrappers with typed responses
export async function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  const res = await api.request<T>(config);
  return res.data as T;
}

export async function get<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.get<T>(url, config);
  return res.data as T;
}

export async function post<T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.post<T>(url, data, config);
  return res.data as T;
}

export async function put<T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.put<T>(url, data, config);
  return res.data as T;
}

export async function del<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.delete<T>(url, config);
  return res.data as T;
}

export default api;
