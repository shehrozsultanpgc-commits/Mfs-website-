import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sliders, CheckCircle2, Shield, Laptop, Monitor, FileText, Layers, Check } from 'lucide-react';

export const AboutStudioCanvasVisual: React.FC = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#E5C158]/40 shadow-2xl bg-[#09090E] p-4 sm:p-5 text-white select-none">
      {/* Luxury gold ambient glow behind studio panel */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5C158]/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#28C76F]/10 blur-3xl rounded-full pointer-events-none" />

      {/* Top Studio Operations Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C76F] animate-ping" />
          <span className="text-xs font-mono font-bold tracking-wider text-[#E5C158] uppercase">
            MFS Digital Studio &amp; Production Desk
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          Islamabad HQ • 24/7 Global Delivery
        </span>
      </div>

      {/* Main Studio Workstation Wireframe Mockup */}
      <div className="grid grid-cols-12 gap-3 mb-4">
        {/* Left Monitor (Presentation & Slide Deck Design Stage) */}
        <div className="col-span-12 sm:col-span-7 rounded-xl border border-white/15 bg-black/60 p-3.5 space-y-2.5 relative">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-b border-white/10 pb-1.5">
            <span className="text-[#E5C158] font-semibold flex items-center gap-1">
              <Monitor className="w-3 h-3" />
              Workstation A • Executive Decks
            </span>
            <span className="text-[#28C76F]">Active Render</span>
          </div>

          <div className="space-y-2">
            <div className="w-3/4 h-3 bg-white/90 rounded-sm" />
            <div className="w-1/2 h-2 bg-[#E5C158]/80 rounded-sm" />
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <div className="h-10 rounded bg-[#E5C158]/10 border border-[#E5C158]/30 p-1">
                <div className="w-6 h-1.5 bg-[#E5C158] rounded-xs mb-1" />
                <div className="w-full h-1 bg-white/20 rounded-xs" />
              </div>
              <div className="h-10 rounded bg-[#28C76F]/10 border border-[#28C76F]/30 p-1">
                <div className="w-6 h-1.5 bg-[#28C76F] rounded-xs mb-1" />
                <div className="w-full h-1 bg-white/20 rounded-xs" />
              </div>
              <div className="h-10 rounded bg-white/5 border border-white/10 p-1">
                <div className="w-6 h-1.5 bg-white/60 rounded-xs mb-1" />
                <div className="w-full h-1 bg-white/20 rounded-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Monitor (ATS Verification & Quality Audit Desk) */}
        <div className="col-span-12 sm:col-span-5 rounded-xl border border-[#28C76F]/30 bg-gradient-to-b from-[#0F1410] to-[#080B09] p-3.5 space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-b border-white/10 pb-1.5">
            <span className="text-[#28C76F] font-semibold flex items-center gap-1">
              <Shield className="w-3 h-3" />
              QA &amp; Plagiarism Engine
            </span>
            <span className="text-white">0% AI</span>
          </div>

          <div className="space-y-1.5 py-1">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-neutral-300">Turnitin Audit:</span>
              <span className="text-[#28C76F] font-bold">100% Original</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-neutral-300">ATS Parsing:</span>
              <span className="text-[#E5C158] font-bold">98% Match</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-neutral-300">Citations (APA/MLA):</span>
              <span className="text-[#28C76F] font-bold">Verified</span>
            </div>
          </div>

          <div className="text-[9px] font-mono text-neutral-400 bg-white/5 px-2 py-1 rounded text-center border border-white/5">
            Lead Director QA Signed
          </div>
        </div>
      </div>

      {/* Bottom Info Banner */}
      <div className="bg-[#0E0E14]/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#28C76F] animate-pulse" />
          <span className="text-[#E5C158] font-poppins font-bold flex items-center gap-1.5 text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            MFS Digital Operations &amp; Studio Desk
          </span>
        </div>
        <span className="text-neutral-400 font-mono text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/5">
          100% Commercial Free &bull; MFS Operations
        </span>
      </div>
    </div>
  );
};
