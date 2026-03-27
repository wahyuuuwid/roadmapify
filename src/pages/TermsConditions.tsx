import React from 'react';
import { Scale, AlertCircle, CheckCircle, XCircle, FileText, UserCheck, Copyright } from 'lucide-react';

function TermsConditions() {
  const clauses = [
    {
      icon: UserCheck,
      title: "Pendaftaran Akun",
      items: [
        "Informasi yang diberikan harus akurat dan lengkap",
        "Satu akun hanya untuk satu pengguna (tidak boleh shared)",
        "Tanggung jawab menjaga kerahasiaan password",
        "Kami berhak menonaktifkan akun yang melanggar kebijakan"
      ]
    },
    {
      icon: Copyright,
      title: "Hak Kekayaan Intelektual",
      items: [
        "Pengguna boleh download untuk penggunaan pribadi",
        "Dilarang mereproduksi, menjual, atau mendistribusikan konten",
        "Konten yang diupload pengguna tetap menjadi milik pengguna",
        "Lisensi kepada Roadmapify untuk menampilkan konten user"
      ]
    },
    {
      icon: AlertCircle,
      title: "Larangan Penggunaan",
      items: [
        "Tidak untuk aktivitas ilegal atau merusak sistem",
        "Dilarang scraping, botting, atau automated access",
        "Tidak boleh mengganggu pengguna lain (harassment, spam)",
        "Dilarang upload konten berbahaya, SARA, atau pornografi",
        "Tidak boleh reverse engineer aplikasi atau AI model"
      ]
    },
    
  ];

  return (
    <div className='min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden pt-10'>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Scale className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
            Syarat dan Ketentuan
          </h1>
          <p className="text-gray-400">Berlaku: 24 Januari 2026</p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8 flex gap-4">
          <FileText className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-300 mb-2">Perjanjian Pengguna</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Dengan mengakses atau menggunakan Roadmapify, Anda setuju untuk terikat oleh syarat dan ketentuan ini. 
              Jika tidak setuju, harap berhenti menggunakan layanan kami. Ketentuan ini merupakan perjanjian hukum antara Anda dan PT Roadmapify Teknologi Indonesia.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {clauses.map((clause, idx) => (
            <div key={idx} className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <clause.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold">{clause.title}</h2>
              </div>
              <div className="grid gap-3">
                {clause.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="w-6 h-6 text-red-400" />
            <h2 className="text-xl font-semibold text-red-200">Batasan Tanggung Jawab</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Roadmapify tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial 
            yang timbul dari penggunaan layanan. Layanan disediakan "sebagaimana adanya" tanpa jaminan 
            tertentu. Kami tidak menjamin hasil karir spesifik dari penggunaan platform.
          </p>
          
        </div>

        <div className="mt-8 text-center p-6 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            Kami dapat memperbarui syarat ini sewaktu-waktu.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;