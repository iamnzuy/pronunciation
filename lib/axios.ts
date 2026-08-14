import axios from "axios";
import { getAuthToken } from "./auth-token";
import { getOrCreateDeviceId } from "./use-device-hook";

export { getAuthToken, removeAuthToken, setAuthToken } from "./auth-token";

// axios for API CMS
export const AxiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_CMS,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  },
});

AxiosClient.interceptors.request.use(async (config: any) => {
  const token = await getAuthToken();
  const deviceId = await getOrCreateDeviceId();

  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (deviceId) config.headers["X-Device-Id"] = deviceId;

  return config;
});

// axios for API Go
export const AxiosAPI = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosAPI.interceptors.request.use(async (config: any) => {
  const token = await getAuthToken();
  const deviceId = await getOrCreateDeviceId();

  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (deviceId) config.headers["X-Device-Id"] = deviceId;

  return config;
});

export const fetcherClient = (url: any, params?: any) => {
  // Một số chỗ dùng SWR key dạng [path, queryParams]
  if (Array.isArray(url) && url.length >= 1) {
    return AxiosClient.get(url[0], { params: url[1] });
  }

  if (typeof url !== "string" || !url) {
    return Promise.reject(new Error("fetcherClient: url phải là chuỗi không rỗng"));
  }

  if (url.indexOf("/v1/") > -1 || url.indexOf("/systems/") > -1) {
    return AxiosAPI.get(url, params != null ? { params } : undefined);
  }
  return AxiosClient.get(url, params != null ? { params } : undefined);
};

export const optionsFetch = { fetcher: fetcherClient };
export default AxiosClient;
