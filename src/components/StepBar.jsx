import React from 'react';

const STEPS = [
  { num: 1, label: 'Isi Form' },
  { num: 2, label: 'Preview' },
  { num: 3, label: 'Cetak / Save' },
];

export default function StepBar({ activeStep, onStepChange }) {
  return (
    <div className="no-print border-b border-border bg-surface/50">
      <div className="max-w-3xl mx-auto flex items-center justify-center gap-1 px-4">
        {STEPS.map((step, idx) => {
          const isActive = activeStep === step.num;

          return (
            <React.Fragment key={step.num}>
              <button
                type="button"
                onClick={() => onStepChange(step.num)}
                className={`relative px-4 py-2.5 text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'text-accent'
                    : 'text-dim hover:text-ink'
                }`}
              >
                {step.label}
                {isActive && (
                  <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent rounded-full" />
                )}
              </button>

              {idx < STEPS.length - 1 && (
                <span className="text-border-strong text-[10px] select-none">/</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
