import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLearningPath } from "../services/getLearningPath";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ExternalLink,
  Loader2,
  AlertCircle,
  Trophy,
  CheckCircle2,
  Clock,
  BookOpen,
  Target,
  Sparkles,
  PlayCircle,
  Lock,
  Unlock,
  Flame,
  Zap,
  Award,
  XCircle,
  X,
} from "lucide-react";
import { saveProgress } from "../services/account/saveProgress";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState<number | null>(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    type: "warning",
    actionText: "Login",
    onAction: () => {},
  });

  const showModal = (config: typeof modalConfig) => {
    setModalConfig(config);
    setShowLoginModal(true);
  };

  useEffect(() => {
    const saved = localStorage.getItem(`progress-${id}`);
    if (saved) setCompleted(JSON.parse(saved));
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`progress-${id}`, JSON.stringify(completed));
  }, [completed, id]);

  useEffect(() => {
    if (
      data &&
      completed.length === data.milestones.length &&
      completed.length > 0
    ) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [completed, data]);

  const fetchLearningPath = async () => {
    try {
      const res = await getLearningPath(id);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchLearningPath();
  }, [id]);

  useEffect(() => {
    if (
      data &&
      completed.length === data.milestones.length &&
      completed.length > 0
    ) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [completed, data]);

  useEffect(() => {
    if (data && data.progress) {
      setCompleted(data.progress.completed_chapters || []);
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.id.split("-")[1]);
            setActiveChapter(index);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-100px 0px -50% 0px" },
    );

    data?.milestones?.forEach((_: any, i: number) => {
      const el = document.getElementById(`chapter-${i}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data]);

  const toggleComplete = (index: number) => {
    const token = localStorage.getItem("token");

      if (!token) {
        showModal({
          title: "Login Diperlukan",
          message:
            "Silakan login terlebih dahulu untuk menyimpan progress belajar Anda.",
          type: "warning",
          actionText: "Login Sekarang",
          onAction: () => {
            setShowLoginModal(false);
            navigate(`/auth/login/?ref=${Math.random().toString(36).substring(2)}`, { replace: true, state: { from: location.pathname } });
          },
        });
        return;
      }
    if (completed.includes(index)) {
      setCompleted(completed.filter((i) => i !== index));
    } else {
      setCompleted([...completed, index]);
    }
  };

  useEffect(() => {
    // console.log(completed);
    const data = {
      learningPathID: id,
      completedChapters: completed,
    };
    if (completed.length > 0) {
      saveProgressChapter(data);
    }
  }, [completed]);

  const scrollToChapter = (i: number) => {
    const el = document.getElementById(`chapter-${i}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const markAllComplete = () => {
    const token = localStorage.getItem("token");

      if (!token) {
        showModal({
          title: "Login Diperlukan",
          message:
            "Silakan login terlebih dahulu untuk menyimpan progress belajar Anda.",
          type: "warning",
          actionText: "Login Sekarang",
          onAction: () => {
            setShowLoginModal(false);
            navigate(`/auth/login/?ref=${Math.random().toString(36).substring(2)}`, { replace: true, state: { from: location.pathname } });
          },
        });
        return;
      }
    const all = data.milestones.map((_: any, i: number) => i);
    setCompleted(all);
  };

  const resetProgress = () => {
    const token = localStorage.getItem("token");

      if (!token) {
        showModal({
          title: "Login Diperlukan",
          message:
            "Silakan login terlebih dahulu untuk menyimpan progress belajar Anda.",
          type: "warning",
          actionText: "Login Sekarang",
          onAction: () => {
            setShowLoginModal(false);
            navigate(`/auth/login/?ref=${Math.random().toString(36).substring(2)}`, { replace: true, state: { from: location.pathname } });
          },
        });
        return;
      }
    if (confirm("Reset semua progress?")) {
      setCompleted([]);
      saveProgress({
        learningPathID: id,
        completedChapters: [],
      });
    }
  };

  const saveProgressChapter = async (data: any) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showModal({
          title: "Login Diperlukan",
          message:
            "Silakan login terlebih dahulu untuk menyimpan progress belajar Anda.",
          type: "warning",
          actionText: "Login Sekarang",
          onAction: () => {
            setShowLoginModal(false);
            navigate(`/auth/login/?ref=${Math.random().toString(36).substring(2)}`, { replace: true, state: { from: location.pathname } });
          },
        });
        return;
      }

      const res = await saveProgress(data);
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        showModal({
          title: "Sesi Berakhir",
          message:
            "Sesi Anda telah berakhir. Silakan login kembali untuk melanjutkan.",
          type: "error",
          actionText: "Login Kembali",
          onAction: () => {
            setShowLoginModal(false);
            navigate(`/auth/login/?ref=${Math.random().toString(36).substring(2)}`, { replace: true, state: { from: location.pathname } });
          },
        });
      }
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Loader2 className="w-12 h-12 text-indigo-400" />
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <AlertCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
          <p className="text-white text-lg">Data tidak ditemukan</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition"
          >
            Kembali
          </button>
        </motion.div>
      </div>
    );
  }

  const total = data.milestones.length;
  const progress = Math.round((completed.length / total) * 100);
  const isCompleted = progress === 100;

  return (
    <div className="min-h-screen bg-gradient-to-br relative from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, x: Math.random() * 1000 - 500, rotate: 0 }}
                animate={{
                  y: 1000,
                  x: Math.random() * 200 - 100,
                  rotate: 360 * Math.random(),
                }}
                transition={{ duration: 3, delay: i * 0.1, ease: "easeOut" }}
                className="absolute w-4 h-4 rounded"
                style={{
                  backgroundColor: [
                    "#fbbf24",
                    "#f472b6",
                    "#60a5fa",
                    "#a78bfa",
                    "#34d399",
                  ][i % 5],
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-all"
        >
          <div className="p-2 rounded-full bg-slate-800/50 group-hover:bg-indigo-600/20 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium">Kembali</span>
        </motion.button>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                  Learning Path
                </span>
                {isCompleted && (
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold border border-green-500/30 flex items-center gap-1">
                    <Award className="w-3 h-3" /> Completed
                  </span>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent mb-4">
                {data.topic}
              </h1>

              <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                {data.outcome}
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8 max-w-md">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                  <BookOpen className="w-5 h-5 text-indigo-400 mb-2" />
                  <p className="text-2xl font-bold">{total}</p>
                  <p className="text-xs text-slate-500">Chapters</p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                  <Target className="w-5 h-5 text-green-400 mb-2" />
                  <p className="text-2xl font-bold">{progress}%</p>
                  <p className="text-xs text-slate-500">Progress</p>
                </div>
              </div>
            </div>

            <div className="lg:w-80 bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-300">
                  Progress
                </span>
                <span className="text-2xl font-bold text-indigo-400">
                  {progress}%
                </span>
              </div>

              <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`absolute h-full rounded-full ${
                    isCompleted
                      ? "bg-gradient-to-r from-green-400 to-emerald-500"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500"
                  }`}
                />
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                <span>
                  {completed.length} dari {total} Selesai
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={markAllComplete}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Mark All Complete
                </button>
                <button
                  onClick={resetProgress}
                  className="w-full py-2.5 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-all"
                >
                  Reset Progress
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-4">
              <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-5 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-200">Chapters</h3>
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>

                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {data.milestones.map((milestone: any, i: number) => {
                    const isCompleted = completed.includes(i);
                    const isActive = activeChapter === i;
                    const isLocked =
                      i > 0 &&
                      !completed.includes(i - 1) &&
                      !completed.includes(i);

                    return (
                      <motion.button
                        key={i}
                        onClick={() => !isLocked && scrollToChapter(i)}
                        whileHover={{ scale: isLocked ? 1 : 1.02 }}
                        whileTap={{ scale: isLocked ? 1 : 0.98 }}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                          isActive
                            ? "bg-indigo-600/20 border border-indigo-500/50"
                            : isCompleted
                              ? "bg-green-600/10 border border-green-500/30"
                              : isLocked
                                ? "bg-slate-800/50 opacity-50 cursor-not-allowed"
                                : "bg-slate-800/30 hover:bg-slate-800/50 border border-transparent hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                              isCompleted
                                ? "bg-green-500 text-white"
                                : isActive
                                  ? "bg-indigo-500 text-white"
                                  : isLocked
                                    ? "bg-slate-700 text-slate-500"
                                    : "bg-slate-700 text-slate-300 group-hover:bg-slate-600"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : isLocked ? (
                              <Lock className="w-4 h-4" />
                            ) : (
                              i + 1
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-medium truncate ${
                                isActive
                                  ? "text-indigo-300"
                                  : isCompleted
                                    ? "text-green-300"
                                    : "text-slate-300"
                              }`}
                            >
                              {milestone.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {milestone.topics?.length || 0} topics
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl p-5 border border-indigo-500/30">
                <h4 className="font-semibold text-indigo-300 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Tips Belajar
                </h4>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    Klik nomor chapter untuk menandai selesai
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    Scroll untuk melihat detail materi
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    Gunakan resources untuk belajar lebih lanjut
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 xl:col-span-9">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-transparent" />

              <div className="space-y-8">
                {data.milestones.map((milestone: any, i: number) => {
                  const isCompleted = completed.includes(i);
                  const isActive = activeChapter === i;

                  return (
                    <motion.div
                      key={i}
                      id={`chapter-${i}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="relative pl-16"
                    >
                      <motion.button
                        onClick={() => toggleComplete(i)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 ${
                          isCompleted
                            ? "bg-gradient-to-br from-green-400 to-emerald-600 shadow-green-500/30"
                            : isActive
                              ? "bg-gradient-to-br from-indigo-400 to-purple-600 shadow-indigo-500/30 ring-4 ring-indigo-500/20"
                              : "bg-slate-800 border-2 border-slate-600 hover:border-indigo-500"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        ) : (
                          <span
                            className={`text-lg font-bold ${isActive ? "text-white" : "text-slate-400"}`}
                          >
                            {i + 1}
                          </span>
                        )}
                      </motion.button>

                      <motion.div
                        whileHover={{ y: -2 }}
                        className={`bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
                          isActive
                            ? "border-indigo-500/50 shadow-lg shadow-indigo-500/10"
                            : isCompleted
                              ? "border-green-500/30"
                              : "border-slate-700/50 hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">
                              {milestone.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                              {milestone.description}
                            </p>
                          </div>
                          {isCompleted && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="bg-green-500/20 p-2 rounded-full"
                            >
                              <Trophy className="w-5 h-5 text-green-400" />
                            </motion.div>
                          )}
                        </div>

                        {milestone.topics && milestone.topics.length > 0 && (
                          <div className="mb-5">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                              Topics
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {milestone.topics.map(
                                (topic: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 text-sm border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
                                  >
                                    {topic}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {milestone.resources &&
                          milestone.resources.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                Resources
                              </p>

                              <div className="flex flex-col gap-2">
                                {milestone.resources.map(
                                  (resource: any, idx: number) => (
                                    <motion.a
                                      key={idx}
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      whileHover={{ x: 4 }}
                                      whileTap={{ scale: 0.98 }}
                                      className="
            group flex items-center gap-3 
            p-3 sm:p-4
            rounded-xl 
            bg-slate-900/50 
            border border-slate-700/50 
            active:scale-[0.98]
            transition-all
          "
                                    >
                                      <div
                                        className="
            w-9 h-9 sm:w-10 sm:h-10 
            shrink-0
            rounded-lg 
            bg-indigo-600/20 
            flex items-center justify-center
          "
                                      >
                                        <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                                      </div>

                                      <div className="flex-1 min-w-0">
                                        <p
                                          className="
              text-sm sm:text-base 
              font-medium 
              text-slate-200 
              line-clamp-2
            "
                                        >
                                          {resource.title}
                                        </p>

                                        <p
                                          className="
              hidden sm:block
              text-xs text-slate-500 truncate
            "
                                        >
                                          {resource.url}
                                        </p>
                                      </div>

                                      <ExternalLink
                                        className="
            w-4 h-4 
            text-slate-500 
            shrink-0
          "
                                      />
                                    </motion.a>
                                  ),
                                )}
                              </div>
                            </div>
                          )}

                        <div className="mt-5 flex items-center justify-between gap-4">
                          <button
                            onClick={() => toggleComplete(i)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              isCompleted
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                : "bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30"
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                Completed
                              </>
                            ) : (
                              <>
                                <Unlock className="w-4 h-4" />
                                Mark as Complete
                              </>
                            )}
                          </button>

                          <span className="text-xs text-slate-500">
                            Chapter {i + 1} dari {total}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 text-center relative pl-16"
              >
                <div
                  className={`inline-flex flex-col items-center p-8 rounded-3xl border-2 transition-all duration-500 ${
                    isCompleted
                      ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50"
                      : "bg-slate-800/30 border-slate-700"
                  }`}
                >
                  <motion.div
                    animate={
                      isCompleted
                        ? { rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }
                        : {}
                    }
                    transition={{
                      duration: 0.5,
                      repeat: isCompleted ? Infinity : 0,
                      repeatDelay: 2,
                    }}
                  >
                    <Trophy
                      className={`w-16 h-16 mb-4 ${isCompleted ? "text-yellow-400" : "text-slate-600"}`}
                    />
                  </motion.div>

                  <h3
                    className={`text-2xl font-bold mb-2 ${isCompleted ? "text-yellow-400" : "text-slate-500"}`}
                  >
                    {isCompleted
                      ? "Selamat!"
                      : "Kamu belum menyelesaikan semua chapter"}
                  </h3>

                  <p
                    className={`max-w-md ${isCompleted ? "text-yellow-200/70" : "text-slate-500"}`}
                  >
                    {isCompleted
                      ? "Kamu telah menyelesaikan semua chapter. Pertahankan momentum belajarmu!"
                      : ""}
                  </p>

                  {/* {isCompleted && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white font-semibold shadow-lg shadow-yellow-500/25"
                    >
                      Share Achievement
                    </motion.button>
                  )} */}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  modalConfig.type === "warning"
                    ? "bg-amber-500/20 text-amber-400"
                    : modalConfig.type === "error"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                }`}
              >
                {modalConfig.type === "warning" && (
                  <AlertCircle className="w-6 h-6" />
                )}
                {modalConfig.type === "error" && (
                  <XCircle className="w-6 h-6" />
                )}
                {modalConfig.type === "success" && (
                  <CheckCircle2 className="w-6 h-6" />
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {modalConfig.title}
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                {modalConfig.message}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={modalConfig.onAction}
                  className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-all ${
                    modalConfig.type === "error"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {modalConfig.actionText}
                </button>
              </div>

              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 p-1 rounded-full text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.7);
        }
      `}</style>
    </div>
  );
}

export default Detail;
