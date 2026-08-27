import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Star, CheckCircle2, Sparkles, HelpCircle, X, ShieldCheck } from 'lucide-react';

interface GooglePreferredSourceBadgeProps {
  variant?: 'compact' | 'banner' | 'card' | 'floating';
  className?: string;
}

export const GooglePreferredSourceBadge: React.FC<GooglePreferredSourceBadgeProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isSavedLocally, setIsSavedLocally] = useState(() => {
    try {
      return localStorage.getItem('mfs_preferred_source_opted') === 'true';
    } catch {
      return false;
    }
  });

  const targetUrl = 'https://google.com/preferences/source?q=https://mfsgrowth.online';

  const handleClick = () => {
    try {
      localStorage.setItem('mfs_preferred_source_opted', 'true');
      setIsSavedLocally(true);
    } catch {
      // ignore
    }
  };

  // 1. Compact Variant (Perfect for Footer, Navigation bars, or article headers)
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-[#E5C158]/10 border border-white/10 hover:border-[#E5C158]/40 transition-all text-xs text-neutral-300 hover:text-white"
          title="Add MFS Growth Agency to your Google Preferred Sources"
        >
          {/* Google 4-Color Mini G Dot / Star */}
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/10 group-hover:bg-[#E5C158]/20 text-[#E5C158] shrink-0 transition-colors">
            <Star className="w-2.5 h-2.5 fill-[#E5C158]" />
          </span>
          <span className="font-medium text-[11px]">
            Follow on <strong className="text-white font-semibold group-hover:text-[#E5C158] transition-colors">Google</strong> (Preferred Source)
          </span>
          <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-[#E5C158] transition-colors" />
        </motion.a>
      </div>
    );
  }

  // 2. Banner Variant (Ideal for Guides, Articles, Tools, and Hub pages)
  if (variant === 'banner') {
    return (
      <>
        <div
          className={`relative overflow-hidden rounded-2xl border border-[#E5C158]/20 bg-gradient-to-r from-[#121218] via-[#0D0D12] to-[#121218] p-4 sm:p-5 shadow-lg ${className}`}
        >
          {/* Ambient Gold Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] shrink-0 mt-0.5 sm:mt-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                    Official Google Feature
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowInfoModal(true)}
                    className="text-[11px] text-neutral-400 hover:text-[#E5C158] inline-flex items-center gap-1 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>How it works</span>
                  </button>
                </div>
                <h4 className="text-sm font-bold text-white font-poppins">
                  Set MFS Growth as a Preferred Source on Google
                </h4>
                <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
                  Get our latest ATS resume engineering frameworks, executive pitch deck guidelines, and academic writing standards prioritized in your Google Search & AI Overviews.
                </p>
              </div>
            </div>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#050507] text-xs font-bold font-poppins shadow-[0_4px_14px_rgba(229,193,88,0.25)] hover:shadow-[0_6px_20px_rgba(229,193,88,0.4)] transition-all shrink-0 w-full sm:w-auto justify-center cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 fill-[#050507]" />
              <span>Add on Google</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </motion.a>
          </div>
        </div>

        {/* Informational Modal */}
        <AnimatePresence>
          {showInfoModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#0D0D12] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 relative text-neutral-300 text-xs"
              >
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-poppins">
                      Google Preferred Sources
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Personalized Search & AI Overviews
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 leading-relaxed bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Direct Verification:</strong> When you click the button, Google opens your personal search preferences to add <code className="text-[#E5C158]">mfsgrowth.online</code>.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">AI Overviews Priority:</strong> Google AI summaries and Top Stories will prioritize trusted answers and guides published by MFS Growth Agency.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">100% Free & Safe:</strong> This is an official Google feature designed to let readers choose their preferred content creators.
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setShowInfoModal(false)}
                    className="px-3 py-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      handleClick();
                      setShowInfoModal(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#E5C158] text-[#050507] font-semibold font-poppins hover:bg-[#D4AF37] transition-all"
                  >
                    <span>Proceed to Google</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // 3. Card Variant (For About / Trust / CMS Hubs)
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-[#0A0A0F] p-5 space-y-4 hover:border-[#E5C158]/30 transition-all ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#E5C158]/10 border border-[#E5C158]/20 flex items-center justify-center text-[#E5C158]">
            <Star className="w-4 h-4 fill-[#E5C158]" />
          </div>
          <span className="text-xs font-bold text-white font-poppins">
            Google Preferred Source
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#28C76F] bg-[#28C76F]/10 border border-[#28C76F]/20 px-2 py-0.5 rounded">
          Active
        </span>
      </div>

      <p className="text-xs text-neutral-400 leading-relaxed">
        Add MFS Growth Agency to your Google account as a preferred publisher for academic standards, ATS resume research, and executive presentation engineering.
      </p>

      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-[#E5C158]/10 border border-white/10 hover:border-[#E5C158]/40 text-xs font-semibold text-white hover:text-[#E5C158] transition-all cursor-pointer"
      >
        <span>Set on Google Search</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
