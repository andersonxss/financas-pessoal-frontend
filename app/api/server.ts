import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import {
  captureSetCookies,
  getRequestCookieHeader,
  refreshOnce,
} from '@/auth/request-context.server';
import { canAttemptSessionRefresh } from './refresh-policy';

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const baseURL = process.env.VITE_API_BASE_URL || 'http://localhost:3333';
const serverApi = axios.create({ baseURL, withCredentials: true });

serverApi.interceptors.request.use((config) => {
  const cookies = getRequestCookieHeader();
  if (cookies) config.headers.set('Cookie', cookies);
  return config;
});

serverApi.interceptors.response.use(
  (response) => {
    captureSetCookies(response.headers['set-cookie']);
    return response;
  },
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;
    if (
      error.response?.status !== 401 ||
      !original ||
      original._retry ||
      !canAttemptSessionRefresh(original.url)
    ) {
      return Promise.reject(error);
    }
    original._retry = true;
    await refreshOnce(async () => {
      const refresh = await axios.post(`${baseURL}/auth/refresh`, {}, {
        headers: { Cookie: getRequestCookieHeader() },
        withCredentials: true,
      });
      captureSetCookies(refresh.headers['set-cookie']);
    });
    original.headers.set('Cookie', getRequestCookieHeader());
    return serverApi(original);
  },
);

export default serverApi;
