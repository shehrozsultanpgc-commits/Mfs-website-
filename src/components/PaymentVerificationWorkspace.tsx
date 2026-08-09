import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  AlertTriangle,
  Eye,
  Download,
  Copy,
  ExternalLink,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCw,
  FileText,
  FileCheck2,
  Building2,
  CreditCard,
  User,
  ShoppingBag,
  Calendar,
  Lock,
  Send,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  CheckSquare,
  Square,
  History,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  Trash2,
  Edit3
} from 'lucide-react';
import { Currency } from '../types';

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

export interface ProofFile {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'pdf';
  uploadDate: string;
  url: string;
  hash: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  notes: string;
  badgeType: 'verified' | 'rejected' | 'flagged' | 'info';
}

export interface DetailedPaymentRecord {
  id: string;
  orderId: string;
  invoiceId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  packageName: string;
  amountPkr: number;
  currency: string;
  paymentMethod: 'EasyPaisa' | 'JazzCash' | 'Askari Bank Transfer' | 'Credit Card / Stripe';
  transactionRef: string;
  accountUsed: string;
  paymentStatus: PaymentStatus;
  verificationStatus: VerificationStatus;
  paymentDate: string;
  verifiedBy?: string;
  lastUpdated: string;
  proofFiles: ProofFile[];
  auditHistory: AuditLogEntry[];
  adminNotes: { id: string; author: string; time: string; text: string }[];
}

interface PaymentVerificationWorkspaceProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
  onNavigateTab?: (tab: string) => void;
  selectedPaymentId?: string;
  onBackToList?: () => void;
}

// Authentic sample datasets for Verification Workspace
const WORKSPACE_PAYMENTS: DetailedPaymentRecord[] = [
  {
    id: 'PAY-MFS-849201',
    orderId: 'ORD-MFS-849201',
    invoiceId: 'INV-MFS-849201',
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
    proofFiles: [
      {
        id: 'FILE-01',
        name: 'easypaisa_receipt_trx9982410.png',
        size: '1.2 MB',
        type: 'image',
        uploadDate: '2026-07-25 10:43 AM',
        url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
        hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      },
      {
        id: 'FILE-02',
        name: 'easypaisa_sms_confirmation.png',
        size: '480 KB',
        type: 'image',
        uploadDate: '2026-07-25 10:44 AM',
        url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
        hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4'
      }
    ],
    auditHistory: [
      {
        id: 'LOG-01',
        timestamp: '2026-07-25 10:42 AM',
        adminName: 'System Gateway',
        action: 'Payment Proof Uploaded',
        notes: 'Client uploaded 2 proof screenshots for EasyPaisa TRX EP-TRX-9982410.',
        badgeType: 'info'
      },
      {
        id: 'LOG-02',
        timestamp: '2026-07-25 10:45 AM',
        adminName: 'MFS Verification AI',
        action: 'OCR Reference Match Passed',
        notes: 'TRX reference pattern valid for EasyPaisa accounts.',
        badgeType: 'verified'
      }
    ],
    adminNotes: [
      {
        id: 'NOTE-1',
        author: 'Shehroz Sultan (Super Admin)',
        time: '2026-07-25 10:50 AM',
        text: 'Client requested priority delivery after payment verification. Check EasyPaisa statement before approving.'
      }
    ]
  },
  {
    id: 'PAY-MFS-910283',
    orderId: 'ORD-MFS-910283',
    invoiceId: 'INV-MFS-910283',
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
    proofFiles: [
      {
        id: 'FILE-03',
        name: 'jazzcash_receipt_4410928.png',
        size: '890 KB',
        type: 'image',
        uploadDate: '2026-07-24 04:16 PM',
        url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80',
        hash: '7d3550b0f79624e5b32349141049c636f95d852a392ff150036d01306d15a519'
      }
    ],
    auditHistory: [
      {
        id: 'LOG-03',
        timestamp: '2026-07-24 04:15 PM',
        adminName: 'System Gateway',
        action: 'Payment Submitted',
        notes: 'JazzCash payment registered.',
        badgeType: 'info'
      },
      {
        id: 'LOG-04',
        timestamp: '2026-07-24 04:30 PM',
        adminName: 'Shehroz Sultan',
        action: 'Payment Fully Verified',
        notes: 'JazzCash credit confirmed against account log.',
        badgeType: 'verified'
      }
    ],
    adminNotes: []
  }
];

