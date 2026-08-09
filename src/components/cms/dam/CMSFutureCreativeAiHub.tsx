import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Wand2,
  Image as ImageIcon,
  Layers,
  Video,
  FileSearch,
  Zap,
  Lock,
  Cpu,
  Scissors,
  Maximize2,
  Tag,
  Palette,
  ArrowRight
} from 'lucide-react';
import { Currency } from '../../../types';

interface CMSFutureCreativeAiHubProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSFutureCreativeAiHub: React.FC<CMSFutureCreativeAiHubProps> = ({
  currency,
  onShowToast,
}) => {
  const creativeTools = [
    {
      id: 'tool-1',
      title: 'AI Image Generator',
      category: 'Generative Visuals',
      description: 'Generate high-resolution marketing banners, stock visuals, and social media graphics using text prompts.',
      icon: ImageIcon,
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'tool-2',
      title: 'AI Background Removal',
      category: 'Image Editing',
      description: 'Instant 1-click transparent background removal for product photos, logos, and team avatars.',
      icon: Scissors,
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'tool-3',
      title: 'AI 4K Image Upscaler',
      category: 'Resolution Enhancer',
      description: 'Enhance low-res client graphics and legacy assets to crisp 4K vector-level quality.',
      icon: Maximize2,
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'tool-4',
      title: 'AI Thumbnail & Card Generator',
      category: 'Media Production',
      description: 'Auto-generate branded thumbnail graphics for case studies, portfolio items, and video posts.',
      icon: Layers,
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'tool-5',
      title: 'AI Banner & Social Post Creator',
      category: 'Marketing Automation',
      description: 'Create multi-format promo banners tailored for Instagram, LinkedIn, and Facebook ads.',
      icon: Palette,
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'tool-6',
      title: 'AI Logo Variant Engine',
      category: 'Brand Governance',
      description: 'Automatically generate dark mode, light mode, monochrome, and app icon variants from SVG logos.',
      icon: Wand2,
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'tool-7',
      title: 'AI Video Subtitle & Captioner',
      category: 'Video Intelligence',
      description: 'Generate open/closed captions in English, Urdu, and Roman Urdu for video loops.',
      icon: Video,
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'tool-8',
      title: 'AI Lossless Compression Engine',
      category: 'Performance',
      description: 'Smart perceptual quality compression converting legacy JPEGs to AVIF/WebP formats.',
      icon: Zap,
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'tool-9',
      title: 'AI Vision Auto-Tagging',
      category: 'Asset Management',
      description: 'Computer vision model automatically analyzes uploaded media and attaches relevant tags.',
      icon: Tag,
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'tool-10',
      title: 'AI Natural Language Smart Search',
      category: 'Semantic Search',
      description: 'Search media library using natural prompts like "find blue presentation deck with gold logo".',
      icon: FileSearch,
      status: 'Coming in Stage 2 – Real Implementation',
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="glass-card rounded-2xl border border-[#E5C158]/30 p-6 bg-gradient-to-br from-[#121212] via-[#201A10] to-[#0D0D12] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/40 flex items-center justify-center text-[#E5C158] shrink-0">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-poppins font-black text-xl text-white">
                  Future Creative AI Hub
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/40 text-[10px] font-mono font-bold">
                  Stage 2 Preview Hub
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-1">
                Generative AI media suite for automated image generation, background removal, upscaling, and natural language search.
              </p>
            </div>
          </div>

          <span className="px-3 py-1.5 rounded-xl bg-black/60 border border-[#E5C158]/40 text-[#E5C158] font-mono text-xs font-bold shrink-0">
            10 AI Tools Architecture Prepared
          </span>
        </div>
      </div>

      {/* AI TOOLS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {creativeTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="glass-card rounded-2xl border border-white/10 p-5 bg-black/40 space-y-4 relative overflow-hidden group hover:border-[#E5C158]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5C158]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 text-[10px] font-mono font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#E5C158]" />
                    <span>Stage 2</span>
                  </span>
                </div>

                <div>
                  <div className="font-poppins font-bold text-sm text-white group-hover:text-[#E5C158] transition-colors">
                    {tool.title}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 mt-0.5">{tool.category}</div>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{tool.description}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-[#E5C158] font-mono italic">
                  {tool.status}
                </span>
                <button
                  onClick={() => onShowToast?.(`${tool.title} capability registered for Stage 2 implementation.`)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-[#E5C158] hover:text-black text-neutral-300 transition-all cursor-pointer"
                  title="Request Early Access"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
