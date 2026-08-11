import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../data/content';
import { Currency, ServiceItem } from '../types';
import {
  ArrowRight,
  CheckCircle2,
  Calculator,
  Sparkles,
  Layout,
  FileText,
  UserCheck,
  BarChart3,
  ShieldCheck,
  Clock,
  Sliders,
  TrendingUp,
  FileSpreadsheet,
  Award,
  Layers,
  Check
} from 'lucide-react';

interface ServicesSectionProps {
  currency: Currency;
  onSelectService: (serviceId: string) => void;
  onOpenCalculator?: (serviceId?: string) => void;
}

// 1. Interactive Visual Preview Canvas for Slide Decks
const PresentationPreviewCanvas: React.FC = () => (
  <div className="relative w-full rounded-2xl border border-white/10 bg-[#08080C]/90 p-4 xs:p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden glass-card group">
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E5C158]/10 blur-2xl rounded-full pointer-events-none group-hover:bg-[#E5C158]/20 transition-all duration-500" />
    
    {/* Canvas Header */}
    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#E5C158] animate-pulse" />
        <span className="font-bold tracking-wider text-[#E5C158] uppercase text-[11px]">
          Executive Presentation Canvas
        </span>
      </div>
      <span className="text-[10px] text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">
        Slide 04 / 15
      </span>
    </div>

    {/* Slide Mockup Content */}
    <div className="bg-[#050507] rounded-xl border border-white/10 p-4 relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold font-poppins text-white">Q3 Financial Growth & Market Traction</span>
        <span className="text-[10px] font-mono text-[#28C76F] bg-[#28C76F]/10 px-2 py-0.5 rounded border border-[#28C76F]/20">
          +148% YoY Growth
        </span>
      </div>

      {/* Simulated Visual Chart */}
      <div className="grid grid-cols-4 gap-2 h-20 items-end border-b border-white/10 pb-2 mb-3 px-2">
        <div className="bg-white/10 rounded-t h-[40%] flex items-center justify-center text-[9px] text-neutral-400">Q1</div>
        <div className="bg-white/20 rounded-t h-[60%] flex items-center justify-center text-[9px] text-neutral-300">Q2</div>
        <div className="bg-[#E5C158]/40 rounded-t h-[80%] flex items-center justify-center text-[9px] text-[#E5C158]">Q3</div>
        <div className="bg-[#E5C158] rounded-t h-[100%] flex items-center justify-center text-[9px] text-[#050507] font-bold">Q4</div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-300">
        <div className="flex items-center gap-1.5 bg-white/[0.03] p-1.5 rounded border border-white/5">
          <Check className="w-3 h-3 text-[#E5C158]" />
          <span>Editable PPTX File</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/[0.03] p-1.5 rounded border border-white/5">
          <Check className="w-3 h-3 text-[#E5C158]" />
          <span>High-Res PDF Export</span>
        </div>
      </div>
    </div>
  </div>
);

