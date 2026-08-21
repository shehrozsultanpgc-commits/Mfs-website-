import React from 'react';
import { motion } from 'motion/react';
import { BrandImageGallery } from './brand/BrandImageGallery';
import {
  Image as ImageIcon,
  Sparkles,
  ShieldCheck,
  Download,
  Share2,
  Search,
  ExternalLink,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

interface BrandMediaAssetsPageProps {
  onOpenOrderModal: (serviceId?: string) => void;
  onShowToast: (msg: string) => void;
  onNavigatePage: (page: any, targetSection?: string) => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
}

export const BrandMediaAssetsPage: React.FC<BrandMediaAssetsPageProps> = ({
  onOpenOrderModal,
  onShowToast,
  onNavigatePage,
  onOpenAIChat,
}) => {
  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-20">
      {/* Page Header Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/25 text-[#E5C158] text-[11px] sm:text-xs font-semibold mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MFS GROWTH AGENCY • OFFICIAL MEDIA ASSET HUB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-poppins text-white tracking-tight mb-4 leading-tight">
            Official Brand Visuals &amp; <span className="gold-pure-gradient">Google Image Assets</span>
          </h1>

          <p className="text-neutral-300 text-sm sm:text-lg leading-relaxed mb-6 font-normal">
            Explore verified brand cards, service thumbnails, founder authority graphics, and executive visual materials engineered for MFS Growth Agency. Click any asset to preview, copy link, or order directly via WhatsApp.
          </p>

          {/* Quick Stats Strip */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5 text-neutral-200">
              <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
              <strong className="text-white">Founder:</strong> Muhammad Shehroz Sultan
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-neutral-200">
              <strong className="text-white">Operations:</strong> 100% Online (24/7)
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <strong className="text-white">Desk:</strong> +92 301 5323689 (24/7)
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Interactive Brand Gallery */}
      <BrandImageGallery
        onShowToast={onShowToast}
        onOpenOrderModal={onOpenOrderModal}
        isStandalonePage={true}
      />

      {/* Technical Image SEO & Indexing Architecture Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B0B14] to-[#07070B] border border-[#E5C158]/20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#E5C158]/10 text-[#E5C158] text-xs font-bold mb-3 uppercase">
                <span>GOOGLE IMAGES ENGINE SYNC</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-white mb-3">
                Why Our Brand Images Rank &amp; Lead in Google Search
              </h2>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6">
                Every visual asset on this hub is structured with rich Schema.org <code className="text-[#E5C158] font-mono">ImageObject</code> metadata, XML Image Sitemaps, descriptive ALT tags, and vector crispness. When students, professionals, and corporate leaders search for "MFS Growth Agency", "growth agency", "assignment writing", or "presentation design", these authentic thumbnails guide them straight to our verified services.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h3 className="text-sm font-bold text-white mb-1">100% Vector Crisp</h3>
                  <p className="text-[11px] text-neutral-400">Renders flawlessly across all mobile, desktop, and retina displays without pixelation.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h3 className="text-sm font-bold text-white mb-1">Schema 3.0 Linked</h3>
                  <p className="text-[11px] text-neutral-400">Tied to the Knowledge Graph entity of Founder Muhammad Shehroz Sultan.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h3 className="text-sm font-bold text-white mb-1">1-Click WhatsApp</h3>
                  <p className="text-[11px] text-neutral-400">Direct ordering and live price calculation right from image previews.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => onOpenOrderModal('presentation')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#E5C158] hover:bg-[#d4af37] text-[#050507] font-black text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(229,193,88,0.3)] cursor-pointer"
              >
                <span>Order Custom Presentation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const msg = encodeURIComponent("Hello Muhammad Shehroz Sultan! I am viewing the official MFS Growth Agency Brand Visual Media Hub. I would like to consult on an upcoming project.");
                  window.open(`https://wa.me/923015323689?text=${msg}`, '_blank');
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Founder Direct</span>
              </button>
              <button
                onClick={() => onNavigatePage('home')}
                className="w-full py-3 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
