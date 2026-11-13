import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface StatCardProps {
  readonly title: string;
  readonly value: string | number;
  readonly icon?: ReactNode;
  readonly valueClassName?: string;
}

export function StatCard({ title, value, icon, valueClassName }: StatCardProps) {
  return (
    <div className="bg-surface-lighter rounded-lg p-6 flex flex-col gap-2 shadow-md">
      <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
        {icon}
        <span>{title}</span>
      </div>
      <div className={cn('text-3xl font-bold font-mono text-foreground-strong', valueClassName)}>{value}</div>
    </div>
  );
}
