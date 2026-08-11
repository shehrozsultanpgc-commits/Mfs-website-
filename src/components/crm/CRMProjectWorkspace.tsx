import React, { useState, useMemo } from 'react';
import { Currency } from '../../types';
import {
  Layers,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  User,
  Calendar,
  DollarSign,
  Plus,
  Play,
  Pause,
  FileText,
  Sparkles,
  ArrowRight,
  Eye,
  Edit3,
  Trash2,
  Send,
  X,
  MessageSquare,
  ShieldCheck,
  Building2,
  Tag,
  Zap,
  TrendingUp,
  SlidersHorizontal,
  Check,
  RefreshCw,
  ExternalLink,
  Users,
  Award,
  Video,
  Download
} from 'lucide-react';

interface CRMProjectWorkspaceProps {
  currency: Currency;
  onShowToast: (msg: string) => void;
}

export interface ClientProject {
  id: string; // e.g., 'PRJ-MFS-9102'
  name: string;
  clientId: string; // e.g., 'MFS-CLI-84920'
  clientName: string;
  clientCompany: string;
  category: 'Presentation Design' | 'Assignment Writing' | 'Resume Engineering' | 'Report Formatting' | 'Pitch Deck';
  assignedTeam: string;
  priority: 'express' | 'priority' | 'same_day' | 'standard';
  currentStageIndex: number; // 0 to 11
  progressPercent: number;
  startDate: string;
  deadline: string;
  estimatedDelivery: string;
  budgetPKR: number;
  status: 'active' | 'under_review' | 'revision' | 'completed' | 'delayed' | 'on_hold';
  lastUpdated: string;
  description: string;
  stageHistory: Array<{
    stageName: string;
    completed: boolean;
    timestamp?: string;
    assignedPerson?: string;
    notes?: string;
  }>;
}

const PROJECT_STAGES = [
  'Inquiry Received',
  'Requirement Collection',
  'AI Analysis',
  'Planning',
  'Design',
  'Development',
  'Internal QA',
  'Client Review',
  'Revisions',
  'Final Approval',
  'Delivery',
  'Project Completed'
];

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

