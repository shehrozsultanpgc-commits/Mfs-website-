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
  Zap,
} from 'lucide-react';

interface PortfolioSectionProps {
  onShowToast: (msg: string) => void;
  onOpenOrderModal?: (serviceId?: string, customNote?: string) => void;
  onNavigatePage?: (page: any) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onShowToast,
  onOpenOrderModal,
  onNavigatePage,
}) => {
  const sampleDecks = [
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
        'University assignments, coursework, case study papers, and structured study notes formatted to APA, Harvard, MLA, and Chicago standards with verified citations.',
      features: [
        'Rigorous research papers & literature reviews',
        'Strict formatting (APA, Harvard, MLA, Chicago)',
        'Free Turnitin & AI similarity reports included',
      ],
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
        'High-converting pitch decks, academic defense slides, conference presentations, and corporate keynote decks with bespoke layouts and custom infographics.',
      features: [
        'Investor Seed & Series A pitch architecture',
        'Academic dissertation & conference presentations',
        'Custom vector infographics & data charts',
      ],
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
      ],
    },
  ];

  return (
    <section
      id="portfolio"
      className="py-20 sm:py-28 relative bg-[#0b0b0b] border-t border-white/5 overflow-hidden font-sans"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#d4af37]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. SECTION INTRO */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(212,175,55,0.12)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SELECTED WORK SHOWCASE</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-extrabold font-poppins text-white tracking-tight mb-5">
            Our Work —{' '}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f7e096] to-[#d4af37] bg-clip-text text-transparent">
              Sample Deliverables &amp; Portfolio
            </span>
          </h2>

          <p className="text-neutral-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Explore authentic, client-approved sample folders on Google Drive. Review verified past deliverables across assignments, executive presentations, and ATS resumes.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. 3 CLEAN PORTFOLIO CARDS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {sampleDecks.map((card, index) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className={`relative rounded-3xl bg-[#111114] border ${
                  card.isPopular
                    ? 'border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.15)]'
                    : 'border-white/10 hover:border-[#d4af37]/50'
                } p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)] group`}
              >
                {card.isPopular && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-[#d4af37] to-[#f7e096] text-[#0b0b0b] px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#0b0b0b] fill-[#0b0b0b]" />
                    <span>FEATURED</span>
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-[#0b0b0b] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:scale-110 group-hover:border-[#d4af37] transition-all">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold uppercase tracking-wider font-mono">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-poppins text-white group-hover:text-[#d4af37] transition-colors mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#d4af37]/90 font-mono font-medium mb-4">
                    {card.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    {card.description}
                  </p>

                  <div className="space-y-2 mb-6 pt-3 border-t border-white/10">
                    {card.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <a
                    href={card.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#d4af37] hover:bg-[#f7e096] text-[#0b0b0b] font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <FolderOpen className="w-4 h-4" />
                    <span>Open Drive Folder</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      if (onOpenOrderModal) {
                        onOpenOrderModal(card.serviceId, `Inspired by ${card.title} samples.`);
                      }
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Order In This Style</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. UNIFIED DESTINATION CTA */}
        {/* ========================================================================= */}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              if (onNavigatePage) {
                onNavigatePage('our-work');
              }
            }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#111114] hover:bg-[#18181c] border border-[#d4af37]/40 hover:border-[#d4af37] text-white hover:text-[#d4af37] font-bold text-sm transition-all shadow-lg cursor-pointer group"
          >
            <span>View Full "Our Work" Portfolio Page</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#d4af37]" />
          </button>
        </div>

      </div>
    </section>
  );
};
