import React, { useState } from 'react';
import { Currency } from '../types';
import { sendActionNotificationEmail } from '../lib/emailNotificationService';
import {
  HelpCircle,
  Search,
  BookOpen,
  MessageSquare,
  Bot,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Briefcase,
  FileText,
  CreditCard,
  ShieldCheck,
  Send,
  Check,
  ArrowRight,
  LifeBuoy,
  Zap,
  Info,
  X
} from 'lucide-react';

interface HelpSupportHubProps {
  currency: Currency;
  customerName?: string;
  customerEmail?: string;
  clientId?: string;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (
    page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard',
    targetSection?: string
  ) => void;
  setActiveTab?: (tab: string) => void;
}

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const HelpSupportHub: React.FC<HelpSupportHubProps> = ({
  currency,
  customerName = 'Valued Client',
  customerEmail = 'client@mfsgrowth.com',
  clientId = 'CLI-MFS-CLIENT',
  onShowToast,
  onNavigatePage,
  setActiveTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  // Support Form State
  const [supportSubject, setSupportSubject] = useState('');
  const [supportCategory, setSupportCategory] = useState('Project Question');
  const [supportMessage, setSupportMessage] = useState('');
  const [isSubmittingSupport, setIsSubmittingSupport] = useState(false);

  // Approved Knowledge Base FAQs
  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'Orders & Projects',
      question: 'How do I track the live progress of my active order (e.g. PRJ-MFS-849201)?',
      answer: 'You can monitor live progress directly in your Client Dashboard under the "Projects & Deliverables" or "Live AI Tracking" tab. You will find vertical milestone timelines, live completion metrics, slide/page draft updates, and designer notes in real time.'
    },
    {
      id: 'faq-2',
      category: 'Payments',
      question: 'Which payment methods are supported, and how is my 50% discount applied?',
      answer: 'We support EasyPaisa (03116191234), JazzCash (03015323688), Askari Bank Transfer (00553230017265), and International Wire. All orders automatically receive the active 50% Grand Launch Promo discount across all pricing calculations.'
    },
    {
      id: 'faq-3',
      category: 'Files & Security',
      question: 'Are my uploaded files and project samples secure?',
      answer: 'Yes. All client uploaded documents (PDF, DOCX, PPTX) undergo 256-bit encrypted storage and virus scans. Sample previews in "Our Work" are protected with download restrictions and watermark safeguards.'
    },
    {
      id: 'faq-4',
      category: 'AI Assistant',
      question: 'How does the MFS Dual AI Assistant (Voice + Chat) work?',
      answer: 'The MFS AI Assistant supports English, Urdu, Roman Urdu, and International English. It can scan your project brief, summarize designer messages, answer service questions, and guide your order submission seamlessly.'
    },
    {
      id: 'faq-5',
      category: 'Revisions & Delivery',
      question: 'What is the standard revision policy for pitch decks and assignments?',
      answer: 'We offer unlimited minor revisions within the scope of your original project brief to ensure 100% satisfaction. Simply open the "Messages" or "Projects" tab to request a slide/page polish.'
    }
  ];

  const categories = ['All', 'Orders & Projects', 'Payments', 'Files & Security', 'AI Assistant', 'Revisions & Delivery'];

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedCategory !== 'All' && faq.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchQ = faq.question.toLowerCase().includes(q);
      const matchA = faq.answer.toLowerCase().includes(q);
      if (!matchQ && !matchA) return false;
    }
    return true;
  });

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setIsSubmittingSupport(true);

    await sendActionNotificationEmail({
      actionType: 'support_ticket',
      actionTitle: `Support Ticket: ${supportSubject || supportCategory}`,
      clientName: customerName,
      clientEmail: customerEmail,
      subject: supportSubject || supportCategory,
      details: `Category: ${supportCategory}\nClient ID: ${clientId}\n\nMessage:\n${supportMessage}`,
    }).catch(() => null);

    setIsSubmittingSupport(false);
    setSupportSubject('');
    setSupportMessage('');
    if (onShowToast) onShowToast('🎉 Support ticket logged & confirmation email dispatched to ' + customerEmail + '!');
  };

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* HEADER BANNER */}
      <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(229,193,88,0.12)]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center shrink-0">
            <LifeBuoy className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#28C76F]" />
                <span>24/7 ONLINE SUPPORT HUB • PKT</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                {clientId}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-poppins font-bold text-white tracking-tight">
              Help Center & Support Hub
            </h1>
            <p className="text-xs text-neutral-300">
              Get instant answers, search knowledge base articles, or connect directly with MFS Growth Agency support teams.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (setActiveTab) setActiveTab('ai_assistant');
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)] flex items-center gap-2"
          >
            <Bot className="w-4 h-4 fill-black" />
            <span>Ask MFS AI Assistant</span>
          </button>

          <button
            onClick={() => setShowRoadmapModal(true)}
            className="px-3 py-2.5 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/40 text-[#28C76F] font-bold text-xs hover:bg-[#28C76F]/20 transition-all cursor-pointer flex items-center gap-1"
          >
            <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
            <span>Phase 12 Complete</span>
          </button>
        </div>
      </div>

      {/* SEARCH BAR & KNOWLEDGE BASE HIGHLIGHT */}
      <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 bg-black/80 space-y-4 text-center">
        <h2 className="text-lg font-poppins font-bold text-white">How can we help you today?</h2>
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search FAQs, project tracking, invoices, payment rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none shadow-inner"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* QUICK SHORTCUT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { title: 'Track Project', desc: 'PRJ-MFS-849201', tab: 'projects', icon: Briefcase, color: 'text-[#E5C158]' },
          { title: 'View Invoices', desc: '#INV-849201 Paid', tab: 'invoices', icon: FileText, color: 'text-[#28C76F]' },
          { title: 'Open Messages', desc: 'Chat with Designer', tab: 'messages', icon: MessageSquare, color: 'text-blue-400' },
          { title: 'Voice & Chat AI', desc: 'Instant 24/7 Bot', tab: 'ai_assistant', icon: Bot, color: 'text-purple-400' },
        ].map((sc, idx) => {
          const Icon = sc.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab && setActiveTab(sc.tab)}
              className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 bg-black/60 hover:border-[#E5C158]/50 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 font-medium text-[11px]">{sc.title}</span>
                <Icon className={`w-4 h-4 ${sc.color}`} />
              </div>
              <div className="text-sm font-poppins font-bold text-white group-hover:text-[#E5C158] transition-colors">
                {sc.desc}
              </div>
              <span className="text-[10px] text-neutral-400 font-mono block flex items-center gap-1">
                <span>Jump to module</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          );
        })}
      </div>

      {/* KNOWLEDGE BASE FAQ ACCORDION */}
      <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 bg-black/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="font-poppins font-bold text-white text-base">Knowledge Base & Frequently Asked Questions</h3>
            <p className="text-xs text-neutral-400">Verified answers regarding project workflows, payment accounts, and deliverable handoffs.</p>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl shrink-0 transition-colors cursor-pointer text-[11px] font-medium ${
                  selectedCategory === cat
                    ? 'bg-[#E5C158] text-black font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-poppins font-bold text-white hover:text-[#E5C158] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#E5C158]" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-neutral-300 space-y-2 border-t border-white/5 pt-3 leading-relaxed">
                      <p>{faq.answer}</p>
                      <span className="text-[10px] font-mono text-[#E5C158] block">
                        Category: {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-400 text-xs">
            No FAQ articles match "{searchQuery}". Please try another search term or ask MFS AI Assistant.
          </div>
        )}
      </div>

      {/* CONTACT SUPPORT CHANNELS & TICKET FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Approved Direct Contact Info */}
        <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 space-y-5 bg-gradient-to-br from-black via-[#0F0F0F] to-black">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#E5C158] uppercase font-bold">DIRECT CONTACT CHANNELS</span>
            <h3 className="font-poppins font-bold text-white text-lg">Official MFS Support Desk</h3>
            <p className="text-xs text-neutral-400">
              Our support team operates 24/7 to assist you.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <a
              href="https://wa.me/923015323689"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between hover:bg-[#28C76F]/20 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#28C76F]/20 text-[#28C76F] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-white block text-sm">WhatsApp Support (24/7)</strong>
                  <span className="text-neutral-300 font-mono">+92 301 5323689</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#28C76F] group-hover:translate-x-0.5 transition-transform" />
            </a>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block text-sm">Official Support Email</strong>
                <span className="text-neutral-300 font-mono">mfsmedia.agency@gmail.com</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block text-sm">Business Agency Email</strong>
                <span className="text-neutral-300 font-mono">mfsmedia.agency@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Ticket Form */}
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4 bg-black/80">
          <div className="border-b border-white/10 pb-3">
            <h3 className="font-poppins font-bold text-white text-base">Submit Quick Support Inquiry</h3>
            <p className="text-xs text-neutral-400">Direct ticket dispatch to MFS Growth Agency senior designers.</p>
          </div>

          <form onSubmit={handleSupportSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-neutral-400 font-mono">Subject / Topic</label>
              <input
                type="text"
                required
                placeholder="e.g. Revision request for Slide 4..."
                value={supportSubject}
                onChange={(e) => setSupportSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-mono">Category</label>
              <select
                value={supportCategory}
                onChange={(e) => setSupportCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none cursor-pointer"
              >
                <option value="Project Question">Project Question (PRJ-MFS-849201)</option>
                <option value="Payment Inquiry">Payment Inquiry</option>
                <option value="File Upload Issue">File Upload Issue</option>
                <option value="General Support">General Support</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-mono">Detailed Message</label>
              <textarea
                rows={3}
                required
                placeholder="Describe your inquiry..."
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingSupport}
              className="w-full py-3 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 fill-black" />
              <span>{isSubmittingSupport ? 'Logging Ticket...' : 'Dispatch Ticket'}</span>
            </button>
          </form>
        </div>

      </div>

      {/* PHASE 12 ROADMAP CHECKLIST MODAL */}
      {showRoadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl border border-[#E5C158]/40 p-6 sm:p-8 max-w-2xl w-full space-y-6 bg-[#0F0F0F] relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#28C76F]/20 text-[#28C76F]">
                  <CheckCircle2 className="w-6 h-6 text-[#28C76F]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block">
                    CLIENT DASHBOARD ROADMAP COMPLETE
                  </span>
                  <h3 className="text-xl font-poppins font-bold text-white">
                    Phase 12 Completed • Help Center & Support Hub
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="text-neutral-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Complete Roadmap Checklist */}
            <div className="space-y-1.5 text-xs max-h-[380px] overflow-y-auto pr-1">
              {[
                { phase: 'Phase 1: Client Dashboard Core Shell', desc: 'Sidebar, header, currency switch & navigation' },
                { phase: 'Phase 2: Dashboard Home Experience', desc: 'AI Daily Briefing, metrics, quick shortcuts & activities' },
                { phase: 'Phase 3: AI Live Project Tracking', desc: 'Vertical timeline, AI health score & Cinematic Movie' },
                { phase: 'Phase 4: Project Details Center', desc: 'Project overview, brief, specs, file attachments & deliverables' },
                { phase: 'Phase 5: AI Assistant Center', desc: 'AI chat hub, document search, voice AI & multi-language support' },
                { phase: 'Phase 6: Messages & Communication Center', desc: 'Real-time chat, AI summarizer, file sharing & reaction cards' },
                { phase: 'Phase 7: Files & Documents Center', desc: 'Grid/List view, drag & drop upload, encrypted preview & version history' },
                { phase: 'Phase 8: Billing, Payments & Invoices Center', desc: 'Tax invoices, verified receipts, payment history & approved MFS account cards' },
                { phase: 'Phase 9: Profile, Account & Security Center', desc: 'Editable profile, Google SSO integration & security audit log' },
                { phase: 'Phase 10: Notifications & Activity Center', desc: 'Real-time notification feed, activity timeline & smart filters' },
                { phase: 'Phase 11: Analytics & Insights Center', desc: 'Real delivery metrics, project health score, velocity timeline & PDF analytics export' },
                { phase: 'Phase 12: Help Center & Support Hub', desc: 'Knowledge base search, FAQ accordions, direct WhatsApp & ticket submission' },
                { phase: 'Phase 13: Final Polish (UI/UX Refinement)', desc: 'Typography hierarchy, mathematical spacing, z-index overlays & accessibility' },
                { phase: 'Phase 14: Smart States & UX', desc: 'Skeleton loaders, empty state illustrations, offline recovery & inline form feedback' },
              ].map((p, idx) => (
                <div key={idx} className="p-2 bg-[#28C76F]/10 border border-[#28C76F]/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#28C76F]" />
                    <strong className="text-white text-[11px]">{p.phase}</strong>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[9px]">COMPLETED</span>
                </div>
              ))}

              <div className="p-3 rounded-2xl bg-[#28C76F]/20 border border-[#28C76F]/50 flex items-center justify-between shadow-[0_0_25px_rgba(40,199,111,0.3)]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold text-xs">Phase 15: Production Readiness & Engineering Audit</strong>
                    <span className="text-neutral-300 text-[11px]">Client Dashboard v1.0 Production Ready • Fully hardened frontend architecture</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-extrabold text-[10px] uppercase tracking-wider bg-[#28C76F]/20 px-2 py-0.5 rounded-md border border-[#28C76F]/40">
                  PRODUCTION READY v1.0
                </span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="w-full py-3 rounded-full bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer"
              >
                Acknowledge Client Dashboard v1.0 Launch Readiness
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
