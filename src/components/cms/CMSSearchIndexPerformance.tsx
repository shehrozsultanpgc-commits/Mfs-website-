import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  BarChart3,
  TrendingUp,
  Cpu,
  RefreshCw,
  Globe,
  CheckCircle2,
  FileText,
  HelpCircle,
  Award,
  Sparkles,
  Zap,
  Activity,
  Layers,
  ArrowUpRight,
  Database
} from 'lucide-react';
import { Currency } from '../../types';

interface CMSSearchIndexPerformanceProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSSearchIndexPerformance: React.FC<CMSSearchIndexPerformanceProps> = ({
  currency,
  onShowToast,
}) => {
  const [isReindexing, setIsReindexing] = useState(false);

  // Search Index Summary State
  const indexStats = [
    { title: 'Indexed Pages', count: '14 Pages', status: 'Healthy', color: 'text-emerald-400' },
    { title: 'Indexed Blog Posts', count: '3 Articles', status: 'Healthy', color: 'text-blue-400' },
    { title: 'Indexed FAQs', count: '4 Schema Items', status: 'Healthy', color: 'text-amber-400' },
    { title: 'Indexed Case Studies', count: '3 Proof Items', status: 'Healthy', color: 'text-purple-400' },
  ];

  // Top Keywords Tracked
  const topKeywords = [
    { keyword: 'presentation design pakistan', volume: '2,400/mo', position: '#1 Rank' },
    { keyword: 'apa referencing assignment help', volume: '1,850/mo', position: '#2 Rank' },
    { keyword: 'ats resume engineering islamabad', volume: '1,200/mo', position: '#1 Rank' },
    { keyword: 'pitch deck designer dubai uae', volume: '950/mo', position: '#3 Rank' },
    { keyword: '50 discount assignment agency', volume: '800/mo', position: '#1 Rank' },
  ];

  const handleRebuildIndex = () => {
    setIsReindexing(true);
    setTimeout(() => {
      setIsReindexing(false);
      if (onShowToast) onShowToast('Global Search & Vector RAG Index completely rebuilt successfully!');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono text-[10px] font-bold border border-blue-500/30 uppercase">
                SEARCH & PERFORMANCE DASHBOARD
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <Globe className="w-3 h-3 text-[#28C76F]" />
                <span>SEO HEALTH 98%</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Global Search Index & Content Analytics
            </h3>
            <p className="text-xs text-neutral-400">
              Monitor indexed search documents, keyword rankings, content freshness scores, and trigger search reindexing.
            </p>
          </div>

          <button
            onClick={handleRebuildIndex}
            disabled={isReindexing}
            className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 cursor-pointer shadow-lg shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isReindexing ? 'animate-spin' : ''}`} />
            <span>{isReindexing ? 'Rebuilding Index...' : 'Rebuild Search Index'}</span>
          </button>
        </div>
      </div>

      {/* TOP KPI PERFORMANCE STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-3xl border border-white/10 p-4 bg-[#0D0D12] space-y-1">
          <span className="text-[10px] font-mono text-neutral-400 uppercase block">Total Content Items</span>
          <strong className="text-white text-xl font-bold font-poppins block">24 Items</strong>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+100% Synced</span>
          </span>
        </div>

        <div className="glass-card rounded-3xl border border-white/10 p-4 bg-[#0D0D12] space-y-1">
          <span className="text-[10px] font-mono text-neutral-400 uppercase block">Content Freshness</span>
          <strong className="text-white text-xl font-bold font-poppins block">98.5 Score</strong>
          <span className="text-[10px] text-[#E5C158] font-mono">Updated Daily</span>
        </div>

        <div className="glass-card rounded-3xl border border-white/10 p-4 bg-[#0D0D12] space-y-1">
          <span className="text-[10px] font-mono text-neutral-400 uppercase block">Indexed Search Keywords</span>
          <strong className="text-white text-xl font-bold font-poppins block">142 Keywords</strong>
          <span className="text-[10px] text-emerald-400 font-mono">Top Rank Positions</span>
        </div>

        <div className="glass-card rounded-3xl border border-white/10 p-4 bg-[#0D0D12] space-y-1">
          <span className="text-[10px] font-mono text-neutral-400 uppercase block">AI Vector Embeddings</span>
          <strong className="text-white text-xl font-bold font-poppins block">100% Vectorized</strong>
          <span className="text-[10px] text-purple-400 font-mono">RAG Assistant Ready</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INDEXED CONTENT SUMMARY */}
        <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#E5C158]" />
              <h3 className="font-poppins font-bold text-white text-base">
                Global Search Index Inventory
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold uppercase">
              Index Live
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {indexStats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">{stat.title}</span>
                <strong className="text-white text-base font-bold block">{stat.count}</strong>
                <span className={`text-[10px] font-mono font-bold ${stat.color}`}>{stat.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TOP SEARCH KEYWORDS RANKINGS */}
        <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#E5C158]" />
              <h3 className="font-poppins font-bold text-white text-base">
                Top Targeted Keywords & Rank Positions
              </h3>
            </div>
            <span className="font-mono text-xs text-[#E5C158] font-bold">5 Organic Benchmarks</span>
          </div>

          <div className="space-y-2.5">
            {topKeywords.map((kw, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <strong className="text-white font-bold block">{kw.keyword}</strong>
                  <span className="text-[10px] font-mono text-neutral-400">Vol: {kw.volume}</span>
                </div>

                <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                  {kw.position}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
