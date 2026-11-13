import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import type { SessionType } from '@/lib/sessionType';
import { handsApi } from '../services/handsApi';
import type { HandResultFiltersValue } from '../types/handResult.types';

interface UseHandsQueryParams {
  readonly page: number;
  readonly size: number;
  readonly sessionType: SessionType;
  readonly filters: HandResultFiltersValue;
}

export function useHandsQuery({ page, size, sessionType, filters }: UseHandsQueryParams) {
  return useQuery({
    queryKey: queryKeys.hands.list({ page, size, sessionType, filters }),
    queryFn: ({ signal }) => handsApi.findAll({ page, size, sessionType, filters, signal }),
    placeholderData: keepPreviousData,
  });
}
