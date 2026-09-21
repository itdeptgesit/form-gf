import React, { useEffect, useRef } from 'react';

export default function AutoTextarea({ value = '', onChange, minRows = 3, maxLength = 3000, className = '', ...props }) {
  const ref = useRef(null);

  const resize = () => {
    const textarea = ref.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 420)}px`;
  };

  useEffect(resize, [value]);

  return (
    <div>
      <textarea
        ref={ref}
        rows={minRows}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        onInput={resize}
        className={`w-full min-h-[96px] bg-wash border border-border rounded-lg px-3.5 py-3 text-ink placeholder-dim focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-sm leading-6 resize-y ${className}`}
        {...props}
      />
      <div className="mt-1 flex justify-between text-[10px] text-dim">
        <span>Textarea membesar otomatis saat diketik</span>
        <span>{value.length.toLocaleString('id-ID')} / {maxLength.toLocaleString('id-ID')}</span>
      </div>
    </div>
  );
}
