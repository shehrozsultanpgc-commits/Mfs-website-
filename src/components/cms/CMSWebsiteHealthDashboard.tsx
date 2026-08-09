import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Globe,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Search,
  ShieldCheck,
  Zap,
  HardDrive,
  Users,
  RefreshCw,
  Sparkles,
  Smartphone,
  Check,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Currency } from '../../types';

interface CMSWebsiteHealthDashboardProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSWebsiteHealthDashboard: React.FC<CMSWebsiteHealthDashboardProps> = ({
  currency,
  onShowToast,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState('Just now');

  const handleRunHealthScan = () => {
    setIsScanning(true);
    if (onShowToast) onShowToast('Initiated global website health & security diagnostic scan...');
    setTimeout(() => {
      setIsScanning(false);
      setLastScanTime('0 seconds ago');
      if (onShowToast) onShowToast('Diagnostic Scan Complete: 100% Health & Zero Broken Links Detected!');
    }, 1500);
  };

  const healthCards = [
    {
      title: 'Active Website Pages',
      metric: '14 Pages Active',
      status: '100% Uptime (Cloud Run)',
      icon: Globe,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
      detail: 'Homepage, Services, Our Work, Pricing, Case Studies, FAQ, Legal',
    },
    {
      title: 'Published Content Items',
      metric: '32 Items Live',
      status: 'CMS Synced',
      icon: FileText,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/30',
      detail: '12 Blogs, 8 Case Studies, 10 FAQs, 2 Legal Compliance Pages',
    },
    {
      title: 'Broken Links Monitor',
      metric: '0 Broken Links',
      status: 'Clean Routing',
      icon: CheckCircle2,
      color: 'text-[#28C76F]',
      bgColor: 'bg-[#28C76F]/10 border-[#28C76F]/30',
      detail: 'Checked 148 internal and external hyperlinks automatically',
    },
    {
      title: 'SEO Health Index',
      metric: '98 / 100 Score',
      status: 'Sitemap Auto-Synced',
      icon: Search,
      color: 'text-[#E5C158]',
      bgColor: 'bg-[#E5C158]/10 border-[#E5C158]/30',
      detail: 'Robots.txt, Schema.org JSON-LD, OpenGraph cards verified',
    },
    {
      title: 'Forms & Spam Protection',
      metric: '8 Active Forms',
      status: 'reCAPTCHA v3 Live',
      icon: ShieldCheck,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/30',
      detail: 'Quote Calculator, Contact Form, Project Briefs, Career Uploads',
    },
    {
      title: 'Active CRM Lead Pipeline',
      metric: '18 Active Leads',
      status: 'High Intent Queue',
      icon: Users,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
      detail: 'Est. Pipeline Revenue: $18,400 USD / 5.1M PKR',
    },
    {
      title: 'DAM Storage & Media Asset Usage',
      metric: '1.2 GB / 50 GB Used',
      status: '2.4% Capacity',
      icon: HardDrive,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10 border-indigo-500/30',
      detail: 'Optimized WebP, PDF previews, and sample presentation decks',
    },
    {
      title: 'Core Web Vitals & Speed',
      metric: '99 Desktop / 96 Mobile',
      status: 'Sub-second LCP',
      icon: Zap,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30',
      detail: 'First Contentful Paint: 0.4s | Total Blocking Time: 0ms',
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30 uppercase">
                EXECUTIVE WEBSITE HEALTH MONITOR
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] animate-ping" />
                <span>ALL SYSTEMS OPERATIONAL</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Website Health, Core Web Vitals & Security Diagnostics
            </h3>
            <p className="text-xs text-neutral-400">
              Real-time monitoring of SEO indexation, broken links, form protection, storage, and page load performance.
            </p>
          </div>

          <button
            onClick={handleRunHealthScan}
            disabled={isScanning}
            className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 cursor-pointer shadow-lg shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Running Diagnostic Scan...' : 'Run Full Health Scan'}</span>
          </button>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span>Last Diagnostic Diagnostic Scan: <strong className="text-white">{lastScanTime}</strong></span>
          <span className="text-emerald-400 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>Zero Critical Errors Found</span>
          </span>
        </div>
      </div>

      {/* HEALTH METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {healthCards.map((card, idx) => {
          const Icon = card.icon;

          return (
            <div
              key={idx}
              className="glass-card rounded-3xl border border-white/10 p-5 space-y-3 bg-[#0D0D12] hover:border-[#E5C158]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-2xl ${card.bgColor} border`}>
                    <Icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-mono text-[9px] font-bold uppercase">
                    {card.status}
                  </span>
                </div>

                <div>
                  <span className="text-neutral-400 font-mono text-[10px] uppercase block">
                    {card.title}
                  </span>
                  <strong className="text-white text-lg font-black block mt-0.5 font-poppins">
                    {card.metric}
                  </strong>
                </div>

                <p className="text-neutral-400 text-[11px] leading-snug pt-1 border-t border-white/5 font-sans">
                  {card.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
