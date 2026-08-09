import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Plus,
  Trash2,
  Copy,
  Edit3,
  Eye,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Grid,
  DollarSign,
  Users,
  MessageSquare,
  HelpCircle,
  Zap,
  Image as ImageIcon,
  Video,
  BarChart3,
  Clock,
  Code,
  Save,
  X,
  CheckCircle2,
  Sliders,
  Move
} from 'lucide-react';
import { Currency } from '../../types';

export interface ContentBlock {
  id: string;
  type:
    | 'hero'
    | 'feature_cards'
    | 'pricing_cards'
    | 'team_section'
    | 'testimonials'
    | 'faq'
    | 'cta_section'
    | 'image_gallery'
    | 'video_block'
    | 'statistics'
    | 'timeline'
    | 'custom_html';
  title: string;
  subtitle: string;
  badgeText?: string;
  enabled: boolean;
  order: number;
  config: Record<string, any>;
}

interface CMSBlockBuilderProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSBlockBuilder: React.FC<CMSBlockBuilderProps> = ({
  currency,
  onShowToast,
}) => {
  // Library of Available Reusable Block Types (12 Types)
  const blockTypes = [
    {
      type: 'hero',
      name: 'Hero Banner',
      icon: Sparkles,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      description: 'High-impact top banner with headline, CTA buttons, and background media.',
    },
    {
      type: 'feature_cards',
      name: 'Feature Cards',
      icon: Grid,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      description: '3 or 4-column responsive grid showcasing key benefits and capabilities.',
    },
    {
      type: 'pricing_cards',
      name: 'Pricing Cards',
      icon: DollarSign,
      color: 'text-[#28C76F] bg-[#28C76F]/10 border-[#28C76F]/30',
      description: 'Tiered pricing cards with features checklist, rate badges & order links.',
    },
    {
      type: 'team_section',
      name: 'Team & Staff',
      icon: Users,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      description: 'Executive profiles, roles, avatars, and professional bios.',
    },
    {
      type: 'testimonials',
      name: 'Testimonials',
      icon: MessageSquare,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      description: 'Client review cards with star ratings and verified customer badges.',
    },
    {
      type: 'faq',
      name: 'FAQ Accordion',
      icon: HelpCircle,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description: 'Expandable question & answer items for common client queries.',
    },
    {
      type: 'cta_section',
      name: 'CTA Banner',
      icon: Zap,
      color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
      description: 'High-conversion banner with urgent offer pill and direct button.',
    },
    {
      type: 'image_gallery',
      name: 'Image Gallery',
      icon: ImageIcon,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      description: 'Responsive grid or lightbox slider for high-res project previews.',
    },
    {
      type: 'video_block',
      name: 'Video Showcase',
      icon: Video,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      description: 'Embedded video player or MP4 loop container with play overlay.',
    },
    {
      type: 'statistics',
      name: 'Statistics Metric',
      icon: BarChart3,
      color: 'text-[#E5C158] bg-[#E5C158]/10 border-[#E5C158]/30',
      description: 'Metric counter cards highlighting project count, SLA, and satisfaction.',
    },
    {
      type: 'timeline',
      name: 'Process Timeline',
      icon: Clock,
      color: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30',
      description: 'Step-by-step workflow timeline (Order -> Draft -> Review -> Release).',
    },
    {
      type: 'custom_html',
      name: 'Custom HTML Embed',
      icon: Code,
      color: 'text-neutral-300 bg-neutral-500/10 border-neutral-500/30',
      description: 'Raw HTML/CSS placeholder container for future widgets or scripts.',
    },
  ] as const;

  // Active Page Canvas Blocks
  const [activeCanvas, setActiveCanvas] = useState<ContentBlock[]>([
    {
      id: 'block-1',
      type: 'hero',
      title: 'Executive Presentation Design & Academic Excellence',
      subtitle: 'Helping Students & Professionals Grow with High-Quality Digital Solutions.',
      badgeText: '50% GRAND LAUNCH OFFER ACTIVE',
      enabled: true,
      order: 1,
      config: { ctaText: 'Order Now', ctaLink: '/order' },
    },
    {
      id: 'block-2',
      type: 'feature_cards',
      title: 'Core Agency Capabilities',
      subtitle: 'Premium services crafted specifically for student and professional success.',
      badgeText: 'WHAT WE DO',
      enabled: true,
      order: 2,
      config: { cols: 4 },
    },
    {
      id: 'block-3',
      type: 'pricing_cards',
      title: 'Transparent Pricing & Instant Calculator',
      subtitle: 'Calculate exact cost in PKR, USD, GBP, EUR, AED with 50% discount applied.',
      badgeText: 'FAIR RATES',
      enabled: true,
      order: 3,
      config: { defaultCurrency: currency },
    },
    {
      id: 'block-4',
      type: 'testimonials',
      title: 'Client Trust & Verified Feedback',
      subtitle: 'Rated 4.98/5 by students and corporate clients worldwide.',
      badgeText: '5-STAR REVIEWS',
      enabled: true,
      order: 4,
      config: { showVerifiedBadge: true },
    },
  ]);

  // Selected Block for Editing
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Add Block Function
  const handleAddBlock = (type: ContentBlock['type']) => {
    const meta = blockTypes.find((b) => b.type === type);
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      title: `${meta?.name || 'New Block'} Heading`,
      subtitle: `Description for ${meta?.name || 'this block'}. Customize content in the editor.`,
      badgeText: 'NEW CONTENT BLOCK',
      enabled: true,
      order: activeCanvas.length + 1,
      config: {},
    };
    setActiveCanvas((prev) => [...prev, newBlock]);
    if (onShowToast) onShowToast(`Added "${meta?.name}" to Active Page Canvas!`);
  };

  // Move Block Up / Down
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...activeCanvas];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    updated.forEach((b, idx) => {
      b.order = idx + 1;
    });
    setActiveCanvas(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === activeCanvas.length - 1) return;
    const updated = [...activeCanvas];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    updated.forEach((b, idx) => {
      b.order = idx + 1;
    });
    setActiveCanvas(updated);
  };

  const handleDuplicateBlock = (block: ContentBlock) => {
    const duplicated: ContentBlock = {
      ...block,
      id: `block-${Date.now()}`,
      title: `${block.title} (Copy)`,
      order: activeCanvas.length + 1,
    };
    setActiveCanvas((prev) => [...prev, duplicated]);
    if (onShowToast) onShowToast(`Duplicated block: "${block.title}"`);
  };

  const handleDeleteBlock = (id: string) => {
    setActiveCanvas((prev) => prev.filter((b) => b.id !== id));
    if (onShowToast) onShowToast('Removed block from canvas');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT 1 COL: REUSABLE BLOCK LIBRARY */}
      <div className="space-y-4">
        <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-3 bg-[#0D0D12]">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Layers className="w-5 h-5 text-[#E5C158]" />
            <h3 className="font-poppins font-bold text-white text-base">Content Block Library</h3>
          </div>
          <p className="text-xs text-neutral-400">
            Click any of the 12 reusable blocks below to insert it directly into your page layout canvas.
          </p>

          <div className="grid grid-cols-1 gap-2.5 max-h-[600px] overflow-y-auto pr-1">
            {blockTypes.map((bt) => {
              const IconComp = bt.icon;
              return (
                <button
                  key={bt.type}
                  onClick={() => handleAddBlock(bt.type as ContentBlock['type'])}
                  className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#E5C158]/50 transition-all text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl border ${bt.color} shrink-0`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-white text-xs font-bold block group-hover:text-[#E5C158] transition-colors">
                        {bt.name}
                      </strong>
                      <p className="text-[10px] text-neutral-400 line-clamp-1">{bt.description}</p>
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-[#E5C158] group-hover:text-black text-neutral-400 transition-all">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT 2 COLS: ACTIVE PAGE CANVAS & BLOCK EDITOR */}
      <div className="lg:col-span-2 space-y-4">
        <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="font-poppins font-bold text-white text-base flex items-center gap-2">
                <span>Active Page Block Canvas</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] border border-[#E5C158]/30">
                  {activeCanvas.length} Blocks Active
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Arrange, edit, and reorder structural blocks building your page dynamically.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Canvas Preview</span>
              </button>

              <button
                onClick={() => {
                  if (onShowToast) onShowToast('Page Layout Canvas saved & published!');
                }}
                className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Canvas</span>
              </button>
            </div>
          </div>

          {/* Canvas Block Items */}
          <div className="space-y-3">
            {activeCanvas.map((block, idx) => {
              const meta = blockTypes.find((b) => b.type === block.type);
              const IconComp = meta?.icon || Layers;
              return (
                <div
                  key={block.id}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#E5C158]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-white/10 font-mono text-xs font-bold text-[#E5C158] flex items-center justify-center shrink-0">
                      #{block.order}
                    </span>
                    <div className={`p-2 rounded-xl border ${meta?.color || 'text-white'}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm font-bold">{block.title}</strong>
                        {block.badgeText && (
                          <span className="px-2 py-0.5 rounded bg-white/10 text-[#E5C158] font-mono text-[9px] font-bold">
                            {block.badgeText}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-1">{block.subtitle}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Edit Block Config */}
                    <button
                      onClick={() => setEditingBlock(block)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-[#E5C158]/20 text-neutral-300 hover:text-[#E5C158] transition-colors cursor-pointer"
                      title="Edit Block Content"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Duplicate */}
                    <button
                      onClick={() => handleDuplicateBlock(block)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-blue-500/20 text-neutral-300 hover:text-blue-400 transition-colors cursor-pointer"
                      title="Duplicate Block"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {/* Move Up */}
                    <button
                      onClick={() => handleMoveUp(idx)}
                      disabled={idx === 0}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    {/* Move Down */}
                    <button
                      onClick={() => handleMoveDown(idx)}
                      disabled={idx === activeCanvas.length - 1}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteBlock(block.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete Block"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {activeCanvas.length === 0 && (
              <div className="py-12 text-center text-neutral-400 space-y-2 border border-dashed border-white/10 rounded-2xl p-6">
                <Layers className="w-8 h-8 mx-auto text-neutral-600" />
                <p className="font-poppins text-sm text-white font-bold">Canvas is Empty</p>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Select a block from the Content Block Library on the left to start building your page layout.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EDIT BLOCK MODAL */}
      <AnimatePresence>
        {editingBlock && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <Edit3 className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    Edit Content Block: {editingBlock.type.toUpperCase()}
                  </h3>
                </div>
                <button
                  onClick={() => setEditingBlock(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    Pill Badge Text
                  </label>
                  <input
                    type="text"
                    value={editingBlock.badgeText || ''}
                    onChange={(e) =>
                      setEditingBlock({ ...editingBlock, badgeText: e.target.value })
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    Main Block Heading Title
                  </label>
                  <input
                    type="text"
                    value={editingBlock.title}
                    onChange={(e) =>
                      setEditingBlock({ ...editingBlock, title: e.target.value })
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    Subtitle & Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={editingBlock.subtitle}
                    onChange={(e) =>
                      setEditingBlock({ ...editingBlock, subtitle: e.target.value })
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setEditingBlock(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-neutral-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setActiveCanvas((prev) =>
                      prev.map((b) => (b.id === editingBlock.id ? editingBlock : b))
                    );
                    setEditingBlock(null);
                    if (onShowToast) onShowToast('Updated block properties!');
                  }}
                  className="px-5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold hover:bg-[#fce888] transition-colors shadow-lg"
                >
                  Save Block
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CANVAS PREVIEW MODAL */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl h-[85vh] bg-[#0A0A0E] border border-white/10 rounded-3xl p-6 flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#E5C158]" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    Active Canvas Live Flow Preview
                  </h3>
                </div>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto py-6 space-y-6">
                {activeCanvas.map((block) => (
                  <div
                    key={block.id}
                    className="p-6 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-3 text-center"
                  >
                    {block.badgeText && (
                      <span className="px-3 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 uppercase">
                        {block.badgeText}
                      </span>
                    )}
                    <h2 className="font-poppins font-black text-xl text-white">
                      {block.title}
                    </h2>
                    <p className="text-xs text-neutral-300 max-w-md mx-auto">
                      {block.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
