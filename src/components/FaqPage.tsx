import React, { useState, useMemo, useEffect } from 'react';
import { COMPREHENSIVE_FAQS, FAQ_CATEGORIES, DetailedFaq } from '../data/faqData';
import { SERVICES } from '../data/content';
import {
  Search,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Bot,
  Mic,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  X,
  FileText,
  Clock,
  ShieldCheck,
  CreditCard,
  ExternalLink,
  Award,
  Zap,
  Globe,
  Headphones,
  BookOpen
} from 'lucide-react';

const FAQ_GUIDE_MAP: Record<string, { title: string; label: string; url: string; page: string }> = {
  'faq-gen-1': {
    title: 'About MFS Growth Agency',
    label: 'Learn more about our agency mission, founder, and global service scope on our About page.',
    url: '/about',
    page: 'about',
  },
  'faq-gen-founder': {
    title: 'Founder & Leadership',
    label: 'Discover how Founder Muhammad Shehroz Sultan established MFS Growth Agency.',
    url: '/about',
    page: 'about',
  },
  'faq-gen-location': {
    title: 'Pakistan HQ & Global Desk',
    label: 'View details on our Pakistan headquarters and international 24/7 support desk.',
    url: '/contact',
    page: 'contact',
  },
  'faq-srv-1': {
    title: 'Explore Our Digital Services',
    label: 'View all 11+ specialized presentation, assignment, resume, and report services.',
    url: '/services',
    page: 'services',
  },
  'faq-ats-1': {
    title: 'ATS Resume Engineering Guide',
    label: 'For a deeper explanation, read our ATS Resume Engineering Guide.',
    url: '/guides/ats-resume-engineering',
    page: 'guide-ats-resume',
  },
  'faq-ats-2': {
    title: 'ATS Resume Engineering Guide',
    label: 'For a deeper explanation, read our ATS Resume Engineering Guide.',
    url: '/guides/ats-resume-engineering',
    page: 'guide-ats-resume',
  },
  'faq-prs-1': {
    title: 'Executive Pitch Deck Structure Guide',
    label: 'For a deeper explanation, read our Executive Pitch Deck Structure Guide.',
    url: '/guides/executive-pitch-deck-structure',
    page: 'guide-pitch-deck',
  },
  'faq-prs-2': {
    title: 'Executive Pitch Deck Structure Guide',
    label: 'For a deeper explanation, read our Executive Pitch Deck Structure Guide.',
    url: '/guides/executive-pitch-deck-structure',
    page: 'guide-pitch-deck',
  },
  'faq-srv-2': {
    title: 'Executive Pitch Deck Structure Guide',
    label: 'For a deeper explanation, read our Executive Pitch Deck Structure Guide.',
    url: '/guides/executive-pitch-deck-structure',
    page: 'guide-pitch-deck',
  },
  'faq-asg-1': {
    title: 'Academic Formatting & Citation Guide',
    label: 'For a deeper explanation, read our Academic Formatting & Citation Guide.',
    url: '/guides/academic-formatting-citation',
    page: 'guide-academic-formatting',
  },
  'faq-asg-2': {
    title: 'Academic Formatting & Citation Guide',
    label: 'For a deeper explanation, read our Academic Formatting & Citation Guide.',
    url: '/guides/academic-formatting-citation',
    page: 'guide-academic-formatting',
  },
  'faq-rpt-1': {
    title: 'Corporate Report Formatting Standards Guide',
    label: 'For a deeper explanation, read our Corporate Report Formatting Standards Guide.',
    url: '/guides/corporate-report-formatting-standards',
    page: 'guide-corporate-report',
  },
};

