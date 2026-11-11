import { SESSION_TYPE_PARAM, type SessionType } from '@/lib/sessionType';

const PAGE_PARAM = 'page';

export function pageFromSearchParams(searchParams: URLSearchParams): number {
  const page = Number(searchParams.get(PAGE_PARAM));
  return Number.isInteger(page) && page > 1 ? page - 1 : 0;
}

export function toSearchParams(type: SessionType, page: number): URLSearchParams {
  const searchParams = new URLSearchParams();
  searchParams.set(SESSION_TYPE_PARAM, type);
  if (page > 0) searchParams.set(PAGE_PARAM, String(page + 1));
  return searchParams;
}
