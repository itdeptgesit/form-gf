import React from 'react';
import AutoTextarea from '../ui/AutoTextarea';

export default function Page2Section({ enabled, page2Data, onToggle, onChange }) {
  const handleFieldChange = (field, value) => {
    onChange('page2', {
      ...page2Data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4 text-xs pt-3">
      <div className="flex items-center justify-between p-3 bg-wash border border-border rounded-lg">
        <div>
          <div className="text-ink text-[11px] font-medium">Sertakan Halaman 2</div>
          <p className="text-[10px] text-dim mt-0.5">
            Latar Belakang Organisasi & Analisis Kelayakan
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggle('page2Enabled', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-border-strong peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent" />
        </label>
      </div>

      {enabled && (
        <div className="space-y-3">
          {[
            { key: 'who', label: 'Siapa penerima manfaat?', sub: 'Who is the beneficiary?', rows: 2 },
            { key: 'why', label: 'Mengapa membutuhkan bantuan saat ini?', sub: 'Why do they need it now?', rows: 2 },
            { key: 'howMuch', label: 'Berapa banyak dan untuk apa?', sub: 'How much do they need?', rows: 2 },
            { key: 'aidType', label: 'Bentuk bantuan yang relevan', sub: 'Type of aids', rows: 2 },
            { key: 'aidReason', label: 'Mengapa bantuan ini paling sesuai?', sub: 'Why is this most relevant?', rows: 3 },
            { key: 'plan', label: 'Rencana aksi penggunaan bantuan', sub: 'Action plan', rows: 2 },
            { key: 'scheme', label: 'Skema yang direkomendasikan', sub: 'Recommended scheme', rows: 2 },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-dim text-[11px] mb-1 uppercase tracking-wider">
                {f.label} <span className="text-border-strong font-normal normal-case">({f.sub})</span>
              </label>
              <AutoTextarea
                minRows={Math.max(f.rows, 3)}
                maxLength={3000}
                value={page2Data[f.key] || ''}
                onChange={(e) => handleFieldChange(f.key, e.target.value)}
                placeholder={`Tuliskan ${f.label.toLowerCase()} secara jelas...`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
