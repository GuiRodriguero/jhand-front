import { describe, expect, it } from 'vitest';
import type { SessionChartPoint } from '../types/sessionHandStats.types';
import {
  chartValues,
  formatBigBlinds,
  formatDuration,
  formatHandAmount,
  formatPercentage,
  handsPath,
  handsPerHour,
  sessionDetailPath,
  sessionsListPath,
} from './sessionDetailUtils';

const POINT: SessionChartPoint = {
  handId: '1',
  time: '2026-11-03T22:15:51Z',
  netProfit: -40,
  netProfitInBb: -0.13,
  cumulativeNetProfit: -40,
  cumulativeNetProfitInBb: -0.13,
  startingStack: 5000,
  stackInBb: 16.67,
};

const START = '2026-03-22T01:58:42Z';

describe('session paths', () => {
  it('encodes the session id of the detail path', () => {
    expect(sessionDetailPath("HH Piccolo - $0.01-$0.02 Hold'em")).toBe(
      "/sessions/HH%20Piccolo%20-%20%240.01-%240.02%20Hold'em",
    );
  });

  it('keeps the session type on the way back to the list', () => {
    expect(sessionsListPath('TOURNAMENT')).toBe('/sessions?type=TOURNAMENT');
  });

  it('filters the Hands view by session or by hand', () => {
    expect(handsPath('CASH_GAME', { sessionId: 'HH $0.01' })).toBe('/hand-result?type=CASH_GAME&sessionId=HH+%240.01');
    expect(handsPath('TOURNAMENT', { handId: '42' })).toBe('/hand-result?type=TOURNAMENT&handId=42');
  });
});

describe('chartValues', () => {
  it.each([
    ['CASH_GAME', 'AMOUNT', -40],
    ['CASH_GAME', 'BIG_BLINDS', -0.13],
    ['TOURNAMENT', 'AMOUNT', 5000],
    ['TOURNAMENT', 'BIG_BLINDS', 16.67],
  ] as const)('plots %s in %s', (type, unit, expected) => {
    expect(chartValues([POINT], type, unit)).toEqual([expected]);
  });
});

describe('formatHandAmount', () => {
  it('formats cash amounts in dollars', () => {
    expect(formatHandAmount(0.41, 'CASH_GAME', true)).toBe('+$0.41');
  });

  it('formats tournament amounts in chips', () => {
    expect(formatHandAmount(-482182, 'TOURNAMENT', true)).toBe('-482,182');
  });

  it('only shows the minus sign when unsigned', () => {
    expect(formatHandAmount(5000, 'TOURNAMENT', false)).toBe('5,000');
  });
});

describe('formatBigBlinds', () => {
  it('signs a result', () => {
    expect(formatBigBlinds(43.27, true)).toBe('+43.27 BB');
  });

  it('does not sign a stack', () => {
    expect(formatBigBlinds(16.67, false)).toBe('16.67 BB');
  });
});

describe('formatPercentage', () => {
  it('keeps one decimal', () => {
    expect(formatPercentage(33.9)).toBe('33.9%');
  });
});

describe('formatDuration', () => {
  it('returns a dash without both times', () => {
    expect(formatDuration(START, null)).toBe('-');
  });

  it('formats less than an hour in minutes', () => {
    expect(formatDuration(START, '2026-03-22T02:43:42Z')).toBe('45min');
  });

  it('formats hours and padded minutes', () => {
    expect(formatDuration(START, '2026-03-22T03:03:42Z')).toBe('1h 05min');
  });
});

describe('handsPerHour', () => {
  it('scales the hand count to one hour', () => {
    expect(handsPerHour(116, START, '2026-03-22T03:17:20Z')).toBe(88);
  });

  it('returns null for a session without duration', () => {
    expect(handsPerHour(1, START, START)).toBeNull();
  });
});
