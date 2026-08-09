import React, { useState, useRef } from 'react';
import {
  X,
  Download,
  Printer,
  Copy,
  CheckCircle2,
  PhoneCall,
  Mail,
  ShieldCheck,
  Sparkles,
  Zap,
  Lock,
  ArrowRight,
  Clock,
  CreditCard,
  Building2,
  FileText,
  Share2
} from 'lucide-react';
import { MFSLogo } from './MFSLogo';
import {
  generateWhatsAppOrderLink,
  generateEmailOrderLink,
  generateReceiptFormattedText,
  OrderReceiptPayload
} from '../../lib/whatsappHandoff';

export interface LuxuryReceiptDetails {
  orderId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceTitle: string;
  category?: string;
  currency: string;
  amount: number;
  quantity?: number | string;
  urgency?: string;
  notes?: string;
  paymentMethod?: string;
  date?: string;
  discountApplied?: string;
  isPaid?: boolean;
}

interface LuxuryOrderReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: LuxuryReceiptDetails;
  onShowToast?: (msg: string) => void;
}

export const LuxuryOrderReceiptModal: React.FC<LuxuryOrderReceiptModalProps> = ({
  isOpen,
  onClose,
  details,
  onShowToast,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptCardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const orderDate = details.date || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const payload: OrderReceiptPayload = {
    orderId: details.orderId,
    clientName: details.clientName || 'Valued Client',
    serviceName: details.serviceTitle || 'Digital Growth Service',
    deadline: details.urgency || 'Standard Delivery',
    quantity: details.quantity || 1,
    totalPrice: `${details.currency} ${details.amount.toLocaleString()}`,
    projectBrief: details.notes || 'Standard guidelines provided.',
    currency: details.currency,
  };

  const whatsappLink = generateWhatsAppOrderLink(payload);
  const emailLink = generateEmailOrderLink(payload);
  const rawText = generateReceiptFormattedText(payload);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(rawText);
      setIsCopied(true);
      if (onShowToast) onShowToast('📋 Luxury Order Receipt text copied to clipboard!');
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCanvas = async () => {
    setIsDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Canvas 2D unavailable');

      // 1. Dark Luxury Background
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, 800, 1000);

      // Gradient accent background mesh
      const bgGrad = ctx.createRadialGradient(400, 200, 50, 400, 200, 500);
      bgGrad.addColorStop(0, 'rgba(229, 193, 88, 0.12)');
      bgGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 800, 1000);

      // 2. Card Frame
      ctx.fillStyle = '#0D0D12';
      ctx.strokeStyle = '#E5C158';
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(40, 40, 720, 920, 24);
      } else {
        ctx.rect(40, 40, 720, 920);
      }
      ctx.fill();
      ctx.stroke();

      // Top Gold Bar
      const goldBar = ctx.createLinearGradient(40, 40, 760, 40);
      goldBar.addColorStop(0, '#F5D77F');
      goldBar.addColorStop(0.5, '#E5C158');
      goldBar.addColorStop(1, '#906D14');
      ctx.fillStyle = goldBar;
      ctx.fillRect(40, 40, 720, 8);

      // MFS Gold Crest
      const crestGrad = ctx.createRadialGradient(400, 120, 10, 400, 120, 40);
      crestGrad.addColorStop(0, '#F5D77F');
      crestGrad.addColorStop(0.5, '#E5C158');
      crestGrad.addColorStop(1, '#906D14');
      ctx.fillStyle = crestGrad;
      ctx.beginPath();
      ctx.arc(400, 120, 40, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#050507';
      ctx.font = '900 26px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('MFS', 400, 121);

      // Headers
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('MFS GROWTH AGENCY', 400, 190);

      ctx.fillStyle = '#E5C158';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('OFFICIAL ORDER BRIEF & RECEIPT', 400, 215);

      ctx.fillStyle = '#9FA0A7';
      ctx.font = '12px sans-serif';
      ctx.fillText(`REF ID: ${details.orderId} • ISSUED: ${orderDate}`, 400, 238);

      // Line separator
      ctx.strokeStyle = 'rgba(229, 193, 88, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, 260);
      ctx.lineTo(720, 260);
      ctx.stroke();

      // Table Container Background
      ctx.fillStyle = '#050507';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(80, 280, 640, 420, 16);
      } else {
        ctx.rect(80, 280, 640, 420);
      }
      ctx.fill();
      ctx.strokeStyle = '#2A2B35';
      ctx.stroke();

      // Itemized Data
      const rows = [
        { label: 'Client Name', val: String(payload.clientName) },
        { label: 'Client Contact', val: `${details.clientEmail || ''} (${details.clientPhone || 'WhatsApp'})` },
        { label: 'Service Category', val: String(details.category || 'Digital Solutions') },
        { label: 'Selected Service', val: String(payload.serviceName) },
        { label: 'Scope / Quantity', val: String(payload.quantity) },
        { label: 'Delivery Tier', val: String(payload.deadline) },
        { label: 'Payment Method', val: String(details.paymentMethod || 'EasyPaisa / JazzCash / Bank') },
        { label: 'Grand Launch Promo', val: '50% DISCOUNT APPLIED' },
        { label: 'Total Net Amount', val: payload.totalPrice },
      ];

      let yPos = 320;
      rows.forEach((row, i) => {
        ctx.fillStyle = '#9FA0A7';
        ctx.font = '500 14px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(row.label, 100, yPos);

        ctx.textAlign = 'right';
        if (row.label === 'Total Net Amount') {
          ctx.fillStyle = '#28C76F';
          ctx.font = 'bold 22px sans-serif';
        } else if (row.label === 'Grand Launch Promo') {
          ctx.fillStyle = '#E5C158';
          ctx.font = 'bold 13px sans-serif';
        } else {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '600 14px sans-serif';
        }
        ctx.fillText(row.val, 700, yPos);

        if (i < rows.length - 1) {
          ctx.strokeStyle = 'rgba(255,255,255,0.06)';
          ctx.beginPath();
          ctx.moveTo(100, yPos + 18);
          ctx.lineTo(700, yPos + 18);
          ctx.stroke();
        }
        yPos += 42;
      });

      // Footer Notes & Accounts
      ctx.fillStyle = '#E5C158';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('AGENCY PAYMENT DESTINATIONS:', 400, 730);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '11px sans-serif';
      ctx.fillText('EasyPaisa: ••••1234  |  JazzCash: ••••3688  |  Askari Bank: ••••7265', 400, 755);

      ctx.fillStyle = '#9FA0A7';
      ctx.font = '11px sans-serif';
      ctx.fillText('Title: MFS Official Agency  |  WhatsApp Support: +92 301 5323689', 400, 778);

      // Confidentiality stamp
      ctx.fillStyle = 'rgba(40, 199, 111, 0.15)';
      ctx.strokeStyle = '#28C76F';
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(180, 810, 440, 45, 12);
      } else {
        ctx.rect(180, 810, 440, 45);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#28C76F';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('✓ VERIFIED LUXURY RECEIPT • 100% CONFIDENTIAL & GUARANTEED', 400, 838);

      // Download Trigger
      const imageUri = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `MFS_Luxury_Receipt_${details.orderId}.png`;
      downloadLink.href = imageUri;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      if (onShowToast) onShowToast('📥 High-Res Luxury Receipt PNG downloaded successfully!');
    } catch (err) {
      console.error('Canvas Receipt Generation Error:', err);
      if (onShowToast) onShowToast('Failed to download receipt image. You can use the Print or Copy option.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      
      {/* Printable Style Sheet Override */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #mfs-printable-receipt, #mfs-printable-receipt * {
            visibility: visible;
          }
          #mfs-printable-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
            border: 2px solid #000000 !important;
            padding: 20px !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="relative w-full max-w-2xl bg-[#0D0D12] border-2 border-[#E5C158] rounded-3xl shadow-[0_0_80px_rgba(229,193,88,0.25)] overflow-hidden my-auto animate-scaleUp">
        
        {/* Metallic Top Gold Header Banner */}
        <div className="h-2 bg-gradient-to-r from-[#F5D77F] via-[#E5C158] to-[#906D14]" />

        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-black/40 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C76F] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5C158]">
              OFFICIAL LUXURY ORDER RECEIPT
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            title="Close Receipt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Card Body */}
        <div id="mfs-printable-receipt" ref={receiptCardRef} className="p-6 sm:p-8 space-y-6 bg-gradient-to-b from-[#0D0D12] via-[#050507] to-black text-left relative">
          
          {/* Watermark Logo Background */}
          <div className="absolute right-6 top-12 opacity-5 pointer-events-none select-none">
            <MFSLogo size={240} />
          </div>

          {/* Header Branding */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#E5C158]/30">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E5C158] via-[#D4AF37] to-black p-0.5 shadow-[0_0_20px_rgba(229,193,88,0.3)]">
                <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center">
                  <MFSLogo size={28} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-poppins font-bold text-white tracking-tight">
                  MFS Growth Agency
                </h2>
                <p className="text-xs text-[#E5C158] font-semibold tracking-wider uppercase">
                  Digital Solutions & Executive Services
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="px-3 py-1 rounded-full bg-[#E5C158]/15 border border-[#E5C158]/40 text-[#E5C158] text-xs font-mono font-bold inline-block">
                REF #{details.orderId}
              </span>
              <p className="text-[11px] text-neutral-400 mt-1">
                Issued: <strong className="text-neutral-200">{orderDate}</strong>
              </p>
            </div>
          </div>

          {/* Order Status Banner */}
          <div className="p-4 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#28C76F] shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-[#28C76F]">
                  Order Confirmed & Queued in Live Production
                </h4>
                <p className="text-[11px] text-neutral-300">
                  50% Grand Launch Promo Discount has been locked into your rate.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-[#28C76F] text-black shrink-0 uppercase tracking-wider">
              {details.isPaid ? 'PAID & VERIFIED' : 'ACTIVE ORDER'}
            </span>
          </div>

          {/* Client & Service Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Client Card */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-[10px] font-extrabold text-[#E5C158] uppercase tracking-wider block">
                CLIENT INFORMATION
              </span>
              <div className="space-y-1">
                <p className="text-white font-bold text-sm">{details.clientName || 'Valued Client'}</p>
                <p className="text-neutral-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>{details.clientEmail}</span>
                </p>
                <p className="text-neutral-400 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-[#28C76F]" />
                  <span>{details.clientPhone}</span>
                </p>
              </div>
            </div>

            {/* Service Overview */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-[10px] font-extrabold text-[#E5C158] uppercase tracking-wider block">
                SERVICE SPECIFICATIONS
              </span>
              <div className="space-y-1">
                <p className="text-white font-bold text-sm">{details.serviceTitle}</p>
                <p className="text-neutral-300 flex justify-between">
                  <span className="text-neutral-400">Scope/Quantity:</span>
                  <strong className="text-white">{details.quantity || 1}</strong>
                </p>
                <p className="text-neutral-300 flex justify-between">
                  <span className="text-neutral-400">Delivery Speed:</span>
                  <strong className="text-[#E5C158]">{details.urgency || 'Standard Delivery'}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Itemized Price Breakdown Table */}
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/60">
            <div className="bg-white/5 px-4 py-2.5 border-b border-white/10 flex justify-between text-[11px] font-extrabold text-neutral-300 uppercase tracking-wider">
              <span>Itemized Charge Breakdown</span>
              <span>Amount</span>
            </div>

            <div className="p-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-neutral-300">{details.serviceTitle} Base Rate</span>
                <span className="text-white font-mono">{details.currency} {(details.amount * 2).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-neutral-400">
                <span>Speed Tier Multiplier ({details.urgency || 'Standard'})</span>
                <span className="text-neutral-300 font-mono">Included</span>
              </div>

              <div className="flex justify-between items-center text-[#E5C158] font-semibold">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>50% Grand Launch Promo Discount</span>
                </span>
                <span className="font-mono">- {details.currency} {details.amount.toLocaleString()}</span>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between items-center font-bold">
                <span className="text-white text-sm">Total Net Amount Payable</span>
                <span className="text-[#28C76F] text-lg font-mono">
                  {details.currency} {details.amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Account Details */}
          <div className="p-4 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[#E5C158] flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                <span>Agency Official Payment Accounts</span>
              </h4>
              <span className="text-[10px] text-neutral-300 font-semibold">Title: MFS Official Agency</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded-xl bg-black/60 border border-white/10">
                <span className="text-neutral-400 block text-[10px]">EasyPaisa</span>
                <strong className="text-white font-mono text-xs">••••1234</strong>
              </div>
              <div className="p-2 rounded-xl bg-black/60 border border-white/10">
                <span className="text-neutral-400 block text-[10px]">JazzCash</span>
                <strong className="text-white font-mono text-xs">••••3688</strong>
              </div>
              <div className="p-2 rounded-xl bg-black/60 border border-white/10">
                <span className="text-neutral-400 block text-[10px]">Askari Bank</span>
                <strong className="text-[#E5C158] font-mono text-xs">••••7265</strong>
              </div>
            </div>
          </div>

          {/* Manual Payment Verification Control Banner */}
          <div className="p-3.5 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 text-xs text-left space-y-1">
            <div className="flex items-center gap-1.5 text-[#28C76F] font-bold text-[11px] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>MANUAL PAYMENT CONTROL & ADMIN VERIFICATION</span>
            </div>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Automated AI systems do <strong>not</strong> charge your accounts automatically. Payment proof is reviewed and verified manually by <strong>MFS Finance Operations</strong> (+92 301 5323689) before final project kickoff.
            </p>
          </div>

          {/* Project Notes snippet */}
          {details.notes && (
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                PROJECT NOTES & SCOPE BRIEF:
              </span>
              <p className="text-neutral-300 italic leading-relaxed">"{details.notes}"</p>
            </div>
          )}

        </div>

        {/* Bottom Multi-Channel Dispatch & Action Bar */}
        <div className="p-6 bg-black/80 border-t border-white/10 space-y-4 no-print">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* WhatsApp Link Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#28C76F] hover:bg-[#34e082] text-black font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 fill-black" />
              <span>Send Order Brief to WhatsApp</span>
            </a>

            {/* Email Link Button */}
            <a
              href={emailLink}
              className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-sky-400" />
              <span>Send Order Brief via Email</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs">
            {/* Copy Raw Text */}
            <button
              type="button"
              onClick={handleCopyText}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Text Copied!' : 'Copy Receipt Text'}</span>
            </button>

            {/* Download Image Button */}
            <button
              type="button"
              onClick={handleDownloadCanvas}
              disabled={isDownloading}
              className="px-4 py-2 rounded-xl bg-[#E5C158]/15 hover:bg-[#E5C158]/25 border border-[#E5C158]/40 text-[#E5C158] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Generating PNG...' : 'Download Receipt Image'}</span>
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>

          <p className="text-[10px] text-center text-neutral-400">
            MFS Growth Agency • Islamabad, Pakistan • 24/7 International Online Support (+92 301 5323689)
          </p>

        </div>

      </div>
    </div>
  );
};