export const PaymentVerificationWorkspace: React.FC<PaymentVerificationWorkspaceProps> = ({
  currency,
  onShowToast,
  onNavigateTab,
  selectedPaymentId = 'PAY-MFS-849201',
  onBackToList
}) => {
  const [activePaymentId, setActivePaymentId] = useState<string>(selectedPaymentId);
  const [payments, setPayments] = useState<DetailedPaymentRecord[]>(WORKSPACE_PAYMENTS);

  // Active payment object
  const currentRecord = payments.find((p) => p.id === activePaymentId) || payments[0];

  // Image Viewer State
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Verification Checklist State
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    amountMatch: true,
    correctAccount: true,
    trxRefValid: true,
    screenshotReadable: true,
    noDuplicate: true,
    orderMatchConfirmed: true
  });

  // Admin Notes State
  const [newNote, setNewNote] = useState<string>('');

  // Modal / Confirmation Dialog States
  const [activeActionModal, setActiveActionModal] = useState<
    'verify' | 'reject' | 'request_proof' | 'review' | 'flag' | null
  >(null);
  const [modalReasonNote, setModalReasonNote] = useState<string>('');
  const [isSubmittingAction, setIsSubmittingAction] = useState<boolean>(false);

  // Copy helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    if (onShowToast) onShowToast(`${label} copied to clipboard!`);
  };

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

  // Toggle checklist item
  const toggleChecklistItem = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedChecklistCount = Object.values(checklist).filter(Boolean).length;
  const isAllChecklistDone = completedChecklistCount === 6;

  // Add new admin note
  const handleAddAdminNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const newNoteObj = {
      id: `NOTE-${Date.now()}`,
      author: 'Shehroz Sultan (Super Admin)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newNote.trim()
    };

    setPayments((prev) =>
      prev.map((p) =>
        p.id === currentRecord.id
          ? { ...p, adminNotes: [newNoteObj, ...p.adminNotes] }
          : p
      )
    );

    setNewNote('');
    if (onShowToast) onShowToast('Private admin note added successfully');
  };

  // Execute Verification Action
  const handleExecuteVerificationAction = (
    newStatus: PaymentStatus,
    newVerification: VerificationStatus,
    actionTitle: string,
    badgeType: 'verified' | 'rejected' | 'flagged' | 'info'
  ) => {
    setIsSubmittingAction(true);

    setTimeout(() => {
      const nowFormatted = new Date().toLocaleString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });

      const newAuditLog: AuditLogEntry = {
        id: `LOG-${Date.now()}`,
        timestamp: nowFormatted,
        adminName: 'Shehroz Sultan (Super Admin)',
        action: actionTitle,
        notes: modalReasonNote || `Action executed: ${actionTitle}`,
        badgeType
      };

      setPayments((prev) =>
        prev.map((p) =>
          p.id === currentRecord.id
            ? {
                ...p,
                paymentStatus: newStatus,
                verificationStatus: newVerification,
                verifiedBy: 'Shehroz Sultan (Super Admin)',
                lastUpdated: 'Just now',
                auditHistory: [newAuditLog, ...p.auditHistory]
              }
            : p
        )
      );

      setIsSubmittingAction(false);
      setActiveActionModal(null);
      setModalReasonNote('');

      if (onShowToast) {
        onShowToast(`Payment ${currentRecord.id} updated to ${newStatus}!`);
      }
    }, 600);
  };

  // Active Proof File
  const currentFile = currentRecord.proofFiles[selectedFileIndex] || currentRecord.proofFiles[0];

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BAR WITH PAYMENT QUEUE SWITCHER */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] border border-[#E5C158]/30 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBackToList && (
            <button
              onClick={onBackToList}
              className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
              title="Back to Payments Ledger"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 uppercase">
                Admin Dashboard v2.0 • Phase 10
              </span>
              <span className="text-xs text-neutral-400 font-mono">Payment Verification Workspace</span>
            </div>
            <h1 className="font-poppins font-black text-2xl text-white flex items-center gap-2">
              <span>Payment Workspace: {currentRecord.id}</span>
            </h1>
          </div>
        </div>

        {/* PAYMENT QUEUE SELECTOR & QUICK ACTIONS */}
        <div className="flex flex-wrap items-center gap-2.5">
          <label className="text-xs font-mono text-neutral-400 font-bold hidden sm:inline">Active Record:</label>
          <select
            value={activePaymentId}
            onChange={(e) => {
              setActivePaymentId(e.target.value);
              setSelectedFileIndex(0);
              setZoomLevel(1);
            }}
            className="bg-white/[0.05] border border-[#E5C158]/40 rounded-2xl px-3 py-2 text-xs font-mono font-bold text-[#E5C158] focus:outline-none cursor-pointer"
          >
            {payments.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#0D0D12] text-white">
                {p.id} — {p.clientName} ({p.paymentStatus})
              </option>
            ))}
          </select>

          <button
            onClick={() => copyToClipboard(currentRecord.transactionRef, 'TRX Reference')}
            className="px-3 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Copy TRX Ref</span>
          </button>

          <button
            onClick={() => {
              if (onShowToast) onShowToast(`Exporting Verification Record PDF for ${currentRecord.id}`);
            }}
            className="px-3 py-2 rounded-2xl bg-[#E5C158]/20 hover:bg-[#E5C158]/30 border border-[#E5C158]/40 text-[#E5C158] font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit Record</span>
          </button>
        </div>
      </div>

      {/* WORKSPACE MULTI-COLUMN GRID (DESKTOP: 2/3 LEFT, 1/3 RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ========================================================= */}
        {/* LEFT COLUMN: OVERVIEW, PROOF VIEWER & AUDIT HISTORY (8 COLS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* SECTION 1: PAYMENT OVERVIEW SUMMARY CARD */}
          <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-5 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                  Order & Invoice Reference
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-poppins font-black text-white text-lg">{currentRecord.id}</span>
                  <span className="text-xs font-mono text-[#E5C158] font-bold bg-[#E5C158]/10 px-2.5 py-1 rounded-lg border border-[#E5C158]/30">
                    Order: {currentRecord.orderId}
                  </span>
                  <span className="text-xs font-mono text-blue-400 font-bold bg-blue-950/40 px-2.5 py-1 rounded-lg border border-blue-500/30">
                    Invoice: {currentRecord.invoiceId}
                  </span>
                </div>
              </div>

              {/* CURRENT STATUS BADGES */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#E5C158]/20 text-[#E5C158] font-mono text-xs font-bold border border-[#E5C158]/40">
                  {currentRecord.paymentStatus}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs font-bold border border-blue-500/30">
                  {currentRecord.verificationStatus}
                </span>
              </div>
            </div>

            {/* KEY DATA FIELDS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 block font-bold">Client Name</span>
                <strong className="text-white block font-semibold text-sm">{currentRecord.clientName}</strong>
                <span className="text-[10px] text-neutral-400 font-mono block truncate">{currentRecord.clientEmail}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 block font-bold">Amount Paid</span>
                <strong className="font-poppins font-black text-[#E5C158] text-base block">
                  {formatMoney(currentRecord.amountPkr)}
                </strong>
                <span className="text-[10px] text-neutral-500 font-mono block">PKR {currentRecord.amountPkr.toLocaleString()}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 block font-bold">Payment Method</span>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>{currentRecord.paymentMethod}</span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono block truncate">{currentRecord.accountUsed}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 block font-bold">TRX Reference</span>
                <strong className="font-mono text-white text-xs block">{currentRecord.transactionRef}</strong>
                <span className="text-[10px] text-neutral-400 block">{currentRecord.paymentDate}</span>
              </div>
            </div>

            {/* SERVICE & PACKAGE DETAILS */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">Service & Package</span>
                <p className="text-white font-bold">{currentRecord.serviceName}</p>
                <p className="text-neutral-400 text-[11px]">{currentRecord.packageName}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (onNavigateTab) onNavigateTab('orders');
                    if (onShowToast) onShowToast(`Navigating to 360° Order Workspace for ${currentRecord.orderId}`);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Open Order</span>
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 2: PAYMENT PROOF VAULT & ADVANCED ZOOM VIEWER */}
          <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#E5C158]" />
                <h3 className="font-poppins font-bold text-white text-lg">Payment Proof & Receipt Vault</h3>
              </div>
              <span className="text-xs font-mono text-neutral-400 font-bold bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                {currentRecord.proofFiles.length} File Attachment(s)
              </span>
            </div>

            {/* MULTI-FILE THUMBNAIL SELECTOR BAR */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b border-white/10">
              {currentRecord.proofFiles.map((file, idx) => (
                <button
                  key={file.id}
                  onClick={() => {
                    setSelectedFileIndex(idx);
                    setZoomLevel(1);
                    setRotationAngle(0);
                  }}
                  className={`p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer min-w-[220px] ${
                    selectedFileIndex === idx
                      ? 'bg-[#E5C158]/10 border-[#E5C158] text-white shadow-[0_0_15px_rgba(229,193,88,0.2)]'
                      : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0 text-[#E5C158]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 truncate text-xs">
                    <strong className="block truncate font-mono text-white text-[11px]">{file.name}</strong>
                    <span className="text-[10px] text-neutral-400 block font-mono">{file.size} • {file.uploadDate}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* INTERACTIVE PROOF IMAGE VIEWER */}
            {currentFile ? (
              <div className="space-y-3">
                {/* TOOLBAR FOR ZOOM & ROTATION */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-neutral-300 font-mono">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 3))}
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.5))}
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(1)}
                      className="px-2 py-1 rounded-xl bg-white/5 hover:bg-white/15 text-white font-bold text-[10px] cursor-pointer"
                    >
                      Reset ({Math.round(zoomLevel * 100)}%)
                    </button>
                    <button
                      onClick={() => setRotationAngle((r) => (r + 90) % 360)}
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white cursor-pointer"
                      title="Rotate 90°"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsLightboxOpen(true)}
                      className="px-3 py-1.5 rounded-xl bg-[#E5C158]/20 hover:bg-[#E5C158]/30 border border-[#E5C158]/40 text-[#E5C158] font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full Canvas View</span>
                    </button>

                    <a
                      href={currentFile.url}
                      download={currentFile.name}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white cursor-pointer"
                      title="Download File"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* IMAGE CANVAS CONTAINER */}
                <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center p-4">
                  <motion.img
                    src={currentFile.url}
                    alt={currentFile.name}
                    animate={{ scale: zoomLevel, rotate: rotationAngle }}
                    transition={{ type: 'spring', damping: 25 }}
                    className="max-h-full object-contain cursor-grab active:cursor-grabbing rounded-lg shadow-2xl"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 font-mono text-[10px] text-neutral-400 space-y-0.5">
                    <div>File SHA256 Hash:</div>
                    <div className="text-white font-bold truncate max-w-[260px]">{currentFile.hash}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-neutral-500 font-mono text-xs">
                No proof image attachment provided for this payment.
              </div>
            )}
          </div>

          {/* SECTION 3: VERIFICATION HISTORY & AUDIT TIMELINE */}
          <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-[#E5C158]" />
                <h3 className="font-poppins font-bold text-white text-lg">Verification Audit Log</h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                {currentRecord.auditHistory.length} Event Log Entry(s)
              </span>
            </div>

            <div className="space-y-3 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10 pl-6">
              {currentRecord.auditHistory.map((log) => (
                <div key={log.id} className="relative space-y-1 bg-white/[0.02] border border-white/5 p-3.5 rounded-2xl">
                  {/* TIMELINE BULLET */}
                  <span
                    className={`absolute -left-[31px] top-4 w-3.5 h-3.5 rounded-full border-2 border-[#0D0D12] ${
                      log.badgeType === 'verified'
                        ? 'bg-emerald-400'
                        : log.badgeType === 'rejected'
                        ? 'bg-rose-400'
                        : log.badgeType === 'flagged'
                        ? 'bg-amber-400'
                        : 'bg-blue-400'
                    }`}
                  />

                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-white font-bold font-poppins">{log.action}</strong>
                    <span className="text-[10px] font-mono text-neutral-400">{log.timestamp}</span>
                  </div>

                  <p className="text-xs text-neutral-300 font-sans">{log.notes}</p>
                  <span className="text-[10px] font-mono text-neutral-500 block">By: {log.adminName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: CONTROLS, CHECKLIST, NOTES & ACTIONS (4 COLS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* CONTROL BOX 1: REUSABLE VERIFICATION CONTROLS PANEL */}
          <div className="p-6 rounded-3xl bg-[#0D0D12] border border-[#E5C158]/40 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#E5C158] uppercase font-bold tracking-wider">
                Financial Operations
              </span>
              <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#E5C158]" />
                <span>Verification Panel</span>
              </h3>
            </div>

            <p className="text-xs text-neutral-400">
              Select an action to update status, release order to production, or request updated receipt proof from client.
            </p>

            {/* ACTION BUTTONS */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => setActiveActionModal('verify')}
                className="w-full p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(40,199,111,0.3)]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark as Verified & Release Order</span>
              </button>

              <button
                onClick={() => setActiveActionModal('reject')}
                className="w-full p-3 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-400 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Payment Submission</span>
              </button>

              <button
                onClick={() => setActiveActionModal('request_proof')}
                className="w-full p-3 rounded-2xl bg-[#E5C158]/20 hover:bg-[#E5C158]/30 border border-[#E5C158]/40 text-[#E5C158] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Request New Receipt Proof</span>
              </button>

              <button
                onClick={() => setActiveActionModal('flag')}
                className="w-full p-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-400 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Flag for Senior Audit Review</span>
              </button>
            </div>
          </div>

          {/* CONTROL BOX 2: INTERNAL VERIFICATION CHECKLIST */}
          <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-[#E5C158]" />
                <h3 className="font-poppins font-bold text-white text-base">Internal Audit Checklist</h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-0.5 rounded-full border border-[#E5C158]/30">
                {completedChecklistCount}/6 Checked
              </span>
            </div>

            {/* PROGRESS BAR */}
            <div className="space-y-1">
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isAllChecklistDone ? 'bg-emerald-400' : 'bg-[#E5C158]'
                  }`}
                  style={{ width: `${(completedChecklistCount / 6) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-neutral-400 text-right font-mono">
                {isAllChecklistDone ? '100% Verified — Ready for Approval' : 'Complete all checks before verifying'}
              </p>
            </div>

            {/* CHECKLIST ITEMS */}
            <div className="space-y-2 text-xs">
              {[
                { key: 'amountMatch', label: `Amount Matches Invoice (${formatMoney(currentRecord.amountPkr)})` },
                { key: 'correctAccount', label: `Received on MFS Account (${currentRecord.accountUsed})` },
                { key: 'trxRefValid', label: `TRX Reference Valid (${currentRecord.transactionRef})` },
                { key: 'screenshotReadable', label: 'Screenshot / Slip Clear & Authentic' },
                { key: 'noDuplicate', label: 'Duplicate Payment Audit Passed' },
                { key: 'orderMatchConfirmed', label: 'Order Package & Price Confirmed' }
              ].map((item) => {
                const isChecked = checklist[item.key];
                return (
                  <button
                    key={item.key}
                    onClick={() => toggleChecklistItem(item.key)}
                    className={`w-full p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-neutral-500 shrink-0" />
                    )}
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CONTROL BOX 3: PRIVATE ADMINISTRATOR-ONLY NOTES */}
          <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#E5C158]" />
              <h3 className="font-poppins font-bold text-white text-base">Private Admin Notes</h3>
            </div>

            <p className="text-[11px] text-neutral-400">
              Confidential internal notes visible strictly to authorized MFS administrators.
            </p>

            {/* NOTE FORM */}
            <form onSubmit={handleAddAdminNote} className="space-y-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Type internal note, account audit findings, or client communication memo..."
                rows={3}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] transition-all resize-none"
              />
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="w-full p-2.5 rounded-xl bg-[#E5C158] hover:bg-[#fce888] disabled:opacity-40 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save Private Note</span>
              </button>
            </form>

            {/* LIST OF SAVED ADMIN NOTES */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {currentRecord.adminNotes.length === 0 ? (
                <p className="text-[11px] text-neutral-500 font-mono italic text-center py-2">
                  No private notes recorded for this payment yet.
                </p>
              ) : (
                currentRecord.adminNotes.map((note) => (
                  <div key={note.id} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#E5C158]">
                      <strong>{note.author}</strong>
                      <span className="text-neutral-500">{note.time}</span>
                    </div>
                    <p className="text-xs text-neutral-300 font-sans">{note.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CONTROL BOX 4: QUICK ACTIONS SUMMARY */}
          <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-3 shadow-2xl">
            <h4 className="font-mono text-xs uppercase font-bold text-[#E5C158]">Quick Operations</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  if (onShowToast) onShowToast(`Opening Client Profile for ${currentRecord.clientName}`);
                }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Client Profile</span>
              </button>

              <button
                onClick={() => {
                  if (onShowToast) onShowToast(`Generating Invoice PDF for ${currentRecord.invoiceId}`);
                }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>View Invoice</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRMATION ACTION DIALOG MODAL */}
      <AnimatePresence>
        {activeActionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div
              className="w-full max-w-md rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 p-6 space-y-5 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>CONFIRMATION REQUIRED</span>
                </div>
                <h3 className="font-poppins font-black text-xl text-white">
                  {activeActionModal === 'verify' && 'Approve & Release Payment?'}
                  {activeActionModal === 'reject' && 'Reject Payment Submission?'}
                  {activeActionModal === 'request_proof' && 'Request New Receipt Proof?'}
                  {activeActionModal === 'flag' && 'Flag for Senior Review?'}
                </h3>
                <p className="text-xs text-neutral-400">
                  Executing this action will update payment status for <strong className="text-white">{currentRecord.id}</strong>.
                </p>
              </div>

              {/* REASON NOTE INPUT */}
              <div className="space-y-1.5 text-xs">
                <label className="text-[11px] font-mono text-neutral-400 block font-bold">
                  Audit Reason / Client Communication Memo:
                </label>
                <textarea
                  value={modalReasonNote}
                  onChange={(e) => setModalReasonNote(e.target.value)}
                  placeholder="Enter specific audit remarks (e.g. EasyPaisa credit confirmed on statement #8892)..."
                  rows={3}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                />
              </div>

              {/* DIALOG BUTTONS */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setActiveActionModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>

                {activeActionModal === 'verify' && (
                  <button
                    onClick={() =>
                      handleExecuteVerificationAction(
                        'Verified',
                        'Fully Verified',
                        'Payment Approved & Order Released',
                        'verified'
                      )
                    }
                    disabled={isSubmittingAction}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs cursor-pointer flex items-center gap-1.5"
                  >
                    {isSubmittingAction ? 'Processing...' : 'Confirm Approval'}
                  </button>
                )}

                {activeActionModal === 'reject' && (
                  <button
                    onClick={() =>
                      handleExecuteVerificationAction(
                        'Rejected',
                        'Proof Rejected',
                        'Payment Rejected',
                        'rejected'
                      )
                    }
                    disabled={isSubmittingAction}
                    className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs cursor-pointer"
                  >
                    {isSubmittingAction ? 'Processing...' : 'Confirm Rejection'}
                  </button>
                )}

                {activeActionModal === 'request_proof' && (
                  <button
                    onClick={() =>
                      handleExecuteVerificationAction(
                        'Awaiting Verification',
                        'Pending Audit',
                        'Requested Updated Proof',
                        'info'
                      )
                    }
                    disabled={isSubmittingAction}
                    className="px-5 py-2.5 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-black font-bold text-xs cursor-pointer"
                  >
                    {isSubmittingAction ? 'Sending...' : 'Send Proof Request'}
                  </button>
                )}

                {activeActionModal === 'flag' && (
                  <button
                    onClick={() =>
                      handleExecuteVerificationAction(
                        'Awaiting Verification',
                        'Flagged',
                        'Flagged for Senior Review',
                        'flagged'
                      )
                    }
                    disabled={isSubmittingAction}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer"
                  >
                    {isSubmittingAction ? 'Flagging...' : 'Confirm Flag'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL CANVAS LIGHTBOX FOR PROOF IMAGES */}
      <AnimatePresence>
        {isLightboxOpen && currentFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fadeIn">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            >
              <XCircle className="w-6 h-6" />
            </button>

            <div className="max-w-5xl max-h-[90vh] flex flex-col items-center justify-center space-y-4">
              <img
                src={currentFile.url}
                alt={currentFile.name}
                className="max-h-[80vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
              />
              <div className="font-mono text-xs text-neutral-300 text-center">
                <strong>{currentFile.name}</strong> ({currentFile.size}) — {currentFile.uploadDate}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
