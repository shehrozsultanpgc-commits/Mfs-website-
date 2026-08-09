import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Smartphone,
  PieChart,
  Activity,
  CheckCircle2,
  Settings,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { Currency } from '../../../types';

interface CMSAnalyticsCommandCenterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSAnalyticsCommandCenter: React.FC<CMSAnalyticsCommandCenterProps> = ({
  currency,
  onShowToast,
}) => {
  const [activeIntegrationModal, setActiveIntegrationModal] = useState<string | null>(null);

  const analyticsMetrics = [
    { title: 'Total Visitors', value: '42,850', change: '+24.5%', isUp: true, icon: Users },
    { title: 'Total Sessions', value: '68,120', change: '+18.2%', isUp: true, icon: Activity },
    { title: 'Returning Visitors', value: '34.2%', change: '+5.4%', isUp: true, icon: TrendingUp },
    { title: 'Bounce Rate', value: '28.4%', change: '-3.1%', isUp: true, icon: PieChart },
    { title: 'Goal Conversion Rate', value: '4.82%', change: '+1.15%', isUp: true, icon: Zap },
  ];

  const trafficSources = [
    { source: 'Organic Search (Google & Bing)', percentage: 48, sessions: '32,697', color: 'bg-emerald-500' },
    { source: 'Direct Traffic', percentage: 24, sessions: '16,348', color: 'bg-blue-500' },
    { source: 'Social Media (Instagram/LinkedIn/FB)', percentage: 16, sessions: '10,899', color: 'bg-[#E5C158]' },
    { source: 'Referrals & Affiliates', percentage: 8, sessions: '5,449', color: 'bg-purple-500' },
    { source: 'Paid Campaigns (Google & Meta Ads)', percentage: 4, sessions: '2,727', color: 'bg-rose-500' },
  ];

  const topPages = [
    { path: '/', name: 'Homepage', views: '28,450', avgTime: '2m 14s', bounce: '24%' },
    { path: '/services', name: 'Services & Pricing Calculator', views: '18,210', avgTime: '3m 42s', bounce: '19%' },
    { path: '/our-work', name: 'Our Work (Sample Showcase)', views: '12,890', avgTime: '2m 58s', bounce: '22%' },
    { path: '/blog', name: 'Blog & Academic Guides', views: '5,320', avgTime: '4m 10s', bounce: '32%' },
    { path: '/contact', name: 'Contact & 24/7 Support', views: '3,250', avgTime: '1m 20s', bounce: '15%' },
  ];

  const countryBreakdown = [
    { country: 'Pakistan (PK)', share: '62%', flag: '🇵🇰' },
    { country: 'United States (US)', share: '16%', flag: '🇺🇸' },
    { country: 'United Kingdom (UK)', share: '11%', flag: '🇬🇧' },
    { country: 'United Arab Emirates (AE)', share: '7%', flag: '🇦🇪' },
    { country: 'Other Countries', share: '4%', flag: '🌐' },
  ];

  const analyticsProviders = [
    {
      id: 'ga4',
      name: 'Google Analytics 4',
      measurementId: 'G-MFSGROWTH2026',
      status: 'connected',
      description: 'Official Google telemetry for user tracking, conversion events, and acquisition funnels.',
    },
    {
      id: 'clarity',
      name: 'Microsoft Clarity',
      measurementId: 'clarity_mfs_agency_99',
      status: 'connected',
      description: 'Heatmaps, session recordings, and frustration analytics (rage clicks & dead clicks).',
    },
    {
      id: 'plausible',
      name: 'Plausible Analytics',
      measurementId: 'mfsgrowth.agency',
      status: 'ready',
      description: 'Lightweight, privacy-first cookie-free analytics suite.',
    },
    {
      id: 'matomo',
      name: 'Matomo Enterprise',
      measurementId: 'matomo_site_12',
      status: 'ready',
      description: 'Self-hosted privacy-compliant analytics infrastructure.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-[#121212] via-[#101A24] to-[#0D0D12] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-poppins font-black text-xl text-white">
                  Analytics Command Center & Web Intelligence
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-mono font-bold">
                  GA4 + Clarity Connected
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Executive traffic breakdown, conversion telemetry, traffic acquisition channels, and multi-tool integration hooks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onShowToast?.('Analytics cache cleared and refreshed live.')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 cursor-pointer"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {analyticsMetrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 bg-black/40 hover:border-[#E5C158]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">{m.title}</span>
                <Icon className="w-4 h-4 text-[#E5C158]" />
              </div>
              <div className="text-2xl font-black text-white font-poppins">{m.value}</div>
              <div className="text-[10px] font-mono text-[#28C76F] font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-[#28C76F]" />
                <span>{m.change} vs last 30d</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* TRAFFIC SOURCES & GEOGRAPHY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TRAFFIC SOURCES */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 p-6 space-y-4 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-poppins font-bold text-sm text-white">Traffic Acquisition Channels</h3>
            <span className="text-[10px] text-neutral-400 font-mono">Last 30 Days</span>
          </div>

          <div className="space-y-3">
            {trafficSources.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{item.source}</span>
                  <span className="text-[#E5C158] font-mono font-bold">
                    {item.sessions} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/60 border border-white/5 overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COUNTRY BREAKDOWN */}
        <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-poppins font-bold text-sm text-white">Geographic Origin</h3>
            <Globe className="w-4 h-4 text-[#E5C158]" />
          </div>

          <div className="space-y-2.5">
            {countryBreakdown.map((c, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{c.flag}</span>
                  <span className="text-white font-medium">{c.country}</span>
                </div>
                <span className="font-mono font-bold text-[#E5C158] bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  {c.share}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOP PAGES TABLE */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4 bg-[#0D0D12]">
        <div className="font-poppins font-bold text-sm text-white border-b border-white/10 pb-3">
          Most Visited Pages Performance
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-mono text-neutral-400 uppercase">
                <th className="pb-3 font-normal">Page Name & Path</th>
                <th className="pb-3 font-normal">Page Views</th>
                <th className="pb-3 font-normal">Avg Duration</th>
                <th className="pb-3 font-normal">Bounce Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {topPages.map((page, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-sans font-bold text-white">
                    {page.name} <span className="text-neutral-500 font-mono text-[10px]">({page.path})</span>
                  </td>
                  <td className="py-3 text-[#E5C158] font-bold">{page.views}</td>
                  <td className="py-3 text-neutral-300">{page.avgTime}</td>
                  <td className="py-3 text-emerald-400">{page.bounce}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INTEGRATION HOOKS GRID */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4 bg-[#0D0D12]">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="font-poppins font-bold text-sm text-white">
            Analytics Infrastructure & API Integration Hooks
          </h3>
          <span className="text-[10px] font-mono text-neutral-400">4 Tools Configured</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analyticsProviders.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2.5 hover:border-[#E5C158]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{p.name}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                    p.status === 'connected'
                      ? 'bg-[#28C76F]/10 text-[#28C76F] border-[#28C76F]/30'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  }`}
                >
                  {p.status.toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">{p.description}</p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-300">
                <span className="text-neutral-500">Tag ID:</span>
                <span className="font-bold text-[#E5C158]">{p.measurementId}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
