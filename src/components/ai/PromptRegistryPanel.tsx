import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileCode,
  Search,
  Filter,
  Plus,
  Copy,
  Archive,
  RotateCcw,
  GitCompare,
  History,
  Edit3,
  Trash2,
  CheckCircle2,
  Sparkles,
  Bot,
  Tag,
  Clock,
  User,
  Zap,
  Info,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  Code
} from 'lucide-react';

interface PromptRegistryPanelProps {
  onShowToast?: (msg: string) => void;
}

export interface PromptVersion {
  version: string;
  updatedAt: string;
  author: string;
  systemContent: string;
  changeSummary: string;
}

export interface PromptItem {
  id: string;
  name: string;
  category: 'Customer Support' | 'Payment OCR' | 'Sales & Quoting' | 'Academic Writing' | 'Operations' | 'Content Creation';
  targetAI: string;
  version: string;
  status: 'Active' | 'Draft' | 'Archived' | 'Testing';
  lastUpdated: string;
  owner: string;
  tokenEstimate: number;
  notes: string;
  systemContent: string;
  versionHistory: PromptVersion[];
}

const INITIAL_PROMPTS: PromptItem[] = [
  {
    id: 'prompt-chat',
    name: 'MFS_CHAT_VOICE_ASSISTANT_CORE',
    category: 'Customer Support',
    targetAI: 'Google Gemini 1.5 Flash',
    version: 'v2.1.0',
    status: 'Active',
    lastUpdated: 'Today at 10:14 AM',
    owner: 'Shehroz Sultan (Admin)',
    tokenEstimate: 1450,
    notes: 'Dual voice & chat prompt supporting English, Urdu, and Roman Urdu. Embeds 50% Grand Launch promo & EasyPaisa/JazzCash details.',
    systemContent: `You are the MFS AI Assistant representing MFS Growth Agency.
Core Directives:
1. Support English, Urdu, and Roman Urdu seamlessly.
2. Highlight 50% Grand Launch Offer on Presentation Design, Assignment Writing, ATS Resume, and Document Formatting.
3. EasyPaisa Number: 03116191234 (Muhammad Shehroz Sultan)
4. WhatsApp Escalation: +92 301 5323689.
5. Sample Work is strictly preview-only under "Our Work". Downloads disabled for protection.`,
    versionHistory: [
      {
        version: 'v2.1.0',
        updatedAt: '2026-07-27 10:14 AM',
        author: 'Shehroz Sultan (Admin)',
        systemContent: `You are the MFS AI Assistant representing MFS Growth Agency...`,
        changeSummary: 'Added Roman Urdu fallback greeting and Askari Bank account details.'
      },
      {
        version: 'v2.0.0',
        updatedAt: '2026-07-20 03:30 PM',
        author: 'Shehroz Sultan (Admin)',
        systemContent: `You are the MFS AI Support Bot representing MFS Growth Agency...`,
        changeSummary: 'Updated 50% Grand Launch discount instructions and EasyPaisa title.'
      }
    ]
  },
  {
    id: 'prompt-ocr',
    name: 'EASYPAISA_JAZZCASH_OCR_VERIFIER',
    category: 'Payment OCR',
    targetAI: 'Google Gemini 1.5 Vision / GPT-4o',
    version: 'v1.4.2',
    status: 'Active',
    lastUpdated: 'Yesterday at 04:22 PM',
    owner: 'Shehroz Sultan (Admin)',
    tokenEstimate: 820,
    notes: 'Vision OCR prompt parsing payment screenshots for EasyPaisa, JazzCash, and Askari Bank transfers.',
    systemContent: `Analyze the provided payment receipt screenshot.
Extract JSON object:
{
  "transactionId": string,
  "accountTitle": string,
  "amountPaid": number,
  "paymentMethod": "EasyPaisa" | "JazzCash" | "Bank Transfer",
  "confidenceScore": number,
  "isAuthentic": boolean
}`,
    versionHistory: [
      {
        version: 'v1.4.2',
        updatedAt: '2026-07-26 04:22 PM',
        author: 'Shehroz Sultan (Admin)',
        systemContent: `Analyze the provided payment receipt screenshot...`,
        changeSummary: 'Enhanced JazzCash digital receipt layout detection.'
      }
    ]
  },
  {
    id: 'prompt-quote',
    name: 'INTERACTIVE_CALCULATOR_QUOTER',
    category: 'Sales & Quoting',
    targetAI: 'Google Gemini 1.5 Flash',
    version: 'v1.2.0',
    status: 'Active',
    lastUpdated: '3 days ago',
    owner: 'System Auto-Updater',
    tokenEstimate: 640,
    notes: 'Dynamic pricing engine prompt calculating PKR, USD, GBP, EUR, AED rates with express multipliers.',
    systemContent: `Calculate live service quotes for Presentation Design, Assignments, CVs, and Formatting. Apply 50% Grand Launch discount automatically. Calculate speed multipliers (+30% Express, +50% Priority, +75% Same-Day).`,
    versionHistory: [
      {
        version: 'v1.2.0',
        updatedAt: '2026-07-24 11:00 AM',
        author: 'System Auto-Updater',
        systemContent: `Calculate live service quotes...`,
        changeSummary: 'Added currency rate conversion support for AED and EUR.'
      }
    ]
  },
  {
    id: 'prompt-citation',
    name: 'ACADEMIC_CITATION_FORMATTER',
    category: 'Academic Writing',
    targetAI: 'Anthropic Claude 3.5 Sonnet',
    version: 'v3.0.1',
    status: 'Active',
    lastUpdated: '4 days ago',
    owner: 'Shehroz Sultan (Admin)',
    tokenEstimate: 2100,
    notes: 'Strict reference formatting prompt for APA 7th Edition, Harvard, MLA 9, and IEEE standards.',
    systemContent: `Perform strict academic reference formatting on user assignment drafts. Format in-text citations and reference list according to selected style guide. Never hallucinate DOI URLs or author dates.`,
    versionHistory: [
      {
        version: 'v3.0.1',
        updatedAt: '2026-07-23 09:15 AM',
        author: 'Shehroz Sultan (Admin)',
        systemContent: `Perform strict academic reference formatting...`,
        changeSummary: 'Upgraded to APA 7th edition strict ruleset.'
      }
    ]
  },
  {
    id: 'prompt-resume',
    name: 'ATS_RESUME_ENGINEER_V1',
    category: 'Operations',
    targetAI: 'OpenAI GPT-4o',
    version: 'v1.0.0',
    status: 'Testing',
    lastUpdated: '1 week ago',
    owner: 'Shehroz Sultan (Admin)',
    tokenEstimate: 1800,
    notes: 'Parses job descriptions and engineers ATS-optimized resume bullet points with action verbs.',
    systemContent: `Transform user raw experience bullets into high-impact ATS-friendly metric bullets with standard industry keywords.`,
    versionHistory: [
      {
        version: 'v1.0.0',
        updatedAt: '2026-07-20 02:00 PM',
        author: 'Shehroz Sultan (Admin)',
        systemContent: `Transform user raw experience bullets...`,
        changeSummary: 'Initial version created for ATS Resume Service.'
      }
    ]
  }
];

