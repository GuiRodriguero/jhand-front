import { useTranslation } from 'react-i18next';
import { FolderUploadCard } from '../components/FolderUploadCard';

export function SettingsView() {
  const { t } = useTranslation();

  return (
    <div className="p-8 w-full h-full text-gray-100 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('settings.title')}</h1>
        <p className="text-gray-400 mt-1">{t('settings.description')}</p>
      </div>

      <FolderUploadCard />
    </div>
  );
}
