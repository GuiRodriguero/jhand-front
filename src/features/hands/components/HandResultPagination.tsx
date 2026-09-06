import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HandResultPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function HandResultPagination({ page, totalPages, onPageChange, isLoading }: HandResultPaginationProps) {
  if (totalPages <= 1) return null;

  const isFirst = page <= 0;
  const isLast = page >= totalPages - 1;

  return (
    <div className="flex items-center justify-end gap-3 text-sm text-gray-400">
      <button
        type="button"
        disabled={isFirst || isLoading}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border transition-colors hover:text-white hover:bg-surface-light/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronLeft size={16} />
      </button>

      <span className="tabular-nums">
        {page + 1} / {totalPages}
      </span>

      <button
        type="button"
        disabled={isLast || isLoading}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border transition-colors hover:text-white hover:bg-surface-light/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
