import type { Position } from '@/lib/position';

export interface SessionChartPoint {
  readonly handId: string;
  readonly time: string;
  readonly netProfit: number;
  readonly netProfitInBb: number;
  readonly cumulativeNetProfit: number;
  readonly cumulativeNetProfitInBb: number;
  readonly startingStack: number;
  readonly stackInBb: number;
}

export interface SessionHighlightHand {
  readonly handId: string;
  readonly time: string;
  readonly heroCards: string;
  readonly position: Position;
  readonly handRank: string;
  readonly netProfit: number;
  readonly netProfitInBb: number;
}

export interface SessionPositionResult {
  readonly position: Position;
  readonly hands: number;
  readonly netProfit: number;
  readonly netProfitInBb: number;
}

/**
 * `GET /v1/sessions/{sessionId}/hand-stats`. Amounts are in the hands' unit: dollars for cash, **chips** for
 * tournaments (unlike the tournament session result, which is prize − buy-in).
 */
export interface SessionHandStats {
  readonly points: readonly SessionChartPoint[];
  readonly vpipPercentage: number;
  readonly pfrPercentage: number;
  readonly bbPer100: number;
  readonly bestHand: SessionHighlightHand;
  readonly worstHand: SessionHighlightHand;
  readonly byPosition: readonly SessionPositionResult[];
}
