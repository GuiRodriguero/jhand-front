export type Position = 'BTN' | 'SB' | 'BB' | 'CO' | 'MP' | 'UTG';

export interface HandResult {
  readonly handId: string;
  readonly sessionId: string;
  readonly position: Position | null;
  readonly heroCards: string;
  readonly board: string | null;
  readonly handRank: string | null;
  readonly netProfit: number;
  readonly netProfitInBb: number | null;
  readonly totalPot: number | null;
  readonly date: string;
}

export interface HandResultFiltersValue {
  readonly handId: string;
  readonly sessionId: string;
  readonly heroCards: string;
  readonly handRank: string;
}

export const EMPTY_HAND_RESULT_FILTERS: HandResultFiltersValue = {
  handId: '',
  sessionId: '',
  heroCards: '',
  handRank: '',
};
