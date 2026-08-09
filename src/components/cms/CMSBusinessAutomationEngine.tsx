import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  Play,
  Pause,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  Search,
  Filter,
  Copy,
  Sliders,
  Sparkles,
  Bot,
  Mail,
  MessageSquare,
  Bell,
  Smartphone,
  Send,
  Database,
  Shield,
  ShieldAlert,
  Server,
  FileText,
  UserCheck,
  CreditCard,
  FolderKanban,
  ArrowRight,
  ChevronRight,
  Layers,
  History,
  Activity,
  Terminal,
  Cpu,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  HelpCircle,
  BookOpen,
  Share2,
  Link as LinkIcon
} from 'lucide-react';
import { Currency } from '../../types';

interface CMSBusinessAutomationEngineProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export interface WorkflowItem {
  id: string;
  name: string;
  category: 'Client Onboarding' | 'Order Processing' | 'Payment Verification' | 'Content Publishing' | 'Lead Conversion' | 'System Health' | 'Security Audit' | 'AI Task Assignment';
  trigger: string;
  conditions: string[];
  actions: string[];
  status: 'active' | 'draft' | 'disabled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  owner: string;
  lastExecution: string;
  executionCount: number;
  successRate: number;
  version: string;
  executionHistory: {
    id: string;
    timestamp: string;
    triggerSource: string;
    result: 'success' | 'failed' | 'warning';
    duration: string;
    log: string;
  }[];
}

export interface ScheduledJob {
  id: string;
  name: string;
  description: string;
  schedule: string;
  status: 'active' | 'paused' | 'running';
  duration: string;
  lastRun: string;
  nextRun: string;
  category: 'backup' | 'report' | 'cleanup' | 'ai_maintenance' | 'optimization' | 'security';
}

export interface BusinessRule {
  id: string;
  name: string;
  description: string;
  priority: number;
  conditions: string;
  exceptions: string;
  version: string;
  status: 'active' | 'inactive';
  category: 'order_limits' | 'payment_audit' | 'revision_policy' | 'refund_terms' | 'vip_client' | 'discount_logic';
}

export interface NotificationTemplate {
  id: string;
  name: string;
  channel: 'email' | 'sms' | 'whatsapp' | 'in_app' | 'push' | 'slack' | 'teams';
  triggerEvent: string;
  subjectOrHeader: string;
  bodyPreview: string;
  status: 'active' | 'draft';
  sentCount: number;
  deliveryRate: number;
  lastSent: string;
}

