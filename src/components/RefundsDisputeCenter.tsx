import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useModalHistory } from '../hooks/useModalHistory';
import { sendActionNotificationEmail } from '../lib/emailNotificationService';
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  SlidersHorizontal,
  Download,
  Eye,
  Send,
  Plus,
  ShieldAlert,
  FileText,
  User,
  ShoppingBag,
  CreditCard,
  MessageSquare,
  Paperclip,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Copy,
  DollarSign,
  TrendingDown,
  ShieldCheck,
  History,
  FileCheck,
  Zap,
  ArrowUpRight,
  Building2
} from 'lucide-react';
import { Currency } from '../types';

export type RefundStatus =
  | 'Pending'
  | 'Under Review'
  | 'Approved'
  | 'Rejected'
  | 'Processing'
  | 'Refunded'
  | 'Closed';

export type DisputeStatus =
  | 'None'
  | 'Open Dispute'
  | 'Under Investigation'
  | 'Evidence Submitted'
  | 'Escalated'
  | 'Resolved'
  | 'Dismissed';

export interface AuditEvent {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  notes?: string;
  statusChange?: string;
}

export interface RefundRecord {
  id: string; // e.g. RFD-MFS-91023
  orderId: string; // e.g. ORD-MFS-392019
  paymentId: string; // e.g. PAY-MFS-849102
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  packageName: string;
  refundAmountPkr: number;
  originalAmountPkr: number;
  currency: string;
  refundReason: string;
  refundStatus: RefundStatus;
  disputeStatus: DisputeStatus;
  requestDate: string;
  lastUpdated: string;
  clientStatement: string;
  paymentMethod: string;
  evidenceFiles: { name: string; size: string; type: string }[];
  internalNotes: { id: string; author: string; date: string; text: string }[];
  auditHistory: AuditEvent[];
}

interface RefundsDisputeCenterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
  onNavigateTab?: (tab: string) => void;
}

