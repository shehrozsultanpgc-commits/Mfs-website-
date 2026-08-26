import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Download,
  Copy,
  Upload,
  RefreshCw,
  Eye,
  CheckCircle2,
  FileText,
  Palette,
  Type,
  Mail,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  History,
  Globe,
  Plus
} from 'lucide-react';
import { Currency } from '../../../types';

interface CMSBrandAssetCenterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export interface BrandAsset {
  id: string;
  title: string;
  type: 'logo' | 'color' | 'typography' | 'guideline' | 'template' | 'signature' | 'favicon';
  variant?: string;
  format: string;
  dimensionsOrValue: string;
  url: string;
  version: string;
  lastUpdated: string;
}

export const CMSBrandAssetCenter: React.FC<CMSBrandAssetCenterProps> = ({
  currency,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'logos' | 'colors' | 'typography' | 'guidelines' | 'templates' | 'signature'
  >('all');

  const [brandAssets, setBrandAssets] = useState<BrandAsset[]>([
    {
      id: 'brand-1',
      title: 'MFS Primary Master Logo Lockup',
      type: 'logo',
      variant: 'MFS Hexa-Matrix + MFS Growth',
      format: 'SVG / PNG (300 DPI)',
      dimensionsOrValue: 'Scalable Vector',
      url: '/mfs-logo.svg',
      version: 'v3.0 Master',
      lastUpdated: '2026-08-16',
    },
    {
      id: 'brand-2',
      title: 'MFS Brand Mark Emblem',
      type: 'logo',
      variant: 'Standalone Hexa-Matrix Emblem',
      format: 'SVG / PNG (1:1)',
      dimensionsOrValue: '1024x1024 px',
      url: '/mfs-brand-mark.svg',
      version: 'v3.0 Master',
      lastUpdated: '2026-08-16',
    },
    {
      id: 'brand-3',
      title: 'MFS Favicon & App Icon Set',
      type: 'favicon',
      variant: 'App & Web Launcher',
      format: 'SVG Vector Master',
      dimensionsOrValue: 'Vector / Scalable',
      url: '/mfs-brand-mark.svg',
      version: 'v2.0',
      lastUpdated: '2026-07-25',
    },
    {
      id: 'brand-4',
      title: 'Brand Guidelines Master PDF',
      type: 'guideline',
      variant: 'Corporate Standard v2026',
      format: 'PDF (Interactive)',
      dimensionsOrValue: '18 Pages / 8.4 MB',
      url: '/docs/MFS-Brand-Guidelines-2026.pdf',
      version: 'v2026.1',
      lastUpdated: '2026-07-24',
    },
    {
      id: 'brand-5',
      title: 'Executive HTML Email Signature',
      type: 'signature',
      variant: 'CEO & Support Team',
      format: 'HTML / CSS Inline',
      dimensionsOrValue: 'Standard Responsive',
      url: '#email-signature-preview',
      version: 'v1.8',
      lastUpdated: '2026-07-22',
    },
    {
      id: 'brand-6',
      title: 'Social Media Presentation Template',
      type: 'template',
      variant: '16:9 Pitch Deck Keynote',
      format: 'PPTX / Figma / Canva',
      dimensionsOrValue: '10 Slides Preset',
      url: '/templates/mfs-deck-template.pptx',
      version: 'v3.0',
      lastUpdated: '2026-07-21',
    },
  ]);

  const brandColors = [
    { name: 'Primary Gold Accent', hex: '#E5C158', rgb: 'RGB(229, 193, 88)', usage: 'CTAs, Highlights, Active States' },
    { name: 'Secondary Gold Metallic', hex: '#D4AF37', rgb: 'RGB(212, 175, 55)', usage: 'Borders, Metallic Accents' },
    { name: 'Deep Base Dark Canvas', hex: '#050507', rgb: 'RGB(5, 5, 7)', usage: 'Main Application Background' },
    { name: 'Charcoal Card Glass', hex: '#121212', rgb: 'RGB(18, 18, 18)', usage: 'Cards, Containers, Modals' },
    { name: 'Pure Primary White', hex: '#FFFFFF', rgb: 'RGB(255, 255, 255)', usage: 'Primary Headings & High Contrast' },
    { name: 'Muted Secondary Gray', hex: '#CFCFCF', rgb: 'RGB(207, 207, 207)', usage: 'Body Copy & Subtitles' },
    { name: 'Success Emerald Green', hex: '#28C76F', rgb: 'RGB(40, 199, 111)', usage: 'Verified Badges, Active Orders' },
    { name: 'Warning Flame Orange', hex: '#FF9F43', rgb: 'RGB(255, 159, 67)', usage: 'Expedited Flags & Alerts' },
  ];

  const typographySpecs = [
    { name: 'Poppins', category: 'Display & Headings', weights: 'Bold (700), SemiBold (600), Black (900)', sample: 'Empowering Students & Executives' },
    { name: 'Inter', category: 'Body & Data Tables', weights: 'Regular (400), Medium (500)', sample: 'High-quality digital solutions tailored for your growth.' },
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    if (onShowToast) onShowToast(`Copied ${label}: ${text}`);
  };

  return (
    <div className="space-y-6">
      {/* BRAND ASSET CENTER HEADER */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-[#121212] via-[#161622] to-[#0D0D12] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-poppins font-black text-xl text-white">
                  Brand Asset & Identity Resource Center
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 text-[10px] font-mono font-bold">
                  Single Source of Truth
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Centralized brand governance for logos, favicons, typography, official palette tokens, and marketing templates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onShowToast?.('Brand Asset Sync initiated across all platforms.')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-2 border border-white/10 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Global Asset Sync</span>
            </button>
            <button
              onClick={() => onShowToast?.('Opening Upload Brand Asset modal...')}
              className="px-3.5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(229,193,88,0.2)] cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Brand Asset</span>
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Brand Assets', icon: Layers },
          { id: 'logos', label: 'Logos & Icons', icon: Award },
          { id: 'colors', label: 'Color Tokens', icon: Palette },
          { id: 'typography', label: 'Typography', icon: Type },
          { id: 'guidelines', label: 'Brand Guidelines', icon: FileText },
          { id: 'templates', label: 'Marketing Templates', icon: Sparkles },
          { id: 'signature', label: 'Email Signatures', icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                isActive
                  ? 'bg-[#E5C158] text-black border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.25)] font-extrabold'
                  : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#E5C158]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* BRAND COLORS PALETTE SECTION */}
      {(selectedCategory === 'all' || selectedCategory === 'colors') && (
        <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <Palette className="w-5 h-5 text-[#E5C158]" />
              <h3 className="font-poppins font-bold text-sm text-white">
                Official Brand Color System & CSS Design Tokens
              </h3>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">8 Tokens Defined</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {brandColors.map((color, i) => (
              <div
                key={i}
                className="glass-card rounded-xl border border-white/10 p-3 bg-black/40 space-y-3 hover:border-[#E5C158]/40 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-lg border border-white/20 shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  />
                  <button
                    onClick={() => handleCopy(color.hex, color.name)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
                    title="Copy HEX Code"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#E5C158]" />
                  </button>
                </div>

                <div>
                  <div className="font-bold text-xs text-white group-hover:text-[#E5C158] transition-colors">
                    {color.name}
                  </div>
                  <div className="flex items-center justify-between mt-1 font-mono text-[11px] text-neutral-400">
                    <span>{color.hex}</span>
                    <span className="text-[9px] text-neutral-500">{color.rgb}</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-1 italic">{color.usage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TYPOGRAPHY SYSTEM SECTION */}
      {(selectedCategory === 'all' || selectedCategory === 'typography') && (
        <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <Type className="w-5 h-5 text-blue-400" />
              <h3 className="font-poppins font-bold text-sm text-white">
                Brand Typography Hierarchy
              </h3>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">Google Fonts Linked</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {typographySpecs.map((spec, i) => (
              <div key={i} className="glass-card rounded-xl border border-white/10 p-4 bg-black/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-poppins font-black text-lg text-[#E5C158]">{spec.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20">
                    {spec.category}
                  </span>
                </div>
                <div className="text-xs text-neutral-400">Weights: {spec.weights}</div>
                <div className="p-3 rounded-lg bg-black/60 border border-white/5 text-sm text-neutral-200 mt-2 italic">
                  "{spec.sample}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BRAND ASSET LIST */}
      {(selectedCategory === 'all' ||
        selectedCategory === 'logos' ||
        selectedCategory === 'guidelines' ||
        selectedCategory === 'templates' ||
        selectedCategory === 'signature' ||
        selectedCategory === 'favicon') && (
        <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-[#E5C158]" />
              <h3 className="font-poppins font-bold text-sm text-white">
                Brand Logos, Documents & Templates
              </h3>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">
              {brandAssets.length} Brand Assets Registered
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandAssets.map((asset) => (
              <div
                key={asset.id}
                className="glass-card rounded-xl border border-white/10 p-4 bg-black/40 space-y-3 hover:border-[#E5C158]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-sm text-white">{asset.title}</div>
                    <span className="px-2 py-0.5 rounded bg-[#E5C158]/10 text-[#E5C158] text-[10px] font-mono border border-[#E5C158]/20 shrink-0">
                      {asset.version}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400">{asset.variant}</p>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 pt-1">
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{asset.format}</span>
                    <span>{asset.dimensionsOrValue}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-neutral-400">Updated {asset.lastUpdated}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onShowToast?.(`Downloading ${asset.title}...`)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-[#E5C158]" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => handleCopy(asset.url, asset.title)}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
                      title="Copy URL"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
