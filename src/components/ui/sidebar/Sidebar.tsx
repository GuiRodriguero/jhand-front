import { Calculator, Settings, Spade, SquareChartGantt } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SidebarLink } from './SidebarLink';

export function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="w-64 h-full bg-surface-dark border-r border-border flex flex-col">
      <div className="flex items-center px-6 py-6 border-b border-border">
        <Link to="/" className="text-xl font-bold text-foreground-strong tracking-wide">
          {t('app.name')}
        </Link>
      </div>

      <nav aria-label={t('sidebar.navigation')} className="flex flex-col flex-1 p-4 gap-1">
        <SidebarLink to="/hand-result" icon={Spade} title={t('sidebar.hands')} />
        <SidebarLink to="/pre-flop-chart" icon={SquareChartGantt} title={t('sidebar.preFlopChart')} />
        <SidebarLink to="/equity-calculator" icon={Calculator} title={t('sidebar.equityCalculator')} />

        <div className="pt-4 border-t border-border mt-auto">
          <SidebarLink to="/settings" icon={Settings} title={t('sidebar.settings')} />
        </div>
      </nav>
    </aside>
  );
}
