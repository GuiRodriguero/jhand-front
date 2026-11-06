import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { handsApi } from '../services/handsApi';
import type { HandResultFiltersValue } from '../types/handResult.types';

interface UseHandsQueryParams {
  readonly page: number;
  readonly size: number;
  readonly filters: HandResultFiltersValue;
}

export function useHandsQuery({ page, size, filters }: UseHandsQueryParams) {
  return useQuery({
    queryKey: queryKeys.hands.list({ page, size, filters }),
    queryFn: ({ signal }) => handsApi.findAll({ page, size, filters, signal }),
    placeholderData: keepPreviousData,
  });
}
