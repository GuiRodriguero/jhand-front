import { describe, expect, it } from 'vitest';
import { sessionTypeFromSearchParams } from '@/lib/sessionType';
import { pageFromSearchParams, toSearchParams } from './sessionSearchParams';

describe('pageFromSearchParams', () => {
  it.each([
    ['', 0],
    ['page=1', 0],
    ['page=3', 2],
    ['page=-1', 0],
    ['page=abc', 0],
  ])('"%s" → %i', (query, expected) => {
    expect(pageFromSearchParams(new URLSearchParams(query))).toBe(expected);
  });
});

describe('toSearchParams', () => {
  it('omits the first page', () => {
    expect(toSearchParams('TOURNAMENT', 0).toString()).toBe('type=TOURNAMENT');
  });

  it('round-trips with the readers', () => {
    const params = toSearchParams('CASH_GAME', 3);
    expect(sessionTypeFromSearchParams(params)).toBe('CASH_GAME');
    expect(pageFromSearchParams(params)).toBe(3);
  });
});
