import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  RotateCcw,
  RefreshCw,
  Eye,
  FileText,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Copy,
  Check,
  ShieldCheck,
  Building2,
  Phone,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  User,
  ShoppingBag,
  Sliders,
  Calendar,
  Layers,
  ArrowUpDown,
  MoreVertical,
  Zap,
  Lock,
  Mail,
  Send,
  Sparkles,
  FileCheck2,
  FileSpreadsheet,
  Maximize2
} from 'lucide-react';
import { Currency } from '../types';
import { PaymentVerificationWorkspace } from './PaymentVerificationWorkspace';

export type PaymentStatus =
  | 'Pending'
  | 'Awaiting Verification'
  | 'Verified'
  | 'Rejected'
  | 'Refund Requested'
  | 'Refunded'
  | 'Cancelled';

export type VerificationStatus =
  | 'Unverified'
  | 'Pending Audit'
  | 'Fully Verified'
  | 'Proof Rejected'
  | 'Flagged';

export type PaymentMethod =
  | 'EasyPaisa'
  | 'JazzCash'
  | 'Askari Bank Transfer'
  | 'Credit Card / Stripe';

export interface PaymentRecord {
  id: string; // e.g. PAY-MFS-849201
  orderId: string; // e.g. ORD-MFS-849201
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  packageName: string;
  amountPkr: number;
  currency: string;
  paymentMethod: PaymentMethod;
  transactionRef: string;
  accountUsed: string;
  paymentStatus: PaymentStatus;
  verificationStatus: VerificationStatus;
  paymentDate: string;
  verifiedBy?: string;
  lastUpdated: string;
  hasProofAttachment: boolean;
  notes?: string;
}

interface PaymentVerificationCenterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
  onNavigateTab?: (tab: string) => void;
}

