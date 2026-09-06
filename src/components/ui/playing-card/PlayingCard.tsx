export type Suit = 's' | 'h' | 'c' | 'd';
export type PlayingCardSize = 'sm' | 'lg';

interface JHandPlayingCardProps {
  readonly rank: string;
  readonly suit: Suit;
  readonly size?: PlayingCardSize;
  readonly className?: string;
}

const SUIT_SYMBOL: Record<Suit, string> = {
  s: '♠',
  h: '♥',
  c: '♣',
  d: '♦',
};

const SUIT_COLOR: Record<Suit, string> = {
  s: 'text-gray-900',
  c: 'text-gray-900',
  h: 'text-red-600',
  d: 'text-red-600',
};

const SIZE_STYLES: Record<PlayingCardSize, { container: string; rank: string; suit: string }> = {
  sm: {
    container: 'w-7 h-10 rounded-md',
    rank: 'text-s',
    suit: 'text-s',
  },
  lg: {
    container: 'w-16 h-24 rounded-lg',
    rank: 'text-2xl',
    suit: 'text-2xl',
  },
};

export function PlayingCard({ rank, suit, size = 'sm', className = '' }: JHandPlayingCardProps) {
  const sizeStyle = SIZE_STYLES[size];
  const color = SUIT_COLOR[suit];

  return (
    <div
      className={`inline-flex flex-col items-center justify-center bg-white shadow-sm leading-none ${sizeStyle.container} ${color} ${className}`}
    >
      <span className={`font-bold ${sizeStyle.rank}`}>{rank}</span>
      <span className={sizeStyle.suit}>{SUIT_SYMBOL[suit]}</span>
    </div>
  );
}
