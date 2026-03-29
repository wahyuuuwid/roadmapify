import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Trophy,
  Target,
  Zap,
  ChevronRight,
  Clock,
  Star,
  TrendingUp,
  Award,
  PlayCircle,
  Lock,
  Unlock,
  Flame,
  Sparkles,
  ChevronLeft,
  MoreHorizontal,
  ArrowRight,
  CheckCircle,
  Compass,
  Rocket,
  Lightbulb
} from 'lucide-react';
import { getAllLearningPaths } from '../../services/account/dashboard';


function Dashboard() {
  const navigate = useNavigate();
  const [paths, setPaths] = useState<any>([]);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
    return null;
  }
});


 useEffect(() => {
  const fetchLearningPaths = async () => {
    try {
      const res = await getAllLearningPaths();
      const data = res.data;
      if (data && data.length > 0) {
        setPaths(data.reverse());
      }
    } catch (error) {
      console.error("Error fetching learning paths:", error);
    }
  };

  fetchLearningPaths();
}, []);


  const totalRoadmaps = paths.length;
  const completedRoadmap = paths.filter((path:any) => {
  const total = path.milestones?.length ?? 0;
  const done = path.progress?.completed_chapters?.length ?? 0;
  return total > 0 && done === total;
}).length;
const overallProgress =
  totalRoadmaps > 0
    ? Math.round((completedRoadmap / totalRoadmaps) * 100)
    : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const handlePathClick = (pathId:any) => {
    navigate(`/roadmap/${pathId}`);
  };

const completedRoadmaps = paths.filter((path:any) => {
  const total = path.milestones?.length ?? 0;
  const done = path.progress?.completed_chapters?.length ?? 0;
  return total > 0 && done === total;
}).length;

const inProgressRoadmaps = paths.filter((path:any) => {
  const total = path.milestones?.length ?? 0;
  const done = path.progress?.completed_chapters?.length ?? 0;
  return done > 0 && done < total;
}).length;

  const stats = [
    {
      title: "Roadmap",
      value: paths.length,
      icon: Target,
      gradient: "from-red-400 to-orange-500",
      shadow: "shadow-red-500/20",
    },
    {
      title: "Selesai",
      value: completedRoadmaps,
      icon: CheckCircle,
      gradient: "from-green-400 to-emerald-500",
      shadow: "shadow-green-500/20",
    },
    {
      title: "Dalam Progres",
      value: inProgressRoadmaps,
      icon: Clock,
      gradient: "from-blue-400 to-cyan-500",
      shadow: "shadow-blue-500/20",
    },
    
  ];

  // Komponen Empty State untuk Roadmap Kosong
  const EmptyRoadmapState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden  p-8 md:p-12"
    >
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative mb-8"
        >
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center">
            <Compass className="w-16 h-16 text-indigo-400" />
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute -bottom-1 -left-3"
          >
            <Lightbulb className="w-5 h-5 text-amber-400" />
          </motion.div>
        </motion.div>

        <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent mb-4">
          Belum Ada Roadmap
        </h3>
        
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          Kamu belum memiliki roadmap pembelajaran. Mulai perjalanan dengan memilih roadmap pertama dan capai tujuan karirmu!
        </p>


        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 flex items-center gap-3"
        >
          <Rocket className="w-5 h-5 group-hover:animate-bounce" />
          <span>Generate Roadmap</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden py-16">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                  Dashboard
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent mb-2">
                Roadmap Dashboard
              </h1>
              <p className="text-slate-400 text-lg">
                Hi {user?.full_name}, Selamat datang di halaman dashboard belajar kamu.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-4 flex items-center gap-3 w-full sm:w-auto"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg ${item.shadow}`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">
                        {item.title}
                      </p>
                      <p className="text-2xl font-bold">{item.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-medium text-slate-300">
                  Overall Progress
                </span>
              </div>
              <span className="text-sm font-bold text-indigo-400">
                {overallProgress}%
              </span>
            </div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full"
              />
            </div>
            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>
                {completedRoadmap} dari {totalRoadmaps} roadmap selesai
              </span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-400" />
                Roadmap Kamu
              </h2>
            </div>

            {/* Conditional Rendering: Empty State atau List Roadmap */}
            {paths.length === 0 ? (
              <EmptyRoadmapState />
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {paths.map((path:any, index:number) => (
                  <motion.div
                    key={path.id}
                    variants={itemVariants as any}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePathClick(path.id)}
                    onMouseEnter={() => setHoveredPath(path.id)}
                    onMouseLeave={() => setHoveredPath(null)}
                    className={`group relative bg-slate-800/40 backdrop-blur-sm border rounded-2xl p-6 cursor-pointer transition-all duration-300 overflow-hidden ${
                      path?.progress?.completed_chapters.length === path?.milestones?.length
                        ? "border-green-500/30 hover:border-green-500/50"
                        : "border-slate-700/50 hover:border-indigo-500/50"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${path.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    <div className="relative z-10 flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                        >
                          {path.icon}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {path?.progress?.completed_chapters.length === path?.milestones?.length && (
                                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium flex items-center gap-1">
                                  <Award className="w-3 h-3" /> Selesai
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                              {path.topic}
                            </h3>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                              {path.progress
                                ? Math.round(
                                    (path.progress.completed_chapters.length / path.milestones.length) * 100
                                  )
                                : 0}
                              %
                            </div>
                            <div className="text-xs text-slate-500">Selesai</div>
                          </div>
                        </div>

                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                          {path.outcome}
                        </p>

                        <div className="mb-4">
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${
                                  path.milestones?.length
                                    ? ((path.progress?.completed_chapters?.length ?? 0) /
                                        path.milestones.length) *
                                      100
                                    : 0
                                }%`,
                              }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              className={`h-full rounded-full bg-gradient-to-r ${path.color}`}
                            />
                          </div>
                          <div className="mt-2 flex justify-between text-xs text-slate-500">
                            <span>
                              {path.progress?.completed_chapters?.length ?? 0} dari {path.milestones?.length ?? 0} chapter selesai
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <motion.button
                            whileHover={{ x: 4 }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              path.progress?.completed_chapters?.length == path.milestones?.length
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                : "bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30"
                            }`}
                          >
                            {path.progress?.completed_chapters?.length == path.milestones?.length ? "Review Kembali" : "Lanjutkan"}
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-lg border border-indigo-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-indigo-300 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Challenge Harian
                </h3>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Selesaikan challenge harian untuk meningkatkan kemampuan
              </p>
              <div className="flex items-center gap-2 mb-4">
                
              </div>
              <motion.button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
              >
                <BookOpen className="w-4 h-4" />
                Lanjut Belajar
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;