// 2. Interactive Visual Preview Canvas for Assignment Writing
const AssignmentPreviewCanvas: React.FC = () => (
  <div className="relative w-full rounded-2xl border border-white/10 bg-[#08080C]/90 p-4 xs:p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden glass-card group">
    <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#28C76F]/10 blur-2xl rounded-full pointer-events-none group-hover:bg-[#28C76F]/20 transition-all duration-500" />
    
    {/* Canvas Header */}
    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
        <span className="font-bold tracking-wider text-[#28C76F] uppercase text-[11px]">
          Academic Compliance Verified
        </span>
      </div>
      <span className="text-[10px] text-[#28C76F] bg-[#28C76F]/10 px-2 py-0.5 rounded border border-[#28C76F]/30 font-semibold">
        0% Plagiarism
      </span>
    </div>

    {/* Document Mockup Content */}
    <div className="bg-[#050507] rounded-xl border border-white/10 p-4 relative font-sans">
      <div className="border-b border-white/5 pb-2.5 mb-3 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-white font-poppins">Managerial Economics & Thesis Report</h4>
          <p className="text-[10px] text-neutral-400">Word Count: 2,500 Words | Referencing: Harvard 2026</p>
        </div>
        <span className="text-[9px] font-mono bg-white/5 px-2 py-1 rounded text-neutral-300">APA / Harvard</span>
      </div>

      <div className="space-y-2 text-[10px] text-neutral-300 leading-relaxed bg-white/[0.02] p-3 rounded-lg border border-white/5">
        <p className="line-clamp-2 italic text-neutral-300">
          "Empirical analysis demonstrates that consumer price sensitivity correlates directly with macroeconomic rate shifts <span className="text-[#E5C158] font-medium">(Smith & Vance, 2026, p. 114)</span>..."
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-white/5">
        <span className="flex items-center gap-1 text-[#28C76F]">
          <CheckCircle2 className="w-3 h-3" />
          Turnitin Compatible
        </span>
        <span className="text-neutral-400 font-mono">Confidentiality Assured</span>
      </div>
    </div>
  </div>
);

// 3. Interactive Visual Preview Canvas for ATS Resume / CV
const ResumePreviewCanvas: React.FC = () => (
  <div className="relative w-full rounded-2xl border border-white/10 bg-[#08080C]/90 p-4 xs:p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden glass-card group">
    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#E5C158]/10 blur-2xl rounded-full pointer-events-none group-hover:bg-[#E5C158]/20 transition-all duration-500" />
    
    {/* Canvas Header */}
    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono">
      <div className="flex items-center gap-2">
        <Award className="w-4 h-4 text-[#E5C158]" />
        <span className="font-bold tracking-wider text-[#E5C158] uppercase text-[11px]">
          ATS Parser Optimization
        </span>
      </div>
      <span className="text-[10px] font-bold text-[#28C76F] bg-[#28C76F]/10 px-2 py-0.5 rounded border border-[#28C76F]/30">
        99% Recruiter Score
      </span>
    </div>

    {/* Resume Structure Mockup */}
    <div className="bg-[#050507] rounded-xl border border-white/10 p-4 space-y-3">
      <div className="flex justify-between items-start border-b border-white/5 pb-2">
        <div>
          <span className="text-xs font-bold text-white block">Executive Career Resume</span>
          <span className="text-[10px] text-neutral-400">Single/Double Column ATS Clean Format</span>
        </div>
        <span className="text-[10px] bg-[#E5C158]/10 text-[#E5C158] px-2 py-0.5 rounded border border-[#E5C158]/20">
          DOCX + PDF
        </span>
      </div>

      <div className="space-y-1.5">
        <span className="text-[9px] uppercase font-mono text-[#E5C158]">Keyword Matrix Alignment</span>
        <div className="flex flex-wrap gap-1">
          <span className="text-[9px] bg-white/5 border border-white/10 text-neutral-300 px-2 py-0.5 rounded">Strategic Planning</span>
          <span className="text-[9px] bg-white/5 border border-white/10 text-neutral-300 px-2 py-0.5 rounded">Financial Modeling</span>
          <span className="text-[9px] bg-white/5 border border-white/10 text-neutral-300 px-2 py-0.5 rounded">Team Leadership</span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
        <span>Recruiter Screening Pass Guarantee</span>
        <span className="text-white font-semibold">24-Hour Express</span>
      </div>
    </div>
  </div>
);

// 4. Interactive Visual Preview Canvas for Corporate Reports
const ReportPreviewCanvas: React.FC = () => (
  <div className="relative w-full rounded-2xl border border-white/10 bg-[#08080C]/90 p-4 xs:p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden glass-card group">
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E5C158]/10 blur-2xl rounded-full pointer-events-none group-hover:bg-[#E5C158]/20 transition-all duration-500" />
    
    {/* Canvas Header */}
    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-[#E5C158]" />
        <span className="font-bold tracking-wider text-[#E5C158] uppercase text-[11px]">
          Corporate Report Studio
        </span>
      </div>
      <span className="text-[10px] text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">
        Executive Edition
      </span>
    </div>

    {/* Report Mockup */}
    <div className="bg-[#050507] rounded-xl border border-white/10 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-white font-poppins">Annual Corporate Financial Audit</span>
        <span className="text-[9px] font-mono text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded">Automated TOC</span>
      </div>

      <div className="p-2.5 bg-white/[0.02] rounded-lg border border-white/5 space-y-1 text-[10px] text-neutral-300">
        <div className="flex justify-between border-b border-white/5 pb-1">
          <span>1. Executive Summary & Market Position</span>
          <span className="text-neutral-500">Page 03</span>
        </div>
        <div className="flex justify-between pt-1">
          <span>2. Financial Risk Assessment & Analytics</span>
          <span className="text-neutral-500">Page 12</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-white/5">
        <span className="flex items-center gap-1 text-[#28C76F]">
          <CheckCircle2 className="w-3 h-3" />
          Custom Data Charts
        </span>
        <span className="font-mono text-white">Print-Ready Formatting</span>
      </div>
    </div>
  </div>
);

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currency,
  onSelectService,
  onOpenCalculator,
}) => {
  // Fetch official services from content data
  const presentationService = SERVICES.find((s) => s.id === 'presentation') || SERVICES[0];
  const assignmentService = SERVICES.find((s) => s.id === 'assignment') || SERVICES[1];
  const resumeService = SERVICES.find((s) => s.id === 'ats-resume' || s.id === 'resume') || SERVICES[3];
  const reportsService = SERVICES.find((s) => s.id === 'reports') || SERVICES[6];

  const formatServicePricing = (service: ServiceItem) => {
    const isPkr = currency === 'PKR';
    const amount = isPkr ? service.pricePkr : service.priceUsd;
    const origAmount = isPkr ? service.originalPricePkr : service.originalPriceUsd;

    const formattedAmount = isPkr
      ? `PKR ${amount.toLocaleString()}`
      : `$${amount.toFixed(2)}`;
    const formattedOrig = isPkr
      ? `PKR ${origAmount.toLocaleString()}`
      : `$${origAmount.toFixed(2)}`;

    return (
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-2xl xs:text-3xl font-extrabold font-poppins text-[#E5C158]">
          {formattedAmount}
        </span>
        <span className="text-xs sm:text-sm text-neutral-400 font-medium">
          {service.unit}
        </span>
        <span className="text-xs text-neutral-500 line-through ml-1.5">
          {formattedOrig}
        </span>
        <span className="text-[10px] font-bold text-[#28C76F] bg-[#28C76F]/10 border border-[#28C76F]/25 px-2 py-0.5 rounded-full ml-1">
          50% OFF
        </span>
      </div>
    );
  };

  // 4 Core Showcase Configuration
  const showcases = [
    {
      id: 'presentation',
      label: '01 / PRESENTATION DESIGN',
      title: 'PowerPoint & Pitch Deck Design',
      serviceObj: presentationService,
      description: 'Executive pitch decks and academic slide decks engineered with modern visual structures, custom layouts, and compelling data graphics.',
      capabilities: [
        'Custom Slide Layouts & Typography',
        'Charts & Visual Data Graphics',
        'Editable PPTX & High-Res PDF Export',
        '100% Confidential & On-Time Delivery',
      ],
      canvas: <PresentationPreviewCanvas />,
      isReversed: false,
    },
    {
      id: 'assignment',
      label: '02 / ACADEMIC ASSIGNMENT',
      title: 'Assignment & Thesis Writing',
      serviceObj: assignmentService,
      description: 'Accurate academic assignment structures mapped to university parameters, delivered with meticulous research, references, and formatting.',
      capabilities: [
        'Strict APA / Harvard / MLA Referencing',
        '100% Plagiarism-Free Content Guarantee',
        'Deep Subject Matter Research',
        'Turnitin Compatibility Checked',
      ],
      canvas: <AssignmentPreviewCanvas />,
      isReversed: true,
    },
    {
      id: 'ats-resume',
      label: '03 / RESUMES & CAREER',
      title: 'ATS Resume Engineering & CV Design',
      serviceObj: resumeService,
      description: 'ATS-compliant resume engineering designed with precise keywords, clean structural hierarchy, and parser-friendly formatting.',
      capabilities: [
        'ATS Keyword Optimization Matrix',
        'Scannable Single & Double Column Layouts',
        'Recruiter Screening Compatible Structure',
        'Targeted Achievements & Executive Summary',
      ],
      canvas: <ResumePreviewCanvas />,
      isReversed: false,
    },
    {
      id: 'reports',
      label: '04 / CORPORATE & BUSINESS',
      title: 'Corporate Reports & Documentation',
      serviceObj: reportsService,
      description: 'In-depth corporate, financial, and technical business reports structured with executive summaries, data charts, and clean typography.',
      capabilities: [
        'Executive Summaries & Strategic Analysis',
        'Custom Financial Data Visualizations',
        'Professional Cover Page & Automated TOC',
        'Full Reference List & Standardized Margins',
      ],
      canvas: <ReportPreviewCanvas />,
      isReversed: true,
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 relative bg-[#050507] border-y border-white/5 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E5C158]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/25 text-[#E5C158] text-xs font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE DELIVERABLES & SERVICES</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-extrabold font-poppins text-white tracking-tight mb-4">
            What We <span className="gold-pure-gradient">Create</span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Professional documents and visual deliverables designed to make your work look exceptional.
          </p>
        </motion.div>

        {/* 4 Showcase Blocks - Alternating Layout */}
        <div className="space-y-12 sm:space-y-16">
          {showcases.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="glass-card rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 md:p-10 hover:border-[#E5C158]/35 transition-all duration-300 group shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  item.isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div
                  className={`lg:col-span-7 ${
                    item.isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/20 px-3 py-1 rounded-full mb-4 inline-block">
                    {item.label}
                  </span>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-white mb-3 group-hover:text-[#E5C158] transition-colors leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Capability Points Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 border-t border-white/10 pt-5">
                    {item.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs text-neutral-200">
                        <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing & Dual Action Buttons */}
                  <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                        Grand Launch Rate
                      </span>
                      {formatServicePricing(item.serviceObj)}
                    </div>

                    <div className="flex items-center gap-2.5 pt-2 sm:pt-0">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectService(item.id)}
                        className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-[#050507] font-extrabold text-xs tracking-wide shadow-[0_4px_20px_rgba(229,193,88,0.2)] hover:shadow-[0_6px_25px_rgba(229,193,88,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px] active:scale-[0.98]"
                      >
                        <span>Order Now</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onOpenCalculator?.(item.id)}
                        className="flex-1 sm:flex-none px-4 py-3 rounded-xl glass-card border border-white/15 hover:border-[#E5C158]/40 text-white font-semibold text-xs hover:bg-white/[0.06] transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] active:scale-[0.98]"
                      >
                        <Calculator className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
                        <span>Calculate Price</span>
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Interactive Visual Canvas Side */}
                <div
                  className={`lg:col-span-5 ${
                    item.isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {item.canvas}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner for Additional Specialized Services */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-16 sm:mt-20 glass-card rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-white/[0.02] via-transparent to-white/[0.02]"
        >
          <div>
            <h4 className="text-base sm:text-lg font-bold font-poppins text-white mb-1">
              Need Other Deliverables?
            </h4>
            <p className="text-xs text-neutral-400">
              We also format Investor Pitch Decks, Cover Letters, Case Studies, Document Cleanup & Infographics.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenCalculator?.('presentation')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#E5C158]/30 bg-[#E5C158]/10 hover:bg-[#E5C158]/20 text-[#E5C158] font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap min-h-[44px]"
          >
            <Sliders className="w-4 h-4" />
            <span>Open Custom Calculator</span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
