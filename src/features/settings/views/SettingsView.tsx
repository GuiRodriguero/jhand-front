import { FolderUploadCard } from '../components/FolderUploadCard';

export function SettingsView() {
  return (
    <div className="p-8 w-full h-full text-gray-100 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your integrations and local application preferences.</p>
      </div>

      <FolderUploadCard />
    </div>
  );
}
