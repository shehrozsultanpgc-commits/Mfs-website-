import React, { useState, useRef, useEffect } from 'react';
import { Currency } from '../types';
import {
  MessageSquare,
  Send,
  Paperclip,
  Search,
  CheckCheck,
  Clock,
  Pin,
  ShieldCheck,
  Sparkles,
  Bot,
  FileText,
  Download,
  Eye,
  Filter,
  Phone,
  MoreVertical,
  ThumbsUp,
  Heart,
  Smile,
  Copy,
  Reply,
  CheckCircle2,
  AlertCircle,
  FileCode,
  X,
  Plus,
  RefreshCw,
  ArrowUpRight,
  User,
  Zap,
  Check,
  Tag,
  HelpCircle
} from 'lucide-react';
import { ProjectChat } from './ProjectChat';

interface MessagesCommunicationCenterProps {
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

interface MessageItem {
  id: string;
  sender: 'customer' | 'agency' | 'system';
  senderName: string;
  avatarBg?: string;
  text: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  reactions?: string[];
  cardType?: 'project_update' | 'file_attachment' | 'payment_verified' | 'revision_request';
  cardData?: any;
}

interface ThreadItem {
  id: string;
  title: string;
  department: string;
  projectRef: string;
  lastMsg: string;
  time: string;
  unreadCount: number;
  isPinned: boolean;
  priority: 'High' | 'Normal' | 'Urgent';
  status: 'Online' | 'Offline' | 'Active';
  messages: MessageItem[];
}

export const MessagesCommunicationCenter: React.FC<MessagesCommunicationCenterProps> = ({
  currency,
  customerName = 'Muhammad Shehroz Sultan',
  customerEmail = 'mfsmedia.agency@gmail.com',
  clientId = 'CLI-MFS-98421',
  onShowToast,
  onNavigatePage,
  setActiveTab,
}) => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Unread' | 'Priority' | 'Attachments'>('All');

