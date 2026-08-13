import React, { useState, useEffect } from 'react';
import { fetchAllOrdersForAdmin } from '../lib/supabaseOrderService';
import {
  ShoppingBag,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Download,
  Eye,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  ChevronRight,
  Plus,
  Send,
  MessageSquare,
  Layers,
  Lock,
  Edit3,
  UserPlus,
  HelpCircle,
  Check,
  X,
  ExternalLink,
  Sparkles,
  Share2,
  FileCheck,
  RefreshCw,
  SlidersHorizontal,
  History,
  Tag,
  Filter,
  CheckCircle,
  Clock3,
  FileSpreadsheet,
  AlertCircle,
  FileCheck2,
  Zap
} from 'lucide-react';
import { Currency } from '../types';
import { OrderWorkflowEngine } from './OrderWorkflowEngine';
import { OrderTimelineActivity } from './OrderTimelineActivity';
import { RequirementsDeliverablesCenter } from './RequirementsDeliverablesCenter';
import { OrderAutomationSmartActions } from './OrderAutomationSmartActions';

interface OrderWorkspace360Props {
  currency: Currency;
  onShowToast?: (message: string) => void;
  onOpenMessages?: (clientId: string) => void;
}

export interface Order360 {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientLocation: string;
  clientCompany: string;
  serviceName: string;
  packageName: string;
  category: 'Academic' | 'Career' | 'Business';
  quantityText: string;
  basePricePkr: number;
  priorityFeePkr: number;
  totalPricePkr: number;
  status: 'Pending Verification' | 'In Progress' | 'Under Review' | 'Delivered' | 'Completed';
  priority: 'Standard' | 'Express (+30%)' | 'Priority (+50%)' | 'Same-Day (+75%)';
  orderDate: string;
  deadline: string;
  lastUpdated: string;
  assignedTeam: string;
  assignedManager: string;
  requirementsText: string;
  specialInstructions: string;
  formatGuidelines: string;
  paymentMethod: string;
  paymentAccount: string;
  paymentTxId: string;
  paymentStatus: 'Verified' | 'Pending Audit' | 'Refunded';
  invoiceNumber: string;
  progressStep: number; // 1 to 6
  clientFiles: Array<{
    id: string;
    name: string;
    size: string;
    uploadDate: string;
    type: string;
  }>;
  adminFiles: Array<{
    id: string;
    name: string;
    size: string;
    uploadDate: string;
    version: string;
    type: string;
  }>;
  adminNotes: Array<{
    id: string;
    author: string;
    role: string;
    text: string;
    timestamp: string;
  }>;
}

