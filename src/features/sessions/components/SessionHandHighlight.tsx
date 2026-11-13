import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { JHandCard } from '@/components/ui/card/JHandCard';
import { PlayingCard } from '@/components/ui/playing-card/PlayingCard';
import { parseCards } from '@/components/ui/playing-card/parseCards';
import { cn } from '@/lib/cn';
import type { SessionType } from '@/lib/sessionType';
import type { SessionHighlightHand } from '../types/sessionHandStats.types';
import { formatBigBlinds, formatHandAmount, handsPath } from '../utils/sessionDetailUtils';

interface SessionHandHighlightProps {
  readonly title: string;
  readonly hand: SessionHighlightHand;
  readonly type: SessionType;
}

export function SessionHandHighlight({ title, hand, type }: SessionHandHighlightProps) {
  const { t } = useTranslation();

  return (
    <JHandCard>
      <h2 className="text-xs uppercase tracking-wider text-foreground-muted">{title}</h2>
      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          {parseCards(hand.heroCards).map((card) => (
            <PlayingCard key={`${card.rank}${card.suit}`} rank={card.rank} suit={card.suit} size="md" />
          ))}
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-sm text-foreground">
            {hand.position} · {hand.handRank}
          </span>
          <span
            className={cn(
              'text-xl font-bold tabular-nums',
              hand.netProfit > 0 && 'text-success-content',
              hand.netProfit < 0 && 'text-error-content',
            )}
          >
            {formatHandAmount(hand.netProfit, type, true)}
          </span>
          <span className="text-sm text-foreground-muted tabular-nums">
            {formatBigBlinds(hand.netProfitInBb, true)}
          </span>
        </div>
        <Link
          to={handsPath(type, { handId: hand.handId })}
          className={cn(
            'ml-auto inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-primary-content',
            'hover:bg-surface-light/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring',
          )}
        >
          {t('sessions.detail.highlights.viewHand')}
          <ChevronRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </JHandCard>
  );
}
