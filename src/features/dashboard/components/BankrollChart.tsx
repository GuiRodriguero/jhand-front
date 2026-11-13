import { useTranslation } from 'react-i18next';

export function BankrollChart() {
  const { t } = useTranslation();

  return <span>{t('dashboard.bankroll.title')}</span>;
}
