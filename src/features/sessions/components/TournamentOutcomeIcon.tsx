import { Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { TournamentOutcome } from '../types/session.types';

type TrophyOutcome = Extract<TournamentOutcome, 'WINNER' | 'IN_THE_MONEY'>;

interface TournamentOutcomeIconProps {
  readonly outcome: TournamentOutcome;
  readonly size?: number;
}

const TROPHY_STYLES: Readonly<Record<TrophyOutcome, string>> = {
  WINNER: 'text-trophy-gold fill-trophy-gold',
  IN_THE_MONEY: 'text-trophy-silver',
};

function hasTrophy(outcome: TournamentOutcome): outcome is TrophyOutcome {
  return outcome === 'WINNER' || outcome === 'IN_THE_MONEY';
}

export function TournamentOutcomeIcon({ outcome, size = 16 }: TournamentOutcomeIconProps) {
  const { t } = useTranslation();
  if (!hasTrophy(outcome)) return null;

  const label = t(`sessions.outcome.${outcome}`);

  return (
    <span role="img" aria-label={label} title={label} className="inline-flex shrink-0">
      <Trophy size={size} aria-hidden="true" className={TROPHY_STYLES[outcome]} />
    </span>
  );
}
