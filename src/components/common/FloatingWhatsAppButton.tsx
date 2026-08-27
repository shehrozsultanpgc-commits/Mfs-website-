import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  phoneNumber = '923015323689',
  defaultMessage = 'Hello MFS Growth Agency! I would like to inquire about your digital services and 50% Grand Launch Offer.',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-show friendly tooltip after 4 seconds to catch client attention gracefully
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTooltip(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  const handleClick = () => {
    setHasInteracted(true);
    setShowTooltip(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto select-none">
      {/* Floating Interactive Greeting Popover */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-3 w-72 sm:w-80 rounded-2xl bg-[#0D0D12]/95 backdrop-blur-md border border-[#28C76F]/30 p-4 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(40,199,111,0.15)] text-left relative"
          >
            {/* Close Tooltip Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
                setHasInteracted(true);
              }}
              className="absolute top-3 right-3 p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#28C76F]/20 text-[#28C76F] border border-[#28C76F]/40 shrink-0">
                <MessageCircle className="w-4 h-4 fill-current" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#28C76F] ring-2 ring-[#0D0D12]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-poppins flex items-center gap-1.5">
                  <span>MFS Growth Support</span>
                  <ShieldCheck className="w-3 h-3 text-[#E5C158]" />
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-[#28C76F] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] animate-pulse" />
                  <span>Online now • Instant Reply</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <p className="text-xs text-neutral-300 leading-relaxed mb-3">
              Need quick guidance or custom quotation for your project? Chat directly with our team on WhatsApp!
            </p>

            {/* Direct CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="group flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#28C76F] to-[#20B05F] text-[#050507] font-bold text-xs font-poppins shadow-md hover:shadow-[0_4px_16px_rgba(40,199,111,0.4)] transition-all cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Offer Footer */}
            <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
              <span className="text-[#E5C158] font-semibold">🎉 50% Launch Discount Active</span>
              <span className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" /> 24/7
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.a
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => !hasInteracted && setShowTooltip(true)}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#20B05F] via-[#28C76F] to-[#25D366] text-white shadow-[0_6px_24px_rgba(40,199,111,0.4),0_0_0_1px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_32px_rgba(40,199,111,0.65),0_0_20px_rgba(229,193,88,0.3)] transition-all cursor-pointer"
        aria-label="Chat with MFS Growth Agency on WhatsApp"
      >
        {/* Pulsing Outer Rings */}
        <span className="absolute -inset-1 rounded-full bg-[#28C76F]/30 animate-ping opacity-60 pointer-events-none" />
        <span className="absolute -inset-2 rounded-full border border-[#28C76F]/20 animate-pulse pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white drop-shadow-md relative z-10 transition-transform group-hover:rotate-6" />

        {/* Online Status Green Indicator Dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#E5C158] border-2 border-[#050507] z-20" />
      </motion.a>
    </div>
  );
};
