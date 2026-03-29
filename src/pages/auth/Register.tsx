import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterService } from '../../services/auth/Register';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [msg, setMsg] = useState<{ type: 'success' | 'error' | ''; text: string }>({ 
    type: '', 
    text: '' 
  });
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
 const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    if (step === 1) {
      if (!formData.name.trim()) {
        scrollTop();
        setMsg({ type: 'error', text: 'Nama lengkap harus diisi' });
        return;
      }
      if (!formData.email.trim()) {
        scrollTop();
        setMsg({ type: 'error', text: 'Email harus diisi' });
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        scrollTop();
        setMsg({ type: 'error', text: 'Format email tidak valid' });
        return;
      }
      if (!formData.password) {
        scrollTop();
        setMsg({ type: 'error', text: 'Password harus diisi' });
        return;
      }
      if (formData.password.length < 8) {
        scrollTop();
        setMsg({ type: 'error', text: 'Password minimal 8 karakter' });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        scrollTop();
        setMsg({ type: 'error', text: 'Password dan konfirmasi password tidak cocok' });
        return;
      }
      if (!agreeTerms) {
        scrollTop();
        setMsg({ type: 'error', text: 'Anda harus menyetujui Syarat & Ketentuan' });
        return;
      }

      setIsLoading(true);
      
      try {
        const response = await RegisterService({
          full_name: formData.name,
          email: formData.email,
          password: formData.password
        });

        if (response.success) {
          setMsg({ type: 'success', text: 'Pendaftaran berhasil! Silakan login untuk melanjutkan.' });
          setTimeout(() => {
         navigate("/auth/login");
      }, 1500);
          // setStep(2);
        } else {
          setMsg({ type: 'error', text: response.message || 'Pendaftaran gagal' });
        }
      } catch (error: any) {
        const errorMsg = 
          error.response?.data?.message || 
          error.message || 
          'Terjadi kesalahan. Silakan coba lagi.';
        setMsg({ type: 'error', text: errorMsg });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      setMsg({ type: 'success', text: 'Email berhasil diverifikasi!' });
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 1500);
    } catch (error: any) {
      setMsg({ type: 'error', text: 'Kode verifikasi tidak valid' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    // window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden flex items-center justify-center px-4 py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 w-full max-w-xl">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          
          {/* <div className="flex items-center justify-center mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>
              1
            </div>
            <div className={`w-16 h-0.5 mx-2 transition-colors ${step >= 2 ? 'bg-purple-600' : 'bg-white/10'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>
              2
            </div>
          </div> */}

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {step === 1 ? 'Buat Akun' : 'Verifikasi Email'}
            </h1>
            <p className="text-gray-400 mt-2">
              {step === 1 ? 'Mulai perjalananmu bersama kami' : 'Cek email kamu untuk kode verifikasi'}
            </p>
          </div>

          {msg.text && (
            <div className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${
              msg.type === 'error' 
                ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                : 'bg-green-500/10 border-green-500/20 text-green-400'
            }`}>
              {msg.type === 'error' ? (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <p className="text-sm">{msg.text}</p>
            </div>
          )}

          {step === 1 ? (
            <>
              <button
                onClick={handleGoogleRegister}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm text-gray-300">Daftar dengan Google</span>
              </button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#0a0a0f] text-gray-500">Atau daftar dengan email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Nama kamu"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-600 disabled:opacity-50"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-600 disabled:opacity-50"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Kata Sandi</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-600 disabled:opacity-50"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {[1,2,3,4].map((i) => (
                      <div 
                        key={i} 
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i <= passwordStrength 
                            ? passwordStrength <= 1 
                              ? 'bg-red-500' 
                              : passwordStrength === 2 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                            : 'bg-white/10'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {passwordStrength === 0 && 'Minimal 8 karakter'}
                    {passwordStrength === 1 && 'Lemah - tambahkan huruf besar'}
                    {passwordStrength === 2 && 'Sedang - tambahkan angka'}
                    {passwordStrength === 3 && 'Kuat - tambahkan karakter spesial'}
                    {passwordStrength === 4 && 'Sangat kuat'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Konfirmasi Kata Sandi</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-all placeholder:text-gray-600 disabled:opacity-50 ${
                        formData.confirmPassword && formData.password !== formData.confirmPassword
                          ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                          : 'border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20'
                      }`}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-400 mt-1">Password tidak cocok</p>
                  )}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500/20 disabled:opacity-50"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-400 hover:text-gray-300">
                    Saya setuju dengan <Link to="/terms-and-conditions" className="text-purple-400 hover:text-purple-300">Syarat & Ketentuan</Link> dan <Link to="/privacy-policy" className="text-purple-400 hover:text-purple-300">Kebijakan Privasi</Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mendaftar...</span>
                    </>
                  ) : (
                    <>
                      <span>Lanjutkan</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-10 h-10 text-green-400" />
              </div>
              <p className="text-gray-300">
                Kami telah mengirim kode verifikasi ke <span className="text-white font-medium">{formData.email}</span>
              </p>
              <div className="flex gap-2 justify-center">
                {[1,2,3,4,5,6].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-xl font-bold disabled:opacity-50"
                    disabled={isLoading}
                  />
                ))}
              </div>
              <button
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Verifikasi Email
                  </>
                )}
              </button>
              <p className="text-sm text-gray-400">
                Tidak menerima kode? <button className="text-purple-400 hover:text-purple-300 disabled:opacity-50" disabled={isLoading}>Kirim ulang</button>
              </p>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-gray-400">
            Sudah punya akun?{' '}
            <Link to={`/auth/login/?ref=${Math.random().toString(36).substring(2)}`} className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;