import { Filter } from 'lucide-react';
import { JHandInput } from '../../../components/ui/text-input/JHandInput';
import { useTranslation } from 'react-i18next';
import { JHandCard } from '../../../components/ui/card/JHandCard';

interface HandResultFiltersProps {
  handId: string;
  onHandIdChange: (value: string) => void;
  sessionId: string;
  onSessionIdChange: (value: string) => void;
  heroCards: string;
  onHeroCardsChange: (value: string) => void;
  handRank: string;
  onHandRankChange: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export function HandResultFilters({
  handId,
  onHandIdChange,
  sessionId,
  onSessionIdChange,
  heroCards,
  onHeroCardsChange,
  handRank,
  onHandRankChange,
  onApply,
  onClear,
}: HandResultFiltersProps) {
  const { t } = useTranslation();

  return (
    <JHandCard>
      <div className="flex items-center gap-2 mb-2 text-gray-300">
        <Filter size={16} />
        <span className="font-semibold text-sm">{t('handResult.filters.title')}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <JHandInput
          label={t('handResult.filters.handId')}
          type="text"
          value={handId}
          onChange={(e) => onHandIdChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onApply();
          }}
        />
        <JHandInput
          label={t('handResult.filters.sessionId')}
          type="text"
          value={sessionId}
          onChange={(e) => onSessionIdChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onApply();
          }}
        />
        <JHandInput
          label={t('handResult.filters.heroCards')}
          type="text"
          value={heroCards}
          onChange={(e) => onHeroCardsChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onApply();
          }}
        />
        <JHandInput
          label={t('handResult.filters.handRank')}
          type="text"
          value={handRank}
          onChange={(e) => onHandRankChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onApply();
          }}
        />
      </div>

      <div className="flex justify-end items-center gap-3 mt-2 pt-4 border-t border-border-subtle">
        <button
          type="button"
          onClick={onClear}
          className="hover:text-white px-4 py-2 text-sm transition-colors rounded-lg cursor-pointer"
        >
          {t('handResult.filters.button.clear')}
        </button>
        <button
          type="button"
          onClick={onApply}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
        >
          {t('handResult.filters.button.apply')}
        </button>
      </div>
    </JHandCard>
  );
}
