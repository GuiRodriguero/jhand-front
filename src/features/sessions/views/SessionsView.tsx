import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { SessionTypeTabs } from '@/components/session-type-tabs/SessionTypeTabs';
import { JHandPagination } from '@/components/ui/pagination/JHandPagination';
import { sessionTypeFromSearchParams, type SessionType } from '@/lib/sessionType';
import { SessionTable } from '../components/SessionTable';
import { useSessionsQuery } from '../hooks/useSessionsQuery';
import { pageFromSearchParams, toSearchParams } from '../utils/sessionSearchParams';

const PAGE_SIZE = 20;

export function SessionsView() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = sessionTypeFromSearchParams(searchParams);
  const page = pageFromSearchParams(searchParams);

  const { data, isPending, isError, isPlaceholderData } = useSessionsQuery({ page, size: PAGE_SIZE, type });

  const handleTypeChange = (nextType: SessionType) => {
    setSearchParams(toSearchParams(nextType, 0));
  };

  const handlePageChange = (nextPage: number) => {
    setSearchParams(toSearchParams(type, nextPage));
  };

  return (
    <div className="flex flex-col gap-6 p-8 w-full h-full">
      <header className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground-strong">{t('sessions.title')}</h1>
        <SessionTypeTabs value={type} onChange={handleTypeChange} />
      </header>

      <div className="flex-1 min-h-0">
        <SessionTable
          sessions={data?.content ?? []}
          sessionType={type}
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
