import { api } from '@/lib/axios';
import type { Page } from '@/lib/page.types';
import type { SessionType } from '@/lib/sessionType';
import type { HandResult, HandResultFiltersValue } from '../types/handResult.types';

export interface FindAllHandsParams {
  readonly page: number;
  readonly size: number;
  readonly sessionType: SessionType;
  readonly filters: HandResultFiltersValue;
  readonly signal?: AbortSignal;
}

export const handsApi = {
  findAll: async ({ page, size, sessionType, filters, signal }: FindAllHandsParams): Promise<Page<HandResult>> => {
    const params: Record<string, string | number> = { page, size, sessionType };

    const entries = Object.entries(filters) as [keyof HandResultFiltersValue, string][];
    for (const [key, value] of entries) {
      const trimmed = value.trim();
      if (trimmed) params[key] = trimmed;
    }

    const { data } = await api.get<Page<HandResult>>('/v1/hands', { params, signal });
    return data;
  },
};
