import { describe, expect, it } from 'vitest';
import { formatSessionProfit } from './sessionTableUtils';

describe('formatSessionProfit', () => {
  it('returns a dash when value or type is missing', () => {
    expect(formatSessionProfit(null, 'CASH_GAME')).toBe('-');
    expect(formatSessionProfit(10, null)).toBe('-');
  });

  it.each([
    [12.345, '+$12.35'],
    [-3.5, '-$3.50'],
    [0, '$0.00'],
  ])('formats cash game %d as %s', (value, expected) => {
    expect(formatSessionProfit(value, 'CASH_GAME')).toBe(expected);
  });

  it.each([
    [1250, '+1,250'],
    [-480.6, '-481'],
    [0, '0'],
  ])('formats tournament chips %d as %s', (value, expected) => {
    expect(formatSessionProfit(value, 'TOURNAMENT')).toBe(expected);
  });
});