const INITIAL_ORDERS: Order360[] = [
  {
    id: 'ORD-MFS-849201',
    clientName: 'Muhammad Shehroz Sultan',
    clientEmail: 'mfsmedia.agency@gmail.com',
    clientPhone: '+92 301 5323689',
    clientLocation: 'Pakistan (PKT Time Zone)',
    clientCompany: 'NUST Executive Advisory Board',
    serviceName: 'Executive Pitch Deck Presentation',
    packageName: 'Executive Deck (10 Slides)',
    category: 'Business',
    quantityText: '10 Widescreen 16:9 Slides',
    basePricePkr: 30000,
    priorityFeePkr: 15000,
    totalPricePkr: 45000,
    status: 'In Progress',
    priority: 'Priority (+50%)',
    orderDate: 'July 25, 2026 - 14:30 PKT',
    deadline: 'July 26, 2026 - 18:00 PKT (27h remaining)',
    lastUpdated: '12 mins ago by Lead Admin',
    assignedTeam: 'MFS Presentation Design Squad Alpha',
    assignedManager: 'Muhammad Shehroz Sultan (Lead Director)',
    requirementsText: 'Create a 10-slide high-impact executive pitch deck for seed investment round. Key required sections: Executive Summary, Market Opportunity ($12B TAM), Problem Statement, Proprietary AI Solution, Product Demo Showcase, Business & Unit Economics Model, Go-To-Market Strategy, 3-Year Financial Projections, Competitive Moat, and Leadership Team.',
    specialInstructions: 'Follow MFS brand aesthetic: Dark canvas (#050507) with gold accent (#E5C158) and high-contrast typography. Use custom vector infographics for financial projections. Strict NDA applies.',
    formatGuidelines: '16:9 Widescreen aspect ratio, fully editable PPTX source presentation + vectorized PDF export + high-resolution slide images (PNG/ZIP bundle). APA 7th Edition reference slide included.',
    paymentMethod: 'EasyPaisa',
    paymentAccount: '03116191234 (Title: Muhammad Shehroz Sultan)',
    paymentTxId: 'TX-EP-9821734192',
    paymentStatus: 'Verified',
    invoiceNumber: 'INV-MFS-2026-849201.pdf',
    progressStep: 4, // Design & Slide Drafting Active
    clientFiles: [
      { id: 'f1', name: 'investor_presentation_brief_v2.pdf', size: '12.4 MB', uploadDate: 'July 25, 14:35', type: 'PDF' },
      { id: 'f2', name: 'brand_logos_vector_assets_2026.zip', size: '45.1 MB', uploadDate: 'July 25, 14:36', type: 'ZIP' },
    ],
    adminFiles: [
      { id: 'af1', name: 'draft_pitch_deck_v1_preview.pptx', size: '18.2 MB', uploadDate: 'July 25, 16:10', version: 'v1.0 Draft', type: 'PPTX' },
      { id: 'af2', name: 'executive_slide_previews_bundle.pdf', size: '8.5 MB', uploadDate: 'July 25, 16:15', version: 'v1.0 Proof', type: 'PDF' },
    ],
    adminNotes: [
      { id: 'n1', author: 'Super Admin', role: 'Super Admin', text: 'Payment receipt verified against EasyPaisa account 03116191234. Priority order flagged for 24h delivery.', timestamp: 'July 25, 14:32' },
      { id: 'n2', author: 'Design Lead Ali', role: 'Presentation Squad', text: 'Initial 5 slides layout drafted in gold-dark theme. Slide 8 financial chart rendering underway.', timestamp: 'July 25, 16:20' }
    ]
  },
  {
    id: 'ORD-MFS-849202',
    clientName: 'Hamza Malik',
    clientEmail: 'hamza.malik@techcorp.pk',
    clientPhone: '+92 311 6191234',
    clientLocation: 'Lahore, Pakistan',
    clientCompany: 'TechCorp Solutions',
    serviceName: 'ATS Resume Engineering & CV Design',
    packageName: 'Pro ATS CV + Cover Letter Bundle',
    category: 'Career',
    quantityText: '2 Page ATS Resume + Cover Letter',
    basePricePkr: 8000,
    priorityFeePkr: 2400,
    totalPricePkr: 10400,
    status: 'Under Review',
    priority: 'Express (+30%)',
    orderDate: 'July 24, 2026 - 18:15 PKT',
    deadline: 'July 25, 2026 - 22:00 PKT (2h remaining)',
    lastUpdated: '45 mins ago',
    assignedTeam: 'MFS Career Engineering Team',
    assignedManager: 'Shehroz Sultan',
    requirementsText: 'Engineering executive CV for Senior Full-Stack Software Architect position at top Silicon Valley remote startup. Highlight React, Node, Cloud SQL, Docker, and AI systems leadership.',
    specialInstructions: 'Ensure 95%+ ATS parse score. Format in clean modern layout with subtle gold accents.',
    formatGuidelines: 'Editable Word DOCX + ATS-Compliant PDF format.',
    paymentMethod: 'JazzCash',
    paymentAccount: '03015323688 (Title: Muhammad Shehroz Sultan)',
    paymentTxId: 'TX-JC-7712391082',
    paymentStatus: 'Verified',
    invoiceNumber: 'INV-MFS-2026-849202.pdf',
    progressStep: 5,
    clientFiles: [
      { id: 'f3', name: 'old_resume_draft_2024.docx', size: '2.1 MB', uploadDate: 'July 24, 18:20', type: 'DOCX' }
    ],
    adminFiles: [
      { id: 'af3', name: 'ATS_Executive_Resume_Hamza_v1.pdf', size: '1.4 MB', uploadDate: 'July 25, 15:00', version: 'v1.0 Deliverable', type: 'PDF' }
    ],
    adminNotes: [
      { id: 'n3', author: 'Senior CV Specialist', role: 'Career Squad', text: 'Keywords optimized for Senior Software Architect role. Passed ATS test with 97% score.', timestamp: 'July 25, 15:10' }
    ]
  },
  {
    id: 'ORD-MFS-849203',
    clientName: 'Ayesha Khan',
    clientEmail: 'ayesha.khan@nust.edu.pk',
    clientPhone: '+92 300 1234567',
    clientLocation: 'Pakistan',
    clientCompany: 'NUST School of Electrical Engineering',
    serviceName: 'Academic Assignment & Paper Writing',
    packageName: 'Standard Assignment (5 Pages)',
    category: 'Academic',
    quantityText: '5 Pages (1,500 Words)',
    basePricePkr: 15000,
    priorityFeePkr: 0,
    totalPricePkr: 15000,
    status: 'Pending Verification',
    priority: 'Standard',
    orderDate: 'July 25, 2026 - 09:10 PKT',
    deadline: 'July 28, 2026 - 12:00 PKT',
    lastUpdated: '2 hours ago',
    assignedTeam: 'MFS Academic Writing Division',
    assignedManager: 'Shehroz Sultan',
    requirementsText: 'Research paper on "Applications of Deep Reinforcement Learning in Modern Smart Grid Optimization". Requires deep academic rigor.',
    specialInstructions: 'Strict IEEE reference style. Include zero-plagiarism report guarantee.',
    formatGuidelines: 'IEEE Double-column format, DOCX + PDF.',
    paymentMethod: 'Askari Bank Transfer',
    paymentAccount: '00553230017265 (Askari Bank • Shehroz Sultan)',
    paymentTxId: 'TX-ASK-553201923',
    paymentStatus: 'Pending Audit',
    invoiceNumber: 'INV-MFS-2026-849203.pdf',
    progressStep: 1,
    clientFiles: [
      { id: 'f4', name: 'assignment_rubric_ieee_2026.pdf', size: '4.8 MB', uploadDate: 'July 25, 09:12', type: 'PDF' }
    ],
    adminFiles: [],
    adminNotes: [
      { id: 'n4', author: 'System Admin', role: 'Admin', text: 'Bank deposit receipt submitted. Awaiting financial audit.', timestamp: 'July 25, 09:15' }
    ]
  }
];

