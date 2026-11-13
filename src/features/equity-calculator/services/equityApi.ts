import { api } from '@/lib/axios';
import type { EquityRequest, EquityResult } from '../types/equity.types';

export const equityApi = {
  calculate: async (request: EquityRequest, signal?: AbortSignal): Promise<EquityResult> => {
    const { data } = await api.post<EquityResult>('/v1/equity', request, { signal });
    return data;
  },
};
