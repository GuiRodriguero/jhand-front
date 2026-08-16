import { Filter } from 'lucide-react';
import { JHandInput } from '../../../components/ui/text-input/JHandInput';
import { useTranslation } from 'react-i18next';
import { JHandCard } from '../../../components/ui/card/JHandCard';

export function HandResultFilters() {
  const { t } = useTranslation();

  return (
    <JHandCard>
      <div className="flex items-center gap-2 mb-2 text-gray-300">
        <Filter size={16} />
        <span className="font-semibold text-sm">{t('handResult.filters.title')}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <JHandInput label={t('handResult.filters.handId')} type="text" />
      </div>

      <div className="flex justify-end items-center gap-3 mt-2 pt-4 border-t border-border-subtle">
        <button
          type="button"
          className="hover:text-white px-4 py-2 text-sm transition-colors rounded-lg cursor-pointer"
        >
          {t('handResult.filters.button.clear')}
        </button>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
        >
          {t('handResult.filters.button.apply')}
        </button>
      </div>
    </JHandCard>
  );
}
