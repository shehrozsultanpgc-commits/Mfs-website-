import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Wand2,
  Brain,
  FileSearch,
  Link2,
  BookOpen,
  Copy,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Search,
  TrendingUp,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Currency } from '../../../types';

interface CMSAiSeoOptimizationCenterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSAiSeoOptimizationCenter: React.FC<CMSAiSeoOptimizationCenterProps> = ({
  currency,
  onShowToast,
}) => {
  const [selectedPage, setSelectedPage] = useState('Homepage');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const aiSuggestions = [
    {
      type: 'title',
      title: 'AI Title Suggestion',
      original: 'MFS Growth Agency | Presentations, Assignments & Resume Services',
      suggested: 'MFS Growth Agency | #1 Academic & Executive Digital Solutions in Pakistan',
      impact: '+18% CTR Increase',
      icon: Sparkles,
    },
    {
      type: 'description',
      title: 'AI Meta Description Generator',
      original: 'Helping Students & Professionals Grow with High-Quality Digital Solutions...',
      suggested: 'Elevate your grades & career with MFS Growth Agency. Expert pitch decks, academic writing & ATS resume design. Get 50% off launch discount today!',
      impact: '+24% Organic Clicks',
      icon: Wand2,
    },
    {
      type: 'keywords',
      title: 'High-Impact Keyword Gap Opportunities',
      original: 'Presentation Design, Assignment Writing',
      suggested: 'ATS CV Builder Pakistan, Academic Assignment Help, Executive Pitch Deck Design Rate',
      impact: '+3,400 Monthly Searches',
      icon: Search,
    },
    {
      type: 'linking',
      title: 'Internal Linking Automation Suggestion',
      original: '3 Internal Links Found',
      suggested: 'Link "ATS Resume Engineering" on Homepage directly to /services#resume-section',
      impact: '+12% PageRank Distribution',
      icon: Link2,
    },
  ];

  const readabilityMetrics = [
    { metric: 'Flesch-Kincaid Grade Level', score: 'Grade 8.2', status: 'Optimal Readability' },
    { metric: 'Passive Voice Percentage', score: '4.1%', status: 'Active Voice Strong' },
    { metric: 'Keyword Density Ratio', score: '2.4%', status: 'Natural Search Density' },
    { metric: 'Duplicate Content Risk', score: '0.0%', status: '100% Unique Copy' },
  ];

  const handleRunAiAudit = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      if (onShowToast) {
        onShowToast(`AI SEO Audit completed for ${selectedPage}. All 4 recommendations calculated!`);
      }
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="glass-card rounded-2xl border border-[#E5C158]/30 p-6 bg-gradient-to-br from-[#121212] via-[#201A10] to-[#0D0D12] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/40 flex items-center justify-center text-[#E5C158] shrink-0">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-poppins font-black text-xl text-white">
                  AI SEO Optimization & Copy Intelligence Center
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/40 text-[10px] font-mono font-bold">
                  Stage 1 Powered
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-1">
                Automated AI title generation, keyword gap discovery, internal link optimization, and readability analysis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
            >
              <option value="Homepage">Homepage (/)</option>
              <option value="Our Work">Our Work (/our-work)</option>
              <option value="Services">Services (/services)</option>
            </select>

            <button
              onClick={handleRunAiAudit}
              disabled={isAnalyzing}
              className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.25)]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing...' : 'Run AI SEO Audit'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* READABILITY & DENSITY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {readabilityMetrics.map((item, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 bg-black/40"
          >
            <div className="text-[10px] font-mono text-neutral-400 uppercase">{item.metric}</div>
            <div className="text-xl font-black text-white font-poppins">{item.score}</div>
            <div className="text-[10px] font-mono text-[#28C76F] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#28C76F]" />
              <span>{item.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI RECOMMENDATIONS LIST */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4 bg-[#0D0D12]">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#E5C158]" />
            <h3 className="font-poppins font-bold text-sm text-white">
              AI Growth Opportunities for {selectedPage}
            </h3>
          </div>
          <span className="text-xs text-[#E5C158] font-mono font-bold bg-[#E5C158]/10 px-3 py-1 rounded-full border border-[#E5C158]/30">
            4 AI Recommendations Prepared
          </span>
        </div>

        <div className="space-y-4">
          {aiSuggestions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 hover:border-[#E5C158]/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs text-white">{item.title}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-mono font-bold">
                    {item.impact}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-[10px] text-neutral-500 font-mono">CURRENT VERSION</span>
                    <p className="text-neutral-400 font-sans">{item.original}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#E5C158]/5 border border-[#E5C158]/30 space-y-1">
                    <span className="text-[10px] text-[#E5C158] font-mono font-bold">AI SUGGESTION</span>
                    <p className="text-white font-medium">{item.suggested}</p>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => onShowToast?.(`Applied AI suggestion for ${item.title}!`)}
                    className="px-3 py-1.5 rounded-lg bg-[#E5C158] text-black font-extrabold text-[11px] hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply AI Recommendation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
