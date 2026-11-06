import { useId, type SubmitEvent } from 'react';
import { Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { JHandButton } from '@/components/ui/button/JHandButton';
import { JHandCard } from '@/components/ui/card/JHandCard';
import { JHandInput } from '@/components/ui/text-input/JHandInput';
import type { HandResultFiltersValue } from '../types/handResult.types';
import { HeroCardsFilter } from './HeroCardsFilter';

interface HandResultFiltersProps {
  readonly value: HandResultFiltersValue;
  readonly onChange: (patch: Partial<HandResultFiltersValue>) => void;
  readonly onApply: () => void;
  readonly onClear: () => void;
}

export function HandResultFilters({ value, onChange, onApply, onClear }: HandResultFiltersProps) {
  const { t } = useTranslation();
  const titleId = useId();

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply();
  };

  return (
    <JHandCard>
      <form onSubmit={handleSubmit} className="contents" aria-labelledby={titleId}>
        <div className="flex items-center gap-2 mb-2 text-gray-300">
          <Filter size={16} aria-hidden="true" />
          <h2 id={titleId} className="font-semibold text-sm">
            {t('handResult.filters.title')}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <JHandInput
              label={t('handResult.filters.handId')}
              type="text"
              value={value.handId}
              onChange={(e) => onChange({ handId: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <JHandInput
              label={t('handResult.filters.sessionId')}
              type="text"
              value={value.sessionId}
              onChange={(e) => onChange({ sessionId: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <JHandInput
              label={t('handResult.filters.handRank')}
              type="text"
              value={value.handRank}
              onChange={(e) => onChange({ handRank: e.target.value })}
            />
          </div>
          <HeroCardsFilter value={value.heroCards} onChange={(heroCards) => onChange({ heroCards })} />
        </div>

        <div className="flex justify-end items-center gap-3 mt-2 pt-4 border-t border-border-subtle">
          <JHandButton variant="ghost" onClick={onClear}>
            {t('handResult.filters.button.clear')}
          </JHandButton>
          <JHandButton type="submit">{t('handResult.filters.button.apply')}</JHandButton>
        </div>
      </form>
    </JHandCard>
  );
}
