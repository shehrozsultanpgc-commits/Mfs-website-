import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useModalHistory } from '../hooks/useModalHistory';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Download,
  Printer,
  Send,
  Eye,
  Copy,
  Archive,
  RefreshCw,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  FileCheck2,
  Building2,
  DollarSign,
  TrendingUp,
  CreditCard,
  User,
  ShoppingBag,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet,
  X,
  Edit3,
  Receipt,
  FileMinus,
  FilePlus,
  Calendar,
  Layers,
  ArrowUpDown,
  MoreVertical,
  Check
} from 'lucide-react';
import { Currency } from '../types';

export type InvoiceType =
  | 'Standard Invoice'
  | 'Proforma Invoice'
  | 'Tax Invoice'
  | 'Payment Receipt'
  | 'Credit Note'
  | 'Debit Note';

export type InvoicePaymentStatus =
  | 'Paid'
  | 'Pending'
  | 'Partially Paid'
  | 'Overdue'
  | 'Refunded'
  | 'Cancelled';

export type InvoiceDocStatus =
  | 'Issued'
  | 'Draft'
  | 'Sent'
  | 'Archived'
  | 'Void';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPricePkr: number;
  taxPercent: number;
  totalPkr: number;
}

export interface InvoiceRecord {
  id: string; // e.g. INV-MFS-849201
  orderId: string; // e.g. ORD-MFS-849201
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany?: string;
  serviceName: string;
  packageName: string;
  invoiceType: InvoiceType;
  amountPkr: number;
  taxAmountPkr: number;
  discountPkr: number;
  grandTotalPkr: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  paymentStatus: InvoicePaymentStatus;
  docStatus: InvoiceDocStatus;
  lastUpdated: string;
  paymentMethod: string;
  lineItems: InvoiceItem[];
  termsAndNotes: string;
}

interface InvoicesFinancialCenterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
  onNavigateTab?: (tab: string) => void;
}

