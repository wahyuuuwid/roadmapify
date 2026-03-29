import { useState, useEffect, useRef } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ProfileMenu } from "../ui/ProfilMenu";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
    return null;
  }
});

  window.addEventListener("storage", () => {
  const savedUser = localStorage.getItem("user");
  setUser(savedUser ? JSON.parse(savedUser) : null);
});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/tentang" },
    { name: "Kontak", href: "/kontak" },
    // { name: "About", href: "/about" },
  ];


useEffect(() => {
  setIsMobileMenuOpen(false);
}, [location.pathname]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-40 transition duration-500" />
              <div className="relative p-2 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl">
                <img src="/logo.png" alt="logo" className="w-6 h-6" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Roadmapify
              </span>
              {/* <span className="text-xs text-gray-400 -mt-1">Asisten Pembelajaran</span> */}
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium group"
              >
                {link.name}
              </Link>
            ))}
            
            {
              user ? (
                <ProfileMenu user={user} />
              ): (
                <Link to={`/auth/login/?ref=${Math.random().toString(36).substring(2)}`} className="relative px-6 py-2.5 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Gabung sekarang
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
              )
            }
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
      ref={menuRef}
        className={`md:hidden absolute z-60 top-full left-0 w-full bg-gray-900/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 font-medium"
            >
              {link.name}
            </Link>
          ))}
          {
            user ? (
              <Link className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 font-medium" to={'/akun/dashboard'} >
                Dasboard
              </Link>
            ): (
              <Link to={`/auth/login/?ref=${Math.random().toString(36).substring(2)}`} className="w-full mt-4 px-6 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Gabung sekarang
              </Link>
            )
          }
        </div>
      </div>
    </nav>
  );
};