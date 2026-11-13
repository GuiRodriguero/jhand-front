import { describe, expect, it } from 'vitest';
import type { ParsedCard } from '@/components/ui/playing-card/card.types';
import {
  EMPTY_EQUITY_SLOTS,
  assignCard,
  isBoardValid,
  nextEmptySlot,
  slotGroup,
  slotIndex,
  swapPlayers,
  toEquityRequest,
  usedCards,
  type EquitySlots,
  type SlotId,
} from './equitySlots';

const AS: ParsedCard = { rank: 'A', suit: 's' };
const KH: ParsedCard = { rank: 'K', suit: 'h' };
const QC: ParsedCard = { rank: 'Q', suit: 'c' };
const QD: ParsedCard = { rank: 'Q', suit: 'd' };
const TWO_C: ParsedCard = { rank: '2', suit: 'c' };
const SEVEN_D: ParsedCard = { rank: '7', suit: 'd' };
const TEN_H: ParsedCard = { rank: 'T', suit: 'h' };
const NINE_S: ParsedCard = { rank: '9', suit: 's' };

function fill(cards: Partial<Record<SlotId, ParsedCard>>): EquitySlots {
  return { ...EMPTY_EQUITY_SLOTS, ...cards };
}

const BOTH_HANDS = { 'hero-0': AS, 'hero-1': KH, 'villain-0': QC, 'villain-1': QD } as const;

describe('slot helpers', () => {
  it('extracts the group and index from the slot id', () => {
    expect(slotGroup('villain-1')).toBe('villain');
    expect(slotIndex('board-3')).toBe(3);
  });

  it('assigns a card without mutating the slots', () => {
    const next = assignCard(EMPTY_EQUITY_SLOTS, 'hero-0', AS);
    expect(next['hero-0']).toEqual(AS);
    expect(EMPTY_EQUITY_SLOTS['hero-0']).toBeNull();
  });

  it('lists the used cards', () => {
    expect(usedCards(fill({ 'hero-0': AS, 'board-2': KH }))).toEqual(new Set(['As', 'Kh']));
  });
});

describe('nextEmptySlot', () => {
  it('starts from the first slot', () => {
    expect(nextEmptySlot(EMPTY_EQUITY_SLOTS, null)).toBe('hero-0');
  });

  it('follows the order hero → villain → board', () => {
    expect(nextEmptySlot(fill({ 'hero-0': AS, 'hero-1': KH }), 'hero-1')).toBe('villain-0');
    expect(nextEmptySlot(fill(BOTH_HANDS), 'villain-1')).toBe('board-0');
  });

  it('wraps around to earlier empty slots', () => {
    const allButFirst = fill({
      'hero-1': KH,
      'villain-0': QC,
      'villain-1': QD,
      'board-0': TWO_C,
      'board-1': SEVEN_D,
      'board-2': TEN_H,
      'board-3': NINE_S,
      'board-4': { rank: '3', suit: 'h' },
    });
    expect(nextEmptySlot(allButFirst, 'board-4')).toBe('hero-0');
    expect(nextEmptySlot(allButFirst, 'villain-0')).toBe('hero-0');
  });

  it('returns null when every slot is filled', () => {
    const full = fill({
      ...BOTH_HANDS,
      'board-0': TWO_C,
      'board-1': SEVEN_D,
      'board-2': TEN_H,
      'board-3': NINE_S,
      'board-4': { rank: '3', suit: 'h' },
    });
    expect(nextEmptySlot(full, 'board-4')).toBeNull();
  });
});

describe('isBoardValid', () => {
  it.each([
    [{}, true],
    [{ 'board-0': TWO_C }, false],
    [{ 'board-0': TWO_C, 'board-1': SEVEN_D }, false],
    [{ 'board-0': TWO_C, 'board-1': SEVEN_D, 'board-2': TEN_H }, true],
    [{ 'board-0': TWO_C, 'board-1': SEVEN_D, 'board-2': TEN_H, 'board-3': NINE_S }, true],
    [{ 'board-0': TWO_C, 'board-1': SEVEN_D, 'board-3': TEN_H }, false],
  ] as const)('%o → %s', (board, expected) => {
    expect(isBoardValid(fill(board))).toBe(expected);
  });
});

describe('toEquityRequest', () => {
  it('returns null while a hand is incomplete', () => {
    expect(toEquityRequest(fill({ 'hero-0': AS, 'hero-1': KH, 'villain-0': QC }))).toBeNull();
  });

  it('returns null when the board is invalid', () => {
    expect(toEquityRequest(fill({ ...BOTH_HANDS, 'board-0': TWO_C }))).toBeNull();
  });

  it('builds the request', () => {
    expect(toEquityRequest(fill({ ...BOTH_HANDS, 'board-0': TWO_C, 'board-1': SEVEN_D, 'board-2': TEN_H }))).toEqual({
      heroCards: 'As Kh',
      villainCards: 'Qc Qd',
      board: '2c 7d Th',
    });
  });

  it('sends an empty board pre-flop', () => {
    expect(toEquityRequest(fill(BOTH_HANDS))?.board).toBe('');
  });
});

describe('swapPlayers', () => {
  it('swaps hero and villain cards', () => {
    const swapped = swapPlayers(fill(BOTH_HANDS));
    expect(swapped['hero-0']).toEqual(QC);
    expect(swapped['villain-1']).toEqual(KH);
  });
});
