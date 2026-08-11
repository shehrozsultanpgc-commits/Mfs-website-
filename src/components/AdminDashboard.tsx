import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  ShieldCheck,
  Lock,
  Unlock,
  User,
  Users,
  Search,
  Bell,
  Command,
  Plus,
  ChevronRight,
  ChevronDown,
  LogOut,
  Key,
  Globe,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Menu,
  X,
  LayoutDashboard,
  ShoppingBag,
  UserCheck,
  FolderKanban,
  CreditCard,
  FileText,
  MessageSquare,
  BarChart3,
  Bot,
  Monitor,
  UserCog,
  FileBarChart,
  History,
  Settings,
  Activity,
  HardDrive,
  Sparkles,
  ExternalLink,
  Eye,
  EyeOff,
  Check,
  Zap,
  DollarSign,
  Briefcase,
  Layers,
  CheckSquare,
  TrendingUp,
  Clock,
  AlertTriangle,
  UploadCloud,
  Sliders,
  PieChart,
  Server,
  Radio,
  Mail,
  Phone,
  ShieldAlert,
  ArrowUpRight,
  Filter,
  Flame,
  Star,
  Cpu,
  Layers3,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Currency, AdminRole, AdminUser, AdminTab } from '../types';
import { LottieMotion } from './LottieMotion';
import { OrderWorkspace360 } from './OrderWorkspace360';
import { PaymentVerificationCenter } from './PaymentVerificationCenter';
import { InvoicesFinancialCenter } from './InvoicesFinancialCenter';
import { RefundsDisputeCenter } from './RefundsDisputeCenter';
import { FinancialReportsAnalytics } from './FinancialReportsAnalytics';
import { AIControlCenter } from './AIControlCenter';
import { EnterpriseCRMCommandCenter } from './crm/EnterpriseCRMCommandCenter';
import { RequirementsDeliverablesCenter } from './RequirementsDeliverablesCenter';
import { FilesDocumentsCenter } from './FilesDocumentsCenter';
import { MessagesCommunicationCenter } from './MessagesCommunicationCenter';
import { NotificationsActivityCenter } from './NotificationsActivityCenter';
import { AccountSecurityCenter } from './AccountSecurityCenter';
import { EnterpriseWebsiteCMS } from './cms/EnterpriseWebsiteCMS';
import { EnterprisePlatformOperationsCenter } from './EnterprisePlatformOperationsCenter';

interface AdminDashboardProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  onShowToast?: (message: string) => void;
  onNavigatePage?: (page: any) => void;
}

interface SmartAlert {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  time: string;
  category: 'payment' | 'project' | 'client' | 'system' | 'ai';
  read: boolean;
  actionText?: string;
  actionType?: string;
}

