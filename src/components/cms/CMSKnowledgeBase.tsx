import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Folder,
  Search,
  Plus,
  Bot,
  Layers,
  FileText,
  Clock,
  Eye,
  Edit3,
  Trash2,
  Lock,
  Sparkles,
  CheckCircle2,
  Database,
  Cpu,
  Save,
  X,
  Share2
} from 'lucide-react';
import { Currency } from '../../types';

export interface KBArticle {
  id: string;
  title: string;
  category: 'sops' | 'guidelines' | 'client_help' | 'ai_prompts' | 'design_standards' | 'brand_guidelines';
  articleCount?: number;
  lastUpdated: string;
  visibility: 'internal' | 'client_portal' | 'public';
  searchIndexStatus: 'indexed' | 'pending' | 'excluded';
  ragVectorized: boolean;
  content: string;
}

interface CMSKnowledgeBaseProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSKnowledgeBase: React.FC<CMSKnowledgeBaseProps> = ({
  currency,
  onShowToast,
}) => {
  // Knowledge Base Articles State
  const [kbArticles, setKbArticles] = useState<KBArticle[]>([
    {
      id: 'kb-1',
      title: 'MFS Standard Operating Procedure: Presentation Deck QA Checklist',
      category: 'sops',
      lastUpdated: '2026-07-26 18:00 PKT',
      visibility: 'internal',
      searchIndexStatus: 'indexed',
      ragVectorized: true,
      content: '1. Check all typography follows Poppins / Inter guidelines.\n2. Ensure Gold `#E5C158` accent is applied to key emphasis points.\n3. Verify slide dimensions are set to 16:9 widescreen format.\n4. Confirm no low-res images or broken icon vectors remain.',
    },
    {
      id: 'kb-2',
      title: 'APA 7th Edition Citation & Referencing Standard Operating Protocol',
      category: 'guidelines',
      lastUpdated: '2026-07-24 11:30 PKT',
      visibility: 'internal',
      searchIndexStatus: 'indexed',
      ragVectorized: true,
      content: `In-text citations require author surname and publication year e.g. (Sultan, 2026). References must feature hanging indents and double line spacing.`,
    },
    {
      id: 'kb-3',
      title: 'MFS Voice & Chat AI Prompt Optimization Directives for Assistants',
      category: 'ai_prompts',
      lastUpdated: '2026-07-25 15:45 PKT',
      visibility: 'internal',
      searchIndexStatus: 'indexed',
      ragVectorized: true,
      content: `Maintain polite tone. Support English, Urdu, Roman Urdu. Always emphasize 50% Grand Launch Discount. Remind visitors that sample work under "Our Work" is protected.`,
    },
    {
      id: 'kb-4',
      title: 'Client Portal Guide: How to Track Order Progress & Download Final Deliverables',
      category: 'client_help',
      lastUpdated: '2026-07-22 09:20 PKT',
      visibility: 'client_portal',
      searchIndexStatus: 'indexed',
      ragVectorized: true,
      content: `Clients log into the portal using their registered email and Order ID. Status updates (Received -> Processing -> Quality Review -> Delivered) sync in real-time.`,
    },
    {
      id: 'kb-5',
      title: 'MFS Brand Identity Guidelines: Colors, Typography, & Logo Usage',
      category: 'brand_guidelines',
      lastUpdated: '2026-07-20 14:10 PKT',
      visibility: 'public',
      searchIndexStatus: 'indexed',
      ragVectorized: true,
      content: `Gold Accent: #E5C158, Dark Canvas: #050507, Primary Text: #FFFFFF, Secondary Text: #CFCFCF. Primary Headings: Poppins, Body: Inter.`,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKb, setSelectedKb] = useState<KBArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { key: 'all', label: 'All Knowledge Articles' },
    { key: 'sops', label: 'Agency SOPs' },
    { key: 'guidelines', label: 'Internal Guidelines' },
    { key: 'client_help', label: 'Client Help Articles' },
    { key: 'ai_prompts', label: 'AI Prompt Library' },
    { key: 'brand_guidelines', label: 'Brand & Design Standards' },
  ];

  const filteredArticles = kbArticles.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenModal = (article?: KBArticle) => {
    setSelectedKb(
      article || {
        id: `kb-${Date.now()}`,
        title: '',
        category: 'sops',
        lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' PKT',
        visibility: 'internal',
        searchIndexStatus: 'indexed',
        ragVectorized: true,
        content: '',
      }
    );
    setIsModalOpen(true);
  };

  const handleSaveKb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKb || !selectedKb.title) return;

    const exists = kbArticles.some((item) => item.id === selectedKb.id);
    if (exists) {
      setKbArticles((prev) =>
        prev.map((item) => (item.id === selectedKb.id ? selectedKb : item))
      );
      if (onShowToast) onShowToast(`Updated knowledge article "${selectedKb.title}"`);
    } else {
      setKbArticles((prev) => [selectedKb, ...prev]);
      if (onShowToast) onShowToast(`Created knowledge article "${selectedKb.title}"`);
    }
    setIsModalOpen(false);
  };

  const handleDeleteKb = (id: string, title: string) => {
    setKbArticles((prev) => prev.filter((item) => item.id !== id));
    if (onShowToast) onShowToast(`Deleted article "${title}"`);
  };

  const handleTriggerRagReindex = () => {
    if (onShowToast)
      onShowToast('Vector Indexing Triggered! Synced Knowledge Base for MFS AI Voice & Chat Assistant RAG memory.');
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-mono text-[10px] font-bold border border-purple-500/30 uppercase">
                INTERNAL KNOWLEDGE BASE & SOPs
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 flex items-center gap-1">
                <Bot className="w-3 h-3 text-[#E5C158]" />
                <span>RAG SOURCE CONNECTED</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Agency SOPs, Guidelines & AI Retrieval Index
            </h3>
            <p className="text-xs text-neutral-400">
              Centralized repository for agency procedures, writing standards, brand rules, and knowledge vectors used by AI Assistants.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleTriggerRagReindex}
              className="px-4 py-2.5 rounded-2xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              <Cpu className="w-4 h-4 text-[#E5C158]" />
              <span>Re-index Vector RAG</span>
            </button>

            <button
              onClick={() => handleOpenModal()}
              className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Knowledge Article</span>
            </button>
          </div>
        </div>

        {/* SEARCH & CATEGORY FILTER TABS */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SOPs, guidelines, AI prompt libraries..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-[#E5C158] text-black shadow-md'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ARTICLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12] hover:border-[#E5C158]/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[#E5C158] font-mono text-[10px] uppercase font-bold">
                  {article.category.replace('_', ' ')}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold flex items-center gap-1">
                  <Database className="w-3 h-3 text-emerald-400" />
                  <span>RAG Vectorized</span>
                </span>
              </div>

              <strong className="text-white text-sm font-bold block line-clamp-2 leading-snug">
                {article.title}
              </strong>

              <p className="text-xs text-neutral-400 line-clamp-3 font-mono leading-relaxed bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                {article.content}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#E5C158]" />
                <span>{article.lastUpdated}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenModal(article)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-[#E5C158]/20 text-neutral-300 hover:text-[#E5C158] transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteKb(article.id, article.title)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ARTICLE EDIT / CREATION MODAL */}
      <AnimatePresence>
        {isModalOpen && selectedKb && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    Knowledge Article & RAG Resource
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveKb} className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Standard QA Checklist for Slide Decks"
                    value={selectedKb.title}
                    onChange={(e) => setSelectedKb({ ...selectedKb, title: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Category
                    </label>
                    <select
                      value={selectedKb.category}
                      onChange={(e) => setSelectedKb({ ...selectedKb, category: e.target.value as any })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    >
                      <option value="sops" className="bg-black">Agency SOPs</option>
                      <option value="guidelines" className="bg-black">Internal Guidelines</option>
                      <option value="client_help" className="bg-black">Client Help Articles</option>
                      <option value="ai_prompts" className="bg-black">AI Prompt Library</option>
                      <option value="brand_guidelines" className="bg-black">Brand Standards</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Visibility Scope
                    </label>
                    <select
                      value={selectedKb.visibility}
                      onChange={(e) => setSelectedKb({ ...selectedKb, visibility: e.target.value as any })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    >
                      <option value="internal" className="bg-black">Internal Admin Only</option>
                      <option value="client_portal" className="bg-black">Client Portal Visible</option>
                      <option value="public" className="bg-black">Public Knowledge Base</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Knowledge Article Body
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={selectedKb.content}
                    onChange={(e) => setSelectedKb({ ...selectedKb, content: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
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
                    Save & Index RAG
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
