import { useTranslation } from 'react-i18next';

export function JHandLoading() {
  const { t } = useTranslation();

  return (
    <div role="status" className="p-8 text-center text-foreground-muted flex items-center justify-center gap-3">
      <div
        aria-hidden="true"
        className="w-5 h-5 border-2 border-primary-ring border-t-transparent rounded-full animate-spin"
      />
      {t('default.loading')}
    </div>
  );
}
