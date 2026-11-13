import { describe, expect, it } from 'vitest';
import { EMPTY_SLOT, EMPTY_SLOTS, buildValue, isCompleteSlot, slotsFromValue } from './heroCardsSlots';

describe('slotsFromValue', () => {
  it('returns empty slots for an empty value', () => {
    expect(slotsFromValue('')).toEqual(EMPTY_SLOTS);
  });

  it('fills both slots', () => {
    expect(slotsFromValue('As Kh')).toEqual([
      { rank: 'A', suit: 's' },
      { rank: 'K', suit: 'h' },
    ]);
  });

  it('fills only the first slot when there is one card', () => {
    expect(slotsFromValue('Td')).toEqual([{ rank: 'T', suit: 'd' }, EMPTY_SLOT]);
  });
});

describe('buildValue', () => {
  it('serializes complete slots', () => {
    expect(
      buildValue([
        { rank: 'A', suit: 's' },
        { rank: 'K', suit: 'h' },
      ]),
    ).toBe('As Kh');
  });

  it('ignores incomplete slots', () => {
    expect(
      buildValue([
        { rank: 'A', suit: '' },
        { rank: 'K', suit: 'h' },
      ]),
    ).toBe('Kh');
    expect(buildValue(EMPTY_SLOTS)).toBe('');
  });

  it('round-trips with slotsFromValue', () => {
    expect(buildValue(slotsFromValue('Qc 9s'))).toBe('Qc 9s');
  });
});

describe('isCompleteSlot', () => {
  it('requires both rank and suit', () => {
    expect(isCompleteSlot({ rank: 'A', suit: 's' })).toBe(true);
    expect(isCompleteSlot({ rank: 'A', suit: '' })).toBe(false);
    expect(isCompleteSlot({ rank: '', suit: 's' })).toBe(false);
  });
});
