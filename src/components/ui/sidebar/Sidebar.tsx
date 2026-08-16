import { Settings, Spade, SquareChartGantt } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SidebarLink } from './SidebarLink';

export function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="w-64 h-full bg-color-surface-dark border-r border-border flex flex-col">
      <div className="flex items-center justify-between px-6 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-bold text-white tracking-wide">
            JHand
          </Link>
        </div>
      </div>

      <SidebarLink to="/hand-result" icon={Spade} title={t('sidebar.hands')} />
      <SidebarLink to="/pre-flop-chart" icon={SquareChartGantt} title={t('sidebar.preFlopChart')} />

      <div className="p-4 border-t border-border mt-auto">
        <SidebarLink to="/settings" icon={Settings} title={t('sidebar.settings')} />
      </div>
    </aside>
  );
}
