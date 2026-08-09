import React, { useState } from 'react';
import {
  History,
  Clock,
  Calendar,
  Search,
  Filter,
  Download,
  Printer,
  FileText,
  User,
  CreditCard,
  FileCheck,
  UploadCloud,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Lock,
  Tag,
  ShieldCheck,
  XCircle,
  Maximize2,
  Minimize2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Currency } from '../types';

export type EventTypeCategory =
  | 'All'
  | 'Status Changes'
  | 'Payments'
  | 'Files'
  | 'Messages'
  | 'Assignments'
  | 'Revisions'
  | 'Deliveries'
  | 'System Events';

export interface OrderTimelineEvent {
  id: string;
  orderId: string;
  dateGroup: string; // e.g., 'Today — July 25, 2026'
  timestamp: string; // e.g., '16:20 PKT'
  eventTitle: string;
  category: EventTypeCategory;
  shortDescription: string;
  performedBy: {
    name: string;
    role: string;
    avatarInitials: string;
    isClient?: boolean;
  };
  previousValue?: string;
  newValue?: string;
  badgeColor: 'gold' | 'green' | 'blue' | 'purple' | 'amber' | 'red' | 'cyan';
  relatedFiles?: Array<{ name: string; size: string; type: string }>;
  relatedNotes?: string;
}

