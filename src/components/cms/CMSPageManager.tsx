import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  Edit3,
  Copy,
  Trash2,
  Globe,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ExternalLink,
  Shield,
  Layers,
  ArrowUpRight,
  ChevronRight,
  Smartphone,
  Tablet,
  Monitor,
  X,
  Lock,
  History,
  Tag,
  Check,
  RefreshCw,
  Sliders,
  Share2
} from 'lucide-react';
import { Currency } from '../../types';

interface PageItem {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'scheduled';
  visibility: 'public' | 'private' | 'password';
  version: string;
  seoScore: number;
  lastModified: string;
  author: string;
  viewsCount: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  scheduledDate?: string;
  isSystemPage?: boolean;
}

interface CMSPageManagerProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSPageManager: React.FC<CMSPageManagerProps> = ({
  currency,
  onShowToast,
}) => {
  // Initial Pages Data
  const [pages, setPages] = useState<PageItem[]>([
    {
      id: 'page-1',
      title: 'Homepage',
      slug: '/',
      status: 'published',
      visibility: 'public',
      version: 'v3.2',
      seoScore: 98,
      lastModified: '2026-07-26 14:30 PKT',
      author: 'Muhammad Shehroz Sultan (Owner)',
      viewsCount: 42890,
      metaTitle: 'MFS Growth Agency | High-Quality Digital Solutions & Academic Excellence',
      metaDescription: 'Helping students & professionals grow with executive presentation design, assignment writing, ATS resumes, and corporate document formatting.',
      keywords: ['presentation design', 'assignment writing', 'ATS resume', 'MFS growth agency', 'academic help'],
      isSystemPage: true,
    },
    {
      id: 'page-2',
      title: 'About Us',
      slug: '/about',
      status: 'published',
      visibility: 'public',
      version: 'v2.1',
      seoScore: 94,
      lastModified: '2026-07-24 11:15 PKT',
      author: 'Shehroz Sultan',
      viewsCount: 8420,
      metaTitle: 'About MFS Growth Agency | Our Vision, Team & Quality Standards',
      metaDescription: 'Learn about MFS Growth Agency, Islamabad Pakistan’s premier digital agency delivering 24/7 expert services worldwide.',
      keywords: ['about MFS growth', 'pakistan digital agency', 'shehroz sultan', 'mfs agency team'],
      isSystemPage: true,
    },
    {
      id: 'page-3',
      title: 'Services',
      slug: '/services',
      status: 'published',
      visibility: 'public',
      version: 'v2.5',
      seoScore: 96,
      lastModified: '2026-07-25 18:45 PKT',
      author: 'MFS Content Team',
      viewsCount: 19300,
      metaTitle: 'Our Digital Services | Pitch Decks, Assignments & Resume Engineering',
      metaDescription: 'Explore our complete suite of presentation design, assignment writing, ATS resume engineering, and report formatting services.',
      keywords: ['pitch deck design', 'academic assignment help', 'cv writer pakistan', 'report formatting'],
      isSystemPage: true,
    },
    {
      id: 'page-4',
      title: 'Pricing & Packages',
      slug: '/pricing',
      status: 'published',
      visibility: 'public',
      version: 'v2.8',
      seoScore: 95,
      lastModified: '2026-07-26 09:00 PKT',
      author: 'Shehroz Sultan',
      viewsCount: 28400,
      metaTitle: 'Affordable Rates & 50% Grand Launch Discount | MFS Growth Agency',
      metaDescription: 'Transparent pricing with live calculator for PKR, USD, GBP, EUR, AED. Save 50% with our Grand Launch Offer.',
      keywords: ['presentation pricing', 'assignment writing rates', 'resume cost PKR', 'MFS launch discount'],
      isSystemPage: true,
    },
    {
      id: 'page-5',
      title: 'Our Work',
      slug: '/our-work',
      status: 'published',
      visibility: 'public',
      version: 'v3.0',
      seoScore: 97,
      lastModified: '2026-07-26 16:10 PKT',
      author: 'Design Lead',
      viewsCount: 31200,
      metaTitle: 'Our Work Showcase | Verified Project Samples & Case Studies',
      metaDescription: 'Browse secured sample previews of pitch decks, academic papers, ATS resumes, and corporate reports created by MFS Growth Agency.',
      keywords: ['MFS portfolio', 'our work', 'sample pitch decks', 'resume templates', 'assignment samples'],
      isSystemPage: true,
    },
    {
      id: 'page-6',
      title: 'Blog & Insights',
      slug: '/blog',
      status: 'published',
      visibility: 'public',
      version: 'v1.4',
      seoScore: 91,
      lastModified: '2026-07-22 10:00 PKT',
      author: 'Content Team',
      viewsCount: 6540,
      metaTitle: 'MFS Growth Insights | Career Guidance, Academic Tips & Design Trends',
      metaDescription: 'Read expert advice on building ATS-friendly resumes, delivering winning pitch decks, and structuring academic research papers.',
      keywords: ['ATS resume tips', 'presentation design guide', 'academic writing APA', 'career growth pakistan'],
      isSystemPage: true,
    },
    {
      id: 'page-7',
      title: 'Careers',
      slug: '/careers',
      status: 'draft',
      visibility: 'public',
      version: 'v1.0',
      seoScore: 82,
      lastModified: '2026-07-20 15:30 PKT',
      author: 'HR Lead',
      viewsCount: 1200,
      metaTitle: 'Careers at MFS Growth Agency | Join Our Remote Global Team',
      metaDescription: 'We are hiring presentation designers, academic researchers, resume writers, and AI prompt engineers.',
      keywords: ['MFS careers', 'remote jobs pakistan', 'presentation designer job', 'academic writer hiring'],
      isSystemPage: true,
    },
    {
      id: 'page-8',
      title: 'Contact Us',
      slug: '/contact',
      status: 'published',
      visibility: 'public',
      version: 'v2.0',
      seoScore: 96,
      lastModified: '2026-07-25 08:20 PKT',
      author: 'Support Lead',
      viewsCount: 14800,
      metaTitle: 'Contact MFS Growth Agency | 24/7 WhatsApp & Email Support',
      metaDescription: 'Reach out to MFS Growth Agency via WhatsApp +92 301 5323689 or email shehrozsultanpgc@gmail.com for instant assistance.',
      keywords: ['contact MFS agency', 'MFS whatsapp number', 'shehroz sultan contact', 'islamabad office address'],
      isSystemPage: true,
    },
    {
      id: 'page-9',
      title: 'Privacy Policy',
      slug: '/privacy',
      status: 'published',
      visibility: 'public',
      version: 'v1.2',
      seoScore: 89,
      lastModified: '2026-07-10 12:00 PKT',
      author: 'Legal Team',
      viewsCount: 3200,
      metaTitle: 'Privacy Policy & Data Security | MFS Growth Agency',
      metaDescription: 'Learn how MFS Growth Agency protects your confidential documents, project briefs, and personal information.',
      keywords: ['privacy policy MFS', 'data confidentiality', '256-bit encryption', 'document privacy'],
      isSystemPage: true,
    },
    {
      id: 'page-10',
      title: 'Terms & Conditions',
      slug: '/terms',
      status: 'published',
      visibility: 'public',
      version: 'v1.2',
      seoScore: 88,
      lastModified: '2026-07-10 12:15 PKT',
      author: 'Legal Team',
      viewsCount: 2900,
      metaTitle: 'Terms & Conditions | MFS Growth Agency Service Agreement',
      metaDescription: 'Terms of service, delivery policies, revision guarantees, and payment rules for MFS Growth Agency.',
      keywords: ['terms of service', 'MFS refund policy', 'revision rules', 'service agreement'],
      isSystemPage: true,
    },
    {
      id: 'page-11',
      title: 'Frequently Asked Questions',
      slug: '/faq',
      status: 'published',
      visibility: 'public',
      version: 'v1.8',
      seoScore: 93,
      lastModified: '2026-07-21 17:00 PKT',
      author: 'Support Team',
      viewsCount: 11200,
      metaTitle: 'Frequently Asked Questions (FAQ) | MFS Growth Agency Help',
      metaDescription: 'Answers to common questions about payment methods (EasyPaisa, JazzCash, Bank Transfer), delivery timelines, and revision guarantees.',
      keywords: ['MFS FAQ', 'easypaisa payment question', 'delivery speed urgent', 'revision policy'],
      isSystemPage: true,
    },
    {
      id: 'page-12',
      title: 'Executive Pitch Deck Solutions',
      slug: '/executive-pitch-decks',
      status: 'scheduled',
      scheduledDate: '2026-08-01 00:00 PKT',
      visibility: 'public',
      version: 'v1.0-draft',
      seoScore: 86,
      lastModified: '2026-07-26 19:10 PKT',
      author: 'Shehroz Sultan',
      viewsCount: 0,
      metaTitle: 'High-Convert Executive Pitch Deck Design | MFS Growth Agency',
      metaDescription: 'Custom investor pitch decks engineered for startups and corporate executives to secure venture capital funding.',
      keywords: ['investor pitch deck', 'pitch deck design pakistan', 'startup slides', 'fundraising deck'],
      isSystemPage: false,
    },
  ]);

  // Filters & State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');
  const [selectedPage, setSelectedPage] = useState<PageItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState('2026-08-05T12:00');
  const [isNewPageModalOpen, setIsNewPageModalOpen] = useState(false);

  // New Page Form State
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageMetaTitle, setNewPageMetaTitle] = useState('');
  const [newPageMetaDesc, setNewPageMetaDesc] = useState('');

  // Filtered pages
  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Page Handler Functions
  const handleTogglePublish = (id: string) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus = p.status === 'published' ? 'draft' : 'published';
          if (onShowToast) {
            onShowToast(`Page "${p.title}" status changed to ${nextStatus.toUpperCase()}`);
          }
          return {
            ...p,
            status: nextStatus,
            lastModified: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' PKT',
          };
        }
        return p;
      })
    );
  };

  const handleDuplicatePage = (page: PageItem) => {
    const newId = `page-${Date.now()}`;
    const duplicated: PageItem = {
      ...page,
      id: newId,
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: 'draft',
      version: 'v1.0-draft',
      viewsCount: 0,
      lastModified: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' PKT',
      author: 'Muhammad Shehroz Sultan',
      isSystemPage: false,
    };
    setPages((prev) => [duplicated, ...prev]);
    if (onShowToast) onShowToast(`Duplicated page: "${duplicated.title}"`);
  };

  const handleDeletePage = (page: PageItem) => {
    if (page.isSystemPage) {
      if (onShowToast) onShowToast(`Error: Core system page "${page.title}" cannot be deleted.`);
      return;
    }
    setPages((prev) => prev.filter((p) => p.id !== page.id));
    if (onShowToast) onShowToast(`Deleted custom page: "${page.title}"`);
  };

  const handleCreateNewPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle || !newPageSlug) {
      if (onShowToast) onShowToast('Please fill in required fields (Title & Slug)');
      return;
    }
    const slugFormatted = newPageSlug.startsWith('/') ? newPageSlug : `/${newPageSlug}`;
    const created: PageItem = {
      id: `page-${Date.now()}`,
      title: newPageTitle,
      slug: slugFormatted,
      status: 'draft',
      visibility: 'public',
      version: 'v1.0',
      seoScore: 85,
      lastModified: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' PKT',
      author: 'Muhammad Shehroz Sultan',
      viewsCount: 0,
      metaTitle: newPageMetaTitle || `${newPageTitle} | MFS Growth Agency`,
      metaDescription: newPageMetaDesc || `Learn more about ${newPageTitle} at MFS Growth Agency.`,
      keywords: [newPageTitle.toLowerCase(), 'mfs growth agency', 'digital services'],
      isSystemPage: false,
    };
    setPages((prev) => [created, ...prev]);
    setIsNewPageModalOpen(false);
    setNewPageTitle('');
    setNewPageSlug('');
    setNewPageMetaTitle('');
    setNewPageMetaDesc('');
    if (onShowToast) onShowToast(`Created new page "${created.title}" successfully!`);
  };

  const handleScheduleSubmit = () => {
    if (!selectedPage) return;
    setPages((prev) =>
      prev.map((p) => {
        if (p.id === selectedPage.id) {
          return {
            ...p,
            status: 'scheduled',
            scheduledDate: scheduleDateTime.replace('T', ' ') + ' PKT',
            lastModified: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' PKT',
          };
        }
        return p;
      })
    );
    setIsScheduleModalOpen(false);
    if (onShowToast) onShowToast(`Scheduled "${selectedPage.title}" for ${scheduleDateTime}`);
  };

  // Stats Counters
  const totalPages = pages.length;
  const publishedPages = pages.filter((p) => p.status === 'published').length;
  const draftPages = pages.filter((p) => p.status === 'draft').length;
  const scheduledPages = pages.filter((p) => p.status === 'scheduled').length;
  const avgSeoScore = Math.round(
    pages.reduce((acc, curr) => acc + curr.seoScore, 0) / (totalPages || 1)
  );

  return (
    <div className="space-y-6">
      {/* CMS STATS HEADER */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-1 bg-gradient-to-b from-white/[0.03] to-transparent">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Total Pages</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="font-poppins font-black text-2xl text-white">{totalPages}</div>
          <p className="text-[10px] text-neutral-400 font-mono">Managed Pages</p>
        </div>

        <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-1 bg-gradient-to-b from-white/[0.03] to-transparent">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Published</span>
            <Globe className="w-4 h-4 text-[#28C76F]" />
          </div>
          <div className="font-poppins font-black text-2xl text-[#28C76F]">{publishedPages}</div>
          <p className="text-[10px] text-[#28C76F] font-mono">Live on Website</p>
        </div>

        <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-1 bg-gradient-to-b from-white/[0.03] to-transparent">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Drafts</span>
            <Edit3 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-poppins font-black text-2xl text-amber-400">{draftPages}</div>
          <p className="text-[10px] text-amber-400 font-mono">In Progress</p>
        </div>

        <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-1 bg-gradient-to-b from-white/[0.03] to-transparent">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Scheduled</span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <div className="font-poppins font-black text-2xl text-purple-400">{scheduledPages}</div>
          <p className="text-[10px] text-purple-400 font-mono">Auto-Release</p>
        </div>

        <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-1 bg-gradient-to-b from-white/[0.03] to-transparent col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Avg SEO Score</span>
            <Sparkles className="w-4 h-4 text-[#E5C158]" />
          </div>
          <div className="font-poppins font-black text-2xl text-[#E5C158]">{avgSeoScore}/100</div>
          <p className="text-[10px] text-[#E5C158] font-mono">High Optimization</p>
        </div>
      </div>

      {/* TOOLBAR & SEARCH BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Left: Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search website pages by title, URL slug, or author..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          {/* Center: Status Tabs */}
          <div className="flex rounded-2xl bg-white/[0.04] p-1 border border-white/10 text-xs font-mono shrink-0">
            {(['all', 'published', 'draft', 'scheduled'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-xl uppercase font-bold transition-all cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-[#E5C158] text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right: Add New Page Button */}
          <button
            onClick={() => setIsNewPageModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.25)] shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Page</span>
          </button>
        </div>
      </div>

      {/* PAGE LIST TABLE */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden bg-[#0D0D12]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] text-neutral-400 font-mono uppercase text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3.5 px-5">Page & Title</th>
                <th className="py-3.5 px-4">URL Slug</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">SEO Score</th>
                <th className="py-3.5 px-4">Traffic / Views</th>
                <th className="py-3.5 px-4">Version & Author</th>
                <th className="py-3.5 px-4">Last Modified</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {filteredPages.map((page) => (
                <tr
                  key={page.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  {/* Page Title & Badges */}
                  <td className="py-4 px-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-white font-bold text-sm group-hover:text-[#E5C158] transition-colors">
                          {page.title}
                        </strong>
                        {page.isSystemPage && (
                          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-mono font-bold">
                            CORE SYSTEM
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 line-clamp-1 max-w-xs">
                        {page.metaTitle}
                      </p>
                    </div>
                  </td>

                  {/* Slug */}
                  <td className="py-4 px-4 font-mono text-[11px] text-neutral-300">
                    <span className="px-2 py-1 rounded bg-white/[0.05] border border-white/10">
                      {page.slug}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    {page.status === 'published' && (
                      <span className="px-2.5 py-1 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 font-mono text-[10px] font-bold flex items-center gap-1.5 w-max">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] animate-pulse" />
                        <span>PUBLISHED</span>
                      </span>
                    )}
                    {page.status === 'draft' && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[10px] font-bold flex items-center gap-1.5 w-max">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>DRAFT</span>
                      </span>
                    )}
                    {page.status === 'scheduled' && (
                      <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono text-[10px] font-bold flex items-center gap-1.5 w-max">
                        <Clock className="w-3 h-3 text-purple-400" />
                        <span>SCHEDULED</span>
                      </span>
                    )}
                  </td>

                  {/* SEO Score */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            page.seoScore >= 90
                              ? 'bg-[#28C76F]'
                              : page.seoScore >= 80
                              ? 'bg-[#E5C158]'
                              : 'bg-amber-400'
                          }`}
                          style={{ width: `${page.seoScore}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-white">
                        {page.seoScore}/100
                      </span>
                    </div>
                  </td>

                  {/* Traffic */}
                  <td className="py-4 px-4 font-mono text-xs text-white font-bold">
                    {page.viewsCount > 0 ? page.viewsCount.toLocaleString() + ' views' : '0 views'}
                  </td>

                  {/* Version & Author */}
                  <td className="py-4 px-4 space-y-0.5">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] font-bold">
                      {page.version}
                    </span>
                    <span className="text-[10px] text-neutral-400 block line-clamp-1">
                      {page.author}
                    </span>
                  </td>

                  {/* Last Modified */}
                  <td className="py-4 px-4 text-neutral-400 font-mono text-[10px]">
                    {page.lastModified}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Live Preview Button */}
                      <button
                        onClick={() => {
                          setSelectedPage(page);
                          setIsPreviewOpen(true);
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        title="Live Responsive Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit Page Metadata */}
                      <button
                        onClick={() => {
                          setSelectedPage(page);
                          setIsEditModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-[#E5C158]/20 text-neutral-300 hover:text-[#E5C158] transition-colors cursor-pointer"
                        title="Edit Page Properties"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Schedule Button */}
                      <button
                        onClick={() => {
                          setSelectedPage(page);
                          setIsScheduleModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-purple-500/20 text-neutral-300 hover:text-purple-400 transition-colors cursor-pointer"
                        title="Schedule Release"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={() => handleDuplicatePage(page)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-blue-500/20 text-neutral-300 hover:text-blue-400 transition-colors cursor-pointer"
                        title="Duplicate Page"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      {/* Quick Toggle Publish */}
                      <button
                        onClick={() => handleTogglePublish(page.id)}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold transition-all cursor-pointer ${
                          page.status === 'published'
                            ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                            : 'bg-[#28C76F]/10 text-[#28C76F] hover:bg-[#28C76F]/20 border border-[#28C76F]/30'
                        }`}
                      >
                        {page.status === 'published' ? 'UNPUBLISH' : 'PUBLISH'}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeletePage(page)}
                        disabled={page.isSystemPage}
                        className={`p-2 rounded-xl transition-colors cursor-pointer ${
                          page.isSystemPage
                            ? 'text-neutral-600 opacity-40 cursor-not-allowed'
                            : 'bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400'
                        }`}
                        title={page.isSystemPage ? 'Core system page cannot be deleted' : 'Delete Page'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredPages.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400 space-y-2">
                    <FileText className="w-8 h-8 mx-auto text-neutral-600" />
                    <p className="font-poppins text-sm text-white font-bold">No Pages Found</p>
                    <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                      No website pages match your current search query or status filter. Try clearing filters or create a new page.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* LIVE RESPONSIVE PREVIEW MODAL */}
      <AnimatePresence>
        {isPreviewOpen && selectedPage && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-6xl h-[90vh] bg-[#0A0A0E] border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Preview Header */}
              <div className="p-4 bg-[#0F0F15] border-b border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-white text-sm flex items-center gap-2">
                      <span>Live Website Preview:</span>
                      <span className="text-[#E5C158]">{selectedPage.title}</span>
                    </h3>
                    <p className="text-[11px] font-mono text-neutral-400">
                      URL: https://mfsgrowth.agency{selectedPage.slug} • Version: {selectedPage.version}
                    </p>
                  </div>
                </div>

                {/* Device Selector */}
                <div className="flex rounded-2xl bg-white/[0.05] p-1 border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      previewDevice === 'desktop'
                        ? 'bg-[#E5C158] text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop (1920px)</span>
                  </button>

                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      previewDevice === 'tablet'
                        ? 'bg-[#E5C158] text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Tablet className="w-3.5 h-3.5" />
                    <span>Tablet (768px)</span>
                  </button>

                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      previewDevice === 'mobile'
                        ? 'bg-[#E5C158] text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile (375px)</span>
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview Canvas Container */}
              <div className="flex-1 overflow-auto p-6 bg-[#050507] flex justify-center items-start">
                <div
                  className={`bg-[#0A0A0F] border border-white/10 rounded-2xl p-6 transition-all duration-300 shadow-2xl space-y-6 ${
                    previewDevice === 'desktop'
                      ? 'w-full max-w-5xl'
                      : previewDevice === 'tablet'
                      ? 'w-[768px]'
                      : 'w-[375px]'
                  }`}
                >
                  {/* Mock Page Header */}
                  <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#E5C158] text-black font-black flex items-center justify-center font-poppins text-xs">
                        MFS
                      </div>
                      <span className="font-poppins font-bold text-white text-sm">
                        MFS Growth Agency
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      Live Preview Mode
                    </span>
                  </div>

                  {/* Page Hero Content Mock */}
                  <div className="space-y-4 text-center py-8">
                    <span className="px-3 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 uppercase">
                      50% GRAND LAUNCH OFFER ACTIVE
                    </span>
                    <h1 className="font-poppins font-black text-2xl md:text-3xl text-white">
                      {selectedPage.title}
                    </h1>
                    <p className="text-xs md:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
                      {selectedPage.metaDescription}
                    </p>
                    <div className="pt-2 flex justify-center gap-3">
                      <button className="px-5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs">
                        Get Started Now
                      </button>
                      <button className="px-5 py-2 rounded-xl bg-white/10 text-white font-bold text-xs">
                        Explore Our Work
                      </button>
                    </div>
                  </div>

                  {/* SEO Metadata Footer Audit */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 text-xs">
                    <strong className="text-[#E5C158] font-mono text-[11px] block">
                      SEO METADATA AUDIT
                    </strong>
                    <p className="text-white font-semibold">Meta Title: {selectedPage.metaTitle}</p>
                    <p className="text-neutral-400 text-[11px]">Keywords: {selectedPage.keywords.join(', ')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SCHEDULE RELEASE MODAL */}
      <AnimatePresence>
        {isScheduleModalOpen && selectedPage && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-purple-400">
                  <Calendar className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">Schedule Release</h3>
                </div>
                <button
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-neutral-300">
                  Set date and PKT time to automatically publish <strong className="text-white">{selectedPage.title}</strong>:
                </p>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    Release Date & Time (PKT)
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduleDateTime}
                    onChange={(e) => setScheduleDateTime(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-neutral-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduleSubmit}
                  className="px-4 py-2 rounded-xl bg-purple-500 text-white font-extrabold text-xs hover:bg-purple-600 transition-colors shadow-lg"
                >
                  Confirm Schedule
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE NEW PAGE MODAL */}
      <AnimatePresence>
        {isNewPageModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <Plus className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">Create Custom Website Page</h3>
                </div>
                <button
                  onClick={() => setIsNewPageModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateNewPage} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPageTitle}
                    onChange={(e) => {
                      setNewPageTitle(e.target.value);
                      if (!newPageSlug) {
                        setNewPageSlug(`/${e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
                      }
                    }}
                    placeholder="e.g., Executive Pitch Decks"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value)}
                    placeholder="e.g., /executive-pitch-decks"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    Meta Title (SEO)
                  </label>
                  <input
                    type="text"
                    value={newPageMetaTitle}
                    onChange={(e) => setNewPageMetaTitle(e.target.value)}
                    placeholder="e.g., High-Quality Pitch Deck Services | MFS Growth"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={newPageMetaDesc}
                    onChange={(e) => setNewPageMetaDesc(e.target.value)}
                    placeholder="Short description for Google search engine results..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewPageModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-neutral-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold hover:bg-[#fce888] transition-colors shadow-lg"
                  >
                    Create Page
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT PAGE METADATA MODAL */}
      <AnimatePresence>
        {isEditModalOpen && selectedPage && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <Edit3 className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    Edit Page Settings: {selectedPage.title}
                  </h3>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    Page Title
                  </label>
                  <input
                    type="text"
                    value={selectedPage.title}
                    onChange={(e) =>
                      setSelectedPage({ ...selectedPage, title: e.target.value })
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={selectedPage.slug}
                    onChange={(e) =>
                      setSelectedPage({ ...selectedPage, slug: e.target.value })
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={selectedPage.metaTitle}
                    onChange={(e) =>
                      setSelectedPage({ ...selectedPage, metaTitle: e.target.value })
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={selectedPage.metaDescription}
                    onChange={(e) =>
                      setSelectedPage({ ...selectedPage, metaDescription: e.target.value })
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-neutral-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setPages((prev) =>
                      prev.map((p) => (p.id === selectedPage.id ? selectedPage : p))
                    );
                    setIsEditModalOpen(false);
                    if (onShowToast)
                      onShowToast(`Updated settings for "${selectedPage.title}"`);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold hover:bg-[#fce888] transition-colors shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
