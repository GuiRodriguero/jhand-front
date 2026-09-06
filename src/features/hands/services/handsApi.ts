import { api } from '../../../lib/axios';
import type { HandResult, HandResultFiltersValue, Page } from '../types/handResult.types';

export const handsApi = {
  findAll: async (page = 0, size = 20, filters?: HandResultFiltersValue): Promise<Page<HandResult>> => {
    const params: Record<string, unknown> = { page, size };

    if (filters?.handId?.trim()) {
      params.handId = filters.handId.trim();
    }

    if (filters?.sessionId?.trim()) {
      params.sessionId = filters.sessionId.trim();
    }

    if (filters?.heroCards?.trim()) {
      params.heroCards = filters.heroCards.trim();
    }

    if (filters?.handRank?.trim()) {
      params.handRank = filters.handRank.trim();
    }

    const { data } = await api.get('/v1/hands', { params });
    return data;
  },
};
