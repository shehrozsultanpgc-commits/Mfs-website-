import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Sparkles, Phone, ShieldCheck, ArrowRight, AlertCircle, Wand2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isSandboxEnvironment } from '../../lib/supabaseAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
  defaultTab?: 'login' | 'signup' | 'magic_link';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  defaultTab = 'login',
}) => {
  const { signInWithGoogle, signInWithMagicLink, signIn, signUp, isLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'magic_link'>(defaultTab);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [fallbackNotice, setFallbackNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    setFallbackNotice('');
    try {
      const res = await signInWithGoogle();
      if (res.success) {
        if (onShowToast) {
          if (isSandboxEnvironment()) {
            onShowToast('✨ Signed in with Google (Preview Sandbox)! Profile synced.');
          } else {
            onShowToast('✨ Signed in with Google! Profile synced.');
          }
        }
        onClose();
      } else {
        // Intercept 403 / OAuth restriction and gracefully pivot to Magic Link / Email fallback
        setFallbackNotice('Google OAuth access restricted or blocked (403). Switched to Instant Magic Link & Password login below.');
        setActiveTab('magic_link');
      }
    } catch (err: any) {
      setFallbackNotice('Google OAuth restriction detected. Please use Email or Magic Link below for instant access.');
      setActiveTab('magic_link');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await signInWithMagicLink(email);
      if (res.success) {
        if (onShowToast) onShowToast('✨ Magic Link access token created! Session authorized.');
        onClose();
      } else {
        setErrorMsg(res.error || 'Magic Link dispatch failed. Try password login.');
      }
    } catch (err: any) {
      setErrorMsg('Magic Link request failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      if (activeTab === 'login') {
        const res = await signIn(email, password);
        if (res.success) {
          if (onShowToast) onShowToast('Welcome back! Successfully logged in.');
          onClose();
        } else {
          setErrorMsg(res.error || 'Invalid credentials.');
        }
      } else if (activeTab === 'signup') {
        const res = await signUp(email, password, fullName, phone);
        if (res.success) {
          if (onShowToast) onShowToast('Account registered! Welcome to MFS Growth Agency.');
          onClose();
        } else {
          setErrorMsg(res.error || 'Registration failed.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md my-auto rounded-3xl bg-[#08080C] border border-[#E5C158]/30 shadow-[0_0_50px_rgba(229,193,88,0.15)] p-4 sm:p-6 overflow-hidden max-h-[calc(100dvh-1.5rem)] overflow-y-auto"
          >
            {/* Decorative Top Ambient Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#E5C158]/20 blur-3xl rounded-full pointer-events-none" />

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10 min-w-[36px] min-h-[36px]"
            >
              <X className="w-5 h-5" />
            </motion.button>

        {/* Header */}
        <div className="text-center space-y-1 mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-[10px] font-extrabold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            <span>MFS Client Portal</span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            {activeTab === 'login' ? 'Sign In to Your Account' : activeTab === 'magic_link' ? 'Instant Magic Link Access' : 'Create a Client Account'}
          </h2>
          <p className="text-xs text-neutral-400">
            Sign in with Google, Password, or Instant Magic Link to auto-fill your orders!
          </p>
        </div>

        {/* Fallback Notice */}
        {fallbackNotice && (
          <div className="mb-4 p-3 rounded-xl bg-[#E5C158]/15 border border-[#E5C158]/40 text-[#E5C158] text-xs font-semibold text-center flex items-center justify-center gap-2 shadow-lg backdrop-blur-md relative z-30 animate-fadeIn">
            <Wand2 className="w-4 h-4 shrink-0" />
            <span>{fallbackNotice}</span>
          </div>
        )}

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs font-semibold text-center flex items-center justify-center gap-2 shadow-lg backdrop-blur-md relative z-30 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* GOOGLE LOGIN BUTTON */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isSubmitting}
            className="w-full py-3 px-4 rounded-2xl bg-white text-black font-extrabold text-xs hover:bg-neutral-100 transition-all cursor-pointer shadow-md flex items-center justify-center gap-3 border border-neutral-300 active:scale-[0.99]"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>{isSubmitting ? 'Connecting Google...' : 'Continue with Google'}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-3">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#08080C] px-3 text-[9px] uppercase tracking-widest text-neutral-400 font-bold shrink-0">
            OR CHOOSE EMAIL OPTION
          </span>
          <div className="border-t border-white/10 w-full" />
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-black/60 p-1 border border-white/10 mb-4 text-[11px]">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setErrorMsg(''); setFallbackNotice(''); }}
            className={`flex-1 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'login' ? 'bg-[#E5C158] text-black shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('magic_link'); setErrorMsg(''); }}
            className={`flex-1 py-1.5 font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'magic_link' ? 'bg-[#E5C158] text-black shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Wand2 className="w-3 h-3" />
            <span>Magic Link</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('signup'); setErrorMsg(''); setFallbackNotice(''); }}
            className={`flex-1 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'signup' ? 'bg-[#E5C158] text-black shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* MAGIC LINK FORM */}
        {activeTab === 'magic_link' && (
          <form onSubmit={handleMagicLinkSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-300 font-semibold mb-1 text-[11px]">Email Address for Instant Access *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#E5C158] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. client@mfsgrowth.com"
                  className="w-full bg-[#050507] border border-[#E5C158]/50 focus:border-[#E5C158] text-white rounded-xl pl-9 pr-3 py-2.5 focus:outline-none"
                />
              </div>
            </div>

            <p className="text-[10px] text-neutral-400 leading-relaxed">
              ⚡ No password required! Enter your email to log in instantly via encrypted Magic Token.
            </p>

            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-lg mt-2 flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Authenticating...' : 'Send Instant Magic Access'}</span>
            </motion.button>
          </form>
        )}

        {/* EMAIL & PASSWORD / REGISTER FORM */}
        {activeTab !== 'magic_link' && (
          <form onSubmit={handleEmailSubmit} className="space-y-3 text-xs">
            {activeTab === 'signup' && (
              <div>
                <label className="block text-neutral-300 font-semibold mb-1 text-[11px]">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Shehroz Sultan"
                    className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white rounded-xl pl-9 pr-3 py-2.5 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-neutral-300 font-semibold mb-1 text-[11px]">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. client@mfsgrowth.com"
                  className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white rounded-xl pl-9 pr-3 py-2.5 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-semibold mb-1 text-[11px]">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white rounded-xl pl-9 pr-3 py-2.5 focus:outline-none"
                />
              </div>
            </div>

            {activeTab === 'signup' && (
              <div>
                <label className="block text-neutral-300 font-semibold mb-1 text-[11px]">WhatsApp / Phone (Optional)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 301 5323689"
                    className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white rounded-xl pl-9 pr-3 py-2.5 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-lg mt-2 flex items-center justify-center gap-2"
            >
              <span>
                {isSubmitting
                  ? 'Processing...'
                  : activeTab === 'login'
                  ? 'Sign In & Save Details'
                  : 'Register & Save Profile'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-white/10 text-center">
          <p className="text-[10px] text-neutral-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#28C76F]" />
            <span>256-Bit Encrypted & Protected Client Authentication</span>
          </p>
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
