import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  FileText,
  Presentation,
  BookOpen,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  CheckCircle2,
  Lock,
  Flame,
  ExternalLink,
} from 'lucide-react';

interface ToolsIndexPageProps {
  onNavigatePage: (page: string) => void;
  onOpenOrderModal: (serviceId?: string) => void;
}

const TOOLS = [
  {
    id: 'tool-ats-scanner',
    title: 'ATS Resume Scanner & Keyword Matcher',
    category: 'Career & Employment',
    tagline: 'Test your resume compatibility with recruiter algorithms (Workday, Taleo, Greenhouse).',
    icon: FileText,
    badge: 'Popular Lead Utility',
    route: 'tool-ats-scanner',
    features: [
      'Real-time ATS Compatibility Score (0-100%)',
      'Keyword match density & missing target keywords',
      'Action verb strength & metrics audit',
      '100% Client-Side Privacy (No data stored)',
    ],
    ctaText: 'Launch ATS Scanner',
  },
  {
    id: 'tool-pitch-deck',
    title: 'Pitch Deck & Slide Storyline Architect',
    category: 'Executive & Startups',
    tagline: 'Generate slide-by-slide narrative outlines, data requirements, and layout blueprints.',
    icon: Presentation,
    badge: 'Founder Favorite',
    route: 'tool-pitch-deck',
    features: [
      'Investor, Sales Proposal & Academic Deck frameworks',
      'Adjustable 4 to 12 slide count customizer',
      'Slide-by-slide psychological objectives & prompts',
      'Copy Markdown / Export storyline outline',
    ],
    ctaText: 'Launch Deck Architect',
  },
  {
    id: 'tool-citation-gen',
    title: 'Academic Citation & Reference Formatter',
    category: 'Academic & Research',
    tagline: 'Generate compliant bibliography entries and paired in-text citations in seconds.',
    icon: BookOpen,
    badge: 'Student Essential',
    route: 'tool-citation-gen',
    features: [
      'APA 7th, Harvard, MLA 9th, IEEE & Chicago',
      'Journals, Books, Web Reports & Conferences',
      'Paired parenthetical and narrative in-text citations',
      'Instant copy-to-clipboard formatting',
    ],
    ctaText: 'Launch Citation Formatter',
  },
  {
    id: 'tool-doc-estimator',
    title: 'Document Metric & Turnaround Calculator',
    category: 'Productivity & Planning',
    tagline: 'Calculate page counts, reading durations, speech timing, and dynamic project pricing.',
    icon: Calculator,
    badge: 'Live Calculator',
    route: 'tool-doc-estimator',
    features: [
      'Accurate word-to-page conversion (Single vs Double)',
      'Estimated reading & speech presentation durations',
      'Turnaround speed options (Standard to 12h Rush)',
      'Multi-currency price calculator (PKR, USD, GBP, EUR, AED)',
    ],
    ctaText: 'Launch Metric Calculator',
  },
];

export const ToolsIndexPage: React.FC<ToolsIndexPageProps> = ({
  onNavigatePage,
  onOpenOrderModal,
}) => {
  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <button
            onClick={() => onNavigatePage('home')}
            className="hover:text-[#E5C158] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#E5C158]">Free Tools & Lead Utilities</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Free Student & Professional Utilities Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins text-white tracking-tight leading-tight">
            Interactive Tools & <span className="text-[#E5C158]">Diagnostic Utilities</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
            Free, instant, client-side tools to audit your resume, architect high-converting pitch decks, format academic citations, and calculate document turnaround metrics without requiring any account signup.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Free to Use</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Zero Registration Required</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Client-Side Privacy</span>
            </span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="p-8 rounded-3xl bg-[#0F0F16] border border-white/10 hover:border-[#E5C158]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5C158]/5 rounded-full blur-3xl group-hover:bg-[#E5C158]/15 transition-all duration-500 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#161622] border border-white/10 flex items-center justify-center text-[#E5C158] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/20 px-3 py-1 rounded-full uppercase tracking-wider">
                      {tool.badge}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                    {tool.category}
                  </span>
                  <h3 className="text-xl font-bold font-poppins text-white mb-2 group-hover:text-[#E5C158] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    {tool.tagline}
                  </p>

                  <div className="space-y-2 mb-8 pt-4 border-t border-white/5">
                    {tool.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigatePage(tool.route)}
                  className="w-full py-3.5 px-5 rounded-xl bg-white/5 hover:bg-[#E5C158] text-white hover:text-black border border-white/10 hover:border-[#E5C158] font-bold text-xs sm:text-sm font-poppins transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>{tool.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Why Use Our Free Tools Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F0F16] border border-white/10 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold font-poppins text-white">
              Engineered for Speed, Privacy & Real Results
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Unlike generic online converters that sell your contact details or lock features behind paywalls, MFS Growth tools run directly in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-[#08080C] border border-white/5">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mb-3" />
              <h3 className="text-sm font-bold font-poppins text-white mb-1">Zero Cloud Data Retention</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                All document parsing, keyword audits, and citation formatting occur purely client-side in memory.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#08080C] border border-white/5">
              <Zap className="w-6 h-6 text-[#E5C158] mb-3" />
              <h3 className="text-sm font-bold font-poppins text-white mb-1">Instant Metric Calculation</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Receive live feedback on ATS compatibility, word counts, reading speeds, and pricing in milliseconds.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#08080C] border border-white/5">
              <Award className="w-6 h-6 text-purple-400 mb-3" />
              <h3 className="text-sm font-bold font-poppins text-white mb-1">Direct Agency Execution</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Need professional human design or writing? Seamlessly transfer your specifications into our 24h production queue.
              </p>
            </div>
          </div>
        </div>

        {/* Grand Launch CTA Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#12121A] via-[#161624] to-[#0A0A10] border border-[#E5C158]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E5C158]/10 text-[#E5C158] text-xs font-bold uppercase mb-2">
              <Flame className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>50% Grand Launch Discount Active</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-poppins text-white">
              Ready to Upgrade to Human Specialist Delivery?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl leading-relaxed">
              Experience the power of executive presentation design, ATS resume engineering, academic assignment writing, and corporate document formatting.
            </p>
          </div>

          <button
            onClick={() => onOpenOrderModal()}
            className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:from-[#F0D27A] hover:to-[#E5C158] text-black font-bold text-xs sm:text-sm font-poppins transition-all shadow-xl shadow-[#E5C158]/20 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Start an Order (50% OFF)</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
