import React from 'react';
import { Upload } from 'lucide-react';

export default function ApplicantSection({ data, onChange }) {
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        onChange('logoUrl', uploadEvent.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 text-xs pt-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-dim text-[11px] mb-1.5 uppercase tracking-wider">
            Logo Yayasan
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={data.logoUrl}
              onChange={(e) => onChange('logoUrl', e.target.value)}
              placeholder="URL atau data:image/..."
              className="flex-1 bg-wash border border-border rounded-md px-2.5 py-1.5 text-ink placeholder-dim focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
            />
            <label className="cursor-pointer px-2.5 py-1.5 bg-wash hover:bg-surface-hover border border-border text-dim hover:text-ink rounded-md transition flex items-center gap-1 shrink-0" title="Upload gambar logo">
              <Upload className="w-3 h-3" />
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-dim text-[11px] mb-1.5 uppercase tracking-wider">
            Nama Program
          </label>
          <input
            type="text"
            value={data.programName}
            onChange={(e) => onChange('programName', e.target.value)}
            placeholder="Pendidikan"
            className="w-full bg-wash border border-border rounded-md px-2.5 py-1.5 text-ink placeholder-dim focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-dim text-[11px] mb-1.5 uppercase tracking-wider">
            Penerima Manfaat
          </label>
          <input
            type="text"
            value={data.forWho}
            onChange={(e) => onChange('forWho', e.target.value)}
            placeholder="Nama penerima manfaat"
            className="w-full bg-wash border border-border rounded-md px-2.5 py-1.5 text-ink placeholder-dim focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
          />
        </div>

        <div>
          <label className="block text-dim text-[11px] mb-1.5 uppercase tracking-wider">
            Pemohon / Applicant
          </label>
          <input
            type="text"
            value={data.applicant}
            onChange={(e) => onChange('applicant', e.target.value)}
            placeholder="Nama pemohon & relasi"
            className="w-full bg-wash border border-border rounded-md px-2.5 py-1.5 text-ink placeholder-dim focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
          />
        </div>
      </div>

      <div>
        <label className="block text-dim text-[11px] mb-1.5 uppercase tracking-wider">
          Alasan Permohonan
        </label>
        <textarea
          rows={5}
          value={data.reasons}
          onChange={(e) => onChange('reasons', e.target.value)}
          placeholder="Latar belakang dan alasan permohonan..."
          className="w-full bg-wash border border-border rounded-md p-2.5 text-ink placeholder-dim focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition leading-relaxed resize-y text-[11px]"
        />
        <p className="text-[10px] text-dim mt-1">Enter ganda = paragraf baru</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-dim text-[11px] mb-1.5 uppercase tracking-wider">
            Request Date
          </label>
          <input
            type="text"
            value={data.requestDate}
            onChange={(e) => onChange('requestDate', e.target.value)}
            placeholder="14 September 2026"
            className="w-full bg-wash border border-border rounded-md px-2.5 py-1.5 text-ink placeholder-dim focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
          />
        </div>

        <div>
          <label className="block text-dim text-[11px] mb-1.5 uppercase tracking-wider">
            Delivery Note
          </label>
          <input
            type="text"
            value={data.deliveryNote}
            onChange={(e) => onChange('deliveryNote', e.target.value)}
            placeholder="-"
            className="w-full bg-wash border border-border rounded-md px-2.5 py-1.5 text-ink placeholder-dim focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
          />
        </div>

        <div>
          <label className="block text-dim text-[11px] mb-1.5 uppercase tracking-wider">
            Transport By
          </label>
          <input
            type="text"
            value={data.transportBy}
            onChange={(e) => onChange('transportBy', e.target.value)}
            placeholder="-"
            className="w-full bg-wash border border-border rounded-md px-2.5 py-1.5 text-ink placeholder-dim focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
          />
        </div>
      </div>
    </div>
  );
}
