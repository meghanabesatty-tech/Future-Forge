import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  Shield,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareerDomainId } from '../../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    login,
    signup,
  } = useApp();

  // Login inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup inputs
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [targetDomain, setTargetDomain] = useState<CareerDomainId>('web-dev');
  const [education, setEducation] = useState('B.Tech / B.E.');

  // Forgot password
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'candidate@futureforge.ai', 'student');
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(
      name || 'New Aspirant',
      signupEmail || 'newuser@futureforge.ai',
      targetDomain,
      education
    );
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setAuthModalTab('login');
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl glass-panel border border-slate-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Ambient background glow */}
        <div className="ambient-glow -top-24 -right-24 w-64 h-64 bg-purple-600/30" />
        <div className="ambient-glow -bottom-24 -left-24 w-64 h-64 bg-blue-600/25" />

        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Brand header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-100">Future Forge</h3>
            <p className="text-xs text-purple-400 font-medium">AI Career Companion</p>
          </div>
        </div>

        {/* Auth Tabs */}
        <div className="flex p-1 mb-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <button
            onClick={() => setAuthModalTab('login')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              authModalTab === 'login'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setAuthModalTab('signup')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              authModalTab === 'signup'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setAuthModalTab('forgot')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              authModalTab === 'forgot'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Reset
          </button>
        </div>

        {/* Quick Demo Logins Pill */}
        <div className="mb-5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider">
              1-Click Demo Profiles
            </span>
            <span className="text-[10px] text-slate-400">Instant test</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => login('alex.vance@futureforge.ai', 'student')}
              className="px-2 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/30 text-blue-200 font-medium text-[11px] transition-colors"
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => login('pooja.civil@futureforge.ai', 'aspirant')}
              className="px-2 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 font-medium text-[11px] transition-colors"
            >
              🏛️ Aspirant
            </button>
            <button
              type="button"
              onClick={() => login('admin@futureforge.ai', 'admin')}
              className="px-2 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/30 text-amber-200 font-medium text-[11px] transition-colors"
            >
              ⚡ Admin
            </button>
          </div>
        </div>

        {/* TAB 1: LOGIN */}
        {authModalTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.vance@futureforge.ai"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl glass-input text-slate-100 placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => setAuthModalTab('forgot')}
                  className="text-xs text-purple-400 hover:text-purple-300"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl glass-input text-slate-100 placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-purple-600" />
                <span>Remember this workstation</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all mt-2"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* TAB 2: SIGN UP */}
        {authModalTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Pooja Sharma"
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-xl glass-input text-slate-100 placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="pooja@example.com"
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-xl glass-input text-slate-100 placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Target Pathway
                </label>
                <select
                  value={targetDomain}
                  onChange={(e) => setTargetDomain(e.target.value as CareerDomainId)}
                  className="w-full px-3 py-2 text-xs rounded-xl glass-input text-slate-100 bg-slate-900"
                >
                  <option value="web-dev">Web Development</option>
                  <option value="ai-ml">AI & ML</option>
                  <option value="data-science">Data Science</option>
                  <option value="cyber-security">Cyber Security</option>
                  <option value="cloud-computing">Cloud Computing</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="govt-exams">Government Exams</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Education</label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl glass-input text-slate-100 bg-slate-900"
                >
                  <option value="B.Tech / B.E.">B.Tech / B.E.</option>
                  <option value="B.Sc / M.Sc">B.Sc / M.Sc</option>
                  <option value="B.Com / B.A.">B.Com / B.A.</option>
                  <option value="Life Sciences / Pharma">Life Sciences / Pharma</option>
                  <option value="Other Degree">Other Graduate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Create secure password"
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-xl glass-input text-slate-100 placeholder:text-slate-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all mt-2"
            >
              <span>Create Free Account</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* TAB 3: FORGOT PASSWORD */}
        {authModalTab === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your registered email address and our authentication system will dispatch a secure 6-digit recovery PIN.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Registered Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="alex.vance@futureforge.ai"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl glass-input text-slate-100 placeholder:text-slate-500"
                />
              </div>
            </div>

            {resetSent ? (
              <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Password reset link sent! Check your inbox. Redirecting to login...</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <KeyRound size={16} />
                <span>Send Password Reset Link</span>
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
