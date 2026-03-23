import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e:any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-r from-purple-900/10 to-blue-900/10 rounded-full blur-3xl" />
      </div>

      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 text-center">
        <div 
          className="relative mb-8"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <h1 className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter bg-linear-to-b from-white via-white to-gray-600 bg-clip-text text-transparent select-none">
            404
          </h1>
          <div className="absolute inset-0 text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-linear-to-b from-purple-500/50 to-blue-500/50 bg-clip-text blur-2xl -z-10 translate-y-4">
            404
          </div>
        </div>

        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            Halaman yang Anda cari mungkin telah dipindahkan atau tidak pernah ada.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link to="/">
            <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <span className="relative z-10 flex items-center gap-2">
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Beranda
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>

        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-gray-600">
          <div className="h-px w-16 bg-linear-to-r from-transparent to-gray-600" />
          <span className="text-sm uppercase tracking-widest">Error Code: 404</span>
          <div className="h-px w-16 bg-linear-to-l from-transparent to-gray-600" />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default NotFound