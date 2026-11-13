import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RANKS, SUITS } from '@/components/ui/playing-card/card.constants';
import type { Rank, Suit } from '@/components/ui/playing-card/card.types';
import { SUIT_COLOR, SUIT_SYMBOL } from '@/components/ui/playing-card/cardStyles';
import { PlayingCard } from '@/components/ui/playing-card/PlayingCard';
import { cn } from '@/lib/cn';
import {
  EMPTY_SLOT,
  buildValue,
  isCompleteSlot,
  slotsFromValue,
  type CardSlot,
  type CardSlots,
} from '../utils/heroCardsSlots';

interface HeroCardsFilterProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

type SlotIndex = 0 | 1;

const SLOT_INDEXES: readonly SlotIndex[] = [0, 1];

export function HeroCardsFilter({ value, onChange }: HeroCardsFilterProps) {
  const { t } = useTranslation();
  const popoverIdPrefix = useId();
  const [slots, setSlots] = useState<CardSlots>(() => slotsFromValue(value));
  const [prevValue, setPrevValue] = useState(value);
  const [openIndex, setOpenIndex] = useState<SlotIndex | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (value !== prevValue) {
    setPrevValue(value);
    if (value !== buildValue(slots)) {
      setSlots(slotsFromValue(value));
    }
  }

  useEffect(() => {
    if (openIndex === null) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenIndex(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openIndex]);

  const updateSlot = (index: SlotIndex, patch: Partial<CardSlot>) => {
    const next: CardSlots = index === 0 ? [{ ...slots[0], ...patch }, slots[1]] : [slots[0], { ...slots[1], ...patch }];
    setSlots(next);
    onChange(buildValue(next));
  };

  const selectRank = (index: SlotIndex, rank: Rank) => updateSlot(index, { rank });

  const selectSuit = (index: SlotIndex, suit: Suit) => updateSlot(index, { suit });

  const clearSlot = (index: SlotIndex) => {
    updateSlot(index, EMPTY_SLOT);
    setOpenIndex(null);
  };

  return (
    <div className="flex flex-col gap-1.5 w-auto shrink-0" ref={containerRef}>
      <span className="text-sm font-medium text-gray-400 ml-1">{t('handResult.filters.heroCards')}</span>
      <div className="flex items-center gap-2 relative">
        {SLOT_INDEXES.map((index) => {
          const slot = slots[index];
          const isOpen = openIndex === index;
          const popoverId = `${popoverIdPrefix}-${index}`;

          return (
            <div key={index} className="relative">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-label={t('handResult.filters.heroCardsSlot', { index: String(index + 1) })}
                aria-expanded={isOpen}
                aria-controls={popoverId}
                className="cursor-pointer transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring rounded-lg"
              >
                {isCompleteSlot(slot) ? (
                  <PlayingCard rank={slot.rank} suit={slot.suit} size="sm" />
                ) : (
                  <div className="w-7 h-10 rounded-md border-2 border-dashed border-border flex items-center justify-center text-gray-600 text-sm">
                    ?
                  </div>
                )}
              </button>

              {isOpen && (
                <div
                  id={popoverId}
                  className="absolute z-20 top-full right-0 mt-2 bg-surface border border-border rounded-xl p-3 shadow-xl w-56"
                >
                  <div className="text-xs font-medium text-gray-400 mb-1.5">
                    {t('handResult.filters.heroCardsRank')}
                  </div>
                  <div className="grid grid-cols-5 gap-1 mb-3">
                    {RANKS.map((rank) => (
                      <button
                        key={rank}
                        type="button"
                        onClick={() => selectRank(index, rank)}
                        aria-pressed={slot.rank === rank}
                        className={cn(
                          'h-8 rounded-md text-sm font-semibold transition-colors cursor-pointer',
                          slot.rank === rank
                            ? 'bg-primary text-foreground-strong'
                            : 'bg-background text-gray-300 hover:bg-primary/30',
                        )}
                      >
                        {rank}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs font-medium text-gray-400 mb-1.5">
                    {t('handResult.filters.heroCardsSuit')}
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {SUITS.map((suit) => (
                      <button
                        key={suit}
                        type="button"
                        onClick={() => selectSuit(index, suit)}
                        aria-pressed={slot.suit === suit}
                        className={cn(
                          'h-9 rounded-md text-xl bg-card-face flex items-center justify-center transition-all cursor-pointer',
                          SUIT_COLOR[suit],
                          slot.suit === suit ? 'ring-2 ring-primary-ring' : 'hover:ring-2 hover:ring-primary-ring/40',
                        )}
                      >
                        {SUIT_SYMBOL[suit]}
                      </button>
                    ))}
                  </div>

                  {isCompleteSlot(slot) && (
                    <button
                      type="button"
                      onClick={() => clearSlot(index)}
                      className="mt-3 w-full text-xs text-gray-400 hover:text-foreground-strong py-1.5 rounded-md transition-colors cursor-pointer"
                    >
                      {t('handResult.filters.button.clear')}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
