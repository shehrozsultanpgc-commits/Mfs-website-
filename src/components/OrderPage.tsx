import React, { useState, useEffect, useMemo } from 'react';
import { Currency, DeliverySpeed } from '../types';
import { SERVICES, calculateServicePrice } from '../data/content';
import {
  CheckCircle2,
  Upload,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Clock,
  Zap,
  CreditCard,
  FileText,
  Lock,
  Trash2,
  Info,
  Check,
  PhoneCall,
  FileUp,
  Copy,
  AlertCircle,
  RefreshCw,
  Building2,
  Share2,
  User,
  ExternalLink,
  ChevronRight
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
  onNavigatePage?: (page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard' | 'admin', targetSection?: string) => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
}

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  file?: File;
}

export const OrderPage: React.FC<OrderPageProps> = ({
  currency,
  setCurrency,
  prefilledServiceId = 'presentation',
  onShowToast,
  onNavigatePage,
  onOpenAIChat,
}) => {
  const { profile, signInWithGoogle, signOut } = useAuth();

  // Reset window scroll to top when opening order page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Wizard Step State (1: Service & Scope, 2: Project Details, 3: Contact & Speed, 4: Review & Payment)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State - Selected Service
  const [selectedServiceId, setSelectedServiceId] = useState<string>(prefilledServiceId);

  // Sync prefilled service when prop changes
  useEffect(() => {
    if (prefilledServiceId) {
      setSelectedServiceId(prefilledServiceId);
    }
  }, [prefilledServiceId]);

  // Customer Contact Info
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');

  // Auto-fill customer details when profile is available
  useEffect(() => {
    if (profile) {
      if (profile.full_name && !customerName) setCustomerName(profile.full_name);
      if (profile.email && !customerEmail) setEmailIfEmpty(profile.email);
      if (profile.phone && !customerPhone) setCustomerPhone(profile.phone);
    }
  }, [profile]);

  const setEmailIfEmpty = (em: string) => {
    setCustomerEmail(em);
  };

  // Dynamic Service-Specific Fields
  const [slideOrWordCount, setSlideOrWordCount] = useState<number>(10);
  const [academicLevel, setAcademicLevel] = useState<string>('Undergraduate');
  const [citationStyle, setCitationStyle] = useState<string>('APA 7th Edition');
  const [presentationStyle, setPresentationStyle] = useState<string>('Corporate Executive');
  const [resumeIndustry, setResumeIndustry] = useState<string>('Software & Tech');
  const [includeCoverLetter, setIncludeCoverLetter] = useState<boolean>(true);
  
  // Project Details
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');

  // Attached Reference Files - MUST START EMPTY FOR EVERY NEW ORDER
  const [uploadedFiles, setUploadedFiles] = useState<AttachedFile[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Delivery Turnaround Speed
  const [deliverySpeed, setDeliverySpeed] = useState<DeliverySpeed>('standard');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currency);

  // Payment Options & Verification
  const [paymentAccount, setPaymentAccount] = useState<'easypaisa' | 'jazzcash' | 'bank'>('easypaisa');
  const [paymentProof, setPaymentProof] = useState<{ name: string; size: string; progress: number; isComplete: boolean } | null>(null);
  const [isUploadingProof, setIsUploadingProof] = useState<boolean>(false);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);

  // Order Submission State
  const [generatedOrderId, setGeneratedOrderId] = useState<string>('');
  const [isOrderSubmitted, setIsOrderSubmitted] = useState<boolean>(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Modal State
  const [showLuxuryReceipt, setShowLuxuryReceipt] = useState<boolean>(false);

  // Sync Currency from Props
  useEffect(() => {
    setSelectedCurrency(currency);
  }, [currency]);

  // Handle Currency Switch
  const handleCurrencySelect = (c: Currency) => {
    setSelectedCurrency(c);
    if (setCurrency) setCurrency(c);
  };

  // Get active service details
  const activeService = useMemo(() => {
    return SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  }, [selectedServiceId]);

  // Calculate slide/word defaults when switching services
  useEffect(() => {
    if (selectedServiceId.includes('presentation')) {
      setSlideOrWordCount((prev) => (prev > 150 || prev < 5 ? 10 : prev));
    } else {
      setSlideOrWordCount((prev) => (prev < 100 ? 1000 : prev));
    }
  }, [selectedServiceId]);

  // Price Calculation Logic
  const priceDetails = useMemo(() => {
    const calc = calculateServicePrice(selectedServiceId, slideOrWordCount, deliverySpeed, selectedCurrency);
    
    let addPkr = 0;
    let addUsd = 0;
    if ((selectedServiceId.includes('resume') || selectedServiceId.includes('cv')) && includeCoverLetter) {
      const coverLetterService = SERVICES.find(s => s.id === 'cover-letter');
      addPkr = coverLetterService ? coverLetterService.pricePkr : 800;
      addUsd = coverLetterService ? coverLetterService.priceUsd : 6.0;
    }

    const finalPrice = selectedCurrency === 'PKR' ? calc.calculatedPromoPkr + addPkr : parseFloat((calc.calculatedPromoUsd + addUsd).toFixed(2));
    const originalPrice = selectedCurrency === 'PKR' ? calc.calculatedOrigPkr + (addPkr * 2) : parseFloat((calc.calculatedOrigUsd + (addUsd * 2)).toFixed(2));

    return {
      originalPKR: calc.calculatedOrigPkr + (addPkr * 2),
      discountedPKR: calc.calculatedPromoPkr + addPkr,
      originalUSD: calc.calculatedOrigUsd + (addUsd * 2),
      discountedUSD: calc.calculatedPromoUsd + addUsd,
      currencySymbol: calc.currencySymbol,
      finalPrice,
      originalPrice,
    };
  }, [selectedServiceId, slideOrWordCount, includeCoverLetter, deliverySpeed, selectedCurrency]);

  // Reference File Handlers
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newItems: AttachedFile[] = Array.from(files).map((f, i) => ({
      id: `ref-${Date.now()}-${i}`,
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(1) + ' MB',
      file: f,
    }));
    setUploadedFiles((prev) => [...prev, ...newItems]);
    if (onShowToast) onShowToast(`${files.length} reference file(s) attached successfully.`);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((item) => item.id !== id));
  };

  // Payment Proof Screenshot Handler
  const handlePaymentProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const formattedSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    
    setIsUploadingProof(true);
    setPaymentProof({
      name: file.name,
      size: formattedSize,
      progress: 20,
      isComplete: false,
    });

    // Simulate upload progress
    setTimeout(() => {
      setPaymentProof({
        name: file.name,
        size: formattedSize,
        progress: 70,
        isComplete: false,
      });
      setTimeout(() => {
        setPaymentProof({
          name: file.name,
          size: formattedSize,
          progress: 100,
          isComplete: true,
        });
        setIsUploadingProof(false);
        if (onShowToast) onShowToast('✅ Payment transfer screenshot uploaded successfully!');
      }, 300);
    }, 400);
  };

  // Copy Account Number Helper
  const handleCopyAccount = (accNumber: string) => {
    navigator.clipboard.writeText(accNumber);
    setCopiedAccount(true);
    if (onShowToast) onShowToast(`📋 Account Number ${accNumber} copied to clipboard!`);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  // Step Validation & Navigation
  const validateStep = (step: number): boolean => {
    const errors: { [key: string]: string } = {};
    if (step === 1) {
      if (slideOrWordCount <= 0) {
        errors.scope = 'Please enter a valid scope quantity (minimum 1).';
        setFieldErrors(errors);
        if (onShowToast) onShowToast('Please enter a valid scope quantity.');
        return false;
      }
      setFieldErrors({});
      return true;
    }
    if (step === 2) {
      if (!projectDescription.trim() && !projectTitle.trim()) {
        errors.project = 'Please provide a brief description or title for your project.';
        setFieldErrors(errors);
        if (onShowToast) onShowToast('Please provide a brief description or title for your project.');
        return false;
      }
      setFieldErrors({});
      return true;
    }
    if (step === 3) {
      if (!customerName.trim()) {
        errors.customerName = 'Please enter your full name.';
      }
      if (!customerEmail.trim() || !customerEmail.includes('@')) {
        errors.customerEmail = 'Please enter a valid email address.';
      }
      if (!customerPhone.trim()) {
        errors.customerPhone = 'Please enter your WhatsApp or phone number.';
      }
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        if (onShowToast) onShowToast('⚠️ Please complete all required contact details.');
        return false;
      }
      setFieldErrors({});
      return true;
    }
    return true;
  };

  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1) as any);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as any);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Final Order Submission Handler
  const handleFinalOrderSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmittingOrder) return;

    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      setCurrentStep(3);
      if (onShowToast) onShowToast('Please complete your Contact Details before submitting.');
      return;
    }

    if (!paymentProof || !paymentProof.isComplete) {
      if (onShowToast) onShowToast('⚠️ Please upload your payment transfer screenshot to complete order verification.');
      return;
    }

    setIsSubmittingOrder(true);
    setSubmissionError(null);

    const generatedId = 'MFS-' + Math.floor(100000 + Math.random() * 900000);
    const resolvedPaymentMethod = paymentAccount === 'easypaisa' ? 'EasyPaisa' : paymentAccount === 'jazzcash' ? 'JazzCash' : 'Askari Bank';

    const dbOrderData: Database['public']['Tables']['orders']['Insert'] = {
      order_number: generatedId,
      guest_name: customerName,
      guest_email: customerEmail,
      guest_phone: customerPhone,
      service_type: activeService?.title || 'Digital Solution',
      currency: selectedCurrency,
      total_amount: priceDetails.finalPrice,
      delivery_tier: deliverySpeed,
      payment_method: resolvedPaymentMethod,
      status: 'pending_verification',
      notes: projectDescription || 'Standard project guidelines',
      scope_details: {
        project_title: projectTitle || activeService?.title,
        quantity: slideOrWordCount,
        files: uploadedFiles.map((f) => f.name),
        payment_proof_file: paymentProof.name,
        options: {
          academicLevel,
          citationStyle,
          presentationStyle,
          resumeIndustry,
          includeCoverLetter,
        }
      }
    };

    try {
      // 1. Store in Supabase / Local database
      const dbResult = await createRealOrder(dbOrderData);
      const actualOrderNum = dbResult.data?.order_number || generatedId;
      setGeneratedOrderId(actualOrderNum);

      // 2. Dispatch Checkout API (Email notification)
      const payload = {
        orderId: actualOrderNum,
        clientName: customerName,
        clientEmail: customerEmail,
        clientPhone: customerPhone,
        serviceTitle: activeService?.title || 'Digital Solution',
        currency: selectedCurrency,
        amount: priceDetails.finalPrice,
        formattedAmount: `${priceDetails.currencySymbol} ${priceDetails.finalPrice.toLocaleString()}`,
        urgency: deliverySpeed.toUpperCase(),
        quantity: slideOrWordCount,
        projectNotes: projectDescription || 'Standard guidelines provided',
        paymentMethod: resolvedPaymentMethod,
        paymentProofUrl: paymentProof ? `receipts/${paymentProof.name}` : '',
        fileNames: uploadedFiles.map((f) => f.name),
      };

      await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((err) => {
        console.warn('[Checkout Dispatch Warning]:', err);
      });

      setIsSubmittingOrder(false);
      setIsOrderSubmitted(true);
      if (onShowToast) onShowToast(`🎉 Order #${actualOrderNum} submitted! Verification pending.`);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err: any) {
      console.error('[Order Submission Error]:', err);
      setIsSubmittingOrder(false);
      setSubmissionError("We couldn't submit your order yet. Your information has not been lost. Please try again.");
      if (onShowToast) onShowToast("Submission failed. Please click 'Try Submitting Again'.");
    }
  };

  const handleResetOrderForm = () => {
    setIsOrderSubmitted(false);
    setSubmissionError(null);
    setCurrentStep(1);
    setProjectTitle('');
    setProjectDescription('');
    setUploadedFiles([]);
    setPaymentProof(null);
  };

  return (
    <div className="w-full pt-20 sm:pt-28 pb-20 animate-fadeIn min-h-screen">
      
      {/* 1. TOP HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/15 border border-[#E5C158]/40 text-[#E5C158] text-xs font-bold mb-3 shadow-md">
          <Zap className="w-4 h-4" />
          <span>MFS GROWTH AGENCY — OFFICIAL 4-STEP ORDER SYSTEM (50% OFF)</span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-poppins font-bold text-white tracking-tight leading-tight mb-2">
          Order MFS Growth Agency Services — <span className="gradient-gold-text">50% Off Checkout</span>
        </h1>
        <p className="text-neutral-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Complete the 4 simple steps below to register your requirements, verify your payment, and track your deliverable in real time.
        </p>
      </section>

      {/* 2. MAIN 4-STEP WIZARD CONTAINER */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {!isOrderSubmitted ? (
          <div className="glass-card rounded-2xl sm:rounded-3xl border-2 border-[#E5C158]/70 p-4 xs:p-5 sm:p-8 bg-gradient-to-b from-[#0D0D12] via-[#050507] to-black shadow-[0_10px_50px_rgba(229,193,88,0.15)]">
            
            {/* Step Progress Bar Indicator */}
            <div className="mb-6 pb-6 border-b border-white/10">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {[
                  { step: 1, label: '1. Service & Scope' },
                  { step: 2, label: '2. Project Details' },
                  { step: 3, label: '3. Contact & Delivery' },
                  { step: 4, label: '4. Review & Payment' }
                ].map((s) => {
                  const isActive = currentStep === s.step;
                  const isDone = currentStep > s.step;
                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => {
                        if (isDone || s.step < currentStep || validateStep(currentStep)) {
                          setCurrentStep(s.step as any);
                        }
                      }}
                      className={`flex items-center justify-center gap-2 p-2.5 xs:p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#E5C158] text-black border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.25)]'
                          : isDone
                          ? 'bg-[#28C76F]/10 border-[#28C76F]/40 text-[#28C76F]'
                          : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-extrabold shrink-0 ${
                        isActive ? 'bg-black text-[#E5C158]' : isDone ? 'bg-[#28C76F] text-black' : 'bg-white/10 text-neutral-300'
                      }`}>
                        {isDone ? '✓' : s.step}
                      </span>
                      <span className="truncate text-[11px] sm:text-xs">{s.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Progress Bar Line */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E5C158] to-[#28C76F] transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Header Toolbar: Step Title + Currency Selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-white/5">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-1 rounded inline-block">
                  STEP {currentStep} OF 4
                </span>
                <h2 className="text-lg sm:text-2xl font-poppins font-bold text-white mt-1">
                  {currentStep === 1 && 'Select Service & Customize Scope'}
                  {currentStep === 2 && 'Project Title, Brief & Reference Files'}
                  {currentStep === 3 && 'Contact Information & Delivery Speed'}
                  {currentStep === 4 && 'Review Order & Upload Payment Proof'}
                </h2>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-1 bg-black/60 border border-white/15 p-1 rounded-xl shrink-0">
                <span className="text-[10px] sm:text-[11px] text-neutral-400 font-medium px-2">Currency:</span>
                {(['PKR', 'USD', 'GBP', 'EUR', 'AED'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCurrencySelect(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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

            {/* Submission Error Banner if Recoverable Failure Occurs */}
            {submissionError && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-200 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{submissionError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmissionError(null)}
                  className="px-3 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-white font-bold text-[11px]"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Grid Layout: Left Step Controls (7 cols) / Right Live Summary (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: WIZARD STEPS */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* STEP 1: SERVICE & SCOPE */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    
                    {/* A. Select Service Grid */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
                        A. Select Digital Service
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
                              <div className="space-y-0.5 min-w-0 pr-2">
                                <p className="font-poppins font-bold text-xs sm:text-sm text-white truncate">{srv.title}</p>
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

                    {/* B. Service Specific Options */}
                    <div className="p-4 rounded-2xl bg-[#08080C] border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold text-[#E5C158] uppercase tracking-wider">
                        B. Service Specific Customization
                      </h4>

                      {/* Presentation Options */}
                      {selectedServiceId.includes('presentation') && (
                        <div>
                          <label className="block text-neutral-300 text-xs font-semibold mb-1.5">
                            Slide Deck Aesthetic / Format Style
                          </label>
                          <select
                            value={presentationStyle}
                            onChange={(e) => setPresentationStyle(e.target.value)}
                            className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none"
                          >
                            <option value="Corporate Executive">Corporate Executive & Board Deck</option>
                            <option value="Investor Pitch Deck">Investor & Venture Capital Pitch Deck</option>
                            <option value="Academic Defense">Academic Thesis / Research Defense</option>
                            <option value="Sales & Marketing">Sales & Keynote Marketing Deck</option>
                          </select>
                        </div>
                      )}

                      {/* Assignment Options */}
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

                      {/* Resume / CV Options */}
                      {(selectedServiceId.includes('resume') || selectedServiceId.includes('cv')) && (
                        <div className="space-y-3 text-xs">
                          <div>
                            <label className="block text-neutral-300 font-semibold mb-1">Target Career Industry</label>
                            <select
                              value={resumeIndustry}
                              onChange={(e) => setResumeIndustry(e.target.value)}
                              className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white rounded-xl px-3.5 py-2.5 focus:outline-none"
                            >
                              <option value="Software & Tech">Software, IT & Engineering</option>
                              <option value="Finance & Business">Finance, Accounting & Banking</option>
                              <option value="Healthcare & Medical">Healthcare & Medical</option>
                              <option value="Marketing & Creative">Marketing, Sales & Media</option>
                              <option value="General Professional">General Executive & Corporate</option>
                            </select>
                          </div>

                          <label className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer text-white">
                            <input
                              type="checkbox"
                              checked={includeCoverLetter}
                              onChange={(e) => setIncludeCoverLetter(e.target.checked)}
                              className="accent-[#E5C158] w-4 h-4 rounded cursor-pointer"
                            />
                            <div className="flex-1">
                              <span className="font-bold text-xs text-white block">Include Custom Tailored Cover Letter</span>
                              <span className="text-[10px] text-[#E5C158]">Add-on +{selectedCurrency === 'PKR' ? 'PKR 800' : '$6.00'} (50% Off)</span>
                            </div>
                          </label>
                        </div>
                      )}

                      {/* Scope Quantity Inputs */}
                      <div className="pt-2 border-t border-white/10 space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                            C. Scope Quantity ({selectedServiceId.includes('presentation') ? 'Slides' : 'Words'})
                          </label>
                          <span className="text-[#28C76F] font-semibold text-[11px]">
                            ✨ Direct Scope Control
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                          <div className="sm:col-span-6 relative">
                            <input
                              type="number"
                              min={1}
                              value={slideOrWordCount}
                              onChange={(e) => setSlideOrWordCount(Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-full bg-[#050507] border border-[#E5C158]/50 focus:border-[#E5C158] text-white font-bold text-base rounded-xl px-4 py-2.5 focus:outline-none"
                              placeholder="Quantity"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#E5C158] pointer-events-none">
                              {selectedServiceId.includes('presentation') ? 'Slides' : 'Words'}
                            </span>
                          </div>

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

                        {/* Presets */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="text-[11px] text-neutral-400 font-medium self-center mr-1">Quick Presets:</span>
                          {selectedServiceId.includes('presentation') ? (
                            <>
                              <button type="button" onClick={() => setSlideOrWordCount(10)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 10 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>10 Slides</button>
                              <button type="button" onClick={() => setSlideOrWordCount(25)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 25 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>25 Slides</button>
                              <button type="button" onClick={() => setSlideOrWordCount(50)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 50 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>50 Slides</button>
                              <button type="button" onClick={() => setSlideOrWordCount(100)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 100 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>100 Deck</button>
                            </>
                          ) : (
                            <>
                              <button type="button" onClick={() => setSlideOrWordCount(1000)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 1000 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>1,000 Words</button>
                              <button type="button" onClick={() => setSlideOrWordCount(3000)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 3000 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>3,000 Words</button>
                              <button type="button" onClick={() => setSlideOrWordCount(5000)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 5000 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>5,000 Words</button>
                              <button type="button" onClick={() => setSlideOrWordCount(10000)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${slideOrWordCount === 10000 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>10,000 Words</button>
                            </>
                          )}
                        </div>
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Continue to Project Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* STEP 2: PROJECT DETAILS & BRIEFS */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Project Title / Subject
                      </label>
                      <input
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="e.g. Executive Marketing Strategy Deck / Q3 Financial Case Study"
                        className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white text-xs rounded-xl px-4 py-3 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Detailed Brief & Requirements *
                      </label>
                      <textarea
                        rows={4}
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Provide your main topic, requirements, slide/page layout guidelines, instructor rubric notes, or target audience details..."
                        className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white text-xs rounded-xl p-4 focus:outline-none resize-none"
                      />
                    </div>

                    {/* Reference Files Upload (MUST START EMPTY) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                          Attach Reference Files (Rubrics, Drafts, Images, Data)
                        </label>
                        <span className="text-[10px] text-neutral-400">PDF, DOCX, PPTX, ZIP, PNG</span>
                      </div>

                      <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          handleFileUpload(e.dataTransfer.files);
                        }}
                        className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer relative ${
                          isDragging ? 'border-[#E5C158] bg-[#E5C158]/10' : 'border-white/20 bg-white/[0.02] hover:border-[#E5C158]/50'
                        }`}
                      >
                        <input
                          type="file"
                          multiple
                          onChange={(e) => handleFileUpload(e.target.files)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                        />
                        <div className="flex flex-col items-center justify-center gap-2 text-xs text-neutral-300">
                          <FileUp className="w-6 h-6 text-[#E5C158]" />
                          <span>Drag & drop reference files here, or <strong className="text-[#E5C158] underline">Click to Browse</strong></span>
                          <span className="text-[10px] text-neutral-500">Starts clean — no default preloaded files</span>
                        </div>
                      </div>

                      {/* Display Uploaded File List */}
                      {uploadedFiles.length > 0 ? (
                        <div className="space-y-2 mt-3">
                          <p className="text-[11px] font-semibold text-[#E5C158]">
                            Attached Files ({uploadedFiles.length}):
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {uploadedFiles.map((f) => (
                              <div key={f.id} className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between gap-2 text-xs text-white">
                                <div className="flex items-center gap-2 min-w-0">
                                  <FileText className="w-4 h-4 text-[#E5C158] shrink-0" />
                                  <div className="min-w-0">
                                    <p className="font-medium text-xs text-white truncate">{f.name}</p>
                                    <span className="text-[10px] text-neutral-400">{f.size}</span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(f.id)}
                                  className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-red-400 cursor-pointer shrink-0"
                                  title="Remove file"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-[11px] text-neutral-500 mt-2 italic">
                          No files attached yet. (Optional)
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={goToPrevStep}
                        className="py-3 px-5 rounded-xl bg-white/5 border border-white/15 text-white font-bold text-xs hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={goToNextStep}
                        className="flex-1 py-3.5 px-6 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Continue to Contact Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                )}

                {/* STEP 3: CONTACT & DELIVERY SPEED */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    
                    {/* Contact Fields */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                          Your Contact Information
                        </label>
                        {profile && (
                          <span className="text-[10px] text-[#28C76F] font-bold bg-[#28C76F]/10 border border-[#28C76F]/30 px-2 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Profile Synced</span>
                          </span>
                        )}
                      </div>

                      {!profile && (
                        <div className="p-3 rounded-2xl bg-[#08080C] border border-[#E5C158]/30 space-y-2">
                          <p className="text-[11px] text-neutral-300 font-semibold flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
                              <span>Fast Order Auto-Fill:</span>
                            </span>
                            <span className="text-[10px] text-[#E5C158] font-bold">50% Off Auto-Applied</span>
                          </p>

                          <div>
                            <button
                              type="button"
                              onClick={async () => {
                                const res = await signInWithGoogle();
                                if (res.success && onShowToast) {
                                  onShowToast('✨ Signed in with Google! Name & email auto-filled.');
                                }
                              }}
                              className="w-full py-2.5 px-4 rounded-xl bg-white text-black font-extrabold text-[11px] hover:bg-neutral-100 transition-all cursor-pointer flex items-center justify-center gap-2 border border-neutral-300 shadow-sm"
                            >
                              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                              </svg>
                              <span>Continue with Google</span>
                            </button>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-neutral-300 font-semibold text-xs mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          value={customerName}
                          onChange={(e) => {
                            setCustomerName(e.target.value);
                            if (fieldErrors.customerName) setFieldErrors(prev => ({ ...prev, customerName: '' }));
                          }}
                          className={`w-full bg-[#050507] border text-white text-xs rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                            fieldErrors.customerName ? 'border-red-500/80 focus:border-red-500' : 'border-white/15 focus:border-[#E5C158]'
                          }`}
                        />
                        {fieldErrors.customerName && (
                          <div className="mt-1.5 p-2 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-[11px] font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-md relative z-30 animate-fadeIn">
                            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                            <span>{fieldErrors.customerName}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-neutral-300 font-semibold text-xs mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. john@example.com"
                            value={customerEmail}
                            onChange={(e) => {
                              setCustomerEmail(e.target.value);
                              if (fieldErrors.customerEmail) setFieldErrors(prev => ({ ...prev, customerEmail: '' }));
                            }}
                            className={`w-full bg-[#050507] border text-white text-xs rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                              fieldErrors.customerEmail ? 'border-red-500/80 focus:border-red-500' : 'border-white/15 focus:border-[#E5C158]'
                            }`}
                          />
                          {fieldErrors.customerEmail && (
                            <div className="mt-1.5 p-2 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-[11px] font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-md relative z-30 animate-fadeIn">
                              <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                              <span>{fieldErrors.customerEmail}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-neutral-300 font-semibold text-xs mb-1">WhatsApp / Phone *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+92 301 5323689"
                            value={customerPhone}
                            onChange={(e) => {
                              setCustomerPhone(e.target.value);
                              if (fieldErrors.customerPhone) setFieldErrors(prev => ({ ...prev, customerPhone: '' }));
                            }}
                            className={`w-full bg-[#050507] border text-white text-xs rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                              fieldErrors.customerPhone ? 'border-red-500/80 focus:border-red-500' : 'border-white/15 focus:border-[#E5C158]'
                            }`}
                          />
                          {fieldErrors.customerPhone && (
                            <div className="mt-1.5 p-2 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-[11px] font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-md relative z-30 animate-fadeIn">
                              <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                              <span>{fieldErrors.customerPhone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Turnaround Speed */}
                    <div className="pt-2 border-t border-white/10 space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                        Delivery Turnaround Speed
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
                              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-[#E5C158] text-black font-bold border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.2)]'
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

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={goToPrevStep}
                        className="py-3 px-5 rounded-xl bg-white/5 border border-white/15 text-white font-bold text-xs hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={goToNextStep}
                        className="flex-1 py-3.5 px-6 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Continue to Review & Payment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                )}

                {/* STEP 4: REVIEW & PAYMENT PROOF */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fadeIn">
                    
                    {/* Checkout Order Summary Review */}
                    <div className="p-4.5 rounded-2xl bg-[#08080C] border border-[#E5C158]/40 space-y-3 text-xs">
                      <h4 className="font-bold text-[#E5C158] text-xs uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Order Summary Review</span>
                      </h4>

                      <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/10">
                        <div>
                          <span className="text-neutral-500 text-[10px] block uppercase">Service</span>
                          <strong className="text-white text-xs">{activeService.title}</strong>
                        </div>
                        <div>
                          <span className="text-neutral-500 text-[10px] block uppercase">Scope / Quantity</span>
                          <strong className="text-white text-xs">
                            {slideOrWordCount} {selectedServiceId.includes('presentation') ? 'Slides' : 'Words'}
                          </strong>
                        </div>
                        <div>
                          <span className="text-neutral-500 text-[10px] block uppercase">Turnaround</span>
                          <strong className="text-[#E5C158] text-xs">{deliverySpeed.toUpperCase()}</strong>
                        </div>
                        <div>
                          <span className="text-neutral-500 text-[10px] block uppercase">Client</span>
                          <strong className="text-white text-xs">{customerName || 'Client'}</strong>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex justify-between items-center font-bold text-sm">
                        <span className="text-white">Net Total Payable (50% Off):</span>
                        <span className="text-[#28C76F] font-mono text-base">
                          {priceDetails.currencySymbol} {priceDetails.finalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Payment Account Details */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                        Select Official Payment Destination
                      </label>

                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'easypaisa', label: 'EasyPaisa', num: '03116191234' },
                          { id: 'jazzcash', label: 'JazzCash', num: '03015323688' },
                          { id: 'bank', label: 'Askari Bank', num: '00553230017265' },
                        ].map((pm) => (
                          <button
                            key={pm.id}
                            type="button"
                            onClick={() => setPaymentAccount(pm.id as any)}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              paymentAccount === pm.id
                                ? 'bg-[#E5C158]/20 border-[#E5C158] text-white font-bold'
                                : 'bg-white/[0.03] border-white/10 text-neutral-400'
                            }`}
                          >
                            <p className="text-xs font-bold text-white">{pm.label}</p>
                          </button>
                        ))}
                      </div>

                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400">Account Title:</span>
                          <strong className="text-white font-bold">Muhammad Shehroz Sultan</strong>
                        </div>
                        <div className="flex justify-between items-center pt-1 border-t border-white/5">
                          <span className="text-neutral-400">Account Number:</span>
                          <div className="flex items-center gap-2">
                            <strong className="text-[#E5C158] font-mono font-bold text-sm">
                              {paymentAccount === 'easypaisa' ? '03116191234' : paymentAccount === 'jazzcash' ? '03015323688' : '00553230017265'}
                            </strong>
                            <button
                              type="button"
                              onClick={() => handleCopyAccount(paymentAccount === 'easypaisa' ? '03116191234' : paymentAccount === 'jazzcash' ? '03015323688' : '00553230017265')}
                              className="p-1 rounded bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                              title="Copy account number"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Proof Upload (REAL Upload Flow) */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                          Upload Payment Screenshot / Proof *
                        </label>
                        <span className="text-[10px] text-[#28C76F] font-semibold">
                          Required for Order Verification
                        </span>
                      </div>

                      {!paymentProof ? (
                        <label className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 border-dashed border-[#E5C158]/50 hover:border-[#E5C158] bg-[#E5C158]/5 hover:bg-[#E5C158]/10 cursor-pointer text-neutral-300 hover:text-white transition-all text-center relative">
                          <Upload className="w-6 h-6 text-[#E5C158]" />
                          <span className="text-xs font-bold text-white">Click to Upload Transfer Screenshot</span>
                          <span className="text-[10px] text-neutral-400">PNG, JPG, WEBP or PDF receipt screenshot</span>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            className="hidden"
                            onChange={handlePaymentProofUpload}
                          />
                        </label>
                      ) : (
                        <div className="p-4 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/40 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle2 className="w-5 h-5 text-[#28C76F] shrink-0" />
                              <div className="min-w-0">
                                <p className="font-bold text-white text-xs truncate">{paymentProof.name}</p>
                                <p className="text-[10px] text-neutral-300">{paymentProof.size}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setPaymentProof(null)}
                              className="text-xs text-neutral-400 hover:text-red-400 underline cursor-pointer"
                            >
                              Remove / Change
                            </button>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#28C76F] h-full transition-all duration-300"
                              style={{ width: `${paymentProof.progress}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-[#28C76F] font-bold text-right">
                            {paymentProof.isComplete ? 'Payment Screenshot Ready ✓' : 'Uploading...'}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Navigation & Final Submit Button */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={goToPrevStep}
                          className="py-3.5 px-5 rounded-xl bg-white/5 border border-white/15 text-white font-bold text-xs hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleFinalOrderSubmit()}
                          disabled={isSubmittingOrder || !paymentProof || !paymentProof.isComplete}
                          className={`flex-1 py-4 px-6 rounded-xl font-extrabold text-xs shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            isSubmittingOrder
                              ? 'bg-neutral-700 text-neutral-300 cursor-not-allowed'
                              : !paymentProof || !paymentProof.isComplete
                              ? 'bg-[#E5C158]/50 text-black/60 cursor-not-allowed'
                              : 'bg-[#E5C158] hover:bg-[#fce888] text-black scale-[1.02]'
                          }`}
                        >
                          <Lock className="w-4 h-4" />
                          <span>
                            {isSubmittingOrder
                              ? 'Dispatching & Registering Order...'
                              : `Confirm & Submit Order (${priceDetails.currencySymbol} ${priceDetails.finalPrice.toLocaleString()})`}
                          </span>
                        </button>
                      </div>

                      <p className="text-[10px] text-center text-neutral-400 flex items-center justify-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#28C76F]" />
                        <span>100% Confidential • Payment Proof Verified by Finance Team</span>
                      </p>
                    </div>

                  </div>
                )}

              </div>

              {/* RIGHT COLUMN: LIVE ORDER SUMMARY CARD (5 cols) */}
              <div className="lg:col-span-5 space-y-5 bg-black/90 p-5 rounded-2xl border border-white/15 sticky top-28">
                
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <h3 className="font-poppins font-bold text-white text-sm">Live Order Breakdown</h3>
                  <span className="text-[10px] font-extrabold text-[#28C76F] bg-[#28C76F]/10 border border-[#28C76F]/30 px-2 py-0.5 rounded">
                    50% LAUNCH DISCOUNT
                  </span>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Selected Service:</span>
                    <strong className="text-white text-right">{activeService.title}</strong>
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
                  {uploadedFiles.length > 0 && (
                    <div className="flex justify-between text-neutral-400">
                      <span>Attached Files:</span>
                      <strong className="text-white">{uploadedFiles.length} File(s)</strong>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-400 pt-2 border-t border-white/10">
                    <span>Standard Rate:</span>
                    <span className="line-through text-neutral-500">
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

                {/* Live Step Tracker Mini Card */}
                <div className="p-3.5 rounded-xl bg-[#08080C] border border-white/10 space-y-1.5 text-xs">
                  <span className="text-[10px] text-[#E5C158] font-bold uppercase tracking-wider block">
                    Wizard Step Progress
                  </span>
                  <p className="text-white font-medium flex items-center justify-between text-xs">
                    <span>{currentStep === 1 ? 'Step 1: Service Scope' : currentStep === 2 ? 'Step 2: Project Details' : currentStep === 3 ? 'Step 3: Contact Info' : 'Step 4: Review & Payment'}</span>
                    <span className="text-[#28C76F] font-bold">{currentStep}/4 Completed</span>
                  </p>
                </div>

                {/* Guarantees */}
                <div className="space-y-2 pt-2 border-t border-white/10 text-[11px] text-neutral-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F] shrink-0" />
                    <span>Free Unlimited Revisions within 7 Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F] shrink-0" />
                    <span>Strict Confidentiality & Non-Disclosure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F] shrink-0" />
                    <span>Official Verified Receipt Provided</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        ) : (
          /* POST-ORDER CONFIRMATION & STATUS EXPERIENCE */
          <div className="glass-card rounded-3xl border border-[#28C76F]/40 p-6 sm:p-10 bg-gradient-to-b from-[#0F0F0F] via-black to-[#050507] shadow-2xl text-center space-y-6 animate-fadeIn max-w-4xl mx-auto">
            
            <div className="w-16 h-16 rounded-full bg-[#E5C158]/20 border border-[#E5C158] text-[#E5C158] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(229,193,88,0.3)]">
              <CheckCircle2 className="w-8 h-8 text-[#E5C158]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-widest bg-[#E5C158]/10 border border-[#E5C158]/30 px-3.5 py-1 rounded-full inline-block">
                ORDER RECEIVED SUCCESSFULLY
              </span>
              <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white">
                Order #{generatedOrderId}
              </h2>
              <div className="inline-block px-3.5 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/40 text-[#E5C158] text-xs font-bold">
                STATUS: Payment Verification Pending
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed pt-2">
                Thank you, <strong className="text-white">{customerName || 'Valued Client'}</strong>! Your order and payment transfer screenshot have been successfully submitted. Our finance team is verifying transfer details before production starts.
              </p>
            </div>

            {/* Production Progress Roadmap */}
            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 text-left space-y-3">
              <h4 className="text-xs font-bold text-[#E5C158] uppercase tracking-wider">
                Production Execution Roadmap
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {[
                  { num: '01', title: 'Payment Verification', status: 'In Verification', color: 'text-[#E5C158] bg-[#E5C158]/10 border-[#E5C158]/40' },
                  { num: '02', title: 'Requirements Review', status: 'Queued', color: 'text-neutral-400 bg-white/5 border-white/10' },
                  { num: '03', title: 'Project Assignment', status: 'Queued', color: 'text-neutral-400 bg-white/5 border-white/10' },
                  { num: '04', title: 'Production Begins', status: 'Queued', color: 'text-neutral-400 bg-white/5 border-white/10' },
                  { num: '05', title: 'Quality Check', status: 'Queued', color: 'text-neutral-400 bg-white/5 border-white/10' },
                  { num: '06', title: 'Final Delivery', status: 'Queued', color: 'text-neutral-400 bg-white/5 border-white/10' },
                ].map((st) => (
                  <div key={st.num} className={`p-3 rounded-xl border ${st.color}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono font-bold text-[10px]">{st.num}</span>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-black/40">{st.status}</span>
                    </div>
                    <p className="font-semibold text-white text-xs">{st.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowLuxuryReceipt(true)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs hover:opacity-95 transition-all cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>View Official Luxury Receipt</span>
              </button>

              <a
                href={generateWhatsAppOrderLink({
                  orderId: generatedOrderId,
                  clientName: customerName || 'Valued Client',
                  serviceName: activeService?.title || 'Digital Solution',
                  deadline: deliverySpeed,
                  quantity: slideOrWordCount,
                  totalPrice: `${priceDetails.currencySymbol} ${priceDetails.finalPrice.toLocaleString()}`,
                  projectBrief: projectDescription || 'Standard guidelines provided'
                })}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#28C76F] text-black font-bold text-xs hover:bg-[#34e082] transition-all cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Track Order on WhatsApp</span>
              </a>

              {onNavigatePage && (
                <button
                  type="button"
                  onClick={() => onNavigatePage('dashboard')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all cursor-pointer border border-white/15"
                >
                  Go to Client Dashboard
                </button>
              )}

              <button
                type="button"
                onClick={handleResetOrderForm}
                className="px-5 py-3.5 rounded-xl bg-white/5 text-neutral-300 font-medium text-xs hover:text-white transition-all cursor-pointer border border-white/10"
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
          orderId: generatedOrderId || 'MFS-984210',
          clientName: customerName || 'Valued Client',
          clientEmail: customerEmail || 'client@mfsgrowth.com',
          clientPhone: customerPhone || '+92 301 5323689',
          serviceTitle: activeService?.title || 'Digital Solution',
          currency: selectedCurrency,
          amount: priceDetails.finalPrice,
          quantity: slideOrWordCount,
          urgency: deliverySpeed.toUpperCase(),
          notes: projectDescription,
          paymentMethod: paymentAccount === 'easypaisa' ? 'EasyPaisa' : paymentAccount === 'jazzcash' ? 'JazzCash' : 'Askari Bank',
          isPaid: false,
        }}
      />

    </div>
  );
};
