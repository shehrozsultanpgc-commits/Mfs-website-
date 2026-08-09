import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Bot,
  Wand2,
  FileText,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Languages,
  Calendar,
  Layers,
  Search,
  Zap,
  ArrowRight,
  Sliders,
  Copy,
  Clock,
  Send
} from 'lucide-react';
import { Currency } from '../../types';

interface CMSAiContentOperationsHubProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSAiContentOperationsHub: React.FC<CMSAiContentOperationsHubProps> = ({
  currency,
  onShowToast,
}) => {
  // Active AI Tool State
  const [activeTool, setActiveTool] = useState<
    | 'blog_writer'
    | 'content_optimizer'
    | 'grammar_checker'
    | 'tone_optimizer'
    | 'headline_gen'
    | 'faq_gen'
    | 'kb_assistant'
    | 'translation_assistant'
    | 'content_calendar'
  >('blog_writer');

  // Simulator Input & Output
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);

  const aiTools = [
    {
      id: 'blog_writer',
      title: 'AI Blog Writer',
      desc: 'Generate SEO-optimized blog posts, guides, and thought leadership articles.',
      icon: FileText,
      badge: 'Stage 2 Ready',
    },
    {
      id: 'content_optimizer',
      title: 'AI Content Optimizer',
      desc: 'Enhance keyword density, search readability, and schema markup.',
      icon: Sparkles,
      badge: 'Stage 2 Ready',
    },
    {
      id: 'grammar_checker',
      title: 'AI Grammar & Style',
      desc: 'Automated proofreading according to APA, Harvard, and corporate guides.',
      icon: Wand2,
      badge: 'Stage 2 Ready',
    },
    {
      id: 'tone_optimizer',
      title: 'AI Tone & Style Adjuster',
      desc: 'Adapt tone between Executive Professional, Academic Formal, or Conversational.',
      icon: Sliders,
      badge: 'Stage 2 Ready',
    },
    {
      id: 'headline_gen',
      title: 'AI Headline Generator',
      desc: 'Produce 10+ high-CTR article titles and email subject lines.',
      icon: Zap,
      badge: 'Stage 2 Ready',
    },
    {
      id: 'faq_gen',
      title: 'AI FAQ Extractor',
      desc: 'Automatically recommend FAQs from client inquiries & order notes.',
      icon: HelpCircle,
      badge: 'Stage 2 Ready',
    },
    {
      id: 'kb_assistant',
      title: 'AI Knowledge Assistant',
      desc: 'Semantic RAG vector search across internal SOPs and brand directives.',
      icon: BookOpen,
      badge: 'Stage 2 Ready',
    },
    {
      id: 'translation_assistant',
      title: 'AI Multilingual Translator',
      desc: 'Instant translation into Urdu, Arabic, French, German, and Spanish.',
      icon: Languages,
      badge: 'Stage 2 Ready',
    },
    {
      id: 'content_calendar',
      title: 'AI Content Calendar Planner',
      desc: 'Auto-schedule content publishing calendar based on seasonal demand.',
      icon: Calendar,
      badge: 'Stage 2 Ready',
    },
  ];

  const handleSimulateGeneration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedOutput(
        `[STAGE 2 AI MODEL SIMULATION OUTPUT]\n\nGenerated response for "${promptInput}":\n\n1. Executive Summary: Formatted according to MFS Growth Agency brand guidelines (#E5C158 Gold theme).\n2. SEO Alignment: Target keywords inserted with optimal 2.1% density.\n3. Multilingual Support: English master draft ready for Urdu / Arabic translation queue.\n\nNote: Full LLM pipeline execution will be connected in Stage 2 Real Backend Integration.`
      );
      if (onShowToast) onShowToast('AI Operations Simulation generated successfully!');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold border border-amber-500/30 uppercase">
                AI CONTENT OPERATIONS HUB
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#28C76F]" />
                <span>COMING IN STAGE 2 – REAL IMPLEMENTATION</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              AI-Powered Content Generation & Editorial Intelligence
            </h3>
            <p className="text-xs text-neutral-400">
              Unified workspace for AI Blog Writing, SEO Optimization, Grammar Checking, FAQ Extraction, and Multilingual AI Content Expansion.
            </p>
          </div>
        </div>

        {/* 9 AI TOOLS SELECTION CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 pt-2 border-t border-white/10">
          {aiTools.map((tool) => {
            const IconComponent = tool.icon;
            const isSelected = activeTool === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool.id as any);
                  setGeneratedOutput(null);
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-[#E5C158]/10 border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.2)]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5C158]">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[9px] font-bold border border-amber-500/30">
                    {tool.badge}
                  </span>
                </div>

                <strong className="text-white text-xs font-bold block">
                  {tool.title}
                </strong>
                <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2">
                  {tool.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE SIMULATOR BOX */}
      <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-[#0D0D12]">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-[#E5C158]">
            <Bot className="w-5 h-5" />
            <h3 className="font-poppins font-bold text-white text-base">
              Active Tool: {aiTools.find((t) => t.id === activeTool)?.title}
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
            Coming in Stage 2 – Real Implementation
          </span>
        </div>

        <form onSubmit={handleSimulateGeneration} className="space-y-4">
          <div>
            <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
              Enter Content Prompt / Topic / Draft Input
            </label>
            <textarea
              rows={3}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. Write an executive pitch deck blog post outlining slide visual hierarchy for Series A tech startups..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] text-neutral-400">
              Simulates AI prompt processing and output formatting before Stage 2 backend connection.
            </p>

            <button
              type="submit"
              disabled={isGenerating}
              className="px-6 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Processing Prompt...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Simulate AI Generation</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* SIMULATED AI OUTPUT DISPLAY */}
        {generatedOutput && (
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 pt-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] font-mono text-[#E5C158] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F]" />
                <span>AI OUTPUT PREVIEW</span>
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedOutput);
                  if (onShowToast) onShowToast('Copied AI output preview to clipboard!');
                }}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 font-mono text-[10px] flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3 text-[#E5C158]" />
                <span>Copy Output</span>
              </button>
            </div>

            <pre className="text-xs text-neutral-200 font-mono whitespace-pre-wrap leading-relaxed">
              {generatedOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
