import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  Sparkles,
  Award,
  Sliders,
  Cpu,
  RefreshCw,
  Terminal,
  ShieldCheck
} from 'lucide-react';

export const ATSInteractiveArchitectureGraphic: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'ingestion' | 'parsing' | 'scoring'>('parsing');
  const [simulatedScore, setSimulatedScore] = useState<number>(98);
  const [activeView, setActiveView] = useState<'diagram' | 'code' | 'benchmark'>('diagram');

  return (
    <div className="w-full rounded-2xl border border-[#E5C158]/35 bg-[#08080C] p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden font-sans select-none">
      {/* Golden luxury ambient backdrops */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5C158]/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#28C76F]/05 blur-[80px] rounded-full pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#E5C158] to-[#D4AF37] text-neutral-950 flex items-center justify-center font-bold shadow-md">
            <Cpu className="w-4 h-4 text-neutral-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold font-poppins text-white tracking-tight">
                ATS Ingestion &amp; Parser Tokenization Pipeline
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#28C76F]/15 border border-[#28C76F]/30 text-[#28C76F] font-mono font-semibold">
                SYSTEM VERIFIED
              </span>
            </div>
            <p className="text-[11px] text-[#9FA0A7] font-mono">
              Workday • Taleo • Greenhouse • Lever Parsing Engine Architecture
            </p>
          </div>
        </div>

        {/* View toggle tabs */}
        <div className="flex items-center gap-1 bg-black/60 border border-white/10 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveView('diagram')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              activeView === 'diagram'
                ? 'bg-[#E5C158] text-[#050507] font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            ATS Parser Architecture
          </button>
          <button
            onClick={() => setActiveView('benchmark')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              activeView === 'benchmark'
                ? 'bg-[#E5C158] text-[#050507] font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Format Comparison &amp; Pass Rate
          </button>
        </div>
      </div>

      {/* Main interactive visual stages */}
      {activeView === 'diagram' && (
        <div className="space-y-5">
          {/* Pipeline stages selector */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-black/50 border border-white/10 rounded-xl">
            <button
              onClick={() => {
                setActiveStage('ingestion');
                setSimulatedScore(84);
              }}
              className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                activeStage === 'ingestion'
                  ? 'bg-white/10 border border-[#E5C158]/40 shadow-inner'
                  : 'hover:bg-white/5 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#E5C158] mb-1">
                <span>STAGE 01</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
              </div>
              <div className="text-xs font-bold text-white">Document Ingestion</div>
              <div className="text-[10px] text-neutral-400 truncate">PDF / DOCX Text Stream</div>
            </button>

            <button
              onClick={() => {
                setActiveStage('parsing');
                setSimulatedScore(98);
              }}
              className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                activeStage === 'parsing'
                  ? 'bg-white/10 border border-[#E5C158]/40 shadow-inner'
                  : 'hover:bg-white/5 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#28C76F] mb-1">
                <span>STAGE 02</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F]" />
              </div>
              <div className="text-xs font-bold text-white">NLP Tokenization</div>
              <div className="text-[10px] text-neutral-400 truncate">Entity &amp; Skill Extraction</div>
            </button>

            <button
              onClick={() => {
                setActiveStage('scoring');
                setSimulatedScore(99);
              }}
              className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                activeStage === 'scoring'
                  ? 'bg-white/10 border border-[#E5C158]/40 shadow-inner'
                  : 'hover:bg-white/5 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#E5C158] mb-1">
                <span>STAGE 03</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
              </div>
              <div className="text-xs font-bold text-white">Recruiter Ranking</div>
              <div className="text-[10px] text-neutral-400 truncate">Semantic Relevance Fit</div>
            </button>
          </div>

          {/* Interactive Pipeline Diagram Stage */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left: Input Resume Structure */}
            <div className="md:col-span-5 rounded-xl border border-white/10 bg-[#0C0C12] p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-white/10 pb-2">
                <span className="flex items-center gap-1.5 text-white font-medium">
                  <FileText className="w-3.5 h-3.5 text-[#E5C158]" />
                  Single-Column Master
                </span>
                <span className="text-[#28C76F]">Clean OCR Path</span>
              </div>

              {/* Wireframe Resume Skeleton with active scanner beam */}
              <div className="rounded-lg border border-white/15 bg-black/60 p-3 space-y-2 relative overflow-hidden">
                {/* Glowing scanner line animation */}
                <motion.div
                  animate={{ y: [0, 110, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E5C158] to-transparent shadow-[0_0_12px_rgba(229,193,88,0.9)] z-10 pointer-events-none"
                />

                <div className="w-2/3 h-3 bg-white/90 rounded-sm font-poppins" />
                <div className="w-1/2 h-2 bg-[#E5C158]/80 rounded-sm" />
                <div className="h-px bg-white/10 my-2" />

                <div className="space-y-1">
                  <div className="w-1/3 h-2 bg-white/40 rounded-sm" />
                  <div className="w-full h-1.5 bg-white/20 rounded-sm" />
                  <div className="w-11/12 h-1.5 bg-white/20 rounded-sm" />
                  <div className="w-4/5 h-1.5 bg-white/20 rounded-sm" />
                </div>

                <div className="pt-2 space-y-1">
                  <div className="w-2/5 h-2 bg-white/40 rounded-sm" />
                  <div className="w-full h-1.5 bg-[#28C76F]/40 rounded-sm" />
                  <div className="w-5/6 h-1.5 bg-white/20 rounded-sm" />
                </div>
              </div>

              <div className="text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                <span>Layout: 1-Column Linear</span>
                <span className="text-[#28C76F] font-semibold">0% Table Traps</span>
              </div>
            </div>

            {/* Middle: Parser Token Processing Engine */}
            <div className="md:col-span-4 rounded-xl border border-[#E5C158]/25 bg-gradient-to-b from-[#101018] to-[#0A0A0E] p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-white/10 pb-2">
                <span className="flex items-center gap-1.5 text-[#E5C158] font-semibold">
                  <Search className="w-3.5 h-3.5" />
                  Parser Tokens
                </span>
                <span className="text-white text-[10px]">100% Extracted</span>
              </div>

              {/* Extracted Entity Badges */}
              <div className="space-y-2 py-1">
                <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-neutral-300 font-mono text-[11px]">Personal Profile:</span>
                  <span className="text-[#28C76F] font-semibold text-[11px]">Valid Entity</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-neutral-300 font-mono text-[11px]">Work Experience:</span>
                  <span className="text-[#28C76F] font-semibold text-[11px]">5 Chronological Roles</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-neutral-300 font-mono text-[11px]">Keywords Matched:</span>
                  <span className="text-[#E5C158] font-bold font-mono text-[11px]">28 / 30 Target</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-neutral-300 font-mono text-[11px]">Contact &amp; Links:</span>
                  <span className="text-[#28C76F] font-semibold text-[11px]">Parsed &amp; Clickable</span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-[#9FA0A7] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#28C76F]" />
                <span>Format: Pure UTF-8 Standard</span>
              </div>
            </div>

            {/* Right: Output Compatibility Score Meter */}
            <div className="md:col-span-3 rounded-xl border border-white/10 bg-[#0C0C12] p-4 flex flex-col items-center justify-between text-center space-y-3">
              <div className="text-xs font-mono text-neutral-400 border-b border-white/10 w-full pb-2">
                <span>ATS Parser Rank</span>
              </div>

              <div className="relative flex items-center justify-center my-2">
                {/* Glowing radial score circle */}
                <div className="w-24 h-24 rounded-full border-4 border-[#E5C158] flex flex-col items-center justify-center bg-[#07070A] shadow-[0_0_25px_rgba(229,193,88,0.35)]">
                  <span className="text-2xl font-extrabold font-poppins text-white">{simulatedScore}%</span>
                  <span className="text-[9px] font-mono text-[#28C76F] uppercase tracking-wider font-semibold">
                    Optimal
                  </span>
                </div>
              </div>

              <div className="w-full space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>Workday ATS</span>
                  <span className="text-[#28C76F] font-bold">Passed</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>Taleo / Oracle</span>
                  <span className="text-[#28C76F] font-bold">Passed</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>Greenhouse</span>
                  <span className="text-[#28C76F] font-bold">Passed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Benchmark View */}
      {activeView === 'benchmark' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-500/25 bg-red-950/10 p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>Multi-Column &amp; Graphic Resumes (Fail)</span>
            </div>
            <ul className="text-xs text-neutral-300 space-y-1.5 font-light">
              <li className="flex items-start gap-1.5">
                <span className="text-red-400 font-bold">•</span> Text in graphic text boxes is discarded by 70% of parsers.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-400 font-bold">•</span> Two-column layouts merge job titles with unrelated bullet points.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-400 font-bold">•</span> Rating bars (e.g. 5/5 stars) cannot be parsed by keyword scorers.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-[#28C76F]/30 bg-[#28C76F]/05 p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#28C76F]">
              <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
              <span>MFS Single-Column Engineering (Pass)</span>
            </div>
            <ul className="text-xs text-neutral-300 space-y-1.5 font-light">
              <li className="flex items-start gap-1.5">
                <span className="text-[#28C76F] font-bold">•</span> Linear hierarchical flow ensures 100% chronological parsing.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#28C76F] font-bold">•</span> Contextual keyword density matched directly to job taxonomy.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#28C76F] font-bold">•</span> Standard standard headings (Experience, Education, Skills, Projects).
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Footer verification bar */}
      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-neutral-400 font-mono">
        <span className="flex items-center gap-1 text-[#E5C158]">
          <Sparkles className="w-3.5 h-3.5" />
          MFS Engineering Standard • 100% License Free &amp; Verified
        </span>
        <span className="text-neutral-500">ISO-Aligned Document Typography &amp; Hierarchy</span>
      </div>
    </div>
  );
};
