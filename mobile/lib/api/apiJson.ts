import { env } from '@/lib/env';

import type { ApiErrorBody, ApiJsonOptions } from './apiJson.types';

export async function apiJson<T>({
  accessToken,
  body,
  method = 'GET',
  path,
}: ApiJsonOptions): Promise<T> {
  const base = env.apiBase.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${base}${normalizedPath}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  const response = await fetch(url, {
    body: body !== undefined ? JSON.stringify(body) : undefined,
    headers,
    method,
  });
  const text = await response.text();
  const parsed = text.length > 0 ? (JSON.parse(text) as unknown) : null;
  if (!response.ok) {
    const err = parsed as ApiErrorBody | null;
    throw new Error(err?.error ?? response.statusText);
  }
  return parsed as T;
}
