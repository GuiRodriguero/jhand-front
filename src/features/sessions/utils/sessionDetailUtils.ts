import { SESSION_TYPE_PARAM, type SessionType } from '@/lib/sessionType';
import type { SessionChartPoint } from '../types/sessionHandStats.types';

export type SessionChartUnit = 'AMOUNT' | 'BIG_BLINDS';

const MINUTE = 60_000;

function signOf(value: number) {
  return value > 0 ? '+' : value < 0 ? '-' : '';
}

export function sessionDetailPath(sessionId: string) {
  return `/sessions/${encodeURIComponent(sessionId)}`;
}

export function sessionsListPath(type: SessionType) {
  return `/sessions?${SESSION_TYPE_PARAM}=${type}`;
}

export function handsPath(type: SessionType, filter: { readonly handId: string } | { readonly sessionId: string }) {
  return `/hand-result?${new URLSearchParams({ [SESSION_TYPE_PARAM]: type, ...filter }).toString()}`;
}

export function chartValues(points: readonly SessionChartPoint[], type: SessionType, unit: SessionChartUnit) {
  if (type === 'TOURNAMENT') {
    return points.map((point) => (unit === 'AMOUNT' ? point.startingStack : point.stackInBb));
  }
  return points.map((point) => (unit === 'AMOUNT' ? point.cumulativeNetProfit : point.cumulativeNetProfitInBb));
}

export function formatHandAmount(value: number, type: SessionType, signed: boolean) {
  const sign = signed ? signOf(value) : value < 0 ? '-' : '';
  const absolute = Math.abs(value);
  if (type === 'CASH_GAME') return `${sign}$${absolute.toFixed(2)}`;
  return `${sign}${absolute.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

export function formatBigBlinds(value: number, signed: boolean) {
  const sign = signed ? signOf(value) : value < 0 ? '-' : '';
  return `${sign}${Math.abs(value).toFixed(2)} BB`;
}

export function formatPercentage(value: number) {
  return `${value.toFixed(1)}%`;
}

function durationInMinutes(startTime: string | null, endTime: string | null) {
  if (!startTime || !endTime) return null;
  return Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / MINUTE);
}

export function formatDuration(startTime: string | null, endTime: string | null) {
  const minutes = durationInMinutes(startTime, endTime);
  if (minutes == null) return '-';
  if (minutes < 60) return `${minutes}min`;
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}min`;
}

export function handsPerHour(handCount: number | null, startTime: string | null, endTime: string | null) {
  const minutes = durationInMinutes(startTime, endTime);
  if (handCount == null || minutes == null || minutes <= 0) return null;
  return Math.round((handCount * 60) / minutes);
}
