import React from 'react';
import { motion } from 'motion/react';
import { MFSLogo } from './MFSLogo';
import {
  Award,
  ShieldCheck,
  Globe,
  Sparkles,
  ExternalLink,
  Mail,
  Phone,
  CheckCircle2,
  BookOpen,
  Briefcase,
  Terminal,
  FileCheck,
  Building,
  UserCheck
} from 'lucide-react';

interface FounderAuthorityProfileProps {
  onOpenOrderModal?: () => void;
  onNavigatePage?: (page: 'home' | 'services' | 'pricing' | 'reviews' | 'about') => void;
}

export const FounderAuthorityProfile: React.FC<FounderAuthorityProfileProps> = ({
  onOpenOrderModal,
  onNavigatePage,
}) => {
  return (
    <div className="w-full rounded-3xl border border-[#E5C158]/35 bg-[#08080C] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden font-sans my-8">
      {/* Golden Luxury Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5C158]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#28C76F]/05 blur-[90px] rounded-full pointer-events-none" />

      {/* Top Identity Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E5C158] to-[#D4AF37] text-neutral-950 flex items-center justify-center font-bold shadow-lg">
            <UserCheck className="w-5 h-5 text-neutral-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold font-poppins text-white tracking-tight">
                Founder &amp; Executive Leadership Authority
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#E5C158]/15 border border-[#E5C158]/35 text-[#E5C158] font-mono font-semibold">
                VERIFIED ENTITY
              </span>
            </div>
            <p className="text-xs text-[#9FA0A7] font-mono">
              Knowledge Graph Entity ID: https://mfsgrowth.online/#founder
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-black/50 px-3 py-1.5 rounded-full border border-white/10">
          <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
          <span>Official MFS Brand Leadership</span>
        </div>
      </div>

      {/* Main Grid: Founder Bio & Credentials */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Founder Card & Direct Contacts (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/60 p-6 relative overflow-hidden text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-5 mb-5">
              {/* Founder Avatar / MFS Emblem */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#E5C158] via-[#D4AF37] to-[#8C6B14] p-0.5 shadow-[0_10px_30px_rgba(229,193,88,0.3)] shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-[14px] bg-[#0A0A0F] flex flex-col items-center justify-center p-2 text-white">
                  <MFSLogo variant="icon" size={48} />
                  <span className="text-[9px] font-bold font-poppins text-[#E5C158] tracking-widest mt-1 uppercase">
                    MFS
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-poppins text-white leading-snug">
                  Muhammad Shehroz Sultan
                </h3>
                <p className="text-xs text-[#E5C158] font-semibold font-poppins mt-0.5">
                  Founder &amp; Lead Director — MFS Growth Agency
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/25 text-[#E5C158] font-mono">
                    Online Operations
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#28C76F]/10 border border-[#28C76F]/25 text-[#28C76F] font-mono">
                    Global Desk
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-light mb-5">
              Digital entrepreneur, document architect, and executive presentation strategist. Muhammad Shehroz Sultan established MFS Growth Agency as an agile, digital-first agency to bridge the gap between academic standards, high-stakes corporate pitch presentations, and automated ATS hiring systems globally. Operating 100% online, the agency serves an international clientele while developing its future physical corporate headquarters.
            </p>

            {/* Direct Official Contact Anchors */}
            <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
              <a
                href="mailto:mfsmedia.agency@gmail.com"
                className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 hover:bg-white/5 border border-white/5 text-neutral-300 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>mfsmedia.agency@gmail.com</span>
                </span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>

              <a
                href="https://wa.me/923015323689"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 hover:bg-white/5 border border-white/5 text-neutral-300 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#28C76F]" />
                  <span>+92 301 5323689 (Official Desk)</span>
                </span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
            </div>
          </div>

          {/* Social Graph Links for Entity Validation */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-2 font-semibold">
              Verified Social Profiles (Google sameAs Graph)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://www.linkedin.com/in/muhammad-shehroz-sultan-1237543a9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-xs text-neutral-300 hover:text-[#E5C158] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href="https://www.crunchbase.com/person/muhammad-shehroz-sultan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-xs text-neutral-300 hover:text-[#E5C158] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Crunchbase Bio</span>
              </a>
              <a
                href="https://www.instagram.com/mfsgrowth?igsh=M2JwbWJ5M2txc2Z1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-xs text-neutral-300 hover:text-[#E5C158] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                <span>Instagram Profile</span>
              </a>
              <a
                href="https://www.facebook.com/share/1G4CCwakiW/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-xs text-neutral-300 hover:text-[#E5C158] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Facebook Page</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Core Expertise & Brand Architecture (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Executive Bio & Authority Statement */}
          <div className="space-y-3">
            <h4 className="text-base sm:text-lg font-bold font-poppins text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E5C158]" />
              Strategic Leadership &amp; Operational Standards
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Under the direction of <strong>Muhammad Shehroz Sultan</strong>, MFS Growth Agency operates with strict quality standards across all four core service verticals:
            </p>
          </div>

          {/* 4 Pillars of Excellence under Shehroz's Leadership */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white font-poppins">
                <div className="w-6 h-6 rounded-md bg-[#E5C158]/15 text-[#E5C158] flex items-center justify-center text-xs">
                  01
                </div>
                <span>Executive Pitch Decks</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Structured visual hierarchy, 10-slide venture frameworks, and high-impact investor narrative design.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white font-poppins">
                <div className="w-6 h-6 rounded-md bg-[#28C76F]/15 text-[#28C76F] flex items-center justify-center text-xs">
                  02
                </div>
                <span>Academic Document Precision</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Zero plagiarism assignments with strict APA 7th, Harvard, and MLA citation compliance.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white font-poppins">
                <div className="w-6 h-6 rounded-md bg-[#E5C158]/15 text-[#E5C158] flex items-center justify-center text-xs">
                  03
                </div>
                <span>ATS Resume Optimization</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Single-column linear parsing engineering tested against Workday, Taleo, and Greenhouse ATS algorithms.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white font-poppins">
                <div className="w-6 h-6 rounded-md bg-[#28C76F]/15 text-[#28C76F] flex items-center justify-center text-xs">
                  04
                </div>
                <span>Corporate Reporting</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Executive summaries, financial briefs, and whitepapers formatted to international corporate standards.
              </p>
            </div>
          </div>

          {/* Official Entity Disambiguation Box (Critical for Google Search Disambiguation) */}
          <div className="p-4 rounded-xl bg-black/60 border border-[#E5C158]/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E5C158]">
              <Building className="w-4 h-4" />
              <span>Entity Disambiguation &amp; Brand Notice</span>
            </div>
            <p className="text-[11px] text-neutral-300 leading-relaxed">
              <strong>MFS Growth Agency</strong> is an independent digital-first services brand founded and operated by <strong>Muhammad Shehroz Sultan</strong>. We operate fully online delivering 24/7 client solutions worldwide, with a dedicated corporate physical headquarters in progress. We specialize exclusively in digital document formatting, academic assistance, ATS resume engineering, and executive presentation design. MFS Growth Agency is completely independent and not associated with any legacy financial, investment, or mutual fund institutions.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {onOpenOrderModal && (
              <button
                onClick={onOpenOrderModal}
                className="px-5 py-2.5 rounded-xl bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <span>Consult with MFS Team</span>
              </button>
            )}
            {onNavigatePage && (
              <button
                onClick={() => onNavigatePage('services')}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-all cursor-pointer"
              >
                <span>View Full Services</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
