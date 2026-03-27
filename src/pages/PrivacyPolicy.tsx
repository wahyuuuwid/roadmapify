import React from 'react';
import { Shield, Lock, Eye, Database, Share2, Trash2, Mail } from 'lucide-react';

function PrivacyPolicy() {
  const sections = [
    {
      icon: Database,
      title: "Informasi yang Kami Kumpulkan",
      content: [
        "Data akun: nama, email, dan informasi profil saat registrasi",
        "Data pembelajaran: progress, roadmap yang dipilih, dan statistik belajar",
        "Data teknis: IP address, browser, dan device information untuk keamanan",
        "Data interaksi: chat dengan AI assistant dan aktivitas di platform"
      ]
    },
    {
      icon: Eye,
      title: "Penggunaan Data",
      content: [
        "Personalization algoritma pembelajaran AI",
        "Improvement fitur berdasarkan pola penggunaan",
        "Komunikasi terkait update dan tips pembelajaran",
        "Analisis anonymized untuk riset pendidikan"
      ]
    },
    {
      icon: Trash2,
      title: "Hak Pengguna & Penghapusan",
      content: [
        "Akses penuh ke data pribadi Anda kapan saja",
        "Request penghapusan akun dan data permanen",
      ]
    }
  ];

  return (
    <div className='min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden pt-10'>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Legal Document</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-gray-400">Terakhir diperbarui: 24 Maret 2026</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 mb-8">
          <p className="text-gray-300 leading-relaxed mb-4">
            Roadmapify ("kami", "platform") berkomitmen untuk melindungi privasi pengguna. 
            Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi 
            informasi pribadi Anda saat menggunakan layanan pembelajaran berbasis AI kami.
          </p>
          <p className="text-gray-400 text-sm">
            Dengan menggunakan Roadmapify, Anda menyetujui praktik yang dijelaskan dalam kebijakan ini. 
            Jika tidak setuju, harap tidak melanjutkan penggunaan platform.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="group bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                  <section.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-4 text-white">{section.title}</h2>
                  <ul className="space-y-3">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-400">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl border border-white/10">
          <Mail className="w-8 h-8 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Pertanyaan tentang Privasi?</h3>
          <p className="text-gray-400 mb-4">Hubungi kami melalui email:</p>
          <a href="mailto:privacy@roadmapify.id" className="text-purple-400 hover:text-purple-300 transition-colors">
            privacy@roadmapify.id
          </a>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;