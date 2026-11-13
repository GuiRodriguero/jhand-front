import type { RANKS, SUITS } from './card.constants';

export type Rank = (typeof RANKS)[number];

export type Suit = (typeof SUITS)[number];

export interface ParsedCard {
  readonly rank: Rank;
  readonly suit: Suit;
}
