import React, { useState } from 'react';
import { Currency, ServiceItem } from '../types';
import { SERVICES, FAQS, WHY_US_ITEMS } from '../data/content';
import { Sparkles, ArrowRight, CheckCircle2, Clock, Star, Eye, ShieldCheck, FileText, ChevronDown, HelpCircle, X, Zap, BookOpen } from 'lucide-react';

interface ServicesPageProps {
  currency: Currency;
  onSelectService: (serviceId: string) => void;
  onOpenCalculator?: () => void;
  onNavigatePage?: (page: string) => void;
}

const SERVICE_GUIDE_MAP: Record<string, { page: string; url: string; label: string }> = {
  'presentation': {
    page: 'guide-pitch-deck',
    url: '/guides/executive-pitch-deck-structure',
    label: 'Explore Pitch Deck Guide',
  },
  'pitch-deck': {
    page: 'guide-pitch-deck',
    url: '/guides/executive-pitch-deck-structure',
    label: 'Explore Pitch Deck Guide',
  },
  'assignment': {
    page: 'guide-academic-formatting',
    url: '/guides/academic-formatting-citation',
    label: 'Read Academic Formatting Guide',
  },
  'case-studies': {
    page: 'guide-academic-formatting',
    url: '/guides/academic-formatting-citation',
    label: 'Read Academic Formatting Guide',
  },
  'ats-resume': {
    page: 'guide-ats-resume',
    url: '/guides/ats-resume-engineering',
    label: 'Read ATS Resume Guide',
  },
  'resume': {
    page: 'guide-ats-resume',
    url: '/guides/ats-resume-engineering',
    label: 'Read ATS Resume Guide',
  },
  'cv-design': {
    page: 'guide-ats-resume',
    url: '/guides/ats-resume-engineering',
    label: 'Read ATS Resume Guide',
  },
  'reports': {
    page: 'guide-corporate-report',
    url: '/guides/corporate-report-formatting-standards',
    label: 'Explore Corporate Report Guide',
  },
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  currency,
  onSelectService,
  onOpenCalculator,
  onNavigatePage,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Academic' | 'Career' | 'Business'>('All');
  const [selectedDetailService, setSelectedDetailService] = useState<ServiceItem | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const filteredServices = SERVICES.filter((service) => {
    if (activeTab === 'All') return true;
    return service.category === activeTab;
  });

  const formatPrice = (service: ServiceItem) => {
    const isPkr = currency === 'PKR';
    const amount = isPkr ? service.pricePkr : service.priceUsd;
    const origAmount = isPkr ? service.originalPricePkr : service.originalPriceUsd;

    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 line-through">
            {isPkr ? `PKR ${origAmount?.toLocaleString()}` : `$${origAmount?.toFixed(2)}`}
          </span>
          <span className="text-[10px] uppercase font-bold text-[#28C76F] bg-[#28C76F]/10 border border-[#28C76F]/30 px-1.5 py-0.5 rounded">
            50% OFF
          </span>
        </div>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-xl font-poppins font-bold text-[#E5C158]">
            {isPkr ? `PKR ${amount.toLocaleString()}` : `$${amount.toFixed(2)}`}
          </span>
          <span className="text-xs text-neutral-400">{service.unit}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full pt-28 pb-20 animate-fadeIn">
      {/* 1. Services Page Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          <span>OUR WORK & DIGITAL SERVICES • 50% GRAND LAUNCH OFF</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
          Digital Services in Pakistan — <span className="gradient-gold-text">Presentations, Assignments & ATS Resumes</span>
        </h1>

        <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
          From executive pitch decks and academic assignment research to ATS-compliant resumes, reports, and document formatting — delivered with speed, confidentiality, and precision.
        </p>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10 p-4 rounded-2xl glass-card border border-white/10 text-left">
          <div className="p-2 border-r border-white/5 last:border-none">
            <p className="text-2xl font-bold font-poppins text-[#E5C158]">11+</p>
            <p className="text-xs text-neutral-400">Specialized Services</p>
          </div>
          <div className="p-2 border-r border-white/5 last:border-none">
            <p className="text-2xl font-bold font-poppins text-white">100%</p>
            <p className="text-xs text-neutral-400">Plagiarism Free & Confidential</p>
          </div>
          <div className="p-2 border-r border-white/5 last:border-none">
            <p className="text-2xl font-bold font-poppins text-[#28C76F]">24 Hours</p>
            <p className="text-xs text-neutral-400">Express Delivery Option</p>
          </div>
          <div className="p-2">
            <p className="text-2xl font-bold font-poppins text-white">5.0 ★</p>
            <p className="text-xs text-neutral-400">Verified Client Rating</p>
          </div>
        </div>
      </section>

      {/* 2. Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-white/[0.03] border border-white/10 max-w-2xl mx-auto">
          {(['All', 'Academic', 'Career', 'Business'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#E5C158] text-[#050507] shadow-lg scale-105'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab === 'All' ? 'All Services (11)' : tab === 'Academic' ? 'Academic & Student' : tab === 'Career' ? 'Resumes & Career' : 'Business & Reports'}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-[#E5C158]/40 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#E5C158]/5 rounded-full blur-xl group-hover:bg-[#E5C158]/15 transition-all" />

              <div>
                {/* Header Badge & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30">
                    {service.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{service.rating || '5.0'}</span>
                  </div>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-lg text-white group-hover:text-[#E5C158] transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-[#E5C158]" />
                      <span>Delivery: {service.deliveryTime || '24 - 48 Hours'}</span>
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-300 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Deliverable Features List */}
                {service.features && (
                  <ul className="space-y-2 mb-4 border-t border-white/5 pt-4 text-xs text-neutral-300">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Contextual Inbound Guide Link */}
                {SERVICE_GUIDE_MAP[service.id] && (
                  <div className="pt-3 mb-2 border-t border-white/5">
                    <a
                      href={SERVICE_GUIDE_MAP[service.id].url}
                      onClick={(e) => {
                        e.preventDefault();
                        const guideInfo = SERVICE_GUIDE_MAP[service.id];
                        if (onNavigatePage) {
                          onNavigatePage(guideInfo.page);
                        } else {
                          window.history.pushState({ page: guideInfo.page }, '', guideInfo.url);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#E5C158] hover:text-[#fce888] hover:underline transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#E5C158]" />
                      <span>{SERVICE_GUIDE_MAP[service.id].label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Bottom Price & Actions */}
              <div className="border-t border-white/10 pt-4 mt-auto">
                <div className="flex items-center justify-between mb-4">
                  {formatPrice(service)}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedDetailService(service)}
                    className="w-full py-2.5 px-3 rounded-xl border border-white/15 bg-white/[0.03] text-xs font-semibold text-neutral-200 hover:text-white hover:bg-white/[0.08] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-neutral-400" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => onSelectService(service.id)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#E5C158] text-[#050507] text-xs font-bold hover:bg-[#fce888] transition-all flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Choose MFS Growth Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="glass-card rounded-3xl border border-white/10 p-8 sm:p-12 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-2 block">
              TRUST & QUALITY STANDARDS
            </span>
            <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white mb-4">
              Why Students & Executives Rely on MFS Growth
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              We maintain rigorous quality standards, confidentiality protocols, and citation compliance across every document.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_US_ITEMS.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#E5C158]/30 transition-all"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-poppins font-bold text-base text-white mb-2">{item.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Process / Order Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-2 block">
            SIMPLE 4-STEP WORKFLOW
          </span>
          <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white">
            How Ordering Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { num: '01', title: 'Select Service & Brief', desc: 'Choose your service, specify pages/slides, and outline guidelines.' },
            { num: '02', title: 'Upload Files', desc: 'Attach reference documents, rubrics, DOCX, PPTX, or ZIP files.' },
            { num: '03', title: 'Pay & Upload Proof', desc: 'Transfer via EasyPaisa, JazzCash, or Bank Transfer and upload proof.' },
            { num: '04', title: 'Receive Completed Work', desc: 'Download your finalized high-quality file directly from your dashboard.' },
          ].map((step, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-white/10 relative flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-poppins font-extrabold text-[#E5C158]/30 block mb-2">
                  {step.num}
                </span>
                <h3 className="font-poppins font-bold text-base text-white mb-2">{step.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-2 block">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white">
            Got Questions About Our Services?
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => {
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

      {/* 7. Call To Action (CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-r from-[#E5C158]/10 via-transparent to-black">
          <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white mb-4">
            Ready to Accelerate Your Academic & Professional Success?
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Take advantage of our active 50% Grand Launch Offer. Submit your project requirements now and experience fast, confidential service.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onSelectService('presentation')}
              className="px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all shadow-xl cursor-pointer flex items-center gap-2"
            >
              <span>Place Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenCalculator && (
              <button
                onClick={onOpenCalculator}
                className="px-8 py-3.5 rounded-full border border-white/20 bg-white/[0.05] text-white font-semibold text-xs hover:bg-white/10 transition-all cursor-pointer"
              >
                Use Live Price Calculator
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 8. Service Detail Modal */}
      {selectedDetailService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-card border border-[#E5C158]/40 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedDetailService(null)}
              className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selectedDetailService.icon}</span>
              <div>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30">
                  {selectedDetailService.badge}
                </span>
                <h3 className="font-poppins font-bold text-2xl text-white mt-1">
                  {selectedDetailService.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed mb-6">
              {selectedDetailService.description}
            </p>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 text-xs">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">Estimated Turnaround</span>
                <span className="font-semibold text-white flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#E5C158]" />
                  {selectedDetailService.deliveryTime || '24 - 48 Hours'}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">Grand Launch Rate</span>
                <span className="font-bold text-[#E5C158] text-sm mt-0.5 block">
                  {currency === 'PKR'
                    ? `PKR ${selectedDetailService.pricePkr.toLocaleString()} ${selectedDetailService.unit}`
                    : `$${selectedDetailService.priceUsd.toFixed(2)} ${selectedDetailService.unit}`}
                </span>
              </div>
            </div>

            <h4 className="font-poppins font-bold text-sm text-white mb-3">Key Features & Deliverables:</h4>
            <ul className="space-y-2 mb-8 text-xs text-neutral-300">
              {selectedDetailService.features?.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E5C158] shrink-0" />
                <span>Policy-based revisions included within original brief scope</span>
              </li>
            </ul>

            <div className="flex gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  const serviceId = selectedDetailService.id;
                  setSelectedDetailService(null);
                  onSelectService(serviceId);
                }}
                className="flex-1 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Order This Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
