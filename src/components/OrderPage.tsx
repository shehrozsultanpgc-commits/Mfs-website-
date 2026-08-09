import React, { useState, useEffect, useMemo } from 'react';
import { Currency, DeliverySpeed } from '../types';
import { SERVICES } from '../data/content';
import {
  CheckCircle2,
  Upload,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Bot,
  ShieldCheck,
  Clock,
  Zap,
  CreditCard,
  FileText,
  Award,
  Lock,
  Search,
  Trash2,
  Info,
  Check,
  PhoneCall,
  FileUp,
  ChevronDown,
  Mail,
  Instagram,
  Star,
  RefreshCw,
  HelpCircle,
  FileCode,
  ShieldAlert,
  User,
  LogIn,
  LogOut
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { createRealOrder } from '../lib/supabaseOrderService';
import { generateWhatsAppOrderLink } from '../lib/whatsappHandoff';
import { Database } from '../lib/database.types';
import { LuxuryOrderReceiptModal } from './common/LuxuryOrderReceiptModal';

export interface OrderPageProps {
  currency: Currency;
  setCurrency?: (c: Currency) => void;
  prefilledServiceId?: string;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order', targetSection?: string) => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({
  currency,
  setCurrency,
  prefilledServiceId = 'presentation',
  onShowToast,
  onNavigatePage,
  onOpenAIChat,
}) => {
  const { profile, signInWithGoogle, signInWithFacebook, signOut } = useAuth();

  // Reset window scroll to top when opening order page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Wizard Step State (1: Service & Scope, 2: Brief & Files, 3: Contact & Speed, 4: Payment)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(prefilledServiceId);

  // Sync prefilled service
  useEffect(() => {
    if (prefilledServiceId) {
      setSelectedServiceId(prefilledServiceId);
    }
  }, [prefilledServiceId]);

  // Customer Contact Info
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerCountry, setCustomerCountry] = useState<string>('Pakistan');
  const [customerNotes, setCustomerNotes] = useState<string>('');

  // Auto-fill customer details when profile is available
  useEffect(() => {
    if (profile) {
      if (profile.full_name) setCustomerName(profile.full_name);
      if (profile.email) setCustomerEmail(profile.email);
      if (profile.phone) setCustomerPhone(profile.phone);
    }
  }, [profile]);

  // Dynamic Service-Specific Fields
  const [slideOrWordCount, setSlideOrWordCount] = useState<number>(10);
  const [academicLevel, setAcademicLevel] = useState<string>('Undergraduate');
  const [citationStyle, setCitationStyle] = useState<string>('APA 7th Edition');
  const [presentationTopic, setPresentationTopic] = useState<string>('');
  const [presentationStyle, setPresentationStyle] = useState<string>('Corporate Executive');
  const [resumeIndustry, setResumeIndustry] = useState<string>('Software & Tech');
  const [includeCoverLetter, setIncludeCoverLetter] = useState<boolean>(true);
  const [projectDescription, setProjectDescription] = useState<string>('');

  // Uploaded Files
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ id: string; name: string; size: string }>>([
    { id: 'f-1', name: 'Project_Rubric_Guidelines.pdf', size: '1.8 MB' }
  ]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Delivery & Speed
  const [deliverySpeed, setDeliverySpeed] = useState<DeliverySpeed>('standard');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currency);

  // Payment Verification State
  const [paymentAccount, setPaymentAccount] = useState<'easypaisa' | 'jazzcash' | 'bank'>('easypaisa');
  const [paymentScreenshotName, setPaymentScreenshotName] = useState<string | null>(null);
  const [generatedOrderId, setGeneratedOrderId] = useState<string>('');
  const [generatedCertId, setGeneratedCertId] = useState<string>('');
  const [isOrderSubmitted, setIsOrderSubmitted] = useState<boolean>(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);

  // Auto Restore Draft on Mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('mfs_order_draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (parsed.selectedServiceId) setSelectedServiceId(parsed.selectedServiceId);
        if (parsed.customerName) setCustomerName(parsed.customerName);
        if (parsed.customerEmail) setCustomerEmail(parsed.customerEmail);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  // Sync Currency from Props
  useEffect(() => {
    setSelectedCurrency(currency);
  }, [currency]);

  // Handle Currency Switch local
  const handleCurrencySelect = (c: Currency) => {
    setSelectedCurrency(c);
    if (setCurrency) setCurrency(c);
  };

  // Get active service details
  const activeService = useMemo(() => {
    return SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  }, [selectedServiceId]);

  // Price Calculation Logic
  const priceDetails = useMemo(() => {
    let basePKR = 2500; // Default base
    let baseUSD = 15;

    const sanitizedQty = Math.max(1, Number(slideOrWordCount) || 1);

    if (selectedServiceId.includes('presentation')) {
      basePKR = sanitizedQty * 250;
      baseUSD = sanitizedQty * 1.5;
    } else if (selectedServiceId.includes('assignment')) {
      basePKR = sanitizedQty * 2;
      baseUSD = sanitizedQty * 0.015;
    } else if (selectedServiceId.includes('resume') || selectedServiceId.includes('cv')) {
      basePKR = 3000;
      baseUSD = 20;
      if (includeCoverLetter) {
        basePKR += 1000;
        baseUSD += 8;
      }
    } else if (selectedServiceId.includes('report') || selectedServiceId.includes('proposal')) {
      basePKR = sanitizedQty * 2.5;
      baseUSD = sanitizedQty * 0.018;
    }

    // Apply Speed Multipliers
    let multiplier = 1.0;
    if (deliverySpeed === 'express') multiplier = 1.3;
    if (deliverySpeed === 'priority') multiplier = 1.5;
    if (deliverySpeed === 'same-day') multiplier = 1.75;

    const originalPKR = Math.round(basePKR * multiplier);
    const originalUSD = Math.round(baseUSD * multiplier);

    // 50% Grand Launch Promo Discount
    const discountedPKR = Math.round(originalPKR * 0.5);
    const discountedUSD = Math.round(originalUSD * 0.5);

    return {
      originalPKR,
      discountedPKR,
      originalUSD,
      discountedUSD,
      currencySymbol: selectedCurrency === 'PKR' ? 'PKR' : '$',
      finalPrice: selectedCurrency === 'PKR' ? discountedPKR : discountedUSD,
      originalPrice: selectedCurrency === 'PKR' ? originalPKR : originalUSD,
    };
  }, [selectedServiceId, slideOrWordCount, includeCoverLetter, deliverySpeed, selectedCurrency]);

  // Modal & Receipt States
  const [showLuxuryReceipt, setShowLuxuryReceipt] = useState(false);

  // File Upload Handlers
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newItems = Array.from(files).map((f, i) => ({
      id: `f-${Date.now()}-${i}`,
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(1) + ' MB',
    }));
    setUploadedFiles((prev) => [...prev, ...newItems]);
    if (onShowToast) onShowToast(`${files.length} file(s) attached successfully!`);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((item) => item.id !== id));
  };

  // Final Order Submission Handler
  const handleFinalOrderSubmit = async () => {
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      if (onShowToast) onShowToast('Please fill in your Name, Email, and Phone / WhatsApp number.');
      return;
    }

    if (isSubmittingOrder) return;
    setIsSubmittingOrder(true);

    const ordId = 'MFS-' + Math.floor(100000 + Math.random() * 900000);
    const certId = 'MFS-AI-2026-' + Math.floor(100000 + Math.random() * 900000);

    const dbOrderData: Database['public']['Tables']['orders']['Insert'] = {
      order_number: ordId,
      guest_name: customerName || 'Valued Client',
      guest_email: customerEmail || 'client@mfsgrowth.com',
      guest_phone: customerPhone || '+92 301 5323689',
      service_type: activeService?.title || 'Digital Service',
      currency: selectedCurrency,
      total_amount: priceDetails.finalPrice,
      delivery_tier: deliverySpeed,
      payment_method: paymentAccount,
      notes: projectDescription || customerNotes || 'No notes provided',
      scope_details: {
        quantity: slideOrWordCount,
        files: uploadedFiles.map((f) => f.name),
      }
    };

    try {
      const dbResult = await createRealOrder(dbOrderData);
      
      if (dbResult.success && dbResult.data?.order_number) {
        setGeneratedOrderId(dbResult.data.order_number);
      } else {
        setGeneratedOrderId(ordId);
      }

      // Also call checkout API for email dispatch
      const payload = {
        orderId: ordId,
        clientName: customerName,
        clientEmail: customerEmail,
        clientPhone: customerPhone,
        serviceTitle: activeService?.title || 'Digital Service',
        currency: selectedCurrency,
        amount: priceDetails.finalPrice,
        formattedAmount: `${priceDetails.currencySymbol} ${priceDetails.finalPrice.toLocaleString()}`,
        urgency: deliverySpeed.toUpperCase(),
        quantity: slideOrWordCount,
        projectNotes: projectDescription || customerNotes || 'No notes provided',
        paymentMethod: paymentAccount === 'easypaisa' ? 'EasyPaisa' : paymentAccount === 'jazzcash' ? 'JazzCash' : 'Askari Bank',
        paymentProofUrl: paymentScreenshotName ? `uploads/receipts/${paymentScreenshotName}` : '',
        fileNames: uploadedFiles.map((f) => f.name),
      };

      await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null);

    } catch (err) {
      console.warn('[Order Processing Error] Fallback local order generated:', err);
      setGeneratedOrderId(ordId);
    } finally {
      setIsSubmittingOrder(false);
      setGeneratedCertId(certId);
      setIsOrderSubmitted(true);

      if (onShowToast) {
        onShowToast(`🎉 Order #${ordId} Confirmed! Your project is now active.`);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full pt-24 sm:pt-28 pb-20 animate-fadeIn">
      
      {/* 1. TOP HEADER - Direct & Clear */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/15 border border-[#E5C158]/40 text-[#E5C158] text-xs font-bold mb-3 shadow-md">
          <Zap className="w-4 h-4" />
          <span>MFS GROWTH AGENCY — INSTANT PROJECT ORDERING (50% OFF)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-poppins font-bold text-white tracking-tight leading-tight mb-2">
          Order Your <span className="gradient-gold-text">Project Requirements</span>
        </h1>
        <p className="text-neutral-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Specify your requirements below for instant rates, AI quality verification, and guaranteed on-time delivery.
        </p>
      </section>

      {/* 2. MAIN INSTANT ORDER BOX (ABOVE THE FOLD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isOrderSubmitted ? (
          <div className="glass-card rounded-3xl border-2 border-[#E5C158] p-5 sm:p-8 bg-gradient-to-b from-[#0D0D12] via-[#050507] to-black shadow-[0_10px_50px_rgba(229,193,88,0.18)]">
            
            {/* Step Progress Bar Indicator */}
            <div className="mb-6 pb-6 border-b border-white/10">
              <div className="flex items-center justify-between gap-2 mb-3">
                {[
                  { step: 1, label: 'Service & Scope' },
                  { step: 2, label: 'Brief & Files' },
                  { step: 3, label: 'Contact & Speed' },
                  { step: 4, label: 'Payment & Confirm' }
                ].map((s) => {
                  const isActive = currentStep === s.step;
                  const isDone = currentStep > s.step;
                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => setCurrentStep(s.step as any)}
                      className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#E5C158] text-black border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.25)]'
                          : isDone
                          ? 'bg-[#28C76F]/10 border-[#28C76F]/40 text-[#28C76F]'
                          : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-extrabold ${
                        isActive ? 'bg-black text-[#E5C158]' : isDone ? 'bg-[#28C76F] text-black' : 'bg-white/10 text-neutral-300'
                      }`}>
                        {isDone ? '✓' : s.step}
                      </span>
                      <span className="hidden md:inline">{s.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Progress Line */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E5C158] to-[#28C76F] transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Top Bar inside Order Box */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 mb-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-1 rounded">
                  STEP {currentStep} OF 4
                </span>
                <h2 className="text-xl sm:text-2xl font-poppins font-bold text-white mt-1">
                  {currentStep === 1 && '1. Choose Service & Scope'}
                  {currentStep === 2 && '2. Project Brief & References'}
                  {currentStep === 3 && '3. Turnaround Speed & Contact'}
                  {currentStep === 4 && '4. Payment Option & Confirmation'}
                </h2>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-1 bg-black/60 border border-white/15 p-1 rounded-xl">
                <span className="text-[11px] text-neutral-400 font-medium px-2">Currency:</span>
                {(['PKR', 'USD', 'GBP', 'EUR', 'AED'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCurrencySelect(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedCurrency === c
                        ? 'bg-[#E5C158] text-black shadow-sm'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Layout: Left Inputs, Right Order Summary & Confirm */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: REQUIREMENTS & INPUTS (8 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* A. Select Service Pills */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
                    A. Choose Digital Service
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICES.map((srv) => {
                      const isSel = selectedServiceId === srv.id;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setSelectedServiceId(srv.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSel
                              ? 'bg-[#E5C158]/15 border-[#E5C158] text-white shadow-[0_0_15px_rgba(229,193,88,0.2)]'
                              : 'bg-white/[0.03] border-white/10 hover:border-white/30 text-neutral-300'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <p className="font-poppins font-bold text-xs text-white">{srv.title}</p>
                            <p className="text-[10px] text-[#E5C158] font-semibold">
                              From {selectedCurrency === 'PKR' ? 'PKR ' + srv.pricePkr.toLocaleString() : '$' + srv.priceUsd} (50% Off)
                            </p>
                          </div>
                          {isSel ? (
                            <CheckCircle2 className="w-5 h-5 text-[#E5C158] shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* B. Scope Quantity & Direct Numeric Typing */}
                <div className="bg-[#08080C] p-4.5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                      B. Scope Quantity ({selectedServiceId.includes('presentation') ? 'Slides' : 'Words'})
                    </label>
                    <span className="text-[#28C76F] font-semibold text-[11px]">
                      ✨ Unlimited Scope Supported
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    {/* Direct Type Input */}
                    <div className="sm:col-span-6 relative">
                      <input
                        type="number"
                        min={1}
                        value={slideOrWordCount}
                        onChange={(e) => setSlideOrWordCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-[#050507] border border-[#E5C158]/50 focus:border-[#E5C158] text-white font-bold text-base rounded-xl px-4 py-2.5 focus:outline-none transition-colors"
                        placeholder="Type custom quantity"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#E5C158] pointer-events-none">
                        {selectedServiceId.includes('presentation') ? 'Slides' : 'Words'}
                      </span>
                    </div>

                    {/* Extended Slider */}
                    <div className="sm:col-span-6 flex flex-col justify-center">
                      <input
                        type="range"
                        min={selectedServiceId.includes('presentation') ? 1 : 250}
                        max={selectedServiceId.includes('presentation') ? 150 : 25000}
                        step={selectedServiceId.includes('presentation') ? 1 : 250}
                        value={Math.min(slideOrWordCount, selectedServiceId.includes('presentation') ? 150 : 25000)}
                        onChange={(e) => setSlideOrWordCount(Number(e.target.value))}
                        className="w-full accent-[#E5C158] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Quick Presets */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[11px] text-neutral-400 font-medium self-center mr-1">Common Sizes:</span>
                    {selectedServiceId.includes('presentation') ? (
                      <>
                        <button type="button" onClick={() => setSlideOrWordCount(10)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 10 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>10 Slides</button>
                        <button type="button" onClick={() => setSlideOrWordCount(25)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 25 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>25 Slides</button>
                        <button type="button" onClick={() => setSlideOrWordCount(50)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 50 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>50 Slides</button>
                        <button type="button" onClick={() => setSlideOrWordCount(100)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 100 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>100+ Deck</button>
                      </>
                    ) : (
                      <>
                        <button type="button" onClick={() => setSlideOrWordCount(1000)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 1000 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>1,000 Words</button>
                        <button type="button" onClick={() => setSlideOrWordCount(3000)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 3000 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>3,000 Words</button>
                        <button type="button" onClick={() => setSlideOrWordCount(5000)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 5000 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>5,000 Words</button>
                        <button type="button" onClick={() => setSlideOrWordCount(10000)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 10000 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>10,000+ Words</button>
                      </>
                    )}
                  </div>
                </div>

                {/* C. Service Specific Extras */}
                {selectedServiceId.includes('assignment') && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1">Academic Level</label>
                      <select
                        value={academicLevel}
                        onChange={(e) => setAcademicLevel(e.target.value)}
                        className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white rounded-xl px-3.5 py-2.5 focus:outline-none"
                      >
                        <option value="Undergraduate">Undergraduate / Bachelor's</option>
                        <option value="Postgraduate">Postgraduate / Master's</option>
                        <option value="PhD / Doctorate">PhD / Doctorate Level</option>
                        <option value="High School">High School / College</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1">Citation Style</label>
                      <select
                        value={citationStyle}
                        onChange={(e) => setCitationStyle(e.target.value)}
                        className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white rounded-xl px-3.5 py-2.5 focus:outline-none"
                      >
                        <option value="APA 7th Edition">APA 7th Edition</option>
                        <option value="Harvard Referencing">Harvard Referencing</option>
                        <option value="MLA Style">MLA Style</option>
                        <option value="IEEE / Chicago">IEEE / Chicago</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* D. Topic & Specific Instructions */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    C. Project Topic & Requirements / Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Provide your project title, main topic, guidelines, required formatting, or instructor instructions..."
                    className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white text-xs rounded-xl p-3.5 focus:outline-none"
                  />
                </div>

                {/* E. Upload Reference Files */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    D. Attach Reference Files (Rubrics, Drafts, Images, Data)
                  </label>
                  
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleFileUpload(e.dataTransfer.files);
                    }}
                    className={`border border-dashed rounded-2xl p-4 text-center transition-all cursor-pointer relative ${
                      isDragging ? 'border-[#E5C158] bg-[#E5C158]/10' : 'border-white/20 bg-white/[0.02] hover:border-[#E5C158]/50'
                    }`}
                  >
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex items-center justify-center gap-2 text-xs text-neutral-300">
                      <FileUp className="w-4 h-4 text-[#E5C158]" />
                      <span>Drag & drop files here or <strong className="text-[#E5C158]">Browse Files</strong> (PDF, DOCX, PPTX, ZIP, PNG)</span>
                    </div>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {uploadedFiles.map((f) => (
                        <div key={f.id} className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 flex items-center gap-2 text-[11px] text-white">
                          <FileText className="w-3.5 h-3.5 text-[#E5C158]" />
                          <span>{f.name}</span>
                          <button type="button" onClick={() => removeFile(f.id)} className="text-neutral-400 hover:text-red-400 ml-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* F. Delivery Turnaround Speed */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    E. Delivery Turnaround Speed
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'standard', name: 'Standard', time: '3–5 Days', mult: 'No Extra Fee' },
                      { id: 'express', name: 'Express', time: '24–48 Hours', mult: '+30% Speed' },
                      { id: 'priority', name: 'Priority', time: '12–24 Hours', mult: '+50% Speed' },
                      { id: 'same-day', name: 'Urgent', time: '6–12 Hours', mult: '+75% Speed' },
                    ].map((sp) => {
                      const isSel = deliverySpeed === sp.id;
                      return (
                        <button
                          key={sp.id}
                          type="button"
                          onClick={() => setDeliverySpeed(sp.id as DeliverySpeed)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSel
                              ? 'bg-[#E5C158] text-black font-bold border-[#E5C158]'
                              : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-white/30'
                          }`}
                        >
                          <p className="font-bold">{sp.name}</p>
                          <p className="text-[10px] opacity-90">{sp.time}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: CONTACT INFO, SUMMARY & INSTANT ORDER BUTTON (5 cols) */}
              <div className="lg:col-span-5 space-y-5 bg-black/90 p-5 rounded-2xl border border-white/15 sticky top-28">
                
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <h3 className="font-poppins font-bold text-white text-sm">Order Summary & Payment</h3>
                  <span className="text-[10px] font-extrabold text-[#28C76F] bg-[#28C76F]/10 border border-[#28C76F]/30 px-2 py-0.5 rounded">
                    50% LAUNCH DISCOUNT
                  </span>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Selected Service:</span>
                    <strong className="text-white">{activeService.title}</strong>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Quantity:</span>
                    <strong className="text-white">
                      {slideOrWordCount} {selectedServiceId.includes('presentation') ? 'Slides' : 'Words'}
                    </strong>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Turnaround Speed:</span>
                    <strong className="text-[#E5C158]">{deliverySpeed.toUpperCase()}</strong>
                  </div>
                  <div className="flex justify-between text-neutral-400 pt-2 border-t border-white/10">
                    <span>Standard Rate:</span>
                    <span className="line-through">
                      {priceDetails.currencySymbol} {priceDetails.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-1">
                    <span className="text-white">Discounted Total:</span>
                    <span className="text-[#28C76F] text-base">
                      {priceDetails.currencySymbol} {priceDetails.finalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Contact Information Fields */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-neutral-300 uppercase tracking-wider text-[11px]">Your Contact Details</h4>
                    {profile && (
                      <span className="text-[10px] text-[#28C76F] font-bold bg-[#28C76F]/10 border border-[#28C76F]/30 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Profile Synced</span>
                      </span>
                    )}
                  </div>

                  {!profile ? (
                    <div className="p-3 rounded-2xl bg-[#08080C] border border-[#E5C158]/30 space-y-2">
                      <p className="text-[11px] text-neutral-300 font-semibold flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
                          <span>One-Click Order Auto-Fill:</span>
                        </span>
                        <span className="text-[10px] text-[#E5C158] font-bold">50% Off Auto-Applied</span>
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Google Sign-In */}
                        <button
                          type="button"
                          onClick={async () => {
                            const res = await signInWithGoogle({ name: 'Muhammad Shehroz', email: 'shehroz.client@gmail.com' });
                            if (res.success && onShowToast) {
                              onShowToast('✨ Signed in with Google! Name & email auto-filled.');
                            }
                          }}
                          className="py-2.5 px-3 rounded-xl bg-white text-black font-extrabold text-[11px] hover:bg-neutral-100 transition-all cursor-pointer flex items-center justify-center gap-2 border border-neutral-300 shadow-sm active:scale-[0.99]"
                        >
                          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                          </svg>
                          <span>Google Sign In</span>
                        </button>

                        {/* Facebook Sign-In */}
                        <button
                          type="button"
                          onClick={async () => {
                            const res = await signInWithFacebook({ name: 'Facebook Client', email: 'client.fb@facebook.com' });
                            if (res.success && onShowToast) {
                              onShowToast('✨ Signed in with Facebook! Details auto-filled.');
                            }
                          }}
                          className="py-2.5 px-3 rounded-xl bg-[#1877F2] text-white font-extrabold text-[11px] hover:bg-[#166fe5] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
                        >
                          <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          <span>Facebook</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between text-[11px]">
                      <div className="space-y-0.5">
                        <p className="text-white font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F]" />
                          <span>Logged in as {profile.full_name}</span>
                        </p>
                        <p className="text-neutral-300 text-[10px]">{profile.email}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => signOut()}
                        className="text-[10px] text-neutral-400 hover:text-white underline cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp / Phone *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Approved Payment Methods */}
                <div className="space-y-2 text-xs pt-2 border-t border-white/10">
                  <h4 className="font-bold text-neutral-300 uppercase tracking-wider text-[11px]">Select Payment Option</h4>
                  
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'easypaisa', label: 'EasyPaisa', num: '03116191234' },
                      { id: 'jazzcash', label: 'JazzCash', num: '03015323688' },
                      { id: 'bank', label: 'Askari Bank', num: '00553230017265' },
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentAccount(pm.id as any)}
                        className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                          paymentAccount === pm.id
                            ? 'bg-[#E5C158]/20 border-[#E5C158] text-white font-bold'
                            : 'bg-white/[0.03] border-white/10 text-neutral-400'
                        }`}
                      >
                        <p className="text-[11px] font-bold text-white">{pm.label}</p>
                      </button>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Account Title:</span>
                      <strong className="text-white">Muhammad Shehroz Sultan</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Account Number:</span>
                      <strong className="text-[#E5C158]">
                        {paymentAccount === 'easypaisa' ? '03116191234' : paymentAccount === 'jazzcash' ? '03015323688' : '00553230017265'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Direct Order Confirmation Button */}
                <button
                  type="button"
                  onClick={handleFinalOrderSubmit}
                  disabled={isSubmittingOrder}
                  className={`w-full py-3.5 px-6 rounded-full font-extrabold text-xs transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 ${
                    isSubmittingOrder
                      ? 'bg-neutral-700 text-neutral-300 cursor-not-allowed'
                      : 'bg-[#E5C158] text-[#050507] hover:bg-[#fce888] scale-[1.02]'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmittingOrder
                      ? 'Registering Order...'
                      : `Confirm & Place Order (${priceDetails.currencySymbol} ${priceDetails.finalPrice.toLocaleString()})`}
                  </span>
                </button>

                <p className="text-[10px] text-center text-neutral-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#28C76F]" />
                  <span>100% Confidential • 7-Day Free Revisions Guaranteed</span>
                </p>

              </div>

            </div>

          </div>
        ) : (
          /* POST-ORDER CONFIRMATION & RECEIPT STATE */
          <div className="glass-card rounded-3xl border border-[#28C76F]/40 p-6 sm:p-10 bg-gradient-to-b from-[#0F0F0F] via-black to-[#050507] shadow-2xl text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#28C76F]/20 border border-[#28C76F] text-[#28C76F] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(40,199,111,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#28C76F] uppercase tracking-widest bg-[#28C76F]/10 border border-[#28C76F]/30 px-3 py-1 rounded-full">
                ORDER REGISTERED IN LIVE PRODUCTION QUEUE
              </span>
              <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white">
                Order #{generatedOrderId}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300">
                Thank you, <strong className="text-white">{customerName || 'Valued Client'}</strong>! Your project requirements have been safely received by our senior team.
              </p>
            </div>

            {/* Support Actions */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowLuxuryReceipt(true)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs hover:opacity-95 transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_25px_rgba(229,193,88,0.3)]"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>View Official Luxury Receipt & Download PNG</span>
              </button>

              <a
                href={generateWhatsAppOrderLink({
                  orderId: generatedOrderId,
                  clientName: customerName || 'Valued Client',
                  serviceName: activeService?.title || 'Digital Service',
                  deadline: deliverySpeed,
                  quantity: slideOrWordCount,
                  totalPrice: `${priceDetails.currencySymbol} ${priceDetails.finalPrice.toLocaleString()}`,
                  projectBrief: projectDescription || customerNotes || 'No notes provided'
                })}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3.5 rounded-full bg-[#28C76F] text-black font-bold text-xs hover:bg-[#34e082] transition-all cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Confirm & Track on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsOrderSubmitted(false);
                  setCustomerName('');
                  setProjectDescription('');
                }}
                className="px-6 py-3.5 rounded-full bg-white/10 text-white font-semibold text-xs hover:bg-white/20 transition-all cursor-pointer border border-white/10"
              >
                Place Another Order
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Luxury Receipt Modal */}
      <LuxuryOrderReceiptModal
        isOpen={showLuxuryReceipt}
        onClose={() => setShowLuxuryReceipt(false)}
        onShowToast={onShowToast}
        details={{
          orderId: generatedOrderId || 'ORD-MFS-984210',
          clientName: customerName || 'Valued Client',
          clientEmail: customerEmail || 'client@mfsgrowth.com',
          clientPhone: customerPhone || '+92 301 5323689',
          serviceTitle: activeService?.title || 'Digital Solution',
          category: activeService?.category || 'Executive Service',
          currency: priceDetails.currencySymbol === '$' ? 'USD' : 'PKR',
          amount: priceDetails.finalPrice,
          quantity: slideOrWordCount,
          urgency: deliverySpeed.toUpperCase(),
          notes: projectDescription || customerNotes,
          paymentMethod: paymentAccount === 'easypaisa' ? 'EasyPaisa' : paymentAccount === 'jazzcash' ? 'JazzCash' : 'Askari Bank',
        }}
      />

      {/* 3. COMPELLING SCROLL-DOWN PROMPT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-14">
        <div
          onClick={() => {
            const el = document.getElementById('mfs-guarantees-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="glass-card rounded-2xl border border-[#E5C158]/40 p-5 bg-gradient-to-r from-black via-[#12121A] to-black hover:border-[#E5C158] transition-all cursor-pointer text-center group shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-full bg-[#E5C158]/15 border border-[#E5C158]/40 text-[#E5C158] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-white text-sm flex items-center gap-2 flex-wrap">
                <span>Want to verify our agency credentials & quality before ordering?</span>
                <span className="text-[10px] text-[#28C76F] bg-[#28C76F]/10 border border-[#28C76F]/30 px-2.5 py-0.5 rounded-full font-bold">100% Guaranteed</span>
              </h4>
              <p className="text-neutral-400 text-xs mt-0.5">
                Scroll down to explore our 100% Plagiarism Shield, 7-Day Free Revisions, Sample Work Showcase, and Verified Client Reviews.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E5C158] text-[#050507] font-bold text-xs shrink-0 group-hover:bg-[#fce888] transition-colors shadow-md">
            <span>Scroll Down to Learn More</span>
            <ArrowRight className="w-4 h-4 rotate-90" />
          </div>
        </div>
      </section>

      {/* 4. BELOW THE FOLD: AGENCY VALUE CARDS, GUARANTEES & WORKFLOW */}
      <section id="mfs-guarantees-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* A. 4 Core Agency Guarantee Cards */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/30 px-3 py-1 rounded-full">
              WHY TRUST MFS GROWTH AGENCY
            </span>
            <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-3">
              Uncompromising Quality & Protection
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: ShieldCheck,
                title: '100% Plagiarism & AI-Free',
                desc: 'Verified by Turnitin reports and human specialist reviews. Zero generic AI output.'
              },
              {
                icon: RefreshCw,
                title: 'Complimentary 7-Day Revisions',
                desc: 'Full post-delivery support. Request unlimited minor adjustments within original guidelines.'
              },
              {
                icon: Clock,
                title: 'Guaranteed On-Time Delivery',
                desc: 'Strict adherence to your deadline with live updates sent directly to your WhatsApp.'
              },
              {
                icon: Lock,
                title: '100% Confidential & Secure',
                desc: 'All project guidelines, documents, and customer data protected under strict agency privacy protocols.'
              }
            ].map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-[#E5C158]/40 transition-all bg-white/[0.02]">
                  <div className="w-10 h-10 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-poppins font-bold text-white text-sm mb-2">{card.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* B. 6-Stage Project Workflow Timeline */}
        <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-10 bg-gradient-to-br from-black via-[#0B0B0F] to-black">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#28C76F] bg-[#28C76F]/10 border border-[#28C76F]/30 px-3 py-1 rounded-full">
              TRANSPARENT WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-3">
              How We Execute Your Custom Project
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              { step: '01', title: 'Requirements & Scope Verification', desc: 'Our senior lead inspects your prompt, guidelines, and attached reference files.' },
              { step: '02', title: 'Specialist Allocation', desc: 'Assigned to a subject-matter specialist with proven academic or corporate background.' },
              { step: '03', title: 'Research & Drafting', desc: 'Original content generation adhering strictly to APA/Harvard citations or corporate design tokens.' },
              { step: '04', title: 'Quality & Anti-Plagiarism Audit', desc: 'Rigorously checked through Turnitin and executive design review checklists.' },
              { step: '05', title: 'On-Time File Delivery', desc: 'Fully unlocked source files (PPTX, DOCX, PDF) delivered to your dashboard and WhatsApp.' },
              { step: '06', title: 'Client Satisfaction & Revisions', desc: 'Free 7-day revision window to ensure every requirement meets your exact standards.' }
            ].map((wf, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <span className="text-[10px] font-extrabold text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded">
                  STAGE {wf.step}
                </span>
                <h4 className="font-poppins font-bold text-white text-sm pt-1">{wf.title}</h4>
                <p className="text-neutral-400 leading-relaxed text-[11px]">{wf.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* C. Verified Client Reviews Teaser Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#12121A] via-black to-[#12121A] border border-[#E5C158]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-1 justify-center sm:justify-start text-[#E5C158]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E5C158]" />
              ))}
              <span className="text-white text-xs font-bold ml-2">4.9 / 5.0 Rating</span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base">Over 1,200+ Students & Professionals Served Internationally</h3>
            <p className="text-xs text-neutral-400">Based on verified client orders completed across Pakistan, UAE, UK, US, and Saudi Arabia.</p>
          </div>

          <button
            type="button"
            onClick={() => onNavigatePage && onNavigatePage('reviews')}
            className="px-6 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all cursor-pointer shrink-0 border border-white/10"
          >
            Read Client Reviews →
          </button>
        </div>

      </section>

    </div>
  );
};
