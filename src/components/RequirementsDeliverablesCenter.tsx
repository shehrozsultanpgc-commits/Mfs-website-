import React, { useState } from 'react';
import {
  FileCheck2,
  FileText,
  RotateCcw,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Download,
  Lock,
  Plus,
  Trash2,
  Edit3,
  Check,
  XCircle,
  MessageSquare,
  ShieldCheck,
  Send,
  Eye,
  Layers,
  ListCheck,
  UserCheck
} from 'lucide-react';
import { Currency } from '../types';

export type RequirementStatusType =
  | 'Pending Requirements'
  | 'Requirements Submitted'
  | 'Under Review'
  | 'Clarification Needed'
  | 'Requirements Approved'
  | 'Requirements Rejected';

export type RevisionStatusType =
  | 'Revision Requested'
  | 'In Progress'
  | 'Under QA Review'
  | 'Completed'
  | 'Rejected';

export type DeliveryStatusType =
  | 'Draft'
  | 'Internal Review'
  | 'Ready for Client'
  | 'Delivered'
  | 'Accepted'
  | 'Revision Requested'
  | 'Completed';

export interface RequirementFileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export interface ClientRequirementSpec {
  summary: string;
  detailedRequirements: string;
  instructions: string;
  scope: string;
  referenceLinks: string[];
  files: RequirementFileItem[];
  status: RequirementStatusType;
  completionPercentage: number;
}

export interface RevisionItem {
  id: string;
  revisionNumber: number;
  reason: string;
  status: RevisionStatusType;
  assignedTeam: string;
  deadline: string;
  internalNotes: string;
  clientFeedback: string;
  requestedAt: string;
}

export interface DeliverableFileItem {
  id: string;
  title: string;
  version: string; // e.g. 'v1.0 Final'
  fileType: 'Final Deliverable' | 'Working File' | 'Source File';
  fileName: string;
  fileSize: string;
  previewUrl: string;
  downloadUrl: string;
  deliveryNotes: string;
  uploadedAt: string;
}

export interface QAChecklistItem {
  id: string;
  title: string;
  category: 'Design' | 'Content' | 'Functionality' | 'Responsive' | 'Performance' | 'Accessibility';
  completed: boolean;
  auditorNotes: string;
}

export interface PrivateAdminNote {
  id: string;
  adminName: string;
  role: string;
  timestamp: string;
  noteText: string;
  isImportant?: boolean;
}

export interface ManagedProjectExecution {
  orderId: string;
  clientName: string;
  serviceName: string;
  category: 'Academic' | 'Career' | 'Business';
  deliveryStatus: DeliveryStatusType;
  requirements: ClientRequirementSpec;
  revisions: RevisionItem[];
  deliverables: DeliverableFileItem[];
  qaChecklist: QAChecklistItem[];
  privateNotes: PrivateAdminNote[];
}