const SAMPLE_TIMELINE_EVENTS: OrderTimelineEvent[] = [
  {
    id: 'evt-101',
    orderId: 'ORD-MFS-849201',
    dateGroup: 'Today — July 25, 2026',
    timestamp: '16:20 PKT',
    eventTitle: 'Draft Slide Previews Released',
    category: 'Deliveries',
    shortDescription: 'Presentation Squad Alpha released initial 5 slides draft in Gold MFS theme for internal executive review.',
    performedBy: {
      name: 'Design Lead Ali',
      role: 'Presentation Squad Alpha',
      avatarInitials: 'DA'
    },
    previousValue: 'Drafting in Progress',
    newValue: 'v1.0 Proof Released',
    badgeColor: 'purple',
    relatedFiles: [
      { name: 'draft_pitch_deck_v1_preview.pptx', size: '18.2 MB', type: 'PPTX' },
      { name: 'executive_slide_previews_bundle.pdf', size: '8.5 MB', type: 'PDF' }
    ],
    relatedNotes: 'Charts on slide 3 and slide 5 rendered in vectorized gold gradients.'
  },
  {
    id: 'evt-102',
    orderId: 'ORD-MFS-849201',
    dateGroup: 'Today — July 25, 2026',
    timestamp: '15:10 PKT',
    eventTitle: 'Priority Level Escalated',
    category: 'Status Changes',
    shortDescription: 'Order priority bumped from Standard to Priority (+50%) for guaranteed 24-hour delivery turnaround.',
    performedBy: {
      name: 'Muhammad Shehroz Sultan',
      role: 'Lead Director / CEO',
      avatarInitials: 'SS'
    },
    previousValue: 'Standard',
    newValue: 'Priority (+50%)',
    badgeColor: 'amber',
    relatedNotes: 'SLA speed multiplier applied upon EasyPaisa priority audit confirmation.'
  },
  {
    id: 'evt-103',
    orderId: 'ORD-MFS-849201',
    dateGroup: 'Today — July 25, 2026',
    timestamp: '14:36 PKT',
    eventTitle: 'Brand Vector Assets Uploaded',
    category: 'Files',
    shortDescription: 'Client uploaded high-resolution vector logos and 2026 corporate brand identity guidelines ZIP archive.',
    performedBy: {
      name: 'Muhammad Shehroz Sultan',
      role: 'Client (Verified)',
      avatarInitials: 'MS',
      isClient: true
    },
    badgeColor: 'cyan',
    relatedFiles: [
      { name: 'brand_logos_vector_assets_2026.zip', size: '45.1 MB', type: 'ZIP' },
      { name: 'investor_presentation_brief_v2.pdf', size: '12.4 MB', type: 'PDF' }
    ]
  },
  {
    id: 'evt-104',
    orderId: 'ORD-MFS-849201',
    dateGroup: 'Today — July 25, 2026',
    timestamp: '14:32 PKT',
    eventTitle: 'EasyPaisa Payment Verified',
    category: 'Payments',
    shortDescription: 'EasyPaisa transfer TX-EP-9821734192 for PKR 45,000 audited and verified against account 03116191234.',
    performedBy: {
      name: 'Finance Audit Lead',
      role: 'MFS Financial Operations',
      avatarInitials: 'FA'
    },
    previousValue: 'Pending Audit',
    newValue: 'Verified',
    badgeColor: 'green',
    relatedNotes: 'Grand Launch 50% discount active. Official tax invoice INV-MFS-2026-849201 generated.'
  },
  {
    id: 'evt-105',
    orderId: 'ORD-MFS-849201',
    dateGroup: 'Today — July 25, 2026',
    timestamp: '14:30 PKT',
    eventTitle: 'New Order Registered',
    category: 'System Events',
    shortDescription: 'Order ORD-MFS-849201 successfully registered via MFS Growth Online Order System.',
    performedBy: {
      name: 'MFS Automated System',
      role: 'System Gateway',
      avatarInitials: 'SY'
    },
    previousValue: 'N/A',
    newValue: 'Awaiting Payment',
    badgeColor: 'gold'
  },
  {
    id: 'evt-106',
    orderId: 'ORD-MFS-849202',
    dateGroup: 'Yesterday — July 24, 2026',
    timestamp: '18:20 PKT',
    eventTitle: 'CV Brief & Draft Resume Received',
    category: 'Files',
    shortDescription: 'Client Hamza Malik submitted existing 2024 software architect resume for ATS engineering overhaul.',
    performedBy: {
      name: 'Hamza Malik',
      role: 'Client',
      avatarInitials: 'HM',
      isClient: true
    },
    badgeColor: 'cyan',
    relatedFiles: [
      { name: 'old_resume_draft_2024.docx', size: '2.1 MB', type: 'DOCX' }
    ]
  },
  {
    id: 'evt-107',
    orderId: 'ORD-MFS-849202',
    dateGroup: 'Yesterday — July 24, 2026',
    timestamp: '18:15 PKT',
    eventTitle: 'JazzCash Payment Cleared',
    category: 'Payments',
    shortDescription: 'JazzCash TX-JC-7712391082 for PKR 10,400 verified on account 03015323688.',
    performedBy: {
      name: 'System Auto Gateway',
      role: 'JazzCash API Integration',
      avatarInitials: 'JC'
    },
    previousValue: 'Pending',
    newValue: 'Verified',
    badgeColor: 'green'
  }
];

