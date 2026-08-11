import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Sparkles, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
  defaultTab?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  defaultTab = 'login',
}) => {
  const { signInWithGoogle, signInWithFacebook, signIn, signUp, isLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const res = await signInWithGoogle({
        fallbackUser: {
          name: 'Muhammad Shehroz',
          email: 'shehroz.client@gmail.com',
        },
      });
      if (res.success) {
        if (onShowToast) onShowToast('✨ Logged in with Google! Profile synced.');
        onClose();
      } else {
        setErrorMsg(res.error || 'Google Login failed.');
      }
    } catch (err: any) {
      setErrorMsg('Google Sign-In failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const res = await signInWithFacebook({
        fallbackUser: {
          name: 'Facebook Client',
          email: 'client.fb@facebook.com',
        },
      });
      if (res.success) {
        if (onShowToast) onShowToast('✨ Authenticated with Facebook! Account saved.');
        onClose();
      } else {
        setErrorMsg(res.error || 'Facebook login failed.');
      }
    } catch (err: any) {
      setErrorMsg('Facebook Sign-In failed.');
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
      } else {
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md rounded-3xl bg-[#08080C] border border-[#E5C158]/30 shadow-[0_0_50px_rgba(229,193,88,0.15)] p-6 overflow-hidden"
          >
            {/* Decorative Top Ambient Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#E5C158]/20 blur-3xl rounded-full pointer-events-none" />

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10"
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
            {activeTab === 'login' ? 'Sign In to Your Account' : 'Create a Client Account'}
          </h2>
          <p className="text-xs text-neutral-400">
            Sign in with Google or Facebook to automatically auto-fill your name and email on all orders!
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium text-center">
            {errorMsg}
          </div>
        )}

        {/* SOCIAL LOGIN BUTTONS */}
        <div className="space-y-2.5 mb-5">
          {/* Google Button */}
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
            <span>{isSubmitting ? 'Signing in with Google...' : 'Continue with Google'}</span>
          </button>

          {/* Facebook Button */}
          <button
            type="button"
            onClick={handleFacebookSignIn}
            disabled={isLoading || isSubmitting}
            className="w-full py-3 px-4 rounded-2xl bg-[#1877F2] text-white font-extrabold text-xs hover:bg-[#166fe5] transition-all cursor-pointer shadow-md flex items-center justify-center gap-3 active:scale-[0.99]"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>{isSubmitting ? 'Signing in with Facebook...' : 'Continue with Facebook'}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#08080C] px-3 text-[10px] uppercase tracking-widest text-neutral-400 font-bold shrink-0">
            OR WITH EMAIL
          </span>
          <div className="border-t border-white/10 w-full" />
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-black/60 p-1 border border-white/10 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'login' ? 'bg-[#E5C158] text-black shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'signup' ? 'bg-[#E5C158] text-black shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Email Form */}
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
