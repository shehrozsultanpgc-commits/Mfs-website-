import React, { useState } from 'react';
import { Currency } from '../types';
import {
  CreditCard,
  Receipt,
  FileText,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Printer,
  Search,
  ShieldCheck,
  Building2,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Filter,
  X,
  ExternalLink,
  Copy,
  Check,
  Lock,
  Wallet,
  Landmark,
  ArrowRight,
  SlidersHorizontal,
  BadgeCheck
} from 'lucide-react';

interface BillingPaymentsCenterProps {
  currency: Currency;
  customerName?: string;
  customerEmail?: string;
  clientId?: string;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (
    page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard',
    targetSection?: string
  ) => void;
  setActiveTab?: (tab: string) => void;
}

export interface InvoiceRecord {
  id: string;
  invoiceNo: string;
  orderId: string;
  projectRef: string;
  serviceName: string;
  issueDate: string;
  dueDate: string;
  paidDate: string;
  amountPKR: number;
  discountApplied: string;
  paymentMethod: 'EasyPaisa' | 'JazzCash' | 'Bank Transfer';
  accountTitle: string;
  accountNumber: string;
  transactionRef: string;
  status: 'Paid' | 'Pending Verification' | 'Overdue';
  items: { description: string; qty: number; ratePKR: number; totalPKR: number }[];
}

