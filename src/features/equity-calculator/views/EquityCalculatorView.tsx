import { useState } from 'react';
import { ArrowLeftRight, Eraser } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { JHandButton } from '@/components/ui/button/JHandButton';
import { JHandCard } from '@/components/ui/card/JHandCard';
import { CardDeckPicker } from '@/components/ui/card-picker/CardDeckPicker';
import type { ParsedCard } from '@/components/ui/playing-card/card.types';
import { BoardPanel } from '../components/BoardPanel';
import { EquityStatus } from '../components/EquityStatus';
import { PlayerHandPanel } from '../components/PlayerHandPanel';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useEquityQuery } from '../hooks/useEquityQuery';
import {
  BOARD_SLOTS,
  EMPTY_EQUITY_SLOTS,
  HERO_SLOTS,
  VILLAIN_SLOTS,
  assignCard,
  hasBothHands,
  isBoardValid,
  nextEmptySlot,
  swapPlayers,
  toEquityRequest,
  usedCards,
  type EquitySlots,
  type SlotId,
} from '../utils/equitySlots';

const CALCULATION_DELAY_MS = 250;

export function EquityCalculatorView() {
  const { t } = useTranslation();
  const [slots, setSlots] = useState<EquitySlots>(EMPTY_EQUITY_SLOTS);
  const [activeSlot, setActiveSlot] = useState<SlotId | null>('hero-0');

  const request = toEquityRequest(slots);
  const debouncedSlots = useDebouncedValue(slots, CALCULATION_DELAY_MS);
  const { data, isFetching, isError, isPlaceholderData } = useEquityQuery(toEquityRequest(debouncedSlots));
  const result = request ? data : undefined;
  const isRefreshing = isPlaceholderData || isFetching;

  const handleSelectCard = (card: ParsedCard) => {
    if (!activeSlot) return;
    const next = assignCard(slots, activeSlot, card);
    setSlots(next);
    setActiveSlot(nextEmptySlot(next, activeSlot));
  };

  const handleSlotClick = (slotId: SlotId) => {
    if (slotId === activeSlot && slots[slotId]) {
      setSlots(assignCard(slots, slotId, null));
      return;
    }
    setActiveSlot(slotId);
  };

  const handleSwap = () => setSlots(swapPlayers(slots));

  const handleClear = () => {
    setSlots(EMPTY_EQUITY_SLOTS);
    setActiveSlot('hero-0');
  };

  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-100">{t('equityCalculator.title')}</h1>
          <p className="text-gray-400 mt-1">{t('equityCalculator.description')}</p>
        </div>
        <div className="flex gap-2">
          <JHandButton variant="outline" onClick={handleSwap}>
            <ArrowLeftRight size={16} aria-hidden="true" />
            {t('equityCalculator.button.swap')}
          </JHandButton>
          <JHandButton variant="ghost" onClick={handleClear}>
            <Eraser size={16} aria-hidden="true" />
            {t('equityCalculator.button.clear')}
          </JHandButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 items-stretch">
        <PlayerHandPanel
          title={t('equityCalculator.hero')}
          slotIds={HERO_SLOTS}
          slots={slots}
          activeSlot={activeSlot}
          onSlotClick={handleSlotClick}
          equity={result?.heroEquity ?? null}
          isRefreshing={isRefreshing}
          barClassName="bg-hero"
        />
        <BoardPanel slots={slots} activeSlot={activeSlot} onSlotClick={handleSlotClick} />
        <PlayerHandPanel
          title={t('equityCalculator.villain')}
          slotIds={VILLAIN_SLOTS}
          slots={slots}
          activeSlot={activeSlot}
          onSlotClick={handleSlotClick}
          equity={result?.villainEquity ?? null}
          isRefreshing={isRefreshing}
          barClassName="bg-villain"
        />
      </div>

      <EquityStatus
        hasBothHands={hasBothHands(slots)}
        isBoardValid={isBoardValid(slots)}
        isPreFlop={request !== null && BOARD_SLOTS.every((slotId) => slots[slotId] === null)}
        isFetching={isFetching}
        isError={isError}
        result={result}
      />

      <JHandCard className="w-fit max-w-full">
        <h2 className="text-sm font-semibold text-gray-300">{t('equityCalculator.deck')}</h2>
        <CardDeckPicker
          ariaLabel={t('equityCalculator.deck')}
          disabledCards={usedCards(slots)}
          onSelect={handleSelectCard}
        />
      </JHandCard>
    </div>
  );
}
