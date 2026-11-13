export interface LineChartDomain {
  readonly min: number;
  readonly max: number;
  readonly ticks: readonly number[];
}

function niceStep(rawStep: number) {
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const fraction = rawStep / magnitude;
  const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  return niceFraction * magnitude;
}

export function niceDomain(values: readonly number[], tickCount = 4): LineChartDomain {
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  if (min === max) return { min: 0, max: 1, ticks: [0, 1] };

  const step = niceStep((max - min) / tickCount);
  const niceMin = Math.floor(min / step) * step;
  const niceMax = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let tick = niceMin; tick <= niceMax + step / 2; tick += step) {
    ticks.push(Number(tick.toPrecision(12)));
  }
  return { min: niceMin, max: niceMax, ticks };
}
