import { useState, useEffect } from "react";
import { Loader2, Brain, Search, Layers, Flag, CheckCircle2 } from "lucide-react";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [progress, setProgress] = useState(0);

 const statuses = [
  {
    text: 'Menganalisis kebutuhan kamu...',
    icon: Brain,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/20',
  },
  {
    text: 'Mencari resource terbaik...',
    icon: Search,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
  },
  {
    text: 'Menyusun modul pembelajaran...',
    icon: Layers,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
  },
  {
    text: 'Membuat milestone...',
    icon: Flag,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
  },
  {
    text: 'Menyelesaikan learning path kamu...',
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
  },
];

  useEffect(() => {
    if (!isLoading) {
      setCurrentStatus(0);
      setProgress(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    const statusInterval = setInterval(() => {
      setCurrentStatus((prev) => {
        if (prev < statuses.length - 1) return prev + 1;
        return prev;
      });
    }, 1000); 

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  const CurrentIcon = statuses[currentStatus].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]/95 backdrop-blur-xl">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative w-full max-w-md mx-4">
        <div className="relative bg-gray-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-50" />

          <div className="relative flex flex-col items-center text-center space-y-6">
            <div className={`
              relative p-4 rounded-2xl ${statuses[currentStatus].bgColor} 
              transition-all duration-500 ease-out transform
            `}>
              <CurrentIcon 
                className={`w-8 h-8 ${statuses[currentStatus].color} animate-pulse`} 
              />
              <div className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-white/20" />
            </div>

            <div className="h-8 overflow-hidden">
              <div 
                className="transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${currentStatus * 2}rem)` }}
              >
                {statuses.map((status, index) => (
                  <div 
                    key={index}
                    className="h-8 flex items-center justify-center"
                  >
                    <span className={`text-lg font-medium ${
                      index === currentStatus ? 'text-white' : 'text-gray-500'
                    } transition-colors duration-300`}>
                      {status.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs text-gray-400 px-1">
                <span>Dalam proses</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {statuses.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index <= currentStatus 
                      ? 'w-6 bg-gradient-to-r from-indigo-500 to-purple-500' 
                      : 'w-1.5 bg-white/10'
                  }`}
                />
              ))}
            </div>

            <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6 animate-pulse">
            Tunggu sebentar yaaw~
        </p>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;