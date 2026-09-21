import React, { useState, useRef } from 'react';
import Header from './components/Header';
import StepBar from './components/StepBar';
import FormPanel from './components/FormPanel';
import PreviewPanel from './components/PreviewPanel';
import Toast from './components/ui/Toast';
import Modal from './components/ui/Modal';
import { Printer, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { DEFAULT_FORM_DATA, EMPTY_FORM_DATA } from './data/sampleData';
import useTheme from './hooks/useTheme';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

const MONTH_MAP = {
  Jan: 'Januari', Feb: 'Februari', Mar: 'Maret', Apr: 'April',
  May: 'Mei', Jun: 'Juni', Jul: 'Juli', Aug: 'Agustus',
  Sep: 'September', Oct: 'Oktober', Nov: 'November', Dec: 'Desember'
};

function convertShortDate(str) {
  if (!str || typeof str !== 'string') return str;
  const m = str.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{2,4})$/);
  if (!m) return str;
  const day = m[1];
  const month = MONTH_MAP[m[2]] || m[2];
  const year = m[3].length === 2 ? '20' + m[3] : m[3];
  return `${day} ${month} ${year}`;
}

export default function App() {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('gesit_form_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.requestDate = convertShortDate(parsed.requestDate);
        return parsed;
      }
      return DEFAULT_FORM_DATA;
    } catch {
      return DEFAULT_FORM_DATA;
    }
  });

  const [activeStep, setActiveStep] = useState(1);
  const [density, setDensity] = useState('normal');
  const [toast, setToast] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  const { preference: theme, cycle: cycleTheme } = useTheme();
  const previewRef = useRef(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      try {
        localStorage.setItem('gesit_form_data', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleReset = () => {
    setModalConfig({
      title: 'Reset ke Contoh Data?',
      message: 'Seluruh isian form akan dikembalikan ke data contoh awal (Shaddam Maghany). Perubahan yang belum disimpan akan hilang.',
      confirmText: 'Ya, Reset',
      confirmColor: 'bg-emerald-600 hover:bg-emerald-500',
      onConfirm: () => {
        setFormData(DEFAULT_FORM_DATA);
        try {
          localStorage.setItem('gesit_form_data', JSON.stringify(DEFAULT_FORM_DATA));
        } catch {}
        setModalConfig(null);
        showToast('Data berhasil di-reset ke contoh default', 'success');
      }
    });
  };

  const handleClear = () => {
    setModalConfig({
      title: 'Kosongkan Seluruh Form?',
      message: 'Apakah Anda yakin ingin mengosongkan seluruh isi data permohonan dan item biaya?',
      confirmText: 'Ya, Kosongkan',
      confirmColor: 'bg-rose-600 hover:bg-rose-500',
      onConfirm: () => {
        setFormData(EMPTY_FORM_DATA);
        try {
          localStorage.setItem('gesit_form_data', JSON.stringify(EMPTY_FORM_DATA));
        } catch {}
        setModalConfig(null);
        showToast('Form berhasil dikosongkan', 'info');
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    showToast('Sedang membuat file PDF...', 'info');
    try {
      const element = document.getElementById('printableArea');
      if (!element) throw new Error('Element pratinjau tidak ditemukan');
      const safeName = (formData.forWho || 'Permohonan')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .substring(0, 35);

      const pages = Array.from(element.querySelectorAll('.a4-page'));
      if (pages.length === 0) throw new Error('Halaman dokumen tidak ditemukan');

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      for (let index = 0; index < pages.length; index++) {
        const page = pages[index];
        const canvas = await html2canvas(page, {
          scale: 1.25,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          logging: false,
          imageTimeout: 10000,
          onclone: (clonedDocument) => {
            const clonedPage = clonedDocument.querySelectorAll('.a4-page')[index];
            if (clonedPage) {
              clonedPage.style.transform = 'none';
              clonedPage.style.margin = '0';
              clonedPage.style.boxShadow = 'none';
            }
          }
        });

        // Prevent a browser rendering issue from silently downloading blank pages.
        const context = canvas.getContext('2d', { willReadFrequently: true });
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        let darkPixelCount = 0;
        for (let offset = 0; offset < pixels.length; offset += 64) {
          if (pixels[offset] < 245 || pixels[offset + 1] < 245 || pixels[offset + 2] < 245) {
            darkPixelCount++;
          }
        }
        if (darkPixelCount < 100) {
          throw new Error(`Halaman ${index + 1} gagal dirender (kosong)`);
        }

        if (index > 0) pdf.addPage('a4', 'portrait');
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.96), 'JPEG', 0, 0, 210, 297);
      }

      pdf.save(`Form_Permohonan_${safeName}.pdf`);
      showToast('File PDF berhasil diunduh!', 'success');
    } catch (err) {
      console.error('PDF generation error:', err);
      showToast('Gagal membuat PDF: ' + (err.message || 'Coba gunakan Jendela Cetak'), 'error');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const canGoPrev = activeStep > 1;
  const canGoNext = activeStep < 3;

  return (
    <div className="min-h-screen bg-page text-ink flex flex-col font-sans">
      {/* Top Navigation Header */}
      <Header
        density={density}
        setDensity={setDensity}
        onReset={handleReset}
        onClear={handleClear}
        theme={theme}
        onToggleTheme={cycleTheme}
      />

      {/* Step Bar */}
      <StepBar activeStep={activeStep} onStepChange={setActiveStep} />

      {/* Step Content */}
      <main className="flex-1 min-h-0 overflow-hidden">
        {/* Step 1: Form */}
        {activeStep === 1 && (
          <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-130px)]">
            <FormPanel
              formData={formData}
              onChange={handleFieldChange}
              showToast={showToast}
            />
          </div>
        )}

        {/* Step 2: Preview */}
        {activeStep === 2 && (
          <div className="flex-1 min-h-0 flex flex-col max-h-[calc(100vh-130px)]">
            <div className="flex-1 min-h-0 overflow-auto bg-wash flex justify-center p-4 sm:p-6">
              <PreviewPanel
                formData={formData}
                density={density}
                previewRef={previewRef}
              />
            </div>
          </div>
        )}

        {/* Step 3: Export (Print / Save PDF) */}
        {activeStep === 3 && (
          <div className="flex-1 min-h-0 flex flex-col max-h-[calc(100vh-130px)]">
            <div className="flex-1 min-h-0 overflow-auto bg-wash flex justify-center p-4 sm:p-6">
              <PreviewPanel
                formData={formData}
                density={density}
                previewRef={previewRef}
              />
            </div>

            {/* Export Actions Bar */}
            <div className="no-print border-t border-border bg-surface/80 px-4 sm:px-6 py-4">
              <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-5 py-2 text-[13px] font-medium text-dim hover:text-ink bg-wash hover:bg-surface-hover border border-border rounded-lg transition"
                >
                  <Printer className="w-4 h-4" />
                  Jendela Cetak
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="flex items-center gap-2 px-5 py-2 text-[13px] font-medium bg-accent text-accent-text hover:bg-accent-hover rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  {isGeneratingPdf ? 'Memproses...' : 'Unduh PDF'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Buttons */}
      <div className="no-print border-t border-border bg-surface/80 px-4 sm:px-6 py-3 sticky bottom-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveStep((s) => s - 1)}
            disabled={!canGoPrev}
            className="flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-medium text-dim hover:text-ink border border-border hover:border-border-strong rounded-md transition disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Sebelumnya
          </button>

          <div className="text-[11px] text-dim hidden sm:block">
            {activeStep} / 3
          </div>

          <button
            type="button"
            onClick={() => setActiveStep((s) => s + 1)}
            disabled={!canGoNext}
            className="flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-medium text-dim hover:text-ink border border-border hover:border-border-strong rounded-md transition disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Selanjutnya
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Confirmation Modal */}
      <Modal
        isOpen={Boolean(modalConfig)}
        title={modalConfig?.title}
        message={modalConfig?.message}
        confirmText={modalConfig?.confirmText}
        confirmColor={modalConfig?.confirmColor}
        onConfirm={modalConfig?.onConfirm}
        onCancel={() => setModalConfig(null)}
      />
    </div>
  );
}
