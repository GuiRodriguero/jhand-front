import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { JHandButton } from '@/components/ui/button/JHandButton';

interface JHandPaginationProps {
  readonly page: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
  readonly isLoading?: boolean;
}

export function JHandPagination({ page, totalPages, onPageChange, isLoading }: JHandPaginationProps) {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  const isFirst = page <= 0;
  const isLast = page >= totalPages - 1;

  return (
    <nav
      aria-label={t('default.pagination.label')}
      className="flex items-center justify-end gap-3 text-sm text-gray-400"
    >
      <JHandButton
        variant="outline"
        disabled={isFirst || isLoading}
        onClick={() => onPageChange(page - 1)}
        aria-label={t('default.pagination.previous')}
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
        aria-label={t('default.pagination.next')}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </JHandButton>
    </nav>
  );
}
