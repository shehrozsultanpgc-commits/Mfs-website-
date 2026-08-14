import React from 'react';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Mail,
  Phone,
  FileText,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

interface RefundPolicyPageProps {
  onNavigatePage?: (page: any, targetSection?: string) => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
  onShowToast?: (msg: string) => void;
}

export const RefundPolicyPage: React.FC<RefundPolicyPageProps> = ({
  onNavigatePage,
  onOpenAIChat,
  onShowToast,
}) => {
  return (
    <main className="min-h-screen bg-[#050507] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-[#E5C158]/30 selection:text-[#E5C158]">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Navigation Breadcrumb / Back Button */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <button
            onClick={() => onNavigatePage?.('home')}
            className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#E5C158] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[11px] font-mono text-[#E5C158]">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refund Guarantee</span>
            </span>
          </div>
        </div>

        {/* Header Section */}
        <header className="space-y-4 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-poppins tracking-tight text-white">
            Refund & <span className="gold-pure-gradient">Cancellation</span> Policy
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
            MFS Growth Agency maintains transparent, fair, and clear guidelines regarding order cancellations, payment adjustments, revision rights, and refund eligibility.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-2">
            <span>Last Updated: August 2026</span>
            <span>•</span>
            <span>Effective Date: Immediate</span>
            <span>•</span>
            <span className="text-[#28C76F]">Status: Transparent & Enforced</span>
          </div>
        </header>

        {/* Key Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-center text-[#28C76F]">
              <RotateCcw className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold font-poppins text-white uppercase tracking-wider">Duplicate Protection</h3>
            <p className="text-[11px] text-neutral-400 leading-normal">
              100% instant refund or account credit for any accidental duplicate payment or overpayment.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold font-poppins text-white uppercase tracking-wider">7-Day Free Revisions</h3>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Free adjustments provided within 7 days of delivery to meet your original order brief.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold font-poppins text-white uppercase tracking-wider">3-5 Day Processing</h3>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Approved refunds are processed back to your EasyPaisa, JazzCash, or Bank account in 3–5 business days.
            </p>
          </div>
        </div>

        {/* Detailed Content */}
        <article className="space-y-10 text-sm leading-relaxed text-neutral-300">

          {/* 1. Payment Confirmation & Production Start */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <CreditCard className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">1. Order Confirmation & Production Queue</h2>
            </div>
            <p>
              When you place an order on MFS Growth Agency, payment verification occurs manually upon uploading your payment proof transfer screenshot (EasyPaisa, JazzCash, or Askari Bank transfer). Once verified by our financial team, your order status changes to <strong className="text-[#28C76F]">In Production</strong> and specialized agency specialists begin work immediately.
            </p>
          </section>

          {/* 2. Cancellation & Refund Eligibility Categories */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <DollarSign className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">2. Cancellation & Refund Eligibility Framework</h2>
            </div>
            <p>
              Eligibility for refunds depends on the production stage of your order at the time the cancellation request is received:
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-black/40 border border-[#28C76F]/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#28C76F] font-poppins">Full Refund (100%)</span>
                  <span className="font-mono text-[10px] text-neutral-400">Pre-Production Stage</span>
                </div>
                <p className="text-neutral-300">
                  If an order is canceled before our specialists have commenced work, or if an accidental duplicate payment was transferred for a single order.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-[#E5C158]/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#E5C158] font-poppins">Partial Refund (Up to 50%)</span>
                  <span className="font-mono text-[10px] text-neutral-400">Active Production Stage</span>
                </div>
                <p className="text-neutral-300">
                  If work has actively commenced and resources have been allocated, but the final deliverable drafting is incomplete. A partial refund covers specialized labor completed up to the cancellation notice.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-[#EA5455]/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#EA5455] font-poppins">Non-Refundable Situations</span>
                  <span className="font-mono text-[10px] text-neutral-400">Post-Delivery Stage</span>
                </div>
                <p className="text-neutral-300">
                  Orders where final deliverables have been completed, delivered, and approved. Refunds are not issued for subjective preference changes after project completion when deliverables fulfilled the original written brief.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Revisions Before Refunds */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <ShieldCheck className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">3. Revision & Quality Resolution Process</h2>
            </div>
            <p>
              Our goal is 100% client satisfaction. Before requesting a refund due to formatting, design layout, or research adjustments, clients are encouraged to utilize our free revision workflow:
            </p>
            <ul className="space-y-2 text-xs list-disc list-inside text-neutral-300">
              <li>Clients receive <strong className="text-white">7 days of complimentary revisions</strong> following deliverable receipt.</li>
              <li>Revisions are processed rapidly within 12–24 hours to address feedback matching the original brief.</li>
              <li>Revision requests can be submitted directly through the Client Dashboard or via WhatsApp.</li>
            </ul>
          </section>

          {/* 4. Client-Caused Delays */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <AlertTriangle className="w-5 h-5 text-[#FF9F43]" />
              <h2 className="text-lg font-bold font-poppins text-white">4. Missing Information & Delays</h2>
            </div>
            <p className="text-xs text-neutral-300">
              Timely delivery relies on receiving complete guidelines, source files, and prompt responses from the client. Delays in project completion resulting from missing client rubrics, incomplete instructions, or unresponsiveness do not qualify for deadline-miss refunds. In such cases, delivery timelines are extended accordingly.
            </p>
          </section>

          {/* 5. How to Request a Refund */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/5 border border-[#E5C158]/30">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <FileText className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">5. How to Submit a Refund Request</h2>
            </div>
            <p className="text-xs text-neutral-300">
              To request an order cancellation or refund, please submit an official request containing the following information:
            </p>
            <ul className="space-y-1.5 text-xs font-mono text-neutral-300 list-disc list-inside bg-black/40 p-4 rounded-xl border border-white/5">
              <li>Your Order ID (e.g. <code className="text-[#E5C158]">#MFS-XXXXX</code>)</li>
              <li>Account Name & Email used during order placement</li>
              <li>Payment proof receipt / transaction ID</li>
              <li>Clear description of the reason for cancellation or refund request</li>
            </ul>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-white block font-poppins">Official Support Desk</span>
                <span className="text-xs font-mono text-[#E5C158] block">mfsmedia.agency@gmail.com</span>
                <span className="text-[11px] font-mono text-neutral-400 block">+92 301 5323689 (WhatsApp Line)</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigatePage?.('contact')}
                  className="px-4 py-2 rounded-xl bg-[#E5C158] hover:bg-[#D4AF37] text-[#050507] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#E5C158]/10"
                >
                  <span>Contact Support</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>

        </article>

        {/* Footer Navigation CTAs */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <button
            onClick={() => onNavigatePage?.('privacy')}
            className="text-neutral-400 hover:text-[#E5C158] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Read Privacy Policy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigatePage?.('terms')}
            className="text-neutral-400 hover:text-[#E5C158] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Read Terms of Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </main>
  );
};
