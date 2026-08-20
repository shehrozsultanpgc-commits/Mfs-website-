import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
  Star,
  FileText,
  Presentation,
  GraduationCap,
  Briefcase,
  Zap,
  Clock,
  ShieldCheck,
  ChevronRight,
  Search,
  Filter,
  Eye,
  Sliders,
  DollarSign,
  BarChart3,
  Quote,
  Target,
} from 'lucide-react';
import { Currency } from '../../types';

interface CaseStudiesPageProps {
  onNavigatePage: (page: string, targetSection?: string) => void;
  onOpenOrderModal: (serviceId?: string) => void;
  currency?: Currency;
}

interface CaseStudy {
  id: string;
  category: 'Presentation' | 'Resume' | 'Academic' | 'Corporate';
  title: string;
  subtitle: string;
  clientType: string;
  industry: string;
  timeline: string;
  badge: string;
  heroMetric: string;
  heroMetricLabel: string;
  challenge: string;
  solution: string;
  results: string[];
  clientQuote: {
    text: string;
    author: string;
    role: string;
    avatar: string;
  };
  metrics: {
    label: string;
    value: string;
    change: string;
  }[];
  beforeAfter: {
    beforeTitle: string;
    beforePoints: string[];
    afterTitle: string;
    afterPoints: string[];
  };
  associatedServiceId: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fintech-seed-pitch-deck',
    category: 'Presentation',
    title: 'Seed-Stage Fintech Pitch Deck Secures $1.4M in Oversubscribed Round',
    subtitle: 'Transforming complex cross-border remittance architecture into a crystal-clear 10-slide executive investor narrative.',
    clientType: 'Fintech Startup (London & Singapore)',
    industry: 'Financial Technology / Web3',
    timeline: '48-Hour Priority Turnaround',
    badge: 'Venture Capital Deck',
    heroMetric: '$1.4M',
    heroMetricLabel: 'Oversubscribed Seed Round',
    challenge:
      'The founding team had an innovative financial infrastructure protocol but struggled to convey unit economics, regulatory compliance, and total addressable market in under 3 minutes of investor pitch time. Their previous 38-slide technical deck overwhelmed angels and VC analysts.',
    solution:
      'MFS Growth restructured the deck into a high-converting 10-slide storyline framework. We engineered custom financial infographic teardowns, condensed unit economics into single-glance visuals, and crafted an undeniable problem-solution narrative tailored to Tier-1 European VCs.',
    results: [
      'Deck pitch review duration reduced from 22 minutes to 3.5 minutes',
      'Secured 14 term sheet discussions across London and Zurich angels',
      'Final investment round closed 40% oversubscribed within 6 weeks',
      'Zero design revisions required on final slide master templates',
    ],
    clientQuote: {
      text: 'MFS Growth transformed our dense engineering documentation into an institutional-grade pitch deck that opened doors at every VC meeting in Mayfair. The speed and aesthetic rigor were unmatched.',
      author: 'Marcus Vance',
      role: 'Co-Founder & CEO, TransactFlow UK',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    metrics: [
      { label: 'Capital Raised', value: '$1.4M', change: '+40% over target' },
      { label: 'Investor Reply Rate', value: '78%', change: '+52% increase' },
      { label: 'Turnaround Time', value: '48h', change: 'Zero delays' },
    ],
    beforeAfter: {
      beforeTitle: 'Original 38-Slide Technical Draft',
      beforePoints: [
        'Dense walls of 10pt monospace code and unformatted tables',
        'Confusing multi-layered revenue mechanics without hierarchy',
        'No clear traction milestone roadmap or competitor moats',
      ],
      afterTitle: 'MFS Executive 10-Slide Investor Deck',
      afterPoints: [
        'Minimalist dark-gold luxury branding with custom vector graphics',
        'Direct 3-minute executive scanning structure with bold key metrics',
        'Integrated defensibility moats and unit economics validation',
      ],
    },
    associatedServiceId: 'pitch-deck',
  },
  {
    id: 'executive-ats-resume-transformation',
    category: 'Resume',
    title: 'Senior Product Lead Transitions to VP Role with 85% Callback Rate',
    subtitle: 'Complete ATS reverse-engineering, quantified achievement reframing, and executive branding for Fortune 500 tech roles.',
    clientType: 'Senior Director of Product',
    industry: 'Enterprise SaaS & Cloud Infrastructure',
    timeline: '24-Hour Express Delivery',
    badge: 'Executive ATS Resume',
    heroMetric: '85%',
    heroMetricLabel: 'First-Round Callback Rate',
    challenge:
      'A 12-year tech veteran was experiencing automated rejections from Greenhouse and Workday ATS portals despite leading $40M product lines. The resume was formatted with dual columns and text boxes that choked ATS parsing algorithms, with generic job responsibility descriptions rather than quantified revenue impact.',
    solution:
      'We rebuilt the candidate dossier using our single-column ATS-compliant structure. We analyzed 40+ target VP-level job descriptions to extract high-frequency semantic keywords, reframed every bullet into the XYZ impact formula (Accomplished [X], measured by [Y], by doing [Z]), and engineered a matching executive cover letter.',
    results: [
      'ATS compatibility score surged from 42% to 96% across Taleo & Workday',
      'Secured 9 executive interview rounds within 14 days of distribution',
      'Accepted VP of Product offer with a $75,000 base salary increase',
      'Profile selected for immediate fast-track recruiter referral',
    ],
    clientQuote: {
      text: 'After 3 months of radio silence from recruiters, MFS Growth overhauled my resume on a Monday. By Friday, I had scheduled 4 executive screening interviews. It completely revitalized my career trajectory.',
      author: 'David Al-Hassan',
      role: 'VP of Product, CloudScale Technologies',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    metrics: [
      { label: 'ATS Match Score', value: '96%', change: '+54 points' },
      { label: 'Interview Invites', value: '9 Offers', change: 'In 14 days' },
      { label: 'Compensation Uplift', value: '+$75k', change: '+38% increase' },
    ],
    beforeAfter: {
      beforeTitle: 'Original Career Resume',
      beforePoints: [
        'Two-column graphic template invisible to Workday ATS parsers',
        'Passive descriptions: "Responsible for managing product backlog"',
        'Missing core cloud migration and revenue growth keywords',
      ],
      afterTitle: 'MFS Engineered ATS Dossier',
      afterPoints: [
        'Strict single-column semantic hierarchy with clean font weights',
        'Active metric bullet points: "Scaled ARR from $12M to $42M (+250%)"',
        'Full target keyword saturation with zero formatting errors',
      ],
    },
    associatedServiceId: 'resume-writing',
  },
  {
    id: 'postgraduate-research-dissertation',
    category: 'Academic',
    title: 'MSc International Business Dissertation Awarded Distinction (88%)',
    subtitle: 'Comprehensive literature synthesis, quantitative methodology formatting, and pristine APA 7th referencing under tight deadline.',
    clientType: 'Postgraduate Student (Warwick / LUMS)',
    industry: 'Academic Research & Applied Econometrics',
    timeline: 'Standard 4-Day Collaboration',
    badge: 'Academic Research',
    heroMetric: 'Grade A+',
    heroMetricLabel: 'Distinction Honor (88%)',
    challenge:
      'The client faced a critical 12,000-word dissertation deadline with complex statistical regression tables, multiple cross-national datasets, and strict university referencing standards. Inconsistent citations and formatting errors risked severe grading penalties.',
    solution:
      'MFS Growth executed deep structural formatting, standardized 85+ academic peer-reviewed citations in APA 7th edition, structured automated Lists of Tables and Figures, and ensured flawless academic prose flow with 0% AI detection markers.',
    results: [
      'Graded 88% (Distinction) by external UK academic review board',
      '0% Turnitin similarity flag across all primary analytical chapters',
      'Commended for exemplary econometric table design and bibliography rigor',
      'Client awarded academic excellence scholarship continuation',
    ],
    clientQuote: {
      text: 'MFS Growth made sure every single citation, statistical table, and reference adhered precisely to APA 7th rules. Their academic formatting team delivered with absolute perfection and zero stress.',
      author: 'Fatima Noor',
      role: 'MSc Graduate, Warwick Business School',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    },
    metrics: [
      { label: 'Final Grade', value: '88%', change: 'Distinction Honor' },
      { label: 'Turnitin Flag', value: '0.0%', change: '100% Originality' },
      { label: 'APA Citations', value: '85+', change: 'Zero errors' },
    ],
    beforeAfter: {
      beforeTitle: 'Initial Rough Chapters',
      beforePoints: [
        'Disjointed citation styles mixing footnotes with Harvard and APA',
        'Raw Excel screenshots inserted instead of formatted APA tables',
        'Inconsistent margins, heading levels, and broken paragraph flow',
      ],
      afterTitle: 'MFS Standardized Dissertation Master',
      afterPoints: [
        'Automated TOC, Table & Figure indexes with live pagination',
        'Pristine vector data tables with proper APA note annotations',
        'Complete bibliography cross-checked against digital DOI registries',
      ],
    },
    associatedServiceId: 'assignment-writing',
  },
  {
    id: 'corporate-esg-annual-report',
    category: 'Corporate',
    title: '52-Page Annual Sustainability Report for Listed Manufacturing Enterprise',
    subtitle: 'High-impact corporate publication layout, custom financial infographics, and executive typography for board stakeholders.',
    clientType: 'Publicly Listed Industrial Group',
    industry: 'Manufacturing & Energy Operations',
    timeline: '72-Hour Express Production',
    badge: 'Executive Corporate Report',
    heroMetric: '52 Pages',
    heroMetricLabel: 'Flawless Boardroom Deliverable',
    challenge:
      'The client needed to publish their mandatory Annual ESG and Carbon Footprint report before an impending AGM. The raw submission consisted of 4 uncoordinated Word documents, dozens of complex audit spreadsheets, and disjointed brand assets.',
    solution:
      'Our senior formatting team consolidated all documentation into a cohesive 52-page luxury publication. We created unified data visualizers for greenhouse emissions, aligned all corporate typography with brand guidelines, and provided both print-ready CMYK and web-optimized interactive PDFs.',
    results: [
      'Delivered 18 hours ahead of the statutory board review deadline',
      'Unanimously approved without typography or numerical amendments',
      'Praised by institutional investors for visual clarity and accessibility',
      'Retained MFS Growth for all quarterly investor reporting cycles',
    ],
    clientQuote: {
      text: 'The speed, confidentiality, and visual brilliance MFS Growth brought to our annual reporting cycle set a new benchmark for our executive communications.',
      author: 'Tariq Mehmood',
      role: 'Director of Corporate Governance & IR',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    },
    metrics: [
      { label: 'Report Length', value: '52 Pages', change: 'Unified styling' },
      { label: 'Turnaround', value: '72 Hours', change: '18h ahead of time' },
      { label: 'Stakeholder Score', value: '10/10', change: 'Unanimous approval' },
    ],
    beforeAfter: {
      beforeTitle: 'Fragmented Office Docs',
      beforePoints: [
        'Unmatched color codes, fonts, and misaligned margins',
        'Raw Excel charts with illegible axis labels and pixelation',
        'No interactive digital bookmarking or navigable document index',
      ],
      afterTitle: 'MFS Boardroom Master Publication',
      afterPoints: [
        'Bespoke visual theme with gold foil accent styling',
        'High-resolution vector charts with executive summary callouts',
        'Embedded digital hyperlinks, metadata, and print-ready bleeds',
      ],
    },
    associatedServiceId: 'report-formatting',
  },
];

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  onNavigatePage,
  onOpenOrderModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeStudyId, setActiveStudyId] = useState<string>(CASE_STUDIES[0].id);

  const filteredStudies = useMemo(() => {
    return CASE_STUDIES.filter((study) => {
      const matchesCategory =
        selectedCategory === 'All' || study.category === selectedCategory;
      const matchesSearch =
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.clientType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeStudy = useMemo(() => {
    return (
      CASE_STUDIES.find((s) => s.id === activeStudyId) || CASE_STUDIES[0]
    );
  }, [activeStudyId]);

  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <button
            onClick={() => onNavigatePage('home')}
            className="hover:text-[#E5C158] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigatePage('home', 'portfolio')}
            className="hover:text-[#E5C158] transition-colors cursor-pointer"
          >
            Our Work
          </button>
          <span>/</span>
          <span className="text-[#E5C158]">Case Studies & Transformations</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Proven Enterprise Impact & Client Growth</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins text-white tracking-tight leading-tight">
            Client Success & <span className="text-[#E5C158]">Transformation Deep Dives</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
            Explore verified case studies highlighting how MFS Growth delivers measurable outcomes — from $1.4M venture funding to 96% ATS resume passes and distinction-grade academic dissertations.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-xl bg-[#0F0F16] border border-white/5 text-center">
              <span className="text-xl sm:text-2xl font-extrabold font-poppins text-[#E5C158] block">
                $1.4M+
              </span>
              <span className="text-[11px] text-neutral-400">Capital Raised by Clients</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0F0F16] border border-white/5 text-center">
              <span className="text-xl sm:text-2xl font-extrabold font-poppins text-[#E5C158] block">
                96%
              </span>
              <span className="text-[11px] text-neutral-400">Average ATS Match Score</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0F0F16] border border-white/5 text-center">
              <span className="text-xl sm:text-2xl font-extrabold font-poppins text-[#E5C158] block">
                100%
              </span>
              <span className="text-[11px] text-neutral-400">Originality & Strict Zero AI</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0F0F16] border border-white/5 text-center">
              <span className="text-xl sm:text-2xl font-extrabold font-poppins text-[#E5C158] block">
                24-48h
              </span>
              <span className="text-[11px] text-neutral-400">Standard Turnaround Range</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-[#0F0F16] border border-white/10 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Presentation', 'Resume', 'Academic', 'Corporate'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#E5C158] text-black shadow-md font-bold'
                    : 'bg-[#08080C] text-neutral-400 hover:text-white border border-white/5'
                }`}
              >
                {cat === 'All' ? 'All Case Studies' : `${cat} Design`}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, industry..."
              className="w-full bg-[#050507] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] transition-colors"
            />
          </div>
        </div>

        {/* Master Case Study Detail Spotlight */}
        {activeStudy && (
          <div className="mb-16 p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0F0F16] border border-[#E5C158]/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-black bg-[#E5C158] px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeStudy.badge}
                </span>
                <span className="text-xs text-neutral-400">
                  {activeStudy.industry} • {activeStudy.clientType}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <Clock className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>{activeStudy.timeline}</span>
              </div>
            </div>

            {/* Study Title & Key Outcome */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
              <div className="lg:col-span-8">
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white leading-snug">
                  {activeStudy.title}
                </h2>
                <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                  {activeStudy.subtitle}
                </p>
              </div>

              <div className="lg:col-span-4 p-5 rounded-2xl bg-[#08080C] border border-[#E5C158]/20 text-center flex flex-col justify-center">
                <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
                  {activeStudy.heroMetricLabel}
                </span>
                <span className="text-3xl sm:text-4xl font-black font-poppins text-[#E5C158] mt-1 block">
                  {activeStudy.heroMetric}
                </span>
              </div>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-[#08080C] border border-white/5">
                <div className="flex items-center gap-2 text-sm font-bold text-red-400 uppercase tracking-wider mb-2">
                  <Target className="w-4 h-4" />
                  <span>The Challenge & Friction Points</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {activeStudy.challenge}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#08080C] border border-white/5">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  <Zap className="w-4 h-4" />
                  <span>The MFS Growth Strategic Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {activeStudy.solution}
                </p>
              </div>
            </div>

            {/* Before vs. After Breakdown */}
            <div className="mb-8 p-6 rounded-2xl bg-[#12121D] border border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#E5C158] mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                <span>Transformation Comparison (Before vs. After)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30">
                  <span className="text-xs font-bold text-red-300 block mb-2">
                    ❌ {activeStudy.beforeAfter.beforeTitle}
                  </span>
                  <div className="space-y-1.5">
                    {activeStudy.beforeAfter.beforePoints.map((pt, i) => (
                      <p key={i} className="text-xs text-neutral-300 leading-relaxed">
                        • {pt}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30">
                  <span className="text-xs font-bold text-emerald-300 block mb-2">
                    ✅ {activeStudy.beforeAfter.afterTitle}
                  </span>
                  <div className="space-y-1.5">
                    {activeStudy.beforeAfter.afterPoints.map((pt, i) => (
                      <p key={i} className="text-xs text-neutral-300 leading-relaxed">
                        • {pt}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Measurable Results & Verified Client Quote */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-8">
              <div className="lg:col-span-7 space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Key Deliverable Outcomes:
                </h3>
                {activeStudy.results.map((res, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 p-5 rounded-2xl bg-[#08080C] border border-white/10 relative">
                <Quote className="w-8 h-8 text-[#E5C158]/20 absolute right-4 top-4" />
                <p className="text-xs text-neutral-300 italic leading-relaxed mb-4">
                  "{activeStudy.clientQuote.text}"
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <img
                    src={activeStudy.clientQuote.avatar}
                    alt={activeStudy.clientQuote.author}
                    className="w-9 h-9 rounded-full object-cover border border-[#E5C158]/40"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {activeStudy.clientQuote.author}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {activeStudy.clientQuote.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
                <span>Verified client project executed under strict NDA guidelines</span>
              </div>

              <button
                onClick={() => onOpenOrderModal(activeStudy.associatedServiceId)}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:from-[#F0D27A] hover:to-[#E5C158] text-black font-bold text-xs sm:text-sm font-poppins transition-all shadow-xl shadow-[#E5C158]/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Request Similar Project Blueprint (50% OFF)</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {/* All Case Studies Browser List */}
        <div>
          <h2 className="text-xl font-bold font-poppins text-white mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#E5C158]" />
            <span>Select a Case Study to Deep-Dive</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filteredStudies.map((study) => (
              <div
                key={study.id}
                onClick={() => setActiveStudyId(study.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer relative ${
                  activeStudyId === study.id
                    ? 'bg-[#141420] border-[#E5C158] shadow-xl'
                    : 'bg-[#0F0F16] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {study.category}
                  </span>
                  <span className="text-xs font-bold text-white font-mono">
                    {study.heroMetric}
                  </span>
                </div>

                <h3 className="text-base font-bold font-poppins text-white mb-2 line-clamp-2 hover:text-[#E5C158] transition-colors">
                  {study.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
                  {study.subtitle}
                </p>

                <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-white/5">
                  <span>{study.clientType}</span>
                  <span className="text-[#E5C158] font-semibold flex items-center gap-1">
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#12121A] via-[#161624] to-[#0A0A10] border border-[#E5C158]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-xs font-bold text-[#E5C158] uppercase tracking-wider block mb-1">
              Start Your Transformation
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-poppins text-white">
              Have a Critical Presentation, Assignment, or Resume?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl leading-relaxed">
              Partner with dedicated designers, ATS specialists, and academic editors. Guaranteed turnaround with our active 50% Grand Launch discount.
            </p>
          </div>

          <button
            onClick={() => onOpenOrderModal()}
            className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:from-[#F0D27A] hover:to-[#E5C158] text-black font-bold text-xs sm:text-sm font-poppins transition-all shadow-xl shadow-[#E5C158]/20 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Start Order (50% OFF)</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
