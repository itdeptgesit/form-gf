import React from 'react';
import { RotateCcw, Trash2, Sun, Moon, Monitor } from 'lucide-react';

export default function Header({ density, setDensity, onReset, onClear, theme, onToggleTheme }) {
  return (
    <header className="no-print bg-surface border-b border-border px-4 lg:px-6 py-3 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-sm font-semibold text-ink tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Yayasan Gesit Peduli Bangsa
          </h1>
          <p className="text-[11px] text-dim">Form Permohonan & Beasiswa</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Density Selector */}
          <div className="flex items-center bg-wash rounded-md text-[11px]">
            {[
              { value: 'compact', label: 'Ringkas' },
              { value: 'normal', label: 'Normal' },
              { value: 'spacious', label: 'Longgar' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDensity(opt.value)}
                className={`px-2.5 py-1 rounded-md transition-colors font-medium ${
                  density === opt.value
                    ? 'bg-accent text-accent-text'
                    : 'text-dim hover:text-ink'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-border" />

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1.5 text-dim hover:text-ink transition-colors rounded-md hover:bg-wash"
            title={`Mode: ${theme === 'auto' ? 'Auto' : theme === 'dark' ? 'Gelap' : 'Terang'}`}
          >
            {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : theme === 'light' ? <Sun className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="p-1.5 text-dim hover:text-ink transition-colors rounded-md hover:bg-wash"
            title="Reset ke contoh data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onClear}
            className="p-1.5 text-dim hover:text-danger transition-colors rounded-md hover:bg-wash"
            title="Kosongkan form"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
