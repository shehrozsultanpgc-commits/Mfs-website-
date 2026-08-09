import React, { useState } from 'react';
import { Currency } from '../../types';
import {
  Award,
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
  FileText,
  Star,
  RefreshCw,
  Users,
  DollarSign,
  Download,
  Upload,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Sparkles,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ChevronRight,
  Lock,
  Building2,
  User,
  Activity,
  BarChart3,
  Layers,
  PhoneCall,
  Video,
  FileCheck,
  Briefcase,
  Sliders,
  Send,
  Eye,
  Check,
  X,
  HelpCircle
} from 'lucide-react';

interface CRMExecutiveClientSuccessProps {
  currency: Currency;
  onShowToast: (msg: string) => void;
}

const EXCHANGE_RATES: Record<Currency, number> = {
  PKR: 1,
  USD: 1 / 280,
  GBP: 1 / 350,
  EUR: 1 / 300,
  AED: 1 / 76,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  PKR: 'Rs',
  USD: '$',
  GBP: '£',
  EUR: '€',
  AED: 'AED',
};

export const CRMExecutiveClientSuccess: React.FC<CRMExecutiveClientSuccessProps> = ({
  currency,
  onShowToast
}) => {
  const [activeSection, setActiveSection] = useState<'success' | 'account' | 'portfolio' | 'reports' | 'feedback' | 'retention' | 'analytics' | 'expansion'>('success');

  const formatMoney = (amountPKR: number) => {
    const rate = EXCHANGE_RATES[currency];
    const converted = amountPKR * rate;
    const symbol = CURRENCY_SYMBOLS[currency];
    if (currency === 'PKR') return `${symbol} ${converted.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // 1. CLIENT SUCCESS CENTER DATA
  const successMetrics = {
    overallSuccessScore: 98,
    onboardingStatus: '100% Completed',
    adoptionStatus: 'High Active User',
    projectCompletionRate: 100,
    satisfactionScore: '4.98 / 5.0',
    supportRequestsCount: 0,
    successMilestones: [
      'Master Service Agreement Signed',
      'Initial 15-Slide Executive Pitch Deck Delivered',
      'Zero Revision Rejections',
      'EasyPaisa VIP Verification'
    ],
    futureRenewalProbability: 98.5
  };

  // 2. EXECUTIVE ACCOUNT MANAGEMENT DATA
  const accountTierDetails = {
    clientName: 'Muhammad Shehroz Sultan',
    company: 'MFS International',
    accountManager: 'Shehroz Sultan (Agency Owner & Lead)',
    tier: 'VIP Platinum Enterprise',
    vipStatus: true,
    priorityLevel: 'Express Tier 1',
    monthlyRetainerPKR: 150000,
    lifetimeRevenuePKR: 485000,
    avgMonthlyRevenuePKR: 80833,
    strategicNotes: 'Key anchor account for international pitch deck & presentation design showcase. Prefers direct WhatsApp updates and dark gold (#E5C158) executive design tokens.',
    executiveRecommendations: 'Offer annual 50-deck retainer package with guaranteed 6-hour express SLA turnaround.'
  };

  // 3. SERVICE PORTFOLIO MANAGER DATA
  const purchasedServices = [
    { serviceName: 'Executive Pitch Deck Design', category: 'Pitch Deck', status: 'Delivered', startDate: '2026-07-20', completionDate: '2026-07-25', renewalStatus: 'Auto-Renew Eligible', totalValuePKR: 18000, expansionOpportunity: '3D Render Upgrade' },
    { serviceName: 'ATS Executive Resume Engineering', category: 'Resume Engineering', status: 'Completed', startDate: '2026-07-15', completionDate: '2026-07-18', renewalStatus: 'N/A', totalValuePKR: 6500, expansionOpportunity: 'LinkedIn Banner Pack' },
    { serviceName: 'Clinical Trial Manuscript Formatting (APA 7th)', category: 'Assignment Writing', status: 'Completed', startDate: '2026-07-10', completionDate: '2026-07-14', renewalStatus: 'N/A', totalValuePKR: 22000, expansionOpportunity: 'IEEE Journal Submission' },
    { serviceName: 'Enterprise Presentation Template Vault', category: 'Presentation Design', status: 'Active Retainer', startDate: '2026-07-01', completionDate: '2027-07-01', renewalStatus: 'Active Subscription', totalValuePKR: 350000, expansionOpportunity: 'Custom Animation Add-on' }
  ];

  // 4. EXECUTIVE REPORTS CENTER
  const executiveReports = [
    { title: 'Monthly Client Performance & ROI Summary', date: 'July 2026', format: 'PDF & XLSX', status: 'Generated', type: 'Monthly Client Report' },
    { title: 'Quarterly Business Review (QBR) Strategy Deck', date: 'Q3 2026', format: 'Interactive Slide Deck', status: 'Ready', type: 'Quarterly Business Review' },
    { title: 'AI Assistant & Voice Interaction Audit Trail', date: 'July 2026', format: 'JSON & PDF', status: 'Archived', type: 'AI Activity Summary' },
    { title: 'Revenue & Payment Receipt Ledger (EasyPaisa/JazzCash/Bank)', date: 'July 2026', format: 'CSV & PDF', status: 'Verified', type: 'Financial Summary' }
  ];

  // 5. CUSTOMER FEEDBACK & QUALITY CENTER
  const feedbackData = [
    { client: 'Muhammad Shehroz Sultan', rating: 5.0, comment: 'Pristine 16:9 dark gold pitch deck! The speed multiplier deliverable was delivered right on time.', date: '2026-07-25', status: 'Verified Review' },
    { client: 'Dr. Tariq Mahmood', rating: 5.0, comment: 'APA 7th citation guidelines were followed with extreme precision. Outstanding academic formatting desk.', date: '2026-07-22', status: 'Verified Review' },
    { client: 'Sarah Al-Maktoum', rating: 4.9, comment: 'Excellent Dubai VC presentation slides with crisp financial charts.', date: '2026-07-20', status: 'Verified Review' }
  ];

  // 6. CLIENT RETENTION CENTER
  const retentionProfile = {
    churnRisk: '0.5% (Very Low Risk)',
    retentionScore: 99.5,
    renewalReminderDate: '2026-08-01',
    lastInteraction: 'Today at 02:10 AM PKT via WhatsApp',
    nextScheduledFollowUp: 'Tomorrow at 04:00 PM PKT',
    loyaltyStatus: 'MFS Diamond VIP Founder Circle',
    reactivationCampaign: 'Not Needed (Active Client)'
  };

  // 8. FUTURE EXPANSION MODULES
  const futureExpansionModules = [
    { name: 'Customer Success AI Agent', desc: 'Autonomous AI agent conducting proactive weekly check-ins and automated health monitoring.' },
    { name: 'Voice Call AI Assistant', desc: 'Inbound and outbound voice AI caller for instant telephone consultation.' },
    { name: 'AI Meeting Transcription & Summary', desc: 'Automatic Zoom & Google Meet transcription with instant action item generation.' },
    { name: 'Digital Contract & E-Signature Vault', desc: 'Legally binding e-signatures with cryptographic audit trail for NDAs & SLAs.' },
    { name: 'Client Community & Knowledge Hub', desc: 'Exclusive VIP client community portal with resource downloads and masterclasses.' },
    { name: 'Affiliate & Referral Engine', desc: 'Automated commission tracking for client referral reward payouts.' },
    { name: 'White-Label Client Portal Subdomains', desc: 'Custom branded client portals hosted on client subdomains (e.g., portal.client.com).' },
    { name: 'Mobile CRM Native Apps (iOS/Android)', desc: 'Dedicated mobile app shell for real-time admin push notifications and chat.' }
  ];

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* HEADER SECTION */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-r from-neutral-900/90 via-black to-[#0F0F0F] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 uppercase tracking-wider flex items-center gap-1">
              <HeartHandshake className="w-3 h-3 text-[#E5C158]" />
              PHASE 15 PART 4 • EXECUTIVE CLIENT SUCCESS
            </span>
            <span className="text-xs text-neutral-400 font-mono">Completed Phase 15 Final</span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">Executive Client Success & Growth Platform</h2>
          <p className="text-xs text-neutral-400">
            Client health scores, VIP account management, service portfolio, executive reports, quality feedback, and future expansion.
          </p>
        </div>

        {/* SUB SECTION SELECTOR */}
        <div className="flex items-center gap-1 bg-black/60 border border-white/10 rounded-xl p-1 text-xs overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveSection('success')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSection === 'success'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Client Success
          </button>

          <button
            onClick={() => setActiveSection('account')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSection === 'account'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Account Mgmt
          </button>

          <button
            onClick={() => setActiveSection('portfolio')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSection === 'portfolio'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Service Portfolio
          </button>

          <button
            onClick={() => setActiveSection('reports')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSection === 'reports'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Executive Reports
          </button>

          <button
            onClick={() => setActiveSection('feedback')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSection === 'feedback'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            Feedback & QA
          </button>

          <button
            onClick={() => setActiveSection('retention')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSection === 'retention'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Retention
          </button>

          <button
            onClick={() => setActiveSection('analytics')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSection === 'analytics'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            CRM Analytics
          </button>

          <button
            onClick={() => setActiveSection('expansion')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSection === 'expansion'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Expansion Zone
          </button>
        </div>
      </div>

      {/* SECTION 1: CLIENT SUCCESS CENTER */}
      {activeSection === 'success' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl border border-white/10 p-5 bg-neutral-900/40 space-y-1">
              <span className="text-xs text-neutral-400 block">Overall Success Score</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">{successMetrics.overallSuccessScore} / 100</div>
              <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Pristine Health
              </span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-5 bg-neutral-900/40 space-y-1">
              <span className="text-xs text-neutral-400 block">Satisfaction Rating</span>
              <div className="text-2xl font-black text-[#E5C158] font-mono">{successMetrics.satisfactionScore}</div>
              <span className="text-[10px] font-extrabold text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded border border-[#E5C158]/30">
                100% 5-Star Average
              </span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-5 bg-neutral-900/40 space-y-1">
              <span className="text-xs text-neutral-400 block">Project Completion Rate</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">{successMetrics.projectCompletionRate}%</div>
              <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Zero Late Deliveries
              </span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-5 bg-neutral-900/40 space-y-1">
              <span className="text-xs text-neutral-400 block">Renewal Probability</span>
              <div className="text-2xl font-black text-sky-400 font-mono">{successMetrics.futureRenewalProbability}%</div>
              <span className="text-[10px] font-extrabold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                Guaranteed Extension
              </span>
            </div>
          </div>

          {/* QUICK ACTIONS & SUCCESS MILESTONES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
              <h3 className="font-extrabold text-white text-sm border-b border-white/10 pb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#E5C158]" />
                Client Success Quick Action Center
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { label: 'Schedule Follow-up', desc: 'Sync Google Calendar call' },
                  { label: 'Create Success Plan', desc: 'Define Q3 growth goals' },
                  { label: 'Send Check-in Email', desc: 'Dispatch template email' },
                  { label: 'Request VIP Review', desc: 'Prompt for testimonial' },
                  { label: 'Generate Executive Report', desc: 'Synthesize PDF summary' }
                ].map((act, idx) => (
                  <button
                    key={idx}
                    onClick={() => onShowToast(`✔ Action dispatched: ${act.label}`)}
                    className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-[#E5C158]/40 hover:bg-[#E5C158]/5 transition-all text-left space-y-0.5"
                  >
                    <span className="font-bold text-[#E5C158] block">{act.label}</span>
                    <span className="text-[10px] text-neutral-400 block">{act.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
              <h3 className="font-extrabold text-white text-sm border-b border-white/10 pb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Verified Client Success Milestones
              </h3>

              <div className="space-y-2 text-xs">
                {successMetrics.successMilestones.map((ms, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-neutral-200 font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      {ms}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      VERIFIED
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: EXECUTIVE ACCOUNT MANAGEMENT */}
      {activeSection === 'account' && (
        <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
                Executive Account Management Workspace
              </h3>
              <span className="text-xs text-neutral-400 font-mono">Assigned Manager: {accountTierDetails.accountManager}</span>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#E5C158] text-black shadow-[0_0_15px_rgba(229,193,88,0.4)]">
              {accountTierDetails.tier}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-black/40 p-3.5 rounded-xl border border-white/5 space-y-1">
              <span className="text-neutral-400 block text-[10px]">Lifetime Spent (LTV)</span>
              <span className="font-mono text-lg font-black text-[#E5C158]">{formatMoney(accountTierDetails.lifetimeRevenuePKR)}</span>
            </div>

            <div className="bg-black/40 p-3.5 rounded-xl border border-white/5 space-y-1">
              <span className="text-neutral-400 block text-[10px]">Monthly Retainer Base</span>
              <span className="font-mono text-lg font-black text-emerald-400">{formatMoney(accountTierDetails.monthlyRetainerPKR)}</span>
            </div>

            <div className="bg-black/40 p-3.5 rounded-xl border border-white/5 space-y-1">
              <span className="text-neutral-400 block text-[10px]">Avg Monthly Revenue</span>
              <span className="font-mono text-lg font-black text-white">{formatMoney(accountTierDetails.avgMonthlyRevenuePKR)}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 text-xs">
            <span className="text-[#E5C158] font-bold block">Strategic Account Notes:</span>
            <p className="text-neutral-300 leading-relaxed">{accountTierDetails.strategicNotes}</p>
            <div className="pt-2 border-t border-white/5 text-emerald-400 font-semibold">
              <span>Recommendation:</span> {accountTierDetails.executiveRecommendations}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: SERVICE PORTFOLIO MANAGER */}
      {activeSection === 'portfolio' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#E5C158]" />
              Client Purchased Service Portfolio
            </h3>
            <span className="text-xs font-mono text-neutral-400">{purchasedServices.length} Active & Historical Services</span>
          </div>

          <div className="space-y-3">
            {purchasedServices.map((svc, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass-card border border-white/10 bg-neutral-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs hover:border-[#E5C158]/30 transition-all">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{svc.serviceName}</span>
                    <span className="text-[10px] font-semibold text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {svc.category}
                    </span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">
                    Period: {svc.startDate} → {svc.completionDate} • Renewal: <strong className="text-emerald-400">{svc.renewalStatus}</strong>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-sm font-black text-[#E5C158] block">{formatMoney(svc.totalValuePKR)}</span>
                  <span className="text-[10px] text-sky-400 font-semibold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                    Upsell: {svc.expansionOpportunity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: EXECUTIVE REPORTS CENTER */}
      {activeSection === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#E5C158]" />
              Executive Client Reports Center
            </h3>
            <span className="text-xs font-mono text-neutral-400">Export & PDF Vault</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {executiveReports.map((rpt, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass-card border border-white/10 bg-neutral-900/40 space-y-3 text-xs hover:border-[#E5C158]/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{rpt.title}</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    {rpt.status}
                  </span>
                </div>

                <p className="text-neutral-400 text-[11px]">Type: {rpt.type} • Date: {rpt.date} ({rpt.format})</p>

                <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => onShowToast(`📥 Exporting PDF for ${rpt.title}`)}
                    className="px-3 py-1.5 rounded-xl bg-[#E5C158] text-black font-extrabold text-[10px] uppercase tracking-wider hover:opacity-90 flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5 text-black" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: CUSTOMER FEEDBACK & QUALITY CENTER */}
      {activeSection === 'feedback' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <Star className="w-4 h-4 text-[#E5C158]" />
              Verified Customer Feedback & Quality Center
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">100% Satisfied</span>
          </div>

          <div className="space-y-3">
            {feedbackData.map((fb, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass-card border border-white/10 bg-neutral-900/40 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{fb.client}</span>
                    <span className="text-[10px] text-amber-400 font-mono font-bold flex items-center gap-0.5 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {fb.rating} / 5.0
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-neutral-500">{fb.date}</span>
                </div>

                <p className="text-neutral-300 italic">"{fb.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: CLIENT RETENTION CENTER */}
      {activeSection === 'retention' && (
        <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
          <h3 className="font-extrabold text-white text-base border-b border-white/10 pb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Client Retention & Loyalty Intelligence
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <span className="text-neutral-400 text-[10px]">Churn Risk</span>
              <span className="font-bold text-emerald-400 block">{retentionProfile.churnRisk}</span>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <span className="text-neutral-400 text-[10px]">Retention Score</span>
              <span className="font-bold text-[#E5C158] block">{retentionProfile.retentionScore}%</span>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <span className="text-neutral-400 text-[10px]">Loyalty Tier</span>
              <span className="font-bold text-sky-400 block">{retentionProfile.loyaltyStatus}</span>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <span className="text-neutral-400 text-[10px]">Next Follow-up</span>
              <span className="font-bold text-white block text-[10px]">{retentionProfile.nextScheduledFollowUp}</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: CRM ANALYTICS */}
      {activeSection === 'analytics' && (
        <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
          <h3 className="font-extrabold text-white text-base border-b border-white/10 pb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#E5C158]" />
            Executive CRM Analytics & Revenue Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1">
              <span className="text-neutral-400 block text-[10px]">Total CRM Agency Revenue</span>
              <span className="text-2xl font-black text-[#E5C158]">{formatMoney(960000)}</span>
              <span className="text-[10px] text-emerald-400 block">+38% YoY Growth</span>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1">
              <span className="text-neutral-400 block text-[10px]">Average Project Order Value</span>
              <span className="text-2xl font-black text-white">{formatMoney(24500)}</span>
              <span className="text-[10px] text-[#E5C158] block">High-Margin Retainers</span>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1">
              <span className="text-neutral-400 block text-[10px]">Outstanding Unpaid Balance</span>
              <span className="text-2xl font-black text-emerald-400">{formatMoney(0)}</span>
              <span className="text-[10px] text-emerald-400 block">100% Upfront / EasyPaisa Secured</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: FUTURE EXPANSION ZONE */}
      {activeSection === 'expansion' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E5C158]" />
              Future Expansion Zone (Coming Soon Architectural Placeholders)
            </h3>
            <span className="text-xs font-mono text-[#E5C158]">Scale-to-Zero Future Ready</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {futureExpansionModules.map((mod, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass-card border border-white/10 bg-white/[0.02] space-y-2 text-xs relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{mod.name}</span>
                  <span className="text-[9px] font-extrabold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded">
                    COMING SOON
                  </span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
