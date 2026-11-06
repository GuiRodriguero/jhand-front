import { useTranslation } from 'react-i18next';

export function PreFlopChartView() {
  const { t } = useTranslation();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-100">{t('preFlopChart.title')}</h1>
    </div>
  );
}