// Initial Authentic Dataset for Invoices
const INITIAL_INVOICES: InvoiceRecord[] = [
  {
    id: 'INV-MFS-849201',
    orderId: 'ORD-MFS-849201',
    clientName: 'Client Account',
    clientEmail: 'mfsmedia.agency@gmail.com',
    clientPhone: '+92 301 5323689',
    clientCompany: 'MFS Growth Tech',
    serviceName: 'Executive Presentation Design',
    packageName: 'Express Pitch Deck (15 Slides)',
    invoiceType: 'Tax Invoice',
    amountPkr: 50000,
    taxAmountPkr: 0,
    discountPkr: 25000, // 50% Grand Launch Promo
    grandTotalPkr: 25000,
    currency: 'PKR',
    issueDate: '2026-07-25',
    dueDate: '2026-07-28',
    paymentStatus: 'Pending',
    docStatus: 'Issued',
    lastUpdated: '15 mins ago',
    paymentMethod: 'EasyPaisa (••••1234)',
    lineItems: [
      {
        id: 'ITEM-1',
        description: 'Executive Pitch Deck Design (15 Custom Slides)',
        quantity: 1,
        unitPricePkr: 50000,
        taxPercent: 0,
        totalPkr: 50000
      },
      {
        id: 'ITEM-2',
        description: '50% Grand Launch Promotional Discount',
        quantity: 1,
        unitPricePkr: -25000,
        taxPercent: 0,
        totalPkr: -25000
      }
    ],
    termsAndNotes: 'Grand Launch Offer Applied. Payment due within 3 business days via EasyPaisa or Askari Bank.'
  },
  {
    id: 'INV-MFS-910283',
    orderId: 'ORD-MFS-910283',
    clientName: 'Dr. Tariq Mahmood',
    clientEmail: 'tariq.mahmood@nust.edu.pk',
    clientPhone: '+92 321 9876543',
    clientCompany: 'NUST University',
    serviceName: 'Academic Assignment & Paper Writing',
    packageName: 'PhD Thesis Formatting (APA 7th)',
    invoiceType: 'Standard Invoice',
    amountPkr: 37000,
    taxAmountPkr: 0,
    discountPkr: 18500,
    grandTotalPkr: 18500,
    currency: 'PKR',
    issueDate: '2026-07-24',
    dueDate: '2026-07-27',
    paymentStatus: 'Paid',
    docStatus: 'Issued',
    lastUpdated: '1 hour ago',
    paymentMethod: 'JazzCash (••••3688)',
    lineItems: [
      {
        id: 'ITEM-3',
        description: 'PhD Thesis Formatting & Reference Auditing',
        quantity: 1,
        unitPricePkr: 37000,
        taxPercent: 0,
        totalPkr: 37000
      },
      {
        id: 'ITEM-4',
        description: 'Grand Launch Promo Discount (-50%)',
        quantity: 1,
        unitPricePkr: -18500,
        taxPercent: 0,
        totalPkr: -18500
      }
    ],
    termsAndNotes: 'Paid in full via JazzCash. Receipt issued automatically.'
  },
  {
    id: 'INV-MFS-731940',
    orderId: 'ORD-MFS-731940',
    clientName: 'Ayesha Khan',
    clientEmail: 'ayesha.k@techinnovations.io',
    clientPhone: '+92 300 1234567',
    clientCompany: 'Tech Innovations Corp',
    serviceName: 'ATS Resume & Executive CV Engineering',
    packageName: 'ATS Resume + Cover Letter + LinkedIn',
    invoiceType: 'Payment Receipt',
    amountPkr: 24000,
    taxAmountPkr: 0,
    discountPkr: 12000,
    grandTotalPkr: 12000,
    currency: 'PKR',
    issueDate: '2026-07-24',
    dueDate: '2026-07-24',
    paymentStatus: 'Paid',
    docStatus: 'Sent',
    lastUpdated: '4 hours ago',
    paymentMethod: 'Askari Bank Transfer',
    lineItems: [
      {
        id: 'ITEM-5',
        description: 'Executive ATS CV Engineering Suite',
        quantity: 1,
        unitPricePkr: 24000,
        taxPercent: 0,
        totalPkr: 24000
      },
      {
        id: 'ITEM-6',
        description: '50% Off Launch Special',
        quantity: 1,
        unitPricePkr: -12000,
        taxPercent: 0,
        totalPkr: -12000
      }
    ],
    termsAndNotes: 'Official Payment Receipt for Askari Bank Online Transfer.'
  },
  {
    id: 'INV-MFS-501928',
    orderId: 'ORD-MFS-501928',
    clientName: 'David Miller',
    clientEmail: 'dmiller@globalstartups.co',
    clientPhone: '+1 415 890 1234',
    clientCompany: 'Global Startups LLC',
    serviceName: 'Investor Pitch Deck & Financial Model',
    packageName: 'Series A Pitch Deck + Forecast (USD)',
    invoiceType: 'Tax Invoice',
    amountPkr: 168000, // Equivalent to $600 base -> $300 grand total
    taxAmountPkr: 0,
    discountPkr: 84000,
    grandTotalPkr: 84000,
    currency: 'USD',
    issueDate: '2026-07-23',
    dueDate: '2026-07-26',
    paymentStatus: 'Paid',
    docStatus: 'Issued',
    lastUpdated: '1 day ago',
    paymentMethod: 'Credit Card / Stripe Int.',
    lineItems: [
      {
        id: 'ITEM-7',
        description: 'Series A Pitch Deck & Financial Forecast (USD)',
        quantity: 1,
        unitPricePkr: 168000,
        taxPercent: 0,
        totalPkr: 168000
      },
      {
        id: 'ITEM-8',
        description: 'Grand Launch Promo Discount',
        quantity: 1,
        unitPricePkr: -84000,
        taxPercent: 0,
        totalPkr: -84000
      }
    ],
    termsAndNotes: 'International Card Payment cleared through Stripe Gateway.'
  },
  {
    id: 'INV-MFS-620194',
    orderId: 'ORD-MFS-620194',
    clientName: 'Zainab Fatima',
    clientEmail: 'zainab.design@gmail.com',
    clientPhone: '+92 333 5551234',
    serviceName: 'Report & Document Formatting',
    packageName: 'Annual Corporate Impact Report (45 Pages)',
    invoiceType: 'Proforma Invoice',
    amountPkr: 64000,
    taxAmountPkr: 0,
    discountPkr: 32000,
    grandTotalPkr: 32000,
    currency: 'PKR',
    issueDate: '2026-07-20',
    dueDate: '2026-07-23',
    paymentStatus: 'Overdue',
    docStatus: 'Issued',
    lastUpdated: '2 days ago',
    paymentMethod: 'EasyPaisa',
    lineItems: [
      {
        id: 'ITEM-9',
        description: 'Annual Report Design & Layout Formatting',
        quantity: 1,
        unitPricePkr: 64000,
        taxPercent: 0,
        totalPkr: 64000
      },
      {
        id: 'ITEM-10',
        description: '50% Promo Discount',
        quantity: 1,
        unitPricePkr: -32000,
        taxPercent: 0,
        totalPkr: -32000
      }
    ],
    termsAndNotes: 'Proforma Invoice overdue. Please complete payment to resume design production.'
  },
  {
    id: 'INV-MFS-392019',
    orderId: 'ORD-MFS-392019',
    clientName: 'Hamza Farooq',
    clientEmail: 'hamza.f@enterprise.pk',
    clientPhone: '+92 345 6789012',
    clientCompany: 'Enterprise Tech PK',
    serviceName: 'Business Proposal & Grant Report',
    packageName: 'Government Tech Grant Application (30 Pages)',
    invoiceType: 'Credit Note',
    amountPkr: 45000,
    taxAmountPkr: 0,
    discountPkr: 0,
    grandTotalPkr: 45000,
    currency: 'PKR',
    issueDate: '2026-07-21',
    dueDate: '2026-07-21',
    paymentStatus: 'Refunded',
    docStatus: 'Void',
    lastUpdated: '3 days ago',
    paymentMethod: 'Askari Bank Transfer',
    lineItems: [
      {
        id: 'ITEM-11',
        description: 'Credit Note for Order Cancellation ORD-MFS-392019',
        quantity: 1,
        unitPricePkr: 45000,
        taxPercent: 0,
        totalPkr: 45000
      }
    ],
    termsAndNotes: 'Credit note issued following client cancellation approval.'
  }
];

