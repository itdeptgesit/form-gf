export const DEFAULT_FORM_DATA = {
  logoUrl: '/logo.png',
  programName: 'Pendidikan',
  forWho: 'Muhammad Shaddam Maghany Suryasaputra',
  applicant: 'Pak Suryadi (Ayah dari Muhammad Shaddam)',
  reasons: `Muhammad Shaddam Maghany Suryasaputra merupakan penerima beasiswa Gesit Foundation yang saat ini sedang menempuh pendidikan S1 Informatika di Universitas Bhayangkara Jakarta Raya. Dukungan sebelumnya telah membantu Shaddam melanjutkan pendidikannya, namun belum mencakup hingga tahap akhir studi. Saat ini Shaddam membutuhkan dukungan lanjutan untuk menyelesaikan kewajiban akademik hingga kelulusan dan wisuda.

Shaddam menunjukkan performa akademik yang konsisten baik, dengan IPS 3,76 (Semester 3), 3,96 (Semester 4), 3,65 (Semester 5), dan 3,58 (Semester 6). IPK yang tercatat pada Semester 3 adalah 3,50.

Perpanjangan bantuan direkomendasikan agar dukungan pendidikan yang telah diberikan dapat dituntaskan hingga tahap akhir, sehingga Shaddam dapat menyelesaikan studinya dan memperoleh gelar sarjana.`,
  requestDate: '14 September 2026',
  deliveryNote: '-',
  transportBy: '-',
  items: [
    { id: 1, name: 'Uang kuliah semester 8', qty: 1, price: 6400000 },
    { id: 2, name: 'Sidang Proposal', qty: 1, price: 600000 },
    { id: 3, name: 'Sidang Skripsi', qty: 1, price: 1600000 },
    { id: 4, name: 'LSP (Sertifikasi Profesi)', qty: 1, price: 1000000 },
    { id: 5, name: 'Wisuda & Ijasah', qty: 1, price: 2500000 }
  ],
  signCityDate: 'Jakarta, 14 September 2026',
  requestedBy: {
    enabled: true,
    name: 'Angelica Thania',
    signatureImg: null,
    defaultSignature: false
  },
  reviewedBy: {
    enabled: true,
    role: 'Pengurus',
    signatureImg: null,
    defaultSignature: false
  },
  approval: {
    enabled: true,
    status: 'approved',
    approvedBy: 'Tim Approval'
  },
  page2Enabled: true,
  page2: {
    who: 'Muhammad Shaddam Maghany Suryasaputra, mahasiswa S1 Informatika di Universitas Bhayangkara Jakarta Raya yang sebelumnya telah menerima beasiswa Gesit Foundation sejak semester 3.',
    why: 'Shaddam saat ini berada di semester akhir (Semester 8) dan memerlukan dukungan biaya untuk menyelesaikan sisa kewajiban akademik dan wisuda agar dapat lulus tepat waktu. Shaddam memiliki rekam akademik yang konsisten, dengan IPS 3,76 pada Semester 3, 3,96 pada Semester 4, 3,65 pada Semester 5, dan 3,58 pada Semester 6.',
    howMuch: 'Bantuan dibutuhkan untuk mendukung penyelesaian pendidikan Shaddam pada tahap akhir, khususnya biaya Semester VIII dan biaya wisuda. Surat permohonan resmi menyatakan kebutuhan bantuan sebesar Rp12.100.000 untuk semester 8, biaya wisuda, beserta biaya pendukung lainnya.',
    aidType: 'Donasi dalam bentuk bantuan biaya pendidikan, yang dapat diberikan melalui pembayaran langsung kepada institusi pendidikan.',
    aidReason: 'Bantuan pendidikan merupakan bentuk dukungan yang paling relevan karena Shaddam telah berada pada tahap akhir studinya. Dengan memberikan dukungan lanjutan, Gesit Foundation dapat membantu memastikan penerima manfaat menyelesaikan pendidikan yang sebelumnya telah didukung hingga tahap kelulusan. Saddham juga menunjukkan performa akademik yang konsisten baik, dengan IPS 3,76 (Semester 3), 3,96 (Semester 4), 3,65 (Semester 5), dan 3,58 (Semester 6).',
    plan: 'Bantuan akan digunakan untuk memenuhi biaya pendidikan Semester VIII dan biaya wisuda sesuai kebutuhan yang telah diajukan dan diverifikasi. Bantuan ini diharapkan memungkinkan Shaddam menyelesaikan seluruh kewajiban pendidikannya hingga memperoleh kelulusan.',
    scheme: 'Perpanjangan beasiswa direkomendasikan untuk mendukung Shaddam menyelesaikan tahap akhir pendidikannya hingga kelulusan dan wisuda. Skema ini memastikan dukungan yang sebelumnya telah diberikan Gesit Foundation dapat dituntaskan dan memberikan hasil yang maksimal bagi penerima manfaat.'
  }
};

export const EMPTY_FORM_DATA = {
  logoUrl: '/logo.png',
  programName: 'Pendidikan',
  forWho: '',
  applicant: '',
  reasons: '',
  requestDate: '',
  deliveryNote: '-',
  transportBy: '-',
  items: [
    { id: 1, name: '', qty: 1, price: 0 }
  ],
  signCityDate: 'Jakarta, ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
  requestedBy: {
    enabled: false,
    name: '',
    signatureImg: null,
    defaultSignature: false
  },
  reviewedBy: {
    enabled: false,
    role: '',
    signatureImg: null,
    defaultSignature: false
  },
  approval: {
    enabled: false,
    status: 'approved',
    approvedBy: ''
  },
  page2Enabled: false,
  page2: {
    who: '',
    why: '',
    howMuch: '',
    aidType: '',
    aidReason: '',
    plan: '',
    scheme: ''
  }
};
