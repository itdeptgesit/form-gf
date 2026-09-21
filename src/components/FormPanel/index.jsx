import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ApplicantSection from './ApplicantSection';
import ItemsSection from './ItemsSection';
import SignatureSection from './SignatureSection';
import Page2Section from './Page2Section';

function SectionHeader({ label, count, isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between p-3.5 text-left font-medium text-dim hover:text-ink transition-colors"
    >
      <div className="flex items-center gap-2 text-[13px]">
        <span>{label}</span>
        {count !== undefined && (
          <span className="text-[10px] px-1.5 py-0.5 bg-wash text-dim rounded">
            {count}
          </span>
        )}
      </div>
      <ChevronDown
        className={`w-3.5 h-3.5 text-border-strong transition-transform duration-150 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </button>
  );
}

export default function FormPanel({ formData, onChange, showToast }) {
  const [openSections, setOpenSections] = useState({
    applicant: true,
    items: true,
    signatures: true,
    page2: true
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-2 pb-12">
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <SectionHeader
          label="Informasi Pemohon & Alasan"
          isOpen={openSections.applicant}
          onClick={() => toggleSection('applicant')}
        />
        {openSections.applicant && (
          <div className="px-4 pb-4 pt-0 border-t border-border">
            <ApplicantSection data={formData} onChange={onChange} />
          </div>
        )}
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <SectionHeader
          label="Rincian Item & Biaya"
          count={`${formData.items.length} item`}
          isOpen={openSections.items}
          onClick={() => toggleSection('items')}
        />
        {openSections.items && (
          <div className="px-4 pb-4 pt-0 border-t border-border">
            <ItemsSection
              items={formData.items}
              onChange={onChange}
              showToast={showToast}
            />
          </div>
        )}
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <SectionHeader
          label="Tanda Tangan & Status Approval"
          isOpen={openSections.signatures}
          onClick={() => toggleSection('signatures')}
        />
        {openSections.signatures && (
          <div className="px-4 pb-4 pt-0 border-t border-border">
            <SignatureSection data={formData} onChange={onChange} />
          </div>
        )}
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <SectionHeader
          label="Halaman 2: General Organization Background"
          isOpen={openSections.page2}
          onClick={() => toggleSection('page2')}
        />
        {openSections.page2 && (
          <div className="px-4 pb-4 pt-0 border-t border-border">
            <Page2Section
              enabled={formData.page2Enabled}
              page2Data={formData.page2}
              onToggle={onChange}
              onChange={onChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
