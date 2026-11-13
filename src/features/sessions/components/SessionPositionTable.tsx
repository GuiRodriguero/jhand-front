import { useTranslation } from 'react-i18next';
import { JHandCard } from '@/components/ui/card/JHandCard';
import { cn } from '@/lib/cn';
import type { SessionType } from '@/lib/sessionType';
import type { SessionPositionResult } from '../types/sessionHandStats.types';
import { formatBigBlinds, formatHandAmount } from '../utils/sessionDetailUtils';

interface SessionPositionTableProps {
  readonly results: readonly SessionPositionResult[];
  readonly type: SessionType;
}

export function SessionPositionTable({ results, type }: SessionPositionTableProps) {
  const { t } = useTranslation();

  return (
    <JHandCard>
      <h2 className="text-lg font-semibold text-foreground-strong">{t('sessions.detail.positions.title')}</h2>
      <table className="w-full text-left border-collapse text-sm">
        <thead className="border-b border-border">
          <tr className="text-xs uppercase tracking-wider">
            <th scope="col" className="py-2 pr-4 font-medium">
              {t('sessions.detail.positions.position')}
            </th>
            <th scope="col" className="py-2 px-4 font-medium text-right">
              {t('sessions.detail.positions.hands')}
            </th>
            <th scope="col" className="py-2 px-4 font-medium text-right">
              {t('sessions.detail.positions.netProfit')}
            </th>
            <th scope="col" className="py-2 pl-4 font-medium text-right">
              {t('sessions.detail.positions.netProfitInBb')}
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.position} className="border-b border-border-subtle last:border-b-0">
              <th scope="row" className="py-2 pr-4 font-medium text-foreground-strong">
                {result.position}
              </th>
              <td className="py-2 px-4 text-right tabular-nums">{result.hands}</td>
              <td className="py-2 px-4 text-right tabular-nums">{formatHandAmount(result.netProfit, type, true)}</td>
              <td
                className={cn(
                  'py-2 pl-4 text-right font-bold tabular-nums',
                  result.netProfitInBb > 0 && 'text-success-content',
                  result.netProfitInBb < 0 && 'text-error-content',
                )}
              >
                {formatBigBlinds(result.netProfitInBb, true)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </JHandCard>
  );
}
