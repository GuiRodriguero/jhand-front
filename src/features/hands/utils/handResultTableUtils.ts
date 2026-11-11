export function formatBigBlinds(value: number | null) {
  if (value == null) return '-';
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${Math.abs(value).toFixed(2)} BB`;
}
