import { cn } from '@/lib/cn';
import type { Rank, Suit } from './card.types';
import { SUIT_COLOR, SUIT_SYMBOL } from './cardStyles';

export type PlayingCardSize = 'sm' | 'md' | 'lg';

interface PlayingCardProps {
  readonly rank: Rank;
  readonly suit: Suit;
  readonly size?: PlayingCardSize;
  readonly className?: string;
}

const SIZE_STYLES: Readonly<Record<PlayingCardSize, { container: string; text: string }>> = {
  sm: {
    container: 'w-7 h-10 rounded-md',
    text: 'text-sm',
  },
  md: {
    container: 'w-10 h-14 rounded-md',
    text: 'text-lg',
  },
  lg: {
    container: 'w-16 h-24 rounded-lg',
    text: 'text-2xl',
  },
};

export function PlayingCard({ rank, suit, size = 'sm', className }: PlayingCardProps) {
  const sizeStyle = SIZE_STYLES[size];

  return (
    <div
      className={cn(
        'inline-flex flex-col items-center justify-center bg-card-face shadow-sm leading-none',
        sizeStyle.container,
        SUIT_COLOR[suit],
        className,
      )}
    >
      <span className={cn('font-bold', sizeStyle.text)}>{rank}</span>
      <span className={sizeStyle.text} aria-hidden="true">
        {SUIT_SYMBOL[suit]}
      </span>
    </div>
  );
}
