import React, { useState } from 'react';
import { Currency } from '../types';
import { ProjectJourneyMovie } from './ProjectJourneyMovie';
import { useRealtimeOrder } from '../hooks/useRealtimeOrder';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Bot,
  Zap,
  Briefcase,
  Layers,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  UserCheck,
  Calendar,
  FileCheck,
  RefreshCw,
  Plus,
  Filter,
  Search,
  Check,
  Info,
  Sliders,
  Award,
  ArrowRight,
  Eye,
  FileText,
  Building2,
  FolderUp,
  Download,
  Play
} from 'lucide-react';

interface AILiveProjectTrackingProps {
  currency: Currency;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (
    page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard',
    targetSection?: string
  ) => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
  setActiveTab?: (tab: string) => void;
}

export const AILiveProjectTracking: React.FC<AILiveProjectTrackingProps> = ({
  currency,
  onShowToast,
  onNavigatePage,
  onOpenAIChat,
  setActiveTab,
}) => {
  // Filter for Timeline Milestones
  const [stageFilter, setStageFilter] = useState<'all' | 'completed' | 'active' | 'upcoming'>('all');

  // Realtime Order Subscription
  const { status: liveStatus, isSubscribed } = useRealtimeOrder('PRJ-MFS-849201', 'in_progress');

  // Filter for Project History Logs
  const [historyFilter, setHistoryFilter] = useState<'today' | 'week' | 'month' | 'all'>('today');

  // Toggle for testing empty state
  const [hasActiveProject, setHasActiveProject] = useState(true);

  // Phase 3 Checklist Modal
  const [showChecklistModal, setShowChecklistModal] = useState(false);

  // MFS AI Project Journey Movie Modal
  const [showJourneyMovie, setShowJourneyMovie] = useState(false);

  // Timeline Milestones Data
  const milestones = [
    {
      id: 1,
      title: 'Order Received & Document Ingestion',
      stageNum: 1,
      status: 'completed',
      time: 'Today • 09:30 AM PKT',
      dept: 'Order Management Desk',
      desc: 'Order PRJ-MFS-849201 successfully registered. 10-Slide Executive Presentation package configured with 50% Grand Launch discount.',
      aiExplanation: 'MFS AI ingested initial guidelines and validated source document structure.',
      icon: Briefcase,
    },
    {
      id: 2,
      title: 'Payment Verified & EasyPaisa Proof Approved',
      stageNum: 2,
      status: 'completed',
      time: 'Today • 09:45 AM PKT',
      dept: 'Finance & Billing Unit',
      desc: 'Payment of PKR 2,500 verified via EasyPaisa (••••1234). Official tax invoice #INV-849201 generated.',
      aiExplanation: 'MFS Financial Scanner matched transaction ID ••••1234 with 100% confidence.',
      icon: FileCheck,
    },
    {
      id: 3,
      title: 'Requirements & Design Brief Reviewed',
      stageNum: 3,
      status: 'completed',
      time: 'Today • 10:00 AM PKT',
      dept: 'Creative Direction',
      desc: 'Color palette preferences, dark luxury aesthetic, and gold tokens (#E5C158) locked for design team.',
      aiExplanation: 'MFS Creative AI extracted key presentation themes and mapped typographic scales.',
      icon: Layers,
    },
    {
      id: 4,
      title: 'Senior Presentation Designer Allocated',
      stageNum: 4,
      status: 'completed',
      time: 'Today • 10:15 AM PKT',
      dept: 'Design Division Team A',
      desc: 'Lead Presentation Designer assigned alongside MFS AI Real-Time Assistant for automated quality checks.',
      aiExplanation: 'Dedicated senior designer allocated with guaranteed 24-hour express lead time.',
      icon: UserCheck,
    },
    {
      id: 5,
      title: 'Research, Slide Structure & Outline Complete',
      stageNum: 5,
      status: 'completed',
      time: 'Today • 11:30 AM PKT',
      dept: 'Content & Strategy',
      desc: 'Slides 1 to 5 wireframed with executive summaries, metric callouts, and clean vector visual layouts.',
      aiExplanation: 'MFS AI verified content density constraints (maximum 75 characters per line).',
      icon: Sparkles,
    },
    {
      id: 6,
      title: 'Work In Progress: Slide 7 Typography & Hierarchy Polish',
      stageNum: 6,
      status: 'active',
      time: 'In Progress • Est. 04:30 PM PKT',
      dept: 'Senior Design Division',
      desc: 'Currently applying gold accent styling (#E5C158), mathematical spacing, and WCAG AA contrast standards.',
      aiExplanation: 'MFS AI Guardian active scanner: zero font scale inconsistencies or text wrap breaks detected.',
      icon: Zap,
    },
    {
      id: 7,
      title: 'Internal Quality Review & AI Scan',
      stageNum: 7,
      status: 'upcoming',
      time: 'Scheduled • Today 06:00 PM PKT',
      dept: 'QA & Compliance Division',
      desc: 'Automated 12-point quality check including font embedding, vector resolution, and slide transition smoothness.',
      aiExplanation: 'Pre-flight check will verify 100% compliance with client specifications before release.',
      icon: ShieldCheck,
    },
    {
      id: 8,
      title: 'Client Review & Watermarked Draft Release',
      stageNum: 8,
      status: 'upcoming',
      time: 'Scheduled • Tomorrow 02:00 PM PKT',
      dept: 'Client Relations Desk',
      desc: 'Watermarked PDF draft uploaded to Client Dashboard for instant preview and feedback approval.',
      aiExplanation: 'Client can approve directly or request instant design adjustments in 1-click.',
      icon: Eye,
    },
    {
      id: 9,
      title: 'Revision Window & Adjustments (If Requested)',
      stageNum: 9,
      status: 'upcoming',
      time: 'Scheduled • Post-Preview',
      dept: 'Design & Revisions Desk',
      desc: '7-Day complimentary revision window activated for any slide content or layout tweaks.',
      aiExplanation: 'MFS AI will highlight modified slides for instant side-by-side comparison.',
      icon: RefreshCw,
    },
    {
      id: 10,
      title: 'Final High-Definition File Packaging & Dispatch',
      stageNum: 10,
      status: 'upcoming',
      time: 'Scheduled • Tomorrow 06:00 PM PKT',
      dept: 'Dispatch & Delivery Unit',
      desc: 'Editable PowerPoint (.pptx), PDF document, and high-res slide image assets uploaded to files hub.',
      aiExplanation: 'Full commercial rights and source vector files unlocked for client download.',
      icon: Download,
    },
    {
      id: 11,
      title: 'Project Completed & Warranty Activated',
      stageNum: 11,
      status: 'upcoming',
      time: 'Scheduled • Tomorrow 06:15 PM PKT',
      dept: 'Client Experience Division',
      desc: 'Project marked as 100% completed with permanent archive backing in secure cloud storage.',
      aiExplanation: 'Satisfaction score & feedback survey sent to client.',
      icon: Award,
    },
  ];

  const filteredMilestones = milestones.filter((m) => {
    if (stageFilter === 'all') return true;
    return m.status === stageFilter;
  });

  // History Logs
  const historyLogs = [
    {
      id: 'h1',
      date: 'Today • 11:30 AM',
      event: 'Outline & Wireframes Approved',
      category: 'today',
      desc: 'Slides 1 through 5 structure verified by Lead Designer.',
      status: 'Success',
    },
    {
      id: 'h2',
      date: 'Today • 10:15 AM',
      event: 'Team Allocation Completed',
      category: 'today',
      desc: 'Senior Presentation Specialist assigned to PRJ-MFS-849201.',
      status: 'Success',
    },
    {
      id: 'h3',
      date: 'Today • 09:45 AM',
      event: 'EasyPaisa Payment Confirmed',
      category: 'today',
      desc: 'Invoice #INV-849201 generated for PKR 2,500.',
      status: 'Verified',
    },
    {
      id: 'h4',
      date: 'Yesterday • 04:00 PM',
      event: 'Order Form Submitted',
      category: 'week',
      desc: '10-Slide presentation request created with Express speed option.',
      status: 'Logged',
    },
  ];

  const filteredHistory = historyLogs.filter((log) => {
    if (historyFilter === 'all') return true;
    if (historyFilter === 'today') return log.category === 'today';
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* TOP BAR: CONTROL & CHECKLIST TRIGGER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card rounded-2xl border border-white/10 p-4 bg-black/60">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#E5C158]/20 text-[#E5C158]">
            <Clock className="w-5 h-5 text-[#28C76F]" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block">
              CLIENT DASHBOARD • PHASE 3
            </span>
            <h1 className="text-base font-poppins font-bold text-white">
              AI Live Project Tracking & Progress Engine
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Active Project State Button */}
          <button
            onClick={() => {
              setHasActiveProject(!hasActiveProject);
              if (onShowToast) {
                onShowToast(hasActiveProject ? 'Switched to empty state view.' : 'Restored active project view.');
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>{hasActiveProject ? 'Simulate Empty State' : 'View Active Project'}</span>
          </button>

          {/* Phase 3 Status Modal Trigger */}
          <button
            onClick={() => setShowChecklistModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#E5C158]/10 hover:bg-[#E5C158]/20 border border-[#E5C158]/40 text-[#E5C158] font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
            <span>Phase 3 Roadmap</span>
          </button>
        </div>
      </div>

      {hasActiveProject ? (
        <>
          {/* 1. PROJECT PROGRESS HERO BANNER */}
          <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 sm:p-8 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden space-y-6 shadow-[0_0_40px_rgba(229,193,88,0.08)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5C158]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#28C76F]/10 border border-[#28C76F]/30 text-[#28C76F] text-[11px] font-bold mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#28C76F] animate-ping" />
                  <span>STAGE 6/11 IN PROGRESS • 65% COMPLETED</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white tracking-tight">
                  Executive Presentation Pitch Deck
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                  Project ID: <strong className="text-white font-mono">PRJ-MFS-849201</strong> • Service: Presentation Design (10 Slides)
                </p>
              </div>

              {/* Delivery Box */}
              <div className="p-4 rounded-2xl bg-black/80 border border-[#E5C158]/40 text-left md:text-right space-y-1 shrink-0">
                <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block">
                  ESTIMATED DELIVERY
                </span>
                <strong className="text-white font-poppins text-base block">Tomorrow • 6:00 PM PKT</strong>
                <span className="text-xs text-[#28C76F] font-semibold flex items-center justify-start md:justify-end gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  Express 24h Guarantee
                </span>
              </div>
            </div>

            {/* Progress Bar & Indicators */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                  <span className="text-[#E5C158]">Current Stage:</span>
                  <strong className="text-white">Slide 7 Visual Polish & Typography Hierarchy</strong>
                </span>
                <span className="text-neutral-400">
                  Next Stage: <strong className="text-neutral-200">Internal Quality Review & AI Scan</strong>
                </span>
              </div>

              <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden p-0.5 relative">
                <div className="h-full rounded-full bg-gradient-to-r from-[#28C76F] via-[#E5C158] to-[#D4AF37] w-[65%] transition-all duration-1000 shadow-[0_0_15px_rgba(229,193,88,0.5)]" />
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-neutral-400 font-mono pt-1">
                <span>Started: Today 09:30 AM</span>
                <span className="text-[#E5C158] font-bold">18.5 Hours Remaining</span>
                <span>Target: Tomorrow 06:00 PM</span>
              </div>
            </div>
          </div>

          {/* PROJECT ACTIVITY REPLAY / AI CINEMATIC JOURNEY MOVIE CARD */}
          <div className="glass-card rounded-3xl border border-[#E5C158]/40 p-6 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_0_30px_rgba(229,193,88,0.12)]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E5C158] to-[#D4AF37] p-0.5 shrink-0 shadow-[0_0_20px_rgba(229,193,88,0.3)]">
                <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center text-[#E5C158]">
                  <Play className="w-6 h-6 fill-[#E5C158]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] text-[10px] font-bold border border-[#E5C158]/30">
                  <Sparkles className="w-3 h-3 text-[#28C76F]" />
                  <span>MFS AI CINEMATIC FEATURE</span>
                </div>
                <h3 className="text-lg font-poppins font-bold text-white flex items-center gap-2">
                  <span>🎬 Project Activity Replay</span>
                </h3>
                <p className="text-xs text-neutral-300">
                  Watch your complete project journey from order placement to final delivery as an animated cinematic movie with AI narration.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowJourneyMovie(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer shadow-[0_0_20px_rgba(229,193,88,0.3)] shrink-0 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Watch Project Journey Movie</span>
            </button>
          </div>

          {/* 2. AI PROJECT HEALTH & PREDICTIVE ANALYTICS CARDS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#28C76F]">
                  REAL-TIME AUDIT
                </span>
                <h3 className="text-xl font-poppins font-bold text-white">AI Project Health & Metrics</h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono">100% WCAG AA Compliant</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Health Card 1 */}
              <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-[#28C76F]/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase">Project Health</span>
                  <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
                </div>
                <strong className="text-lg font-bold font-poppins text-white block">100% Optimal</strong>
                <p className="text-[10px] text-[#28C76F] font-semibold">Zero design errors detected</p>
              </div>

              {/* Health Card 2 */}
              <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-[#E5C158]/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase">Timeline Health</span>
                  <TrendingUp className="w-4 h-4 text-[#E5C158]" />
                </div>
                <strong className="text-lg font-bold font-poppins text-[#E5C158] block">+3 Hours Ahead</strong>
                <p className="text-[10px] text-neutral-400 font-semibold">Faster than lead schedule</p>
              </div>

              {/* Health Card 3 */}
              <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase">Quality Status</span>
                  <Award className="w-4 h-4 text-blue-400" />
                </div>
                <strong className="text-lg font-bold font-poppins text-white block">Verified High</strong>
                <p className="text-[10px] text-blue-400 font-semibold">Gold token styling active</p>
              </div>

              {/* Health Card 4 */}
              <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-purple-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase">Revision Risk</span>
                  <RefreshCw className="w-4 h-4 text-purple-400" />
                </div>
                <strong className="text-lg font-bold font-poppins text-white block">0% Risk</strong>
                <p className="text-[10px] text-purple-400 font-semibold">Strict specs adherence</p>
              </div>

              {/* Health Card 5 */}
              <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-[#28C76F]/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase">Delivery Confidence</span>
                  <Zap className="w-4 h-4 text-[#28C76F]" />
                </div>
                <strong className="text-lg font-bold font-poppins text-white block">99.8%</strong>
                <p className="text-[10px] text-[#28C76F] font-semibold">On-Time delivery score</p>
              </div>
            </div>
          </div>

          {/* 3. CURRENT TASK & TEAM WORKFLOW STATUS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Current Working Task Spotlight (7 Cols) */}
            <div className="lg:col-span-7 glass-card rounded-3xl border border-white/10 p-6 space-y-5">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                    LIVE FOCUS
                  </span>
                  <h3 className="text-lg font-poppins font-bold text-white">Current Active Task</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] text-xs font-bold border border-[#E5C158]/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-ping" />
                  Active In Design Lab
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Working Stage:</span>
                    <strong className="text-white font-bold">Stage 6 of 11 — Slide 7 Polish</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Assigned Department:</span>
                    <strong className="text-[#28C76F] font-bold">Executive Presentation Design Division</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Current Objective:</span>
                    <strong className="text-[#E5C158] font-bold">Gold accent token application & typography scale</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Est. Task Completion:</span>
                    <strong className="text-white font-mono">Today • 04:30 PM PKT</strong>
                  </div>
                </div>

                {/* AI Summary Box */}
                <div className="p-4 rounded-2xl bg-[#E5C158]/5 border border-[#E5C158]/20 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-[#E5C158]" />
                    <strong className="text-white text-xs font-bold">MFS AI Real-Time Summary:</strong>
                  </div>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    "Slide 7 layout contains executive financial projections. Visual hierarchy has been optimized using 1.333 scale ratios with Poppins bold headers and Inter body typography."
                  </p>
                </div>
              </div>
            </div>

            {/* Team Status Workflow Matrix (5 Cols) */}
            <div className="lg:col-span-5 glass-card rounded-3xl border border-white/10 p-6 space-y-4">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    WORKFLOW MATRIX
                  </span>
                  <h3 className="text-lg font-poppins font-bold text-white">Departmental Team Status</h3>
                </div>
                <Building2 className="w-5 h-5 text-blue-400" />
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { dept: 'Order Management Desk', status: 'Completed', color: 'text-[#28C76F] bg-[#28C76F]/10 border-[#28C76F]/30' },
                  { dept: 'Finance & Payment Verification', status: 'Completed', color: 'text-[#28C76F] bg-[#28C76F]/10 border-[#28C76F]/30' },
                  { dept: 'Senior Presentation Design Unit', status: 'In Progress (Active)', color: 'text-[#E5C158] bg-[#E5C158]/10 border-[#E5C158]/30' },
                  { dept: 'Quality Review & Compliance', status: 'Standing By', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
                  { dept: 'Dispatch & Deliverables Unit', status: 'Scheduled', color: 'text-neutral-400 bg-white/5 border-white/10' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-neutral-300 font-semibold">{item.dept}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. LIVE VERTICAL TIMELINE STAGES */}
          <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                  MILESTONE ROADMAP
                </span>
                <h3 className="text-xl font-poppins font-bold text-white">Live Project Stage Timeline</h3>
              </div>

              {/* Stage Filters */}
              <div className="flex flex-wrap items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10 text-xs">
                {(['all', 'completed', 'active', 'upcoming'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStageFilter(filter)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer capitalize ${
                      stageFilter === filter
                        ? 'bg-[#E5C158] text-[#050507] font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Vertical Timeline List */}
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#28C76F] before:via-[#E5C158] before:to-white/10">
              {filteredMilestones.map((m) => {
                const IconComponent = m.icon;
                const isCompleted = m.status === 'completed';
                const isActive = m.status === 'active';

                return (
                  <div key={m.id} className="relative group">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-[30px] sm:-left-[38px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border transition-transform duration-300 group-hover:scale-125 ${
                        isCompleted
                          ? 'bg-[#28C76F] border-[#28C76F] text-black shadow-[0_0_10px_rgba(40,199,111,0.5)]'
                          : isActive
                          ? 'bg-[#E5C158] border-[#E5C158] text-black ring-4 ring-[#E5C158]/20 animate-pulse shadow-[0_0_15px_rgba(229,193,88,0.6)]'
                          : 'bg-black border-white/20 text-neutral-500'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : isActive ? (
                        <Zap className="w-3.5 h-3.5 text-black" />
                      ) : (
                        <span className="text-[10px] font-bold">{m.stageNum}</span>
                      )}
                    </div>

                    {/* Content Card */}
                    <div
                      className={`p-5 rounded-2xl border transition-all ${
                        isActive
                          ? 'bg-[#E5C158]/10 border-[#E5C158] shadow-[0_0_20px_rgba(229,193,88,0.15)]'
                          : isCompleted
                          ? 'bg-white/[0.03] border-white/10 hover:border-[#28C76F]/40'
                          : 'bg-white/[0.01] border-white/5 opacity-70'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`p-2 rounded-xl ${
                              isCompleted
                                ? 'bg-[#28C76F]/20 text-[#28C76F]'
                                : isActive
                                ? 'bg-[#E5C158]/20 text-[#E5C158]'
                                : 'bg-white/5 text-neutral-400'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-poppins font-bold text-white text-sm">
                              Stage {m.stageNum}: {m.title}
                            </h4>
                            <span className="text-[10px] font-mono text-neutral-400">{m.dept}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-neutral-400">{m.time}</span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                              isCompleted
                                ? 'bg-[#28C76F]/20 text-[#28C76F] border-[#28C76F]/30'
                                : isActive
                                ? 'bg-[#E5C158] text-[#050507] border-[#E5C158]'
                                : 'bg-white/5 text-neutral-400 border-white/10'
                            }`}
                          >
                            {m.status}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-300 leading-relaxed mb-3">{m.desc}</p>

                      {/* AI Explanation Pill */}
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2 text-[11px] text-neutral-400">
                        <Bot className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
                        <span className="italic">{m.aiExplanation}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. NEXT STEPS & DELIVERY PREDICTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Next Steps Roadmap (7 Cols) */}
            <div className="lg:col-span-7 glass-card rounded-3xl border border-white/10 p-6 space-y-4">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    UPCOMING ACTION ITEMS
                  </span>
                  <h3 className="text-lg font-poppins font-bold text-white">Next Steps for Client</h3>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-400" />
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-white block font-semibold">1. Receive & Review Watermarked Preview</strong>
                    <p className="text-neutral-300 leading-relaxed">
                      Expected tomorrow at 02:00 PM PKT. You will be notified via email and WhatsApp with a direct preview link.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#E5C158]/20 text-[#E5C158] shrink-0">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-white block font-semibold">2. Request Revisions or Instant Approval</strong>
                    <p className="text-neutral-300 leading-relaxed">
                      If any adjustments are needed, simply click "Request Revision". Revisions are free under our 7-Day Guarantee.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#28C76F]/20 text-[#28C76F] shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-white block font-semibold">3. Download HD Final Deliverables & Source Files</strong>
                    <p className="text-neutral-300 leading-relaxed">
                      High-definition PPTX PowerPoint slides, PDF documents, and embedded media assets will be available in the Files Hub.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Delivery Prediction Card (5 Cols) */}
            <div className="lg:col-span-5 glass-card rounded-3xl border border-white/10 p-6 space-y-4">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#28C76F]">
                    PREDICTIVE DISPATCH
                  </span>
                  <h3 className="text-lg font-poppins font-bold text-white">AI Delivery Prediction</h3>
                </div>
                <Zap className="w-5 h-5 text-[#28C76F]" />
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-black via-[#0F0F0F] to-black border border-[#28C76F]/30 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Predicted Arrival:</span>
                  <strong className="text-white font-bold text-sm">Tomorrow • 06:00 PM PKT</strong>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Confidence Rating:</span>
                  <strong className="text-[#28C76F] font-bold text-sm">99.8% On-Time Precision</strong>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Remaining Milestones:</span>
                  <strong className="text-[#E5C158] font-bold text-sm">5 Steps Left</strong>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] text-neutral-300 italic flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>"MFS AI Predictor: High probability of delivery 3 hours ahead of deadline."</span>
                </div>
              </div>
            </div>
          </div>

          {/* 6. PROJECT HISTORY & ACTIVITY LOGS */}
          <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                  HISTORICAL AUDIT LOG
                </span>
                <h3 className="text-lg font-poppins font-bold text-white">Project Update History</h3>
              </div>

              {/* History Filters */}
              <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10 text-xs">
                {(['today', 'week', 'month', 'all'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setHistoryFilter(filter)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer capitalize ${
                      historyFilter === filter
                        ? 'bg-[#E5C158] text-[#050507] font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {filteredHistory.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors"
                >
                  <div className="space-y-0.5">
                    <strong className="text-white block font-bold">{log.event}</strong>
                    <p className="text-neutral-400 text-[11px]">{log.desc}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] font-mono text-neutral-400">{log.date}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 border border-[#28C76F]/30 text-[#28C76F] text-[10px] font-bold">
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* SMART EMPTY STATE */
        <div className="glass-card rounded-3xl border border-white/10 p-12 text-center space-y-6 max-w-xl mx-auto my-8">
          <div className="w-20 h-20 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(229,193,88,0.2)]">
            <Briefcase className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-poppins font-bold text-white">No Active Projects Found</h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mx-auto">
              You currently do not have any active projects running in your client workspace. Place your first order today with our <strong className="text-[#E5C158]">50% Grand Launch Offer</strong> to initiate live AI project tracking.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                if (onNavigatePage) onNavigatePage('order');
              }}
              className="px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-xl flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>Place New Order Now (50% OFF)</span>
            </button>

            <button
              onClick={() => setHasActiveProject(true)}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Restore Demo Project
            </button>
          </div>
        </div>
      )}

      {/* PHASE 3 ROADMAP & CHECKLIST MODAL */}
      {showChecklistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card rounded-3xl border border-[#E5C158]/40 p-6 sm:p-8 max-w-2xl w-full space-y-6 bg-[#0F0F0F] relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#E5C158]/20 text-[#E5C158]">
                  <CheckCircle2 className="w-6 h-6 text-[#28C76F]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block">
                    CLIENT DASHBOARD ROADMAP
                  </span>
                  <h3 className="text-xl font-poppins font-bold text-white">
                    Phase 3 Completed • Project Status
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowChecklistModal(false)}
                className="text-neutral-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Checklist items */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 1: Client Dashboard Core Shell</strong>
                    <span className="text-neutral-400 text-[11px]">Sidebar, header, currency switch & navigation</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 2: Dashboard Home Experience</strong>
                    <span className="text-neutral-400 text-[11px]">AI Daily Briefing, metrics, quick shortcuts & activities</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/40 flex items-center justify-between shadow-[0_0_15px_rgba(40,199,111,0.2)]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 3: AI Live Project Tracking</strong>
                    <span className="text-neutral-400 text-[11px]">Vertical timeline, AI health score, delivery predictions & filters</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED NOW</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between opacity-70">
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full border border-neutral-500 flex items-center justify-center text-[9px] text-neutral-400">4</span>
                  <div>
                    <strong className="text-white block font-bold">Phase 4: Files & Deliverables Hub</strong>
                    <span className="text-neutral-400 text-[11px]">Secure preview, upload attachments & watermarked files</span>
                  </div>
                </div>
                <span className="text-neutral-400 font-bold text-[10px] uppercase">REMAINING</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between opacity-70">
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full border border-neutral-500 flex items-center justify-center text-[9px] text-neutral-400">5</span>
                  <div>
                    <strong className="text-white block font-bold">Phase 5: Client Invoices & Payment Ledger</strong>
                    <span className="text-neutral-400 text-[11px]">PDF receipts, payment breakdown & proof manager</span>
                  </div>
                </div>
                <span className="text-neutral-400 font-bold text-[10px] uppercase">REMAINING</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowChecklistModal(false)}
                className="w-full py-3 rounded-full bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] cursor-pointer"
              >
                Acknowledge & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MFS AI CINEMATIC PROJECT JOURNEY MOVIE MODAL */}
      {showJourneyMovie && (
        <ProjectJourneyMovie
          currency={currency}
          customerName="Shehroz Sultan"
          projectId="PRJ-MFS-849201"
          onClose={() => setShowJourneyMovie(false)}
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
};