interface FaqPageProps {
  onOpenOrderModal: () => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq', targetSection?: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({
  onOpenOrderModal,
  onOpenAIChat,
  onShowToast,
  onNavigatePage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Questions');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-gen-1');

  // Helpful state map: { [faqId]: 'yes' | 'no' }
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, 'yes' | 'no'>>({});

  // Filter FAQs based on search query and active category
  const filteredFaqs = useMemo(() => {
    return COMPREHENSIVE_FAQS.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'All Questions' || faq.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Reset expanded accordion when category or search changes to ensure fresh results display
  useEffect(() => {
    if (filteredFaqs.length > 0 && selectedCategory !== 'All Questions') {
      setExpandedFaqId(filteredFaqs[0].id);
    } else if (selectedCategory === 'All Questions') {
      setExpandedFaqId('faq-gen-1');
    } else {
      setExpandedFaqId(null);
    }
  }, [selectedCategory, searchQuery]);

  // Featured / Popular FAQs
  const popularFaqs = useMemo(() => {
    return COMPREHENSIVE_FAQS.filter((faq) => faq.popular);
  }, []);

  const handleVote = (id: string, vote: 'yes' | 'no') => {
    setHelpfulVotes((prev) => ({ ...prev, [id]: vote }));
    if (vote === 'yes') {
      if (onShowToast) onShowToast('Thank you for your feedback! 👍');
    } else {
      if (onShowToast) onShowToast('Sorry to hear that! Connect with our 24/7 AI Assistant or WhatsApp team below.');
    }
  };

  // Inject JSON-LD FAQ Schema for SEO
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://mfsgrowth.online/faq#faqpage',
      'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
      'publisher': { '@id': 'https://mfsgrowth.online/#organization' },
      mainEntity: COMPREHENSIVE_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'mfs-faq-schema';
    script.text = JSON.stringify(faqSchema);

    // Remove old schema script if exists
    const existingScript = document.getElementById('mfs-faq-schema');
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('mfs-faq-schema');
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="w-full pt-28 pb-20 animate-fadeIn">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold mb-6">
          <HelpCircle className="w-4 h-4" />
          <span>HELP & KNOWLEDGE CENTER</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
          MFS Growth Agency FAQ — <span className="gradient-gold-text">Answers & Support</span>
        </h1>

        <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
          Search our comprehensive answer hub for instant guidance on presentation design, academic writing, ATS resumes, pricing discounts, turnarounds, and 24/7 support.
        </p>

        {/* 2. Smart Live FAQ Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-8">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-[#E5C158] absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. EasyPaisa, turnaround, 50% discount, APA, ATS)..."
              className="w-full bg-black/60 border border-white/20 focus:border-[#E5C158] text-white text-xs sm:text-sm rounded-2xl pl-12 pr-12 py-4 focus:outline-none shadow-[0_0_25px_rgba(229,193,88,0.1)] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-neutral-400 hover:text-white transition-colors"
                title="Clear Search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search Result Count Indicator */}
          {searchQuery && (
            <div className="mt-3 text-xs text-neutral-400 text-left px-2 flex items-center justify-between">
              <span>
                Found <strong className="text-[#E5C158]">{filteredFaqs.length}</strong> matching answer{filteredFaqs.length === 1 ? '' : 's'} for "{searchQuery}"
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#E5C158] underline text-[11px] cursor-pointer hover:text-white"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Quick Topic Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-400">
          <span className="text-[11px] font-semibold text-neutral-500">Popular Searches:</span>
          {['Pricing & 50% Off', 'EasyPaisa & JazzCash', 'Delivery Speed', 'Plagiarism Guarantee', 'ATS Resume', 'Revisions'].map(
            (tag, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(tag);
                  setSelectedCategory('All Questions');
                }}
                className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#E5C158] hover:text-[#E5C158] text-[11px] text-neutral-300 transition-all cursor-pointer"
              >
                {tag}
              </button>
            )
          )}
        </div>
      </section>

      {/* 3. Most Popular Questions Section */}
      {!searchQuery && selectedCategory === 'All Questions' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-[#E5C158]" />
            <h2 className="text-xl font-poppins font-bold text-white">Most Popular Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="glass-card rounded-2xl border border-white/10 p-5 hover:border-[#E5C158]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block text-[10px] font-bold text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/20 px-2 py-0.5 rounded mb-3">
                      {faq.category}
                    </span>
                    <h3 className="font-poppins font-bold text-white text-sm mb-2 leading-snug">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                      {faq.answer}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="text-neutral-500 font-medium">MFS Support Verified</span>
                    <button
                      onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                      className="text-[#E5C158] font-semibold hover:underline"
                    >
                      {isExpanded ? 'Show Less' : 'Full Detail'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Filter Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-poppins font-bold text-white">Browse By Category</h2>
          <span className="text-xs text-neutral-400">
            Showing <strong className="text-[#E5C158]">{filteredFaqs.length}</strong> Questions
          </span>
        </div>

        {/* Scrollable Horizontal Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {FAQ_CATEGORIES.map((cat, idx) => {
            const count =
              cat === 'All Questions'
                ? COMPREHENSIVE_FAQS.length
                : COMPREHENSIVE_FAQS.filter((f) => f.category === cat).length;

            const isActive = selectedCategory === cat;

            return (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-[#E5C158] text-[#050507] font-bold shadow-md'
                    : 'bg-white/[0.04] text-neutral-300 border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. Comprehensive Interactive FAQ Accordions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {filteredFaqs.length === 0 ? (
          <div className="glass-card rounded-2xl border border-white/10 p-12 text-center space-y-4">
            <HelpCircle className="w-12 h-12 text-[#E5C158] mx-auto opacity-80" />
            <h3 className="text-xl font-poppins font-bold text-white">No Matching Questions Found</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              We couldn't find an answer matching "{searchQuery}". Try searching with different keywords or ask our 24/7 MFS AI Assistant directly.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Questions');
                }}
                className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => onOpenAIChat && onOpenAIChat('chat')}
                className="px-5 py-2.5 rounded-xl bg-[#E5C158] text-[#050507] text-xs font-bold hover:bg-[#fce888] transition-all cursor-pointer flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>Ask MFS AI Assistant</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = expandedFaqId === faq.id;
              const userVote = helpfulVotes[faq.id];

              return (
                <div
                  key={faq.id}
                  className={`glass-card rounded-2xl border transition-all duration-300 ${
                    isOpen ? 'border-[#E5C158]/50 bg-black/60 shadow-[0_4px_20px_rgba(0,0,0,0.6)]' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-bold text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/20 px-2 py-0.5 rounded">
                        {faq.category}
                      </span>
                      <h3 className="font-poppins font-bold text-sm sm:text-base text-white hover:text-[#E5C158] transition-colors leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-400 shrink-0 mt-1">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#E5C158]" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5 pt-4 animate-fadeIn space-y-4">
                      <p>{faq.answer}</p>

                      {/* Contextual Deep Link to Guide */}
                      {FAQ_GUIDE_MAP[faq.id] && (
                        <div className="p-3.5 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                          <span className="text-neutral-200 font-medium">
                            {FAQ_GUIDE_MAP[faq.id].label}
                          </span>
                          <a
                            href={FAQ_GUIDE_MAP[faq.id].url}
                            onClick={(e) => {
                              e.preventDefault();
                              const targetPage = FAQ_GUIDE_MAP[faq.id].page;
                              if (onNavigatePage) {
                                onNavigatePage(targetPage);
                              } else {
                                window.history.pushState({ page: targetPage }, '', FAQ_GUIDE_MAP[faq.id].url);
                                window.dispatchEvent(new PopStateEvent('popstate'));
                              }
                            }}
                            className="shrink-0 px-3 py-1.5 rounded-lg bg-[#E5C158] hover:bg-[#fce888] text-[#050507] text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-[#050507]" />
                            <span>Read Guide</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      )}

                      {/* "Did You Find This Helpful?" Widget */}
                      <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="text-neutral-400 font-medium">Did you find this answer helpful?</span>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleVote(faq.id, 'yes')}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                              userVote === 'yes'
                                ? 'bg-[#28C76F]/20 border-[#28C76F] text-[#28C76F]'
                                : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-white/30'
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>Yes</span>
                          </button>

                          <button
                            onClick={() => handleVote(faq.id, 'no')}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                              userVote === 'no'
                                ? 'bg-red-500/20 border-red-500 text-red-400'
                                : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-white/30'
                            }`}
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                            <span>No</span>
                          </button>
                        </div>
                      </div>

                      {/* Feedback Assistance Callout if user clicked "No" */}
                      {userVote === 'no' && (
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2 text-xs text-neutral-300 animate-fadeIn">
                          <span>Need further details? Ask our 24/7 AI Assistant or WhatsApp support.</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => onOpenAIChat && onOpenAIChat('chat')}
                              className="px-2.5 py-1 rounded-lg bg-[#E5C158] text-[#050507] font-bold text-[11px] hover:bg-[#fce888]"
                            >
                              Chat AI
                            </button>
                            <a
                              href="https://wa.me/923015323689"
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-[#28C76F] text-black font-bold text-[11px] hover:bg-[#34e082]"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. Didn't Find Your Answer? MFS AI Support Integration Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="glass-card rounded-3xl border border-[#E5C158]/40 p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-black via-[#0F0F0F] to-black shadow-[0_0_50px_rgba(229,193,88,0.15)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left AI Information */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>24/7 INSTANT AI SUPPORT</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white leading-tight">
                Didn't Find Your Answer? <span className="gradient-gold-text">Ask MFS AI</span>
              </h2>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                Our MFS AI Assistant is available 24/7 to answer custom questions, explain service packages, calculate exact discount prices, and guide you through placing your order in English, Urdu, or Roman Urdu.
              </p>

              {/* Feature Grid Checkmarks */}
              <div className="grid grid-cols-2 gap-3 text-xs text-neutral-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0" />
                  <span>Instant 24/7 Responses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0" />
                  <span>English & Urdu Language Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0" />
                  <span>Live Price Calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0" />
                  <span>Order & Delivery Assistance</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenAIChat && onOpenAIChat('chat')}
                  className="px-7 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-xl flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with MFS AI</span>
                </button>

                <button
                  onClick={() => onOpenAIChat && onOpenAIChat('voice')}
                  className="px-7 py-3.5 rounded-full bg-white/[0.05] border border-white/10 text-white font-semibold text-xs hover:bg-white/10 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Mic className="w-4 h-4 text-[#28C76F]" />
                  <span>Talk to AI Voice Assistant</span>
                </button>
              </div>
            </div>

            {/* Right AI Orb Illustration */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/10 rounded-2xl relative text-center">
              <div className="w-24 h-24 rounded-full bg-[#E5C158]/20 border border-[#E5C158] flex items-center justify-center text-[#E5C158] mb-4 animate-breathe-ai shadow-[0_0_40px_rgba(229,193,88,0.3)]">
                <Bot className="w-12 h-12" />
              </div>

              <h3 className="font-poppins font-bold text-white text-base mb-1">MFS Smart Assistant</h3>
              <span className="text-[11px] text-[#28C76F] font-semibold block mb-3">● Active Now & Ready to Chat</span>
              <p className="text-neutral-400 text-xs max-w-xs leading-relaxed">
                Try asking: "How much does 15 slides cost?" or "Assalam-o-Alaikum, order kaise place karein?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Recommended Related Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] block mb-2">
            EXPLORE OUR DIGITAL SOLUTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-2">
            Related Services You May Need
          </h2>
          <p className="text-xs text-neutral-300">
            Enjoy our active <strong className="text-[#E5C158]">50% Grand Launch Discount</strong> across all services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.slice(0, 4).map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl border border-white/10 p-5 hover:border-[#E5C158]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[#E5C158] mb-4 w-fit group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>

                <h3 className="font-poppins font-bold text-white text-sm mb-2 group-hover:text-[#E5C158] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4 line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-[#E5C158]">
                  From PKR {service.pricePkr.toLocaleString()} <span className="text-[10px] text-neutral-400 font-normal">(50% Off)</span>
                </span>
                <button
                  onClick={onOpenOrderModal}
                  className="text-xs font-bold text-white hover:text-[#E5C158] flex items-center gap-1 cursor-pointer"
                >
                  <span>Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl border border-white/10 p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-r from-black via-[#0F0F0F] to-black">
          <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white mb-4">
            Ready to Place Your Order with 50% Off?
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Get started today. Calculate exact rates, upload your requirements, and receive your completed presentation or assignment on time.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenOrderModal}
              className="px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
            >
              <span>Place Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigatePage && onNavigatePage('pricing')}
              className="px-8 py-3.5 rounded-full bg-white/[0.05] border border-white/10 text-white font-semibold text-xs hover:bg-white/10 transition-all cursor-pointer"
            >
              Open Live Price Calculator
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
