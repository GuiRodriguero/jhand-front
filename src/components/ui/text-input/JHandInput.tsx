import { forwardRef, type InputHTMLAttributes } from 'react';

export interface JHandInputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label?: string;
}

export const JHandInput = forwardRef<HTMLInputElement, JHandInputProps>(
  ({ className = '', label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>}
        <input
          ref={ref}
          className={`bg-background border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all w-full ${className}`}
          {...props}
        />
      </div>
    );
  },
);
