import { AsyncLocalStorage } from 'node:async_hooks';

interface RequestStore {
  cookieHeader: string;
  setCookies: string[];
  refreshPromise?: Promise<void>;
}

export async function refreshOnce(callback: () => Promise<void>): Promise<void> {
  const store = storage.getStore();
  if (!store) return callback();
  if (!store.refreshPromise) {
    store.refreshPromise = callback().finally(() => {
      store.refreshPromise = undefined;
    });
  }
  return store.refreshPromise;
}

const storage = new AsyncLocalStorage<RequestStore>();

export async function withRequestContext<T>(request: Request, callback: () => Promise<T>): Promise<T> {
  return storage.run(
    { cookieHeader: request.headers.get('cookie') ?? '', setCookies: [] },
    callback,
  );
}

export function getRequestCookieHeader(): string {
  return storage.getStore()?.cookieHeader ?? '';
}

export function captureSetCookies(cookies: string[] | string | undefined): void {
  if (!cookies) return;
  const store = storage.getStore();
  if (!store) return;
  const values = Array.isArray(cookies) ? cookies : [cookies];
  for (const cookie of values) {
    store.setCookies.push(cookie);
    const pair = cookie.split(';', 1)[0];
    const name = pair.split('=', 1)[0];
    const current = store.cookieHeader
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .filter((part) => !part.startsWith(`${name}=`));
    current.push(pair);
    store.cookieHeader = current.join('; ');
  }
}

export function appendCapturedCookies(response: Response): Response {
  const store = storage.getStore();
  for (const cookie of store?.setCookies ?? []) response.headers.append('Set-Cookie', cookie);
  return response;
}
