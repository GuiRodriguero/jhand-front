import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface JHandInputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label?: string;
}

export const JHandInput = forwardRef<HTMLInputElement, JHandInputProps>(({ className, label, id, ...props }, ref) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-400 ml-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          'bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground-strong placeholder:text-foreground-muted focus:border-primary-ring focus:ring-1 focus:ring-primary-ring outline-none transition-all w-full',
          className,
        )}
        {...props}
      />
    </div>
  );
});

JHandInput.displayName = 'JHandInput';
