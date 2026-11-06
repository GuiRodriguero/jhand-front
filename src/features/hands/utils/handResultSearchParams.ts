import { EMPTY_HAND_RESULT_FILTERS, type HandResultFiltersValue } from '../types/handResult.types';

const FILTER_KEYS = Object.keys(EMPTY_HAND_RESULT_FILTERS) as (keyof HandResultFiltersValue)[];

const PAGE_PARAM = 'page';

export function filtersFromSearchParams(searchParams: URLSearchParams): HandResultFiltersValue {
  const filters: Record<keyof HandResultFiltersValue, string> = { ...EMPTY_HAND_RESULT_FILTERS };
  for (const key of FILTER_KEYS) {
    filters[key] = searchParams.get(key) ?? '';
  }
  return filters;
}

export function pageFromSearchParams(searchParams: URLSearchParams): number {
  const page = Number(searchParams.get(PAGE_PARAM));
  return Number.isInteger(page) && page > 1 ? page - 1 : 0;
}

export function toSearchParams(filters: HandResultFiltersValue, page: number): URLSearchParams {
  const searchParams = new URLSearchParams();
  for (const key of FILTER_KEYS) {
    const value = filters[key].trim();
    if (value) searchParams.set(key, value);
  }
  if (page > 0) searchParams.set(PAGE_PARAM, String(page + 1));
  return searchParams;
}
