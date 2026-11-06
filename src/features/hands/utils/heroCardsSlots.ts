import type { ParsedCard, Rank, Suit } from '@/components/ui/playing-card/card.types';
import { parseCards } from '@/components/ui/playing-card/parseCards';

export interface CardSlot {
  readonly rank: Rank | '';
  readonly suit: Suit | '';
}

export type CardSlots = readonly [CardSlot, CardSlot];

export const EMPTY_SLOT: CardSlot = { rank: '', suit: '' };

export const EMPTY_SLOTS: CardSlots = [EMPTY_SLOT, EMPTY_SLOT];

export function isCompleteSlot(slot: CardSlot): slot is ParsedCard {
  return slot.rank !== '' && slot.suit !== '';
}

export function slotsFromValue(value: string): CardSlots {
  const [first, second] = parseCards(value);
  return [first ?? EMPTY_SLOT, second ?? EMPTY_SLOT];
}

export function buildValue(slots: CardSlots): string {
  return slots
    .filter(isCompleteSlot)
    .map((slot) => `${slot.rank}${slot.suit}`)
    .join(' ');
}