export const PromptRegistryPanel: React.FC<PromptRegistryPanelProps> = ({ onShowToast }) => {
  const [prompts, setPrompts] = useState<PromptItem[]>(INITIAL_PROMPTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');

  // Modals
  const [editingPrompt, setEditingPrompt] = useState<PromptItem | null>(null);
  const [viewingHistoryPrompt, setViewingHistoryPrompt] = useState<PromptItem | null>(null);
  const [comparingPrompt, setComparingPrompt] = useState<PromptItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);

  // Filtered List
  const filteredPrompts = useMemo(() => {
    return prompts.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.systemContent.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'All Categories' || p.category === selectedCategory;
      const matchesStat = selectedStatus === 'All Statuses' || p.status === selectedStatus;

      return matchesSearch && matchesCat && matchesStat;
    });
  }, [prompts, searchQuery, selectedCategory, selectedStatus]);

  // Duplicate Prompt
  const handleDuplicate = (id: string) => {
    const target = prompts.find(p => p.id === id);
    if (!target) return;

    const duplicated: PromptItem = {
      ...target,
      id: `prompt-${Date.now()}`,
      name: `${target.name}_COPY`,
      version: 'v1.0.0',
      status: 'Draft',
      lastUpdated: 'Just now',
      notes: `Duplicated from ${target.name}`
    };

    setPrompts([duplicated, ...prompts]);
    if (onShowToast) onShowToast(`Duplicated ${target.name} as ${duplicated.name}`);
  };

  // Archive / Restore
  const handleToggleArchive = (id: string) => {
    setPrompts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextStatus = p.status === 'Archived' ? 'Active' : 'Archived';
          if (onShowToast) onShowToast(`${p.name} status set to ${nextStatus}`);
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  // Save Edit / Create Prompt
  const handleSavePrompt = () => {
    if (!editingPrompt) return;

    if (isCreatingNew) {
      setPrompts([editingPrompt, ...prompts]);
      if (onShowToast) onShowToast(`Prompt "${editingPrompt.name}" created successfully`);
    } else {
      setPrompts(prev =>
        prev.map(p => (p.id === editingPrompt.id ? editingPrompt : p))
      );
      if (onShowToast) onShowToast(`Prompt "${editingPrompt.name}" updated to version ${editingPrompt.version}`);
    }

    setEditingPrompt(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 font-mono text-[10px] font-bold uppercase">
              <Code className="w-3 h-3" />
              <span>Zero-Hardcode System Registry</span>
            </div>
            <h2 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
              <FileCode className="w-5 h-5 text-[#E5C158]" />
              <span>Enterprise Prompt Registry & Version Control</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Centralized repository for all system prompts, instruction templates, version comparisons, and token usage estimates.
            </p>
          </div>

          <button
            onClick={() => {
              const newPrompt: PromptItem = {
                id: `prompt-${Date.now()}`,
                name: 'NEW_SYSTEM_PROMPT_V1',
                category: 'Operations',
                targetAI: 'Google Gemini 1.5 Flash',
                version: 'v1.0.0',
                status: 'Draft',
                lastUpdated: 'Just now',
                owner: 'Shehroz Sultan (Admin)',
                tokenEstimate: 500,
                notes: 'Enter prompt usage notes here...',
                systemContent: 'You are an AI assistant for MFS Growth Agency...',
                versionHistory: []
              };
              setEditingPrompt(newPrompt);
              setIsCreatingNew(true);
            }}
            className="px-4 py-2 rounded-xl bg-[#E5C158] hover:bg-[#d4af37] text-black font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Prompt</span>
          </button>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search prompt templates by identifier, notes, or system instructions..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#E5C158] cursor-pointer"
            >
              <option value="All Categories" className="bg-[#0D0D12]">All Categories</option>
              <option value="Customer Support" className="bg-[#0D0D12]">Customer Support</option>
              <option value="Payment OCR" className="bg-[#0D0D12]">Payment OCR</option>
              <option value="Sales & Quoting" className="bg-[#0D0D12]">Sales & Quoting</option>
              <option value="Academic Writing" className="bg-[#0D0D12]">Academic Writing</option>
              <option value="Operations" className="bg-[#0D0D12]">Operations</option>
            </select>

            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#E5C158] cursor-pointer"
            >
              <option value="All Statuses" className="bg-[#0D0D12]">All Statuses</option>
              <option value="Active" className="bg-[#0D0D12]">Active</option>
              <option value="Draft" className="bg-[#0D0D12]">Draft</option>
              <option value="Testing" className="bg-[#0D0D12]">Testing</option>
              <option value="Archived" className="bg-[#0D0D12]">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* PROMPTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrompts.map(prompt => (
          <div
            key={prompt.id}
            className={`p-5 rounded-3xl bg-[#0D0D12] border transition-all shadow-xl space-y-4 relative overflow-hidden group ${
              prompt.status === 'Active'
                ? 'border-white/10 hover:border-[#E5C158]/50'
                : prompt.status === 'Testing'
                ? 'border-blue-500/30'
                : 'border-white/5 opacity-60'
            }`}
          >
            {/* TOP BAR */}
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#E5C158] uppercase font-bold block">
                  {prompt.category}
                </span>
                <strong className="text-white font-mono font-bold text-sm group-hover:text-[#E5C158] transition-colors block">
                  {prompt.name}
                </strong>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-mono text-[10px] font-bold">
                  {prompt.version}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase border ${
                    prompt.status === 'Active'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : prompt.status === 'Testing'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      : prompt.status === 'Draft'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {prompt.status}
                </span>
              </div>
            </div>

            {/* NOTES & SUMMARY */}
            <p className="text-xs text-neutral-300 leading-relaxed min-h-[36px]">
              {prompt.notes}
            </p>

            {/* TARGET AI & TOKEN ESTIMATE */}
            <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
              <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                <span className="text-[9px] text-neutral-400 block">Target Engine</span>
                <strong className="text-white text-[10px] font-bold">{prompt.targetAI}</strong>
              </div>

              <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                <span className="text-[9px] text-neutral-400 block">Est. Token Run</span>
                <strong className="text-purple-400 font-bold">{prompt.tokenEstimate} tok</strong>
              </div>
            </div>

            {/* SYSTEM INSTRUCTIONS CODE PREVIEW */}
            <div className="p-3 rounded-xl bg-black border border-white/5 text-[11px] font-mono text-emerald-400/90 line-clamp-3 leading-relaxed">
              {prompt.systemContent}
            </div>

            {/* FOOTER ACTIONS */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-1.5">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewingHistoryPrompt(prompt)}
                  title="Version History"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 cursor-pointer"
                >
                  <History className="w-3.5 h-3.5 text-[#E5C158]" />
                </button>

                <button
                  onClick={() => setComparingPrompt(prompt)}
                  title="Compare Versions"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 cursor-pointer"
                >
                  <GitCompare className="w-3.5 h-3.5 text-blue-400" />
                </button>

                <button
                  onClick={() => handleDuplicate(prompt.id)}
                  title="Duplicate Prompt"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleToggleArchive(prompt.id)}
                  className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-bold text-[11px] cursor-pointer"
                >
                  {prompt.status === 'Archived' ? 'Restore' : 'Archive'}
                </button>

                <button
                  onClick={() => {
                    setEditingPrompt(prompt);
                    setIsCreatingNew(false);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#E5C158] text-black font-bold text-[11px] hover:bg-[#d4af37] cursor-pointer shadow-md"
                >
                  Edit Prompt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT / CREATE PROMPT MODAL */}
      <AnimatePresence>
        {editingPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl p-6 rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-[#E5C158]" />
                    <span>{isCreatingNew ? 'Create New Prompt Template' : `Edit ${editingPrompt.name}`}</span>
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">Dynamic System Prompt Editor</span>
                </div>

                <button
                  onClick={() => setEditingPrompt(null)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-300 font-mono font-bold block mb-1">Prompt Identifier Name</label>
                    <input
                      type="text"
                      value={editingPrompt.name}
                      onChange={e => setEditingPrompt({ ...editingPrompt, name: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-300 font-mono font-bold block mb-1">Version tag</label>
                    <input
                      type="text"
                      value={editingPrompt.version}
                      onChange={e => setEditingPrompt({ ...editingPrompt, version: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-neutral-300 font-mono font-bold block mb-1">Category</label>
                    <select
                      value={editingPrompt.category}
                      onChange={e =>
                        setEditingPrompt({
                          ...editingPrompt,
                          category: e.target.value as any
                        })
                      }
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    >
                      <option value="Customer Support" className="bg-[#0D0D12]">Customer Support</option>
                      <option value="Payment OCR" className="bg-[#0D0D12]">Payment OCR</option>
                      <option value="Sales & Quoting" className="bg-[#0D0D12]">Sales & Quoting</option>
                      <option value="Academic Writing" className="bg-[#0D0D12]">Academic Writing</option>
                      <option value="Operations" className="bg-[#0D0D12]">Operations</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-neutral-300 font-mono font-bold block mb-1">Target AI Engine</label>
                    <input
                      type="text"
                      value={editingPrompt.targetAI}
                      onChange={e => setEditingPrompt({ ...editingPrompt, targetAI: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-300 font-mono font-bold block mb-1">Status</label>
                    <select
                      value={editingPrompt.status}
                      onChange={e =>
                        setEditingPrompt({
                          ...editingPrompt,
                          status: e.target.value as any
                        })
                      }
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    >
                      <option value="Active" className="bg-[#0D0D12]">Active</option>
                      <option value="Draft" className="bg-[#0D0D12]">Draft</option>
                      <option value="Testing" className="bg-[#0D0D12]">Testing</option>
                      <option value="Archived" className="bg-[#0D0D12]">Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-neutral-300 font-mono font-bold block mb-1">System Instructions Content</label>
                  <textarea
                    rows={6}
                    value={editingPrompt.systemContent}
                    onChange={e => setEditingPrompt({ ...editingPrompt, systemContent: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs font-mono text-emerald-400 focus:outline-none focus:border-[#E5C158] leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-mono font-bold block mb-1">Internal Notes & Change Log</label>
                  <input
                    type="text"
                    value={editingPrompt.notes}
                    onChange={e => setEditingPrompt({ ...editingPrompt, notes: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  onClick={() => setEditingPrompt(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePrompt}
                  className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-bold text-xs hover:bg-[#d4af37] cursor-pointer shadow-lg"
                >
                  Save Prompt
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VERSION HISTORY DRAWER MODAL */}
      <AnimatePresence>
        {viewingHistoryPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl p-6 rounded-3xl bg-[#0D0D12] border border-blue-500/50 space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-400" />
                    <span>Version History — {viewingHistoryPrompt.name}</span>
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">Previous Revisions & Rollback Log</span>
                </div>

                <button
                  onClick={() => setViewingHistoryPrompt(null)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {viewingHistoryPrompt.versionHistory.map((vh, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 font-mono font-bold text-[10px]">
                        {vh.version}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">{vh.updatedAt} • {vh.author}</span>
                    </div>

                    <p className="text-neutral-300 font-semibold">{vh.changeSummary}</p>
                    <p className="text-neutral-500 font-mono text-[10px] line-clamp-2">{vh.systemContent}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setViewingHistoryPrompt(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* COMPARE VERSIONS MODAL */}
      <AnimatePresence>
        {comparingPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-3xl p-6 rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                    <GitCompare className="w-5 h-5 text-[#E5C158]" />
                    <span>Side-by-Side Prompt Version Compare</span>
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">{comparingPrompt.name}</span>
                </div>

                <button
                  onClick={() => setComparingPrompt(null)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-2 p-3 rounded-2xl bg-black border border-white/10">
                  <strong className="text-emerald-400 block font-bold border-b border-white/10 pb-1">
                    Current Active Version ({comparingPrompt.version})
                  </strong>
                  <div className="text-neutral-300 whitespace-pre-wrap leading-relaxed text-[11px]">
                    {comparingPrompt.systemContent}
                  </div>
                </div>

                <div className="space-y-2 p-3 rounded-2xl bg-black border border-white/10">
                  <strong className="text-blue-400 block font-bold border-b border-white/10 pb-1">
                    Previous Revision (v2.0.0)
                  </strong>
                  <div className="text-neutral-400 whitespace-pre-wrap leading-relaxed text-[11px]">
                    {comparingPrompt.versionHistory[1]?.systemContent || comparingPrompt.systemContent}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setComparingPrompt(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 cursor-pointer"
                >
                  Close Compare
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
