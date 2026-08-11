import React, { useState, useMemo } from 'react';
import { Currency } from '../../types';
import {
  Users,
  UserCheck,
  UserPlus,
  UserX,
  Star,
  Search,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Phone,
  Mail,
  MessageSquare,
  Globe,
  Clock,
  ShieldCheck,
  CreditCard,
  FileText,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit3,
  Tag,
  Eye,
  Lock,
  Sparkles,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Layers,
  DollarSign,
  Activity,
  Zap,
  TrendingUp,
  BarChart3,
  HelpCircle,
  Copy,
  Share2,
  Send,
  X,
  SlidersHorizontal,
  Grid,
  List,
  MessageCircle,
  FileSpreadsheet,
  Check,
  Award,
  HeartHandshake
} from 'lucide-react';
import { CRMProjectWorkspace } from './CRMProjectWorkspace';
import { CRMCommunicationHub } from './CRMCommunicationHub';
import { CRMMeetingScheduleCenter } from './CRMMeetingScheduleCenter';
import { CRMExecutiveWidgets } from './CRMExecutiveWidgets';
import { CRMIntelligenceAutomation } from './CRMIntelligenceAutomation';
import { CRMExecutiveClientSuccess } from './CRMExecutiveClientSuccess';

interface EnterpriseCRMProps {
  currency: Currency;
  onShowToast: (msg: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export interface ClientRecord {
  id: string; // e.g., 'MFS-CLI-84920'
  name: string;
  company: string;
  avatarUrl?: string;
  email: string;
  phone: string;
  country: string;
  countryFlag: string;
  timezone: string;
  status: 'active' | 'vip' | 'onboarding' | 'inactive' | 'archived';
  accountManager: string;
  registrationDate: string;
  lastActivity: string;
  totalOrders: number;
  activeProjects: number;
  lifetimeValuePKR: number; // Stored base in PKR
  healthScore: number; // 0-100
  satisfactionScore: number; // 0-5.0
  tags: string[];
  isFavorite: boolean;
  preferredCurrency: Currency;
  privateNotes: string[];
  aiInsightSummary: string;
  recentOrders: Array<{
    id: string;
    serviceName: string;
    amountPKR: number;
    status: 'completed' | 'in_progress' | 'pending_payment' | 'under_review';
    date: string;
    speedMultiplier: string;
  }>;
  recentInvoices: Array<{
    id: string;
    amountPKR: number;
    status: 'paid' | 'pending' | 'overdue';
    date: string;
    paymentMethod: string;
  }>;
  recentFiles: Array<{
    id: string;
    name: string;
    size: string;
    uploadDate: string;
    type: 'pdf' | 'docx' | 'pptx' | 'zip' | 'image';
  }>;
  activityTimeline: Array<{
    id: string;
    event: string;
    timestamp: string;
    actor: string;
    iconType: 'order' | 'payment' | 'message' | 'file' | 'note';
  }>;
}

const EXCHANGE_RATES: Record<Currency, number> = {
  PKR: 1,
  USD: 1 / 280,
  GBP: 1 / 350,
  EUR: 1 / 300,
  AED: 1 / 76,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  PKR: 'Rs',
  USD: '$',
  GBP: '£',
  EUR: '€',
  AED: 'AED',
};

export const EnterpriseCRMCommandCenter: React.FC<EnterpriseCRMProps> = ({
  currency,
  onShowToast,
  onNavigateTab
}) => {
  // Master Client Records State
  const [clients, setClients] = useState<ClientRecord[]>([
    {
      id: 'MFS-CLI-84920',
      name: 'Muhammad Shehroz Sultan',
      company: 'MFS International / PGC Academic',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      email: 'mfsmedia.agency@gmail.com',
      phone: '+92 301 5323689',
      country: 'Pakistan',
      countryFlag: '🇵🇰',
      timezone: 'PKT (UTC+5)',
      status: 'vip',
      accountManager: 'Shehroz Sultan (Agency Owner)',
      registrationDate: '2025-11-12',
      lastActivity: '4 mins ago',
      totalOrders: 18,
      activeProjects: 3,
      lifetimeValuePKR: 485000,
      healthScore: 99,
      satisfactionScore: 5.0,
      tags: ['VIP Client', 'Enterprise', 'High-Value', 'Repeat Client'],
      isFavorite: true,
      preferredCurrency: 'PKR',
      privateNotes: [
        'Prefers Executive Dark Gold slides with high-density metrics.',
        'Requires 24h Express Turnaround for slide deck deliverables.',
        'Always verifies payments via EasyPaisa and JazzCash instant screenshots.'
      ],
      aiInsightSummary: 'Platinum Tier Executive Client. Highest order velocity in Q1. Prefers APA 7th academic formatting and 16:9 4K presentation slides. 100% on-time payment track record.',
      recentOrders: [
        { id: 'ORD-MFS-849201', serviceName: 'Executive Pitch Deck (15 Slides)', amountPKR: 18000, status: 'in_progress', date: '2026-07-26', speedMultiplier: 'Express +30%' },
        { id: 'ORD-MFS-849198', serviceName: 'ATS Resume & Executive CV Engineering', amountPKR: 8500, status: 'completed', date: '2026-07-22', speedMultiplier: 'Standard' },
        { id: 'ORD-MFS-849150', serviceName: 'Academic Thesis Formatting (APA 7th)', amountPKR: 14000, status: 'completed', date: '2026-07-15', speedMultiplier: 'Priority +50%' }
      ],
      recentInvoices: [
        { id: 'INV-2026-0819', amountPKR: 18000, status: 'paid', date: '2026-07-26', paymentMethod: 'EasyPaisa (03116191234)' },
        { id: 'INV-2026-0812', amountPKR: 8500, status: 'paid', date: '2026-07-22', paymentMethod: 'JazzCash (03015323688)' },
        { id: 'INV-2026-0790', amountPKR: 14000, status: 'paid', date: '2026-07-15', paymentMethod: 'Askari Bank Transfer' }
      ],
      recentFiles: [
        { id: 'FILE-001', name: 'MFS_Pitch_Deck_v2_Final.pptx', size: '24.8 MB', uploadDate: '2026-07-26', type: 'pptx' },
        { id: 'FILE-002', name: 'ATS_Resume_Executive_Shehroz.pdf', size: '2.1 MB', uploadDate: '2026-07-22', type: 'pdf' },
        { id: 'FILE-003', name: 'EasyPaisa_Payment_Proof_Receipt.png', size: '850 KB', uploadDate: '2026-07-26', type: 'image' }
      ],
      activityTimeline: [
        { id: 'ACT-1', event: 'Uploaded EasyPaisa receipt screenshot for ORD-MFS-849201', timestamp: '12 mins ago', actor: 'Client', iconType: 'payment' },
        { id: 'ACT-2', event: 'Created new Order ORD-MFS-849201 for Executive Pitch Deck', timestamp: '1 hour ago', actor: 'Client', iconType: 'order' },
        { id: 'ACT-3', event: 'Added private admin note regarding APA slide formatting', timestamp: '2 hours ago', actor: 'Admin Team', iconType: 'note' }
      ]
    },
    {
      id: 'MFS-CLI-71204',
      name: 'Dr. Tariq Mahmood',
      company: 'Medical Institute / HealthTech PK',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      email: 'dr.tariq.mahmood@imi.edu.pk',
      phone: '+92 301 8829102',
      country: 'Pakistan',
      countryFlag: '🇵🇰',
      timezone: 'PKT (UTC+5)',
      status: 'active',
      accountManager: 'MFS Admin Team',
      registrationDate: '2025-12-04',
      lastActivity: '1 hour ago',
      totalOrders: 8,
      activeProjects: 1,
      lifetimeValuePKR: 195000,
      healthScore: 94,
      satisfactionScore: 4.9,
      tags: ['Corporate', 'Academic Doctor', 'Urgent Delivery'],
      isFavorite: true,
      preferredCurrency: 'PKR',
      privateNotes: [
        'Medical research case studies & journal paper formatting.',
        'Requires strict Harvard & IEEE citations.'
      ],
      aiInsightSummary: 'Senior Academic Client in Medical Research. High willingness to pay for Priority +50% speed multiplier. Very clear briefs provided.',
      recentOrders: [
        { id: 'ORD-MFS-849102', serviceName: 'Medical Journal Paper Formatting & Proofreading', amountPKR: 22000, status: 'in_progress', date: '2026-07-25', speedMultiplier: 'Priority +50%' }
      ],
      recentInvoices: [
        { id: 'INV-2026-0810', amountPKR: 22000, status: 'paid', date: '2026-07-25', paymentMethod: 'Askari Bank Transfer' }
      ],
      recentFiles: [
        { id: 'FILE-010', name: 'Clinical_Trial_Report_Draft.docx', size: '5.4 MB', uploadDate: '2026-07-25', type: 'docx' }
      ],
      activityTimeline: [
        { id: 'ACT-10', event: 'Approved final proof of Medical Presentation', timestamp: '1 hour ago', actor: 'Client', iconType: 'file' }
      ]
    },
    {
      id: 'MFS-CLI-62019',
      name: 'Sarah Al-Maktoum',
      company: 'Dubai Digital Ventures LLC',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      email: 's.almaktoum@dubaidigital.ae',
      phone: '+971 50 9182301',
      country: 'United Arab Emirates',
      countryFlag: '🇦🇪',
      timezone: 'GST (UTC+4)',
      status: 'vip',
      accountManager: 'Shehroz Sultan (Agency Owner)',
      registrationDate: '2026-01-18',
      lastActivity: '3 hours ago',
      totalOrders: 12,
      activeProjects: 2,
      lifetimeValuePKR: 890000, // Equivalent to ~$3,100
      healthScore: 98,
      satisfactionScore: 5.0,
      tags: ['VIP Client', 'International', 'Enterprise', 'Pitch Decks'],
      isFavorite: true,
      preferredCurrency: 'USD',
      privateNotes: [
        'Investor Pitch Decks for VC Funding Rounds in Dubai & Silicon Valley.',
        'Requires Custom 3D Graphics & Dark Gold Minimal Aesthetics.'
      ],
      aiInsightSummary: 'High-LTV VC Partner Client based in UAE. Pays in USD/AED. Consistently purchases top-tier Presentation Design and Financial Models.',
      recentOrders: [
        { id: 'ORD-MFS-849001', serviceName: 'Series A VC Pitch Deck (25 Slides)', amountPKR: 65000, status: 'in_progress', date: '2026-07-24', speedMultiplier: 'Same-Day +75%' }
      ],
      recentInvoices: [
        { id: 'INV-2026-0801', amountPKR: 65000, status: 'paid', date: '2026-07-24', paymentMethod: 'International Wire / Stripe' }
      ],
      recentFiles: [
        { id: 'FILE-020', name: 'Dubai_VC_Deck_Draft_v3.pptx', size: '42.1 MB', uploadDate: '2026-07-24', type: 'pptx' }
      ],
      activityTimeline: [
        { id: 'ACT-20', event: 'Sent feedback on Slide 12 Financial Projections', timestamp: '3 hours ago', actor: 'Client', iconType: 'message' }
      ]
    },
    {
      id: 'MFS-CLI-59102',
      name: 'James O’Connor',
      company: 'Oxford Academic Press UK',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      email: 'j.oconnor@oxfordacademic.co.uk',
      phone: '+44 20 7946 0912',
      country: 'United Kingdom',
      countryFlag: '🇬🇧',
      timezone: 'BST (UTC+1)',
      status: 'active',
      accountManager: 'MFS Admin Team',
      registrationDate: '2026-02-10',
      lastActivity: '1 day ago',
      totalOrders: 5,
      activeProjects: 1,
      lifetimeValuePKR: 280000,
      healthScore: 91,
      satisfactionScore: 4.8,
      tags: ['Academic UK', 'Assignment Writing', 'Harvard Style'],
      isFavorite: false,
      preferredCurrency: 'GBP',
      privateNotes: ['Strict UK English spelling and grammar rules required.'],
      aiInsightSummary: 'UK-based Academic & Corporate Client. High satisfaction with assignment writing and proofreading speed.',
      recentOrders: [
        { id: 'ORD-MFS-848820', serviceName: 'Corporate Strategy Case Study (3,500 Words)', amountPKR: 19500, status: 'completed', date: '2026-07-20', speedMultiplier: 'Standard' }
      ],
      recentInvoices: [
        { id: 'INV-2026-0780', amountPKR: 19500, status: 'paid', date: '2026-07-20', paymentMethod: 'Bank Transfer' }
      ],
      recentFiles: [
        { id: 'FILE-030', name: 'Case_Study_Strategy_Final.docx', size: '1.8 MB', uploadDate: '2026-07-20', type: 'docx' }
      ],
      activityTimeline: [
        { id: 'ACT-30', event: 'Downloaded final formatted Case Study doc', timestamp: '1 day ago', actor: 'Client', iconType: 'file' }
      ]
    },
    {
      id: 'MFS-CLI-48190',
      name: 'Ayesha Khan',
      company: 'LUMS Business School Alumni',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      email: 'ayesha.khan.lums@gmail.com',
      phone: '+92 311 9028172',
      country: 'Pakistan',
      countryFlag: '🇵🇰',
      timezone: 'PKT (UTC+5)',
      status: 'onboarding',
      accountManager: 'MFS Admin Team',
      registrationDate: '2026-07-24',
      lastActivity: '30 mins ago',
      totalOrders: 2,
      activeProjects: 1,
      lifetimeValuePKR: 45000,
      healthScore: 88,
      satisfactionScore: 4.7,
      tags: ['Student / Alumni', 'CV Engineering', 'Grand Launch Offer'],
      isFavorite: false,
      preferredCurrency: 'PKR',
      privateNotes: ['Applied 50% Grand Launch Promo Discount.'],
      aiInsightSummary: 'New Client onboarded via 50% Grand Launch Discount. High potential for referral among university network.',
      recentOrders: [
        { id: 'ORD-MFS-849105', serviceName: 'ATS Resume + LinkedIn Profile Optimization', amountPKR: 6500, status: 'in_progress', date: '2026-07-26', speedMultiplier: 'Standard' }
      ],
      recentInvoices: [
        { id: 'INV-2026-0820', amountPKR: 6500, status: 'paid', date: '2026-07-26', paymentMethod: 'JazzCash (03015323688)' }
      ],
      recentFiles: [
        { id: 'FILE-040', name: 'Raw_Resume_Ayesha_2026.docx', size: '1.1 MB', uploadDate: '2026-07-26', type: 'docx' }
      ],
      activityTimeline: [
        { id: 'ACT-40', event: 'Submitted JazzCash transaction reference #JC910283', timestamp: '30 mins ago', actor: 'Client', iconType: 'payment' }
      ]
    }
  ]);

  // CRM Sub-Navigation Tab State
  const [crmSubTab, setCrmSubTab] = useState<'directory' | 'projects' | 'communications' | 'meetings' | 'widgets' | 'intelligence' | 'success'>('directory');

  // Filtering & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'ltv_high' | 'orders_high' | 'health_high' | 'recent_activity'>('ltv_high');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Selected Client for 360° Profile Modal / Drawer
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);
  const [profileTab, setProfileTab] = useState<'overview' | 'projects' | 'invoices' | 'files' | 'notes' | 'ai_insights' | 'timeline'>('overview');

  // Quick Action Modals States
  const [activeModal, setActiveModal] = useState<'create_order' | 'send_invoice' | 'send_email' | 'add_note' | 'upload_file' | 'ai_audit' | null>(null);
  const [modalClient, setModalClient] = useState<ClientRecord | null>(null);

  // Modal Form States
  const [newNoteText, setNewNoteText] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [customInvoiceAmount, setCustomInvoiceAmount] = useState('');

  // Format Helper with Selected Currency
  const formatMoney = (amountPKR: number) => {
    const rate = EXCHANGE_RATES[currency];
    const converted = amountPKR * rate;
    const symbol = CURRENCY_SYMBOLS[currency];

    if (currency === 'PKR') {
      return `${symbol} ${converted.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;
    }
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Filtered Clients Calculation
  const filteredClients = useMemo(() => {
    return clients
      .filter((client) => {
        const matchesSearch =
          client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.phone.includes(searchQuery);

        const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
        const matchesCountry = countryFilter === 'all' || client.country === countryFilter;
        const matchesTag = tagFilter === 'all' || client.tags.includes(tagFilter);
        const matchesFav = !showOnlyFavorites || client.isFavorite;

        return matchesSearch && matchesStatus && matchesCountry && matchesTag && matchesFav;
      })
      .sort((a, b) => {
        if (sortBy === 'ltv_high') return b.lifetimeValuePKR - a.lifetimeValuePKR;
        if (sortBy === 'orders_high') return b.totalOrders - a.totalOrders;
        if (sortBy === 'health_high') return b.healthScore - a.healthScore;
        return 0;
      });
  }, [clients, searchQuery, statusFilter, countryFilter, tagFilter, sortBy, showOnlyFavorites]);

  // Aggregate Key Statistics
  const totalLTVPKR = useMemo(() => clients.reduce((sum, c) => sum + c.lifetimeValuePKR, 0), [clients]);
  const activeClientsCount = useMemo(() => clients.filter(c => c.status === 'active' || c.status === 'vip').length, [clients]);
  const vipCount = useMemo(() => clients.filter(c => c.status === 'vip').length, [clients]);
  const avgHealthScore = useMemo(() => Math.round(clients.reduce((sum, c) => sum + c.healthScore, 0) / clients.length), [clients]);
  const activeProjectsTotal = useMemo(() => clients.reduce((sum, c) => sum + c.activeProjects, 0), [clients]);

  // Toggle Favorite
  const handleToggleFavorite = (clientId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setClients(prev =>
      prev.map(c => (c.id === clientId ? { ...c, isFavorite: !c.isFavorite } : c))
    );
    if (selectedClient && selectedClient.id === clientId) {
      setSelectedClient(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
    onShowToast('Client bookmark status updated');
  };

  // Add Private Admin Note
  const handleAddNote = () => {
    if (!newNoteText.trim() || !modalClient) return;
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedNote = `[${dateStr} by Shehroz Sultan]: ${newNoteText.trim()}`;

    setClients(prev =>
      prev.map(c =>
        c.id === modalClient.id
          ? {
              ...c,
              privateNotes: [formattedNote, ...c.privateNotes],
              activityTimeline: [
                {
                  id: `ACT-${Date.now()}`,
                  event: `Added private internal note: "${newNoteText.trim().substring(0, 30)}..."`,
                  timestamp: 'Just now',
                  actor: 'Shehroz Sultan (Admin)',
                  iconType: 'note'
                },
                ...c.activityTimeline
              ]
            }
          : c
      )
    );

    if (selectedClient && selectedClient.id === modalClient.id) {
      setSelectedClient(prev => prev ? { ...prev, privateNotes: [formattedNote, ...prev.privateNotes] } : null);
    }

    setNewNoteText('');
    setActiveModal(null);
    onShowToast('✔ Private Admin Note added successfully');
  };

  return (
    <div className="space-y-8 animate-fade-in text-white">
      {/* TOP HERO HEADER */}
      <div className="glass-card rounded-3xl border border-white/10 p-6 md:p-8 bg-gradient-to-r from-neutral-900/90 via-black to-[#0F0F0F] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(229,193,88,0.2)]">
                <Users className="w-3.5 h-3.5 text-[#E5C158]" />
                PHASE 15 • PART 1 COMPLETE
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                360° CLIENT COMMAND CENTER
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Enterprise CRM & Client Relationship Command Center
            </h1>
            <p className="text-neutral-400 text-sm max-w-2xl">
              Centralized client directory, 360° profile intelligence, payment histories, internal admin notes, and Gemini AI relationship forecasting.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => {
                const first = clients[0];
                setModalClient(first);
                setActiveModal('create_order');
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(229,193,88,0.25)]"
            >
              <Plus className="w-4 h-4 text-black" />
              New Client Order
            </button>

            <button
              onClick={() => {
                onShowToast('🔄 Syncing CRM Database & Client Profiles...');
              }}
              className="px-4 py-2.5 rounded-xl glass-card border border-white/10 hover:border-[#E5C158]/50 text-white font-semibold text-xs flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#E5C158]" />
              Sync Database
            </button>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TAB BAR */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setCrmSubTab('directory')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 border shrink-0 ${
            crmSubTab === 'directory'
              ? 'bg-[#E5C158] text-black border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.3)]'
              : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20'
          }`}
        >
          <Users className="w-4 h-4" />
          Clients Directory (360° Profiles)
        </button>

        <button
          onClick={() => setCrmSubTab('projects')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 border shrink-0 ${
            crmSubTab === 'projects'
              ? 'bg-[#E5C158] text-black border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.3)]'
              : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20'
          }`}
        >
          <Layers className="w-4 h-4" />
          Project Workspace & 12-Stage Timelines
        </button>

        <button
          onClick={() => setCrmSubTab('communications')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 border shrink-0 ${
            crmSubTab === 'communications'
              ? 'bg-[#E5C158] text-black border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.3)]'
              : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Communication & Private Notes
        </button>

        <button
          onClick={() => setCrmSubTab('meetings')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 border shrink-0 ${
            crmSubTab === 'meetings'
              ? 'bg-[#E5C158] text-black border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.3)]'
              : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Meeting & Schedule Center
        </button>

        <button
          onClick={() => setCrmSubTab('widgets')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 border shrink-0 ${
            crmSubTab === 'widgets'
              ? 'bg-[#E5C158] text-black border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.3)]'
              : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20'
          }`}
        >
          <Activity className="w-4 h-4" />
          Executive Analytics & Widgets
        </button>

        <button
          onClick={() => setCrmSubTab('intelligence')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 border shrink-0 ${
            crmSubTab === 'intelligence'
              ? 'bg-[#E5C158] text-black border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.3)]'
              : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          AI Intelligence & Automation
        </button>

        <button
          onClick={() => setCrmSubTab('success')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 border shrink-0 ${
            crmSubTab === 'success'
              ? 'bg-[#E5C158] text-black border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.3)]'
              : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          Client Success & Future Expansion
        </button>
      </div>

      {/* RENDER ACTIVE TAB VIEW */}
      {crmSubTab === 'intelligence' && (
        <CRMIntelligenceAutomation currency={currency} onShowToast={onShowToast} />
      )}

      {crmSubTab === 'success' && (
        <CRMExecutiveClientSuccess currency={currency} onShowToast={onShowToast} />
      )}

      {crmSubTab === 'projects' && (
        <CRMProjectWorkspace currency={currency} onShowToast={onShowToast} />
      )}

      {crmSubTab === 'communications' && (
        <CRMCommunicationHub currency={currency} onShowToast={onShowToast} />
      )}

      {crmSubTab === 'meetings' && (
        <CRMMeetingScheduleCenter currency={currency} onShowToast={onShowToast} />
      )}

      {crmSubTab === 'widgets' && (
        <CRMExecutiveWidgets
          currency={currency}
          onShowToast={onShowToast}
          onNavigateSubTab={(tab) => setCrmSubTab(tab as any)}
        />
      )}

      {/* TAB 1: DIRECTORY & 360° PROFILES VIEW */}
      {crmSubTab === 'directory' && (
        <>
          {/* TOP STATS DASHBOARD ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* STAT 1: TOTAL CRM LIFETIME VALUE */}
        <div className="glass-card rounded-2xl border border-white/10 p-5 bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden hover:border-[#E5C158]/30 transition-all">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium mb-2">
            <span>Total CRM Lifetime Value</span>
            <DollarSign className="w-4 h-4 text-[#E5C158]" />
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {formatMoney(totalLTVPKR)}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.4% this month
            </span>
            <span className="text-neutral-500">{clients.length} Total Accounts</span>
          </div>
        </div>

        {/* STAT 2: ACTIVE & VIP CLIENTS */}
        <div className="glass-card rounded-2xl border border-white/10 p-5 bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden hover:border-[#E5C158]/30 transition-all">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium mb-2">
            <span>Active & VIP Clients</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white tracking-tight flex items-baseline gap-2">
            {activeClientsCount}
            <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
              {vipCount} VIP
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-neutral-400">{activeProjectsTotal} Active Deliverables</span>
            <span className="text-emerald-400 font-medium">100% Retained</span>
          </div>
        </div>

        {/* STAT 3: CLIENT HEALTH SCORE */}
        <div className="glass-card rounded-2xl border border-white/10 p-5 bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden hover:border-[#E5C158]/30 transition-all">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium mb-2">
            <span>Average Client Health</span>
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 tracking-tight flex items-center gap-2">
            {avgHealthScore}%
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded uppercase">
              EXCELLENT
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-neutral-400">CSAT Rating: 4.98 / 5.0</span>
            <span className="text-neutral-500">0 At-Risk</span>
          </div>
        </div>

        {/* STAT 4: RESPONSE & DELIVERABLE VELOCITY */}
        <div className="glass-card rounded-2xl border border-white/10 p-5 bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden hover:border-[#E5C158]/30 transition-all">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium mb-2">
            <span>Avg Agency Response Time</span>
            <Zap className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            15 Mins
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-sky-400 font-semibold">24/7 Online Support</span>
            <span className="text-neutral-400">PKT (UTC+5) HQ</span>
          </div>
        </div>
      </div>

      {/* FILTER & CONTROL BAR */}
      <div className="glass-card rounded-2xl border border-white/10 p-4 bg-neutral-900/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* SEARCH INPUT */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, company, email, phone, or Client ID (e.g. MFS-CLI)..."
            className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]/50 transition-all"
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

        {/* FILTERS & VIEW TOGGLES */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* STATUS FILTER */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-[#E5C158]/50"
          >
            <option value="all">All Statuses</option>
            <option value="vip">⭐ VIP Clients</option>
            <option value="active">🟢 Active Clients</option>
            <option value="onboarding">⚡ Onboarding</option>
            <option value="inactive">⚪ Inactive</option>
          </select>

          {/* COUNTRY FILTER */}
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-[#E5C158]/50"
          >
            <option value="all">All Countries</option>
            <option value="Pakistan">🇵🇰 Pakistan</option>
            <option value="United Arab Emirates">🇦🇪 UAE</option>
            <option value="United Kingdom">🇬🇧 United Kingdom</option>
          </select>

          {/* SORT BY */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-[#E5C158]/50"
          >
            <option value="ltv_high">Sort: LTV (High to Low)</option>
            <option value="orders_high">Sort: Total Orders</option>
            <option value="health_high">Sort: Health Score</option>
          </select>

          {/* FAVORITES ONLY TOGGLE */}
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              showOnlyFavorites
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'glass-card text-neutral-400 border-white/10 hover:text-white'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
            Favorites
          </button>

          {/* TABLE vs GRID VIEW TOGGLE */}
          <div className="flex items-center bg-black/60 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'table' ? 'bg-[#E5C158]/20 text-[#E5C158]' : 'text-neutral-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'grid' ? 'bg-[#E5C158]/20 text-[#E5C158]' : 'text-neutral-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CLIENT DIRECTORY CONTAINER */}
      {viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden bg-neutral-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-black/60 text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4 text-center">Fav</th>
                  <th className="py-3.5 px-4">Client / Company</th>
                  <th className="py-3.5 px-4">Client ID</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Country & Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Lifetime Value</th>
                  <th className="py-3.5 px-4 text-center">Orders</th>
                  <th className="py-3.5 px-4 text-center">Health</th>
                  <th className="py-3.5 px-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-neutral-500">
                      <Users className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold">No client records match your search criteria.</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setStatusFilter('all');
                          setCountryFilter('all');
                          setShowOnlyFavorites(false);
                        }}
                        className="mt-3 text-xs text-[#E5C158] underline hover:opacity-80"
                      >
                        Reset Search Filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client) => (
                    <tr
                      key={client.id}
                      onClick={() => {
                        setSelectedClient(client);
                        setProfileTab('overview');
                      }}
                      className="hover:bg-white/[0.03] transition-all cursor-pointer group"
                    >
                      {/* FAVORITE STAR */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => handleToggleFavorite(client.id, e)}
                          className="text-neutral-500 hover:text-amber-400 transition-colors"
                        >
                          <Star className={`w-4 h-4 ${client.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>
                      </td>

                      {/* CLIENT & COMPANY */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={client.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                            alt={client.name}
                            className="w-9 h-9 rounded-full object-cover border border-[#E5C158]/30"
                          />
                          <div>
                            <div className="font-bold text-white group-hover:text-[#E5C158] transition-colors flex items-center gap-1.5">
                              {client.name}
                              {client.status === 'vip' && (
                                <span className="text-[9px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/40 px-1.5 py-0.2 rounded uppercase">
                                  VIP
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-neutral-400 flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-neutral-500" />
                              {client.company}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* CLIENT ID */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400">
                        {client.id}
                      </td>

                      {/* CONTACT INFO */}
                      <td className="py-3.5 px-4 space-y-0.5">
                        <div className="text-neutral-300 flex items-center gap-1 text-[11px]">
                          <Mail className="w-3 h-3 text-neutral-500" />
                          {client.email}
                        </div>
                        <div className="text-neutral-400 flex items-center gap-1 text-[11px] font-mono">
                          <Phone className="w-3 h-3 text-neutral-500" />
                          {client.phone}
                        </div>
                      </td>

                      {/* COUNTRY & TIMEZONE */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-white font-medium">
                          <span>{client.countryFlag}</span>
                          <span>{client.country}</span>
                        </div>
                        <div className="text-[10px] text-neutral-400 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-neutral-500" />
                          {client.timezone}
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                            client.status === 'vip'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : client.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : client.status === 'onboarding'
                              ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                              : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            client.status === 'vip' ? 'bg-amber-400' : client.status === 'active' ? 'bg-emerald-400' : 'bg-sky-400'
                          }`} />
                          {client.status}
                        </span>
                      </td>

                      {/* LIFETIME VALUE */}
                      <td className="py-3.5 px-4 text-right font-bold text-white font-mono">
                        {formatMoney(client.lifetimeValuePKR)}
                      </td>

                      {/* ORDERS */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                          {client.totalOrders}
                        </span>
                      </td>

                      {/* HEALTH SCORE */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                          <Activity className="w-3 h-3 text-emerald-400" />
                          {client.healthScore}%
                        </div>
                      </td>

                      {/* QUICK ACTIONS */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {/* WHATSAPP ACTION */}
                          <a
                            href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
                            title="Direct WhatsApp Chat"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          {/* EMAIL ACTION */}
                          <button
                            onClick={() => {
                              setModalClient(client);
                              setEmailSubject(`MFS Growth Agency — Update regarding your account (${client.id})`);
                              setActiveModal('send_email');
                            }}
                            className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20 transition-all"
                            title="Send Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </button>

                          {/* ADD NOTE */}
                          <button
                            onClick={() => {
                              setModalClient(client);
                              setActiveModal('add_note');
                            }}
                            className="p-1.5 rounded-lg bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 hover:bg-[#E5C158]/20 transition-all"
                            title="Add Internal Admin Note"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* VIEW 360 PROFILE */}
                          <button
                            onClick={() => {
                              setSelectedClient(client);
                              setProfileTab('overview');
                            }}
                            className="p-1.5 rounded-lg glass-card border border-white/10 text-white hover:border-[#E5C158]/50 transition-all"
                            title="Open 360° Profile View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID CARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              onClick={() => {
                setSelectedClient(client);
                setProfileTab('overview');
              }}
              className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-[#E5C158]/40 transition-all cursor-pointer relative group space-y-4"
            >
              {/* TOP HEADER */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={client.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                    alt={client.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#E5C158]/40"
                  />
                  <div>
                    <h3 className="font-extrabold text-white group-hover:text-[#E5C158] transition-colors flex items-center gap-1.5">
                      {client.name}
                    </h3>
                    <p className="text-xs text-neutral-400">{client.company}</p>
                    <span className="font-mono text-[10px] text-neutral-500">{client.id}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => handleToggleFavorite(client.id, e)}
                  className="text-neutral-500 hover:text-amber-400 transition-colors"
                >
                  <Star className={`w-4 h-4 ${client.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-1.5">
                {client.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-neutral-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* KEY METRICS GRID */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                <div className="bg-black/40 rounded-xl p-2.5 border border-white/5">
                  <span className="text-[10px] text-neutral-500 block">Lifetime Value</span>
                  <span className="font-black text-white font-mono">{formatMoney(client.lifetimeValuePKR)}</span>
                </div>
                <div className="bg-black/40 rounded-xl p-2.5 border border-white/5">
                  <span className="text-[10px] text-neutral-500 block">Total Orders</span>
                  <span className="font-bold text-white">{client.totalOrders} Completed</span>
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-1 text-neutral-400 text-[11px]">
                  <span>{client.countryFlag}</span>
                  <span>{client.country}</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedClient(client);
                    setProfileTab('overview');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 hover:bg-[#E5C158]/20 font-semibold text-[11px] flex items-center gap-1 transition-all"
                >
                  360° Profile
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </>
      )}

      {/* 360° CLIENT PROFILE MODAL / DRAWER */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="glass-card rounded-3xl border border-white/20 bg-[#0A0A0C] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
            
            {/* PROFILE MODAL HEADER */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-neutral-900 via-black to-[#0F0F0F] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedClient.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={selectedClient.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#E5C158]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold text-white">{selectedClient.name}</h2>
                    {selectedClient.status === 'vip' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase">
                        ⭐ VIP CLIENT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400">{selectedClient.company}</p>
                  <span className="font-mono text-xs text-[#E5C158]">{selectedClient.id}</span>
                </div>
              </div>

              {/* TOP HEADER ACTIONS */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${selectedClient.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>

                <button
                  onClick={() => {
                    setModalClient(selectedClient);
                    setEmailSubject(`MFS Growth Agency — Update regarding ${selectedClient.id}`);
                    setActiveModal('send_email');
                  }}
                  className="px-3 py-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </button>

                <button
                  onClick={() => setSelectedClient(null)}
                  className="p-2 rounded-full glass-card border border-white/10 hover:bg-white/10 text-neutral-400 hover:text-white transition-all ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PROFILE NAVIGATION TABS */}
            <div className="flex items-center gap-1 px-6 border-b border-white/10 bg-black/40 overflow-x-auto text-xs">
              {[
                { id: 'overview', label: 'Overview & Bio', icon: Users },
                { id: 'projects', label: 'Projects & Orders', icon: Layers },
                { id: 'invoices', label: 'Invoices & Receipts', icon: CreditCard },
                { id: 'files', label: 'Uploaded Documents', icon: FileText },
                { id: 'notes', label: 'Private Admin Notes', icon: Edit3 },
                { id: 'ai_insights', label: 'Gemini AI Insights', icon: Sparkles },
                { id: 'timeline', label: 'Activity Audit Trail', icon: Clock },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = profileTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setProfileTab(tab.id as any)}
                    className={`py-3 px-4 font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                      isActive
                        ? 'border-[#E5C158] text-[#E5C158] bg-[#E5C158]/5'
                        : 'border-transparent text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* PROFILE TAB CONTENT BODY */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* TAB 1: OVERVIEW */}
              {profileTab === 'overview' && (
                <div className="space-y-6">
                  {/* METRIC HIGHLIGHT CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-black/40 rounded-2xl p-4 border border-white/10 space-y-1">
                      <span className="text-xs text-neutral-400">Total Lifetime Spend</span>
                      <div className="text-xl font-black text-[#E5C158] font-mono">
                        {formatMoney(selectedClient.lifetimeValuePKR)}
                      </div>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 border border-white/10 space-y-1">
                      <span className="text-xs text-neutral-400">Completed Orders</span>
                      <div className="text-xl font-black text-white">
                        {selectedClient.totalOrders} Orders
                      </div>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 border border-white/10 space-y-1">
                      <span className="text-xs text-neutral-400">Client Health Score</span>
                      <div className="text-xl font-black text-emerald-400 flex items-center gap-1.5">
                        <Activity className="w-4 h-4" />
                        {selectedClient.healthScore}%
                      </div>
                    </div>
                  </div>

                  {/* DETAILS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* LEFT COLUMN: PERSONAL & COMPANY DETAILS */}
                    <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 bg-neutral-900/40">
                      <h3 className="text-xs font-bold text-[#E5C158] uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" />
                        Contact & Account Metadata
                      </h3>

                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400">Email Address</span>
                          <span className="font-semibold text-white">{selectedClient.email}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400">Phone / WhatsApp</span>
                          <span className="font-semibold text-white font-mono">{selectedClient.phone}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400">Location</span>
                          <span className="font-semibold text-white flex items-center gap-1">
                            {selectedClient.countryFlag} {selectedClient.country}
                          </span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400">Timezone</span>
                          <span className="font-semibold text-neutral-300">{selectedClient.timezone}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400">Assigned Manager</span>
                          <span className="font-semibold text-[#E5C158]">{selectedClient.accountManager}</span>
                        </div>

                        <div className="flex justify-between py-1">
                          <span className="text-neutral-400">Member Since</span>
                          <span className="font-semibold text-neutral-300">{selectedClient.registrationDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: TAGS & QUICK NOTE HIGHLIGHT */}
                    <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 bg-neutral-900/40">
                      <h3 className="text-xs font-bold text-[#E5C158] uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="w-4 h-4" />
                        Account Tags & Recent Admin Note
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {selectedClient.tags.map((t, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10">
                        <span className="text-[11px] text-neutral-400 font-semibold block mb-1">Latest Private Admin Note:</span>
                        <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-neutral-300 italic">
                          "{selectedClient.privateNotes[0] || 'No private notes added yet.'}"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS & ORDERS */}
              {profileTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Order & Project History</h3>
                    <button
                      onClick={() => {
                        setModalClient(selectedClient);
                        setActiveModal('create_order');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#E5C158] text-black font-bold text-xs flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Create New Order
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedClient.recentOrders.map((ord) => (
                      <div key={ord.id} className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-[#E5C158] font-bold">{ord.id}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                              ord.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            }`}>
                              {ord.status.replace('_', ' ')}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-neutral-300">
                              {ord.speedMultiplier}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-white">{ord.serviceName}</h4>
                          <span className="text-[10px] text-neutral-500">{ord.date}</span>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-black text-white font-mono">{formatMoney(ord.amountPKR)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: INVOICES & RECEIPTS */}
              {profileTab === 'invoices' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Invoices & Payment Verification Receipts</h3>
                    <button
                      onClick={() => {
                        setModalClient(selectedClient);
                        setCustomInvoiceAmount('15000');
                        setActiveModal('send_invoice');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#E5C158] text-black font-bold text-xs flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Generate Custom Invoice
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedClient.recentInvoices.map((inv) => (
                      <div key={inv.id} className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-[#E5C158] font-bold">{inv.id}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              PAID & VERIFIED
                            </span>
                          </div>
                          <p className="text-xs text-neutral-300">Method: {inv.paymentMethod}</p>
                          <span className="text-[10px] text-neutral-500">{inv.date}</span>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-black text-white font-mono">{formatMoney(inv.amountPKR)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: FILES */}
              {profileTab === 'files' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">Uploaded Briefs & Deliverable Assets</h3>
                  <div className="space-y-2">
                    {selectedClient.recentFiles.map((file) => (
                      <div key={file.id} className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-[#E5C158]" />
                          <div>
                            <span className="text-xs font-bold text-white block">{file.name}</span>
                            <span className="text-[10px] text-neutral-400">{file.size} • {file.uploadDate}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => onShowToast(`📥 Download initialized for ${file.name}`)}
                          className="px-3 py-1.5 rounded-lg glass-card border border-white/10 text-xs text-white hover:border-[#E5C158] flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5 text-[#E5C158]" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: PRIVATE ADMIN NOTES */}
              {profileTab === 'notes' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Private Internal Admin Notes</h3>
                    <button
                      onClick={() => {
                        setModalClient(selectedClient);
                        setActiveModal('add_note');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#E5C158] text-black font-bold text-xs flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add New Note
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedClient.privateNotes.map((note, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs text-neutral-200">
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: GEMINI AI INSIGHTS */}
              {profileTab === 'ai_insights' && (
                <div className="glass-card rounded-2xl p-6 border border-[#E5C158]/30 bg-gradient-to-r from-neutral-900 via-black to-[#0F0F0F] space-y-4">
                  <div className="flex items-center gap-2 text-[#E5C158]">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="text-sm font-extrabold uppercase tracking-wider">Gemini 1.5 Pro Client Intelligence Report</h3>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {selectedClient.aiInsightSummary}
                  </p>
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] text-neutral-400">
                    💡 <strong className="text-white">Recommended Cross-Sell:</strong> Recommend offering 20% bundle discount on Executive Pitch Deck updates for upcoming Q3 funding rounds.
                  </div>
                </div>
              )}

              {/* TAB 7: TIMELINE */}
              {profileTab === 'timeline' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white">Chronological Activity Log</h3>
                  <div className="space-y-2 border-l-2 border-[#E5C158]/30 pl-4">
                    {selectedClient.activityTimeline.map((item) => (
                      <div key={item.id} className="relative space-y-0.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E5C158] absolute -left-[21px] top-1" />
                        <span className="text-[10px] text-neutral-500 font-mono">{item.timestamp} • {item.actor}</span>
                        <p className="text-xs text-neutral-200 font-medium">{item.event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="p-4 border-t border-white/10 bg-black/60 flex items-center justify-between text-xs text-neutral-400">
              <span>Client Record Locked & Encrypted</span>
              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all"
              >
                Close 360° Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ACTION MODAL: ADD PRIVATE NOTE */}
      {activeModal === 'add_note' && modalClient && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl border border-white/20 bg-[#0F0F12] w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#E5C158]" />
                Add Private Note for {modalClient.name}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <textarea
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Type private admin note (visible only to agency staff)..."
              rows={4}
              className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#E5C158]"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-neutral-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-bold text-xs hover:opacity-90"
              >
                Save Private Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ACTION MODAL: COMPOSE EMAIL */}
      {activeModal === 'send_email' && modalClient && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl border border-white/20 bg-[#0F0F12] w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400" />
                Send Email to {modalClient.name} ({modalClient.email})
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Message Body</label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Dear client, regarding your presentation order..."
                  rows={5}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-neutral-500">From: mfsmedia.agency@gmail.com</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-neutral-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onShowToast(`📧 Email sent to ${modalClient.email}`);
                    setActiveModal(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-sky-500 text-white font-bold text-xs flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ACTION MODAL: CREATE ORDER */}
      {activeModal === 'create_order' && modalClient && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl border border-white/20 bg-[#0F0F12] w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#E5C158]" />
                Draft New Order for {modalClient.name}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Select Service</label>
                <select className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white">
                  <option>Executive Presentation Design</option>
                  <option>ATS Resume & CV Engineering</option>
                  <option>Academic Thesis & Assignment Writing</option>
                  <option>Corporate Report Formatting</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Slide / Page Count</label>
                <input type="number" defaultValue={10} className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white" />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Delivery Speed Multiplier</label>
                <select className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white">
                  <option>Standard Delivery</option>
                  <option>Express Speed (+30%)</option>
                  <option>Priority Speed (+50%)</option>
                  <option>Same-Day Speed (+75%)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-white/5 text-xs text-neutral-300">
                Cancel
              </button>
              <button
                onClick={() => {
                  onShowToast(`🎉 Order ORD-MFS-${Math.floor(100000 + Math.random() * 900000)} created for ${modalClient.name}!`);
                  setActiveModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-bold text-xs"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ACTION MODAL: SEND INVOICE */}
      {activeModal === 'send_invoice' && modalClient && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl border border-white/20 bg-[#0F0F12] w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#E5C158]" />
                Generate Invoice for {modalClient.name}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400">Payment Accounts Built-in:</span>
                <p className="text-neutral-200">EasyPaisa: 03116191234</p>
                <p className="text-neutral-200">JazzCash: 03015323688</p>
                <p className="text-neutral-200">Askari Bank: 00553230017265</p>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Invoice Amount (PKR Base)</label>
                <input
                  type="number"
                  value={customInvoiceAmount}
                  onChange={(e) => setCustomInvoiceAmount(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white font-mono font-bold"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-white/5 text-xs text-neutral-300">
                Cancel
              </button>
              <button
                onClick={() => {
                  onShowToast(`📄 Invoice INV-2026-${Math.floor(1000 + Math.random() * 9000)} generated & sent to ${modalClient.email}!`);
                  setActiveModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-bold text-xs"
              >
                Send Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FUTURE EXPANSION & CRM AUTOMATION ZONE */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-r from-neutral-900 via-black to-[#0F0F0F] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#E5C158]" />
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Future Expansion Zone • AI CRM Drip & Churn Automation Engine
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30">
            ROADMAP • PHASE 16 READY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              Automated Re-engagement Sequences
            </h4>
            <p className="text-neutral-400 text-[11px]">
              Sends automated follow-up emails and WhatsApp nudges 30 days post-deliverable to offer discounts on deck updates.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              AI Churn Risk Predictor
            </h4>
            <p className="text-neutral-400 text-[11px]">
              Monitors client response latency and login frequency to alert agency staff before accounts go cold.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Tiered Loyalty Auto-Discounting
            </h4>
            <p className="text-neutral-400 text-[11px]">
              Automatically unlocks 10% lifetime VIP discount when client reaches 5+ completed orders or 100k PKR LTV.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
