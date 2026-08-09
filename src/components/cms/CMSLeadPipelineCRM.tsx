import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Building,
  Mail,
  Phone,
  DollarSign,
  TrendingUp,
  Clock,
  Sparkles,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  UserCheck,
  Calendar,
  MessageSquare,
  Zap,
  Edit3,
  Trash2,
  X,
  ArrowRight,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { Currency } from '../../types';

export type LeadStage =
  | 'new_lead'
  | 'contacted'
  | 'qualified'
  | 'proposal_sent'
  | 'negotiation'
  | 'won'
  | 'lost'
  | 'follow_up'
  | 'future_opp';

export type LeadPriority = 'urgent' | 'high' | 'medium' | 'low';

export interface CRMLead {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  source: string;
  serviceInterested: string;
  estimatedBudget: number; // in USD base or PKR
  priority: LeadPriority;
  assignedTo: string;
  stage: LeadStage;
  notes: string;
  timeline: string;
  aiScore: number; // 0-100
  aiSuggestion: string;
  createdAt: string;
  lastContacted: string;
  activityHistory: { date: string; note: string }[];
}

interface CMSLeadPipelineCRMProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSLeadPipelineCRM: React.FC<CMSLeadPipelineCRMProps> = ({
  currency,
  onShowToast,
}) => {
  const [leads, setLeads] = useState<CRMLead[]>([
    {
      id: 'lead-1',
      companyName: 'Fintech Series A Venture (Dubai)',
      contactPerson: 'Tariq Al-Mansoor',
      email: 'tariq@fintechdubai.ae',
      phone: '+971 50 123 4567',
      source: 'Pitch Deck Quote Calculator',
      serviceInterested: 'Executive Presentation Design',
      estimatedBudget: 1200,
      priority: 'urgent',
      assignedTo: 'Shehroz Sultan (Founder)',
      stage: 'proposal_sent',
      notes: 'Requires 10-slide high-impact pitch deck for investor roadshow. $3.5M round target.',
      timeline: '4 Business Days SLA',
      aiScore: 96,
      aiSuggestion: 'High intent deal. Follow up via WhatsApp with Dubai pitch deck sample report PDF.',
      createdAt: '2026-07-25',
      lastContacted: '2 hours ago',
      activityHistory: [
        { date: '2026-07-25', note: 'Lead submitted quote calculator for pitch deck.' },
        { date: '2026-07-26', note: 'Sent official PDF proposal with 50% Grand Launch discount.' },
      ],
    },
    {
      id: 'lead-2',
      companyName: 'University of Manchester Master Scholar',
      contactPerson: 'Ayesha Malik',
      email: 'ayesha.m@manchester.ac.uk',
      phone: '+44 7700 900123',
      source: 'Direct WhatsApp Inquiry',
      serviceInterested: 'Assignment & Thesis Formatting',
      estimatedBudget: 350,
      priority: 'high',
      assignedTo: 'Academic Quality Lead',
      stage: 'qualified',
      notes: '12,000-word Master Dissertation requiring Harvard referencing and plagiarism validation.',
      timeline: '3 Days Express SLA',
      aiScore: 88,
      aiSuggestion: 'Confirmed academic scope. Send formal invoice via EasyPaisa/Bank Transfer.',
      createdAt: '2026-07-26',
      lastContacted: '5 hours ago',
      activityHistory: [
        { date: '2026-07-26', note: 'Inquired via WhatsApp regarding Harvard dissertation formatting.' },
      ],
    },
    {
      id: 'lead-3',
      companyName: 'Enterprise Cloud Systems (Islamabad)',
      contactPerson: 'Hamza Chaudhry',
      email: 'hamza@cloudsystems.pk',
      phone: '+92 300 9876543',
      source: 'ATS Resume Landing Page',
      serviceInterested: 'ATS Resume Engineering',
      estimatedBudget: 180,
      priority: 'medium',
      assignedTo: 'Resume Specialist',
      stage: 'contacted',
      notes: 'Software Architect seeking US remote roles. Needs ATS 98% match rate optimization.',
      timeline: '48 Hours Priority',
      aiScore: 82,
      aiSuggestion: 'Send ATS sample report proof to demonstrate 98% parser pass rate.',
      createdAt: '2026-07-26',
      lastContacted: '1 day ago',
      activityHistory: [
        { date: '2026-07-26', note: 'Contacted client with resume engineering checklist.' },
      ],
    },
    {
      id: 'lead-4',
      companyName: 'Global EduTech Corp (London, UK)',
      contactPerson: 'Oliver Smith',
      email: 'oliver@edutech.co.uk',
      phone: '+44 20 7946 0912',
      source: 'Website Contact Form',
      serviceInterested: 'Corporate Report Formatting',
      estimatedBudget: 2500,
      priority: 'urgent',
      assignedTo: 'Shehroz Sultan',
      stage: 'negotiation',
      notes: 'Quarterly investor report and 40-page corporate formatting mandate.',
      timeline: '7 Days SLA',
      aiScore: 94,
      aiSuggestion: 'High budget enterprise lead. Schedule 15-min discovery call via Google Meet.',
      createdAt: '2026-07-24',
      lastContacted: '3 hours ago',
      activityHistory: [
        { date: '2026-07-24', note: 'Initial proposal reviewed by UK executive board.' },
        { date: '2026-07-26', note: 'Negotiating final milestone schedule and NDA terms.' },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const stagesList: { key: LeadStage; label: string; color: string }[] = [
    { key: 'new_lead', label: 'New Lead', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { key: 'contacted', label: 'Contacted', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    { key: 'qualified', label: 'Qualified', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { key: 'proposal_sent', label: 'Proposal Sent', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { key: 'negotiation', label: 'Negotiation', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
    { key: 'won', label: 'Won Deal', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { key: 'follow_up', label: 'Follow Up', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    { key: 'lost', label: 'Lost', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  ];

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.serviceInterested.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'all' || l.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const handleMoveStage = (leadId: string, newStage: LeadStage) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          if (onShowToast) onShowToast(`Moved lead "${l.companyName}" to ${newStage.toUpperCase().replace('_', ' ')}`);
          return {
            ...l,
            stage: newStage,
            activityHistory: [
              ...l.activityHistory,
              { date: new Date().toISOString().split('T')[0], note: `Pipeline stage updated to ${newStage}` },
            ],
          };
        }
        return l;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30 uppercase">
                ENTERPRISE CRM & LEAD PIPELINE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-mono text-[10px] font-bold border border-purple-500/30 flex items-center gap-1">
                <Bot className="w-3 h-3 text-purple-400" />
                <span>AI LEAD SCORING ACTIVE</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Lead Management, Client Opportunities & Pipeline
            </h3>
            <p className="text-xs text-neutral-400">
              Track incoming client inquiries, project quotes, lead scoring, deal stages, and AI priority predictions.
            </p>
          </div>

          <button
            onClick={() => {
              if (onShowToast) onShowToast('New client lead created in pipeline');
            }}
            className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Lead</span>
          </button>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads by company, contact person, or service..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158] font-mono cursor-pointer"
          >
            <option value="all" className="bg-black">All Pipeline Stages</option>
            {stagesList.map((st) => (
              <option key={st.key} value={st.key} className="bg-black">
                {st.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* LEAD PIPELINE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLeads.map((lead) => {
          const currentStageObj = stagesList.find((s) => s.key === lead.stage);

          return (
            <div
              key={lead.id}
              className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12] hover:border-[#E5C158]/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-xl font-mono text-[10px] font-bold uppercase border ${
                      currentStageObj?.color || 'bg-white/5 text-white'
                    }`}
                  >
                    {currentStageObj?.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[9px] font-bold border border-purple-500/30">
                      Score: {lead.aiScore}/100
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase ${
                        lead.priority === 'urgent'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : lead.priority === 'high'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {lead.priority}
                    </span>
                  </div>
                </div>

                <div>
                  <strong className="text-white text-base font-bold block leading-snug">
                    {lead.companyName}
                  </strong>
                  <span className="text-xs text-neutral-400 block font-medium mt-0.5">
                    Contact: <strong className="text-white">{lead.contactPerson}</strong>
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                    Interested Service
                  </span>
                  <strong className="text-[#E5C158] font-bold block">{lead.serviceInterested}</strong>
                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-neutral-400 border-t border-white/5">
                    <span>Budget: <strong className="text-emerald-400">${lead.estimatedBudget}</strong></span>
                    <span>Source: {lead.source}</span>
                  </div>
                </div>

                {/* AI INSIGHT BOX */}
                <div className="p-3 rounded-2xl bg-purple-500/[0.03] border border-purple-500/20 space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>AI Lead Recommendation</span>
                  </span>
                  <p className="text-neutral-300 text-[11px] leading-snug">{lead.aiSuggestion}</p>
                </div>
              </div>

              {/* ACTION & STAGE SELECTOR */}
              <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <select
                    value={lead.stage}
                    onChange={(e) => handleMoveStage(lead.id, e.target.value as LeadStage)}
                    className="bg-black/60 border border-white/10 rounded-xl px-2.5 py-1 text-[11px] text-white font-mono focus:outline-none focus:border-[#E5C158] cursor-pointer"
                  >
                    {stagesList.map((st) => (
                      <option key={st.key} value={st.key} className="bg-black">
                        {st.label}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      setSelectedLead(lead);
                      setIsDetailOpen(true);
                    }}
                    className="px-3 py-1 rounded-xl bg-white/10 hover:bg-[#E5C158] hover:text-black text-white font-bold transition-all text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Lead Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LEAD DETAIL MODAL */}
      <AnimatePresence>
        {isDetailOpen && selectedLead && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <Building className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    Lead Dossier: {selectedLead.companyName}
                  </h3>
                </div>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 font-mono">
                  <div>
                    <span className="text-neutral-500 text-[10px] uppercase block">Contact Person</span>
                    <strong className="text-white text-xs">{selectedLead.contactPerson}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 text-[10px] uppercase block">Email Address</span>
                    <strong className="text-amber-400 text-xs">{selectedLead.email}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 text-[10px] uppercase block">Phone / WhatsApp</span>
                    <strong className="text-emerald-400 text-xs">{selectedLead.phone}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 text-[10px] uppercase block">Estimated Budget</span>
                    <strong className="text-white text-xs">${selectedLead.estimatedBudget}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">Project Notes</span>
                  <p className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-neutral-300">
                    {selectedLead.notes}
                  </p>
                </div>

                <div>
                  <span className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Activity Timeline & Log
                  </span>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {selectedLead.activityHistory.map((act, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-[11px] font-mono"
                      >
                        <span className="text-neutral-300">{act.note}</span>
                        <span className="text-neutral-500">{act.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      if (onShowToast) onShowToast(`Generated proposal draft for ${selectedLead.companyName}`);
                      setIsDetailOpen(false);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold shadow-lg cursor-pointer"
                  >
                    Generate AI Proposal Draft
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
