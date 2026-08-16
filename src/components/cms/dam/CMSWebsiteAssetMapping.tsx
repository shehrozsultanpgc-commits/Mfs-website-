import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Globe,
  Layout,
  FileText,
  User,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  Eye,
  CheckCircle2,
  Search
} from 'lucide-react';
import { Currency } from '../../../types';

interface CMSWebsiteAssetMappingProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export interface AssetMapItem {
  assetId: string;
  assetName: string;
  fileType: 'image' | 'video' | 'pdf' | 'svg' | 'lottie';
  thumbnailUrl: string;
  referencedPages: {
    pageName: string;
    section: string;
    url: string;
  }[];
}

export const CMSWebsiteAssetMapping: React.FC<CMSWebsiteAssetMappingProps> = ({
  currency,
  onShowToast,
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>('map-asset-1');

  const assetMappings: AssetMapItem[] = [
    {
      assetId: 'map-asset-1',
      assetName: 'MFS Primary Master Brand Lockup.svg',
      fileType: 'svg',
      thumbnailUrl: '/mfs-logo.svg',
      referencedPages: [
        { pageName: 'Homepage', section: 'Main Sticky Navigation Bar', url: '/' },
        { pageName: 'Homepage', section: 'Footer Brand Copyright Section', url: '/#footer' },
        { pageName: 'Client Portal', section: 'Top Executive Shell Header', url: '/client-portal' },
        { pageName: 'Admin Dashboard', section: 'Enterprise Command Shell', url: '/admin' },
        { pageName: 'PDF Proposals', section: 'Auto-Generated Invoice Header', url: '/invoices' },
      ],
    },
    {
      assetId: 'map-asset-2',
      assetName: 'Executive Pitch Deck Watermarked Sample.pdf',
      fileType: 'pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80',
      referencedPages: [
        { pageName: 'Our Work', section: 'Presentation Design Work Grid', url: '/#our-work' },
        { pageName: 'Services Page', section: 'Presentation Services Showcase', url: '/services/presentation' },
        { pageName: 'Download Center', section: 'Sample Pitch Deck Download', url: '/downloads' },
      ],
    },
    {
      assetId: 'map-asset-3',
      assetName: 'Hero Loop Digital Animation.mp4',
      fileType: 'video',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80',
      referencedPages: [
        { pageName: 'Homepage', section: 'Grand Launch Hero Section', url: '/' },
        { pageName: 'AI Control Center', section: 'Voice AI Assistant Visualizer', url: '/ai-center' },
      ],
    },
    {
      assetId: 'map-asset-4',
      assetName: 'Founder Shehroz Sultan Avatar.jpg',
      fileType: 'image',
      thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
      referencedPages: [
        { pageName: 'Homepage', section: 'Founder Message & Commitment', url: '/#founder' },
        { pageName: 'Client Portal', section: 'Support Account Manager Badge', url: '/client-portal' },
        { pageName: 'Blog Engine', section: 'Author Meta Card', url: '/blog' },
      ],
    },
  ];

  const currentMapping = assetMappings.find(a => a.assetId === selectedAssetId) || assetMappings[0];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-[#121212] via-[#121E1A] to-[#0D0D12] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#28C76F] shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-poppins font-black text-xl text-white">
                  Website Asset Mapping & Dependency Visualizer
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  Bi-Directional Lookup
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Visual relationship graph linking media assets to every webpage, client portal section, and PDF output.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TWO COLUMN MAPPING INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: ASSETS LIST */}
        <div className="lg:col-span-5 glass-card rounded-2xl border border-white/10 p-5 space-y-4">
          <div className="font-bold text-sm text-white border-b border-white/10 pb-3">
            Select Asset to View Usage Graph
          </div>

          <div className="space-y-2">
            {assetMappings.map((asset) => {
              const isSelected = asset.assetId === selectedAssetId;
              return (
                <div
                  key={asset.assetId}
                  onClick={() => setSelectedAssetId(asset.assetId)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#E5C158]/10 border-[#E5C158] text-white shadow-[0_0_15px_rgba(229,193,88,0.15)]'
                      : 'glass-card text-neutral-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={asset.thumbnailUrl}
                      alt={asset.assetName}
                      className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0 bg-black"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-xs truncate text-white">{asset.assetName}</div>
                      <div className="text-[10px] text-neutral-400 font-mono uppercase">{asset.fileType}</div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-[#E5C158] font-mono text-[10px] font-bold shrink-0">
                    {asset.referencedPages.length} Pages
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: DEPENDENCY MAP DISPLAY */}
        <div className="lg:col-span-7 glass-card rounded-2xl border border-white/10 p-6 space-y-5 bg-black/40">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <div className="text-[10px] text-neutral-400 font-mono uppercase">Selected Asset Usage Graph</div>
              <h3 className="font-poppins font-bold text-base text-white">{currentMapping.assetName}</h3>
            </div>
            <span className="px-3 py-1 rounded-xl bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 font-mono text-xs font-bold">
              {currentMapping.referencedPages.length} Active References
            </span>
          </div>

          <div className="space-y-3">
            {currentMapping.referencedPages.map((ref, idx) => (
              <div
                key={idx}
                className="glass-card rounded-xl border border-white/10 p-4 bg-black/60 flex items-center justify-between gap-4 hover:border-[#E5C158]/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#28C76F] shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">{ref.pageName}</div>
                    <div className="text-[11px] text-neutral-400">{ref.section}</div>
                  </div>
                </div>

                <a
                  href={ref.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer border border-white/10"
                >
                  <ExternalLink className="w-3 h-3 text-[#E5C158]" />
                  <span>Inspect Section</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
