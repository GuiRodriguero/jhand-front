import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlayingCard, type Suit } from '../../../components/ui/playing-card/PlayingCard';
import { parseCards } from '../../../components/ui/playing-card/parseCards';

interface HeroCardsFilterProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

const RANK_OPTIONS: readonly string[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const SUIT_OPTIONS: readonly { suit: Suit; symbol: string; color: string }[] = [
  { suit: 's', symbol: '♠', color: 'text-gray-900' },
  { suit: 'h', symbol: '♥', color: 'text-red-600' },
  { suit: 'c', symbol: '♣', color: 'text-gray-900' },
  { suit: 'd', symbol: '♦', color: 'text-red-600' },
];

type CardSlot = { rank: string; suit: Suit | '' };

const EMPTY_SLOTS: [CardSlot, CardSlot] = [
  { rank: '', suit: '' },
  { rank: '', suit: '' },
];

function slotsFromValue(value: string): [CardSlot, CardSlot] {
  const parsed = parseCards(value);
  if (parsed.length === 0) return EMPTY_SLOTS;
  return [
    { rank: parsed[0]?.rank ?? '', suit: parsed[0]?.suit ?? '' },
    { rank: parsed[1]?.rank ?? '', suit: parsed[1]?.suit ?? '' },
  ];
}

function buildValue(slots: [CardSlot, CardSlot]): string {
  return slots
    .filter((slot): slot is { rank: string; suit: Suit } => Boolean(slot.rank) && Boolean(slot.suit))
    .map((slot) => `${slot.rank}${slot.suit}`)
    .join(' ');
}

export function HeroCardsFilter({ value, onChange }: HeroCardsFilterProps) {
  const { t } = useTranslation();
  const [slots, setSlots] = useState<[CardSlot, CardSlot]>(() => slotsFromValue(value));
  const [openIndex, setOpenIndex] = useState<0 | 1 | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSlots(slotsFromValue(value));
  }, [value]);

  useEffect(() => {
    if (openIndex === null) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openIndex]);

  const updateSlot = (index: 0 | 1, patch: Partial<CardSlot>) => {
    const next: [CardSlot, CardSlot] = [{ ...slots[0] }, { ...slots[1] }];
    next[index] = { ...next[index], ...patch };
    setSlots(next);
    onChange(buildValue(next));
  };

  const clearSlot = (index: 0 | 1) => {
    updateSlot(index, { rank: '', suit: '' });
    setOpenIndex(null);
  };

  return (
    <div className="flex flex-col gap-1.5 w-auto shrink-0" ref={containerRef}>
      <label className="text-sm font-medium text-gray-400 ml-1">
        {t('handResult.filters.heroCards')}
      </label>
      <div className="flex items-center gap-2 relative">
        {([0, 1] as const).map((index) => {
          const slot = slots[index];
          const hasCard = Boolean(slot.rank) && Boolean(slot.suit);

          return (
            <div key={index} className="relative">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-label={t('handResult.filters.heroCardsSlot', { index: String(index + 1) })}
                className="cursor-pointer transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              >
                {hasCard ? (
                  <PlayingCard rank={slot.rank} suit={slot.suit as Suit} size="sm" />
                ) : (
                  <div className="w-7 h-10 rounded-md border-2 border-dashed border-border flex items-center justify-center text-gray-600 text-sm">
                    ?
                  </div>
                )}
              </button>

              {openIndex === index && (
                <div className="absolute z-20 top-full right-0 mt-2 bg-surface border border-border rounded-xl p-3 shadow-xl w-56">
                  <div className="text-xs font-medium text-gray-400 mb-1.5">
                    {t('handResult.filters.heroCardsRank')}
                  </div>
                  <div className="grid grid-cols-5 gap-1 mb-3">
                    {RANK_OPTIONS.map((rank) => (
                      <button
                        key={rank}
                        type="button"
                        onClick={() => updateSlot(index, { rank })}
                        className={`h-8 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
                          slot.rank === rank
                            ? 'bg-blue-600 text-white'
                            : 'bg-background text-gray-300 hover:bg-blue-600/30'
                        }`}
                      >
                        {rank}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs font-medium text-gray-400 mb-1.5">
                    {t('handResult.filters.heroCardsSuit')}
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {SUIT_OPTIONS.map((option) => (
                      <button
                        key={option.suit}
                        type="button"
                        onClick={() => updateSlot(index, { suit: option.suit })}
                        className={`h-9 rounded-md text-xl bg-white flex items-center justify-center transition-all cursor-pointer ${
                          option.color
                        } ${slot.suit === option.suit ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-500/40'}`}
                      >
                        {option.symbol}
                      </button>
                    ))}
                  </div>

                  {hasCard && (
                    <button
                      type="button"
                      onClick={() => clearSlot(index)}
                      className="mt-3 w-full text-xs text-gray-400 hover:text-white py-1.5 rounded-md transition-colors cursor-pointer"
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
