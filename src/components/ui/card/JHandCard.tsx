import type { ReactNode } from 'react';

interface JHandCardProps {
  readonly className?: string;
  readonly children?: ReactNode;
}

export function JHandCard({ className, children }: JHandCardProps) {
  return (
    <div className={`${className} bg-surface border border-border p-5 rounded-xl flex flex-col gap-4`}>{children}</div>
  );
}
