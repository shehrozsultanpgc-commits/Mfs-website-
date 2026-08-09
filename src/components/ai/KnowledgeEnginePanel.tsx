import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Database,
  UploadCloud,
  FileText,
  Search,
  Filter,
  FolderTree,
  CheckCircle2,
  RefreshCw,
  Trash2,
  Eye,
  Tag,
  Sparkles,
  Layers,
  Clock,
  HardDrive,
  Cpu,
  ChevronDown,
  ChevronRight,
  Folder,
  File,
  AlertCircle,
  Plus
} from 'lucide-react';

interface KnowledgeEnginePanelProps {
  onShowToast?: (msg: string) => void;
}

export interface KnowledgeDocument {
  id: string;
  fileName: string;
  category: string;
  fileType: 'PDF' | 'DOCX' | 'TXT' | 'MD' | 'SOP' | 'FAQ';
  uploadDate: string;
  sizeMb: number;
  status: 'Indexed' | 'Processing' | 'Pending Index';
  aiIndexedStatus: string;
  lastUsed: string;
  tags: string[];
  summary: string;
}

const INITIAL_CATEGORIES = [
  { id: 'cat-all', name: 'All Categories', count: 12 },
  { id: 'cat-marketing', name: 'Marketing', count: 2 },
  { id: 'cat-branding', name: 'Branding', count: 1 },
  { id: 'cat-seo', name: 'SEO', count: 1 },
  { id: 'cat-social', name: 'Social Media', count: 1 },
  { id: 'cat-ads', name: 'Paid Ads', count: 1 },
  { id: 'cat-web', name: 'Web Development', count: 1 },
  { id: 'cat-uiux', name: 'UI/UX', count: 1 },
  { id: 'cat-auto', name: 'Automation', count: 1 },
  { id: 'cat-sops', name: 'Client SOPs', count: 2 },
  { id: 'cat-internal', name: 'Internal Documentation', count: 1 }
];

const INITIAL_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'doc-sop-presentation',
    fileName: 'MFS_Presentation_Design_SOP_v2.pdf',
    category: 'Client SOPs',
    fileType: 'PDF',
    uploadDate: '2026-07-25',
    sizeMb: 4.2,
    status: 'Indexed',
    aiIndexedStatus: 'Vectorized (128 Chunks)',
    lastUsed: '10 mins ago',
    tags: ['#SOP', '#Presentation', '#PitchDeck', '#Rates'],
    summary: 'Standard operating procedure for pitch decks, academic slide count rules, and 24-hour turnaround guidelines.'
  },
  {
    id: 'doc-brand-guidelines',
    fileName: 'MFS_Brand_Identity_Gold_Dark_Theme.pdf',
    category: 'Branding',
    fileType: 'PDF',
    uploadDate: '2026-07-20',
    sizeMb: 8.5,
    status: 'Indexed',
    aiIndexedStatus: 'Vectorized (256 Chunks)',
    lastUsed: '2 hours ago',
    tags: ['#Brand', '#GoldAccent', '#Typography', '#ColorHex'],
    summary: 'MFS Growth Agency visual identity guidelines. Gold accent #E5C158, base dark #050507, typography rules.'
  },
  {
    id: 'doc-assignment-formatting',
    fileName: 'Academic_Assignments_Citation_Style_Guide.docx',
    category: 'Client SOPs',
    fileType: 'DOCX',
    uploadDate: '2026-07-22',
    sizeMb: 2.1,
    status: 'Indexed',
    aiIndexedStatus: 'Vectorized (96 Chunks)',
    lastUsed: 'Yesterday',
    tags: ['#APA7', '#Harvard', '#MLA', '#Citations'],
    summary: 'Complete ruleset for academic assignment writing, referencing styles, and plagiarism check workflows.'
  },
  {
    id: 'doc-payment-policy',
    fileName: 'Payment_Accounts_Verification_Policy.md',
    category: 'Internal Documentation',
    fileType: 'MD',
    uploadDate: '2026-07-26',
    sizeMb: 0.8,
    status: 'Indexed',
    aiIndexedStatus: 'Vectorized (45 Chunks)',
    lastUsed: '5 mins ago',
    tags: ['#EasyPaisa', '#JazzCash', '#AskariBank', '#OCR'],
    summary: 'Internal guidelines for EasyPaisa 03116191234, JazzCash 03015323688, and Askari Bank account verification.'
  },
  {
    id: 'doc-faq-base',
    fileName: 'MFS_Frequently_Asked_Questions_2026.txt',
    category: 'Marketing',
    fileType: 'FAQ',
    uploadDate: '2026-07-24',
    sizeMb: 1.1,
    status: 'Indexed',
    aiIndexedStatus: 'Vectorized (64 Chunks)',
    lastUsed: 'Just now',
    tags: ['#FAQ', '#Support', '#Languages', '#Urdu'],
    summary: 'Comprehensive multi-lingual Q&A repository for voice and chat support assistants.'
  }
];

