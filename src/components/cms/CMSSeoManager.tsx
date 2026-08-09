import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Globe,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Link2,
  ArrowRight,
  Shield,
  BarChart3,
  Edit3,
  Save,
  Plus,
  Trash2,
  ExternalLink,
  Bot,
  Layers,
  FileCode,
  Check,
  RefreshCw,
  X,
  TrendingUp,
  Brain,
  Megaphone,
  Gauge,
  Activity,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Currency } from '../../types';
import { CMSSeoDashboard } from './seo/CMSSeoDashboard';
import { CMSGlobalSeoManager } from './seo/CMSGlobalSeoManager';
import { CMSAiSeoOptimizationCenter } from './seo/CMSAiSeoOptimizationCenter';
import { CMSAnalyticsCommandCenter } from './seo/CMSAnalyticsCommandCenter';
import { CMSMarketingCampaignTracker } from './seo/CMSMarketingCampaignTracker';
import { CMSWebsitePerformanceIntelligence } from './seo/CMSWebsitePerformanceIntelligence';
import { CMSSearchConsoleCenter } from './seo/CMSSearchConsoleCenter';
import { CMSAiGrowthIntelligenceHub } from './seo/CMSAiGrowthIntelligenceHub';

export interface PageSeoConfig {
  id: string;
  pageTitle: string;
  pageSlug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image';
  robots: string;
  schemaType: 'Organization' | 'ProfessionalService' | 'EducationalOrganization';
  seoScore: number; // 0-100
  sitemapIndexed: boolean;
  searchIndexStatus: 'indexed' | 'pending' | 'noindex';
}

export interface UrlRedirectRule {
  id: string;
  sourcePath: string;
  targetUrl: string;
  redirectType: '301' | '302';
  hitCount: number;
  lastTriggered: string;
  status: 'active' | 'disabled';
}

