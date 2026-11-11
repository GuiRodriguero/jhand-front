import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { JHandCard } from '@/components/ui/card/JHandCard';
import { cn } from '@/lib/cn';
import type { PokerSession } from '../types/session.types';
import { formatSessionProfit } from '../utils/sessionTableUtils';

interface SessionTableProps {
  readonly sessions: readonly PokerSession[];
  readonly isLoading: boolean;
  readonly isRefreshing?: boolean;
  readonly isError: boolean;
}

export function SessionTable({ sessions, isLoading, isRefreshing = false, isError }: SessionTableProps) {
  const { t } = useTranslation();

  return (
    <JHandCard className="h-full overflow-hidden custom-scrollbar">
      <div className="overflow-auto flex-1">
        <table
          className={cn('w-full text-left border-collapse transition-opacity', isRefreshing && 'opacity-50')}
          aria-busy={isLoading || isRefreshing}
        >
          <thead className="sticky top-0 bg-surface border-b border-border z-10">
            <tr className="text-xs uppercase tracking-wider">
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
                {t('sessions.table.netProfit')}
              </th>
            </tr>
          </thead>
          <tbody className="text-sm whitespace-nowrap">
            {sessions.map((session) => (
              <tr
                key={session.sessionId}
                className="border-b border-border-subtle hover:bg-surface-light/50 transition-colors"
              >
                <td className="p-4">
                  <div className="max-w-md truncate" title={session.sessionId}>
                    {session.sessionId}
                  </div>
                </td>
                <td className="p-4">{session.startTime ? new Date(session.startTime).toLocaleString() : '-'}</td>
                <td className="p-4 text-right tabular-nums">{session.handCount ?? '-'}</td>
                <td
                  className={cn(
                    'p-4 text-right font-bold tabular-nums',
                    (session.netProfit ?? 0) > 0 && 'text-success-content',
                    (session.netProfit ?? 0) < 0 && 'text-error-content',
                  )}
                >
                  {formatSessionProfit(session.netProfit, session.type)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && (
          <div role="status" className="p-8 text-center text-foreground-muted flex items-center justify-center gap-3">
            <div
              aria-hidden="true"
              className="w-5 h-5 border-2 border-primary-ring border-t-transparent rounded-full animate-spin"
            />
            {t('default.loading')}
          </div>
        )}

        {!isLoading && isError && (
          <div role="alert" className="p-12 text-center text-error-content flex items-center justify-center gap-2">
            <AlertCircle size={18} aria-hidden="true" />
            {t('default.errorResult')}
          </div>
        )}

        {!isLoading && !isError && sessions.length === 0 && (
          <div className="p-12 text-center text-foreground-muted">{t('default.emptyResult')}</div>
        )}
      </div>
    </JHandCard>
  );
}
