import { RANKS } from '../playing-card/card.constants';
import type { ParsedCard, Suit } from '../playing-card/card.types';
import { toCardCode } from '../playing-card/parseCards';
import { PlayingCard } from '../playing-card/PlayingCard';
import { cn } from '@/lib/cn';

interface CardDeckPickerProps {
  readonly ariaLabel: string;
  readonly disabledCards: ReadonlySet<string>;
  readonly onSelect: (card: ParsedCard) => void;
  readonly className?: string;
}

const DECK_SUITS: readonly Suit[] = ['s', 'h', 'd', 'c'];

const DECK_RANKS = [...RANKS].reverse();

export function CardDeckPicker({ ariaLabel, disabledCards, onSelect, className }: CardDeckPickerProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn('flex flex-col gap-1.5 max-w-full overflow-x-auto custom-scrollbar pb-1', className)}
    >
      {DECK_SUITS.map((suit) => (
        <div key={suit} className="flex gap-1.5">
          {DECK_RANKS.map((rank) => {
            const card: ParsedCard = { rank, suit };
            const code = toCardCode(card);
            const isDisabled = disabledCards.has(code);

            return (
              <button
                key={code}
                type="button"
                disabled={isDisabled}
                onClick={() => onSelect(card)}
                aria-label={code}
                className={cn(
                  'shrink-0 rounded-md transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring',
                  isDisabled ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-0.5',
                )}
              >
                <PlayingCard rank={rank} suit={suit} size="md" />
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
