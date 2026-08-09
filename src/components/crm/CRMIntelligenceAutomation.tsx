import React, { useState } from 'react';
import { Currency } from '../../types';
import {
  Sparkles,
  Zap,
  TrendingUp,
  BrainCircuit,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Clock,
  CheckCircle2,
  FileText,
  DollarSign,
  Users,
  Target,
  ArrowRight,
  ChevronRight,
  Send,
  Lock,
  Plus,
  Play,
  Pause,
  Download,
  Upload,
  Eye,
  Tag,
  Star,
  Activity,
  Award,
  Search,
  Filter,
  Check,
  X,
  FileSpreadsheet,
  Building2,
  User,
  HeartHandshake,
  Bot
} from 'lucide-react';

interface CRMIntelligenceAutomationProps {
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

// Types for Intelligence Engine
export interface ClientIntelligenceProfile {
  id: string;
  clientName: string;
  company: string;
  healthScore: number; // 0-100
  engagementScore: number; // 0-100
  projectSuccessScore: number; // 0-100
  paymentReliabilityScore: number; // 0-100
  communicationScore: number; // 0-100
  overallRelationshipScore: number; // 0-100
  growthOpportunityScore: number; // 0-100
  riskIndicator: 'low' | 'medium' | 'high' | 'critical';
  aiConfidence: number; // e.g. 98.4%
}

// Types for Opportunity
export interface SalesOpportunity {
  id: string;
  title: string;
  clientName: string;
  company: string;
  estimatedValuePKR: number;
  stage: 'Lead' | 'Qualified' | 'Discovery' | 'Proposal Sent' | 'Negotiation' | 'Won' | 'Lost' | 'Long-Term Follow-up';
  probabilityPercent: number;
  expectedCloseDate: string;
  owner: string;
  notes: string;
}

// Types for Automated Follow-up
export interface FollowUpWorkflow {
  id: string;
  name: string;
  trigger: 'No Client Response' | 'Invoice Overdue' | 'Project Completed' | 'New Proposal Sent' | 'Revision Pending' | 'Meeting Reminder' | 'Welcome Sequence' | 'Reactivation Campaign';
  delay: string;
  status: 'active' | 'paused' | 'draft';
  lastRun: string;
  nextScheduledRun: string;
  actionType: 'Send WhatsApp' | 'Send Email' | 'Create Admin Reminder' | 'Trigger Voice Call';
  executionCount: number;
}

// Types for Documents
export interface ClientDocument {
  id: string;
  title: string;
  category: 'Contract' | 'NDA' | 'Proposal' | 'Strategy Document' | 'Report' | 'Brand Asset' | 'Final Deliverable' | 'Signed Document';
  clientName: string;
  version: string;
  uploadDate: string;
  owner: string;
  fileSize: string;
  accessPermissions: 'Admin Only' | 'Client & Admin' | 'Restricted Staff';
  downloadUrl: string;
}

export const CRMIntelligenceAutomation: React.FC<CRMIntelligenceAutomationProps> = ({
  currency,
  onShowToast
}) => {
  const [activeSubSection, setActiveSubSection] = useState<'intelligence' | 'summary' | 'followup' | 'pipeline' | 'upsell' | 'documents' | 'timeline'>('intelligence');

  const formatMoney = (amountPKR: number) => {
    const rate = EXCHANGE_RATES[currency];
    const converted = amountPKR * rate;
    const symbol = CURRENCY_SYMBOLS[currency];
    if (currency === 'PKR') return `${symbol} ${converted.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // 1. CLIENT INTELLIGENCE ENGINE STATE
  const [intelligenceProfiles] = useState<ClientIntelligenceProfile[]>([
    {
      id: 'INT-CLI-84920',
      clientName: 'Muhammad Shehroz Sultan',
      company: 'MFS International',
      healthScore: 98,
      engagementScore: 96,
      projectSuccessScore: 100,
      paymentReliabilityScore: 100,
      communicationScore: 95,
      overallRelationshipScore: 98,
      growthOpportunityScore: 92,
      riskIndicator: 'low',
      aiConfidence: 99.1
    },
    {
      id: 'INT-CLI-62019',
      clientName: 'Sarah Al-Maktoum',
      company: 'Dubai Digital Ventures LLC',
      healthScore: 88,
      engagementScore: 84,
      projectSuccessScore: 92,
      paymentReliabilityScore: 95,
      communicationScore: 88,
      overallRelationshipScore: 89,
      growthOpportunityScore: 96,
      riskIndicator: 'low',
      aiConfidence: 96.5
    },
    {
      id: 'INT-CLI-71204',
      clientName: 'Dr. Tariq Mahmood',
      company: 'Islamabad Medical Institute',
      healthScore: 94,
      engagementScore: 90,
      projectSuccessScore: 98,
      paymentReliabilityScore: 98,
      communicationScore: 92,
      overallRelationshipScore: 95,
      growthOpportunityScore: 78,
      riskIndicator: 'low',
      aiConfidence: 98.2
    }
  ]);

  // Selected Profile for Deep Intelligence Inspection
  const [selectedProfile, setSelectedProfile] = useState<ClientIntelligenceProfile>(intelligenceProfiles[0]);

  // 2. AI CLIENT SUMMARY STATE
  const [isRefreshingSummary, setIsRefreshingSummary] = useState(false);
  const [lastSummaryGenerated, setLastSummaryGenerated] = useState('Today at 02:15 AM PKT');
  const [aiSummaryText, setAiSummaryText] = useState(
    `Muhammad Shehroz Sultan is a key VIP strategic partner representing MFS International. Demonstrates 100% payment reliability with Rs. 485,000+ total lifetime spend across 12 completed high-impact projects (Pitch Decks, ATS Resumes, Executive Presentations). Communication is prompt via WhatsApp (+92 301 5323689). Key preference: High-contrast dark luxury themes with Gold accent (#E5C158) and strict 24-hour turnaround.`
  );

  const handleRefreshAISummary = () => {
    setIsRefreshingSummary(true);
    setTimeout(() => {
      setIsRefreshingSummary(false);
      setLastSummaryGenerated('Just now via Gemini 1.5 Pro');
      onShowToast('✨ Gemini 1.5 Pro re-synthesized Client Intelligence Summary');
    }, 1200);
  };

  // 3. SMART FOLLOW-UP WORKFLOWS STATE
  const [workflows, setWorkflows] = useState<FollowUpWorkflow[]>([
    {
      id: 'WF-101',
      name: 'No Response Re-engagement Sequence',
      trigger: 'No Client Response',
      delay: '24 Hours',
      status: 'active',
      lastRun: 'Today at 01:00 AM',
      nextScheduledRun: 'Today at 11:00 PM',
      actionType: 'Send WhatsApp',
      executionCount: 42
    },
    {
      id: 'WF-102',
      name: 'Automated Invoice Payment Reminder',
      trigger: 'Invoice Overdue',
      delay: '12 Hours',
      status: 'active',
      lastRun: 'Yesterday at 04:00 PM',
      nextScheduledRun: 'Tomorrow at 09:00 AM',
      actionType: 'Send WhatsApp',
      executionCount: 18
    },
    {
      id: 'WF-103',
      name: 'Post-Delivery Review & Rating Request',
      trigger: 'Project Completed',
      delay: '2 Hours',
      status: 'active',
      lastRun: 'Yesterday at 06:00 PM',
      nextScheduledRun: 'On Event',
      actionType: 'Send Email',
      executionCount: 89
    },
    {
      id: 'WF-104',
      name: 'VIP Contract Renewal & Maintenance Sequence',
      trigger: 'Reactivation Campaign',
      delay: '30 Days',
      status: 'paused',
      lastRun: '3 days ago',
      nextScheduledRun: 'Paused',
      actionType: 'Trigger Voice Call',
      executionCount: 12
    }
  ]);

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows(prev =>
      prev.map(w => {
        if (w.id === id) {
          const nextStatus = w.status === 'active' ? 'paused' : 'active';
          onShowToast(`Workflow "${w.name}" updated to ${nextStatus.toUpperCase()}`);
          return { ...w, status: nextStatus };
        }
        return w;
      })
    );
  };

  // 4. SALES OPPORTUNITY PIPELINE STATE
  const [opportunities, setOpportunities] = useState<SalesOpportunity[]>([
    {
      id: 'OPP-MFS-901',
      title: 'Annual Presentation Design retainer for 50 Academic Decks',
      clientName: 'Muhammad Shehroz Sultan',
      company: 'MFS International',
      estimatedValuePKR: 350000,
      stage: 'Negotiation',
      probabilityPercent: 90,
      expectedCloseDate: '2026-08-05',
      owner: 'Shehroz Sultan (Agency Owner)',
      notes: 'Finalizing custom slide templates and batch volume discount terms.'
    },
    {
      id: 'OPP-MFS-882',
      title: 'Corporate Executive Resume Suite (10 Top Managers)',
      clientName: 'Sarah Al-Maktoum',
      company: 'Dubai Digital Ventures LLC',
      estimatedValuePKR: 120000,
      stage: 'Proposal Sent',
      probabilityPercent: 75,
      expectedCloseDate: '2026-08-10',
      owner: 'Resume Engineering Desk',
      notes: 'Proposal sent via Email & WhatsApp in AED currency.'
    },
    {
      id: 'OPP-MFS-790',
      title: 'Clinical Research Paper Formatting Retainer',
      clientName: 'Dr. Tariq Mahmood',
      company: 'Islamabad Medical Institute',
      estimatedValuePKR: 180000,
      stage: 'Qualified',
      probabilityPercent: 60,
      expectedCloseDate: '2026-08-15',
      owner: 'Academic Research Desk',
      notes: 'Discovery meeting completed; preparing formal IEEE proposal.'
    }
  ]);

  // 5. RENEWAL & UPSELL CENTER STATE
  const upsellOffers = [
    {
      title: 'Annual Presentation Template Vault Subscription',
      targetClient: 'Muhammad Shehroz Sultan',
      recommendedService: 'Unlimited 16:9 Presentation Design & Formatting',
      estimatedUpsellValuePKR: 250000,
      aiReasoning: 'Client has ordered 12 individual pitch decks in 60 days. An annual retainer will reduce turnaround time to 6 hours and guarantee dedicated lead visualizer access.',
      confidence: 96
    },
    {
      title: 'Executive LinkedIn & Cover Letter Bundle Upgrade',
      targetClient: 'Ayesha Khan',
      recommendedService: 'ATS Resume + LinkedIn Optimization + Cover Letter',
      estimatedUpsellValuePKR: 15000,
      aiReasoning: 'Candidate requested ATS Resume for management roles. Adding executive LinkedIn banner & cover letter increases interview call probability by 3.4x.',
      confidence: 92
    }
  ];

  // 6. CLIENT DOCUMENTS CENTER STATE
  const [documents] = useState<ClientDocument[]>([
    {
      id: 'DOC-MFS-001',
      title: 'Master Digital Services Agreement & SLA (2026)',
      category: 'Contract',
      clientName: 'Muhammad Shehroz Sultan',
      version: 'v2.1 Final',
      uploadDate: '2026-07-20',
      owner: 'Shehroz Sultan (Agency Owner)',
      fileSize: '2.4 MB PDF',
      accessPermissions: 'Client & Admin',
      downloadUrl: '#'
    },
    {
      id: 'DOC-MFS-002',
      title: 'Mutual Non-Disclosure Agreement (NDA)',
      category: 'NDA',
      clientName: 'Muhammad Shehroz Sultan',
      version: 'v1.0 Signed',
      uploadDate: '2026-07-18',
      owner: 'MFS Legal Vault',
      fileSize: '1.1 MB PDF',
      accessPermissions: 'Admin Only',
      downloadUrl: '#'
    },
    {
      id: 'DOC-MFS-003',
      title: 'VC Pitch Deck Financial Model Strategy PDF',
      category: 'Strategy Document',
      clientName: 'Muhammad Shehroz Sultan',
      version: 'v3.0 Draft',
      uploadDate: '2026-07-25',
      owner: 'Lead AI Visualizer',
      fileSize: '8.7 MB PDF',
      accessPermissions: 'Client & Admin',
      downloadUrl: '#'
    }
  ]);

  // 7. RELATIONSHIP TIMELINE STATE
  const relationshipJourney = [
    { date: '2026-07-15', stage: 'First Contact', event: 'Inquiry received via MFS AI Assistant Chat widget from Islamabad IP', status: 'Completed' },
    { date: '2026-07-16', stage: 'Discovery Call', event: '30-min strategy call with Shehroz Sultan regarding Series-A Pitch Deck', status: 'Completed' },
    { date: '2026-07-18', stage: 'Proposal & Contract', event: 'Master Digital Services SLA & NDA signed electronically', status: 'Completed' },
    { date: '2026-07-20', stage: 'First Order Placement', event: 'Placed ORD-MFS-849201 for Executive Pitch Deck (Rs. 18,000)', status: 'Completed' },
    { date: '2026-07-22', stage: 'EasyPaisa Payment', event: 'Verified receipt screenshot EP910283 via EasyPaisa', status: 'Completed' },
    { date: '2026-07-25', stage: 'Stage 8 Review', event: 'Delivered initial 15-slide 4K deck for client review', status: 'In Progress' },
    { date: '2026-08-01', stage: 'Future Retainer', event: 'Scheduled Annual Presentation Vault Renewal Discussion', status: 'Upcoming' }
  ];

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* HEADER SECTION */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-r from-neutral-900/90 via-black to-[#0F0F0F] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 uppercase tracking-wider flex items-center gap-1">
              <BrainCircuit className="w-3 h-3 text-[#E5C158]" />
              PHASE 15 PART 3 • CLIENT INTELLIGENCE ENGINE
            </span>
            <span className="text-xs text-neutral-400 font-mono">Gemini 1.5 Pro AI & Automation</span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">Smart Relationship Intelligence & Automation Hub</h2>
          <p className="text-xs text-neutral-400">
            Client health scores, Gemini executive summaries, automated follow-up workflows, sales pipeline, and document vault.
          </p>
        </div>

        {/* SUB SECTION NAVIGATION SWITCHER */}
        <div className="flex items-center gap-1 bg-black/60 border border-white/10 rounded-xl p-1 text-xs overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveSubSection('intelligence')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSubSection === 'intelligence'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Intelligence Engine
          </button>

          <button
            onClick={() => setActiveSubSection('summary')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSubSection === 'summary'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Client Summary
          </button>

          <button
            onClick={() => setActiveSubSection('followup')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSubSection === 'followup'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Smart Follow-ups
          </button>

          <button
            onClick={() => setActiveSubSection('pipeline')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSubSection === 'pipeline'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            Sales Pipeline
          </button>

          <button
            onClick={() => setActiveSubSection('upsell')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSubSection === 'upsell'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Renewals & Upsell
          </button>

          <button
            onClick={() => setActiveSubSection('documents')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSubSection === 'documents'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Documents
          </button>

          <button
            onClick={() => setActiveSubSection('timeline')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 ${
              activeSubSection === 'timeline'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Journey Timeline
          </button>
        </div>
      </div>

      {/* MODULE 1: CLIENT INTELLIGENCE ENGINE */}
      {activeSubSection === 'intelligence' && (
        <div className="space-y-6">
          {/* TOP PROFILE SELECTOR */}
          <div className="glass-card rounded-2xl border border-white/10 p-4 bg-neutral-900/40 flex items-center gap-3 overflow-x-auto text-xs">
            <span className="text-neutral-400 font-bold shrink-0">Select Client Profile:</span>
            {intelligenceProfiles.map((prof) => (
              <button
                key={prof.id}
                onClick={() => setSelectedProfile(prof)}
                className={`px-3 py-1.5 rounded-xl transition-all border shrink-0 ${
                  selectedProfile.id === prof.id
                    ? 'bg-[#E5C158]/20 text-[#E5C158] border-[#E5C158]/50 font-bold'
                    : 'bg-black/40 text-neutral-400 border-white/5 hover:text-white'
                }`}
              >
                {prof.clientName} ({prof.company})
              </button>
            ))}
          </div>

          {/* KPI CARDS GRID FOR SELECTED PROFILE */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl border border-white/10 p-4 bg-neutral-900/40 space-y-1">
              <span className="text-[11px] text-neutral-400">Client Health Score</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">{selectedProfile.healthScore} / 100</div>
              <span className="text-[9px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/30">
                Optimal Relationship
              </span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-4 bg-neutral-900/40 space-y-1">
              <span className="text-[11px] text-neutral-400">Engagement Score</span>
              <div className="text-2xl font-black text-[#E5C158] font-mono">{selectedProfile.engagementScore} / 100</div>
              <span className="text-[9px] font-extrabold uppercase bg-[#E5C158]/10 text-[#E5C158] px-1.5 py-0.2 rounded border border-[#E5C158]/30">
                Highly Active
              </span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-4 bg-neutral-900/40 space-y-1">
              <span className="text-[11px] text-neutral-400">Payment Reliability</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">{selectedProfile.paymentReliabilityScore}%</div>
              <span className="text-[9px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/30">
                Zero Delinquency
              </span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-4 bg-neutral-900/40 space-y-1">
              <span className="text-[11px] text-neutral-400">Growth Opportunity</span>
              <div className="text-2xl font-black text-sky-400 font-mono">{selectedProfile.growthOpportunityScore} / 100</div>
              <span className="text-[9px] font-extrabold uppercase bg-sky-500/10 text-sky-400 px-1.5 py-0.2 rounded border border-sky-500/30">
                High Upsell Potential
              </span>
            </div>
          </div>

          {/* DETAILED RADAR SCORES & RISK PROFILE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
              <h3 className="font-extrabold text-white text-sm border-b border-white/10 pb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#E5C158]" />
                Relationship Intelligence Metrics Breakdown
              </h3>

              <div className="space-y-3 text-xs">
                {[
                  { label: 'Project Success Score', value: selectedProfile.projectSuccessScore, color: 'bg-emerald-500' },
                  { label: 'Communication Promptness', value: selectedProfile.communicationScore, color: 'bg-[#E5C158]' },
                  { label: 'Overall Relationship Score', value: selectedProfile.overallRelationshipScore, color: 'bg-sky-400' },
                  { label: 'Growth Opportunity Index', value: selectedProfile.growthOpportunityScore, color: 'bg-purple-500' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300 font-semibold">{item.label}</span>
                      <span className="font-mono font-bold text-white">{item.value}/100</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
              <h3 className="font-extrabold text-white text-sm border-b border-white/10 pb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                AI Risk Indicator & Confidence Metrics
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-neutral-300">Account Risk Level</span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    🟢 LOW RISK (STABLE)
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-neutral-300">Gemini AI Model Confidence</span>
                  <span className="font-mono font-bold text-[#E5C158]">{selectedProfile.aiConfidence}%</span>
                </div>

                <p className="text-[11px] text-neutral-400 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <span className="text-[#E5C158] font-bold">AI Diagnosis:</span> Client profile has 0 late payment strikes, high response rate on WhatsApp, and high repeat order frequency. Recommended for VIP loyalty benefits and annual retainer proposals.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: AI CLIENT SUMMARY */}
      {activeSubSection === 'summary' && (
        <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-[#E5C158]" />
                Gemini 1.5 Pro AI Executive Client Summary
              </h3>
              <span className="text-[10px] font-mono text-neutral-400">Last Generated: {lastSummaryGenerated}</span>
            </div>

            <button
              onClick={handleRefreshAISummary}
              disabled={isRefreshingSummary}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-90 flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(229,193,88,0.2)]"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-black ${isRefreshingSummary ? 'animate-spin' : ''}`} />
              Re-Synthesize Summary
            </button>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-[#E5C158]/30 space-y-3">
            <p className="text-xs text-neutral-200 leading-relaxed font-sans">
              {aiSummaryText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
              <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] text-neutral-400 block">Communication Preference</span>
                <span className="font-bold text-[#E5C158]">WhatsApp & Direct Voice Call</span>
              </div>

              <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] text-neutral-400 block">Preferred Aesthetics</span>
                <span className="font-bold text-white">Dark Gold (#E5C158) & 4K 16:9</span>
              </div>

              <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] text-neutral-400 block">Recommended Next Action</span>
                <span className="font-bold text-emerald-400">Send Annual Vault Proposal</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: SMART FOLLOW-UP WORKFLOWS */}
      {activeSubSection === 'followup' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#E5C158]" />
              Automated Follow-up Workflows & Triggers
            </h3>
            <span className="text-xs font-mono text-neutral-400">4 Active Automation Engines</span>
          </div>

          <div className="space-y-3">
            {workflows.map((wf) => (
              <div
                key={wf.id}
                className="p-4 rounded-2xl glass-card border border-white/10 bg-neutral-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#E5C158]/30 transition-all text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded border border-[#E5C158]/30">
                      {wf.id}
                    </span>
                    <span className="font-bold text-white text-sm">{wf.name}</span>
                  </div>

                  <p className="text-neutral-400 text-[11px] flex items-center gap-2">
                    <span>Trigger: <strong className="text-white">{wf.trigger}</strong></span>
                    <span>•</span>
                    <span>Delay: <strong className="text-emerald-400">{wf.delay}</strong></span>
                    <span>•</span>
                    <span>Channel: <strong className="text-[#E5C158]">{wf.actionType}</strong></span>
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right text-[11px] font-mono">
                    <span className="text-neutral-400 block">Executions: {wf.executionCount}</span>
                    <span className="text-neutral-500 text-[10px]">Next: {wf.nextScheduledRun}</span>
                  </div>

                  <button
                    onClick={() => toggleWorkflowStatus(wf.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-[10px] uppercase border transition-all flex items-center gap-1 ${
                      wf.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                    }`}
                  >
                    {wf.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {wf.status}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 4: SALES OPPORTUNITY PIPELINE */}
      {activeSubSection === 'pipeline' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-[#E5C158]" />
              Lightweight CRM Opportunity Pipeline
            </h3>
            <span className="text-xs font-mono text-neutral-400">Total Value: {formatMoney(650000)}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="glass-card rounded-2xl border border-white/10 p-5 bg-neutral-900/40 space-y-3 hover:border-[#E5C158]/40 transition-all text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded border border-[#E5C158]/30">
                    {opp.id}
                  </span>
                  <span className="font-extrabold text-xs uppercase text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                    {opp.stage}
                  </span>
                </div>

                <h4 className="font-extrabold text-white text-sm leading-snug">{opp.title}</h4>
                <p className="text-neutral-400 text-[11px]">Client: {opp.clientName} ({opp.company})</p>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex justify-between font-mono">
                    <span className="text-neutral-400">Estimated Value:</span>
                    <span className="font-bold text-[#E5C158]">{formatMoney(opp.estimatedValuePKR)}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-neutral-400">Probability:</span>
                    <span className="font-bold text-emerald-400">{opp.probabilityPercent}%</span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 italic">"{opp.notes}"</p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                  <span>Owner: {opp.owner}</span>
                  <span>Target: {opp.expectedCloseDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 5: RENEWAL & UPSELL CENTER */}
      {activeSubSection === 'upsell' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              AI Upsell & Subscription Growth Recommendations
            </h3>
            <span className="text-xs font-mono text-[#E5C158]">Gemini Intelligence</span>
          </div>

          <div className="space-y-4">
            {upsellOffers.map((offer, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl glass-card border border-[#E5C158]/30 bg-gradient-to-r from-[#E5C158]/5 via-black to-neutral-900/40 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-white text-sm">{offer.title}</span>
                  <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                    Est. Value: {formatMoney(offer.estimatedUpsellValuePKR)}
                  </span>
                </div>

                <p className="text-xs text-neutral-300">
                  Target Client: <strong className="text-white">{offer.targetClient}</strong> • Service: <strong className="text-[#E5C158]">{offer.recommendedService}</strong>
                </p>

                <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-xs text-neutral-300 space-y-1">
                  <span className="text-[#E5C158] font-bold block flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
                    AI Growth Logic ({offer.confidence}% Match)
                  </span>
                  <p>{offer.aiReasoning}</p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => onShowToast(`🚀 Upsell proposal created for ${offer.targetClient}`)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-1.5"
                  >
                    Generate Proposal & Send via WhatsApp
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 6: CLIENT DOCUMENTS CENTER */}
      {activeSubSection === 'documents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#E5C158]" />
              Encrypted Client Documents Vault
            </h3>
            <span className="text-xs font-mono text-neutral-400">{documents.length} Secure Attachments</span>
          </div>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-2xl glass-card border border-white/10 bg-neutral-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs hover:border-[#E5C158]/30 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded border border-[#E5C158]/30">
                      {doc.id}
                    </span>
                    <span className="font-bold text-white">{doc.title}</span>
                  </div>

                  <p className="text-neutral-400 text-[11px] flex items-center gap-2">
                    <span>Category: <strong className="text-white">{doc.category}</strong></span>
                    <span>•</span>
                    <span>Version: <strong className="text-emerald-400">{doc.version}</strong></span>
                    <span>•</span>
                    <span>Uploaded: {doc.uploadDate} ({doc.fileSize})</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono text-neutral-300 bg-white/5 border border-white/10">
                    {doc.accessPermissions}
                  </span>

                  <button
                    onClick={() => onShowToast(`🔒 Download encrypted asset: ${doc.title}`)}
                    className="p-2 rounded-xl glass-card border border-white/10 hover:border-[#E5C158]/50 text-white hover:text-[#E5C158] transition-all"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 7: RELATIONSHIP JOURNEY TIMELINE */}
      {activeSubSection === 'timeline' && (
        <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
          <h3 className="font-extrabold text-white text-base border-b border-white/10 pb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#E5C158]" />
            Full Client Relationship Historical Journey
          </h3>

          <div className="relative border-l-2 border-[#E5C158]/30 ml-4 pl-6 space-y-6">
            {relationshipJourney.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-[#E5C158] text-black font-extrabold flex items-center justify-center text-xs shadow-[0_0_10px_rgba(229,193,88,0.5)]">
                  {idx + 1}
                </div>

                <div className="p-4 rounded-xl glass-card border border-white/10 bg-black/40 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#E5C158]">{step.stage}</span>
                    <span className="font-mono text-neutral-400 text-[10px]">{step.date}</span>
                  </div>
                  <p className="text-xs text-neutral-300">{step.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
