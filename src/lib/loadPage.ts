import 'server-only';

export type PageResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export const loadPage = async <T>(
  fetcher: () => Promise<T>
): Promise<PageResult<T>> => {
  try {
    return { ok: true, data: await fetcher() };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Something went wrong',
    };
  }
};
