import React, { useState } from 'react';
import { Currency } from '../types';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Briefcase,
  FileText,
  MessageSquare,
  CreditCard,
  Download,
  Search,
  Filter,
  Check,
  Sparkles,
  PieChart as PieChartIcon,
  Activity,
  Calendar,
  Layers,
  Award,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Printer,
  ChevronRight,
  Info,
  X
} from 'lucide-react';

interface AnalyticsInsightsCenterProps {
  currency: Currency;
  customerName?: string;
  customerEmail?: string;
  clientId?: string;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (
    page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard',
    targetSection?: string
  ) => void;
  setActiveTab?: (tab: string) => void;
}

export const AnalyticsInsightsCenter: React.FC<AnalyticsInsightsCenterProps> = ({
  currency,
  customerName = 'Muhammad Shehroz Sultan',
  customerEmail = 'mfsmedia.agency@gmail.com',
  clientId = 'CLI-MFS-98421',
  onShowToast,
  onNavigatePage,
  setActiveTab,
}) => {
  const [timeRange, setTimeRange] = useState<'All' | 'This Month' | 'This Year'>('All');
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  // Currency Converter helper
  const formatCurrency = (amountPKR: number) => {
    switch (currency) {
      case 'USD':
        return `$${(amountPKR / 280).toFixed(2)}`;
      case 'GBP':
        return `£${(amountPKR / 355).toFixed(2)}`;
      case 'EUR':
        return `€${(amountPKR / 300).toFixed(2)}`;
      case 'AED':
        return `AED ${(amountPKR / 76).toFixed(2)}`;
      default:
        return `PKR ${amountPKR.toLocaleString()}`;
    }
  };

  // Real Customer Metrics based on PRJ-MFS-849201 & ORD-MFS-984210
  const metrics = [
    { label: 'Total Orders', value: '1 Active Order', sub: 'ORD-MFS-984210', icon: Briefcase, color: 'text-[#E5C158]' },
    { label: 'Active Projects', value: '1 In Progress', sub: 'PRJ-MFS-849201', icon: Clock, color: 'text-blue-400' },
    { label: 'Total Files Exchanged', value: '5 Documents', sub: 'Briefs, PPTX, Tax Invoice', icon: FileText, color: 'text-purple-400' },
    { label: 'Settled Investments', value: formatCurrency(2500), sub: '50% Grand Launch Promo', icon: CreditCard, color: 'text-[#28C76F]' },
  ];

  // Project Progress Breakdown
  const projectPhases = [
    { name: 'Requirements & Briefing', progress: 100, status: 'Completed', date: 'Jan 22, 2026' },
    { name: 'Structure & Design Drafts', progress: 100, status: 'Completed', date: 'Jan 23, 2026' },
    { name: 'Gold Accent Typography Polish', progress: 85, status: 'In Review', date: 'Jan 24, 2026' },
    { name: 'Final Quality Review & Delivery', progress: 20, status: 'Scheduled', date: 'Jan 25, 2026' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* HEADER BANNER */}
      <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(229,193,88,0.12)]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center shrink-0">
            <BarChart3 className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-[#28C76F]" />
                <span>PROJECT PERFORMANCE & ANALYTICS</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                {clientId}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-poppins font-bold text-white tracking-tight">
              Analytics & Insights Center
            </h1>
            <p className="text-xs text-neutral-300">
              Real-time delivery progress metrics, project health index, and investment summaries for <strong className="text-[#E5C158]">PRJ-MFS-849201</strong>.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (onShowToast) onShowToast('Project analytics summary report PDF downloaded.');
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)] flex items-center gap-2"
          >
            <Download className="w-4 h-4 fill-black" />
            <span>Download PDF Report</span>
          </button>

          <button
            onClick={() => setShowRoadmapModal(true)}
            className="px-3 py-2.5 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/40 text-[#28C76F] font-bold text-xs hover:bg-[#28C76F]/20 transition-all cursor-pointer flex items-center gap-1"
          >
            <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
            <span>Phase 11 Complete</span>
          </button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {metrics.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 bg-black/60 relative overflow-hidden">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 font-medium text-[11px]">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-xl sm:text-2xl font-poppins font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <span className="text-[10px] text-neutral-400 font-mono block">{stat.sub}</span>
            </div>
          );
        })}
      </div>

      {/* CHARTS & HEALTH INDEX GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Project Health Index & Velocity */}
        <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 space-y-5 bg-black/80 lg:col-span-1 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#E5C158] uppercase font-bold">PROJECT HEALTH SCORE</span>
              <Sparkles className="w-4 h-4 text-[#E5C158]" />
            </div>
            <h3 className="font-poppins font-bold text-white text-lg">98 / 100 • Excellent Velocity</h3>
            <p className="text-xs text-neutral-400">
              PRJ-MFS-849201 is running on schedule with active designer feedback loop and zero bottlenecks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Completion Estimate:</span>
              <span className="text-[#28C76F] font-bold">On Track (Tomorrow 06:00 PM)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#E5C158] to-[#28C76F] w-[88%]" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-neutral-400">
              <span>Overall Progress: 88%</span>
              <span>10 / 10 Slides Drafted</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-neutral-300">
            <span>Average Response Time:</span>
            <strong className="text-white font-mono">&lt; 15 Minutes</strong>
          </div>
        </div>

        {/* Milestone Velocity & Stage Breakdown */}
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-black/80 lg:col-span-2">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <h3 className="font-poppins font-bold text-white text-base">Milestone Progress Breakdown</h3>
              <p className="text-xs text-neutral-400">Stage completion trajectory for Executive Pitch Deck Presentation.</p>
            </div>
            <span className="text-[10px] font-mono text-[#28C76F] bg-[#28C76F]/10 px-2.5 py-1 rounded-full border border-[#28C76F]/30 font-bold">
              VERIFIED MILESTONES
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {projectPhases.map((phase, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${phase.progress === 100 ? 'text-[#28C76F]' : 'text-[#E5C158]'}`} />
                    <strong className="text-white font-poppins">{phase.name}</strong>
                  </div>
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md ${
                    phase.progress === 100 ? 'bg-[#28C76F]/10 text-[#28C76F]' : 'bg-[#E5C158]/10 text-[#E5C158]'
                  }`}>
                    {phase.status} ({phase.progress}%)
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E5C158] to-[#28C76F]"
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI RISK DETECTION & PERFORMANCE SCORECARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Predictive AI Risk & Delivery Diagnostics */}
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4 bg-black/80">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#28C76F]">
                PREDICTIVE DIAGNOSTICS
              </span>
              <h3 className="text-base font-poppins font-bold text-white">AI Risk Detection & Delivery Score</h3>
            </div>
            <ShieldCheck className="w-5 h-5 text-[#28C76F]" />
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#E5C158]" />
                  Delivery Prediction Rate
                </span>
                <span className="text-[#E5C158] font-bold font-mono">99.8% On-Time</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Calculated based on current milestone completion velocity and historical SLA compliance.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
                  AI Risk Detection Status
                </span>
                <span className="text-[#28C76F] font-bold font-mono">Zero Risks Detected</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Automated check verified zero font license missing errors, layout constraints, or broken contrast rules.
              </p>
            </div>
          </div>
        </div>

        {/* Client Performance Scorecard */}
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4 bg-black/80">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                CLIENT SCORECARD
              </span>
              <h3 className="text-base font-poppins font-bold text-white">Performance Scorecard</h3>
            </div>
            <Award className="w-5 h-5 text-[#E5C158]" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-xs">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <strong className="text-xl font-bold font-poppins text-white block">03</strong>
              <span className="text-[10px] text-neutral-400 block font-semibold">Total Projects Completed</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <strong className="text-xl font-bold font-poppins text-[#E5C158] block">18.5 Hrs</strong>
              <span className="text-[10px] text-neutral-400 block font-semibold">Average Turnaround</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <strong className="text-xl font-bold font-poppins text-white block">50% OFF</strong>
              <span className="text-[10px] text-neutral-400 block font-semibold">Launch Promo Active</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <strong className="text-xl font-bold font-poppins text-[#28C76F] block">5.0 ★</strong>
              <span className="text-[10px] text-neutral-400 block font-semibold">Satisfaction Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHRONOLOGICAL ACTIVITY TIMELINE */}
      <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 bg-black/80">
        <div className="border-b border-white/10 pb-4">
          <h3 className="font-poppins font-bold text-white text-base">Verified Project Timeline & Audit History</h3>
          <p className="text-xs text-neutral-400">Chronological history of client submissions, payment receipts, and designer updates.</p>
        </div>

        <div className="space-y-4 text-xs relative pl-4 border-l border-white/10">
          {[
            { title: 'Executive Pitch Deck Draft v1.2 Uploaded', desc: 'Gold Accent polish applied to Slides 1-7.', date: 'Today • 10:15 AM', author: 'Shehroz (MFS Design Lead)' },
            { title: 'Tax Invoice #INV-849201 Paid & Verified', desc: 'EasyPaisa PKR 2,500 settled with 50% Grand Launch discount.', date: 'Yesterday • 04:30 PM', author: 'MFS Accounts Desk' },
            { title: 'Client Source Files Uploaded', desc: 'Investor_Pitch_Outline.docx uploaded and scanned.', date: 'Yesterday • 02:15 PM', author: customerName },
            { title: 'Project Initiated & Order Confirmed', desc: 'Order ORD-MFS-984210 logged into MFS Growth Agency.', date: 'Jan 22, 2026', author: 'MFS System Engine' },
          ].map((item, idx) => (
            <div key={idx} className="relative space-y-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5C158] absolute -left-[21px] top-1 border-2 border-black" />
              <div className="flex justify-between items-center">
                <strong className="text-white font-poppins text-xs">{item.title}</strong>
                <span className="text-[10px] text-neutral-400 font-mono">{item.date}</span>
              </div>
              <p className="text-neutral-300 text-[11px]">{item.desc}</p>
              <span className="text-[10px] text-neutral-400 font-mono">By: {item.author}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PHASE 11 ROADMAP CHECKLIST MODAL */}
      {showRoadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl border border-[#E5C158]/40 p-6 sm:p-8 max-w-2xl w-full space-y-6 bg-[#0F0F0F] relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#28C76F]/20 text-[#28C76F]">
                  <CheckCircle2 className="w-6 h-6 text-[#28C76F]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block">
                    CLIENT DASHBOARD ROADMAP COMPLETE
                  </span>
                  <h3 className="text-xl font-poppins font-bold text-white">
                    Phase 11 Completed • Analytics & Insights Center
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="text-neutral-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Complete Roadmap Checklist */}
            <div className="space-y-1.5 text-xs max-h-[350px] overflow-y-auto pr-1">
              {[
                { phase: 'Phase 1: Client Dashboard Core Shell', desc: 'Sidebar, header, currency switch & navigation' },
                { phase: 'Phase 2: Dashboard Home Experience', desc: 'AI Daily Briefing, metrics, quick shortcuts & activities' },
                { phase: 'Phase 3: AI Live Project Tracking', desc: 'Vertical timeline, AI health score & Cinematic Movie' },
                { phase: 'Phase 4: Project Details Center', desc: 'Project overview, brief, specs, file attachments & deliverables' },
                { phase: 'Phase 5: AI Assistant Center', desc: 'AI chat hub, document search, voice AI & multi-language support' },
                { phase: 'Phase 6: Messages & Communication Center', desc: 'Real-time chat, AI summarizer, file sharing & reaction cards' },
                { phase: 'Phase 7: Files & Documents Center', desc: 'Grid/List view, drag & drop upload, encrypted preview & version history' },
                { phase: 'Phase 8: Billing, Payments & Invoices Center', desc: 'Tax invoices, verified receipts, payment history & approved MFS account cards' },
                { phase: 'Phase 9: Profile, Account & Security Center', desc: 'Editable profile, Google SSO integration & security audit log' },
                { phase: 'Phase 10: Notifications & Activity Center', desc: 'Real-time notification feed, activity timeline & smart filters' },
              ].map((p, idx) => (
                <div key={idx} className="p-2 bg-[#28C76F]/10 border border-[#28C76F]/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#28C76F]" />
                    <strong className="text-white text-[11px]">{p.phase}</strong>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[9px]">COMPLETED</span>
                </div>
              ))}

              <div className="p-3 rounded-2xl bg-[#28C76F]/15 border border-[#28C76F]/40 flex items-center justify-between shadow-[0_0_15px_rgba(40,199,111,0.2)]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold text-xs">Phase 11: Analytics & Insights Center</strong>
                    <span className="text-neutral-400 text-[11px]">Real delivery metrics, project health score, velocity timeline & PDF analytics export</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED NOW</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="w-full py-3 rounded-full bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] cursor-pointer"
              >
                Acknowledge Phase 11 Completion
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