// Authentic Initial Dataset for Refunds & Disputes
const INITIAL_REFUNDS: RefundRecord[] = [
  {
    id: 'RFD-MFS-91023',
    orderId: 'ORD-MFS-392019',
    paymentId: 'PAY-MFS-849102',
    clientName: 'Hamza Farooq',
    clientEmail: 'hamza.f@enterprise.pk',
    clientPhone: '+92 345 6789012',
    serviceName: 'Business Proposal & Grant Report',
    packageName: 'Government Tech Grant Application (30 Pages)',
    refundAmountPkr: 45000,
    originalAmountPkr: 45000,
    currency: 'PKR',
    refundReason: 'Client Order Cancellation Prior to Production',
    refundStatus: 'Approved',
    disputeStatus: 'Resolved',
    requestDate: '2026-07-21',
    lastUpdated: '2 days ago',
    clientStatement: 'We decided to hold the grant proposal due to internal company board timeline changes. Work has not started yet as per agreement.',
    paymentMethod: 'Askari Bank Transfer',
    evidenceFiles: [
      { name: 'Cancellation_Request_Letter.pdf', size: '1.2 MB', type: 'PDF Document' },
      { name: 'Bank_Transfer_Proof.jpg', size: '850 KB', type: 'Payment Receipt' }
    ],
    internalNotes: [
      { id: 'NOTE-1', author: 'Shehroz Sultan (Admin)', date: '2026-07-21 14:30', text: 'Verified with design team that project was in queue. Full refund approved as per 24-hour cancellation policy.' },
      { id: 'NOTE-2', author: 'Finance Ops Lead', date: '2026-07-22 10:15', text: 'Credit note CN-MFS-392019 generated. Reversal processed to Askari Bank.' }
    ],
    auditHistory: [
      { id: 'AUD-1', timestamp: '2026-07-21 12:00', action: 'Refund Request Created', performedBy: 'Hamza Farooq (Client)', notes: 'Submitted via Client Portal' },
      { id: 'AUD-2', timestamp: '2026-07-21 14:30', action: 'Status Changed to Approved', performedBy: 'Shehroz Sultan (Admin)', statusChange: 'Pending → Approved' },
      { id: 'AUD-3', timestamp: '2026-07-22 10:15', action: 'Dispute Marked as Resolved', performedBy: 'Finance Operations', statusChange: 'Open Dispute → Resolved' }
    ]
  },
  {
    id: 'RFD-MFS-73921',
    orderId: 'ORD-MFS-620194',
    paymentId: 'PAY-MFS-291038',
    clientName: 'Zainab Fatima',
    clientEmail: 'zainab.design@gmail.com',
    clientPhone: '+92 333 5551234',
    serviceName: 'Report & Document Formatting',
    packageName: 'Annual Corporate Impact Report (45 Pages)',
    refundAmountPkr: 16000,
    originalAmountPkr: 32000,
    currency: 'PKR',
    refundReason: 'Partial Refund Request - Scope Adjustment',
    refundStatus: 'Under Review',
    disputeStatus: 'Under Investigation',
    requestDate: '2026-07-24',
    lastUpdated: '3 hours ago',
    clientStatement: 'We reduced page length from 45 pages to 25 pages. Requesting pro-rated refund for the unexecuted 20 pages.',
    paymentMethod: 'EasyPaisa (03116191234)',
    evidenceFiles: [
      { name: 'Revised_Document_Scope.docx', size: '420 KB', type: 'Word Document' }
    ],
    internalNotes: [
      { id: 'NOTE-3', author: 'Project Coordinator', date: '2026-07-24 16:00', text: 'Checking completed pages count with desktop publishing team.' }
    ],
    auditHistory: [
      { id: 'AUD-4', timestamp: '2026-07-24 15:10', action: 'Refund Request Created', performedBy: 'Zainab Fatima (Client)', notes: 'Partial refund claim' },
      { id: 'AUD-5', timestamp: '2026-07-24 15:45', action: 'Dispute Status Updated', performedBy: 'Admin System', statusChange: 'None → Under Investigation' }
    ]
  },
  {
    id: 'RFD-MFS-84102',
    orderId: 'ORD-MFS-501928',
    paymentId: 'PAY-MFS-719203',
    clientName: 'David Miller',
    clientEmail: 'dmiller@globalstartups.co',
    clientPhone: '+1 415 890 1234',
    serviceName: 'Investor Pitch Deck & Financial Model',
    packageName: 'Series A Pitch Deck + Forecast (USD)',
    refundAmountPkr: 84000,
    originalAmountPkr: 84000,
    currency: 'USD',
    refundReason: 'Chargeback Claim / Unrecognized Transaction',
    refundStatus: 'Pending',
    disputeStatus: 'Open Dispute',
    requestDate: '2026-07-23',
    lastUpdated: '1 day ago',
    clientStatement: 'Disputed charge on card statement. Client claims dual charge on international gateway.',
    paymentMethod: 'Stripe International Gateway',
    evidenceFiles: [
      { name: 'Stripe_Gateway_Log_501928.pdf', size: '2.1 MB', type: 'Gateway Log' },
      { name: 'Deliverable_Handover_Email.pdf', size: '900 KB', type: 'Email Proof' }
    ],
    internalNotes: [
      { id: 'NOTE-4', author: 'Shehroz Sultan (Admin)', date: '2026-07-23 18:20', text: 'Gathered signed delivery confirmation and Stripe authorization code to defend chargeback.' }
    ],
    auditHistory: [
      { id: 'AUD-6', timestamp: '2026-07-23 17:00', action: 'External Chargeback Initiated', performedBy: 'Stripe Gateway', notes: 'Open dispute notification received' }
    ]
  },
  {
    id: 'RFD-MFS-30192',
    orderId: 'ORD-MFS-109283',
    paymentId: 'PAY-MFS-102938',
    clientName: 'Usman Ali',
    clientEmail: 'usman.ali@gmail.com',
    clientPhone: '+92 312 4443322',
    serviceName: 'ATS Resume & Executive CV Engineering',
    packageName: 'ATS Resume + Cover Letter',
    refundAmountPkr: 12000,
    originalAmountPkr: 12000,
    currency: 'PKR',
    refundReason: 'Dissatisfaction with Delivery Speed',
    refundStatus: 'Rejected',
    disputeStatus: 'Dismissed',
    requestDate: '2026-07-18',
    lastUpdated: '5 days ago',
    clientStatement: 'Wanted delivery in 6 hours, but standard 24-hour turnaround package was chosen.',
    paymentMethod: 'JazzCash (03015323688)',
    evidenceFiles: [
      { name: 'Package_Terms_Agreement.pdf', size: '300 KB', type: 'Terms Document' }
    ],
    internalNotes: [
      { id: 'NOTE-5', author: 'Admin Operations', date: '2026-07-18 11:00', text: 'Order was completed in 18 hours, well within 24-hour SLA. Rejection communicated politely.' }
    ],
    auditHistory: [
      { id: 'AUD-7', timestamp: '2026-07-18 09:30', action: 'Refund Request Created', performedBy: 'Usman Ali (Client)' },
      { id: 'AUD-8', timestamp: '2026-07-18 11:00', action: 'Status Changed to Rejected', performedBy: 'Shehroz Sultan (Admin)' }
    ]
  }
];

