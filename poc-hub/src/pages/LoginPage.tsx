import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const KANINI_LOGO = 'https://kanini.com/wp-content/uploads/2022/06/Kanini-Logo.svg';

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/portal'), 1200);
  };

  const statPills = [
    { value: 42, label: 'POCs' },
    { value: 12, label: 'Domains' },
    { value: 8, label: 'Teams' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full overflow-hidden">
      {/* ===== Left Panel ===== */}
      <div className="hidden md:flex md:w-1/2 bg-white p-12 flex-col justify-between relative overflow-hidden border-r border-slate-100">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-24 w-64 h-64 bg-slate-200 rounded-full blur-3xl" />
        </div>

        {/* Logo — fades in first */}
        <div
          className="flex items-center gap-3 relative z-10 opacity-0 animate-[fadeIn_0.5s_ease_forwards_200ms]"
        >
          <img src={KANINI_LOGO} alt="Kanini" className="h-8" />
          <span className="text-gray-300 font-light">|</span>
          <h2 className="text-black text-2xl font-bold tracking-tight">POC Hub</h2>
        </div>

        {/* Headline — slides up second */}
        <div
          className="flex flex-col items-start justify-center flex-grow py-20 relative z-10 opacity-0 animate-[slideUp_0.6s_var(--ease-spring)_forwards_400ms]"
        >
          <h1 className="text-black text-5xl lg:text-6xl font-black leading-tight mb-4">
            Welcome to <span className="text-secondary">Kanini POC Hub</span>
          </h1>
          <p className="text-slate-500 text-lg lg:text-xl font-light tracking-wide">
            Explore. Innovate. Deliver.
          </p>
        </div>

        {/* Stat pills — stagger in */}
        <div className="flex flex-wrap gap-4 relative z-10">
          {statPills.map((pill, i) => (
            <div
              key={pill.label}
              className="login-stat-pill px-5 py-2 rounded-full border border-secondary/30 bg-secondary/10 flex items-center gap-2"
              style={{ animationDelay: `${700 + i * 100}ms` }}
            >
              <span className="text-secondary font-bold">{pill.value}</span>
              <span className="text-secondary/80 text-sm uppercase tracking-wider font-semibold">
                {pill.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Right Panel ===== */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 lg:p-24 overflow-y-auto">
        <div className="login-form-enter max-w-md w-full">
          {/* Mobile branding */}
          <div className="md:hidden flex items-center gap-2 mb-10">
            <img src={KANINI_LOGO} alt="Kanini" className="h-6" />
            <span className="text-gray-300 font-light">|</span>
            <span className="text-xl font-bold text-black">POC Hub</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-black mb-2">Sign In</h2>
            <p className="text-slate-500 font-medium">Please enter your internal credentials</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2" htmlFor="email">
                Work Email
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none transition-all placeholder:text-slate-400 focus:border-teal focus:shadow-[0_0_0_3px_rgba(0,181,173,0.15)]"
                id="email"
                placeholder="name@company.com"
                type="email"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-semibold text-black" htmlFor="password">
                  Password
                </label>
                <a className="text-sm font-semibold text-secondary hover:underline" href="#">
                  Forgot password?
                </a>
              </div>
              <input
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none transition-all placeholder:text-slate-400 focus:border-teal focus:shadow-[0_0_0_3px_rgba(0,181,173,0.15)]"
                id="password"
                placeholder="••••••••"
                type="password"
              />
            </div>

            {/* Remember */}
            <div className="flex items-center">
              <input
                className="h-4 w-4 text-secondary focus:ring-secondary border-slate-300 rounded"
                id="remember-me"
                type="checkbox"
              />
              <label className="ml-2 block text-sm text-slate-600 font-medium" htmlFor="remember-me">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-press w-full bg-black hover:bg-gray-900 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="spinner" />
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-[20px]">login</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm uppercase">
              <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Or</span>
            </div>
          </div>

          {/* Microsoft SSO */}
          <button
            type="button"
            className="btn-press w-full bg-white border border-slate-200 hover:bg-slate-50 text-black font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h23v23H0z" fill="#f3f3f3" />
              <path d="M1 1h10v10H1z" fill="#f35325" />
              <path d="M12 1h10v10H12z" fill="#81bc06" />
              <path d="M1 12h10v10H1z" fill="#05a6f0" />
              <path d="M12 12h10v10H12z" fill="#ffba08" />
            </svg>
            <span>Sign in with Microsoft</span>
          </button>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-400">
              Need assistance? Contact the{' '}
              <a className="text-black font-bold hover:underline" href="#">
                IT Helpdesk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
