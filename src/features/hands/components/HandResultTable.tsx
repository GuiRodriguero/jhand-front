import { AlertCircle, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { JHandCard } from '@/components/ui/card/JHandCard';
import { PlayingCard } from '@/components/ui/playing-card/PlayingCard';
import { parseCards } from '@/components/ui/playing-card/parseCards';
import { cn } from '@/lib/cn';
import type { HandResult } from '../types/handResult.types';
import { formatBigBlinds } from '../utils/handResultTableUtils';

interface HandResultTableProps {
  readonly hands: readonly HandResult[];
  readonly isLoading: boolean;
  readonly isRefreshing?: boolean;
  readonly isError: boolean;
}

function renderCards(value: string | null) {
  const cards = parseCards(value);
  if (cards.length === 0) return '-';

  return (
    <div className="flex items-center gap-1">
      {cards.map((card, index) => (
        <PlayingCard key={`${card.rank}${card.suit}-${index}`} rank={card.rank} suit={card.suit} size="sm" />
      ))}
    </div>
  );
}

export function HandResultTable({ hands, isLoading, isRefreshing = false, isError }: HandResultTableProps) {
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
                {t('handResult.table.sessionId')}
              </th>
              <th scope="col" className="p-4 font-medium">
                {t('handResult.table.position')}
              </th>
              <th scope="col" className="p-4 font-medium">
                {t('handResult.table.cards')}
              </th>
              <th scope="col" className="p-4 font-medium">
                {t('handResult.table.board')}
              </th>
              <th scope="col" className="p-4 font-medium">
                {t('handResult.table.handRank')}
              </th>
              <th scope="col" className="p-4 font-medium text-right">
                {t('handResult.table.totalPot')}
              </th>
              <th scope="col" className="p-4 font-medium text-right">
                {t('handResult.table.netProfit')}
              </th>
              <th scope="col" className="p-4 font-medium">
                {t('handResult.table.dateTime')}
              </th>
              <th scope="col" className="p-4">
                <span className="sr-only">{t('handResult.table.details')}</span>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm whitespace-nowrap">
            {hands.map((hand) => (
              <tr
                key={hand.handId}
                className="border-b border-border-subtle hover:bg-surface-light/50 transition-colors cursor-pointer group"
              >
                <td className="p-4">
                  <div className="max-w-56 truncate" title={hand.sessionId}>
                    {hand.sessionId || '-'}
                  </div>
                </td>
                <td className="p-4 font-medium">{hand.position ?? '-'}</td>
                <td className="p-4">{renderCards(hand.heroCards)}</td>
                <td className="p-4">{renderCards(hand.board)}</td>
                <td className="p-4">{hand.handRank || '-'}</td>
                <td className="p-4 text-right">{hand.totalPot == null ? '-' : hand.totalPot.toFixed(2)}</td>
                <td
                  className={cn(
                    'p-4 text-right font-bold',
                    (hand.netProfitInBb ?? 0) > 0 && 'text-success-content',
                    (hand.netProfitInBb ?? 0) < 0 && 'text-error-content',
                  )}
                >
                  {formatBigBlinds(hand.netProfitInBb)}
                </td>
                <td className="p-4">{hand.date ? new Date(hand.date).toLocaleString() : '-'}</td>
                <td className="p-4 text-right text-foreground-muted group-hover:text-primary-content">
                  <ChevronRight size={18} aria-hidden="true" />
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

        {!isLoading && !isError && hands.length === 0 && (
          <div className="p-12 text-center text-foreground-muted">{t('default.emptyResult')}</div>
        )}
      </div>
    </JHandCard>
  );
}
