import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Presentation,
  Sparkles,
  Layers,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Download,
  RotateCcw,
  Sliders,
  Zap,
  TrendingUp,
  FileText,
  PieChart,
  Target,
  DollarSign,
  Users,
  ShieldCheck,
  Lightbulb,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface PitchDeckBuilderToolProps {
  onOpenOrderModal: (serviceId?: string, slides?: number) => void;
  onOpenAIChat?: () => void;
  onShowToast?: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  onNavigatePage?: (page: string) => void;
}

interface SlideStructure {
  id: number;
  title: string;
  category: string;
  purpose: string;
  recommendedLayout: string;
  keyPoints: string[];
  userNotes?: string;
}

const PRESET_DECKS: Record<
  string,
  {
    name: string;
    description: string;
    defaultSlides: number;
    slides: SlideStructure[];
  }
> = {
  investor: {
    name: 'Investor Seed / Series A Pitch Deck',
    description: 'Gold-standard Sequoia & Y-Combinator 10-12 slide framework designed to raise institutional venture capital.',
    defaultSlides: 11,
    slides: [
      {
        id: 1,
        title: 'Title & One-Sentence Pitch',
        category: 'Introduction',
        purpose: 'Capture attention instantly and clearly state what your company does in under 5 seconds.',
        recommendedLayout: 'Hero Minimalist Split with High-Contrast Typography & Logo Mark',
        keyPoints: ['Company Name & Clean Logo', '10-word clear value proposition', 'Presenter details & Contact info'],
      },
      {
        id: 2,
        title: 'The Problem & Market Inefficiency',
        category: 'Context',
        purpose: 'Frame a severe, urgent pain point currently faced by a large, identifiable customer segment.',
        recommendedLayout: '3-Card Pain Point Bento Grid with Friction Metrics',
        keyPoints: ['Top 3 critical customer pain points', 'Current broken workarounds', 'Financial or operational cost of inaction'],
      },
      {
        id: 3,
        title: 'The Solution & Value Proposition',
        category: 'Product',
        purpose: 'Present your proprietary product/service as the definitive, 10x better answer to the problem.',
        recommendedLayout: 'Before vs After Split Screen with Core Value Pillars',
        keyPoints: ['Core product mechanism & 10x benefit', 'Key feature pillars', 'Measurable customer ROI'],
      },
      {
        id: 4,
        title: 'Product Demo & Visual Architecture',
        category: 'Product',
        purpose: 'Show tangible proof of your UI, product flow, or service architecture.',
        recommendedLayout: 'High-Res Device Mockup with Callout Annotations',
        keyPoints: ['Interactive workflow diagram / UI screenshots', 'Key user journey in 3 steps', 'Proprietary tech or algorithms'],
      },
      {
        id: 5,
        title: 'Market Size & Total Addressable Market (TAM)',
        category: 'Market',
        purpose: 'Demonstrate that the market is large enough to build a $100M+ enterprise.',
        recommendedLayout: 'Concentric Circles (TAM > SAM > SOM) with Bottom-Up Math',
        keyPoints: ['TAM (Total Market)', 'SAM (Serviceable Market)', 'SOM (Target Beachhead Market in Year 1-3)'],
      },
      {
        id: 6,
        title: 'Business Model & Unit Economics',
        category: 'Monetization',
        purpose: 'Explain clearly how you capture value, your pricing tiers, and customer unit economics.',
        recommendedLayout: '3-Tier Pricing Card Matrix + CAC/LTV Ratio Metrics',
        keyPoints: ['Monetization channels (SaaS, Commission, Enterprise)', 'Average Contract Value (ACV)', 'LTV to CAC ratio (>3x)'],
      },
      {
        id: 7,
        title: 'Traction & Key Growth Milestones',
        category: 'Proof',
        purpose: 'Prove market validation with revenue numbers, pilot contracts, waitlists, or active users.',
        recommendedLayout: '4-Metric Big Stat Hero Row + Month-over-Month Growth Curve',
        keyPoints: ['Annual Recurring Revenue (ARR) or Gross Volume', 'Active users / paying accounts', 'Month-over-Month growth rate %'],
      },
      {
        id: 8,
        title: 'Go-to-Market Strategy & Customer Acquisition',
        category: 'Growth',
        purpose: 'Detail how you acquire and scale customers predictably and cost-effectively.',
        recommendedLayout: '3-Channel Funnel Flow with Target CAC Projections',
        keyPoints: ['Primary organic / inbound acquisition channels', 'Paid & outbound sales engine', 'Strategic enterprise partnerships'],
      },
      {
        id: 9,
        title: 'Competitive Moat & Market Matrix',
        category: 'Competition',
        purpose: 'Position your unfair advantage over existing incumbents and direct competitors.',
        recommendedLayout: '2x2 Quadrant Positioning Chart or Feature Comparison Matrix',
        keyPoints: ['2x2 Axis showing your unique quadrant', 'Proprietary IP / Network effects', 'Switching costs & defensive moats'],
      },
      {
        id: 10,
        title: 'Leadership Team & Advisors',
        category: 'Team',
        purpose: 'Show why this exact team is uniquely qualified to execute and win in this domain.',
        recommendedLayout: 'Founder Profile Grid with Prior Logos & Domain Exits',
        keyPoints: ['Founder titles and relevant past achievements', 'Prior notable employers/exits', 'Key technical advisors'],
      },
      {
        id: 11,
        title: 'The Ask, Financial Projections & Use of Funds',
        category: 'Financials',
        purpose: 'State the exact funding amount requested, 18-month milestones, and allocation pie chart.',
        recommendedLayout: 'Capital Target Highlight + 3-Part Use of Funds Donut Chart',
        keyPoints: ['Total funding target (e.g. $1.5M Seed)', 'Use of funds (Product 50%, GTM 35%, Ops 15%)', '18-month milestone targets'],
      },
    ],
  },
  sales: {
    name: 'Corporate Sales & Business Proposal Deck',
    description: 'High-converting enterprise B2B pitch deck tailored for corporate decision-makers and C-suite procurement.',
    defaultSlides: 8,
    slides: [
      {
        id: 1,
        title: 'Executive Title & Client Context',
        category: 'Intro',
        purpose: 'Align presentation directly with the client organization and date.',
        recommendedLayout: 'Custom Branded Executive Cover with Client Co-Branding',
        keyPoints: ['Prepared exclusively for [Client Name]', 'Project title & strategic objective', 'Date and executive contacts'],
      },
      {
        id: 2,
        title: 'Current State & Identified Business Challenges',
        category: 'Analysis',
        purpose: 'Demonstrate deep understanding of the client’s current operational bottlenecks.',
        recommendedLayout: '3-Column Diagnostic Summary with Identified Loss Figures',
        keyPoints: ['Operational inefficiencies', 'Cost of legacy processes', 'Risk assessment'],
      },
      {
        id: 3,
        title: 'Proposed Solution & Strategic Approach',
        category: 'Strategy',
        purpose: 'Detail the tailored engagement scope and transformative methodology.',
        recommendedLayout: 'Phase-by-Phase Horizontal Roadmap with Deliverable Milestones',
        keyPoints: ['Phase 1: Discovery & Audit', 'Phase 2: Execution & Deployment', 'Phase 3: Optimization & Handover'],
      },
      {
        id: 4,
        title: 'Scope of Work & Core Deliverables',
        category: 'Scope',
        purpose: 'List concrete, unambiguous deliverables and technical assets.',
        recommendedLayout: 'Structured Checklist Matrix with SLAs',
        keyPoints: ['Deliverable 1, 2, 3 specifications', 'Turnaround deadlines', 'Quality benchmarks'],
      },
      {
        id: 5,
        title: 'Expected ROI & Measurable Business Impact',
        category: 'ROI',
        purpose: 'Project financial returns, cost savings, and operational speed gains.',
        recommendedLayout: '3-Metric Impact Cards with Percentage Improvements',
        keyPoints: ['Cost reduction percentage', 'Time-to-market acceleration', 'Team productivity uplift'],
      },
      {
        id: 6,
        title: 'Case Studies & Verified Client Proof',
        category: 'Proof',
        purpose: 'Prove past success with similar enterprise clients in the same industry.',
        recommendedLayout: 'Client Testimonial Split Screen with Before/After Metrics',
        keyPoints: ['Similar enterprise client name', 'Problem tackled & outcome achieved', 'Client quote and verified results'],
      },
      {
        id: 7,
        title: 'Investment Breakdown & Commercial Options',
        category: 'Commercials',
        purpose: 'Present clear, transparent pricing packages and payment terms.',
        recommendedLayout: 'Tiered Package Pricing Table (Core vs Premium Enterprise)',
        keyPoints: ['Tier 1 / Tier 2 pricing', 'Inclusions & SLA options', 'Payment schedule terms'],
      },
      {
        id: 8,
        title: 'Next Steps & Project Kickoff Timeline',
        category: 'Closing',
        purpose: 'Provide a frictionless path to contract signing and immediate onboarding.',
        recommendedLayout: '3-Step Action Plan with Contact & Signature Block',
        keyPoints: ['Contract execution', 'Kickoff workshop date', 'Dedicated account manager contact'],
      },
    ],
  },
  academic: {
    name: 'Academic Defense & Thesis Presentation',
    description: 'Structured university presentation deck for thesis defenses, conference symposiums, and research reviews.',
    defaultSlides: 10,
    slides: [
      {
        id: 1,
        title: 'Thesis Title, Candidate & Committee',
        category: 'Title',
        purpose: 'Formal academic title slide adhering to institutional norms.',
        recommendedLayout: 'Formal Institutional Header with Department & Advisor Details',
        keyPoints: ['Full Thesis Title', 'Candidate Name & Student ID', 'Supervising Professor & Department'],
      },
      {
        id: 2,
        title: 'Research Background & Problem Statement',
        category: 'Context',
        purpose: 'Establish the scholarly domain and specific research gap being addressed.',
        recommendedLayout: 'Split Context Column + Formal Problem Statement Box',
        keyPoints: ['Theoretical background', 'Existing research limitations', 'Primary research question'],
      },
      {
        id: 3,
        title: 'Literature Review & Theoretical Framework',
        category: 'Literature',
        purpose: 'Map existing seminal literature and theoretical underpinnings.',
        recommendedLayout: 'Concept Map / Theoretical Matrix with Citations',
        keyPoints: ['Key scholarly frameworks', 'Seminal authors cited', 'Identified theoretical synthesis'],
      },
      {
        id: 4,
        title: 'Research Methodology & Experimental Design',
        category: 'Methodology',
        purpose: 'Detail data collection, sample sizes, instruments, and analytical methods.',
        recommendedLayout: 'Methodology Flowchart (Sampling > Collection > Analysis)',
        keyPoints: ['Qualitative/Quantitative paradigm', 'Sample demographics & size (N=...)', 'Statistical tools (SPSS, R, Python)'],
      },
      {
        id: 5,
        title: 'Empirical Findings & Data Analysis (Part 1)',
        category: 'Findings',
        purpose: 'Present primary quantitative or qualitative data with clear charts.',
        recommendedLayout: 'Dual Statistical Chart Grid with Highlighted P-Values',
        keyPoints: ['Primary hypothesis testing results', 'Descriptive statistics & regression', 'Key data visualizations'],
      },
      {
        id: 6,
        title: 'Empirical Findings & Qualitative Themes (Part 2)',
        category: 'Findings',
        purpose: 'Elaborate on secondary findings, thematic coding, or experimental variations.',
        recommendedLayout: 'Thematic Summary Matrix with Direct Participant Quotes',
        keyPoints: ['Key thematic discoveries', 'Anomalous or unexpected results', 'Validation checks'],
      },
      {
        id: 7,
        title: 'Discussion & Scholarly Implications',
        category: 'Discussion',
        purpose: 'Interpret what the findings mean in relation to prior published literature.',
        recommendedLayout: 'Comparison Table: Findings vs Literature Consensus',
        keyPoints: ['Contribution to academic literature', 'Support/rejection of hypotheses', 'Theoretical advances'],
      },
      {
        id: 8,
        title: 'Practical & Managerial Recommendations',
        category: 'Applications',
        purpose: 'Translate empirical conclusions into actionable industry or policy guidance.',
        recommendedLayout: '3-Pillar Practical Application Grid',
        keyPoints: ['Policy or industry recommendations', 'Implementation hurdles', 'Best practice guidelines'],
      },
      {
        id: 9,
        title: 'Research Limitations & Future Directions',
        category: 'Limitations',
        purpose: 'Demonstrate academic rigor by honestly acknowledging scope boundaries.',
        recommendedLayout: 'Split Column: Limitations vs Future Study Agenda',
        keyPoints: ['Sample and methodological limitations', 'Recommended future research avenues'],
      },
      {
        id: 10,
        title: 'Key References & Q&A Defense',
        category: 'Conclusion',
        purpose: 'List major academic sources (APA/Harvard) and invite committee questions.',
        recommendedLayout: 'Selected References Block + Formal Q&A Closing Card',
        keyPoints: ['Top 5-8 primary cited works', 'Acknowledgment to committee', 'Open floor for questions'],
      },
    ],
  },
};

