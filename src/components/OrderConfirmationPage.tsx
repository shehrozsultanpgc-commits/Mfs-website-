import React, { useState, useEffect } from 'react';
import { Currency } from '../types';
import { useModalHistory } from '../hooks/useModalHistory';
import {
  CheckCircle2,
  Sparkles,
  Bot,
  Award,
  Download,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Gift,
  FileText,
  Mail,
  PhoneCall,
  MessageSquare,
  Globe,
  Share2,
  HelpCircle,
  Home,
  ChevronRight,
  Zap,
  Star,
  Check,
  X,
  Copy,
  ExternalLink
} from 'lucide-react';

interface OrderConfirmationPageProps {
  currency: Currency;
  orderId?: string;
  customerEmail?: string;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (
    page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation',
    targetSection?: string
  ) => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  currency,
  orderId = 'MFS-849201',
  customerEmail = 'client@mfsgrowth.com',
  onShowToast,
  onNavigatePage,
  onOpenAIChat,
}) => {
  // State for Welcome Gift Reveal
  const [showGiftModal, setShowGiftModal] = useState<boolean>(true);
  useModalHistory(showGiftModal, () => setShowGiftModal(false), 'orderConfirmationGiftModal');
  const [copiedOrderId, setCopiedOrderId] = useState<boolean>(false);
  const [downloadingInvoice, setDownloadingInvoice] = useState<boolean>(false);

  // Confetti particles effect simulation
  const [confettiActive, setConfettiActive] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopiedOrderId(true);
    if (onShowToast) onShowToast(`Copied Order Reference ID: ${orderId}`);
    setTimeout(() => setCopiedOrderId(false), 2500);
  };

  const handleDownloadInvoice = () => {
    setDownloadingInvoice(true);
    if (onShowToast) onShowToast('Generating official MFS Growth PDF Invoice...');
    setTimeout(() => {
      setDownloadingInvoice(false);
      if (onShowToast) onShowToast('Invoice MFS-INV-849201.pdf downloaded successfully!');
    }, 1500);
  };

  return (
    <div className="w-full pt-28 pb-20 animate-fadeIn relative">
      {/* CSS Simulated Confetti Burst */}
      {confettiActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
          <div className="absolute top-10 left-10 w-3 h-3 bg-[#E5C158] rounded-full animate-bounce" />
          <div className="absolute top-20 right-20 w-4 h-4 bg-[#28C76F] rounded-full animate-ping" />
          <div className="absolute top-32 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
          <div className="absolute top-16 right-1/3 w-3 h-3 bg-[#E5C158] rounded-full animate-bounce" />
        </div>
      )}

      {/* Hero Celebration Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#28C76F]/10 border border-[#28C76F]/30 text-[#28C76F] text-xs font-bold mb-4 shadow-[0_0_20px_rgba(40,199,111,0.2)]">
          <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
          <span>PAYMENT VERIFIED & ORDER CONFIRMED</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-poppins font-extrabold text-white tracking-tight leading-tight mb-3">
          🎉 Thank You! Your Order is <span className="gradient-gold-text">Successfully Confirmed</span>
        </h1>

        <p className="text-neutral-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-6">
          Your payment has been verified by MFS AI. Your project has entered our executive production queue and senior specialist assignment is underway.
        </p>

        {/* Order Reference Badge Card */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 p-3.5 rounded-2xl bg-black/80 border border-white/15 backdrop-blur-md">
          <span className="text-xs text-neutral-400">Order Reference:</span>
          <strong className="text-sm font-poppins font-bold text-[#E5C158] tracking-wider">{orderId}</strong>
          <button
            onClick={handleCopyOrderId}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
            title="Copy Order ID"
          >
            {copiedOrderId ? <Check className="w-3.5 h-3.5 text-[#28C76F]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </section>

      {/* MFS AI Welcome Gift Banner / Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="glass-card rounded-3xl border-2 border-[#E5C158] p-6 sm:p-8 bg-gradient-to-r from-black via-[#121212] to-black shadow-[0_0_40px_rgba(229,193,88,0.15)] relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/15 border border-[#E5C158]/30 text-[#E5C158] text-[11px] font-extrabold">
                <Gift className="w-4 h-4" />
                <span>EXCLUSIVELY UNLOCKED FOR YOU</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-poppins font-bold text-white">
                🎁 Welcome to the MFS Growth Family!
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-xl">
                As a valued client, we have activated your <strong className="text-[#E5C158]">MFS AI VIP Welcome Benefits Package</strong>. Access free guides, priority support, and instant AI consulting!
              </p>
            </div>

            <button
              onClick={() => setShowGiftModal(true)}
              className="px-6 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-lg shrink-0 flex items-center gap-2"
            >
              <Gift className="w-4 h-4" />
              <span>Claim Welcome Gifts</span>
            </button>
          </div>

          {/* Unlocked Gift Items Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 mt-6 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#E5C158]" />
              <span className="text-white font-semibold text-[11px]">Priority 24/7 MFS AI</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#28C76F]" />
              <span className="text-white font-semibold text-[11px]">Free Citation Guide</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
              <span className="text-white font-semibold text-[11px]">Free Revisions Guarantee</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#28C76F]" />
              <span className="text-white font-semibold text-[11px]">Express Queue Priority</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Order Details & Roadmap Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Personalized AI Confirmation Card */}
        <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 bg-black/90 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                PERSONALIZED AI PROJECT UPDATE
              </span>
              <h3 className="text-lg font-poppins font-bold text-white">Project Initialization Message</h3>
            </div>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
            "Hello! Your order <strong className="text-[#E5C158]">{orderId}</strong> for <strong>Executive Presentation Design</strong> has been successfully validated. All requirements and guidelines have been cataloged. Our lead subject-matter specialist is now reviewing your guidelines and preparation is officially underway."
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-1">
            <div className="flex items-center gap-1.5 text-[#28C76F]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Email Confirmation Sent ({customerEmail})</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#E5C158]">
              <Clock className="w-4 h-4" />
              <span>Estimated Delivery: Within 24-48 Hours</span>
            </div>
          </div>
        </div>

        {/* Order Details Summary Box */}
        <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-poppins font-bold text-white text-base">Confirmed Order Overview</h3>
            <button
              onClick={handleDownloadInvoice}
              disabled={downloadingInvoice}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>{downloadingInvoice ? 'Generating Invoice...' : 'Download Invoice PDF'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase block">SERVICE TITLE</span>
              <strong className="text-white text-sm font-poppins font-bold mt-1 block">
                Executive Presentation Design
              </strong>
              <span className="text-[11px] text-[#E5C158] mt-0.5 block">10 Slides • Pitch Deck Style</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase block">PAYMENT & TOTAL</span>
              <strong className="text-[#28C76F] text-sm font-poppins font-bold mt-1 block">
                PKR 2,500 <span className="text-[10px] text-neutral-400">(50% Discount Applied)</span>
              </strong>
              <span className="text-[11px] text-neutral-400 mt-0.5 block">Status: Verified & Paid</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase block">CLIENT EMAIL</span>
              <strong className="text-white text-xs font-mono mt-1 block truncate">
                {customerEmail}
              </strong>
              <span className="text-[11px] text-neutral-400 mt-0.5 block">Region: Pakistan / Global</span>
            </div>
          </div>
        </div>

        {/* Visual Roadmap: What Happens Next? */}
        <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
              PROJECT WORKFLOW ROADMAP
            </span>
            <h3 className="text-xl font-poppins font-bold text-white">What Happens Next?</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Your project moves through 6 structured quality checkpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            {[
              { step: '1', title: 'Order Confirmed', status: 'Completed', color: 'text-[#28C76F]', bg: 'bg-[#28C76F]/20' },
              { step: '2', title: 'Team Assigned', status: 'In Progress', color: 'text-[#E5C158]', bg: 'bg-[#E5C158]/20' },
              { step: '3', title: 'Research & Draft', status: 'Pending', color: 'text-neutral-400', bg: 'bg-white/10' },
              { step: '4', title: 'Design & Format', status: 'Pending', color: 'text-neutral-400', bg: 'bg-white/10' },
              { step: '5', title: 'Quality Assurance', status: 'Pending', color: 'text-neutral-400', bg: 'bg-white/10' },
              { step: '6', title: 'Final Delivery', status: 'Pending', color: 'text-neutral-400', bg: 'bg-white/10' },
            ].map((st, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <span className={`w-6 h-6 rounded-full ${st.bg} ${st.color} font-bold text-[11px] flex items-center justify-center mb-2`}>
                    {st.step}
                  </span>
                  <h4 className="font-bold text-white text-xs mb-1">{st.title}</h4>
                </div>
                <span className={`text-[10px] font-semibold ${st.color}`}>{st.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-black via-[#0F0F0F] to-black">
          <button
            onClick={() => {
              if (onNavigatePage) onNavigatePage('dashboard');
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#28C76F]" />
            <span>Open Client Dashboard</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                if (onNavigatePage) onNavigatePage('home');
              }}
              className="flex-1 sm:flex-none px-5 py-3 rounded-full bg-white/10 text-white font-semibold text-xs hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </button>

            <button
              onClick={() => onOpenAIChat && onOpenAIChat('chat')}
              className="flex-1 sm:flex-none px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#E5C158]" />
              <span>Ask MFS AI</span>
            </button>

            <a
              href="https://wa.me/923015323689"
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-full bg-[#28C76F] hover:bg-[#22b060] text-black font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Live WhatsApp Updates</span>
            </a>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-center text-xs text-neutral-400">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <ShieldCheck className="w-5 h-5 text-[#E5C158] mx-auto mb-1.5" />
            <strong className="text-white block">100% Quality Guarantee</strong>
            <span>Executive Standards</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <Clock className="w-5 h-5 text-[#28C76F] mx-auto mb-1.5" />
            <span>On-Time Delivery</span>
            <strong className="text-white block">Strict Deadlines</strong>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <Globe className="w-5 h-5 text-[#E5C158] mx-auto mb-1.5" />
            <strong className="text-white block">24/7 Global Support</strong>
            <span>Pakistan & Worldwide</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <Award className="w-5 h-5 text-[#28C76F] mx-auto mb-1.5" />
            <strong className="text-white block">Free Revisions</strong>
            <span>Included With Order</span>
          </div>
        </div>

      </section>

      {/* Interactive MFS AI Welcome Gift Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] overflow-y-auto">
          <div className="glass-card max-w-xl w-full rounded-3xl border-2 border-[#E5C158] p-5 sm:p-8 bg-gradient-to-b from-[#121212] via-black to-[#050507] shadow-[0_0_50px_rgba(229,193,88,0.25)] space-y-6 relative overflow-hidden my-auto max-h-[calc(100dvh-1.5rem)] overflow-y-auto">
            <button
              onClick={() => setShowGiftModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center z-10"
              title="Close Perks Modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#E5C158]/20 border border-[#E5C158]/40 text-[#E5C158] flex items-center justify-center mx-auto shadow-lg">
                <Gift className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-poppins font-extrabold text-white">
                🎁 Unlocked Your MFS AI Welcome Gifts!
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Thank you for ordering with MFS Growth Agency. Here are your 4 complimentary VIP client perks:
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
                <Bot className="w-5 h-5 text-[#E5C158] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">1. Free AI Project Consultation</strong>
                  <p className="text-neutral-400 text-[11px]">Instant 24/7 guidance for formatting, structure, and slide flow.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#28C76F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">2. Executive Academic & Business Formatting Guide</strong>
                  <p className="text-neutral-400 text-[11px]">Comprehensive citation manual (APA 7th, Harvard, Corporate Slide Standards).</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#E5C158] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">3. Unlimited Free Revisions Guarantee</strong>
                  <p className="text-neutral-400 text-[11px]">We adjust your files until you are 100% satisfied.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
                <Zap className="w-5 h-5 text-[#28C76F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">4. Priority Processing Queue</strong>
                  <p className="text-neutral-400 text-[11px]">Your project receives express priority routing in our workflow.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center">
              <button
                onClick={() => setShowGiftModal(false)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2"
              >
                <span>Awesome! Continue to Order Details</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