interface CMSSeoManagerProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSSeoManager: React.FC<CMSSeoManagerProps> = ({
  currency,
  onShowToast,
}) => {
  // Page SEO Configurations State
  const [pageConfigs, setPageConfigs] = useState<PageSeoConfig[]>([
    {
      id: 'seo-1',
      pageTitle: 'Homepage',
      pageSlug: '/',
      metaTitle: 'MFS Growth Agency | Presentations, Assignments & Resume Services',
      metaDescription: 'Helping Students & Professionals Grow with High-Quality Digital Solutions. Presentation design, assignment writing, ATS resumes, and reports with 50% Grand Launch Discount.',
      keywords: ['MFS Growth Agency', 'Presentation Design', 'Assignment Writing', 'ATS Resume', 'Pakistan Academic Agency'],
      canonicalUrl: 'https://mfsgrowth.agency/',
      ogTitle: 'MFS Growth Agency - High-Quality Student & Professional Solutions',
      ogDescription: 'Executive presentation design, custom academic assignments, ATS-engineered CVs, and corporate reports. 24/7 online support.',
      ogImage: 'https://mfsgrowth.agency/og-homepage-gold.png',
      twitterCard: 'summary_large_image',
      robots: 'index, follow, max-image-preview:large',
      schemaType: 'ProfessionalService',
      seoScore: 98,
      sitemapIndexed: true,
      searchIndexStatus: 'indexed',
    },
    {
      id: 'seo-2',
      pageTitle: 'Our Work (Samples)',
      pageSlug: '/our-work',
      metaTitle: 'Our Work & Sample Projects | MFS Growth Agency',
      metaDescription: 'Browse secured sample pitch decks, academic papers, and ATS resume templates. Download disabled for client privacy protection.',
      keywords: ['MFS Our Work', 'Presentation Samples', 'Assignment Samples', 'CV Portfolio'],
      canonicalUrl: 'https://mfsgrowth.agency/our-work',
      ogTitle: 'Our Work | MFS Growth Agency',
      ogDescription: 'Explore verified client presentation and assignment samples.',
      ogImage: 'https://mfsgrowth.agency/og-our-work.png',
      twitterCard: 'summary_large_image',
      robots: 'index, follow',
      schemaType: 'Organization',
      seoScore: 94,
      sitemapIndexed: true,
      searchIndexStatus: 'indexed',
    },
    {
      id: 'seo-3',
      pageTitle: 'Services & Pricing',
      pageSlug: '/services',
      metaTitle: 'Services & Instant Pricing Calculator | MFS Growth Agency',
      metaDescription: 'Transparent rates in PKR, USD, GBP, EUR, AED with instant 50% Grand Launch discount calculator.',
      keywords: ['MFS Pricing', 'Presentation Rates', 'Assignment Fee PKR', 'ATS CV Price'],
      canonicalUrl: 'https://mfsgrowth.agency/services',
      ogTitle: 'Services & Pricing | MFS Growth Agency',
      ogDescription: 'Calculate instant service prices with express speed multipliers.',
      ogImage: 'https://mfsgrowth.agency/og-pricing.png',
      twitterCard: 'summary_large_image',
      robots: 'index, follow',
      schemaType: 'ProfessionalService',
      seoScore: 92,
      sitemapIndexed: true,
      searchIndexStatus: 'indexed',
    },
  ]);

  // Selected SEO Page for Editor
  const [selectedSeo, setSelectedSeo] = useState<PageSeoConfig>(pageConfigs[0]);

  // URL Redirect Rules State
  const [redirects, setRedirects] = useState<UrlRedirectRule[]>([
    {
      id: 'red-1',
      sourcePath: '/portfolio',
      targetUrl: '/our-work',
      redirectType: '301',
      hitCount: 342,
      lastTriggered: '2026-07-26 15:40 PKT',
      status: 'active',
    },
    {
      id: 'red-2',
      sourcePath: '/pricing-old',
      targetUrl: '/services',
      redirectType: '301',
      hitCount: 120,
      lastTriggered: '2026-07-25 11:10 PKT',
      status: 'active',
    },
  ]);

  const [isAddRedirectOpen, setIsAddRedirectOpen] = useState(false);
  const [newSource, setNewSource] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newType, setNewType] = useState<'301' | '302'>('301');

  // Active Sub-View State
  const [activeSubView, setActiveSubView] = useState<
    | 'dashboard'
    | 'metadata'
    | 'ai_seo'
    | 'analytics'
    | 'campaigns'
    | 'performance'
    | 'search_console'
    | 'ai_growth'
    | 'redirects'
  >('dashboard');

  // Handlers
  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    setPageConfigs((prev) =>
      prev.map((item) => (item.id === selectedSeo.id ? selectedSeo : item))
    );
    if (onShowToast) onShowToast(`Saved SEO metadata & OpenGraph rules for "${selectedSeo.pageTitle}"!`);
  };

  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSource || !newTarget) return;
    const rule: UrlRedirectRule = {
      id: `red-${Date.now()}`,
      sourcePath: newSource.startsWith('/') ? newSource : `/${newSource}`,
      targetUrl: newTarget,
      redirectType: newType,
      hitCount: 0,
      lastTriggered: 'Never',
      status: 'active',
    };
    setRedirects((prev) => [rule, ...prev]);
    setNewSource('');
    setNewTarget('');
    setIsAddRedirectOpen(false);
    if (onShowToast) onShowToast(`Created ${newType} redirect rule: ${rule.sourcePath} ➔ ${rule.targetUrl}`);
  };

  const handleDeleteRedirect = (id: string) => {
    setRedirects((prev) => prev.filter((r) => r.id !== id));
    if (onShowToast) onShowToast('Deleted URL redirect rule');
  };

  return (
    <div className="space-y-6">
      {/* HEADER & SUB-NAVIGATION BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30 uppercase">
                SEO & GROWTH COMMAND CENTER
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#28C76F]" />
                <span>PHASE 16 PART 6 COMPLETE</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Enterprise SEO, Analytics & Growth Intelligence
            </h3>
            <p className="text-xs text-neutral-400">
              Manage search engine rankings, metadata, AI copy optimizations, traffic analytics, marketing ad campaigns, Core Web Vitals, and AI growth forecasts.
            </p>
          </div>
        </div>

        {/* ALL 9 SUB-NAVIGATION BUTTONS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveSubView('dashboard')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeSubView === 'dashboard'
                ? 'bg-[#E5C158] text-black font-extrabold shadow-lg'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SEO Dashboard</span>
          </button>

          <button
            onClick={() => setActiveSubView('metadata')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeSubView === 'metadata'
                ? 'bg-[#E5C158] text-black font-extrabold shadow-lg'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Global Page SEO</span>
          </button>

          <button
            onClick={() => setActiveSubView('ai_seo')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeSubView === 'ai_seo'
                ? 'bg-[#E5C158] text-black font-extrabold shadow-lg'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI SEO Center</span>
          </button>

          <button
            onClick={() => setActiveSubView('analytics')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeSubView === 'analytics'
                ? 'bg-[#E5C158] text-black font-extrabold shadow-lg'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics Command</span>
          </button>

          <button
            onClick={() => setActiveSubView('campaigns')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeSubView === 'campaigns'
                ? 'bg-[#E5C158] text-black font-extrabold shadow-lg'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Marketing Campaigns</span>
          </button>

          <button
            onClick={() => setActiveSubView('performance')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeSubView === 'performance'
                ? 'bg-[#E5C158] text-black font-extrabold shadow-lg'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Performance Vitals</span>
          </button>

          <button
            onClick={() => setActiveSubView('search_console')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeSubView === 'search_console'
                ? 'bg-[#E5C158] text-black font-extrabold shadow-lg'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Console</span>
          </button>

          <button
            onClick={() => setActiveSubView('ai_growth')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeSubView === 'ai_growth'
                ? 'bg-[#E5C158] text-black font-extrabold shadow-lg'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>AI Growth Hub</span>
          </button>

          <button
            onClick={() => setActiveSubView('redirects')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeSubView === 'redirects'
                ? 'bg-[#E5C158] text-black font-extrabold shadow-lg'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Redirects ({redirects.length})</span>
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE SUB-VIEW */}
      {activeSubView === 'dashboard' && (
        <CMSSeoDashboard currency={currency} onShowToast={onShowToast} />
      )}

      {activeSubView === 'metadata' && (
        <CMSGlobalSeoManager currency={currency} onShowToast={onShowToast} />
      )}

      {activeSubView === 'ai_seo' && (
        <CMSAiSeoOptimizationCenter currency={currency} onShowToast={onShowToast} />
      )}

      {activeSubView === 'analytics' && (
        <CMSAnalyticsCommandCenter currency={currency} onShowToast={onShowToast} />
      )}

      {activeSubView === 'campaigns' && (
        <CMSMarketingCampaignTracker currency={currency} onShowToast={onShowToast} />
      )}

      {activeSubView === 'performance' && (
        <CMSWebsitePerformanceIntelligence currency={currency} onShowToast={onShowToast} />
      )}

      {activeSubView === 'search_console' && (
        <CMSSearchConsoleCenter currency={currency} onShowToast={onShowToast} />
      )}

      {activeSubView === 'ai_growth' && (
        <CMSAiGrowthIntelligenceHub currency={currency} onShowToast={onShowToast} />
      )}

      {/* VIEW: URL REDIRECT ENGINE */}
      {activeSubView === 'redirects' && (
        <div className="glass-card rounded-3xl border border-white/10 overflow-hidden bg-[#0D0D12]">
          <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-poppins font-bold text-white text-base flex items-center gap-2">
                <Link2 className="w-5 h-5 text-[#E5C158]" />
                <span>301 & 302 URL Forwarding Rules</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Seamlessly forward outdated paths to preserve SEO backlink equity and prevent 404 errors.
              </p>
            </div>

            <button
              onClick={() => setIsAddRedirectOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Redirect Rule</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.03] text-neutral-400 font-mono uppercase text-[10px] border-b border-white/10">
                <tr>
                  <th className="py-3 px-5">Old Request Path</th>
                  <th className="py-3 px-4">Destination Target</th>
                  <th className="py-3 px-4">HTTP Code</th>
                  <th className="py-3 px-4">Hit Count</th>
                  <th className="py-3 px-4">Last Triggered</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {redirects.map((rule) => (
                  <tr key={rule.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-mono text-white font-bold">{rule.sourcePath}</td>
                    <td className="py-4 px-4 font-mono text-[#E5C158]">{rule.targetUrl}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-xl bg-blue-500/20 text-blue-400 font-mono font-bold text-xs border border-blue-500/30">
                        {rule.redirectType} Permanent
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-white font-bold">{rule.hitCount} hits</td>
                    <td className="py-4 px-4 font-mono text-[10px] text-neutral-400">{rule.lastTriggered}</td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => handleDeleteRedirect(rule.id)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete Rule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD REDIRECT MODAL */}
      <AnimatePresence>
        {isAddRedirectOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <Link2 className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">New Redirect Rule</h3>
                </div>
                <button
                  onClick={() => setIsAddRedirectOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddRedirect} className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Old Request Path
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/portfolio"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Target Destination URL
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/our-work"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Redirect Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  >
                    <option value="301" className="bg-black">301 - Permanent Redirect</option>
                    <option value="302" className="bg-black">302 - Temporary Redirect</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddRedirectOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-neutral-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold shadow-lg"
                  >
                    Create Redirect
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
