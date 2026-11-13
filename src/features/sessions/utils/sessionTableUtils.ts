import type { CashSession, TournamentSession } from '../types/session.types';

type SessionCurrency = Pick<CashSession, 'type'> | Pick<TournamentSession, 'type' | 'realMoney'>;

function signOf(value: number) {
  return value > 0 ? '+' : value < 0 ? '-' : '';
}

/**
 * Session amounts are money: dollars for cash games and real-money tournaments, play money (no `$`) otherwise.
 * Tournament *hands* are in chips, but a tournament *session* is prize - buy-in.
 */
function formatAmount(absolute: number, session: SessionCurrency) {
  if (session.type === 'CASH_GAME' || session.realMoney === true) return `$${absolute.toFixed(2)}`;
  return absolute.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

export function formatSessionMoney(value: number | null, session: SessionCurrency) {
  if (value == null) return '-';
  return formatAmount(Math.abs(value), session);
}

export function formatSessionProfit(value: number | null, session: SessionCurrency) {
  if (value == null) return '-';
  return `${signOf(value)}${formatAmount(Math.abs(value), session)}`;
}

const EN_ORDINAL_SUFFIX: Record<Intl.LDMLPluralRule, string> = {
  zero: 'th',
  one: 'st',
  two: 'nd',
  few: 'rd',
  many: 'th',
  other: 'th',
};

export function formatPlacement(position: number | null, language: string) {
  if (position == null) return '-';
  if (language.startsWith('pt')) return `${position}º`;
  const rule = new Intl.PluralRules('en-US', { type: 'ordinal' }).select(position);
  return `${position}${EN_ORDINAL_SUFFIX[rule]}`;
}
