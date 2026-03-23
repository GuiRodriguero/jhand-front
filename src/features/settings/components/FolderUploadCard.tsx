import { useRef, useState } from 'react';
import { UploadCloud, FolderUp, FileText } from 'lucide-react';
import { useToast } from '../../../components/ui/toast/ToastContext';
import { useTranslation } from 'react-i18next';

export function FolderUploadCard() {
  const { showToast } = useToast();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [txtFiles, setTxtFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleFolderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const allFiles = Array.from(event.target.files);
      const onlyTxt = allFiles.filter((file) => file.name.endsWith('.txt'));

      setTxtFiles(onlyTxt);
    }
  };

  const handleUpload = async () => {
    if (txtFiles.length === 0) return;
    setIsUploading(true);

    const formData = new FormData();
    txtFiles.forEach((file) => {
      formData.append('files', file);
    });

    formData.append('heroName', 'GuiRodri2013');

    try {
      const response = await fetch('http://localhost:8080/v1/hands/import/batch', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        showToast(t('settings.upload.errorToast'), 'error');
        throw new Error(t('settings.upload.errorToast'));
      }

      if (response.status === 204) {
        showToast(t('settings.upload.successToast'), 'success');
        setTxtFiles([]);
      }

      setIsUploading(false);
      setTxtFiles([]);
    } catch (error) {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 w-full max-w-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <UploadCloud className="text-info-content" size={20} />
        </div>
        <h2 className="text-lg font-semibold text-white">{t('settings.upload.title')}</h2>
      </div>

      <p className="text-sm text-gray-400 mb-6 leading-relaxed">{t('settings.upload.description')}</p>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFolderSelect}
        className="hidden"
        multiple
        // @ts-ignore
        webkitdirectory="true"
        directory="true"
      />

      <div className="flex flex-col gap-4">
        <button
          onClick={handleSelectClick}
          className="w-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border hover:border-blue-500/50 bg-surface-light hover:bg-surface-lighter rounded-xl py-10 transition-all cursor-pointer group"
        >
          <FolderUp size={32} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
          <span className="text-sm font-medium text-gray-300">{t('settings.upload.selectFolder')}</span>
        </button>

        {txtFiles.length > 0 && (
          <div className="flex items-center justify-between bg-color-surface-light border border-border rounded-lg p-4 mt-2">
            <div className="flex items-center gap-3">
              <FileText className="text-gray-400" size={18} />
              <span className="text-sm font-medium text-gray-200">
                {t('settings.upload.filesFound', { count: txtFiles.length })}
              </span>
            </div>

            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                isUploading
                  ? 'bg-blue-600/50 text-white/50 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20'
              }`}
            >
              {isUploading ? `${t('settings.upload.btnProcessing')}` : `${t('settings.upload.btnSync')}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
