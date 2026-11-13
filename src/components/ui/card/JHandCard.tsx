import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface JHandCardProps {
  readonly className?: string;
  readonly children?: ReactNode;
}

export function JHandCard({ className, children }: JHandCardProps) {
  return (
    <div className={cn('bg-surface border border-border p-5 rounded-xl flex flex-col gap-4', className)}>
      {children}
    </div>
  );
}