export const RefundsDisputeCenter: React.FC<RefundsDisputeCenterProps> = ({
  currency,
  onShowToast,
  onNavigateTab
}) => {
  const [refunds, setRefunds] = useState<RefundRecord[]>(INITIAL_REFUNDS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [disputeFilter, setDisputeFilter] = useState<string>('All');
  const [currencyFilter, setCurrencyFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc'>('date_desc');

  // Modals & Active Selections
  const [selectedRefund, setSelectedRefund] = useState<RefundRecord | null>(null);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [newNoteText, setNewNoteText] = useState<string>('');

  useModalHistory(showWorkspaceModal, () => setShowWorkspaceModal(false), 'refundWorkspaceModal');
  useModalHistory(showCreateModal, () => setShowCreateModal(false), 'refundCreateModal');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // New Refund Form State
  const [newOrderId, setNewOrderId] = useState<string>('');
  const [newClientName, setNewClientName] = useState<string>('');
  const [newRefundAmount, setNewRefundAmount] = useState<number>(10000);
  const [newReason, setNewReason] = useState<string>('Client Cancellation Request');

  // Currency Formatter
  const formatMoney = (pkrAmount: number) => {
    switch (currency) {
      case 'USD':
        return `$${(pkrAmount / 280).toFixed(2)}`;
      case 'GBP':
        return `£${(pkrAmount / 355).toFixed(2)}`;
      case 'EUR':
        return `€${(pkrAmount / 300).toFixed(2)}`;
      case 'AED':
        return `AED ${(pkrAmount / 76).toFixed(2)}`;
      default:
        return `PKR ${pkrAmount.toLocaleString()}`;
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    if (onShowToast) onShowToast(`${label} copied to clipboard!`);
  };

  // Filter & Sort Logic
  const filteredRefunds = useMemo(() => {
    return refunds
      .filter((rfd) => {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          rfd.id.toLowerCase().includes(q) ||
          rfd.orderId.toLowerCase().includes(q) ||
          rfd.paymentId.toLowerCase().includes(q) ||
          rfd.clientName.toLowerCase().includes(q) ||
          rfd.clientEmail.toLowerCase().includes(q) ||
          rfd.refundReason.toLowerCase().includes(q);

        const matchesStatus = statusFilter === 'All' || rfd.refundStatus === statusFilter;
        const matchesDispute = disputeFilter === 'All' || rfd.disputeStatus === disputeFilter;
        const matchesCurrency = currencyFilter === 'All' || rfd.currency === currencyFilter;

        return matchesQuery && matchesStatus && matchesDispute && matchesCurrency;
      })
      .sort((a, b) => {
        if (sortBy === 'amount_desc') return b.refundAmountPkr - a.refundAmountPkr;
        if (sortBy === 'amount_asc') return a.refundAmountPkr - b.refundAmountPkr;
        if (sortBy === 'date_asc') return new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime();
        return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();
      });
  }, [refunds, searchQuery, statusFilter, disputeFilter, currencyFilter, sortBy]);

  // Paginated View
  const totalPages = Math.ceil(filteredRefunds.length / itemsPerPage) || 1;
  const paginatedRefunds = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRefunds.slice(start, start + itemsPerPage);
  }, [filteredRefunds, currentPage]);

  // KPI Computations
  const stats = useMemo(() => {
    const totalRequests = refunds.length;
    const pendingCount = refunds.filter((r) => r.refundStatus === 'Pending' || r.refundStatus === 'Under Review').length;
    const approvedCount = refunds.filter((r) => r.refundStatus === 'Approved' || r.refundStatus === 'Refunded').length;
    const rejectedCount = refunds.filter((r) => r.refundStatus === 'Rejected').length;
    const activeDisputes = refunds.filter((r) => r.disputeStatus === 'Open Dispute' || r.disputeStatus === 'Under Investigation').length;
    const resolvedDisputes = refunds.filter((r) => r.disputeStatus === 'Resolved' || r.disputeStatus === 'Dismissed').length;

    const totalRefundedPkr = refunds
      .filter((r) => r.refundStatus === 'Approved' || r.refundStatus === 'Refunded')
      .reduce((sum, r) => sum + r.refundAmountPkr, 0);

    return {
      totalRequests,
      pendingCount,
      approvedCount,
      rejectedCount,
      activeDisputes,
      resolvedDisputes,
      totalRefundedPkr,
      avgResolutionTime: '18.4 Hours'
    };
  }, [refunds]);

  // Status Badge Rendering
  const renderRefundStatusBadge = (status: RefundStatus) => {
    switch (status) {
      case 'Approved':
      case 'Refunded':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {status}
          </span>
        );
      case 'Pending':
      case 'Under Review':
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E5C158]/20 text-[#E5C158] font-mono text-[11px] font-bold border border-[#E5C158]/40">
            <Clock className="w-3 h-3 text-[#E5C158]" />
            {status}
          </span>
        );
      case 'Rejected':
      case 'Closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 font-mono text-[11px] font-bold border border-rose-500/30">
            <XCircle className="w-3 h-3 text-rose-400" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-500/20 text-neutral-400 font-mono text-[11px] font-bold border border-neutral-500/30">
            {status}
          </span>
        );
    }
  };

  const renderDisputeBadge = (dispute: DisputeStatus) => {
    switch (dispute) {
      case 'Open Dispute':
      case 'Escalated':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-950/80 text-rose-400 font-mono text-[10px] font-bold border border-rose-500/40 animate-pulse">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            {dispute}
          </span>
        );
      case 'Under Investigation':
      case 'Evidence Submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-950/80 text-amber-400 font-mono text-[10px] font-bold border border-amber-500/40">
            <ShieldAlert className="w-3 h-3 text-amber-400" />
            {dispute}
          </span>
        );
      case 'Resolved':
      case 'Dismissed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/40">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            {dispute}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/5 text-neutral-400 font-mono text-[10px]">
            No Dispute
          </span>
        );
    }
  };

  // State Change Handlers for Selected Case
  const handleUpdateStatus = (newRefundStatus: RefundStatus, newDisputeStatus: DisputeStatus) => {
    if (!selectedRefund) return;

    const newAuditEvent: AuditEvent = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      action: `Status Updated to ${newRefundStatus}`,
      performedBy: 'Shehroz Sultan (Admin)',
      statusChange: `${selectedRefund.refundStatus} → ${newRefundStatus}`
    };

    const updatedRecord: RefundRecord = {
      ...selectedRefund,
      refundStatus: newRefundStatus,
      disputeStatus: newDisputeStatus,
      lastUpdated: 'Just now',
      auditHistory: [newAuditEvent, ...selectedRefund.auditHistory]
    };

    setRefunds(refunds.map((r) => (r.id === selectedRefund.id ? updatedRecord : r)));
    setSelectedRefund(updatedRecord);

    if (onShowToast) onShowToast(`Refund case ${selectedRefund.id} updated to ${newRefundStatus}!`);
  };

  const handleAddInternalNote = () => {
    if (!selectedRefund || !newNoteText.trim()) return;

    const newNote = {
      id: `NOTE-${Date.now()}`,
      author: 'Shehroz Sultan (Admin)',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      text: newNoteText.trim()
    };

    const updatedRecord: RefundRecord = {
      ...selectedRefund,
      internalNotes: [...selectedRefund.internalNotes, newNote]
    };

    setRefunds(refunds.map((r) => (r.id === selectedRefund.id ? updatedRecord : r)));
    setSelectedRefund(updatedRecord);
    setNewNoteText('');

    if (onShowToast) onShowToast('Internal note saved to case history.');
  };

  // Create Manual Refund Case
  const handleCreateRefundCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderId || !newClientName) {
      if (onShowToast) onShowToast('Please fill in required order and client details');
      return;
    }

    const newId = `RFD-MFS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newRecord: RefundRecord = {
      id: newId,
      orderId: newOrderId,
      paymentId: `PAY-MFS-${Math.floor(100000 + Math.random() * 900000)}`,
      clientName: newClientName,
      clientEmail: 'client@mfs.agency',
      clientPhone: '+92 300 0000000',
      serviceName: 'Executive Presentation / Assignment',
      packageName: 'Custom Package',
      refundAmountPkr: newRefundAmount,
      originalAmountPkr: newRefundAmount,
      currency: 'PKR',
      refundReason: newReason,
      refundStatus: 'Under Review',
      disputeStatus: 'Under Investigation',
      requestDate: new Date().toISOString().split('T')[0],
      lastUpdated: 'Just now',
      clientStatement: `Manual dispute registration created by admin for order ${newOrderId}.`,
      paymentMethod: 'EasyPaisa / Bank Transfer',
      evidenceFiles: [],
      internalNotes: [
        {
          id: `NOTE-${Date.now()}`,
          author: 'Shehroz Sultan (Admin)',
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          text: 'Case logged manually via Admin Financial Operations Hub.'
        }
      ],
      auditHistory: [
        {
          id: `AUD-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          action: 'Refund Case Created',
          performedBy: 'Shehroz Sultan (Admin)'
        }
      ]
    };

    setRefunds([newRecord, ...refunds]);
    setShowCreateModal(false);
    setNewOrderId('');
    setNewClientName('');

    // Dispatch automated email notification (Client confirmation + Admin alert)
    sendActionNotificationEmail({
      actionType: 'dispute_submission',
      actionTitle: `Dispute/Refund Logged: ${newId}`,
      clientName: newClientName,
      clientEmail: 'client@mfs.agency',
      referenceId: newId,
      subject: `Order ${newOrderId} Refund Case`,
      details: `Order ID: ${newOrderId}\nAmount: PKR ${newRefundAmount.toLocaleString()}\nReason: ${newReason}`,
    }).catch(() => null);

    if (onShowToast) onShowToast(`Created refund case ${newId} & dispatched email notifications!`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER & PHASE 12 BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] border border-[#E5C158]/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Admin Dashboard v2.0 • Phase 12</span>
          </div>
          <h1 className="font-poppins font-black text-2xl lg:text-3xl text-white tracking-tight flex items-center gap-3">
            Refunds & Dispute Management
          </h1>
          <p className="text-xs text-neutral-400 max-w-2xl">
            Centralized dispute resolution workspace to evaluate client claims, audit proof of service delivery, issue partial/full refunds, and resolve payment chargebacks.
          </p>
        </div>

        {/* QUICK ACTIONS */}
        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(229,193,88,0.3)]"
          >
            <Plus className="w-4 h-4" />
            <span>Log Dispute Case</span>
          </button>

          <button
            onClick={() => {
              if (onShowToast) onShowToast('Exporting Disputes & Refunds Audit Report (CSV)...');
            }}
            className="px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Export Audit Log</span>
          </button>
        </div>
      </div>

      {/* SUMMARY KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* KPI 1: TOTAL REQUESTS */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-1 hover:border-white/20 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block">Total Requests</span>
          <div className="font-poppins font-black text-xl text-white">{stats.totalRequests}</div>
          <span className="text-[9px] text-neutral-500 font-mono">Logged Cases</span>
        </div>

        {/* KPI 2: PENDING REFUNDS */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-[#E5C158]/40 space-y-1 hover:border-[#E5C158] transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-[#E5C158] block">Pending Refunds</span>
          <div className="font-poppins font-black text-xl text-[#E5C158]">{stats.pendingCount}</div>
          <span className="text-[9px] text-neutral-400 font-mono">Needs Review</span>
        </div>

        {/* KPI 3: APPROVED REFUNDS */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-emerald-500/30 space-y-1 hover:border-emerald-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block">Approved</span>
          <div className="font-poppins font-black text-xl text-emerald-400">{stats.approvedCount}</div>
          <span className="text-[9px] text-neutral-500 font-mono">Reversed / Paid</span>
        </div>

        {/* KPI 4: REJECTED REFUNDS */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-rose-500/30 space-y-1 hover:border-rose-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-rose-400 block">Rejected Claims</span>
          <div className="font-poppins font-black text-xl text-rose-400">{stats.rejectedCount}</div>
          <span className="text-[9px] text-neutral-500 font-mono">Dismissed</span>
        </div>

        {/* KPI 5: ACTIVE DISPUTES */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-amber-500/30 space-y-1 hover:border-amber-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block">Active Disputes</span>
          <div className="font-poppins font-black text-xl text-amber-400">{stats.activeDisputes}</div>
          <span className="text-[9px] text-neutral-500 font-mono">Under Investigation</span>
        </div>

        {/* KPI 6: RESOLVED DISPUTES */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-blue-500/30 space-y-1 hover:border-blue-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-blue-400 block">Resolved</span>
          <div className="font-poppins font-black text-xl text-blue-400">{stats.resolvedDisputes}</div>
          <span className="text-[9px] text-neutral-500 font-mono">Closed Audit</span>
        </div>

        {/* KPI 7: TOTAL REFUNDED AMOUNT */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-rose-500/30 space-y-1 hover:border-rose-500 transition-all shadow-lg col-span-2 sm:col-span-1 lg:col-span-1">
          <span className="text-[10px] font-mono font-bold uppercase text-rose-400 block">Total Refunded</span>
          <div className="font-poppins font-black text-lg text-rose-400">{formatMoney(stats.totalRefundedPkr)}</div>
          <span className="text-[9px] text-neutral-500 font-mono">Cumulative Value</span>
        </div>

        {/* KPI 8: AVG RESOLUTION TIME */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-purple-500/30 space-y-1 hover:border-purple-500 transition-all shadow-lg col-span-2 sm:col-span-1 lg:col-span-1">
          <span className="text-[10px] font-mono font-bold uppercase text-purple-400 block">Avg SLA Speed</span>
          <div className="font-poppins font-black text-lg text-purple-400">{stats.avgResolutionTime}</div>
          <span className="text-[9px] text-neutral-500 font-mono">Resolution SLA</span>
        </div>
      </div>

      {/* SEARCH & FILTERS TOOLBAR */}
      <div className="p-4 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* SEARCH BAR */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by Refund ID, Payment ID, Order ID, Client Name, Email, or Claim Reason..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* FILTER DROPDOWNS */}
          <div className="flex flex-wrap items-center gap-2">
            {/* REFUND STATUS FILTER */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#E5C158] cursor-pointer"
            >
              <option value="All" className="bg-[#0D0D12]">All Refund Statuses</option>
              <option value="Pending" className="bg-[#0D0D12]">Pending</option>
              <option value="Under Review" className="bg-[#0D0D12]">Under Review</option>
              <option value="Approved" className="bg-[#0D0D12]">Approved</option>
              <option value="Rejected" className="bg-[#0D0D12]">Rejected</option>
              <option value="Refunded" className="bg-[#0D0D12]">Refunded</option>
            </select>

            {/* DISPUTE STATUS FILTER */}
            <select
              value={disputeFilter}
              onChange={(e) => {
                setDisputeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#E5C158] cursor-pointer"
            >
              <option value="All" className="bg-[#0D0D12]">All Dispute States</option>
              <option value="Open Dispute" className="bg-[#0D0D12]">Open Dispute</option>
              <option value="Under Investigation" className="bg-[#0D0D12]">Under Investigation</option>
              <option value="Resolved" className="bg-[#0D0D12]">Resolved</option>
              <option value="Dismissed" className="bg-[#0D0D12]">Dismissed</option>
            </select>

            {/* ADVANCED TOGGLE */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                showAdvancedFilters
                  ? 'bg-[#E5C158] text-black'
                  : 'bg-white/5 border border-white/10 text-neutral-300 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Advanced</span>
            </button>
          </div>
        </div>

        {/* EXPANDABLE ADVANCED FILTER DRAWER */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 pt-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* CURRENCY FILTER */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block font-bold">Currency</label>
                  <select
                    value={currencyFilter}
                    onChange={(e) => setCurrencyFilter(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-[#E5C158]"
                  >
                    <option value="All" className="bg-[#0D0D12]">All Currencies</option>
                    <option value="PKR" className="bg-[#0D0D12]">PKR (Pakistani Rupee)</option>
                    <option value="USD" className="bg-[#0D0D12]">USD (US Dollar)</option>
                  </select>
                </div>

                {/* SORT BY */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block font-bold">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-[#E5C158]"
                  >
                    <option value="date_desc" className="bg-[#0D0D12]">Newest Case Date</option>
                    <option value="date_asc" className="bg-[#0D0D12]">Oldest Case Date</option>
                    <option value="amount_desc" className="bg-[#0D0D12]">Highest Refund Amount</option>
                    <option value="amount_asc" className="bg-[#0D0D12]">Lowest Refund Amount</option>
                  </select>
                </div>

                {/* RESET */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('All');
                      setDisputeFilter('All');
                      setCurrencyFilter('All');
                      setSortBy('date_desc');
                      setCurrentPage(1);
                      if (onShowToast) onShowToast('Dispute search filters reset');
                    }}
                    className="w-full p-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 font-bold transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Filters</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BULK SELECTION ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/40 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs text-white font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>{selectedIds.length} Case(s) Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onShowToast) onShowToast(`Escalated ${selectedIds.length} selected dispute cases to Legal & Senior Admin`);
                setSelectedIds([]);
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-500 text-white font-extrabold text-xs flex items-center gap-1.5 hover:bg-rose-600 transition-all cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Escalate Selected</span>
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* DISPUTE MANAGEMENT TABLE */}
      <div className="p-1 rounded-3xl bg-[#0D0D12] border border-white/10 shadow-2xl overflow-hidden">
        {filteredRefunds.length === 0 ? (
          /* EMPTY STATE */
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 text-neutral-500 flex items-center justify-center mx-auto border border-white/10">
              <RotateCcw className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-poppins font-bold text-white text-lg">No Refund Claims Found</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                No active dispute or refund claim matches your search query.
              </p>
            </div>
          </div>
        ) : (
          /* TABLE */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono uppercase text-neutral-400">
                  <th className="p-4 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === paginatedRefunds.length && paginatedRefunds.length > 0}
                      onChange={() => {
                        if (selectedIds.length === paginatedRefunds.length) setSelectedIds([]);
                        else setSelectedIds(paginatedRefunds.map((r) => r.id));
                      }}
                      className="rounded accent-[#E5C158] cursor-pointer"
                    />
                  </th>
                  <th className="p-4">Refund & Order ID</th>
                  <th className="p-4">Payment Ref</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Claim Amount</th>
                  <th className="p-4">Refund Status</th>
                  <th className="p-4">Dispute Status</th>
                  <th className="p-4">Request Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-neutral-300">
                {paginatedRefunds.map((rfd) => {
                  const isSelected = selectedIds.includes(rfd.id);
                  return (
                    <tr
                      key={rfd.id}
                      className={`hover:bg-white/[0.03] transition-colors ${
                        isSelected ? 'bg-rose-500/5' : ''
                      }`}
                    >
                      {/* CHECKBOX */}
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            if (selectedIds.includes(rfd.id)) setSelectedIds(selectedIds.filter((i) => i !== rfd.id));
                            else setSelectedIds([...selectedIds, rfd.id]);
                          }}
                          className="rounded accent-[#E5C158] cursor-pointer"
                        />
                      </td>

                      {/* REFUND ID & ORDER ID */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-white text-xs">{rfd.id}</span>
                            <button
                              onClick={() => copyToClipboard(rfd.id, 'Refund ID')}
                              className="text-neutral-500 hover:text-[#E5C158]"
                              title="Copy Refund ID"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-[10px] font-mono text-[#E5C158] block">
                            {rfd.orderId}
                          </span>
                        </div>
                      </td>

                      {/* PAYMENT ID */}
                      <td className="p-4 font-mono text-[11px] text-neutral-400">
                        {rfd.paymentId}
                      </td>

                      {/* CLIENT */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <strong className="text-white block font-semibold">{rfd.clientName}</strong>
                          <span className="text-[10px] text-neutral-400 block font-mono">{rfd.clientEmail}</span>
                        </div>
                      </td>

                      {/* SERVICE */}
                      <td className="p-4 max-w-xs truncate">
                        <span className="text-white font-medium block truncate">{rfd.serviceName}</span>
                        <span className="text-[10px] text-neutral-400 block truncate">{rfd.refundReason}</span>
                      </td>

                      {/* REFUND AMOUNT */}
                      <td className="p-4">
                        <strong className="font-poppins font-black text-rose-400 text-sm">
                          {formatMoney(rfd.refundAmountPkr)}
                        </strong>
                        <span className="text-[9px] text-neutral-500 font-mono block">
                          Orig: {formatMoney(rfd.originalAmountPkr)}
                        </span>
                      </td>

                      {/* REFUND STATUS */}
                      <td className="p-4">
                        {renderRefundStatusBadge(rfd.refundStatus)}
                      </td>

                      {/* DISPUTE STATUS */}
                      <td className="p-4">
                        {renderDisputeBadge(rfd.disputeStatus)}
                      </td>

                      {/* DATE */}
                      <td className="p-4 font-mono text-[10px] text-neutral-400">
                        {rfd.requestDate}
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedRefund(rfd);
                            setShowWorkspaceModal(true);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#E5C158]/10 hover:bg-[#E5C158] text-[#E5C158] hover:text-black font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Review Case</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION FOOTER */}
        <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 bg-white/[0.01]">
          <div>
            Showing <strong className="text-white">{filteredRefunds.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to{' '}
            <strong className="text-white">{Math.min(currentPage * itemsPerPage, filteredRefunds.length)}</strong> of{' '}
            <strong className="text-white">{filteredRefunds.length}</strong> refund & dispute cases
          </div>

          <div className="flex items-center gap-2 font-mono">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 cursor-pointer text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-white font-bold px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="p-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 cursor-pointer text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DISPUTE RESOLUTION WORKSPACE MODAL */}
      <AnimatePresence>
        {showWorkspaceModal && selectedRefund && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] overflow-y-auto">
            <div
              className="w-full max-w-4xl rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 p-5 md:p-8 space-y-6 shadow-2xl relative my-auto max-h-[calc(100dvh-1.5rem)] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setShowWorkspaceModal(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-white/10 text-neutral-400 hover:text-white cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* MODAL HEADER */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                    <span className="font-poppins font-black text-xl text-white">Dispute Case {selectedRefund.id}</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono">
                    Order Ref: <strong className="text-[#E5C158]">{selectedRefund.orderId}</strong> • Payment Ref: <strong className="text-white">{selectedRefund.paymentId}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {renderRefundStatusBadge(selectedRefund.refundStatus)}
                  {renderDisputeBadge(selectedRefund.disputeStatus)}
                </div>
              </div>

              {/* MAIN 2-COLUMN DISPUTE WORKSPACE */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT 2 COLUMNS: STATEMENT, EVIDENCE & AUDIT HISTORY */}
                <div className="lg:col-span-2 space-y-6">
                  {/* CLIENT STATEMENT */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#E5C158] font-bold font-mono">
                      <User className="w-4 h-4" />
                      <span>Client Claim Statement</span>
                    </div>
                    <div className="text-xs text-neutral-200 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/5">
                      "{selectedRefund.clientStatement}"
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono pt-1">
                      <span>Reason: <strong className="text-white">{selectedRefund.refundReason}</strong></span>
                      <span>Payment via: <strong className="text-white">{selectedRefund.paymentMethod}</strong></span>
                    </div>
                  </div>

                  {/* SUPPORTING EVIDENCE / UPLOADED DOCUMENTS */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-blue-400 font-bold font-mono">
                        <Paperclip className="w-4 h-4" />
                        <span>Uploaded Supporting Evidence ({selectedRefund.evidenceFiles.length})</span>
                      </div>
                      <button
                        onClick={() => {
                          if (onShowToast) onShowToast('Uploading administrative counter-evidence document...');
                        }}
                        className="text-[10px] text-[#E5C158] hover:underline font-mono"
                      >
                        + Add Admin Proof
                      </button>
                    </div>

                    {selectedRefund.evidenceFiles.length === 0 ? (
                      <p className="text-xs text-neutral-500 italic">No attachments submitted with claim.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedRefund.evidenceFiles.map((file, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs"
                          >
                            <div className="space-y-0.5 truncate">
                              <span className="text-white font-medium block truncate">{file.name}</span>
                              <span className="text-[10px] text-neutral-400 font-mono">{file.size} • {file.type}</span>
                            </div>
                            <button
                              onClick={() => {
                                if (onShowToast) onShowToast(`Opening evidence file ${file.name}...`);
                              }}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#E5C158]"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* INTERNAL NOTES THREAD */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-purple-400 font-bold font-mono">
                      <MessageSquare className="w-4 h-4" />
                      <span>Internal Admin Notes & Review History</span>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {selectedRefund.internalNotes.map((note) => (
                        <div key={note.id} className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                            <strong className="text-[#E5C158]">{note.author}</strong>
                            <span>{note.date}</span>
                          </div>
                          <p className="text-neutral-200">{note.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* NEW NOTE INPUT */}
                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        placeholder="Add confidential internal note..."
                        className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                      />
                      <button
                        onClick={handleAddInternalNote}
                        className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>

                  {/* AUDIT HISTORY TIMELINE */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold font-mono">
                      <History className="w-4 h-4" />
                      <span>Audit History & Case Timeline</span>
                    </div>

                    <div className="space-y-2 border-l border-white/10 pl-3">
                      {selectedRefund.auditHistory.map((audit) => (
                        <div key={audit.id} className="relative space-y-0.5 text-xs">
                          <div className="w-2 h-2 rounded-full bg-[#E5C158] absolute -left-[17px] top-1" />
                          <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                            <span className="text-white font-bold">{audit.action}</span>
                            <span>{audit.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-neutral-400">By {audit.performedBy} {audit.notes ? `• ${audit.notes}` : ''}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: ACTION PANEL & DISPUTE DECISION */}
                <div className="space-y-6">
                  {/* CLIENT & FINANCIAL SUMMARY CARD */}
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/10 space-y-3 text-xs">
                    <span className="text-[10px] font-mono uppercase text-[#E5C158] font-bold block">Case Metadata</span>

                    <div className="space-y-2 divide-y divide-white/5">
                      <div className="pt-1">
                        <span className="text-neutral-400 block text-[10px]">Client:</span>
                        <strong className="text-white block font-bold">{selectedRefund.clientName}</strong>
                        <span className="text-neutral-400 font-mono text-[10px]">{selectedRefund.clientEmail}</span>
                      </div>

                      <div className="pt-2">
                        <span className="text-neutral-400 block text-[10px]">Requested Refund Amount:</span>
                        <strong className="font-poppins font-black text-rose-400 text-lg">
                          {formatMoney(selectedRefund.refundAmountPkr)}
                        </strong>
                        <span className="text-neutral-500 font-mono text-[10px] block">
                          Original Paid: {formatMoney(selectedRefund.originalAmountPkr)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ADMIN DECISION & WORKFLOW CONTROLS */}
                  <div className="p-5 rounded-2xl bg-[#050507] border border-[#E5C158]/30 space-y-3">
                    <span className="text-[10px] font-mono uppercase text-[#E5C158] font-bold block">Execute Resolution</span>

                    <div className="space-y-2">
                      <button
                        onClick={() => handleUpdateStatus('Approved', 'Resolved')}
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve Refund & Issue Credit</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStatus('Rejected', 'Dismissed')}
                        className="w-full py-2.5 px-3 rounded-xl bg-rose-500/20 border border-rose-500/40 hover:bg-rose-500 text-rose-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject Claim & Dismiss Dispute</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStatus('Under Review', 'Escalated')}
                        className="w-full py-2 px-3 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        <span>Escalate Case to Legal / Executive</span>
                      </button>

                      <button
                        onClick={() => {
                          if (onShowToast) onShowToast(`Sent clarification email to ${selectedRefund.clientEmail}`);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-[#E5C158]" />
                        <span>Request Info from Client</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE MANUAL DISPUTE CASE MODAL */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] overflow-y-auto">
            <div
              className="w-full max-w-lg rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 p-5 md:p-8 space-y-6 shadow-2xl relative my-auto max-h-[calc(100dvh-1.5rem)] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-white/10 text-neutral-400 hover:text-white cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="font-poppins font-black text-xl text-white">Log Manual Dispute / Refund Case</h3>
                <p className="text-xs text-neutral-400">Record a client dispute or manual refund claim into the agency audit ledger.</p>
              </div>

              <form onSubmit={handleCreateRefundCase} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block font-bold">Order ID</label>
                  <input
                    type="text"
                    required
                    value={newOrderId}
                    onChange={(e) => setNewOrderId(e.target.value)}
                    placeholder="e.g. ORD-MFS-849201"
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block font-bold">Client Name</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. Dr. Tariq Mahmood"
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block font-bold">Refund Amount (PKR)</label>
                  <input
                    type="number"
                    required
                    value={newRefundAmount}
                    onChange={(e) => setNewRefundAmount(Number(e.target.value))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block font-bold">Reason for Refund Request</label>
                  <select
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#E5C158]"
                  >
                    <option value="Client Cancellation Request">Client Cancellation Request</option>
                    <option value="Scope Revision & Adjustment">Scope Revision & Adjustment</option>
                    <option value="Quality / SLA Complaint">Quality / SLA Complaint</option>
                    <option value="Unrecognized Transaction / Chargeback">Unrecognized Transaction / Chargeback</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#E5C158] text-black font-extrabold hover:bg-[#fce888] cursor-pointer"
                  >
                    Create Dispute Case
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
