import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_SAMPLES } from '../data/content';
import { useModalHistory } from '../hooks/useModalHistory';
import {
  Lock,
  Eye,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sliders,
  Layers,
  ExternalLink
} from 'lucide-react';

interface PortfolioSectionProps {
  onShowToast: (msg: string) => void;
  onOpenOrderModal?: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onShowToast,
  onOpenOrderModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSample, setSelectedSample] = useState<typeof PORTFOLIO_SAMPLES[0] | null>(null);

  // Physical/gesture back button support on mobile for preview modal
  useModalHistory(!!selectedSample, () => setSelectedSample(null), 'portfolioSampleModal');

  const categories = [
    'All',
    'Presentation Design',
    'Assignment Writing',
    'Resume Writing',
    'Document Formatting',
    'Infographics',
  ];

  // Featured sample is the first item or a designated showcase item
  const featuredSample = PORTFOLIO_SAMPLES[0];

  const filteredSamples = activeCategory === 'All'
    ? PORTFOLIO_SAMPLES
    : PORTFOLIO_SAMPLES.filter((s) => s.category === activeCategory);

  const handleProtectedDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShowToast('🔒 Downloads are disabled to protect client confidentiality & copyright.');
  };

  return (
    <section id="portfolio" className="py-20 sm:py-28 relative bg-[#050507] border-t border-white/5 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E5C158]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. SECTION INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/25 text-[#E5C158] text-[11px] xs:text-xs font-semibold mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SELECTED WORK</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-extrabold font-poppins text-white tracking-tight mb-4">
            Our Work — <span className="gold-pure-gradient">Sample Presentations & Academic Writing</span>
          </h2>

          <p className="text-neutral-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Explore selected presentations, assignments, resumes, reports, and visual deliverables created by MFS Growth.
          </p>
        </motion.div>

        {/* 2. FEATURED CASE STUDY SHOWCASE */}
        {featuredSample && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => setSelectedSample(featuredSample)}
            onContextMenu={handleProtectedDownload}
            className="mb-14 sm:mb-18 glass-card rounded-2xl sm:rounded-3xl border border-white/10 hover:border-[#E5C158]/40 overflow-hidden cursor-pointer group transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Featured Visual Image Preview */}
              <div className="lg:col-span-7 relative h-64 xs:h-72 sm:h-80 md:h-96 lg:h-full min-h-[280px] bg-neutral-900 overflow-hidden">
                <img
                  src={featuredSample.image}
                  alt={`${featuredSample.title} — Executive Deliverable Showcase by MFS Growth Agency`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#050507] opacity-90" />

                {/* Protection Badges */}
                <div className="absolute top-3 left-3 xs:top-4 xs:left-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-[10px] xs:text-xs text-neutral-200 font-medium flex items-center gap-1.5 shadow-md">
                  <Lock className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Secured Client Preview</span>
                </div>

                <div className="absolute top-3 right-3 xs:top-4 xs:right-4 bg-[#E5C158] text-[#050507] px-3 py-1.5 rounded-xl text-[10px] xs:text-xs font-bold uppercase tracking-wider shadow-md">
                  FEATURED SHOWCASE
                </div>

                {/* Quick View Hover Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                  <span className="px-5 py-2.5 rounded-xl bg-[#E5C158] text-[#050507] text-xs font-extrabold flex items-center gap-2 shadow-xl">
                    <Eye className="w-4 h-4" />
                    <span>View Case Study Preview</span>
                  </span>
                </div>
              </div>

              {/* Featured Case Study Details */}
              <div className="lg:col-span-5 p-6 xs:p-8 sm:p-10 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] xs:text-xs font-mono font-bold uppercase tracking-widest text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/20 px-3 py-1 rounded-full">
                      {featuredSample.category}
                    </span>
                    <span className="text-[10px] xs:text-xs text-neutral-400 font-mono">
                      {featuredSample.clientType}
                    </span>
                  </div>

                  <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold font-poppins text-white group-hover:text-[#E5C158] transition-colors leading-tight">
                    {featuredSample.title}
                  </h3>

                  <p className="text-xs xs:text-sm text-neutral-300 leading-relaxed font-normal">
                    {featuredSample.summary}
                  </p>
                </div>

                {/* Meta Specs Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs font-mono">
                  <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                    <span className="text-neutral-500 text-[10px] uppercase block mb-0.5">Scope</span>
                    <span className="text-white font-bold">{featuredSample.scope}</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                    <span className="text-neutral-500 text-[10px] uppercase block mb-0.5">Tools</span>
                    <span className="text-[#E5C158] font-bold">{featuredSample.tools}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-[#E5C158] font-bold">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>Click to open interactive preview</span>
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* 3. CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 xs:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[40px] ${
                activeCategory === cat
                  ? 'bg-[#E5C158] text-[#050507] shadow-[0_0_20px_rgba(229,193,88,0.25)] font-extrabold'
                  : 'bg-white/[0.03] text-neutral-300 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 4. EDITORIAL PORTFOLIO GRID SHOWCASE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSamples.map((sample, idx) => (
              <motion.div
                key={sample.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                onClick={() => setSelectedSample(sample)}
                onContextMenu={handleProtectedDownload}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#E5C158]/40 cursor-pointer group flex flex-col justify-between transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
              >
                <div>
                  {/* Thumbnail Image Canvas */}
                  <div className="w-full h-48 xs:h-52 relative overflow-hidden bg-neutral-900">
                    <img
                      src={sample.image}
                      alt={`${sample.title} — Work Deliverable Sample by MFS Growth Agency`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-80" />

                    {/* Watermark Tag */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-[10px] text-neutral-300 font-medium flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-[#E5C158]" />
                      <span>Protected Sample</span>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-3 right-3 bg-[#E5C158] text-[#050507] px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase">
                      {sample.category}
                    </div>

                    {/* Quick View Hover State */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                      <span className="px-4 py-2 rounded-xl bg-[#E5C158] text-[#050507] text-xs font-bold flex items-center gap-1.5 shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Preview</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 xs:p-6 space-y-2.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/20 px-2.5 py-0.5 rounded-full inline-block">
                      {sample.clientType}
                    </span>

                    <h3 className="font-poppins font-bold text-white text-base xs:text-lg group-hover:text-[#E5C158] transition-colors leading-snug">
                      {sample.title}
                    </h3>

                    <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                      {sample.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer Specs */}
                <div className="px-5 py-3 border-t border-white/10 bg-white/[0.01] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-300 truncate max-w-[60%]">{sample.scope}</span>
                  <span className="text-[#E5C158] font-bold truncate max-w-[38%]">{sample.tools}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 5. PREVIEW LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedSample && (
            <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md p-2 xs:p-3 sm:p-6 overflow-y-auto flex items-center justify-center pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25 }}
                className="bg-[#08080C] border border-[#E5C158]/40 rounded-2xl xs:rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[calc(100dvh-1rem)] sm:max-h-[90vh] flex flex-col my-auto"
              >
                {/* Modal Header - Sticky & Cleanly Positioned */}
                <div className="p-4 xs:p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#08080C] shrink-0 sticky top-0 z-20">
                  <div className="flex items-center gap-2.5 xs:gap-3 pr-2 min-w-0">
                    <div className="w-8 h-8 xs:w-9 xs:h-9 rounded-xl bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/20 flex items-center justify-center font-bold shrink-0">
                      <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] xs:text-[10px] font-mono font-bold text-[#E5C158] uppercase tracking-wider block truncate">
                        {selectedSample.category} • {selectedSample.clientType}
                      </span>
                      <h3 className="font-poppins font-bold text-white text-sm xs:text-base sm:text-lg truncate">
                        {selectedSample.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSample(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/20 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center border border-white/10"
                    aria-label="Close preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Scrollable Container */}
                <div className="overflow-y-auto flex-1">
                  {/* Protected Image Viewport */}
                  <div className="relative h-48 xs:h-56 sm:h-72 bg-black overflow-hidden border-b border-white/10 select-none shrink-0">
                    <img
                      src={selectedSample.image}
                      alt={`${selectedSample.title} — Secured Work Preview by MFS Growth Agency`}
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                      onContextMenu={handleProtectedDownload}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-transparent" />

                    {/* Watermark Diagonal Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                      <span className="text-xl xs:text-2xl sm:text-3xl font-extrabold font-poppins text-white uppercase tracking-widest -rotate-12 select-none text-center px-4">
                        MFS GROWTH PREVIEW • PROTECTED DELIVERABLE
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 xs:bottom-4 xs:left-4 xs:right-4 flex items-center justify-between text-[10px] xs:text-xs bg-black/80 backdrop-blur-md p-2.5 xs:p-3 rounded-xl border border-white/10 text-neutral-300">
                      <span className="flex items-center gap-1.5 text-[#E5C158] font-medium">
                        <Lock className="w-3.5 h-3.5" />
                        View-Only Deliverables
                      </span>
                      <span className="text-neutral-400">Direct Downloads Disabled</span>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="p-4 xs:p-5 sm:p-6 space-y-4">
                    <p className="text-xs xs:text-sm text-neutral-300 leading-relaxed font-normal">
                      {selectedSample.summary}
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-white/[0.02] p-3.5 xs:p-4 rounded-xl border border-white/5 font-mono">
                      <div>
                        <span className="text-neutral-500 text-[10px] uppercase block mb-0.5">Scope</span>
                        <span className="text-white font-bold">{selectedSample.scope}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] uppercase block mb-0.5">Software / Tools</span>
                        <span className="text-[#E5C158] font-bold">{selectedSample.tools}</span>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedSample(null);
                          if (onOpenOrderModal) onOpenOrderModal();
                        }}
                        className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-[#050507] font-extrabold text-xs tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
                      >
                        <span>Order Similar Project</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>

                      <button
                        onClick={handleProtectedDownload}
                        className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer min-h-[44px]"
                      >
                        Attempt Download
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 6. CALL TO ACTION BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-16 sm:mt-20 glass-card rounded-2xl sm:rounded-3xl border border-white/10 p-8 sm:p-10 text-center relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-poppins text-white tracking-tight">
              Have a project in mind?
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Let MFS Growth turn your idea into a polished professional deliverable.
            </p>

            <div className="pt-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (onOpenOrderModal) onOpenOrderModal();
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-[#050507] font-extrabold text-sm tracking-wide shadow-[0_4px_25px_rgba(229,193,88,0.25)] hover:shadow-[0_8px_35px_rgba(229,193,88,0.4)] transition-all cursor-pointer min-h-[48px] active:scale-[0.98]"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
