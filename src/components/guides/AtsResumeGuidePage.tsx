import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Search,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  Target,
  Globe2,
  ListChecks,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
  ChevronRight,
  Share2,
  Check,
  Building2,
  Cpu,
  Layers,
  HelpCircle,
  FileCheck,
  ExternalLink,
  Award,
  Zap,
} from 'lucide-react';

interface AtsResumeGuidePageProps {
  onOpenOrderModal?: () => void;
  onNavigatePage?: (page: string) => void;
}

export const AtsResumeGuidePage: React.FC<AtsResumeGuidePageProps> = ({
  onOpenOrderModal,
  onNavigatePage,
}) => {
  // Checklist state for Section 7
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleChecklist = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const checklistPoints = [
    {
      id: 1,
      title: 'Standard Readable Typography',
      desc: 'Resume uses a clean system font such as Arial, Calibri, Helvetica, Georgia, or Garamond at 10–12pt body size.',
    },
    {
      id: 2,
      title: 'Clear Linear Structure',
      desc: 'Main body content follows a single-column, top-to-bottom layout without complex sidebars or floating frames.',
    },
    {
      id: 3,
      title: 'Conventional Section Headings',
      desc: 'Section titles use exact standard labels like "Professional Experience", "Education", "Core Skills", and "Certifications".',
    },
    {
      id: 4,
      title: 'Machine-Readable Contact Details',
      desc: 'Email, phone number, location, and LinkedIn URL are placed in the main body text rather than header/footer regions.',
    },
    {
      id: 5,
      title: 'Consistent Date Formats',
      desc: 'Employment and education dates follow a uniform structure (e.g., "MM/YYYY – MM/YYYY" or "Month YYYY – Present").',
    },
    {
      id: 6,
      title: 'Text-Based Skill Representation',
      desc: 'Skills are written out as plain text or bullet points rather than graphic progress bars, star ratings, or icons.',
    },
    {
      id: 7,
      title: 'No Embedded Text Images',
      desc: 'Critical information is written in selectable document text rather than embedded raster images or vector graphics.',
    },
    {
      id: 8,
      title: 'Contextual Keyword Alignment',
      desc: 'Key technical and functional terms from the target job posting are naturally integrated into bulleted achievements.',
    },
    {
      id: 9,
      title: 'Clean Formatting Consistency',
      desc: 'Margins, bullet points, spacing, and font weight hierarchies remain identical across all document sections.',
    },
    {
      id: 10,
      title: 'File Format Verification',
      desc: 'The document is saved in `.docx` or searchable `.pdf` format and verified by highlighting and copying sample text.',
    },
  ];

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const completionPercentage = Math.round((checkedCount / checklistPoints.length) * 100);

  const tableOfContents = [
    { id: 'overview', title: 'What is an ATS?' },
    { id: 'parsing-flow', title: 'ATS Parsing Workflow' },
    { id: 'layout-risks', title: 'Multi-Column & Graphic Risks' },
    { id: 'gold-standards', title: '5 Gold Standards' },
    { id: 'keyword-tailoring', title: 'Keyword Alignment' },
    { id: 'regional-markets', title: 'CV vs Resume Markets' },
    { id: 'pre-submission-checklist', title: '10-Point Checklist' },
    { id: 'common-mistakes', title: 'Common Mistakes' },
    { id: 'recommended-format', title: 'Recommended Format' },
    { id: 'final-quality-check', title: 'Final Quality Check' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (path: string, pageName?: string) => {
    if (onNavigatePage && pageName) {
      onNavigatePage(pageName);
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-20 font-sans selection:bg-[#E5C158]/30 selection:text-[#E5C158]">
      {/* Background Decorative Glow */}
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
          <button
            onClick={() => handleNavClick('/guides', 'guides')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Guides
          </button>
          <ChevronRight className="w-3 h-3 text-[#9FA0A7]/50" />
          <span className="text-[#E5C158] truncate">ATS Resume Engineering Master Guide</span>
        </nav>

        {/* Article Header */}
        <header className="mb-12 border-b border-white/10 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-mono font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>INFORMATIONAL MASTER GUIDE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-white tracking-tight leading-tight mb-6">
            ATS Resume Engineering Master Guide:{' '}
            <span className="gold-text-gradient">
              How Applicant Tracking Systems Parse Your Resume
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#9FA0A7] leading-relaxed max-w-4xl mb-8 font-light">
            A comprehensive, practical breakdown of how ATS software extracts candidate data,
            why visual design elements can impact machine readability, and how to structure
            your resume for optimal parser accuracy in international job markets.
          </p>

          {/* Article Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9FA0A7] pt-4 border-t border-white/05">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#E5C158]" />
                12 Min Read
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
                Fact-Checked & Verified
              </span>
              <span className="hidden sm:inline-block text-[#9FA0A7]/40">•</span>
              <span className="hidden sm:inline-block">Updated February 2026</span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/05 hover:bg-white/10 border border-white/10 text-white text-xs transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#28C76F]" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Share Guide</span>
                </>
              )}
            </button>
          </div>

          {/* Top Author Attribution Block */}
          <div className="mt-6 pt-4 border-t border-white/05 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#E5C158]/20 border border-[#E5C158]/40 flex items-center justify-center text-[#E5C158] font-bold text-xs shrink-0 font-poppins">
              MS
            </div>
            <div className="text-xs">
              <span className="text-[#9FA0A7] block font-mono">Written & Reviewed by</span>
              <span className="font-semibold text-white font-poppins flex flex-wrap items-center gap-2">
                Muhammad Shehroz Sultan
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 font-mono font-normal">
                  Founder & Lead Director, MFS Growth Agency
                </span>
              </span>
            </div>
          </div>
        </header>

        {/* Reading Intent Summary Box */}
        <section className="mb-12 glass-card rounded-2xl p-6 sm:p-8 border-l-4 border-l-[#E5C158]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#E5C158]/10 text-[#E5C158] shrink-0 hidden sm:block">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold font-poppins text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E5C158] sm:hidden" />
                Guide Scope & Objective
              </h2>
              <p className="text-sm text-[#9FA0A7] leading-relaxed">
                This guide provides an objective technical analysis of Applicant Tracking Systems
                (ATS). It explains how parsing engines ingest document code, tokenize employment
                data, and rank candidate profiles against job postings. Learn how to format your
                experience cleanly for both automated ATS scanners and human recruitment managers.
              </p>
            </div>
          </div>
        </section>

        {/* Layout Grid: Sticky TOC + Main Article */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28 glass-card rounded-xl p-5 border border-white/10">
              <h3 className="text-xs font-mono font-bold text-[#E5C158] uppercase tracking-wider mb-4 flex items-center gap-2">
                <ListChecks className="w-4 h-4" />
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {tableOfContents.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-[#9FA0A7] hover:text-white hover:bg-white/05 transition-all flex items-center gap-2 cursor-pointer group"
                  >
                    <span className="font-mono text-[10px] text-[#9FA0A7]/50 group-hover:text-[#E5C158]">
                      0{idx + 1}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-5 border-t border-white/10 text-center">
                <p className="text-[11px] text-[#9FA0A7] mb-3">Looking for tailored ATS resume writing?</p>
                <button
                  onClick={() => handleNavClick('/services#resumes', 'services')}
                  className="w-full py-2 px-3 rounded-lg bg-[#E5C158]/10 hover:bg-[#E5C158]/20 border border-[#E5C158]/30 text-[#E5C158] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore ATS Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Column */}
          <main className="lg:col-span-9 space-y-16 text-slate-200 leading-relaxed">
            {/* INTRODUCTION */}
            <section id="overview" className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  OVERVIEW
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Introduction: What is an ATS & Why Does it Matter?
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#9FA0A7]">
                <p>
                  An <strong className="text-white">Applicant Tracking System (ATS)</strong> is a software application that enables employers to manage recruitment workflows electronically. From job post creation to initial candidate screening and interview scheduling, ATS platforms serve as the central nervous system for modern corporate hiring.
                </p>
                <p>
                  Over <strong className="text-white">98% of Fortune 500 companies</strong> and a growing majority of mid-sized enterprises rely on ATS platforms to manage high application volumes. When hundreds or thousands of candidates apply for a single role, human recruiters cannot manually read every document. Instead, the ATS ingests submitted files, parses text into standard candidate profile fields, and allows recruiters to search, filter, and rank applicants based on specific criteria.
                </p>
              </div>

              {/* Contrast Callout */}
              <div className="my-6 p-5 glass-card rounded-xl border border-white/10 bg-gradient-to-r from-white/[0.01] to-white/[0.03]">
                <h3 className="text-sm font-semibold text-[#E5C158] mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  The Visual vs. Machine Readability Dilemma
                </h3>
                <p className="text-xs sm:text-sm text-[#9FA0A7] leading-relaxed">
                  A resume can look visually stunning to a human designer—featuring multi-column layouts, progress meters, custom icons, and background colors. However, to an ATS parsing engine, that same document can become an unreadable scramble of broken text blocks, dropped contact details, or missing work history. True ATS engineering balances <strong className="text-white">machine parseability</strong> with <strong className="text-white">human visual polish</strong>.
                </p>
              </div>
            </section>

            {/* SECTION 1: WHAT IS AN APPLICANT TRACKING SYSTEM (ATS)? */}
            <section id="what-is-ats" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 01
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  What is an Applicant Tracking System (ATS)?
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#9FA0A7]">
                <p>
                  At its core, an ATS functions as a database and document parsing engine. When you submit your resume on a corporate career portal or job platform, the ATS executes the following core operations:
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
                  {[
                    { title: 'Resume Ingestion', desc: 'Accepts uploaded PDF or Word files and stores them in candidate repositories.' },
                    { title: 'Text Extraction', desc: 'Strips binary layout data to isolate raw textual characters.' },
                    { title: 'Section Recognition', desc: 'Identifies standard sections like Work Experience, Education, and Skills.' },
                    { title: 'Keyword Matching', desc: 'Compares extracted resume vocabulary against the job description.' },
                    { title: 'Candidate Filtering', desc: 'Filters out applicants lacking mandatory qualifications or keywords.' },
                    { title: 'Recruiter Review', desc: 'Presents structured digital candidate profiles for fast human evaluation.' },
                  ].map((item, i) => (
                    <li key={i} className="p-4 glass-card rounded-xl border border-white/10 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white mb-1 font-poppins">{item.title}</h4>
                        <p className="text-xs text-[#9FA0A7]">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <p>
                  Common ATS software platforms deployed across major industries include:
                </p>

                {/* Popular ATS Systems Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                  {[
                    { name: 'Taleo (Oracle)', category: 'Enterprise Corporate' },
                    { name: 'Workday', category: 'Global Fortune 500' },
                    { name: 'Greenhouse', category: 'Tech & Scale-Ups' },
                    { name: 'Lever', category: 'Modern Hiring' },
                    { name: 'BambooHR', category: 'Mid-Market HR' },
                    { name: 'iCIMS', category: 'High-Volume Enterprise' },
                    { name: 'SmartRecruiters', category: 'Global Talent' },
                    { name: 'Jobvite', category: 'Corporate Recruitment' },
                  ].map((ats, idx) => (
                    <div key={idx} className="p-3 bg-white/[0.02] rounded-lg border border-white/05 text-center">
                      <p className="text-xs font-semibold text-white">{ats.name}</p>
                      <p className="text-[10px] text-[#9FA0A7] font-mono mt-0.5">{ats.category}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#9FA0A7] italic">
                  Note: ATS implementations vary significantly based on employer configurations, software versions, and custom parsing parameters. No single algorithm governs all ATS platforms identically.
                </p>
              </div>
            </section>

            {/* SECTION 2: HOW ATS RESUME PARSING WORKS */}
            <section id="parsing-flow" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 02
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  How ATS Resume Parsing Works (10-Step Workflow)
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#9FA0A7] mb-6">
                To engineer an ATS-friendly document, it helps to understand the exact sequential pipeline your resume passes through upon submission:
              </p>

              {/* Timeline Steps */}
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Document Ingestion', desc: 'The candidate uploads a file (.pdf or .docx) via a job portal form.' },
                  { step: '02', title: 'Text Stream Extraction', desc: 'The parsing engine strips binary layout codes, extracting unformatted character streams.' },
                  { step: '03', title: 'Section Segmentation', desc: 'Parsing logic scans for recognized structural headers like "Work Experience" or "Education".' },
                  { step: '04', title: 'Contact Detection', desc: 'Algorithms locate phone numbers, email addresses, LinkedIn URLs, and geographic location.' },
                  { step: '05', title: 'Employment History Parsing', desc: 'The engine tokenizes job titles, employer names, start/end dates, and bulleted achievements.' },
                  { step: '06', title: 'Education & Credential Extraction', desc: 'Degrees, academic institutions, graduation years, and certifications are categorized.' },
                  { step: '07', title: 'Skills Taxonomy Matching', desc: 'Extracted text is cross-checked against internal dictionaries of technical and domain skills.' },
                  { step: '08', title: 'Contextual Keyword Scoring', desc: 'Keywords are evaluated for frequency, relevance, and placement within accomplishment statements.' },
                  { step: '09', title: 'Candidate Ranking / Tiering', desc: 'The system assigns a match score or groups candidates into qualified vs un-qualified queues.' },
                  { step: '10', title: 'Recruiter Dashboard Display', desc: 'The recruiter views both the parsed digital candidate record and the original uploaded document.' },
                ].map((item) => (
                  <div key={item.step} className="p-4 glass-card rounded-xl border border-white/10 flex items-start gap-4">
                    <span className="font-mono text-sm font-bold text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-1 rounded shrink-0 border border-[#E5C158]/20">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white font-poppins mb-1">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-[#9FA0A7]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 3: WHY MULTI-COLUMN AND GRAPHIC-HEAVY RESUMES CAN CAUSE PROBLEMS */}
            <section id="layout-risks" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 03
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Why Multi-Column & Graphic Layouts Create Parsing Challenges
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#9FA0A7]">
                <p>
                  A common cause of parsing failure is non-standard document layout. While two-column or graphic-heavy layouts may look visually compact, older or legacy ATS parsers extract text in a continuous horizontal line across the entire page width.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  {/* Left: Graphic Problem */}
                  <div className="p-5 glass-card rounded-xl border border-red-500/20 bg-red-500/[0.02]">
                    <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2 font-poppins">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      Parsing Pitfalls in Graphic Layouts
                    </h3>
                    <ul className="space-y-2 text-xs text-[#9FA0A7]">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong className="text-white">Column Merging:</strong> Left and right columns extracted linearly, scrambling job titles with skill lists.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong className="text-white">Invisible Text in Graphics:</strong> Text saved inside images or flattened vectors cannot be OCR-extracted by standard parsers.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong className="text-white">Icon Labels:</strong> Replacing "Phone:" or "Email:" with decorative icons leads to dropped contact fields.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong className="text-white">Header/Footer Exclusion:</strong> Contact details placed in Word headers/footers are frequently skipped.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Right: Single Column Advantage */}
                  <div className="p-5 glass-card rounded-xl border border-[#28C76F]/20 bg-[#28C76F]/[0.02]">
                    <h3 className="text-sm font-bold text-[#28C76F] mb-3 flex items-center gap-2 font-poppins">
                      <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
                      Single-Column Engineering Advantages
                    </h3>
                    <ul className="space-y-2 text-xs text-[#9FA0A7]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#28C76F]">•</span>
                        <span><strong className="text-white">Predictable Flow:</strong> Top-to-bottom, left-to-right text ordering guarantees clean section recognition.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#28C76F]">•</span>
                        <span><strong className="text-white">Selectable Raw Text:</strong> Pure character data ensures 100% token extraction without missing keywords.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#28C76F]">•</span>
                        <span><strong className="text-white">Standard Headers:</strong> Clear text headings enable precise taxonomy categorizations.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#28C76F]">•</span>
                        <span><strong className="text-white">Universal Compatibility:</strong> Works reliably across older legacy systems (Taleo) and modern cloud platforms.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-xs text-[#9FA0A7]">
                  <em>Note: Modern parsers like Greenhouse and Lever handle modern two-column PDFs better than legacy software. However, single-column design remains the safest universal standard across all hiring systems.</em>
                </p>
              </div>
            </section>

            {/* SECTION 4: THE 5 GOLD STANDARDS OF ATS-FRIENDLY RESUME ENGINEERING */}
            <section id="gold-standards" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 04
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  The 5 Gold Standards of ATS-Friendly Resume Engineering
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    num: '01',
                    title: 'Clean Single-Column Structure',
                    why: 'Eliminates structural ambiguity during automated text extraction and preserves chronological employment order.',
                    advice: 'Structure sections vertically in order: Contact Info -> Professional Summary -> Core Skills -> Experience -> Education -> Certifications.',
                    bestPractice: 'Use standard page margins (0.5" to 1") and avoid floating text boxes, tables, or sidebars.',
                  },
                  {
                    num: '02',
                    title: 'Standard Readable Typography',
                    why: 'Ensures font glyphs map directly to standard Unicode characters during text stream extraction.',
                    advice: 'Stick to cross-platform standard fonts: Arial, Calibri, Helvetica, Georgia, Garamond, or Times New Roman.',
                    bestPractice: 'Maintain font sizes between 10pt–12pt for body text and 14pt–16pt for section headings.',
                  },
                  {
                    num: '03',
                    title: 'Conventional Section Headings',
                    why: 'Parsing engines rely on exact keyword dictionaries to categorize document text into candidate database fields.',
                    advice: 'Use clear, unadorned labels: "Professional Experience", "Education", "Core Skills", "Certifications".',
                    bestPractice: 'Avoid creative labels like "Where I Have Been", "My Stack", or "My Journey".',
                  },
                  {
                    num: '04',
                    title: 'Machine-Readable Text Formatting',
                    why: 'Text inside flattened image elements or canvas shapes is completely invisible to standard text parsers.',
                    advice: 'Save final documents directly from Microsoft Word (.docx) or export as a searchable PDF with selectable text.',
                    bestPractice: 'Test your document: Highlight text with your cursor, copy it, and paste it into a plain text editor to verify formatting.',
                  },
                  {
                    num: '05',
                    title: 'Contextual Keyword & Skills Alignment',
                    why: 'Matching job description vocabulary increases semantic relevance scores in automated screening tools.',
                    advice: 'Naturally integrate key technical skills, certifications, and methodology terms directly into achievement bullet points.',
                    bestPractice: 'Provide measurable outcomes (e.g. "Increased sales by 35%") rather than listing isolated, uncontextualized keywords.',
                  },
                ].map((standard) => (
                  <div key={standard.num} className="p-6 glass-card rounded-2xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#E5C158]/05 rounded-bl-full pointer-events-none" />
                    
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-sm font-bold text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-1 rounded border border-[#E5C158]/20">
                        STANDARD {standard.num}
                      </span>
                      <h3 className="text-xl font-bold font-poppins text-white">{standard.title}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs sm:text-sm">
                      <div className="bg-white/[0.02] p-4 rounded-xl border border-white/05">
                        <p className="font-mono text-[11px] text-[#E5C158] uppercase mb-1">Why It Matters</p>
                        <p className="text-[#9FA0A7]">{standard.why}</p>
                      </div>
                      <div className="bg-white/[0.02] p-4 rounded-xl border border-white/05">
                        <p className="font-mono text-[11px] text-[#E5C158] uppercase mb-1">Implementation Advice</p>
                        <p className="text-[#9FA0A7]">{standard.advice}</p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-lg bg-[#E5C158]/05 border border-[#E5C158]/20 flex items-center gap-2 text-xs text-[#E5C158]">
                      <Zap className="w-4 h-4 shrink-0" />
                      <span><strong>Best Practice:</strong> {standard.bestPractice}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: KEYWORD ALIGNMENT & ROLE-SPECIFIC TAILORING */}
            <section id="keyword-tailoring" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 05
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Keyword Alignment & Role-Specific Tailoring
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#9FA0A7]">
                <p>
                  Keyword alignment involves reviewing a target job posting, identifying high-frequency technical and functional requirements, and ensuring your resume reflects those qualifications accurately.
                </p>

                <div className="p-6 glass-card rounded-2xl border border-white/10 my-6">
                  <h3 className="text-base font-bold text-white font-poppins mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#E5C158]" />
                    Comparative Example: Keyword Optimization
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm">
                    <div className="p-3 bg-white/[0.03] rounded-lg border border-white/10">
                      <span className="font-mono text-[11px] text-[#E5C158] uppercase">Target Job Specification:</span>
                      <p className="text-white font-medium mt-1">"Requires project management, stakeholder communication, and Agile methodology experience."</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-500/[0.03] border border-red-500/20 rounded-xl">
                        <span className="font-mono text-[11px] text-red-400 font-bold block mb-1">❌ Weak / Generic Approach:</span>
                        <p className="text-[#9FA0A7]">"Experienced professional with strong organizational skills and team leadership abilities across projects."</p>
                        <p className="text-[11px] text-red-400/80 mt-2"><em>Issue: Misses exact key terminology like "Agile" and "Stakeholder Communication".</em></p>
                      </div>

                      <div className="p-4 bg-[#28C76F]/[0.03] border border-[#28C76F]/20 rounded-xl">
                        <span className="font-mono text-[11px] text-[#28C76F] font-bold block mb-1">✅ Optimized / Contextual Approach:</span>
                        <p className="text-[#9FA0A7]">"Managed Agile project workflows and coordinated cross-functional stakeholder communication to deliver enterprise deliverables on schedule."</p>
                        <p className="text-[11px] text-[#28C76F]/80 mt-2"><em>Advantage: Contextual, naturally integrated, and matches target terminology.</em></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/05 border border-amber-500/20 text-xs sm:text-sm text-[#9FA0A7]">
                  <strong className="text-amber-400">Important Note on Keyword Stuffing:</strong> Never repeat keywords artificially or paste hidden white text in page margins. Modern ATS engines and recruiters flag uncontextualized keyword blocks, which degrades candidate credibility during human review.
                </div>
              </div>
            </section>

            {/* SECTION 6: CV VS RESUME: US, UK, GULF, AND PAKISTAN MARKETS */}
            <section id="regional-markets" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 06
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  CV vs. Resume: US, UK, Gulf, & Pakistan Markets
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#9FA0A7] mb-6">
                Recruitment expectations and document formatting conventions vary across international job markets. Understanding these nuances prevents regional formatting errors:
              </p>

              {/* Regional Comparison Table */}
              <div className="overflow-x-auto my-6">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] text-[#E5C158] font-mono">
                      <th className="p-3">Region</th>
                      <th className="p-3">Term Used</th>
                      <th className="p-3">Length</th>
                      <th className="p-3">Photo Policy</th>
                      <th className="p-3">Key Formatting Focus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/05 text-[#9FA0A7]">
                    <tr className="hover:bg-white/[0.01]">
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-[#E5C158]" />
                        United States
                      </td>
                      <td className="p-3 font-mono">Resume</td>
                      <td className="p-3">1–2 Pages</td>
                      <td className="p-3 text-red-400 font-medium">No Photo (Anti-Bias)</td>
                      <td className="p-3">Strict accomplishment metrics, bullet points, no personal details (age, marital status).</td>
                    </tr>
                    <tr className="hover:bg-white/[0.01]">
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-[#E5C158]" />
                        United Kingdom
                      </td>
                      <td className="p-3 font-mono">CV</td>
                      <td className="p-3">2 Pages</td>
                      <td className="p-3">Rarely Included</td>
                      <td className="p-3">Personal profile summary, career history in reverse chronological order, key skills block.</td>
                    </tr>
                    <tr className="hover:bg-white/[0.01]">
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-[#E5C158]" />
                        Gulf Region (UAE, KSA)
                      </td>
                      <td className="p-3 font-mono">CV / Resume</td>
                      <td className="p-3">2–3 Pages</td>
                      <td className="p-3 text-[#28C76F] font-medium">Often Preferred</td>
                      <td className="p-3">Detailed scope, nationality/visa status often requested in regional postings, formal tone.</td>
                    </tr>
                    <tr className="hover:bg-white/[0.01]">
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-[#E5C158]" />
                        Pakistan & South Asia
                      </td>
                      <td className="p-3 font-mono">CV / Resume</td>
                      <td className="p-3">2 Pages</td>
                      <td className="p-3">Optional / Standard</td>
                      <td className="p-3">Comprehensive academic record, technical competencies, clear professional experience.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-[#9FA0A7]">
                <em>Always verify specific guidelines in the official job advertisement. Employer instructions supersede general regional conventions.</em>
              </p>
            </section>

            {/* SECTION 7: 10-POINT ATS PRE-SUBMISSION CHECKLIST */}
            <section id="pre-submission-checklist" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 07
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  10-Point ATS Pre-Submission Checklist
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#9FA0A7] mb-6">
                Interactive verification tool: Check each item below before submitting your document to an employer portal.
              </p>

              {/* Progress Bar */}
              <div className="glass-card p-4 rounded-xl border border-white/10 mb-6">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#9FA0A7]">Checklist Completion:</span>
                  <span className="text-[#E5C158] font-bold">{checkedCount} / 10 ({completionPercentage}%)</span>
                </div>
                <div className="w-full h-2 bg-white/05 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E5C158] to-[#28C76F] transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Interactive Checklist Items */}
              <div className="space-y-3">
                {checklistPoints.map((point) => {
                  const isChecked = !!checkedItems[point.id];
                  return (
                    <div
                      key={point.id}
                      onClick={() => toggleChecklist(point.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                        isChecked
                          ? 'bg-[#28C76F]/[0.05] border-[#28C76F]/30 text-white'
                          : 'glass-card border-white/10 text-[#9FA0A7] hover:border-white/20 hover:bg-white/[0.03]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked ? 'bg-[#28C76F] text-black' : 'border border-white/20 bg-white/05'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold font-poppins mb-0.5 ${isChecked ? 'text-white line-through opacity-80' : 'text-white'}`}>
                          {point.id}. {point.title}
                        </h4>
                        <p className="text-xs text-[#9FA0A7]">{point.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 8: COMMON ATS RESUME MISTAKES */}
            <section id="common-mistakes" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 08
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  10 Common ATS Resume Mistakes
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Graphic & Diagram Layouts', mistake: 'Using charts or progress bars for skills.', fix: 'Write skills out in plain bulleted text.' },
                  { title: 'Non-Standard Headers', mistake: 'Naming sections "My Story" or "Tech Toolbox".', fix: 'Use standard labels like "Core Skills".' },
                  { title: 'Icon-Only Labels', mistake: 'Replacing phone/email text with graphics.', fix: 'Include clear text labels ("Phone: ...").' },
                  { title: 'Keyword Stuffing', mistake: 'Pasting invisible white text or repeating words.', fix: 'Integrate terms naturally in bullet points.' },
                  { title: 'Vague Achievements', mistake: 'Listing duties without measurable results.', fix: 'Include metrics (%, $, scale, team size).' },
                  { title: 'Inconsistent Dates', mistake: 'Mixing "2022" and "01/15/2022" across roles.', fix: 'Use a consistent format throughout.' },
                  { title: 'Nested Tables', mistake: 'Using tables for complex page positioning.', fix: 'Use simple single-column layout flow.' },
                  { title: 'Custom Web Fonts', mistake: 'Using rare or decorative typography.', fix: 'Use standard fonts like Arial or Calibri.' },
                  { title: 'Missing Key Vocabulary', mistake: 'Ignoring technical requirements from job post.', fix: 'Tailor resume keywords per application.' },
                  { title: 'One Generic Version', mistake: 'Sending identical resume for diverse roles.', fix: 'Tailor summary & skills per target posting.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 glass-card rounded-xl border border-white/10">
                    <h3 className="text-xs font-bold text-white font-poppins mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      {idx + 1}. {item.title}
                    </h3>
                    <p className="text-xs text-red-400/90 mb-1"><strong>Pitfall:</strong> {item.mistake}</p>
                    <p className="text-xs text-[#28C76F]"><strong>Fix:</strong> {item.fix}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: ATS-FRIENDLY RESUME QUICK FORMAT */}
            <section id="recommended-format" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 09
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  ATS-Friendly Resume Quick Structure
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#9FA0A7] mb-6">
                Below is a battle-tested structural template for optimal ATS parsing and clean human readability:
              </p>

              {/* Structure Code Card */}
              <div className="p-6 glass-card rounded-2xl border border-white/10 font-mono text-xs text-slate-300 space-y-4">
                <div className="text-center pb-4 border-b border-white/10">
                  <p className="text-white font-bold text-sm">[FULL NAME]</p>
                  <p className="text-[#9FA0A7] text-[11px] mt-1">City, Country | Phone Number | Professional Email | LinkedIn URL</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-[#E5C158] font-bold">PROFESSIONAL SUMMARY</p>
                    <p className="text-[#9FA0A7] text-[11px] mt-0.5">[3-4 line summary highlighting core qualifications, key industry experience, and major value proposition.]</p>
                  </div>

                  <div>
                    <p className="text-[#E5C158] font-bold">CORE SKILLS & COMPETENCIES</p>
                    <p className="text-[#9FA0A7] text-[11px] mt-0.5">• Technical Skills: [Skill 1, Skill 2, Skill 3] | Methodology: [Agile, Scrum] | Software: [Tools]</p>
                  </div>

                  <div>
                    <p className="text-[#E5C158] font-bold">PROFESSIONAL EXPERIENCE</p>
                    <div className="pl-3 border-l border-white/10 space-y-2 mt-1">
                      <p className="text-white font-semibold">[JOB TITLE] — [COMPANY NAME] | [City, Country] <span className="text-[#9FA0A7] font-normal">(MM/YYYY – MM/YYYY)</span></p>
                      <p className="text-[#9FA0A7] text-[11px]">• Accomplishment action statement incorporating target keyword and measurable outcome.</p>
                      <p className="text-[#9FA0A7] text-[11px]">• Managed key responsibilities while optimizing performance metrics by [X%].</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#E5C158] font-bold">EDUCATION</p>
                    <p className="text-[#9FA0A7] text-[11px] mt-0.5">[Degree Name] — [University / Institution Name], [Year]</p>
                  </div>

                  <div>
                    <p className="text-[#E5C158] font-bold">CERTIFICATIONS & TRAINING</p>
                    <p className="text-[#9FA0A7] text-[11px] mt-0.5">[Certification Title] — [Issuing Body], [Year]</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: FINAL ATS RESUME QUALITY CHECK */}
            <section id="final-quality-check" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 10
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Final Quality Verification & Summary
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#9FA0A7]">
                <p>
                  Engineering an ATS-friendly resume is about removing unnecessary mechanical hurdles between your background and the recruiter. By prioritizing clean single-column layouts, standard typography, conventional headers, and contextual keywords, you ensure your qualifications parse clearly into candidate search databases.
                </p>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-[#9FA0A7] leading-relaxed">
                  <strong className="text-white block mb-1">Disclaimer on Hiring Outcomes:</strong>
                  Proper ATS formatting ensures machine readability and accurate parsing into applicant databases. It does not guarantee interviews, recruiter callbacks, or job offers, which depend on individual candidate qualifications, market competition, and employer hiring decisions.
                </div>
              </div>
            </section>

            {/* COMMERCIAL SEPARATION / CONTEXTUAL CTA */}
            <section className="border-t-2 border-[#E5C158]/30 pt-12 my-16">
              <div className="glass-card rounded-2xl p-8 border border-[#E5C158]/30 relative overflow-hidden bg-gradient-to-b from-[#E5C158]/10 via-transparent to-transparent">
                <div className="max-w-2xl">
                  <span className="text-xs font-mono text-[#E5C158] uppercase tracking-wider block mb-2">
                    Professional Document Engineering
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-white mb-3">
                    Need Professional ATS Resume Engineering?
                  </h3>
                  <p className="text-sm text-[#9FA0A7] mb-6 leading-relaxed">
                    MFS Growth Agency provides ATS-focused resume engineering with structured formatting, role-specific keyword alignment, and professional document presentation.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => handleNavClick('/services#resumes', 'services')}
                      className="px-6 py-3 rounded-xl bg-[#E5C158] hover:bg-[#D4AF37] text-black font-semibold text-sm transition-all shadow-lg shadow-[#E5C158]/20 flex items-center gap-2 cursor-pointer font-poppins"
                    >
                      <span>Explore ATS Resume Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleNavClick('/pricing', 'pricing')}
                      className="px-6 py-3 rounded-xl glass-card hover:bg-white/10 text-white font-medium text-sm transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
                    >
                      <span>View Pricing</span>
                    </button>

                    <button
                      onClick={() => {
                        if (onOpenOrderModal) {
                          onOpenOrderModal();
                        } else {
                          handleNavClick('/order', 'order');
                        }
                      }}
                      className="text-xs text-[#E5C158] hover:underline flex items-center gap-1 cursor-pointer font-mono"
                    >
                      <span>Start an order</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs text-[#9FA0A7]">
                    <BookOpen className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Preparing an academic CV or research application? Read our </span>
                    <a
                      href="/guides/academic-formatting-citation"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('/guides/academic-formatting-citation', 'guide-academic-formatting');
                      }}
                      className="text-[#E5C158] hover:underline font-semibold"
                    >
                      Academic Formatting & Citation Guide →
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom Author Bio Card */}
            <div className="mt-12 glass-card rounded-2xl p-6 sm:p-8 border border-white/10 bg-gradient-to-br from-[#0F0F12] to-[#050507]">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E5C158]/20 to-[#E5C158]/40 border border-[#E5C158]/50 flex items-center justify-center text-[#E5C158] font-bold text-lg shrink-0 font-poppins shadow-lg shadow-[#E5C158]/10">
                  MS
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-[#E5C158] uppercase tracking-wider mb-1">
                    Author & Lead Editorial Reviewer
                  </div>
                  <h3 className="text-lg font-bold font-poppins text-white mb-1">
                    Muhammad Shehroz Sultan
                  </h3>
                  <p className="text-xs text-[#E5C158]/80 font-mono mb-3">
                    Founder & Lead Director, MFS Growth Agency
                  </p>
                  <p className="text-xs sm:text-sm text-[#9FA0A7] leading-relaxed">
                    Written & Reviewed by Muhammad Shehroz Sultan, Founder & Lead Director, MFS Growth Agency. Specialist in executive presentation design, academic document formatting, and ATS-optimized career assets helping students and professionals achieve growth worldwide.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AtsResumeGuidePage;
