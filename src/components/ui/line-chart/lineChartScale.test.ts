import { describe, expect, it } from 'vitest';
import { niceDomain } from './lineChartScale';

describe('niceDomain', () => {
  it('rounds a line that crosses zero to nice ticks around it', () => {
    expect(niceDomain([-0.4, 1.3, 0.6])).toEqual({ min: -0.5, max: 1.5, ticks: [-0.5, 0, 0.5, 1, 1.5] });
  });

  it('keeps zero inside the domain of a positive line', () => {
    expect(niceDomain([5000, 336096, 180830])).toEqual({
      min: 0,
      max: 400000,
      ticks: [0, 100000, 200000, 300000, 400000],
    });
  });

  it('falls back to 0..1 when every value is zero', () => {
    expect(niceDomain([0, 0])).toEqual({ min: 0, max: 1, ticks: [0, 1] });
  });
});
