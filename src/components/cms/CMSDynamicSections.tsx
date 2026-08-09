import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Users,
  CheckCircle2,
  Edit3,
  Plus,
  Trash2,
  Sparkles,
  Save,
  Globe,
  Sliders,
  TrendingUp,
  Image as ImageIcon,
  Star,
  Check,
  X
} from 'lucide-react';
import { Currency } from '../../types';

export interface DynamicSectionItem {
  id: string;
  sectionType: 'stat' | 'award' | 'client_logo' | 'certification' | 'highlight';
  title: string;
  subtitle: string;
  iconName?: string;
  order: number;
  isActive: boolean;
}

interface CMSDynamicSectionsProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSDynamicSections: React.FC<CMSDynamicSectionsProps> = ({
  currency,
  onShowToast,
}) => {
  // Dynamic Homepage Items State
  const [items, setItems] = useState<DynamicSectionItem[]>([
    {
      id: 'sec-1',
      sectionType: 'stat',
      title: '10,000+ Slides & Decks Designed',
      subtitle: 'Delivered to executives, founders & students across UAE, UK, USA, and Pakistan.',
      order: 1,
      isActive: true,
    },
    {
      id: 'sec-2',
      sectionType: 'stat',
      title: '99.8% On-Time Delivery Rate',
      subtitle: 'Backing express 24-hour SLA deadlines with guaranteed satisfaction.',
      order: 2,
      isActive: true,
    },
    {
      id: 'sec-3',
      sectionType: 'award',
      title: 'Top Digital Growth Agency 2026',
      subtitle: 'Recognized for high-impact pitch decks and academic assignment engineering.',
      order: 3,
      isActive: true,
    },
    {
      id: 'sec-4',
      sectionType: 'certification',
      title: 'ATS Resume Engineering Certified',
      subtitle: 'Verified compatibility with Workday, Taleo, and Greenhouse recruitment parsers.',
      order: 4,
      isActive: true,
    },
    {
      id: 'sec-5',
      sectionType: 'highlight',
      title: '50% Grand Launch Discount Campaign',
      subtitle: 'Automatic price reductions applied across all order calculators.',
      order: 5,
      isActive: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DynamicSectionItem | null>(null);

  const handleOpenModal = (item?: DynamicSectionItem) => {
    setEditingItem(
      item || {
        id: `sec-${Date.now()}`,
        sectionType: 'stat',
        title: '',
        subtitle: '',
        order: items.length + 1,
        isActive: true,
      }
    );
    setIsModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title) return;

    const exists = items.some((i) => i.id === editingItem.id);
    if (exists) {
      setItems((prev) => prev.map((i) => (i.id === editingItem.id ? editingItem : i)));
      if (onShowToast) onShowToast(`Updated homepage item "${editingItem.title}"`);
    } else {
      setItems((prev) => [...prev, editingItem]);
      if (onShowToast) onShowToast(`Added homepage item "${editingItem.title}"`);
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: string, title: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (onShowToast) onShowToast(`Deleted item "${title}"`);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 font-mono text-[10px] font-bold border border-yellow-500/30 uppercase">
                HOMEPAGE DYNAMIC PROOF & STATS
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30">
                LIVE COMPONENT CONTROL
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Dynamic Homepage Proof, Statistics & Trust Badges
            </h3>
            <p className="text-xs text-neutral-400">
              Manage live statistics, agency awards, certification badges, client milestones, and seasonal campaign highlights.
            </p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Proof Element</span>
          </button>
        </div>
      </div>

      {/* ITEMS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-3xl border border-white/10 p-5 space-y-3 bg-[#0D0D12] hover:border-[#E5C158]/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[#E5C158] font-mono text-[10px] uppercase font-bold">
                  {item.sectionType}
                </span>
                <span className="text-neutral-400 font-mono text-[10px]">
                  Order #{item.order}
                </span>
              </div>

              <strong className="text-white text-base font-bold block">
                {item.title}
              </strong>

              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                {item.subtitle}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span className="text-emerald-400 font-bold uppercase">Active Live</span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-[#E5C158]/20 text-neutral-300 hover:text-[#E5C158] transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id, item.title)}
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
        {isModalOpen && editingItem && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <Award className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    Edit Proof Element
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveItem} className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Element Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10,000+ Decks Delivered"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Subtitle / Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingItem.subtitle}
                    onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Proof Type
                  </label>
                  <select
                    value={editingItem.sectionType}
                    onChange={(e) => setEditingItem({ ...editingItem, sectionType: e.target.value as any })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  >
                    <option value="stat" className="bg-black">Key Metric Statistic</option>
                    <option value="award" className="bg-black">Industry Award</option>
                    <option value="certification" className="bg-black">Certification Badge</option>
                    <option value="highlight" className="bg-black">Campaign Highlight</option>
                  </select>
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
                    Save Element
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
