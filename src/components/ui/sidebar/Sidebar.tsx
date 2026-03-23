import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="w-64 h-full bg-color-surface-dark border-r border-gray-800 flex flex-col">
      <div className="flex items-center justify-between px-6 py-6 border-b border-gray-800/50">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-bold text-white tracking-wide">
            Jhand
          </Link>
        </div>
      </div>

      <div className="p-4 border-t border-gray-800/50 mt-auto">
        <Link
          to="/settings"
          className="flex items-center justify-between px-3 py-3 rounded-lg text-gray-400 hover:bg-surface/50 hover:text-white transition-all duration-200 group"
        >
          <div className="flex items-center gap-4">
            <span className="font-medium text-sm">{t('sidebar.settings')}</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