const INITIAL_PROJECT_EXECUTION: ManagedProjectExecution[] = [
  {
    orderId: 'ORD-MFS-849201',
    clientName: 'Muhammad Shehroz Sultan',
    serviceName: 'Executive Pitch Deck Presentation',
    category: 'Business',
    deliveryStatus: 'Internal Review',
    requirements: {
      summary: '10-Slide Investor Pitch Deck for Series-A Funding Round ($12M TAM)',
      detailedRequirements:
        'Deliver a high-converting, 10-slide executive pitch deck tailored for Silicon Valley venture capitalists. Color palette must strictly follow MFS Gold accent (#E5C158) on charcoal black (#0D0D12). Needs custom financial model projections for 3 years (2026-2029).',
      instructions: 'Ensure APA formatted citation sources on appendix slides. Include editable PPTX plus flattened PDF.',
      scope: 'Slide 1: Cover, Slide 2: Problem, Slide 3: Solution, Slide 4: Market Size, Slide 5: Product Demo, Slide 6: Business Model, Slide 7: Traction, Slide 8: Financials, Slide 9: Team, Slide 10: Ask & Contact.',
      referenceLinks: [
        'https://mfsmedia.agency/our-work/sample-pitch-deck-preview',
        'https://sec.gov/investor-relations-dataset'
      ],
      files: [
        { id: 'rf-1', name: 'raw_financials_2026_model.xlsx', size: '3.4 MB', type: 'XLSX', uploadedAt: '2026-07-25 14:32' },
        { id: 'rf-2', name: 'mfs_gold_branding_vector_assets.zip', size: '24.1 MB', type: 'ZIP', uploadedAt: '2026-07-25 14:35' }
      ],
      status: 'Requirements Approved',
      completionPercentage: 100
    },
    revisions: [
      {
        id: 'rev-101',
        revisionNumber: 1,
        reason: 'Adjust Slide 8 financial projection chart color gradient to gold-emerald',
        status: 'Completed',
        assignedTeam: 'MFS Presentation Design Squad Alpha',
        deadline: '2026-07-26 12:00',
        internalNotes: 'Updated in v1.1 build.',
        clientFeedback: 'Looks much better! Slide 8 is now crystal clear.',
        requestedAt: '2026-07-25 18:00'
      }
    ],
    deliverables: [
      {
        id: 'del-1',
        title: 'Executive Pitch Deck Master File',
        version: 'v1.1 Release Candidate',
        fileType: 'Final Deliverable',
        fileName: 'MFS_Executive_Pitch_Deck_Master_v1.1.pptx',
        fileSize: '18.4 MB',
        previewUrl: '#preview-pptx',
        downloadUrl: '#protected-download',
        deliveryNotes: 'Fully editable PowerPoint PPTX file with embedded custom typography.',
        uploadedAt: '2026-07-25 20:00'
      },
      {
        id: 'del-2',
        title: 'High-Res Presentation PDF Release',
        version: 'v1.1 Release Candidate',
        fileType: 'Final Deliverable',
        fileName: 'MFS_Executive_Pitch_Deck_Master_v1.1.pdf',
        fileSize: '9.2 MB',
        previewUrl: '#preview-pdf',
        downloadUrl: '#protected-download',
        deliveryNotes: 'Print-ready vector PDF presentation bundle.',
        uploadedAt: '2026-07-25 20:02'
      },
      {
        id: 'del-3',
        title: 'Editable Illustrator Vector Working Icons',
        version: 'v1.0 Source',
        fileType: 'Source File',
        fileName: 'gold_accent_vector_icons_source.ai',
        fileSize: '34.8 MB',
        previewUrl: '#preview-ai',
        downloadUrl: '#protected-download',
        deliveryNotes: 'Original Adobe Illustrator source assets for branding elements.',
        uploadedAt: '2026-07-25 20:05'
      }
    ],
    qaChecklist: [
      { id: 'qa-1', title: 'Design Review: MFS Gold (#E5C158) theme consistency & contrast', category: 'Design', completed: true, auditorNotes: 'Pass. WCAG AA contrast met.' },
      { id: 'qa-2', title: 'Content Review: Proofread financial figures & slide typography', category: 'Content', completed: true, auditorNotes: 'Verified against excel model.' },
      { id: 'qa-3', title: 'Functionality Review: PPTX custom font embedding & animations', category: 'Functionality', completed: true, auditorNotes: 'Animations set to 0.3s ease.' },
      { id: 'qa-4', title: 'Responsive Review: 16:9 widescreen layout & mobile PDF scaling', category: 'Responsive', completed: true, auditorNotes: 'Tested on desktop & tablet.' },
      { id: 'qa-5', title: 'Performance Review: File size optimized under 25MB threshold', category: 'Performance', completed: true, auditorNotes: 'Compressed vector images.' },
      { id: 'qa-6', title: 'Accessibility Review: Screen reader text labels on slides', category: 'Accessibility', completed: false, auditorNotes: 'Pending final appendix label audit.' },
      { id: 'qa-7', title: 'Final Executive Approval by Lead Director Shehroz Sultan', category: 'Design', completed: false, auditorNotes: 'Awaiting final sign-off.' }
    ],
    privateNotes: [
      { id: 'pn-1', adminName: 'Shehroz Sultan', role: 'Lead Director', timestamp: '2026-07-25 14:40', noteText: 'Client requested top-tier confidentiality. Do not disclose funding details.', isImportant: true },
      { id: 'pn-2', adminName: 'Senior QA Lead', role: 'Quality Audit', timestamp: '2026-07-25 19:15', noteText: 'Recheck slide 8 layout before marking ready for client.', isImportant: false }
    ]
  },
  {
    orderId: 'ORD-MFS-849202',
    clientName: 'Hamza Malik',
    serviceName: 'ATS Resume Engineering & CV Design',
    category: 'Career',
    deliveryStatus: 'Delivered',
    requirements: {
      summary: 'Silicon Valley Senior Software Architect ATS Resume & Custom CV Design',
      detailedRequirements: 'Format 10+ years of tech experience into single-page high-scoring ATS resume layout.',
      instructions: 'Include LinkedIn & GitHub links. Target score > 95% on Jobscan.',
      scope: 'ATS Docx + PDF + Cover Letter + LinkedIn banner.',
      referenceLinks: ['https://mfsmedia.agency/our-work/ats-resume-sample'],
      files: [{ id: 'rf-3', name: 'old_resume_draft.docx', size: '1.2 MB', type: 'DOCX', uploadedAt: '2026-07-24 18:20' }],
      status: 'Requirements Approved',
      completionPercentage: 100
    },
    revisions: [],
    deliverables: [
      {
        id: 'del-4',
        title: 'ATS Resume Final PDF',
        version: 'v1.0 Final',
        fileType: 'Final Deliverable',
        fileName: 'Hamza_Malik_ATS_Resume_2026.pdf',
        fileSize: '1.5 MB',
        previewUrl: '#preview-pdf',
        downloadUrl: '#protected-download',
        deliveryNotes: 'ATS score 97% verified.',
        uploadedAt: '2026-07-25 10:00'
      }
    ],
    qaChecklist: [
      { id: 'qa-8', title: 'ATS Keyword Scan Score > 95%', category: 'Functionality', completed: true, auditorNotes: 'Scored 97% on benchmark.' }
    ],
    privateNotes: [
      { id: 'pn-3', adminName: 'CV Specialist', role: 'Career Team', timestamp: '2026-07-24 19:00', noteText: 'Client placed priority order. Delivered within 14 hours.', isImportant: false }
    ]
  }
];

interface RequirementsDeliverablesCenterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const RequirementsDeliverablesCenter: React.FC<RequirementsDeliverablesCenterProps> = ({
  currency,
  onShowToast
}) => {
  const [projects, setProjects] = useState<ManagedProjectExecution[]>(INITIAL_PROJECT_EXECUTION);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ORD-MFS-849201');
  const [activeTab, setActiveTab] = useState<'requirements' | 'revisions' | 'deliverables' | 'qa' | 'notes'>('requirements');

  // Interactive editing states for Requirements
  const [isEditingReq, setIsEditingReq] = useState(false);
  const [reqSummaryInput, setReqSummaryInput] = useState('');
  const [reqDetailsInput, setReqDetailsInput] = useState('');
  const [reqScopeInput, setReqScopeInput] = useState('');

  // New Note Form
  const [newNoteInput, setNewNoteInput] = useState('');
  const [newNoteImportant, setNewNoteImportant] = useState(false);

  // New Deliverable Form Modal
  const [isAddDeliverableOpen, setIsAddDeliverableOpen] = useState(false);
  const [delTitle, setDelTitle] = useState('');
  const [delVersion, setDelVersion] = useState('v1.0 Final');
  const [delType, setDelType] = useState<'Final Deliverable' | 'Working File' | 'Source File'>('Final Deliverable');
  const [delFileName, setDelFileName] = useState('');
  const [delNotes, setDelNotes] = useState('');

  // New Revision Form Modal
  const [isAddRevisionOpen, setIsAddRevisionOpen] = useState(false);
  const [revReason, setRevReason] = useState('');
  const [revTeam, setRevTeam] = useState('MFS Presentation Design Squad Alpha');
  const [revDeadline, setRevDeadline] = useState('2026-07-27 18:00');

  const currentProject = projects.find((p) => p.orderId === selectedOrderId) || projects[0];

  const getDeliveryStatusStyle = (st: DeliveryStatusType) => {
    switch (st) {
      case 'Accepted':
      case 'Completed':
      case 'Delivered':
        return 'bg-[#28C76F]/20 text-[#28C76F] border-[#28C76F]/40';
      case 'Ready for Client':
        return 'bg-[#E5C158]/20 text-[#E5C158] border-[#E5C158]/40 shadow-[0_0_10px_rgba(229,193,88,0.2)]';
      case 'Internal Review':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Revision Requested':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  // Requirement Workflow Request Actions
  const handleRequirementAction = (actionName: string, newReqStatus: RequirementStatusType) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.orderId === selectedOrderId) {
          return {
            ...p,
            requirements: {
              ...p.requirements,
              status: newReqStatus
            }
          };
        }
        return p;
      })
    );
    if (onShowToast) onShowToast(`Requirement workflow: '${actionName}' applied.`);
  };

  // Save Edit Requirements
  const handleSaveRequirements = () => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.orderId === selectedOrderId) {
          return {
            ...p,
            requirements: {
              ...p.requirements,
              summary: reqSummaryInput || p.requirements.summary,
              detailedRequirements: reqDetailsInput || p.requirements.detailedRequirements,
              scope: reqScopeInput || p.requirements.scope
            }
          };
        }
        return p;
      })
    );
    setIsEditingReq(false);
    if (onShowToast) onShowToast(`Client requirements updated for ${selectedOrderId}`);
  };

  // Toggle QA Checklist Item
  const toggleQAChecklist = (qaId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.orderId === selectedOrderId) {
          const updatedQA = p.qaChecklist.map((item) =>
            item.id === qaId ? { ...item, completed: !item.completed } : item
          );
          return { ...p, qaChecklist: updatedQA };
        }
        return p;
      })
    );
  };

  // Add Private Admin Note
  const handleAddPrivateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;

    const newNote: PrivateAdminNote = {
      id: `pn-${Date.now()}`,
      adminName: 'Shehroz Sultan (Super Admin)',
      role: 'Lead Director',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      noteText: newNoteInput.trim(),
      isImportant: newNoteImportant
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.orderId === selectedOrderId) {
          return { ...p, privateNotes: [newNote, ...p.privateNotes] };
        }
        return p;
      })
    );

    setNewNoteInput('');
    setNewNoteImportant(false);
    if (onShowToast) onShowToast(`Private internal admin note posted to ${selectedOrderId}`);
  };

  // Add Deliverable File
  const handleAddDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delTitle.trim() || !delFileName.trim()) return;

    const newDel: DeliverableFileItem = {
      id: `del-${Date.now()}`,
      title: delTitle.trim(),
      version: delVersion.trim() || 'v1.0 Final',
      fileType: delType,
      fileName: delFileName.trim(),
      fileSize: '15.2 MB',
      previewUrl: '#preview',
      downloadUrl: '#protected-download',
      deliveryNotes: delNotes.trim() || 'Official delivery artifact.',
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.orderId === selectedOrderId) {
          return { ...p, deliverables: [newDel, ...p.deliverables] };
        }
        return p;
      })
    );

    setIsAddDeliverableOpen(false);
    setDelTitle('');
    setDelFileName('');
    setDelNotes('');
    if (onShowToast) onShowToast(`Deliverable file '${newDel.title}' published to ${selectedOrderId}`);
  };

  // Add Revision Item
  const handleAddRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revReason.trim()) return;

    const newRev: RevisionItem = {
      id: `rev-${Date.now()}`,
      revisionNumber: currentProject.revisions.length + 1,
      reason: revReason.trim(),
      status: 'Revision Requested',
      assignedTeam: revTeam,
      deadline: revDeadline,
      internalNotes: 'Dispatched to team.',
      clientFeedback: revReason.trim(),
      requestedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.orderId === selectedOrderId) {
          return {
            ...p,
            deliveryStatus: 'Revision Requested',
            revisions: [newRev, ...p.revisions]
          };
        }
        return p;
      })
    );

    setIsAddRevisionOpen(false);
    setRevReason('');
    if (onShowToast) onShowToast(`Revision #${newRev.revisionNumber} opened for ${selectedOrderId}`);
  };

  // QA Progress
  const completedQA = currentProject.qaChecklist.filter((q) => q.completed).length;
  const totalQA = currentProject.qaChecklist.length;
  const qaPercentage = totalQA > 0 ? Math.round((completedQA / totalQA) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* MODULE HEADER & PROJECT SELECTOR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 shadow-[0_0_15px_rgba(229,193,88,0.2)]">
              <FileCheck2 className="w-6 h-6 text-[#E5C158]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#E5C158]/20 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/40 uppercase tracking-wider">
                  PHASE 7 CENTER
                </span>
                <span className="text-neutral-500 text-xs font-mono">• Centralized Execution Workspace</span>
              </div>
              <h2 className="font-poppins font-black text-xl text-white">
                Requirements, Revisions & Deliverables Center
              </h2>
            </div>
          </div>

          {/* PROJECT SELECTOR */}
          <div className="flex items-center gap-2 bg-white/[0.04] p-2 rounded-2xl border border-white/10 text-xs">
            <span className="text-neutral-400 font-mono font-bold pl-1">Active Execution:</span>
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="bg-transparent text-white font-mono font-bold focus:outline-none cursor-pointer pr-2"
            >
              {projects.map((p) => (
                <option key={p.orderId} value={p.orderId} className="bg-[#0D0D12] text-white">
                  {p.orderId} — {p.clientName} ({p.serviceName})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* METRIC STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-3 border-t border-white/10 text-xs">
          
          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Delivery Status</span>
            <select
              value={currentProject.deliveryStatus}
              onChange={(e) => {
                const val = e.target.value as DeliveryStatusType;
                setProjects((prev) =>
                  prev.map((p) => (p.orderId === selectedOrderId ? { ...p, deliveryStatus: val } : p))
                );
                if (onShowToast) onShowToast(`Delivery status changed to '${val}'`);
              }}
              className={`mt-1 font-bold text-[11px] bg-transparent focus:outline-none cursor-pointer px-2 py-0.5 rounded border ${getDeliveryStatusStyle(currentProject.deliveryStatus)}`}
            >
              <option value="Draft" className="bg-[#0D0D12] text-white">Draft</option>
              <option value="Internal Review" className="bg-[#0D0D12] text-white">Internal Review</option>
              <option value="Ready for Client" className="bg-[#0D0D12] text-white">Ready for Client</option>
              <option value="Delivered" className="bg-[#0D0D12] text-white">Delivered</option>
              <option value="Accepted" className="bg-[#0D0D12] text-white">Accepted</option>
              <option value="Revision Requested" className="bg-[#0D0D12] text-white">Revision Requested</option>
              <option value="Completed" className="bg-[#0D0D12] text-white">Completed</option>
            </select>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Requirement Status</span>
            <span className="inline-block mt-1 font-bold text-[11px] text-[#E5C158] font-mono">
              {currentProject.requirements.status}
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Revision Counter</span>
            <strong className="text-amber-300 font-bold text-sm block mt-0.5">
              {currentProject.revisions.length} Revision(s)
            </strong>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">QA Compliance Pass</span>
            <strong className="text-[#28C76F] font-bold text-sm block mt-0.5">
              {qaPercentage}% ({completedQA}/{totalQA})
            </strong>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 col-span-2 sm:col-span-1">
            <span className="text-neutral-400 text-[10px] font-mono uppercase block">Private Notes</span>
            <strong className="text-purple-300 font-bold text-sm block mt-0.5">
              {currentProject.privateNotes.length} Internal Notes
            </strong>
          </div>

        </div>

      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        {[
          { id: 'requirements', label: 'Client Requirements & Scope', icon: FileText },
          { id: 'revisions', label: `Revision Management (${currentProject.revisions.length})`, icon: RotateCcw },
          { id: 'deliverables', label: `Deliverables Hub (${currentProject.deliverables.length})`, icon: UploadCloud },
          { id: 'qa', label: `QA Audit Checklist (${qaPercentage}%)`, icon: ListCheck },
          { id: 'notes', label: `Private Admin Notes (${currentProject.privateNotes.length})`, icon: Lock }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-poppins flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#E5C158] text-black shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                  : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: CLIENT REQUIREMENTS & SCOPE */}
      {/* ========================================================= */}
      {activeTab === 'requirements' && (
        <div className="space-y-6">
          
          <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-6 bg-gradient-to-b from-[#0D0D12] to-transparent">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                  <span>Client Requirements & Specification Sheet</span>
                  <span className="text-xs font-mono text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-0.5 rounded-full border border-[#E5C158]/30">
                    {currentProject.requirements.status}
                  </span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Long-form client specifications, scope parameters, reference materials & files for <strong className="text-white">{currentProject.orderId}</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isEditingReq) {
                      handleSaveRequirements();
                    } else {
                      setReqSummaryInput(currentProject.requirements.summary);
                      setReqDetailsInput(currentProject.requirements.detailedRequirements);
                      setReqScopeInput(currentProject.requirements.scope);
                      setIsEditingReq(true);
                    }
                  }}
                  className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-white/10"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>{isEditingReq ? 'Save Changes' : 'Edit Requirements'}</span>
                </button>
              </div>
            </div>

            {/* REQUIREMENT WORKFLOW ACTIONS */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <span className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">
                Requirement Approval Workflow Operations:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => handleRequirementAction('Approve Requirements', 'Requirements Approved')}
                  className="px-3 py-1.5 rounded-xl bg-[#28C76F]/20 hover:bg-[#28C76F]/30 text-[#28C76F] border border-[#28C76F]/40 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve Requirements</span>
                </button>
                <button
                  onClick={() => handleRequirementAction('Request More Info', 'Clarification Needed')}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Request More Info</span>
                </button>
                <button
                  onClick={() => handleRequirementAction('Reject Requirements', 'Requirements Rejected')}
                  className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject Specifications</span>
                </button>
              </div>
            </div>

            {/* LONG-FORM REQUIREMENT SECTIONS */}
            <div className="space-y-5 text-xs">
              
              {/* SUMMARY */}
              <div className="space-y-1.5">
                <span className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">
                  Requirement Summary:
                </span>
                {isEditingReq ? (
                  <input
                    type="text"
                    value={reqSummaryInput}
                    onChange={(e) => setReqSummaryInput(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-black/50 border border-white/20 text-white font-semibold focus:outline-none focus:border-[#E5C158]"
                  />
                ) : (
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-white font-semibold leading-relaxed">
                    {currentProject.requirements.summary}
                  </div>
                )}
              </div>

              {/* DETAILED REQUIREMENTS */}
              <div className="space-y-1.5">
                <span className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">
                  Detailed Requirements & Guidelines:
                </span>
                {isEditingReq ? (
                  <textarea
                    rows={4}
                    value={reqDetailsInput}
                    onChange={(e) => setReqDetailsInput(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-black/50 border border-white/20 text-white leading-relaxed focus:outline-none focus:border-[#E5C158]"
                  />
                ) : (
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-neutral-300 leading-relaxed font-sans whitespace-pre-wrap">
                    {currentProject.requirements.detailedRequirements}
                  </div>
                )}
              </div>

              {/* PROJECT SCOPE */}
              <div className="space-y-1.5">
                <span className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">
                  Project Scope & Deliverable Boundaries:
                </span>
                {isEditingReq ? (
                  <textarea
                    rows={3}
                    value={reqScopeInput}
                    onChange={(e) => setReqScopeInput(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-black/50 border border-white/20 text-white leading-relaxed focus:outline-none focus:border-[#E5C158]"
                  />
                ) : (
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-cyan-300 font-mono leading-relaxed">
                    {currentProject.requirements.scope}
                  </div>
                )}
              </div>

              {/* UPLOADED REQUIREMENT FILES */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">
                  Uploaded Requirement Artifacts & Reference Assets ({currentProject.requirements.files.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentProject.requirements.files.map((file) => (
                    <div key={file.id} className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-white font-mono block truncate">{file.name}</strong>
                        <span className="text-neutral-500 font-mono text-[10px]">
                          {file.size} • Uploaded {file.uploadedAt}
                        </span>
                      </div>
                      <a
                        href="#protected-download"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onShowToast) onShowToast('Protected preview only — downloads disabled for client security.');
                        }}
                        className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-[#E5C158] font-bold text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: REVISION MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'revisions' && (
        <div className="space-y-6">
          
          <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-6 bg-gradient-to-b from-[#0D0D12] to-transparent">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                  <span>Revision Request Management</span>
                  <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    Unlimited Revisions Architecture
                  </span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Track client iteration requests, assigned teams & deadline commitments for <strong className="text-white">{currentProject.orderId}</strong>.
                </p>
              </div>

              <button
                onClick={() => setIsAddRevisionOpen(true)}
                className="px-4 py-2 rounded-2xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)]"
              >
                <Plus className="w-4 h-4" />
                <span>Open Revision Request</span>
              </button>
            </div>

            {/* REVISIONS LIST */}
            {currentProject.revisions.length === 0 ? (
              <div className="p-8 text-center space-y-2 border border-white/10 rounded-2xl bg-white/[0.01]">
                <CheckCircle2 className="w-8 h-8 text-[#28C76F] mx-auto" />
                <h4 className="font-poppins font-bold text-white text-sm">No Active Revision Requests</h4>
                <p className="text-xs text-neutral-400">Order is progressing on initial delivery schedule without revision holds.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentProject.revisions.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 text-xs">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/40">
                          REVISION #{rev.revisionNumber}
                        </span>
                        <strong className="text-white font-poppins font-bold text-sm">{rev.reason}</strong>
                      </div>

                      <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold border border-blue-500/30">
                        {rev.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-300 font-mono text-[11px]">
                      <div>
                        <span className="text-neutral-500">Assigned Team: </span>
                        <strong className="text-white">{rev.assignedTeam}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-500">Revision Deadline: </span>
                        <strong className="text-amber-300">{rev.deadline}</strong>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <span className="text-neutral-500 font-mono text-[10px] uppercase font-bold block">
                        Client Feedback / Instructions:
                      </span>
                      <p className="text-white leading-relaxed">{rev.clientFeedback}</p>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: DELIVERABLES CENTER */}
      {/* ========================================================= */}
      {activeTab === 'deliverables' && (
        <div className="space-y-6">
          
          <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-6 bg-gradient-to-b from-[#0D0D12] to-transparent">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                  <span>Deliverables Center & Release Hub</span>
                  <span className="text-xs font-mono text-[#28C76F] bg-[#28C76F]/10 px-2.5 py-0.5 rounded-full border border-[#28C76F]/30">
                    Protected Vault
                  </span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Publish final deliverables, working source files & release versions for <strong className="text-white">{currentProject.orderId}</strong>.
                </p>
              </div>

              <button
                onClick={() => setIsAddDeliverableOpen(true)}
                className="px-4 py-2 rounded-2xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)]"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Deliverable Artifact</span>
              </button>
            </div>

            {/* DELIVERABLES LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentProject.deliverables.map((del) => (
                <div key={del.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 text-xs">
                  
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                    <div className="min-w-0">
                      <span className="px-2 py-0.5 rounded bg-[#28C76F]/20 text-[#28C76F] font-mono text-[9px] font-bold border border-[#28C76F]/30">
                        {del.fileType}
                      </span>
                      <h4 className="font-poppins font-bold text-white text-sm truncate mt-1">{del.title}</h4>
                    </div>
                    <span className="text-[#E5C158] font-mono font-bold text-xs shrink-0">{del.version}</span>
                  </div>

                  <p className="text-neutral-300 text-[11px] leading-relaxed">
                    {del.deliveryNotes}
                  </p>

                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-white truncate">{del.fileName}</span>
                    <span className="text-neutral-500 text-[10px] shrink-0 pl-2">{del.fileSize}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono">
                    <span className="text-neutral-500">Released: {del.uploadedAt}</span>
                    <a
                      href="#protected-download"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onShowToast) onShowToast('Sample work & deliverable previews are protected against unauthorized copying.');
                      }}
                      className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-[#E5C158] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download Artifact</span>
                    </a>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: QA AUDIT CHECKLIST */}
      {/* ========================================================= */}
      {activeTab === 'qa' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-6 bg-gradient-to-b from-[#0D0D12] to-transparent">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                <span>Quality Assurance (QA) Pre-Delivery Audit</span>
                <span className="text-xs font-mono text-[#28C76F] bg-[#28C76F]/10 px-2.5 py-0.5 rounded-full border border-[#28C76F]/30">
                  {qaPercentage}% Compliance
                </span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Verify 7-Point enterprise quality standards before deliverable release for <strong className="text-white">{currentProject.orderId}</strong>.
              </p>
            </div>

            <div className="w-full sm:w-48 space-y-1">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E5C158] to-[#28C76F] transition-all duration-500"
                  style={{ width: `${qaPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {currentProject.qaChecklist.map((qa) => (
              <div
                key={qa.id}
                onClick={() => toggleQAChecklist(qa.id)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all cursor-pointer ${
                  qa.completed
                    ? 'bg-white/[0.01] border-white/5 opacity-80'
                    : 'bg-white/[0.03] border-white/10 hover:border-[#E5C158]/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                      qa.completed
                        ? 'bg-[#28C76F] border-[#28C76F] text-black'
                        : 'border-white/30 bg-black/40'
                    }`}
                  >
                    {qa.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono text-[9px] font-bold border border-purple-500/30">
                        {qa.category}
                      </span>
                      <span className={`font-semibold truncate ${qa.completed ? 'line-through text-neutral-400' : 'text-white'}`}>
                        {qa.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono block mt-0.5">
                      Auditor Notes: {qa.auditorNotes}
                    </span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                  qa.completed
                    ? 'bg-[#28C76F]/20 text-[#28C76F] border border-[#28C76F]/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {qa.completed ? 'PASS ✓' : 'AUDIT PENDING'}
                </span>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: PRIVATE ADMIN NOTES */}
      {/* ========================================================= */}
      {activeTab === 'notes' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-6 bg-gradient-to-b from-[#0D0D12] to-transparent">
          
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Lock className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-poppins font-bold text-white text-lg">Private Internal Admin Notes</h3>
              <p className="text-xs text-neutral-400">Strictly confidential internal notes visible only to authorized administrators.</p>
            </div>
          </div>

          {/* ADD NOTE FORM */}
          <form onSubmit={handleAddPrivateNote} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase">Post Internal Note:</h4>
            <textarea
              rows={3}
              value={newNoteInput}
              onChange={(e) => setNewNoteInput(e.target.value)}
              placeholder="Record confidential notes, client communication guidelines or internal warnings..."
              className="w-full p-3 rounded-2xl bg-black/40 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newNoteImportant}
                  onChange={(e) => setNewNoteImportant(e.target.checked)}
                  className="rounded border-white/20 accent-[#E5C158]"
                />
                <span className="font-mono text-[11px] text-amber-300">Flag as High Importance</span>
              </label>

              <button
                type="submit"
                disabled={!newNoteInput.trim()}
                className="py-2 px-4 rounded-xl bg-[#E5C158] hover:bg-[#fce888] disabled:opacity-40 text-black font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Save Note</span>
              </button>
            </div>
          </form>

          {/* NOTES STREAM */}
          <div className="space-y-3">
            {currentProject.privateNotes.map((note) => (
              <div
                key={note.id}
                className={`p-3.5 rounded-2xl border space-y-1.5 text-xs ${
                  note.isImportant
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-white/[0.02] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <strong className="text-white font-mono">{note.adminName} ({note.role})</strong>
                  <span className="text-neutral-500 font-mono">{note.timestamp}</span>
                </div>
                <p className="text-neutral-200 leading-relaxed font-sans">{note.noteText}</p>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* MODAL: ADD DELIVERABLE ARTIFACT */}
      {isAddDeliverableOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleAddDeliverable} className="glass-card max-w-md w-full rounded-3xl border border-white/20 p-6 space-y-4 bg-[#0D0D12]">
            <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#E5C158]" />
              <span>Publish Deliverable Artifact</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">Deliverable Title:</label>
                <input
                  type="text"
                  value={delTitle}
                  onChange={(e) => setDelTitle(e.target.value)}
                  placeholder="e.g. Master Pitch Deck Final Release"
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">Version Tag:</label>
                  <input
                    type="text"
                    value={delVersion}
                    onChange={(e) => setDelVersion(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">File Category:</label>
                  <select
                    value={delType}
                    onChange={(e) => setDelType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white"
                  >
                    <option value="Final Deliverable">Final Deliverable</option>
                    <option value="Working File">Working File</option>
                    <option value="Source File">Source File</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">File Name:</label>
                <input
                  type="text"
                  value={delFileName}
                  onChange={(e) => setDelFileName(e.target.value)}
                  placeholder="e.g. presentation_master_v1.pptx"
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">Release Notes:</label>
                <textarea
                  rows={2}
                  value={delNotes}
                  onChange={(e) => setDelNotes(e.target.value)}
                  placeholder="Notes for client..."
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddDeliverableOpen(false)}
                className="py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2.5 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs cursor-pointer"
              >
                Publish Artifact
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: ADD REVISION REQUEST */}
      {isAddRevisionOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleAddRevision} className="glass-card max-w-md w-full rounded-3xl border border-white/20 p-6 space-y-4 bg-[#0D0D12]">
            <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-300" />
              <span>Open Revision Request</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">Revision Reason / Request:</label>
                <textarea
                  rows={3}
                  value={revReason}
                  onChange={(e) => setRevReason(e.target.value)}
                  placeholder="Describe client requested modifications..."
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">Assigned Squad:</label>
                <select
                  value={revTeam}
                  onChange={(e) => setRevTeam(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white"
                >
                  <option value="MFS Presentation Design Squad Alpha">MFS Presentation Design Squad Alpha</option>
                  <option value="MFS Career Engineering Squad">MFS Career Engineering Squad</option>
                  <option value="MFS Academic Writing Division">MFS Academic Writing Division</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-mono text-[10px] uppercase font-bold block">Revision Deadline:</label>
                <input
                  type="text"
                  value={revDeadline}
                  onChange={(e) => setRevDeadline(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddRevisionOpen(false)}
                className="py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2.5 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs cursor-pointer"
              >
                Dispatch Revision
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
