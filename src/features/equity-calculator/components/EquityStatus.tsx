import { AlertCircle, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { EquityResult } from '../types/equity.types';

interface EquityStatusProps {
  readonly hasBothHands: boolean;
  readonly isBoardValid: boolean;
  readonly isPreFlop: boolean;
  readonly isFetching: boolean;
  readonly isError: boolean;
  readonly result: EquityResult | undefined;
}

export function EquityStatus({
  hasBothHands,
  isBoardValid,
  isPreFlop,
  isFetching,
  isError,
  result,
}: EquityStatusProps) {
  const { t, i18n } = useTranslation();
  const percent = new Intl.NumberFormat(i18n.language, { style: 'percent', maximumFractionDigits: 1 });
  const integer = new Intl.NumberFormat(i18n.language);

  if (!hasBothHands || !isBoardValid) {
    return (
      <p className="flex items-center gap-2 text-sm text-foreground-muted">
        <Info size={16} aria-hidden="true" />
        {hasBothHands ? t('equityCalculator.invalidBoard') : t('equityCalculator.incomplete')}
      </p>
    );
  }

  if (isError) {
    return (
      <p role="alert" className="flex items-center gap-2 text-sm text-error-content">
        <AlertCircle size={16} aria-hidden="true" />
        {t('equityCalculator.error')}
      </p>
    );
  }

  return (
    <div role="status" className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
      {isFetching && <span className="text-primary-content">{t('equityCalculator.calculating')}</span>}
      {result && (
        <>
          <span>
            {t('equityCalculator.tie')}:{' '}
            <strong className="text-foreground-strong">{percent.format(result.tieProbability)}</strong>
          </span>
          <span className="text-foreground-muted">
            {t('equityCalculator.scenarios', { total: integer.format(result.totalScenarios) })}
          </span>
        </>
      )}
      {isPreFlop && <span className="text-foreground-muted">{t('equityCalculator.monteCarlo')}</span>}
    </div>
  );
}
