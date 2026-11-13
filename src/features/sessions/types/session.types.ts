interface BasePokerSession {
  readonly sessionId: string;
  readonly handCount: number | null;
  readonly startTime: string | null;
  readonly endTime: string | null;
  readonly netProfit: number | null;
}

export interface CashSession extends BasePokerSession {
  readonly type: 'CASH_GAME';
  readonly bigBlind: number | null;
}

export interface TournamentSession extends BasePokerSession {
  readonly type: 'TOURNAMENT';
  readonly buyIn: number | null;
  readonly prize: number | null;
  readonly finishPosition: number | null;
  readonly realMoney: boolean | null;
}

export type PokerSession = CashSession | TournamentSession;
