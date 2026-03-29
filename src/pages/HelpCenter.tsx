import { useState } from 'react';
import { 
  HelpCircle, Search, MessageCircle, Book, Video, 
  ChevronDown, Mail, Phone, ExternalLink, 
  Wallet, Shield, Settings, GraduationCap
} from 'lucide-react';

function PusatBantuan() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<any>(null);

  const categories = [
    { id: 'all', label: 'Semua', icon: HelpCircle },
    { id: 'getting-started', label: 'Memulai', icon: GraduationCap },
    { id: 'account', label: 'Akun', icon: Settings },
    { id: 'security', label: 'Keamanan', icon: Shield },
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: "Bagaimana cara membuat roadmap pembelajaran pertama?",
      answer: "Masukkan Skill yang ingin Anda pelajari, kemudian pilih mulai belajar."
    },
    {
      id: 2,
      category: 'getting-started',
      question: "Apakah Roadmapify gratis?",
      answer: "Ya! Saat ini Roadmapify bisa digunakan secara gratis."
    },
    {
      id: 3,
      category: 'account',
      question: "Bagaimana cara mengubah email akun?",
      answer: "Masuk ke Settings > Profile > Edit Email. Kami akan mengirimkan link verifikasi ke email baru Anda. Pastikan akses ke email lama untuk konfirmasi perubahan."
    },
    {
      id: 4,
      category: 'account',
      question: "Bisakah saya menghapus akun permanen?",
      answer: "Ya. Go to Settings > Privacy > Delete Account. Semua data akan dihapus permanen dalam 30 hari sesuai regulasi. Proses ini tidak dapat dibatalkan."
    },
    {
      id: 5,
      category: 'billing',
      question: "Metode pembayaran apa yang diterima?",
      answer: "Kami menerima transfer bank (BCA, Mandiri, BNI), e-wallet (GoPay, OVO, DANA, LinkAja), QRIS, dan kartu kredit/debit Visa/Mastercard. Untuk enterprise, tersedia invoicing."
    },
    {
      id: 6,
      category: 'billing',
      question: "Bagaimana proses refund?",
      answer: "Refund tersedia dalam 7 hari untuk first-time subscribers. Kirimkan request ke billing@roadmapify.id dengan subject 'Refund Request'. Dana akan kembali ke metode pembayaran original dalam 5-10 hari kerja."
    },
    {
      id: 7,
      category: 'security',
      question: "Apakah data pembelajaran saya aman?",
      answer: "Sangat aman. Kami menggunakan enkripsi AES-256, SSL/TLS untuk transmisi data, dan server lokal Indonesia. Kami juga ISO 27001 certified dan comply dengan PDP Law Indonesia."
    },
    {
      id: 8,
      category: 'security',
      question: "Bagaimana mengaktifkan 2FA?",
      answer: "Settings > Security > Two-Factor Authentication. Pilih metode: Authenticator App (Google Authenticator/Authy) atau SMS. Scan QR code dan simpan backup codes di tempat aman."
    }
  ];

  const resources = [
    {
      icon: Book,
      title: "Dokumentasi",
      desc: "Panduan lengkap fitur dan API",
      link: "#"
    },
    {
      icon: Video,
      title: "Video Tutorial",
      desc: "Tutorial visual step-by-step",
      link: "#"
    },
    {
      icon: MessageCircle,
      title: "Komunitas",
      desc: "Diskusi dengan learners lain",
      link: "#"
    },
    {
      icon: ExternalLink,
      title: "Blog",
      desc: "Tips dan update produk",
      link: "#"
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className='min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden pt-10'>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Support Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
            Pusat Bantuan
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Temukan jawaban cepat atau hubungi tim support kami untuk bantuan personal
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text"
              placeholder="Cari pertanyaan atau topik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                activeCategory === cat.id 
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' 
                  : 'bg-white/[0.02] border-white/[0.08] text-gray-400 hover:border-white/20'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {filteredFaqs.map((faq) => (
            <div 
              key={faq.id}
              className={`bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300 ${
                openFaq === faq.id ? 'border-cyan-500/30 bg-white/[0.04]' : 'hover:border-white/10'
              }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${
                  openFaq === faq.id ? 'rotate-180 text-cyan-400' : ''
                }`} />
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ${
                openFaq === faq.id ? 'pb-6 max-h-96' : 'max-h-0'
              }`}>
                <p className="text-gray-400 leading-relaxed text-sm">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Sumber Daya Lainnya</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((res, idx) => (
              <a 
                key={idx}
                href={res.link}
                className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <res.icon className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-1">{res.title}</h3>
                <p className="text-sm text-gray-500">{res.desc}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Masih butuh bantuan?</h2>
            <p className="text-gray-400">Tim support kami siap membantu Anda</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <a href="mailto:support@roadmapify.id" className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all group">
              <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                <Mail className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email Support</h3>
                <p className="text-sm text-gray-400">support@roadmapify.id</p>
              </div>
            </a>
            
            <a href="tel:+6281234567890" className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all group">
              <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                <Phone className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">WhatsApp </h3>
                <p className="text-sm text-gray-400">+62 857 8614 4772</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PusatBantuan;