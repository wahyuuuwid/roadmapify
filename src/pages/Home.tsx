import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, BookOpen, Target } from "lucide-react";
import useTypingPlaceholder from "../utils/DynamicTyping";

function Home() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const generatePath = () => {
    if (!topic.trim()) return;
    navigate(`/detail/${topic}`);
  };

  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter') generatePath();
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

const handleRecommendationClick = (item:any) => {
  setTopic(item);
  generatePath(); 
};

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden flex items-center justify-center px-4 pt-16">
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

      <div className="w-full max-w-2xl relative z-10">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-300">Powered by AI</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 bg-linear-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
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
                <Target className="w-4 h-4 text-indigo-400" />
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
              onClick={generatePath}
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
    </div>
  );
}

export default Home;