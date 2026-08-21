import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Presentation,
  Briefcase,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FolderOpen,
  MessageCircle,
  Clock,
  Award,
  Zap,
} from 'lucide-react';
import { Currency } from '../types';

interface OurWorkPageProps {
  currency?: Currency;
  onOpenOrderModal: (serviceId?: string, customNote?: string) => void;
  onOpenAIChat?: (initialQuery?: string) => void;
  onShowToast: (msg: string) => void;
  onNavigatePage?: (page: any, targetSection?: string) => void;
}

export const OurWorkPage: React.FC<OurWorkPageProps> = ({
  onOpenOrderModal,
  onShowToast,
  onNavigatePage,
}) => {
  const workCategories = [
    {
      id: 'assignments-notes',
      serviceId: 'assignment',
      title: 'Assignments & Notes',
      tagline: 'Academic & Research Excellence',
      badge: 'Academic Coursework',
      driveLink:
        'https://drive.google.com/drive/folders/1ZgctP4_6mkXi3oMrpnLzil2Q0-RRobHe?usp=drive_link',
      icon: GraduationCap,
      description:
        'Comprehensive university assignments, research reports, case study analyses, and structured study notes formatted to APA, Harvard, MLA, and Chicago standards.',
      features: [
        'Rigorous research papers & literature reviews',
        'Strict formatting (APA, Harvard, MLA, Chicago)',
        'Free Turnitin & AI similarity reports included',
        'Structured chapter breakdowns & executive summaries',
      ],
      turnaround: '24 - 48 Hours',
      accentColor: '#d4af37',
    },
    {
      id: 'pitch-decks',
      serviceId: 'presentation',
      title: 'Pitch Decks & Presentations',
      tagline: 'Investor & Boardroom Ready',
      badge: 'Executive Slide Suites',
      driveLink:
        'https://drive.google.com/drive/folders/1jVmwb__kNYUtM71tR-gwn3Ecgh8NwL5y?usp=sharing',
      icon: Presentation,
      description:
        'High-converting pitch decks, academic presentations, conference slide decks, and boardroom keynote designs built with custom layouts, infographics, and typography.',
      features: [
        'Investor-ready Seed & Series A pitch architecture',
        'Academic dissertation & conference defense decks',
        'Custom vector infographics & financial data charts',
        'Structured per 10-slide high-density formats',
      ],
      turnaround: '24 - 48 Hours',
      accentColor: '#d4af37',
      isPopular: true,
    },
    {
      id: 'cv-resumes',
      serviceId: 'resume',
      title: 'CV & Resumes',
      tagline: 'Career & Executive Advancement',
      badge: 'ATS-Engineered Assets',
      driveLink:
        'https://drive.google.com/drive/folders/1XFkAgU9iH0QzQuVb_AzS-zPimAaumUy3?usp=sharing',
      icon: Briefcase,
      description:
        '99%+ ATS-compliant resumes, corporate CVs, and high-impact cover letters optimized for international applicant tracking systems and modern hiring managers.',
      features: [
        '99%+ ATS parser pass rate guarantee',
        'Corporate, executive & modern creative formats',
        'Tailored high-conversion cover letter pairings',
        'Keyword density & skills taxonomy optimization',
      ],
      turnaround: '24 Hours',
      accentColor: '#d4af37',
    },
  ];

  const handleOrderClick = (serviceId: string, title: string) => {
    onOpenOrderModal(
      serviceId,
      `I would like to order a project inspired by the sample work in "${title}".`
    );
    onShowToast(`Selected category: ${title}. Complete your project details.`);
  };

  const handleWhatsAppInquiry = (categoryTitle: string) => {
    const message = encodeURIComponent(
      `Hello MFS Growth Agency! I reviewed your "${categoryTitle}" samples on your Our Work portfolio page and would like to get a project done. Could you assist me with pricing and delivery?`
    );
    window.open(`https://wa.me/923015323689?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white pt-24 sm:pt-32 pb-24 relative overflow-hidden font-sans">
      {/* Background Luxury Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#d4af37]/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#d4af37]/3 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. LUXURY HERO HEADER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-4xl mx-auto mb-16 sm:mb-20"
        >
          {/* Top Gold Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>MFS GROWTH AGENCY — OUR OFFICIAL WORK</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold font-poppins text-white tracking-tight leading-[1.15] mb-6">
            Our Work —{' '}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f7e096] to-[#d4af37] bg-clip-text text-transparent">
              Verified Deliverables &amp; Portfolio
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto font-normal mb-10">
            Explore authentic, client-approved deliverables across academic coursework, executive pitch decks, and ATS-optimized career documentation. Access our live, verified Google Drive folders directly below.
          </p>

          {/* Executive Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-[#111114] border border-[#d4af37]/20 shadow-lg text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#d4af37] block font-poppins">
                500+
              </span>
              <span className="text-xs text-neutral-400 font-medium">Projects Delivered</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#111114] border border-[#d4af37]/20 shadow-lg text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#28c76f] block font-poppins">
                4.9 / 5.0
              </span>
              <span className="text-xs text-neutral-400 font-medium">Verified Client Rating</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#111114] border border-[#d4af37]/20 shadow-lg text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-white block font-poppins">
                100%
              </span>
              <span className="text-xs text-neutral-400 font-medium">Original &amp; Customized</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#111114] border border-[#d4af37]/20 shadow-lg text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#d4af37] block font-poppins">
                50% OFF
              </span>
              <span className="text-xs text-neutral-400 font-medium">Grand Launch Active</span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. THE THREE CLEAN PORTFOLIO CARDS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-20">
          {workCategories.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`relative rounded-3xl bg-[#111114] border ${
                  card.isPopular
                    ? 'border-[#d4af37] shadow-[0_0_35px_rgba(212,175,55,0.18)]'
                    : 'border-white/10 hover:border-[#d4af37]/60'
                } p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)] group`}
              >
                {/* Popular Badge if applicable */}
                {card.isPopular && (
                  <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#d4af37] to-[#f7e096] text-[#0b0b0b] px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#0b0b0b] fill-[#0b0b0b]" />
                    <span>MOST REQUESTED</span>
                  </div>
                )}

                <div>
                  {/* Top Header: Icon & Category Tag */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#0b0b0b] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:scale-110 group-hover:border-[#d4af37] transition-all shadow-md">
                      <IconComp className="w-7 h-7" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#d4af37] text-[11px] font-bold uppercase tracking-wider font-mono">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold font-poppins text-white group-hover:text-[#d4af37] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#d4af37]/90 font-mono font-medium mt-1">
                      {card.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-8 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-3">
                      Deliverable Highlights:
                    </span>
                    {card.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                        <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Turnaround Badge */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-8 bg-[#0b0b0b] border border-white/10 p-3 rounded-xl">
                    <Clock className="w-4 h-4 text-[#d4af37]" />
                    <span>Average Delivery:</span>
                    <strong className="text-white font-semibold">{card.turnaround}</strong>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-3 pt-2">
                  {/* Primary Google Drive Link */}
                  <a
                    href={card.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f7e096] to-[#d4af37] hover:brightness-110 text-[#0b0b0b] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] cursor-pointer group/btn"
                  >
                    <FolderOpen className="w-4 h-4 text-[#0b0b0b]" />
                    <span>Open Google Drive Samples</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#0b0b0b] group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>

                  {/* Secondary Order Button */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => handleOrderClick(card.serviceId, card.title)}
                      className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#d4af37]/40 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Order This</span>
                    </button>

                    <button
                      onClick={() => handleWhatsAppInquiry(card.title)}
                      className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold text-emerald-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. VERIFIED SECURITY & COPYRIGHT ASSURANCE */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-3xl bg-[#111114] border border-[#d4af37]/30 p-8 sm:p-10 mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold font-mono uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>CONFIDENTIALITY &amp; COPYRIGHT PROTOCOL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                Authentic Past Work • Secured Client Previews
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                All samples showcased in the Google Drive folders represent authentic deliverables created by MFS Growth Agency with client authorization. When you place an order, you receive 100% freshly researched, bespoke content tailored to your unique specifications.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onOpenOrderModal()}
                className="py-3.5 px-6 rounded-xl bg-[#d4af37] hover:bg-[#f7e096] text-[#0b0b0b] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
              >
                <span>Start Your Custom Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const msg = encodeURIComponent('Hello MFS Growth Agency! I would like to discuss a custom project inquiry.');
                  window.open(`https://wa.me/923015323689?text=${msg}`, '_blank');
                }}
                className="py-3.5 px-6 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp (24/7)</span>
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
