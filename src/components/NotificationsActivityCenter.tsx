import React, { useState } from 'react';
import { Currency } from '../types';
import {
  Bell,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Check,
  Trash2,
  Sparkles,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  FileText,
  Briefcase,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Shield,
  Bot,
  Layers,
  ChevronRight,
  RefreshCw,
  Info,
  X
} from 'lucide-react';

interface NotificationsActivityCenterProps {
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

export interface NotificationItem {
  id: string;
  type: 'project' | 'payment' | 'message' | 'file' | 'ai' | 'security';
  title: string;
  description: string;
  timestamp: string;
  dateCategory: 'Today' | 'Yesterday' | 'Earlier';
  isUnread: boolean;
  isImportant: boolean;
  projectRef?: string;
  targetTab?: string;
}

export const NotificationsActivityCenter: React.FC<NotificationsActivityCenterProps> = ({
  currency,
  customerName = 'Valued Client',
  customerEmail = 'client@mfsgrowth.com',
  clientId = 'CLI-MFS-CLIENT',
  onShowToast,
  onNavigatePage,
  setActiveTab,
}) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  // Authentic Initial Notifications Feed
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'project',
      title: 'Design Draft v1.2 Ready for Review',
      description: 'Gold Accent polish applied to Slides 1-7 for Executive Pitch Deck (PRJ-MFS-849201).',
      timestamp: '10:15 AM',
      dateCategory: 'Today',
      isUnread: true,
      isImportant: true,
      projectRef: 'PRJ-MFS-849201',
      targetTab: 'projects',
    },
    {
      id: 'notif-2',
      type: 'message',
      title: 'New Message from Senior Designer Shehroz',
      description: '"Assalam-o-Alaikum Shehroz! We have refined slide 3 with financial projections..."',
      timestamp: '09:45 AM',
      dateCategory: 'Today',
      isUnread: true,
      isImportant: false,
      projectRef: 'PRJ-MFS-849201',
      targetTab: 'messages',
    },
    {
      id: 'notif-3',
      type: 'payment',
      title: 'Payment Verified & Tax Invoice #INV-849201 Issued',
      description: 'EasyPaisa payment of PKR 2,500 settled with 50% Grand Launch discount.',
      timestamp: 'Yesterday 04:30 PM',
      dateCategory: 'Yesterday',
      isUnread: false,
      isImportant: true,
      projectRef: 'ORD-MFS-984210',
      targetTab: 'invoices',
    },
    {
      id: 'notif-4',
      type: 'file',
      title: 'Client File Uploaded Successfully',
      description: 'Investor_Pitch_Outline.docx uploaded and virus scan passed.',
      timestamp: 'Yesterday 02:15 PM',
      dateCategory: 'Yesterday',
      isUnread: false,
      isImportant: false,
      projectRef: 'PRJ-MFS-849201',
      targetTab: 'files',
    },
    {
      id: 'notif-5',
      type: 'ai',
      title: 'MFS AI Daily Briefing Updated',
      description: 'Project health score at 98%. On schedule for final presentation delivery.',
      timestamp: '2 days ago',
      dateCategory: 'Earlier',
      isUnread: false,
      isImportant: false,
      projectRef: 'PRJ-MFS-849201',
      targetTab: 'ai_assistant',
    },
    {
      id: 'notif-6',
      type: 'security',
      title: 'Google SSO Sign-In Verified',
      description: 'Authenticated from Chrome macOS (PK).',
      timestamp: '3 days ago',
      dateCategory: 'Earlier',
      isUnread: false,
      isImportant: false,
      targetTab: 'security',
    },
  ]);

  // Statistics
  const totalCount = notifications.length;
  const unreadCount = notifications.filter((n) => n.isUnread).length;
  const importantCount = notifications.filter((n) => n.isImportant).length;
  const projectNotifsCount = notifications.filter((n) => n.type === 'project').length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
    if (onShowToast) onShowToast('All notifications marked as read.');
  };

  const handleDeleteNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (onShowToast) onShowToast('Notification removed.');
  };

  const getIconForType = (type: NotificationItem['type']) => {
    switch (type) {
      case 'project':
        return <Briefcase className="w-5 h-5 text-[#E5C158]" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-[#28C76F]" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-400" />;
      case 'file':
        return <FileText className="w-5 h-5 text-purple-400" />;
      case 'ai':
        return <Bot className="w-5 h-5 text-amber-300" />;
      case 'security':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      default:
        return <Bell className="w-5 h-5 text-neutral-400" />;
    }
  };

  const filteredNotifications = notifications.filter((item) => {
    if (filterType === 'Unread' && !item.isUnread) return false;
    if (filterType === 'Important' && !item.isImportant) return false;
    if (filterType === 'Projects' && item.type !== 'project') return false;
    if (filterType === 'Payments' && item.type !== 'payment') return false;
    if (filterType === 'Messages' && item.type !== 'message') return false;
    if (filterType === 'AI' && item.type !== 'ai') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchRef = item.projectRef?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchRef) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* HEADER BANNER */}
      <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(229,193,88,0.12)]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center shrink-0">
            <Bell className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#28C76F] animate-ping" />
                <span>REAL-TIME NOTIFICATION FEED</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                {clientId}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-poppins font-bold text-white tracking-tight">
              Notifications & Activity Center
            </h1>
            <p className="text-xs text-neutral-300">
              Live updates, milestone alerts, payment receipts, and designer messages for <strong className="text-[#E5C158]">PRJ-MFS-849201</strong>.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)] flex items-center gap-2"
            >
              <Check className="w-4 h-4 fill-black" />
              <span>Mark All as Read</span>
            </button>
          )}

          <button
            onClick={() => setShowRoadmapModal(true)}
            className="px-3 py-2.5 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/40 text-[#28C76F] font-bold text-xs hover:bg-[#28C76F]/20 transition-all cursor-pointer flex items-center gap-1"
          >
            <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
            <span>Phase 10 Complete</span>
          </button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Unread Alerts', value: unreadCount, sub: 'Needs attention', icon: Bell, color: 'text-[#E5C158]' },
          { label: 'Total Logs', value: totalCount, sub: 'All recorded events', icon: Layers, color: 'text-blue-400' },
          { label: 'Important Alerts', value: importantCount, sub: 'High priority updates', icon: AlertCircle, color: 'text-amber-300' },
          { label: 'Project Updates', value: projectNotifsCount, sub: 'PRJ-MFS-849201', icon: CheckCircle2, color: 'text-[#28C76F]' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 bg-black/60 relative overflow-hidden">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 font-medium text-[11px]">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-2xl font-poppins font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <span className="text-[10px] text-neutral-400 font-mono block">{stat.sub}</span>
            </div>
          );
        })}
      </div>

      {/* CONTROLS BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-4 space-y-4 bg-black/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Smart Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            {['All', 'Unread', 'Important', 'Projects', 'Payments', 'Messages', 'AI'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterType(cat)}
                className={`px-3.5 py-1.5 rounded-xl shrink-0 transition-colors cursor-pointer font-medium text-[11px] ${
                  filterType === cat
                    ? 'bg-[#E5C158] text-black font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
          </div>

        </div>
      </div>

      {/* NOTIFICATION FEED LIST */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                handleMarkAsRead(notif.id);
                if (notif.targetTab && setActiveTab) {
                  setActiveTab(notif.targetTab);
                }
              }}
              className={`glass-card rounded-3xl border p-5 transition-all cursor-pointer relative group flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                notif.isUnread
                  ? 'border-[#E5C158]/50 bg-gradient-to-r from-black via-[#0F0F0F] to-black shadow-[0_0_20px_rgba(229,193,88,0.1)]'
                  : 'border-white/10 bg-black/80 hover:border-white/30'
              }`}
            >
              <div className="flex items-start sm:items-center gap-4">
                
                {/* Type Icon Badge */}
                <div className={`p-3 rounded-2xl border shrink-0 ${
                  notif.isUnread ? 'bg-[#E5C158]/10 border-[#E5C158]/40' : 'bg-white/5 border-white/10'
                }`}>
                  {getIconForType(notif.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-poppins text-sm font-bold ${notif.isUnread ? 'text-white' : 'text-neutral-200'}`}>
                      {notif.title}
                    </h3>

                    {notif.isUnread && (
                      <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-pulse" />
                    )}

                    {notif.isImportant && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[9px] font-bold">
                        IMPORTANT
                      </span>
                    )}

                    {notif.projectRef && (
                      <span className="text-[10px] font-mono text-[#E5C158]">
                        {notif.projectRef}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-300 max-w-2xl">
                    {notif.description}
                  </p>

                  <span className="text-[10px] text-neutral-400 font-mono block pt-0.5">
                    {notif.timestamp}
                  </span>
                </div>

              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNotif(notif.id);
                  }}
                  className="p-2 rounded-xl hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="p-2 rounded-xl bg-white/5 group-hover:bg-[#E5C158] group-hover:text-black text-neutral-400 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="glass-card rounded-3xl border border-white/10 p-12 text-center space-y-4 bg-black/80">
          <div className="w-16 h-16 rounded-full bg-[#28C76F]/10 text-[#28C76F] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-poppins font-bold text-white">You're completely caught up!</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              No unread notification alerts or activity logs match your current filter query.
            </p>
          </div>
          <button
            onClick={() => {
              setFilterType('All');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-full bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* PHASE 10 ROADMAP CHECKLIST MODAL */}
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
                    ENTIRE CLIENT DASHBOARD ARCHITECTURE 100% COMPLETED
                  </span>
                  <h3 className="text-xl font-poppins font-bold text-white">
                    Phase 10 Completed • Notifications & Activity Center
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

            {/* Complete Roadmap Checklist for all 10 phases */}
            <div className="space-y-1.5 text-xs max-h-[350px] overflow-y-auto pr-1">
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
              ].map((p, idx) => (
                <div key={idx} className="p-2 bg-[#28C76F]/10 border border-[#28C76F]/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#28C76F]" />
                    <strong className="text-white text-[11px]">{p.phase}</strong>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[9px]">COMPLETED</span>
                </div>
              ))}

              <div className="p-3 rounded-2xl bg-[#28C76F]/15 border border-[#28C76F]/40 flex items-center justify-between shadow-[0_0_15px_rgba(40,199,111,0.2)]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold text-xs">Phase 10: Notifications & Activity Center</strong>
                    <span className="text-neutral-400 text-[11px]">Real-time notification feed, activity timeline, smart filters & notification badges</span>
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
                Acknowledge All 10 Phases Completed
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
