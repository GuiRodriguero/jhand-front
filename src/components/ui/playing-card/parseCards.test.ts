import { describe, expect, it } from 'vitest';
import { isRank, isSuit, parseCards } from './parseCards';

describe('parseCards', () => {
  it('returns an empty list for empty values', () => {
    expect(parseCards(undefined)).toEqual([]);
    expect(parseCards(null)).toEqual([]);
    expect(parseCards('')).toEqual([]);
    expect(parseCards('   ')).toEqual([]);
  });

  it('parses space separated cards', () => {
    expect(parseCards('As Kh')).toEqual([
      { rank: 'A', suit: 's' },
      { rank: 'K', suit: 'h' },
    ]);
  });

  it('normalizes rank to upper case and suit to lower case', () => {
    expect(parseCards('tc QD')).toEqual([
      { rank: 'T', suit: 'c' },
      { rank: 'Q', suit: 'd' },
    ]);
  });

  it('parses a full board', () => {
    expect(parseCards('2c 7d Th Js Ac')).toHaveLength(5);
  });

  it('ignores invalid tokens', () => {
    expect(parseCards('1s Xx 9z 8h')).toEqual([{ rank: '8', suit: 'h' }]);
  });
});

describe('isRank / isSuit', () => {
  it('validates ranks', () => {
    expect(isRank('A')).toBe(true);
    expect(isRank('a')).toBe(false);
    expect(isRank('1')).toBe(false);
  });

  it('validates suits', () => {
    expect(isSuit('s')).toBe(true);
    expect(isSuit('S')).toBe(false);
    expect(isSuit('x')).toBe(false);
  });
});
