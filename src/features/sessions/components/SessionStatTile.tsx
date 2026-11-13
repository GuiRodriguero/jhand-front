import { cn } from '@/lib/cn';

interface SessionStatTileProps {
  readonly label: string;
  readonly value: string;
  readonly signedValue?: number | null;
}

export function SessionStatTile({ label, value, signedValue }: SessionStatTileProps) {
  return (
    <div className="bg-surface border border-border rounded-xl px-5 py-4 flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wider text-foreground-muted">{label}</span>
      <span
        className={cn(
          'text-2xl font-bold tabular-nums text-foreground-strong',
          (signedValue ?? 0) > 0 && 'text-success-content',
          (signedValue ?? 0) < 0 && 'text-error-content',
        )}
      >
        {value}
      </span>
    </div>
  );
}
