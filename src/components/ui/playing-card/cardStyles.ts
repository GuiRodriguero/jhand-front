import type { Suit } from './card.types';

export const SUIT_SYMBOL: Readonly<Record<Suit, string>> = {
  s: '♠',
  h: '♥',
  c: '♣',
  d: '♦',
};

export const SUIT_COLOR: Readonly<Record<Suit, string>> = {
  s: 'text-card-black',
  c: 'text-card-black',
  h: 'text-card-red',
  d: 'text-card-red',
};
