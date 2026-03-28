import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, LayoutDashboard, LogOut, ChevronDown} from "lucide-react";

interface UserType {
  id: string;
  full_name?: string;
  email?: string;
  avatar?: string;
}

interface ProfileMenuProps {
  user: UserType | null;
}

export const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open && isMobile ? "hidden" : "auto";
  }, [open, isMobile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const menuItems = [
    { label: "Profile", icon: <User size={18} />, link: `/profile/${user?.id || "" }` },
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, link: "/dashboard" },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
      >
        <img
          src={user?.avatar || "/profile.jpg"}
          alt="profile"
          className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-indigo-500 transition-all"
        />
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-white">{user?.full_name || "User"}</p>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {!isMobile && open && (
        <div className="absolute right-0 mt-3 w-64 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-4 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar || "/profile.jpg"}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500"
              />
              <div>
                <p className="font-semibold text-white">{user?.full_name || "User"}</p>
                <p className="text-xs text-gray-400 truncate max-w-[140px]">{user?.email || "user@email.com"}</p>
              </div>
            </div>
          </div>

          <div className="p-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.link}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
              >
                <span className="text-gray-400 group-hover:text-indigo-400 transition-colors">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="h-px bg-white/10 mx-2" />
          <div className="p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 group"
            >
              <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      
    </div>
  );
};