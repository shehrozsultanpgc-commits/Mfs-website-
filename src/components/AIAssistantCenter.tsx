import React, { useState, useEffect, useRef } from 'react';
import { Currency } from '../types';
import {
  Bot,
  Sparkles,
  Send,
  Mic,
  MicOff,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Search,
  FileText,
  CheckCircle2,
  Clock,
  Briefcase,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Zap,
  Tag,
  Volume2,
  VolumeX,
  X,
  FileSearch,
  ChevronRight,
  Globe,
  Sliders,
  Check,
  ArrowUpRight,
  Info,
  CornerDownRight,
  User,
  Plus
} from 'lucide-react';

interface AIAssistantCenterProps {
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

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  cardType?: 'project_status' | 'payment_info' | 'doc_snippet' | 'revision_info';
  cardData?: any;
  feedback?: 'like' | 'dislike' | null;
  language?: 'English' | 'Urdu' | 'Roman Urdu';
}

export const AIAssistantCenter: React.FC<AIAssistantCenterProps> = ({
  currency,
  customerName = 'Muhammad Shehroz Sultan',
  customerEmail = 'mfsmedia.agency@gmail.com',
  clientId = 'CLI-MFS-98421',
  onShowToast,
  onNavigatePage,
  setActiveTab,
}) => {
  // Time-based greeting generator
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Selected Language State
  const [selectedLang, setSelectedLang] = useState<'English' | 'Urdu' | 'Roman Urdu'>('English');

  // Input & Messaging States
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Document Search Module State
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [docSearchResults, setDocSearchResults] = useState<
    { filename: string; snippet: string; matchPercent: number }[] | null
  >(null);

  // Voice Assistant Modal State
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('Listening to your query...');

  // Phase 5 Roadmap Checklist Modal
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  // Initial Conversation History with Authentic MFS Agency Data
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Assalam-o-Alaikum & ${getGreeting()}, ${customerName}! I am your dedicated MFS AI Project Manager. How can I assist you with project PRJ-MFS-849201 today?`,
      timestamp: 'Today • 09:30 AM',
      language: 'English',
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: 'What is the current status of my 10-slide pitch deck order?',
      timestamp: 'Today • 09:31 AM',
      language: 'English',
    },
    {
      id: 'msg-3',
      sender: 'ai',
      text: 'Your order PRJ-MFS-849201 is currently in **Active Production (Stage 6: Slide 7 Gold Accent Polish)**. Design division Team A is actively working on your deck with an estimated delivery tomorrow at 6:00 PM PKT.',
      timestamp: 'Today • 09:31 AM',
      cardType: 'project_status',
      cardData: {
        projectId: 'PRJ-MFS-849201',
        title: 'Executive Presentation Pitch Deck',
        status: 'In Production (Slide 7)',
        progress: 72,
        eta: 'Tomorrow • 6:00 PM PKT',
      },
      language: 'English',
    },
  ]);

  // Auto scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Knowledge Base Query Handler (Strictly based on MFS Growth Agency rules & real customer project)
  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
      language: selectedLang,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsThinking(true);

    // Knowledge logic based on user input
    setTimeout(() => {
      let aiText = '';
      let cardType: ChatMessage['cardType'] = undefined;
      let cardData: any = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('status') || lower.includes('progress') || lower.includes('track') || lower.includes('where is')) {
        aiText = `Project **PRJ-MFS-849201** is moving smoothly according to schedule. We are at **Stage 6 (Active Production)** out of 9 chapters. All typography and gold design tokens (#E5C158) have been verified by our AI Quality Inspector.`;
        cardType = 'project_status';
        cardData = {
          projectId: 'PRJ-MFS-849201',
          title: 'Executive Presentation Pitch Deck',
          status: 'In Production (Slide 7)',
          progress: 72,
          eta: 'Tomorrow • 6:00 PM PKT',
        };
      } else if (lower.includes('payment') || lower.includes('easypaisa') || lower.includes('jazzcash') || lower.includes('bank') || lower.includes('invoice')) {
        aiText = `Your payment of **PKR 2,500** for Order ORD-MFS-984210 was verified via **EasyPaisa (03116191234)**. Official tax invoice **#INV-849201** is attached to your account with our **50% Grand Launch Discount** applied.`;
        cardType = 'payment_info';
        cardData = {
          invoiceId: 'INV-849201',
          amount: 'PKR 2,500',
          method: 'EasyPaisa (Muhammad Shehroz Sultan)',
          status: 'Paid & Verified',
        };
      } else if (lower.includes('revision') || lower.includes('change') || lower.includes('guarantee')) {
        aiText = `MFS Growth Agency provides a **Complimentary 7-Day Revision Guarantee** on all services! You can submit specific slide modifications directly through the Project Details Center or by contacting support on WhatsApp (+92 301 5323689).`;
        cardType = 'revision_info';
      } else if (lower.includes('file') || lower.includes('download') || lower.includes('deliverable') || lower.includes('ppt') || lower.includes('pdf')) {
        aiText = `Your deliverables will include the fully editable **PowerPoint (.pptx) deck**, high-res **PDF document**, and vector icon assets. You can also view uploaded source files like \`Investor_Pitch_Outline.docx\` in your Files Hub.`;
      } else if (lower.includes('urdu') || lower.includes('assalam') || lower.includes('kaise')) {
        aiText = `Assalam-o-Alaikum! Main MFS AI Project Manager hoon. Aap ka project **PRJ-MFS-849201** bilkul time par chal raha hai. Kisi bhi madad ke liye aap mujh se WhatsApp par bhi rabta kar sakte hain (+92 301 5323689).`;
      } else {
        aiText = `I have verified your request against MFS Growth Agency's knowledge base. For project **PRJ-MFS-849201**, our team is currently crafting your 10-slide deck according to your dark luxury guidelines. If you need immediate human assistance, our support desk is online 24/7 on WhatsApp (+92 301 5323689).`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: 'Just now',
        cardType,
        cardData,
        language: selectedLang,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1200);
  };

  // Feedback Handler
  const handleFeedback = (msgId: string, rating: 'like' | 'dislike') => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, feedback: m.feedback === rating ? null : rating } : m))
    );
    if (onShowToast) {
      onShowToast(rating === 'like' ? 'Thank you for your feedback! 👍' : 'Feedback logged for AI model tuning. 👎');
    }
  };

  // Document Search Logic
  const handleDocSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docSearchQuery.trim()) return;

    const term = docSearchQuery.toLowerCase();
    const mockDocs = [
      {
        filename: 'Investor_Pitch_Outline.docx',
        snippet: `"...10-slide pitch deck structure targeting South Asian tech expansion. Key metrics include 150% YoY growth and USD 2M seed capital request..."`,
        matchPercent: 98,
      },
      {
        filename: 'Financial_Projections_2026.xlsx',
        snippet: `"...Q3 revenue forecasts: PKR 12.5M projected gross income. Operating margin at 42%..."`,
        matchPercent: 92,
      },
      {
        filename: 'Brand_Logo_Vector.png',
        snippet: `"...MFS Primary Gold Accent (#E5C158) vector color profile with dark background (#050507)..."`,
        matchPercent: 86,
      },
    ];

    const filtered = mockDocs.filter(
      (d) => d.snippet.toLowerCase().includes(term) || d.filename.toLowerCase().includes(term)
    );

    setDocSearchResults(filtered.length > 0 ? filtered : mockDocs);
  };

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* TOP AI HEADER & STATUS BAR */}
      <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(229,193,88,0.12)]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E5C158] via-[#D4AF37] to-black p-0.5 shrink-0 shadow-[0_0_20px_rgba(229,193,88,0.3)]">
            <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center text-[#E5C158]">
              <Bot className="w-7 h-7 text-[#E5C158] animate-pulse" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#28C76F] animate-ping" />
                <span>ONLINE • 24/7 AI PROJECT MANAGER</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                {clientId}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-poppins font-bold text-white tracking-tight">
              {getGreeting()}, {customerName.split(' ')[0]}!
            </h1>
            <p className="text-xs text-neutral-300">
              Ask any question regarding your active project <strong className="text-[#E5C158]">PRJ-MFS-849201</strong>, payments, or deliverables.
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 text-[11px] font-semibold">
            {(['English', 'Urdu', 'Roman Urdu'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedLang === lang ? 'bg-[#E5C158] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Voice Assistant Trigger Button */}
          <button
            onClick={() => {
              setShowVoiceModal(true);
              setIsMicActive(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#28C76F] to-[#20a35a] text-black font-extrabold text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(40,199,111,0.3)] flex items-center gap-1.5"
          >
            <Mic className="w-4 h-4 fill-black" />
            <span>Voice Assistant</span>
          </button>

          {/* Roadmap Trigger */}
          <button
            onClick={() => setShowRoadmapModal(true)}
            className="px-3 py-2 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/40 text-[#E5C158] font-bold text-xs hover:bg-[#E5C158]/20 transition-all cursor-pointer flex items-center gap-1"
          >
            <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
            <span>Phase 5 Roadmap</span>
          </button>
        </div>
      </div>

      {/* AI CAPABILITIES & RECENT TOPICS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {[
          { title: 'Project Tracking', desc: 'Real-time progress & ETAs', icon: Clock, color: 'text-[#E5C158]' },
          { title: 'Invoice & Payments', desc: 'EasyPaisa & Tax receipts', icon: ShieldCheck, color: 'text-[#28C76F]' },
          { title: 'Document Search', desc: 'Search uploaded pitch briefs', icon: FileSearch, color: 'text-blue-400' },
          { title: 'Revision Guidance', desc: '7-Day Guarantee support', icon: RefreshCw, color: 'text-purple-400' },
        ].map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl border border-white/10 p-3.5 space-y-1 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${cap.color}`} />
                <strong className="text-white font-bold">{cap.title}</strong>
              </div>
              <p className="text-[10px] text-neutral-400">{cap.desc}</p>
            </div>
          );
        })}
      </div>

      {/* MAIN AI INTERACTIVE CHAT & DOCUMENT SEARCH GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* CHAT HUB (8 Cols) */}
        <div className="lg:col-span-8 glass-card rounded-3xl border border-white/10 p-6 space-y-6 flex flex-col justify-between min-h-[520px] bg-black/80 relative">

          {/* CHAT MESSAGES DISPLAY AREA */}
          <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* AI Avatar */}
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-[#E5C158]/20 border border-[#E5C158]/40 text-[#E5C158] flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                {/* Message Content Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 space-y-2 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#E5C158] text-black font-semibold rounded-tr-none shadow-md'
                      : 'bg-white/[0.05] border border-white/10 text-neutral-200 rounded-tl-none'
                  }`}
                >
                  {/* Sender & Timestamp */}
                  <div className="flex items-center justify-between text-[10px] opacity-70 border-b border-black/10 dark:border-white/10 pb-1 mb-1">
                    <span className="font-bold uppercase tracking-wider">
                      {msg.sender === 'user' ? customerName : 'MFS AI Project Manager'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Main Text */}
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Rich Attached Card Widgets */}
                  {msg.cardType === 'project_status' && msg.cardData && (
                    <div className="p-3 rounded-xl bg-black/50 border border-[#E5C158]/30 space-y-2 mt-2 text-white">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-[#E5C158] uppercase">LIVE PROJECT RECORD</span>
                        <span className="text-[#28C76F] font-bold">{msg.cardData.status}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold">{msg.cardData.title}</span>
                        <span className="font-mono text-[#E5C158]">{msg.cardData.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-[#E5C158]" style={{ width: `${msg.cardData.progress}%` }} />
                      </div>
                      <span className="text-[10px] text-neutral-400 block font-mono">
                        ETA: {msg.cardData.eta}
                      </span>
                    </div>
                  )}

                  {msg.cardType === 'payment_info' && msg.cardData && (
                    <div className="p-3 rounded-xl bg-black/50 border border-[#28C76F]/30 space-y-1.5 mt-2 text-white">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-[#28C76F] font-bold">INVOICE RECORD</span>
                        <span className="text-neutral-400 font-mono">{msg.cardData.invoiceId}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-300">Amount Verified:</span>
                        <strong className="text-[#E5C158]">{msg.cardData.amount}</strong>
                      </div>
                      <span className="text-[10px] text-neutral-400 block">
                        Account: {msg.cardData.method}
                      </span>
                    </div>
                  )}

                  {/* Feedback and Copy Buttons for AI Messages */}
                  {msg.sender === 'ai' && (
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-neutral-400">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(msg.text);
                            if (onShowToast) onShowToast('Response copied to clipboard!');
                          }}
                          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                          title="Copy response"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </button>

                        <button
                          onClick={() => handleSendMessage(msg.text)}
                          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                          title="Regenerate response"
                        >
                          <RefreshCw className="w-3 h-3 text-[#E5C158]" />
                          <span>Regenerate</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleFeedback(msg.id, 'like')}
                          className={`p-1 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                            msg.feedback === 'like' ? 'text-[#28C76F]' : 'text-neutral-400'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(msg.id, 'dislike')}
                          className={`p-1 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                            msg.feedback === 'dislike' ? 'text-red-400' : 'text-neutral-400'
                          }`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-[#E5C158]" />
                  </div>
                )}
              </div>
            ))}

            {/* AI Thinking Animation */}
            {isThinking && (
              <div className="flex items-center gap-3 text-xs text-[#E5C158] font-mono animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-[#E5C158]/20 border border-[#E5C158]/40 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <span>MFS AI is analyzing project records and knowledge base...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* SUGGESTED QUICK QUESTIONS PILLS */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
              SUGGESTED QUICK QUESTIONS
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {[
                'Track PRJ-MFS-849201 status',
                'Verify my EasyPaisa payment',
                'How do I request a revision?',
                'What are MFS Agency support hours?',
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white shrink-0 transition-colors cursor-pointer font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 pt-2"
          >
            <input
              type="text"
              placeholder={`Ask MFS AI Assistant in ${selectedLang}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none"
            />

            <button
              type="button"
              onClick={() => {
                setShowVoiceModal(true);
                setIsMicActive(true);
              }}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Voice Input"
            >
              <Mic className="w-4 h-4 text-[#28C76F]" />
            </button>

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-3 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] disabled:opacity-30 transition-all cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)] flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5 fill-black" />
            </button>
          </form>
        </div>

        {/* SIDE PANEL: DOCUMENT SEARCH & PROJECT MEMORY (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* DOCUMENT SEARCH MODULE */}
          <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-black/80">
            <div className="border-b border-white/10 pb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-poppins font-bold text-white">Project Document Search</h3>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">AI Index</span>
            </div>

            <form onSubmit={handleDocSearch} className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search inside pitch brief or files..."
                  value={docSearchQuery}
                  onChange={(e) => setDocSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-blue-400 outline-none"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-2.5 top-2.5" />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-400 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Search Source Documents</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Document Search Results */}
            {docSearchResults && (
              <div className="space-y-2 text-xs pt-2 border-t border-white/5 animate-fadeIn">
                <span className="text-[10px] text-neutral-400 uppercase font-bold">
                  Matched Snippets ({docSearchResults.length})
                </span>
                {docSearchResults.map((res, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-[#E5C158] truncate max-w-[140px]">{res.filename}</span>
                      <span className="text-blue-400 font-mono">{res.matchPercent}% match</span>
                    </div>
                    <p className="text-[11px] text-neutral-300 italic">{res.snippet}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SESSION MEMORY & RECENT TOPICS */}
          <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-black/80">
            <div className="border-b border-white/10 pb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#E5C158]" />
                <h3 className="text-sm font-poppins font-bold text-white">Session Context & Topics</h3>
              </div>
              <button
                onClick={() => {
                  setMessages([messages[0]]);
                  if (onShowToast) onShowToast('Chat memory cleared.');
                }}
                className="text-[10px] text-neutral-400 hover:text-white cursor-pointer"
              >
                Clear History
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { topic: '10-Slide Pitch Deck Specs', status: 'Locked in Memory' },
                { topic: 'EasyPaisa Invoice #INV-849201', status: 'Verified' },
                { topic: '7-Day Revision Guarantee', status: 'Active' },
                { topic: 'Delivery ETA Tomorrow 6 PM', status: 'Scheduled' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span className="text-neutral-300 font-medium text-[11px]">{item.topic}</span>
                  <span className="text-[9px] font-bold text-[#28C76F] uppercase">{item.status}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* VOICE ASSISTANT INTERACTIVE MODAL */}
      {showVoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] overflow-y-auto">
          <div className="glass-card rounded-3xl border border-[#28C76F]/40 p-5 sm:p-8 max-w-lg w-full space-y-6 bg-[#050507] relative shadow-[0_0_50px_rgba(40,199,111,0.2)] text-center my-auto max-h-[calc(100dvh-1.5rem)] overflow-y-auto">
            
            <button
              onClick={() => {
                setShowVoiceModal(false);
                setIsMicActive(false);
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Mic Visualizer */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center my-4">
              <div className={`absolute inset-0 rounded-full bg-[#28C76F]/20 border border-[#28C76F]/50 ${isMicActive ? 'animate-ping' : ''}`} />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#28C76F] to-[#1e9652] flex items-center justify-center text-black shadow-[0_0_30px_rgba(40,199,111,0.5)] cursor-pointer"
                   onClick={() => setIsMicActive(!isMicActive)}
              >
                {isMicActive ? <Mic className="w-9 h-9 fill-black" /> : <MicOff className="w-9 h-9" />}
              </div>
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#28C76F]/10 border border-[#28C76F]/30 text-[#28C76F] text-[10px] font-bold font-mono">
                MFS VOICE AI • ACTIVE LISTEN MODE
              </span>
              <h3 className="text-xl font-poppins font-bold text-white">Speak Your Query</h3>
              <p className="text-xs text-neutral-300 font-mono italic p-3 rounded-2xl bg-white/[0.03] border border-white/10 min-h-[48px]">
                "{voiceTranscript}"
              </p>
            </div>

            {/* Quick voice prompts */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setVoiceTranscript("Check project PRJ-MFS-849201 status");
                  setTimeout(() => {
                    handleSendMessage("Check project PRJ-MFS-849201 status");
                    setShowVoiceModal(false);
                  }, 1000);
                }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 text-left font-semibold cursor-pointer"
              >
                "Check project status"
              </button>

              <button
                onClick={() => {
                  setVoiceTranscript("When is my delivery scheduled?");
                  setTimeout(() => {
                    handleSendMessage("When is my delivery scheduled?");
                    setShowVoiceModal(false);
                  }, 1000);
                }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 text-left font-semibold cursor-pointer"
              >
                "Delivery timeline"
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setShowVoiceModal(false);
                  setIsMicActive(false);
                }}
                className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
              >
                Close Voice Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 5 ROADMAP CHECKLIST MODAL */}
      {showRoadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] overflow-y-auto">
          <div className="glass-card rounded-3xl border border-[#E5C158]/40 p-5 sm:p-8 max-w-2xl w-full space-y-6 bg-[#0F0F0F] relative shadow-2xl my-auto max-h-[calc(100dvh-1.5rem)] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#E5C158]/20 text-[#E5C158] shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#28C76F]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block truncate">
                    CLIENT DASHBOARD ROADMAP
                  </span>
                  <h3 className="text-base sm:text-xl font-poppins font-bold text-white truncate">
                    Phase 5 Completed • All Phases Delivered
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="text-neutral-400 hover:text-white text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center border border-white/10 shrink-0"
              >
                Close ✕
              </button>
            </div>

            {/* Complete Checklist */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 1: Client Dashboard Core Shell</strong>
                    <span className="text-neutral-400 text-[11px]">Sidebar, header, currency switch & navigation</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 2: Dashboard Home Experience</strong>
                    <span className="text-neutral-400 text-[11px]">AI Daily Briefing, metrics, quick shortcuts & activities</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 3: AI Live Project Tracking</strong>
                    <span className="text-neutral-400 text-[11px]">Vertical timeline, AI health score & Cinematic Movie</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 4: Project Details Center</strong>
                    <span className="text-neutral-400 text-[11px]">Project overview, brief, specs, file attachments & deliverables</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/40 flex items-center justify-between shadow-[0_0_15px_rgba(40,199,111,0.2)]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 5: AI Assistant Center</strong>
                    <span className="text-neutral-400 text-[11px]">AI chat hub, document search, voice AI & multi-language support</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED NOW</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="w-full py-3 rounded-full bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] cursor-pointer"
              >
                Acknowledge Phase 5 Completion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
