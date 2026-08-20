import React from 'react';
import { motion } from 'motion/react';
import { MEDIA_REGISTRY } from '../data/mediaRegistry';
import { AboutStudioCanvasVisual } from './AboutStudioCanvasVisual';
import { FounderAuthorityProfile } from './common/FounderAuthorityProfile';
import { AIEngineAnswerLayer } from './common/AIEngineAnswerLayer';
import { BrandAssetVisualGallery } from './common/BrandAssetVisualGallery';
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Award,
  Users,
  CheckCircle2,
  Globe,
  Zap,
  Lock,
  Headphones,
  FileCheck,
  ArrowRight,
  TrendingUp,
  Target,
  Compass,
  HeartHandshake,
  Check,
  Building2,
  PhoneCall,
  FileText,
  CreditCard,
  Send,
} from 'lucide-react';

interface AboutPageProps {
  onOpenOrderModal: () => void;
  onNavigatePage: (page: 'home' | 'services' | 'pricing' | 'reviews' | 'about') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenOrderModal,
  onNavigatePage,
}) => {
  const workspaceImg = MEDIA_REGISTRY.find((m) => m.id === 'about-workspace');
  const coreValues = [
    {
      icon: <Award className="w-6 h-6 text-[#E5C158]" />,
      title: 'Uncompromising Quality',
      description:
        'Every slide deck, assignment, resume, and report undergoes a multi-tier quality audit to guarantee visual and technical excellence.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#28C76F]" />,
      title: 'Honesty & Transparency',
      description:
        'Clear upfront pricing with our 50% Grand Launch discount. No hidden fees, no surprise add-ons, and honest turnaround commitments.',
    },
    {
      icon: <Clock className="w-6 h-6 text-[#E5C158]" />,
      title: 'Guaranteed On-Time Delivery',
      description:
        'We respect strict academic and corporate deadlines. Express delivery options from 6 to 24 hours keep your schedule protected.',
    },
    {
      icon: <Lock className="w-6 h-6 text-[#28C76F]" />,
      title: 'Strict Confidentiality',
      description:
        'Your personal details, project files, and research materials are encrypted and never shared or reused.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#E5C158]" />,
      title: '24/7 Dedicated Support',
      description:
        'Our online support team and AI Voice/Chat Assistant are active 24 hours a day to assist you in English, Urdu, and Roman Urdu.',
    },
    {
      icon: <Zap className="w-6 h-6 text-[#28C76F]" />,
      title: 'AI-Assisted Human Precision',
      description:
        'We combine cutting-edge AI analytical speed with experienced human subject matter experts for unmatched accuracy.',
    },
  ];

  const whyChooseUsFeatures = [
    {
      title: 'Executive Presentation Design',
      desc: 'Custom pitch decks and academic slide presentations with clean visual hierarchy, data graphics, and brand-aligned layouts.',
      tag: 'Decks & Slides',
    },
    {
      title: 'ATS-Compliant Resume Engineering',
      desc: 'Resumes crafted to pass Automated Tracking Systems with recruiter-backed keyword optimization and modern typography.',
      tag: 'Career Growth',
    },
    {
      title: 'Academic Writing & Research',
      desc: 'Custom assignments, case studies, and research reports strictly referenced (APA, Harvard, MLA) with zero plagiarism.',
      tag: 'Academic',
    },
    {
      title: 'Verified Payment Gateway',
      desc: 'Seamless manual payment processing in Pakistan via EasyPaisa, JazzCash, and Askari Bank with instant receipt validation.',
      tag: '100% Secure',
    },
    {
      title: 'Global Client Satisfaction',
      desc: 'Trusted by hundreds of students and professionals across Pakistan, UAE, Saudi Arabia, UK, USA, and Europe.',
      tag: 'Worldwide',
    },
    {
      title: 'Revision & Quality Guarantee',
      desc: 'Enjoy complimentary policy-backed revisions to ensure your complete satisfaction before final project acceptance.',
      tag: 'Risk-Free',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Choose Your Service',
      desc: 'Select from Presentation Design, Assignment Writing, ATS Resume, or Corporate Reports.',
      icon: <FileText className="w-5 h-5 text-[#E5C158]" />,
    },
    {
      step: '02',
      title: 'Submit Requirements',
      desc: 'Provide your guidelines, target length, slide count, deadline, and upload source files.',
      icon: <Compass className="w-5 h-5 text-[#28C76F]" />,
    },
    {
      step: '03',
      title: 'Complete Payment',
      desc: 'Send payment via EasyPaisa, JazzCash, or Askari Bank and upload your transaction proof.',
      icon: <CreditCard className="w-5 h-5 text-[#E5C158]" />,
    },
    {
      step: '04',
      title: 'Experts Start Working',
      desc: 'Our specialized team assigns your project to dedicated subject matter professionals.',
      icon: <Zap className="w-5 h-5 text-[#28C76F]" />,
    },
    {
      step: '05',
      title: 'Quality & Plagiarism Audit',
      desc: 'Rigorous review for formatting accuracy, reference integrity, and plagiarism-free verification.',
      icon: <FileCheck className="w-5 h-5 text-[#E5C158]" />,
    },
    {
      step: '06',
      title: 'Receive Completed Work',
      desc: 'Get your finalized files delivered on time directly with full editing rights.',
      icon: <Send className="w-5 h-5 text-[#28C76F]" />,
    },
  ];

  return (
    <div className="w-full pt-28 pb-20">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span>ABOUT MFS GROWTH AGENCY</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight"
        >
          About MFS Growth Agency — <span className="gradient-gold-text">Digital Services for Students & Professionals</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-neutral-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mb-8"
        >
          MFS Growth Agency is a premium online digital services brand dedicated to helping students and professionals succeed through high-impact presentation design, academic writing assistance, ATS resume engineering, and executive document formatting.
        </motion.p>

        {/* Action CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenOrderModal}
            className="px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
          >
            <span>Place Your First Order</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigatePage('services')}
            className="px-8 py-3.5 rounded-full bg-white/[0.05] border border-white/10 text-white font-semibold text-xs hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            Explore Services
          </motion.button>
        </div>

        {/* Agency Metrics Banner */}
        <div className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-3xl font-poppins font-extrabold text-[#E5C158]">50% OFF</span>
            <span className="text-xs text-neutral-400 mt-1 text-center">Active Grand Launch Promo on all services</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 lg:pt-2">
            <span className="text-3xl font-poppins font-extrabold text-[#28C76F]">100%</span>
            <span className="text-xs text-neutral-400 mt-1 text-center">Verified via Turnitin & Plagiarism Audit</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 lg:pt-2">
            <span className="text-3xl font-poppins font-extrabold text-white">24 / 7</span>
            <span className="text-xs text-neutral-400 mt-1 text-center">WhatsApp & Multi-lingual AI Assistant</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 lg:pt-2">
            <span className="text-3xl font-poppins font-extrabold text-[#E5C158]">100%</span>
            <span className="text-xs text-neutral-400 mt-1 text-center">Policy-backed SLA for Express & Standard Orders</span>
          </div>
        </div>
      </section>

      {/* 2. Who We Are & Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Story */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E5C158]/10 border border-[#E5C158]/20 text-[#E5C158] text-[11px] font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>WHO WE ARE & OUR STORY</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white leading-tight">
              Driven by Quality, Built on <span className="gradient-gold-text">Trust & Excellence</span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              MFS Growth Agency was founded in Islamabad, Pakistan by <strong>Muhammad Shehroz Sultan</strong> (Founder &amp; Lead Director) to provide high-quality digital solutions, executive presentation design, custom academic assignments, ATS resume engineering, and corporate document formatting. We recognized that students and working professionals often face tight deadlines, strict formatting guidelines, and high stakes without reliable support.
            </p>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              What started as a specialized document formatting service has expanded into an international agency trusted across Pakistan, the Middle East, the UK, the US, and Europe. Today, our multidisciplinary team of presentation designers, academic editors, and ATS resume engineers combines human craftsmanship with AI-assisted efficiency.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0" />
                <span>Global Support Desk</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0" />
                <span>24/7 Multi-lingual Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0" />
                <span>50% Grand Launch Promo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0" />
                <span>Zero Plagiarism Guarantee</span>
              </div>
            </div>
          </div>

          {/* Studio Media & Mission & Vision Cards */}
          <div className="space-y-6">
            {/* Visual Agency Studio Banner - 100% Fail-Safe Enterprise Canvas Visual */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <AboutStudioCanvasVisual />
            </motion.div>

            <div className="glass-card rounded-2xl border border-white/10 p-6 relative overflow-hidden group hover:border-[#E5C158]/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-poppins font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                To provide accessible, high-quality, and stress-free digital solutions that enable students to achieve academic honors and empower professionals to advance their careers with confidence.
              </p>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-6 relative overflow-hidden group hover:border-[#E5C158]/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-center text-[#28C76F]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-poppins font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                To become the premier global online digital agency recognized for speed, uncompromised quality, transparent pricing, and client satisfaction across academic and corporate domains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.4 Dedicated Founder & Executive Leadership Authority Profile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <FounderAuthorityProfile
          onOpenOrderModal={onOpenOrderModal}
          onNavigatePage={onNavigatePage}
        />
      </section>

      {/* 2.5 Official Agency Entity & Knowledge Layer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-8 sm:p-10 relative overflow-hidden bg-gradient-to-br from-[#0A0A0F] via-[#050507] to-black">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-[11px] font-semibold mb-3">
                <Globe className="w-3.5 h-3.5" />
                <span>OFFICIAL AGENCY ENTITY & KNOWLEDGE PROFILE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white">
                MFS Growth Agency — Brand Profile & Global Reach
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 shrink-0">
              Verified Entity • 24/7 Global Service
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-neutral-300">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#E5C158] block tracking-wider">FOUNDER & LEADERSHIP</span>
              <p className="font-poppins font-bold text-white text-sm">Muhammad Shehroz Sultan</p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Founder & Lead Director overseeing agency operations, document quality standards, and digital service architecture.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#28C76F] block tracking-wider">HEADQUARTERS & DESK</span>
              <p className="font-poppins font-bold text-white text-sm">Islamabad HQ (Global Digital Desk)</p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Headquartered in Islamabad, Pakistan with 24/7 online delivery operations serving clients across Pakistan and 15+ countries globally.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#E5C158] block tracking-wider">CORE COMPETENCIES</span>
              <p className="font-poppins font-bold text-white text-sm">4 Primary Pillars</p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Presentation Design, Academic Assignment Writing (APA/Harvard/MLA), ATS Resume Engineering, and Corporate Reports.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#28C76F] block tracking-wider">TOPIC CLUSTERS & GUIDES</span>
              <p className="font-poppins font-bold text-white text-sm">4 Master Guides</p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Educational research hubs covering ATS parsing mechanics, 10-slide pitch decks, academic referencing, and corporate layouts.
              </p>
            </div>
          </div>

          {/* Disambiguation & Entity Scope Notice */}
          <div className="mt-6 p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] text-neutral-400 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Brand &amp; Entity Disambiguation:</strong> MFS Growth Agency is an independent digital services brand based in Islamabad, Pakistan, specializing in executive presentation design, custom academic assignment assistance, ATS resume engineering, and corporate document formatting. MFS Growth Agency is not affiliated with, sponsored by, or connected to any financial investment management or asset management entities.
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigatePage('services')}
                className="text-[#E5C158] font-bold hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigatePage('guides' as any)}
                className="text-neutral-300 font-semibold hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <span>Explore Knowledge Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigatePage('faq' as any)}
                className="text-neutral-300 font-semibold hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <span>Read Agency FAQs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">
              OFFICIAL-ENTITY-ID: https://mfsgrowth.online/#organization
            </span>
          </div>
        </div>
      </section>

      {/* 3. Our Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] block mb-2">
            PRINCIPLES & COMMITMENT
          </span>
          <h2 className="text-3xl font-extrabold font-poppins text-white mb-4">
            Our Core <span className="gradient-gold-text">Agency Values</span>
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Every client interaction and project deliverable is guided by six foundational pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-white/10 p-6 hover:border-[#E5C158]/40 transition-all group"
            >
              <div className="mb-4">{value.icon}</div>
              <h3 className="font-poppins font-bold text-white text-base mb-2 group-hover:text-[#E5C158] transition-colors">
                {value.title}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Quality Assurance & Data Confidentiality Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-[#0A0A0F] via-[#050507] to-black shadow-2xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold uppercase tracking-widest mb-4">
              <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
              <span>AGENCY STANDARDS & CONFIDENTIALITY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white mb-4">
              Quality Assurance & Data Confidentiality Standards
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Our multi-phase quality control pipeline ensures every deliverable meets rigorous formatting standards while your personal files and project details remain strictly confidential.
            </p>
          </div>

          {/* 3 QA Stages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 relative hover:border-[#E5C158]/40 transition-colors group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/30 px-2.5 py-1 rounded-full uppercase">
                  Stage 01
                </span>
                <FileCheck className="w-5 h-5 text-[#E5C158]" />
              </div>
              <h3 className="font-poppins font-bold text-white text-base group-hover:text-[#E5C158] transition-colors">
                Format & Rubric Verification
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Submitted requirements, formatting instructions, academic rubrics, citation styles (APA, Harvard, MLA, IEEE, Oxford), slide layouts, and project scope are thoroughly reviewed before work begins to guarantee alignment with your brief.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 relative hover:border-[#28C76F]/40 transition-colors group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#28C76F] bg-[#28C76F]/10 border border-[#28C76F]/30 px-2.5 py-1 rounded-full uppercase">
                  Stage 02
                </span>
                <CheckCircle2 className="w-5 h-5 text-[#28C76F]" />
              </div>
              <h3 className="font-poppins font-bold text-white text-base group-hover:text-[#28C76F] transition-colors">
                Custom Originality Audit
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Presentations, research reports, ATS resumes, and formatting deliverables are prepared custom according to your specific guidelines. All projects are drafted from scratch to deliver original, authentic work tailored to your objectives.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 relative hover:border-[#E5C158]/40 transition-colors group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/30 px-2.5 py-1 rounded-full uppercase">
                  Stage 03
                </span>
                <ShieldCheck className="w-5 h-5 text-[#E5C158]" />
              </div>
              <h3 className="font-poppins font-bold text-white text-base group-hover:text-[#E5C158] transition-colors">
                Pre-Delivery Quality Check
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Deliverables receive a comprehensive final inspection for visual hierarchy, typography, data graphics, and reference accuracy before being released through the Client Dashboard, WhatsApp, or Email.
              </p>
            </div>
          </div>

          {/* Data Confidentiality Subsection */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-center text-[#28C76F] shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-white text-lg">
                  Data Confidentiality & File Privacy
                </h3>
                <p className="text-xs text-neutral-400">
                  How we protect your project materials, personal data, and payment verification proofs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-xs text-neutral-300">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="font-bold text-white block">Project File Protection</span>
                <p className="leading-relaxed">
                  Uploaded guidelines, briefs, and source files are handled confidentially and accessed strictly by assigned project specialists during execution.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="font-bold text-white block">Payment Verification Security</span>
                <p className="leading-relaxed">
                  Payment transfer screenshots uploaded during manual checkout (EasyPaisa, JazzCash, Askari Bank) are used solely for invoice validation and accounting.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="font-bold text-white block">Portfolio Anonymization</span>
                <p className="leading-relaxed">
                  Client identities, academic institutions, and personal details are never published publicly or showcased without explicit consent and anonymization.
                </p>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 italic mb-8 bg-white/[0.01] p-3 rounded-lg border border-white/5">
              * Safety Note: While no internet data transmission can guarantee 100% absolute security, MFS Growth Agency adheres to strict internal file confidentiality and operational privacy protocols.
            </p>

            {/* Internal CTA Links */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-6">
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePage('services');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#E5C158] hover:underline cursor-pointer"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePage('contact' as any);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Contact the Quality Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <span className="text-[10px] font-mono text-neutral-500">
                QA-SLA-VERIFIED • MFS GROWTH
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our 6-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] block mb-2">
            SIMPLE & EFFICIENT
          </span>
          <h2 className="text-3xl font-extrabold font-poppins text-white mb-4">
            How Our <span className="gradient-gold-text">Order Process</span> Works
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            From initial requirement submission to final delivery, experience our streamlined 6-step workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((s, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-white/10 p-6 relative group hover:border-[#E5C158]/40 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-poppins font-extrabold text-[#E5C158] opacity-80">
                  {s.step}
                </span>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">{s.icon}</div>
              </div>
              <h3 className="font-poppins font-bold text-white text-base mb-2 group-hover:text-[#E5C158] transition-colors">
                {s.title}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Why Clients Trust Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="glass-card rounded-2xl border border-white/10 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-poppins font-bold text-white text-base">Verified Payment Accounts</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              In Pakistan, manual payment instructions (EasyPaisa / JazzCash / Bank Transfer) are provided securely once you proceed to order checkout.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-center text-[#28C76F]">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-poppins font-bold text-white text-base">Direct WhatsApp Support</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Have questions or complex custom requirements? Get instant assistance directly on WhatsApp at <strong className="text-[#E5C158]">+92 301 5323689</strong> or email <strong className="text-white">mfsmedia.agency@gmail.com</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-poppins font-bold text-white text-base">Sample Work Protection</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              All portfolio samples under <strong className="text-white">"Our Work"</strong> are protected with secured view previews to ensure safety and quality standards across all projects.
            </p>
          </div>
        </div>
      </section>

      {/* 6.5 AI Search Engine & Ground Truth Fact Sheet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <AIEngineAnswerLayer />
      </section>

      {/* 6.6 Official Google Indexed Media & Brand Asset Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <BrandAssetVisualGallery />
      </section>

      {/* 7. Call To Action (CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-r from-[#E5C158]/10 via-transparent to-black">
          <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white mb-4">
            Ready to Elevate Your Project Quality Today?
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Take advantage of our <strong className="text-[#E5C158]">50% Grand Launch Discount</strong> and get executive-level presentation design, ATS resumes, or research assignments delivered on time.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenOrderModal}
              className="px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
            >
              <span>Place Your Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigatePage('pricing')}
              className="px-8 py-3.5 rounded-full bg-white/[0.05] border border-white/10 text-white font-semibold text-xs hover:bg-white/10 transition-all cursor-pointer"
            >
              View Interactive Pricing Calculator
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
