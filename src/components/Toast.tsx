"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";

type ToastType = "success" | "error" | "info";
interface Toast { id: string; message: string; type: ToastType; }

const ToastContext = createContext<{ show: (message: string, type?: ToastType) => void }>({ show: () => {} });

export function useToast() { return useContext(ToastContext); }

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
    info: <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />,
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="toast-enter pointer-events-auto flex items-center gap-3 bg-white border border-slate-200 rounded-xl shadow-xl px-4 py-3 min-w-[260px] max-w-sm">
            {icons[t.type]}
            <p className="text-sm font-medium text-slate-800 flex-1">{t.message}</p>
            <button onClick={() => setToasts(ts => ts.filter(x => x.id !== t.id))} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