function convertRawToOrder360(raw: any): Order360 {
  const isPkr = (raw.currency || 'PKR').toUpperCase() === 'PKR';
  const amountPkr = isPkr ? Number(raw.total_amount) || 15000 : (Number(raw.total_amount) || 50) * 278;

  return {
    id: raw.order_number || raw.id || `ORD-MFS-${Math.floor(100000 + Math.random() * 900000)}`,
    clientName: raw.guest_name || raw.client_name || 'Client',
    clientEmail: raw.guest_email || raw.client_email || 'client@example.com',
    clientPhone: raw.guest_phone || raw.client_phone || '+92 301 5323689',
    clientLocation: raw.location || 'Pakistan (PKT Time Zone)',
    clientCompany: raw.company || 'Private Client',
    serviceName: raw.service_type || raw.serviceName || 'Custom Executive Service',
    packageName: raw.delivery_tier || 'Standard Package',
    category: 'Business',
    quantityText: '1 Deliverable Package',
    basePricePkr: amountPkr,
    priorityFeePkr: 0,
    totalPricePkr: amountPkr,
    status: raw.status === 'pending_verification' ? 'Pending Verification'
          : raw.status === 'in_progress' ? 'In Progress'
          : raw.status === 'under_review' ? 'Under Review'
          : raw.status === 'delivered' ? 'Delivered'
          : raw.status === 'completed' ? 'Completed'
          : 'Pending Verification',
    priority: raw.delivery_tier ? (raw.delivery_tier as any) : 'Standard',
    orderDate: raw.created_at ? new Date(raw.created_at).toLocaleString() : 'Just now',
    deadline: 'Standard Delivery Window',
    lastUpdated: 'Just now',
    assignedTeam: 'MFS Growth Operations Core',
    assignedManager: 'Muhammad Shehroz Sultan',
    requirementsText: raw.notes || 'Order received via online portal.',
    specialInstructions: 'Ensure 100% adherence to MFS Growth quality standards.',
    formatGuidelines: 'Editable Source Files + PDF Vector Export',
    paymentMethod: raw.payment_method || 'EasyPaisa / JazzCash',
    paymentAccount: '03116191234 (Muhammad Shehroz Sultan)',
    paymentTxId: raw.payment_tx_id || 'TX-ONLINE-MFS',
    paymentStatus: 'Verified',
    invoiceNumber: `INV-MFS-${raw.order_number || '2026'}`,
    progressStep: raw.status === 'completed' ? 6 : raw.status === 'delivered' ? 5 : 2,
    clientFiles: raw.client_files || [],
    adminFiles: raw.admin_files || [],
    adminNotes: raw.admin_notes || [
      { id: `n-${Date.now()}`, author: 'System Admin', role: 'System', text: 'Order logged and initialized.', timestamp: 'Just now' }
    ]
  };
}

