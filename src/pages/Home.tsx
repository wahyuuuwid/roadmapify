import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  MessageSquare,
  Target,
  Zap,
  ChevronDown,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import useTypingPlaceholder from "../utils/DynamicTyping";
import { generateLearningPath } from "../services/generateLearningPath";
import LoadingScreen from "../components/layouts/LoadingScreen";

function Home() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") handleGenerate();
  };

  const suggestions = [
    "Bahasa Inggris",
    "Desain Grafis",
    "Public Speaking",
    "Digital Marketing",
    "Pemrograman",
    "Manajemen Keuangan",
    "UI/UX Design",
    "Data Analysis",
  ] as any;
  const placeholder = useTypingPlaceholder(suggestions);

  const recommendations = [
    "Machine Learning",
    "Bahasa Inggris",
    "UI/UX Design",
    "Digital Marketing",
    "Public Speaking",
    "Backend Developer",
    "Frontend Developer",
  ];

  const handleRecommendationClick = async (item: any) => {
    setTopic(item);
    await handleGenerate(item);
  };

  const handleGenerate = async (inputTopic?: string) => {
    const finalTopic = inputTopic || topic;

    if (!finalTopic.trim()) return;

    setIsLoading(true);
    try {
      const data = await generateLearningPath(finalTopic);
      navigate(`/roadmap/${data.data.id}`);
      setTopic("");
    } catch (err) {
      // console.error(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const faqs = [
  {
    question: "Apakah penggunaan ini gratis?",
    answer: "Ya! Kamu bisa membuat roadmap secara gratis."
  },
  {
    question: "Bagaimana AI membuat roadmap?",
    answer: "AI kami menganalisis topik yang kamu masukkan, mencari learning path terbaik dari berbagai sumber, lalu menyusunnya menjadi roadmap bertahap dengan estimasi waktu dan resource belajar yang relevan."
  },
  {
    question: "Skill apa saja yang didukung?",
    answer: "Hampir semua! Dari programming, design, data science, bahasa asing, musik, fotografi, marketing, hingga soft skill seperti public speaking dan leadership."
  },
  {
    question: "Bagaimana cara tracking progress?",
    answer: "Setiap step di roadmap bisa ditandai 'selesai'. Kamu juga bisa lihat statistik progress mingguan dan sisa waktu estimasi untuk menyelesaikan roadmap."
  }
];

const [openFaq, setOpenFaq] = useState(null);

const toggleFaq = (idx:any) => {
  setOpenFaq(openFaq === idx ? null : idx);
};
  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className=" bg-[#0a0a0f] text-white relative overflow-hidden  w-full mx-auto px-4 pt-26">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="w-full max-w-2xl relative z-10 mx-auto ">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-300">Powered by AI</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-linear-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            Asisten Pengembangan
            <br />
            Skill Pribadi
          </h1>

          <p className="text-center text-gray-400 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
            Buat roadmap pembelajaran personal dengan bantuan AI. Mulai dari nol
            hingga mahir dalam satu jalur yang terstruktur.
          </p>

          <div className="group relative">
            <div className="absolute -inset-1 bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                  {/* <Target className="w-4 h-4 text-indigo-400" /> */}
                  Topik yang ingin dipelajari
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Contoh: ${placeholder}`}
                    className="w-full p-4 pl-12 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                  />
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>

              <button
                onClick={() => handleGenerate()}
                disabled={!topic.trim()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group/btn w-full py-3 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Mulai Belajar
                  <ArrowRight
                    className={`w-5 h-5 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                  />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2 mb-10">
            {recommendations.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleRecommendationClick(item)}
                className="px-4 py-2 text-sm rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-indigo-600/20 hover:text-white hover:border-indigo-500/30 transition-all duration-300"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* AI Features - Redesigned as Bento Grid */}
        <div className="my-20 max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-indigo-300">Fitur Unggulan</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Didukung oleh AI Cerdas
            </h2>
            <p className="text-gray-400">
              Semua yang kamu butuhkan untuk belajar lebih efektif
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {[
              {
                icon: Sparkles,
                label: "Generate Otomatis",
                desc: "Buat roadmap belajar dalam hitungan detik",
                color: "from-purple-600/20 to-pink-600/20",
              },
              {
                icon: Target,
                label: "Path Sesuai Kamu",
                desc: "Disesuaikan dengan skill & tujuanmu",
                color: "from-indigo-600/20 to-blue-600/20",
              },
              {
                icon: BookOpen,
                label: "Resource Terbaik",
                desc: "Kumpulan resource terbaik & relevan",
                color: "from-emerald-600/20 to-teal-600/20",
              },
              {
                icon: Zap,
                label: "Track Progress",
                desc: "Lihat perkembangan belajarmu secara real-time",
                color: "from-rose-600/20 to-red-600/20",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">
                    {feature.label}
                  </h3>
                  <p className="text-xs text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-20 max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-4">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300 font-medium">
                Butuh bantuan?
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              Pertanyaan Umum
            </h2>
            <p className="text-gray-400 text-lg">
              Semua yang perlu kamu tahu sebelum memulai
            </p>
          </div>

          <div className="space-y-4 z-10 relative">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                  openFaq === idx
                    ? "bg-white/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10"
                    : "bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        openFaq === idx
                          ? "bg-indigo-500 text-white"
                          : "bg-white/10 text-gray-400 group-hover:bg-white/20"
                      }`}
                    >
                      <span className="text-sm font-bold">{idx + 1}</span>
                    </div>
                    <span
                      className={`font-semibold lg:text-lg text-md transition-colors ${
                        openFaq === idx
                          ? "text-indigo-300"
                          : "text-gray-200 group-hover:text-white"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`flex-shrink-0 ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      openFaq === idx
                        ? "bg-indigo-500 rotate-180"
                        : "bg-white/10 group-hover:bg-white/20"
                    }`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-colors ${
                        openFaq === idx ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    openFaq === idx
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="pl-12 border-l-2 border-indigo-500/30">
                      <p className="text-gray-300 text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-indigo-400" />
            </div>
            <p className="text-white font-semibold text-lg mb-2">
              Masih punya pertanyaan lain?
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Tim kami siap membantu kamu 24/7
            </p>
            <button
              onClick={() => navigate("/kontak")}
              type="button"
              className="relative cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Hubungi Kami
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
