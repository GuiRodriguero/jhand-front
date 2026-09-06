export type HandResult = {
  handId: string;
  sessionId: string;
  heroCards: string;
  board: string;
  handRank: string;
  netProfit: number;
  date: string;
};

export type HandResultFiltersValue = {
  handId?: string;
  sessionId?: string;
  heroCards?: string;
  handRank?: string;
};

export type Page<T> = {
  content: T[];
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
};
