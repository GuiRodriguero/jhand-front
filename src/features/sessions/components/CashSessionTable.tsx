import { useTranslation } from 'react-i18next';
import { JHandTable } from '@/components/ui/table/JHandTable';
import { cn } from '@/lib/cn';
import type { CashSession } from '../types/session.types';
import { formatSessionMoney, formatSessionProfit } from '../utils/sessionTableUtils';
import { SessionTableRow } from './SessionTableRow';

interface CashSessionTableProps {
  readonly sessions: readonly CashSession[];
  readonly isLoading: boolean;
  readonly isRefreshing?: boolean;
  readonly isError: boolean;
}

export function CashSessionTable({ sessions, isLoading, isRefreshing, isError }: CashSessionTableProps) {
  const { t } = useTranslation();

  return (
    <JHandTable
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      isError={isError}
      isEmpty={sessions.length === 0}
      header={
        <>
          <th scope="col" className="p-4 font-medium">
            {t('sessions.table.sessionId')}
          </th>
          <th scope="col" className="p-4 font-medium">
            {t('sessions.table.startTime')}
          </th>
          <th scope="col" className="p-4 font-medium text-right">
            {t('sessions.table.handCount')}
          </th>
          <th scope="col" className="p-4 font-medium text-right">
            {t('sessions.table.bigBlind')}
          </th>
          <th scope="col" className="p-4 font-medium text-right">
            {t('sessions.table.netProfit')}
          </th>
        </>
      }
    >
      {sessions.map((session) => (
        <SessionTableRow key={session.sessionId} sessionId={session.sessionId}>
          <td className="p-4">{session.startTime ? new Date(session.startTime).toLocaleString() : '-'}</td>
          <td className="p-4 text-right tabular-nums">{session.handCount ?? '-'}</td>
          <td className="p-4 text-right tabular-nums">{formatSessionMoney(session.bigBlind, session)}</td>
          <td
            className={cn(
              'p-4 text-right font-bold tabular-nums',
              (session.netProfit ?? 0) > 0 && 'text-success-content',
              (session.netProfit ?? 0) < 0 && 'text-error-content',
            )}
          >
            {formatSessionProfit(session.netProfit, session)}
          </td>
        </SessionTableRow>
      ))}
    </JHandTable>
  );
}
