import { useTranslation } from 'react-i18next';
import { StatCard } from '../components/StatCard';

export function DashboardView() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 p-8 w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title={t('dashboard.stats.vpip')} value="123" />
        <StatCard title={t('dashboard.stats.pfr')} value="123" valueClassName="text-success-content" />
        <StatCard title={t('dashboard.stats.totalHands')} value="123" />
        <StatCard title={t('dashboard.stats.netProfit')} value="123" />
      </div>
    </div>
  );
}
