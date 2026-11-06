import { RANKS, SUITS } from './card.constants';
import type { ParsedCard, Rank, Suit } from './card.types';

export function isRank(value: string): value is Rank {
  return (RANKS as readonly string[]).includes(value);
}

export function isSuit(value: string): value is Suit {
  return (SUITS as readonly string[]).includes(value);
}

export function parseCards(value?: string | null): ParsedCard[] {
  if (!value) return [];

  const regex = /([2-9tjqka])([shcd])/gi;
  const cards: ParsedCard[] = [];

  for (const match of value.matchAll(regex)) {
    const rank = match[1].toUpperCase();
    const suit = match[2].toLowerCase();
    if (isRank(rank) && isSuit(suit)) {
      cards.push({ rank, suit });
    }
  }

  return cards;
}
