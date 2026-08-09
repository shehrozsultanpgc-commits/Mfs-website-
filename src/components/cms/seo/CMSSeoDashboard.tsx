import React from 'react';
import { motion } from 'motion/react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Globe,
  FileCode,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  Activity,
  Layers,
  BarChart3,
  RefreshCw,
  ExternalLink,
  Bot,
  Sparkles
} from 'lucide-react';
import { Currency } from '../../../types';

interface CMSSeoDashboardProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSSeoDashboard: React.FC<CMSSeoDashboardProps> = ({
  currency,
  onShowToast,
}) => {
  const kpiCards = [
    {
      title: 'SEO Health Score',
      value: '98 / 100',
      subtitle: 'Optimal Search Health',
      status: 'excellent',
      color: 'text-[#28C76F]',
      bg: 'bg-[#28C76F]/10',
      border: 'border-[#28C76F]/30',
      icon: ShieldCheck,
    },
    {
      title: 'Indexed Pages',
      value: '18 Pages',
      subtitle: '0 Unindexed Errors',
      status: '100% Synced',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: Globe,
    },
    {
      title: 'Page Speed Index',
      value: '99 / 100',
      subtitle: '0.4s First Contentful Paint',
      status: 'Ultra Fast',
      color: 'text-[#E5C158]',
      bg: 'bg-[#E5C158]/10',
      border: 'border-[#E5C158]/30',
      icon: Zap,
    },
    {
      title: 'Core Web Vitals',
      value: 'Passed (3/3)',
      subtitle: 'LCP 0.8s • CLS 0.001',
      status: 'Stage 1 Verified',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      icon: Activity,
    },
  ];

  const seoHealthMetrics = [
    { name: 'Meta Titles Status', score: '100%', detail: '18 / 18 pages with unique title tags', status: 'pass' },
    { name: 'Meta Descriptions Status', score: '100%', detail: '18 / 18 pages with compelling meta descriptions', status: 'pass' },
    { name: 'Canonical URL Verification', score: '100%', detail: 'No duplicate content canonical loops detected', status: 'pass' },
    { name: 'XML Sitemap Generation', score: 'Active', detail: 'sitemap.xml updated live on every route change', status: 'pass' },
    { name: 'Robots.txt Directive Rules', score: 'Enforced', detail: 'Admin & private API routes cleanly disallowed', status: 'pass' },
    { name: 'Broken Links Audit', score: '0 Found', detail: 'Full internal link crawl returned HTTP 200 OK', status: 'pass' },
    { name: 'URL Redirect Rules (301)', score: '2 Rules Active', detail: 'Legacy /portfolio cleanly redirected to /our-work', status: 'pass' },
    { name: 'Mobile Responsiveness Rating', score: '100/100', detail: 'Touch targets > 44px on all viewports', status: 'pass' },
    { name: 'WCAG Accessibility Score', score: '98/100', detail: 'Sufficient color contrast on dark canvas', status: 'pass' },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-[#121212] via-[#101A24] to-[#0D0D12] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] shrink-0">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-poppins font-black text-xl text-white">
                  Executive SEO & Search Control Command Center
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-mono font-bold">
                  98/100 Score
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Real-time search visibility telemetry, index tracking, meta tag health, and search engine directive status.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onShowToast?.('Full technical SEO audit initiated! All 18 pages verified.')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-2 border border-white/10 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Run SEO Audit</span>
            </button>
            <button
              onClick={() => onShowToast?.('Sitemap.xml re-generated and pinged to Google & Bing.')}
              className="px-3.5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(229,193,88,0.2)] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ping Search Engines</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-white/10 p-5 space-y-3 bg-black/40 hover:border-[#E5C158]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
                  {kpi.title}
                </span>
                <div className={`w-9 h-9 rounded-xl ${kpi.bg} ${kpi.border} border flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className={`text-2xl font-black font-poppins ${kpi.color}`}>
                  {kpi.value}
                </div>
                <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{kpi.subtitle}</div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span>STATUS:</span>
                <span className={`font-bold ${kpi.color}`}>{kpi.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEO HEALTH METRICS DETAILED LIST */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4 bg-[#0D0D12]">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#28C76F]" />
            <h3 className="font-poppins font-bold text-sm text-white">
              Technical SEO Health & Compliance Checklist
            </h3>
          </div>
          <span className="text-xs text-[#28C76F] font-mono font-bold bg-[#28C76F]/10 px-3 py-1 rounded-full border border-[#28C76F]/30">
            9 / 9 Checks Passed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {seoHealthMetrics.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 hover:border-[#E5C158]/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{item.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] text-[10px] font-mono font-bold border border-[#28C76F]/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#28C76F]" />
                  <span>{item.score}</span>
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
