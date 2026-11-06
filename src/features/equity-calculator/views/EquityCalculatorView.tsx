import { useTranslation } from 'react-i18next';

export function EquityCalculatorView() {
  const { t } = useTranslation();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-100">{t('equityCalculator.title')}</h1>
    </div>
  );
}
