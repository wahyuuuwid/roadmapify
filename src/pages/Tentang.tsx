import { Sparkles, Target, Zap, Users, ArrowRight, BookOpen, Brain, Rocket } from 'lucide-react';

function Tentang() {
  return (
    <div className='min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden pt-10'>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-150 h-150 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-125 h-125 bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-cyan-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="text-center mb-24 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Platform Pembelajaran AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            Roadmapify
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
            Bangun jalur pembelajaran personal dengan AI dan kuasai keterampilan melalui roadmap yang terstruktur.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button className="group px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] transition-all duration-300 flex items-center justify-center gap-2">
              Mulai Perjalanan Anda
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-6">
  <h2 className="text-3xl md:text-4xl font-bold text-white">
    Kami Membuka Akses <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">Belajar untuk Semua</span>
  </h2>
  <p className="text-gray-400 text-lg leading-relaxed">
    Kami percaya bahwa pembelajaran berkualitas tidak boleh terbatas oleh latar belakang atau akses. Roadmapify hadir untuk membantu Anda belajar dengan arah yang jelas, terstruktur, dan sesuai tujuan—tanpa harus tersesat di tengah banyaknya informasi.
  </p>
  <p className="text-gray-400 text-lg leading-relaxed">
    Dengan pendekatan berbasis AI, kami merancang jalur belajar yang personal agar Anda bisa berkembang lebih cepat, lebih fokus, dan lebih percaya diri dalam mencapai tujuan karir Anda.
  </p>
  <div className="flex gap-8 pt-4">
    
  </div>
</div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-purple-600/30 to-blue-600/30 rounded-3xl blur-2xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">AI Personalization</h3>
                  <p className="text-gray-400 text-sm">Algoritma canggih yang memahami gaya belajar dan kecepatan Anda</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Goal-Oriented</h3>
                  <p className="text-gray-400 text-sm">Roadmap yang disusun berdasarkan tujuan karir spesifik Anda</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-xl">
                  <Rocket className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Accelerated Growth</h3>
                  <p className="text-gray-400 text-sm">Hemat waktu dengan jalur belajar yang teroptimasi dan terarah</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: BookOpen,
              title: "Kurikulum Adaptif",
              desc: "Materi pembelajaran yang menyesuaikan dengan perkembangan dan pemahaman Anda secara real-time",
              gradient: "from-pink-500 to-rose-500"
            },
            {
              icon: Zap,
              title: "AI Learning Assistant",
              desc: "Asisten pintar 24/7 yang siap menjawab pertanyaan dan memberikan penjelasan mendalam",
              gradient: "from-yellow-500 to-orange-500"
            },
            {
              icon: Users,
              title: "Komunitas Aktif",
              desc: "Bergabung dengan ribuan learner lain untuk berkolaborasi dan berbagi pengalaman",
              gradient: "from-green-500 to-emerald-500"
            }
          ].map((feature, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />
              <div className="relative h-full bg-white/3 backdrop-blur-sm border border-white/8 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className={`inline-flex p-3 rounded-xl bg-linear-to-r ${feature.gradient} bg-opacity-10 mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-purple-900/50 to-blue-900/50 border border-white/10 p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">Siap untuk Transformasi?</h2>
            <p className="text-gray-300 text-lg">
              Bergabunglah dengan revolusi pembelajaran. Jadilah bagian dari generasi yang menguasai masa depan melalui teknologi dan pengetahuan yang terstruktur.
            </p>
            <button className="mt-8 px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Gabung Sekarang - Gratis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tentang;