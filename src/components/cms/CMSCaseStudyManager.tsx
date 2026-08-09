import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Briefcase,
  TrendingUp,
  FileDown,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  BarChart2,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Save,
  X,
  FileCheck,
  Building
} from 'lucide-react';
import { Currency } from '../../types';

export interface CaseStudy {
  id: string;
  clientName: string;
  industry: string;
  challenge: string;
  strategy: string;
  servicesProvided: string[];
  timeline: string;
  resultsMetric: string;
  beforeAfterSummary: string;
  pdfReportUrl?: string;
  featuredOnHome: boolean;
}

interface CMSCaseStudyManagerProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSCaseStudyManager: React.FC<CMSCaseStudyManagerProps> = ({
  currency,
  onShowToast,
}) => {
  // Case Studies State
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([
    {
      id: 'cs-1',
      clientName: 'Fintech Series A Startup (Dubai, UAE)',
      industry: 'Financial Technology',
      challenge: 'Securing $3.5M Series A seed capital with a tight 7-day investor meeting deadline.',
      strategy: 'Restructured 18-slide pitch deck into 10 high-impact visual slides with bespoke financial charts.',
      servicesProvided: ['Presentation Design', 'Corporate Formatting', 'Infographics'],
      timeline: '4 Business Days',
      resultsMetric: '+320% Investor Engagement & $3.5M Seed Secured',
      beforeAfterSummary: 'Before: Text-heavy 24 slides without hierarchy. After: Gold-accented executive presentation deck.',
      pdfReportUrl: '/downloads/mfs-case-study-fintech-dubai.pdf',
      featuredOnHome: true,
    },
    {
      id: 'cs-2',
      clientName: 'UK Master Student (University of Manchester)',
      industry: 'Academic Dissertation',
      challenge: 'Formatting 12,000-word Master thesis according to strict Harvard referencing standards.',
      strategy: 'Comprehensive proofreading, citation validation, structured table of contents, and figure formatting.',
      servicesProvided: ['Assignment Writing', 'Report Formatting'],
      timeline: '3 Days Express SLA',
      resultsMetric: 'Grade A Distinction (84% Score)',
      beforeAfterSummary: 'Before: Disorganized references & citation errors. After: Perfectly compliant academic thesis.',
      pdfReportUrl: '/downloads/mfs-case-study-academic-uk.pdf',
      featuredOnHome: true,
    },
    {
      id: 'cs-3',
      clientName: 'Senior Software Architect (Islamabad, PK)',
      industry: 'Technology & Cloud Engineering',
      challenge: 'Failing automated ATS resume filters for Tier-1 US & European remote enterprise positions.',
      strategy: 'Re-engineered resume with targeted Cloud/DevOps keywords, two-column visual hierarchy, and ATS optimization.',
      servicesProvided: ['ATS Resume Engineering', 'Cover Letter'],
      timeline: '48 Hours Priority',
      resultsMetric: '5 Interview Calls Received within 10 Days',
      beforeAfterSummary: 'Before: Unformatted 1-page CV. After: ATS-certified 98% match rate resume.',
      pdfReportUrl: '/downloads/mfs-case-study-ats-resume-pk.pdf',
      featuredOnHome: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCs, setEditingCs] = useState<CaseStudy | null>(null);

  const filteredCaseStudies = caseStudies.filter(
    (cs) =>
      cs.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.challenge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (cs?: CaseStudy) => {
    setEditingCs(
      cs || {
        id: `cs-${Date.now()}`,
        clientName: '',
        industry: 'Technology',
        challenge: '',
        strategy: '',
        servicesProvided: ['Presentation Design'],
        timeline: '3 Days',
        resultsMetric: '100% Client Satisfaction',
        beforeAfterSummary: '',
        pdfReportUrl: '',
        featuredOnHome: false,
      }
    );
    setIsModalOpen(true);
  };

  const handleSaveCaseStudy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCs || !editingCs.clientName) return;

    const exists = caseStudies.some((c) => c.id === editingCs.id);
    if (exists) {
      setCaseStudies((prev) => prev.map((c) => (c.id === editingCs.id ? editingCs : c)));
      if (onShowToast) onShowToast(`Updated case study "${editingCs.clientName}"`);
    } else {
      setCaseStudies((prev) => [editingCs, ...prev]);
      if (onShowToast) onShowToast(`Created case study "${editingCs.clientName}"`);
    }
    setIsModalOpen(false);
  };

  const handleDeleteCaseStudy = (id: string, name: string) => {
    setCaseStudies((prev) => prev.filter((c) => c.id !== id));
    if (onShowToast) onShowToast(`Deleted case study "${name}"`);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold border border-amber-500/30 uppercase">
                CASE STUDY & PROOF CENTER
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30">
                VERIFIED METRICS
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Client Growth Case Studies & Success Stories
            </h3>
            <p className="text-xs text-neutral-400">
              Manage client success transformations, before/after comparisons, ROI metrics, and downloadable PDF proofs.
            </p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Case Study</span>
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="pt-2 border-t border-white/10">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies by client, industry, or challenge..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>
        </div>
      </div>

      {/* CASE STUDY CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCaseStudies.map((cs) => (
          <div
            key={cs.id}
            className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12] hover:border-[#E5C158]/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-neutral-300 font-mono text-[10px] uppercase font-bold flex items-center gap-1">
                  <Building className="w-3 h-3 text-[#E5C158]" />
                  <span>{cs.industry}</span>
                </span>
                {cs.featuredOnHome && (
                  <span className="px-2 py-0.5 rounded-full bg-[#E5C158]/20 text-[#E5C158] font-mono text-[9px] font-bold uppercase">
                    Homepage Featured
                  </span>
                )}
              </div>

              <strong className="text-white text-sm font-bold block leading-tight">
                {cs.clientName}
              </strong>

              <div className="space-y-2 text-xs text-neutral-300">
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                    Challenge
                  </span>
                  <p className="text-neutral-300 text-[11px] leading-snug">{cs.challenge}</p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/10 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Measured Impact</span>
                  </span>
                  <strong className="text-emerald-300 text-xs font-bold block">
                    {cs.resultsMetric}
                  </strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>Timeline: <strong className="text-white">{cs.timeline}</strong></span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenModal(cs)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-[#E5C158]/20 text-neutral-300 hover:text-[#E5C158] transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteCaseStudy(cs.id, cs.clientName)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {isModalOpen && editingCs && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <Award className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    Case Study Configurator
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCaseStudy} className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Client Name & Region
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fintech Series A Startup (Dubai)"
                    value={editingCs.clientName}
                    onChange={(e) => setEditingCs({ ...editingCs, clientName: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={editingCs.industry}
                      onChange={(e) => setEditingCs({ ...editingCs, industry: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Timeline SLA
                    </label>
                    <input
                      type="text"
                      value={editingCs.timeline}
                      onChange={(e) => setEditingCs({ ...editingCs, timeline: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Client Challenge
                  </label>
                  <textarea
                    rows={2}
                    value={editingCs.challenge}
                    onChange={(e) => setEditingCs({ ...editingCs, challenge: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Measured Result Metric
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +320% Investor Engagement & $3.5M Seed"
                    value={editingCs.resultsMetric}
                    onChange={(e) => setEditingCs({ ...editingCs, resultsMetric: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold text-emerald-400"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-neutral-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold shadow-lg"
                  >
                    Save Case Study
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
