import React, { useState } from 'react';
import { Currency } from '../types';
import { sendActionNotificationEmail } from '../lib/emailNotificationService';
import {
  Briefcase,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Download,
  Upload,
  Eye,
  Plus,
  RefreshCw,
  PhoneCall,
  MessageSquare,
  Bot,
  Building2,
  FileCheck,
  ShieldCheck,
  Zap,
  Tag,
  Share2,
  Sliders,
  Check,
  X,
  FileUp,
  FolderArchive,
  ArrowUpRight,
  Info
} from 'lucide-react';

interface ProjectDetailsCenterProps {
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
  setActiveTab?: (tab: string) => void;
}

export const ProjectDetailsCenter: React.FC<ProjectDetailsCenterProps> = ({
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
  // Selected order index from live Supabase orders
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0);
  const activeOrder = orders && orders.length > 0 ? (orders[selectedOrderIndex] || orders[0]) : null;

  // Empty State Toggle for Testing
  const [hasProjectData, setHasProjectData] = useState(true);

  // Expand / Collapse State for Project Description Brief
  const [isBriefExpanded, setIsBriefExpanded] = useState(true);

  // File Upload Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFileList, setUploadedFileList] = useState<
    { name: string; type: string; date: string; size: string; status: string }[]
  >([
    {
      name: 'Investor_Pitch_Outline.docx',
      type: 'DOCX',
      date: 'July 24, 2026 • 09:30 AM',
      size: '2.4 MB',
      status: 'Verified & Ingested',
    },
    {
      name: 'Brand_Logo_Vector.png',
      type: 'PNG',
      date: 'July 24, 2026 • 09:32 AM',
      size: '1.1 MB',
      status: 'Ingested',
    },
    {
      name: 'Financial_Projections_2026.xlsx',
      type: 'XLSX',
      date: 'July 24, 2026 • 09:35 AM',
      size: '3.8 MB',
      status: 'Verified',
    },
  ]);

  // New File Upload Form State
  const [newFileName, setNewFileName] = useState('');

  // Phase 4 Roadmap Checklist Modal
  const [showChecklistModal, setShowChecklistModal] = useState(false);

  // Revision Modal State
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [revisionNote, setRevisionNote] = useState('');

  const handleAddFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    const fileExt = newFileName.split('.').pop()?.toUpperCase() || 'FILE';
    const newFileObj = {
      name: newFileName,
      type: fileExt,
      date: 'Just Now',
      size: '1.5 MB',
      status: 'Uploaded & AI Scanning',
    };

    setUploadedFileList([newFileObj, ...uploadedFileList]);
    setNewFileName('');
    setShowUploadModal(false);

    // Dispatch automated email notification
    await sendActionNotificationEmail({
      actionType: 'file_upload',
      actionTitle: `New File Uploaded: ${newFileName}`,
      clientName: activeOrder?.guest_name || customerName,
      clientEmail: activeOrder?.guest_email || customerEmail,
      referenceId: activeOrder?.order_number || activeOrder?.id || 'PRJ-MFS-849201',
      details: `File Attached: ${newFileName} (${fileExt})\nProject: ${activeOrder?.service_type || 'Digital Service'}`,
    }).catch(() => null);

    if (onShowToast) {
      onShowToast(`File "${newFileName}" uploaded & confirmation emails dispatched!`);
    }
  };

  const handleRequestRevision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNote.trim()) return;

    const currentNote = revisionNote;
    setShowRevisionModal(false);
    setRevisionNote('');

    // Dispatch automated email notification
    await sendActionNotificationEmail({
      actionType: 'revision_request',
      actionTitle: `Revision Request: ${activeOrder?.service_type || 'Project'}`,
      clientName: activeOrder?.guest_name || customerName,
      clientEmail: activeOrder?.guest_email || customerEmail,
      referenceId: activeOrder?.order_number || activeOrder?.id || 'PRJ-MFS-849201',
      details: `Revision Instructions:\n${currentNote}`,
    }).catch(() => null);

    if (onShowToast) {
      onShowToast('🎉 Revision request logged & confirmation emails dispatched to client and admin!');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* TOP HEADER & ROADMAP STATUS CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card rounded-2xl border border-white/10 p-4 bg-black/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/30">
            <Briefcase className="w-5 h-5 text-[#E5C158]" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block">
              CLIENT DASHBOARD • PHASE 4
            </span>
            <h1 className="text-base font-poppins font-bold text-white">
              Project Details & Briefing Hub
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Empty State Button */}
          <button
            onClick={() => {
              setHasProjectData(!hasProjectData);
              if (onShowToast) {
                onShowToast(hasProjectData ? 'Switched to empty state view.' : 'Restored project details view.');
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>{hasProjectData ? 'Simulate Empty State' : 'View Project Details'}</span>
          </button>

          {/* Phase 4 Roadmap Status Trigger */}
          <button
            onClick={() => setShowChecklistModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#E5C158]/10 hover:bg-[#E5C158]/20 border border-[#E5C158]/40 text-[#E5C158] font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
            <span>Phase 4 Roadmap</span>
          </button>
        </div>
      </div>

      {hasProjectData ? (
        <>
          {/* 1. PROJECT OVERVIEW CARDS */}
          <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 sm:p-8 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden space-y-6 shadow-[0_0_35px_rgba(229,193,88,0.08)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5C158]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Multiple Supabase Orders Selector */}
            {orders && orders.length > 1 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E5C158]" />
                  <span className="text-xs font-bold text-[#E5C158]">Select Live Supabase Order ({orders.length} found):</span>
                </div>
                <select
                  value={selectedOrderIndex}
                  onChange={(e) => setSelectedOrderIndex(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-xl bg-black border border-white/20 text-white text-xs outline-none cursor-pointer"
                >
                  {orders.map((ord: any, idx: number) => (
                    <option key={ord.id || idx} value={idx}>
                      {ord.order_number || ord.id} • {ord.service_type} ({ord.currency || 'PKR'} {Number(ord.total_amount || 0).toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Title & Status Badge */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-[11px] font-bold uppercase">
                  <Tag className="w-3.5 h-3.5 text-[#28C76F]" />
                  <span>{activeOrder ? activeOrder.service_type : 'PRESENTATION DESIGN & PITCH DECKS'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white tracking-tight">
                  {activeOrder ? activeOrder.service_type : 'Executive Presentation Pitch Deck'}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300">
                  Client: <strong className="text-white">{activeOrder?.guest_name || customerName}</strong> ({activeOrder?.guest_email || customerEmail})
                </p>
              </div>

              {/* Status & Priority Badge */}
              <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                <span className="px-3.5 py-1.5 rounded-full bg-[#28C76F]/10 border border-[#28C76F]/30 text-[#28C76F] text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#28C76F] animate-ping" />
                  <span>STATUS: {(activeOrder?.status || 'IN PRODUCTION').replace(/_/g, ' ').toUpperCase()}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-[11px] font-bold font-mono uppercase">
                  ⚡ {(activeOrder?.delivery_tier || 'EXPRESS').toUpperCase()} GUARANTEE
                </span>
              </div>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase block">Order / Ref ID</span>
                <strong className="text-white font-mono font-bold text-xs block truncate">{activeOrder ? (activeOrder.order_number || activeOrder.id) : 'PRJ-MFS-849201'}</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase block">Total Amount</span>
                <strong className="text-[#E5C158] font-mono font-bold text-xs block">{activeOrder ? `${activeOrder.currency || 'PKR'} ${Number(activeOrder.total_amount || 0).toLocaleString()}` : 'ORD-MFS-984210'}</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase block">Order Date</span>
                <strong className="text-white font-bold text-xs block">{activeOrder?.created_at ? new Date(activeOrder.created_at).toLocaleDateString() : 'July 24, 2026'}</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase block">Payment Method</span>
                <strong className="text-[#28C76F] font-bold text-xs block">{activeOrder?.payment_method || 'EasyPaisa'}</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase block">Service Type</span>
                <strong className="text-white font-bold text-xs block truncate">{activeOrder?.service_type || '10-Slide Deck'}</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase block">Grand Discount</span>
                <strong className="text-[#E5C158] font-bold text-xs block">50% Launch OFF</strong>
              </div>
            </div>
          </div>

          {/* 2. PROJECT BRIEF & SUBMITTED REQUIREMENTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* PROJECT BRIEF & DESCRIPTION (7 Cols) */}
            <div className="lg:col-span-7 glass-card rounded-3xl border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#E5C158]" />
                  <h3 className="text-lg font-poppins font-bold text-white">Project Description & Brief</h3>
                </div>

                <button
                  onClick={() => setIsBriefExpanded(!isBriefExpanded)}
                  className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>{isBriefExpanded ? 'Collapse' : 'Expand'}</span>
                  {isBriefExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {isBriefExpanded && (
                <div className="space-y-4 text-xs animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                    <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block">
                      CORE PROJECT GOAL
                    </span>
                    <p className="text-neutral-200 leading-relaxed font-sans">
                      "Design a high-stakes 10-slide executive pitch deck for securing investor growth capital in our technology startup expansion across South Asia and international markets."
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                    <span className="text-[10px] font-bold text-[#28C76F] uppercase tracking-wider block">
                      VISUAL THEME & INSTRUCTIONS
                    </span>
                    <p className="text-neutral-200 leading-relaxed font-sans">
                      "Adhere strictly to a dark luxury visual identity with MFS primary gold accents (#E5C158). Maintain clean typographic hierarchy using Poppins bold headers and Inter body typography. Minimum text padding of 16px with no wrapped text inside buttons or badges."
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                      SPECIAL REQUESTS & DELIVERABLES
                    </span>
                    <p className="text-neutral-200 leading-relaxed font-sans">
                      "Export deliverables in both fully editable Microsoft PowerPoint (.pptx) format and high-definition PDF document. Provide embedded vector icon assets."
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* PROJECT SPECIFICATION PARAMETERS (5 Cols) */}
            <div className="lg:col-span-5 glass-card rounded-3xl border border-white/10 p-6 space-y-4">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-poppins font-bold text-white">Submitted Specifications</h3>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">100% Ingested</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { label: 'Target Audience Level', val: 'Executive & Investor Board' },
                  { label: 'Subject / Niche', val: 'Tech Startup Expansion & SaaS' },
                  { label: 'Slide / Page Count', val: '10 Custom Slides' },
                  { label: 'Color Token Palette', val: 'Gold (#E5C158) + Dark (#050507)' },
                  { label: 'Referencing / Style', val: 'Corporate / WCAG AA Compliant' },
                  { label: 'Language Format', val: 'International English' },
                  { label: 'Turnaround Speed', val: 'Express Priority (24 Hours)' },
                ].map((spec, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-neutral-400">{spec.label}:</span>
                    <strong className="text-white font-semibold text-right">{spec.val}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. UPLOADED CLIENT ATTACHMENTS & PROJECT FILES */}
          <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                  CLIENT ATTACHMENTS HUB
                </span>
                <h3 className="text-xl font-poppins font-bold text-white">Uploaded Project Source Files</h3>
              </div>

              <button
                onClick={() => setShowUploadModal(true)}
                className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)] flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>Upload Additional Files</span>
              </button>
            </div>

            {/* File Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {uploadedFileList.map((file, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 space-y-3 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-[#E5C158]/20 text-[#E5C158] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-poppins font-bold text-white text-xs truncate" title={file.name}>
                          {file.name}
                        </h4>
                        <span className="text-[10px] text-neutral-400 font-mono block">{file.size} • {file.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                    <span className="text-neutral-400 font-mono">{file.date}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 font-bold">
                      {file.status}
                    </span>
                  </div>

                  {/* Action row */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        if (onShowToast) onShowToast(`Secured Preview: Inspecting file "${file.name}"...`);
                      }}
                      className="flex-1 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-semibold text-[11px] transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#E5C158]" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => {
                        if (onShowToast) onShowToast(`Downloading file "${file.name}" to client sandbox...`);
                      }}
                      className="flex-1 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-semibold text-[11px] transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5 text-[#28C76F]" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. PROJECT DELIVERABLES HUB */}
          <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#28C76F]">
                OUTPUT ASSETS
              </span>
              <h3 className="text-xl font-poppins font-bold text-white">Project Deliverables & Assets</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Executive_Pitch_Deck_Master.pptx',
                  type: 'Editable PowerPoint Slide Deck',
                  status: 'In Production (Slide 7 Polish)',
                  statusColor: 'bg-[#E5C158]/10 text-[#E5C158] border-[#E5C158]/30',
                  icon: FileText,
                  badge: 'PRIMARY DELIVERABLE',
                },
                {
                  title: 'Executive_Pitch_Deck_Preview.pdf',
                  type: 'Watermarked Client Review PDF',
                  status: 'Scheduled (Tomorrow 02:00 PM)',
                  statusColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
                  icon: FileCheck,
                  badge: 'PREVIEW DRAFT',
                },
                {
                  title: 'Source_Assets_Vector_Icons.zip',
                  type: 'Vector Graphic Icons & Brand Tokens',
                  status: 'Scheduled (Tomorrow 06:00 PM)',
                  statusColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
                  icon: FolderArchive,
                  badge: 'ASSET BUNDLE',
                },
                {
                  title: 'MFS_Quality_Certificate.pdf',
                  type: '12-Point AI & Design Audit Report',
                  status: 'Ready Post-Approval',
                  statusColor: 'bg-[#28C76F]/10 text-[#28C76F] border-[#28C76F]/30',
                  icon: ShieldCheck,
                  badge: 'COMPLIANCE REPORT',
                },
              ].map((del, idx) => {
                const IconComponent = del.icon;
                return (
                  <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                        {del.badge}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${del.statusColor}`}>
                        {del.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-white/5 text-white shrink-0">
                        <IconComponent className="w-5 h-5 text-[#E5C158]" />
                      </div>
                      <div>
                        <h4 className="font-poppins font-bold text-white text-sm">{del.title}</h4>
                        <p className="text-xs text-neutral-400">{del.type}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-end">
                      <button
                        onClick={() => {
                          if (onShowToast) onShowToast(`Deliverable file "${del.title}" will unlock upon draft release.`);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-[#E5C158]" />
                        <span>Download Deliverable</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. TEAM WORKFLOW & PROJECT NOTES */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Team Workflow (6 Cols) */}
            <div className="lg:col-span-6 glass-card rounded-3xl border border-white/10 p-6 space-y-4">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    WORKFLOW PIPELINE
                  </span>
                  <h3 className="text-lg font-poppins font-bold text-white">Project Team Workflow</h3>
                </div>
                <Building2 className="w-5 h-5 text-blue-400" />
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { stage: '1. Requirements Reviewed', dept: 'Creative Direction Unit', done: true },
                  { stage: '2. Project Allocated', dept: 'Lead Presentation Specialist', done: true },
                  { stage: '3. Wireframing & Research', dept: 'Content & Strategy Desk', done: true },
                  { stage: '4. Active Production (Slide 7)', dept: 'Senior Design Lab', done: true, active: true },
                  { stage: '5. Internal Quality Scan', dept: 'Compliance & Audit Unit', done: false },
                  { stage: '6. Ready for Delivery', dept: 'Dispatch & Release Unit', done: false },
                ].map((st, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl border flex items-center justify-between ${
                      st.active
                        ? 'bg-[#E5C158]/10 border-[#E5C158] text-white'
                        : st.done
                        ? 'bg-[#28C76F]/10 border-[#28C76F]/30 text-[#28C76F]'
                        : 'bg-white/[0.02] border-white/5 text-neutral-500'
                    }`}
                  >
                    <div>
                      <strong className="block text-xs font-semibold">{st.stage}</strong>
                      <span className="text-[10px] font-mono text-neutral-400">{st.dept}</span>
                    </div>

                    <span className="text-[10px] font-extrabold uppercase">
                      {st.active ? '● Active' : st.done ? '✓ Completed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Notes & Updates (6 Cols) */}
            <div className="lg:col-span-6 glass-card rounded-3xl border border-white/10 p-6 space-y-4">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                    LOGGED NOTES
                  </span>
                  <h3 className="text-lg font-poppins font-bold text-white">Project Notes & Updates</h3>
                </div>
                <Info className="w-5 h-5 text-[#E5C158]" />
              </div>

              <div className="space-y-3 text-xs">
                {[
                  {
                    date: 'Today • 11:30 AM',
                    cat: 'Strategy Update',
                    desc: 'Slides 1 to 5 structure and financial wireframes completed.',
                  },
                  {
                    date: 'Today • 10:15 AM',
                    cat: 'Team Allocation',
                    desc: 'Senior Presentation Designer assigned alongside MFS AI Assistant linter.',
                  },
                  {
                    date: 'Today • 09:45 AM',
                    cat: 'Billing Verified',
                    desc: 'EasyPaisa transaction verified. Tax Invoice #INV-849201 generated.',
                  },
                ].map((note, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-[#E5C158] uppercase">{note.cat}</span>
                      <span className="text-neutral-500 font-mono">{note.date}</span>
                    </div>
                    <p className="text-neutral-200 text-xs leading-relaxed">{note.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. CLIENT QUICK ACTION BAR */}
          <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 bg-black/80 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158]">
                QUICK CONTROLS
              </span>
              <h3 className="text-lg font-poppins font-bold text-white">Client Action Bar</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <button
                onClick={() => setShowUploadModal(true)}
                className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-[#E5C158]/10 border border-white/10 text-left transition-colors cursor-pointer group"
              >
                <Upload className="w-5 h-5 text-[#E5C158] mb-1.5 group-hover:scale-110 transition-transform" />
                <strong className="text-white text-xs block font-bold">Upload Files</strong>
                <span className="text-[10px] text-neutral-400">Add instructions</span>
              </button>

              <button
                onClick={() => onOpenAIChat && onOpenAIChat('chat')}
                className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-[#28C76F]/10 border border-white/10 text-left transition-colors cursor-pointer group"
              >
                <MessageSquare className="w-5 h-5 text-[#28C76F] mb-1.5 group-hover:scale-110 transition-transform" />
                <strong className="text-white text-xs block font-bold">Ask MFS AI</strong>
                <span className="text-[10px] text-neutral-400">Instant answers</span>
              </button>

              <button
                onClick={() => setShowRevisionModal(true)}
                className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-purple-500/10 border border-white/10 text-left transition-colors cursor-pointer group"
              >
                <RefreshCw className="w-5 h-5 text-purple-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <strong className="text-white text-xs block font-bold">Request Revision</strong>
                <span className="text-[10px] text-neutral-400">7-Day Guarantee</span>
              </button>

              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('files');
                }}
                className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-blue-500/10 border border-white/10 text-left transition-colors cursor-pointer group"
              >
                <Download className="w-5 h-5 text-blue-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <strong className="text-white text-xs block font-bold">Download Files</strong>
                <span className="text-[10px] text-neutral-400">Deliverables hub</span>
              </button>

              <a
                href="https://wa.me/923015323689"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-[#28C76F]/10 border border-white/10 text-left transition-colors cursor-pointer group col-span-2 sm:col-span-1 block"
              >
                <PhoneCall className="w-5 h-5 text-[#28C76F] mb-1.5 group-hover:scale-110 transition-transform" />
                <strong className="text-white text-xs block font-bold">WhatsApp Support</strong>
                <span className="text-[10px] text-neutral-400">+92 301 5323689</span>
              </a>
            </div>
          </div>
        </>
      ) : (
        /* SMART EMPTY STATE */
        <div className="glass-card rounded-3xl border border-white/10 p-12 text-center space-y-6 max-w-xl mx-auto my-8">
          <div className="w-20 h-20 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(229,193,88,0.2)]">
            <Briefcase className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-poppins font-bold text-white">No Project Details Available Yet</h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mx-auto">
              You do not have any active project details stored in your workspace. Submit a new order with our <strong className="text-[#E5C158]">50% Grand Launch Discount</strong> to unlock full project specifications and real-time tracking.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                if (onNavigatePage) onNavigatePage('order');
              }}
              className="px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-xl flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>Place New Order Now (50% OFF)</span>
            </button>

            <button
              onClick={() => setHasProjectData(true)}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Restore Demo Project Details
            </button>
          </div>
        </div>
      )}

      {/* UPLOAD ATTACHMENT MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card rounded-3xl border border-[#E5C158]/40 p-6 sm:p-8 max-w-md w-full space-y-5 bg-[#0F0F0F] relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <FileUp className="w-5 h-5 text-[#E5C158]" />
                <h3 className="text-lg font-poppins font-bold text-white">Upload Project Attachment</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-neutral-400 hover:text-white text-xs px-2 py-1 rounded bg-white/5 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddFile} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">File Name / Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Revised_Outline_v2.docx"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white focus:border-[#E5C158] outline-none"
                />
              </div>

              <div className="p-6 rounded-2xl border-2 border-dashed border-white/20 text-center space-y-2 bg-white/[0.01]">
                <Upload className="w-8 h-8 text-[#E5C158] mx-auto" />
                <p className="text-neutral-300 font-semibold text-xs">Drag and drop file or click to select</p>
                <span className="text-[10px] text-neutral-500 block">Supported: PDF, DOCX, PPTX, XLSX, Images, ZIP (Max 50MB)</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-neutral-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#E5C158] text-black font-extrabold cursor-pointer hover:bg-[#fce888]"
                >
                  Confirm Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REQUEST REVISION MODAL */}
      {showRevisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card rounded-3xl border border-purple-500/40 p-6 sm:p-8 max-w-md w-full space-y-5 bg-[#0F0F0F] relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-poppins font-bold text-white">Request Project Revision</h3>
              </div>
              <button
                onClick={() => setShowRevisionModal(false)}
                className="text-neutral-400 hover:text-white text-xs px-2 py-1 rounded bg-white/5 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRequestRevision} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Specific Revision Instructions</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail exact changes required (e.g., Modify slide 4 color palette or update table data on slide 6)..."
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white focus:border-purple-400 outline-none resize-none"
                />
              </div>

              <p className="text-[11px] text-purple-300 bg-purple-500/10 p-3 rounded-xl border border-purple-500/20">
                ✓ Covered under our complimentary 7-Day Revision Guarantee. Our design team will acknowledge within 2 hours.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRevisionModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-neutral-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-500 text-white font-extrabold cursor-pointer hover:bg-purple-600"
                >
                  Submit Revision Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PHASE 4 ROADMAP CHECKLIST MODAL */}
      {showChecklistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card rounded-3xl border border-[#E5C158]/40 p-6 sm:p-8 max-w-2xl w-full space-y-6 bg-[#0F0F0F] relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#E5C158]/20 text-[#E5C158]">
                  <CheckCircle2 className="w-6 h-6 text-[#28C76F]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block">
                    CLIENT DASHBOARD ROADMAP
                  </span>
                  <h3 className="text-xl font-poppins font-bold text-white">
                    Phase 4 Completed • Project Status
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowChecklistModal(false)}
                className="text-neutral-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Checklist items */}
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
                    <span className="text-neutral-400 text-[11px]">Vertical timeline, AI health score, delivery predictions & movie</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/40 flex items-center justify-between shadow-[0_0_15px_rgba(40,199,111,0.2)]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold">Phase 4: Project Details Center</strong>
                    <span className="text-neutral-400 text-[11px]">Project overview, brief, specs, file attachments & deliverables hub</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED NOW</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between opacity-70">
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full border border-neutral-500 flex items-center justify-center text-[9px] text-neutral-400">5</span>
                  <div>
                    <strong className="text-white block font-bold">Phase 5: Client Invoices & Payment Ledger</strong>
                    <span className="text-neutral-400 text-[11px]">PDF receipts, payment breakdown & proof manager</span>
                  </div>
                </div>
                <span className="text-neutral-400 font-bold text-[10px] uppercase">REMAINING</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowChecklistModal(false)}
                className="w-full py-3 rounded-full bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] cursor-pointer"
              >
                Acknowledge & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
