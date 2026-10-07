import 'server-only';
import axios from 'axios';

/**
 * Server-side API base URL.
 * Override with `API_BASE_URL` (e.g. http://localhost:5001/api).
 */
const API_BASE_URL =
  process.env.API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

type ApiEnvelope<T> = {
  data: T;
};

const messageFromBody = (body: unknown): string | undefined => {
  if (!body || typeof body !== 'object') {
    return typeof body === 'string' ? body : undefined;
  }

  const record = body as {
    message?: unknown;
    error?: unknown;
  };

  if (typeof record.message === 'string') return record.message;

  if (typeof record.error === 'string') return record.error;

  if (record.error && typeof record.error === 'object') {
    const nested = (record.error as { message?: unknown }).message;
    if (typeof nested === 'string') return nested;
  }

  return undefined;
};

export const get = async <T>(path: string): Promise<T> => {
  try {
    const { data } = await api.get<ApiEnvelope<T>>(path);
    return data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(messageFromBody(err.response?.data) || err.message);
    }

    throw err instanceof Error ? err : new Error('Request failed');
  }
};
