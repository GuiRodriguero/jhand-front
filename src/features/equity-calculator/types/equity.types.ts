export interface EquityRequest {
  readonly heroCards: string;
  readonly villainCards: string;
  readonly board: string;
}

export interface EquityResult {
  readonly heroEquity: number;
  readonly villainEquity: number;
  readonly tieProbability: number;
  readonly totalScenarios: number;
}