// Initial Authentic Dataset based on MFS Growth Orders & Payments
const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'PAY-MFS-849201',
    orderId: 'ORD-MFS-849201',
    clientName: 'Muhammad Shehroz Sultan',
    clientEmail: 'shehrozsultanpgc@gmail.com',
    clientPhone: '+92 301 5323689',
    serviceName: 'Executive Presentation Design',
    packageName: 'Express Pitch Deck (15 Slides) + 50% Launch Discount',
    amountPkr: 25000,
    currency: 'PKR',
    paymentMethod: 'EasyPaisa',
    transactionRef: 'EP-TRX-9982410',
    accountUsed: '03116191234 (Muhammad Shehroz Sultan)',
    paymentStatus: 'Awaiting Verification',
    verificationStatus: 'Pending Audit',
    paymentDate: '2026-07-25 10:42 AM',
    verifiedBy: 'Pending Audit Queue',
    lastUpdated: '10 mins ago',
    hasProofAttachment: true,
    notes: 'Client uploaded EasyPaisa payment receipt screenshot. Needs admin verification before final release.'
  },
  {
    id: 'PAY-MFS-910283',
    orderId: 'ORD-MFS-910283',
    clientName: 'Dr. Tariq Mahmood',
    clientEmail: 'tariq.mahmood@nust.edu.pk',
    clientPhone: '+92 321 9876543',
    serviceName: 'Academic Assignment & Paper Writing',
    packageName: 'PhD Thesis Formatting & Reference Check (APA 7th)',
    amountPkr: 18500,
    currency: 'PKR',
    paymentMethod: 'JazzCash',
    transactionRef: 'JC-TRX-4410928',
    accountUsed: '03015323688 (Muhammad Shehroz Sultan)',
    paymentStatus: 'Verified',
    verificationStatus: 'Fully Verified',
    paymentDate: '2026-07-24 04:15 PM',
    verifiedBy: 'Shehroz Sultan (Super Admin)',
    lastUpdated: '1 hour ago',
    hasProofAttachment: true,
    notes: 'JazzCash transaction confirmed against bank statement. Order released to production.'
  },
  {
    id: 'PAY-MFS-731940',
    orderId: 'ORD-MFS-731940',
    clientName: 'Ayesha Khan',
    clientEmail: 'ayesha.k@techinnovations.io',
    clientPhone: '+92 300 1234567',
    serviceName: 'ATS Resume & Executive CV Engineering',
    packageName: 'ATS Resume + Cover Letter + LinkedIn Optimization',
    amountPkr: 12000,
    currency: 'PKR',
    paymentMethod: 'Askari Bank Transfer',
    transactionRef: 'AKB-FT-8830192',
    accountUsed: '00553230017265 (Muhammad Shehroz Sultan - Askari Bank)',
    paymentStatus: 'Verified',
    verificationStatus: 'Fully Verified',
    paymentDate: '2026-07-24 11:30 AM',
    verifiedBy: 'Shehroz Sultan (Super Admin)',
    lastUpdated: '4 hours ago',
    hasProofAttachment: true,
    notes: 'Bank transfer credit confirmed via Askari Online Banking portal.'
  },
  {
    id: 'PAY-MFS-620194',
    orderId: 'ORD-MFS-620194',
    clientName: 'Zainab Fatima',
    clientEmail: 'zainab.design@gmail.com',
    clientPhone: '+92 333 5551234',
    serviceName: 'Report & Document Formatting',
    packageName: 'Annual Corporate Impact Report (45 Pages)',
    amountPkr: 32000,
    currency: 'PKR',
    paymentMethod: 'EasyPaisa',
    transactionRef: 'EP-TRX-1029384',
    accountUsed: '03116191234 (Muhammad Shehroz Sultan)',
    paymentStatus: 'Pending',
    verificationStatus: 'Unverified',
    paymentDate: '2026-07-25 08:15 AM',
    verifiedBy: 'Unassigned',
    lastUpdated: '2 hours ago',
    hasProofAttachment: false,
    notes: 'Order initiated. Awaiting client payment screenshot upload.'
  },
  {
    id: 'PAY-MFS-501928',
    orderId: 'ORD-MFS-501928',
    clientName: 'David Miller',
    clientEmail: 'dmiller@globalstartups.co',
    clientPhone: '+1 415 890 1234',
    serviceName: 'Investor Pitch Deck & Financial Model',
    packageName: 'Series A Pitch Deck + Financial Forecast (USD)',
    amountPkr: 84000, // Equivalent to $300 USD
    currency: 'USD',
    paymentMethod: 'Credit Card / Stripe',
    transactionRef: 'STRIPE-ch_3M4o92810',
    accountUsed: 'Stripe Gateway (USD Int.)',
    paymentStatus: 'Verified',
    verificationStatus: 'Fully Verified',
    paymentDate: '2026-07-23 09:10 PM',
    verifiedBy: 'Stripe Auto-Webhook Sync',
    lastUpdated: '1 day ago',
    hasProofAttachment: true,
    notes: 'International payment auto-cleared via Stripe Gateway.'
  },
  {
    id: 'PAY-MFS-419203',
    orderId: 'ORD-MFS-419203',
    clientName: 'Usman Ali',
    clientEmail: 'usman.ali@gmail.com',
    clientPhone: '+92 312 4443322',
    serviceName: 'Presentation Redesign',
    packageName: 'University Research Slides (20 Slides)',
    amountPkr: 8500,
    currency: 'PKR',
    paymentMethod: 'JazzCash',
    transactionRef: 'JC-TRX-0001928',
    accountUsed: '03015323688 (Muhammad Shehroz Sultan)',
    paymentStatus: 'Rejected',
    verificationStatus: 'Proof Rejected',
    paymentDate: '2026-07-22 02:40 PM',
    verifiedBy: 'Shehroz Sultan (Super Admin)',
    lastUpdated: '2 days ago',
    hasProofAttachment: true,
    notes: 'Submitted TRX reference did not match account credit logs. Rejection notice sent with request for clear receipt.'
  },
  {
    id: 'PAY-MFS-392019',
    orderId: 'ORD-MFS-392019',
    clientName: 'Hamza Farooq',
    clientEmail: 'hamza.f@enterprise.pk',
    clientPhone: '+92 345 6789012',
    serviceName: 'Business Proposal & Grant Report',
    packageName: 'Government Tech Grant Application (30 Pages)',
    amountPkr: 45000,
    currency: 'PKR',
    paymentMethod: 'Askari Bank Transfer',
    transactionRef: 'AKB-FT-9921043',
    accountUsed: '00553230017265 (Muhammad Shehroz Sultan - Askari Bank)',
    paymentStatus: 'Refund Requested',
    verificationStatus: 'Flagged',
    paymentDate: '2026-07-21 06:20 PM',
    verifiedBy: 'Shehroz Sultan (Super Admin)',
    lastUpdated: '3 days ago',
    hasProofAttachment: true,
    notes: 'Client requested order cancellation prior to draft commencement. Refund evaluation in progress.'
  }
];

