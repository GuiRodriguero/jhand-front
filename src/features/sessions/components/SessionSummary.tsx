import { useTranslation } from 'react-i18next';
import type { SessionHandStats } from '../types/sessionHandStats.types';
import type { PokerSession } from '../types/session.types';
import { formatBigBlinds, formatPercentage } from '../utils/sessionDetailUtils';
import { formatPlacement, formatSessionMoney, formatSessionProfit } from '../utils/sessionTableUtils';
import { SessionStatTile } from './SessionStatTile';

interface SessionSummaryProps {
  readonly session: PokerSession;
  readonly stats?: SessionHandStats;
}

export function SessionSummary({ session, stats }: SessionSummaryProps) {
  const { t, i18n } = useTranslation();
  const vpipPfr = stats ? `${formatPercentage(stats.vpipPercentage)} / ${formatPercentage(stats.pfrPercentage)}` : '-';

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
      {session.type === 'TOURNAMENT' ? (
        <>
          <SessionStatTile
            label={t('sessions.detail.stats.finishPosition')}
            value={formatPlacement(session.finishPosition, i18n.language)}
          />
          <SessionStatTile
            label={t('sessions.detail.stats.buyIn')}
            value={formatSessionMoney(session.buyIn, session)}
          />
          <SessionStatTile
            label={t('sessions.detail.stats.prize')}
            value={formatSessionMoney(session.prize, session)}
          />
          <SessionStatTile
            label={t('sessions.detail.stats.netProfit')}
            value={formatSessionProfit(session.netProfit, session)}
            signedValue={session.netProfit}
          />
        </>
      ) : (
        <>
          <SessionStatTile
            label={t('sessions.detail.stats.netProfit')}
            value={formatSessionProfit(session.netProfit, session)}
            signedValue={session.netProfit}
          />
          <SessionStatTile
            label={t('sessions.detail.stats.netProfitInBb')}
            value={stats ? formatBigBlinds(stats.points.at(-1)?.cumulativeNetProfitInBb ?? 0, true) : '-'}
            signedValue={stats?.points.at(-1)?.cumulativeNetProfitInBb}
          />
          <SessionStatTile
            label={t('sessions.detail.stats.bbPer100')}
            value={stats ? formatBigBlinds(stats.bbPer100, true) : '-'}
            signedValue={stats?.bbPer100}
          />
        </>
      )}
      <SessionStatTile label={t('sessions.detail.stats.vpipPfr')} value={vpipPfr} />
    </div>
  );
}
