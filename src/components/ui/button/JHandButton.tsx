import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type JHandButtonVariant = 'primary' | 'ghost' | 'outline';

export interface JHandButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: JHandButtonVariant;
}

const VARIANT_STYLES: Readonly<Record<JHandButtonVariant, string>> = {
  primary: 'bg-primary hover:bg-primary-hover text-foreground-strong px-6 py-2 font-medium shadow-lg shadow-primary/20',
  ghost: 'hover:text-foreground-strong px-4 py-2',
  outline: 'border border-border px-3 py-2 hover:text-foreground-strong hover:bg-surface-light/50',
};

export function JHandButton({ variant = 'primary', type = 'button', className, ...props }: JHandButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg text-sm transition-colors cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        VARIANT_STYLES[variant],
        className,
      )}
      {...props}
    />
  );
}
