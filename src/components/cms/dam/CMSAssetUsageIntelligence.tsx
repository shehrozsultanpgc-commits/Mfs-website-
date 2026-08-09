import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  AlertTriangle,
  Zap,
  HardDrive,
  FileText,
  Sparkles,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Search,
  PieChart,
  ShieldCheck,
  Eye,
  TrendingDown,
  Layers,
  Info
} from 'lucide-react';
import { Currency } from '../../../types';

interface CMSAssetUsageIntelligenceProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSAssetUsageIntelligence: React.FC<CMSAssetUsageIntelligenceProps> = ({
  currency,
  onShowToast,
}) => {
  const [isScanning, setIsScanning] = useState(false);

  const usageMetrics = {
    totalAssets: 142,
    totalStorageUsed: '1.42 GB',
    unusedAssets: 18,
    potentialSavings: '342 MB',
    duplicateAssets: 4,
    largeFiles: 9,
    missingAltText: 12,
    brokenReferences: 0,
  };

  const optimizationInsights = [
    {
      id: 'opt-1',
      title: 'Convert 14 PNG Banners to WebP/AVIF',
      impact: 'High',
      savings: '184 MB Savings',
      description: 'Image compression engine can automatically convert heavy PNGs on Homepage without visual loss.',
      actionText: 'Auto-Convert to WebP',
    },
    {
      id: 'opt-2',
      title: '18 Unused Legacy Assets Detected',
      impact: 'Medium',
      savings: '98 MB Savings',
      description: 'Files uploaded in 2025 not referenced in any active page, blog, or service page.',
      actionText: 'Review & Archive',
    },
    {
      id: 'opt-3',
      title: '12 Images Missing Accessibility Alt Text',
      impact: 'High (WCAG 2.1)',
      savings: 'SEO Ranking Boost',
      description: 'Generate AI alt text descriptions for screen readers and search engine crawlers.',
      actionText: 'Generate AI Alt Text',
    },
    {
      id: 'opt-4',
      title: '4 Potential Duplicate File Hashes Detected',
      impact: 'Low',
      savings: '60 MB Savings',
      description: 'Identical sample pitch deck PDF uploaded across two separate folder locations.',
      actionText: 'Merge Duplicates',
    },
  ];

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      if (onShowToast) onShowToast('AI Asset Usage Intelligence scan completed! All references verified.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-[#121212] via-[#1C1628] to-[#0D0D12] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#E5C158] shrink-0">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-poppins font-black text-xl text-white">
                  Asset Usage Intelligence & Optimization Hub
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 text-[10px] font-mono font-bold">
                  AI Automated Auditing
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Real-time tracking of asset usage, duplicate detection, alt-text coverage, and automated compression savings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="px-4 py-2.5 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(229,193,88,0.25)] cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning Assets...' : 'Run Intelligence Audit'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl border border-white/10 p-4 space-y-1">
          <div className="text-[11px] text-neutral-400 font-mono">Total Platform Assets</div>
          <div className="text-2xl font-black text-white font-poppins">{usageMetrics.totalAssets} Files</div>
          <div className="text-[10px] text-neutral-500">{usageMetrics.totalStorageUsed} Storage Used</div>
        </div>

        <div className="glass-card rounded-xl border border-white/10 p-4 space-y-1">
          <div className="text-[11px] text-neutral-400 font-mono">Potential Compression Savings</div>
          <div className="text-2xl font-black text-[#28C76F] font-poppins flex items-center gap-1">
            <TrendingDown className="w-5 h-5 text-[#28C76F]" />
            <span>{usageMetrics.potentialSavings}</span>
          </div>
          <div className="text-[10px] text-neutral-500">24.1% Storage Reduction</div>
        </div>

        <div className="glass-card rounded-xl border border-white/10 p-4 space-y-1">
          <div className="text-[11px] text-neutral-400 font-mono">Unused & Duplicate Assets</div>
          <div className="text-2xl font-black text-amber-400 font-poppins">
            {usageMetrics.unusedAssets + usageMetrics.duplicateAssets} Assets
          </div>
          <div className="text-[10px] text-neutral-500">{usageMetrics.unusedAssets} Unused • {usageMetrics.duplicateAssets} Duplicates</div>
        </div>

        <div className="glass-card rounded-xl border border-white/10 p-4 space-y-1">
          <div className="text-[11px] text-neutral-400 font-mono">Accessibility & SEO Audit</div>
          <div className="text-2xl font-black text-blue-400 font-poppins">
            {100 - Math.round((usageMetrics.missingAltText / usageMetrics.totalAssets) * 100)}%
          </div>
          <div className="text-[10px] text-neutral-500">{usageMetrics.missingAltText} Missing Alt Tags</div>
        </div>
      </div>

      {/* OPTIMIZATION RECOMMENDATIONS */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#E5C158]" />
            <h3 className="font-poppins font-bold text-sm text-white">
              AI Optimization Recommendations & Action Queue
            </h3>
          </div>
          <span className="text-[11px] text-neutral-400 font-mono">4 Critical Recommendations</span>
        </div>

        <div className="space-y-3">
          {optimizationInsights.map((opt) => (
            <div
              key={opt.id}
              className="glass-card rounded-xl border border-white/10 p-4 bg-black/40 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#E5C158]/30 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{opt.title}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                    {opt.savings}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-mono border border-amber-500/20">
                    {opt.impact} Impact
                  </span>
                </div>
                <p className="text-xs text-neutral-400">{opt.description}</p>
              </div>

              <button
                onClick={() => onShowToast?.(`Executing action: ${opt.actionText}`)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#E5C158] hover:text-black text-white font-extrabold text-xs transition-all shrink-0 border border-white/10 cursor-pointer"
              >
                {opt.actionText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
