import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Currency } from '../types';
import { useModalHistory } from '../hooks/useModalHistory';
import { useAuth } from '../context/AuthContext';
import { fetchClientOrders, subscribeToClientOrders } from '../lib/supabaseOrderService';
import { DashboardHome } from './DashboardHome';
import { AILiveProjectTracking } from './AILiveProjectTracking';
import { ProjectDetailsCenter } from './ProjectDetailsCenter';
import { AIAssistantCenter } from './AIAssistantCenter';
import { MessagesCommunicationCenter } from './MessagesCommunicationCenter';
import { FilesDocumentsCenter } from './FilesDocumentsCenter';
import { BillingPaymentsCenter } from './BillingPaymentsCenter';
import { AccountSecurityCenter } from './AccountSecurityCenter';
import { NotificationsActivityCenter } from './NotificationsActivityCenter';
import { AnalyticsInsightsCenter } from './AnalyticsInsightsCenter';
import { HelpSupportHub } from './HelpSupportHub';
import {
  LayoutDashboard,
  Briefcase,
  ShoppingBag,
  Clock,
  Folder,
  MessageSquare,
  FileText,
  CreditCard,
  Download,
  Trophy,
  Bot,
  HelpCircle,
  Settings,
  LogOut,
  Search,
  Bell,
  Globe,
  User,
  CheckCircle2,
  Sparkles,
  Mic,
  Plus,
  Upload,
  PhoneCall,
  ChevronRight,
  ChevronLeft,
  X,
  ShieldCheck,
  Lock,
  ArrowUpRight,
  Menu,
  TrendingUp,
  Zap,
  Award,
  AlertCircle,
  Calendar,
  Info,
  Check,
  Eye,
  FileUp,
  Share2,
  Copy
} from 'lucide-react';