export const OrderWorkspace360: React.FC<OrderWorkspace360Props> = ({
  currency,
  onShowToast,
  onOpenMessages,
}) => {
  const [orders, setOrders] = useState<Order360[]>(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ORD-MFS-849201');
  const [viewMode, setViewMode] = useState<'workspace' | 'workflow_engine' | 'timeline_activity' | 'requirements_deliverables' | 'automation_smart_actions'>('workspace');
  const [activeFileTab, setActiveFileTab] = useState<'client' | 'admin'>('client');
  const [newNoteText, setNewNoteText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  useEffect(() => {
    let isMounted = true;

    const loadAdminOrders = () => {
      fetchAllOrdersForAdmin().then((res) => {
        if (!isMounted || !res.success || !res.data || res.data.length === 0) return;
        const dynamic360 = res.data.map(convertRawToOrder360);
        setOrders((prev) => {
          const existingMap = new Map(prev.map((o) => [o.id, o]));
          dynamic360.forEach((d) => {
            existingMap.set(d.id, d);
          });
          return Array.from(existingMap.values());
        });
      });
    };

    loadAdminOrders();

    const handleRealtimeOrder = () => {
      loadAdminOrders();
    };

    window.addEventListener('mfs_order_created', handleRealtimeOrder);
    window.addEventListener('storage', handleRealtimeOrder);

    return () => {
      isMounted = false;
      window.removeEventListener('mfs_order_created', handleRealtimeOrder);
      window.removeEventListener('storage', handleRealtimeOrder);
    };
  }, []);
  
  // Modals for Quick Actions
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalInput, setModalInput] = useState<string>('');

  const currentOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  // Helper for Price Currency Conversion
  const formatPrice = (pkr: number) => {
    let rate = 1;
    let symbol = 'PKR';
    if (currency === 'USD') { rate = 0.0036; symbol = '$'; }
    else if (currency === 'GBP') { rate = 0.0028; symbol = '£'; }
    else if (currency === 'EUR') { rate = 0.0033; symbol = '€'; }
    else if (currency === 'AED') { rate = 0.013; symbol = 'AED'; }

    if (currency === 'PKR') {
      return `PKR ${pkr.toLocaleString()}`;
    }
    const val = (pkr * rate).toFixed(2);
    return `${symbol} ${val}`;
  };

  // Add Admin Note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote = {
      id: `n-${Date.now()}`,
      author: 'Super Admin',
      role: 'Executive Lead',
      text: newNoteText.trim(),
      timestamp: 'Just now',
    };

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === selectedOrderId) {
          return {
            ...ord,
            adminNotes: [newNote, ...ord.adminNotes],
            lastUpdated: 'Just now by Admin Note',
          };
        }
        return ord;
      })
    );

    setNewNoteText('');
    if (onShowToast) onShowToast(`Private admin note appended to ${selectedOrderId}`);
  };

  // Status Change
  const handleStatusChange = (newStatus: Order360['status']) => {
    let step = currentOrder.progressStep;
    if (newStatus === 'Pending Verification') step = 1;
    if (newStatus === 'In Progress') step = 4;
    if (newStatus === 'Under Review') step = 5;
    if (newStatus === 'Delivered') step = 6;
    if (newStatus === 'Completed') step = 6;

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === selectedOrderId) {
          return { ...ord, status: newStatus, progressStep: step, lastUpdated: 'Just now' };
        }
        return ord;
      })
    );
    if (onShowToast) onShowToast(`Order ${selectedOrderId} status updated to: ${newStatus}`);
  };

  const getStatusBadge = (status: Order360['status']) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Pending Verification':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Under Review':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Delivered':
        return 'bg-[#28C76F]/20 text-[#28C76F] border-[#28C76F]/30';
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-white/10 text-neutral-300 border-white/20';
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'All') return true;
    return o.status === statusFilter;
  });

  // Workflow Stages List (6 Stages)
  const WORKFLOW_STAGES = [
    { step: 1, title: 'Order Submitted', desc: 'Brief & details registered in system' },
    { step: 2, title: 'Payment Verified', desc: 'Financial receipt audited & approved' },
    { step: 3, title: 'Brief Audit', desc: 'Scope, guidelines & guidelines locked' },
    { step: 4, title: 'Design & Drafting', desc: 'Active execution by MFS Squad' },
    { step: 5, title: 'Quality & APA Review', desc: 'Internal senior director verification' },
    { step: 6, title: 'Final Delivery', desc: 'Encrypted files released to client' },
  ];

  return (
    <div className="space-y-6">
      
      {/* MODE SWITCHER STRIP (PHASE 4 vs PHASE 5 vs PHASE 6) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-white/[0.03] border border-white/10 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setViewMode('workspace')}
            className={`px-4 py-2 rounded-xl font-bold font-poppins flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'workspace'
                ? 'bg-[#E5C158] text-black shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white bg-white/[0.02]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>360° Order Workspace (Phase 4)</span>
          </button>

          <button
            onClick={() => setViewMode('workflow_engine')}
            className={`px-4 py-2 rounded-xl font-bold font-poppins flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'workflow_engine'
                ? 'bg-[#E5C158] text-black shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white bg-white/[0.02]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Workflow & Assignment Engine (Phase 5)</span>
          </button>

          <button
            onClick={() => setViewMode('timeline_activity')}
            className={`px-4 py-2 rounded-xl font-bold font-poppins flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'timeline_activity'
                ? 'bg-[#E5C158] text-black shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white bg-white/[0.02]'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Timeline & Activity History (Phase 6)</span>
          </button>

          <button
            onClick={() => setViewMode('requirements_deliverables')}
            className={`px-4 py-2 rounded-xl font-bold font-poppins flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'requirements_deliverables'
                ? 'bg-[#E5C158] text-black shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white bg-white/[0.02]'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Requirements & Deliverables Center (Phase 7)</span>
          </button>

          <button
            onClick={() => setViewMode('automation_smart_actions')}
            className={`px-4 py-2 rounded-xl font-bold font-poppins flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'automation_smart_actions'
                ? 'bg-[#E5C158] text-black shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white bg-white/[0.02]'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Order Automation & AI Engine (Phase 8)</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 pr-2 text-neutral-400 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-[#28C76F] animate-pulse" />
          <span>Workflow System Active • SLA Audit On</span>
        </div>
      </div>

      {viewMode === 'workflow_engine' ? (
        <OrderWorkflowEngine currency={currency} onShowToast={onShowToast} />
      ) : viewMode === 'timeline_activity' ? (
        <OrderTimelineActivity currency={currency} onShowToast={onShowToast} />
      ) : viewMode === 'requirements_deliverables' ? (
        <RequirementsDeliverablesCenter currency={currency} onShowToast={onShowToast} />
      ) : viewMode === 'automation_smart_actions' ? (
        <OrderAutomationSmartActions currency={currency} onShowToast={onShowToast} />
      ) : (
        <>
          {/* 360° WORKSPACE TOP CONTROL BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 shadow-[0_0_15px_rgba(229,193,88,0.2)]">
              <ShoppingBag className="w-6 h-6 text-[#E5C158]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#E5C158]/20 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/40 uppercase tracking-wider">
                  360° ORDER WORKSPACE
                </span>
                <span className="text-neutral-500 text-xs font-mono">• Multi-Column Master View</span>
              </div>
              <h2 className="font-poppins font-black text-xl text-white flex items-center gap-2">
                <span>{currentOrder.id}</span>
                <span className="text-neutral-500 text-sm font-normal">({currentOrder.serviceName})</span>
              </h2>
            </div>
          </div>

          {/* ORDER SELECTOR & STATUS FILTER */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 bg-white/[0.04] p-1.5 rounded-2xl border border-white/10 text-xs">
              <Filter className="w-3.5 h-3.5 text-[#E5C158] ml-1" />
              <select
                value={selectedOrderId}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className="bg-transparent text-white font-mono font-bold focus:outline-none cursor-pointer pr-2"
              >
                {filteredOrders.map((ord) => (
                  <option key={ord.id} value={ord.id} className="bg-[#0D0D12] text-white">
                    {ord.id} — {ord.clientName} ({ord.status})
                  </option>
                ))}
              </select>
            </div>

            {/* QUICK STATUS SWITCHER FOR DEMO */}
            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-2xl border border-white/10 text-[11px] font-mono">
              <span className="text-neutral-400 px-2 font-bold hidden sm:inline">Status:</span>
              {(['Pending Verification', 'In Progress', 'Under Review', 'Delivered'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  className={`px-2.5 py-1 rounded-xl cursor-pointer font-bold transition-all ${
                    currentOrder.status === st
                      ? 'bg-[#E5C158] text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {st.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ORDER HEADLINE SUMMARY STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-white/10 text-xs">
          
          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-0.5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Client Name</span>
            <strong className="text-white font-bold truncate block">{currentOrder.clientName}</strong>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-0.5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Current Status</span>
            <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${getStatusBadge(currentOrder.status)}`}>
              {currentOrder.status}
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-0.5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Speed / Priority</span>
            <strong className="text-amber-400 font-bold block">{currentOrder.priority}</strong>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-0.5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Total Value</span>
            <strong className="text-[#28C76F] font-black text-sm block">{formatPrice(currentOrder.totalPricePkr)}</strong>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-0.5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Target Deadline</span>
            <strong className="text-cyan-300 font-mono text-[11px] block">{currentOrder.deadline}</strong>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-0.5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Assigned Manager</span>
            <strong className="text-white text-[11px] truncate block">{currentOrder.assignedManager}</strong>
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* 360° RESPONSIVE MULTI-COLUMN WORKSPACE GRID */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ======================================================= */}
        {/* COLUMN 1: CLIENT PROFILE & ORDER OVERVIEW (3 COLS) */}
        {/* ======================================================= */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* CARD 1: CLIENT INFORMATION & CRM PROFILE */}
          <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-gradient-to-b from-[#0D0D12] to-transparent">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#E5C158]" />
                <h3 className="font-poppins font-bold text-white text-base">Client Information</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#28C76F]/20 text-[#28C76F] text-[10px] font-mono font-bold border border-[#28C76F]/30">
                Verified Account
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E5C158] to-[#997920] text-black font-black text-lg flex items-center justify-center shrink-0 shadow-lg">
                {currentOrder.clientName.split(' ').map(n=>n[0]).join('')}
              </div>
              <div className="min-w-0 flex-1 space-y-0.5">
                <h4 className="font-poppins font-bold text-white text-sm truncate">{currentOrder.clientName}</h4>
                <p className="text-xs text-neutral-400 flex items-center gap-1.5 truncate">
                  <Building2 className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
                  <span>{currentOrder.clientCompany}</span>
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-neutral-400 block font-mono">Email Address</span>
                  <a href={`mailto:${currentOrder.clientEmail}`} className="text-white hover:text-[#E5C158] truncate block font-mono font-semibold">
                    {currentOrder.clientEmail}
                  </a>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#28C76F] shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-neutral-400 block font-mono">Phone / WhatsApp</span>
                  <a href={`https://wa.me/${currentOrder.clientPhone.replace(/[^0-9]/g,'')}`} target="_blank" rel="noreferrer" className="text-white hover:text-[#28C76F] font-mono font-semibold block">
                    {currentOrder.clientPhone}
                  </a>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-neutral-400 block font-mono">Location & Zone</span>
                  <span className="text-white font-medium block">{currentOrder.clientLocation}</span>
                </div>
              </div>

            </div>

            {/* PREVIOUS ORDERS & LIFETIME STATS (FUTURE-READY) */}
            <div className="p-3.5 rounded-2xl bg-[#E5C158]/5 border border-[#E5C158]/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#E5C158] font-bold font-mono text-[10px] uppercase">Client History & LTV</span>
                <span className="text-white font-mono font-bold text-[10px]">3 Orders Total</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-neutral-400 block text-[9px]">Total Lifetime Spent</span>
                  <strong className="text-[#28C76F] font-bold">{formatPrice(75000)}</strong>
                </div>
                <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-neutral-400 block text-[9px]">Delivery SLA</span>
                  <strong className="text-cyan-400 font-bold">100% On-Time</strong>
                </div>
              </div>
            </div>

            {/* SHORTCUT BUTTONS */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  if (onOpenMessages) onOpenMessages(currentOrder.clientEmail);
                  if (onShowToast) onShowToast(`Opening Client Communication Hub for ${currentOrder.clientName}`);
                }}
                className="py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Chat Hub</span>
              </button>

              <button
                onClick={() => {
                  if (onShowToast) onShowToast(`Simulating 'View as Client' dashboard shortcut for ${currentOrder.clientName}`);
                }}
                className="py-2.5 rounded-2xl bg-[#E5C158]/20 hover:bg-[#E5C158]/30 text-[#E5C158] border border-[#E5C158]/40 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View as Client</span>
              </button>
            </div>

          </div>

          {/* CARD 2: DETAILED ORDER OVERVIEW & SQUAD ASSIGNMENT */}
          <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-gradient-to-b from-[#0D0D12] to-transparent">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="font-poppins font-bold text-white text-base">Order Specifications</h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">{currentOrder.category}</span>
            </div>

            <div className="space-y-3 text-xs">
              
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Order Reference:</span>
                <strong className="text-white font-mono">{currentOrder.id}</strong>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Primary Service:</span>
                <strong className="text-[#E5C158] font-bold">{currentOrder.serviceName}</strong>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Package Variant:</span>
                <strong className="text-white">{currentOrder.packageName}</strong>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Quantity / Scope:</span>
                <strong className="text-white">{currentOrder.quantityText}</strong>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Order Placed Date:</span>
                <span className="text-neutral-300 font-mono text-[11px]">{currentOrder.orderDate}</span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Last System Update:</span>
                <span className="text-neutral-300 font-mono text-[11px]">{currentOrder.lastUpdated}</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400 font-mono">Assigned Squad:</span>
                  <strong className="text-white">{currentOrder.assignedTeam}</strong>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400 font-mono">Lead Manager:</span>
                  <strong className="text-[#28C76F]">{currentOrder.assignedManager}</strong>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ======================================================= */}
        {/* COLUMN 2: REQUIREMENTS, WORKFLOW PROGRESS & FILES (5 COLS) */}
        {/* ======================================================= */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* CARD 3: VISUAL ORDER PROGRESS & WORKFLOW TIMELINE */}
          <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-gradient-to-b from-[#0D0D12] to-transparent">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#28C76F]" />
                <h3 className="font-poppins font-bold text-white text-base">Visual Order Progress</h3>
              </div>
              <span className="text-xs font-mono text-[#28C76F] font-bold">
                Stage {currentOrder.progressStep} / 6 Active
              </span>
            </div>

            {/* REUSABLE PROGRESS TIMELINE ARCHITECTURE */}
            <div className="space-y-3 relative before:absolute before:top-3 before:bottom-3 before:left-3.5 before:w-0.5 before:bg-white/10">
              
              {WORKFLOW_STAGES.map((st) => {
                const isCompleted = st.step < currentOrder.progressStep;
                const isActive = st.step === currentOrder.progressStep;
                return (
                  <div key={st.step} className="flex items-start gap-3 relative z-10 text-xs">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold font-mono text-[11px] shrink-0 ${
                        isCompleted
                          ? 'bg-[#28C76F] text-black shadow-[0_0_10px_rgba(40,199,111,0.4)]'
                          : isActive
                          ? 'bg-[#E5C158] text-black font-extrabold animate-pulse shadow-[0_0_12px_rgba(229,193,88,0.5)]'
                          : 'bg-white/10 text-neutral-500'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : st.step}
                    </div>

                    <div className={`p-2.5 rounded-2xl flex-1 border transition-all ${
                      isActive
                        ? 'bg-[#E5C158]/10 border-[#E5C158]/40 text-white'
                        : isCompleted
                        ? 'bg-white/[0.03] border-white/10 text-neutral-300'
                        : 'bg-white/[0.01] border-white/5 text-neutral-500'
                    }`}>
                      <div className="flex items-center justify-between">
                        <strong className={`font-bold ${isActive ? 'text-[#E5C158]' : isCompleted ? 'text-white' : 'text-neutral-400'}`}>
                          {st.title}
                        </strong>
                        {isActive && (
                          <span className="text-[9px] font-mono font-bold uppercase bg-[#E5C158] text-black px-1.5 py-0.2 rounded">
                            CURRENT
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[9px] font-mono font-bold uppercase text-[#28C76F]">
                            DONE ✓
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

          {/* CARD 4: CLIENT REQUIREMENTS & BRIEF (HANDLES LONG-FORM CLEANLY) */}
          <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-gradient-to-b from-[#0D0D12] to-transparent">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#E5C158]" />
                <h3 className="font-poppins font-bold text-white text-base">Client Requirements & Brief</h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">Long-Form Supported</span>
            </div>

            <div className="space-y-3 text-xs">
              
              <div className="space-y-1.5">
                <span className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">
                  Detailed Project Brief:
                </span>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-neutral-200 leading-relaxed font-sans max-h-48 overflow-y-auto pr-2">
                  {currentOrder.requirementsText}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">
                  Special Design & Brand Instructions:
                </span>
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 leading-relaxed font-sans">
                  {currentOrder.specialInstructions}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">
                  Format & Citation Guidelines:
                </span>
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-200 leading-relaxed font-mono text-[11px]">
                  {currentOrder.formatGuidelines}
                </div>
              </div>

            </div>

          </div>

          {/* CARD 5: FILES PANEL (CLIENT UPLOADS & ADMIN DELIVERABLES) */}
          <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-gradient-to-b from-[#0D0D12] to-transparent">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-cyan-400" />
                <h3 className="font-poppins font-bold text-white text-base">Files & Attachments Panel</h3>
              </div>
              
              {/* FILE TABS */}
              <div className="flex rounded-xl bg-white/[0.04] p-1 border border-white/10 text-[10px] font-mono">
                <button
                  onClick={() => setActiveFileTab('client')}
                  className={`px-2.5 py-1 rounded-lg uppercase cursor-pointer font-bold ${
                    activeFileTab === 'client' ? 'bg-[#E5C158] text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Client Files ({currentOrder.clientFiles.length})
                </button>
                <button
                  onClick={() => setActiveFileTab('admin')}
                  className={`px-2.5 py-1 rounded-lg uppercase cursor-pointer font-bold ${
                    activeFileTab === 'admin' ? 'bg-[#E5C158] text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Deliverables ({currentOrder.adminFiles.length})
                </button>
              </div>
            </div>

            {/* CLIENT FILES LIST */}
            {activeFileTab === 'client' && (
              <div className="space-y-2.5">
                {currentOrder.clientFiles.length === 0 ? (
                  <p className="text-xs text-neutral-500 italic text-center py-4">No client files uploaded.</p>
                ) : (
                  currentOrder.clientFiles.map((f) => (
                    <div key={f.id} className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 rounded-xl bg-white/10 text-[#E5C158] font-mono font-bold text-[10px]">
                          {f.type}
                        </div>
                        <div className="min-w-0">
                          <strong className="text-white font-semibold truncate block">{f.name}</strong>
                          <span className="text-[10px] text-neutral-400 font-mono block">
                            {f.size} • Uploaded {f.uploadDate}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (onShowToast) onShowToast(`[Sample/Client Protection] Initializing preview download for ${f.name}`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#E5C158]" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ADMIN DELIVERABLES LIST */}
            {activeFileTab === 'admin' && (
              <div className="space-y-2.5">
                {currentOrder.adminFiles.length === 0 ? (
                  <p className="text-xs text-neutral-500 italic text-center py-4">No admin draft files released yet.</p>
                ) : (
                  currentOrder.adminFiles.map((af) => (
                    <div key={af.id} className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 rounded-xl bg-[#28C76F]/20 text-[#28C76F] font-mono font-bold text-[10px] border border-[#28C76F]/30">
                          {af.version}
                        </div>
                        <div className="min-w-0">
                          <strong className="text-white font-semibold truncate block">{af.name}</strong>
                          <span className="text-[10px] text-neutral-400 font-mono block">
                            {af.size} • Released {af.uploadDate}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (onShowToast) onShowToast(`[Sample Protection] Initializing deliverable download for ${af.name}`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#28C76F]/20 hover:bg-[#28C76F]/30 text-[#28C76F] border border-[#28C76F]/40 font-bold text-[11px] flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>

        </div>

        {/* ======================================================= */}
        {/* COLUMN 3: FINANCIALS, ADMIN NOTES & QUICK ACTIONS (4 COLS) */}
        {/* ======================================================= */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* CARD 6: FINANCIAL & PAYMENT SUMMARY */}
          <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-gradient-to-b from-[#0D0D12] to-transparent">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#28C76F]" />
                <h3 className="font-poppins font-bold text-white text-base">Payment Summary</h3>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                currentOrder.paymentStatus === 'Verified'
                  ? 'bg-[#28C76F]/20 text-[#28C76F] border-[#28C76F]/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                {currentOrder.paymentStatus}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Total Price:</span>
                  <strong className="text-[#28C76F] text-base font-black">{formatPrice(currentOrder.totalPricePkr)}</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] text-neutral-400 border-t border-white/5 pt-2">
                  <span>Base Rate:</span>
                  <span className="font-mono text-white">{formatPrice(currentOrder.basePricePkr)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-neutral-400">
                  <span>Speed Surcharge ({currentOrder.priority}):</span>
                  <span className="font-mono text-amber-400">+{formatPrice(currentOrder.priorityFeePkr)}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Method:</span>
                  <strong className="text-white">{currentOrder.paymentMethod}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Deposit Account:</span>
                  <span className="text-white font-mono text-[10px]">{currentOrder.paymentAccount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Transaction TX:</span>
                  <strong className="text-cyan-400 font-mono text-[10px]">{currentOrder.paymentTxId}</strong>
                </div>
              </div>

              {/* INVOICE & RECEIPT PLACEHOLDERS */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setActiveModal('invoice');
                  }}
                  className="py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Invoice</span>
                </button>

                <button
                  onClick={() => {
                    setActiveModal('receipt');
                  }}
                  className="py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#28C76F]" />
                  <span>Receipt Proof</span>
                </button>
              </div>

            </div>

          </div>

          {/* CARD 7: PRIVATE ADMIN-ONLY NOTES (STRICTLY CONFIDENTIAL) */}
          <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-gradient-to-b from-[#0D0D12] to-transparent relative">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-400" />
                <h3 className="font-poppins font-bold text-white text-base">Private Admin Notes</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[9px] font-mono uppercase font-bold border border-amber-500/20">
                🔒 INTERNAL ONLY
              </span>
            </div>

            <p className="text-[10px] text-amber-300/80 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
              Note: Information in this section is strictly private and never visible to clients.
            </p>

            {/* NOTES LOG */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {currentOrder.adminNotes.map((note) => (
                <div key={note.id} className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <strong className="text-[#E5C158] font-bold">{note.author} ({note.role})</strong>
                    <span className="text-neutral-500">{note.timestamp}</span>
                  </div>
                  <p className="text-neutral-300 leading-snug">{note.text}</p>
                </div>
              ))}
            </div>

            {/* ADD NOTE FORM */}
            <form onSubmit={handleAddNote} className="space-y-2 pt-2 border-t border-white/10">
              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Append internal note (e.g. Squad briefing, delay note)..."
                rows={2}
                className="w-full p-2.5 rounded-2xl bg-black/40 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] transition-all resize-none"
              />
              <button
                type="submit"
                disabled={!newNoteText.trim()}
                className="w-full py-2 rounded-xl bg-[#E5C158] hover:bg-[#fce888] disabled:opacity-40 text-black font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Internal Admin Note</span>
              </button>
            </form>

          </div>

          {/* CARD 8: QUICK ACTION PANEL */}
          <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-gradient-to-b from-[#0D0D12] to-transparent">
            
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Sparkles className="w-5 h-5 text-[#E5C158]" />
              <h3 className="font-poppins font-bold text-white text-base">Quick Action Panel</h3>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              
              <button
                onClick={() => setActiveModal('edit')}
                className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-semibold flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all text-center"
              >
                <Edit3 className="w-4 h-4 text-blue-400" />
                <span>Edit Order</span>
              </button>

              <button
                onClick={() => setActiveModal('assign')}
                className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-semibold flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all text-center"
              >
                <UserPlus className="w-4 h-4 text-[#E5C158]" />
                <span>Assign Team</span>
              </button>

              <button
                onClick={() => setActiveModal('request')}
                className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-semibold flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all text-center"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Request Info</span>
              </button>

              <button
                onClick={() => {
                  handleStatusChange('Completed');
                  if (onShowToast) onShowToast(`Order ${selectedOrderId} marked Approved & Completed!`);
                }}
                className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all text-center"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Approve Order</span>
              </button>

              <button
                onClick={() => setActiveModal('reject')}
                className="p-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-semibold flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all text-center"
              >
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>Reject Order</span>
              </button>

              <button
                onClick={() => setActiveModal('timeline')}
                className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-semibold flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all text-center"
              >
                <History className="w-4 h-4 text-purple-400" />
                <span>Open Timeline</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenMessages) onOpenMessages(currentOrder.clientEmail);
                  if (onShowToast) onShowToast(`Opening Client Communication Hub`);
                }}
                className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-semibold flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all text-center"
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Open Messages</span>
              </button>

              <button
                onClick={() => setActiveModal('receipt')}
                className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-semibold flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all text-center"
              >
                <CreditCard className="w-4 h-4 text-[#28C76F]" />
                <span>View Payment</span>
              </button>

            </div>

            <button
              onClick={() => setActiveModal('invoice')}
              className="w-full py-3 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(229,193,88,0.2)] transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Official Invoice</span>
            </button>

          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* QUICK ACTION DIALOG MODALS */}
      {/* ========================================================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 p-6 space-y-4 shadow-2xl relative">
            
            <button
              onClick={() => { setActiveModal(null); setModalInput(''); }}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {/* MODAL: INVOICE GENERATOR */}
            {activeModal === 'invoice' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 uppercase">
                    Tax Invoice Engine
                  </span>
                  <h3 className="font-poppins font-black text-xl text-white">
                    Official Invoice preview
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Generated for <strong className="text-white">{currentOrder.clientName}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-neutral-400">Invoice Ref:</span>
                    <strong className="text-[#E5C158] font-mono">{currentOrder.invoiceNumber}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-neutral-400">Total Billed:</span>
                    <strong className="text-[#28C76F] font-bold">{formatPrice(currentOrder.totalPricePkr)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Payment Gateway:</span>
                    <span className="text-white font-mono">{currentOrder.paymentMethod}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveModal(null);
                    if (onShowToast) onShowToast(`Official Invoice ${currentOrder.invoiceNumber} downloaded.`);
                  }}
                  className="w-full py-3 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer"
                >
                  Download PDF Invoice
                </button>
              </div>
            )}

            {/* MODAL: RECEIPT PROOF AUDIT */}
            {activeModal === 'receipt' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30 uppercase">
                    Financial Audit
                  </span>
                  <h3 className="font-poppins font-black text-xl text-white">
                    Payment Receipt Proof
                  </h3>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 text-center space-y-1">
                    <ShieldCheck className="w-8 h-8 text-[#28C76F] mx-auto" />
                    <span className="text-[#28C76F] font-bold text-xs block">RECEIPT AUDIT VERIFIED</span>
                    <span className="text-[10px] text-neutral-400 font-mono block">TX Ref: {currentOrder.paymentTxId}</span>
                  </div>
                  <p className="text-neutral-300 text-[11px] pt-1">
                    Receipt matches deposit to <strong className="text-white">{currentOrder.paymentAccount}</strong>.
                  </p>
                </div>

                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-3 rounded-2xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 cursor-pointer"
                >
                  Close Receipt View
                </button>
              </div>
            )}

            {/* MODAL: ASSIGN TEAM */}
            {activeModal === 'assign' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 uppercase">
                    Team Management
                  </span>
                  <h3 className="font-poppins font-black text-xl text-white">
                    Assign Squad & Director
                  </h3>
                </div>

                <div className="space-y-2 text-xs">
                  <label className="text-neutral-400 font-mono text-[10px] block">Select Squad:</label>
                  <select
                    value={modalInput || currentOrder.assignedTeam}
                    onChange={(e) => setModalInput(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-black/60 border border-white/15 text-white font-mono focus:outline-none focus:border-[#E5C158]"
                  >
                    <option value="MFS Presentation Design Squad Alpha">MFS Presentation Design Squad Alpha</option>
                    <option value="MFS Career Engineering Squad">MFS Career Engineering Squad</option>
                    <option value="MFS Academic Writing Division">MFS Academic Writing Division</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    const newTeam = modalInput || currentOrder.assignedTeam;
                    setOrders((prev) =>
                      prev.map((o) => (o.id === selectedOrderId ? { ...o, assignedTeam: newTeam } : o))
                    );
                    setActiveModal(null);
                    setModalInput('');
                    if (onShowToast) onShowToast(`Reassigned ${selectedOrderId} to ${newTeam}`);
                  }}
                  className="w-full py-3 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer"
                >
                  Update Squad Assignment
                </button>
              </div>
            )}

            {/* MODAL: REQUEST INFO */}
            {activeModal === 'request' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30 uppercase">
                    Client Clarification
                  </span>
                  <h3 className="font-poppins font-black text-xl text-white">
                    Request Info From Client
                  </h3>
                </div>

                <textarea
                  value={modalInput}
                  onChange={(e) => setModalInput(e.target.value)}
                  placeholder="Specify missing guidelines or requested additional files..."
                  rows={3}
                  className="w-full p-3 rounded-2xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                />

                <button
                  onClick={() => {
                    setActiveModal(null);
                    setModalInput('');
                    if (onShowToast) onShowToast(`Information request email sent to ${currentOrder.clientEmail}`);
                  }}
                  className="w-full py-3 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer"
                >
                  Send Clarification Email & Push
                </button>
              </div>
            )}

            {/* MODAL: REJECT ORDER */}
            {activeModal === 'reject' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-red-500/20 text-red-400 font-mono text-[10px] font-bold border border-red-500/30 uppercase">
                    Rejection / Revision
                  </span>
                  <h3 className="font-poppins font-black text-xl text-white">
                    Flag Order Revision / Reject
                  </h3>
                </div>

                <textarea
                  value={modalInput}
                  onChange={(e) => setModalInput(e.target.value)}
                  placeholder="Reason for revision or rejection..."
                  rows={3}
                  className="w-full p-3 rounded-2xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                />

                <button
                  onClick={() => {
                    handleStatusChange('Under Review');
                    setActiveModal(null);
                    setModalInput('');
                    if (onShowToast) onShowToast(`Order ${selectedOrderId} flagged for review & revision.`);
                  }}
                  className="w-full py-3 rounded-2xl bg-red-500 text-white font-extrabold text-xs hover:bg-red-600 cursor-pointer"
                >
                  Submit Revision Notice
                </button>
              </div>
            )}

            {/* MODAL: TIMELINE */}
            {activeModal === 'timeline' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold border border-purple-500/30 uppercase">
                    Audit Log
                  </span>
                  <h3 className="font-poppins font-black text-xl text-white">
                    Order Timeline History
                  </h3>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs max-h-48 overflow-y-auto font-mono">
                  <div className="border-b border-white/5 pb-1">
                    <span className="text-[#28C76F] font-bold">[14:30]</span> Order Created by Client
                  </div>
                  <div className="border-b border-white/5 pb-1">
                    <span className="text-cyan-400 font-bold">[14:32]</span> EasyPaisa Payment Receipt Uploaded
                  </div>
                  <div className="border-b border-white/5 pb-1">
                    <span className="text-[#E5C158] font-bold">[14:35]</span> Admin Verified Payment TX-EP-9821734192
                  </div>
                  <div>
                    <span className="text-purple-400 font-bold">[16:10]</span> Initial Draft Released
                  </div>
                </div>

                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-3 rounded-2xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 cursor-pointer"
                >
                  Close Timeline
                </button>
              </div>
            )}

            {/* MODAL: EDIT ORDER */}
            {activeModal === 'edit' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold border border-blue-500/30 uppercase">
                    Order Config
                  </span>
                  <h3 className="font-poppins font-black text-xl text-white">
                    Edit Order Parameters
                  </h3>
                </div>

                <div className="space-y-2 text-xs">
                  <label className="text-neutral-400 font-mono text-[10px] block">Deadline String:</label>
                  <input
                    type="text"
                    value={modalInput || currentOrder.deadline}
                    onChange={(e) => setModalInput(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-black/60 border border-white/15 text-white font-mono focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <button
                  onClick={() => {
                    if (modalInput) {
                      setOrders((prev) =>
                        prev.map((o) => (o.id === selectedOrderId ? { ...o, deadline: modalInput } : o))
                      );
                    }
                    setActiveModal(null);
                    setModalInput('');
                    if (onShowToast) onShowToast(`Order ${selectedOrderId} parameters updated successfully.`);
                  }}
                  className="w-full py-3 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer"
                >
                  Save Configuration
                </button>
              </div>
            )}

          </div>
        </div>
      )}
        </>
      )}

    </div>
  );
};
