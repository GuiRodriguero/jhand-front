import type { SessionType } from '@/lib/sessionType';

export interface PokerSession {
  readonly sessionId: string;
  readonly type: SessionType | null;
  readonly handCount: number | null;
  readonly startTime: string | null;
  readonly netProfit: number | null;
}
