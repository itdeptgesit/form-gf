import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border border-border rounded-lg text-ink text-[13px] shadow-[var(--shadow)]">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
          toast.type === 'success' ? 'bg-[#16a34a]' :
          toast.type === 'error' ? 'bg-danger' :
          toast.type === 'warning' ? 'bg-[#d97706]' :
          'bg-dim'
        }`} />
        <p className="flex-1 font-medium">{toast.message}</p>
        <button
          onClick={onClose}
          className="p-1 text-dim hover:text-ink rounded transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
