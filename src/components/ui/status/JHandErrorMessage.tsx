import { AlertCircle } from 'lucide-react';

interface JHandErrorMessageProps {
  readonly message: string;
}

export function JHandErrorMessage({ message }: JHandErrorMessageProps) {
  return (
    <div role="alert" className="p-12 text-center text-error-content flex items-center justify-center gap-2">
      <AlertCircle size={18} aria-hidden="true" />
      {message}
    </div>
  );
}
