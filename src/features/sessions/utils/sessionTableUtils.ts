import type { SessionType } from '@/lib/sessionType';

function signOf(value: number) {
  return value > 0 ? '+' : value < 0 ? '-' : '';
}

/**
 * Cash game amounts are dollars; tournament amounts are chips. They must never be shown in the same unit.
 */
export function formatSessionProfit(value: number | null, type: SessionType | null) {
  if (value == null || type == null) return '-';
  const sign = signOf(value);
  const absolute = Math.abs(value);

  if (type === 'CASH_GAME') return `${sign}$${absolute.toFixed(2)}`;
  return `${sign}${Math.round(absolute).toLocaleString('en-US')}`;
}
