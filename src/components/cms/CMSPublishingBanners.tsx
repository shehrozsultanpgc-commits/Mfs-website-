import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Megaphone,
  Zap,
  Sliders,
  Tag,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Save,
  Send,
  UserCheck,
  Bot,
  Languages,
  Wand2,
  FileCheck,
  X,
  Play,
  Lock
} from 'lucide-react';
import { Currency } from '../../types';

export interface BannerPromoItem {
  id: string;
  title: string;
  badgeText: string;
  bannerType: 'top_announcement' | 'hero_slide' | 'seasonal_promo' | 'limited_offer';
  discountText: string;
  ctaText: string;
  ctaLink: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'expired';
  targetAudience: 'all' | 'students' | 'corporate';
}

interface CMSPublishingBannersProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSPublishingBanners: React.FC<CMSPublishingBannersProps> = ({
  currency,
  onShowToast,
}) => {
  // Active Promotional Banners State
  const [banners, setBanners] = useState<BannerPromoItem[]>([
    {
      id: 'banner-1',
      title: '50% Grand Launch Discount - All Academic & Corporate Services',
      badgeText: 'GRAND LAUNCH OFFER',
      bannerType: 'top_announcement',
      discountText: '50% OFF',
      ctaText: 'Claim 50% Discount Now',
      ctaLink: '/order',
      startDate: '2026-07-01 00:00 PKT',
      endDate: '2026-08-31 23:59 PKT',
      status: 'active',
      targetAudience: 'all',
    },
    {
      id: 'banner-2',
      title: 'Express 24-Hour Assignment & Pitch Deck SLA',
      badgeText: 'URGENT SPEED MULTIPLIER',
      bannerType: 'limited_offer',
      discountText: 'EXPRESS DELIVERY',
      ctaText: 'Order Urgent Pitch Deck',
      ctaLink: '/order?speed=express',
      startDate: '2026-07-20 00:00 PKT',
      endDate: '2026-12-31 23:59 PKT',
      status: 'active',
      targetAudience: 'students',
    },
    {
      id: 'banner-3',
      title: 'Fall Semester Student Resume & Cover Letter Bundle',
      badgeText: 'FALL SPECIAL',
      bannerType: 'seasonal_promo',
      discountText: 'SAVE 60%',
      ctaText: 'Get ATS CV Bundle',
      ctaLink: '/services#resume',
      startDate: '2026-09-01 00:00 PKT',
      endDate: '2026-10-15 23:59 PKT',
      status: 'scheduled',
      targetAudience: 'students',
    },
  ]);

  // Modal State for New Banner
  const [isAddBannerModalOpen, setIsAddBannerModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBadge, setNewBadge] = useState('SPECIAL OFFER');
  const [newType, setNewType] = useState<BannerPromoItem['bannerType']>('top_announcement');
  const [newDiscount, setNewDiscount] = useState('50% OFF');
  const [newCta, setNewCta] = useState('Order Now');

  // AI Content Assistant AI Prompt Test State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiSelectedTone, setAiSelectedTone] = useState<'professional' | 'academic' | 'persuasive' | 'urgent'>('professional');
  const [aiOutput, setAiOutput] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Add Banner Handler
  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const banner: BannerPromoItem = {
      id: `banner-${Date.now()}`,
      title: newTitle,
      badgeText: newBadge,
      bannerType: newType,
      discountText: newDiscount,
      ctaText: newCta,
      ctaLink: '/order',
      startDate: '2026-07-27 00:00 PKT',
      endDate: '2026-12-31 23:59 PKT',
      status: 'active',
      targetAudience: 'all',
    };
    setBanners([banner, ...banners]);
    setNewTitle('');
    setIsAddBannerModalOpen(false);
    if (onShowToast) onShowToast(`Created active banner: "${banner.title}"`);
  };

  const handleDeleteBanner = (id: string, title: string) => {
    setBanners(banners.filter((b) => b.id !== id));
    if (onShowToast) onShowToast(`Deleted banner "${title}"`);
  };

  // Simulate AI Generation
  const handleSimulateAiGeneration = () => {
    if (!aiPrompt) return;
    setIsAiGenerating(true);
    setTimeout(() => {
      setIsAiGenerating(false);
      setAiOutput(
        `[MFS AI Output • ${aiSelectedTone.toUpperCase()} TONE]\n\nExecutive Pitch Deck & Presentation Services:\nEmpowering corporate professionals and ambitious students across Pakistan, UK, USA, and UAE. Certified designers craft high-impact slides tailored to academic guidelines (APA, Harvard, MLA) and corporate investment standards.\n\nKey Benefit: Active 50% Grand Launch discount automatically applied to all orders with 24/7 online WhatsApp support.`
      );
      if (onShowToast) onShowToast('MFS AI Content Assistant draft generated successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold border border-amber-500/30 uppercase">
                PROMOTIONS & PUBLISHING
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#28C76F]" />
                <span>50% DISCOUNT ENGINE ACTIVE</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Homepage Banner Manager & AI Content Assistant
            </h3>
            <p className="text-xs text-neutral-400">
              Schedule promotional banners, announcement bars, urgent speed campaign multipliers, and draft text with AI.
            </p>
          </div>

          <button
            onClick={() => setIsAddBannerModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Promo Banner</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* COLUMN 1: PROMOTIONAL BANNERS LIST */}
        <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[#E5C158]" />
              <h3 className="font-poppins font-bold text-white text-base">
                Active Banners & Offers
              </h3>
            </div>
            <span className="font-mono text-xs text-[#E5C158] font-bold">
              {banners.length} Campaigns
            </span>
          </div>

          <div className="space-y-3">
            {banners.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#E5C158]/20 text-[#E5C158] font-mono text-[9px] font-bold uppercase border border-[#E5C158]/30">
                        {b.badgeText}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold uppercase">
                        {b.status}
                      </span>
                    </div>
                    <strong className="text-white text-sm font-bold block">{b.title}</strong>
                  </div>

                  <button
                    onClick={() => handleDeleteBanner(b.id, b.title)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[10px] font-mono text-neutral-400">
                  <span>Discount Tag: <strong className="text-white">{b.discountText}</strong></span>
                  <span>CTA: <strong className="text-[#E5C158]">{b.ctaText}</strong></span>
                  <span>End: <strong className="text-white">{b.endDate}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 2: AI CONTENT ASSISTANT (ENTERPRISE PREPARATION) */}
        <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#E5C158]" />
              <h3 className="font-poppins font-bold text-white text-base">
                MFS AI Content Assistant
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold border border-amber-500/30">
              PRE-INTEGRATION READY
            </span>
          </div>

          <p className="text-xs text-neutral-400">
            Generate high-converting headlines, service descriptions, academic summaries, and social media teasers aligned with agency tone.
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                Content Prompt / Topic Instructions
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Write a compelling summary for Executive Presentation Design with 50% discount..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Brand Voice Tone
                </label>
                <select
                  value={aiSelectedTone}
                  onChange={(e) => setAiSelectedTone(e.target.value as any)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                >
                  <option value="professional" className="bg-black">Professional & Executive</option>
                  <option value="academic" className="bg-black">Academic Rigor (APA/Harvard)</option>
                  <option value="persuasive" className="bg-black">High-Converting Sales</option>
                  <option value="urgent" className="bg-black">Urgent Limited Discount</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Target Language
                </label>
                <select
                  disabled
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-3 py-2 text-xs text-neutral-400 focus:outline-none cursor-not-allowed"
                >
                  <option className="bg-black">English (International)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSimulateAiGeneration}
              disabled={isAiGenerating || !aiPrompt}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#E5C158] via-[#fce888] to-[#E5C158] text-black font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {isAiGenerating ? (
                <span>Generating Content Draft...</span>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate Draft Content</span>
                </>
              )}
            </button>

            {/* AI OUTPUT BOX */}
            {aiOutput && (
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#E5C158]/40 space-y-2 mt-3">
                <span className="text-[10px] font-mono text-[#E5C158] font-bold uppercase block">
                  AI GENERATED DRAFT
                </span>
                <pre className="text-xs text-neutral-200 font-sans whitespace-pre-wrap leading-relaxed">
                  {aiOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CREATE BANNER MODAL */}
      <AnimatePresence>
        {isAddBannerModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <Megaphone className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">New Promo Banner</h3>
                </div>
                <button
                  onClick={() => setIsAddBannerModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddBanner} className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 50% Grand Launch Promo"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Pill Badge
                    </label>
                    <input
                      type="text"
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Discount Label
                    </label>
                    <input
                      type="text"
                      value={newDiscount}
                      onChange={(e) => setNewDiscount(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddBannerModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-neutral-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold shadow-lg"
                  >
                    Publish Banner
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
