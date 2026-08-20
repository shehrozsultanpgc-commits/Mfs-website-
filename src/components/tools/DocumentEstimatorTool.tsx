import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Calculator,
  FileText,
  Clock,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Sliders,
  AlignLeft,
  Volume2,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { Currency } from '../../types';

interface DocumentEstimatorToolProps {
  currency: Currency;
  setCurrency?: (curr: Currency) => void;
  onOpenOrderModal: (serviceId?: string, words?: number) => void;
  onOpenAIChat?: () => void;
  onShowToast?: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  onNavigatePage?: (page: string) => void;
}

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  PKR: 'Rs.',
  USD: '$',
  GBP: '£',
  EUR: '€',
  AED: 'AED',
};

const CURRENCY_RATES: Record<Currency, number> = {
  PKR: 1,
  USD: 0.0036,
  GBP: 0.0028,
  EUR: 0.0033,
  AED: 0.013,
};

export const DocumentEstimatorTool: React.FC<DocumentEstimatorToolProps> = ({
  currency,
  setCurrency,
  onOpenOrderModal,
  onOpenAIChat,
  onShowToast,
  onNavigatePage,
}) => {
  const [wordCount, setWordCount] = useState<number>(2500);
  const [spacing, setSpacing] = useState<'double' | 'single'>('double');
  const [serviceType, setServiceType] = useState<'assignment' | 'reports' | 'case-studies'>('reports');
  const [speed, setSpeed] = useState<'standard' | 'express' | 'priority' | 'sameday'>('standard');
  const [inputText, setInputText] = useState<string>('');

  // Update word count if user pastes text
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    const count = text.trim().split(/\s+/).filter(Boolean).length;
    if (count > 0) {
      setWordCount(count);
    }
  };

  // Turnaround Multipliers
  const SPEED_CONFIG = {
    standard: { label: 'Standard Delivery (3-4 Days)', multiplier: 1.0, hours: 72 },
    express: { label: 'Express Delivery (48 Hours)', multiplier: 1.3, hours: 48 },
    priority: { label: 'Priority Turnaround (24 Hours)', multiplier: 1.5, hours: 24 },
    sameday: { label: 'Same-Day Rush (12 Hours)', multiplier: 1.75, hours: 12 },
  };

  // Base Rate calculation per 1000 words in PKR
  const BASE_PKR_PER_1000_WORDS: Record<string, number> = {
    'reports': 800,
    'assignment': 1000,
    'case-studies': 1200,
  };

  const calculation = useMemo(() => {
    const wordsPerPage = spacing === 'double' ? 250 : 500;
    const pageCount = (wordCount / wordsPerPage).toFixed(1);

    // Reading & Presentation speeds
    const readingMinutes = Math.ceil(wordCount / 200);
    const speakingMinutes = Math.ceil(wordCount / 130);

    // Base pricing math
    const basePkrRate = BASE_PKR_PER_1000_WORDS[serviceType] || 800;
    const units = wordCount / 1000;
    const rawPkr = units * basePkrRate * SPEED_CONFIG[speed].multiplier;

    // 50% Grand Launch Promo
    const originalPkr = Math.round(rawPkr * 2);
    const discountedPkr = Math.round(rawPkr);

    const rate = CURRENCY_RATES[currency] || 1;
    const originalFinal = currency === 'PKR' ? originalPkr : parseFloat((originalPkr * rate).toFixed(2));
    const discountedFinal = currency === 'PKR' ? discountedPkr : parseFloat((discountedPkr * rate).toFixed(2));
    const savings = currency === 'PKR' ? originalPkr - discountedPkr : parseFloat((originalFinal - discountedFinal).toFixed(2));

    // Estimated Delivery Date
    const deliveryDate = new Date();
    deliveryDate.setHours(deliveryDate.getHours() + SPEED_CONFIG[speed].hours);
    const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      pageCount,
      readingMinutes,
      speakingMinutes,
      originalFinal,
      discountedFinal,
      savings,
      formattedDelivery,
    };
  }, [wordCount, spacing, serviceType, speed, currency]);

  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <button
            onClick={() => onNavigatePage ? onNavigatePage('home') : null}
            className="hover:text-[#E5C158] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigatePage ? onNavigatePage('tools') : null}
            className="hover:text-[#E5C158] transition-colors"
          >
            Free Tools & Utilities
          </button>
          <span>/</span>
          <span className="text-[#E5C158]">Document Metric & Turnaround Estimator</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Live Document Metric & Speed Estimator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins text-white tracking-tight leading-tight">
            Document Metrics & <span className="text-[#E5C158]">Turnaround Calculator</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
            Calculate accurate page counts, reading durations, speech timing, and instant project pricing across all 5 currencies with the active 50% Grand Launch discount.
          </p>

          {/* Currency Switcher */}
          {setCurrency && (
            <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-[#0F0F16] border border-white/10">
              {(['PKR', 'USD', 'GBP', 'EUR', 'AED'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    currency === curr
                      ? 'bg-[#E5C158] text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Scope & Word Count Sliders */}
          <div className="lg:col-span-7 space-y-6">
            {/* Service & Spacing Selection */}
            <div className="p-6 rounded-2xl bg-[#0F0F16] border border-white/10 shadow-xl space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Document Service Category:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'reports', label: 'Corporate Report Formatting' },
                    { id: 'assignment', label: 'Academic Assignment Writing' },
                    { id: 'case-studies', label: 'Executive Case Study Solution' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setServiceType(s.id as any)}
                      className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold ${
                        serviceType === s.id
                          ? 'bg-[#161624] border-[#E5C158] text-[#E5C158]'
                          : 'bg-[#08080C] border-white/5 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Word Count Slider */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-[#E5C158]" />
                    <span>Target Word Count:</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={250}
                      max={25000}
                      step={250}
                      value={wordCount}
                      onChange={(e) => setWordCount(Math.max(100, parseInt(e.target.value) || 0))}
                      className="w-24 bg-[#050507] border border-white/10 rounded-lg px-2.5 py-1 text-right text-xs font-mono font-bold text-[#E5C158] focus:outline-none focus:border-[#E5C158]"
                    />
                    <span className="text-xs text-neutral-400 font-mono">words</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={500}
                  max={15000}
                  step={250}
                  value={wordCount}
                  onChange={(e) => setWordCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#050507] rounded-lg appearance-none cursor-pointer accent-[#E5C158]"
                />

                <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
                  <span>500 Words (Short Essay)</span>
                  <span>5,000 Words (Comprehensive Report)</span>
                  <span>15,000 Words (Thesis)</span>
                </div>
              </div>

              {/* Spacing Mode */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-300">
                  Typography Line Spacing:
                </span>
                <div className="inline-flex p-1 rounded-xl bg-[#050507] border border-white/10">
                  <button
                    onClick={() => setSpacing('double')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      spacing === 'double'
                        ? 'bg-[#E5C158] text-black font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Double Spaced (250 w/p)
                  </button>
                  <button
                    onClick={() => setSpacing('single')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      spacing === 'single'
                        ? 'bg-[#E5C158] text-black font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Single Spaced (500 w/p)
                  </button>
                </div>
              </div>

              {/* Delivery Speed Selector */}
              <div className="pt-4 border-t border-white/5">
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Turnaround Speed & Urgency:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(SPEED_CONFIG).map(([key, cfg]) => (
                    <button
                      key={key}
                      onClick={() => setSpeed(key as any)}
                      className={`p-3 rounded-xl text-left border transition-all text-xs ${
                        speed === key
                          ? 'bg-[#161624] border-[#E5C158] text-[#E5C158] font-bold'
                          : 'bg-[#08080C] border-white/5 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{cfg.label}</span>
                        {key !== 'standard' && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E5C158]/10 text-[#E5C158]">
                            +{Math.round((cfg.multiplier - 1) * 100)}%
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Paste Text Box */}
            <div className="p-6 rounded-2xl bg-[#0F0F16] border border-white/10 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <AlignLeft className="w-4 h-4 text-[#E5C158]" />
                  <span>Or Paste Your Document Draft to Auto-Count:</span>
                </label>
                {inputText && (
                  <button
                    onClick={() => {
                      setInputText('');
                      setWordCount(2500);
                    }}
                    className="text-[11px] text-red-400 hover:underline"
                  >
                    Clear Draft
                  </button>
                )}
              </div>
              <textarea
                value={inputText}
                onChange={handleTextChange}
                placeholder="Paste your raw report, essay draft, or notes here..."
                rows={4}
                className="w-full bg-[#050507] border border-white/10 rounded-xl p-3 text-xs text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-[#E5C158] transition-colors"
              />
            </div>
          </div>

          {/* Right Column: Calculated Document Metrics & Pricing Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#0F0F16] border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                  <FileText className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Estimated Pages</span>
                </div>
                <span className="text-2xl font-black font-poppins text-white block">
                  ~{calculation.pageCount}
                </span>
                <span className="text-[10px] text-neutral-500 uppercase">
                  {spacing === 'double' ? 'Double Spaced (A4)' : 'Single Spaced (A4)'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F0F16] border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Reading Duration</span>
                </div>
                <span className="text-2xl font-black font-poppins text-white block">
                  {calculation.readingMinutes} min
                </span>
                <span className="text-[10px] text-neutral-500 uppercase">
                  @ 200 words/minute
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F0F16] border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                  <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Speech Duration</span>
                </div>
                <span className="text-2xl font-black font-poppins text-white block">
                  {calculation.speakingMinutes} min
                </span>
                <span className="text-[10px] text-neutral-500 uppercase">
                  @ 130 words/minute
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F0F16] border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Delivery By</span>
                </div>
                <span className="text-xs font-bold text-emerald-300 block mt-1 leading-snug">
                  {calculation.formattedDelivery}
                </span>
                <span className="text-[10px] text-neutral-500 uppercase">Guaranteed Turnaround</span>
              </div>
            </div>

            {/* Price Quote Summary Box */}
            <div className="p-6 rounded-2xl bg-[#0F0F16] border border-[#E5C158]/40 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-[#E5C158] uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  <span>Transparent Price Quote</span>
                </span>
                <span className="text-[10px] font-bold text-black bg-[#E5C158] px-2 py-0.5 rounded-full uppercase">
                  50% Launch Promo Active
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Standard Rate ({wordCount.toLocaleString()} words):</span>
                  <span className="line-through">
                    {CURRENCY_SYMBOLS[currency]} {calculation.originalFinal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Grand Launch Savings (50% OFF):</span>
                  <span>- {CURRENCY_SYMBOLS[currency]} {calculation.savings.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-neutral-300">
                  <span>Delivery Speed Multiplier:</span>
                  <span>{SPEED_CONFIG[speed].label.split(' ')[0]} ({SPEED_CONFIG[speed].hours}h)</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Final Net Investment:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black font-poppins text-[#E5C158] block">
                      {CURRENCY_SYMBOLS[currency]} {calculation.discountedFinal.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-neutral-400">Includes all revisions & PDF deliverable</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenOrderModal(serviceType, wordCount)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:from-[#F0D27A] hover:to-[#E5C158] text-black font-bold text-xs sm:text-sm font-poppins transition-all shadow-xl shadow-[#E5C158]/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Zap className="w-4 h-4 text-black" />
                <span>Order with These Specifications (50% OFF)</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Quality Safeguards */}
            <div className="p-4 rounded-xl bg-[#08080C] border border-white/5 text-[11px] text-neutral-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>MFS Quality & Execution Safeguards:</span>
              </div>
              <p>• 100% Original Content with verified citation references</p>
              <p>• Clean automated Table of Contents & Figure lists included</p>
              <p>• Free formatting adjustments within 7 days of delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