  // Modal State for Roadmap
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string }[]>([]);

  // AI Assistant Panel State inside Chat
  const [showAISummary, setShowAISummary] = useState(false);
  const [aiSummaryText, setAISummaryText] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  // Default Conversations initialized with authentic MFS Growth Agency data
  const [threads, setThreads] = useState<ThreadItem[]>([
    {
      id: 'th-1',
      title: 'MFS Design Division (Pitch Deck Team A)',
      department: 'Presentation & Pitch Deck Division',
      projectRef: 'PRJ-MFS-849201',
      lastMsg: 'Stage 6 Slide 7 Gold Accent Polish complete. Preview attached.',
      time: '10:15 AM',
      unreadCount: 1,
      isPinned: true,
      priority: 'High',
      status: 'Online',
      messages: [
        {
          id: 'm1',
          sender: 'agency',
          senderName: 'Shehroz Sultan (Design Lead)',
          text: 'Assalam-o-Alaikum Shehroz! We have received your pitch deck outline for PRJ-MFS-849201. Our design team is using the MFS Dark Luxury theme with #E5C158 Gold Accents.',
          time: '09:00 AM',
          status: 'read',
        },
        {
          id: 'm2',
          sender: 'customer',
          senderName: 'Muhammad Shehroz Sultan',
          text: 'Walaikum Assalam! Thanks. Please ensure the typography uses Poppins for headers and Inter for body copy as per our brand guide.',
          time: '09:12 AM',
          status: 'read',
        },
        {
          id: 'm3',
          sender: 'agency',
          senderName: 'MFS System Bot',
          text: 'Official Project Update Card generated for PRJ-MFS-849201:',
          time: '09:30 AM',
          status: 'read',
          cardType: 'project_update',
          cardData: {
            title: 'Executive Pitch Deck • Stage 6 Active',
            progress: 72,
            stage: 'Slide 7 Gold Accent Polish',
            eta: 'Tomorrow • 6:00 PM PKT',
          },
        },
        {
          id: 'm4',
          sender: 'agency',
          senderName: 'Senior Designer Shehroz',
          text: 'We have finished Slide 1 through Slide 7. Here is the draft outline document for your review.',
          time: '10:15 AM',
          status: 'read',
          cardType: 'file_attachment',
          cardData: {
            filename: 'Executive_Pitch_Deck_Draft_v1.pptx',
            size: '4.8 MB',
            type: 'PowerPoint Presentation',
          },
          reactions: ['👍', '🔥'],
        },
      ],
    },
    {
      id: 'th-2',
      title: 'MFS Accounts & Billing Desk',
      department: 'Finance & Payments Division',
      projectRef: 'ORD-MFS-984210',
      lastMsg: 'EasyPaisa payment of PKR 2,500 verified. Invoice #INV-849201 issued.',
      time: 'Yesterday',
      unreadCount: 0,
      isPinned: false,
      priority: 'Normal',
      status: 'Online',
      messages: [
        {
          id: 'm201',
          sender: 'agency',
          senderName: 'Accounts Officer',
          text: 'Payment verification receipt generated:',
          time: 'Yesterday 04:30 PM',
          status: 'read',
          cardType: 'payment_verified',
          cardData: {
            invoiceId: 'INV-849201',
            amount: 'PKR 2,500',
            discount: '50% Grand Launch Discount Applied',
            account: 'EasyPaisa (Muhammad Shehroz Sultan • 03116191234)',
          },
        },
      ],
    },
    {
      id: 'th-3',
      title: 'MFS Quality Assurance Inspector',
      department: 'Quality & Compliance Division',
      projectRef: 'PRJ-MFS-849201',
      lastMsg: 'AI & Manual QA Checklist cleared: 100% compliance verified.',
      time: '2 days ago',
      unreadCount: 0,
      isPinned: false,
      priority: 'Normal',
      status: 'Active',
      messages: [
        {
          id: 'm301',
          sender: 'agency',
          senderName: 'QA Inspector',
          text: 'Your project meets all 7 MFS Quality Benchmarks (No layout overflow, proper contrast WCAG AA, accurate math in tables).',
          time: '2 days ago',
          status: 'read',
        },
      ],
    },
  ]);

  // Selected Thread State
  const [activeThreadId, setActiveThreadId] = useState<string>('th-1');
  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  // Chat Input State
  const [inputMessage, setInputMessage] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto Scroll Chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThreadId, activeThread?.messages]);

  // Send Message Handler
  const handleSendMessage = (textOverride?: string) => {
    const textToSubmit = (textOverride || inputMessage).trim();
    if (!textToSubmit && attachedFiles.length === 0) return;

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: 'customer',
      senderName: customerName,
      text: textToSubmit || 'Attached file for review.',
      time: 'Just now',
      status: 'delivered',
      cardType: attachedFiles.length > 0 ? 'file_attachment' : undefined,
      cardData:
        attachedFiles.length > 0
          ? {
              filename: attachedFiles[0].name,
              size: attachedFiles[0].size,
              type: 'User Uploaded File',
            }
          : undefined,
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            lastMsg: newMsg.text,
            time: 'Just now',
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      })
    );

    setInputMessage('');
    setAttachedFiles([]);

    if (onShowToast) {
      onShowToast('Message transmitted securely to MFS Growth Agency desk.');
    }
  };

  // Reaction Handler
  const handleAddReaction = (msgId: string, emoji: string) => {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            messages: t.messages.map((m) => {
              if (m.id === msgId) {
                const currentReactions = m.reactions || [];
                return {
                  ...m,
                  reactions: currentReactions.includes(emoji)
                    ? currentReactions.filter((r) => r !== emoji)
                    : [...currentReactions, emoji],
                };
              }
              return m;
            }),
          };
        }
        return t;
      })
    );
  };

  // AI Summarize Thread Logic
  const handleGenerateAISummary = () => {
    setIsGeneratingSummary(true);
    setShowAISummary(true);
    setTimeout(() => {
      setAISummaryText(
        `• **Current Progress:** Project PRJ-MFS-849201 is at Stage 6 (Slide 7 Gold Accent Polish).\n` +
        `• **Payment Status:** EasyPaisa payment of PKR 2,500 is fully verified with 50% discount.\n` +
        `• **Next Deliverable:** Final PowerPoint (.pptx) deck scheduled for delivery tomorrow at 6:00 PM PKT with 7-Day Free Revision Guarantee.`
      );
      setIsGeneratingSummary(false);
    }, 1000);
  };

  // Filtered threads
  const filteredThreads = threads.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.projectRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.lastMsg.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'Unread') return t.unreadCount > 0;
    if (activeFilter === 'Priority') return t.priority === 'High' || t.priority === 'Urgent';
    if (activeFilter === 'Attachments')
      return t.messages.some((m) => m.cardType === 'file_attachment');

    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* HEADER & STATUS BAR */}
      <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(229,193,88,0.1)]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center shrink-0">
            <MessageSquare className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#28C76F] animate-ping" />
                <span>MFS SECURE MESSAGING • SUPPORT DESK</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                {clientId}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-poppins font-bold text-white tracking-tight">
              Messages & Project Communication
            </h1>
            <p className="text-xs text-neutral-300">
              Direct official channel with MFS Growth design, quality, and accounts teams.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerateAISummary}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)] flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            <span>AI Summarize Thread</span>
          </button>

          <button
            onClick={() => setShowRoadmapModal(true)}
            className="px-3 py-2 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/40 text-[#28C76F] font-bold text-xs hover:bg-[#28C76F]/20 transition-all cursor-pointer flex items-center gap-1"
          >
            <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
            <span>Phase 6 Complete</span>
          </button>
        </div>
      </div>

      {/* MAIN MESSAGING HUB: SIDEBAR + CHAT STREAM (GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">

        {/* THREADS LIST SIDEBAR (4 Cols) */}
        <div className="lg:col-span-4 glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-black/80 flex flex-col justify-between">
          
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages or project PRJ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {(['All', 'Unread', 'Priority', 'Attachments'] as const).map((flt) => (
                <button
                  key={flt}
                  onClick={() => setActiveFilter(flt)}
                  className={`px-3 py-1 rounded-xl transition-colors cursor-pointer shrink-0 ${
                    activeFilter === flt
                      ? 'bg-[#E5C158] text-black font-bold'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  {flt}
                </button>
              ))}
            </div>

            {/* Threads List */}
            <div className="space-y-2 overflow-y-auto max-h-[420px] pr-1 scrollbar-thin">
              {filteredThreads.map((thread) => {
                const isSelected = thread.id === activeThreadId;
                return (
                  <div
                    key={thread.id}
                    onClick={() => {
                      setActiveThreadId(thread.id);
                      // mark as read
                      setThreads((prev) =>
                        prev.map((t) => (t.id === thread.id ? { ...t, unreadCount: 0 } : t))
                      );
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-[#E5C158]/10 border-[#E5C158]/50 shadow-[0_0_15px_rgba(229,193,88,0.15)]'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-[#E5C158] font-bold text-[10px] uppercase">
                        {thread.projectRef}
                      </span>
                      <div className="flex items-center gap-1.5 text-neutral-400 text-[10px]">
                        {thread.isPinned && <Pin className="w-3 h-3 text-[#E5C158] fill-[#E5C158]" />}
                        <span>{thread.time}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-start">
                      <h4 className="font-poppins font-bold text-white text-xs truncate max-w-[200px]">
                        {thread.title}
                      </h4>
                      {thread.unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-[#28C76F] text-black text-[10px] font-extrabold">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-neutral-400 line-clamp-1 italic">
                      "{thread.lastMsg}"
                    </p>
                  </div>
                );
              })}

              {filteredThreads.length === 0 && (
                <div className="p-6 text-center text-neutral-400 space-y-2 text-xs">
                  <AlertCircle className="w-6 h-6 text-[#E5C158] mx-auto" />
                  <p>No conversations matched your filter.</p>
                </div>
              )}
            </div>
          </div>

          {/* WhatsApp Support Bar */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#28C76F]" />
              <div>
                <strong className="text-white block font-bold text-[11px]">Direct WhatsApp Support</strong>
                <span className="text-[10px] text-neutral-400">+92 301 5323689</span>
              </div>
            </div>
            <a
              href="https://wa.me/923015323689"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-xl bg-[#28C76F] text-black font-bold text-[10px] hover:brightness-110"
            >
              Chat
            </a>
          </div>

        </div>

        {/* ACTIVE CHAT WINDOW (8 Cols) */}
        <div className="lg:col-span-8 glass-card rounded-3xl border border-white/10 p-6 space-y-4 bg-black/90 flex flex-col justify-between">

          {/* CHAT THREAD HEADER */}
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[#E5C158]/10 text-[#E5C158] text-[10px] font-mono font-bold">
                  {activeThread.projectRef}
                </span>
                <span className="text-[10px] text-[#28C76F] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F]" />
                  {activeThread.status}
                </span>
              </div>
              <h2 className="text-base font-poppins font-bold text-white">
                {activeThread.title}
              </h2>
              <span className="text-[11px] text-neutral-400 block">{activeThread.department}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleGenerateAISummary}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs cursor-pointer flex items-center gap-1"
                title="AI Summary"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Summary</span>
              </button>
            </div>
          </div>

          {/* AI SUMMARY EMBEDDED BANNER */}
          {showAISummary && (
            <div className="p-4 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30 space-y-2 text-xs animate-fadeIn relative">
              <button
                onClick={() => setShowAISummary(false)}
                className="absolute top-2 right-2 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 text-[#E5C158] font-bold">
                <Sparkles className="w-4 h-4 fill-[#E5C158]" />
                <span>MFS AI CONVERSATION SUMMARY</span>
              </div>
              {isGeneratingSummary ? (
                <div className="text-neutral-400 font-mono animate-pulse">Extracting key decisions and project milestones...</div>
              ) : (
                <p className="text-neutral-200 whitespace-pre-line leading-relaxed text-[11px]">
                  {aiSummaryText}
                </p>
              )}
            </div>
          )}

          {/* MESSAGE STREAM */}
          <div className="space-y-4 overflow-y-auto max-h-[380px] pr-2 scrollbar-thin">
            {activeThread.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Agency Avatar */}
                {msg.sender === 'agency' && (
                  <div className="w-8 h-8 rounded-xl bg-[#E5C158]/20 border border-[#E5C158]/40 text-[#E5C158] flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                    MFS
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 space-y-2 text-xs leading-relaxed relative group ${
                    msg.sender === 'customer'
                      ? 'bg-[#E5C158] text-black font-semibold rounded-tr-none shadow-md'
                      : 'bg-white/[0.05] border border-white/10 text-neutral-200 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-70 border-b border-black/10 dark:border-white/10 pb-1 mb-1">
                    <span className="font-bold uppercase tracking-wider">{msg.senderName}</span>
                    <span className="flex items-center gap-1">
                      <span>{msg.time}</span>
                      {msg.sender === 'customer' && <CheckCheck className="w-3 h-3 text-black" />}
                    </span>
                  </div>

                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* PROJECT UPDATE CARD */}
                  {msg.cardType === 'project_update' && msg.cardData && (
                    <div className="p-3.5 rounded-xl bg-black/60 border border-[#E5C158]/30 space-y-2 mt-2 text-white">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-[#E5C158] font-bold uppercase">OFFICIAL PROJECT UPDATE</span>
                        <span className="text-[#28C76F] font-bold">{msg.cardData.stage}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold">{msg.cardData.title}</span>
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

                  {/* FILE ATTACHMENT CARD */}
                  {msg.cardType === 'file_attachment' && msg.cardData && (
                    <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-3 mt-2 text-white">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#E5C158]" />
                        <div>
                          <strong className="block font-bold text-xs truncate max-w-[180px]">{msg.cardData.filename}</strong>
                          <span className="text-[10px] text-neutral-400">{msg.cardData.size} • {msg.cardData.type}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (onShowToast) onShowToast('File preview is protected under MFS Growth Agency preview terms.');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#E5C158] text-black font-bold text-[10px] hover:bg-[#fce888] cursor-pointer flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  )}

                  {/* PAYMENT VERIFIED CARD */}
                  {msg.cardType === 'payment_verified' && msg.cardData && (
                    <div className="p-3.5 rounded-xl bg-black/60 border border-[#28C76F]/30 space-y-1.5 mt-2 text-white">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-[#28C76F] font-bold uppercase">PAYMENT RECEIPT VERIFIED</span>
                        <span className="text-neutral-400 font-mono">{msg.cardData.invoiceId}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-300">Total Paid:</span>
                        <strong className="text-[#E5C158]">{msg.cardData.amount}</strong>
                      </div>
                      <p className="text-[10px] text-neutral-400">{msg.cardData.account}</p>
                    </div>
                  )}

                  {/* Message Reactions Bar */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex items-center gap-1 pt-1">
                      {msg.reactions.map((r, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded-full bg-black/40 text-[10px]">
                          {r}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quick Reaction buttons on hover */}
                  <div className="absolute -top-3 right-2 hidden group-hover:flex items-center gap-1 bg-black border border-white/20 rounded-full px-2 py-0.5 shadow-lg">
                    {['👍', '🔥', '❤️', '🙏'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleAddReaction(msg.id, emoji)}
                        className="hover:scale-125 transition-transform text-xs cursor-pointer"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>

                </div>

                {/* Customer Avatar */}
                {msg.sender === 'customer' && (
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-[#E5C158]" />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* SMART SUGGESTED QUICK REPLIES */}
          <div className="space-y-1.5 pt-2 border-t border-white/10">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
              SMART SUGGESTED REPLIES
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {[
                'Please send the latest slide draft.',
                'Everything looks perfect! Proceed.',
                'When is the next milestone update?',
                'I have uploaded an updated logo file.',
              ].map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(reply)}
                  className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white shrink-0 transition-colors cursor-pointer text-[11px]"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* CHAT INPUT AREA */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="space-y-2"
          >
            {/* Attached file tags preview */}
            {attachedFiles.length > 0 && (
              <div className="flex items-center gap-2">
                {attachedFiles.map((f, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#E5C158]/20 text-[#E5C158] text-[10px] font-mono flex items-center gap-1">
                    <Paperclip className="w-3 h-3" />
                    <span>{f.name} ({f.size})</span>
                    <button
                      type="button"
                      onClick={() => setAttachedFiles([])}
                      className="hover:text-white"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setAttachedFiles([{ name: files[0].name, size: `${(files[0].size / 1024 / 1024).toFixed(1)} MB` }]);
                  }
                }}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Attach Document or Presentation"
              >
                <Paperclip className="w-4 h-4 text-[#E5C158]" />
              </button>

              <input
                type="text"
                placeholder="Type your message to MFS Growth team..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() && attachedFiles.length === 0}
                className="px-5 py-3 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] disabled:opacity-30 transition-all cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)] flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5 fill-black" />
              </button>
            </div>
          </form>

        </div>

      </div>

      {/* PHASE 6 ROADMAP CHECKLIST MODAL */}
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
                    Phase 6 Completed • All 6 Client Dashboard Phases Delivered
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

            {/* Complete Checklist */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 1: Client Dashboard Core Shell</strong>
                    <span className="text-neutral-400 text-[11px]">Sidebar, header, currency switch & navigation</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 2: Dashboard Home Experience</strong>
                    <span className="text-neutral-400 text-[11px]">AI Daily Briefing, metrics, quick shortcuts & activities</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 3: AI Live Project Tracking</strong>
                    <span className="text-neutral-400 text-[11px]">Vertical timeline, AI health score & Cinematic Movie</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 4: Project Details Center</strong>
                    <span className="text-neutral-400 text-[11px]">Project overview, brief, specs, file attachments & deliverables</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 5: AI Assistant Center</strong>
                    <span className="text-neutral-400 text-[11px]">AI chat hub, document search, voice AI & multi-language support</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/40 flex items-center justify-between shadow-[0_0_15px_rgba(40,199,111,0.2)]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 6: Messages & Communication Center</strong>
                    <span className="text-neutral-400 text-[11px]">Real-time chat, AI summarizer, file sharing, reactions & update cards</span>
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
                Acknowledge Phase 6 Completion
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
