import { describe, expect, it } from 'vitest';
import { formatPlacement, formatSessionMoney, formatSessionProfit } from './sessionTableUtils';

const CASH = { type: 'CASH_GAME' } as const;
const REAL_MONEY_TOURNAMENT = { type: 'TOURNAMENT', realMoney: true } as const;
const PLAY_MONEY_TOURNAMENT = { type: 'TOURNAMENT', realMoney: false } as const;

describe('formatSessionProfit', () => {
  it('returns a dash when value is missing', () => {
    expect(formatSessionProfit(null, CASH)).toBe('-');
  });

  it.each([
    [12.345, '+$12.35'],
    [-3.5, '-$3.50'],
    [0, '$0.00'],
  ])('formats cash game %d as %s', (value, expected) => {
    expect(formatSessionProfit(value, CASH)).toBe(expected);
  });

  it.each([
    [5.17, '+$5.17'],
    [-1, '-$1.00'],
  ])('formats real-money tournament %d as %s', (value, expected) => {
    expect(formatSessionProfit(value, REAL_MONEY_TOURNAMENT)).toBe(expected);
  });

  it.each([
    [128000, '+128,000'],
    [-25000, '-25,000'],
    [3687.5, '+3,687.5'],
    [0, '0'],
  ])('formats play-money tournament %d as %s', (value, expected) => {
    expect(formatSessionProfit(value, PLAY_MONEY_TOURNAMENT)).toBe(expected);
  });
});

describe('formatSessionMoney', () => {
  it('returns a dash when value is missing', () => {
    expect(formatSessionMoney(null, REAL_MONEY_TOURNAMENT)).toBe('-');
  });

  it('formats the cash big blind in dollars', () => {
    expect(formatSessionMoney(0.02, CASH)).toBe('$0.02');
  });

  it('formats without sign', () => {
    expect(formatSessionMoney(0.5, REAL_MONEY_TOURNAMENT)).toBe('$0.50');
    expect(formatSessionMoney(25000, PLAY_MONEY_TOURNAMENT)).toBe('25,000');
  });
});

describe('formatPlacement', () => {
  it('returns a dash when position is missing', () => {
    expect(formatPlacement(null, 'en')).toBe('-');
  });

  it.each([
    [1, '1st'],
    [2, '2nd'],
    [3, '3rd'],
    [4, '4th'],
    [11, '11th'],
    [21, '21st'],
    [236, '236th'],
  ])('formats %i in English as %s', (position, expected) => {
    expect(formatPlacement(position, 'en')).toBe(expected);
  });

  it('formats in Portuguese with the ordinal indicator', () => {
    expect(formatPlacement(2, 'pt')).toBe('2º');
    expect(formatPlacement(236, 'pt-BR')).toBe('236º');
  });
});
