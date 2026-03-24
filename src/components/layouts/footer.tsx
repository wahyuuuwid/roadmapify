import { Link } from "react-router-dom";
import { BookOpen, Sparkles, Mail, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
    //   { name: "Features", href: "#" },
      { name: "API", href: "#" },
      { name: "Integrations", href: "#" },
    ],
    
    resources: [
      { name: "Documentation", href: "#" },
      { name: "Pusat Bantuan", href: "/pusat-bantuan" },
      { name: "Kontak", href: "/kontak" },
    ],
    legal: [
      { name: "Privacy", href: "/privacy-policy" },
      { name: "Terms", href: "/terms-and-conditions" },
    //   { name: "Cookies", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "GitHub", icon: BookOpen, href: "#" },
    { name: "Twitter", icon: Sparkles, href: "#" },
    { name: "LinkedIn", icon: ArrowUpRight, href: "#" },
    { name: "Email", icon: Mail, href: "#" },
  ];

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-white/10">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-40 transition duration-500" />
                <div className="relative p-2 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl">
                  <img src="/logo.png" alt="logo" className="w-6 h-6" />
                </div>
              </div>
              <span className="text-lg font-bold text-white">Roadmapify</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Bangun jalur pembelajaran personal dengan AI dan kuasai keterampilan melalui roadmap yang terstruktur.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 border border-white/5 hover:border-white/20"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* <div className="relative p-6 md:p-8 rounded-2xl bg-linear-to-r from-indigo-600/10 to-purple-600/10 border border-white/10 mb-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                Stay updated with our latest features
              </h3>
              <p className="text-gray-400 text-sm">Get notified when we release new learning paths and features.</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 text-sm"
              />
              <button className="px-6 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Roadmapify. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:text-white transition-colors">Terms and Conditions</a>
            {/* <a href="#" className="hover:text-white transition-colors">Cookies</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};