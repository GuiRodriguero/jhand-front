import { describe, expect, it } from 'vitest';
import { EMPTY_HAND_RESULT_FILTERS } from '../types/handResult.types';
import { filtersFromSearchParams, pageFromSearchParams, toSearchParams } from './handResultSearchParams';

describe('filtersFromSearchParams', () => {
  it('returns empty filters when the URL has no params', () => {
    expect(filtersFromSearchParams(new URLSearchParams())).toEqual(EMPTY_HAND_RESULT_FILTERS);
  });

  it('reads known params and ignores unknown ones', () => {
    const filters = filtersFromSearchParams(new URLSearchParams('heroCards=As+Kh&sessionId=42&foo=bar'));
    expect(filters).toEqual({ ...EMPTY_HAND_RESULT_FILTERS, heroCards: 'As Kh', sessionId: '42' });
  });
});

describe('pageFromSearchParams', () => {
  it.each([
    ['', 0],
    ['page=1', 0],
    ['page=3', 2],
    ['page=0', 0],
    ['page=-4', 0],
    ['page=abc', 0],
    ['page=2.5', 0],
  ])('"%s" → %i', (query, expected) => {
    expect(pageFromSearchParams(new URLSearchParams(query))).toBe(expected);
  });
});

describe('toSearchParams', () => {
  it('omits empty filters and the first page', () => {
    expect(toSearchParams(EMPTY_HAND_RESULT_FILTERS, 0).toString()).toBe('');
  });

  it('trims values and converts the page to 1-based', () => {
    const params = toSearchParams({ ...EMPTY_HAND_RESULT_FILTERS, handId: '  123 ' }, 4);
    expect(params.get('handId')).toBe('123');
    expect(params.get('page')).toBe('5');
  });

  it('round-trips with the readers', () => {
    const filters = { handId: '1', sessionId: '2', heroCards: 'As Kh', handRank: 'Flush' };
    const params = toSearchParams(filters, 7);
    expect(filtersFromSearchParams(params)).toEqual(filters);
    expect(pageFromSearchParams(params)).toBe(7);
  });
});
