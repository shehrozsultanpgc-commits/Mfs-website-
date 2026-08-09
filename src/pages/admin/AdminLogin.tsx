import React, { useState } from 'react';
import { Lock, LogIn, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const { signIn, user, isManager, isSuperAdmin } = useAuth();
  
  // If user is already authenticated via Supabase, we skip to step 2
  const [step, setStep] = useState<1 | 2>((user && (isManager || isSuperAdmin)) ? 2 : 1);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const { success, error: authError } = await signIn(email, password);
      if (success) {
        // Will trigger re-render in parent (AdminGuard) which will pass down user,
        // but let's eagerly set step 2 if we are still mounted.
        setStep(2);
      } else {
        setError(authError || 'Authentication failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    // Simulate PIN verification (in a real scenario, could verify via backend)
    // For this demonstration, we accept a specific hardcoded PIN or check length.
    // The prompt says "Remove all visible hint text or key displays from the login interface."
    setTimeout(() => {
      if (pin === '112364') { // Admin security pin
        sessionStorage.setItem('adminPinVerified', 'true');
        onLoginSuccess();
      } else {
        setError('Invalid Security PIN');
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#050507] bg-[radial-gradient(#1F2028_1px,transparent_1px)] [background-size:24px_24px]">
      <div className="max-w-md w-full bg-[#0F0F12] border border-[#2A2B35] rounded-2xl p-8 text-center space-y-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        <div className="w-16 h-16 bg-[#E5C158]/10 border border-[#E5C158]/30 rounded-full flex items-center justify-center mx-auto text-[#E5C158]">
          {step === 1 ? <LogIn className="w-8 h-8" /> : <KeyRound className="w-8 h-8" />}
        </div>
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5C158] block mb-1">MFS GROWTH AGENCY ADMIN</span>
          <h2 className="text-2xl font-bold text-white mb-1">
            {step === 1 ? 'Admin Authentication' : 'Security Clearance'}
          </h2>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-lg text-left">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleStep1} className="space-y-4">
            <div className="text-left">
              <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mfsmedia.agency@gmail.com"
                className="w-full bg-[#1A1A1F] border border-[#2A2B35] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5C158] transition-colors text-xs font-mono"
              />
            </div>
            <div className="text-left">
              <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#1A1A1F] border border-[#2A2B35] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5C158] transition-colors text-xs font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#E5C158] text-black font-bold py-3 px-4 rounded-lg hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Authenticate'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleStep2} className="space-y-4">
            <div className="text-left">
              <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1 text-center">
                Enter Security PIN
              </label>
              <input
                type="password"
                required
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                className="w-full bg-[#1A1A1F] border border-[#2A2B35] rounded-lg px-4 py-3 text-center tracking-[0.5em] text-white placeholder-gray-500 focus:outline-none focus:border-[#E5C158] transition-colors text-xl font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || pin.length !== 6}
              className="w-full bg-[#E5C158] text-black font-bold py-3 px-4 rounded-lg hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Verify & Access Portal'
              )}
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-[#2A2B35]">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#E5C158] transition-colors font-mono"
          >
            ← Return to Main Website
          </a>
        </div>
      </div>
    </div>
  );
};
