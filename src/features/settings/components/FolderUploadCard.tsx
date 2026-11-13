import { useId, useRef, useState, type ChangeEvent } from 'react';
import { FileText, FolderUp, UploadCloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { JHandButton } from '@/components/ui/button/JHandButton';
import { useToast } from '@/components/ui/toast/useToast';
import { useImportBatchMutation } from '../hooks/useImportBatchMutation';

export function FolderUploadCard() {
  const { showToast } = useToast();
  const { t } = useTranslation();
  const titleId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [txtFiles, setTxtFiles] = useState<File[]>([]);
  const importBatch = useImportBatchMutation();

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleFolderSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const allFiles = Array.from(event.target.files);
      setTxtFiles(allFiles.filter((file) => file.name.endsWith('.txt')));
    }
  };

  const handleUpload = () => {
    if (txtFiles.length === 0) return;

    importBatch.mutate(
      { files: txtFiles, heroName: 'GuiRodri2013' },
      {
        onSuccess: () => {
          showToast(t('settings.upload.successToast'), 'success');
          setTxtFiles([]);
        },
        onError: () => showToast(t('settings.upload.errorToast'), 'error'),
      },
    );
  };

  return (
    <section
      aria-labelledby={titleId}
      className="bg-surface rounded-xl border border-border p-6 w-full max-w-2xl shadow-lg"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-info/10 rounded-lg">
          <UploadCloud className="text-info-content" size={20} aria-hidden="true" />
        </div>
        <h2 id={titleId} className="text-lg font-semibold text-foreground-strong">
          {t('settings.upload.title')}
        </h2>
      </div>

      <p className="text-sm text-gray-400 mb-6 leading-relaxed">{t('settings.upload.description')}</p>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFolderSelect}
        className="hidden"
        multiple
        webkitdirectory="true"
        directory="true"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={handleSelectClick}
          className="w-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border hover:border-primary-ring/50 bg-surface-light hover:bg-surface-lighter rounded-xl py-10 transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring"
        >
          <FolderUp
            size={32}
            className="text-foreground-muted group-hover:text-primary-content transition-colors"
            aria-hidden="true"
          />
          <span className="text-sm font-medium text-gray-300">{t('settings.upload.selectFolder')}</span>
        </button>

        {txtFiles.length > 0 && (
          <div className="flex items-center justify-between bg-surface-light border border-border rounded-lg p-4 mt-2">
            <div className="flex items-center gap-3" role="status">
              <FileText className="text-gray-400" size={18} aria-hidden="true" />
              <span className="text-sm font-medium text-gray-200">
                {t('settings.upload.filesFound', { count: txtFiles.length })}
              </span>
            </div>

            <JHandButton onClick={handleUpload} disabled={importBatch.isPending} className="font-bold">
              {importBatch.isPending ? t('settings.upload.btnProcessing') : t('settings.upload.btnSync')}
            </JHandButton>
          </div>
        )}
      </div>
    </section>
  );
}