interface OrderTimelineActivityProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const OrderTimelineActivity: React.FC<OrderTimelineActivityProps> = ({
  currency,
  onShowToast
}) => {
  const [events, setEvents] = useState<OrderTimelineEvent[]>(SAMPLE_TIMELINE_EVENTS);
  const [activeCategory, setActiveCategory] = useState<EventTypeCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('ORD-MFS-849201');
  const [expandedEventIds, setExpandedEventIds] = useState<Record<string, boolean>>({
    'evt-101': true,
    'evt-104': true
  });

  const toggleExpand = (id: string) => {
    setExpandedEventIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter events based on active category, search query, and order ID
  const filteredEvents = events.filter((evt) => {
    if (orderFilter !== 'All' && evt.orderId !== orderFilter) return false;
    if (activeCategory !== 'All' && evt.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = evt.eventTitle.toLowerCase().includes(q);
      const matchDesc = evt.shortDescription.toLowerCase().includes(q);
      const matchAdmin = evt.performedBy.name.toLowerCase().includes(q);
      const matchOrder = evt.orderId.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchAdmin || matchOrder;
    }
    return true;
  });

  // Group events by date group
  const groupedEvents: Record<string, OrderTimelineEvent[]> = filteredEvents.reduce<Record<string, OrderTimelineEvent[]>>((acc, evt) => {
    if (!acc[evt.dateGroup]) {
      acc[evt.dateGroup] = [];
    }
    acc[evt.dateGroup].push(evt);
    return acc;
  }, {});

  const getBadgeStyle = (color: OrderTimelineEvent['badgeColor']) => {
    switch (color) {
      case 'gold':
        return 'bg-[#E5C158]/20 text-[#E5C158] border-[#E5C158]/40';
      case 'green':
        return 'bg-[#28C76F]/20 text-[#28C76F] border-[#28C76F]/40';
      case 'blue':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'purple':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'amber':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'red':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'cyan':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* TIMELINE CONTROL HEADER */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 shadow-[0_0_15px_rgba(229,193,88,0.2)]">
              <History className="w-6 h-6 text-[#E5C158]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#E5C158]/20 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/40 uppercase tracking-wider">
                  PHASE 6 ENGINE
                </span>
                <span className="text-neutral-500 text-xs font-mono">• Single Source of Audit Truth</span>
              </div>
              <h2 className="font-poppins font-black text-xl text-white">
                Order Timeline & Activity History
              </h2>
            </div>
          </div>

          {/* EXPORT & PRINT BUTTONS */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                if (onShowToast) onShowToast('Exporting complete timeline audit log to CSV/PDF...');
              }}
              className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all border border-white/10"
            >
              <Download className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Export Timeline</span>
            </button>

            <button
              onClick={() => {
                window.print();
              }}
              className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all border border-white/10"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print Activity Log</span>
            </button>
          </div>

        </div>

        {/* SEARCH & FILTERS STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-white/10 text-xs">
          
          {/* SEARCH INPUT (5 COLS) */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activity by keyword, admin name, event..."
              className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-black/40 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          {/* ORDER TARGET SELECTOR (4 COLS) */}
          <div className="md:col-span-4 flex items-center gap-2 bg-black/40 px-3 py-2 rounded-2xl border border-white/15">
            <Tag className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
            <span className="text-neutral-400 font-mono font-bold shrink-0">Order:</span>
            <select
              value={orderFilter}
              onChange={(e) => setOrderFilter(e.target.value)}
              className="w-full bg-transparent text-white font-mono font-bold focus:outline-none cursor-pointer"
            >
              <option value="ORD-MFS-849201" className="bg-[#0D0D12]">ORD-MFS-849201 (Pitch Deck)</option>
              <option value="ORD-MFS-849202" className="bg-[#0D0D12]">ORD-MFS-849202 (ATS Resume)</option>
              <option value="ORD-MFS-849203" className="bg-[#0D0D12]">ORD-MFS-849203 (Academic Paper)</option>
              <option value="All" className="bg-[#0D0D12]">All Orders Audit Stream</option>
            </select>
          </div>

          {/* SUMMARY COUNT (3 COLS) */}
          <div className="md:col-span-3 p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <span className="text-neutral-400 font-mono text-[10px] uppercase">Events Found</span>
            <strong className="text-[#28C76F] font-mono font-bold text-sm">{filteredEvents.length} Events</strong>
          </div>

        </div>

      </div>

      {/* EVENT CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          'All',
          'Status Changes',
          'Payments',
          'Files',
          'Messages',
          'Assignments',
          'Revisions',
          'Deliveries',
          'System Events'
        ].map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as EventTypeCategory)}
              className={`px-3.5 py-2 rounded-2xl font-bold font-poppins transition-all cursor-pointer border shrink-0 ${
                isActive
                  ? 'bg-[#E5C158] text-black border-[#E5C158] shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                  : 'bg-white/[0.02] text-neutral-400 hover:text-white border-white/10'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* VERTICAL TIMELINE STREAM */}
      {/* ========================================================= */}
      <div className="space-y-8">
        
        {Object.keys(groupedEvents).length === 0 ? (
          <div className="glass-card rounded-3xl border border-white/10 p-12 text-center space-y-3 bg-gradient-to-b from-white/[0.02] to-transparent">
            <History className="w-10 h-10 text-neutral-500 mx-auto" />
            <h3 className="font-poppins font-bold text-white text-base">No Matching Activity Records</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              No timeline events match the selected category filter or search query.
            </p>
          </div>
        ) : (
          Object.entries(groupedEvents).map(([dateGroup, evts]) => (
            <div key={dateGroup} className="space-y-4">
              
              {/* DATE GROUP HEADER */}
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 font-mono font-bold text-xs flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{dateGroup}</span>
                </div>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              {/* TIMELINE ITEMS */}
              <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:top-2 before:bottom-2 before:left-2.5 sm:before:left-3.5 before:w-0.5 before:bg-gradient-to-b before:from-[#E5C158]/50 before:via-white/10 before:to-transparent">
                {evts.map((evt) => {
                  const isExpanded = expandedEventIds[evt.id];
                  return (
                    <div key={evt.id} className="relative group">
                      
                      {/* TIMELINE NODE DOT */}
                      <div className="absolute -left-6 sm:-left-8 top-3 w-5 h-5 rounded-full bg-[#0D0D12] border-2 border-[#E5C158] flex items-center justify-center text-[8px] font-bold text-[#E5C158] shadow-[0_0_10px_rgba(229,193,88,0.4)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
                      </div>

                      {/* CARD */}
                      <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-3 bg-gradient-to-b from-[#0D0D12] to-transparent hover:border-white/20 transition-all">
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            
                            {/* AVATAR */}
                            <div className={`w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center shrink-0 border ${
                              evt.performedBy.isClient
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                                : 'bg-[#E5C158]/20 text-[#E5C158] border-[#E5C158]/30'
                            }`}>
                              {evt.performedBy.avatarInitials}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-poppins font-bold text-white text-sm">{evt.eventTitle}</h4>
                                <span className={`px-2 py-0.2 rounded text-[9px] font-mono font-bold uppercase border ${getBadgeStyle(evt.badgeColor)}`}>
                                  {evt.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-400 font-mono">
                                By <strong className="text-white">{evt.performedBy.name}</strong> ({evt.performedBy.role}) • {evt.timestamp}
                              </p>
                            </div>

                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-mono text-neutral-500">{evt.orderId}</span>
                            <button
                              onClick={() => toggleExpand(evt.id)}
                              className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* SHORT DESCRIPTION */}
                        <p className="text-xs text-neutral-200 leading-relaxed font-sans">
                          {evt.shortDescription}
                        </p>

                        {/* EXPANDABLE DETAILS */}
                        {isExpanded && (
                          <div className="pt-3 border-t border-white/10 space-y-3 text-xs animate-fadeIn">
                            
                            {/* VALUE TRANSITION IF PRESENT */}
                            {(evt.previousValue || evt.newValue) && (
                              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 font-mono text-[11px]">
                                <span className="text-neutral-400">Value Transition:</span>
                                <span className="text-amber-300 line-through">{evt.previousValue}</span>
                                <ArrowRight className="w-3 h-3 text-[#E5C158]" />
                                <strong className="text-[#28C76F] font-bold">{evt.newValue}</strong>
                              </div>
                            )}

                            {/* RELATED NOTES */}
                            {evt.relatedNotes && (
                              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px]">
                                <strong className="font-mono uppercase text-[9px] block text-amber-400">Audit Note:</strong>
                                {evt.relatedNotes}
                              </div>
                            )}

                            {/* RELATED FILES */}
                            {evt.relatedFiles && evt.relatedFiles.length > 0 && (
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
                                  Attached Event Artifacts:
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {evt.relatedFiles.map((rf, i) => (
                                    <div key={i} className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-[11px]">
                                      <span className="text-white font-mono truncate">{rf.name}</span>
                                      <span className="text-neutral-500 font-mono text-[9px] shrink-0">{rf.size}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>
                        )}

                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};
