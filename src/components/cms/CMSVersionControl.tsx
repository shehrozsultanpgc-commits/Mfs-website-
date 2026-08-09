import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  History,
  RotateCcw,
  CheckCircle2,
  Clock,
  User,
  Shield,
  FileText,
  GitBranch,
  GitCommit,
  GitCompare,
  ArrowRight,
  AlertCircle,
  Eye,
  X,
  Sparkles,
  Lock,
  Check
} from 'lucide-react';
import { Currency } from '../../types';

interface VersionRevision {
  id: string;
  versionNumber: string;
  pageTitle: string;
  pageSlug: string;
  editor: string;
  timestamp: string;
  status: 'published' | 'draft' | 'archived';
  changesSummary: string;
  isCurrentPublished: boolean;
  sectionsCount: number;
}

interface CMSVersionControlProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSVersionControl: React.FC<CMSVersionControlProps> = ({
  currency,
  onShowToast,
}) => {
  // Revisions List Mock Data
  const [revisions, setRevisions] = useState<VersionRevision[]>([
    {
      id: 'rev-302',
      versionNumber: 'v3.2',
      pageTitle: 'Homepage',
      pageSlug: '/',
      editor: 'Muhammad Shehroz Sultan (Owner)',
      timestamp: '2026-07-26 14:30 PKT',
      status: 'published',
      changesSummary: 'Updated 50% Grand Launch promo banner, added new student pitch deck testimonial, optimized Hero backdrop video URL.',
      isCurrentPublished: true,
      sectionsCount: 9,
    },
    {
      id: 'rev-301',
      versionNumber: 'v3.1',
      pageTitle: 'Homepage',
      pageSlug: '/',
      editor: 'Shehroz Sultan',
      timestamp: '2026-07-24 10:15 PKT',
      status: 'archived',
      changesSummary: 'Adjusted stats counter layout for mobile responsiveness and updated Askari Bank payment info banner.',
      isCurrentPublished: false,
      sectionsCount: 9,
    },
    {
      id: 'rev-300',
      versionNumber: 'v3.0',
      pageTitle: 'Homepage',
      pageSlug: '/',
      editor: 'MFS Content Team',
      timestamp: '2026-07-20 18:00 PKT',
      status: 'archived',
      changesSummary: 'Initial v3 redesign launch with full dark theme and gold accents (#E5C158).',
      isCurrentPublished: false,
      sectionsCount: 8,
    },
    {
      id: 'rev-205',
      versionNumber: 'v2.5',
      pageTitle: 'Services',
      pageSlug: '/services',
      editor: 'Shehroz Sultan',
      timestamp: '2026-07-25 18:45 PKT',
      status: 'published',
      changesSummary: 'Added ATS Resume & Cover Letter bundling discount options.',
      isCurrentPublished: true,
      sectionsCount: 6,
    },
    {
      id: 'rev-204',
      versionNumber: 'v2.4',
      pageTitle: 'Our Work',
      pageSlug: '/our-work',
      editor: 'Design Lead',
      timestamp: '2026-07-26 16:10 PKT',
      status: 'published',
      changesSummary: 'Added 6 new watermarked pitch deck samples with secured preview copy protection.',
      isCurrentPublished: true,
      sectionsCount: 5,
    },
  ]);

  // Selected for Compare / Diff
  const [selectedForCompare, setSelectedForCompare] = useState<VersionRevision | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [selectedForRestore, setSelectedForRestore] = useState<VersionRevision | null>(null);

  // Restore Revision Handler
  const handleRestore = (revision: VersionRevision) => {
    setRevisions((prev) =>
      prev.map((r) => {
        if (r.pageSlug === revision.pageSlug) {
          if (r.id === revision.id) {
            return { ...r, isCurrentPublished: true, status: 'published' };
          }
          return { ...r, isCurrentPublished: false, status: 'archived' };
        }
        return r;
      })
    );
    setSelectedForRestore(null);
    if (onShowToast)
      onShowToast(
        `Successfully restored "${revision.pageTitle}" to Version ${revision.versionNumber}!`
      );
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-2 bg-[#0D0D12]">
        <div className="flex items-center gap-2 text-[#E5C158]">
          <History className="w-5 h-5" />
          <h3 className="font-poppins font-bold text-white text-base">
            Draft & Version Control Engine
          </h3>
        </div>
        <p className="text-xs text-neutral-400">
          Track revision history, inspect changes made by editors, compare draft vs published versions, and perform 1-click rollbacks.
        </p>
      </div>

      {/* REVISIONS TABLE */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden bg-[#0D0D12]">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#E5C158]" />
            <span className="font-poppins font-bold text-white text-sm">
              Page Revisions & Audit Log
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            {revisions.length} Total Historical Commits
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] text-neutral-400 font-mono uppercase text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3 px-5">Version & Status</th>
                <th className="py-3 px-4">Page & Slug</th>
                <th className="py-3 px-4">Summary of Changes</th>
                <th className="py-3 px-4">Editor</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {revisions.map((rev) => (
                <tr key={rev.id} className="hover:bg-white/[0.02] transition-colors">
                  {/* Version */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl bg-white/10 text-white font-mono font-bold text-xs">
                        {rev.versionNumber}
                      </span>
                      {rev.isCurrentPublished && (
                        <span className="px-2 py-0.5 rounded-full bg-[#28C76F]/20 text-[#28C76F] border border-[#28C76F]/40 font-mono text-[9px] font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] animate-pulse" />
                          <span>LIVE</span>
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Page & Slug */}
                  <td className="py-4 px-4 space-y-0.5">
                    <strong className="text-white font-bold block">{rev.pageTitle}</strong>
                    <span className="text-[10px] font-mono text-neutral-400">{rev.pageSlug}</span>
                  </td>

                  {/* Changes Summary */}
                  <td className="py-4 px-4 max-w-sm">
                    <p className="text-xs text-neutral-300 line-clamp-2">{rev.changesSummary}</p>
                  </td>

                  {/* Editor */}
                  <td className="py-4 px-4 font-mono text-[11px] text-neutral-300">
                    {rev.editor}
                  </td>

                  {/* Timestamp */}
                  <td className="py-4 px-4 font-mono text-[10px] text-neutral-400">
                    {rev.timestamp}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedForCompare(rev);
                          setIsCompareModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        title="Compare Diff"
                      >
                        <GitCompare className="w-4 h-4" />
                      </button>

                      {!rev.isCurrentPublished && (
                        <button
                          onClick={() => setSelectedForRestore(rev)}
                          className="px-3 py-1.5 rounded-xl bg-[#E5C158]/10 text-[#E5C158] hover:bg-[#E5C158]/20 border border-[#E5C158]/30 font-mono text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>RESTORE</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPARE DIFF MODAL */}
      <AnimatePresence>
        {isCompareModalOpen && selectedForCompare && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <GitCompare className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    Revision Diff: {selectedForCompare.pageTitle} ({selectedForCompare.versionNumber})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCompareModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Selected Version */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-amber-400 font-bold">INSPECTED REVISION</span>
                    <span className="text-white">{selectedForCompare.versionNumber}</span>
                  </div>
                  <strong className="text-white text-sm block">{selectedForCompare.pageTitle}</strong>
                  <p className="text-neutral-300">{selectedForCompare.changesSummary}</p>
                  <span className="text-[10px] text-neutral-500 block font-mono">
                    Editor: {selectedForCompare.editor}
                  </span>
                </div>

                {/* Current Published */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#28C76F]/30 space-y-2">
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-[#28C76F] font-bold">CURRENT LIVE VERSION</span>
                    <span className="text-white">v3.2</span>
                  </div>
                  <strong className="text-white text-sm block">Homepage (Live)</strong>
                  <p className="text-neutral-300">Active live website content with 50% launch offer.</p>
                  <span className="text-[10px] text-neutral-500 block font-mono">
                    Published: 2026-07-26 14:30 PKT
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsCompareModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONFIRM RESTORE MODAL */}
      <AnimatePresence>
        {selectedForRestore && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-amber-400">
                <RotateCcw className="w-6 h-6 shrink-0" />
                <h3 className="font-poppins font-bold text-white text-base">
                  Confirm Rollback / Restore?
                </h3>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Are you sure you want to restore <strong className="text-white">{selectedForRestore.pageTitle}</strong> to <strong className="text-[#E5C158]">{selectedForRestore.versionNumber}</strong>? This will make this historical version live on the public website.
              </p>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedForRestore(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-neutral-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRestore(selectedForRestore)}
                  className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] shadow-lg"
                >
                  Yes, Restore Version
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
