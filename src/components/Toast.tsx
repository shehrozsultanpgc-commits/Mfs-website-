import React from 'react';
import { Lock } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
      <div className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl glass-card text-[#E5C158] font-medium text-sm shadow-2xl border border-[#E5C158]/30 backdrop-blur-xl animate-bounce">
        <Lock className="w-4 h-4 text-[#E5C158]" />
        <span>{message}</span>
      </div>
    </div>
  );
};
