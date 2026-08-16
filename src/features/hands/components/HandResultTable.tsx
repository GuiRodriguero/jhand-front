import { ChevronRight } from 'lucide-react';
import type { HandResult } from '../types/handResult.types';
import { JHandCard } from '../../../components/ui/card/JHandCard';
import { useTranslation } from 'react-i18next';

interface HandResultTableProps {
  hands: HandResult[];
  isLoading: boolean;
}

export function HandResultTable({ hands, isLoading }: HandResultTableProps) {
  const { t } = useTranslation();

  return (
    <JHandCard className="mt-6">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-surface border-b border-border z-10">
            <tr className="text-xs uppercase tracking-wider">
              <th className="p-4 font-medium">{t('handResult.filters.table.sessionId')}</th>
              <th className="p-4 font-medium">{t('handResult.filters.table.cards')}</th>
              <th className="p-4 font-medium">{t('handResult.filters.table.board')}</th>
              <th className="p-4 font-medium">{t('handResult.filters.table.handRank')}</th>
              <th className="p-4 font-medium text-right">{t('handResult.filters.table.netProfit')}</th>
              <th className="p-4 font-medium">{t('handResult.filters.table.dateTime')}</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {hands && hands.length > 0 ? hands.map((hand) => (
              <tr
                key={hand.handId}
                className="border-b border-border-subtle hover:bg-surface-light/50 transition-colors cursor-pointer group"
              >
                <td className="p-4">{hand.sessionId || '-'}</td>
                <td className="p-4 font-semibold text-white tracking-widest">{hand.heroCards || '-'}</td>
                <td className="p-4">{hand.board || '-'}</td>
                <td className="p-4">{hand.handRank || '-'}</td>
                <td
                  className={`p-4 text-right font-bold ${(hand.netProfit || 0) >= 0 ? 'text-success-content' : 'text-error-content'}`}
                >
                  {(hand.netProfit || 0) >= 0 ? '+' : ''}${(Math.abs(hand.netProfit || 0)).toFixed(2)}
                </td>
                <td className="p-4">{hand.date ? new Date(hand.date).toLocaleString() : '-'}</td>
                <td className="p-4 text-right text-gray-500 group-hover:text-blue-400">
                  <ChevronRight size={18} />
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>

        {isLoading && (
          <div className="p-8 text-center text-gray-500 flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            {t('default.loading')}
          </div>
        )}

        {!isLoading && (!hands || hands.length === 0) && (
          <div className="p-12 text-center text-gray-500"> {t('default.emptyResult')}</div>
        )}
      </div>
    </JHandCard>
  );
}
