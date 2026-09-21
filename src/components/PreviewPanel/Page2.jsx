import React from 'react';

export default function Page2({ data }) {
  const p2 = data.page2 || {};

  return (
    <div className="a4-page rounded-sm page-break font-sans text-[9pt] leading-relaxed text-gray-900">
      {/* Title */}
      <div className="border-b-2 border-black pb-2 mb-4">
        <h2 className="font-bold text-[14pt] text-gray-900 uppercase tracking-wide">
          General Organization Background
        </h2>
        <div className="h-[1px] bg-gray-400 mt-1 w-full" />
      </div>

      <div className="space-y-4 text-justify">
        {/* Section 1 */}
        <div>
          <h3 className="font-bold text-[10pt] text-black mb-2 border-b border-gray-300 pb-1">
            1. Who are we giving this to and why?
          </h3>
          <div className="pl-4 space-y-2.5">
            <div>
              <p className="font-bold text-black text-[9pt]">- Who is the beneficiary?</p>
              <p className="pl-4 whitespace-pre-line text-black text-[8.5pt] leading-[1.5]">
                {p2.who || '-'}
              </p>
            </div>

            <div>
              <p className="font-bold text-black text-[9pt]">- Why do they need it now?</p>
              <p className="pl-4 whitespace-pre-line text-black text-[8.5pt] leading-[1.5]">
                {p2.why || '-'}
              </p>
            </div>

            <div>
              <p className="font-bold text-black text-[9pt]">
                - Are they experienced in needs mapping &amp; distribution?
              </p>
              <p className="pl-4 text-black text-[8.5pt] leading-[1.5]">
                Ya. Kebutuhan bantuan didukung oleh dokumen akademik dan surat permohonan resmi dari penerima, serta rincian biaya dari universitas.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="font-bold text-[10pt] text-black mb-2 border-b border-gray-300 pb-1">
            Quantity &amp; Type Needed
          </h3>
          <div className="pl-4 space-y-2.5">
            <div>
              <p className="font-bold text-black text-[9pt]">
                2. How much do they need and for what?
              </p>
              <p className="pl-4 whitespace-pre-line text-black text-[8.5pt] leading-[1.5]">
                {p2.howMuch || '-'}
              </p>
            </div>

            <div>
              <p className="font-bold text-black text-[9pt]">
                Type of aids that is most relevant to the conditions of the target beneficiaries:
              </p>
              <p className="pl-4 whitespace-pre-line text-black text-[8.5pt] leading-[1.5]">
                {p2.aidType || '-'}
              </p>
            </div>

            <div>
              <p className="font-bold text-black text-[9pt]">
                Why this is the most relevant aid needed:
              </p>
              <p className="pl-4 whitespace-pre-line text-black text-[8.5pt] leading-[1.5]">
                {p2.aidReason || '-'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="font-bold text-[10pt] text-black mb-2 border-b border-gray-300 pb-1">
            Distribution &amp; Reporting Scheme
          </h3>
          <div className="pl-4 space-y-2.5">
            <div>
              <p className="font-bold text-black text-[9pt]">
                3. Action plan for aids requested:
              </p>
              <p className="pl-4 whitespace-pre-line text-black text-[8.5pt] leading-[1.5]">
                {p2.plan || '-'}
              </p>
            </div>

            <div>
              <p className="font-bold text-black text-[9pt]">
                Recommended scheme:
              </p>
              <p className="pl-4 whitespace-pre-line text-black text-[8.5pt] leading-[1.5]">
                {p2.scheme || '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
