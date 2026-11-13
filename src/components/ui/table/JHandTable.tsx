import type { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { JHandCard } from '@/components/ui/card/JHandCard';
import { cn } from '@/lib/cn';

interface JHandTableProps {
  readonly header: ReactNode;
  readonly children: ReactNode;
  readonly isLoading: boolean;
  readonly isRefreshing?: boolean;
  readonly isError: boolean;
  readonly isEmpty: boolean;
}

export function JHandTable({ header, children, isLoading, isRefreshing = false, isError, isEmpty }: JHandTableProps) {
  const { t } = useTranslation();

  return (
    <JHandCard className="h-full overflow-hidden custom-scrollbar">
      <div className="overflow-auto flex-1">
        <table
          className={cn('w-full text-left border-collapse transition-opacity', isRefreshing && 'opacity-50')}
          aria-busy={isLoading || isRefreshing}
        >
          <thead className="sticky top-0 bg-surface border-b border-border z-10">
            <tr className="text-xs uppercase tracking-wider">{header}</tr>
          </thead>
          <tbody className="text-sm whitespace-nowrap">{children}</tbody>
        </table>

        {isLoading && (
          <div role="status" className="p-8 text-center text-foreground-muted flex items-center justify-center gap-3">
            <div
              aria-hidden="true"
              className="w-5 h-5 border-2 border-primary-ring border-t-transparent rounded-full animate-spin"
            />
            {t('default.loading')}
          </div>
        )}

        {!isLoading && isError && (
          <div role="alert" className="p-12 text-center text-error-content flex items-center justify-center gap-2">
            <AlertCircle size={18} aria-hidden="true" />
            {t('default.errorResult')}
          </div>
        )}

        {!isLoading && !isError && isEmpty && (
          <div className="p-12 text-center text-foreground-muted">{t('default.emptyResult')}</div>
        )}
      </div>
    </JHandCard>
  );
}
