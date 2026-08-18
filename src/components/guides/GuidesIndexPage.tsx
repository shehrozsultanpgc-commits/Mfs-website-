import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Clock,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  FileText,
  Presentation,
  GraduationCap,
  Briefcase,
  Sparkles,
  UserCheck,
  Award,
  Layers
} from 'lucide-react';
import { SEOManager } from '../common/SEOManager';

interface GuidesIndexPageProps {
  onNavigatePage?: (page: string) => void;
  onOpenOrderModal?: () => void;
}

export const GuidesIndexPage: React.FC<GuidesIndexPageProps> = ({
  onNavigatePage,
  onOpenOrderModal,
}) => {
  const handleNavClick = (path: string, pageName: string) => {
    if (onNavigatePage) {
      onNavigatePage(pageName);
    } else {
      window.location.href = path;
    }
  };

  const guides = [
    {
      id: 'guide-ats-resume',
      slug: '/guides/ats-resume-engineering',
      pageKey: 'guide-ats-resume',
      title: 'ATS Resume Engineering Master Guide',
      subtitle: 'How Applicant Tracking Systems Parse & Rank Resumes',
      summary:
        'A comprehensive technical breakdown of how ATS parsing engines process candidate data, tokenize employment history, and score resumes against job descriptions. Includes single-column layout principles and a 10-point checklist.',
      category: 'Resume & Career Engineering',
      icon: FileText,
      readTime: '12 Min Read',
      badge: 'Recruiter Filter Standards',
      updated: 'August 2026',
      topics: [
        'Single-column vs multi-column parsing',
        'Keyword density & contextual placement',
        'Font & file format compliance (.docx vs .pdf)',
        '10-Point Pre-Submission Quality Checklist'
      ]
    },
    {
      id: 'guide-pitch-deck',
      slug: '/guides/executive-pitch-deck-structure',
      pageKey: 'guide-pitch-deck',
      title: 'Executive Pitch Deck Structure Guide',
      subtitle: 'The Essential 10-Slide Investor Presentation Framework',
      summary:
        'Master the industry-standard 10-slide pitch deck architecture used by venture-backed startups and corporate executives. Learn slide sequencing, data chart clarity, visual hierarchy, and investor storytelling mechanics.',
      category: 'Presentation & Deck Design',
      icon: Presentation,
      readTime: '14 Min Read',
      badge: 'Investor Deck Standard',
      updated: 'February 2026',
      topics: [
        'The 10-slide narrative sequence',
        'Visual hierarchy & contrast math',
        'Financial chart legibility & legibility rules',
        'Common deck pitfalls & how to avoid them'
      ]
    },
    {
      id: 'guide-academic-formatting',
      slug: '/guides/academic-formatting-citation',
      pageKey: 'guide-academic-formatting',
      title: 'Academic Formatting & Citation Standards Guide',
      subtitle: 'Mastering APA 7th, Harvard, MLA, IEEE & Oxford',
      summary:
        'An essential reference manual for academic writing and citation rigor. Covers structural rules, parenthetical citations, reference lists, literature review design, and plagiarism mitigation across top referencing styles.',
      category: 'Academic Research & Writing',
      icon: GraduationCap,
      readTime: '15 Min Read',
      badge: 'Academic Citation Standard',
      updated: 'February 2026',
      topics: [
        'APA 7th edition vs Harvard vs MLA rules',
        'IEEE numerical & Oxford footnote formatting',
        'Literature review synthesis frameworks',
        'Avoiding accidental citation errors'
      ]
    },
    {
      id: 'guide-corporate-report',
      slug: '/guides/corporate-report-formatting-standards',
      pageKey: 'guide-corporate-report',
      title: 'Corporate Report Formatting Standards Guide',
      subtitle: 'Executive Document Structure, Typography & Layout',
      summary:
        'A practical guide to structuring high-stakes corporate reports, whitepapers, and business proposals. Features standards for executive summaries, data table alignment, header hierarchies, and publication-ready formatting.',
      category: 'Corporate Document Formatting',
      icon: Briefcase,
      readTime: '13 Min Read',
      badge: 'Executive Report Standard',
      updated: 'February 2026',
      topics: [
        'Executive summary distillation principles',
        'Typography, leading, & margin grid system',
        'Data table & chart formatting guidelines',
        'Quality-control checklist for executive distribution'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-20 font-sans selection:bg-[#E5C158]/30 selection:text-[#E5C158]">
      <SEOManager currentPage="guides" />

      {/* Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#E5C158]/10 via-[#E5C158]/05 to-transparent blur-[120px] opacity-60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#9FA0A7] font-mono">
          <button
            onClick={() => handleNavClick('/', 'home')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-[#9FA0A7]/50" />
          <span className="text-[#E5C158]">Knowledge & Resource Guides</span>
        </nav>

        {/* Header Section */}
        <header className="mb-12 border-b border-white/10 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-mono font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>MFS GROWTH KNOWLEDGE HUB</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-white tracking-tight leading-tight mb-6">
            Expert Knowledge &{' '}
            <span className="gold-text-gradient">Resource Guides</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#9FA0A7] leading-relaxed max-w-3xl mb-8 font-light">
            In-depth technical breakdowns, industry formatting standards, and executive frameworks authored and reviewed by our senior domain specialists to help students and professionals excel.
          </p>

          {/* Author Attribution Banner */}
          <div className="glass-card rounded-xl p-4 sm:p-5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0F0F12] via-[#08080C] to-[#0F0F12]">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#E5C158]/20 to-[#E5C158]/40 border border-[#E5C158]/50 flex items-center justify-center text-[#E5C158] font-bold text-sm shrink-0 font-poppins shadow-md shadow-[#E5C158]/10">
                MS
              </div>
              <div>
                <div className="text-xs text-[#9FA0A7] font-mono flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#28C76F]" />
                  <span>Authored & Editorial Reviewer</span>
                </div>
                <div className="text-sm font-semibold text-white font-poppins flex flex-wrap items-center gap-2">
                  <span>Muhammad Shehroz Sultan</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 font-mono font-normal">
                    Founder & Lead Director
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-[#9FA0A7]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
                100% Peer-Verified Standards
              </span>
            </div>
          </div>
        </header>

        {/* Guides Grid */}
        <section className="space-y-8 mb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-poppins text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#E5C158]" />
              Master Reference Guides
            </h2>
            <span className="text-xs font-mono text-[#9FA0A7]">
              Showing {guides.length} Published Master Guides
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide) => {
              const IconComp = guide.icon;
              return (
                <article
                  key={guide.id}
                  className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#E5C158]/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-[#E5C158]/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E5C158]/20 to-transparent group-hover:via-[#E5C158] transition-all" />

                  <div>
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between gap-2 mb-4 text-xs font-mono text-[#9FA0A7]">
                      <span className="px-2.5 py-1 rounded-md bg-white/05 border border-white/10 text-[#E5C158] font-medium flex items-center gap-1.5">
                        <IconComp className="w-3.5 h-3.5" />
                        {guide.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#E5C158]" />
                        {guide.readTime}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl sm:text-2xl font-bold font-poppins text-white group-hover:text-[#E5C158] transition-colors mb-2 leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-[#E5C158]/80 font-mono mb-4">
                      {guide.subtitle}
                    </p>

                    <p className="text-sm text-[#9FA0A7] leading-relaxed mb-6 font-light">
                      {guide.summary}
                    </p>

                    {/* Key Topics List */}
                    <div className="mb-6 pt-4 border-t border-white/05">
                      <h4 className="text-xs font-mono text-white/70 uppercase tracking-wider mb-2.5">
                        Key Coverage:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#9FA0A7]">
                        {guide.topics.map((topic, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer Link Button */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#9FA0A7]/70">
                      Updated {guide.updated}
                    </span>
                    <button
                      onClick={() => handleNavClick(guide.slug, guide.pageKey)}
                      className="px-4 py-2 rounded-xl bg-[#E5C158]/10 hover:bg-[#E5C158] text-[#E5C158] hover:text-black font-semibold text-xs transition-all border border-[#E5C158]/30 flex items-center gap-1.5 cursor-pointer font-poppins"
                    >
                      <span>Read Master Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Agency CTA Section */}
        <section className="glass-card rounded-2xl p-8 sm:p-10 border border-[#E5C158]/30 bg-gradient-to-br from-[#0F0F12] via-[#050507] to-[#121218] relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#E5C158]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CUSTOM PROFESSIONAL SERVICES</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-white mb-4">
              Need Tailored Execution for Your Assignment, Presentation or Resume?
            </h3>

            <p className="text-sm text-[#9FA0A7] leading-relaxed mb-6">
              Our dedicated specialists handle presentation design, academic assignment assistance, ATS resume engineering, and report formatting with 100% adherence to international standards.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  if (onOpenOrderModal) {
                    onOpenOrderModal();
                  } else {
                    handleNavClick('/order', 'order');
                  }
                }}
                className="px-6 py-3 rounded-xl bg-[#E5C158] hover:bg-[#D4AF37] text-black font-semibold text-sm transition-all shadow-lg shadow-[#E5C158]/20 flex items-center gap-2 cursor-pointer font-poppins"
              >
                <span>Book Order (50% OFF Active)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavClick('/services', 'services')}
                className="px-6 py-3 rounded-xl glass-card hover:bg-white/10 text-white font-medium text-sm transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
              >
                <span>View All Services</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GuidesIndexPage;
