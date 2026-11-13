import { useState, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info, X, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';
import { ToastContext, type ToastType } from './ToastContext';

interface Toast {
  readonly id: number;
  readonly message: string;
  readonly type: ToastType;
}

interface ToastProviderProps {
  readonly children: ReactNode;
}

const TOAST_STYLES: Readonly<Record<ToastType, { container: string; icon: LucideIcon; iconColor: string }>> = {
  success: {
    container: 'border-success/50 shadow-success-shadow/20',
    icon: CheckCircle2,
    iconColor: 'text-success-content',
  },
  error: {
    container: 'border-error/50 shadow-error-shadow/20',
    icon: AlertCircle,
    iconColor: 'text-error-content',
  },
  info: {
    container: 'border-info/50 shadow-info-shadow/20',
    icon: Info,
    iconColor: 'text-info-content',
  },
};

let nextToastId = 0;

export function ToastProvider({ children }: ToastProviderProps) {
  const { t } = useTranslation();
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = (message: string, type: ToastType = 'info', ttl = 4000) => {
    const id = nextToastId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), ttl);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <section
        aria-label={t('default.notifications')}
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none"
      >
        {toasts.map((toast) => {
          const style = TOAST_STYLES[toast.type];
          const Icon = style.icon;

          return (
            <div
              key={toast.id}
              role={toast.type === 'error' ? 'alert' : 'status'}
              className={cn(
                'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg bg-surface text-gray-200 w-80 min-h-15',
                style.container,
              )}
            >
              <Icon className={cn('shrink-0', style.iconColor)} size={20} aria-hidden="true" />

              <span className="text-sm font-medium flex-1">{toast.message}</span>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                aria-label={t('default.close')}
                className="text-foreground-muted hover:text-gray-300 transition-colors shrink-0 cursor-pointer"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </section>
    </ToastContext.Provider>
  );
}
