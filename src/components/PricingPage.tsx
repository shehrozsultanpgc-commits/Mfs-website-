import React, { useState } from 'react';
import { Currency, ServiceItem } from '../types';
import { SERVICES, FAQS } from '../data/content';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Star,
  ShieldCheck,
  Zap,
  HelpCircle,
  ChevronDown,
  DollarSign,
  CreditCard,
  Building2,
  Smartphone,
  Info,
  Calculator,
  Lock,
} from 'lucide-react';

interface PricingPageProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  onSelectService: (serviceId: string) => void;
  onOpenCalculator?: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  currency,
  setCurrency,
  onSelectService,
  onOpenCalculator,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-pricing-1');
  const [activeSpeed, setActiveSpeed] = useState<'standard' | 'express' | 'priority' | 'sameday'>('standard');

  const speedMultipliers = {
    standard: { label: 'Standard Delivery (24-48 Hrs)', multiplier: 1.0, badge: 'Standard Rate' },
    express: { label: 'Express Delivery (12-24 Hrs)', multiplier: 1.3, badge: '+30% Speed' },
    priority: { label: 'Priority Rush (6-12 Hrs)', multiplier: 1.5, badge: '+50% Speed' },
    sameday: { label: 'Same-Day Super Urgent (3-6 Hrs)', multiplier: 1.75, badge: '+75% Rush' },
  };

  const isPkr = currency === 'PKR';

  const calculateFinalPrice = (basePkr: number, baseUsd: number) => {
    const mult = speedMultipliers[activeSpeed].multiplier;
    const finalPkr = Math.round(basePkr * mult);
    const finalUsd = parseFloat((baseUsd * mult).toFixed(2));
    return isPkr ? `PKR ${finalPkr.toLocaleString()}` : `$${finalUsd.toFixed(2)}`;
  };

  const PRICING_FAQS = [
    {
      id: 'faq-pricing-1',
      question: 'How is the 50% Grand Launch discount applied?',
      answer:
        'The 50% discount is automatically applied across all prices displayed on our platform for a limited time during our grand launch celebration. No coupon code is required.',
    },
    {
      id: 'faq-pricing-2',
      question: 'Are there any hidden fees or extra charges?',
      answer:
        'None whatsoever. What you see is what you pay. Our rates include thorough research, professional layout design, strict formatting (APA/Harvard/MLA), and revision support.',
    },
    {
      id: 'faq-pricing-3',
      question: 'What payment methods do you accept for Pakistan & International clients?',
      answer:
        'In Pakistan, we accept EasyPaisa (03116191234), JazzCash (03015323688), and Direct Bank Transfer (Askari Bank). For international clients, we support USD via direct bank wire and online transfer methods.',
    },
    {
      id: 'faq-pricing-4',
      question: 'How do urgent delivery speed multipliers work?',
      answer:
        'If you need your project delivered ahead of standard turnaround (24-48 hrs), you can select Express (+30%), Priority (+50%), or Same-Day (+75%) delivery on your order form.',
    },
    {
      id: 'faq-pricing-5',
      question: 'What is your revision policy?',
      answer:
        'We offer revisions on all delivered work to ensure complete satisfaction, provided the revision request aligns with your initial order guidelines and brief.',
    },
  ];

  return (
    <div className="w-full pt-28 pb-20 animate-fadeIn">
      {/* 1. Pricing Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          <span>TRANSPARENT AGENCY PRICING • 50% GRAND LAUNCH OFFER</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
          Simple, Transparent <span className="gradient-gold-text">Rates & Packages</span> With Zero Hidden Costs
        </h1>

        <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
          Affordable, high-end digital agency solutions designed for Pakistani and international students, job seekers, and corporate professionals.
        </p>

        {/* Currency Switcher & Speed Controls */}
        <div className="max-w-xl mx-auto glass-card p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-300">
            <span className="font-semibold">Selected Currency:</span>
            <div className="flex bg-black/40 p-1 rounded-full border border-white/10">
              <button
                onClick={() => setCurrency('PKR')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currency === 'PKR' ? 'bg-[#E5C158] text-[#050507]' : 'text-neutral-400 hover:text-white'
                }`}
              >
                PKR (🇵🇰 Pakistan)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currency === 'USD' ? 'bg-[#E5C158] text-[#050507]' : 'text-neutral-400 hover:text-white'
                }`}
              >
                USD (🌐 International)
              </button>
            </div>
          </div>

          {onOpenCalculator && (
            <button
              onClick={onOpenCalculator}
              className="text-xs font-bold text-[#E5C158] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Use Live Calculator</span>
            </button>
          )}
        </div>
      </section>

      {/* 2. Speed Multipliers Selector Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="glass-card rounded-2xl border border-white/10 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="font-poppins font-bold text-sm text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#E5C158]" />
                <span>Simulate Turnaround Speed Multipliers</span>
              </h3>
              <p className="text-xs text-neutral-400">Select a deadline speed below to view real-time adjusted rates across all packages.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(Object.keys(speedMultipliers) as Array<keyof typeof speedMultipliers>).map((speedKey) => {
              const speed = speedMultipliers[speedKey];
              const isSelected = activeSpeed === speedKey;
              return (
                <button
                  key={speedKey}
                  onClick={() => setActiveSpeed(speedKey)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E5C158]/15 border-[#E5C158] text-white shadow-lg'
                      : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-[11px]">{speed.badge}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#E5C158]" />}
                  </div>
                  <span className="text-[10px] text-neutral-300 block">{speed.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Core Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-2 block">
            APPROVED SERVICE RATES
          </span>
          <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white">
            Grand Launch Pricing Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const isFeatured = service.id === 'ats-resume' || service.id === 'presentation';

            return (
              <div
                key={service.id}
                className={`glass-card rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  isFeatured
                    ? 'border-[#E5C158] shadow-[0_0_30px_rgba(229,193,88,0.15)] bg-gradient-to-b from-[#E5C158]/10 via-transparent to-black/40'
                    : 'border-white/10 hover:border-[#E5C158]/30'
                }`}
              >
                {isFeatured && (
                  <div className="absolute top-0 right-0 bg-[#E5C158] text-[#050507] text-[9px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-xl">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-poppins font-bold text-base text-white">{service.title}</h3>
                      <span className="text-[10px] text-[#28C76F] font-semibold flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{service.deliveryTime || '24-48 Hours'}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">{service.description}</p>

                  {/* Price Tag */}
                  <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl mb-4">
                    <span className="text-[10px] text-neutral-400 block uppercase font-medium">Discounted Rate</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-poppins font-extrabold text-[#E5C158]">
                        {calculateFinalPrice(service.pricePkr, service.priceUsd)}
                      </span>
                      <span className="text-xs text-neutral-400">{service.unit}</span>
                    </div>
                    <span className="text-[10px] text-[#28C76F] font-semibold block mt-1">
                      Includes 50% Grand Launch Promo
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 text-xs text-neutral-300">
                    {service.features?.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectService(service.id)}
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    isFeatured
                      ? 'bg-[#E5C158] text-[#050507] hover:bg-[#fce888] shadow-lg'
                      : 'border border-white/20 bg-white/[0.04] text-white hover:bg-white/10'
                  }`}
                >
                  <span>Order {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Package Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-2 block">
            TIER COMPARISON
          </span>
          <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white">
            Compare Service Tiers & Deliverables
          </h2>
        </div>

        <div className="glass-card rounded-2xl border border-white/10 overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300 min-w-[600px]">
            <thead className="bg-white/[0.04] border-b border-white/10 text-white font-poppins font-bold">
              <tr>
                <th className="p-4">Feature / Service Tier</th>
                <th className="p-4">Academic Tier</th>
                <th className="p-4 text-[#E5C158]">Career Tier (Popular)</th>
                <th className="p-4">Corporate & Business Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="p-4 font-semibold text-white">Target Scope</td>
                <td className="p-4">Assignments, Essays, Slides</td>
                <td className="p-4 text-white font-medium">Resumes, ATS CVs, Cover Letters</td>
                <td className="p-4">Reports, Pitch Decks, Case Studies</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Turnaround Time</td>
                <td className="p-4">24 - 48 Hours</td>
                <td className="p-4 text-white font-medium">24 Hours Express Available</td>
                <td className="p-4">2 - 3 Days (or Rush)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Referencing & Standards</td>
                <td className="p-4">APA / Harvard / MLA Strict</td>
                <td className="p-4 text-white font-medium">ATS Keyword Parser Optimized</td>
                <td className="p-4">Executive Executive Summary & Charts</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Editable Source Files</td>
                <td className="p-4">DOCX / PPTX + PDF</td>
                <td className="p-4 text-white font-medium">DOCX + High-Res PDF</td>
                <td className="p-4">Editable PPTX + PDF + Data Graphics</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Confidentiality Guarantee</td>
                <td className="p-4">100% Protected</td>
                <td className="p-4 text-white font-medium">100% Protected</td>
                <td className="p-4">100% Protected</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Payment Methods & Payment Workflow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-8 sm:p-12 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-2 block">
              OFFICIAL PAYMENT CHANNELS
            </span>
            <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white mb-3">
              Official Agency Account Details
            </h2>
            <p className="text-xs text-neutral-400">
              Complete your payment using any of the verified channels below, capture a screenshot, and attach it to your order form.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* EasyPaisa */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between hover:border-[#28C76F]/50 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#28C76F]/20 text-[#28C76F] font-bold text-lg flex items-center justify-center">
                    EP
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-base text-white">EasyPaisa</h4>
                    <span className="text-[10px] text-[#28C76F] font-semibold">Instant Mobile Wallet</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-neutral-300">
                  <p><strong className="text-white">Account Title:</strong> Muhammad Shehroz Sultan</p>
                  <p><strong className="text-white">Account Number:</strong> <span className="font-mono text-[#E5C158] text-sm">03116191234</span></p>
                </div>
              </div>
            </div>

            {/* JazzCash */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between hover:border-red-500/50 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 font-bold text-lg flex items-center justify-center">
                    JC
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-base text-white">JazzCash</h4>
                    <span className="text-[10px] text-red-400 font-semibold">Instant Mobile Wallet</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-neutral-300">
                  <p><strong className="text-white">Account Title:</strong> Muhammad Shehroz Sultan</p>
                  <p><strong className="text-white">Account Number:</strong> <span className="font-mono text-[#E5C158] text-sm">03015323688</span></p>
                </div>
              </div>
            </div>

            {/* Bank Transfer */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between hover:border-[#E5C158]/50 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E5C158]/20 text-[#E5C158] font-bold text-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-base text-white">Askari Bank</h4>
                    <span className="text-[10px] text-[#E5C158] font-semibold">Direct Bank Transfer</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-neutral-300">
                  <p><strong className="text-white">Account Title:</strong> Muhammad Shehroz Sultan</p>
                  <p><strong className="text-white">Account Number:</strong> <span className="font-mono text-[#E5C158] text-sm font-bold">00553230017265</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs text-neutral-400 flex items-center justify-between flex-wrap gap-2">
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#28C76F]" />
              <span>International USD payments are coordinated directly via secure wire details upon order submission.</span>
            </span>
            <span className="text-white font-medium">Questions? Contact Support at +92 301 5323689</span>
          </div>
        </div>
      </section>

      {/* 6. Pricing FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-2 block">
            PRICING HELP
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
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-[#E5C158] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#E5C158] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
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

      {/* 7. Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-r from-[#E5C158]/10 via-transparent to-black">
          <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white mb-4">
            Lock In Your 50% Grand Launch Discount Today
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Get instant support, transparent pricing, and rapid delivery on presentations, assignments, and ATS resumes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onSelectService('presentation')}
              className="px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all shadow-xl cursor-pointer flex items-center gap-2"
            >
              <span>Place Your Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
