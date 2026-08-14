import React from 'react';
import { motion } from 'motion/react';
import { FileQuestion, ArrowLeft, ArrowRight, ShieldCheck, HelpCircle, Mail } from 'lucide-react';

interface NotFoundPageProps {
  onNavigatePage: (page: any) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigatePage }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#050507]">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Visual Icon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] shadow-[0_0_30px_rgba(229,193,88,0.2)]"
        >
          <FileQuestion className="w-10 h-10 sm:w-12 sm:h-12" />
        </motion.div>

        {/* 404 Title & Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-3"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#E5C158] uppercase bg-[#E5C158]/10 border border-[#E5C158]/20 px-3 py-1 rounded-full">
            404 — Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins text-white tracking-tight">
            Oops! The Page You Requested Does Not Exist
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            The link you followed may be expired or typed incorrectly. Explore our primary agency pages below or contact our 24/7 support team.
          </p>
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={() => onNavigatePage('home')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#E5C158] hover:bg-[#F5D77F] text-[#050507] font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(229,193,88,0.3)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => onNavigatePage('services')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-card border-white/15 hover:border-[#E5C158]/50 text-white font-semibold text-sm hover:bg-white/[0.06] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Quick Route Shortcuts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-neutral-300"
        >
          <button
            onClick={() => onNavigatePage('pricing')}
            className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#E5C158]/40 hover:text-[#E5C158] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Pricing</span>
          </button>
          <button
            onClick={() => onNavigatePage('reviews')}
            className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#E5C158]/40 hover:text-[#E5C158] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Reviews</span>
          </button>
          <button
            onClick={() => onNavigatePage('faq')}
            className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#E5C158]/40 hover:text-[#E5C158] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>FAQ</span>
          </button>
          <button
            onClick={() => onNavigatePage('contact')}
            className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#E5C158]/40 hover:text-[#E5C158] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Contact</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
