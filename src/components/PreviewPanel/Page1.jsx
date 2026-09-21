import React from 'react';

export default function Page1({ data }) {
  const totalCost = data.items.reduce(
    (acc, item) => acc + (Number(item.qty || 0) * Number(item.price || 0)),
    0
  );

  const reasonParagraphs = (data.reasons || '')
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0);

  return (
    <div className="a4-page font-sans">

      {/* â”€â”€ Header: Logo | Title | Program â”€â”€ */}
      <div className="doc-header">
        {/* Logo kiri */}
        <div className="doc-header__logo">
          {data.logoUrl ? (
            <img
              src={data.logoUrl}
              alt="Logo Gesit Foundation"
              className="h-[48px] w-auto object-contain"
            />
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full border-2 border-emerald-600 flex items-center justify-center font-bold text-emerald-700 text-[9pt]">
                GF
              </div>
              <div className="leading-tight">
                <div className="font-bold text-[8.5pt] text-emerald-800 tracking-wider uppercase">
                  Yayasan Gesit Peduli Bangsa
                </div>
                <div className="text-[6.5pt] text-gray-500 italic">
                  Untuk Rakyat, Bangsa &amp; Negara
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Judul tengah */}
        <div className="doc-header__title">
          <h1 className="font-bold text-[13pt] text-black tracking-wider uppercase">
            Application Form
          </h1>
        </div>

        {/* Program kanan-atas */}
        <div className="doc-header__program">
          PROGRAM : <span className="font-bold">{data.programName || 'Pendidikan'}</span>
        </div>
      </div>


      {/* â”€â”€ For / Unto + Applicant â”€â”€ */}
      <div className="doc-row mb-1.5">
        <div className="doc-row__label">For / Untuk</div>
        <div className="doc-row__colon">:</div>
        <div className="doc-row__value font-bold text-black">
          {data.forWho || '\u00A0'}
        </div>
      </div>

      {/* Applicant / Pemohon */}
      <div className="doc-row mb-2">
        <div className="doc-row__label">Applicant / Pemohon</div>
        <div className="doc-row__colon">:</div>
        <div className="doc-row__value font-semibold text-black">
          {data.applicant || '\u00A0'}
        </div>
      </div>

      {/* â”€â”€ Reason / Alasan â”€â”€ */}
      <div className="doc-row mb-1">
        <div className="doc-row__label">Reason / Alasan</div>
        <div className="doc-row__colon">:</div>
        <div className="doc-row__value text-black text-justify leading-[1.55]">
          {reasonParagraphs.length > 0 ? (
            reasonParagraphs.map((p, idx) => (
              <p key={idx} className="reason-p">
                {p}
              </p>
            ))
          ) : (
            <p className="text-gray-400 italic">(Belum ada alasan)</p>
          )}
        </div>
      </div>

      {/* â”€â”€ Request Date â”€â”€ */}
      <div className="doc-row mb-0.5">
        <div className="doc-row__label">Request Date / Tanggal</div>
        <div className="doc-row__colon">:</div>
        <div className="doc-row__value font-semibold text-black">
          {data.requestDate || '\u00A0'}
        </div>
      </div>

      {/* â”€â”€ Delivery Note â”€â”€ */}
      <div className="doc-row mb-0.5">
        <div className="doc-row__label">Delivery Note / Catatan Pengiriman</div>
        <div className="doc-row__colon">:</div>
        <div className="doc-row__value font-semibold text-black">
          {data.deliveryNote || '-'}
        </div>
      </div>

      {/* â”€â”€ Transport by â”€â”€ */}
      <div className="doc-row mb-4">
        <div className="doc-row__label">Transport by / Dikirim dengan</div>
        <div className="doc-row__colon">:</div>
        <div className="doc-row__value font-semibold text-black">
          {data.transportBy || '-'}
        </div>
      </div>

      {/* â”€â”€ Items Table â”€â”€ */}
      <div className="mb-4">
        <table className="items-table text-[8.5pt]">
          <thead>
            <tr>
              <th className="w-10 text-center">No</th>
              <th className="text-left pl-2">Item Description</th>
              <th className="w-14 text-center">Qty</th>
              <th className="w-32 text-right pr-2">Price / Item</th>
              <th className="w-32 text-right pr-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => {
              const rowTotal = Number(item.qty || 0) * Number(item.price || 0);
              return (
                <tr key={item.id || index}>
                  <td className="text-center font-medium">{index + 1}</td>
                  <td className="pl-2 font-medium">{item.name}</td>
                  <td className="text-center font-medium">{item.qty}</td>
                  <td className="text-right pr-2 font-medium">
                    Rp{Number(item.price || 0).toLocaleString('id-ID')}
                  </td>
                  <td className="text-right pr-2 font-bold">
                    Rp{rowTotal.toLocaleString('id-ID')}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td colSpan={4} className="text-right pr-3 font-bold">
                Total Cost
              </td>
              <td className="text-right pr-2 font-bold text-[9pt]">
                Rp{totalCost.toLocaleString('id-ID')}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* â”€â”€ Signatures â”€â”€ */}
      <div className="pt-1">
        {/* Tanggal kota kanan */}
        <div className="flex justify-end mb-2">
          <div className="text-right text-[8.5pt] font-semibold border-b border-gray-500 pb-[1px] min-w-[200px]">
            {data.signCityDate || 'Jakarta, 14 September 2026'}
          </div>
        </div>

        {/* Kotak tanda tangan */}
        {(data.requestedBy?.enabled || data.reviewedBy?.enabled || data.approval?.enabled) && (
          <div className="flex justify-end gap-3 text-[8pt]">
            {/* REQUESTED BY */}
            {data.requestedBy?.enabled && (
              <div className="sig-box w-[152px]">
                <div className="font-bold text-black text-[7.5pt]">
                  REQUESTED BY :
                </div>
                <div className="flex-1 flex items-center justify-center py-1 overflow-hidden min-h-[52px]">
                  {data.requestedBy?.signatureImg ? (
                    <img
                      src={data.requestedBy.signatureImg}
                      alt="Signature"
                      className="max-h-12 max-w-full object-contain"
                    />
                  ) : data.requestedBy?.defaultSignature ? (
                    <svg viewBox="0 0 100 40" className="h-10 w-auto opacity-70">
                      <path
                        d="M10 30 Q 30 5, 45 25 T 75 10 T 90 35"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <div className="h-10" />
                  )}
                </div>
                <div className="text-center font-bold text-black text-[7.5pt] border-t border-gray-400 pt-1 mt-auto">
                  ({data.requestedBy?.name || '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'})
                </div>
              </div>
            )}

            {/* REVIEWED BY */}
            {data.reviewedBy?.enabled && (
              <div className="sig-box w-[152px]">
                <div className="font-bold text-black text-[7.5pt]">
                  <div>REVIEWED BY :</div>
                  <div className="text-[6.5pt] text-gray-600 font-normal">By / Oleh</div>
                </div>
                <div className="flex-1 flex items-center justify-center py-1 overflow-hidden min-h-[52px]">
                  {data.reviewedBy?.signatureImg ? (
                    <img
                      src={data.reviewedBy.signatureImg}
                      alt="Signature"
                      className="max-h-12 max-w-full object-contain"
                    />
                  ) : data.reviewedBy?.defaultSignature ? (
                    <svg viewBox="0 0 100 40" className="h-10 w-auto opacity-70">
                      <path
                        d="M15 35 C 10 10, 40 5, 35 30 C 30 38, 55 10, 80 20"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <div className="h-10" />
                  )}
                </div>
                <div className="text-center font-bold text-black text-[7.5pt] border-t border-gray-400 pt-1 mt-auto">
                  ({data.reviewedBy?.role || 'Pengurus'})
                </div>
              </div>
            )}

            {/* APPROVAL STATUS */}
            {data.approval?.enabled && (
              <div className="sig-box w-[184px]">
                <div className="flex justify-between items-start pt-0.5 px-0.5">
                  {/* Rejected */}
                  <div className="flex items-start gap-1.5">
                    <span className="w-3.5 h-3.5 border border-gray-700 flex items-center justify-center mt-0.5 flex-shrink-0 bg-white">
                      {data.approval?.status === 'rejected' && (
                        <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                    <div className="text-[7pt] leading-tight font-semibold text-black">
                      <div>Rejected /</div>
                      <div>Ditolak</div>
                    </div>
                  </div>

                  {/* Approved */}
                  <div className="flex items-start gap-1.5">
                    <span className="w-3.5 h-3.5 border border-gray-700 flex items-center justify-center mt-0.5 flex-shrink-0 bg-white">
                      {data.approval?.status === 'approved' && (
                        <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                    <div className="text-[7pt] leading-tight font-semibold text-black">
                      <div>Approved /</div>
                      <div>Disetujui</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-h-[42px]" />

                <div className="text-left font-bold text-black text-[7.5pt] border-t border-gray-400 pt-1 mt-auto">
                  ({data.approval?.approvedBy || 'Tim Approval'})
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