export const BillingPaymentsCenter: React.FC<BillingPaymentsCenterProps> = ({
  currency,
  customerName = 'Muhammad Shehroz Sultan',
  customerEmail = 'mfsmedia.agency@gmail.com',
  clientId = 'CLI-MFS-98421',
  onShowToast,
  onNavigatePage,
  setActiveTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'invoices' | 'receipts' | 'methods'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending Verification'>('All');
  
  // Modals
  const [selectedInvoiceModal, setSelectedInvoiceModal] = useState<InvoiceRecord | null>(null);
  const [selectedReceiptModal, setSelectedReceiptModal] = useState<InvoiceRecord | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  // Currency Converter helper
  const formatCurrency = (amountPKR: number) => {
    switch (currency) {
      case 'USD':
        return `$${(amountPKR / 280).toFixed(2)}`;
      case 'GBP':
        return `£${(amountPKR / 355).toFixed(2)}`;
      case 'EUR':
        return `€${(amountPKR / 300).toFixed(2)}`;
      case 'AED':
        return `AED ${(amountPKR / 76).toFixed(2)}`;
      default:
        return `PKR ${amountPKR.toLocaleString()}`;
    }
  };

  // Authentic Invoice & Payment Data (Strictly from PRJ-MFS-849201 / ORD-MFS-984210)
  const [invoices] = useState<InvoiceRecord[]>([
    {
      id: 'inv-1',
      invoiceNo: 'INV-849201',
      orderId: 'ORD-MFS-984210',
      projectRef: 'PRJ-MFS-849201',
      serviceName: 'Executive Pitch Deck Presentation (10 Slides)',
      issueDate: 'Yesterday • 04:30 PM',
      dueDate: 'Paid on Issue',
      paidDate: 'Yesterday • 04:30 PM',
      amountPKR: 2500,
      discountApplied: '50% Grand Launch Promo (-PKR 2,500)',
      paymentMethod: 'EasyPaisa',
      accountTitle: 'Muhammad Shehroz Sultan',
      accountNumber: '03116191234',
      transactionRef: 'TRX-984210-EP-842',
      status: 'Paid',
      items: [
        {
          description: 'Executive Pitch Deck Presentation Design (10 Slides - High-Impact Visuals)',
          qty: 1,
          ratePKR: 5000,
          totalPKR: 5000,
        },
        {
          description: '50% Grand Launch Discount (Active Promo)',
          qty: 1,
          ratePKR: -2500,
          totalPKR: -2500,
        },
      ],
    },
  ]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    if (onShowToast) onShowToast(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (statusFilter !== 'All' && inv.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchInv = inv.invoiceNo.toLowerCase().includes(q);
      const matchOrd = inv.orderId.toLowerCase().includes(q);
      const matchService = inv.serviceName.toLowerCase().includes(q);
      const matchTrx = inv.transactionRef.toLowerCase().includes(q);
      if (!matchInv && !matchOrd && !matchService && !matchTrx) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER BANNER */}
      <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(229,193,88,0.12)]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center shrink-0">
            <CreditCard className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#28C76F]" />
                <span>OFFICIAL BILLING & INVOICE LEDGER</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                {clientId}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-poppins font-bold text-white tracking-tight">
              Billing, Payments & Invoices
            </h1>
            <p className="text-xs text-neutral-300">
              Verified financial statements, tax receipts, and direct payment accounts for MFS Growth Agency orders.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (invoices.length > 0) setSelectedInvoiceModal(invoices[0]);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)] flex items-center gap-2"
          >
            <Receipt className="w-4 h-4 fill-black" />
            <span>Latest Invoice #INV-849201</span>
          </button>

          <button
            onClick={() => setShowRoadmapModal(true)}
            className="px-3 py-2.5 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/40 text-[#28C76F] font-bold text-xs hover:bg-[#28C76F]/20 transition-all cursor-pointer flex items-center gap-1"
          >
            <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
            <span>Phase 8 Complete</span>
          </button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Paid', value: formatCurrency(2500), sub: 'INV-849201 settled', icon: CheckCircle2, color: 'text-[#28C76F]' },
          { label: 'Outstanding Balance', value: formatCurrency(0), sub: 'Zero due amount', icon: ShieldCheck, color: 'text-blue-400' },
          { label: 'Active Discounts', value: '50% OFF', sub: 'Grand Launch Offer', icon: Sparkles, color: 'text-[#E5C158]' },
          { label: 'Verified Accounts', value: '3 Methods', sub: 'EasyPaisa / JazzCash / Bank', icon: Landmark, color: 'text-purple-400' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 bg-black/60 relative overflow-hidden">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 font-medium text-[11px]">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-xl sm:text-2xl font-poppins font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <span className="text-[10px] text-neutral-400 font-mono block">{stat.sub}</span>
            </div>
          );
        })}
      </div>

      {/* TAB NAVIGATION & SEARCH BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-4 space-y-4 bg-black/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Subtabs */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl p-1 overflow-x-auto scrollbar-none">
            {[
              { id: 'overview', label: 'Payment Ledger', icon: Receipt },
              { id: 'invoices', label: 'Official Invoices', icon: FileText },
              { id: 'receipts', label: 'Tax Receipts', icon: CheckCircle2 },
              { id: 'methods', label: 'MFS Payment Accounts', icon: Landmark },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeSubTab === tab.id
                      ? 'bg-[#E5C158] text-black shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search invoice # or TRX ref..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
          </div>

        </div>
      </div>

      {/* SUBTAB CONTENT 1: PAYMENT LEDGER / TRANSACTION HISTORY */}
      {activeSubTab === 'overview' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-black/80">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-poppins font-bold text-white text-base">Verified Payment History</h3>
              <p className="text-xs text-neutral-400">All financial settlements processed by MFS Growth Accounts Desk.</p>
            </div>
            <span className="text-[10px] font-mono text-[#28C76F] bg-[#28C76F]/10 px-2.5 py-1 rounded-full border border-[#28C76F]/30 font-bold">
              100% CLEAR BALANCE
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead>
                <tr className="border-b border-white/10 text-[10px] text-neutral-400 font-mono uppercase">
                  <th className="p-3">Invoice & Order</th>
                  <th className="p-3">Service Description</th>
                  <th className="p-3">Payment Method</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3 font-mono">
                      <strong className="text-white block hover:text-[#E5C158] cursor-pointer" onClick={() => setSelectedInvoiceModal(inv)}>
                        {inv.invoiceNo}
                      </strong>
                      <span className="text-[10px] text-neutral-400">{inv.orderId}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-medium text-white block">{inv.serviceName}</span>
                      <span className="text-[10px] text-[#E5C158]">{inv.discountApplied}</span>
                    </td>
                    <td className="p-3 font-medium text-neutral-200">
                      <div className="flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-[#E5C158]" />
                        <span>{inv.paymentMethod}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono block">{inv.transactionRef}</span>
                    </td>
                    <td className="p-3 text-neutral-400">{inv.paidDate}</td>
                    <td className="p-3 font-bold font-mono text-[#28C76F]">
                      {formatCurrency(inv.amountPKR)}
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Paid & Verified</span>
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedInvoiceModal(inv)}
                          className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 text-[11px] font-semibold cursor-pointer flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#E5C158]" />
                          <span>Invoice</span>
                        </button>
                        <button
                          onClick={() => setSelectedReceiptModal(inv)}
                          className="px-2.5 py-1.5 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 text-[#28C76F] text-[11px] font-semibold cursor-pointer hover:bg-[#28C76F]/20 flex items-center gap-1"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB CONTENT 2: INVOICES */}
      {activeSubTab === 'invoices' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredInvoices.map((inv) => (
            <div key={inv.id} className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 space-y-4 bg-black/80 relative overflow-hidden shadow-lg hover:border-[#E5C158] transition-all">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold">
                    OFFICIAL TAX INVOICE
                  </span>
                  <h3 className="font-poppins font-bold text-white text-lg">{inv.invoiceNo}</h3>
                  <p className="text-xs text-neutral-400 font-mono">{inv.orderId} • {inv.projectRef}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-poppins font-bold text-[#28C76F] block">{formatCurrency(inv.amountPKR)}</span>
                  <span className="text-[10px] text-[#E5C158] font-bold">50% GRAND LAUNCH OFF</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Billed To:</span>
                  <span className="text-white font-medium">{customerName}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Issue Date:</span>
                  <span className="text-white">{inv.issueDate}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Settlement:</span>
                  <span className="text-[#28C76F] font-bold">{inv.paymentMethod} ({inv.transactionRef})</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setSelectedInvoiceModal(inv)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs hover:brightness-110 cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4 fill-black" />
                  <span>View Printable Tax Invoice</span>
                </button>

                <button
                  onClick={() => {
                    if (onShowToast) onShowToast(`PDF download for ${inv.invoiceNo} triggered.`);
                  }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white cursor-pointer"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB CONTENT 3: TAX RECEIPTS */}
      {activeSubTab === 'receipts' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredInvoices.map((inv) => (
            <div key={inv.id} className="glass-card rounded-3xl border border-[#28C76F]/30 p-6 space-y-4 bg-black/80 relative overflow-hidden shadow-lg">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold flex items-center gap-1 w-fit">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VERIFIED PAYMENT RECEIPT</span>
                  </span>
                  <h3 className="font-poppins font-bold text-white text-lg">Receipt #{inv.invoiceNo.replace('INV', 'RCP')}</h3>
                  <p className="text-xs text-neutral-400 font-mono">{inv.paymentMethod} Ref: {inv.transactionRef}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-poppins font-bold text-[#28C76F]">{formatCurrency(inv.amountPKR)}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Paid By:</span>
                  <span className="text-white">{customerName}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Recipient Account:</span>
                  <span className="text-[#E5C158] font-mono">{inv.accountTitle} ({inv.accountNumber})</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Settlement Status:</span>
                  <span className="text-[#28C76F] font-bold">Verification Passed</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedReceiptModal(inv)}
                className="w-full py-2.5 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/40 text-[#28C76F] font-bold text-xs hover:bg-[#28C76F]/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Receipt className="w-4 h-4" />
                <span>View Full Payment Receipt</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB CONTENT 4: MFS APPROVED PAYMENT ACCOUNTS (STRICTLY DOCUMENT 0-6) */}
      {activeSubTab === 'methods' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 bg-gradient-to-br from-black via-[#0F0F0F] to-black space-y-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="p-3 rounded-2xl bg-[#E5C158]/10 text-[#E5C158]">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-white text-base">Official MFS Growth Agency Payment Accounts</h3>
                <p className="text-xs text-neutral-300">
                  Strictly use these verified accounts for settling project invoices. Upload screenshot proof after transfer.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              
              {/* EasyPaisa Card */}
              <div className="p-5 rounded-2xl bg-black border border-white/10 space-y-3 relative hover:border-[#E5C158]/50 transition-all">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold">
                    EASYPAISA (INSTANT)
                  </span>
                  <Wallet className="w-5 h-5 text-[#28C76F]" />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono block">ACCOUNT TITLE</span>
                  <strong className="text-white text-sm font-poppins">Muhammad Shehroz Sultan</strong>
                </div>
                <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="text-[#E5C158] font-mono font-bold text-sm">03116191234</span>
                  <button
                    onClick={() => handleCopy('03116191234', 'EasyPaisa Number')}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  >
                    {copiedField === 'EasyPaisa Number' ? <Check className="w-3.5 h-3.5 text-[#28C76F]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* JazzCash Card */}
              <div className="p-5 rounded-2xl bg-black border border-white/10 space-y-3 relative hover:border-[#E5C158]/50 transition-all">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-400/10 text-orange-400 border border-orange-400/30 text-[10px] font-bold">
                    JAZZCASH (INSTANT)
                  </span>
                  <Wallet className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono block">ACCOUNT TITLE</span>
                  <strong className="text-white text-sm font-poppins">Muhammad Shehroz Sultan</strong>
                </div>
                <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="text-[#E5C158] font-mono font-bold text-sm">03015323688</span>
                  <button
                    onClick={() => handleCopy('03015323688', 'JazzCash Number')}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  >
                    {copiedField === 'JazzCash Number' ? <Check className="w-3.5 h-3.5 text-[#28C76F]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Bank Transfer Card */}
              <div className="p-5 rounded-2xl bg-black border border-white/10 space-y-3 relative hover:border-[#E5C158]/50 transition-all">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/30 text-[10px] font-bold">
                    ASKARI BANK LIMITED
                  </span>
                  <Building2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono block">ACCOUNT TITLE</span>
                  <strong className="text-white text-xs font-poppins">Muhammad Shehroz Sultan</strong>
                </div>
                <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="text-[#E5C158] font-mono font-bold text-xs">00553230017265</span>
                  <button
                    onClick={() => handleCopy('00553230017265', 'Bank Account Number')}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  >
                    {copiedField === 'Bank Account Number' ? <Check className="w-3.5 h-3.5 text-[#28C76F]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE INVOICE MODAL */}
      {selectedInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl border border-[#E5C158]/40 p-6 sm:p-8 max-w-2xl w-full space-y-6 bg-[#050507] relative shadow-2xl">
            
            {/* Modal Top Actions */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#E5C158]" />
                <h3 className="font-poppins font-bold text-white text-base">Tax Invoice {selectedInvoiceModal.invoiceNo}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs hover:bg-white/20 cursor-pointer flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceModal(null)}
                  className="text-neutral-400 hover:text-white p-1 rounded-lg bg-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* INVOICE BILLING SHEET */}
            <div className="p-6 rounded-2xl bg-black border border-white/10 space-y-6 text-xs font-sans">
              
              {/* Agency Branding & Info */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-white/10 pb-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-poppins font-bold text-white tracking-wider">MFS GROWTH AGENCY</h2>
                  <p className="text-neutral-400 text-[11px]">Online Digital Services Agency</p>
                  <p className="text-neutral-400 text-[11px]">Email: mfsmedia.agency@gmail.com | Phone: +92 301 5323689</p>
                </div>
                <div className="text-left sm:text-right space-y-1">
                  <span className="px-3 py-1 rounded-full bg-[#28C76F]/20 text-[#28C76F] border border-[#28C76F]/40 font-bold text-[10px] inline-block">
                    VERIFIED & PAID
                  </span>
                  <div className="text-xs text-neutral-300 font-mono mt-1">Date: {selectedInvoiceModal.paidDate}</div>
                </div>
              </div>

              {/* Billed To */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">BILLED TO</span>
                  <strong className="text-white text-sm block">{customerName}</strong>
                  <span className="text-neutral-400 text-[11px] block">{customerEmail}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">ORDER & PROJECT</span>
                  <strong className="text-[#E5C158] font-mono block">{selectedInvoiceModal.orderId}</strong>
                  <span className="text-neutral-400 font-mono text-[11px] block">{selectedInvoiceModal.projectRef}</span>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-[10px] text-neutral-400 font-mono">
                    <tr>
                      <th className="p-2.5">Item Description</th>
                      <th className="p-2.5 text-center">Qty</th>
                      <th className="p-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {selectedInvoiceModal.items.map((item, i) => (
                      <tr key={i}>
                        <td className="p-2.5 text-neutral-200">{item.description}</td>
                        <td className="p-2.5 text-center font-mono text-neutral-400">{item.qty}</td>
                        <td className="p-2.5 text-right font-mono text-white">{formatCurrency(item.totalPKR)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Settlement */}
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-xs text-neutral-400">Paid via {selectedInvoiceModal.paymentMethod} (Ref: {selectedInvoiceModal.transactionRef})</span>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 uppercase block">TOTAL SETTLED</span>
                  <strong className="text-xl font-poppins font-bold text-[#28C76F]">{formatCurrency(selectedInvoiceModal.amountPKR)}</strong>
                </div>
              </div>

            </div>

            <button
              onClick={() => setSelectedInvoiceModal(null)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
            >
              Close Invoice
            </button>
          </div>
        </div>
      )}

      {/* RECEIPT MODAL */}
      {selectedReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl border border-[#28C76F]/40 p-6 max-w-md w-full space-y-5 bg-[#050507] relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#28C76F]" />
                <h3 className="font-poppins font-bold text-white text-sm">Official Payment Receipt</h3>
              </div>
              <button onClick={() => setSelectedReceiptModal(null)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-3 text-xs">
              <div className="text-center space-y-1 pb-3 border-b border-white/10">
                <CheckCircle2 className="w-10 h-10 text-[#28C76F] mx-auto" />
                <h4 className="font-poppins font-bold text-white text-base">Payment Verified</h4>
                <p className="text-neutral-400 text-[11px]">{selectedReceiptModal.paidDate}</p>
              </div>

              <div className="space-y-1.5 text-neutral-300 text-[11px]">
                <div className="flex justify-between"><span>Amount Received:</span><strong className="text-[#28C76F]">{formatCurrency(selectedReceiptModal.amountPKR)}</strong></div>
                <div className="flex justify-between"><span>Payment Method:</span><span className="text-white">{selectedReceiptModal.paymentMethod}</span></div>
                <div className="flex justify-between"><span>Account Number:</span><span className="text-[#E5C158] font-mono">{selectedReceiptModal.accountNumber}</span></div>
                <div className="flex justify-between"><span>TRX Ref ID:</span><span className="text-neutral-300 font-mono">{selectedReceiptModal.transactionRef}</span></div>
                <div className="flex justify-between"><span>Order Reference:</span><span className="text-white font-mono">{selectedReceiptModal.orderId}</span></div>
              </div>
            </div>

            <button
              onClick={() => setSelectedReceiptModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#28C76F] text-black font-bold text-xs hover:brightness-110 cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* PHASE 8 ROADMAP CHECKLIST MODAL */}
      {showRoadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl border border-[#E5C158]/40 p-6 sm:p-8 max-w-2xl w-full space-y-6 bg-[#0F0F0F] relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#28C76F]/20 text-[#28C76F]">
                  <CheckCircle2 className="w-6 h-6 text-[#28C76F]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block">
                    CLIENT DASHBOARD ROADMAP COMPLETE
                  </span>
                  <h3 className="text-xl font-poppins font-bold text-white">
                    Phase 8 Completed • Billing & Invoices Center
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="text-neutral-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Complete Roadmap Checklist */}
            <div className="space-y-2 text-xs">
              {[
                { phase: 'Phase 1: Client Dashboard Core Shell', desc: 'Sidebar, header, currency switch & navigation' },
                { phase: 'Phase 2: Dashboard Home Experience', desc: 'AI Daily Briefing, metrics, quick shortcuts & activities' },
                { phase: 'Phase 3: AI Live Project Tracking', desc: 'Vertical timeline, AI health score & Cinematic Movie' },
                { phase: 'Phase 4: Project Details Center', desc: 'Project overview, brief, specs, file attachments & deliverables' },
                { phase: 'Phase 5: AI Assistant Center', desc: 'AI chat hub, document search, voice AI & multi-language support' },
                { phase: 'Phase 6: Messages & Communication Center', desc: 'Real-time chat, AI summarizer, file sharing & reaction cards' },
                { phase: 'Phase 7: Files & Documents Center', desc: 'Grid/List view, drag & drop upload, encrypted preview & version history' },
              ].map((p, idx) => (
                <div key={idx} className="p-2 bg-[#28C76F]/10 border border-[#28C76F]/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#28C76F]" />
                    <strong className="text-white text-[11px]">{p.phase}</strong>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[9px]">COMPLETED</span>
                </div>
              ))}

              <div className="p-3 rounded-2xl bg-[#28C76F]/15 border border-[#28C76F]/40 flex items-center justify-between shadow-[0_0_15px_rgba(40,199,111,0.2)]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold text-xs">Phase 8: Billing, Payments & Invoices Center</strong>
                    <span className="text-neutral-400 text-[11px]">Tax invoices, verified receipts, payment history & approved MFS account cards</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED NOW</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="w-full py-3 rounded-full bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] cursor-pointer"
              >
                Acknowledge Phase 8 Completion
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