interface ClientDashboardProps {
  currency: Currency;
  setCurrency?: (c: Currency) => void;
  customerName?: string;
  customerEmail?: string;
  clientId?: string;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (
    page: any,
    targetSection?: string
  ) => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  currency,
  setCurrency,
  customerName: customerNameProp,
  customerEmail: customerEmailProp,
  clientId: clientIdProp,
  onShowToast,
  onNavigatePage,
  onOpenAIChat,
}) => {
  const { user, profile } = useAuth();

  // Dynamic user & auth handling (zero hardcoded fallback user names)
  const dynamicName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    (user?.email ? user.email.split('@')[0] : null);

  const customerName =
    customerNameProp && customerNameProp !== 'Muhammad Shehroz Sultan'
      ? customerNameProp
      : (dynamicName || (user ? 'Valued Client' : 'Valued Client'));

  const customerEmail =
    customerEmailProp && customerEmailProp !== 'mfsmedia.agency@gmail.com'
      ? customerEmailProp
      : (profile?.email || user?.email || 'client@mfsgrowth.com');

  const clientId =
    clientIdProp && clientIdProp !== 'CLI-MFS-98421'
      ? clientIdProp
      : (profile?.id ? `CLI-MFS-${profile.id.substring(0, 6).toUpperCase()}` : 'CLI-MFS-ACTIVE');

  // Sidebar Collapse State (Desktop) & Mobile Open
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Overlay history management for client mobile sidebar
  useModalHistory(mobileSidebarOpen, () => setMobileSidebarOpen(false), 'clientMobileSidebar');

  // Active Tab View in Dashboard
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'projects'
    | 'orders'
    | 'timeline'
    | 'files'
    | 'messages'
    | 'invoices'
    | 'payments'
    | 'downloads'
    | 'achievements'
    | 'ai_assistant'
    | 'help'
    | 'settings'
  >('dashboard');

  // First Login Welcome Modal State
  const [showFirstLoginModal, setShowFirstLoginModal] = useState<boolean>(true);

  // First 24 Hours Onboarding Card Dismiss State
  const [showOnboardingCard, setShowOnboardingCard] = useState<boolean>(true);

  // Notification Center Dropdown
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'AI Quality Check Passed',
      desc: 'Slide 7/10 formatting & color contrast verified by MFS AI Guardian.',
      time: '12 mins ago',
      unread: true,
      priority: 'High',
    },
    {
      id: 2,
      title: 'New AI Progress Update',
      desc: 'Executive Summary slide draft is now ready in the Files tab.',
      time: '1 hour ago',
      unread: true,
      priority: 'Normal',
    },
    {
      id: 3,
      title: 'Payment Verification Approved',
      desc: 'Invoice #INV-849201 generated for PKR 2,500 (50% Grand Launch Offer).',
      time: '3 hours ago',
      unread: true,
      priority: 'Low',
    },
  ]);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Offline Network Status State
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  // Tab Loading Skeleton Transition State
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);

  // Supabase Real Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);

  const loadClientOrders = useCallback(async () => {
    setLoadingOrders(true);
    const res = await fetchClientOrders(customerEmail);
    if (res.success) {
      setOrders(res.data);
    }
    setLoadingOrders(false);
  }, [customerEmail]);

  useEffect(() => {
    loadClientOrders();
    const unsubscribe = subscribeToClientOrders(customerEmail, () => {
      loadClientOrders();
    });

    const handleRealtimeOrderCreated = () => {
      loadClientOrders();
    };

    window.addEventListener('mfs_order_created', handleRealtimeOrderCreated);
    window.addEventListener('storage', handleRealtimeOrderCreated);

    return () => {
      unsubscribe();
      window.removeEventListener('mfs_order_created', handleRealtimeOrderCreated);
      window.removeEventListener('storage', handleRealtimeOrderCreated);
    };
  }, [customerEmail, loadClientOrders]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (onShowToast) onShowToast('Network connection re-established! Syncing with MFS servers...');
    };
    const handleOffline = () => {
      setIsOffline(true);
      if (onShowToast) onShowToast('Network offline. Changes saved in client cache.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onShowToast]);

  const handleTabChange = (tab: any) => {
    setIsTabLoading(true);
    setActiveTab(tab);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 180);
  };

  // Live Time Display
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // PKT Time (UTC+5)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const dateStr = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const timeStr = now.toLocaleTimeString('en-US', options);
      setCurrentTime(`${timeStr} (PKT) • ${dateStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Time-based Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    if (onShowToast) onShowToast('All notifications marked as read.');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    if (onShowToast) onShowToast(`Copied ${label}: ${text}`);
  };

  // Sidebar Items Definition
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'My Projects', icon: Briefcase, badge: '1 Active' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'timeline', label: 'Project Timeline', icon: Clock },
    { id: 'files', label: 'Files', icon: Folder, badge: '4 New' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '1 AI' },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'ai_assistant', label: 'AI Assistant', icon: Bot, isGlow: true },
    { id: 'help', label: 'Help Center', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col pt-20 animate-fadeIn">
      {/* FIRST LOGIN EXPERIENCE MODAL (Previously Approved Feature) */}
      {showFirstLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-card max-w-xl w-full rounded-3xl border border-[#E5C158]/40 p-6 sm:p-8 space-y-6 text-center relative overflow-hidden shadow-[0_0_50px_rgba(229,193,88,0.15)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5C158]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold">
              <Sparkles className="w-4 h-4 text-[#28C76F]" />
              <span>FIRST LOGIN — CLIENT DASHBOARD ACTIVATED</span>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-2">
                🎉 Welcome to <span className="gradient-gold-text">MFS Growth</span>
              </h2>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                Your dedicated client portal is active. Track real-time slide creation, download deliverables, and interact with your AI Project Guardian.
              </p>
            </div>

            {/* Auto-generated Details Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-[10px] text-neutral-400 font-semibold block">CLIENT ID</span>
                <strong className="text-[#E5C158] font-mono text-xs">{clientId}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-[10px] text-neutral-400 font-semibold block">ACTIVE PROJECT ID</span>
                <strong className="text-white font-mono text-xs">PRJ-MFS-849201</strong>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30">
                <span className="text-[10px] text-[#28C76F] font-semibold block">EST. DELIVERY</span>
                <strong className="text-[#28C76F] font-bold text-xs">24 Hours (Express)</strong>
              </div>
            </div>

            {/* AI Welcome Message */}
            <div className="p-4 rounded-2xl bg-black/80 border border-white/10 text-xs text-neutral-300 text-left space-y-2">
              <div className="flex items-center gap-2 text-[#E5C158] font-bold">
                <Bot className="w-4 h-4 text-[#28C76F]" />
                <span>MFS AI Project Guardian Message:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-neutral-300">
                "Hello <strong className="text-white">{customerName}</strong>! Your Executive Presentation Pitch Deck order has been allocated to Senior Designer Team A. Slide 7/10 formatting has passed automated contrast checks."
              </p>
            </div>

            {/* Continue Button */}
            <button
              onClick={() => {
                setShowFirstLoginModal(false);
                if (onShowToast) onShowToast('Welcome to your MFS Growth AI Dashboard!');
              }}
              className="w-full py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2"
            >
              <span>Explore My Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MAIN DASHBOARD CONTAINER WITH SIDEBAR */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto px-2 sm:px-4 lg:px-6 py-4 gap-4">
        {/* LEFT SIDEBAR (Desktop) */}
        <aside
          className={`hidden md:flex flex-col glass-card rounded-3xl border border-white/10 transition-all duration-300 sticky top-24 h-[calc(100vh-120px)] overflow-y-auto shrink-0 ${
            sidebarCollapsed ? 'w-20 p-3' : 'w-64 p-5'
          }`}
        >
          {/* Sidebar Top / Brand Toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E5C158] to-[#D4AF37] flex items-center justify-center font-bold text-black font-poppins text-xs shadow-md">
                  MFS
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-xs text-white">MFS Growth</h3>
                  <span className="text-[9px] text-[#E5C158] font-semibold uppercase tracking-wider block">
                    Client Portal
                  </span>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer mx-auto"
              title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Menu Links */}
          <nav className="space-y-1 flex-1">
            {sidebarItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer relative group ${
                    isActive
                      ? 'bg-[#E5C158]/15 border border-[#E5C158]/40 text-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.15)]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <IconComp
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#E5C158]' : item.isGlow ? 'text-[#28C76F] animate-pulse' : 'text-neutral-400 group-hover:text-white'
                    }`}
                  />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}

                  {!sidebarCollapsed && item.badge && (
                    <span
                      className={`ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        item.badge.includes('Active')
                          ? 'bg-[#28C76F]/20 text-[#28C76F] border border-[#28C76F]/30'
                          : item.badge.includes('AI')
                          ? 'bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/30'
                          : 'bg-white/10 text-neutral-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer Logout */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                if (onNavigatePage) onNavigatePage('home');
                if (onShowToast) onShowToast('Exited Client Dashboard.');
              }}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Exit Dashboard</span>}
            </button>
          </div>
        </aside>

        {/* MOBILE SIDEBAR DRAWER */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-md flex">
            <div className="w-72 bg-[#0F0F0F] border-r border-white/10 h-full p-5 flex flex-col space-y-4 animate-slideInLeft">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E5C158] text-black font-bold flex items-center justify-center text-xs">
                    MFS
                  </div>
                  <h3 className="font-poppins font-bold text-sm text-white">Client Portal</h3>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-2 rounded-lg bg-white/10 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1 flex-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                  const IconComp = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold ${
                        isActive
                          ? 'bg-[#E5C158]/15 border border-[#E5C158]/40 text-[#E5C158]'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  if (onNavigatePage) onNavigatePage('home');
                }}
                className="w-full py-3 rounded-2xl bg-red-500/10 text-red-400 text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Exit Dashboard</span>
              </button>
            </div>
          </div>
        )}

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 flex flex-col space-y-6 min-w-0">
          
          {/* OFFLINE STATUS RECOVERY BANNER */}
          {isOffline && (
            <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                <span><strong>Offline Mode Active</strong> — Connection lost. Client state cached locally. Reconnecting to MFS Growth cloud...</span>
              </div>
              <button
                onClick={() => {
                  if (navigator.onLine) {
                    setIsOffline(false);
                    if (onShowToast) onShowToast('Reconnected to MFS servers!');
                  } else {
                    if (onShowToast) onShowToast('Still offline. Please check your internet connection.');
                  }
                }}
                className="px-3 py-1 rounded-xl bg-amber-500/30 hover:bg-amber-500/50 text-amber-100 font-bold text-[11px] shrink-0 cursor-pointer"
              >
                Retry Connection
              </button>
            </div>
          )}

          {/* TOP NAVIGATION BAR */}
          <header className="glass-card rounded-2xl border border-white/10 p-3.5 sm:p-4 flex items-center justify-between gap-3 relative z-40">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md hidden sm:block">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects, files, invoices or AI logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-10 pr-8 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Top Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              {/* Live Time Display */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] text-neutral-300 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>{currentTime || 'PKT • 24/7 Active'}</span>
              </div>

              {/* Currency Toggle */}
              {setCurrency && (
                <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-full p-0.5 text-[11px]">
                  <button
                    onClick={() => setCurrency('PKR')}
                    className={`px-2.5 py-1 rounded-full font-bold cursor-pointer transition-all ${
                      currency === 'PKR' ? 'bg-[#E5C158] text-black' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    PKR
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-2.5 py-1 rounded-full font-bold cursor-pointer transition-all ${
                      currency === 'USD' ? 'bg-[#E5C158] text-black' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    USD
                  </button>
                </div>
              )}

              {/* Notification Bell Dropdown Button */}
              <div className="relative z-50">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer relative"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4 text-[#E5C158]" />
                  {notifications.filter((n) => n.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-extrabold flex items-center justify-center animate-bounce">
                      {notifications.filter((n) => n.unread).length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Panel */}
                {showNotifications && (
                  <>
                    {/* Outside Click Backdrop */}
                    <div
                      className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
                      onClick={() => setShowNotifications(false)}
                    />
                    <div className="absolute right-0 mt-2 w-[calc(100vw-2.5rem)] max-w-sm sm:w-96 rounded-2xl glass-card border border-[#E5C158]/30 p-4 z-50 space-y-3 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl bg-[#0b0b0e]/95 text-white animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-[#E5C158]" />
                          <h4 className="font-poppins font-bold text-xs text-white">Priority Notifications</h4>
                        </div>
                        <button
                          onClick={handleMarkAllRead}
                          className="text-[10px] text-[#E5C158] hover:underline font-semibold cursor-pointer"
                        >
                          Mark all read
                        </button>
                      </div>

                      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                        {notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                              n.unread
                                ? 'bg-[#E5C158]/10 border-[#E5C158]/30'
                                : 'bg-white/[0.02] border-white/5 opacity-80'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <strong className="text-white font-semibold text-[11px]">{n.title}</strong>
                              <span className="text-[9px] text-neutral-400">{n.time}</span>
                            </div>
                            <p className="text-[10px] text-neutral-300 leading-relaxed">{n.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* VIP Profile Avatar */}
              <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E5C158] to-[#D4AF37] p-0.5 flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[11px] font-extrabold text-[#E5C158]">
                    SS
                  </div>
                </div>
                <div className="hidden xl:block text-left">
                  <span className="text-xs font-bold text-white block leading-none">{customerName}</span>
                  <span className="text-[9px] text-[#28C76F] font-semibold">VIP Verified Client</span>
                </div>
              </div>
            </div>
          </header>

          {/* FIRST 24 HOURS ONBOARDING BANNER (Previously Approved Feature) */}
          {showOnboardingCard && (
            <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-5 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#E5C158]/20 text-[#E5C158]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-white text-xs sm:text-sm">
                      First 24 Hours Onboarding Guide & Project Journey
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Welcome to your MFS Growth client dashboard! Here are quick tips to maximize your project velocity.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOnboardingCard(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-400 hover:text-white transition-colors"
                  title="Dismiss Onboarding Card"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
                <button
                  onClick={() => setActiveTab('timeline')}
                  className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-left cursor-pointer transition-all"
                >
                  <strong className="text-white block font-semibold">1. Track Progress</strong>
                  <span className="text-[10px] text-neutral-400">View real-time project timeline</span>
                </button>
                <button
                  onClick={() => setActiveTab('files')}
                  className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-left cursor-pointer transition-all"
                >
                  <strong className="text-white block font-semibold">2. Upload Requirements</strong>
                  <span className="text-[10px] text-neutral-400">Add logos, assets, or references</span>
                </button>
                <button
                  onClick={() => onOpenAIChat && onOpenAIChat('chat')}
                  className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-left cursor-pointer transition-all"
                >
                  <strong className="text-white block font-semibold">3. Chat with AI</strong>
                  <span className="text-[10px] text-neutral-400">Request slide adjustments 24/7</span>
                </button>
                <button
                  onClick={() => setActiveTab('invoices')}
                  className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-left cursor-pointer transition-all"
                >
                  <strong className="text-white block font-semibold">4. Download Invoice</strong>
                  <span className="text-[10px] text-neutral-400">Get 50% discount receipt PDF</span>
                </button>
              </div>
            </div>
          )}

          {/* GLOBAL LIVE SEARCH OVERLAY */}
          {searchQuery.trim() !== '' ? (
            <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 space-y-6 bg-black/90 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#E5C158]" />
                  <h2 className="font-poppins font-bold text-white text-base">
                    Search Results for <span className="text-[#E5C158]">"{searchQuery}"</span>
                  </h2>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 text-xs font-semibold cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear Search</span>
                </button>
              </div>

              {/* Matched Items */}
              {(() => {
                const q = searchQuery.toLowerCase();
                const matchedProjects = [
                  { id: 'PRJ-MFS-849201', name: 'Executive Pitch Deck', type: 'Presentation Design', status: 'In Progress (85%)' },
                  { id: 'PRJ-MFS-910283', name: 'ATS Resume Engineering', type: 'Resume & Cover Letter', status: 'Delivered' }
                ].filter(p => p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q));

                const matchedInvoices = [
                  { id: 'INV-849201', title: 'Executive Pitch Deck (50% Off)', amount: 'PKR 2,500 / $18', status: 'Paid' }
                ].filter(i => i.id.toLowerCase().includes(q) || i.title.toLowerCase().includes(q));

                const matchedFiles = [
                  { name: 'Executive_Presentation_Final_v3.pptx', size: '18.4 MB', date: 'Today, 2:45 PM' },
                  { name: 'MFS_Growth_Official_Invoice_INV-849201.pdf', size: '1.2 MB', date: 'Yesterday' }
                ].filter(f => f.name.toLowerCase().includes(q));

                const hasMatches = matchedProjects.length > 0 || matchedInvoices.length > 0 || matchedFiles.length > 0;

                if (!hasMatches) {
                  return (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center mx-auto border border-[#E5C158]/20">
                        <Search className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-poppins font-bold text-white text-base">No Matching Results</h3>
                        <p className="text-neutral-400 text-xs max-w-md mx-auto">
                          We couldn't find any projects, files, or invoices matching "{searchQuery}". Check for typos or ask the MFS AI Assistant.
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <button
                          onClick={() => setSearchQuery('')}
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                        >
                          Clear Search Filter
                        </button>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            handleTabChange('ai_assistant');
                          }}
                          className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer flex items-center gap-1.5"
                        >
                          <Bot className="w-4 h-4 fill-black" />
                          <span>Ask MFS AI Assistant</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="space-y-6">
                    {/* Projects Matches */}
                    {matchedProjects.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-mono text-[#E5C158] uppercase font-bold">Matching Projects</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {matchedProjects.map(p => (
                            <div
                              key={p.id}
                              onClick={() => {
                                setSearchQuery('');
                                handleTabChange('projects');
                              }}
                              className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#E5C158]/50 transition-all cursor-pointer flex items-center justify-between"
                            >
                              <div>
                                <strong className="text-white block text-xs">{p.name}</strong>
                                <span className="text-[10px] text-neutral-400 font-mono">{p.id} • {p.type}</span>
                              </div>
                              <span className="text-[10px] font-bold text-[#28C76F] bg-[#28C76F]/10 px-2 py-0.5 rounded-md border border-[#28C76F]/20">
                                {p.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Invoices Matches */}
                    {matchedInvoices.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-mono text-[#28C76F] uppercase font-bold">Matching Invoices</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {matchedInvoices.map(i => (
                            <div
                              key={i.id}
                              onClick={() => {
                                setSearchQuery('');
                                handleTabChange('invoices');
                              }}
                              className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#28C76F]/50 transition-all cursor-pointer flex items-center justify-between"
                            >
                              <div>
                                <strong className="text-white block text-xs">{i.title}</strong>
                                <span className="text-[10px] text-neutral-400 font-mono">{i.id} • {i.amount}</span>
                              </div>
                              <span className="text-[10px] font-bold text-[#28C76F] bg-[#28C76F]/10 px-2 py-0.5 rounded-md border border-[#28C76F]/20">
                                {i.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Files Matches */}
                    {matchedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-mono text-blue-400 uppercase font-bold">Matching Files</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {matchedFiles.map((f, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setSearchQuery('');
                                handleTabChange('files');
                              }}
                              className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-400/50 transition-all cursor-pointer flex items-center justify-between"
                            >
                              <div>
                                <strong className="text-white block text-xs truncate max-w-[200px]">{f.name}</strong>
                                <span className="text-[10px] text-neutral-400 font-mono">{f.size} • {f.date}</span>
                              </div>
                              <Download className="w-4 h-4 text-blue-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          ) : isTabLoading ? (
            /* TAB LOADING SKELETON STATE */
            <div className="glass-card rounded-3xl border border-white/10 p-8 space-y-6 animate-pulse">
              <div className="h-6 bg-white/10 rounded-xl w-1/3"></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="h-28 bg-white/5 rounded-2xl border border-white/10"></div>
                <div className="h-28 bg-white/5 rounded-2xl border border-white/10"></div>
                <div className="h-28 bg-white/5 rounded-2xl border border-white/10"></div>
              </div>
              <div className="h-40 bg-white/5 rounded-2xl border border-white/10"></div>
            </div>
          ) : (
            /* REGULAR TAB CONTENT */
            <>
              {activeTab === 'dashboard' && (
                <DashboardHome
                  currency={currency}
                  customerName={customerName}
                  customerEmail={customerEmail}
                  clientId={clientId}
                  orders={orders}
                  loadingOrders={loadingOrders}
                  onRefreshOrders={loadClientOrders}
                  onShowToast={onShowToast}
                  onNavigatePage={onNavigatePage}
                  onOpenAIChat={onOpenAIChat}
                  setActiveTab={setActiveTab}
                />
              )}

              {(activeTab === 'projects' || activeTab === 'orders') && (
                <ProjectDetailsCenter
                  currency={currency}
                  customerName={customerName}
                  customerEmail={customerEmail}
                  clientId={clientId}
                  orders={orders}
                  loadingOrders={loadingOrders}
                  onRefreshOrders={loadClientOrders}
                  onShowToast={onShowToast}
                  onNavigatePage={onNavigatePage}
                  onOpenAIChat={onOpenAIChat}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === 'timeline' && (
                <AILiveProjectTracking
                  currency={currency}
                  onShowToast={onShowToast}
                  onNavigatePage={onNavigatePage}
                  onOpenAIChat={onOpenAIChat}
                  setActiveTab={setActiveTab}
                />
              )}

          {activeTab === 'ai_assistant' && (
            <AIAssistantCenter
              currency={currency}
              customerName={customerName}
              customerEmail={customerEmail}
              clientId={clientId}
              onShowToast={onShowToast}
              onNavigatePage={onNavigatePage}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'messages' && (
            <MessagesCommunicationCenter
              currency={currency}
              customerName={customerName}
              customerEmail={customerEmail}
              clientId={clientId}
              onShowToast={onShowToast}
              onNavigatePage={onNavigatePage}
              setActiveTab={setActiveTab}
            />
          )}

          {(activeTab === 'files' || activeTab === 'downloads') && (
            <FilesDocumentsCenter
              currency={currency}
              customerName={customerName}
              customerEmail={customerEmail}
              clientId={clientId}
              onShowToast={onShowToast}
              onNavigatePage={onNavigatePage}
              setActiveTab={setActiveTab}
            />
          )}

          {(activeTab === 'invoices' || activeTab === 'billing' || activeTab === 'payments') && (
            <BillingPaymentsCenter
              currency={currency}
              customerName={customerName}
              customerEmail={customerEmail}
              clientId={clientId}
              onShowToast={onShowToast}
              onNavigatePage={onNavigatePage}
              setActiveTab={setActiveTab}
            />
          )}

          {(activeTab === 'settings' || activeTab === 'profile' || activeTab === 'security' || activeTab === 'account') && (
            <AccountSecurityCenter
              currency={currency}
              customerName={customerName}
              customerEmail={customerEmail}
              clientId={clientId}
              onShowToast={onShowToast}
              onNavigatePage={onNavigatePage}
              setActiveTab={setActiveTab}
            />
          )}

          {(activeTab === 'notifications' || activeTab === 'activity' || activeTab === 'alerts') && (
            <NotificationsActivityCenter
              currency={currency}
              customerName={customerName}
              customerEmail={customerEmail}
              clientId={clientId}
              onShowToast={onShowToast}
              onNavigatePage={onNavigatePage}
              setActiveTab={setActiveTab}
            />
          )}

          {(activeTab === 'analytics' || activeTab === 'insights' || activeTab === 'stats') && (
            <AnalyticsInsightsCenter
              currency={currency}
              customerName={customerName}
              customerEmail={customerEmail}
              clientId={clientId}
              onShowToast={onShowToast}
              onNavigatePage={onNavigatePage}
              setActiveTab={setActiveTab}
            />
          )}

          {(activeTab === 'help' || activeTab === 'support' || activeTab === 'faq' || activeTab === 'kb') && (
            <HelpSupportHub
              currency={currency}
              customerName={customerName}
              customerEmail={customerEmail}
              clientId={clientId}
              onShowToast={onShowToast}
              onNavigatePage={onNavigatePage}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header Banner */}
              <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 sm:p-8 bg-gradient-to-r from-[#E5C158]/10 via-[#0F0F12] to-[#050507] relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>CLIENT MILESTONES & REWARDS</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-poppins font-bold text-white">
                      Your Client Growth Status & Badges
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Earn growth points, unlock priority delivery perks, and access exclusive agency discounts.
                    </p>
                  </div>

                  <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-center min-w-[160px]">
                    <span className="text-2xl font-poppins font-extrabold text-[#E5C158]">850 PTS</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5 font-mono">Silver Growth Tier</span>
                  </div>
                </div>
              </div>

              {/* Tier Progress Bar */}
              <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#E5C158]" />
                    <span>Progress to Gold Tier (1,000 PTS)</span>
                  </span>
                  <span className="text-[#E5C158] font-mono">85% Complete</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden relative p-0.5">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#E5C158] to-[#28C76F] w-[85%] transition-all duration-1000"></div>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Gold Tier unlocks free Express Delivery upgrades (+30% value) on all future presentation and assignment orders.
                </p>
              </div>

              {/* Achievement Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="glass-card rounded-2xl border border-[#E5C158]/30 p-5 space-y-3 bg-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#28C76F] bg-[#28C76F]/10 border border-[#28C76F]/30 px-2.5 py-0.5 rounded-full">
                      UNLOCKED
                    </span>
                  </div>
                  <h3 className="font-poppins font-bold text-white text-sm">First Order Launch</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Successfully placed and confirmed your first project order with MFS Growth Agency.
                  </p>
                  <div className="pt-2 text-[11px] text-[#E5C158] font-mono font-bold">+500 Growth Points</div>
                </div>

                <div className="glass-card rounded-2xl border border-[#E5C158]/30 p-5 space-y-3 bg-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-center text-[#28C76F]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#28C76F] bg-[#28C76F]/10 border border-[#28C76F]/30 px-2.5 py-0.5 rounded-full">
                      UNLOCKED
                    </span>
                  </div>
                  <h3 className="font-poppins font-bold text-white text-sm">Verified Account</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Identity and payment email verified with client portal security system.
                  </p>
                  <div className="pt-2 text-[11px] text-[#28C76F] font-mono font-bold">+250 Growth Points</div>
                </div>

                <div className="glass-card rounded-2xl border border-white/10 p-5 space-y-3 bg-white/[0.01]">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400">
                      <Sparkles className="w-5 h-5 text-[#E5C158]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/30 px-2.5 py-0.5 rounded-full">
                      AVAILABLE
                    </span>
                  </div>
                  <h3 className="font-poppins font-bold text-white text-sm">Review & Feedback Perk</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Submit verified client feedback on Our Reviews page to claim an additional 10% voucher code.
                  </p>
                  <button
                    onClick={() => onNavigatePage && onNavigatePage('reviews')}
                    className="w-full mt-2 py-2 rounded-xl bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] transition-colors cursor-pointer"
                  >
                    Leave Review & Claim Perk
                  </button>
                </div>
              </div>
            </div>
          )}

              {/* Catch-all for remaining sidebar tabs */}
              {!['dashboard', 'projects', 'orders', 'timeline', 'files', 'downloads', 'invoices', 'billing', 'payments', 'achievements', 'ai_assistant', 'messages', 'settings', 'profile', 'security', 'account', 'notifications', 'activity', 'alerts', 'analytics', 'insights', 'stats', 'help', 'support', 'faq', 'kb'].includes(activeTab) && (
                <div className="glass-card rounded-3xl border border-white/10 p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center mx-auto">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h3 className="font-poppins font-bold text-white text-base capitalize">
                    {activeTab.replace('_', ' ')} Workspace
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    Your dedicated section is fully active and synced with MFS AI Assistant.
                  </p>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="px-4 py-2 rounded-full bg-[#E5C158] text-black font-bold text-xs"
                  >
                    Back to Dashboard Overview
                  </button>
                </div>
              )}
            </>
          )}

        </main>
      </div>
    </div>
  );
};
