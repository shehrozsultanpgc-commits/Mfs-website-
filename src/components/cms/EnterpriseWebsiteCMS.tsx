import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  FileText,
  Layout,
  Layers,
  History,
  Sparkles,
  ExternalLink,
  Shield,
  Eye,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sliders,
  Share2,
  Image as ImageIcon,
  Search,
  Compass,
  Megaphone,
  BookOpen,
  HelpCircle,
  Award,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Zap
} from 'lucide-react';
import { Currency, AdminTab } from '../../types';
import { CMSPageManager } from './CMSPageManager';
import { CMSHomepageManager } from './CMSHomepageManager';
import { CMSBlockBuilder } from './CMSBlockBuilder';
import { CMSVersionControl } from './CMSVersionControl';
import { CMSMediaLibrary } from './CMSMediaLibrary';
import { CMSSeoManager } from './CMSSeoManager';
import { CMSNavigationFooter } from './CMSNavigationFooter';
import { CMSPublishingBanners } from './CMSPublishingBanners';
import { CMSBlogEngine } from './CMSBlogEngine';
import { CMSKnowledgeBase } from './CMSKnowledgeBase';
import { CMSFaqManager } from './CMSFaqManager';
import { CMSCaseStudyManager } from './CMSCaseStudyManager';
import { CMSLegalCompliance } from './CMSLegalCompliance';
import { CMSDynamicSections } from './CMSDynamicSections';
import { CMSSearchIndexPerformance } from './CMSSearchIndexPerformance';
import { CMSFormsManager } from './CMSFormsManager';
import { CMSLeadPipelineCRM } from './CMSLeadPipelineCRM';
import { CMSWebsiteConfig } from './CMSWebsiteConfig';
import { CMSAnnouncementManager } from './CMSAnnouncementManager';
import { CMSTestimonialsManager } from './CMSTestimonialsManager';
import { CMSPartnersCertifications } from './CMSPartnersCertifications';
import { CMSWebsiteHealthDashboard } from './CMSWebsiteHealthDashboard';
import { CMSFutureIntegrationsHub } from './CMSFutureIntegrationsHub';
import { CMSMultilingualContentHub } from './CMSMultilingualContentHub';
import { CMSPublishingWorkflowCenter } from './CMSPublishingWorkflowCenter';
import { CMSAiContentOperationsHub } from './CMSAiContentOperationsHub';
import { CMSBusinessAutomationEngine } from './CMSBusinessAutomationEngine';

interface EnterpriseWebsiteCMSProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
  onNavigateTab?: (tab: AdminTab) => void;
}

