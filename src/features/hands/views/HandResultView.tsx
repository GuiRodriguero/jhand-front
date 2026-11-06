import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HandResultFilters } from '../components/HandResultFilters';
import { HandResultPagination } from '../components/HandResultPagination';
import { HandResultTable } from '../components/HandResultTable';
import { useHandsQuery } from '../hooks/useHandsQuery';
import { EMPTY_HAND_RESULT_FILTERS, type HandResultFiltersValue } from '../types/handResult.types';
import { filtersFromSearchParams, pageFromSearchParams, toSearchParams } from '../utils/handResultSearchParams';

const PAGE_SIZE = 20;

export function HandResultView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const appliedFilters = filtersFromSearchParams(searchParams);
  const page = pageFromSearchParams(searchParams);
  const [draftFilters, setDraftFilters] = useState<HandResultFiltersValue>(appliedFilters);
  const appliedKey = toSearchParams(appliedFilters, 0).toString();
  const [prevAppliedKey, setPrevAppliedKey] = useState(appliedKey);

  if (appliedKey !== prevAppliedKey) {
    setPrevAppliedKey(appliedKey);
    setDraftFilters(appliedFilters);
  }

  const { data, isPending, isError, isPlaceholderData } = useHandsQuery({
    page,
    size: PAGE_SIZE,
    filters: appliedFilters,
  });

  const handleDraftChange = (patch: Partial<HandResultFiltersValue>) => {
    setDraftFilters((prev) => ({ ...prev, ...patch }));
  };

  const handleApplyFilters = () => {
    setSearchParams(toSearchParams(draftFilters, 0));
  };

  const handleClearFilters = () => {
    setDraftFilters(EMPTY_HAND_RESULT_FILTERS);
    setSearchParams(new URLSearchParams());
  };

  const handlePageChange = (nextPage: number) => {
    setSearchParams(toSearchParams(appliedFilters, nextPage));
  };

  return (
    <div className="flex flex-col gap-6 p-8 w-full h-full">
      <HandResultFilters
        value={draftFilters}
        onChange={handleDraftChange}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      <div className="flex-1 min-h-0">
        <HandResultTable
          hands={data?.content ?? []}
          isLoading={isPending}
          isRefreshing={isPlaceholderData}
          isError={isError}
        />
      </div>

      <HandResultPagination
        page={data?.number ?? page}
        totalPages={data?.totalPages ?? 0}
        onPageChange={handlePageChange}
        isLoading={isPlaceholderData}
      />
    </div>
  );
}
