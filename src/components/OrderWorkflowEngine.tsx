import React, { useState } from 'react';
import {
  Workflow,
  UserCheck,
  Users,
  Building2,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Archive,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  ListTodo,
  Check,
  Plus,
  Trash2,
  History,
  Tag,
  AlertTriangle,
  Send,
  FileCheck2,
  Sliders,
  ChevronRight,
  Sparkles,
  Lock,
  UserPlus
} from 'lucide-react';
import { Currency } from '../types';

export type ExtendedOrderStatus =
  | 'New Order'
  | 'Awaiting Payment'
  | 'Payment Verification'
  | 'Confirmed'
  | 'Requirements Pending'
  | 'Requirements Received'
  | 'Assigned'
  | 'In Progress'
  | 'Internal Review'
  | 'Client Review'
  | 'Revision Requested'
  | 'Revision In Progress'
  | 'Final QA'
  | 'Ready for Delivery'
  | 'Delivered'
  | 'Completed'
  | 'Cancelled'
  | 'Refunded';

export type PriorityLevel = 'Critical' | 'High' | 'Normal' | 'Low';

export interface WorkflowTask {
  id: string;
  title: string;
  completed: boolean;
  notes: string;
  owner: string;
}

export interface WorkflowAuditLog {
  id: string;
  action: string;
  admin: string;
  dateTime: string;
  previousStatus: ExtendedOrderStatus;
  newStatus: ExtendedOrderStatus;
  reason: string;
}

export interface ManagedOrderWorkflow {
  id: string;
  clientName: string;
  serviceName: string;
  category: 'Academic' | 'Career' | 'Business';
  status: ExtendedOrderStatus;
  priority: PriorityLevel;
  manager: string;
  team: string;
  department: string;
  startDate: string;
  dueDate: string;
  estimatedDeliveryDate: string;
  isPaused: boolean;
  isEscalated: boolean;
  tasks: WorkflowTask[];
  history: WorkflowAuditLog[];
}