export const PaymentVerificationCenter: React.FC<PaymentVerificationCenterProps> = ({
  currency,
  onShowToast,
  onNavigateTab,
}) => {
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [verificationFilter, setVerificationFilter] = useState<string>('All');
  const [methodFilter, setMethodFilter] = useState<string>('All');
  const [currencyFilter, setCurrencyFilter] = useState<string>('All');
  const [dateRangeFilter, setDateRangeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc'>('date_desc');
  
  // View mode
  const [activeViewMode, setActiveViewMode] = useState<'ledger' | 'workspace'>('ledger');
  const [selectedWorkspacePaymentId, setSelectedWorkspacePaymentId] = useState<string>('PAY-MFS-849201');
  const [viewStyle, setViewStyle] = useState<'table' | 'grid' | 'compact'>('table');

  // Multi-select & Modals
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [inspectPayment, setInspectPayment] = useState<PaymentRecord | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Currency Formatter Helper
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
    setCopiedText(text);
    if (onShowToast) onShowToast(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Filtered & Sorted Payments
  const filteredPayments = useMemo(() => {
    return payments
      .filter((p) => {
        // Search query check
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          p.id.toLowerCase().includes(q) ||
          p.orderId.toLowerCase().includes(q) ||
          p.clientName.toLowerCase().includes(q) ||
          p.clientEmail.toLowerCase().includes(q) ||
          p.transactionRef.toLowerCase().includes(q) ||
          p.serviceName.toLowerCase().includes(q);

        // Status filters
        const matchesStatus = statusFilter === 'All' || p.paymentStatus === statusFilter;
        const matchesVerification = verificationFilter === 'All' || p.verificationStatus === verificationFilter;
        const matchesMethod = methodFilter === 'All' || p.paymentMethod === methodFilter;
        const matchesCurrency = currencyFilter === 'All' || p.currency === currencyFilter;

        return matchesQuery && matchesStatus && matchesVerification && matchesMethod && matchesCurrency;
      })
      .sort((a, b) => {
        if (sortBy === 'amount_desc') return b.amountPkr - a.amountPkr;
        if (sortBy === 'amount_asc') return a.amountPkr - b.amountPkr;
        if (sortBy === 'date_asc') return new Date(a.paymentDate).getTime() - new Date(b.paymentDate).getTime();
        return new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime();
      });
  }, [payments, searchQuery, statusFilter, verificationFilter, methodFilter, currencyFilter, sortBy]);

  // Paginated Data
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage) || 1;
  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(start, start + itemsPerPage);
  }, [filteredPayments, currentPage]);

  // Statistics Calculations
  const stats = useMemo(() => {
    const totalPkr = payments.reduce((acc, curr) => acc + curr.amountPkr, 0);
    const pendingAudit = payments.filter((p) => p.paymentStatus === 'Awaiting Verification').length;
    const verifiedCount = payments.filter((p) => p.paymentStatus === 'Verified').length;
    const rejectedCount = payments.filter((p) => p.paymentStatus === 'Rejected' || p.paymentStatus === 'Refund Requested').length;
    
    return {
      totalPkr,
      pendingAudit,
      verifiedCount,
      rejectedCount,
      totalCount: payments.length
    };
  }, [payments]);

  // Bulk selection toggles
  const handleSelectAll = () => {
    if (selectedIds.length === paginatedPayments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedPayments.map((p) => p.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Payment Status Badge Generator
  const renderStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Verified
          </span>
        );
      case 'Awaiting Verification':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E5C158]/20 text-[#E5C158] font-mono text-[11px] font-bold border border-[#E5C158]/40 animate-pulse">
            <Clock className="w-3 h-3 text-[#E5C158]" />
            Awaiting Verification
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[11px] font-bold border border-blue-500/30">
            <Clock className="w-3 h-3 text-blue-400" />
            Pending
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 font-mono text-[11px] font-bold border border-rose-500/30">
            <XCircle className="w-3 h-3 text-rose-400" />
            Rejected
          </span>
        );
      case 'Refund Requested':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[11px] font-bold border border-amber-500/30">
            <RotateCcw className="w-3 h-3 text-amber-400" />
            Refund Requested
          </span>
        );
      case 'Refunded':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 font-mono text-[11px] font-bold border border-purple-500/30">
            <RotateCcw className="w-3 h-3 text-purple-400" />
            Refunded
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-500/20 text-neutral-400 font-mono text-[11px] font-bold border border-neutral-500/30">
            <XCircle className="w-3 h-3 text-neutral-400" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  // Payment Method Pill Generator
  const renderMethodPill = (method: PaymentMethod) => {
    switch (method) {
      case 'EasyPaisa':
        return (
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            EasyPaisa
          </div>
        );
      case 'JazzCash':
        return (
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            JazzCash
          </div>
        );
      case 'Askari Bank Transfer':
        return (
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 bg-blue-950/40 px-2.5 py-1 rounded-lg border border-blue-500/30">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            Askari Bank
          </div>
        );
      case 'Credit Card / Stripe':
        return (
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-500/30">
            <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
            Card / Stripe
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* MODULE HEADER & BRAND BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] border border-[#E5C158]/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Admin Dashboard v2.0 • Phase 9</span>
          </div>
          <h1 className="font-poppins font-black text-2xl lg:text-3xl text-white tracking-tight flex items-center gap-3">
            Payments & Verification Center
          </h1>
          <p className="text-xs text-neutral-400 max-w-2xl">
            Enterprise financial operations workspace to audit client proof screenshots, track EasyPaisa, JazzCash, Askari Bank & Stripe transactions, and release verified orders.
          </p>
        </div>

        {/* TOP QUICK ACTION BUTTONS & VIEW MODE TOGGLE */}
        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <div className="flex items-center p-1 rounded-2xl bg-black/60 border border-white/10">
            <button
              onClick={() => setActiveViewMode('ledger')}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                activeViewMode === 'ledger'
                  ? 'bg-[#E5C158] text-black shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Payments Ledger
            </button>
            <button
              onClick={() => setActiveViewMode('workspace')}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeViewMode === 'workspace'
                  ? 'bg-[#E5C158] text-black shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verification Workspace</span>
            </button>
          </div>

          <button
            onClick={() => {
              setIsLoadingState(true);
              setTimeout(() => {
                setIsLoadingState(false);
                if (onShowToast) onShowToast('Financial transaction logs refreshed with latest webhooks!');
              }, 600);
            }}
            className="px-3.5 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#E5C158] ${isLoadingState ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={() => {
              if (onShowToast) onShowToast('Exporting transaction statement ledger (CSV / Audit Report)...');
            }}
            className="px-3.5 py-2 rounded-2xl bg-[#E5C158]/20 hover:bg-[#E5C158]/30 border border-[#E5C158]/40 text-[#E5C158] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Statement</span>
          </button>
        </div>
      </div>

      {/* CONDITIONAL RENDER: WORKSPACE vs LEDGER TABLE */}
      {activeViewMode === 'workspace' ? (
        <PaymentVerificationWorkspace
          currency={currency}
          onShowToast={onShowToast}
          onNavigateTab={onNavigateTab}
          selectedPaymentId={selectedWorkspacePaymentId}
          onBackToList={() => setActiveViewMode('ledger')}
        />
      ) : (
        <>

      {/* STATISTICAL CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: TOTAL VOLUME */}
        <div className="p-5 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-2 hover:border-[#E5C158]/40 transition-all shadow-lg">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-mono font-bold uppercase">Total Tracked Revenue</span>
            <div className="p-2 rounded-xl bg-[#E5C158]/10 text-[#E5C158]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="font-poppins font-black text-2xl text-white">
            {formatMoney(stats.totalPkr)}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +100% Launch
            </span>
            <span>across {stats.totalCount} transactions</span>
          </div>
        </div>

        {/* CARD 2: AWAITING AUDIT */}
        <div className="p-5 rounded-2xl bg-[#0D0D12] border border-[#E5C158]/40 space-y-2 hover:border-[#E5C158] transition-all shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#E5C158]/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-mono font-bold uppercase text-[#E5C158]">Awaiting Audit</span>
            <div className="p-2 rounded-xl bg-[#E5C158]/20 text-[#E5C158] animate-bounce">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-poppins font-black text-2xl text-[#E5C158] flex items-center gap-2">
            {stats.pendingAudit}
            <span className="text-xs font-mono font-semibold text-neutral-400">Receipts Pending</span>
          </div>
          <p className="text-[11px] text-neutral-400">Requires manual screenshot verification</p>
        </div>

        {/* CARD 3: VERIFIED PAYMENTS */}
        <div className="p-5 rounded-2xl bg-[#0D0D12] border border-emerald-500/30 space-y-2 hover:border-emerald-500 transition-all shadow-lg">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-mono font-bold uppercase text-emerald-400">Verified & Cleared</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-poppins font-black text-2xl text-emerald-400 flex items-center gap-2">
            {stats.verifiedCount}
            <span className="text-xs font-mono font-semibold text-neutral-400">Orders Cleared</span>
          </div>
          <p className="text-[11px] text-neutral-400">Ready for production & client delivery</p>
        </div>

        {/* CARD 4: REJECTED / REFUND */}
        <div className="p-5 rounded-2xl bg-[#0D0D12] border border-rose-500/30 space-y-2 hover:border-rose-500 transition-all shadow-lg">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-mono font-bold uppercase text-rose-400">Rejected / Refund</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <div className="font-poppins font-black text-2xl text-rose-400 flex items-center gap-2">
            {stats.rejectedCount}
            <span className="text-xs font-mono font-semibold text-neutral-400">Flagged Cases</span>
          </div>
          <p className="text-[11px] text-neutral-400">Invalid proof or client refund requests</p>
        </div>
      </div>

      {/* SEARCH, FILTERS & CONTROLS TOOLBAR */}
      <div className="p-4 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* SEARCH INPUT */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by Payment ID, Order ID, Client Name, TRX Ref, or Service..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* STATUS & METHOD QUICK FILTER DROPDOWNS */}
          <div className="flex flex-wrap items-center gap-2">
            {/* STATUS FILTER */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#E5C158] cursor-pointer"
            >
              <option value="All" className="bg-[#0D0D12] text-white">All Payment Statuses</option>
              <option value="Awaiting Verification" className="bg-[#0D0D12] text-white">Awaiting Verification</option>
              <option value="Verified" className="bg-[#0D0D12] text-white">Verified</option>
              <option value="Pending" className="bg-[#0D0D12] text-white">Pending</option>
              <option value="Rejected" className="bg-[#0D0D12] text-white">Rejected</option>
              <option value="Refund Requested" className="bg-[#0D0D12] text-white">Refund Requested</option>
              <option value="Refunded" className="bg-[#0D0D12] text-white">Refunded</option>
              <option value="Cancelled" className="bg-[#0D0D12] text-white">Cancelled</option>
            </select>

            {/* METHOD FILTER */}
            <select
              value={methodFilter}
              onChange={(e) => {
                setMethodFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#E5C158] cursor-pointer"
            >
              <option value="All" className="bg-[#0D0D12] text-white">All Payment Methods</option>
              <option value="EasyPaisa" className="bg-[#0D0D12] text-white">EasyPaisa (03116191234)</option>
              <option value="JazzCash" className="bg-[#0D0D12] text-white">JazzCash (03015323688)</option>
              <option value="Askari Bank Transfer" className="bg-[#0D0D12] text-white">Askari Bank Transfer</option>
              <option value="Credit Card / Stripe" className="bg-[#0D0D12] text-white">Credit Card / Stripe</option>
            </select>

            {/* ADVANCED FILTERS TOGGLE BUTTON */}
            <button
              onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                showFiltersDrawer
                  ? 'bg-[#E5C158] text-black'
                  : 'bg-white/5 border border-white/10 text-neutral-300 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Advanced</span>
            </button>
          </div>
        </div>

        {/* EXPANDABLE ADVANCED FILTER PANEL */}
        <AnimatePresence>
          {showFiltersDrawer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 pt-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {/* VERIFICATION FILTER */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block font-bold">Verification Status</label>
                  <select
                    value={verificationFilter}
                    onChange={(e) => setVerificationFilter(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-[#E5C158]"
                  >
                    <option value="All" className="bg-[#0D0D12]">All Verification Types</option>
                    <option value="Pending Audit" className="bg-[#0D0D12]">Pending Audit Queue</option>
                    <option value="Fully Verified" className="bg-[#0D0D12]">Fully Verified</option>
                    <option value="Proof Rejected" className="bg-[#0D0D12]">Proof Rejected</option>
                    <option value="Unverified" className="bg-[#0D0D12]">Unverified</option>
                    <option value="Flagged" className="bg-[#0D0D12]">Flagged for Escalation</option>
                  </select>
                </div>

                {/* CURRENCY FILTER */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block font-bold">Origin Currency</label>
                  <select
                    value={currencyFilter}
                    onChange={(e) => setCurrencyFilter(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-[#E5C158]"
                  >
                    <option value="All" className="bg-[#0D0D12]">All Currencies</option>
                    <option value="PKR" className="bg-[#0D0D12]">PKR (Pakistani Rupee)</option>
                    <option value="USD" className="bg-[#0D0D12]">USD (US Dollar)</option>
                    <option value="GBP" className="bg-[#0D0D12]">GBP (British Pound)</option>
                    <option value="EUR" className="bg-[#0D0D12]">EUR (Euro)</option>
                    <option value="AED" className="bg-[#0D0D12]">AED (UAE Dirham)</option>
                  </select>
                </div>

                {/* SORT BY ORDER */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block font-bold">Sort Order</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-[#E5C158]"
                  >
                    <option value="date_desc" className="bg-[#0D0D12]">Newest Date First</option>
                    <option value="date_asc" className="bg-[#0D0D12]">Oldest Date First</option>
                    <option value="amount_desc" className="bg-[#0D0D12]">Highest Amount First</option>
                    <option value="amount_asc" className="bg-[#0D0D12]">Lowest Amount First</option>
                  </select>
                </div>

                {/* CLEAR FILTERS BUTTON */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('All');
                      setVerificationFilter('All');
                      setMethodFilter('All');
                      setCurrencyFilter('All');
                      setSortBy('date_desc');
                      setCurrentPage(1);
                      if (onShowToast) onShowToast('All search filters reset to default');
                    }}
                    className="w-full p-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 font-bold transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MULTI-SELECT BULK OPERATIONS BAR (WHEN CHECKBOXES SELECTED) */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/40 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs text-white font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-ping" />
            <span>{selectedIds.length} Payments Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onShowToast) onShowToast(`Bulk audit verified for ${selectedIds.length} payments!`);
                setSelectedIds([]);
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 text-black font-extrabold text-xs flex items-center gap-1 hover:bg-emerald-400 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Bulk Approve</span>
            </button>

            <button
              onClick={() => {
                if (onShowToast) onShowToast(`Exporting statement for ${selectedIds.length} selected items...`);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Export Selected</span>
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* PAYMENTS MAIN TABLE CONTAINER */}
      <div className="p-1 rounded-3xl bg-[#0D0D12] border border-white/10 shadow-2xl overflow-hidden">
        {filteredPayments.length === 0 ? (
          /* EMPTY STATE */
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 text-neutral-500 flex items-center justify-center mx-auto border border-white/10">
              <CreditCard className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-poppins font-bold text-white text-lg">No Financial Transactions Found</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                No payment record matches your active search query or filter options. Try resetting your filters.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setVerificationFilter('All');
                setMethodFilter('All');
              }}
              className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] transition-all cursor-pointer"
            >
              Clear All Search Criteria
            </button>
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono uppercase text-neutral-400">
                  <th className="p-4 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === paginatedPayments.length && paginatedPayments.length > 0}
                      onChange={handleSelectAll}
                      className="rounded accent-[#E5C158] cursor-pointer"
                    />
                  </th>
                  <th className="p-4">Payment & Order ID</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Service & Package</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Method & Account</th>
                  <th className="p-4">Transaction Ref</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-neutral-300">
                {paginatedPayments.map((record) => {
                  const isSelected = selectedIds.includes(record.id);
                  return (
                    <tr
                      key={record.id}
                      className={`hover:bg-white/[0.03] transition-colors ${
                        isSelected ? 'bg-[#E5C158]/5' : ''
                      }`}
                    >
                      {/* CHECKBOX */}
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(record.id)}
                          className="rounded accent-[#E5C158] cursor-pointer"
                        />
                      </td>

                      {/* PAYMENT ID & ORDER ID */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-white text-xs">{record.id}</span>
                            <button
                              onClick={() => copyToClipboard(record.id, 'Payment ID')}
                              className="text-neutral-500 hover:text-[#E5C158] p-0.5"
                              title="Copy Payment ID"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-[10px] font-mono text-[#E5C158]">
                            {record.orderId}
                          </div>
                        </div>
                      </td>

                      {/* CLIENT */}
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center font-poppins font-bold text-xs border border-[#E5C158]/30">
                            {record.clientName.charAt(0)}
                          </div>
                          <div className="space-y-0.5">
                            <strong className="text-white block font-semibold">{record.clientName}</strong>
                            <span className="text-[10px] text-neutral-400 block font-mono">{record.clientEmail}</span>
                          </div>
                        </div>
                      </td>

                      {/* SERVICE & PACKAGE */}
                      <td className="p-4 max-w-xs">
                        <div className="space-y-0.5 truncate">
                          <span className="text-white font-medium block truncate">{record.serviceName}</span>
                          <span className="text-[10px] text-neutral-400 block truncate">{record.packageName}</span>
                        </div>
                      </td>

                      {/* AMOUNT */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <strong className="font-poppins font-black text-white text-sm">
                            {formatMoney(record.amountPkr)}
                          </strong>
                          <span className="text-[10px] text-neutral-500 font-mono block">
                            Base: PKR {record.amountPkr.toLocaleString()}
                          </span>
                        </div>
                      </td>

                      {/* PAYMENT METHOD & ACCOUNT */}
                      <td className="p-4">
                        <div className="space-y-1">
                          {renderMethodPill(record.paymentMethod)}
                          <span className="text-[10px] text-neutral-400 font-mono block truncate max-w-[140px]">
                            {record.accountUsed}
                          </span>
                        </div>
                      </td>

                      {/* TRANSACTION REF */}
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 font-mono text-xs font-bold text-neutral-200">
                            <span>{record.transactionRef}</span>
                            <button
                              onClick={() => copyToClipboard(record.transactionRef, 'TRX Ref')}
                              className="text-neutral-500 hover:text-white"
                              title="Copy TRX Ref"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          {record.hasProofAttachment && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                              <FileCheck2 className="w-3 h-3" /> Proof Attached
                            </span>
                          )}
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="p-4">
                        <div className="space-y-1">
                          {renderStatusBadge(record.paymentStatus)}
                        </div>
                      </td>

                      {/* DATE */}
                      <td className="p-4">
                        <div className="space-y-0.5 font-mono text-[11px] text-neutral-400">
                          <div>{record.paymentDate}</div>
                          <span className="text-[9px] text-neutral-500 block">By: {record.verifiedBy}</span>
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedWorkspacePaymentId(record.id);
                              setActiveViewMode('workspace');
                            }}
                            className="p-1.5 rounded-xl bg-white/5 hover:bg-[#E5C158]/20 hover:text-[#E5C158] text-neutral-300 transition-all cursor-pointer"
                            title="Inspect & Verify Receipt in Workspace"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (onShowToast) onShowToast(`Generated Tax Invoice for Payment ${record.id}`);
                            }}
                            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/20 text-neutral-300 transition-all cursor-pointer"
                            title="Download Tax Invoice"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        </div>
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
            Showing <strong className="text-white">{filteredPayments.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to{' '}
            <strong className="text-white">{Math.min(currentPage * itemsPerPage, filteredPayments.length)}</strong> of{' '}
            <strong className="text-white">{filteredPayments.length}</strong> financial records
          </div>

          <div className="flex items-center gap-2 font-mono">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-white font-bold px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="p-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* INSPECT & VERIFY PAYMENT MODAL */}
      <AnimatePresence>
        {inspectPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div
              className="w-full max-w-2xl rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL CLOSE */}
              <button
                onClick={() => setInspectPayment(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>

              {/* MODAL HEADER */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>MANUAL FINANCIAL AUDIT WORKSPACE</span>
                </div>
                <h2 className="font-poppins font-black text-xl text-white">
                  Payment Audit: {inspectPayment.id}
                </h2>
                <p className="text-xs text-neutral-400">
                  Associated Order: <span className="text-[#E5C158] font-mono font-bold">{inspectPayment.orderId}</span>
                </p>
              </div>

              {/* MODAL BODY GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* LEFT BOX: TRANSACTION DETAILS */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <h4 className="font-mono text-[11px] uppercase font-bold text-[#E5C158]">Client & Transaction info</h4>

                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-400 font-mono block">Client Name</span>
                    <strong className="text-white block font-bold text-sm">{inspectPayment.clientName}</strong>
                    <span className="text-[11px] text-neutral-400 block">{inspectPayment.clientEmail}</span>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <span className="text-[10px] text-neutral-400 font-mono block">Service Scope</span>
                    <p className="text-white font-medium">{inspectPayment.serviceName}</p>
                    <p className="text-[10px] text-neutral-400">{inspectPayment.packageName}</p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <span className="text-[10px] text-neutral-400 font-mono block">Payment Method & Account</span>
                    <div className="flex items-center gap-2">
                      {renderMethodPill(inspectPayment.paymentMethod)}
                    </div>
                    <p className="text-[11px] text-neutral-300 font-mono pt-1">{inspectPayment.accountUsed}</p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <span className="text-[10px] text-neutral-400 font-mono block">Transaction Reference ID</span>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-black/50 border border-white/10">
                      <span className="font-mono font-bold text-white">{inspectPayment.transactionRef}</span>
                      <button
                        onClick={() => copyToClipboard(inspectPayment.transactionRef, 'TRX Reference')}
                        className="p-1 text-neutral-400 hover:text-[#E5C158]"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* RIGHT BOX: PROOF SCREENSHOT PREVIEW & AUDIT */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 flex flex-col justify-between">
                  <div>
                    <h4 className="font-mono text-[11px] uppercase font-bold text-[#E5C158] flex items-center justify-between">
                      <span>Receipt Screenshot Proof</span>
                      <span className="text-[9px] text-emerald-400 font-mono">256-Bit Encrypted</span>
                    </h4>

                    {/* DUMMY PROTECTED PROOF BOX */}
                    <div className="mt-2 h-44 rounded-xl bg-gradient-to-b from-neutral-900 to-black border border-white/10 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[radial-gradient(#E5C158_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                      
                      <CreditCard className="w-8 h-8 text-[#E5C158] mb-2" />
                      <span className="text-xs font-bold text-white font-mono">
                        {inspectPayment.paymentMethod} Receipt
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono mt-1">
                        Amount: {formatMoney(inspectPayment.amountPkr)}
                      </span>
                      <span className="text-[9px] text-neutral-500 font-mono">
                        Ref: {inspectPayment.transactionRef}
                      </span>

                      <div className="mt-3 px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono text-[#E5C158] border border-[#E5C158]/30">
                        Official MFS Proof Attachment
                      </div>
                    </div>
                  </div>

                  {/* AUDIT STATUS */}
                  <div className="pt-2 border-t border-white/5 space-y-1">
                    <span className="text-[10px] text-neutral-400 font-mono block">Current Status</span>
                    <div className="flex items-center justify-between">
                      {renderStatusBadge(inspectPayment.paymentStatus)}
                      <span className="text-[10px] text-neutral-400 font-mono">{inspectPayment.paymentDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AUDIT ACTION BUTTONS ROW */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    if (onShowToast) onShowToast(`Requesting proof re-submission for payment ${inspectPayment.id}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-bold text-xs cursor-pointer"
                >
                  Request Proof Re-upload
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setPayments((prev) =>
                        prev.map((p) =>
                          p.id === inspectPayment.id
                            ? { ...p, paymentStatus: 'Rejected', verificationStatus: 'Proof Rejected' }
                            : p
                        )
                      );
                      setInspectPayment(null);
                      if (onShowToast) onShowToast(`Payment ${inspectPayment.id} marked as Rejected.`);
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 font-bold text-xs border border-rose-500/40 cursor-pointer"
                  >
                    Reject Payment Proof
                  </button>

                  <button
                    onClick={() => {
                      setPayments((prev) =>
                        prev.map((p) =>
                          p.id === inspectPayment.id
                            ? {
                                ...p,
                                paymentStatus: 'Verified',
                                verificationStatus: 'Fully Verified',
                                verifiedBy: 'Shehroz Sultan (Super Admin)'
                              }
                            : p
                        )
                      );
                      setInspectPayment(null);
                      if (onShowToast) onShowToast(`Payment ${inspectPayment.id} VERIFIED & CLEARED! Order production triggered.`);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs shadow-[0_0_15px_rgba(229,193,88,0.3)] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Mark Verified</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
        </>
      )}
    </div>
  );
};
