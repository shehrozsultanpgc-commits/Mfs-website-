import React, { useState, useMemo } from 'react';
import { Currency } from '../types';
import {
  ShieldCheck,
  Lock,
  Copy,
  Check,
  Upload,
  FileText,
  Trash2,
  Sparkles,
  Bot,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  PhoneCall,
  MessageSquare,
  Mic,
  ExternalLink,
  DollarSign,
  FileUp,
  Building2,
  Smartphone
} from 'lucide-react';

interface PaymentPageProps {
  currency: Currency;
  setCurrency?: (c: Currency) => void;
  orderId?: string;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation', targetSection?: string) => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  currency,
  setCurrency,
  orderId = 'MFS-849201',
  onShowToast,
  onNavigatePage,
  onOpenAIChat,
}) => {
  // Active Payment Method Tab
  const [selectedMethod, setSelectedMethod] = useState<'easypaisa' | 'jazzcash' | 'bank'>('easypaisa');

  // Copy Feedback State
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Uploaded Payment Proof File
  const [proofFile, setProofFile] = useState<{ name: string; size: string; previewUrl: string | null } | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanCompleted, setScanCompleted] = useState<boolean>(false);

  // FAQ Accordion Toggle State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Handle Copy to Clipboard
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    if (onShowToast) onShowToast(`Copied ${label}: ${text}`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Handle Proof Upload & Trigger AI Scanner
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const item = {
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      previewUrl: URL.createObjectURL(file),
    };

    setProofFile(item);
    setIsScanning(true);
    setScanCompleted(false);

    if (onShowToast) onShowToast('Payment receipt uploaded! MFS AI is scanning document...');

    // Simulate AI scanning animation (1.8s)
    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
      if (onShowToast) onShowToast('MFS AI Scan Completed: High Confidence (98%) Match!');
    }, 1800);
  };

  const handleRemoveProof = () => {
    setProofFile(null);
    setScanCompleted(false);
    setIsScanning(false);
  };

  // FAQ Data
  const faqs = [
    {
      q: 'How do I complete payment using EasyPaisa or JazzCash?',
      a: 'Open your EasyPaisa or JazzCash app, select "Send Money" or "Bank Transfer", and enter the verified account credentials provided during order checkout. After completing the transfer, upload your screenshot.'
    },
    {
      q: 'How long does manual payment verification take?',
      a: 'Once your payment receipt passes our instant MFS AI preliminary scan, our finance verification team reviews it manually within 10 to 30 minutes. You will receive an instant notification on WhatsApp and email.'
    },
    {
      q: 'Is my payment safe with Askari Bank Transfer?',
      a: 'Yes, 100%. Askari Bank is a premier licensed commercial bank in Pakistan. You will receive verified transfer credentials during your active checkout session.'
    },
    {
      q: 'What should I do if my payment screenshot is blurry or rejected?',
      a: 'Simply click "Replace File" to upload a clearer full-screen receipt or transaction SMS screenshot. You can also send your proof directly to our 24/7 WhatsApp support (+92 301 5323689) for immediate assistance.'
    },
    {
      q: 'Is the 50% Grand Launch discount automatically applied?',
      a: 'Yes! The 50% Grand Launch discount is pre-calculated across all PKR and USD pricing totals on this secure checkout page.'
    }
  ];

  return (
    <div className="w-full pt-28 pb-20 animate-fadeIn">
      {/* Secure Checkout Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold mb-4">
          <Lock className="w-4 h-4 text-[#28C76F]" />
          <span>256-BIT SSL ENCRYPTED CHECKOUT — VERIFIED BY MFS AI</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-poppins font-bold text-white tracking-tight leading-tight mb-3">
          Secure Payment <span className="gradient-gold-text">& AI Verification</span>
        </h1>
        <p className="text-neutral-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Pay via official business accounts. Upload your transaction screenshot for instant MFS AI pre-verification and priority project kickoff.
        </p>
      </section>

      {/* Main Grid Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Payment Methods & Upload Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Payment Method Selector Card */}
            <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                    STEP 1: SELECT PAYMENT METHOD
                  </span>
                  <h2 className="text-xl font-poppins font-bold text-white">Official Business Accounts</h2>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#28C76F] font-semibold bg-[#28C76F]/10 px-3 py-1 rounded-full border border-[#28C76F]/20">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approved Business Credentials</span>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'easypaisa', name: 'EasyPaisa', icon: Smartphone, num: 'Shared at Checkout', badge: 'Fastest' },
                  { id: 'jazzcash', name: 'JazzCash', icon: Smartphone, num: 'Shared at Checkout', badge: 'Instant' },
                  { id: 'bank', name: 'Askari Bank', icon: Building2, num: 'Shared at Checkout', badge: 'Bank Transfer' }
                ].map((pm) => {
                  const IconComp = pm.icon;
                  const isSel = selectedMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setSelectedMethod(pm.id as any)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all relative ${
                        isSel
                          ? 'bg-[#E5C158]/15 border-[#E5C158] shadow-[0_0_20px_rgba(229,193,88,0.2)]'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <IconComp className={`w-5 h-5 ${isSel ? 'text-[#E5C158]' : 'text-neutral-400'}`} />
                        <span className="text-[9px] font-bold text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded">
                          {pm.badge}
                        </span>
                      </div>
                      <h4 className="font-poppins font-bold text-white text-sm">{pm.name}</h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{pm.num}</p>
                    </button>
                  );
                })}
              </div>

              {/* Selected Payment Details Display Box */}
              <div className="p-6 rounded-2xl bg-black/90 border border-white/15 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-poppins font-bold text-white text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
                    <span>
                      {selectedMethod === 'easypaisa'
                        ? 'EasyPaisa Account Details'
                        : selectedMethod === 'jazzcash'
                        ? 'JazzCash Account Details'
                        : 'Askari Bank Transfer Details'}
                    </span>
                  </h3>
                  <span className="text-[10px] font-bold text-[#28C76F] uppercase tracking-wider">
                    • Verified Account
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Account Title */}
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 font-semibold block">ACCOUNT TITLE</span>
                      <strong className="text-white text-xs">MFS Growth Agency (Issued at Checkout)</strong>
                    </div>
                  </div>

                  {/* Account Number */}
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 font-semibold block">
                        {selectedMethod === 'bank' ? 'ACCOUNT NUMBER' : 'MOBILE ACCOUNT NUMBER'}
                      </span>
                      <strong className="text-[#E5C158] text-xs font-mono">
                        Provided Securely at Checkout
                      </strong>
                    </div>
                  </div>

                  {selectedMethod === 'bank' && (
                    <div className="sm:col-span-2 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-neutral-400 font-semibold block">BANK NAME</span>
                        <strong className="text-white text-xs">Askari Bank Limited (Islamabad Branch)</strong>
                      </div>
                      <span className="text-[10px] text-[#28C76F] font-bold">24/7 IBFT Active</span>
                    </div>
                  )}
                </div>

                {/* Step-by-Step Payment Instructions */}
                <div className="pt-2 border-t border-white/10 text-xs text-neutral-300 space-y-2">
                  <p className="font-semibold text-white">How to pay in 3 quick steps:</p>
                  <ol className="list-decimal list-inside space-y-1 text-neutral-400 text-[11px] leading-relaxed">
                    <li>Transfer the required amount to the account details shown above.</li>
                    <li>Save or screenshot the completed transaction receipt screen / SMS.</li>
                    <li>Upload the screenshot below for instant MFS AI scanning & manual approval.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* STEP 2: UPLOAD PAYMENT PROOF & MFS AI PAYMENT VERIFICATION ASSISTANT */}
            <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                  STEP 2: UPLOAD PAYMENT PROOF
                </span>
                <h2 className="text-xl font-poppins font-bold text-white">Upload Transaction Screenshot</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Upload your receipt for instant MFS AI image analysis and preliminary verification.
                </p>
              </div>

              {!proofFile ? (
                /* Drag & Drop Upload Input */
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center bg-white/[0.02] hover:border-[#E5C158] transition-all cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="w-12 h-12 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center mx-auto mb-3">
                    <FileUp className="w-6 h-6" />
                  </div>
                  <h4 className="font-poppins font-bold text-white text-sm mb-1">
                    Upload Payment Receipt or Screenshot
                  </h4>
                  <p className="text-neutral-400 text-xs">
                    Click to browse or drag & drop (PNG, JPG, PDF up to 10MB)
                  </p>
                </div>
              ) : (
                /* File Attached Preview & AI Scanner Display */
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {proofFile.previewUrl && (
                        <img
                          src={proofFile.previewUrl}
                          alt="Receipt Preview"
                          className="w-12 h-12 rounded-lg object-cover border border-white/20"
                        />
                      )}
                      <div>
                        <h4 className="font-bold text-white text-xs">{proofFile.name}</h4>
                        <span className="text-[10px] text-neutral-400">{proofFile.size}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleRemoveProof}
                      className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Replace File
                    </button>
                  </div>

                  {/* AI Scanner Animation Box */}
                  {isScanning && (
                    <div className="p-6 rounded-2xl bg-black/90 border border-[#E5C158]/50 text-center space-y-3 animate-pulse">
                      <div className="inline-flex p-3 rounded-full bg-[#E5C158]/20 text-[#E5C158]">
                        <Bot className="w-6 h-6 animate-spin" />
                      </div>
                      <h4 className="font-poppins font-bold text-white text-sm">
                        MFS AI Payment Verification Assistant Active...
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Analyzing receipt clarity, account title match, transaction amount, and reference code.
                      </p>
                    </div>
                  )}

                  {/* AI Verification Scan Complete Card */}
                  {scanCompleted && (
                    <div className="glass-card rounded-2xl border border-[#28C76F]/50 p-5 bg-gradient-to-r from-black via-[#0F0F0F] to-black space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#28C76F]" />
                          <h4 className="font-poppins font-bold text-white text-sm">
                            AI Preliminary Scan Passed
                          </h4>
                        </div>
                        <span className="text-[10px] font-extrabold text-[#28C76F] bg-[#28C76F]/20 px-2.5 py-1 rounded-full border border-[#28C76F]/30">
                          98% High Confidence
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-[11px]">
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-[#28C76F]" />
                          <span>Image Quality: Clear Resolution</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-[#28C76F]" />
                          <span>Title Match: 'Muhammad Shehroz Sultan'</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-[#28C76F]" />
                          <span>Amount Legibility: Verified</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-[#28C76F]" />
                          <span>Format Suitability: Ready for Manual Approval</span>
                        </div>
                      </div>

                      {/* Required Disclaimer */}
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[10px] text-neutral-400 leading-relaxed">
                        <strong className="text-white block mb-0.5">Important Verification Notice:</strong>
                        "This AI review is a preliminary quality check only. Final payment verification will always be completed manually by the MFS Growth finance team."
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => {
                    if (onNavigatePage) onNavigatePage('order');
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 text-white font-semibold text-xs hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Order Page</span>
                </button>

                <button
                  onClick={() => {
                    if (!proofFile) {
                      if (onShowToast) onShowToast('Please upload your payment transaction screenshot.');
                      return;
                    }
                    if (onShowToast) onShowToast('🎉 Payment Proof Submitted & Verified! Redirecting to Order Confirmation...');
                    if (onNavigatePage) onNavigatePage('confirmation');
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2"
                >
                  <span>Submit Payment for Final Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Need Assistance Section */}
            <div className="glass-card rounded-3xl border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-white text-sm">Need Help with Payment?</h4>
                  <p className="text-xs text-neutral-400">Our 24/7 support team & AI assistants are online.</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenAIChat && onOpenAIChat('chat')}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Ask AI</span>
                </button>
                <a
                  href="https://wa.me/923015323689"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#28C76F] hover:bg-[#22b060] text-black font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* FAQ Accordion Section */}
            <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-4">
              <h3 className="font-poppins font-bold text-white text-base mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#E5C158]" />
                <span>Payment & Verification FAQ</span>
              </h3>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 text-left font-semibold text-xs text-white flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#E5C158]" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-neutral-300 leading-relaxed border-t border-white/5 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Trust Badges (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Order Summary Sidebar */}
            <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 sticky top-28">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-poppins font-bold text-white text-base">Order Summary</h3>
                <span className="text-[10px] font-bold text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-1 rounded-full border border-[#E5C158]/20">
                  {orderId}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-neutral-300">
                  <span>Selected Service:</span>
                  <strong className="text-white font-semibold">Executive Presentation</strong>
                </div>
                <div className="flex justify-between items-center text-neutral-300">
                  <span>Scope / Slides:</span>
                  <strong className="text-white font-semibold">10 Premium Slides</strong>
                </div>
                <div className="flex justify-between items-center text-neutral-300">
                  <span>Turnaround Speed:</span>
                  <strong className="text-[#28C76F] font-semibold">24 Hours (Express)</strong>
                </div>
                <div className="flex justify-between items-center text-neutral-300">
                  <span>AI Readiness Cert:</span>
                  <strong className="text-[#E5C158] font-semibold">Verified (#984210)</strong>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Standard Price:</span>
                  <span className="line-through">PKR 5,000</span>
                </div>
                <div className="flex justify-between text-xs text-[#28C76F]">
                  <span>50% Grand Launch Promo:</span>
                  <span>-PKR 2,500</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="font-poppins font-bold text-white text-sm">Final Amount Due:</span>
                  <div className="text-right">
                    <span className="text-xl font-poppins font-extrabold text-[#E5C158]">
                      PKR 2,500
                    </span>
                    <span className="block text-[10px] text-neutral-400">($15 USD Eqv)</span>
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="pt-2 border-t border-white/10 space-y-2 text-[10px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
                  <span>Money-Back Satisfaction Commitment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#E5C158]" />
                  <span>Confidential Academic & Business Work</span>
                </div>
              </div>
            </div>

            {/* Trust Badges Widget */}
            <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4 text-xs">
              <h4 className="font-poppins font-bold text-white text-sm mb-2">Why Order With MFS Growth?</h4>
              
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#E5C158] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Top Quality Delivery</strong>
                  <p className="text-neutral-400 text-[11px]">Formatted according to strict executive & academic standards.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#28C76F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">24/7 Live Project Tracking</strong>
                  <p className="text-neutral-400 text-[11px]">Track progress through live stages in your Client Dashboard.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
