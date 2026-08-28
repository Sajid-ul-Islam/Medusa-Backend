"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
}

interface ToastContextType {
  toast: (options: { title?: string; message: string; type?: ToastType; duration?: number }) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({
      title,
      message,
      type = "info",
      duration = 3500,
    }: {
      title?: string;
      message: string;
      type?: ToastType;
      duration?: number;
    }) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, message, type }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback((message: string, title?: string) => {
    toast({ message, title, type: "success" });
  }, [toast]);

  const error = useCallback((message: string, title?: string) => {
    toast({ message, title, type: "error" });
  }, [toast]);

  const info = useCallback((message: string, title?: string) => {
    toast({ message, title, type: "info" });
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-lg border transition-all animate-in fade-in slide-in-from-bottom-2 duration-200 ${
              t.type === "success"
                ? "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800"
                : t.type === "error"
                ? "bg-rose-50 text-rose-900 border-rose-200 dark:bg-rose-950 dark:text-rose-100 dark:border-rose-800"
                : "bg-card text-card-foreground border-border"
            }`}
          >
            {t.type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />}
            {t.type === "error" && <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />}
            {t.type === "info" && <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />}
            
            <div className="flex-1">
              {t.title && <div className="font-semibold text-sm">{t.title}</div>}
              <div className="text-sm">{t.message}</div>
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="opacity-70 hover:opacity-100 p-1 transition-opacity"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      toast: () => {},
      success: () => {},
      error: () => {},
      info: () => {},
    };
  }
  return context;
}