export const InvoicesFinancialCenter: React.FC<InvoicesFinancialCenterProps> = ({
  currency,
  onShowToast,
  onNavigateTab
}) => {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(INITIAL_INVOICES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('All');
  const [docStatusFilter, setDocStatusFilter] = useState<string>('All');
  const [currencyFilter, setCurrencyFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc'>('date_desc');

  // Modals & Interactivity
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState<boolean>(false);
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);

  useModalHistory(showPreviewModal, () => setShowPreviewModal(false), 'invoicePreviewModal');
  useModalHistory(showCreateModal, () => setShowCreateModal(false), 'invoiceCreateModal');
  useModalHistory(showFiltersDrawer, () => setShowFiltersDrawer(false), 'invoiceFiltersDrawer');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // New Invoice Form State
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newServiceName, setNewServiceName] = useState('Executive Presentation Design');
  const [newInvoiceType, setNewInvoiceType] = useState<InvoiceType>('Tax Invoice');
  const [newAmountPkr, setNewAmountPkr] = useState<number>(30000);
  const [newDiscountPkr, setNewDiscountPkr] = useState<number>(15000);
  const [newDueDate, setNewDueDate] = useState<string>('2026-07-31');

  // Currency Converter
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

  // Filtered & Sorted Invoices
  const filteredInvoices = useMemo(() => {
    return invoices
      .filter((inv) => {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          inv.id.toLowerCase().includes(q) ||
          inv.orderId.toLowerCase().includes(q) ||
          inv.clientName.toLowerCase().includes(q) ||
          inv.clientEmail.toLowerCase().includes(q) ||
          inv.serviceName.toLowerCase().includes(q);

        const matchesType = typeFilter === 'All' || inv.invoiceType === typeFilter;
        const matchesPaymentStatus = paymentStatusFilter === 'All' || inv.paymentStatus === paymentStatusFilter;
        const matchesDocStatus = docStatusFilter === 'All' || inv.docStatus === docStatusFilter;
        const matchesCurrency = currencyFilter === 'All' || inv.currency === currencyFilter;

        return matchesQuery && matchesType && matchesPaymentStatus && matchesDocStatus && matchesCurrency;
      })
      .sort((a, b) => {
        if (sortBy === 'amount_desc') return b.grandTotalPkr - a.grandTotalPkr;
        if (sortBy === 'amount_asc') return a.grandTotalPkr - b.grandTotalPkr;
        if (sortBy === 'date_asc') return new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime();
        return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
      });
  }, [invoices, searchQuery, typeFilter, paymentStatusFilter, docStatusFilter, currencyFilter, sortBy]);

  // Paginated Invoices
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage) || 1;
  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredInvoices.slice(start, start + itemsPerPage);
  }, [filteredInvoices, currentPage]);

  // KPI Calculations
  const stats = useMemo(() => {
    const totalCount = invoices.length;
    const paidInvoices = invoices.filter((i) => i.paymentStatus === 'Paid');
    const pendingInvoices = invoices.filter((i) => i.paymentStatus === 'Pending');
    const overdueInvoices = invoices.filter((i) => i.paymentStatus === 'Overdue');
    const draftInvoices = invoices.filter((i) => i.docStatus === 'Draft');

    const totalRevenuePkr = paidInvoices.reduce((acc, i) => acc + i.grandTotalPkr, 0);
    const outstandingPkr = pendingInvoices
      .concat(overdueInvoices)
      .reduce((acc, i) => acc + i.grandTotalPkr, 0);

    return {
      totalCount,
      paidCount: paidInvoices.length,
      pendingCount: pendingInvoices.length,
      overdueCount: overdueInvoices.length,
      draftCount: draftInvoices.length,
      totalRevenuePkr,
      outstandingPkr
    };
  }, [invoices]);

  // Multi-select actions
  const handleSelectAll = () => {
    if (selectedIds.length === paginatedInvoices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedInvoices.map((i) => i.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Create new Invoice submit handler
  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientEmail) {
      if (onShowToast) onShowToast('Please fill in required client details');
      return;
    }

    const newId = `INV-MFS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrderId = `ORD-MFS-${Math.floor(100000 + Math.random() * 900000)}`;
    const grandTotal = Math.max(newAmountPkr - newDiscountPkr, 0);

    const createdRecord: InvoiceRecord = {
      id: newId,
      orderId: newOrderId,
      clientName: newClientName,
      clientEmail: newClientEmail,
      clientPhone: '+92 300 0000000',
      serviceName: newServiceName,
      packageName: 'Custom Agency Package (50% Launch Promo)',
      invoiceType: newInvoiceType,
      amountPkr: newAmountPkr,
      taxAmountPkr: 0,
      discountPkr: newDiscountPkr,
      grandTotalPkr: grandTotal,
      currency: 'PKR',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: newDueDate,
      paymentStatus: 'Pending',
      docStatus: 'Issued',
      lastUpdated: 'Just now',
      paymentMethod: 'EasyPaisa / Bank Transfer',
      lineItems: [
        {
          id: `ITEM-${Date.now()}`,
          description: `${newServiceName} Services`,
          quantity: 1,
          unitPricePkr: newAmountPkr,
          taxPercent: 0,
          totalPkr: newAmountPkr
        },
        {
          id: `ITEM-${Date.now() + 1}`,
          description: 'Promotional Grand Launch Discount',
          quantity: 1,
          unitPricePkr: -newDiscountPkr,
          taxPercent: 0,
          totalPkr: -newDiscountPkr
        }
      ],
      termsAndNotes: 'Created via MFS Admin Financial Management Hub. Due upon receipt.'
    };

    setInvoices([createdRecord, ...invoices]);
    setShowCreateModal(false);
    setNewClientName('');
    setNewClientEmail('');
    if (onShowToast) onShowToast(`Created new document ${newId} successfully!`);
  };

  // Payment Status Badge Generator
  const renderPaymentStatusBadge = (status: InvoicePaymentStatus) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Paid
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E5C158]/20 text-[#E5C158] font-mono text-[11px] font-bold border border-[#E5C158]/40">
            <Clock className="w-3 h-3 text-[#E5C158]" />
            Pending
          </span>
        );
      case 'Overdue':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 font-mono text-[11px] font-bold border border-rose-500/30 animate-pulse">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            Overdue
          </span>
        );
      case 'Refunded':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 font-mono text-[11px] font-bold border border-purple-500/30">
            <Receipt className="w-3 h-3 text-purple-400" />
            Refunded
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

  // Invoice Type Pill
  const renderTypePill = (type: InvoiceType) => {
    switch (type) {
      case 'Tax Invoice':
        return (
          <span className="px-2 py-0.5 rounded-lg bg-blue-950/60 text-blue-400 font-mono text-[10px] font-bold border border-blue-500/30">
            Tax Invoice
          </span>
        );
      case 'Payment Receipt':
        return (
          <span className="px-2 py-0.5 rounded-lg bg-emerald-950/60 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
            Payment Receipt
          </span>
        );
      case 'Credit Note':
        return (
          <span className="px-2 py-0.5 rounded-lg bg-purple-950/60 text-purple-400 font-mono text-[10px] font-bold border border-purple-500/30">
            Credit Note
          </span>
        );
      case 'Proforma Invoice':
        return (
          <span className="px-2 py-0.5 rounded-lg bg-amber-950/60 text-amber-400 font-mono text-[10px] font-bold border border-amber-500/30">
            Proforma
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-lg bg-white/5 text-neutral-300 font-mono text-[10px] font-bold border border-white/10">
            {type}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER & BRAND BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] border border-[#E5C158]/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Admin Dashboard v2.0 • Phase 11</span>
          </div>
          <h1 className="font-poppins font-black text-2xl lg:text-3xl text-white tracking-tight flex items-center gap-3">
            Invoices & Financial Documents
          </h1>
          <p className="text-xs text-neutral-400 max-w-2xl">
            Centralized financial document workspace to issue tax invoices, proforma statements, credit notes, payment receipts, and manage accounts receivable.
          </p>
        </div>

        {/* TOP QUICK ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(229,193,88,0.3)]"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Invoice</span>
          </button>

          <button
            onClick={() => {
              if (onShowToast) onShowToast('Exporting Financial Document Ledger (CSV / PDF report)...');
            }}
            className="px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Export Ledger</span>
          </button>
        </div>
      </div>

      {/* INVOICE KPI STATISTICAL CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1: TOTAL REVENUE */}
        <div className="p-4 rounded-2xl bg-[#0D0D12] border border-emerald-500/30 space-y-1.5 hover:border-emerald-500 transition-all shadow-lg col-span-2 sm:col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">Collected Revenue</span>
            <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="font-poppins font-black text-2xl text-white">
            {formatMoney(stats.totalRevenuePkr)}
          </div>
          <p className="text-[10px] text-neutral-400 font-mono">From {stats.paidCount} cleared invoices</p>
        </div>

        {/* KPI 2: OUTSTANDING */}
        <div className="p-4 rounded-2xl bg-[#0D0D12] border border-[#E5C158]/40 space-y-1.5 hover:border-[#E5C158] transition-all shadow-lg col-span-2 sm:col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-mono font-bold uppercase text-[#E5C158]">Outstanding Balance</span>
            <div className="p-1.5 rounded-xl bg-[#E5C158]/20 text-[#E5C158]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-poppins font-black text-2xl text-[#E5C158]">
            {formatMoney(stats.outstandingPkr)}
          </div>
          <p className="text-[10px] text-neutral-400 font-mono">{stats.pendingCount} Pending • {stats.overdueCount} Overdue</p>
        </div>

        {/* KPI 3: PAID COUNT */}
        <div className="p-4 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-1 hover:border-white/20 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block">Paid Invoices</span>
          <div className="font-poppins font-black text-xl text-emerald-400">{stats.paidCount}</div>
          <span className="text-[10px] text-neutral-500 font-mono">100% Cleared</span>
        </div>

        {/* KPI 4: OVERDUE COUNT */}
        <div className="p-4 rounded-2xl bg-[#0D0D12] border border-rose-500/30 space-y-1 hover:border-rose-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-rose-400 block">Overdue Invoices</span>
          <div className="font-poppins font-black text-xl text-rose-400">{stats.overdueCount}</div>
          <span className="text-[10px] text-neutral-500 font-mono">Requires Followup</span>
        </div>
      </div>

      {/* TOOLBAR: SEARCH & ADVANCED FILTERS */}
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
              placeholder="Search by Invoice ID, Order ID, Client Name, Email, or Service..."
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
            {/* TYPE FILTER */}
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#E5C158] cursor-pointer"
            >
              <option value="All" className="bg-[#0D0D12]">All Document Types</option>
              <option value="Tax Invoice" className="bg-[#0D0D12]">Tax Invoice</option>
              <option value="Standard Invoice" className="bg-[#0D0D12]">Standard Invoice</option>
              <option value="Proforma Invoice" className="bg-[#0D0D12]">Proforma Invoice</option>
              <option value="Payment Receipt" className="bg-[#0D0D12]">Payment Receipt</option>
              <option value="Credit Note" className="bg-[#0D0D12]">Credit Note</option>
            </select>

            {/* PAYMENT STATUS FILTER */}
            <select
              value={paymentStatusFilter}
              onChange={(e) => {
                setPaymentStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#E5C158] cursor-pointer"
            >
              <option value="All" className="bg-[#0D0D12]">All Payment Statuses</option>
              <option value="Paid" className="bg-[#0D0D12]">Paid</option>
              <option value="Pending" className="bg-[#0D0D12]">Pending</option>
              <option value="Overdue" className="bg-[#0D0D12]">Overdue</option>
              <option value="Refunded" className="bg-[#0D0D12]">Refunded</option>
            </select>

            {/* ADVANCED TOGGLE */}
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

        {/* EXPANDABLE ADVANCED FILTER DRAWER */}
        <AnimatePresence>
          {showFiltersDrawer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 pt-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {/* DOCUMENT STATUS FILTER */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block font-bold">Document Status</label>
                  <select
                    value={docStatusFilter}
                    onChange={(e) => setDocStatusFilter(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-[#E5C158]"
                  >
                    <option value="All" className="bg-[#0D0D12]">All Doc Statuses</option>
                    <option value="Issued" className="bg-[#0D0D12]">Issued</option>
                    <option value="Draft" className="bg-[#0D0D12]">Draft</option>
                    <option value="Sent" className="bg-[#0D0D12]">Sent</option>
                    <option value="Archived" className="bg-[#0D0D12]">Archived</option>
                    <option value="Void" className="bg-[#0D0D12]">Void</option>
                  </select>
                </div>

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
                    <option value="GBP" className="bg-[#0D0D12]">GBP (British Pound)</option>
                    <option value="EUR" className="bg-[#0D0D12]">EUR (Euro)</option>
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
                    <option value="date_desc" className="bg-[#0D0D12]">Newest Issue Date</option>
                    <option value="date_asc" className="bg-[#0D0D12]">Oldest Issue Date</option>
                    <option value="amount_desc" className="bg-[#0D0D12]">Highest Amount</option>
                    <option value="amount_asc" className="bg-[#0D0D12]">Lowest Amount</option>
                  </select>
                </div>

                {/* CLEAR FILTERS */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setTypeFilter('All');
                      setPaymentStatusFilter('All');
                      setDocStatusFilter('All');
                      setCurrencyFilter('All');
                      setSortBy('date_desc');
                      setCurrentPage(1);
                      if (onShowToast) onShowToast('All invoice search filters reset');
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

      {/* BULK ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/40 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs text-white font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-ping" />
            <span>{selectedIds.length} Invoice(s) Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onShowToast) onShowToast(`Sent email reminder to clients for ${selectedIds.length} selected invoices`);
                setSelectedIds([]);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs flex items-center gap-1.5 hover:bg-[#fce888] transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Email Reminders</span>
            </button>

            <button
              onClick={() => {
                if (onShowToast) onShowToast(`Exported ${selectedIds.length} invoices to PDF bundle`);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
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

      {/* INVOICE TABLE */}
      <div className="p-1 rounded-3xl bg-[#0D0D12] border border-white/10 shadow-2xl overflow-hidden">
        {filteredInvoices.length === 0 ? (
          /* EMPTY STATE */
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 text-neutral-500 flex items-center justify-center mx-auto border border-white/10">
              <FileText className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-poppins font-bold text-white text-lg">No Financial Documents Found</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                No invoice matches your active filter query. Try creating a new invoice or resetting filters.
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] transition-all cursor-pointer"
            >
              Create First Invoice
            </button>
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
                      checked={selectedIds.length === paginatedInvoices.length && paginatedInvoices.length > 0}
                      onChange={handleSelectAll}
                      className="rounded accent-[#E5C158] cursor-pointer"
                    />
                  </th>
                  <th className="p-4">Invoice & Order ID</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Service Scope</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Payment Status</th>
                  <th className="p-4">Doc Status</th>
                  <th className="p-4">Issue / Due Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-neutral-300">
                {paginatedInvoices.map((inv) => {
                  const isSelected = selectedIds.includes(inv.id);
                  return (
                    <tr
                      key={inv.id}
                      className={`hover:bg-white/[0.03] transition-colors ${
                        isSelected ? 'bg-[#E5C158]/5' : ''
                      }`}
                    >
                      {/* CHECKBOX */}
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(inv.id)}
                          className="rounded accent-[#E5C158] cursor-pointer"
                        />
                      </td>

                      {/* INVOICE ID & ORDER ID */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-white text-xs">{inv.id}</span>
                            <button
                              onClick={() => copyToClipboard(inv.id, 'Invoice ID')}
                              className="text-neutral-500 hover:text-[#E5C158]"
                              title="Copy Invoice ID"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-[10px] font-mono text-[#E5C158] block">
                            {inv.orderId}
                          </span>
                        </div>
                      </td>

                      {/* CLIENT */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <strong className="text-white block font-semibold">{inv.clientName}</strong>
                          <span className="text-[10px] text-neutral-400 block font-mono">{inv.clientEmail}</span>
                        </div>
                      </td>

                      {/* TYPE */}
                      <td className="p-4">
                        {renderTypePill(inv.invoiceType)}
                      </td>

                      {/* SERVICE */}
                      <td className="p-4 max-w-xs">
                        <div className="space-y-0.5 truncate">
                          <span className="text-white font-medium block truncate">{inv.serviceName}</span>
                          <span className="text-[10px] text-neutral-400 block truncate">{inv.packageName}</span>
                        </div>
                      </td>

                      {/* AMOUNT */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <strong className="font-poppins font-black text-white text-sm">
                            {formatMoney(inv.grandTotalPkr)}
                          </strong>
                          {inv.discountPkr > 0 && (
                            <span className="text-[9px] text-[#E5C158] font-mono block">
                              Discount: -{formatMoney(inv.discountPkr)}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* PAYMENT STATUS */}
                      <td className="p-4">
                        {renderPaymentStatusBadge(inv.paymentStatus)}
                      </td>

                      {/* DOC STATUS */}
                      <td className="p-4">
                        <span className="font-mono text-[11px] text-neutral-300 font-bold bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                          {inv.docStatus}
                        </span>
                      </td>

                      {/* DATES */}
                      <td className="p-4">
                        <div className="space-y-0.5 font-mono text-[10px] text-neutral-400">
                          <div>Issued: <span className="text-white">{inv.issueDate}</span></div>
                          <div>Due: <span className="text-rose-400">{inv.dueDate}</span></div>
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedInvoice(inv);
                              setShowPreviewModal(true);
                            }}
                            className="p-1.5 rounded-xl bg-white/5 hover:bg-[#E5C158]/20 hover:text-[#E5C158] text-neutral-300 transition-all cursor-pointer"
                            title="Preview Invoice Workspace"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (onShowToast) onShowToast(`Sending Invoice ${inv.id} to ${inv.clientEmail}...`);
                            }}
                            className="p-1.5 rounded-xl bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 text-neutral-300 transition-all cursor-pointer"
                            title="Send by Email"
                          >
                            <Send className="w-4 h-4" />
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
            Showing <strong className="text-white">{filteredInvoices.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to{' '}
            <strong className="text-white">{Math.min(currentPage * itemsPerPage, filteredInvoices.length)}</strong> of{' '}
            <strong className="text-white">{filteredInvoices.length}</strong> financial documents
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

      {/* MODAL 1: PREVIEW INVOICE WORKSPACE */}
      <AnimatePresence>
        {showPreviewModal && selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] overflow-y-auto">
            <div
              className="w-full max-w-3xl rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 p-5 md:p-8 space-y-6 shadow-2xl relative max-h-[calc(100dvh-1.5rem)] overflow-y-auto my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setShowPreviewModal(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-white/10 text-neutral-400 hover:text-white cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* DOCUMENT PREVIEW TOOLBAR */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#E5C158]" />
                  <span className="font-poppins font-black text-xl text-white">{selectedInvoice.id}</span>
                  {renderTypePill(selectedInvoice.invoiceType)}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onShowToast) onShowToast(`Printing document ${selectedInvoice.id}...`);
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white cursor-pointer"
                    title="Print Document"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (onShowToast) onShowToast(`Downloading PDF for ${selectedInvoice.id}...`);
                    }}
                    className="px-3 py-2 rounded-xl bg-[#E5C158] text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* OFFICIAL INVOICE PREVIEW CANVAS */}
              <div className="p-6 md:p-8 rounded-2xl bg-[#050507] border border-white/10 space-y-8 font-sans">
                {/* AGENCY BRANDING & HEADER */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-white/10 pb-6">
                  <div className="space-y-1">
                    <div className="font-poppins font-black text-2xl text-white tracking-wider">
                      MFS <span className="text-[#E5C158]">GROWTH</span> AGENCY
                    </div>
                    <p className="text-xs text-neutral-400">High-Quality Online Digital Solutions</p>
                    <p className="text-[11px] font-mono text-neutral-500">24/7 Support Desk</p>
                    <p className="text-[11px] font-mono text-neutral-500">Email: mfsmedia.agency@gmail.com</p>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <h2 className="font-poppins font-black text-xl text-[#E5C158] uppercase">
                      {selectedInvoice.invoiceType}
                    </h2>
                    <div className="font-mono text-xs text-white font-bold">{selectedInvoice.id}</div>
                    <div className="text-[11px] font-mono text-neutral-400">Issue Date: {selectedInvoice.issueDate}</div>
                    <div className="text-[11px] font-mono text-rose-400">Due Date: {selectedInvoice.dueDate}</div>
                  </div>
                </div>

                {/* CLIENT BILLING TO INFO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#E5C158] font-bold block">Billed To Client:</span>
                    <strong className="text-white block font-bold text-sm">{selectedInvoice.clientName}</strong>
                    {selectedInvoice.clientCompany && <p className="text-neutral-300">{selectedInvoice.clientCompany}</p>}
                    <p className="text-neutral-400 font-mono">{selectedInvoice.clientEmail}</p>
                    <p className="text-neutral-400 font-mono">{selectedInvoice.clientPhone}</p>
                  </div>

                  <div className="space-y-1.5 sm:text-right">
                    <span className="text-[10px] font-mono uppercase text-[#E5C158] font-bold block">Payment Reference:</span>
                    <p className="text-white font-bold">{selectedInvoice.paymentMethod}</p>
                    <div className="pt-1">{renderPaymentStatusBadge(selectedInvoice.paymentStatus)}</div>
                  </div>
                </div>

                {/* LINE ITEMS TABLE */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-mono uppercase text-neutral-400 font-bold">Line Items Summary</h4>
                  <div className="overflow-x-auto border border-white/10 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-neutral-400 font-mono text-[10px] uppercase">
                          <th className="p-3">Description</th>
                          <th className="p-3 text-center">Qty</th>
                          <th className="p-3 text-right">Unit Price</th>
                          <th className="p-3 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-neutral-300 font-mono">
                        {selectedInvoice.lineItems.map((item) => (
                          <tr key={item.id}>
                            <td className="p-3 font-sans text-white font-medium">{item.description}</td>
                            <td className="p-3 text-center">{item.quantity}</td>
                            <td className="p-3 text-right">{formatMoney(item.unitPricePkr)}</td>
                            <td className="p-3 text-right font-bold text-white">{formatMoney(item.totalPkr)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* BILLING TOTALS BREAKDOWN */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-t border-white/10 pt-4 text-xs">
                  <div className="space-y-1 max-w-sm">
                    <span className="text-[10px] font-mono text-[#E5C158] uppercase font-bold block">Terms & Agency Notes</span>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">{selectedInvoice.termsAndNotes}</p>
                  </div>

                  <div className="w-full sm:w-64 space-y-2 font-mono text-xs text-right bg-white/[0.02] p-4 rounded-xl border border-white/10">
                    <div className="flex justify-between text-neutral-400">
                      <span>Subtotal:</span>
                      <span>{formatMoney(selectedInvoice.amountPkr)}</span>
                    </div>
                    {selectedInvoice.discountPkr > 0 && (
                      <div className="flex justify-between text-[#E5C158]">
                        <span>Launch Promo (-50%):</span>
                        <span>-{formatMoney(selectedInvoice.discountPkr)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white font-poppins font-black text-sm pt-2 border-t border-white/10">
                      <span className="text-[#E5C158]">Grand Total:</span>
                      <span>{formatMoney(selectedInvoice.grandTotalPkr)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: CREATE NEW INVOICE FORM */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] overflow-y-auto">
            <div
              className="w-full max-w-lg rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 p-5 sm:p-6 space-y-5 shadow-2xl relative my-auto max-h-[calc(100dvh-1.5rem)] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl bg-white/10 text-neutral-400 hover:text-white cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30">
                  <Plus className="w-3.5 h-3.5" />
                  <span>NEW FINANCIAL DOCUMENT</span>
                </div>
                <h3 className="font-poppins font-black text-xl text-white">Issue New Agency Invoice</h3>
              </div>

              <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block font-bold">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. Shehroz Sultan"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 block font-bold">Client Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    placeholder="e.g. client@example.com"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 block font-bold">Document Type</label>
                    <select
                      value={newInvoiceType}
                      onChange={(e) => setNewInvoiceType(e.target.value as any)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E5C158]"
                    >
                      <option value="Tax Invoice" className="bg-[#0D0D12]">Tax Invoice</option>
                      <option value="Standard Invoice" className="bg-[#0D0D12]">Standard Invoice</option>
                      <option value="Proforma Invoice" className="bg-[#0D0D12]">Proforma Invoice</option>
                      <option value="Payment Receipt" className="bg-[#0D0D12]">Payment Receipt</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 block font-bold">Due Date</label>
                    <input
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 block font-bold">Base Price (PKR)</label>
                    <input
                      type="number"
                      value={newAmountPkr}
                      onChange={(e) => setNewAmountPkr(Number(e.target.value))}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 block font-bold">Promo Discount (PKR)</label>
                    <input
                      type="number"
                      value={newDiscountPkr}
                      onChange={(e) => setNewDiscountPkr(Number(e.target.value))}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex justify-between items-center font-mono">
                  <span className="text-neutral-400">Grand Total Payable:</span>
                  <strong className="text-[#E5C158] font-bold text-sm">
                    {formatMoney(Math.max(newAmountPkr - newDiscountPkr, 0))}
                  </strong>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-bold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs cursor-pointer"
                  >
                    Issue Document
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
