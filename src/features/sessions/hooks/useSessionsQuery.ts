import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import type { SessionType } from '@/lib/sessionType';
import { sessionsApi } from '../services/sessionsApi';

interface UseSessionsQueryParams {
  readonly page: number;
  readonly size: number;
  readonly type: SessionType;
}

export function useSessionsQuery({ page, size, type }: UseSessionsQueryParams) {
  return useQuery({
    queryKey: queryKeys.sessions.list({ page, size, type }),
    queryFn: ({ signal }) => sessionsApi.findAll({ page, size, type, signal }),
    placeholderData: keepPreviousData,
  });
}
