import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Brain,
  TrendingUp,
  DollarSign,
  Target,
  Search,
  Lock,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart2,
  PieChart
} from 'lucide-react';
import { Currency } from '../../../types';

interface CMSAiGrowthIntelligenceHubProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSAiGrowthIntelligenceHub: React.FC<CMSAiGrowthIntelligenceHubProps> = ({
  currency,
  onShowToast,
}) => {
  const growthModules = [
    {
      id: 'growth-1',
      title: 'AI Revenue & Order Volume Forecast',
      category: 'Predictive Finance',
      description: 'Machine learning model predicting Q3/Q4 revenue trajectories, order volume spikes, and cashflow needs based on historical conversion trends.',
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'growth-2',
      title: 'AI Lead Influx & Conversion Predictor',
      category: 'Pipeline Intelligence',
      description: 'Predicts expected lead generation for academic exam seasons and corporate pitch deck cycles across PKR and international USD markets.',
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'growth-3',
      title: 'AI SEO Opportunity & Keyword Finder',
      category: 'Search Expansion',
      description: 'Identifies high-value low-competition search terms in Pakistan, UAE, UK, and USA before competitors rank for them.',
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'growth-4',
      title: 'AI Competitor Benchmarking Radar',
      category: 'Market Intelligence',
      description: 'Real-time monitoring of regional and international digital agencies regarding pricing, service offerings, and ad positioning.',
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'growth-5',
      title: 'AI Content Gap & Blog Topic Engine',
      category: 'Content Strategy',
      description: 'Automatically suggests viral blog titles, academic guides, and presentation design frameworks tailored to agency audience demand.',
      status: 'Coming in Stage 2 – Real Implementation',
    },
    {
      id: 'growth-6',
      title: 'Executive AI Growth Summary Engine',
      category: 'C-Suite Briefings',
      description: 'Generates weekly executive briefings with actionable growth recommendations sent directly to management email.',
      status: 'Coming in Stage 2 – Real Implementation',
    },
  ];

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
                  AI Growth Intelligence & Business Forecasting Hub
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/40 text-[10px] font-mono font-bold">
                  Stage 2 Architecture Ready
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-1">
                Predictive revenue forecasting, lead conversion models, competitor monitoring radar, and automated executive AI briefings.
              </p>
            </div>
          </div>

          <span className="px-3 py-1.5 rounded-xl bg-black/60 border border-[#E5C158]/40 text-[#E5C158] font-mono text-xs font-bold shrink-0">
            6 Predictive Models Prepared
          </span>
        </div>
      </div>

      {/* GROWTH MODULES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {growthModules.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl border border-white/10 p-5 bg-black/40 space-y-4 relative overflow-hidden group hover:border-[#E5C158]/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5C158]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 text-[10px] font-mono font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#E5C158]" />
                  <span>Stage 2</span>
                </span>
              </div>

              <div>
                <div className="font-poppins font-bold text-sm text-white group-hover:text-[#E5C158] transition-colors">
                  {item.title}
                </div>
                <div className="text-[10px] font-mono text-neutral-400 mt-0.5">{item.category}</div>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{item.description}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-[#E5C158] font-mono italic">
                {item.status}
              </span>
              <button
                onClick={() => onShowToast?.(`${item.title} model registered for Stage 2 activation.`)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-[#E5C158] hover:text-black text-neutral-300 transition-all cursor-pointer"
                title="Register Interest"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
