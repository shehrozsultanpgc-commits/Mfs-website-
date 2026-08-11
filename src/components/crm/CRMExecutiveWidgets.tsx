import React from 'react';
import { Currency } from '../../types';
import {
  Users,
  Layers,
  Clock,
  AlertTriangle,
  MessageSquare,
  Zap,
  TrendingUp,
  DollarSign,
  Award,
  CheckCircle2,
  Activity,
  FileText,
  Download,
  Upload,
  Lock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Star,
  RefreshCw,
  Eye,
  ChevronRight
} from 'lucide-react';

interface CRMExecutiveWidgetsProps {
  currency: Currency;
  onShowToast: (msg: string) => void;
  onNavigateSubTab?: (tab: string) => void;
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

export const CRMExecutiveWidgets: React.FC<CRMExecutiveWidgetsProps> = ({
  currency,
  onShowToast,
  onNavigateSubTab
}) => {
  const formatMoney = (amountPKR: number) => {
    const rate = EXCHANGE_RATES[currency];
    const converted = amountPKR * rate;
    const symbol = CURRENCY_SYMBOLS[currency];
    if (currency === 'PKR') return `${symbol} ${converted.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Mock Executive Stats
  const executiveKPIs = [
    { label: 'Total Active Clients', value: '148', change: '+12% this mo', icon: Users, color: 'text-[#E5C158]', bg: 'bg-[#E5C158]/10 border-[#E5C158]/30' },
    { label: 'Active CRM Projects', value: '24', change: '12-Stage Visual', icon: Layers, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
    { label: 'Pending Client Reviews', value: '5', change: 'Action Required', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
    { label: 'Avg Client Satisfaction', value: '4.95 / 5.0', change: '99.2% Positive', icon: Star, color: 'text-[#E5C158]', bg: 'bg-[#E5C158]/10 border-[#E5C158]/30' }
  ];

  // High Priority & Delayed Projects
  const priorityProjects = [
    { id: 'PRJ-MFS-8850', title: 'VC Investor Presentation (25 Slides)', client: 'Sarah Al-Maktoum', priority: 'Same-Day +75%', deadline: 'Today 10 PM GST', status: 'Revisions' },
    { id: 'PRJ-MFS-9102', title: 'Executive Pitch Deck Series-A', client: 'Muhammad Shehroz Sultan', priority: 'Express +30%', deadline: 'Tomorrow 6 PM', status: 'Client Review' }
  ];

  // Revenue Per Client Top Performers
  const topRevenueClients = [
    { name: 'Muhammad Shehroz Sultan', company: 'MFS International', orders: 12, totalLTVPKR: 485000, preferredCurr: 'USD / PKR', flag: '🇵🇰' },
    { name: 'James O’Connor', company: 'Oxford Academic UK', orders: 5, totalLTVPKR: 280000, preferredCurr: 'GBP', flag: '🇬🇧' },
    { name: 'Sarah Al-Maktoum', company: 'Dubai Digital Ventures', orders: 3, totalLTVPKR: 195000, preferredCurr: 'AED', flag: '🇦🇪' }
  ];

  // Comprehensive Real-time Activity Timeline
  const activityTimeline = [
    { id: 'ACT-101', event: 'Submitted JazzCash transaction reference #JC910283', user: 'Ayesha Khan', type: 'Payment Upload', timestamp: '15 mins ago', badge: 'payment' },
    { id: 'ACT-102', event: 'Downloaded final formatted Case Study PDF & DOCX', user: 'James O’Connor', type: 'File Download', timestamp: '1 hour ago', badge: 'file' },
    { id: 'ACT-103', event: 'Sent revision feedback on Slide 12 valuation charts', user: 'Muhammad Shehroz Sultan', type: 'Revision Request', timestamp: '3 hours ago', badge: 'revision' },
    { id: 'ACT-104', event: 'Initiated Gemini 1.5 Pro AI Voice Assistant chat session', user: 'Dr. Tariq Mahmood', type: 'AI Conversation', timestamp: '5 hours ago', badge: 'ai' },
    { id: 'ACT-105', event: 'Client account login from verified IP (111.68.x.x)', user: 'Muhammad Shehroz Sultan', type: 'Security Audit', timestamp: '6 hours ago', badge: 'login' }
  ];

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* HEADER */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-r from-neutral-900/90 via-black to-[#0F0F0F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 uppercase tracking-wider flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#E5C158]" />
              EXECUTIVE CRM DASHBOARD
            </span>
            <span className="text-xs text-neutral-400 font-mono">Real-time Telemetry</span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">CRM Executive Widgets & Real-time Activity</h2>
          <p className="text-xs text-neutral-400">
            High-level metrics, revenue ranking per client, priority risk monitoring, and unified activity tracking.
          </p>
        </div>

        <button
          onClick={() => onShowToast('Telemetry refreshed from live database.')}
          className="px-3.5 py-2 rounded-xl glass-card border border-white/10 text-white hover:border-[#E5C158]/50 text-xs font-semibold flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#E5C158]" />
          Refresh Stats
        </button>
      </div>

      {/* KPI WIDGET CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {executiveKPIs.map((kpi, idx) => {
          const IconComponent = kpi.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl border border-white/10 p-5 bg-neutral-900/40 space-y-2 hover:border-[#E5C158]/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-400">{kpi.label}</span>
                <div className={`p-2 rounded-xl border ${kpi.bg}`}>
                  <IconComponent className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <div className="text-2xl font-black text-white font-mono">{kpi.value}</div>
              <span className="text-[10px] font-extrabold text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded border border-[#E5C158]/20">
                {kpi.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* TWO COLUMN GRID: PRIORITY PROJECTS & REVENUE PER CLIENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HIGH PRIORITY & DELAYED PROJECTS WIDGET */}
        <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              High Priority & Express Projects ({priorityProjects.length})
            </h3>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              Urgent Delivery
            </span>
          </div>

          <div className="space-y-3">
            {priorityProjects.map((p) => (
              <div key={p.id} className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[10px] font-bold text-[#E5C158]">{p.id}</span>
                    <span className="text-[9px] font-extrabold uppercase bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded border border-amber-500/30">
                      {p.priority}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-white text-xs">{p.title}</h4>
                  <span className="text-[11px] text-neutral-400">Client: {p.client}</span>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-neutral-400 block">Deadline</span>
                  <span className="font-bold text-emerald-400">{p.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REVENUE PER CLIENT RANKING WIDGET */}
        <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-[#E5C158]" />
              Top Revenue Per Client (LTV Ranking)
            </h3>
            <span className="text-[10px] font-mono text-[#E5C158]">VIP Tiering</span>
          </div>

          <div className="space-y-3">
            {topRevenueClients.map((client, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 flex items-center justify-center font-bold text-xs font-mono">
                    #{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-white flex items-center gap-1.5">
                      <span>{client.flag}</span>
                      {client.name}
                    </h4>
                    <span className="text-[11px] text-neutral-400">{client.company} • {client.orders} Completed Orders</span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs font-extrabold text-[#E5C158] block">{formatMoney(client.totalLTVPKR)}</span>
                  <span className="text-[10px] text-neutral-500">{client.preferredCurr}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REAL-TIME CLIENT ACTIVITY TIMELINE */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#E5C158]" />
            Unified Client Activity Timeline & Telemetry Audit Log
          </h3>
          <span className="text-[10px] font-mono text-neutral-400">Live Socket Engine Ready</span>
        </div>

        <div className="space-y-3">
          {activityTimeline.map((act) => (
            <div key={act.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4 text-xs hover:border-[#E5C158]/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 text-[#E5C158] border border-white/10 flex items-center justify-center font-bold text-xs shrink-0">
                  <Sparkles className="w-4 h-4 text-[#E5C158]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{act.user}</span>
                    <span className="text-[9px] font-extrabold uppercase bg-white/5 text-neutral-400 px-1.5 py-0.2 rounded border border-white/10">
                      {act.type}
                    </span>
                  </div>
                  <p className="text-neutral-300 text-[11px] mt-0.5">{act.event}</p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                {act.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
