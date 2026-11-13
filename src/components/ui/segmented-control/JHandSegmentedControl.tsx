import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface JHandSegmentedControlOption<T extends string> {
  readonly value: T;
  readonly label: string;
  readonly icon?: LucideIcon;
}

interface JHandSegmentedControlProps<T extends string> {
  readonly options: readonly JHandSegmentedControlOption<T>[];
  readonly value: T;
  readonly onChange: (value: T) => void;
  readonly ariaLabel: string;
  readonly className?: string;
}

export function JHandSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: JHandSegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn('inline-flex items-center gap-1 rounded-lg border border-border bg-surface-dark p-1', className)}
    >
      {options.map(({ value: optionValue, label, icon: Icon }) => {
        const isSelected = optionValue === value;
        return (
          <button
            key={optionValue}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(optionValue)}
            className={cn(
              'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring',
              isSelected
                ? 'bg-surface-light text-foreground-strong'
                : 'text-foreground-muted hover:text-foreground-strong',
            )}
          >
            {Icon && <Icon size={16} aria-hidden="true" />}
            {label}
          </button>
        );
      })}
    </div>
  );
}
