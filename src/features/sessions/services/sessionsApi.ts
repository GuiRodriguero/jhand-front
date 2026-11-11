import { api } from '@/lib/axios';
import type { Page } from '@/lib/page.types';
import type { SessionType } from '@/lib/sessionType';
import type { PokerSession } from '../types/session.types';

export interface FindAllSessionsParams {
  readonly page: number;
  readonly size: number;
  readonly type: SessionType;
  readonly signal?: AbortSignal;
}

export const sessionsApi = {
  findAll: async ({ page, size, type, signal }: FindAllSessionsParams): Promise<Page<PokerSession>> => {
    const { data } = await api.get<Page<PokerSession>>('/v1/sessions', { params: { page, size, type }, signal });
    return data;
  },
};
