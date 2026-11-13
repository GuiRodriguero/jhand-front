import { createContext } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastContextValue {
  readonly showToast: (message: string, type?: ToastType, ttl?: number) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);
