import React from 'react';
import { Lock, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  const isErrorOrWarning =
    message.includes('⚠️') ||
    message.toLowerCase().includes('error') ||
    message.toLowerCase().includes('failed') ||
    message.toLowerCase().includes('required') ||
    message.toLowerCase().includes('please');

  const isSuccess =
    message.includes('🎉') ||
    message.includes('✨') ||
    message.toLowerCase().includes('success') ||
    message.toLowerCase().includes('confirmed');

  return (
    <div className="fixed top-[max(0.75rem,env(safe-area-inset-top))] sm:top-5 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none transition-all duration-300 max-w-[calc(100vw-2rem)] w-auto px-2">
      <div
        className={`flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-3.5 rounded-2xl text-xs sm:text-sm font-semibold shadow-[0_20px_60px_rgba(0,0,0,0.95)] border backdrop-blur-2xl animate-fadeIn ${
          isErrorOrWarning
            ? 'bg-[#180A0C]/95 text-red-200 border-red-500/50 shadow-red-950/50'
            : isSuccess
            ? 'bg-[#09180F]/95 text-emerald-200 border-emerald-500/50 shadow-emerald-950/50'
            : 'bg-[#0B0B10]/95 text-[#E5C158] border-[#E5C158]/50 shadow-black'
        }`}
      >
        {isErrorOrWarning ? (
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 shrink-0" />
        ) : isSuccess ? (
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
        ) : (
          <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5C158] shrink-0" />
        )}
        <span className="leading-snug break-words">{message}</span>
      </div>
    </div>
  );
};

