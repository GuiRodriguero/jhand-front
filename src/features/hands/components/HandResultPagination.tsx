import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { JHandButton } from '@/components/ui/button/JHandButton';

interface HandResultPaginationProps {
  readonly page: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
  readonly isLoading?: boolean;
}

export function HandResultPagination({ page, totalPages, onPageChange, isLoading }: HandResultPaginationProps) {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  const isFirst = page <= 0;
  const isLast = page >= totalPages - 1;

  return (
    <nav
      aria-label={t('handResult.pagination.label')}
      className="flex items-center justify-end gap-3 text-sm text-gray-400"
    >
      <JHandButton
        variant="outline"
        disabled={isFirst || isLoading}
        onClick={() => onPageChange(page - 1)}
        aria-label={t('handResult.pagination.previous')}
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </JHandButton>

      <span className="tabular-nums">
        {page + 1} / {totalPages}
      </span>

      <JHandButton
        variant="outline"
        disabled={isLast || isLoading}
        onClick={() => onPageChange(page + 1)}
        aria-label={t('handResult.pagination.next')}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </JHandButton>
    </nav>
  );
}
