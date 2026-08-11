import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, FileText, UserCheck, Sparkles, Layers, Sliders, Check } from 'lucide-react';

export const HeroDocumentStudioVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'slides' | 'assignments' | 'resumes'>('slides');

  return (
    <div className="relative w-full max-w-lg lg:max-w-none rounded-2xl border border-white/10 bg-[#08080C]/90 p-3.5 xs:p-5 sm:p-6 shadow-[0_30px_70px_rgba(0,0,0,0.85)] overflow-hidden glass-card">
      {/* Decorative Golden Corner Accents & Studio Watermark */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#E5C158]/15 blur-2xl rounded-full pointer-events-none" />
      
      {/* Top Studio Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 mb-4 sm:mb-5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5C158] animate-ping" />
          <span className="text-[10px] xs:text-xs font-mono font-bold tracking-wider text-[#E5C158] uppercase">
            MFS Studio Canvas
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/50 border border-white/10 px-2 xs:px-2.5 py-1 rounded-md text-[9px] xs:text-[10px] font-mono text-neutral-400">
          <Sliders className="w-3 h-3 text-[#E5C158]" />
          <span>Precision 12-Column Grid</span>
        </div>
      </div>

      {/* Deliverable Category Switcher */}
      <div className="grid grid-cols-3 gap-1 xs:gap-1.5 p-1 bg-black/60 border border-white/10 rounded-xl mb-4 sm:mb-5">
        <button
          onClick={() => setActiveTab('slides')}
          className={`py-1.5 xs:py-2 px-1 xs:px-2 sm:px-3 rounded-lg text-[10px] xs:text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
            activeTab === 'slides'
              ? 'bg-[#E5C158] text-[#050507] shadow-md font-bold'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layout className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
          <span className="truncate">Slide Decks</span>
        </button>

        <button
          onClick={() => setActiveTab('assignments')}
          className={`py-1.5 xs:py-2 px-1 xs:px-2 sm:px-3 rounded-lg text-[10px] xs:text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
            activeTab === 'assignments'
              ? 'bg-[#E5C158] text-[#050507] shadow-md font-bold'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
          <span className="truncate">Assignments</span>
        </button>

        <button
          onClick={() => setActiveTab('resumes')}
          className={`py-1.5 xs:py-2 px-1 xs:px-2 sm:px-3 rounded-lg text-[10px] xs:text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
            activeTab === 'resumes'
              ? 'bg-[#E5C158] text-[#050507] shadow-md font-bold'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <UserCheck className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
          <span className="truncate">Resumes</span>
        </button>
      </div>

      {/* Canvas Studio Interactive Display Area */}
      <div className="relative min-h-[220px] xs:min-h-[240px] sm:min-h-[260px] rounded-xl border border-white/10 bg-[#050507] p-3 xs:p-4 sm:p-5 overflow-hidden flex flex-col justify-between">
        {/* Alignment Ruler Background */}
        <div className="absolute top-0 left-0 right-0 h-4 border-b border-white/5 bg-white/[0.02] flex justify-between px-2 text-[8px] font-mono text-neutral-600 select-none">
          <span>0px</span>
          <span>192px</span>
          <span>384px</span>
          <span>576px</span>
          <span>768px</span>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'slides' && (
            <motion.div
              key="slides"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="mt-3 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded border border-[#E5C158]/20">
                  Slide 01 of 12 • Executive Pitch Deck
                </span>
                <span className="text-[10px] font-mono text-neutral-500">16:9 Widescreen Master</span>
              </div>

              {/* Master Slide Wireframe */}
              <div className="rounded-lg border border-[#E5C158]/30 bg-[#0D0D12] p-4 space-y-3 relative">
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
                <div className="w-3/4 h-4 bg-gradient-to-r from-[#E5C158] to-[#E5C158]/40 rounded-sm" />
                <div className="w-1/2 h-2 bg-white/20 rounded-sm" />
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="h-16 rounded bg-white/[0.04] border border-white/10 p-2 space-y-1.5">
                    <div className="w-8 h-2 bg-[#E5C158]/60 rounded-sm" />
                    <div className="w-full h-1 bg-white/20 rounded-sm" />
                    <div className="w-3/4 h-1 bg-white/20 rounded-sm" />
                  </div>
                  <div className="h-16 rounded bg-white/[0.04] border border-white/10 p-2 space-y-1.5">
                    <div className="w-8 h-2 bg-[#28C76F]/60 rounded-sm" />
                    <div className="w-full h-1 bg-white/20 rounded-sm" />
                    <div className="w-3/4 h-1 bg-white/20 rounded-sm" />
                  </div>
                  <div className="h-16 rounded bg-white/[0.04] border border-white/10 p-2 space-y-1.5">
                    <div className="w-8 h-2 bg-white/60 rounded-sm" />
                    <div className="w-full h-1 bg-white/20 rounded-sm" />
                    <div className="w-3/4 h-1 bg-white/20 rounded-sm" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'assignments' && (
            <motion.div
              key="assignments"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="mt-3 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#28C76F] bg-[#28C76F]/10 px-2 py-0.5 rounded border border-[#28C76F]/20">
                  Academic Paper • APA 7th Edition
                </span>
                <span className="text-[10px] font-mono text-neutral-500">Turnitin Verified • 0% AI</span>
              </div>

              {/* Assignment Document Wireframe */}
              <div className="rounded-lg border border-white/15 bg-[#0D0D12] p-4 space-y-2.5 relative">
                <div className="w-2/3 h-3.5 bg-white/80 rounded-sm" />
                <div className="w-1/3 h-2 bg-[#E5C158]/80 rounded-sm" />
                <div className="space-y-1.5 pt-2">
                  <div className="w-full h-1.5 bg-white/25 rounded-sm" />
                  <div className="w-full h-1.5 bg-white/25 rounded-sm" />
                  <div className="w-11/12 h-1.5 bg-white/25 rounded-sm" />
                  <div className="w-4/5 h-1.5 bg-white/25 rounded-sm" />
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[9px] font-mono text-neutral-400">
                  <span>References: 18 Academic Sources</span>
                  <span className="text-[#28C76F] font-bold">Passed Peer Review</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'resumes' && (
            <motion.div
              key="resumes"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="mt-3 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded border border-[#E5C158]/20">
                  ATS-Compliant Executive CV
                </span>
                <span className="text-[10px] font-mono text-neutral-500">98% ATS Compatibility</span>
              </div>

              {/* Resume Blueprint Wireframe */}
              <div className="rounded-lg border border-white/15 bg-[#0D0D12] p-4 space-y-3 relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="space-y-1">
                    <div className="w-32 h-3 bg-white/90 rounded-sm" />
                    <div className="w-24 h-2 bg-[#E5C158] rounded-sm" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20" />
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-4 space-y-1.5 border-r border-white/10 pr-2">
                    <div className="w-full h-1.5 bg-white/30 rounded-sm" />
                    <div className="w-3/4 h-1.5 bg-white/20 rounded-sm" />
                    <div className="w-5/6 h-1.5 bg-white/20 rounded-sm" />
                  </div>
                  <div className="col-span-8 space-y-1.5">
                    <div className="w-full h-1.5 bg-white/40 rounded-sm" />
                    <div className="w-full h-1.5 bg-white/20 rounded-sm" />
                    <div className="w-2/3 h-1.5 bg-white/20 rounded-sm" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Studio Metadata Footer */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Tailored Formatting & Citation Rules</span>
        </div>
        <div className="flex items-center gap-1 text-[#28C76F] font-semibold">
          <Check className="w-3.5 h-3.5" />
          <span>Ready to Deliver</span>
        </div>
      </div>
    </div>
  );
};
