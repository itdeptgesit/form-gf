import React, { useState } from 'react';
import { ZoomIn, ZoomOut, FileText } from 'lucide-react';
import Page1 from './Page1';
import Page2 from './Page2';

export default function PreviewPanel({ formData, density, previewRef }) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 60));
  const handleZoomReset = () => setZoom(100);

  return (
    <div className="flex flex-col h-full min-h-0 w-full max-w-[1200px] bg-surface border border-border rounded-lg overflow-hidden">
      {/* Top Preview Bar */}
      <div className="no-print flex items-center justify-between px-3 py-2 bg-surface border-b border-border rounded-t-lg text-[11px] text-dim">
        <div className="flex items-center gap-2 font-medium">
          <FileText className="w-3.5 h-3.5 text-ink" />
          <span>Pratinjau Dokumen A4</span>
          <span className="px-2 py-0.5 bg-wash text-dim rounded text-[10px]">
            {formData.page2Enabled ? '2 Halaman' : '1 Halaman'}
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-wash px-1.5 py-0.5 rounded border border-border">
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1 hover:text-ink rounded hover:bg-surface-hover transition-colors"
            title="Perkecil (-10%)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleZoomReset}
            className="px-1.5 py-0.5 font-mono text-[11px] hover:text-ink transition-colors min-w-[36px]"
            title="Reset Zoom ke 100%"
          >
            {zoom}%
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1 hover:text-ink rounded hover:bg-surface-hover transition-colors"
            title="Perbesar (+10%)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preview Scrollable Viewport */}
      <div className="flex-1 min-h-0 overflow-auto p-4 sm:p-6 bg-page flex justify-center items-start">
        <div
          ref={previewRef}
          id="printableArea"
          className={`a4-container density-${density} transition-transform duration-150 origin-top`}
          style={{
            transform: zoom !== 100 ? `scale(${zoom / 100})` : 'none',
            transformOrigin: 'top center'
          }}
        >
          <Page1 data={formData} />
          {formData.page2Enabled && <Page2 data={formData} />}
        </div>
      </div>
    </div>
  );
}