export const KnowledgeEnginePanel: React.FC<KnowledgeEnginePanelProps> = ({ onShowToast }) => {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(INITIAL_DOCUMENTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [previewDoc, setPreviewDoc] = useState<KnowledgeDocument | null>(null);
  const [isReindexing, setIsReindexing] = useState<boolean>(false);

  // Filtered Documents
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch =
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'All Categories' || doc.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [documents, searchQuery, selectedCategory]);

  // Handle Drag & Drop Upload Simulation
  const handleDropUpload = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const newDoc: KnowledgeDocument = {
      id: `doc-${Date.now()}`,
      fileName: 'Uploaded_Client_SOP_Document.pdf',
      category: selectedCategory === 'All Categories' ? 'Client SOPs' : selectedCategory,
      fileType: 'PDF',
      uploadDate: new Date().toISOString().split('T')[0],
      sizeMb: 3.4,
      status: 'Indexed',
      aiIndexedStatus: 'Vectorized (112 Chunks)',
      lastUsed: 'Just now',
      tags: ['#NewUpload', '#Vectorized'],
      summary: 'Newly uploaded document automatically indexed into pgvector embeddings.'
    };

    setDocuments([newDoc, ...documents]);
    if (onShowToast) {
      onShowToast(`Uploaded & Vector-Indexed "Uploaded_Client_SOP_Document.pdf"`);
    }
  };

  // Reindex All Documents Simulation
  const handleReindexAll = () => {
    setIsReindexing(true);
    setTimeout(() => {
      setIsReindexing(false);
      if (onShowToast) {
        onShowToast('Vector Database re-indexing completed for all knowledge files');
      }
    }, 1000);
  };

  // Delete Document
  const handleDeleteDoc = (id: string) => {
    const target = documents.find(d => d.id === id);
    setDocuments(prev => prev.filter(d => d.id !== id));
    if (onShowToast && target) {
      onShowToast(`Removed ${target.fileName} from Knowledge Base`);
    }
  };

  return (
    <div className="space-y-6">
      {/* VECTOR DB STATUS BANNER */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] border border-teal-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <strong className="text-white font-bold text-sm">Supabase pgvector Engine Active</strong>
              <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400 font-mono text-[9px] font-bold">
                1,536-dim Embeddings
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              All documents are chunked and embedded in real-time for high-precision Retrieval-Augmented Generation (RAG).
            </p>
          </div>
        </div>

        <button
          disabled={isReindexing}
          onClick={handleReindexAll}
          className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isReindexing ? 'animate-spin' : ''}`} />
          <span>{isReindexing ? 'Re-indexing Vector Store...' : 'Re-index Entire Knowledge Base'}</span>
        </button>
      </div>

      {/* DRAG AND DROP UPLOAD ZONE */}
      <div
        onDragOver={e => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDropUpload}
        className={`p-8 rounded-3xl border-2 border-dashed transition-all text-center space-y-3 cursor-pointer ${
          isDragOver
            ? 'border-[#E5C158] bg-[#E5C158]/10'
            : 'border-white/20 bg-[#0D0D12] hover:border-white/40'
        }`}
      >
        <UploadCloud className="w-10 h-10 text-[#E5C158] mx-auto" />
        <div>
          <h3 className="text-white font-bold text-base">Drag & Drop Knowledge Base Files</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Supports PDF, DOCX, TXT, Markdown, PPTX, SOP Docs, and FAQs. Maximum file size 25MB.
          </p>
        </div>
        <button
          onClick={() => {
            if (onShowToast) onShowToast('File selection dialog open (Frontend Upload Simulation)');
          }}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
        >
          Browse Files
        </button>
      </div>

      {/* MAIN CONTENT GRID: CATEGORY TREE LEFT + FILES GRID RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT COLUMN: EXPANDABLE CATEGORIES TREE */}
        <div className="p-5 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-poppins font-bold text-white text-sm flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-[#E5C158]" />
              <span>Knowledge Categories</span>
            </h3>

            <button
              onClick={() => {
                const catName = prompt('Enter new custom knowledge category name:');
                if (catName) {
                  setCategories([...categories, { id: `cat-${Date.now()}`, name: catName, count: 0 }]);
                  if (onShowToast) onShowToast(`Created category "${catName}"`);
                }
              }}
              className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300"
              title="Add Custom Category"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                  selectedCategory === cat.name
                    ? 'bg-[#E5C158] text-black font-bold shadow-md'
                    : 'text-neutral-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Folder className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{cat.name}</span>
                </div>
                <span className="text-[10px] font-mono opacity-80">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: SEARCH + KNOWLEDGE FILES CARDS */}
        <div className="lg:col-span-3 space-y-4">
          {/* SEARCH BAR */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search documents by file name, summary, or tag (#APA7, #SOP, #Rates)..."
              className="w-full bg-[#0D0D12] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          {/* FILES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocuments.map(doc => (
              <div
                key={doc.id}
                className="p-5 rounded-3xl bg-[#0D0D12] border border-white/10 hover:border-[#E5C158]/50 transition-all shadow-xl space-y-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <FileText className="w-5 h-5 text-[#E5C158] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-bold text-sm group-hover:text-[#E5C158] transition-colors block">
                        {doc.fileName}
                      </strong>
                      <span className="text-[10px] font-mono text-neutral-400">{doc.category} • {doc.sizeMb} MB</span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-bold border border-emerald-500/30">
                    {doc.status}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                  {doc.summary}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-1">
                  {doc.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-neutral-400 font-mono text-[9px]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>RAG Chunking: <strong className="text-teal-400">{doc.aiIndexedStatus}</strong></span>
                  <span>Used: <strong className="text-white">{doc.lastUsed}</strong></span>
                </div>

                {/* ACTIONS */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Preview Document</span>
                  </button>

                  <button
                    onClick={() => handleDeleteDoc(doc.id)}
                    className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-all cursor-pointer"
                    title="Delete File"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PREVIEW DOCUMENT MODAL */}
      <AnimatePresence>
        {previewDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl p-6 rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#E5C158]" />
                    <span>{previewDoc.fileName}</span>
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">{previewDoc.category} • {previewDoc.aiIndexedStatus}</span>
                </div>

                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="p-3 rounded-2xl bg-black border border-white/10 space-y-1 font-mono text-emerald-400">
                  <strong className="text-white block font-bold mb-1">Extracted Knowledge Preview:</strong>
                  <p className="leading-relaxed text-[11px]">{previewDoc.summary}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                    <span className="text-[10px] font-mono text-neutral-400 block">Uploaded On</span>
                    <strong className="text-white font-bold">{previewDoc.uploadDate}</strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                    <span className="text-[10px] font-mono text-neutral-400 block">File Size</span>
                    <strong className="text-white font-bold">{previewDoc.sizeMb} MB</strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
