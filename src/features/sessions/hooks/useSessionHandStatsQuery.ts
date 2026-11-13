import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { sessionsApi } from '../services/sessionsApi';

export function useSessionHandStatsQuery(sessionId: string) {
  return useQuery({
    queryKey: queryKeys.sessions.handStats(sessionId),
    queryFn: ({ signal }) => sessionsApi.findHandStats(sessionId, signal),
  });
}
