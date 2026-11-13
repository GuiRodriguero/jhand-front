import { api } from '@/lib/axios';
import type { Page } from '@/lib/page.types';
import type { SessionType } from '@/lib/sessionType';
import type { SessionHandStats } from '../types/sessionHandStats.types';
import type { PokerSession } from '../types/session.types';

export interface FindAllSessionsParams {
  readonly page: number;
  readonly size: number;
  readonly type: SessionType;
  readonly signal?: AbortSignal;
}

function sessionPath(sessionId: string) {
  return `/v1/sessions/${encodeURIComponent(sessionId)}`;
}

export const sessionsApi = {
  findAll: async ({ page, size, type, signal }: FindAllSessionsParams): Promise<Page<PokerSession>> => {
    const { data } = await api.get<Page<PokerSession>>('/v1/sessions', { params: { page, size, type }, signal });
    return data;
  },

  findById: async (sessionId: string, signal?: AbortSignal): Promise<PokerSession> => {
    const { data } = await api.get<PokerSession>(sessionPath(sessionId), { signal });
    return data;
  },

  findHandStats: async (sessionId: string, signal?: AbortSignal): Promise<SessionHandStats> => {
    const { data } = await api.get<SessionHandStats>(`${sessionPath(sessionId)}/hand-stats`, { signal });
    return data;
  },
};
