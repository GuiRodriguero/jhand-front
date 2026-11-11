import { describe, expect, it } from 'vitest';
import { formatBigBlinds } from './handResultTableUtils';

describe('formatBigBlinds', () => {
  it('returns a dash when value is null', () => {
    expect(formatBigBlinds(null)).toBe('-');
  });

  it('formats zero without sign', () => {
    expect(formatBigBlinds(0)).toBe('0.00 BB');
  });

  it('prefixes positive values with plus sign', () => {
    expect(formatBigBlinds(12.5)).toBe('+12.50 BB');
  });

  it('prefixes negative values with minus sign', () => {
    expect(formatBigBlinds(-3.25)).toBe('-3.25 BB');
  });

  it('rounds to two decimal places', () => {
    expect(formatBigBlinds(1.236)).toBe('+1.24 BB');
    expect(formatBigBlinds(-1.236)).toBe('-1.24 BB');
  });
});