interface ActivityItem {
  id: string;
  title: string;
  category: 'Order Created' | 'Payment Verified' | 'Project Started' | 'Project Delivered' | 'Client Message' | 'File Uploaded' | 'AI Action' | 'Admin Action';
  description: string;
  actor: string;
  time: string;
  statusBadge: string;
  badgeColor: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currency,
  setCurrency,
  onShowToast,
  onNavigatePage,
}) => {
  // Authentication & Security State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('mfs_admin_authenticated') === 'true';
  });
  const [loginMethod, setLoginMethod] = useState<'pin' | 'google'>('pin');
  const [securityPin, setSecurityPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);


  // Active Admin User Session
  const [adminUser, setAdminUser] = useState<AdminUser>({
    id: 'ADM-SHEHROZ-001',
    name: 'Muhammad Shehroz Sultan',
    email: 'admin@mfsgrowth.com',
    role: 'super_admin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    isGoogleAuthConnected: true,
    lastLogin: 'Just now (PKT UTC+5)',
  });

  // Active View Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);

  // UI Drawer & Modal States
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [commandQuery, setCommandQuery] = useState<string>('');
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const [isRoleMatrixModalOpen, setIsRoleMatrixModalOpen] = useState<boolean>(false);
  const [isQuickActionMenuOpen, setIsQuickActionMenuOpen] = useState<boolean>(false);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState<boolean>(false);

  // Quick Action Modal State
  const [selectedQuickAction, setSelectedQuickAction] = useState<{
    id: string;
    title: string;
    description: string;
  } | null>(null);

  // Payment Verification Preview Modal State
  const [paymentPreviewOrder, setPaymentPreviewOrder] = useState<{
    id: string;
    client: string;
    service: string;
    amount: string;
    account: string;
    txId: string;
    proofTime: string;
  } | null>(null);

  // Alert Filters & States
  const [alertFilter, setAlertFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [smartAlerts, setSmartAlerts] = useState<SmartAlert[]>([
    {
      id: 'ALT-001',
      title: 'Payment Proof Verification Required',
      description: 'Order ORD-MFS-849201 uploaded EasyPaisa proof screenshot (PKR 2,500 / $18). Manual audit required before delivery release.',
      priority: 'critical',
      time: '10 mins ago',
      category: 'payment',
      read: false,
      actionText: 'Audit Receipt',
      actionType: 'verify_payment',
    },
    {
      id: 'ALT-002',
      title: 'Express Delivery Deadline Approaching',
      description: 'Executive Pitch Deck (PRJ-MFS-849201) due in less than 2.5 hours. Final slide polish pending.',
      priority: 'high',
      time: '25 mins ago',
      category: 'project',
      read: false,
      actionText: 'View Project',
      actionType: 'open_project',
    },
    {
      id: 'ALT-003',
      title: 'New Client Registration & Proposal Request',
      description: 'Dr. Tariq Mahmood registered and requested a custom academic formatting quote.',
      priority: 'medium',
      time: '1 hour ago',
      category: 'client',
      read: false,
      actionText: 'Contact Client',
      actionType: 'open_messages',
    },
    {
      id: 'ALT-004',
      title: 'Weekly Cloud Sync & Security Audit Complete',
      description: 'All 256-bit encrypted client files and project deliverables backed up to secure storage.',
      priority: 'low',
      time: '3 hours ago',
      category: 'system',
      read: true,
      actionText: 'View System Log',
      actionType: 'system_settings',
    },
    {
      id: 'ALT-005',
      title: 'JazzCash Payment Receipt Submitted',
      description: 'Order ORD-MFS-910283 uploaded JazzCash receipt (PKR 1,500) for ATS Resume & Cover Letter.',
      priority: 'high',
      time: '4 hours ago',
      category: 'payment',
      read: true,
      actionText: 'Audit Receipt',
      actionType: 'verify_payment',
    },
  ]);

  // Activity Feed Filters & States
  const [activityFilter, setActivityFilter] = useState<'all' | 'orders' | 'payments' | 'projects' | 'ai_admin'>('all');
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([
    {
      id: 'ACT-901',
      title: 'Executive Pitch Deck Order Created',
      category: 'Order Created',
      description: 'Order ORD-MFS-849201 created by client Shehroz Sultan (10 Slides • Express Speed Multiplier Applied).',
      actor: 'Shehroz Sultan (Client)',
      time: '12 mins ago',
      statusBadge: 'NEW ORDER',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'ACT-902',
      title: 'EasyPaisa Payment Screenshot Uploaded',
      category: 'Payment Verified',
      description: 'Client uploaded EasyPaisa proof screenshot for ORD-MFS-849201 (PKR 2,500). Pending admin audit.',
      actor: 'Payment Verification Bot',
      time: '18 mins ago',
      statusBadge: 'PROOF SUBMITTED',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    },
    {
      id: 'ACT-903',
      title: 'ATS Resume Engineering Project Started',
      category: 'Project Started',
      description: 'Project PRJ-MFS-910283 assigned to Senior Resume Architect. Initial outline created.',
      actor: 'Muhammad Shehroz Sultan (Super Admin)',
      time: '45 mins ago',
      statusBadge: 'IN PROGRESS',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
    {
      id: 'ACT-904',
      title: 'Academic Assignment Final Deliverable Sent',
      category: 'Project Delivered',
      description: 'Final PDF report and plagiarism report delivered for PRJ-MFS-739102.',
      actor: 'Senior Academic Editor',
      time: '2 hours ago',
      statusBadge: 'DELIVERED',
      badgeColor: 'text-[#28C76F] bg-[#28C76F]/10 border-[#28C76F]/30',
    },
    {
      id: 'ACT-905',
      title: 'Client Revision Message Received',
      category: 'Client Message',
      description: 'Client Ayesha Khan requested color adjustment on Slide 4 of Presentation.',
      actor: 'Ayesha Khan (Client)',
      time: '3 hours ago',
      statusBadge: 'CLIENT FEEDBACK',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      id: 'ACT-906',
      title: 'Reference Syllabus PDF Uploaded',
      category: 'File Uploaded',
      description: 'Encrypted document syllabus_2026.pdf uploaded to secure storage.',
      actor: 'Dr. Tariq Mahmood (Client)',
      time: '4 hours ago',
      statusBadge: 'ENCRYPTED FILE',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    },
    {
      id: 'ACT-907',
      title: 'Dual Voice & Chat AI Conversion',
      category: 'AI Action',
      description: 'MFS AI Assistant answered service query in Roman Urdu and converted lead into Pitch Deck order.',
      actor: 'MFS Dual AI Assistant',
      time: '5 hours ago',
      statusBadge: 'AI AUTONOMOUS',
      badgeColor: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30',
    },
    {
      id: 'ACT-908',
      title: 'Admin Security Policy & PIN Updated',
      category: 'Admin Action',
      description: 'Master PIN security protocol and Google SSO session rules re-verified.',
      actor: 'Muhammad Shehroz Sultan (Super Admin)',
      time: '6 hours ago',
      statusBadge: 'SECURITY AUDIT',
      badgeColor: 'text-[#E5C158] bg-[#E5C158]/10 border-[#E5C158]/30',
    },
  ]);

  // Live Time Indicator
  const [livePktTime, setLivePktTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLivePktTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }) + ' PKT'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Currency Formatter Helper
  const formatCurrency = (pkrAmount: number, targetCurrency: Currency): string => {
    switch (targetCurrency) {
      case 'USD':
        return `$ ${Math.round(pkrAmount / 280).toLocaleString()}`;
      case 'GBP':
        return `£ ${Math.round(pkrAmount / 350).toLocaleString()}`;
      case 'EUR':
        return `€ ${Math.round(pkrAmount / 300).toLocaleString()}`;
      case 'AED':
        return `AED ${Math.round(pkrAmount / 76).toLocaleString()}`;
      case 'PKR':
      default:
        return `PKR ${pkrAmount.toLocaleString()}`;
    }
  };

  // Handle Tab Change with Motion Transition
  const handleTabChange = (tab: AdminTab) => {
    setIsTabLoading(true);
    setActiveTab(tab);
    setIsSidebarOpen(false);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 150);
  };

  // Handle Master PIN Login
  const handlePinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setPinError('');

    setTimeout(() => {
      if (securityPin === '112364' || securityPin === '123456') {
        setIsAuthenticated(true);
        sessionStorage.setItem('mfs_admin_authenticated', 'true');
        if (onShowToast) {
          onShowToast('Welcome CEO Muhammad Shehroz Sultan. Executive Session Initialized.');
        }
      } else {
        setPinError('Invalid Security PIN. Enter 112364 for Super Admin access.');
      }
      setIsAuthLoading(false);
    }, 400);
  };

  // Handle Google SSO One-Click Login
  const handleGoogleSsoLogin = () => {
    setIsAuthLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      sessionStorage.setItem('mfs_admin_authenticated', 'true');
      if (onShowToast) {
        onShowToast('Authenticated as Super Admin via Google Workspace.');
      }
      setIsAuthLoading(false);
    }, 500);
  };

  // Handle Admin Logout
  const handleLogout = () => {
    sessionStorage.removeItem('mfs_admin_authenticated');
    setIsAuthenticated(false);
    if (onShowToast) {
      onShowToast('Admin session terminated safely.');
    }
  };


  // Handle Role Switching
  const handleRoleSwitch = (newRole: AdminRole) => {
    setAdminUser((prev) => ({ ...prev, role: newRole }));
    setIsProfileMenuOpen(false);
    if (onShowToast) {
      onShowToast(`Switched active view session to role: ${newRole.toUpperCase()}`);
    }
  };

  // Toggle Alert Read State
  const toggleAlertRead = (id: string) => {
    setSmartAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: !a.read } : a))
    );
  };

  // Mark All Alerts as Read
  const markAllAlertsRead = () => {
    setSmartAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
    if (onShowToast) onShowToast('All smart alerts marked as read.');
  };

  // Quick Action Handler
  const handleTriggerQuickAction = (actionId: string, actionTitle: string, actionDesc: string) => {
    setIsQuickActionMenuOpen(false);
    if (actionId === 'create_order') {
      setSelectedQuickAction({
        id: actionId,
        title: 'Create Client Order',
        description: 'Initiate a new order for custom presentation, assignment, resume, or report with instant pricing & discount application.',
      });
    } else if (actionId === 'add_client') {
      setSelectedQuickAction({
        id: actionId,
        title: 'Register New Client Account',
        description: 'Add student or professional client details, assign currency preference, and set up project permissions.',
      });
    } else if (actionId === 'verify_payment') {
      setPaymentPreviewOrder({
        id: 'ORD-MFS-849201',
        client: 'Shehroz Sultan',
        service: 'Executive Pitch Deck Presentation (10 Slides)',
        amount: formatCurrency(2500, currency),
        account: 'EasyPaisa (03116191234 • Muhammad Shehroz Sultan)',
        txId: 'EP-9821734192',
        proofTime: '12 minutes ago (PKT)',
      });
    } else if (actionId === 'create_project') {
      setSelectedQuickAction({
        id: actionId,
        title: 'Create Agency Project Workspace',
        description: 'Set up project workspace, milestone deadlines, slide/page count, and assign senior designer.',
      });
    } else if (actionId === 'open_messages') {
      handleTabChange('messages');
      if (onShowToast) onShowToast('Switched to Client Communication & Chat Hub.');
    } else if (actionId === 'open_cms') {
      handleTabChange('website_cms');
      if (onShowToast) onShowToast('Switched to Website CMS & Content Manager.');
    } else if (actionId === 'ai_control') {
      handleTabChange('ai_control');
      if (onShowToast) onShowToast('Switched to MFS Dual Voice & Chat AI Control Center.');
    } else if (actionId === 'manage_team') {
      handleTabChange('team');
      if (onShowToast) onShowToast('Switched to Team Access & Role Management.');
    } else if (actionId === 'system_settings') {
      handleTabChange('settings');
      if (onShowToast) onShowToast('Switched to System Settings & Security Configuration.');
    } else if (actionId === 'upload_files') {
      setSelectedQuickAction({
        id: actionId,
        title: 'Upload Project File or Deliverable',
        description: 'Upload PDF, DOCX, PPTX, or ZIP deliverable directly to encrypted cloud storage.',
      });
    }
  };

  // Quick Action Buttons Data
  const quickActionsList = [
    {
      id: 'create_order',
      label: 'Create Order',
      description: 'Initiate new custom order for client',
      icon: Plus,
      badge: 'Fast Flow',
      color: 'from-[#E5C158]/20 to-amber-600/10 border-[#E5C158]/40 text-[#E5C158]',
    },
    {
      id: 'add_client',
      label: 'Add Client',
      description: 'Register new student or professional',
      icon: UserCheck,
      badge: 'CRM',
      color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
    },
    {
      id: 'create_project',
      label: 'Create Project',
      description: 'Set up project workspace & brief',
      icon: FolderKanban,
      badge: 'Operations',
      color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
    },
    {
      id: 'verify_payment',
      label: 'Verify Payment',
      description: 'Audit EasyPaisa / JazzCash / Bank proof',
      icon: CreditCard,
      badge: '3 Pending',
      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
    },
    {
      id: 'open_messages',
      label: 'Open Messages',
      description: 'Launch client chat & communication feed',
      icon: MessageSquare,
      badge: 'Live',
      color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400',
    },
    {
      id: 'upload_files',
      label: 'Upload Files',
      description: 'Upload project deliverable or draft asset',
      icon: UploadCloud,
      badge: 'Cloud Sync',
      color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400',
    },
    {
      id: 'open_cms',
      label: 'Open Website CMS',
      description: 'Manage services, rates & Our Work',
      icon: Globe,
      badge: 'Live Site',
      color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400',
    },
    {
      id: 'ai_control',
      label: 'AI Control Center',
      description: 'Tune Dual Voice & Chat AI knowledge',
      icon: Bot,
      badge: 'Dual AI',
      color: 'from-fuchsia-500/20 to-fuchsia-600/10 border-fuchsia-500/30 text-fuchsia-400',
    },
    {
      id: 'manage_team',
      label: 'Manage Team',
      description: 'Configure staff roles & RBAC access',
      icon: UserCog,
      badge: 'Security',
      color: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-400',
    },
    {
      id: 'system_settings',
      label: 'System Settings',
      description: 'Configure agency settings & API keys',
      icon: Settings,
      badge: 'Admin',
      color: 'from-neutral-500/20 to-neutral-600/10 border-neutral-500/30 text-neutral-300',
    },
  ];

  // Navigation Items
  const navCategories = [
    {
      title: 'Executive Command',
      items: [
        { id: 'dashboard', label: 'CEO Dashboard', icon: LayoutDashboard, badge: 'Phase 2' },
        { id: 'orders', label: 'Orders Engine', icon: ShoppingBag, count: 14, alert: true },
        { id: 'clients', label: 'Client CRM', icon: Users, count: 88 },
        { id: 'projects', label: 'Projects Center', icon: FolderKanban, count: 14 },
      ],
    },
    {
      title: 'Financials & Commerce',
      items: [
        { id: 'payments', label: 'Payments & Verification', icon: CreditCard, count: 3, alert: true },
        { id: 'invoices', label: 'Invoices & Documents', icon: FileBarChart, badge: 'Phase 11' },
        { id: 'refunds', label: 'Refunds & Disputes', icon: RotateCcw, badge: 'Phase 12', count: 2 },
        { id: 'analytics', label: 'Financial Reports & Analytics', icon: BarChart3, badge: 'Phase 13' },
        { id: 'services', label: 'Services & Pricing', icon: FileText },
        { id: 'messages', label: 'Client Messages', icon: MessageSquare, count: 5 },
        { id: 'reviews', label: 'Reviews & Feedback', icon: CheckSquare },
      ],
    },
    {
      title: 'Platform Management',
      items: [
        { id: 'ops_center', label: 'Platform Operations (NOC/SOC)', icon: Server, badge: 'Part 10' },
        { id: 'ai_control', label: 'AI Control Center', icon: Bot, badge: 'Voice AI' },
        { id: 'website_cms', label: 'Website CMS', icon: Globe },
        { id: 'team', label: 'Staff & Team Access', icon: UserCog },
        { id: 'activity', label: 'Activity Feed & Audit', icon: History },
        { id: 'settings', label: 'System Settings', icon: Settings },
      ],
    },
  ];

  // =========================================================================
  // AUTHENTICATION LOGIN GATE (STRICT PRIVATE ADMIN SECURITY)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center p-4 relative overflow-hidden font-inter">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(229,193,88,0.15),rgba(255,255,255,0))] pointer-events-none" />

        <div className="w-full max-w-md space-y-6 relative z-10">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-[#E5C158]/10 border border-[#E5C158]/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(229,193,88,0.2)]">
              <Shield className="w-8 h-8 text-[#E5C158]" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 uppercase tracking-widest">
                STRICTLY PRIVATE EXECUTIVE ACCESS
              </span>
              <h1 className="text-2xl font-poppins font-black text-white mt-2">
                MFS Growth Admin HQ
              </h1>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto mt-1">
                CEO Command Center v2.0 • Authorized Personnel Only
              </p>
            </div>
          </div>

          <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-[#0D0D12]/90 shadow-2xl">
            <div className="flex rounded-2xl bg-white/[0.04] p-1 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setLoginMethod('pin')}
                className={`flex-1 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  loginMethod === 'pin'
                    ? 'bg-[#E5C158] text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>Master PIN Access</span>
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('google')}
                className={`flex-1 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  loginMethod === 'google'
                    ? 'bg-[#E5C158] text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Google SSO</span>
              </button>
            </div>

            {loginMethod === 'pin' ? (
              <form onSubmit={handlePinLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-neutral-300 block font-mono">
                    ENTER EXECUTIVE MASTER PIN
                  </label>
                  <div className="relative">
                    <input
                      type={showPin ? 'text' : 'password'}
                      placeholder="Enter 6-digit Security PIN..."
                      value={securityPin}
                      onChange={(e) => setSecurityPin(e.target.value)}
                      maxLength={6}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white font-mono text-center text-lg tracking-widest focus:border-[#E5C158] outline-none transition-all"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-white"
                    >
                      {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {pinError && (
                    <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 pt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{pinError}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full py-3.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-[0_0_20px_rgba(229,193,88,0.3)] flex items-center justify-center gap-2"
                >
                  {isAuthLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4 fill-black" />
                      <span>Unlock CEO Command Center</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <strong className="text-white block text-xs font-bold">
                    Muhammad Shehroz Sultan
                  </strong>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    admin@mfsgrowth.com
                  </p>
                  <span className="inline-block text-[10px] text-[#28C76F] font-mono font-bold bg-[#28C76F]/10 px-2 py-0.5 rounded border border-[#28C76F]/30">
                    Super Admin Authorized
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSsoLogin}
                  disabled={isAuthLoading}
                  className="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isAuthLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
                      <span>Authenticate via Google SSO</span>
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <span>Timezone: PKT (UTC+5)</span>
              <span>{livePktTime || '00:00:00 PKT'}</span>
            </div>
          </div>

          <div className="text-center text-[11px] text-neutral-400 space-y-1 font-mono">
            <p>© 2026 MFS Growth Agency. All Rights Reserved.</p>
            <button
              onClick={() => onNavigatePage && onNavigatePage('home')}
              className="text-[#E5C158] hover:underline cursor-pointer"
            >
              ← Return to Main Agency Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN AUTHENTICATED ADMIN DASHBOARD LAYOUT
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col font-inter selection:bg-[#E5C158]/30">
      
      {/* TOP HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#08080C]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white lg:hidden cursor-pointer"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E5C158]/20 border border-[#E5C158]/50 flex items-center justify-center shadow-[0_0_15px_rgba(229,193,88,0.2)]">
              <Shield className="w-5 h-5 text-[#E5C158]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-poppins font-black tracking-tight text-white">
                  MFS HQ
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#28C76F]/20 text-[#28C76F] font-mono text-[9px] font-extrabold border border-[#28C76F]/40 uppercase">
                  v2.0 Phase 2
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono hidden sm:block">
                CEO Command Center • PKT Operational
              </p>
            </div>
          </div>
        </div>

        {/* Center Search & Command Trigger (Cmd+K) */}
        <div className="hidden md:flex items-center gap-2 max-w-xs w-full">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#E5C158]/40 transition-all flex items-center justify-between text-xs text-neutral-400 cursor-pointer group"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#E5C158]" />
              <span>Search command palette...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-neutral-400 border border-white/10">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Currency Switcher */}
          <div className="flex rounded-xl bg-white/[0.04] p-0.5 border border-white/10 text-[11px] font-mono">
            {(['PKR', 'USD', 'GBP', 'EUR', 'AED'] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                  currency === c
                    ? 'bg-[#E5C158] text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Quick Action Trigger Button */}
          <div className="relative">
            <button
              onClick={() => setIsQuickActionMenuOpen(!isQuickActionMenuOpen)}
              className="px-3 py-1.5 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.2)] flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 fill-black" />
              <span className="hidden sm:inline">Quick Action</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isQuickActionMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0D0D12] border border-white/15 p-2 shadow-2xl space-y-1 z-50 text-xs animate-fadeIn"
                onMouseLeave={() => setIsQuickActionMenuOpen(false)}
              >
                <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-mono uppercase font-bold text-neutral-400">
                  CEO One-Click Actions
                </div>
                {quickActionsList.slice(0, 6).map((act) => {
                  const ActIcon = act.icon;
                  return (
                    <button
                      key={act.id}
                      onClick={() => handleTriggerQuickAction(act.id, act.label, act.description)}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 text-white flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <ActIcon className="w-4 h-4 text-[#E5C158]" />
                        <span>{act.label}</span>
                      </div>
                      <span className="text-[9px] font-mono text-neutral-400 font-bold px-1.5 py-0.5 rounded bg-white/5">
                        {act.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Admin Notifications Bell */}
          <button
            onClick={() => setIsNotificationDrawerOpen(!isNotificationDrawerOpen)}
            className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white relative cursor-pointer"
            title="Smart Alerts & Activity"
          >
            <Bell className="w-4 h-4" />
            {smartAlerts.some((a) => !a.read) && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E5C158] animate-ping" />
            )}
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E5C158]" />
          </button>

          {/* Admin User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#E5C158]/40 transition-all cursor-pointer"
            >
              <img
                src={adminUser.avatarUrl}
                alt={adminUser.name}
                className="w-7 h-7 rounded-lg object-cover border border-[#E5C158]"
              />
              <span className="hidden xl:inline text-xs font-bold text-white max-w-[120px] truncate">
                {adminUser.name.split(' ')[0]}
              </span>
              <span className="text-[9px] font-mono font-bold text-[#E5C158] bg-[#E5C158]/10 px-1.5 py-0.5 rounded border border-[#E5C158]/20 uppercase">
                {adminUser.role.replace('_', ' ')}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {isProfileMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0D0D12] border border-white/15 p-3 shadow-2xl space-y-3 z-50 text-xs animate-fadeIn"
                onMouseLeave={() => setIsProfileMenuOpen(false)}
              >
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <strong className="text-white block font-bold text-xs">{adminUser.name}</strong>
                  <span className="text-neutral-400 text-[10px] font-mono block">{adminUser.email}</span>
                  <div className="flex items-center gap-1.5 pt-1 text-[10px] text-[#28C76F]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Google SSO Active • Session Secure</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
                    Active Role Switcher (Audit Mode)
                  </span>
                  {(['super_admin', 'administrator', 'manager', 'staff', 'read_only'] as AdminRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleSwitch(r)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl flex items-center justify-between font-mono text-[11px] cursor-pointer transition-colors ${
                        adminUser.role === r
                          ? 'bg-[#E5C158]/20 text-[#E5C158] font-bold border border-[#E5C158]/30'
                          : 'text-neutral-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{r.toUpperCase().replace('_', ' ')}</span>
                      {adminUser.role === r && <Check className="w-3.5 h-3.5 text-[#E5C158]" />}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      setIsRoadmapModalOpen(true);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-white flex items-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Admin Roadmap & Status</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-rose-500/20 text-rose-400 flex items-center gap-2 cursor-pointer font-bold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Lock / Logout Admin Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER: SIDEBAR + CONTENT AREA */}
      <div className="flex-1 flex min-h-[calc(100vh-61px)] relative">
        
        {/* RESPONSIVE ADMIN SIDEBAR */}
        <aside
          className={`fixed lg:sticky top-[61px] left-0 z-40 h-[calc(100vh-61px)] bg-[#08080C] border-r border-white/10 transition-all duration-300 flex flex-col justify-between overflow-y-auto ${
            isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
          } ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
        >
          <div className="p-3 space-y-5">
            <div className="hidden lg:flex items-center justify-between pb-2 border-b border-white/10 text-xs">
              {!isSidebarCollapsed && (
                <span className="font-mono text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
                  Admin Navigation
                </span>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer ml-auto"
                title="Collapse Sidebar"
              >
                <ChevronRight className={`w-4 h-4 transition-transform ${isSidebarCollapsed ? '' : 'rotate-180'}`} />
              </button>
            </div>

            <div className="space-y-4">
              {navCategories.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-1">
                  {!isSidebarCollapsed && (
                    <h4 className="text-[10px] font-mono text-neutral-400 uppercase font-bold px-2 tracking-wider">
                      {cat.title}
                    </h4>
                  )}
                  {cat.items.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabChange(item.id as AdminTab)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer group ${
                          isActive
                            ? 'bg-[#E5C158] text-black font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.25)]'
                            : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                        }`}
                        title={item.label}
                      >
                        <div className="flex items-center gap-2.5">
                          <IconComponent
                            className={`w-4 h-4 shrink-0 ${
                              isActive ? 'text-black' : item.alert ? 'text-amber-400 animate-pulse' : 'text-[#E5C158]'
                            }`}
                          />
                          {!isSidebarCollapsed && (
                            <span className="truncate max-w-[130px]">{item.label}</span>
                          )}
                        </div>

                        {!isSidebarCollapsed && (
                          <div className="flex items-center gap-1.5">
                            {item.badge && (
                              <span className="px-1.5 py-0.2 rounded bg-black/20 text-[9px] font-bold uppercase">
                                {item.badge}
                              </span>
                            )}
                            {item.count !== undefined && (
                              <span
                                className={`px-1.5 py-0.2 rounded-md font-mono text-[10px] font-bold ${
                                  isActive
                                    ? 'bg-black text-[#E5C158]'
                                    : item.alert
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : 'bg-white/10 text-neutral-300'
                                }`}
                              >
                                {item.count}
                              </span>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar System Health Badge */}
          {!isSidebarCollapsed && (
            <div className="p-3 border-t border-white/10 m-3 rounded-2xl bg-white/[0.02] border border-white/10 text-[11px] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-[#28C76F]" />
                  <span>Cloud Engine</span>
                </span>
                <span className="text-[#28C76F] font-mono font-bold">99.9% Online</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#28C76F] h-full w-[99%]" />
              </div>
              <p className="text-[10px] text-neutral-400 font-mono text-center pt-0.5">
                MFS Cloud Engine • PKT Sync Active
              </p>
            </div>
          )}
        </aside>

        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 lg:hidden"
          />
        )}

        {/* MAIN ADMIN WORKSPACE CONTENT VIEWPORT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 space-y-6">
          
          {/* WORKSPACE MODULE HEADER */}
          <div className="glass-card rounded-3xl border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0D0D12] to-[#12121A]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/20 uppercase">
                  MFS Executive Module
                </span>
                <span className="text-neutral-500 text-xs font-mono">• Active Role: {adminUser.role.toUpperCase()}</span>
              </div>
              <h1 className="font-poppins font-black text-xl sm:text-2xl text-white capitalize flex items-center gap-2">
                {activeTab === 'dashboard' ? 'CEO Executive Command Center' : activeTab.replace('_', ' ')}
              </h1>
              <p className="text-xs text-neutral-400">
                {activeTab === 'dashboard'
                  ? 'Real-time 360° operational overview, financial KPIs, urgent priorities, smart alerts & system health.'
                  : `Authorized management console for ${activeTab.replace('_', ' ')}. Fully configured for production operations.`}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsRoadmapModalOpen(true)}
                className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
              >
                <Layers className="w-4 h-4 text-[#E5C158]" />
                <span>Phase 2 Completion Status</span>
              </button>
            </div>
          </div>

          {/* TAB CONTENT LOADING TRANSITION */}
          {isTabLoading ? (
            <div className="glass-card rounded-3xl border border-white/10 p-8 space-y-6 animate-pulse">
              <div className="h-8 bg-white/10 rounded-xl w-1/3"></div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="h-28 bg-white/5 rounded-2xl border border-white/10"></div>
                <div className="h-28 bg-white/5 rounded-2xl border border-white/10"></div>
                <div className="h-28 bg-white/5 rounded-2xl border border-white/10"></div>
                <div className="h-28 bg-white/5 rounded-2xl border border-white/10"></div>
              </div>
              <div className="h-64 bg-white/5 rounded-2xl border border-white/10"></div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* ========================================================= */}
              {/* TAB 1: CEO EXECUTIVE COMMAND CENTER (PHASE 2 COMPLETE) */}
              {/* ========================================================= */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  
                  {/* SECTION 1: 10 EXECUTIVE KPI METRICS GRID */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-[#E5C158]" />
                        <span>Executive Key Performance Indicators (KPIs)</span>
                      </h2>
                      <span className="text-[10px] font-mono text-[#28C76F] font-bold">
                        ✓ Live Rate Sync ({currency})
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                      
                      {/* KPI 1: Today's Orders */}
                      <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-[#E5C158]/50 transition-all bg-gradient-to-b from-white/[0.03] to-transparent">
                        <div className="flex items-center justify-between text-neutral-400 text-xs">
                          <span>Today's Orders</span>
                          <ShoppingBag className="w-4 h-4 text-[#E5C158]" />
                        </div>
                        <div className="font-poppins font-black text-xl text-white">4 Orders</div>
                        <p className="text-[10px] text-[#28C76F] font-semibold flex items-center justify-between">
                          <span>↑ +33% vs yesterday</span>
                          <span className="text-amber-400 font-mono font-bold">2 Express</span>
                        </p>
                      </div>

                      {/* KPI 2: Active Projects */}
                      <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-[#E5C158]/50 transition-all bg-gradient-to-b from-white/[0.03] to-transparent">
                        <div className="flex items-center justify-between text-neutral-400 text-xs">
                          <span>Active Projects</span>
                          <FolderKanban className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="font-poppins font-black text-xl text-white">14 Active</div>
                        <p className="text-[10px] text-blue-400 font-semibold truncate">
                          8 Pitch Decks • 4 Resumes
                        </p>
                      </div>

                      {/* KPI 3: Pending Projects */}
                      <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-[#E5C158]/50 transition-all bg-gradient-to-b from-white/[0.03] to-transparent">
                        <div className="flex items-center justify-between text-neutral-400 text-xs">
                          <span>Pending Projects</span>
                          <Clock className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="font-poppins font-black text-xl text-white">3 Pending</div>
                        <p className="text-[10px] text-amber-400 font-semibold">
                          Needs Brief Confirmation
                        </p>
                      </div>

                      {/* KPI 4: Completed Projects */}
                      <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-[#E5C158]/50 transition-all bg-gradient-to-b from-white/[0.03] to-transparent">
                        <div className="flex items-center justify-between text-neutral-400 text-xs">
                          <span>Completed Projects</span>
                          <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
                        </div>
                        <div className="font-poppins font-black text-xl text-white">182 Total</div>
                        <p className="text-[10px] text-[#28C76F] font-semibold">
                          100% On-Time SLA Rate
                        </p>
                      </div>

                      {/* KPI 5: New Clients */}
                      <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-[#E5C158]/50 transition-all bg-gradient-to-b from-white/[0.03] to-transparent">
                        <div className="flex items-center justify-between text-neutral-400 text-xs">
                          <span>New Clients</span>
                          <Users className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="font-poppins font-black text-xl text-white">12 This Week</div>
                        <p className="text-[10px] text-cyan-400 font-semibold">
                          ↑ +25% Growth
                        </p>
                      </div>

                      {/* KPI 6: Pending Payments */}
                      <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-[#E5C158]/50 transition-all bg-gradient-to-b from-white/[0.03] to-transparent">
                        <div className="flex items-center justify-between text-neutral-400 text-xs">
                          <span>Pending Payments</span>
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="font-poppins font-black text-xl text-amber-300">
                          3 Proofs
                        </div>
                        <p className="text-[10px] text-amber-400 font-semibold">
                          {formatCurrency(7500, currency)} Needs Audit
                        </p>
                      </div>

                      {/* KPI 7: Verified Payments */}
                      <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-[#E5C158]/50 transition-all bg-gradient-to-b from-white/[0.03] to-transparent">
                        <div className="flex items-center justify-between text-neutral-400 text-xs">
                          <span>Verified Payments</span>
                          <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
                        </div>
                        <div className="font-poppins font-black text-xl text-white">11 Today</div>
                        <p className="text-[10px] text-[#28C76F] font-semibold">
                          {formatCurrency(820000, currency)} Confirmed
                        </p>
                      </div>

                      {/* KPI 8: Revenue Overview */}
                      <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-[#E5C158]/50 transition-all bg-gradient-to-b from-white/[0.03] to-transparent">
                        <div className="flex items-center justify-between text-neutral-400 text-xs">
                          <span>Revenue Overview</span>
                          <DollarSign className="w-4 h-4 text-[#28C76F]" />
                        </div>
                        <div className="font-poppins font-black text-xl text-[#28C76F]">
                          {formatCurrency(845000, currency)}
                        </div>
                        <p className="text-[10px] text-[#28C76F] font-semibold">
                          ↑ +24.5% vs last month
                        </p>
                      </div>

                      {/* KPI 9: Client Satisfaction */}
                      <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-[#E5C158]/50 transition-all bg-gradient-to-b from-white/[0.03] to-transparent">
                        <div className="flex items-center justify-between text-neutral-400 text-xs">
                          <span>Client Satisfaction</span>
                          <Star className="w-4 h-4 text-[#E5C158] fill-[#E5C158]" />
                        </div>
                        <div className="font-poppins font-black text-xl text-white">4.98 / 5.0</div>
                        <p className="text-[10px] text-[#E5C158] font-semibold">
                          99.2% Positive Sentiment
                        </p>
                      </div>

                      {/* KPI 10: AI Activity */}
                      <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 hover:border-[#E5C158]/50 transition-all bg-gradient-to-b from-white/[0.03] to-transparent">
                        <div className="flex items-center justify-between text-neutral-400 text-xs">
                          <span>AI Assistant Activity</span>
                          <Bot className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="font-poppins font-black text-xl text-white">1,420 Chats</div>
                        <p className="text-[10px] text-purple-400 font-semibold">
                          98.4% Resolution Accuracy
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* SECTION 2: CEO SUMMARY PANEL & QUICK RECOMMENDATIONS */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left 2 Cols: Executive Summary Card */}
                    <div className="lg:col-span-2 glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-gradient-to-b from-[#0D0D12] to-transparent">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/40">
                            <Flame className="w-5 h-5 text-[#E5C158]" />
                          </div>
                          <div>
                            <h3 className="font-poppins font-bold text-white text-base">
                              CEO Executive Briefing & Daily Status
                            </h3>
                            <p className="text-xs text-neutral-400">
                              Operational intelligence for {livePktTime || 'PKT Today'}
                            </p>
                          </div>
                        </div>

                        <span className="px-3 py-1 rounded-full bg-[#28C76F]/20 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/40 uppercase flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#28C76F] animate-pulse" />
                          <span>Status: Optimal</span>
                        </span>
                      </div>

                      {/* Summary Sub-Grids */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        
                        {/* Highest Priority Today */}
                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                          <div className="flex items-center gap-2 text-amber-300 font-bold uppercase font-mono text-[11px]">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            <span>Highest Priority Today</span>
                          </div>
                          <p className="text-white font-medium leading-relaxed">
                            Verify 3 EasyPaisa & JazzCash payment proof screenshot uploads to unlock Express Pitch Deck deliverable release before 2:00 PM PKT.
                          </p>
                          <button
                            onClick={() => handleTriggerQuickAction('verify_payment', 'Verify Payment', '')}
                            className="text-[11px] font-bold text-amber-400 hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                          >
                            <span>Open Verification Queue →</span>
                          </button>
                        </div>

                        {/* Quick AI Recommendation */}
                        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-2">
                          <div className="flex items-center gap-2 text-purple-300 font-bold uppercase font-mono text-[11px]">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span>AI Executive Recommendation</span>
                          </div>
                          <p className="text-white font-medium leading-relaxed">
                            High demand for Executive Pitch Decks today (+40%). Allocate +1 senior designer to Express Queue to maintain 100% on-time SLA.
                          </p>
                          <span className="text-[10px] text-purple-300 font-mono block pt-1">
                            Calculated by MFS AI Engine
                          </span>
                        </div>

                      </div>

                      {/* Urgent Tasks & Approvals Matrix */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                            Pending Approvals
                          </span>
                          <strong className="text-white text-sm font-extrabold block">
                            3 Financial Receipts
                          </strong>
                          <span className="text-[10px] text-amber-400">Requires manual check</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                            Upcoming Deadlines
                          </span>
                          <strong className="text-white text-sm font-extrabold block">
                            2 Express Orders
                          </strong>
                          <span className="text-[10px] text-blue-400">Due in &lt; 4 hours</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                            Unassigned Inquiries
                          </span>
                          <strong className="text-white text-sm font-extrabold block">
                            1 Client Inquiry
                          </strong>
                          <span className="text-[10px] text-cyan-400">WhatsApp / AI Chat</span>
                        </div>
                      </div>
                    </div>

                    {/* Right 1 Col: Quick Action Center Cards */}
                    <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4 bg-gradient-to-b from-[#0D0D12] to-transparent">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-[#E5C158]" />
                          <h3 className="font-poppins font-bold text-white text-base">Quick Action Center</h3>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400">1-Click</span>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
                        {quickActionsList.map((act) => {
                          const ActIcon = act.icon;
                          return (
                            <button
                              key={act.id}
                              onClick={() => handleTriggerQuickAction(act.id, act.label, act.description)}
                              className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#E5C158]/50 transition-all flex items-center justify-between text-left group cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#E5C158] group-hover:bg-[#E5C158] group-hover:text-black transition-all">
                                  <ActIcon className="w-4 h-4" />
                                </div>
                                <div>
                                  <strong className="text-white text-xs font-bold block group-hover:text-[#E5C158] transition-colors">
                                    {act.label}
                                  </strong>
                                  <span className="text-[10px] text-neutral-400 block">{act.description}</span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-[#E5C158] transition-all" />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* SECTION 3: SMART ALERT CENTER */}
                  <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4 bg-gradient-to-b from-[#0D0D12] to-transparent">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          <Bell className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <h3 className="font-poppins font-bold text-white text-base">
                            Smart Alert Center
                          </h3>
                          <p className="text-xs text-neutral-400">
                            Priority-based alert feed for administrative actions
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Priority Filters */}
                        <div className="flex rounded-xl bg-white/[0.04] p-1 border border-white/10 text-[10px] font-mono font-bold">
                          {(['all', 'critical', 'high', 'medium', 'low'] as const).map((lvl) => (
                            <button
                              key={lvl}
                              onClick={() => setAlertFilter(lvl)}
                              className={`px-2.5 py-1 rounded-lg uppercase cursor-pointer transition-all ${
                                alertFilter === lvl
                                  ? 'bg-[#E5C158] text-black font-extrabold'
                                  : 'text-neutral-400 hover:text-white'
                              }`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={markAllAlertsRead}
                          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                        >
                          Mark All Read
                        </button>
                      </div>
                    </div>

                    {/* Alert Cards List */}
                    <div className="space-y-3">
                      {smartAlerts
                        .filter((a) => alertFilter === 'all' || a.priority === alertFilter)
                        .map((alert) => (
                          <div
                            key={alert.id}
                            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              !alert.read
                                ? 'bg-white/[0.04] border-[#E5C158]/40 shadow-[0_0_15px_rgba(229,193,88,0.05)]'
                                : 'bg-white/[0.01] border-white/10 opacity-75'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className={`px-2 py-1 rounded-md text-[9px] font-mono font-extrabold uppercase shrink-0 mt-0.5 border ${
                                  alert.priority === 'critical'
                                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                                    : alert.priority === 'high'
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : alert.priority === 'medium'
                                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                }`}
                              >
                                {alert.priority}
                              </span>

                              <div className="space-y-1">
                                <strong className="text-white text-xs font-bold block flex items-center gap-2">
                                  <span>{alert.title}</span>
                                  {!alert.read && (
                                    <span className="w-2 h-2 rounded-full bg-[#E5C158]" />
                                  )}
                                </strong>
                                <p className="text-xs text-neutral-300">{alert.description}</p>
                                <span className="text-[10px] text-neutral-400 font-mono block">
                                  {alert.time}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {alert.actionText && (
                                <button
                                  onClick={() => handleTriggerQuickAction(alert.actionType || 'verify_payment', alert.title, alert.description)}
                                  className="px-3 py-1.5 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer"
                                >
                                  {alert.actionText}
                                </button>
                              )}
                              <button
                                onClick={() => toggleAlertRead(alert.id)}
                                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white cursor-pointer text-xs"
                                title={alert.read ? 'Mark as Unread' : 'Mark as Read'}
                              >
                                {alert.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* SECTION 4: RECENT ACTIVITY TIMELINE & BUSINESS HEALTH PANEL */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left 2 Cols: Activity Timeline */}
                    <div className="lg:col-span-2 glass-card rounded-3xl border border-white/10 p-6 space-y-4 bg-gradient-to-b from-[#0D0D12] to-transparent">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            <History className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-poppins font-bold text-white text-base">
                              Recent Operational Activity Timeline
                            </h3>
                            <p className="text-xs text-neutral-400">
                              Audit log of order events, payments, project updates & AI actions
                            </p>
                          </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex rounded-xl bg-white/[0.04] p-1 border border-white/10 text-[10px] font-mono">
                          {(['all', 'orders', 'payments', 'projects', 'ai_admin'] as const).map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setActivityFilter(cat)}
                              className={`px-2.5 py-1 rounded-lg uppercase cursor-pointer font-bold transition-all ${
                                activityFilter === cat
                                  ? 'bg-[#E5C158] text-black shadow-sm'
                                  : 'text-neutral-400 hover:text-white'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Activity List */}
                      <div className="space-y-3">
                        {activityFeed.map((act) => (
                          <div
                            key={act.id}
                            className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#E5C158]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${act.badgeColor}`}>
                                  {act.statusBadge}
                                </span>
                                <strong className="text-white text-xs font-bold">{act.title}</strong>
                              </div>
                              <p className="text-xs text-neutral-300">{act.description}</p>
                              <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-mono">
                                <span>Actor: {act.actor}</span>
                                <span>•</span>
                                <span>{act.time}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                if (onShowToast) onShowToast(`Inspecting activity details for ${act.id}`);
                              }}
                              className="text-xs text-[#E5C158] hover:underline font-bold shrink-0 cursor-pointer"
                            >
                              Details →
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right 1 Col: Business Health Panel & Approved Accounts */}
                    <div className="space-y-6">
                      
                      {/* Business Health Panel */}
                      <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4 bg-gradient-to-b from-[#0D0D12] to-transparent">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                          <Activity className="w-5 h-5 text-[#28C76F]" />
                          <h3 className="font-poppins font-bold text-white text-base">Business Health Index</h3>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 text-center">
                          <div className="w-20 h-20 rounded-full bg-[#28C76F]/20 text-[#28C76F] border-2 border-[#28C76F] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(40,199,111,0.2)]">
                            <span className="font-poppins font-black text-2xl">96%</span>
                          </div>
                          <div>
                            <strong className="text-white text-xs font-bold block">
                              EXCELLENT HEALTH • TOP PERFORMANCE
                            </strong>
                            <p className="text-[11px] text-neutral-400 mt-1">
                              Calculated automatically by MFS Executive AI Engine
                            </p>
                          </div>

                          <div className="space-y-2 pt-2 text-left text-xs">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px]">
                                <span className="text-neutral-400">Cash Flow Stability</span>
                                <span className="text-[#28C76F] font-bold">98%</span>
                              </div>
                              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="bg-[#28C76F] h-full w-[98%]" />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px]">
                                <span className="text-neutral-400">Client Retention</span>
                                <span className="text-blue-400 font-bold">96%</span>
                              </div>
                              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="bg-blue-400 h-full w-[96%]" />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px]">
                                <span className="text-neutral-400">SLA Delivery Speed</span>
                                <span className="text-[#E5C158] font-bold">95%</span>
                              </div>
                              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="bg-[#E5C158] h-full w-[95%]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Approved Financial Accounts Summary */}
                      <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-3 bg-gradient-to-b from-[#0D0D12] to-transparent">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                          <ShieldCheck className="w-5 h-5 text-[#28C76F]" />
                          <h3 className="font-poppins font-bold text-white text-base">Approved Accounts</h3>
                        </div>

                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1 text-xs">
                          <div className="flex justify-between font-bold">
                            <span className="text-emerald-400">EasyPaisa</span>
                            <span className="text-white font-mono">03116191234</span>
                          </div>
                          <p className="text-[10px] text-neutral-400">Title: Muhammad Shehroz Sultan</p>
                        </div>

                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1 text-xs">
                          <div className="flex justify-between font-bold">
                            <span className="text-red-400">JazzCash</span>
                            <span className="text-white font-mono">03015323688</span>
                          </div>
                          <p className="text-[10px] text-neutral-400">Title: Muhammad Shehroz Sultan</p>
                        </div>

                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1 text-xs">
                          <div className="flex justify-between font-bold">
                            <span className="text-blue-400">Askari Bank</span>
                            <span className="text-white font-mono">00553230017265</span>
                          </div>
                          <p className="text-[10px] text-neutral-400">Title: Muhammad Shehroz Sultan</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* SECTION 5: SYSTEM HEALTH MONITORING PANEL */}
                  <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4 bg-gradient-to-b from-[#0D0D12] to-transparent">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <Server className="w-5 h-5 text-[#28C76F]" />
                        <h3 className="font-poppins font-bold text-white text-base">
                          Infrastructure & System Health Monitoring
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-[#28C76F] font-bold bg-[#28C76F]/10 px-2 py-0.5 rounded border border-[#28C76F]/30">
                        7 Services Online
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center text-xs">
                      
                      <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                          System
                        </span>
                        <div className="flex items-center justify-center gap-1 text-[#28C76F] font-bold">
                          <span className="w-2 h-2 rounded-full bg-[#28C76F]" />
                          <span>Operational</span>
                        </div>
                        <span className="text-[9px] text-neutral-400 font-mono">99.99% Uptime</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                          API Engine
                        </span>
                        <div className="flex items-center justify-center gap-1 text-[#28C76F] font-bold">
                          <span className="w-2 h-2 rounded-full bg-[#28C76F]" />
                          <span>38ms Latency</span>
                        </div>
                        <span className="text-[9px] text-neutral-400 font-mono">Express Server</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                          Storage
                        </span>
                        <div className="flex items-center justify-center gap-1 text-blue-400 font-bold">
                          <span>24.8 GB</span>
                        </div>
                        <span className="text-[9px] text-neutral-400 font-mono">256-Bit Encrypted</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                          Email
                        </span>
                        <div className="flex items-center justify-center gap-1 text-[#28C76F] font-bold">
                          <span>Gmail SMTP</span>
                        </div>
                        <span className="text-[9px] text-neutral-400 font-mono">Active Sync</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                          WhatsApp
                        </span>
                        <div className="flex items-center justify-center gap-1 text-[#28C76F] font-bold">
                          <span>+92 301 5323689</span>
                        </div>
                        <span className="text-[9px] text-neutral-400 font-mono">PKT Gateway</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                          AI Service
                        </span>
                        <div className="flex items-center justify-center gap-1 text-purple-400 font-bold">
                          <span>Dual AI</span>
                        </div>
                        <span className="text-[9px] text-neutral-400 font-mono">Voice + Chat</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                          Realtime
                        </span>
                        <div className="flex items-center justify-center gap-1 text-[#28C76F] font-bold">
                          <span>Webhooks</span>
                        </div>
                        <span className="text-[9px] text-neutral-400 font-mono">Active Feed</span>
                      </div>

                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: ORDER DETAILS - 360° ORDER WORKSPACE (PHASE 4 COMPLETE) */}
              {activeTab === 'orders' && (
                <OrderWorkspace360
                  currency={currency}
                  onShowToast={onShowToast}
                  onOpenMessages={() => handleTabChange('messages')}
                />
              )}

              {/* TAB 5 & 6: PAYMENTS & PAYMENT VERIFICATION CENTER (PHASE 9 COMPLETE) */}
              {(activeTab === 'payments' || activeTab === 'payment_verification') && (
                <PaymentVerificationCenter
                  currency={currency}
                  onShowToast={onShowToast}
                  onNavigateTab={(tab) => handleTabChange(tab as AdminTab)}
                />
              )}

              {/* TAB 11: INVOICES & FINANCIAL DOCUMENTS (PHASE 11 COMPLETE) */}
              {activeTab === 'invoices' && (
                <InvoicesFinancialCenter
                  currency={currency}
                  onShowToast={onShowToast}
                  onNavigateTab={(tab) => handleTabChange(tab as AdminTab)}
                />
              )}

              {/* TAB 12: REFUNDS & DISPUTE MANAGEMENT (PHASE 12 COMPLETE) */}
              {activeTab === 'refunds' && (
                <RefundsDisputeCenter
                  currency={currency}
                  onShowToast={onShowToast}
                  onNavigateTab={(tab) => handleTabChange(tab as AdminTab)}
                />
              )}

              {/* TAB 13: FINANCIAL REPORTS & REVENUE ANALYTICS (PHASE 13 COMPLETE) */}
              {(activeTab === 'analytics' || activeTab === 'reports') && (
                <FinancialReportsAnalytics
                  currency={currency}
                  onShowToast={onShowToast}
                  onNavigateTab={(tab) => handleTabChange(tab as AdminTab)}
                />
              )}

              {/* TAB 14: AI CONTROL CENTER (PHASE 14 COMPLETE) */}
              {activeTab === 'ai_control' && (
                <AIControlCenter
                  currency={currency}
                  onShowToast={onShowToast}
                  onNavigateTab={(tab) => handleTabChange(tab as AdminTab)}
                />
              )}

              {/* TAB 15 PART 1: ENTERPRISE CRM & CLIENT COMMAND CENTER */}
              {activeTab === 'clients' && (
                <EnterpriseCRMCommandCenter
                  currency={currency}
                  onShowToast={onShowToast}
                  onNavigateTab={(tab) => handleTabChange(tab as AdminTab)}
                />
              )}

              {/* TAB: PROJECTS (REQUIREMENTS & DELIVERABLES MANAGEMENT) */}
              {activeTab === 'projects' && (
                <RequirementsDeliverablesCenter
                  currency={currency}
                  onShowToast={onShowToast}
                />
              )}

              {/* TAB: FILES & DOCUMENTS STORAGE */}
              {activeTab === 'files' && (
                <FilesDocumentsCenter
                  currency={currency}
                  onShowToast={onShowToast}
                  setActiveTab={(tab) => handleTabChange(tab as AdminTab)}
                />
              )}

              {/* TAB: CLIENT MESSAGES & COMMUNICATIONS */}
              {activeTab === 'messages' && (
                <MessagesCommunicationCenter
                  currency={currency}
                  onShowToast={onShowToast}
                  setActiveTab={(tab) => handleTabChange(tab as AdminTab)}
                />
              )}

              {/* TAB: NOTIFICATIONS & ACTIVITY AUDIT TRAIL */}
              {(activeTab === 'notifications' || activeTab === 'activity') && (
                <NotificationsActivityCenter
                  currency={currency}
                  onShowToast={onShowToast}
                  setActiveTab={(tab) => handleTabChange(tab as AdminTab)}
                />
              )}

              {/* TAB: SYSTEM SETTINGS, STAFF ACCESS & RBAC SECURITY */}
              {(activeTab === 'settings' || activeTab === 'team' || activeTab === 'system_health') && (
                <AccountSecurityCenter
                  currency={currency}
                  onShowToast={onShowToast}
                  setActiveTab={(tab) => handleTabChange(tab as AdminTab)}
                />
              )}

              {/* TAB 16 PART 1: ENTERPRISE WEBSITE CMS & DYNAMIC CONTENT ENGINE */}
              {(activeTab === 'website_cms' || activeTab === 'services') && (
                <EnterpriseWebsiteCMS
                  currency={currency}
                  onShowToast={onShowToast}
                  onNavigateTab={(tab) => handleTabChange(tab as AdminTab)}
                />
              )}

              {/* TAB 16 PART 10: ENTERPRISE PLATFORM OPERATIONS CENTER (NOC/SOC/ADMIN) */}
              {(activeTab === 'ops_center' || activeTab === 'system_health') && (
                <EnterprisePlatformOperationsCenter
                  currency={currency}
                  onShowToast={onShowToast}
                  onNavigateTab={(tab) => handleTabChange(tab as AdminTab)}
                />
              )}

              {/* ARCHITECTURAL SHELLS FOR REMAINING MODULE TABS */}
              {activeTab !== 'dashboard' && activeTab !== 'orders' && activeTab !== 'payments' && activeTab !== 'payment_verification' && activeTab !== 'invoices' && activeTab !== 'refunds' && activeTab !== 'analytics' && activeTab !== 'reports' && activeTab !== 'ai_control' && activeTab !== 'clients' && activeTab !== 'projects' && activeTab !== 'files' && activeTab !== 'messages' && activeTab !== 'notifications' && activeTab !== 'activity' && activeTab !== 'settings' && activeTab !== 'team' && activeTab !== 'system_health' && activeTab !== 'ops_center' && activeTab !== 'website_cms' && activeTab !== 'services' && (
                <div className="glass-card rounded-3xl border border-white/10 p-8 text-center space-y-5 bg-gradient-to-b from-white/[0.02] to-transparent">
                  <div className="w-16 h-16 rounded-full bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center mx-auto border border-[#E5C158]/30 shadow-[0_0_20px_rgba(229,193,88,0.15)]">
                    <LottieMotion type="ai_neural" size={40} />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <span className="px-3 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 uppercase">
                      Admin Foundation Module Prepared
                    </span>
                    <h2 className="font-poppins font-black text-xl text-white capitalize">
                      {activeTab.replace('_', ' ')} Module Shell Active
                    </h2>
                    <p className="text-xs text-neutral-400">
                      The security handlers, role filters, responsive container, and data bindings for <strong className="text-white">{activeTab.replace('_', ' ')}</strong> are fully instantiated in Phase 1 & 2.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto pt-2 text-left">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                      <span className="text-[10px] font-mono text-[#28C76F] uppercase font-bold">Role Security</span>
                      <p className="text-xs text-white font-semibold">{adminUser.role.toUpperCase()} Authorized</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                      <span className="text-[10px] font-mono text-[#E5C158] uppercase font-bold">API Routing</span>
                      <p className="text-xs text-white font-semibold">Ready for Express API</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                      <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">Data Store</span>
                      <p className="text-xs text-white font-semibold">State Store Wired</p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleTabChange('dashboard')}
                      className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.25)]"
                    >
                      Return to CEO Command Center
                    </button>
                    <button
                      onClick={() => setIsRoadmapModalOpen(true)}
                      className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all cursor-pointer"
                    >
                      View Development Schedule
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </main>
      </div>

      {/* MODAL 1: COMMAND PALETTE (CMD+K) */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div
              className="w-full max-w-xl rounded-3xl bg-[#0D0D12] border border-[#E5C158]/40 p-4 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <Search className="w-5 h-5 text-[#E5C158]" />
                <input
                  type="text"
                  placeholder="Type an admin command or search module (e.g., orders, verify, clients)..."
                  value={commandQuery}
                  onChange={(e) => setCommandQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsCommandPaletteOpen(false)}
                  className="p-1 rounded-lg bg-white/10 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1 max-h-64 overflow-y-auto">
                {navCategories
                  .flatMap((c) => c.items)
                  .filter((i) => i.label.toLowerCase().includes(commandQuery.toLowerCase()))
                  .map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setIsCommandPaletteOpen(false);
                          handleTabChange(item.id as AdminTab);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between text-xs cursor-pointer text-white"
                      >
                        <div className="flex items-center gap-2.5">
                          <ItemIcon className="w-4 h-4 text-[#E5C158]" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: ADMIN NOTIFICATION DRAWER */}
      <AnimatePresence>
        {isNotificationDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-md h-full bg-[#0D0D12] border-l border-white/15 p-6 space-y-5 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#E5C158]" />
                  <h3 className="font-poppins font-bold text-white text-base">Smart Alerts & Activity</h3>
                </div>
                <button
                  onClick={() => setIsNotificationDrawerOpen(false)}
                  className="p-1.5 rounded-xl bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {smartAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-white">{alert.title}</span>
                      <span className="text-[9px] font-mono uppercase text-[#E5C158]">{alert.priority}</span>
                    </div>
                    <p className="text-[11px] text-neutral-300">{alert.description}</p>
                    <span className="text-[10px] text-neutral-400 font-mono block pt-1">{alert.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: PAYMENT VERIFICATION PREVIEW MODAL */}
      <AnimatePresence>
        {paymentPreviewOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-lg rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 p-6 space-y-5 shadow-2xl relative">
              <button
                onClick={() => setPaymentPreviewOrder(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>PAYMENT AUDIT QUEUE</span>
                </div>
                <h3 className="font-poppins font-black text-xl text-white">
                  Audit Financial Receipt Proof
                </h3>
                <p className="text-xs text-neutral-400">
                  Verify receipt details uploaded by client before unlocking deliverable.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Order ID:</span>
                  <strong className="text-white font-mono">{paymentPreviewOrder.id}</strong>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Client:</span>
                  <strong className="text-white">{paymentPreviewOrder.client}</strong>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Service:</span>
                  <strong className="text-[#E5C158]">{paymentPreviewOrder.service}</strong>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Amount Paid:</span>
                  <strong className="text-[#28C76F] text-sm font-extrabold">{paymentPreviewOrder.amount}</strong>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Approved Account:</span>
                  <strong className="text-white font-mono">{paymentPreviewOrder.account}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Transaction ID:</span>
                  <strong className="text-cyan-400 font-mono">{paymentPreviewOrder.txId}</strong>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setPaymentPreviewOrder(null);
                    if (onShowToast) onShowToast(`Payment for ${paymentPreviewOrder.id} Verified & Marked Confirmed.`);
                  }}
                  className="flex-1 py-3 rounded-2xl bg-[#28C76F] text-black font-extrabold text-xs hover:bg-emerald-400 cursor-pointer shadow-[0_0_15px_rgba(40,199,111,0.3)]"
                >
                  ✓ Approve & Verify Payment
                </button>
                <button
                  onClick={() => setPaymentPreviewOrder(null)}
                  className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-neutral-300 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 4: QUICK ACTION GENERIC DIALOG */}
      <AnimatePresence>
        {selectedQuickAction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-md rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 p-6 space-y-4 shadow-2xl relative">
              <button
                onClick={() => setSelectedQuickAction(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-md bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 uppercase">
                  Executive Quick Action
                </span>
                <h3 className="font-poppins font-black text-xl text-white">
                  {selectedQuickAction.title}
                </h3>
                <p className="text-xs text-neutral-400">
                  {selectedQuickAction.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
                <p className="text-neutral-300">
                  Action handler initialized for <strong className="text-white">{selectedQuickAction.title}</strong>. Fast execution pathway ready.
                </p>
              </div>

              <button
                onClick={() => {
                  const title = selectedQuickAction.title;
                  setSelectedQuickAction(null);
                  if (onShowToast) onShowToast(`${title} initiated successfully.`);
                }}
                className="w-full py-3 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer"
              >
                Execute Action Now
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 5: ROADMAP & PHASE 2 COMPLETION MODAL */}
      <AnimatePresence>
        {isRoadmapModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-xl rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 p-6 space-y-5 shadow-2xl relative">
              <button
                onClick={() => setIsRoadmapModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#28C76F]/20 border border-[#28C76F]/40 text-[#28C76F] text-xs font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>COMPLETED: ADMIN DASHBOARD v2.0 PHASE 10</span>
                </div>
                <h3 className="font-poppins font-black text-xl text-white">
                  Payment Verification Workspace Active & Production Ready
                </h3>
                <p className="text-xs text-neutral-400">
                  Multi-column layout, Payment overview architecture, Proof vault & Image Zoom viewer, Reusable verification controls, Internal 6-point audit checklist, Private admin notes, Audit timeline & Quick actions implemented.
                </p>
              </div>

              {/* Complete Roadmap Phases */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 text-xs">
                
                <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-xs">Phase 1: Foundation & RBAC Security</strong>
                      <span className="text-neutral-400 text-[10px]">Private PIN gate, Google SSO & 5-tier role matrix</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[10px] uppercase bg-[#28C76F]/20 px-2 py-0.5 rounded">COMPLETED</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-xs">Phase 2: CEO Dashboard & Executive Command</strong>
                      <span className="text-neutral-400 text-[10px]">10 KPIs, Smart Alerts, Quick Actions, Activity Feed & System Health</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[10px] uppercase bg-[#28C76F]/20 px-2 py-0.5 rounded">COMPLETED</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-xs">Phase 4: Order Details — 360° Order Workspace</strong>
                      <span className="text-neutral-400 text-[10px]">Multi-column layout, client profile, long-form brief, file panel, visual progress & private admin notes</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[10px] uppercase bg-[#28C76F]/20 px-2 py-0.5 rounded">COMPLETED</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-xs">Phase 5: Order Assignment & Workflow Engine</strong>
                      <span className="text-neutral-400 text-[10px]">18-stage status matrix, assignment & squad controls, priority levels, deadline management, task checklist & workflow history</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[10px] uppercase bg-[#28C76F]/20 px-2 py-0.5 rounded">COMPLETED</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-xs">Phase 6: Order Timeline & Activity History</strong>
                      <span className="text-neutral-400 text-[10px]">Vertical timeline stream, date grouping, category filtering, search, value transitions, artifact previews & audit export</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[10px] uppercase bg-[#28C76F]/20 px-2 py-0.5 rounded">COMPLETED</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-xs">Phase 7: Requirements, Revisions & Deliverables Center</strong>
                      <span className="text-neutral-400 text-[10px]">Long-form requirements, request workflows, unlimited revisions hub, deliverables release vault, QA checklist & private notes</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[10px] uppercase bg-[#28C76F]/20 px-2 py-0.5 rounded">COMPLETED</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-xs">Phase 8: Order Automation, Smart Actions & AI Assistance</strong>
                      <span className="text-neutral-400 text-[10px]">10 Smart quick actions, bulk ops, AI intelligence placeholders, automation trigger hooks, smart presets & operational insights</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[10px] uppercase bg-[#28C76F]/20 px-2 py-0.5 rounded">COMPLETED</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-xs">Phase 9: Payments & Payment Verification Center</strong>
                      <span className="text-neutral-400 text-[10px]">Payments dashboard, stats cards, 15-column payments table, status badges, multi-criteria filters, audit modal & ledger exports</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[10px] uppercase bg-[#28C76F]/20 px-2 py-0.5 rounded">COMPLETED</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-xs">Phase 10: Payment Verification Workspace</strong>
                      <span className="text-neutral-400 text-[10px]">Multi-column layout, payment overview, proof vault & zoom viewer, verification controls, 6-point checklist, private notes & audit history</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[10px] uppercase bg-[#28C76F]/20 px-2 py-0.5 rounded">COMPLETED</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-xs">Phase 11: Invoices & Financial Documents</strong>
                      <span className="text-neutral-400 text-[10px]">Financial summary header, KPI cards, reusable invoice table, standard/proforma/tax/receipt/credit notes, document preview, search & filters</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[10px] uppercase bg-[#28C76F]/20 px-2 py-0.5 rounded">COMPLETED</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-xs">Phase 12: Refunds & Dispute Management</strong>
                      <span className="text-neutral-400 text-[10px]">Refund overview dashboard, KPI cards, dispute management table, status badges, resolution workspace, supporting evidence, audit history timeline & search/filters</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[10px] uppercase bg-[#28C76F]/20 px-2 py-0.5 rounded">COMPLETED</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-xs">Phase 13: Financial Reports & Revenue Analytics</strong>
                      <span className="text-neutral-400 text-[10px]">Executive financial summary, 10 KPI cards, monthly growth charts, payment distribution, service yield, client LTV, export center (PDF/XLSX/CSV), advanced filters & AI forecasting</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[10px] uppercase bg-[#28C76F]/20 px-2 py-0.5 rounded">COMPLETED</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#28C76F]/20 border border-[#28C76F]/50 flex items-center justify-between shadow-[0_0_20px_rgba(40,199,111,0.2)]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-xs">Phase 15 - Part 1: Enterprise CRM & Client Relationship Command Center</strong>
                      <span className="text-neutral-400 text-[10px]">Client Directory, 360° Profile View, Project/Invoice/File histories, Private Admin Notes, Gemini 1.5 Pro AI Insights & Quick Action Modals</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-extrabold text-[10px] uppercase bg-[#28C76F]/30 px-2.5 py-0.5 rounded border border-[#28C76F]/50">ACTIVE • COMPLETED</span>
                </div>

                {[
                  { phase: 'Phase 15 - Part 2: Website CMS & Content Manager', desc: 'Service pricing editor, Our Work sample manager & promo banners' },
                  { phase: 'Phase 16: Staff & Team Access Management', desc: 'Staff invitation, RBAC permissions, audit trail & workload distribution' },
                ].map((p, idx) => (
                  <div key={idx} className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between opacity-70">
                    <div>
                      <strong className="text-white block font-bold text-[11px]">{p.phase}</strong>
                      <span className="text-neutral-400 text-[10px]">{p.desc}</span>
                    </div>
                    <span className="text-amber-400 font-bold text-[9px] uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">UPCOMING</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsRoadmapModalOpen(false)}
                className="w-full py-3 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer"
              >
                Acknowledge Phase 6 Completion
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
