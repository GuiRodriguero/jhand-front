import { keepPreviousData, skipToken, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { equityApi } from '../services/equityApi';
import type { EquityRequest } from '../types/equity.types';

export function useEquityQuery(request: EquityRequest | null) {
  return useQuery({
    queryKey: queryKeys.equity.calculate(request ?? {}),
    queryFn: request ? ({ signal }) => equityApi.calculate(request, signal) : skipToken,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });
}
