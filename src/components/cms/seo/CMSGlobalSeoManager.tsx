import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Share2,
  Sparkles,
  Save,
  CheckCircle2,
  Eye,
  Search,
  Code,
  FileCode,
  Sliders,
  Layers,
  ArrowRight,
  ExternalLink,
  Bot
} from 'lucide-react';
import { Currency } from '../../../types';

export interface PageSeoItem {
  id: string;
  pageName: string;
  urlSlug: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image';
  canonicalUrl: string;
  robotsDirective: 'index, follow' | 'noindex, follow' | 'index, nofollow';
  schemaType: 'ProfessionalService' | 'Organization' | 'EducationalOrganization';
  seoScore: number;
}

interface CMSGlobalSeoManagerProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSGlobalSeoManager: React.FC<CMSGlobalSeoManagerProps> = ({
  currency,
  onShowToast,
}) => {
  const [pages, setPages] = useState<PageSeoItem[]>([
    {
      id: 'p-1',
      pageName: 'Homepage',
      urlSlug: '/',
      seoTitle: 'MFS Growth Agency | Presentation Design, Assignments & ATS Resumes',
      metaDescription: 'Helping Students & Professionals Grow with High-Quality Digital Solutions. Pitch decks, academic writing, ATS CV engineering & report formatting with 50% discount.',
      focusKeyword: 'MFS Growth Agency',
      secondaryKeywords: ['Presentation Design', 'Assignment Writing', 'ATS Resume', 'Pakistan Digital Agency'],
      ogTitle: 'MFS Growth Agency | Premium Digital Services',
      ogDescription: 'Executive presentation design, custom academic assignments, and ATS-engineered resumes.',
      ogImage: 'https://mfsgrowth.online/og-home.png',
      twitterCard: 'summary_large_image',
      canonicalUrl: 'https://mfsgrowth.online/',
      robotsDirective: 'index, follow',
      schemaType: 'ProfessionalService',
      seoScore: 98,
    },
    {
      id: 'p-2',
      pageName: 'Our Work (Samples)',
      urlSlug: '/our-work',
      seoTitle: 'Our Work & Sample Projects | MFS Growth Agency',
      metaDescription: 'Explore secured sample pitch decks, academic assignment excerpts, and ATS CV designs. Watermarked preview only for client confidentiality.',
      focusKeyword: 'Our Work Samples',
      secondaryKeywords: ['Presentation Samples', 'Assignment Samples', 'CV Portfolio'],
      ogTitle: 'Our Work Samples | MFS Growth Agency',
      ogDescription: 'Verified client presentation and assignment work samples.',
      ogImage: 'https://mfsgrowth.online/og-work.png',
      twitterCard: 'summary_large_image',
      canonicalUrl: 'https://mfsgrowth.online/our-work',
      robotsDirective: 'index, follow',
      schemaType: 'Organization',
      seoScore: 95,
    },
    {
      id: 'p-3',
      pageName: 'Services & Rates',
      urlSlug: '/services',
      seoTitle: 'Services & Instant Price Calculator | MFS Growth Agency',
      metaDescription: 'Transparent rate cards in PKR, USD, GBP, EUR, AED with live 50% Grand Launch promo discount calculation.',
      focusKeyword: 'MFS Service Pricing',
      secondaryKeywords: ['Presentation Rates PKR', 'Assignment Cost', 'ATS Resume Price'],
      ogTitle: 'Services & Rates | MFS Growth Agency',
      ogDescription: 'Calculate instant service prices with express delivery options.',
      ogImage: 'https://mfsgrowth.online/og-services.png',
      twitterCard: 'summary_large_image',
      canonicalUrl: 'https://mfsgrowth.online/services',
      robotsDirective: 'index, follow',
      schemaType: 'ProfessionalService',
      seoScore: 94,
    },
  ]);

  const [selectedId, setSelectedId] = useState<string>('p-1');
  const [activeTab, setActiveTab] = useState<'meta' | 'social' | 'advanced' | 'preview'>('meta');

  const currentPage = pages.find((p) => p.id === selectedId) || pages[0];

  const handleUpdatePage = (updated: Partial<PageSeoItem>) => {
    setPages((prev) =>
      prev.map((p) => (p.id === selectedId ? { ...p, ...updated } : p))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onShowToast) {
      onShowToast(`Saved SEO settings & social meta tags for "${currentPage.pageName}"`);
    }
  };

  const handleAiAutoGenerate = () => {
    const aiTitle = `${currentPage.pageName} — MFS Growth Agency | #1 Digital Solutions`;
    const aiDesc = `Get high-quality ${currentPage.pageName.toLowerCase()} solutions tailored for students and corporate executives. Instant delivery options, 24/7 support & 50% off discount.`;
    handleUpdatePage({
      seoTitle: aiTitle,
      metaDescription: aiDesc,
      ogTitle: aiTitle,
      ogDescription: aiDesc,
    });
    if (onShowToast) {
      onShowToast(`AI generated SEO title & meta description for "${currentPage.pageName}"!`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* PAGE SELECTION SIDEBAR */}
      <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-3 bg-[#0D0D12]">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-poppins font-bold text-white text-xs uppercase font-mono tracking-wider">
            Website Pages
          </span>
          <span className="text-[10px] text-neutral-400 font-mono">{pages.length} Pages</span>
        </div>

        <div className="space-y-1.5">
          {pages.map((p) => {
            const isSelected = p.id === selectedId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between gap-2 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#E5C158]/10 border-[#E5C158] text-white shadow-lg'
                    : 'bg-black/30 border-white/5 text-neutral-400 hover:text-white hover:border-white/20'
                }`}
              >
                <div>
                  <div className={`font-bold text-xs ${isSelected ? 'text-[#E5C158]' : 'text-white'}`}>
                    {p.pageName}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-0.5">{p.urlSlug}</div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    p.seoScore >= 95 ? 'bg-[#28C76F]/10 text-[#28C76F]' : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {p.seoScore}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN SEO EDITOR CONTAINER */}
      <div className="lg:col-span-3 glass-card rounded-2xl border border-white/10 p-6 space-y-5 bg-[#0D0D12]">
        {/* HEADER & TABS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-poppins font-black text-lg text-white">
                Global Page SEO Manager: <span className="text-[#E5C158]">{currentPage.pageName}</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 font-mono text-[10px] font-bold">
                {currentPage.urlSlug}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Configure search engine metadata, OpenGraph cards, schema markup, and preview live snippet rendering.
            </p>
          </div>

          <button
            onClick={handleAiAutoGenerate}
            className="px-3.5 py-2 rounded-xl bg-[#E5C158]/10 hover:bg-[#E5C158]/20 text-[#E5C158] font-bold text-xs border border-[#E5C158]/30 flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Generate Metadata</span>
          </button>
        </div>

        {/* SUB-TABS */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('meta')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'meta' ? 'bg-[#E5C158] text-black font-extrabold' : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            Search Metadata
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'social' ? 'bg-[#E5C158] text-black font-extrabold' : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            OpenGraph & Twitter
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'advanced' ? 'bg-[#E5C158] text-black font-extrabold' : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            Robots & Schema
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'preview' ? 'bg-[#E5C158] text-black font-extrabold' : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            Live SERP Preview
          </button>
        </div>

        {/* TAB 1: META */}
        {activeTab === 'meta' && (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">SEO Meta Title</label>
              <input
                type="text"
                value={currentPage.seoTitle}
                onChange={(e) => handleUpdatePage({ seoTitle: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#E5C158] focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>Recommended: 50–60 characters</span>
                <span className={currentPage.seoTitle.length > 60 ? 'text-amber-400 font-bold' : ''}>
                  {currentPage.seoTitle.length} chars
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">Meta Description</label>
              <textarea
                rows={3}
                value={currentPage.metaDescription}
                onChange={(e) => handleUpdatePage({ metaDescription: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#E5C158] focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>Recommended: 150–160 characters</span>
                <span className={currentPage.metaDescription.length > 160 ? 'text-amber-400 font-bold' : ''}>
                  {currentPage.metaDescription.length} chars
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Focus Keyword</label>
                <input
                  type="text"
                  value={currentPage.focusKeyword}
                  onChange={(e) => handleUpdatePage({ focusKeyword: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#E5C158] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">URL Slug</label>
                <input
                  type="text"
                  value={currentPage.urlSlug}
                  onChange={(e) => handleUpdatePage({ urlSlug: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#E5C158] focus:outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.25)]"
            >
              <Save className="w-4 h-4" />
              <span>Save SEO Metadata</span>
            </button>
          </form>
        )}

        {/* TAB 2: SOCIAL */}
        {activeTab === 'social' && (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">OpenGraph Title (Facebook & LinkedIn)</label>
              <input
                type="text"
                value={currentPage.ogTitle}
                onChange={(e) => handleUpdatePage({ ogTitle: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#E5C158] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">OpenGraph Description</label>
              <textarea
                rows={2}
                value={currentPage.ogDescription}
                onChange={(e) => handleUpdatePage({ ogDescription: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#E5C158] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">OpenGraph Image URL</label>
              <input
                type="text"
                value={currentPage.ogImage}
                onChange={(e) => handleUpdatePage({ ogImage: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#E5C158] focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Social Cards</span>
            </button>
          </form>
        )}

        {/* TAB 3: ADVANCED */}
        {activeTab === 'advanced' && (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Canonical URL</label>
                <input
                  type="text"
                  value={currentPage.canonicalUrl}
                  onChange={(e) => handleUpdatePage({ canonicalUrl: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#E5C158] focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Robots Directive</label>
                <select
                  value={currentPage.robotsDirective}
                  onChange={(e) => handleUpdatePage({ robotsDirective: e.target.value as any })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#E5C158] focus:outline-none font-mono"
                >
                  <option value="index, follow" className="bg-black">index, follow (Default Public)</option>
                  <option value="noindex, follow" className="bg-black">noindex, follow (Exclude from Search)</option>
                  <option value="index, nofollow" className="bg-black">index, nofollow</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">JSON-LD Schema Type</label>
              <select
                value={currentPage.schemaType}
                onChange={(e) => handleUpdatePage({ schemaType: e.target.value as any })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#E5C158] focus:outline-none font-mono"
              >
                <option value="ProfessionalService" className="bg-black">ProfessionalService (MFS Agency)</option>
                <option value="Organization" className="bg-black">Organization</option>
                <option value="EducationalOrganization" className="bg-black">EducationalOrganization</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Directives & Schema</span>
            </button>
          </form>
        )}

        {/* TAB 4: LIVE PREVIEW */}
        {activeTab === 'preview' && (
          <div className="space-y-4">
            <div className="text-xs font-mono text-neutral-400">GOOGLE SERP SNIPPET PREVIEW</div>
            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-1 font-sans">
              <div className="text-xs text-[#8AB4F8] font-medium flex items-center gap-1">
                <span>mfsgrowth.online</span>
                <span className="text-neutral-500">›</span>
                <span className="text-neutral-400">{currentPage.urlSlug.replace('/', '')}</span>
              </div>
              <div className="text-sm font-semibold text-[#8AB4F8] hover:underline cursor-pointer">
                {currentPage.seoTitle}
              </div>
              <p className="text-xs text-[#BDC1C6] leading-relaxed">
                {currentPage.metaDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
