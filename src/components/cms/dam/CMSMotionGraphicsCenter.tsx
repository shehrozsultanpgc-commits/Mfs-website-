import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Film,
  Play,
  Pause,
  Sparkles,
  Download,
  Copy,
  Code,
  Zap,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  Plus,
  RefreshCw,
  Eye
} from 'lucide-react';
import { Currency } from '../../../types';

interface CMSMotionGraphicsCenterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export interface MotionAsset {
  id: string;
  name: string;
  category: 'lottie' | 'gsap' | 'motion-react' | 'css-keyframe';
  usageLocation: string;
  fileSize: string;
  fps: number;
  performanceRating: 'A+' | 'A' | 'B+';
  status: 'active' | 'paused' | 'draft';
  codeSnippet: string;
  lastOptimized: string;
}

export const CMSMotionGraphicsCenter: React.FC<CMSMotionGraphicsCenterProps> = ({
  currency,
  onShowToast,
}) => {
  const [playingId, setPlayingId] = useState<string | null>('motion-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [motionAssets, setMotionAssets] = useState<MotionAsset[]>([
    {
      id: 'motion-1',
      name: 'Hero Floating Gold Particle Network',
      category: 'motion-react',
      usageLocation: 'Homepage Hero & Header Canvas',
      fileSize: '12.4 KB',
      fps: 60,
      performanceRating: 'A+',
      status: 'active',
      codeSnippet: `<motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 4, repeat: Infinity }} />`,
      lastOptimized: '2026-07-26',
    },
    {
      id: 'motion-2',
      name: 'MFS Order Success Ripple Lottie',
      category: 'lottie',
      usageLocation: 'Order Success Modal & Proof Confetti',
      fileSize: '34.8 KB',
      fps: 60,
      performanceRating: 'A+',
      status: 'active',
      codeSnippet: `import orderSuccessLottie from '@/assets/lottie/order-success.json';`,
      lastOptimized: '2026-07-25',
    },
    {
      id: 'motion-3',
      name: 'AI Voice Assistant Ripple Waveform',
      category: 'gsap',
      usageLocation: 'Floating AI Voice Widget (Bottom Right)',
      fileSize: '18.2 KB',
      fps: 60,
      performanceRating: 'A+',
      status: 'active',
      codeSnippet: `gsap.to('.ai-voice-wave', { scaleY: 1.8, repeat: -1, yoyo: true, duration: 0.3, ease: 'sine.inOut' });`,
      lastOptimized: '2026-07-24',
    },
    {
      id: 'motion-4',
      name: 'Glass Card Shimmer Hover Transition',
      category: 'css-keyframe',
      usageLocation: 'Services & Our Work Card Hovers',
      fileSize: '1.2 KB',
      fps: 60,
      performanceRating: 'A+',
      status: 'active',
      codeSnippet: `@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`,
      lastOptimized: '2026-07-23',
    },
    {
      id: 'motion-5',
      name: 'Interactive Pricing Slider Pulse',
      category: 'motion-react',
      usageLocation: 'Live Interactive Order Calculator',
      fileSize: '4.8 KB',
      fps: 60,
      performanceRating: 'A',
      status: 'active',
      codeSnippet: `<motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />`,
      lastOptimized: '2026-07-22',
    },
    {
      id: 'motion-6',
      name: 'Skeleton Pulse & Shimmer Loader',
      category: 'motion-react',
      usageLocation: 'Client Portal & Admin Tables Loading',
      fileSize: '2.1 KB',
      fps: 60,
      performanceRating: 'A+',
      status: 'active',
      codeSnippet: `<div className="animate-pulse bg-[#121212] rounded-xl" />`,
      lastOptimized: '2026-07-20',
    },
  ]);

  const handleCopySnippet = (snippet: string, name: string) => {
    navigator.clipboard.writeText(snippet);
    if (onShowToast) onShowToast(`Copied code snippet for ${name}`);
  };

  const filteredAssets = selectedCategory === 'all'
    ? motionAssets
    : motionAssets.filter(m => m.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-[#121212] via-[#1A1826] to-[#0D0D12] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-poppins font-black text-xl text-white">
                  Motion Graphics & UI Animation Center
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] font-mono font-bold">
                  60 FPS Hardware Accelerated
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Centralized registry for Lottie animations, GSAP configs, Motion presets, and micro-interactions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onShowToast?.('AI Animation Performance Audit triggered. All 6 animations running at 60 FPS.')}
              className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold text-xs transition-all flex items-center gap-2 border border-purple-500/30 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Performance Audit</span>
            </button>
            <button
              onClick={() => onShowToast?.('Upload Motion Asset modal opened.')}
              className="px-3.5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(229,193,88,0.2)] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Animation</span>
            </button>
          </div>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl border border-white/10 p-4 space-y-1">
          <div className="text-[11px] text-neutral-400 font-mono">Active Animations</div>
          <div className="text-xl font-black text-white font-poppins">{motionAssets.length} Presets</div>
        </div>

        <div className="glass-card rounded-xl border border-white/10 p-4 space-y-1">
          <div className="text-[11px] text-neutral-400 font-mono">Avg Frame Rate</div>
          <div className="text-xl font-black text-[#28C76F] font-poppins flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#28C76F]" />
            <span>60.0 FPS</span>
          </div>
        </div>

        <div className="glass-card rounded-xl border border-white/10 p-4 space-y-1">
          <div className="text-[11px] text-neutral-400 font-mono">Total Bundle Overhead</div>
          <div className="text-xl font-black text-purple-400 font-poppins">73.5 KB</div>
        </div>

        <div className="glass-card rounded-xl border border-white/10 p-4 space-y-1">
          <div className="text-[11px] text-neutral-400 font-mono">Hardware Accel Rating</div>
          <div className="text-xl font-black text-[#E5C158] font-poppins">A+ (Perfect)</div>
        </div>
      </div>

      {/* ANIMATION CATEGORY TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Motion Assets' },
          { id: 'motion-react', label: 'Motion React' },
          { id: 'lottie', label: 'Lottie JSON' },
          { id: 'gsap', label: 'GSAP Timelines' },
          { id: 'css-keyframe', label: 'CSS Keyframes' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              selectedCategory === tab.id
                ? 'bg-purple-500 text-white border-purple-500 font-extrabold shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ANIMATIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => {
          const isPlaying = playingId === asset.id;
          return (
            <div
              key={asset.id}
              className="glass-card rounded-2xl border border-white/10 p-5 bg-black/40 space-y-4 hover:border-purple-500/40 transition-all flex flex-col justify-between"
            >
              {/* ANIMATION PREVIEW CARD */}
              <div className="space-y-3">
                <div className="relative h-32 rounded-xl bg-gradient-to-br from-[#0B0B10] to-[#141420] border border-white/10 flex items-center justify-center overflow-hidden">
                  {/* Motion Visualizer Simulation */}
                  <motion.div
                    animate={
                      isPlaying
                        ? { scale: [0.9, 1.1, 0.9], rotate: [0, 90, 0], opacity: [0.7, 1, 0.7] }
                        : { scale: 1, rotate: 0, opacity: 0.8 }
                    }
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#E5C158]/20 to-purple-500/30 border border-[#E5C158]/40 flex items-center justify-center text-[#E5C158] shadow-[0_0_20px_rgba(229,193,88,0.2)]"
                  >
                    <Sparkles className="w-8 h-8" />
                  </motion.div>

                  <button
                    onClick={() => setPlayingId(isPlaying ? null : asset.id)}
                    className="absolute bottom-2 right-2 p-2 rounded-lg bg-black/60 hover:bg-black/90 text-white border border-white/10 transition-all cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#E5C158]" /> : <Play className="w-3.5 h-3.5" />}
                  </button>

                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                    {asset.category.toUpperCase()}
                  </span>
                </div>

                <div>
                  <div className="font-bold text-sm text-white">{asset.name}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">{asset.usageLocation}</div>
                </div>

                <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400 pt-1 border-t border-white/10">
                  <span>Size: {asset.fileSize}</span>
                  <span>Target: {asset.fps} FPS</span>
                  <span className="text-[#28C76F] font-bold">Rating: {asset.performanceRating}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-black/80 border border-white/5 font-mono text-[10px] text-neutral-300 overflow-x-auto whitespace-nowrap">
                  <code>{asset.codeSnippet}</code>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[10px] text-neutral-400">Optimized {asset.lastOptimized}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopySnippet(asset.codeSnippet, asset.name)}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3 text-[#E5C158]" />
                    <span>Copy Code</span>
                  </button>
                  <button
                    onClick={() => onShowToast?.(`Exporting ${asset.name}...`)}
                    className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white cursor-pointer"
                    title="Export File"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
