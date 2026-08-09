import React, { useState } from 'react';
import {
  Zap,
  Bot,
  Layers,
  Sparkles,
  Sliders,
  CheckSquare,
  Square,
  Copy,
  UserPlus,
  ArrowUpRight,
  FileSpreadsheet,
  Trash2,
  Archive,
  Send,
  Mail,
  MessageCircle,
  Bell,
  Clock,
  AlertTriangle,
  FileCheck2,
  Brain,
  ShieldAlert,
  BarChart2,
  Filter,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Activity,
  PlusCircle,
  CreditCard,
  FileText
} from 'lucide-react';
import { Currency } from '../types';

export interface SmartFilterPreset {
  id: string;
  name: string;
  badgeCount: number;
  color: string;
  description: string;
}

export interface BulkOrderSelection {
  orderId: string;
  clientName: string;
  service: string;
  status: string;
  priority: string;
}

export interface OrderInsightMetric {
  title: string;
  value: string;
  change: string;
  status: 'positive' | 'warning' | 'neutral';
  description: string;
}

export interface OrderAutomationSmartActionsProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

const SMART_PRESETS: SmartFilterPreset[] = [
  { id: 'today', name: "Today's Orders", badgeCount: 4, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30', description: 'Submitted or updated within last 24h' },
  { id: 'urgent', name: 'Urgent Orders', badgeCount: 2, color: 'text-red-400 bg-red-500/10 border-red-500/30', description: 'Same-Day (+75%) & Priority express SLA' },
  { id: 'awaiting_payment', name: 'Awaiting Payment', badgeCount: 3, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', description: 'Manual EasyPaisa/JazzCash slip verification' },
  { id: 'needs_assignment', name: 'Needs Assignment', badgeCount: 1, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30', description: 'Unassigned to creative execution squad' },
  { id: 'needs_review', name: 'Needs Review', badgeCount: 5, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30', description: 'Internal QA & Director review pending' },
  { id: 'ready_delivery', name: 'Ready for Delivery', badgeCount: 2, color: 'text-[#28C76F] bg-[#28C76F]/10 border-[#28C76F]/30', description: 'Passed 7-point QA compliance checklist' },
  { id: 'completed_today', name: 'Completed Today', badgeCount: 6, color: 'text-[#E5C158] bg-[#E5C158]/10 border-[#E5C158]/30', description: 'Delivered & accepted by clients' }
];

const INSIGHT_METRICS: OrderInsightMetric[] = [
  { title: 'Average Completion Time', value: '14.2 Hours', change: '-18% vs Target', status: 'positive', description: 'Express priority delivery SLA benchmark' },
  { title: 'Pending Active Orders', value: '18 Orders', change: 'Normal Capacity', status: 'neutral', description: 'Distributed across 4 creative squads' },
  { title: 'Overdue SLA Risks', value: '0 Orders', change: '100% On-Time Rate', status: 'positive', description: 'Zero deadline breaches recorded' },
  { title: 'Revision Request Rate', value: '4.8%', change: 'Low Threshold', status: 'positive', description: '95.2% first-pass acceptance rate' },
  { title: 'Delivery Performance', value: '99.4%', change: '+0.6% MoM', status: 'positive', description: 'Verified client satisfaction index' },
  { title: 'Team Squad Workload', value: '78% Utilization', change: 'Balanced', status: 'neutral', description: 'Optimal allocation across specialists' }
];

const SAMPLE_ORDERS_BULK: BulkOrderSelection[] = [
  { orderId: 'ORD-MFS-849201', clientName: 'Muhammad Shehroz Sultan', service: 'Executive Pitch Deck', status: 'Internal Review', priority: 'SAME_DAY' },
  { orderId: 'ORD-MFS-849202', clientName: 'Hamza Malik', service: 'ATS Resume Engineering', status: 'Delivered', priority: 'EXPRESS' },
  { orderId: 'ORD-MFS-849203', clientName: 'Dr. Ayesha Khan', service: 'Academic Paper Formatting', status: 'In Progress', priority: 'STANDARD' },
  { orderId: 'ORD-MFS-849204', clientName: 'Zainab Qureshi', service: 'Corporate Report Layout', status: 'Drafting', priority: 'EXPRESS' },
  { orderId: 'ORD-MFS-849205', clientName: 'Tariq Mahmood', service: 'University Assignment', status: 'Under QA', priority: 'STANDARD' }
];

export const OrderAutomationSmartActions: React.FC<OrderAutomationSmartActionsProps> = ({
  currency,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'smart_actions' | 'bulk_ops' | 'ai_assistance' | 'automations' | 'insights'>('smart_actions');
  const [selectedPreset, setSelectedPreset] = useState<string>('urgent');
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>(['ORD-MFS-849201', 'ORD-MFS-849203']);
  const [isConfirmBulkDelete, setIsConfirmBulkDelete] = useState(false);

  // Bulk action handler
  const handleBulkAction = (actionName: string) => {
    if (selectedOrderIds.length === 0) {
      if (onShowToast) onShowToast('Please select at least one order to perform bulk action.');
      return;
    }
    if (onShowToast) onShowToast(`Bulk Operation '${actionName}' performed on ${selectedOrderIds.length} orders.`);
    if (actionName === 'Bulk Delete') {
      setIsConfirmBulkDelete(false);
      setSelectedOrderIds([]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedOrderIds.length === SAMPLE_ORDERS_BULK.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(SAMPLE_ORDERS_BULK.map((o) => o.orderId));
    }
  };

  const toggleSelectOrder = (id: string) => {
    if (selectedOrderIds.includes(id)) {
      setSelectedOrderIds(selectedOrderIds.filter((item) => item !== id));
    } else {
      setSelectedOrderIds([...selectedOrderIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* MODULE HEADER & ARCHITECTURE DIRECTIVE */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 bg-gradient-to-r from-[#0D0D12] via-[#151522] to-[#0D0D12] space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 shadow-[0_0_20px_rgba(229,193,88,0.2)]">
              <Zap className="w-6 h-6 text-[#E5C158]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#E5C158]/20 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/40 uppercase tracking-wider">
                  PHASE 8 AUTOMATION ENGINE
                </span>
                <span className="text-neutral-500 text-xs font-mono">• Orders Module Complete Architecture</span>
              </div>
              <h2 className="font-poppins font-black text-xl text-white">
                Order Automation, Smart Actions & AI Assistance
              </h2>
            </div>
          </div>

          {/* ORDERS ARCHITECTURE COMPLETION BADGE */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 text-[#28C76F] text-xs font-mono font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
            <span>Orders Module v2.0 Architecture Complete</span>
          </div>
        </div>

        {/* SMART FILTER PRESETS STRIP */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400 font-mono text-[10px] uppercase font-bold flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-[#E5C158]" />
              <span>Smart Filter Presets:</span>
            </span>
            <span className="text-neutral-500 text-[10px] font-mono">Instant status segmentations</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {SMART_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPreset(preset.id);
                  if (onShowToast) onShowToast(`Filtered by preset: '${preset.name}'`);
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-2 transition-all cursor-pointer border ${
                  selectedPreset === preset.id
                    ? 'bg-[#E5C158] text-black font-extrabold border-[#E5C158] shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                    : 'bg-white/[0.02] text-neutral-300 hover:text-white border-white/10 hover:border-white/20'
                }`}
              >
                <span>{preset.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    selectedPreset === preset.id ? 'bg-black text-[#E5C158]' : preset.color
                  }`}
                >
                  {preset.badgeCount}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        {[
          { id: 'smart_actions', label: 'Smart Quick Actions (10)', icon: Zap },
          { id: 'bulk_ops', label: 'Bulk Operations Hub', icon: Layers },
          { id: 'ai_assistance', label: 'AI Assistance Architecture', icon: Bot },
          { id: 'automations', label: 'Automation Triggers & Hooks', icon: Activity },
          { id: 'insights', label: 'Order Analytics & Insights', icon: BarChart2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-poppins flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#E5C158] text-black shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                  : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: SMART QUICK ACTIONS (10 CARDS) */}
      {/* ========================================================= */}
      {activeTab === 'smart_actions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins font-bold text-white text-base flex items-center gap-2">
              <span>Smart Order Operations</span>
              <span className="text-xs font-mono text-neutral-500 font-normal">1-Click Administrative Workflows</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {[
              { title: 'Create New Order', icon: PlusCircle, desc: 'Launch manual order entry wizard with deposit calculation', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
              { title: 'Duplicate Order', icon: Copy, desc: 'Clone requirements & client brief for recurring orders', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
              { title: 'Assign Team Squad', icon: UserPlus, desc: 'Dispatch to MFS Design, Writing or ATS Resume squads', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
              { title: 'Change Priority SLA', icon: Zap, desc: 'Upgrade speed tier to Express +30% or Same-Day +75%', color: 'text-[#E5C158] bg-[#E5C158]/10 border-[#E5C158]/30' },
              { title: 'Update Stage Status', icon: Sliders, desc: 'Promote order across 18-stage status matrix', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
              { title: 'Request Client Info', icon: HelpCircle, desc: 'Trigger missing requirement notification to client', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
              { title: 'Open Client Portal', icon: ExternalLink, desc: 'Access 360° client dashboard view & history', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' },
              { title: 'Open Payment Proof', icon: CreditCard, desc: 'Verify EasyPaisa/JazzCash transaction receipt screenshot', color: 'text-[#28C76F] bg-[#28C76F]/10 border-[#28C76F]/30' },
              { title: 'Generate PDF Invoice', icon: FileText, desc: 'Issue official GST/tax invoice statement with discount', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
              { title: 'Archive Order Vault', icon: Archive, desc: 'Safely move completed order to encrypted archive vault', color: 'text-neutral-400 bg-white/5 border-white/20' }
            ].map((action, idx) => {
              const ActionIcon = action.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (onShowToast) onShowToast(`Smart Action '${action.title}' triggered.`);
                  }}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#E5C158]/50 hover:bg-white/[0.04] transition-all cursor-pointer group space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl border ${action.color}`}>
                        <ActionIcon className="w-4 h-4" />
                      </div>
                      <span className="text-neutral-600 font-mono text-[9px] group-hover:text-[#E5C158]">
                        ACTION 0{idx + 1}
                      </span>
                    </div>

                    <h4 className="font-poppins font-bold text-white text-xs group-hover:text-[#E5C158] transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-neutral-400 text-[11px] leading-relaxed font-sans">
                      {action.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500 group-hover:text-white">
                    <span>Execute</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: BULK OPERATIONS HUB */}
      {/* ========================================================= */}
      {activeTab === 'bulk_ops' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-6 bg-gradient-to-b from-[#0D0D12] to-transparent">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                <span>Multi-Order Bulk Operations Hub</span>
                <span className="text-xs font-mono text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-0.5 rounded-full border border-[#E5C158]/30">
                  {selectedOrderIds.length} Selected
                </span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Perform batch status updates, team reassignments, priority changes or bulk data exports.
              </p>
            </div>

            {/* BULK ACTION BUTTON STRIP */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => handleBulkAction('Bulk Status Change')}
                className="px-3 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 font-bold cursor-pointer"
              >
                Bulk Status
              </button>
              <button
                onClick={() => handleBulkAction('Bulk Squad Assignment')}
                className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-bold cursor-pointer"
              >
                Bulk Assign
              </button>
              <button
                onClick={() => handleBulkAction('Bulk Priority Upgrade')}
                className="px-3 py-1.5 rounded-xl bg-[#E5C158]/20 hover:bg-[#E5C158]/30 text-[#E5C158] border border-[#E5C158]/40 font-bold cursor-pointer"
              >
                Bulk Priority
              </button>
              <button
                onClick={() => handleBulkAction('Bulk Data Export')}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold cursor-pointer flex items-center gap-1"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setIsConfirmBulkDelete(true)}
                className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-bold cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Protected Delete</span>
              </button>
            </div>
          </div>

          {/* BULK SELECTION TABLE */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/[0.04] text-neutral-400 uppercase text-[10px] border-b border-white/10">
                <tr>
                  <th className="p-3 w-10 text-center">
                    <button onClick={toggleSelectAll} className="cursor-pointer text-white">
                      {selectedOrderIds.length === SAMPLE_ORDERS_BULK.length ? (
                        <CheckSquare className="w-4 h-4 text-[#E5C158]" />
                      ) : (
                        <Square className="w-4 h-4 text-neutral-500" />
                      )}
                    </button>
                  </th>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Client Name</th>
                  <th className="p-3">Service Type</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3">Priority SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {SAMPLE_ORDERS_BULK.map((ord) => {
                  const isSelected = selectedOrderIds.includes(ord.orderId);
                  return (
                    <tr
                      key={ord.orderId}
                      onClick={() => toggleSelectOrder(ord.orderId)}
                      className={`hover:bg-white/[0.02] cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#E5C158]/10' : ''
                      }`}
                    >
                      <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => toggleSelectOrder(ord.orderId)} className="cursor-pointer">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#E5C158]" />
                          ) : (
                            <Square className="w-4 h-4 text-neutral-600" />
                          )}
                        </button>
                      </td>
                      <td className="p-3 text-[#E5C158] font-bold">{ord.orderId}</td>
                      <td className="p-3 font-semibold text-white">{ord.clientName}</td>
                      <td className="p-3 text-neutral-300">{ord.service}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px]">
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/30 text-[10px] font-bold">
                          {ord.priority}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* CONFIRM BULK DELETE DIALOG */}
          {isConfirmBulkDelete && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>Protected Action: Confirm Deletion of {selectedOrderIds.length} Selected Orders?</span>
              </div>
              <p className="text-xs text-neutral-400">
                This action requires administrative override. Orders will be permanently archived or purged from active view.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleBulkAction('Bulk Delete')}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white font-extrabold text-xs cursor-pointer hover:bg-red-600"
                >
                  Yes, Execute Bulk Delete
                </button>
                <button
                  onClick={() => setIsConfirmBulkDelete(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold text-xs cursor-pointer hover:bg-white/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: AI ASSISTANCE (ARCHITECTURE ONLY) */}
      {/* ========================================================= */}
      {activeTab === 'ai_assistance' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-gradient-to-r from-purple-950/40 via-black to-black border border-purple-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-white text-base flex items-center gap-2">
                  <span>MFS AI Intelligence & Recommendation Engine</span>
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                    ARCHITECTURE READY
                  </span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Future-ready predictive analytics, risk detection & smart delivery recommendation hooks.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'AI Order Summarizer',
                icon: Brain,
                desc: 'Generates concise 3-bullet executive briefs from multi-page client requirements and raw uploaded documents.',
                placeholderState: 'Hooks configured for Gemini 1.5 Pro Flash API integration'
              },
              {
                title: 'AI Priority SLA Suggestions',
                icon: Zap,
                desc: 'Analyzes client deadline urgency, slide count & squad capacity to recommend Express or Same-Day priority tags.',
                placeholderState: 'SLA risk model ready for real-time dispatch'
              },
              {
                title: 'AI Deadline Risk Detection',
                icon: AlertTriangle,
                desc: 'Predicts potential bottleneck risks 12 hours before SLA breach based on revision velocity and team load.',
                placeholderState: 'Predictive bottleneck warning hooks active'
              },
              {
                title: 'AI Missing Requirement Detector',
                icon: ShieldAlert,
                desc: 'Scans uploaded briefs for missing citations, citation styles, slide dimensions or branding colors.',
                placeholderState: 'Parser schema primed for PDF/DOCX brief scan'
              },
              {
                title: 'AI Revision Analysis Engine',
                icon: Sparkles,
                desc: 'Categorizes client feedback into minor cosmetic tweaks vs major structural scope changes automatically.',
                placeholderState: 'NLP feedback taxonomy classifier structured'
              },
              {
                title: 'AI Delivery Readiness Checker',
                icon: FileCheck2,
                desc: 'Evaluates 7-point QA compliance score before releasing final download links to client dashboard.',
                placeholderState: 'Pre-release compliance validation gate ready'
              }
            ].map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30">
                        <CardIcon className="w-5 h-5" />
                      </div>
                      <span className="text-purple-400 font-mono text-[9px] uppercase font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                        AI MODULE 0{idx + 1}
                      </span>
                    </div>

                    <h4 className="font-poppins font-bold text-white text-sm">{card.title}</h4>
                    <p className="text-neutral-400 text-xs leading-relaxed">{card.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-purple-300/80 flex items-center justify-between">
                    <span>{card.placeholderState}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: AUTOMATION TRIGGERS & HOOKS */}
      {/* ========================================================= */}
      {activeTab === 'automations' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-6 bg-gradient-to-b from-[#0D0D12] to-transparent">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                <span>Event-Driven Workflow Automation Triggers</span>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                  8 Event Hooks Configured
                </span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Architecture for automated email notifications, WhatsApp alerts, status change webhooks & payment triggers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              { title: 'Email Automation Hook', icon: Mail, event: 'ON_ORDER_CREATED', channel: 'Client Email', desc: 'Sends instant order confirmation & receipt to client email.' },
              { title: 'WhatsApp Alert Hook', icon: MessageCircle, event: 'ON_STATUS_CHANGE', channel: 'WhatsApp (+92 301 5323689)', desc: 'Pushes real-time progress updates to client WhatsApp.' },
              { title: 'Internal Squad Alert', icon: Bell, event: 'ON_SQUAD_ASSIGNED', channel: 'Admin Notification', desc: 'Alerts assigned lead designer or writer on team dashboard.' },
              { title: 'Client Portal Hook', icon: ArrowUpRight, event: 'ON_DELIVERABLE_RELEASED', channel: 'Client Dashboard', desc: 'Unlocks secured download preview link for client.' },
              { title: 'Deadline Reminder Hook', icon: Clock, event: 'SLA_6H_WARNING', channel: 'Slack / Admin Alert', desc: 'Triggers priority alarm when order is within 6h of deadline.' },
              { title: 'Payment Verify Trigger', icon: CreditCard, event: 'ON_PROOF_UPLOADED', channel: 'Finance Desk', desc: 'Notifies finance admin to verify EasyPaisa slip.' },
              { title: 'Project Complete Hook', icon: CheckCircle2, event: 'ON_CLIENT_ACCEPTED', channel: 'Review System', desc: 'Sends review invitation & generates tax invoice.' },
              { title: 'Revision Request Hook', icon: Sliders, event: 'ON_REVISION_OPENED', channel: 'Assigned Squad', desc: 'Reopens order in squad workspace with client notes.' }
            ].map((hook, idx) => {
              const HookIcon = hook.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <HookIcon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[9px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {hook.event}
                    </span>
                  </div>

                  <h4 className="font-poppins font-bold text-white text-xs">{hook.title}</h4>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{hook.desc}</p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span>Channel: {hook.channel}</span>
                    <span className="text-[#28C76F]">HOOK READY</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: ORDER ANALYTICS & INSIGHTS */}
      {/* ========================================================= */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-6 bg-gradient-to-b from-[#0D0D12] to-transparent">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                  <span>Order Operations Analytics & Insights</span>
                  <span className="text-xs font-mono text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-0.5 rounded-full border border-[#E5C158]/30">
                    Real-Time Performance
                  </span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Operational velocity, completion rates, revision ratios & team squad workload allocation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INSIGHT_METRICS.map((metric, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-mono text-[10px] uppercase font-bold">{metric.title}</span>
                    <span className="text-[#28C76F] font-mono text-[10px] font-bold">{metric.change}</span>
                  </div>

                  <strong className="text-2xl font-poppins font-black text-white block">{metric.value}</strong>
                  <p className="text-neutral-400 text-xs">{metric.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
