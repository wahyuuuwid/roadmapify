import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Globe,
  Edit3,
  Camera,
  Award,
  BookOpen,
  Target,
  TrendingUp,
  Clock,
  Star,
  Zap,
  Shield,
  Bell,
  LogOut,
  ChevronRight,
  Save,
  X,
  CheckCircle,
  Lock,
  FileText,
  Download,
  StarHalf
} from 'lucide-react';

// Mock data - ganti dengan data dari API/backend
const mockUserData = {
  full_name: "John Doe",
  email: "john.doe@example.com",
  username: "johndoe",
  avatar: null,
  bio: "Frontend Developer passionate about React and modern web technologies. Always learning, always growing.",
  location: "Jakarta, Indonesia",
  website: "https://johndoe.dev",
  joinDate: "2024-01-15",
  social: {
    github: "johndoe",
    twitter: "johndoe",
    linkedin: "john-doe"
  },
  stats: {
    totalXP: 12500,
    streakDays: 15,
    completedRoadmaps: 3,
    inProgressRoadmaps: 2,
    totalHoursLearned: 48,
    certificates: 3
  },
  recentActivity: [
    { type: 'completed', title: "React Advanced Patterns", date: "2 hari yang lalu", xp: 2400 },
    { type: 'started', title: "Full Stack Architecture", date: "5 hari yang lalu", xp: 0 },
    { type: 'achievement', title: "7 Days Streak", date: "1 minggu yang lalu", xp: 500 },
    { type: 'completed', title: "Frontend Fundamentals", date: "2 minggu yang lalu", xp: 1200 }
  ],
  achievements: [
    { id: 1, title: "Early Bird", description: "Belajar selama 7 hari berturut-turut", icon: "🌅", unlocked: true },
    { id: 2, title: "Roadmap Master", description: "Selesaikan 3 roadmap", icon: "🏆", unlocked: true },
    { id: 3, title: "XP Hunter", description: "Kumpulkan 10,000 XP", icon: "⚡", unlocked: true },
    { id: 4, title: "Perfect Score", description: "Selesaikan roadmap dengan 100% progress", icon: "💯", unlocked: false },
    { id: 5, title: "Speedster", description: "Selesaikan roadmap dalam waktu kurang dari 1 minggu", icon: "🚀", unlocked: false },
    { id: 6, title: "Knowledge Sharer", description: "Bagikan progress ke sosial media", icon: "📢", unlocked: false }
  ]
};

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [editedData, setEditedData] = useState(mockUserData);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Load user data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(prev => ({ ...prev, ...parsed }));
      setEditedData(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  const handleSave = () => {
    setUser(editedData);
    localStorage.setItem("user", JSON.stringify(editedData));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'activity', label: 'Aktivitas', icon: Clock },
    { id: 'achievements', label: 'Achievement', icon: Award },
    { id: 'settings', label: 'Pengaturan', icon: Shield }
  ];

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
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              Profile
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            Profil Saya
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 sticky top-24">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-4xl font-bold">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.full_name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    user.full_name.charAt(0).toUpperCase()
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors shadow-lg">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white mb-1">{user.full_name}</h2>
                <p className="text-slate-400 text-sm">@{user.username}</p>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-3"
              >
                <Edit3 className="w-4 h-4" />
                {isEditing ? 'Batal Edit' : 'Edit Profil'}
              </button>

              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-medium text-sm hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </div>
          </motion.div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex gap-2 mb-6 overflow-x-auto pb-2"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </motion.div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants as any} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Roadmap Selesai', value: user.stats.completedRoadmaps, icon: CheckCircle, color: 'from-green-400 to-emerald-500' },
                      { label: 'Dalam Progres', value: user.stats.inProgressRoadmaps, icon: BookOpen, color: 'from-blue-400 to-cyan-500' },
                      { label: 'Jam Belajar', value: user.stats.totalHoursLearned, icon: Clock, color: 'from-orange-400 to-red-500' },
                      { label: 'Sertifikat', value: user.stats.certificates, icon: Award, color: 'from-purple-400 to-pink-500' }
                    ].map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                          <div className="text-xs text-slate-400">{stat.label}</div>
                        </div>
                      );
                    })}
                  </motion.div>

                  
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants as any} className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-indigo-400" />
                      Notifikasi
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Email notifikasi harian', desc: 'Terima ringkasan belajar harian' },
                        { label: 'Reminder streak', desc: 'Pengingat untuk menjaga streak belajar' },
                        { label: 'Update roadmap baru', desc: 'Notifikasi ketika ada roadmap baru' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
                          <div>
                            <div className="font-medium text-white">{item.label}</div>
                            <div className="text-sm text-slate-500">{item.desc}</div>
                          </div>
                          <button className="w-12 h-6 bg-indigo-500 rounded-full relative">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants as any} className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-indigo-400" />
                      Privasi & Keamanan
                    </h3>
                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-xl hover:bg-slate-800/50 transition-colors group">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-slate-400" />
                          <div className="text-left">
                            <div className="font-medium text-white">Ubah Password</div>
                            <div className="text-sm text-slate-500">Perbarui password akunmu</div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-xl hover:bg-slate-800/50 transition-colors group">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-slate-400" />
                          <div className="text-left">
                            <div className="font-medium text-white">Export Data</div>
                            <div className="text-sm text-slate-500">Download data belajarmu</div>
                          </div>
                        </div>
                        <Download className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-white mb-2">Konfirmasi Keluar</h3>
              <p className="text-slate-400 mb-6">Apakah kamu yakin ingin keluar dari akun?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 bg-slate-700/50 rounded-xl font-medium text-sm hover:bg-slate-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-medium text-sm hover:bg-red-500/30 transition-colors"
                >
                  Ya, Keluar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Profile;