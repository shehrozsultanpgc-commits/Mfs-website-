import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  User,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  History,
  Calendar,
  Send,
  ArrowRight,
  Filter,
  Check,
  X
} from 'lucide-react';
import { Currency } from '../../types';

export interface WorkflowItem {
  id: string;
  title: string;
  contentType: 'blog' | 'case_study' | 'knowledge_base' | 'legal_policy' | 'faq';
  stage: 'draft' | 'internal_review' | 'seo_review' | 'legal_review' | 'final_approval' | 'scheduled' | 'published';
  author: string;
  assignedReviewer: string;
  revisionCount: number;
  lastUpdated: string;
  comments: {
    id: string;
    reviewer: string;
    role: string;
    text: string;
    timestamp: string;
  }[];
}

interface CMSPublishingWorkflowCenterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSPublishingWorkflowCenter: React.FC<CMSPublishingWorkflowCenterProps> = ({
  currency,
  onShowToast,
}) => {
  // Editorial Stages
  const stages = [
    { id: 'draft', label: '1. Draft Creation', color: 'bg-neutral-500/20 text-neutral-300 border-neutral-500/30' },
    { id: 'internal_review', label: '2. Internal Review', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 'seo_review', label: '3. SEO Review', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { id: 'legal_review', label: '4. Legal Review', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { id: 'final_approval', label: '5. Final Approval', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { id: 'scheduled', label: '6. Scheduled', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    { id: 'published', label: '7. Published Live', color: 'bg-[#28C76F]/20 text-[#28C76F] border-[#28C76F]/30' },
  ];

  // Workflow Items State
  const [items, setItems] = useState<WorkflowItem[]>([
    {
      id: 'wf-1',
      title: 'How to Design Executive Pitch Decks That Secure Investor Funding in 2026',
      contentType: 'blog',
      stage: 'published',
      author: 'Shehroz Sultan (Founder)',
      assignedReviewer: 'SEO & Growth Lead',
      revisionCount: 2,
      lastUpdated: '2026-07-26 14:20 PKT',
      comments: [
        {
          id: 'c1',
          reviewer: 'Shehroz Sultan',
          role: 'Founder & Managing Director',
          text: 'Verified Gold theme styling and 16:9 slide presentation guidelines.',
          timestamp: '2026-07-25 11:00 PKT',
        },
        {
          id: 'c2',
          reviewer: 'SEO Auditor AI',
          role: 'Automated System',
          text: 'Keyword density optimal. Schema JSON-LD ProfessionalService attached.',
          timestamp: '2026-07-25 14:30 PKT',
        },
      ],
    },
    {
      id: 'wf-2',
      title: 'MFS Growth Agency Privacy Policy & Data Protection Directives v2.4',
      contentType: 'legal_policy',
      stage: 'published',
      author: 'Shehroz Sultan',
      assignedReviewer: 'MFS Legal Advisory',
      revisionCount: 1,
      lastUpdated: '2026-07-20 09:15 PKT',
      comments: [
        {
          id: 'c3',
          reviewer: 'MFS Legal Advisory',
          role: 'Legal Compliance Counsel',
          text: 'Approved clause regarding watermarked samples under Our Work.',
          timestamp: '2026-07-19 16:00 PKT',
        },
      ],
    },
    {
      id: 'wf-3',
      title: 'Case Study: $3.5M FinTech Seed Funding Secured via Pitch Deck Design',
      contentType: 'case_study',
      stage: 'final_approval',
      author: 'Content Strategist',
      assignedReviewer: 'Shehroz Sultan',
      revisionCount: 3,
      lastUpdated: '2026-07-26 18:45 PKT',
      comments: [
        {
          id: 'c4',
          reviewer: 'Quality Lead',
          role: 'Editorial Manager',
          text: 'Confirmed client NDA clearance for Dubai FinTech screenshots.',
          timestamp: '2026-07-26 15:00 PKT',
        },
      ],
    },
    {
      id: 'wf-4',
      title: 'APA 7th Edition Citation & Referencing Standard Operating Protocol',
      contentType: 'knowledge_base',
      stage: 'published',
      author: 'Academic Lead',
      assignedReviewer: 'Academic Director',
      revisionCount: 1,
      lastUpdated: '2026-07-24 11:30 PKT',
      comments: [],
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<WorkflowItem | null>(items[2]);
  const [newCommentText, setNewCommentText] = useState('');

  const handleAdvanceStage = (item: WorkflowItem, nextStage: WorkflowItem['stage']) => {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, stage: nextStage } : i))
    );
    if (selectedItem?.id === item.id) {
      setSelectedItem({ ...selectedItem, stage: nextStage });
    }
    if (onShowToast) onShowToast(`Moved "${item.title}" to ${nextStage.replace('_', ' ').toUpperCase()}`);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !newCommentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      reviewer: 'Shehroz Sultan (Admin)',
      role: 'Editorial Director',
      text: newCommentText.trim(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' PKT',
    };

    const updatedItem = {
      ...selectedItem,
      comments: [...selectedItem.comments, newComment],
      revisionCount: selectedItem.revisionCount + 1,
    };

    setItems((prev) => prev.map((i) => (i.id === selectedItem.id ? updatedItem : i)));
    setSelectedItem(updatedItem);
    setNewCommentText('');
    if (onShowToast) onShowToast('Added editorial review note!');
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-[10px] font-bold border border-cyan-500/30 uppercase">
                EDITORIAL PUBLISHING WORKFLOW CENTER
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#28C76F]" />
                <span>APPROVAL PIPELINE ACTIVE</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Publishing Governance, Peer Review & Stage Transitions
            </h3>
            <p className="text-xs text-neutral-400">
              Track multi-stage approvals from draft creation through internal, SEO, and legal reviews before scheduling live publication.
            </p>
          </div>
        </div>

        {/* WORKFLOW PIPELINE STAGES OVERVIEW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 border-t border-white/10">
          {stages.map((stg) => {
            const count = items.filter((i) => i.stage === stg.id).length;
            return (
              <div
                key={stg.id}
                className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-1"
              >
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase line-clamp-1">
                  {stg.label}
                </span>
                <div className="flex items-center justify-between pt-1">
                  <span className={`px-2 py-0.5 rounded-full font-mono text-xs font-extrabold border ${stg.color}`}>
                    {count} Items
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TWO COLUMN WORKFLOW MANAGEMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 1 COL: CONTENT ITEMS PIPELINE */}
        <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-3 bg-[#0D0D12]">
          <span className="font-poppins font-bold text-white text-xs uppercase font-mono tracking-wider block border-b border-white/10 pb-3">
            Content Approval Queue ({items.length})
          </span>

          <div className="space-y-2">
            {items.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              const currentStage = stages.find((s) => s.id === item.stage);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-[#E5C158]/10 border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.2)]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 font-mono text-[9px] uppercase border border-white/10 font-bold">
                      {item.contentType.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      Rev #{item.revisionCount}
                    </span>
                  </div>

                  <strong className="text-white text-xs font-bold block line-clamp-2">
                    {item.title}
                  </strong>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold border uppercase ${currentStage?.color}`}>
                      {currentStage?.label.split('. ')[1]}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {item.lastUpdated.split(' ')[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT 2 COLS: SELECTED ITEM DETAILS & STAGE ACTION */}
        <div className="lg:col-span-2 space-y-6">
          {selectedItem ? (
            <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-[#0D0D12]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#E5C158] font-bold uppercase tracking-wider block">
                    EDITORIAL REVIEW FILE • ID: {selectedItem.id}
                  </span>
                  <h3 className="font-poppins font-bold text-white text-base mt-0.5">
                    {selectedItem.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs font-bold">
                    Author: {selectedItem.author}
                  </span>
                </div>
              </div>

              {/* STAGE TRANSITION ACTION BUTTONS */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                  ADVANCE EDITORIAL STAGE
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleAdvanceStage(selectedItem, 'draft')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 cursor-pointer"
                  >
                    Draft
                  </button>
                  <button
                    onClick={() => handleAdvanceStage(selectedItem, 'internal_review')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 cursor-pointer"
                  >
                    Internal Review
                  </button>
                  <button
                    onClick={() => handleAdvanceStage(selectedItem, 'seo_review')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 cursor-pointer"
                  >
                    SEO Review
                  </button>
                  <button
                    onClick={() => handleAdvanceStage(selectedItem, 'legal_review')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 cursor-pointer"
                  >
                    Legal Review
                  </button>
                  <button
                    onClick={() => handleAdvanceStage(selectedItem, 'final_approval')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 cursor-pointer"
                  >
                    Final Approval
                  </button>
                  <button
                    onClick={() => handleAdvanceStage(selectedItem, 'published')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#28C76F] hover:bg-[#20a35a] text-black font-extrabold cursor-pointer shadow-lg"
                  >
                    Approve & Publish Live
                  </button>
                </div>
              </div>

              {/* EDITORIAL REVIEW COMMENTS HISTORY */}
              <div className="space-y-3">
                <span className="font-poppins font-bold text-white text-xs uppercase font-mono tracking-wider block">
                  Editorial Review Audit Log ({selectedItem.comments.length})
                </span>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {selectedItem.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <strong className="text-white font-bold">{comment.reviewer}</strong>
                          <span className="px-2 py-0.5 rounded-md bg-white/5 text-neutral-400 font-mono text-[9px]">
                            {comment.role}
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-neutral-300 text-xs leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* ADD NEW COMMENT FORM */}
                <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Add editorial review feedback or compliance note..."
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer shrink-0"
                  >
                    Add Note
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-3xl border border-white/10 p-12 text-center text-neutral-400 bg-[#0D0D12]">
              Select a content item from the pipeline queue to manage approval stages and editorial review logs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
