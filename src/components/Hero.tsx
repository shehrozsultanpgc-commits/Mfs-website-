import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { HeroCinematicBackground } from './common/HeroCinematicBackground';
import { HeroDocumentStudioVisual } from './common/HeroDocumentStudioVisual';

interface HeroProps {
  onOpenOrderModal: () => void;
  onViewWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal, onViewWork }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="hero" className="pt-24 xs:pt-28 sm:pt-36 pb-12 xs:pb-16 sm:pb-20 md:pt-44 md:pb-28 relative overflow-hidden bg-[#050507]">
      {/* 1. Cinematic Background Layer with HTML5 Canvas Mesh, Video Player & Vignettes */}
      <HeroCinematicBackground
        videoUrl="/videos/hero-cinematic.mp4"
      />

      {/* 2. Background Ambient Light Orb */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.12, 0.22, 0.12],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] md:w-[650px] h-[320px] sm:h-[500px] md:h-[650px] bg-[#E5C158] blur-[100px] sm:blur-[140px] rounded-full pointer-events-none z-[2]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Hero Content Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Top promo badge */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 px-3 xs:px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/25 text-[#E5C158] text-[11px] xs:text-xs font-semibold mb-3.5 sm:mb-6 shadow-sm cursor-default max-w-full"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
              <span className="truncate">50% Grand Launch Discount Active</span>
            </motion.div>

            <h1 className="text-[1.6rem] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-poppins leading-[1.22] xs:leading-[1.18] sm:leading-[1.15] mb-3.5 sm:mb-6 text-white">
              Professional Presentations &{' '}
              <span className="gold-pure-gradient">Assignments</span> Delivered with Excellence.
            </h1>

            <p className="text-xs xs:text-sm sm:text-base md:text-lg max-w-xs xs:max-w-xl sm:max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-6 sm:mb-8 font-normal text-neutral-300/90 sm:text-neutral-300">
              MFS Growth Agency delivers premium, custom-formatted documents, presentations, resumes, and reports to help students and professionals excel globally.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto px-6 xs:px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-[#050507] font-extrabold text-sm tracking-wide shadow-[0_4px_25px_rgba(229,193,88,0.25)] hover:shadow-[0_8px_35px_rgba(229,193,88,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px] active:scale-[0.98]"
              >
                <span>Order Now (50% OFF)</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onViewWork}
                className="w-full sm:w-auto px-6 xs:px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl glass-card border-white/15 hover:border-[#E5C158]/50 text-white font-semibold text-sm hover:bg-white/[0.06] transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px] active:scale-[0.98]"
              >
                <span>View Our Work</span>
              </motion.button>
            </div>

            {/* Quick feature checklist */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 sm:mt-10 pt-5 sm:pt-8 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 xs:gap-x-6 gap-y-2.5 text-[11px] xs:text-xs text-neutral-300 font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0" />
                <span>24-Hour Express Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0" />
                <span>100% Plagiarism Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0" />
                <span>Free Revisions Included</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Document Studio Visual Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <HeroDocumentStudioVisual />
          </motion.div>

        </div>
      </div>
    </section>
  );
};


