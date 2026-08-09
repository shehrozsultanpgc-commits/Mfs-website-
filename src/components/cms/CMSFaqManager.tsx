import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  Plus,
  Search,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit3,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Save,
  CheckCircle2,
  Tag,
  Eye,
  Sliders,
  Download,
  Upload,
  X,
  Layers,
  Wand2
} from 'lucide-react';
import { Currency } from '../../types';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  priority: number;
  visibility: 'public' | 'client_portal' | 'hidden';
  relatedService: string;
  keywords: string[];
}

interface CMSFaqManagerProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSFaqManager: React.FC<CMSFaqManagerProps> = ({
  currency,
  onShowToast,
}) => {
  // FAQs State
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: 'faq-1',
      question: 'How long does a standard presentation or assignment take to complete?',
      answer: 'Standard delivery is completed within 3 to 5 business days. Express 24-hour, Priority 48-hour, and Same-Day options are available in our interactive pricing calculator with urgent multipliers.',
      category: 'General & Speed',
      priority: 1,
      visibility: 'public',
      relatedService: 'Presentation Design',
      keywords: ['deadline', 'speed', 'delivery', 'express', '24 hours'],
    },
    {
      id: 'faq-2',
      question: 'Is the 50% Grand Launch discount applicable to all services?',
      answer: 'Yes! MFS Growth Agency is celebrating our international launch with a flat 50% discount across Presentation Design, Assignment Writing, ATS Resume Engineering, and Corporate Document Formatting.',
      category: 'Pricing & Discounts',
      priority: 2,
      visibility: 'public',
      relatedService: 'All Services',
      keywords: ['discount', '50% off', 'pricing', 'promo', 'grand launch'],
    },
    {
      id: 'faq-3',
      question: 'Which payment methods are accepted for clients in Pakistan and Internationally?',
      answer: 'We accept local EasyPaisa (03116191234), JazzCash (03015323688), and direct Bank Transfer (Askari Bank). For international orders, payments can be settled via international bank wire or PayPal currency equivalents.',
      category: 'Payment Accounts',
      priority: 3,
      visibility: 'public',
      relatedService: 'Payment Gateway',
      keywords: ['easypaisa', 'jazzcash', 'bank transfer', 'payment', 'paypal'],
    },
    {
      id: 'faq-4',
      question: 'Are sample work files under "Our Work" downloadable?',
      answer: 'Samples shown under "Our Work" are for secured preview only to protect client intellectual property and privacy. Watermarked visual previews are interactive, but raw downloads are strictly restricted.',
      category: 'Our Work & Protection',
      priority: 4,
      visibility: 'public',
      relatedService: 'Our Work Portfolio',
      keywords: ['download', 'samples', 'preview', 'watermark', 'privacy'],
    },
  ]);

  // Expanded FAQs State
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  // Filtered FAQs
  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || f.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenModal = (item?: FAQItem) => {
    setEditingFaq(
      item || {
        id: `faq-${Date.now()}`,
        question: '',
        answer: '',
        category: 'General & Speed',
        priority: faqs.length + 1,
        visibility: 'public',
        relatedService: 'Presentation Design',
        keywords: ['mfs', 'growth', 'faq'],
      }
    );
    setIsModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq || !editingFaq.question) return;

    const exists = faqs.some((f) => f.id === editingFaq.id);
    if (exists) {
      setFaqs((prev) => prev.map((f) => (f.id === editingFaq.id ? editingFaq : f)));
      if (onShowToast) onShowToast(`Updated FAQ "${editingFaq.question}"`);
    } else {
      setFaqs((prev) => [...prev, editingFaq]);
      if (onShowToast) onShowToast(`Created FAQ "${editingFaq.question}"`);
    }
    setIsModalOpen(false);
  };

  const handleDeleteFaq = (id: string, q: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    if (onShowToast) onShowToast(`Deleted FAQ "${q}"`);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...faqs];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    updated.forEach((item, idx) => (item.priority = idx + 1));
    setFaqs(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === faqs.length - 1) return;
    const updated = [...faqs];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    updated.forEach((item, idx) => (item.priority = idx + 1));
    setFaqs(updated);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30 uppercase">
                FAQ DYNAMIC CMS
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30">
                SEO SCHEMA READY
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Frequently Asked Questions & Answers
            </h3>
            <p className="text-xs text-neutral-400">
              Manage client questions, payment accounts clarification, service turnarounds, and priority reordering dynamically.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (onShowToast) onShowToast('Exported FAQ schema JSON-LD for Search Engine indexing!');
              }}
              className="px-4 py-2.5 rounded-2xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              <Download className="w-4 h-4 text-[#E5C158]" />
              <span>Export Schema</span>
            </button>

            <button
              onClick={() => handleOpenModal()}
              className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add New FAQ</span>
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="pt-2 border-t border-white/10 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs by question, answer, or keywords..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>
        </div>
      </div>

      {/* FAQ ACCORDION LIST */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isExpanded = expandedId === faq.id;
          return (
            <div
              key={faq.id}
              className="glass-card rounded-3xl border border-white/10 overflow-hidden bg-[#0D0D12] transition-all"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-white/10 text-[#E5C158] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    #{faq.priority}
                  </span>
                  <div>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#E5C158] font-mono text-[9px] uppercase font-bold mr-2">
                      {faq.category}
                    </span>
                    <strong className="text-white text-sm font-bold">{faq.question}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === filteredFaqs.length - 1}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenModal(faq)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-[#E5C158]/20 text-neutral-300 hover:text-[#E5C158] transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(faq.id, faq.question)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="p-1.5 rounded-lg bg-white/5 text-neutral-300 cursor-pointer ml-1"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* EXPANDED ANSWER BODY */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 pt-1 border-t border-white/5 space-y-3"
                  >
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                      {faq.answer}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-neutral-400">
                      <span>Related Service: <strong className="text-white">{faq.relatedService}</strong></span>
                      <div className="flex items-center gap-1.5">
                        <span>Keywords:</span>
                        {faq.keywords.map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {isModalOpen && editingFaq && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <HelpCircle className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    FAQ Item Configurator
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveFaq} className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    required
                    value={editingFaq.question}
                    onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Answer Body
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editingFaq.answer}
                    onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editingFaq.category}
                      onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Related Service
                    </label>
                    <input
                      type="text"
                      value={editingFaq.relatedService}
                      onChange={(e) => setEditingFaq({ ...editingFaq, relatedService: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
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
                    Save FAQ
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
