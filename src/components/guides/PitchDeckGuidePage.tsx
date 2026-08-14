import React, { useState } from 'react';
import {
  Presentation,
  FileText,
  BarChart3,
  Users,
  Target,
  TrendingUp,
  Briefcase,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ListChecks,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
  ChevronRight,
  Share2,
  Check,
  Zap,
  PieChart,
  Layers,
  DollarSign,
  Lightbulb,
  Award,
} from 'lucide-react';

export default function PitchDeckGuidePage() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleChecklist = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const tableOfContents = [
    { id: 'anatomy', title: 'Pitch Deck Anatomy' },
    { id: 'sequence', title: 'The 10-Slide Sequence' },
    { id: 'hierarchy', title: 'Visual Hierarchy' },
    { id: 'data-viz', title: 'Data Visualization Rules' },
    { id: 'mistakes', title: '10 Common Mistakes' },
    { id: 'checklist', title: 'Audit Checklist' },
    { id: 'delivery', title: 'Format & Delivery' },
    { id: 'design-service', title: 'Design Services' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const checklistItems = [
    { id: 1, label: 'Value proposition is immediately understandable within 5 seconds.' },
    { id: 2, label: 'Problem definition addresses a real, quantifiable market pain point.' },
    { id: 3, label: 'Solution clearly demonstrates direct resolution of stated problem.' },
    { id: 4, label: 'TAM/SAM/SOM market sizing assumptions are logical and cited.' },
    { id: 5, label: 'Business model & monetization mechanics are explicitly clear.' },
    { id: 6, label: 'Traction metrics represent real, verifiable historical performance.' },
    { id: 7, label: 'Charts & graphs maintain high legibility with clear labels and units.' },
    { id: 8, label: 'Competitive differentiation highlights sustainable unfair advantages.' },
    { id: 9, label: 'Go-to-market strategy defines actionable acquisition channels.' },
    { id: 10, label: 'Founding team section establishes domain authority and execution capability.' },
    { id: 11, label: 'Funding ask explicitly details total capital and runway extension.' },
    { id: 12, label: 'Use of funds breaks down capital allocation by functional milestone.' },
    { id: 13, label: 'Typography hierarchy maintains consistent font sizing and line spacing.' },
    { id: 14, label: 'Slide layouts honor 16:9 widescreen proportions with generous negative space.' },
    { id: 15, label: 'Final presentation has been reviewed on both laptops and mobile displays.' },
  ];

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const completionPercentage = Math.round((checkedCount / checklistItems.length) * 100);

  const slideSequence = [
    {
      num: '01',
      title: 'Title & Value Proposition',
      purpose: 'Hook the investor with immediate clarity regarding who you are and what core problem you solve.',
      keyElements: [
        'Company Name & Official Logo',
        'One-Sentence Value Proposition (High-concept tagline)',
        'Presenter Name, Title & Contact Information',
        'Date or Confidentiality Notice',
      ],
      pitfall: 'Overcomplicating the tagline with jargon or buzzwords that obscure the actual product.',
      icon: Presentation,
    },
    {
      num: '02',
      title: 'Problem Statement',
      purpose: 'Establish a urgent, relatable, and quantifiable pain point currently experienced by target customers.',
      keyElements: [
        'Clear customer persona experiencing the pain',
        'Current broken or inefficient workarounds',
        'Quantifiable economic or operational impact of the problem',
        'Validation evidence (customer quotes or survey stats)',
      ],
      pitfall: 'Defining a generic or mild inconvenience rather than an acute, high-value problem.',
      icon: AlertTriangle,
    },
    {
      num: '03',
      title: 'Solution & Product Overview',
      purpose: 'Demonstrate how your product uniquely solves the problem in a simple, compelling manner.',
      keyElements: [
        'Core value proposition & breakthrough approach',
        'Product UI screenshots, mockups, or hardware rendering',
        'Key 3-4 feature highlights mapped directly to problem points',
        'User workflow / simplicity of onboarding',
      ],
      pitfall: 'Drowning investors in deep feature specs instead of showing value and user outcome.',
      icon: Lightbulb,
    },
    {
      num: '04',
      title: 'Market Size & Opportunity (TAM / SAM / SOM)',
      purpose: 'Prove the existence of a massive, addressable commercial opportunity that justifies venture scale.',
      keyElements: [
        'TAM (Total Addressable Market) — Worldwide market potential',
        'SAM (Serviceable Addressable Market) — Reachable segment',
        'SOM (Serviceable Obtainable Market) — Realistically captured in 3-5 years',
        'Top-down industry reports combined with bottom-up calculations',
      ],
      pitfall: 'Relying solely on generic $100B top-down statistics without bottom-up unit economics validation.',
      icon: PieChart,
    },
    {
      num: '05',
      title: 'Business Model & Monetization',
      purpose: 'Explain clearly how the business generates revenue, scales margins, and captures unit profitability.',
      keyElements: [
        'Primary revenue streams (SaaS, transactional, marketplace fee, hardware markup)',
        'Pricing tiers and average contract value (ACV / ARPU)',
        'Customer lifetime value (LTV) & Customer acquisition cost (CAC) targets',
        'Gross margin structure and expansion economics',
      ],
      pitfall: 'Listing multiple unproven monetization channels instead of focusing on the primary scalable engine.',
      icon: DollarSign,
    },
    {
      num: '06',
      title: 'Traction & Key Metrics',
      purpose: 'Provide concrete proof of execution, customer demand, and product-market fit trajectory.',
      keyElements: [
        'MRR / ARR growth chart (Month-over-Month velocity)',
        'Active user growth, engagement rates, or net retention',
        'Key enterprise partnerships, LOIs, or pilot agreements',
        'Customer testimonials or case study highlights',
      ],
      pitfall: 'Presenting vanity metrics (e.g. cumulative signups) instead of actionable retention/revenue data.',
      icon: TrendingUp,
    },
    {
      num: '07',
      title: 'Competitive Advantage & Moat',
      purpose: 'Demonstrate why your solution will win against incumbents and new entrants in the long term.',
      keyElements: [
        'Competitive matrix or 2x2 positioning quadrant',
        'Core moats: proprietary technology, network effects, high switching costs, data flywheels',
        'Direct and indirect competitor landscape',
        'Key differentiators aligned to customer buying criteria',
      ],
      pitfall: 'Placing your company in the top-right quadrant with green checkmarks while unfairly diminishing competitors.',
      icon: ShieldCheck,
    },
    {
      num: '08',
      title: 'Go-To-Market (GTM) Strategy',
      purpose: 'Outline your repeatable customer acquisition engine and distribution channels.',
      keyElements: [
        'Primary customer acquisition channels (Inbound, Outbound, PLG, Channel Partners)',
        'Sales cycle duration and conversion benchmarks',
        'Unit economics of acquisition (CAC payback period)',
        'Scalability milestones for marketing & sales expansion',
      ],
      pitfall: 'Vague statements like "we will use social media and SEO" without channel validation testing.',
      icon: Target,
    },
    {
      num: '09',
      title: 'Founding Team & Key Advisors',
      purpose: 'Instill absolute confidence that this specific team possesses unfair advantages to build a market leader.',
      keyElements: [
        'Co-founder photos, titles, and concise domain track records',
        'Prior exits, notable company backgrounds, or academic distinctions',
        'Key functional domain leads (Engineering, Product, Sales)',
        'Strategic advisors bringing strategic enterprise doors or industry pedigree',
      ],
      pitfall: 'Including massive logos of past employers without highlighting the founder\'s specific contributions.',
      icon: Users,
    },
    {
      num: '10',
      title: 'The Ask & Use of Funds',
      purpose: 'State exactly how much capital you are raising, how it will be spent, and what milestones it will unlock.',
      keyElements: [
        'Target raise amount (e.g., $1.5M Seed)',
        'Use of funds allocation breakdown (Engineering %, Sales %, Ops %)',
        'Key 18–24 month operational and revenue milestones unlocked',
        'Target runway extension and next round targets',
      ],
      pitfall: 'Asking for money without linking capital allocation to concrete value-creation milestones.',
      icon: Briefcase,
    },
  ];

  const commonMistakes = [
    { title: 'Information Overload & Text Walls', desc: 'Overcrowding slides with dense paragraphs forces investors to read instead of listen to your pitch.' },
    { title: 'Weak or Abstract Problem Statement', desc: 'Failing to establish a real, painful, and economically urgent customer problem.' },
    { title: 'Unclear Value Proposition', desc: 'Using vague corporate jargon that hides what the product actually does in practice.' },
    { title: 'Unrealistic Market Sizing Claims', desc: 'Citing generic multi-billion-dollar TAM figures without bottom-up calculation logic.' },
    { title: 'Confusing & Unlabeled Charts', desc: 'Presenting complex multi-axis charts without clear legends, trendlines, or key takeaways.' },
    { title: 'Inconsistent Visual Formatting', desc: 'Mixing font families, alignment margins, and color palettes creates an amateur impression.' },
    { title: 'Overusing Decorative Elements', desc: 'Adding unnecessary icons, 3D shapes, or heavy gradients that compete with core data.' },
    { title: 'Lack of Real Traction Evidence', desc: 'Relying entirely on optimistic future projections without showcasing past execution proofs.' },
    { title: 'Underestimating Competitors', desc: 'Dismissing established incumbents or asserting "we have no competitors".' },
    { title: 'Vague Funding Ask & Runway Plan', desc: 'Asking for capital without specifying functional milestones or operational runway allocation.' },
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-20 font-sans selection:bg-[#E5C158]/30 selection:text-[#E5C158]">
      {/* Background Decorative Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#E5C158]/10 via-[#E5C158]/05 to-transparent blur-[120px] opacity-60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#9FA0A7] font-mono">
          <a href="/" className="hover:text-white transition-colors">
            Home
          </a>
          <ChevronRight className="w-3 h-3 text-[#9FA0A7]/50" />
          <span className="text-[#9FA0A7]">Guides</span>
          <ChevronRight className="w-3 h-3 text-[#9FA0A7]/50" />
          <span className="text-[#E5C158] truncate">Executive Pitch Deck Structure Guide</span>
        </nav>

        {/* Article Header */}
        <header className="mb-12 border-b border-white/10 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-mono font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>EXECUTIVE PRESENTATION KNOWLEDGE GUIDE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-white tracking-tight leading-tight mb-6">
            Executive Pitch Deck Structure Guide:{' '}
            <span className="gold-text-gradient">
              The Essential 10-Slide Framework for Investors
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#9FA0A7] leading-relaxed max-w-4xl mb-8 font-light">
            A comprehensive, practical architectural breakdown of investor presentation sequencing, visual hierarchy, data chart clarity, and storytelling mechanics for startup fundraising and corporate executive presentations.
          </p>

          {/* Article Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9FA0A7] pt-4 border-t border-white/05">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#E5C158]" />
                14 Min Read
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
                Investor Framework Verified
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
        </header>

        {/* Reading Intent Summary Box */}
        <section className="mb-12 glass-card rounded-2xl p-6 sm:p-8 border-l-4 border-l-[#E5C158]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#E5C158]/10 text-[#E5C158] shrink-0 hidden sm:block">
              <Presentation className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold font-poppins text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E5C158] sm:hidden" />
                Guide Executive Summary
              </h2>
              <p className="text-sm text-[#9FA0A7] leading-relaxed">
                Venture capitalists and angel investors review hundreds of pitch decks monthly, spending an average of <strong className="text-white">2 minutes and 30 seconds</strong> per presentation. This guide details the industry-standard 10-slide deck structure, explaining how logical narrative progression, disciplined data visualization, and clear visual hierarchy capture investor interest and communicate business momentum.
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
                <p className="text-[11px] text-[#9FA0A7] mb-3">Need custom executive presentation design?</p>
                <a
                  href="/services#presentations"
                  className="w-full py-2 px-3 rounded-lg bg-[#E5C158]/10 hover:bg-[#E5C158]/20 border border-[#E5C158]/30 text-[#E5C158] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Presentation Design</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content Column */}
          <main className="lg:col-span-9 space-y-16 text-slate-200 leading-relaxed">
            {/* SECTION 1: THE ANATOMY OF A STRONG INVESTOR PITCH DECK */}
            <section id="anatomy" className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 01
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  The Anatomy of a Strong Investor Pitch Deck
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#9FA0A7]">
                <p>
                  An executive pitch deck is not merely a summary of product features; it is a structured narrative engine engineered to demonstrate venture-scale return potential. Investors process pitch decks in a specific psychological sequence: first seeking to understand the <strong className="text-white">problem size</strong>, then evaluating the <strong className="text-white">elegance of the solution</strong>, validating the <strong className="text-white">commercial market model</strong>, and assessing the <strong className="text-white">execution team</strong>.
                </p>

                {/* Narrative Arc Flow Graphic */}
                <div className="my-6 p-6 glass-card rounded-2xl border border-white/10">
                  <h3 className="text-xs font-mono font-bold text-[#E5C158] uppercase tracking-wider mb-4">
                    The Investor Narrative Arc Flow
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/05">
                      <span className="text-[#E5C158] block font-bold mb-1">STAGE 1</span>
                      <span className="text-white">The Opportunity</span>
                      <p className="text-[10px] text-[#9FA0A7] font-sans mt-1">Problem, Solution & Market Size</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/05">
                      <span className="text-[#E5C158] block font-bold mb-1">STAGE 2</span>
                      <span className="text-white">The Engine</span>
                      <p className="text-[10px] text-[#9FA0A7] font-sans mt-1">Business Model & GTM Engine</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/05">
                      <span className="text-[#E5C158] block font-bold mb-1">STAGE 3</span>
                      <span className="text-white">The Proof</span>
                      <p className="text-[10px] text-[#9FA0A7] font-sans mt-1">Traction, Metrics & Moat</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/05">
                      <span className="text-[#E5C158] block font-bold mb-1">STAGE 4</span>
                      <span className="text-white">The Plan</span>
                      <p className="text-[10px] text-[#9FA0A7] font-sans mt-1">Team, Financial Ask & Runway</p>
                    </div>
                  </div>
                </div>

                <p>
                  A common structural error is confusing <strong className="text-white">information density</strong> with <strong className="text-white">information clarity</strong>. High-density slides with microscopic text overload cognitive capacity, causing investors to miss core value drivers. High-clarity decks use disciplined typography, strategic visual focal points, and clear slide headers to communicate business value within seconds.
                </p>
              </div>
            </section>

            {/* SECTION 2: THE ESSENTIAL 10-SLIDE PITCH DECK SEQUENCE */}
            <section id="sequence" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 02
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  The Essential 10-Slide Pitch Deck Sequence
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#9FA0A7] mb-8">
                Popularized by leading venture capital firms and accelerators, the 10-slide framework provides the foundational structure required for early and growth-stage fundraising decks:
              </p>

              {/* 10 Slides Detailed Cards */}
              <div className="space-y-6">
                {slideSequence.map((slide) => {
                  const Icon = slide.icon;
                  return (
                    <div key={slide.num} className="p-6 glass-card rounded-2xl border border-white/10 relative overflow-hidden">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-1 rounded border border-[#E5C158]/20">
                            SLIDE {slide.num}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold font-poppins text-white">{slide.title}</h3>
                        </div>
                        <div className="p-2 rounded-xl bg-white/[0.03] text-[#E5C158] border border-white/05 shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#9FA0A7] mb-4">
                        <strong className="text-white">Core Purpose:</strong> {slide.purpose}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/05">
                          <p className="font-mono text-[11px] text-[#28C76F] uppercase font-bold mb-2">Essential Slide Elements</p>
                          <ul className="space-y-1.5 text-[#9FA0A7]">
                            {slide.keyElements.map((elem, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[#28C76F]">•</span>
                                <span>{elem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-red-500/[0.02] p-4 rounded-xl border border-red-500/10">
                          <p className="font-mono text-[11px] text-red-400 uppercase font-bold mb-2">Common Pitfall to Avoid</p>
                          <p className="text-[#9FA0A7]">{slide.pitfall}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: VISUAL HIERARCHY FOR EXECUTIVE PRESENTATIONS */}
            <section id="hierarchy" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 03
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Visual Hierarchy for Executive Presentations
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#9FA0A7]">
                <p>
                  Visual hierarchy dictates the order in which an investor's eyes scan a slide. When presented with a slide, the brain automatically processes large display headings first, followed by data visual callouts, structural section cards, and finally detailed body text.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                  <div className="p-5 glass-card rounded-xl border border-white/10">
                    <h3 className="text-sm font-bold text-white font-poppins mb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#E5C158]" />
                      Single Focus Principle
                    </h3>
                    <p className="text-xs text-[#9FA0A7]">
                      Each slide must communicate exactly one core takeaways statement. Avoid competing visual anchors that fight for viewer attention.
                    </p>
                  </div>

                  <div className="p-5 glass-card rounded-xl border border-white/10">
                    <h3 className="text-sm font-bold text-white font-poppins mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#E5C158]" />
                      Headline Hierarchy
                    </h3>
                    <p className="text-xs text-[#9FA0A7]">
                      Use action-oriented slide titles (e.g. "ARR Grew 240% YoY Driven by Enterprise SaaS Tier") instead of plain generic labels ("Traction").
                    </p>
                  </div>

                  <div className="p-5 glass-card rounded-xl border border-white/10">
                    <h3 className="text-sm font-bold text-white font-poppins mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#E5C158]" />
                      Negative Space Ratio
                    </h3>
                    <p className="text-xs text-[#9FA0A7]">
                      Maintain at least 30–40% generous negative space per slide. Ample whitespace reduces cognitive friction and elevates executive perception.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#9FA0A7]">
                  At MFS Growth Agency, presentation engineering focuses on creating disciplined typography scales, custom 16:9 widescreen layout grids, and restrained gold-accent visual anchors designed to keep audience focus fixed on executive value metrics.
                </p>
              </div>
            </section>

            {/* SECTION 4: DATA VISUALIZATION RULES FOR PITCH DECKS */}
            <section id="data-viz" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 04
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Data Visualization Rules for Pitch Decks
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#9FA0A7] mb-6">
                Data charts in an investor deck are not decorative illustrations—they are proof instruments. Adhere to these fundamental rules when visualizing metrics:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Match Chart Types to Data Goals',
                    desc: 'Use line graphs for continuous historical growth trends, bar charts for discrete channel comparisons, and waterfall charts for unit margin breakdowns. Avoid complex radar charts.',
                  },
                  {
                    title: 'Eliminate Unnecessary 3D & Effects',
                    desc: 'Avoid 3D pie charts, heavy shadows, or distorted perspective projections. Flat, precise 2D graphics preserve accurate visual scale representation.',
                  },
                  {
                    title: 'Annotate Key Inflection Points',
                    desc: 'Call out key milestones directly on the chart line (e.g. "Series Seed Closed", "Enterprise V2 Launch"). Tell the strategic story behind data inflection points.',
                  },
                  {
                    title: 'Distinguish Historicals vs Projections',
                    desc: 'Use solid fills for historical actuals and dashed borders or semi-transparent fills for future revenue forecasts. Never conflate real metrics with estimates.',
                  },
                ].map((rule, idx) => (
                  <div key={idx} className="p-5 glass-card rounded-xl border border-white/10">
                    <h3 className="text-sm font-bold text-white font-poppins mb-2 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#E5C158]" />
                      {rule.title}
                    </h3>
                    <p className="text-xs text-[#9FA0A7]">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: COMMON PITCH DECK MISTAKES */}
            <section id="mistakes" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 05
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  10 Common Pitch Deck Mistakes
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commonMistakes.map((item, idx) => (
                  <div key={idx} className="p-4 glass-card rounded-xl border border-white/10">
                    <h3 className="text-xs font-bold text-white font-poppins mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      {idx + 1}. {item.title}
                    </h3>
                    <p className="text-xs text-[#9FA0A7]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 6: PRE-PRESENTATION PITCH DECK AUDIT CHECKLIST */}
            <section id="checklist" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 06
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Pre-Presentation Pitch Deck Audit Checklist
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#9FA0A7] mb-6">
                Interactive pre-flight review tool: Audit your slide deck against key investor readiness criteria prior to sending or presenting.
              </p>

              {/* Progress Bar */}
              <div className="glass-card p-4 rounded-xl border border-white/10 mb-6">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#9FA0A7]">Checklist Completion:</span>
                  <span className="text-[#E5C158] font-bold">{checkedCount} / {checklistItems.length} ({completionPercentage}%)</span>
                </div>
                <div className="w-full h-2 bg-white/05 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E5C158] to-[#28C76F] transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-3">
                {checklistItems.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
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
                      <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'text-white line-through opacity-80' : 'text-white'}`}>
                        {item.id}. {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 7: PITCH DECK FORMAT & DELIVERY CONSIDERATIONS */}
            <section id="delivery" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 07
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Pitch Deck Format & Delivery Considerations
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 glass-card rounded-xl border border-white/10">
                  <h3 className="text-sm font-bold text-white font-poppins mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#E5C158]" />
                    16:9 Widescreen Standard
                  </h3>
                  <p className="text-xs text-[#9FA0A7]">
                    Always build presentations in 16:9 aspect ratio. Legacy 4:3 square slides look outdated on modern displays and virtual meeting screens.
                  </p>
                </div>

                <div className="p-5 glass-card rounded-xl border border-white/10">
                  <h3 className="text-sm font-bold text-white font-poppins mb-2 flex items-center gap-2">
                    <Presentation className="w-4 h-4 text-[#E5C158]" />
                    Dual Deck Strategy
                  </h3>
                  <p className="text-xs text-[#9FA0A7]">
                    Maintain two versions: a concise, highly visual <strong className="text-white">Live Presentation Deck</strong> and a self-explanatory <strong className="text-white">Email Reading Deck</strong> with supplementary context.
                  </p>
                </div>

                <div className="p-5 glass-card rounded-xl border border-white/10">
                  <h3 className="text-sm font-bold text-white font-poppins mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#E5C158]" />
                    Vector PDF Export
                  </h3>
                  <p className="text-xs text-[#9FA0A7]">
                    Export email decks as vector PDFs under 10MB to guarantee crisp font rendering and fast loading across mobile and desktop devices.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: WHEN TO USE A PROFESSIONAL PRESENTATION DESIGN SERVICE */}
            <section id="design-service" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="p-8 glass-card rounded-2xl border border-[#E5C158]/30 bg-gradient-to-br from-[#E5C158]/10 via-transparent to-transparent relative overflow-hidden">
                <div className="max-w-2xl">
                  <span className="font-mono text-xs text-[#E5C158] uppercase font-bold tracking-wider mb-2 block">
                    PROFESSIONAL PRESENTATION SERVICES
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white mb-4">
                    Need Professional Executive Pitch Deck Engineering?
                  </h2>
                  <p className="text-sm text-[#9FA0A7] leading-relaxed mb-6">
                    MFS Growth Agency provides executive presentation design, custom slide layout engineering, and financial data graphic design designed to communicate business narrative clearly to investors and stakeholders.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="/services#presentations"
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-[#E5C158]/20"
                    >
                      <span>Explore Presentation Services</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href="/pricing"
                      className="py-3 px-6 rounded-xl bg-white/05 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      <span>View Pricing</span>
                    </a>

                    <a
                      href="/order"
                      className="text-xs text-[#E5C158] hover:underline font-mono ml-2"
                    >
                      Start an order →
                    </a>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs text-[#9FA0A7]">
                    <BookOpen className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Need structured corporate report formatting alongside your slide deck? Read our </span>
                    <a
                      href="/guides/corporate-report-formatting-standards"
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({ page: 'guide-corporate-report' }, '', '/guides/corporate-report-formatting-standards');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }}
                      className="text-[#E5C158] hover:underline font-semibold"
                    >
                      Corporate Report Formatting Standards Guide →
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
