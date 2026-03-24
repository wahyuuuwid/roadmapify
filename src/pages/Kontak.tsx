import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

function Kontak() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormData({ nama: '', email: '', pesan: '' });
    alert('Pesan berhasil dikirim! 🚀');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    { icon: BookOpen, href: '#', label: 'Github', color: 'hover:text-purple-400' },
    { icon: Sparkles, href: '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: BookOpen, href: '#', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: Sparkles, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
  ];

  return (
    <div className='min-h-screen bg-[#0a0a0f] pb-20 text-white relative overflow-hidden flex items-center justify-center px-4 pt-16'>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(168,85,247,0.2) 50%, transparent 70%)',
            left: `${mousePosition.x - 30}%`,
            top: `${mousePosition.y - 30}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
            right: '10%',
            bottom: '20%',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDuration: `${3 + i}s`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Let's Connect</span>
          </div>
          <h1 className="text-5xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
            Hubungi Kami
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Punya ide menarik atau ingin berkolaborasi? Kirim pesan dan kita mulai percakapan.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, title: 'Email', value: 'idwahyu58@gmail.com'},
              { icon: Phone, title: 'Telepon', value: '+62 857 8614 4772'},
              { icon: MapPin, title: 'Lokasi', value: 'Purwokerto, Jawa Tengah, Indonesia'},
            ].map((item, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/30 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 group-hover:from-purple-500/30 group-hover:to-indigo-500/30 transition-all">
                    <item.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-white text-sm mb-1">{item.value}</p>
                    {/* <p className="text-sm text-gray-500">{item.desc}</p> */}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            ))}

            <div className="pt-6">
              <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider font-medium">Ikuti Kami</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/10 ${social.color} group`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="relative p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-transparent to-indigo-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Nama Lengkap</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-xl bg-black/20 border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 text-white placeholder-gray-600"
                      placeholder="John Doe"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-xl bg-black/20 border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 text-white placeholder-gray-600"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Pesan</label>
                  <div className="relative group">
                    <textarea
                      name="pesan"
                      value={formData.pesan}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-6 py-4 rounded-xl bg-black/20 border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 text-white placeholder-gray-600 resize-none"
                      placeholder="Ceritakan tentang project Anda..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full py-4 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold overflow-hidden group hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Pesan
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}

export default Kontak;