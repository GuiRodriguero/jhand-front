import type { Suit } from './PlayingCard.tsx';

export interface ParsedCard {
  rank: string;
  suit: Suit;
}

const VALID_SUITS: readonly Suit[] = ['s', 'h', 'c', 'd'];

export function parseCards(value?: string | null): ParsedCard[] {
  if (!value) return [];

  const normalized = value.trim();
  if (!normalized) return [];

  const regex = /([2-9tjqka])([shcd])/gi;
  const cards: ParsedCard[] = [];

  let match: RegExpExecArray | null;
  while ((match = regex.exec(normalized)) !== null) {
    const rank = match[1].toUpperCase();
    const suit = match[2].toLowerCase() as Suit;
    if (VALID_SUITS.includes(suit)) {
      cards.push({ rank, suit });
    }
  }

  return cards;
}
