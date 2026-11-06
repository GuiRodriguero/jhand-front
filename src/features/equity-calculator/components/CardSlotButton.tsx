import type { ParsedCard } from '@/components/ui/playing-card/card.types';
import { PlayingCard } from '@/components/ui/playing-card/PlayingCard';
import { cn } from '@/lib/cn';

interface CardSlotButtonProps {
  readonly card: ParsedCard | null;
  readonly isActive: boolean;
  readonly label: string;
  readonly onClick: () => void;
}

export function CardSlotButton({ card, isActive, label, onClick }: CardSlotButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={isActive}
      className={cn(
        'rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring',
        isActive && 'ring-2 ring-primary-ring ring-offset-2 ring-offset-surface -translate-y-1',
      )}
    >
      {card ? (
        <PlayingCard rank={card.rank} suit={card.suit} size="lg" />
      ) : (
        <div
          className={cn(
            'w-16 h-24 rounded-lg border-2 border-dashed flex items-center justify-center text-2xl',
            isActive ? 'border-primary-ring text-primary-content' : 'border-border text-gray-600',
          )}
        >
          ?
        </div>
      )}
    </button>
  );
}