const INITIAL_WORKFLOW_ORDERS: ManagedOrderWorkflow[] = [
  {
    id: 'ORD-MFS-849201',
    clientName: 'Muhammad Shehroz Sultan',
    serviceName: 'Executive Pitch Deck Presentation',
    category: 'Business',
    status: 'In Progress',
    priority: 'Critical',
    manager: 'Muhammad Shehroz Sultan (Lead Director)',
    team: 'MFS Presentation Design Squad Alpha',
    department: 'Presentation & Business Design Division',
    startDate: '2026-07-25 14:30',
    dueDate: '2026-07-26 18:00',
    estimatedDeliveryDate: '2026-07-26 16:00',
    isPaused: false,
    isEscalated: false,
    tasks: [
      { id: 't1', title: 'Verify EasyPaisa TX-EP-9821734192 payment receipt', completed: true, notes: 'Confirmed by Finance Team', owner: 'Shehroz Sultan' },
      { id: 't2', title: 'Review 10-slide brief & target audience guidelines', completed: true, notes: 'TAM $12B data verified', owner: 'Design Lead Ali' },
      { id: 't3', title: 'Draft initial 5 slides layout in MFS Gold theme', completed: true, notes: 'Slide 1 to 5 proofed', owner: 'Senior Designer' },
      { id: 't4', title: 'Render custom financial projection charts', completed: false, notes: '3-Year projection chart in progress', owner: 'Data Viz Specialist' },
      { id: 't5', title: 'Internal Senior Director APA & QA audit', completed: false, notes: 'Pending layout completion', owner: 'Quality Auditor' },
      { id: 't6', title: 'Generate PPTX + PDF release bundle', completed: false, notes: 'Final step before delivery', owner: 'Lead Release Admin' },
    ],
    history: [
      { id: 'h1', action: 'Order Created', admin: 'Client System Portal', dateTime: '2026-07-25 14:30', previousStatus: 'New Order', newStatus: 'Awaiting Payment', reason: 'Order placed by client.' },
      { id: 'h2', action: 'Payment Verified', admin: 'Super Admin', dateTime: '2026-07-25 14:32', previousStatus: 'Awaiting Payment', newStatus: 'Payment Verification', reason: 'EasyPaisa screenshot verified.' },
      { id: 'h3', action: 'Requirements Locked', admin: 'Shehroz Sultan', dateTime: '2026-07-25 14:40', previousStatus: 'Requirements Pending', newStatus: 'Confirmed', reason: 'Executive brief validated.' },
      { id: 'h4', action: 'Assigned to Squad Alpha', admin: 'Shehroz Sultan', dateTime: '2026-07-25 15:00', previousStatus: 'Confirmed', newStatus: 'In Progress', reason: 'Priority dispatch to Squad Alpha.' }
    ]
  },
  {
    id: 'ORD-MFS-849202',
    clientName: 'Hamza Malik',
    serviceName: 'ATS Resume Engineering & CV Design',
    category: 'Career',
    status: 'Internal Review',
    priority: 'High',
    manager: 'Shehroz Sultan',
    team: 'MFS Career Engineering Squad',
    department: 'Resume & Career Services Division',
    startDate: '2026-07-24 18:15',
    dueDate: '2026-07-25 22:00',
    estimatedDeliveryDate: '2026-07-25 20:30',
    isPaused: false,
    isEscalated: false,
    tasks: [
      { id: 't7', title: 'Perform initial ATS scan on raw CV draft', completed: true, notes: 'Initial score 62%', owner: 'ATS Specialist' },
      { id: 't8', title: 'Inject high-impact tech stack keywords', completed: true, notes: 'Score boosted to 97%', owner: 'Senior CV Engineer' },
      { id: 't9', title: 'Format into MFS clean gold-accent template', completed: true, notes: 'Visual layout polished', owner: 'UI Formatting Lead' },
      { id: 't10', title: 'Final QA check for silicon valley remote compliance', completed: false, notes: 'Undergoing internal review', owner: 'Manager Shehroz' }
    ],
    history: [
      { id: 'h5', action: 'Order Placed', admin: 'Client System', dateTime: '2026-07-24 18:15', previousStatus: 'New Order', newStatus: 'In Progress', reason: 'JazzCash auto-cleared.' },
      { id: 'h6', action: 'Submitted to QA', admin: 'Senior CV Engineer', dateTime: '2026-07-25 15:00', previousStatus: 'In Progress', newStatus: 'Internal Review', reason: '97% ATS score achieved.' }
    ]
  },
  {
    id: 'ORD-MFS-849203',
    clientName: 'Ayesha Khan',
    serviceName: 'Academic Assignment & Paper Writing',
    category: 'Academic',
    status: 'Requirements Pending',
    priority: 'Normal',
    manager: 'Shehroz Sultan',
    team: 'MFS Academic Writing Division',
    department: 'Academic Research & Referencing Division',
    startDate: '2026-07-25 09:10',
    dueDate: '2026-07-28 12:00',
    estimatedDeliveryDate: '2026-07-27 18:00',
    isPaused: false,
    isEscalated: false,
    tasks: [
      { id: 't11', title: 'Verify Askari Bank transfer receipt', completed: false, notes: 'Awaiting finance audit', owner: 'Finance Admin' },
      { id: 't12', title: 'Obtain IEEE citation rubric details from client', completed: false, notes: 'Pending additional instructions', owner: 'Academic Lead' }
    ],
    history: [
      { id: 'h7', action: 'Order Created', admin: 'Client Portal', dateTime: '2026-07-25 09:10', previousStatus: 'New Order', newStatus: 'Requirements Pending', reason: 'Order registered.' }
    ]
  }
];