export const CMSBusinessAutomationEngine: React.FC<CMSBusinessAutomationEngineProps> = ({
  currency,
  onShowToast,
}) => {
  // Navigation Sub-Tab State inside Automation Center
  const [activeTab, setActiveTab] = useState<
    | 'monitoring'
    | 'workflows'
    | 'triggers'
    | 'actions'
    | 'scheduled'
    | 'rules'
    | 'notifications'
    | 'ai_automation'
  >('monitoring');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // --- WORKFLOWS STATE ---
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([
    {
      id: 'wf-101',
      name: 'Instant New Order Onboarding & Email Confirmation',
      category: 'Order Processing',
      trigger: 'Client Event: New Order Submitted',
      conditions: ['Order status == "Pending Payment"', 'Client email is valid'],
      actions: ['Send Order Confirmation Email', 'Notify Admin via WhatsApp / Slack', 'Create Order Folder in Encrypted Cloud'],
      status: 'active',
      priority: 'high',
      owner: 'Shehroz Sultan (Admin)',
      lastExecution: '2026-07-27 10:15 PKT',
      executionCount: 142,
      successRate: 100,
      version: 'v2.1',
      executionHistory: [
        {
          id: 'ex-1',
          timestamp: '2026-07-27 10:15 PKT',
          triggerSource: 'ORD-MFS-849201',
          result: 'success',
          duration: '120ms',
          log: 'Email sent to shehrozsultanpgc@gmail.com; Cloud directory initialized.',
        },
        {
          id: 'ex-2',
          timestamp: '2026-07-26 18:40 PKT',
          triggerSource: 'ORD-MFS-739102',
          result: 'success',
          duration: '145ms',
          log: 'Email sent; Slack notification dispatched to #mfs-orders.',
        },
      ],
    },
    {
      id: 'wf-102',
      name: 'EasyPaisa & JazzCash Auto-Verification Routing',
      category: 'Payment Verification',
      trigger: 'Client Event: Payment Uploaded',
      conditions: ['Payment method IN ["EasyPaisa", "JazzCash"]', 'Transaction proof image present'],
      actions: ['Trigger OCR Receipt Parsing', 'Match Amount & Account Title', 'Auto-Verify or Flag for Admin Audit'],
      status: 'active',
      priority: 'critical',
      owner: 'Payment Operations Team',
      lastExecution: '2026-07-27 09:30 PKT',
      executionCount: 98,
      successRate: 98.9,
      version: 'v1.4',
      executionHistory: [
        {
          id: 'ex-3',
          timestamp: '2026-07-27 09:30 PKT',
          triggerSource: 'TX-EP-982173',
          result: 'success',
          duration: '310ms',
          log: 'Amount PKR 2,500 verified against EasyPaisa 03116191234.',
        },
      ],
    },
    {
      id: 'wf-103',
      name: 'High-Value Order VIP Flag & Priority Assignment',
      category: 'Lead Conversion',
      trigger: 'Client Event: Order Total > PKR 10,000 / $100',
      conditions: ['Order total >= threshold', 'Client lifetime spend > 0'],
      actions: ['Apply VIP Tag to Client CRM Profile', 'Assign Senior Project Lead', 'Dispatch Priority SMS Alert'],
      status: 'active',
      priority: 'critical',
      owner: 'Shehroz Sultan (Founder)',
      lastExecution: '2026-07-25 14:20 PKT',
      executionCount: 24,
      successRate: 100,
      version: 'v1.0',
      executionHistory: [],
    },
    {
      id: 'wf-104',
      name: 'CMS Article Peer Review & Auto-Publish Pipeline',
      category: 'Content Publishing',
      trigger: 'Admin Event: CMS Stage Changed to Final Approval',
      conditions: ['SEO score >= 90', 'Legal compliance tag present'],
      actions: ['Generate OpenGraph Meta Tags', 'Rebuild Search Index', 'Publish Article Live to /blog'],
      status: 'active',
      priority: 'medium',
      owner: 'Editorial Team',
      lastExecution: '2026-07-26 14:20 PKT',
      executionCount: 45,
      successRate: 97.8,
      version: 'v2.0',
      executionHistory: [],
    },
    {
      id: 'wf-105',
      name: 'Midnight Automated Database & Cloud Asset Backup',
      category: 'System Health',
      trigger: 'Scheduled Job: Daily Midnight PKT Cron',
      conditions: ['Storage available > 10GB', 'Database connection healthy'],
      actions: ['Dump PostgreSQL / Supabase Schema', 'Encrypt Dump file with AES-256', 'Sync to Cold Storage Mirror'],
      status: 'active',
      priority: 'high',
      owner: 'DevOps & Infrastructure',
      lastExecution: '2026-07-27 00:00 PKT',
      executionCount: 365,
      successRate: 100,
      version: 'v3.0',
      executionHistory: [],
    },
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowItem | null>(workflows[0]);
  const [isVisualBuilderOpen, setIsVisualBuilderOpen] = useState(false);
  const [isNewWorkflowModalOpen, setIsNewWorkflowModalOpen] = useState(false);

  // --- SCHEDULED JOBS STATE ---
  const [scheduledJobs, setScheduledJobs] = useState<ScheduledJob[]>([
    {
      id: 'job-1',
      name: 'Daily Cloud Database Backup & Encryption',
      description: 'Full database export with 256-bit encryption pushed to primary & secondary cloud buckets.',
      schedule: 'Every day at 00:00 PKT (Cron: 0 0 * * *)',
      status: 'active',
      duration: '2.4s',
      lastRun: '2026-07-27 00:00 PKT',
      nextRun: '2026-07-28 00:00 PKT',
      category: 'backup',
    },
    {
      id: 'job-2',
      name: 'Weekly Revenue & Financial Performance Summary Report',
      description: 'Generates automated financial reports for EasyPaisa, JazzCash, Bank Transfers, and USD PayPal revenue.',
      schedule: 'Every Monday at 08:00 PKT',
      status: 'active',
      duration: '4.1s',
      lastRun: '2026-07-20 08:00 PKT',
      nextRun: '2026-07-27 08:00 PKT',
      category: 'report',
    },
    {
      id: 'job-3',
      name: 'Expired Session & Temporary File Cleanup',
      description: 'Purges unattached upload drafts older than 14 days to preserve NVMe SSD storage.',
      schedule: 'Every Sunday at 02:00 PKT',
      status: 'active',
      duration: '1.2s',
      lastRun: '2026-07-26 02:00 PKT',
      nextRun: '2026-08-02 02:00 PKT',
      category: 'cleanup',
    },
    {
      id: 'job-4',
      name: 'Dual AI Model Knowledge Vector Re-Indexing',
      description: 'Re-embeds modified SOPs, service pricing, and FAQs into the RAG vector cache.',
      schedule: 'Every 6 Hours',
      status: 'active',
      duration: '3.8s',
      lastRun: '2026-07-27 00:00 PKT',
      nextRun: '2026-07-27 06:00 PKT',
      category: 'ai_maintenance',
    },
    {
      id: 'job-5',
      name: 'Platform Security Scan & Vulnerability Audit',
      description: 'Automated audit of IP address logs, failed admin login attempts, and rate-limit violations.',
      schedule: 'Every 12 Hours',
      status: 'active',
      duration: '1.9s',
      lastRun: '2026-07-26 22:00 PKT',
      nextRun: '2026-07-27 10:00 PKT',
      category: 'security',
    },
  ]);

  // --- BUSINESS RULES STATE ---
  const [businessRules, setBusinessRules] = useState<BusinessRule[]>([
    {
      id: 'rule-1',
      name: 'Grand Launch 50% Promo Auto-Discount Rule',
      description: 'Automatically applies 50% launch discount across all presentations, assignments, CVs, and reports.',
      priority: 1,
      conditions: 'If promo_code == "GRAND50" OR promo_active == true',
      exceptions: 'Custom enterprise contracts over $1,000',
      version: 'v1.0',
      status: 'active',
      category: 'discount_logic',
    },
    {
      id: 'rule-2',
      name: 'Manual Founder Audit for EasyPaisa Payments > PKR 15,000',
      description: 'Flags large local transfer proofs for mandatory manual validation by Founder before project kickoff.',
      priority: 2,
      conditions: 'If payment_method == "EasyPaisa" AND amount > 15000 PKR',
      exceptions: 'Verified VIP repeat clients',
      version: 'v1.2',
      status: 'active',
      category: 'payment_audit',
    },
    {
      id: 'rule-3',
      name: 'Standard Revision Limit Policy (3 Included Free)',
      description: 'Grants up to 3 complimentary revisions within 14 days of deliverable dispatch.',
      priority: 3,
      conditions: 'If revision_count <= 3 AND days_since_delivery <= 14',
      exceptions: 'Agency fault or missed brief requirements (unlimited free fixes)',
      version: 'v2.0',
      status: 'active',
      category: 'revision_policy',
    },
    {
      id: 'rule-4',
      name: 'VIP Client Status Qualification Threshold',
      description: 'Elevates clients with cumulative order volume >= 5 OR spend >= $300 to VIP tier with priority queues.',
      priority: 4,
      conditions: 'If client_lifetime_spend >= 300 USD OR total_orders >= 5',
      exceptions: 'None',
      version: 'v1.1',
      status: 'active',
      category: 'vip_client',
    },
  ]);

  // --- NOTIFICATION TEMPLATES STATE ---
  const [notificationTemplates, setNotificationTemplates] = useState<NotificationTemplate[]>([
    {
      id: 'notif-1',
      name: 'Order Confirmation Email',
      channel: 'email',
      triggerEvent: 'New Order Created',
      subjectOrHeader: 'Order Confirmation - {{order_id}} | MFS Growth Agency',
      bodyPreview: 'Dear {{client_name}}, thank you for placing your order for {{service_name}}. Our team has received your brief...',
      status: 'active',
      sentCount: 320,
      deliveryRate: 99.7,
      lastSent: '2026-07-27 10:15 PKT',
    },
    {
      id: 'notif-2',
      name: 'Payment Proof Verification Receipt',
      channel: 'email',
      triggerEvent: 'Payment Verified',
      subjectOrHeader: 'Payment Verified - {{order_id}} Received',
      bodyPreview: 'Great news! Your {{payment_method}} payment of {{amount}} has been verified. Project work has commenced...',
      status: 'active',
      sentCount: 285,
      deliveryRate: 100,
      lastSent: '2026-07-27 09:30 PKT',
    },
    {
      id: 'notif-3',
      name: 'In-App Order Status Progress Alert',
      channel: 'in_app',
      triggerEvent: 'Project Milestone Reached',
      subjectOrHeader: 'Your project deliverable status updated to {{status}}',
      bodyPreview: 'Your order {{order_id}} is now 80% complete. View live project preview in your Client Portal dashboard.',
      status: 'active',
      sentCount: 540,
      deliveryRate: 100,
      lastSent: '2026-07-26 18:40 PKT',
    },
    {
      id: 'notif-4',
      name: 'WhatsApp Fast Support Escalation',
      channel: 'whatsapp',
      triggerEvent: 'Urgent Client Revision Request',
      subjectOrHeader: 'Urgent Revision Notification - {{order_id}}',
      bodyPreview: 'Assalam-o-Alaikum {{client_name}}, your revision request for {{service_name}} has been assigned to a Senior Specialist.',
      status: 'active',
      sentCount: 95,
      deliveryRate: 98.9,
      lastSent: '2026-07-25 11:20 PKT',
    },
  ]);

  // Handlers for Workflows
  const handleToggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((wf) => {
        if (wf.id === id) {
          const nextStatus = wf.status === 'active' ? 'disabled' : 'active';
          if (onShowToast) onShowToast(`Workflow "${wf.name}" set to ${nextStatus.toUpperCase()}`);
          return { ...wf, status: nextStatus };
        }
        return wf;
      })
    );
  };

  const handleDuplicateWorkflow = (wf: WorkflowItem) => {
    const duplicated: WorkflowItem = {
      ...wf,
      id: `wf-${Date.now()}`,
      name: `${wf.name} (Copy)`,
      status: 'draft',
      version: 'v1.0-draft',
      executionCount: 0,
      executionHistory: [],
    };
    setWorkflows((prev) => [duplicated, ...prev]);
    setSelectedWorkflow(duplicated);
    if (onShowToast) onShowToast(`Duplicated workflow into draft "${duplicated.name}"`);
  };

  const handleRunScheduledJob = (job: ScheduledJob) => {
    setScheduledJobs((prev) =>
      prev.map((j) =>
        j.id === job.id
          ? {
              ...j,
              status: 'running',
              lastRun: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' PKT',
            }
          : j
      )
    );

    if (onShowToast) onShowToast(`Executing job "${job.name}"...`);

    setTimeout(() => {
      setScheduledJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, status: 'active' } : j))
      );
      if (onShowToast) onShowToast(`Successfully completed scheduled job: "${job.name}" in ${job.duration}`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-6 bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/40 flex items-center justify-center text-[#E5C158] shadow-[0_0_20px_rgba(229,193,88,0.2)] shrink-0">
              <Zap className="w-6 h-6 text-[#E5C158]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 uppercase tracking-wider">
                  PHASE 16 PART 8 • BUSINESS PROCESS CENTER
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] animate-pulse" />
                  <span>AUTOMATION ENGINE ONLINE</span>
                </span>
              </div>
              <h1 className="font-poppins font-black text-xl md:text-2xl text-white mt-1">
                Enterprise Business Automation & Workflow Engine
              </h1>
              <p className="text-xs text-neutral-400 max-w-2xl">
                Central orchestration layer managing event triggers, automated notifications, scheduled maintenance jobs, business logic rules, and Stage 2 AI task routing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (onShowToast) onShowToast('All automation rules & event listeners re-indexed successfully!');
              }}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer border border-white/10"
            >
              <RefreshCw className="w-4 h-4 text-[#E5C158]" />
              <span>Re-index Triggers</span>
            </button>

            <button
              onClick={() => {
                setIsNewWorkflowModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.25)]"
            >
              <Plus className="w-4 h-4" />
              <span>Create Workflow</span>
            </button>
          </div>
        </div>

        {/* SUB-NAVIGATION TABS */}
        <div className="pt-3 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              activeTab === 'monitoring'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>1. Monitoring Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('workflows')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              activeTab === 'workflows'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Workflow Automation</span>
          </button>

          <button
            onClick={() => setActiveTab('triggers')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              activeTab === 'triggers'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Event & Trigger Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('actions')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              activeTab === 'actions'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>4. Actions Library</span>
          </button>

          <button
            onClick={() => setActiveTab('scheduled')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              activeTab === 'scheduled'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>5. Scheduled Jobs</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-red-400" />
            <span>6. Business Rules Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>7. Notification Center</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_automation')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
              activeTab === 'ai_automation'
                ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-yellow-400" />
            <span>8. AI Automation Hub</span>
          </button>
        </div>
      </div>

      {/* TABS CONTENT AREA */}

      {/* 1. MONITORING DASHBOARD */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          {/* STATS OVERVIEW CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            <div className="glass-card rounded-2xl border border-white/10 p-3.5 bg-[#0D0D12] space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Total Workflows</span>
              <strong className="text-xl font-bold text-white block">34</strong>
              <span className="text-[9px] text-[#28C76F] font-mono">+4 this month</span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-3.5 bg-[#0D0D12] space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Active Pipelines</span>
              <strong className="text-xl font-bold text-[#28C76F] block">28</strong>
              <span className="text-[9px] text-neutral-400 font-mono">82% Operational</span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-3.5 bg-[#0D0D12] space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Failed Executions</span>
              <strong className="text-xl font-bold text-[#28C76F] block">0</strong>
              <span className="text-[9px] text-[#28C76F] font-mono">100% Clean Pass</span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-3.5 bg-[#0D0D12] space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Pending Queue</span>
              <strong className="text-xl font-bold text-amber-400 block">3</strong>
              <span className="text-[9px] text-neutral-400 font-mono">Processing async</span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-3.5 bg-[#0D0D12] space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Avg Response</span>
              <strong className="text-xl font-bold text-cyan-400 block">180ms</strong>
              <span className="text-[9px] text-cyan-400 font-mono">Ultra-fast NVMe</span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-3.5 bg-[#0D0D12] space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Success Rate</span>
              <strong className="text-xl font-bold text-[#28C76F] block">99.8%</strong>
              <span className="text-[9px] text-neutral-400 font-mono">Enterprise SLA</span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-3.5 bg-[#0D0D12] space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Notifications Sent</span>
              <strong className="text-xl font-bold text-purple-400 block">1,240</strong>
              <span className="text-[9px] text-purple-400 font-mono">Email / WhatsApp</span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-3.5 bg-[#0D0D12] space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">AI Calls Dispatched</span>
              <strong className="text-xl font-bold text-[#E5C158] block">890</strong>
              <span className="text-[9px] text-[#E5C158] font-mono">Gemini RAG Active</span>
            </div>
          </div>

          {/* TWO COLUMN DASHBOARD DETAILS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT 2 COLS: LIVE EXECUTION STREAM */}
            <div className="lg:col-span-2 glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#28C76F]" />
                  <h3 className="font-poppins font-bold text-white text-sm">
                    Live Automation Execution Log & Audit Feed
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#28C76F] font-mono text-[10px] font-bold border border-emerald-500/30">
                  REAL-TIME QUEUE HEALTHY
                </span>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {workflows.flatMap((w) => w.executionHistory).length > 0 ? (
                  workflows.flatMap((w) =>
                    w.executionHistory.map((ex) => (
                      <div
                        key={ex.id}
                        className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-center text-[#28C76F] shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <strong className="text-white font-bold">{ex.triggerSource}</strong>
                              <span className="text-[10px] font-mono text-neutral-400">({ex.duration})</span>
                            </div>
                            <p className="text-neutral-400 text-[11px] mt-0.5">{ex.log}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                          {ex.timestamp}
                        </span>
                      </div>
                    ))
                  )
                ) : (
                  <div className="p-8 text-center text-neutral-400 text-xs">
                    No recent execution anomalies logged. All active automation triggers are executing normally.
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT 1 COL: SYSTEM QUEUE & CRON STATUS */}
            <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-poppins font-bold text-white text-sm">System Queue Health</h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">0 Backlog</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300 font-bold">Supabase PostgreSQL Worker</span>
                    <span className="text-[#28C76F] font-mono text-[10px]">Connected</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#28C76F] h-full w-[95%]" />
                  </div>
                  <span className="text-[9px] text-neutral-500 font-mono block text-right">95% Idle Capacity</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300 font-bold">Encrypted File Storage Sync</span>
                    <span className="text-[#28C76F] font-mono text-[10px]">Active</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#28C76F] h-full w-[88%]" />
                  </div>
                  <span className="text-[9px] text-neutral-500 font-mono block text-right">AES-256 Storage Safe</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300 font-bold">MFS Dual AI Gateway Worker</span>
                    <span className="text-[#E5C158] font-mono text-[10px]">RAG Vector Hot</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#E5C158] h-full w-[99%]" />
                  </div>
                  <span className="text-[9px] text-neutral-500 font-mono block text-right">Gemini 1.5 Flash Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. WORKFLOW AUTOMATION CENTER */}
      {activeTab === 'workflows' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search workflows by trigger, action, or owner..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsVisualBuilderOpen(!isVisualBuilderOpen)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    isVisualBuilderOpen
                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                      : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {isVisualBuilderOpen ? 'Exit Visual Builder' : 'Open Visual Workflow Canvas'}
                </button>
              </div>
            </div>

            {/* VISUAL WORKFLOW BUILDER CANVAS (TOGGLEABLE) */}
            {isVisualBuilderOpen && (
              <div className="p-6 rounded-2xl bg-black/40 border border-purple-500/30 space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="font-poppins font-bold text-white text-xs uppercase font-mono tracking-wider">
                      VISUAL NODE WORKFLOW BUILDER (STAGE 2 ENGINE PREVIEW)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400">Drag & Connect Nodes</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center py-6">
                  <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-300 space-y-2">
                    <strong className="text-xs font-bold block">1. EVENT TRIGGER NODE</strong>
                    <p className="text-[11px] text-neutral-300 font-mono">Client Event: Order Created (ORD-MFS-*)</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-2">
                    <strong className="text-xs font-bold block">2. DECISION LOGIC NODE</strong>
                    <p className="text-[11px] text-neutral-300 font-mono">Condition: Payment Method == EasyPaisa</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2">
                    <strong className="text-xs font-bold block">3. AUTOMATED ACTION NODE</strong>
                    <p className="text-[11px] text-neutral-300 font-mono">Action: Send SMS + WhatsApp Receipt Proof</p>
                  </div>
                </div>
              </div>
            )}

            {/* WORKFLOW ITEMS LIST */}
            <div className="space-y-3">
              {workflows
                .filter((wf) =>
                  wf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  wf.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((wf) => (
                  <div
                    key={wf.id}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 hover:border-white/20 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            wf.status === 'active'
                              ? 'bg-[#28C76F] shadow-[0_0_8px_#28C76F]'
                              : 'bg-neutral-500'
                          }`}
                        />
                        <h4 className="font-poppins font-bold text-white text-sm">{wf.name}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 font-mono text-[9px] uppercase border border-white/10">
                          {wf.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[9px] font-bold border border-[#E5C158]/30">
                          {wf.version}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDuplicateWorkflow(wf)}
                          className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-mono text-[10px] flex items-center gap-1 cursor-pointer border border-white/10"
                        >
                          <Copy className="w-3 h-3 text-[#E5C158]" />
                          <span>Duplicate</span>
                        </button>

                        <button
                          onClick={() => handleToggleWorkflow(wf.id)}
                          className={`px-3 py-1 rounded-xl font-mono text-[10px] font-bold cursor-pointer border ${
                            wf.status === 'active'
                              ? 'bg-[#28C76F]/20 text-[#28C76F] border-[#28C76F]/30 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30'
                              : 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30 hover:bg-[#28C76F]/20 hover:text-[#28C76F]'
                          }`}
                        >
                          {wf.status === 'active' ? 'Active (Disable)' : 'Disabled (Enable)'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-white/[0.02] p-3 rounded-xl border border-white/5">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase block">Trigger:</span>
                        <span className="text-white font-mono text-xs">{wf.trigger}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase block">Actions ({wf.actions.length}):</span>
                        <span className="text-neutral-300 text-xs">{wf.actions.join(' • ')}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono pt-1">
                      <span>Owner: {wf.owner}</span>
                      <span>Executions: {wf.executionCount} ({wf.successRate}% Success)</span>
                      <span>Last: {wf.lastExecution}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. EVENT & TRIGGER ENGINE */}
      {activeTab === 'triggers' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-poppins font-bold text-white text-base">
              Supported Event Categories & Webhook Triggers
            </h3>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-[#28C76F] font-mono text-xs font-bold border border-emerald-500/30">
              Webhooks Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono text-blue-400 uppercase font-bold tracking-wider block">
                1. CLIENT EVENTS
              </span>
              <ul className="text-xs text-neutral-300 space-y-2 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>New Client Registered</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>New Order Submitted</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Payment Proof Uploaded</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Revision Requested</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Project Completed</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider block">
                2. ADMIN EVENTS
              </span>
              <ul className="text-xs text-neutral-300 space-y-2 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Staff / Admin Login</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>New Staff Member Added</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Permission RBAC Updated</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>CMS Content Published</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>AI System Prompt Tuned</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider block">
                3. SYSTEM & SECURITY EVENTS
              </span>
              <ul className="text-xs text-neutral-300 space-y-2 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Daily Cloud Backup Completed</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Storage Limit Warning (&gt;80%)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>API Failure or Timeout</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>AI RAG Cache Error</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Failed Security PIN Attempt</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 4. ACTIONS LIBRARY */}
      {activeTab === 'actions' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-poppins font-bold text-white text-base">
              Reusable Automation Actions Catalog
            </h3>
            <span className="text-xs text-neutral-400 font-mono">14 Reusable Modules</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: 'Send Email', desc: 'Dispatches custom transactional email via SendGrid / SMTP.' },
              { title: 'Send In-App Notification', desc: 'Pushes real-time banner to Client or Admin portal.' },
              { title: 'Assign Team Member', desc: 'Assigns senior designer, writer, or editor to order.' },
              { title: 'Create CRM Task', desc: 'Schedules follow-up deadline in Client CRM workspace.' },
              { title: 'Update Order Status', desc: 'Transitions order from Pending to In Progress / Delivered.' },
              { title: 'Generate Invoice / PDF', desc: 'Creates official MFS tax receipt & invoice document.' },
              { title: 'Archive File to Cloud', desc: 'Moves completed deliverables to AES-256 cloud archive.' },
              { title: 'Call AI Service', desc: 'Triggers Gemini RAG summary or AI translation pipeline.' },
              { title: 'Schedule Follow-Up', desc: 'Sets reminder for client feedback or review invitation.' },
            ].map((action, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 hover:border-[#E5C158]/50 transition-all cursor-pointer"
              >
                <strong className="text-white text-xs font-bold block">{action.title}</strong>
                <p className="text-[11px] text-neutral-400 leading-relaxed">{action.desc}</p>
                <button
                  onClick={() => {
                    if (onShowToast) onShowToast(`Tested action module "${action.title}" - Execution Clean!`);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 text-[10px] font-mono cursor-pointer"
                >
                  Test Run Action
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SCHEDULED JOBS MANAGER */}
      {activeTab === 'scheduled' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-poppins font-bold text-white text-base">
              Scheduled System Jobs & Cron Execution Manager
            </h3>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/30">
              5 Active Jobs
            </span>
          </div>

          <div className="space-y-3">
            {scheduledJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-white text-xs font-bold">{job.name}</strong>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-[9px] uppercase border border-cyan-500/30">
                      {job.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">{job.description}</p>
                  <span className="text-[10px] font-mono text-[#E5C158] block">{job.schedule}</span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right text-[10px] font-mono text-neutral-400 hidden sm:block">
                    <div>Last: {job.lastRun}</div>
                    <div>Next: {job.nextRun}</div>
                  </div>

                  <button
                    onClick={() => handleRunScheduledJob(job)}
                    disabled={job.status === 'running'}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#E5C158] hover:text-black font-extrabold text-xs text-white transition-all cursor-pointer border border-white/10 disabled:opacity-50"
                  >
                    {job.status === 'running' ? 'Running...' : 'Run Job Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. BUSINESS RULES ENGINE */}
      {activeTab === 'rules' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-poppins font-bold text-white text-base">
              Configurable Business Rules & Policy Governance Engine
            </h3>
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-mono text-xs font-bold border border-red-500/30">
              Rule Enforcement Active
            </span>
          </div>

          <div className="space-y-3">
            {businessRules.map((rule) => (
              <div
                key={rule.id}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-mono font-bold flex items-center justify-center">
                      P{rule.priority}
                    </span>
                    <strong className="text-white text-xs font-bold">{rule.name}</strong>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 font-mono text-[9px]">
                      {rule.version}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#28C76F] uppercase">Active</span>
                </div>

                <p className="text-[11px] text-neutral-300 leading-relaxed">{rule.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono bg-black/30 p-2.5 rounded-xl border border-white/5">
                  <div>
                    <span className="text-neutral-500 uppercase block">Conditions:</span>
                    <span className="text-amber-400">{rule.conditions}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 uppercase block">Exceptions:</span>
                    <span className="text-neutral-300">{rule.exceptions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. NOTIFICATION CENTER */}
      {activeTab === 'notifications' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-poppins font-bold text-white text-base">
              Automated Multi-Channel Notification Templates
            </h3>
            <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 font-mono text-xs font-bold border border-fuchsia-500/30">
              Multi-Channel Dispatch
            </span>
          </div>

          <div className="space-y-3">
            {notificationTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono text-[9px] uppercase font-bold border border-fuchsia-500/30">
                      {tpl.channel}
                    </span>
                    <strong className="text-white text-xs font-bold">{tpl.name}</strong>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Sent: {tpl.sentCount} ({tpl.deliveryRate}% Delivered)
                  </span>
                </div>

                <div className="text-xs text-neutral-200 font-mono bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[#E5C158] font-bold block">{tpl.subjectOrHeader}</span>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{tpl.bodyPreview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. AI AUTOMATION HUB */}
      {activeTab === 'ai_automation' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-[#E5C158]">
              <Bot className="w-5 h-5" />
              <h3 className="font-poppins font-bold text-white text-base">
                Autonomous AI Process Optimization & Routing Hub
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
              Coming in Stage 2 – Real Implementation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title: 'AI Workflow Generator', desc: 'Converts plain English prompts into executable automation pipelines.' },
              { title: 'AI Business Rule Builder', desc: 'Detects recurring order patterns and suggests policy guardrails.' },
              { title: 'AI Smart Task Routing', desc: 'Dynamically routes incoming orders to specialists based on bandwidth.' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <strong className="text-white text-xs font-bold block">{item.title}</strong>
                <p className="text-[11px] text-neutral-400 leading-relaxed">{item.desc}</p>
                <span className="text-[9px] font-mono text-amber-400 uppercase block pt-1">
                  Coming in Stage 2 – Real Implementation
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEW WORKFLOW MODAL */}
      <AnimatePresence>
        {isNewWorkflowModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-3xl border border-white/10 p-6 max-w-lg w-full bg-[#0D0D12] space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-poppins font-bold text-white text-base">Create New Automation Workflow</h3>
                <button
                  onClick={() => setIsNewWorkflowModalOpen(false)}
                  className="text-neutral-400 hover:text-white p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">Workflow Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Automatic Client Follow-up on Delivered Deliverables"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">Category</label>
                  <select className="w-full bg-[#12121A] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E5C158]">
                    <option>Order Processing</option>
                    <option>Payment Verification</option>
                    <option>Client Onboarding</option>
                    <option>Content Publishing</option>
                    <option>System Health</option>
                  </select>
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">Trigger Event</label>
                  <input
                    type="text"
                    placeholder="e.g. Client Event: Order Status == Delivered"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => setIsNewWorkflowModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsNewWorkflowModalOpen(false);
                    if (onShowToast) onShowToast('New Automation Workflow initialized in Draft state!');
                  }}
                  className="px-5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer"
                >
                  Save Draft Workflow
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
