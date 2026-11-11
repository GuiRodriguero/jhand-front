import { describe, expect, it } from 'vitest';
import { DEFAULT_SESSION_TYPE, sessionTypeFromSearchParams } from './sessionType';

describe('sessionTypeFromSearchParams', () => {
  it.each([
    ['type=CASH_GAME', 'CASH_GAME'],
    ['type=TOURNAMENT', 'TOURNAMENT'],
  ])('"%s" → %s', (query, expected) => {
    expect(sessionTypeFromSearchParams(new URLSearchParams(query))).toBe(expected);
  });

  it.each(['', 'type=', 'type=tournament', 'type=FOO'])('falls back to the default for "%s"', (query) => {
    expect(sessionTypeFromSearchParams(new URLSearchParams(query))).toBe(DEFAULT_SESSION_TYPE);
  });
});
