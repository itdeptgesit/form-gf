import React, { useState } from 'react';
import { Upload, Trash2, Eye, EyeOff } from 'lucide-react';

function SignatureBox({ field, label, data, onChange }) {
  const [sigUrl, setSigUrl] = useState('');

  const handleSignatureUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(field, {
        ...data,
        signatureImg: e.target?.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImportUrl = () => {
    if (!sigUrl.trim()) return;
    onChange(field, {
      ...data,
      signatureImg: sigUrl.trim()
    });
    setSigUrl('');
  };

  const handleClearSignature = () => {
    onChange(field, {
      ...data,
      signatureImg: null
    });
  };

  const handleToggle = () => {
    onChange(field, {
      ...data,
      enabled: !data.enabled
    });
  };

  return (
    <div className={`p-3 bg-wash border rounded-lg space-y-2 transition-colors ${
      data.enabled ? 'border-border' : 'border-border opacity-50'
    }`}>
      <div className="flex items-center justify-between">
        <span className="text-dim text-[11px] uppercase tracking-wider font-medium">
          {label}
        </span>
        <button
          type="button"
          onClick={handleToggle}
          className={`p-1 rounded transition-colors ${
            data.enabled ? 'text-accent' : 'text-border-strong'
          }`}
          title={data.enabled ? 'Nonaktifkan' : 'Aktifkan'}
        >
          {data.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
      </div>

      {data.enabled && (
        <>
          <div>
            <label className="block text-dim text-[10px] mb-1 uppercase tracking-wider">
              {field === 'requestedBy' ? 'Nama' : 'Jabatan'}
            </label>
            <input
              type="text"
              value={field === 'requestedBy' ? data.name : data.role}
              onChange={(e) => onChange(field, {
                ...data,
                [field === 'requestedBy' ? 'name' : 'role']: e.target.value
              })}
              placeholder={field === 'requestedBy' ? 'Angelica Thania' : 'Pengurus'}
              className="w-full bg-surface border border-border rounded px-2 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
            />
          </div>

          <div>
            <label className="block text-dim text-[10px] mb-1 uppercase tracking-wider">Tanda Tangan</label>
            <div className="flex gap-1.5">
              <label className="flex-1 cursor-pointer py-1.5 px-2 bg-surface hover:bg-surface-hover border border-border rounded text-center text-dim hover:text-ink transition flex items-center justify-center gap-1 text-[10px]">
                <Upload className="w-3 h-3" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSignatureUpload(e.target.files?.[0])}
                  className="hidden"
                />
              </label>
              {data.signatureImg && (
                <button
                  type="button"
                  onClick={handleClearSignature}
                  className="p-1 text-dim hover:text-danger border border-border rounded transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-dim text-[10px] mb-1 uppercase tracking-wider">
              Import URL (opsional)
            </label>
            <div className="flex gap-1.5">
              <input
                type="url"
                value={sigUrl}
                onChange={(e) => setSigUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 bg-surface border border-border rounded px-2 py-1.5 text-ink placeholder-dim focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
                onKeyDown={(e) => e.key === 'Enter' && handleImportUrl()}
              />
              <button
                type="button"
                onClick={handleImportUrl}
                disabled={!sigUrl.trim()}
                className="px-2.5 py-1.5 bg-wash hover:bg-surface-hover border border-border rounded text-dim hover:text-ink transition text-[10px] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Import
              </button>
            </div>
          </div>

          {data.signatureImg && (
            <div className="p-2 bg-surface border border-border rounded flex items-center justify-center min-h-[48px]">
              <img
                src={data.signatureImg}
                alt="Signature preview"
                className="max-h-10 max-w-full object-contain"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function SignatureSection({ data, onChange }) {
  const handleApprovalToggle = () => {
    onChange('approval', {
      ...data.approval,
      enabled: !data.approval.enabled
    });
  };

  return (
    <div className="space-y-4 text-xs pt-3">
      <div>
        <label className="block text-dim text-[11px] mb-1.5 uppercase tracking-wider">
          Tempat & Tanggal Tanda Tangan
        </label>
        <input
          type="text"
          value={data.signCityDate}
          onChange={(e) => onChange('signCityDate', e.target.value)}
          placeholder="Jakarta, 14 September 2026"
          className="w-full bg-wash border border-border rounded-md px-2.5 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SignatureBox
          field="requestedBy"
          label="Requested By"
          data={data.requestedBy}
          onChange={onChange}
        />

        <SignatureBox
          field="reviewedBy"
          label="Reviewed By"
          data={data.reviewedBy}
          onChange={onChange}
        />

        <div className={`p-3 bg-wash border rounded-lg space-y-2 transition-colors ${
          data.approval.enabled ? 'border-border' : 'border-border opacity-50'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-dim text-[11px] uppercase tracking-wider font-medium">
              Approval Status
            </span>
            <button
              type="button"
              onClick={handleApprovalToggle}
              className={`p-1 rounded transition-colors ${
                data.approval.enabled ? 'text-accent' : 'text-border-strong'
              }`}
            >
              {data.approval.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
          </div>

          {data.approval.enabled && (
            <>
              <div>
                <label className="block text-dim text-[10px] mb-1 uppercase tracking-wider">Status</label>
                <select
                  value={data.approval.status}
                  onChange={(e) => onChange('approval', { ...data.approval, status: e.target.value })}
                  className="w-full bg-surface border border-border rounded px-2 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
                >
                  <option value="approved">Approved / Disetujui</option>
                  <option value="rejected">Rejected / Ditolak</option>
                  <option value="none">Belum Ditentukan</option>
                </select>
              </div>
              <div>
                <label className="block text-dim text-[10px] mb-1 uppercase tracking-wider">Nama / Tim</label>
                <input
                  type="text"
                  value={data.approval.approvedBy}
                  onChange={(e) => onChange('approval', { ...data.approval, approvedBy: e.target.value })}
                  placeholder="Tim Approval"
                  className="w-full bg-surface border border-border rounded px-2 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
