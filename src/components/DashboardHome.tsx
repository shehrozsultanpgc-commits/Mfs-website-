import React, { useState } from 'react';
import { Currency } from '../types';
import { useModalHistory } from '../hooks/useModalHistory';
import {
  Sparkles,
  Bot,
  Briefcase,
  CheckCircle2,
  Clock,
  FolderUp,
  FileCheck,
  TrendingUp,
  Star,
  Zap,
  Plus,
  Upload,
  Download,
  MessageSquare,
  Mic,
  PhoneCall,
  RefreshCw,
  Bell,
  Calendar,
  ShieldCheck,
  Award,
  AlertCircle,
  Eye,
  FileText,
  ChevronRight,
  ArrowUpRight,
  Filter,
  Check,
  Info,
  Sliders,
  Layers
} from 'lucide-react';

interface DashboardHomeProps {
  currency: Currency;
  customerName?: string;
  customerEmail?: string;
  clientId?: string;
  orders?: any[];
  loadingOrders?: boolean;
  onRefreshOrders?: () => void;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (
    page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard',
    targetSection?: string
  ) => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
  setActiveTab: (tab: any) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  currency,
  customerName = 'Muhammad Shehroz Sultan',
  customerEmail = 'mfsmedia.agency@gmail.com',
  clientId = 'CLI-MFS-98421',
  orders = [],
  loadingOrders = false,
  onRefreshOrders,
  onShowToast,
  onNavigatePage,
  onOpenAIChat,
  setActiveTab,
}) => {
  const hasRealOrders = orders && orders.length > 0;
  const activeCount = hasRealOrders
    ? orders.filter(o => ['in_progress', 'in_review', 'pending_verification', 'pending'].includes(o.status)).length
    : 1;
  const completedCount = hasRealOrders
    ? orders.filter(o => ['completed', 'delivered'].includes(o.status)).length
    : 3;
  const pendingCount = hasRealOrders
    ? orders.filter(o => o.status === 'pending_verification' || o.status === 'pending').length
    : 0;
  const primaryOrder = hasRealOrders ? orders[0] : null;
  // Activity Filter State
  const [activityFilter, setActivityFilter] = useState<'all' | 'orders' | 'payments' | 'ai' | 'deliveries'>('all');

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'AI Quality Scan Passed',
      desc: 'Slide 7 formatting & color contrast verified with 100% WCAG AA compliance.',
      time: '12 mins ago',
      unread: true,
      category: 'ai',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Progress Update: Slide 7 Ready',
      desc: 'Executive Summary slide draft is now ready for review in the Files section.',
      time: '1 hour ago',
      unread: true,
      category: 'project',
      priority: 'Normal',
    },
    {
      id: 3,
      title: 'Payment Confirmed & Invoice Ready',
      desc: 'Invoice #INV-849201 generated for PKR 2,500 (50% Grand Launch Offer).',
      time: '3 hours ago',
      unread: false,
      category: 'payment',
      priority: 'Normal',
    },
    {
      id: 4,
      title: 'Welcome to MFS Growth VIP Workspace',
      desc: 'Your account is fully activated with 24/7 AI Assistant & dedicated design support.',
      time: 'Yesterday',
      unread: false,
      category: 'system',
      priority: 'Low',
    },
  ]);

  // Revision Request Modal State
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');

  // Phase 2 Checklist Modal State
  const [showChecklistModal, setShowChecklistModal] = useState(false);

  useModalHistory(showRevisionModal, () => setShowRevisionModal(false), 'dashboardRevisionModal');
  useModalHistory(showChecklistModal, () => setShowChecklistModal(false), 'dashboardChecklistModal');

  // Time-based Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    if (onShowToast) onShowToast('All notifications marked as read.');
  };

  const handleClearNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (onShowToast) onShowToast('Notification dismissed.');
  };

  const handleSubmitRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNotes.trim()) {
      if (onShowToast) onShowToast('Please describe your revision details.');
      return;
    }
    setShowRevisionModal(false);
    setRevisionNotes('');
    if (onShowToast) {
      onShowToast('Revision request submitted! Senior Designer & MFS AI notified.');
    }
  };

  // Recent Activity Data
  const recentActivities = [
    {
      id: 'act-1',
      title: 'Slide 7 Formatting & Typography Completed',
      category: 'ai',
      time: 'Today • 10:15 AM PKT',
      status: 'In Production',
      desc: 'MFS AI Guardian auto-adjusted font hierarchy and applied Gold accent (#E5C158).',
      icon: Sparkles,
      color: 'text-[#E5C158] bg-[#E5C158]/10 border-[#E5C158]/30',
    },
    {
      id: 'act-2',
      title: 'EasyPaisa Payment Verified',
      category: 'payments',
      time: 'Today • 09:45 AM PKT',
      status: 'Confirmed',
      desc: 'Payment of PKR 2,500 received via EasyPaisa (03116191234). Invoice #INV-849201 generated.',
      icon: FileCheck,
      color: 'text-[#28C76F] bg-[#28C76F]/10 border-[#28C76F]/30',
    },
    {
      id: 'act-3',
      title: 'Executive Presentation Order Placed',
      category: 'orders',
      time: 'Today • 09:30 AM PKT',
      status: 'Order Placed',
      desc: 'Order PRJ-MFS-849201 created with 50% Grand Launch Offer applied.',
      icon: Briefcase,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    },
    {
      id: 'act-4',
      title: 'Previous Order Delivered: ATS Resume & CV',
      category: 'deliveries',
      time: 'July 15, 2026 • 04:20 PM PKT',
      status: 'Delivered',
      desc: 'ATS-compliant resume & cover letter files delivered with 100% client approval.',
      icon: Download,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
  ];

  const filteredActivities = recentActivities.filter((act) => {
    if (activityFilter === 'all') return true;
    return act.category === activityFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* 1. AI DAILY BRIEFING HERO CARD */}
      <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 sm:p-8 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden space-y-6 shadow-[0_0_40px_rgba(229,193,88,0.08)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5C158]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#28C76F]" />
              <span>MFS AI DAILY BRIEFING & INTELLIGENCE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-white tracking-tight">
              {getGreeting()}, <span className="gradient-gold-text">{customerName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300">
              Here is your daily executive project update. All systems are operating at peak efficiency.
            </p>
          </div>

          {/* Time & Checklist Trigger Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowChecklistModal(true)}
              className="px-4 py-2 rounded-xl bg-[#E5C158]/10 hover:bg-[#E5C158]/20 border border-[#E5C158]/40 text-[#E5C158] font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
              <span>Phase 2 Status</span>
            </button>
            <div className="px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-right">
              <span className="text-[10px] font-bold text-[#28C76F] uppercase tracking-wider block">
                • VIP ONLINE SUPPORT 24/7
              </span>
              <span className="text-xs font-mono text-neutral-300">PKT (UTC+5)</span>
            </div>
          </div>
        </div>

        {/* AI Briefing Snapshot Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/10">
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <span className="text-[10px] text-neutral-400 font-semibold block">Active Projects</span>
            <div className="flex items-center justify-between">
              <strong className="text-lg font-bold font-poppins text-white">1 Active</strong>
              <span className="p-1 rounded-lg bg-[#28C76F]/20 text-[#28C76F] text-[10px] font-bold">In Progress</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <span className="text-[10px] text-neutral-400 font-semibold block">Nearest Delivery</span>
            <div className="flex items-center justify-between">
              <strong className="text-xs font-bold font-poppins text-[#E5C158]">Tomorrow 6:00 PM</strong>
              <Clock className="w-3.5 h-3.5 text-[#E5C158]" />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <span className="text-[10px] text-neutral-400 font-semibold block">Pending Messages</span>
            <div className="flex items-center justify-between">
              <strong className="text-lg font-bold font-poppins text-white">1 Unread</strong>
              <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <span className="text-[10px] text-neutral-400 font-semibold block">Pending Revisions</span>
            <div className="flex items-center justify-between">
              <strong className="text-lg font-bold font-poppins text-[#28C76F]">0 Pending</strong>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F]" />
            </div>
          </div>
        </div>

        {/* Motivational Quote & AI Focus Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-white/[0.04] to-black border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-[#E5C158]/20 text-[#E5C158] shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="space-y-0.5 text-xs">
              <div className="flex items-center gap-2">
                <strong className="text-white font-semibold">Today's Motivation & Focus:</strong>
                <span className="text-[10px] bg-[#28C76F]/20 text-[#28C76F] px-2 py-0.5 rounded font-bold">100% Quality Focus</span>
              </div>
              <p className="text-neutral-300 italic">
                "Quality is not an act, it is a habit — MFS Growth AI strives for zero-defect digital deliverables on every slide and document."
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenAIChat && onOpenAIChat('chat')}
            className="px-4 py-2 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-[#050507] font-bold text-xs transition-all shrink-0 cursor-pointer shadow-lg flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Consult MFS AI Assistant</span>
          </button>
        </div>
      </div>

      {/* 2. PROJECT OVERVIEW METRICS CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
              REAL-TIME ANALYTICS
            </span>
            <h2 className="text-xl font-poppins font-bold text-white">Project Overview Metrics</h2>
          </div>
          <span className="text-xs text-neutral-400 font-mono">Updated Just Now • Auto-Synced</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Active Projects */}
          <div className="glass-card rounded-2xl border border-white/10 p-4 hover:border-[#E5C158]/50 transition-all duration-300 space-y-2 group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#28C76F] bg-[#28C76F]/10 px-2 py-0.5 rounded-full border border-[#28C76F]/20">
                {hasRealOrders ? 'Supabase Live' : 'Active'}
              </span>
            </div>
            <div>
              <span className="text-2xl font-bold font-poppins text-white block">
                {String(activeCount).padStart(2, '0')}
              </span>
              <span className="text-xs text-neutral-400 font-semibold block">Active Projects</span>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
              <span className="truncate max-w-[100px]">{primaryOrder ? primaryOrder.service_type : 'Executive Pitch Deck'}</span>
              <span className="text-[#E5C158] font-bold">{primaryOrder ? 'Live Tracked' : '65% Progress'}</span>
            </div>
          </div>

          {/* Completed Projects */}
          <div className="glass-card rounded-2xl border border-white/10 p-4 hover:border-[#E5C158]/50 transition-all duration-300 space-y-2 group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#28C76F]/10 text-[#28C76F] group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#28C76F] bg-[#28C76F]/10 px-2 py-0.5 rounded-full border border-[#28C76F]/20">
                100% Success
              </span>
            </div>
            <div>
              <span className="text-2xl font-bold font-poppins text-white block">
                {String(completedCount).padStart(2, '0')}
              </span>
              <span className="text-xs text-neutral-400 font-semibold block">Completed Projects</span>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
              <span>Resume & Assignments</span>
              <span className="text-[#28C76F] font-bold">Approved</span>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="glass-card rounded-2xl border border-white/10 p-4 hover:border-[#E5C158]/50 transition-all duration-300 space-y-2 group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-neutral-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                {pendingCount} Pending
              </span>
            </div>
            <div>
              <span className="text-2xl font-bold font-poppins text-white block">
                {String(pendingCount).padStart(2, '0')}
              </span>
              <span className="text-xs text-neutral-400 font-semibold block">Pending Orders</span>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
              <span>{pendingCount > 0 ? 'Verification Needed' : 'All Verified'}</span>
              <span className="text-blue-400 font-bold">Instant Start</span>
            </div>
          </div>

          {/* Files Uploaded */}
          <div className="glass-card rounded-2xl border border-white/10 p-4 hover:border-[#E5C158]/50 transition-all duration-300 space-y-2 group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                <FolderUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                +3 Today
              </span>
            </div>
            <div>
              <span className="text-2xl font-bold font-poppins text-white block">12</span>
              <span className="text-xs text-neutral-400 font-semibold block">Files Uploaded</span>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
              <span>DOCX, PPTX, Images</span>
              <span className="text-purple-400 font-bold">Secured</span>
            </div>
          </div>

          {/* Files Delivered */}
          <div className="glass-card rounded-2xl border border-white/10 p-4 hover:border-[#E5C158]/50 transition-all duration-300 space-y-2 group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform">
                <FileCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                100% Quality
              </span>
            </div>
            <div>
              <span className="text-2xl font-bold font-poppins text-white block">08</span>
              <span className="text-xs text-neutral-400 font-semibold block">Files Delivered</span>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
              <span>PDF & Source Files</span>
              <span className="text-teal-400 font-bold">Preview Protected</span>
            </div>
          </div>

          {/* Average Delivery Time */}
          <div className="glass-card rounded-2xl border border-white/10 p-4 hover:border-[#E5C158]/50 transition-all duration-300 space-y-2 group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#E5C158]/10 text-[#E5C158] group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded-full border border-[#E5C158]/20">
                +25% Speed
              </span>
            </div>
            <div>
              <span className="text-2xl font-bold font-poppins text-[#E5C158] block">18.5 Hrs</span>
              <span className="text-xs text-neutral-400 font-semibold block">Avg. Delivery Time</span>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
              <span>Benchmark: 24.0 Hrs</span>
              <span className="text-[#E5C158] font-bold">Express Lead</span>
            </div>
          </div>

          {/* Revision Requests */}
          <div className="glass-card rounded-2xl border border-white/10 p-4 hover:border-[#E5C158]/50 transition-all duration-300 space-y-2 group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                <RefreshCw className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#28C76F] bg-[#28C76F]/10 px-2 py-0.5 rounded-full border border-[#28C76F]/20">
                1 Resolved
              </span>
            </div>
            <div>
              <span className="text-2xl font-bold font-poppins text-white block">01</span>
              <span className="text-xs text-neutral-400 font-semibold block">Revision Requests</span>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
              <span>0 Pending Revisions</span>
              <span className="text-[#28C76F] font-bold">Resolved</span>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="glass-card rounded-2xl border border-white/10 p-4 hover:border-[#E5C158]/50 transition-all duration-300 space-y-2 group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-[10px] font-bold text-[#28C76F] bg-[#28C76F]/10 px-2 py-0.5 rounded-full border border-[#28C76F]/20">
                5.0 / 5.0
              </span>
            </div>
            <div>
              <span className="text-2xl font-bold font-poppins text-white block">100%</span>
              <span className="text-xs text-neutral-400 font-semibold block">Customer Satisfaction</span>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
              <span>VIP Verified Client</span>
              <span className="text-[#28C76F] font-bold">Top Tier</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CURRENT PROJECT CARD & AI INSIGHTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column (7 Cols): Current Active Project Spotlight */}
        <div className="lg:col-span-7 glass-card rounded-3xl border border-white/10 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                ACTIVE WORKSPACE SPOTLIGHT
              </span>
              <h3 className="text-lg font-poppins font-bold text-white">Current Project Details</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#28C76F]/10 border border-[#28C76F]/30 text-[#28C76F] text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#28C76F] animate-ping" />
                Live In Production
              </span>
            </div>
          </div>

          {/* Main Info Block */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-poppins font-bold text-white text-base">
                  {primaryOrder ? primaryOrder.service_type : 'Executive Presentation Pitch Deck'}
                </h4>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  ID: <strong className="text-white">{primaryOrder ? (primaryOrder.order_number || primaryOrder.id) : 'PRJ-MFS-849201'}</strong> • Service: {primaryOrder ? primaryOrder.service_type : 'Presentation Design (10 Slides)'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#E5C158] bg-[#E5C158]/10 px-3 py-1 rounded-xl border border-[#E5C158]/20 w-fit">
                {primaryOrder ? `${(primaryOrder.delivery_tier || 'express').toUpperCase()} Speed` : 'Express Priority (+30%)'}
              </span>
            </div>

            {/* Progress Bar & Stage Indicator */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-300 font-semibold">
                  Status: <strong className="text-[#E5C158]">{primaryOrder ? primaryOrder.status.replace(/_/g, ' ').toUpperCase() : 'Stage 4/6: Slide 7 Visual Polish'}</strong>
                </span>
                <strong className="text-[#E5C158] font-bold">
                  {primaryOrder ? (primaryOrder.status === 'completed' ? '100% Completed' : primaryOrder.status === 'delivered' ? '100% Delivered' : 'In Progress (Active)') : '65% Completed'}
                </strong>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#28C76F] via-[#E5C158] to-[#D4AF37] transition-all duration-1000 shadow-[0_0_12px_rgba(229,193,88,0.4)]"
                  style={{
                    width: primaryOrder
                      ? (primaryOrder.status === 'completed' || primaryOrder.status === 'delivered' ? '100%' : primaryOrder.status === 'in_review' ? '85%' : '50%')
                      : '65%'
                  }}
                />
              </div>
            </div>

            {/* Project Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                <span className="text-[10px] text-neutral-400 block">Total Investment</span>
                <strong className="text-[#28C76F] block font-bold font-mono">
                  {primaryOrder ? `${primaryOrder.currency || 'PKR'} ${Number(primaryOrder.total_amount || 0).toLocaleString()}` : 'PKR 2,500'}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                <span className="text-[10px] text-neutral-400 block">Payment Method</span>
                <strong className="text-white block font-bold">
                  {primaryOrder ? (primaryOrder.payment_method || 'Verified') : 'EasyPaisa (03116191234)'}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-neutral-400 block">Supabase Sync</span>
                <strong className="text-[#E5C158] block font-bold">
                  {hasRealOrders ? 'Real-Time Connected' : 'Demo Fallback'}
                </strong>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
            <button
              onClick={() => setActiveTab('timeline')}
              className="px-5 py-2.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all cursor-pointer flex items-center gap-2 shadow-md"
            >
              <Eye className="w-4 h-4 text-black" />
              <span>View Details & Timeline</span>
            </button>

            <button
              onClick={() => setActiveTab('files')}
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <Upload className="w-4 h-4 text-[#E5C158]" />
              <span>Upload Assets</span>
            </button>

            <button
              onClick={() => setShowRevisionModal(true)}
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-indigo-400" />
              <span>Request Revision</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 Cols): Active Order Summary & Quick Shortcuts */}
        <div className="lg:col-span-5 glass-card rounded-3xl border border-white/10 p-6 space-y-5">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                ACTIVE ORDER SUMMARY
              </span>
              <h3 className="text-lg font-poppins font-bold text-white">Order Details & Workspace</h3>
            </div>
            <div className="p-2 rounded-xl bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/20">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {/* Quick Order Info */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-medium">Order ID:</span>
                <span className="text-white font-mono font-bold">ORD-MFS-984210</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-medium">Service:</span>
                <span className="text-[#E5C158] font-semibold">Executive Pitch Deck Design</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-medium">Est. Delivery:</span>
                <span className="text-[#28C76F] font-mono font-bold">Tomorrow • 06:00 PM PKT</span>
              </div>
            </div>

            {/* Quick Navigation Shortcuts */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setActiveTab('files')}
                className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer text-xs"
              >
                <FolderUp className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Project Files</span>
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer text-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#28C76F]" />
                <span>Message Team</span>
              </button>
            </div>

            {/* Secondary Link to AI Analytics Tab */}
            <button
              onClick={() => setActiveTab('achievements')}
              className="w-full py-2.5 px-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#E5C158]/40 text-neutral-300 hover:text-white font-medium text-[11px] flex items-center justify-between transition-all cursor-pointer group"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#28C76F]" />
                <span>View AI Risk Detection & Delivery Scorecard</span>
              </span>
              <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-[#E5C158] transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. QUICK ACTIONS SHORTCUTS GRID */}
      <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4">
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
              ONE-CLICK CONTROLS
            </span>
            <h3 className="text-lg font-poppins font-bold text-white">Quick Actions</h3>
          </div>
          <span className="text-xs text-neutral-400">8 Shortcut Modules</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Action 1 */}
          <button
            onClick={() => {
              if (onNavigatePage) onNavigatePage('order');
            }}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-[#E5C158]/10 border border-white/10 hover:border-[#E5C158] text-left cursor-pointer transition-all group space-y-2"
          >
            <div className="p-2.5 rounded-xl bg-[#E5C158]/20 text-[#E5C158] w-fit group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-white text-xs">Place New Order</h4>
              <p className="text-[10px] text-neutral-400 mt-0.5">50% Grand Launch Offer active</p>
            </div>
          </button>

          {/* Action 2 */}
          <button
            onClick={() => setActiveTab('timeline')}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-blue-500/10 border border-white/10 hover:border-blue-500 text-left cursor-pointer transition-all group space-y-2"
          >
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 w-fit group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-white text-xs">Track Project</h4>
              <p className="text-[10px] text-neutral-400 mt-0.5">Live work logs & team notes</p>
            </div>
          </button>

          {/* Action 3 */}
          <button
            onClick={() => setActiveTab('files')}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-purple-500/10 border border-white/10 hover:border-purple-500 text-left cursor-pointer transition-all group space-y-2"
          >
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 w-fit group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-white text-xs">Upload Requirements</h4>
              <p className="text-[10px] text-neutral-400 mt-0.5">PDF, DOCX, PPTX, ZIP, Images</p>
            </div>
          </button>

          {/* Action 4 */}
          <button
            onClick={() => setActiveTab('invoices')}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-[#28C76F]/10 border border-white/10 hover:border-[#28C76F] text-left cursor-pointer transition-all group space-y-2"
          >
            <div className="p-2.5 rounded-xl bg-[#28C76F]/20 text-[#28C76F] w-fit group-hover:scale-110 transition-transform">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-white text-xs">Download Receipts</h4>
              <p className="text-[10px] text-neutral-400 mt-0.5">Instant PDF tax invoices</p>
            </div>
          </button>

          {/* Action 5 */}
          <button
            onClick={() => onOpenAIChat && onOpenAIChat('chat')}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-[#E5C158]/10 border border-white/10 hover:border-[#E5C158] text-left cursor-pointer transition-all group space-y-2"
          >
            <div className="p-2.5 rounded-xl bg-[#E5C158]/20 text-[#E5C158] w-fit group-hover:scale-110 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-white text-xs">Ask MFS Chat AI</h4>
              <p className="text-[10px] text-neutral-400 mt-0.5">24/7 AI Assistant guidance</p>
            </div>
          </button>

          {/* Action 6 */}
          <button
            onClick={() => onOpenAIChat && onOpenAIChat('voice')}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-amber-500/10 border border-white/10 hover:border-amber-500 text-left cursor-pointer transition-all group space-y-2"
          >
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 w-fit group-hover:scale-110 transition-transform">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-white text-xs">MFS Voice AI</h4>
              <p className="text-[10px] text-neutral-400 mt-0.5">Hands-free voice queries</p>
            </div>
          </button>

          {/* Action 7 */}
          <a
            href="https://wa.me/923015323689"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-[#28C76F]/10 border border-white/10 hover:border-[#28C76F] text-left cursor-pointer transition-all group space-y-2 block"
          >
            <div className="p-2.5 rounded-xl bg-[#28C76F]/20 text-[#28C76F] w-fit group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-white text-xs">WhatsApp Support</h4>
              <p className="text-[10px] text-neutral-400 mt-0.5">+92 301 5323689 (24/7)</p>
            </div>
          </a>

          {/* Action 8 */}
          <button
            onClick={() => setShowRevisionModal(true)}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-indigo-500/10 border border-white/10 hover:border-indigo-500 text-left cursor-pointer transition-all group space-y-2"
          >
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 w-fit group-hover:scale-110 transition-transform">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-white text-xs">Request Revision</h4>
              <p className="text-[10px] text-neutral-400 mt-0.5">Instant design adjustment</p>
            </div>
          </button>
        </div>
      </div>

      {/* 5. RECENT ACTIVITY & NOTIFICATIONS DUAL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Recent Activity Timeline (7 Cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl border border-white/10 p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                ACCOUNT LOGS
              </span>
              <h3 className="text-lg font-poppins font-bold text-white">Recent Activity Timeline</h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10 text-[10px]">
              {(['all', 'orders', 'payments', 'ai', 'deliveries'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActivityFilter(tab)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer capitalize ${
                    activityFilter === tab
                      ? 'bg-[#E5C158] text-[#050507] font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Feed Items or Smart Empty State */}
          {filteredActivities.length > 0 ? (
            <div className="space-y-3">
              {filteredActivities.map((act) => {
                const IconComp = act.icon;
                return (
                  <div
                    key={act.id}
                    className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-all flex items-start gap-3.5 group"
                  >
                    <div className={`p-2.5 rounded-xl border shrink-0 ${act.color}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-poppins font-bold text-white text-xs group-hover:text-[#E5C158] transition-colors">
                          {act.title}
                        </h4>
                        <span className="text-[9px] font-mono text-neutral-400">{act.time}</span>
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-relaxed">{act.desc}</p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[9px] font-bold text-[#28C76F] bg-[#28C76F]/10 px-2 py-0.5 rounded border border-[#28C76F]/20">
                          {act.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Smart Empty State */
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 text-neutral-400 flex items-center justify-center mx-auto">
                <Filter className="w-6 h-6" />
              </div>
              <h4 className="font-poppins font-bold text-white text-sm">No Activities in "{activityFilter}" Category</h4>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                There are no recorded logs under this category. Switch to "all" to view complete account activity.
              </p>
              <button
                onClick={() => setActivityFilter('all')}
                className="px-4 py-2 rounded-full bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] cursor-pointer"
              >
                Reset Activity Filter
              </button>
            </div>
          )}
        </div>

        {/* Priority Notifications Widget (5 Cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl border border-white/10 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                NOTIFICATION CENTER
              </span>
              <h3 className="text-lg font-poppins font-bold text-white flex items-center gap-2">
                Priority Alerts
                {notifications.filter((n) => n.unread).length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#E5C158] text-[#050507] text-[10px] font-extrabold">
                    {notifications.filter((n) => n.unread).length} Unread
                  </span>
                )}
              </h3>
            </div>
            {notifications.some((n) => n.unread) && (
              <button
                onClick={handleMarkAllNotificationsRead}
                className="text-[11px] text-[#E5C158] hover:underline font-semibold cursor-pointer"
              >
                Mark all read
              </button>
            )}
          </div>

          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3.5 rounded-2xl border transition-all space-y-1 relative group ${
                    n.unread
                      ? 'bg-[#E5C158]/5 border-[#E5C158]/30'
                      : 'bg-white/[0.02] border-white/5 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {n.unread && <span className="w-2 h-2 rounded-full bg-[#E5C158]" />}
                      <strong className="text-white text-xs font-semibold">{n.title}</strong>
                    </div>
                    <button
                      onClick={() => handleClearNotification(n.id)}
                      className="text-neutral-500 hover:text-white text-[10px] p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Dismiss"
                    >
                      Dismiss
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">{n.desc}</p>
                  <div className="flex items-center justify-between text-[9px] text-neutral-400 pt-1">
                    <span>{n.time}</span>
                    <span
                      className={`font-bold px-1.5 py-0.5 rounded ${
                        n.priority === 'High'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {n.priority} Priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#28C76F] mx-auto" />
              <h4 className="font-poppins font-bold text-white text-sm">All Notifications Read</h4>
              <p className="text-xs text-neutral-400">You are completely up to date.</p>
            </div>
          )}
        </div>
      </div>

      {/* 6. UPCOMING MILESTONES & PERFORMANCE SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Upcoming Milestones (6 Cols) */}
        <div className="lg:col-span-6 glass-card rounded-3xl border border-white/10 p-6 space-y-4">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                SCHEDULED EVENTS
              </span>
              <h3 className="text-lg font-poppins font-bold text-white">Upcoming Milestones</h3>
            </div>
            <Calendar className="w-5 h-5 text-purple-400" />
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#E5C158]/20 text-[#E5C158]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-semibold">Expected Final Delivery</strong>
                  <span className="text-neutral-400 text-[11px]">Executive Presentation (10 Slides)</span>
                </div>
              </div>
              <span className="text-[#E5C158] font-bold text-right font-mono text-[11px]">
                Tomorrow, 6:00 PM PKT
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-semibold">Free Revision Window Deadline</strong>
                  <span className="text-neutral-400 text-[11px]">7-Day Post-Delivery Protection</span>
                </div>
              </div>
              <span className="text-blue-400 font-bold text-right font-mono text-[11px]">
                July 28, 2026
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#28C76F]/20 text-[#28C76F]">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-semibold">24/7 VIP Support Active</strong>
                  <span className="text-neutral-400 text-[11px]">WhatsApp & MFS AI Agent</span>
                </div>
              </div>
              <span className="text-[#28C76F] font-bold text-right font-mono text-[11px]">
                Always Online
              </span>
            </div>
          </div>
        </div>

        {/* Performance Summary (6 Cols) */}
        <div className="lg:col-span-6 glass-card rounded-3xl border border-white/10 p-6 space-y-4">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                CLIENT SCORECARD
              </span>
              <h3 className="text-lg font-poppins font-bold text-white">Performance Summary</h3>
            </div>
            <Award className="w-5 h-5 text-[#E5C158]" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-xs">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <strong className="text-2xl font-bold font-poppins text-white block">03</strong>
              <span className="text-[11px] text-neutral-400 block font-semibold">Total Projects Done</span>
              <span className="text-[9px] text-[#28C76F] font-bold block">100% On-Time Record</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <strong className="text-2xl font-bold font-poppins text-[#E5C158] block">18.5 Hrs</strong>
              <span className="text-[11px] text-neutral-400 block font-semibold">Average Turnaround</span>
              <span className="text-[9px] text-[#E5C158] font-bold block">25% Faster than Standard</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <strong className="text-2xl font-bold font-poppins text-white block">50% OFF</strong>
              <span className="text-[11px] text-neutral-400 block font-semibold">Grand Launch Discount</span>
              <span className="text-[9px] text-[#28C76F] font-bold block">Applied to All Orders</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <strong className="text-2xl font-bold font-poppins text-[#28C76F] block">5.0 ★</strong>
              <span className="text-[11px] text-neutral-400 block font-semibold">Client Satisfaction</span>
              <span className="text-[9px] text-[#28C76F] font-bold block">VIP Verified Client</span>
            </div>
          </div>
        </div>
      </div>

      {/* REVISION REQUEST MODAL */}
      {showRevisionModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] overflow-y-auto">
          <div className="glass-card max-w-lg w-full rounded-3xl border border-[#E5C158]/40 p-5 sm:p-6 space-y-5 relative my-auto max-h-[calc(100dvh-1.5rem)] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-poppins font-bold text-white text-sm truncate">Request Free Revision</h3>
                  <p className="text-[11px] text-neutral-400 truncate">Project: PRJ-MFS-849201</p>
                </div>
              </div>
              <button
                onClick={() => setShowRevisionModal(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitRevision} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Revision Details / Specific Adjustments Requested:
                </label>
                <textarea
                  rows={4}
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  placeholder="e.g., Please change the title font on Slide 3 to bold and add an extra icon to the comparison table."
                  className="w-full rounded-xl bg-black/60 border border-white/20 p-3 text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-[11px] text-neutral-300 leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Revisions submitted during active production are prioritized with zero extra charge under your 7-day post-delivery warranty.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRevisionModal(false)}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#E5C158] text-black font-bold hover:bg-[#fce888] cursor-pointer shadow-md"
                >
                  Submit Revision Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PHASE 2 STATUS & ROADMAP MODAL */}
      {showChecklistModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] overflow-y-auto">
          <div className="glass-card max-w-xl w-full rounded-3xl border border-[#E5C158]/50 p-5 sm:p-6 space-y-6 relative max-h-[calc(100dvh-1.5rem)] overflow-y-auto my-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#28C76F]/20 text-[#28C76F] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-poppins font-bold text-white text-sm sm:text-base truncate">
                    Client Dashboard — Phase 2 Completion
                  </h3>
                  <span className="text-[10px] text-[#28C76F] font-bold block truncate">
                    Phase 2 (Dashboard Home) Fully Completed & Production Ready
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowChecklistModal(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Completed Features List */}
            <div className="space-y-3 text-xs">
              <h4 className="font-poppins font-bold text-[#E5C158] uppercase tracking-wider text-[10px]">
                Completed Phases
              </h4>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
                    <strong className="text-white">Client Dashboard – Phase 1</strong>
                  </div>
                  <span className="text-[10px] text-[#28C76F] font-bold">Completed ✓</span>
                </div>

                <div className="p-3 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
                    <strong className="text-white">Client Dashboard – Phase 2 (Dashboard Home)</strong>
                  </div>
                  <span className="text-[10px] text-[#28C76F] font-bold">Completed ✓</span>
                </div>
              </div>

              {/* Remaining Dashboard Phases */}
              <h4 className="font-poppins font-bold text-neutral-400 uppercase tracking-wider text-[10px] pt-2">
                Remaining Client Dashboard Roadmap
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-neutral-300">
                {[
                  'Phase 3: My Projects Workspace',
                  'Phase 4: Orders & Invoices Hub',
                  'Phase 5: Live Timeline & Work Logs',
                  'Phase 6: Files & Deliverables Protection',
                  'Phase 7: Messages & Communication',
                  'Phase 8: Achievements & VIP Rewards',
                  'Phase 9: AI Assistant & Voice Studio',
                  'Phase 10: Settings & Account Management',
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowChecklistModal(false)}
                className="px-5 py-2 rounded-full bg-[#E5C158] text-black font-bold text-xs cursor-pointer hover:bg-[#fce888]"
              >
                Close Status Overview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
