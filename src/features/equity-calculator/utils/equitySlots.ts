import type { ParsedCard } from '@/components/ui/playing-card/card.types';
import { toCardCode } from '@/components/ui/playing-card/parseCards';
import type { EquityRequest } from '../types/equity.types';

export const SLOT_ORDER = [
  'hero-0',
  'hero-1',
  'villain-0',
  'villain-1',
  'board-0',
  'board-1',
  'board-2',
  'board-3',
  'board-4',
] as const;

export type SlotId = (typeof SLOT_ORDER)[number];

export type SlotGroup = 'hero' | 'villain' | 'board';

export type EquitySlots = Readonly<Record<SlotId, ParsedCard | null>>;

export const HERO_SLOTS: readonly SlotId[] = ['hero-0', 'hero-1'];
export const VILLAIN_SLOTS: readonly SlotId[] = ['villain-0', 'villain-1'];
export const BOARD_SLOTS: readonly SlotId[] = ['board-0', 'board-1', 'board-2', 'board-3', 'board-4'];

const VALID_BOARD_SIZES: readonly number[] = [0, 3, 4, 5];

export const EMPTY_EQUITY_SLOTS: EquitySlots = {
  'hero-0': null,
  'hero-1': null,
  'villain-0': null,
  'villain-1': null,
  'board-0': null,
  'board-1': null,
  'board-2': null,
  'board-3': null,
  'board-4': null,
};

export function slotGroup(slotId: SlotId): SlotGroup {
  return slotId.split('-')[0] as SlotGroup;
}

export function slotIndex(slotId: SlotId): number {
  return Number(slotId.split('-')[1]);
}

export function assignCard(slots: EquitySlots, slotId: SlotId, card: ParsedCard | null): EquitySlots {
  return { ...slots, [slotId]: card };
}

export function nextEmptySlot(slots: EquitySlots, from: SlotId | null): SlotId | null {
  const start = from ? SLOT_ORDER.indexOf(from) + 1 : 0;
  const ordered = [...SLOT_ORDER.slice(start), ...SLOT_ORDER.slice(0, start)];
  return ordered.find((slotId) => slots[slotId] === null) ?? null;
}

export function usedCards(slots: EquitySlots): Set<string> {
  return new Set(
    Object.values(slots)
      .filter((card): card is ParsedCard => card !== null)
      .map(toCardCode),
  );
}

function cardsOf(slots: EquitySlots, slotIds: readonly SlotId[]): ParsedCard[] {
  return slotIds.map((slotId) => slots[slotId]).filter((card): card is ParsedCard => card !== null);
}

export function isBoardValid(slots: EquitySlots): boolean {
  const filled = BOARD_SLOTS.map((slotId) => slots[slotId] !== null);
  const size = filled.filter(Boolean).length;
  const isContiguous = filled.slice(0, size).every(Boolean);
  return isContiguous && VALID_BOARD_SIZES.includes(size);
}

export function hasBothHands(slots: EquitySlots): boolean {
  return [...HERO_SLOTS, ...VILLAIN_SLOTS].every((slotId) => slots[slotId] !== null);
}

export function toEquityRequest(slots: EquitySlots): EquityRequest | null {
  if (!hasBothHands(slots) || !isBoardValid(slots)) return null;

  const format = (slotIds: readonly SlotId[]) => cardsOf(slots, slotIds).map(toCardCode).join(' ');
  return {
    heroCards: format(HERO_SLOTS),
    villainCards: format(VILLAIN_SLOTS),
    board: format(BOARD_SLOTS),
  };
}

export function swapPlayers(slots: EquitySlots): EquitySlots {
  return {
    ...slots,
    'hero-0': slots['villain-0'],
    'hero-1': slots['villain-1'],
    'villain-0': slots['hero-0'],
    'villain-1': slots['hero-1'],
  };
}
