import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Currency, DeliverySpeed } from '../types';
import { SERVICES, calculateServicePrice } from '../data/content';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
  HelpCircle,
  ChevronDown,
  Calculator,
  Tag,
} from 'lucide-react';

interface PricingPageProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  onSelectService: (serviceId: string) => void;
  onOpenCalculator?: () => void;
}

const CURRENCY_CONFIG: Record<Currency, { label: string; flag: string; symbol: string; rateFromUsd: number }> = {
  PKR: { label: 'PKR', flag: '🇵🇰', symbol: 'PKR ', rateFromUsd: 1 },
  USD: { label: 'USD', flag: '🌐', symbol: '$', rateFromUsd: 1 },
  GBP: { label: 'GBP', flag: '🇬🇧', symbol: '£', rateFromUsd: 0.78 },
  EUR: { label: 'EUR', flag: '🇪🇺', symbol: '€', rateFromUsd: 0.92 },
  AED: { label: 'AED', flag: '🇦🇪', symbol: 'AED ', rateFromUsd: 3.67 },
};

export const PricingPage: React.FC<PricingPageProps> = ({
  currency,
  setCurrency,
  onSelectService,
  onOpenCalculator,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-pricing-1');
  const [activeSpeed, setActiveSpeed] = useState<DeliverySpeed>('standard');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Academic' | 'Career' | 'Business'>('All');

  const speedMultipliers: Record<DeliverySpeed, { label: string; multiplier: number; badge: string; time: string }> = {
    standard: { label: 'Standard Delivery', multiplier: 1.0, badge: 'Standard Rate', time: '24-48 Hours' },
    express: { label: 'Express Delivery', multiplier: 1.3, badge: '+30% Speed', time: '12-24 Hours' },
    priority: { label: 'Priority Rush', multiplier: 1.5, badge: '+50% Speed', time: '6-12 Hours' },
    sameday: { label: 'Same-Day Super Urgent', multiplier: 1.75, badge: '+75% Rush', time: '3-6 Hours' },
  };

  const getServicePriceDisplay = (serviceId: string) => {
    let defaultQty = 1;
    if (serviceId === 'presentation' || serviceId === 'pitch-deck') defaultQty = 10;
    if (serviceId === 'assignment' || serviceId === 'reports' || serviceId === 'case-studies') defaultQty = 1000;
    if (serviceId === 'document-formatting') defaultQty = 1500;

    const result = calculateServicePrice(serviceId, defaultQty, activeSpeed, currency);

    if (currency === 'PKR') {
      return {
        finalFormatted: `PKR ${result.calculatedPromoPkr.toLocaleString()}`,
        origFormatted: `PKR ${result.calculatedOrigPkr.toLocaleString()}`,
        symbol: 'PKR',
        finalValue: result.calculatedPromoPkr,
        origValue: result.calculatedOrigPkr,
      };
    } else if (currency === 'USD') {
      return {
        finalFormatted: `$${result.calculatedPromoUsd.toFixed(2)}`,
        origFormatted: `$${result.calculatedOrigUsd.toFixed(2)}`,
        symbol: '$',
        finalValue: result.calculatedPromoUsd,
        origValue: result.calculatedOrigUsd,
      };
    } else {
      const cfg = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
      const finalVal = parseFloat((result.calculatedPromoUsd * cfg.rateFromUsd).toFixed(2));
      const origVal = parseFloat((result.calculatedOrigUsd * cfg.rateFromUsd).toFixed(2));
      return {
        finalFormatted: `${cfg.symbol}${finalVal.toFixed(2)}`,
        origFormatted: `${cfg.symbol}${origVal.toFixed(2)}`,
        symbol: cfg.symbol,
        finalValue: finalVal,
        origValue: origVal,
      };
    }
  };

  const filteredServices = SERVICES.filter((service) => {
    if (selectedCategory === 'All') return true;
    return service.category === selectedCategory;
  });

  const PRICING_FAQS = [
    {
      id: 'faq-pricing-1',
      question: 'How is the 50% Grand Launch discount applied?',
      answer:
        'The 50% Grand Launch discount is automatically factored into all displayed rates across our agency platform. No promo code or manual entry is required during checkout.',
    },
    {
      id: 'faq-pricing-2',
      question: 'Are there any hidden fees or extra charges after ordering?',
      answer:
        'Zero hidden fees. Our pricing is 100% transparent. Every quoted price includes deep topic research, strict citation/formatting guidelines (APA, Harvard, MLA), editable source files, and post-delivery revision support.',
    },
    {
      id: 'faq-pricing-3',
      question: 'What payment options are available for Pakistan & international clients?',
      answer:
        'In Pakistan, we accept EasyPaisa, JazzCash, and Bank Transfer during checkout. For international clients, we process USD via direct bank wire and online transfer methods upon order submission.',
    },
    {
      id: 'faq-pricing-4',
      question: 'How do turn-around speed multipliers affect the final cost?',
      answer:
        'Our standard turnaround is 24–48 hours. If you require expedited delivery, you can select Express (+30%), Priority Rush (+50%), or Same-Day Super Urgent (+75%) to prioritize your project in our production workflow.',
    },
    {
      id: 'faq-pricing-5',
      question: 'What happens if I need revisions on my completed project?',
      answer:
        'We offer revisions on all delivered work to ensure complete satisfaction, provided the revision request aligns with your initial order brief and guidelines.',
    },
  ];

  return (
    <div className="w-full pt-28 sm:pt-32 pb-20 bg-[#050507] text-white overflow-hidden">
      {/* 1. Section Header (Editorial & Clean) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative mb-12 sm:mb-16">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E5C158]/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>PRICING & INVESTMENT</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-bold tracking-tight text-white mb-5 max-w-4xl mx-auto leading-tight"
        >
          Professional work, <span className="gradient-gold-text">transparently priced.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Choose the service you need and get a clear estimate before placing your order.
        </motion.p>

        {/* Grand Launch Promo Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-[#E5C158]/20 via-[#E5C158]/10 to-[#E5C158]/20 border border-[#E5C158]/40 shadow-[0_0_30px_rgba(229,193,88,0.15)] text-xs sm:text-sm font-semibold text-white max-w-xl mx-auto"
        >
          <Tag className="w-4 h-4 text-[#E5C158] shrink-0" />
          <span><strong className="text-[#E5C158]">50% Grand Launch Offer:</strong> Half-price rates automatically applied across all services</span>
        </motion.div>
      </section>

      {/* 2. Control Toolbar: Currency Switcher & Turnaround Speed Multipliers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-[#0D0D12] rounded-3xl border border-white/10 p-4 sm:p-6 shadow-2xl space-y-6">
          {/* Upper Toolbar Controls: Currency & Live Calculator CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-5 border-b border-white/10">
            {/* Currency Selector */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <span>Select Currency:</span>
              </span>
              <div className="w-full sm:w-auto flex items-center bg-black/60 p-1 rounded-2xl border border-white/10 overflow-x-auto">
                {(Object.keys(CURRENCY_CONFIG) as Currency[]).map((currKey) => {
                  const cfg = CURRENCY_CONFIG[currKey];
                  const isSelected = currency === currKey;
                  return (
                    <button
                      key={currKey}
                      onClick={() => setCurrency(currKey)}
                      className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#E5C158] text-[#050507] shadow-[0_0_15px_rgba(229,193,88,0.4)]'
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-sm">{cfg.flag}</span>
                      <span>{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Price Calculator CTA Link */}
            {onOpenCalculator && (
              <button
                onClick={onOpenCalculator}
                className="w-full md:w-auto px-4 py-2 rounded-xl bg-[#E5C158]/10 hover:bg-[#E5C158]/20 border border-[#E5C158]/40 text-[#E5C158] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Exact Custom Price</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Lower Toolbar Controls: Turnaround Speed Multiplier Simulator */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-poppins font-bold text-xs text-white flex items-center gap-2 uppercase tracking-wider text-neutral-300">
                <Zap className="w-4 h-4 text-[#E5C158]" />
                <span>Simulate Turnaround Speed Rates</span>
              </h3>
              <span className="text-[11px] text-[#28C76F] font-semibold hidden sm:inline-block">
                Current Speed: {speedMultipliers[activeSpeed].label} ({speedMultipliers[activeSpeed].time})
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {(Object.keys(speedMultipliers) as DeliverySpeed[]).map((spKey) => {
                const sp = speedMultipliers[spKey];
                const isSelected = activeSpeed === spKey;
                return (
                  <button
                    key={spKey}
                    onClick={() => setActiveSpeed(spKey)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E5C158]/15 border-[#E5C158] text-white shadow-[0_0_20px_rgba(229,193,88,0.15)]'
                        : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">{sp.badge}</span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-300 block font-medium">{sp.label}</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">{sp.time}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {(['All', 'Academic', 'Career', 'Business'] as const).map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#E5C158] text-[#050507] shadow-lg'
                    : 'bg-[#0D0D12] text-neutral-400 border border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {cat === 'All' ? 'All Services (11)' : `${cat} Services`}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Core Service Pricing Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, idx) => {
            const isFeatured = service.id === 'ats-resume' || service.id === 'presentation' || service.id === 'pitch-deck';
            const priceInfo = getServicePriceDisplay(service.id);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`bg-[#0D0D12] rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                  isFeatured
                    ? 'border-[#E5C158] shadow-[0_0_35px_rgba(229,193,88,0.18)] bg-gradient-to-b from-[#E5C158]/10 via-[#0D0D12] to-[#0D0D12]'
                    : 'border-white/10 hover:border-[#E5C158]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Popular Badge */}
                {isFeatured && (
                  <div className="absolute top-0 right-0 bg-[#E5C158] text-[#050507] text-[10px] font-extrabold uppercase px-3.5 py-1 rounded-bl-2xl tracking-wider shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Service Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                      {service.icon}
                    </div>
                    <div className="pr-12">
                      <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block mb-0.5">
                        {service.category || 'Professional'}
                      </span>
                      <h3 className="font-poppins font-bold text-lg text-white group-hover:text-[#E5C158] transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed mb-5 min-h-[36px]">
                    {service.description}
                  </p>

                  {/* Delivery Time Indicator */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-medium text-neutral-300 mb-5">
                    <Clock className="w-3.5 h-3.5 text-[#28C76F]" />
                    <span>Est. Delivery: {speedMultipliers[activeSpeed].time}</span>
                  </div>

                  {/* Official Pricing Box */}
                  <div className="bg-black/60 border border-white/10 p-4 rounded-2xl mb-6 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        Official Rate
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-neutral-400 line-through font-mono">
                          {priceInfo.origFormatted}
                        </span>
                        <span className="text-[10px] font-bold bg-[#28C76F]/20 text-[#28C76F] px-2 py-0.5 rounded-full border border-[#28C76F]/30">
                          50% OFF
                        </span>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1.5 my-1">
                      <span className="text-2xl sm:text-3xl font-poppins font-extrabold text-[#E5C158] tracking-tight">
                        {priceInfo.finalFormatted}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">
                        {service.unit}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mt-2 text-[10px] text-[#28C76F] font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-[#28C76F]" />
                      <span>50% Grand Launch Promo Included</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 mb-8 text-xs text-neutral-300">
                    {service.features?.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dual Action CTAs */}
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      isFeatured
                        ? 'bg-[#E5C158] text-[#050507] hover:bg-[#fce888] shadow-[0_0_20px_rgba(229,193,88,0.3)]'
                        : 'bg-white/10 text-white hover:bg-[#E5C158] hover:text-[#050507]'
                    }`}
                  >
                    <span>Order {service.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {onOpenCalculator && (
                    <button
                      onClick={onOpenCalculator}
                      className="w-full py-2.5 rounded-xl font-semibold text-[11px] text-neutral-400 hover:text-[#E5C158] border border-white/5 hover:border-[#E5C158]/30 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Calculate Exact Price</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. Package Deliverables & Tier Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-2 block">
            DELIVERABLE STANDARDS
          </span>
          <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white">
            Compare Deliverable Scope & Standards
          </h2>
        </div>

        <div className="bg-[#0D0D12] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300 min-w-[640px]">
              <thead className="bg-white/[0.04] border-b border-white/10 text-white font-poppins font-bold">
                <tr>
                  <th className="p-4 sm:p-5">Tier Feature</th>
                  <th className="p-4 sm:p-5">Academic Tier</th>
                  <th className="p-4 sm:p-5 text-[#E5C158] bg-[#E5C158]/10">Career Tier (Popular)</th>
                  <th className="p-4 sm:p-5">Corporate & Business Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Scope & Solutions</td>
                  <td className="p-4 sm:p-5">Assignments, Essays, Coursework Slides</td>
                  <td className="p-4 sm:p-5 text-white font-medium bg-[#E5C158]/5">Resumes, ATS CVs, Cover Letters</td>
                  <td className="p-4 sm:p-5">Reports, Pitch Decks, Case Studies</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Turnaround Window</td>
                  <td className="p-4 sm:p-5">24 - 48 Hours</td>
                  <td className="p-4 sm:p-5 text-white font-medium bg-[#E5C158]/5">24 Hours Express Available</td>
                  <td className="p-4 sm:p-5">2 - 3 Days (Rush Available)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Citation & Formatting</td>
                  <td className="p-4 sm:p-5">APA / Harvard / MLA Strict</td>
                  <td className="p-4 sm:p-5 text-white font-medium bg-[#E5C158]/5">ATS Keyword Parser Optimized</td>
                  <td className="p-4 sm:p-5">Executive Summary & Data Visuals</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Source Files</td>
                  <td className="p-4 sm:p-5">DOCX / PPTX + PDF</td>
                  <td className="p-4 sm:p-5 text-white font-medium bg-[#E5C158]/5">DOCX + High-Res Print PDF</td>
                  <td className="p-4 sm:p-5">Editable PPTX + PDF + Data Graphics</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Revision & Privacy Guarantee</td>
                  <td className="p-4 sm:p-5">100% Protected</td>
                  <td className="p-4 sm:p-5 text-white font-medium bg-[#E5C158]/5">100% Protected</td>
                  <td className="p-4 sm:p-5">100% Protected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Pricing FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-2 block">
            PRICING HELP & TRANSPARENCY
          </span>
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white">
            Pricing & Payment FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {PRICING_FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#0D0D12] rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-[#E5C158] transition-colors cursor-pointer gap-4"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#E5C158] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#E5C158]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-neutral-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Bottom Agency Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D0D12] rounded-3xl border border-[#E5C158]/30 p-8 sm:p-14 text-center relative overflow-hidden bg-gradient-to-r from-[#E5C158]/15 via-[#0D0D12] to-black shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white mb-4">
            Lock In Your 50% Grand Launch Discount Today
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Get instant support, transparent rates, and rapid delivery on presentations, assignments, reports, and ATS resumes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onSelectService('presentation')}
              className="px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs sm:text-sm hover:bg-[#fce888] transition-all shadow-[0_0_25px_rgba(229,193,88,0.3)] cursor-pointer flex items-center gap-2"
            >
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