export const EnterpriseWebsiteCMS: React.FC<EnterpriseWebsiteCMSProps> = ({
  currency,
  onShowToast,
  onNavigateTab,
}) => {
  // Sub-Navigation Tab State
  const [cmsSubTab, setCmsSubTab] = useState<
    | 'pages'
    | 'homepage'
    | 'forms'
    | 'leads'
    | 'config'
    | 'announcements'
    | 'testimonials'
    | 'partners'
    | 'health'
    | 'integrations'
    | 'blocks'
    | 'blog'
    | 'knowledge'
    | 'faq'
    | 'casestudies'
    | 'legal'
    | 'multilingual'
    | 'workflow'
    | 'ai_content_ops'
    | 'automation_engine'
    | 'dynamic'
    | 'media'
    | 'seo'
    | 'nav_footer'
    | 'publishing'
    | 'search_perf'
    | 'revisions'
  >('blog');

  return (
    <div className="space-y-6">
      {/* EXECUTIVE CMS HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-6 bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/40 flex items-center justify-center text-[#E5C158] shadow-[0_0_20px_rgba(229,193,88,0.2)] shrink-0">
              <Globe className="w-6 h-6 text-[#E5C158]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 uppercase tracking-wider">
                  PHASE 16 PART 3 • ENTERPRISE CONTENT ECOSYSTEM
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] animate-pulse" />
                  <span>PUBLISHING PLATFORM ACTIVE</span>
                </span>
              </div>
              <h1 className="font-poppins font-black text-xl md:text-2xl text-white mt-1">
                Enterprise Content Ecosystem & CMS Knowledge Hub
              </h1>
              <p className="text-xs text-neutral-400 max-w-xl">
                Centrally manage blogs, internal SOPs, FAQs, case study proofs, legal policies, dynamic homepage sections, DAM media, and search analytics.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer border border-white/10"
            >
              <ExternalLink className="w-4 h-4 text-[#E5C158]" />
              <span>Preview Live Website</span>
            </a>

            <button
              onClick={() => {
                if (onShowToast) onShowToast('Global Content Ecosystem state synchronized and published live!');
              }}
              className="px-4 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.25)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Sync & Publish All</span>
            </button>
          </div>
        </div>

        {/* SUB-NAVIGATION TAB CONTROLS */}
        <div className="pt-2 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setCmsSubTab('forms')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'forms'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span>Forms Center</span>
          </button>

          <button
            onClick={() => setCmsSubTab('leads')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'leads'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lead CRM</span>
          </button>

          <button
            onClick={() => setCmsSubTab('config')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'config'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Website Config</span>
          </button>

          <button
            onClick={() => setCmsSubTab('announcements')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'announcements'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-purple-400" />
            <span>Announcements</span>
          </button>

          <button
            onClick={() => setCmsSubTab('testimonials')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'testimonials'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-yellow-400" />
            <span>Testimonials</span>
          </button>

          <button
            onClick={() => setCmsSubTab('partners')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'partners'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Partners & Badges</span>
          </button>

          <button
            onClick={() => setCmsSubTab('health')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'health'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Website Health</span>
          </button>

          <button
            onClick={() => setCmsSubTab('integrations')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'integrations'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Integrations Hub</span>
          </button>

          <button
            onClick={() => setCmsSubTab('pages')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'pages'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Pages</span>
          </button>

          <button
            onClick={() => setCmsSubTab('homepage')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'homepage'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Homepage</span>
          </button>

          <button
            onClick={() => setCmsSubTab('blog')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'blog'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Blog Engine</span>
          </button>

          <button
            onClick={() => setCmsSubTab('knowledge')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'knowledge'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Knowledge Base</span>
          </button>

          <button
            onClick={() => setCmsSubTab('faq')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'faq'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>FAQs</span>
          </button>

          <button
            onClick={() => setCmsSubTab('casestudies')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'casestudies'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Case Studies</span>
          </button>

          <button
            onClick={() => setCmsSubTab('legal')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'legal'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>Legal Policy</span>
          </button>

          <button
            onClick={() => setCmsSubTab('multilingual')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'multilingual'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span>Multilingual Hub</span>
          </button>

          <button
            onClick={() => setCmsSubTab('workflow')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'workflow'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Editorial Workflow</span>
          </button>

          <button
            onClick={() => setCmsSubTab('ai_content_ops')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'ai_content_ops'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Content Ops</span>
          </button>

          <button
            onClick={() => setCmsSubTab('automation_engine')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'automation_engine'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Automation Engine</span>
          </button>

          <button
            onClick={() => setCmsSubTab('dynamic')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'dynamic'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-yellow-400" />
            <span>Dynamic Proof</span>
          </button>

          <button
            onClick={() => setCmsSubTab('blocks')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'blocks'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Blocks</span>
          </button>

          <button
            onClick={() => setCmsSubTab('media')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'media'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>DAM Media</span>
          </button>

          <button
            onClick={() => setCmsSubTab('seo')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'seo'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>SEO</span>
          </button>

          <button
            onClick={() => setCmsSubTab('nav_footer')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'nav_footer'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Nav & Footer</span>
          </button>

          <button
            onClick={() => setCmsSubTab('publishing')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'publishing'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Banners & AI</span>
          </button>

          <button
            onClick={() => setCmsSubTab('search_perf')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'search_perf'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Search & Perf</span>
          </button>

          <button
            onClick={() => setCmsSubTab('revisions')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              cmsSubTab === 'revisions'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Revisions</span>
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE CMS SUB-TAB VIEW */}
      {cmsSubTab === 'forms' && (
        <CMSFormsManager currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'leads' && (
        <CMSLeadPipelineCRM currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'config' && (
        <CMSWebsiteConfig currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'announcements' && (
        <CMSAnnouncementManager currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'testimonials' && (
        <CMSTestimonialsManager currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'partners' && (
        <CMSPartnersCertifications currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'health' && (
        <CMSWebsiteHealthDashboard currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'integrations' && (
        <CMSFutureIntegrationsHub currency={currency} onShowToast={onShowToast} />
      )}

      {/* RENDER ACTIVE CMS SUB-TAB VIEW */}
      {cmsSubTab === 'pages' && (
        <CMSPageManager currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'homepage' && (
        <CMSHomepageManager currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'blog' && (
        <CMSBlogEngine currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'knowledge' && (
        <CMSKnowledgeBase currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'faq' && (
        <CMSFaqManager currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'casestudies' && (
        <CMSCaseStudyManager currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'legal' && (
        <CMSLegalCompliance currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'multilingual' && (
        <CMSMultilingualContentHub currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'workflow' && (
        <CMSPublishingWorkflowCenter currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'ai_content_ops' && (
        <CMSAiContentOperationsHub currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'automation_engine' && (
        <CMSBusinessAutomationEngine currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'dynamic' && (
        <CMSDynamicSections currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'blocks' && (
        <CMSBlockBuilder currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'media' && (
        <CMSMediaLibrary currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'seo' && (
        <CMSSeoManager currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'nav_footer' && (
        <CMSNavigationFooter currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'publishing' && (
        <CMSPublishingBanners currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'search_perf' && (
        <CMSSearchIndexPerformance currency={currency} onShowToast={onShowToast} />
      )}

      {cmsSubTab === 'revisions' && (
        <CMSVersionControl currency={currency} onShowToast={onShowToast} />
      )}
    </div>
  );
};


