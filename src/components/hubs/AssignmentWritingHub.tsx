import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Currency, DeliverySpeed } from '../../types';
import { calculateServicePrice, PORTFOLIO_SAMPLES, REVIEWS } from '../../data/content';
import {
  FileText,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Zap,
  Sliders,
  Award,
  BookOpen,
  Lock,
  Eye,
  X,
  MessageSquare,
  Star,
  ChevronDown,
  Clock,
  CheckCheck,
  GraduationCap
} from 'lucide-react';

interface AssignmentWritingHubProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenOrderModal: (serviceId?: string, words?: number) => void;
  onOpenAIChat?: () => void;
  onShowToast: (msg: string) => void;
  onNavigatePage: (page: string) => void;
}

export const AssignmentWritingHub: React.FC<AssignmentWritingHubProps> = ({
  currency,
  setCurrency,
  onOpenOrderModal,
  onOpenAIChat,
  onShowToast,
  onNavigatePage
}) => {
  const [wordCount, setWordCount] = useState<number>(2000);
  const [speed, setSpeed] = useState<DeliverySpeed>('standard');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedSample, setSelectedSample] = useState<typeof PORTFOLIO_SAMPLES[0] | null>(null);

  const priceCalc = calculateServicePrice('assignment', wordCount, speed, currency);

  const assignmentSamples = PORTFOLIO_SAMPLES.filter(
    (s) => s.category === 'Assignment Writing' || s.title.toLowerCase().includes('academic') || s.title.toLowerCase().includes('assignment')
  );

  const assignmentReviews = REVIEWS.filter(
    (r) => r.service.toLowerCase().includes('assignment') || r.service.toLowerCase().includes('academic') || r.service.toLowerCase().includes('essay')
  );

  const faqs = [
    {
      q: 'Which academic citation and referencing styles do you support?',
      a: 'We strictly format assignments according to APA (6th & 7th Edition), Harvard, MLA (8th & 9th), Chicago / Turabian, IEEE, and Oxford referencing standards with complete in-text citations and reference lists.'
    },
    {
      q: 'Do you guarantee 100% plagiarism-free content with Turnitin compatibility?',
      a: 'Yes! Every assignment is written from scratch following your university grading rubric. We verify originality to ensure zero AI hallucination or plagiarism risk.'
    },
    {
      q: 'How fast can a 2,000 to 5,000-word assignment be delivered?',
      a: 'Our standard delivery is 24 to 48 hours. For urgent academic deadlines, we offer 24-Hour Express and Same-Day Priority turnaround with guaranteed on-time delivery.'
    },
    {
      q: 'Can I upload lecture slides, grading rubrics, and professor briefs?',
      a: 'Yes! You can attach your assignment guideline sheet, grading criteria, recommended journal articles, or lecture notes directly in our secure order checkout portal.'
    },
    {
      q: 'Are revisions included if my instructor gives feedback?',
      a: 'Yes, all orders include free revisions to address any instructor remarks or adjustments according to the initial brief.'
    }
  ];

  const handleProtectedDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShowToast('🔒 Downloads are disabled to protect student confidentiality & academic integrity.');
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#E5C158]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[#E5C158]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* BREADCRUMB NAVIGATION */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
          <button onClick={() => onNavigatePage('home')} className="hover:text-[#E5C158] transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => onNavigatePage('services')} className="hover:text-[#E5C158] transition-colors">Services</button>
          <span>/</span>
          <span className="text-[#E5C158]">Academic Assignment Writing</span>
        </div>

        {/* HERO INTRO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold tracking-wider uppercase">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>University Grade Academic Solutions</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-white leading-tight">
              Academic Assignment & <span className="gold-pure-gradient">Coursework Writing</span>
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Get meticulously researched, 100% original academic assignments and essays tailored to your university rubrics. Formatted with rigorous APA, Harvard, MLA, or IEEE citations, verified literature reviews, and flawless structural logic.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#28C76F] shrink-0" />
                <span className="text-xs font-medium text-neutral-200">100% Plagiarism Free</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#E5C158] shrink-0" />
                <span className="text-xs font-medium text-neutral-200">APA / Harvard / MLA</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-[#E5C158] shrink-0" />
                <span className="text-xs font-medium text-neutral-200">24-48h Guaranteed</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onOpenOrderModal('assignment', wordCount)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-poppins font-bold text-sm hover:shadow-[0_0_24px_rgba(229,193,88,0.4)] transition-all flex items-center gap-2"
              >
                <span>Order Assignment (50% OFF)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('assignment-calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-poppins font-semibold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Sliders className="w-4 h-4 text-[#E5C158]" />
                <span>Calculate Word Rate</span>
              </button>
            </div>
          </div>

          {/* RIGHT SHOWCASE CARD */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl border border-[#E5C158]/30 p-6 relative overflow-hidden bg-gradient-to-b from-[#16161D] to-[#0D0D12] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E5C158]/20 flex items-center justify-center text-[#E5C158]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold font-poppins text-white">Academic Manuscript</div>
                    <div className="text-[10px] text-neutral-400 font-mono">APA 7th Edition Master</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-mono font-bold">
                  Verified Original
                </span>
              </div>

              {/* PAPER VISUAL SPECIMEN */}
              <div className="rounded-xl bg-[#08080C] border border-white/10 p-5 space-y-3 font-sans">
                <div className="text-[10px] text-[#E5C158] font-mono uppercase tracking-wider flex justify-between">
                  <span>Abstract & Critical Review</span>
                  <span>Peer-Reviewed Sources (2020-2025)</span>
                </div>
                <h4 className="text-sm font-bold text-white font-poppins">
                  Sustainable Supply Chain Logistics in Developing Economies
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                  This empirical research synthesizes contemporary supply chain frameworks, evaluating decarbonization metrics across manufacturing clusters...
                </p>

                <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 space-y-1 text-[11px] font-mono">
                  <div className="text-[#E5C158]">Key Citations:</div>
                  <div className="text-neutral-400">Porter, M. E. (2021). Harvard Business Review, 99(4), 45–58.</div>
                  <div className="text-neutral-400">Svensson, G. (2023). Journal of Cleaner Production, 212, 102–115.</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs text-neutral-300">
                  Base rate from <strong className="text-[#E5C158] font-mono">PKR 1,000 / $7.50</strong> (per 1,000 words)
                </div>
                <button
                  onClick={() => onOpenOrderModal('assignment', 1000)}
                  className="text-xs text-[#E5C158] hover:underline font-poppins font-bold flex items-center gap-1"
                >
                  <span>Quick Order</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DEDICATED WORD COUNT CALCULATOR */}
        <div id="assignment-calculator" className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 bg-[#0D0D12]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] text-[11px] font-mono font-bold mb-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>Word Count & Academic Scope Calculator</span>
              </div>
              <h2 className="text-2xl font-bold font-poppins text-white">Calculate Assignment Investment</h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Transparent word-count pricing with active 50% Grand Launch promo discount.
              </p>
            </div>

            {/* CURRENCY SELECTOR */}
            <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-white/10 shrink-0">
              {(['PKR', 'USD', 'GBP', 'EUR', 'AED'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    currency === c
                      ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* CONTROLS */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold font-poppins text-neutral-300">
                    Target Word Count: <span className="text-[#E5C158] font-bold text-sm">{wordCount.toLocaleString()} Words</span>
                  </label>
                  <span className="text-[11px] text-neutral-400 font-mono">1,000 to 10,000 Words</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={10000}
                  step={500}
                  value={wordCount}
                  onChange={(e) => setWordCount(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#E5C158]"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
                  <span>1,000 Words (Short Essay)</span>
                  <span>3,000 Words (Coursework)</span>
                  <span>5,000 Words (Research Paper)</span>
                  <span>10,000 Words (Dissertation)</span>
                </div>
              </div>

              {/* SPEED SELECTION */}
              <div>
                <label className="block text-xs font-semibold font-poppins text-neutral-300 mb-2">
                  Select Turnaround Speed:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'standard', label: 'Standard', time: '24-48h', mult: '0%' },
                    { id: 'express', label: 'Express', time: '18-24h', mult: '+30%' },
                    { id: 'priority', label: 'Priority', time: '12-18h', mult: '+50%' },
                    { id: 'sameday', label: 'Same-Day', time: '6-12h', mult: '+75%' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSpeed(s.id as DeliverySpeed)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        speed === s.id
                          ? 'bg-[#E5C158]/10 border-[#E5C158] text-white shadow-[0_0_12px_rgba(229,193,88,0.2)]'
                          : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold font-poppins">{s.label}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">{s.time}</div>
                      <div className="text-[9px] text-[#E5C158] font-mono mt-1">{s.mult}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* PRICE BREAKDOWN CARD */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121212] to-[#1A180E] border border-[#E5C158]/40 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-neutral-400">Regular Estimated Rate</span>
                  <span className="text-sm font-mono text-neutral-500 line-through">
                    {priceCalc.formattedOriginal}
                  </span>
                </div>

                <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs text-[#28C76F] font-bold block">50% Grand Launch Rate</span>
                    <span className="text-[10px] text-neutral-400 font-mono">Includes In-Text Citations + References</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-extrabold font-poppins gold-pure-gradient">
                      {priceCalc.formattedFinal}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F]" />
                    <span>{wordCount.toLocaleString()} Words Original Research ({speed.toUpperCase()} Speed)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F]" />
                    <span>APA / Harvard / MLA / Chicago Referencing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F]" />
                    <span>100% Originality & Confidentiality Guaranteed</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenOrderModal('assignment', wordCount)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-poppins font-bold text-sm hover:shadow-[0_0_20px_rgba(229,193,88,0.4)] transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <span>Proceed with {wordCount.toLocaleString()} Words</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECURED "OUR WORK" SAMPLES PREVIEW */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] text-xs font-mono font-semibold mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>ACADEMIC WORK SHOWCASE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-white">
                Our Work — <span className="gold-pure-gradient">Assignments & Research</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Watermarked and secured for student privacy. Downloads strictly disabled.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assignmentSamples.map((sample) => (
              <div
                key={sample.id}
                className="glass-card rounded-2xl border border-white/10 p-5 bg-[#0D0D12] hover:border-[#E5C158]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[16/9] rounded-xl bg-[#16161F] border border-white/10 relative overflow-hidden mb-4 flex items-center justify-center">
                    <img
                      src={sample.image}
                      alt={sample.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedSample(sample)}
                        className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-poppins font-bold text-xs flex items-center gap-1.5 shadow-lg"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Paper Structure</span>
                      </button>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-[#E5C158] uppercase tracking-wider">{sample.category}</span>
                  <h3 className="font-poppins font-bold text-sm text-white mt-1 group-hover:text-[#E5C158] transition-colors">
                    {sample.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {sample.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={handleProtectedDownload}
                    className="text-[11px] text-neutral-400 hover:text-neutral-300 font-mono flex items-center gap-1"
                  >
                    <Lock className="w-3 h-3 text-[#E5C158]" />
                    <span>Protected Sample</span>
                  </button>
                  <button
                    onClick={() => onOpenOrderModal('assignment', 2000)}
                    className="text-xs text-[#E5C158] hover:underline font-poppins font-bold"
                  >
                    Order Similar Paper
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VERIFIED CUSTOMER REVIEWS */}
        <div className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 bg-[#0D0D12] space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-bold font-poppins text-white">Student Feedback & Ratings</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Verified undergraduate, master, and doctoral submissions</p>
            </div>
            <div className="flex items-center gap-1.5 bg-[#E5C158]/10 px-3 py-1.5 rounded-xl border border-[#E5C158]/30">
              <Star className="w-4 h-4 fill-[#E5C158] text-[#E5C158]" />
              <span className="text-xs font-mono font-bold text-white">5.0 / 5.0 Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignmentReviews.slice(0, 4).map((review) => (
              <div key={review.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-bold font-poppins text-white">{review.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{review.service} • {review.location}</div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#E5C158] text-[#E5C158]" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-bold font-poppins text-white">Academic Assignment FAQ</h2>
            <p className="text-xs text-neutral-400">Everything you need to know about academic integrity, formatting, and delivery</p>
          </div>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[#0D0D12] overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold font-poppins text-white hover:text-[#E5C158] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#E5C158] transition-transform ${
                    activeFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFaq === index && (
                <div className="px-4 pb-4 text-xs text-neutral-300 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* BOTTOM CTA BANNER */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1A180E] via-[#121212] to-[#0A0A0E] border border-[#E5C158]/40 text-center space-y-4 shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-white">
            Need Expert Assistance with Your Assignment?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
            Place your order today with our 50% Grand Launch rate and receive your citation-formatted coursework delivered on time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenOrderModal('assignment', 2000)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-poppins font-bold text-sm hover:shadow-[0_0_24px_rgba(229,193,88,0.4)] transition-all flex items-center gap-2"
            >
              <span>Order Assignment Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/923015323689?text=Hello%20MFS%20Growth%20Agency!%20I%20would%20like%20to%20discuss%20an%20Assignment%20Writing%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-poppins font-semibold text-sm hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#28C76F]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* SAMPLE PREVIEW MODAL */}
      <AnimatePresence>
        {selectedSample && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-2xl border border-white/20 p-6 max-w-2xl w-full bg-[#121212] space-y-4 relative"
            >
              <button
                onClick={() => setSelectedSample(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#E5C158] uppercase">{selectedSample.category}</span>
                <span className="text-xs text-neutral-500">•</span>
                <span className="text-xs font-mono text-neutral-400">Secured Specimen</span>
              </div>

              <h3 className="text-lg font-bold font-poppins text-white">{selectedSample.title}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">{selectedSample.summary}</p>

              <div className="aspect-[16/9] rounded-xl bg-[#08080C] border border-white/10 relative overflow-hidden flex items-center justify-center">
                <img
                  src={selectedSample.image}
                  alt={selectedSample.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded-md text-[10px] font-mono text-[#E5C158] border border-[#E5C158]/30">
                  🔒 Secured Academic Watermark
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <button
                  onClick={handleProtectedDownload}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 text-xs font-mono flex items-center gap-2 hover:bg-white/10"
                >
                  <Lock className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Download Disabled</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedSample(null);
                    onOpenOrderModal('assignment', 2000);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#E5C158] text-black font-poppins font-bold text-xs flex items-center gap-1.5 shadow-lg"
                >
                  <span>Order Similar Assignment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