export const CRMProjectWorkspace: React.FC<CRMProjectWorkspaceProps> = ({
  currency,
  onShowToast
}) => {
  // Master Projects List State
  const [projects, setProjects] = useState<ClientProject[]>([
    {
      id: 'PRJ-MFS-9102',
      name: 'Executive Pitch Deck for Series-A Funding',
      clientId: 'MFS-CLI-84920',
      clientName: 'Muhammad Shehroz Sultan',
      clientCompany: 'MFS International',
      category: 'Pitch Deck',
      assignedTeam: 'Shehroz Sultan & Lead AI Visualizer',
      priority: 'express',
      currentStageIndex: 7, // Client Review
      progressPercent: 75,
      startDate: '2026-07-24',
      deadline: '2026-07-28',
      estimatedDelivery: 'Today, 6:00 PM PKT',
      budgetPKR: 18000,
      status: 'under_review',
      lastUpdated: '15 mins ago',
      description: '15-Slide Executive Pitch Deck with custom financial growth projections, dark gold aesthetics, and interactive charts.',
      stageHistory: PROJECT_STAGES.map((stage, idx) => ({
        stageName: stage,
        completed: idx <= 7,
        timestamp: idx <= 7 ? `2026-07-${24 + Math.floor(idx / 2)}` : undefined,
        assignedPerson: 'Shehroz Sultan (Lead)',
        notes: idx === 7 ? 'Sent draft PDF & PPTX to client for review via WhatsApp & Email' : `Completed ${stage} successfully`
      }))
    },
    {
      id: 'PRJ-MFS-9088',
      name: 'ATS Resume & Executive LinkedIn Optimization',
      clientId: 'MFS-CLI-48190',
      clientName: 'Ayesha Khan',
      clientCompany: 'LUMS Alumni Network',
      category: 'Resume Engineering',
      assignedTeam: 'CV Engineering Unit',
      priority: 'standard',
      currentStageIndex: 5, // Development
      progressPercent: 50,
      startDate: '2026-07-26',
      deadline: '2026-07-29',
      estimatedDelivery: 'Tomorrow, 2:00 PM PKT',
      budgetPKR: 6500,
      status: 'active',
      lastUpdated: '1 hour ago',
      description: 'Engineering ATS-compliant resume layout with keyword optimization for top multinational management roles.',
      stageHistory: PROJECT_STAGES.map((stage, idx) => ({
        stageName: stage,
        completed: idx <= 5,
        timestamp: idx <= 5 ? '2026-07-26' : undefined,
        assignedPerson: 'MFS Resume AI Agent',
        notes: idx === 5 ? 'Parsing candidate work achievements into ATS STAR format' : `Stage ${stage} complete`
      }))
    },
    {
      id: 'PRJ-MFS-8990',
      name: 'Clinical Trial Research Paper Formatting (APA 7th)',
      clientId: 'MFS-CLI-71204',
      clientName: 'Dr. Tariq Mahmood',
      clientCompany: 'Medical Institute',
      category: 'Assignment Writing',
      assignedTeam: 'Academic Research Desk',
      priority: 'priority',
      currentStageIndex: 11, // Completed
      progressPercent: 100,
      startDate: '2026-07-20',
      deadline: '2026-07-25',
      estimatedDelivery: 'Delivered On-Time',
      budgetPKR: 22000,
      status: 'completed',
      lastUpdated: '1 day ago',
      description: 'Comprehensive academic paper formatting, DOI citations, and table formatting adhering to IEEE/APA 7th guidelines.',
      stageHistory: PROJECT_STAGES.map((stage) => ({
        stageName: stage,
        completed: true,
        timestamp: '2026-07-25',
        assignedPerson: 'Senior Academic Editor',
        notes: 'Final manuscript approved by client and signed off.'
      }))
    },
    {
      id: 'PRJ-MFS-8850',
      name: 'VC Investor Presentation (25 Slides)',
      clientId: 'MFS-CLI-62019',
      clientName: 'Sarah Al-Maktoum',
      clientCompany: 'Dubai Digital Ventures LLC',
      category: 'Presentation Design',
      assignedTeam: 'Shehroz Sultan (Agency Owner)',
      priority: 'same_day',
      currentStageIndex: 8, // Revisions
      progressPercent: 85,
      startDate: '2026-07-25',
      deadline: '2026-07-27',
      estimatedDelivery: 'Today, 10:00 PM GST',
      budgetPKR: 65000,
      status: 'revision',
      lastUpdated: '3 hours ago',
      description: '25-Slide VC Investor deck for Middle East Expansion round with custom 3D asset renders and financial models.',
      stageHistory: PROJECT_STAGES.map((stage, idx) => ({
        stageName: stage,
        completed: idx <= 8,
        timestamp: '2026-07-26',
        assignedPerson: 'Shehroz Sultan',
        notes: idx === 8 ? 'Incorporating client feedback on Slide 12 valuation charts' : `Stage ${stage} finished`
      }))
    }
  ]);

  // Filters & Modal States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ClientProject | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // New Project Form State
  const [newPrjName, setNewPrjName] = useState('');
  const [newPrjClient, setNewPrjClient] = useState('');
  const [newPrjCategory, setNewPrjCategory] = useState<ClientProject['category']>('Presentation Design');
  const [newPrjBudget, setNewPrjBudget] = useState('');
  const [newPrjDeadline, setNewPrjDeadline] = useState('');
  const [newPrjPriority, setNewPrjPriority] = useState<ClientProject['priority']>('standard');

  const formatMoney = (amountPKR: number) => {
    const rate = EXCHANGE_RATES[currency];
    const converted = amountPKR * rate;
    const symbol = CURRENCY_SYMBOLS[currency];
    if (currency === 'PKR') return `${symbol} ${converted.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((prj) => {
      const matchesSearch =
        prj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prj.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prj.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prj.clientCompany.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = categoryFilter === 'all' || prj.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || prj.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || prj.priority === priorityFilter;

      return matchesSearch && matchesCat && matchesStatus && matchesPriority;
    });
  }, [projects, searchQuery, categoryFilter, statusFilter, priorityFilter]);

  // Update Project Stage Handler
  const handleAdvanceStage = (projectId: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId && p.currentStageIndex < PROJECT_STAGES.length - 1) {
          const nextIdx = p.currentStageIndex + 1;
          const nextPercent = Math.round(((nextIdx + 1) / PROJECT_STAGES.length) * 100);
          const isFinished = nextIdx === PROJECT_STAGES.length - 1;
          
          const updatedStageHistory = p.stageHistory.map((s, idx) => {
            if (idx <= nextIdx) {
              return {
                ...s,
                completed: true,
                timestamp: 'Just now',
                notes: idx === nextIdx ? `Advanced to ${PROJECT_STAGES[nextIdx]} stage` : s.notes
              };
            }
            return s;
          });

          return {
            ...p,
            currentStageIndex: nextIdx,
            progressPercent: nextPercent,
            status: isFinished ? 'completed' : 'active',
            lastUpdated: 'Just now',
            stageHistory: updatedStageHistory
          };
        }
        return p;
      })
    );

    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject(prev => {
        if (!prev) return null;
        const nextIdx = prev.currentStageIndex + 1;
        if (nextIdx >= PROJECT_STAGES.length) return prev;
        return {
          ...prev,
          currentStageIndex: nextIdx,
          progressPercent: Math.round(((nextIdx + 1) / PROJECT_STAGES.length) * 100),
          status: nextIdx === PROJECT_STAGES.length - 1 ? 'completed' : 'active',
          lastUpdated: 'Just now'
        };
      });
    }

    onShowToast('🚀 Project Stage Advanced & Audit Log Updated');
  };

  // Create Project Handler
  const handleCreateProject = () => {
    if (!newPrjName || !newPrjClient || !newPrjBudget) {
      onShowToast('Please fill all required project fields.');
      return;
    }

    const newPrj: ClientProject = {
      id: `PRJ-MFS-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newPrjName,
      clientId: 'MFS-CLI-NEW',
      clientName: newPrjClient,
      clientCompany: 'Client Enterprise',
      category: newPrjCategory,
      assignedTeam: 'MFS Core Delivery Team',
      priority: newPrjPriority,
      currentStageIndex: 0, // Inquiry Received
      progressPercent: 8,
      startDate: new Date().toISOString().split('T')[0],
      deadline: newPrjDeadline || '2026-08-01',
      estimatedDelivery: '3 Days',
      budgetPKR: parseFloat(newPrjBudget),
      status: 'active',
      lastUpdated: 'Just now',
      description: 'Newly initialized client project workspace.',
      stageHistory: PROJECT_STAGES.map((stage, idx) => ({
        stageName: stage,
        completed: idx === 0,
        timestamp: idx === 0 ? 'Just now' : undefined,
        assignedPerson: 'Admin System',
        notes: idx === 0 ? 'Project created & scope recorded' : undefined
      }))
    };

    setProjects([newPrj, ...projects]);
    setIsNewProjectModalOpen(false);
    setNewPrjName('');
    setNewPrjClient('');
    setNewPrjBudget('');
    onShowToast(`✔ New Project Workspace initialized: ${newPrj.id}`);
  };

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* HEADER SECTION */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-r from-neutral-900/90 via-black to-[#0F0F0F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#E5C158]" />
              ENTERPRISE CRM WORKSPACE
            </span>
            <span className="text-xs text-neutral-400 font-mono">12-Stage Visual Engine</span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">Client Project Command Center</h2>
          <p className="text-xs text-neutral-400">
            Real-time project stage tracking, client deliverable progress, priority multipliers, and visual audit logs.
          </p>
        </div>

        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(229,193,88,0.2)]"
        >
          <Plus className="w-4 h-4 text-black" />
          Create New Project
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="glass-card rounded-2xl border border-white/10 p-4 bg-neutral-900/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        {/* SEARCH */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project title, ID (e.g. PRJ-MFS-9102), client name, or company..."
            className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]/50"
          />
        </div>

        {/* CATEGORY & STATUS FILTERS */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-neutral-300 focus:outline-none focus:border-[#E5C158]/50"
          >
            <option value="all">All Categories</option>
            <option value="Presentation Design">Presentation Design</option>
            <option value="Pitch Deck">Pitch Deck</option>
            <option value="Assignment Writing">Assignment Writing</option>
            <option value="Resume Engineering">Resume Engineering</option>
            <option value="Report Formatting">Report Formatting</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-neutral-300 focus:outline-none focus:border-[#E5C158]/50"
          >
            <option value="all">All Statuses</option>
            <option value="active">🟢 Active</option>
            <option value="under_review">🟡 Under Review</option>
            <option value="revision">🟠 Revisions</option>
            <option value="completed">✅ Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-neutral-300 focus:outline-none focus:border-[#E5C158]/50"
          >
            <option value="all">All Speed Priorities</option>
            <option value="express">⚡ Express +30%</option>
            <option value="priority">🔥 Priority +50%</option>
            <option value="same_day">🚀 Same-Day +75%</option>
            <option value="standard">Standard</option>
          </select>
        </div>
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((prj) => (
          <div
            key={prj.id}
            onClick={() => setSelectedProject(prj)}
            className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-[#E5C158]/40 transition-all cursor-pointer space-y-4 relative group"
          >
            {/* TOP HEADER */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[11px] font-bold text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded border border-[#E5C158]/30">
                    {prj.id}
                  </span>
                  <span className="text-[10px] font-semibold text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {prj.category}
                  </span>
                  {prj.priority !== 'standard' && (
                    <span className="text-[9px] font-extrabold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/40 px-1.5 py-0.2 rounded">
                      {prj.priority.replace('_', ' ')}
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-white text-sm group-hover:text-[#E5C158] transition-colors">
                  {prj.name}
                </h3>
                <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                  <User className="w-3 h-3 text-neutral-500" />
                  {prj.clientName} ({prj.clientCompany})
                </p>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                  prj.status === 'completed'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : prj.status === 'under_review'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : prj.status === 'revision'
                    ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                    : 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                }`}
              >
                {prj.status.replace('_', ' ')}
              </span>
            </div>

            {/* PROGRESS BAR & STAGE */}
            <div className="space-y-1.5 bg-black/40 p-3 rounded-xl border border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E5C158]" />
                  Stage {prj.currentStageIndex + 1}/12: <span className="text-[#E5C158]">{PROJECT_STAGES[prj.currentStageIndex]}</span>
                </span>
                <span className="font-mono font-bold text-white">{prj.progressPercent}%</span>
              </div>

              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#E5C158] to-[#28C76F] h-full rounded-full transition-all duration-500"
                  style={{ width: `${prj.progressPercent}%` }}
                />
              </div>
            </div>

            {/* METRICS ROW */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] text-neutral-500 block">Deadline</span>
                <span className="font-semibold text-white">{prj.deadline}</span>
              </div>
              <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] text-neutral-500 block">Est. Delivery</span>
                <span className="font-semibold text-emerald-400">{prj.estimatedDelivery}</span>
              </div>
              <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] text-neutral-500 block">Budget</span>
                <span className="font-mono font-bold text-white">{formatMoney(prj.budgetPKR)}</span>
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs" onClick={(e) => e.stopPropagation()}>
              <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Updated {prj.lastUpdated}
              </span>

              <div className="flex items-center gap-2">
                {prj.currentStageIndex < PROJECT_STAGES.length - 1 && (
                  <button
                    onClick={() => handleAdvanceStage(prj.id)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 font-bold text-[10px] uppercase flex items-center gap-1 transition-all"
                  >
                    Advance Stage
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                <button
                  onClick={() => setSelectedProject(prj)}
                  className="px-3 py-1 rounded-lg glass-card border border-white/10 text-white hover:border-[#E5C158]/50 text-[11px] font-semibold flex items-center gap-1 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-[#E5C158]" />
                  Timeline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 12-STAGE VISUAL TIMELINE MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="glass-card rounded-3xl border border-white/20 bg-[#0A0A0C] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
            {/* MODAL HEADER */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-neutral-900 via-black to-[#0F0F0F] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-0.5 rounded border border-[#E5C158]/30">
                    {selectedProject.id}
                  </span>
                  <span className="text-xs font-semibold text-neutral-400">{selectedProject.category}</span>
                </div>
                <h2 className="text-lg font-extrabold text-white mt-1">{selectedProject.name}</h2>
                <p className="text-xs text-neutral-400">Client: {selectedProject.clientName} • {selectedProject.clientCompany}</p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full glass-card border border-white/10 hover:bg-white/10 text-neutral-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* CURRENT PROGRESS OVERVIEW */}
              <div className="glass-card rounded-2xl border border-white/10 p-4 bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-neutral-400">Current Active Stage</span>
                  <div className="text-base font-extrabold text-[#E5C158] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E5C158]" />
                    Stage {selectedProject.currentStageIndex + 1}: {PROJECT_STAGES[selectedProject.currentStageIndex]}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-neutral-400 block">Overall Completion</span>
                    <span className="font-mono text-lg font-black text-emerald-400">{selectedProject.progressPercent}%</span>
                  </div>

                  {selectedProject.currentStageIndex < PROJECT_STAGES.length - 1 && (
                    <button
                      onClick={() => handleAdvanceStage(selectedProject.id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-1.5"
                    >
                      Advance to Stage {selectedProject.currentStageIndex + 2}
                      <ArrowRight className="w-4 h-4 text-black" />
                    </button>
                  )}
                </div>
              </div>

              {/* 12-STAGE VISUAL STEPPER */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  12-Stage Visual Deliverable Timeline & Audit Log
                </h3>

                <div className="relative border-l-2 border-white/10 ml-4 pl-6 space-y-6">
                  {PROJECT_STAGES.map((stageName, idx) => {
                    const isCompleted = idx < selectedProject.currentStageIndex;
                    const isCurrent = idx === selectedProject.currentStageIndex;

                    return (
                      <div key={idx} className="relative group">
                        {/* ICON DOT */}
                        <div
                          className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted
                              ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(40,199,111,0.5)]'
                              : isCurrent
                              ? 'bg-[#E5C158] text-black animate-pulse shadow-[0_0_12px_rgba(229,193,88,0.6)]'
                              : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                          }`}
                        >
                          {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>

                        {/* STAGE CONTENT */}
                        <div className={`p-4 rounded-xl border transition-all ${
                          isCurrent
                            ? 'glass-card border-[#E5C158]/50 bg-[#E5C158]/5'
                            : isCompleted
                            ? 'bg-white/[0.02] border-white/10'
                            : 'bg-black/20 border-white/5 opacity-60'
                        }`}>
                          <div className="flex items-center justify-between">
                            <h4 className={`font-extrabold text-sm ${
                              isCurrent ? 'text-[#E5C158]' : isCompleted ? 'text-white' : 'text-neutral-400'
                            }`}>
                              Stage {idx + 1}: {stageName}
                            </h4>

                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                              isCompleted
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : isCurrent
                                ? 'bg-[#E5C158]/20 text-[#E5C158] border-[#E5C158]/40'
                                : 'bg-neutral-800 text-neutral-500 border-neutral-700'
                            }`}>
                              {isCompleted ? 'COMPLETED' : isCurrent ? 'IN PROGRESS' : 'PENDING'}
                            </span>
                          </div>

                          {/* STAGE METADATA & NOTES */}
                          <p className="text-xs text-neutral-400 mt-1">
                            {selectedProject.stageHistory[idx]?.notes || `Automated checkpoint for ${stageName}.`}
                          </p>

                          {selectedProject.stageHistory[idx]?.timestamp && (
                            <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                              <span>Assigned: {selectedProject.stageHistory[idx]?.assignedPerson || 'MFS Team'}</span>
                              <span>Timestamp: {selectedProject.stageHistory[idx]?.timestamp}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW PROJECT MODAL */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-card rounded-3xl border border-white/20 bg-[#0A0A0C] w-full max-w-lg p-6 space-y-4 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#E5C158]" />
                Initialize Client Project Workspace
              </h3>
              <button
                onClick={() => setIsNewProjectModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Project Name *</label>
                <input
                  type="text"
                  value={newPrjName}
                  onChange={(e) => setNewPrjName(e.target.value)}
                  placeholder="e.g. Executive Slide Deck or ATS Resume Engineering"
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#E5C158]/50"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Client Name / Company *</label>
                <input
                  type="text"
                  value={newPrjClient}
                  onChange={(e) => setNewPrjClient(e.target.value)}
                  placeholder="e.g. Muhammad Shehroz Sultan"
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#E5C158]/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Category</label>
                  <select
                    value={newPrjCategory}
                    onChange={(e) => setNewPrjCategory(e.target.value as any)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#E5C158]/50"
                  >
                    <option value="Presentation Design">Presentation Design</option>
                    <option value="Pitch Deck">Pitch Deck</option>
                    <option value="Assignment Writing">Assignment Writing</option>
                    <option value="Resume Engineering">Resume Engineering</option>
                    <option value="Report Formatting">Report Formatting</option>
                  </select>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Speed Priority</label>
                  <select
                    value={newPrjPriority}
                    onChange={(e) => setNewPrjPriority(e.target.value as any)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#E5C158]/50"
                  >
                    <option value="standard">Standard</option>
                    <option value="express">Express +30%</option>
                    <option value="priority">Priority +50%</option>
                    <option value="same_day">Same-Day +75%</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Budget Base (PKR) *</label>
                  <input
                    type="number"
                    value={newPrjBudget}
                    onChange={(e) => setNewPrjBudget(e.target.value)}
                    placeholder="18000"
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white font-mono focus:border-[#E5C158]/50"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Target Deadline</label>
                  <input
                    type="date"
                    value={newPrjDeadline}
                    onChange={(e) => setNewPrjDeadline(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#E5C158]/50"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsNewProjectModalOpen(false)}
                className="px-4 py-2 rounded-xl glass-card border border-white/10 text-neutral-400 hover:text-white text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90"
              >
                Create Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