export const PitchDeckBuilderTool: React.FC<PitchDeckBuilderToolProps> = ({
  onOpenOrderModal,
  onOpenAIChat,
  onShowToast,
  onNavigatePage,
}) => {
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>('investor');
  const [slideCount, setSlideCount] = useState<number>(PRESET_DECKS.investor.defaultSlides);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [copiedStructure, setCopiedStructure] = useState(false);
  const [expandedSlideId, setExpandedSlideId] = useState<number | null>(1);

  const activePreset = PRESET_DECKS[selectedPresetKey];
  const slides = activePreset.slides.slice(0, slideCount);

  const handleSelectPreset = (key: string) => {
    setSelectedPresetKey(key);
    setSlideCount(PRESET_DECKS[key].defaultSlides);
    setActiveSlideIndex(0);
    setExpandedSlideId(1);
    if (onShowToast) onShowToast(`Loaded ${PRESET_DECKS[key].name}`, 'info');
  };

  const handleCopyMarkdown = () => {
    let md = `# ${activePreset.name} Storyline Outline\n`;
    md += `Target Slides: ${slides.length}\n`;
    md += `Generated via MFS Growth Agency Deck Architect (mfsgrowth.online)\n\n`;

    slides.forEach((s, idx) => {
      md += `### Slide ${idx + 1}: ${s.title}\n`;
      md += `- **Category**: ${s.category}\n`;
      md += `- **Purpose**: ${s.purpose}\n`;
      md += `- **Visual Layout**: ${s.recommendedLayout}\n`;
      md += `- **Key Content Points**:\n`;
      s.keyPoints.forEach((kp) => {
        md += `  * ${kp}\n`;
      });
      md += `\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedStructure(true);
    if (onShowToast) onShowToast('Slide storyline copied to clipboard as Markdown!', 'success');
    setTimeout(() => setCopiedStructure(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <button
            onClick={() => onNavigatePage ? onNavigatePage('home') : null}
            className="hover:text-[#E5C158] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigatePage ? onNavigatePage('tools') : null}
            className="hover:text-[#E5C158] transition-colors"
          >
            Free Tools & Utilities
          </button>
          <span>/</span>
          <span className="text-[#E5C158]">Pitch Deck & Slide Architect</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Interactive Slide Storyline Architect</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins text-white tracking-tight leading-tight">
            Pitch Deck & Slide <span className="text-[#E5C158]">Structure Builder</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
            Generate an executive-ready slide-by-slide storyline outline, psychological narrative structure, and custom visual layout blueprints for your next presentation.
          </p>

          {/* Deck Type Selectors */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.keys(PRESET_DECKS).map((key) => {
              const preset = PRESET_DECKS[key];
              const isSelected = selectedPresetKey === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelectPreset(key)}
                  className={`p-4 rounded-xl text-left transition-all relative border ${
                    isSelected
                      ? 'bg-[#161622] border-[#E5C158] shadow-lg shadow-[#E5C158]/15'
                      : 'bg-[#0F0F16] border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-poppins text-white">{preset.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />}
                  </div>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Builder Toolbar & Slide Count Slider */}
        <div className="p-6 rounded-2xl bg-[#0F0F16] border border-white/10 shadow-xl mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          <div className="flex-1 max-w-md">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#E5C158]" />
                <span>Adjust Slide Count ({slideCount} Slides)</span>
              </label>
              <span className="text-xs font-bold font-mono text-[#E5C158]">
                {slideCount} of {activePreset.slides.length} max
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={activePreset.slides.length}
              value={slideCount}
              onChange={(e) => setSlideCount(parseInt(e.target.value))}
              className="w-full h-2 bg-[#050507] rounded-lg appearance-none cursor-pointer accent-[#E5C158]"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyMarkdown}
              className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              {copiedStructure ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Outline Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Storyline</span>
                </>
              )}
            </button>

            <button
              onClick={() => onOpenOrderModal('presentation', slideCount)}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:from-[#F0D27A] hover:to-[#E5C158] text-black font-bold text-xs font-poppins transition-all shadow-lg shadow-[#E5C158]/20 flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-black" />
              <span>Design These {slideCount} Slides (50% OFF)</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>

        {/* Storyline Slide Grid */}
        <div className="space-y-4">
          {slides.map((slide, index) => {
            const isExpanded = expandedSlideId === slide.id;
            return (
              <div
                key={slide.id}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? 'bg-[#12121A] border-[#E5C158]/40 shadow-xl'
                    : 'bg-[#0F0F16] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandedSlideId(isExpanded ? null : slide.id)}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#050507] border border-white/10 flex items-center justify-center font-mono font-bold text-sm text-[#E5C158]">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5 font-medium">
                          {slide.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold font-poppins text-white">
                          {slide.title}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-1">
                        {slide.purpose}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-[11px] text-[#E5C158] font-medium bg-[#E5C158]/10 px-2.5 py-1 rounded-md">
                      {slide.recommendedLayout.split(' ')[0]} Layout
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-neutral-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Content Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-white/5 mt-2 grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Left Info: Purpose & Key Points */}
                        <div className="md:col-span-7 space-y-4">
                          <div>
                            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                              Psychological Objective:
                            </span>
                            <p className="text-xs text-neutral-200 leading-relaxed bg-[#08080C] p-3 rounded-xl border border-white/5">
                              {slide.purpose}
                            </p>
                          </div>

                          <div>
                            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                              Essential Content Points & Data:
                            </span>
                            <ul className="space-y-1.5">
                              {slide.keyPoints.map((kp, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-neutral-300 flex items-start gap-2"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E5C158] shrink-0 mt-0.5" />
                                  <span>{kp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Right Info: Recommended Visual Architecture */}
                        <div className="md:col-span-5 bg-[#08080C] p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C158] mb-2">
                              <Lightbulb className="w-4 h-4 text-[#E5C158]" />
                              <span>MFS Visual Design Recommendation</span>
                            </div>
                            <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                              {slide.recommendedLayout}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[11px] text-neutral-500 font-mono">
                              Slide Deliverables: PPTX + PDF
                            </span>
                            <button
                              onClick={() => onOpenOrderModal('presentation', slideCount)}
                              className="text-[11px] font-bold text-[#E5C158] hover:underline flex items-center gap-1"
                            >
                              <span>Build This Slide</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Conversion CTA Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#12121A] via-[#161624] to-[#0A0A10] border border-[#E5C158]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E5C158]/10 text-[#E5C158] text-xs font-bold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Turn Outline Into High-Stakes Slides</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-poppins text-white">
              Ready for Custom Visual Design in PowerPoint & PDF?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl leading-relaxed">
              Our presentation design specialists transform rough outlines and raw data into custom-crafted, branded slides with custom icons, data charts, and 24h turnaround.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => onOpenOrderModal('presentation', slideCount)}
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:from-[#F0D27A] hover:to-[#E5C158] text-black font-bold text-xs sm:text-sm font-poppins transition-all shadow-xl shadow-[#E5C158]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Order Custom Deck ({slideCount} Slides)</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
            <button
              onClick={() => onNavigatePage ? onNavigatePage('guide-pitch-deck') : null}
              className="py-3.5 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Read Pitch Deck Guide</span>
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