const ALL_STATUSES: ExtendedOrderStatus[] = [
  'New Order',
  'Awaiting Payment',
  'Payment Verification',
  'Confirmed',
  'Requirements Pending',
  'Requirements Received',
  'Assigned',
  'In Progress',
  'Internal Review',
  'Client Review',
  'Revision Requested',
  'Revision In Progress',
  'Final QA',
  'Ready for Delivery',
  'Delivered',
  'Completed',
  'Cancelled',
  'Refunded'
];

interface OrderWorkflowEngineProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const OrderWorkflowEngine: React.FC<OrderWorkflowEngineProps> = ({
  currency,
  onShowToast
}) => {
  const [orders, setOrders] = useState<ManagedOrderWorkflow[]>(INITIAL_WORKFLOW_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ORD-MFS-849201');
  const [activeTab, setActiveTab] = useState<'lifecycle' | 'assignment' | 'checklist' | 'history'>('lifecycle');

  // Form states for Assignment
  const [newStatusReason, setNewStatusReason] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskOwner, setNewTaskOwner] = useState('');

  // Modal / Action states
  const [actionModal, setActionModal] = useState<string | null>(null);
  const [modalReason, setModalReason] = useState('');

  const currentOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  // Helper for status styling
  const getStatusStyle = (st: ExtendedOrderStatus) => {
    switch (st) {
      case 'In Progress':
      case 'Revision In Progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Completed':
      case 'Delivered':
      case 'Ready for Delivery':
        return 'bg-[#28C76F]/20 text-[#28C76F] border-[#28C76F]/30';
      case 'Cancelled':
      case 'Refunded':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Internal Review':
      case 'Final QA':
      case 'Client Review':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    }
  };

  const getPriorityStyle = (p: PriorityLevel) => {
    switch (p) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
      case 'High':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Normal':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Low':
        return 'bg-white/10 text-neutral-300 border-white/20';
    }
  };

  // Status Change Handler with History Audit
  const handleTransitionStatus = (nextStatus: ExtendedOrderStatus, customReason?: string) => {
    const reasonText = customReason || newStatusReason || `Status transition to ${nextStatus}`;
    const auditLog: WorkflowAuditLog = {
      id: `h-${Date.now()}`,
      action: `Status -> ${nextStatus}`,
      admin: 'Super Admin',
      dateTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      previousStatus: currentOrder.status,
      newStatus: nextStatus,
      reason: reasonText,
    };

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === selectedOrderId) {
          return {
            ...ord,
            status: nextStatus,
            history: [auditLog, ...ord.history],
          };
        }
        return ord;
      })
    );

    setNewStatusReason('');
    setActionModal(null);
    if (onShowToast) onShowToast(`Order ${selectedOrderId} status changed to '${nextStatus}'`);
  };

  // Workflow Actions
  const handleExecuteAction = (actionName: string) => {
    let newStatus = currentOrder.status;
    let isPaused = currentOrder.isPaused;
    let isEscalated = currentOrder.isEscalated;

    if (actionName === 'Approve Order') newStatus = 'Completed';
    else if (actionName === 'Reject Order') newStatus = 'Cancelled';
    else if (actionName === 'Request More Information') newStatus = 'Requirements Pending';
    else if (actionName === 'Pause Project') isPaused = true;
    else if (actionName === 'Resume Project') isPaused = false;
    else if (actionName === 'Escalate Order') isEscalated = true;

    const auditLog: WorkflowAuditLog = {
      id: `h-${Date.now()}`,
      action: actionName,
      admin: 'Executive Administrator',
      dateTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      previousStatus: currentOrder.status,
      newStatus,
      reason: modalReason || `${actionName} executed via Workflow Engine.`,
    };

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === selectedOrderId) {
          return {
            ...ord,
            status: newStatus,
            isPaused,
            isEscalated,
            history: [auditLog, ...ord.history],
          };
        }
        return ord;
      })
    );

    setActionModal(null);
    setModalReason('');
    if (onShowToast) onShowToast(`Workflow Action '${actionName}' applied to ${selectedOrderId}`);
  };

  // Task Checklist Handlers
  const toggleTask = (taskId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === selectedOrderId) {
          const updated = ord.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
          return { ...ord, tasks: updated };
        }
        return ord;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: WorkflowTask = {
      id: `t-${Date.now()}`,
      title: newTaskTitle.trim(),
      completed: false,
      notes: 'Added via Admin Task Checklist',
      owner: newTaskOwner.trim() || 'Assigned Specialist',
    };

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === selectedOrderId) {
          return { ...ord, tasks: [...ord.tasks, newTask] };
        }
        return ord;
      })
    );

    setNewTaskTitle('');
    setNewTaskOwner('');
    if (onShowToast) onShowToast(`New checklist task appended to ${selectedOrderId}`);
  };

  // Progress Percentage
  const completedTasks = currentOrder.tasks.filter((t) => t.completed).length;
  const totalTasks = currentOrder.tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* ENGINE HEADER & ORDER SELECTOR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 shadow-[0_0_15px_rgba(229,193,88,0.2)]">
              <Workflow className="w-6 h-6 text-[#E5C158]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#E5C158]/20 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/40 uppercase tracking-wider">
                  PHASE 5 ENGINE
                </span>
                <span className="text-neutral-500 text-xs font-mono">• Lifecycle & Workflow Control</span>
              </div>
              <h2 className="font-poppins font-black text-xl text-white flex items-center gap-2">
                <span>Order Assignment & Workflow Engine</span>
              </h2>
            </div>
          </div>

          {/* ORDER SELECTOR */}
          <div className="flex items-center gap-2 bg-white/[0.04] p-2 rounded-2xl border border-white/10 text-xs">
            <span className="text-neutral-400 font-mono font-bold pl-1">Active Target:</span>
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="bg-transparent text-white font-mono font-bold focus:outline-none cursor-pointer pr-2"
            >
              {orders.map((ord) => (
                <option key={ord.id} value={ord.id} className="bg-[#0D0D12] text-white">
                  {ord.id} — {ord.clientName} ({ord.status})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* SELECTED ORDER METRIC STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-3 border-t border-white/10 text-xs">
          
          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Current Lifecycle</span>
            <span className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusStyle(currentOrder.status)}`}>
              {currentOrder.status}
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Priority Level</span>
            <span className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityStyle(currentOrder.priority)}`}>
              {currentOrder.priority}
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Checklist Completion</span>
            <strong className="text-[#28C76F] font-bold text-sm block mt-0.5">
              {progressPercent}% ({completedTasks}/{totalTasks})
            </strong>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Target Due Date</span>
            <strong className="text-cyan-300 font-mono text-[11px] block mt-0.5">{currentOrder.dueDate}</strong>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Assigned Lead</span>
            <strong className="text-white text-[11px] truncate block mt-0.5">{currentOrder.manager}</strong>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Engine Flags</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              {currentOrder.isPaused && (
                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono text-[9px] border border-amber-500/30">
                  PAUSED
                </span>
              )}
              {currentOrder.isEscalated && (
                <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 font-mono text-[9px] border border-red-500/30 animate-pulse">
                  ESCALATED
                </span>
              )}
              {!currentOrder.isPaused && !currentOrder.isEscalated && (
                <span className="text-neutral-500 text-[10px]">Normal Operations</span>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* ENGINE SUB-NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        {[
          { id: 'lifecycle', label: '18-State Status Workflow', icon: Workflow },
          { id: 'assignment', label: 'Assignment & Priority Engine', icon: UserCheck },
          { id: 'checklist', label: 'Internal Task Checklist', icon: ListTodo },
          { id: 'history', label: 'Audit Trail & History', icon: History },
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
      {/* TAB 1: 18-STATE STATUS WORKFLOW ARCHITECTURE */}
      {/* ========================================================= */}
      {activeTab === 'lifecycle' && (
        <div className="space-y-6">
          
          <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-gradient-to-b from-[#0D0D12] to-transparent">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                  <span>Order Lifecycle Matrix (18 Statuses)</span>
                  <span className="text-xs font-mono text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-0.5 rounded-full border border-[#E5C158]/30">
                    Modular Flow
                  </span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Click any stage to trigger a state transition for <strong className="text-white">{currentOrder.id}</strong>.
                </p>
              </div>

              {/* QUICK WORKFLOW ACTION BUTTONS */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActionModal('Approve Order')}
                  className="px-3 py-1.5 rounded-xl bg-[#28C76F]/20 hover:bg-[#28C76F]/30 text-[#28C76F] border border-[#28C76F]/40 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => setActionModal('Pause Project')}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </button>
                <button
                  onClick={() => setActionModal('Escalate Order')}
                  className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Escalate</span>
                </button>
              </div>
            </div>

            {/* 18 STATUS GRID ARCHITECTURE */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {ALL_STATUSES.map((st, idx) => {
                const isCurrent = currentOrder.status === st;
                return (
                  <button
                    key={st}
                    onClick={() => handleTransitionStatus(st)}
                    className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                      isCurrent
                        ? 'bg-[#E5C158]/20 border-[#E5C158] text-white shadow-[0_0_15px_rgba(229,193,88,0.25)]'
                        : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className={isCurrent ? 'text-[#E5C158] font-bold' : 'text-neutral-500'}>
                        STAGE {idx + 1}
                      </span>
                      {isCurrent && (
                        <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-ping" />
                      )}
                    </div>
                    <strong className="text-xs font-poppins font-bold block leading-tight">
                      {st}
                    </strong>
                    {isCurrent && (
                      <span className="mt-2 inline-block px-1.5 py-0.2 rounded bg-[#E5C158] text-black font-extrabold text-[9px]">
                        ACTIVE
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* WORKFLOW ACTIONS ROW */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-mono uppercase font-bold text-neutral-400">
                Secure Administrative Workflow Operations:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
                {[
                  { name: 'Approve Order', color: 'emerald' },
                  { name: 'Reject Order', color: 'red' },
                  { name: 'Request More Information', color: 'amber' },
                  { name: 'Pause Project', color: 'yellow' },
                  { name: 'Resume Project', color: 'blue' },
                  { name: 'Escalate Order', color: 'rose' },
                ].map((act) => (
                  <button
                    key={act.name}
                    onClick={() => setActionModal(act.name)}
                    className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-semibold text-center hover:border-[#E5C158]/40 transition-all cursor-pointer"
                  >
                    {act.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: ASSIGNMENT, PRIORITY & DEADLINE ENGINE */}
      {/* ========================================================= */}
      {activeTab === 'assignment' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ASSIGNMENT & PRIORITY FORM (7 COLS) */}
          <div className="lg:col-span-7 glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-gradient-to-b from-[#0D0D12] to-transparent">
            
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <UserCheck className="w-5 h-5 text-[#E5C158]" />
              <h3 className="font-poppins font-bold text-white text-lg">Order Assignment & Squad Control</h3>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">
                    Assigned Project Manager:
                  </label>
                  <select
                    value={currentOrder.manager}
                    onChange={(e) => {
                      const val = e.target.value;
                      setOrders((prev) =>
                        prev.map((o) => (o.id === selectedOrderId ? { ...o, manager: val } : o))
                      );
                      if (onShowToast) onShowToast(`Manager reassigned to ${val}`);
                    }}
                    className="w-full p-3 rounded-2xl bg-black/40 border border-white/15 text-white font-semibold focus:outline-none focus:border-[#E5C158]"
                  >
                    <option value="Muhammad Shehroz Sultan (Lead Director)">Muhammad Shehroz Sultan (Lead Director)</option>
                    <option value="Shehroz Sultan">Shehroz Sultan</option>
                    <option value="Senior Operations Manager">Senior Operations Manager</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">
                    Assigned Specialist Team / Squad:
                  </label>
                  <select
                    value={currentOrder.team}
                    onChange={(e) => {
                      const val = e.target.value;
                      setOrders((prev) =>
                        prev.map((o) => (o.id === selectedOrderId ? { ...o, team: val } : o))
                      );
                      if (onShowToast) onShowToast(`Squad reassigned to ${val}`);
                    }}
                    className="w-full p-3 rounded-2xl bg-black/40 border border-white/15 text-white font-semibold focus:outline-none focus:border-[#E5C158]"
                  >
                    <option value="MFS Presentation Design Squad Alpha">MFS Presentation Design Squad Alpha</option>
                    <option value="MFS Career Engineering Squad">MFS Career Engineering Squad</option>
                    <option value="MFS Academic Writing Division">MFS Academic Writing Division</option>
                    <option value="Executive Copywriting Team">Executive Copywriting Team</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">
                  Department Division:
                </label>
                <input
                  type="text"
                  value={currentOrder.department}
                  onChange={(e) => {
                    const val = e.target.value;
                    setOrders((prev) =>
                      prev.map((o) => (o.id === selectedOrderId ? { ...o, department: val } : o))
                    );
                  }}
                  className="w-full p-3 rounded-2xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#E5C158]"
                />
              </div>

              {/* PRIORITY SELECTOR */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">
                  Priority Management Level:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Critical', 'High', 'Normal', 'Low'] as PriorityLevel[]).map((p) => {
                    const isSel = currentOrder.priority === p;
                    return (
                      <button
                        key={p}
                        onClick={() => {
                          setOrders((prev) =>
                            prev.map((o) => (o.id === selectedOrderId ? { ...o, priority: p } : o))
                          );
                          if (onShowToast) onShowToast(`Priority updated to ${p}`);
                        }}
                        className={`p-2.5 rounded-2xl border text-center font-bold font-mono transition-all cursor-pointer ${
                          isSel
                            ? getPriorityStyle(p) + ' scale-[1.02]'
                            : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* DEADLINE MANAGEMENT & OVERDUE INDICATOR (5 COLS) */}
          <div className="lg:col-span-5 glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-gradient-to-b from-[#0D0D12] to-transparent">
            
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h3 className="font-poppins font-bold text-white text-lg">Deadline Management</h3>
            </div>

            <div className="space-y-3 text-xs">
              
              <div className="space-y-1.5">
                <span className="text-neutral-400 font-mono text-[10px] uppercase block">Start Date & Time</span>
                <input
                  type="text"
                  value={currentOrder.startDate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setOrders((prev) =>
                      prev.map((o) => (o.id === selectedOrderId ? { ...o, startDate: val } : o))
                    );
                  }}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-neutral-400 font-mono text-[10px] uppercase block">Hard Deadline (Due Date)</span>
                <input
                  type="text"
                  value={currentOrder.dueDate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setOrders((prev) =>
                      prev.map((o) => (o.id === selectedOrderId ? { ...o, dueDate: val } : o))
                    );
                  }}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-amber-300 font-mono font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-neutral-400 font-mono text-[10px] uppercase block">Estimated Delivery Date</span>
                <input
                  type="text"
                  value={currentOrder.estimatedDeliveryDate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setOrders((prev) =>
                      prev.map((o) => (o.id === selectedOrderId ? { ...o, estimatedDeliveryDate: val } : o))
                    );
                  }}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-emerald-300 font-mono font-bold"
                />
              </div>

              {/* OVERDUE / TIMELINE ALERT CARD */}
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 font-bold font-mono text-[11px]">Timeline Status:</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/40">
                    27h Remaining
                  </span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-snug">
                  Order is currently operating within SLA buffer time. Next automated alert scheduled at 6h remaining threshold.
                </p>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: INTERNAL TASK CHECKLIST */}
      {/* ========================================================= */}
      {activeTab === 'checklist' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-6 bg-gradient-to-b from-[#0D0D12] to-transparent">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                <span>Internal Task Checklist</span>
                <span className="text-xs font-mono text-[#28C76F] bg-[#28C76F]/10 px-2.5 py-0.5 rounded-full border border-[#28C76F]/30">
                  {progressPercent}% Complete
                </span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Manage operational checklist for <strong className="text-white">{currentOrder.id}</strong>.
              </p>
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full sm:w-48 space-y-1">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E5C158] to-[#28C76F] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* TASK LIST */}
          <div className="space-y-2.5">
            {currentOrder.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all cursor-pointer ${
                  task.completed
                    ? 'bg-white/[0.01] border-white/5 opacity-70'
                    : 'bg-white/[0.03] border-white/10 hover:border-[#E5C158]/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                      task.completed
                        ? 'bg-[#28C76F] border-[#28C76F] text-black'
                        : 'border-white/30 bg-black/40'
                    }`}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="min-w-0">
                    <span className={`font-semibold block truncate ${task.completed ? 'line-through text-neutral-500' : 'text-white'}`}>
                      {task.title}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono block">
                      Owner: {task.owner} • {task.notes}
                    </span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                  task.completed
                    ? 'bg-[#28C76F]/20 text-[#28C76F]'
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {task.completed ? 'Done ✓' : 'Pending'}
                </span>
              </div>
            ))}
          </div>

          {/* ADD TASK FORM */}
          <form onSubmit={handleAddTask} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase">Append Internal Checklist Item:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Task description (e.g., APA reference check)..."
                className="sm:col-span-2 p-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
              />
              <input
                type="text"
                value={newTaskOwner}
                onChange={(e) => setNewTaskOwner(e.target.value)}
                placeholder="Owner (e.g. Quality Auditor)..."
                className="p-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
              />
            </div>
            <button
              type="submit"
              disabled={!newTaskTitle.trim()}
              className="py-2 px-4 rounded-xl bg-[#E5C158] hover:bg-[#fce888] disabled:opacity-40 text-black font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Checklist Task</span>
            </button>
          </form>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: AUDIT TRAIL & WORKFLOW HISTORY */}
      {/* ========================================================= */}
      {activeTab === 'history' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-gradient-to-b from-[#0D0D12] to-transparent">
          
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <History className="w-5 h-5 text-purple-400" />
            <h3 className="font-poppins font-bold text-white text-lg">Workflow Audit Trail & Immutable Log</h3>
          </div>

          <div className="space-y-3">
            {currentOrder.history.map((log) => (
              <div key={log.id} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <strong className="text-[#E5C158] font-mono font-bold">{log.action}</strong>
                  <span className="text-neutral-500 font-mono">{log.dateTime}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-300">
                  <span>Admin: <strong className="text-white">{log.admin}</strong></span>
                  <span>•</span>
                  <span>Transition: <span className="font-mono text-amber-300">{log.previousStatus}</span> → <span className="font-mono text-[#28C76F]">{log.newStatus}</span></span>
                </div>

                <p className="text-neutral-400 text-[11px] bg-black/30 p-2 rounded-xl border border-white/5 font-mono">
                  Reason: {log.reason}
                </p>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ACTION MODAL OVERLAY */}
      {actionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full rounded-3xl border border-white/20 p-6 space-y-4 bg-[#0D0D12]">
            <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E5C158]" />
              <span>Confirm Workflow Action: {actionModal}</span>
            </h3>

            <p className="text-xs text-neutral-300 leading-relaxed">
              You are applying administrative action <strong className="text-[#E5C158]">{actionModal}</strong> to order <strong className="text-white">{selectedOrderId}</strong>.
            </p>

            <div className="space-y-1.5 text-xs">
              <label className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">
                Audit Reason / Executive Note:
              </label>
              <textarea
                value={modalReason}
                onChange={(e) => setModalReason(e.target.value)}
                placeholder="State the reason for this administrative override..."
                rows={3}
                className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setActionModal(null)}
                className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleExecuteAction(actionModal)}
                className="py-2.5 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs cursor-pointer"
              >
                Execute Workflow Action
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
