import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { JHandCard } from '@/components/ui/card/JHandCard';
import { cn } from '@/lib/cn';
import type { SessionType } from '@/lib/sessionType';
import type { PokerSession } from '../types/session.types';
import { formatPlacement, formatSessionMoney, formatSessionProfit } from '../utils/sessionTableUtils';

interface SessionTableProps {
  readonly sessions: readonly PokerSession[];
  readonly sessionType: SessionType;
  readonly isLoading: boolean;
  readonly isRefreshing?: boolean;
  readonly isError: boolean;
}

export function SessionTable({ sessions, sessionType, isLoading, isRefreshing = false, isError }: SessionTableProps) {
  const { t, i18n } = useTranslation();
  const isTournament = sessionType === 'TOURNAMENT';

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
              {!isTournament && (
                <th scope="col" className="p-4 font-medium text-right">
                  {t('sessions.table.bigBlind')}
                </th>
              )}
              {isTournament && (
                <>
                  <th scope="col" className="p-4 font-medium text-right">
                    {t('sessions.table.finishPosition')}
                  </th>
                  <th scope="col" className="p-4 font-medium text-right">
                    {t('sessions.table.buyIn')}
                  </th>
                  <th scope="col" className="p-4 font-medium text-right">
                    {t('sessions.table.prize')}
                  </th>
                </>
              )}
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
                {isTournament ? (
                  <TournamentCells session={session} language={i18n.language} />
                ) : (
                  <CashCells session={session} />
                )}
                <td
                  className={cn(
                    'p-4 text-right font-bold tabular-nums',
                    (session.netProfit ?? 0) > 0 && 'text-success-content',
                    (session.netProfit ?? 0) < 0 && 'text-error-content',
                  )}
                >
                  {formatSessionProfit(session.netProfit, session)}
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

/**
 * The columns follow the selected tab, but while a tab switch is loading the rows still belong to the previous type
 * (`keepPreviousData`), so each cell narrows on the row's own `type` and shows a dash otherwise.
 */
function CashCells({ session }: { readonly session: PokerSession }) {
  const cash = session.type === 'CASH_GAME' ? session : null;
  return <td className="p-4 text-right tabular-nums">{cash ? formatSessionMoney(cash.bigBlind, cash) : '-'}</td>;
}

function TournamentCells({ session, language }: { readonly session: PokerSession; readonly language: string }) {
  const tournament = session.type === 'TOURNAMENT' ? session : null;
  return (
    <>
      <td className="p-4 text-right tabular-nums">
        {tournament ? formatPlacement(tournament.finishPosition, language) : '-'}
      </td>
      <td className="p-4 text-right tabular-nums">
        {tournament ? formatSessionMoney(tournament.buyIn, tournament) : '-'}
      </td>
      <td className="p-4 text-right tabular-nums">
        {tournament ? formatSessionMoney(tournament.prize, tournament) : '-'}
      </td>
    </>
  );
}
