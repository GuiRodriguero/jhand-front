import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { SessionTypeTabs } from '@/components/session-type-tabs/SessionTypeTabs';
import { JHandPagination } from '@/components/ui/pagination/JHandPagination';
import { sessionTypeFromSearchParams, type SessionType } from '@/lib/sessionType';
import { HandResultFilters } from '../components/HandResultFilters';
import { HandResultTable } from '../components/HandResultTable';
import { useHandsQuery } from '../hooks/useHandsQuery';
import { EMPTY_HAND_RESULT_FILTERS, type HandResultFiltersValue } from '../types/handResult.types';
import { filtersFromSearchParams, pageFromSearchParams, toSearchParams } from '../utils/handResultSearchParams';

const PAGE_SIZE = 20;

export function HandResultView() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionType = sessionTypeFromSearchParams(searchParams);
  const appliedFilters = filtersFromSearchParams(searchParams);
  const page = pageFromSearchParams(searchParams);
  const [draftFilters, setDraftFilters] = useState<HandResultFiltersValue>(appliedFilters);
  const appliedKey = toSearchParams(appliedFilters, 0, sessionType).toString();
  const [prevAppliedKey, setPrevAppliedKey] = useState(appliedKey);

  if (appliedKey !== prevAppliedKey) {
    setPrevAppliedKey(appliedKey);
    setDraftFilters(appliedFilters);
  }

  const { data, isPending, isError, isPlaceholderData } = useHandsQuery({
    page,
    size: PAGE_SIZE,
    sessionType,
    filters: appliedFilters,
  });

  const handleSessionTypeChange = (nextType: SessionType) => {
    setSearchParams(toSearchParams(appliedFilters, 0, nextType));
  };

  const handleDraftChange = (patch: Partial<HandResultFiltersValue>) => {
    setDraftFilters((prev) => ({ ...prev, ...patch }));
  };

  const handleApplyFilters = () => {
    setSearchParams(toSearchParams(draftFilters, 0, sessionType));
  };

  const handleClearFilters = () => {
    setDraftFilters(EMPTY_HAND_RESULT_FILTERS);
    setSearchParams(toSearchParams(EMPTY_HAND_RESULT_FILTERS, 0, sessionType));
  };

  const handlePageChange = (nextPage: number) => {
    setSearchParams(toSearchParams(appliedFilters, nextPage, sessionType));
  };

  return (
    <div className="flex flex-col gap-6 p-8 w-full h-full">
      <header className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground-strong">{t('sidebar.hands')}</h1>
        <SessionTypeTabs value={sessionType} onChange={handleSessionTypeChange} />
      </header>

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

      <JHandPagination
        page={data?.number ?? page}
        totalPages={data?.totalPages ?? 0}
        onPageChange={handlePageChange}
        isLoading={isPlaceholderData}
      />
    </div>
  );
}
