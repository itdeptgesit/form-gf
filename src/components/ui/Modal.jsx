import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, title, message, confirmText = 'Konfirmasi', confirmColor = 'bg-danger hover:opacity-90', onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-page/80 animate-in fade-in duration-150">
      <div className="bg-surface border border-border rounded-lg max-w-sm w-full p-5 shadow-[var(--shadow)] space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
          <button
            onClick={onCancel}
            className="text-dim hover:text-ink p-0.5 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[13px] text-dim leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 text-[13px] font-medium text-dim hover:text-ink border border-border rounded-md transition"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-3 py-1.5 text-[13px] font-medium text-white rounded-md transition ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
