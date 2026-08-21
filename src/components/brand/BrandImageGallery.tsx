import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND_VISUAL_ASSETS, BrandAssetItem } from '../../data/brandAssets';
import {
  Image as ImageIcon,
  Sparkles,
  Eye,
  Download,
  Share2,
  Copy,
  Check,
  MessageSquare,
  Phone,
  ExternalLink,
  ShieldCheck,
  Search,
  Layers,
  ArrowRight,
  Maximize2,
  X
} from 'lucide-react';
import { useModalHistory } from '../../hooks/useModalHistory';

interface BrandImageGalleryProps {
  onShowToast: (msg: string) => void;
  onOpenOrderModal?: (serviceId?: string) => void;
  isStandalonePage?: boolean;
}

export const BrandImageGallery: React.FC<BrandImageGalleryProps> = ({
  onShowToast,
  onOpenOrderModal,
  isStandalonePage = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAsset, setActiveAsset] = useState<BrandAssetItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useModalHistory(!!activeAsset, () => setActiveAsset(null), 'brandAssetModal');

  const categories = ['All', 'Services', 'Leadership', 'Pricing', 'Reviews', 'HQ & Payments'];

  const filteredAssets = BRAND_VISUAL_ASSETS.filter((item) => {
    const matchesCat =
      selectedCategory === 'All'
        ? true
        : selectedCategory === 'Services'
        ? item.category === 'Services'
        : selectedCategory === 'Leadership'
        ? item.category === 'Leadership'
        : selectedCategory === 'Pricing'
        ? item.category === 'Pricing'
        : selectedCategory === 'Reviews'
        ? item.category === 'Reviews'
        : item.category === 'HQ & Payments' || item.category === 'Overview';

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q)) ||
      item.googleSearchKeywords.some((k) => k.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  const handleCopyLink = (asset: BrandAssetItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const fullUrl = `${window.location.origin}${asset.imageUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(asset.id);
    onShowToast(`✓ Image link copied to clipboard: ${asset.title}`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleShare = async (asset: BrandAssetItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const fullUrl = `${window.location.origin}${asset.imageUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: asset.title,
          text: `${asset.title} by MFS Growth Agency (Founder: Muhammad Shehroz Sultan)`,
          url: fullUrl,
        });
      } catch {
        handleCopyLink(asset);
      }
    } else {
      handleCopyLink(asset);
    }
  };

  const handleWhatsAppOrder = (asset: BrandAssetItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const msg = encodeURIComponent(
      `Hello Muhammad Shehroz Sultan! I found your official brand image for "${asset.title}" on MFS Growth Agency (https://mfsgrowth.online). I would like to order or discuss this service.`
    );
    window.open(`https://wa.me/923015323689?text=${msg}`, '_blank');
  };

  const handleDownload = (asset: BrandAssetItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const link = document.createElement('a');
    link.href = asset.imageUrl;
    link.download = `${asset.id}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(`📥 Downloaded high-resolution brand asset: ${asset.title}`);
  };

  return (
    <div className={`relative ${isStandalonePage ? 'py-12 sm:py-16' : 'py-16 sm:py-24'} bg-[#050507]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/25 text-[#E5C158] text-[11px] sm:text-xs font-semibold mb-4 tracking-wider uppercase">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>OFFICIAL BRAND VISUAL MEDIA &amp; GOOGLE IMAGES ASSETS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-poppins text-white tracking-tight mb-4">
            Official Brand Cards &amp; <span className="gold-pure-gradient">Visual Knowledge Hub</span>
          </h2>

          <p className="text-neutral-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            High-resolution, vector-crisp visual assets representing MFS Growth Agency, Founder Muhammad Shehroz Sultan, our core academic &amp; executive services, verified contact channels, and promotional offers.
          </p>
        </motion.div>

        {/* Search & Category Filter Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#E5C158] text-[#050507] shadow-[0_0_20px_rgba(229,193,88,0.3)]'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5'
                  }`}
                >
                  {cat === 'All' ? 'All Visual Cards (12)' : cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images by service, keyword..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Brand Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredAssets.map((asset, idx) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setActiveAsset(asset)}
              className="group relative bg-[#09090E] rounded-2xl border border-white/10 hover:border-[#E5C158]/50 overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/9] bg-[#050508] overflow-hidden border-b border-white/5">
                <img
                  src={asset.imageUrl}
                  alt={asset.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Badges overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-[#E5C158] uppercase">
                    {asset.category}
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-medium text-neutral-300">
                    {asset.dimensions}
                  </span>
                </div>

                {/* Quick Action Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 backdrop-blur-xs">
                  <span className="px-4 py-2 rounded-xl bg-[#E5C158] text-[#050507] text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-poppins line-clamp-1 group-hover:text-[#E5C158] transition-colors mb-1.5">
                    {asset.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                    {asset.subtitle}
                  </p>
                </div>

                {/* Bottom Interactive Row */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Google Indexed</span>
                  </span>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => handleCopyLink(asset, e)}
                      title="Copy Image URL"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                    >
                      {copiedId === asset.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={(e) => handleDownload(asset, e)}
                      title="Download SVG Card"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleWhatsAppOrder(asset, e)}
                      title="Direct WhatsApp Order"
                      className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredAssets.length === 0 && (
          <div className="py-16 text-center bg-white/5 rounded-2xl border border-white/10">
            <ImageIcon className="w-12 h-12 text-neutral-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">No Brand Cards Found</h4>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-4">
              We could not find any official assets matching "{searchQuery}". Try searching for "presentation", "assignment", "resume", or "founder".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-[#E5C158] text-[#050507] text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX & ASSET DETAILS MODAL */}
      <AnimatePresence>
        {activeAsset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl bg-[#0B0B12] border border-[#E5C158]/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-[#E5C158]/15 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold uppercase">
                    {activeAsset.category}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    {activeAsset.dimensions} Vector SVG
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLink(activeAsset)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Copy Link</span>
                  </button>
                  <button
                    onClick={() => handleShare(activeAsset)}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 transition-colors cursor-pointer"
                    title="Share Asset"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveAsset(null)}
                    className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Two Column Layout */}
              <div className="overflow-y-auto p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                
                {/* Left: High-Res SVG Card Display */}
                <div className="lg:col-span-7 flex flex-col gap-3">
                  <div className="rounded-2xl border border-white/15 bg-black overflow-hidden shadow-2xl relative group">
                    <img
                      src={activeAsset.imageUrl}
                      alt={activeAsset.altText}
                      className="w-full h-auto object-contain"
                    />
                    
                    {/* Watermark/Verification Pin */}
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] text-neutral-300 font-medium flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#E5C158]" />
                      <span>Official MFS Growth Asset • Muhammad Shehroz Sultan</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-400 text-center italic">
                    Vector graphics natively rendered with zero compression loss. 100% indexable by Google Image Search bots.
                  </p>
                </div>

                {/* Right: Asset Metadata & Conversion Panel */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white font-poppins leading-snug mb-2">
                      {activeAsset.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E5C158] font-semibold mb-3">
                      {activeAsset.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                      {activeAsset.description}
                    </p>
                  </div>

                  {/* Leadership & Verification Info */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Founder &amp; Director:</span>
                      <span className="text-white font-bold">Muhammad Shehroz Sultan</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Operations:</span>
                      <span className="text-[#E5C158] text-[11px] text-right font-medium">Digital-First (HQ in Development)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Support Desk:</span>
                      <span className="text-emerald-400 font-bold">+92 301 5323689 (24/7)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Official Web:</span>
                      <span className="text-[#E5C158] font-mono">https://mfsgrowth.online</span>
                    </div>
                  </div>

                  {/* Target Keywords Tags */}
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                      Google Search &amp; Image Keywords:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeAsset.googleSearchKeywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-neutral-300"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => handleWhatsAppOrder(activeAsset)}
                      className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Order</span>
                    </button>

                    {onOpenOrderModal && (
                      <button
                        onClick={() => {
                          const target = activeAsset.targetServiceId || 'presentation';
                          setActiveAsset(null);
                          onOpenOrderModal(target);
                        }}
                        className="flex-1 px-4 py-3 rounded-xl bg-[#E5C158] hover:bg-[#d4af37] text-[#050507] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                      >
                        <span>Book Service</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => handleDownload(activeAsset)}
                      className="px-3.5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      title="Download Vector Asset"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
