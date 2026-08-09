import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Megaphone,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  Calendar,
  Clock,
  Bell,
  AlertTriangle,
  Eye,
  ShieldCheck,
  Tag,
  Users,
  X,
  Save,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Currency } from '../../types';

export type AnnouncementType =
  | 'banner_bar'
  | 'maintenance'
  | 'promo_launch'
  | 'service_launch'
  | 'holiday'
  | 'system_notice'
  | 'client_portal'
  | 'admin_alert';

export interface WebsiteAnnouncement {
  id: string;
  title: string;
  message: string;
  type: AnnouncementType;
  targetAudience: 'all_visitors' | 'clients_only' | 'admins_only';
  priority: 'urgent' | 'high' | 'normal';
  status: 'active' | 'scheduled' | 'expired' | 'draft';
  startDate: string;
  endDate: string;
  actionButtonText?: string;
  actionButtonUrl?: string;
  createdDate: string;
}

interface CMSAnnouncementManagerProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSAnnouncementManager: React.FC<CMSAnnouncementManagerProps> = ({
  currency,
  onShowToast,
}) => {
  const [announcements, setAnnouncements] = useState<WebsiteAnnouncement[]>([
    {
      id: 'ann-1',
      title: '50% Grand Launch Discount Promo Bar',
      message: '🎉 GRAND LAUNCH OFFER: Enjoy 50% OFF across all Presentation, Assignment & Resume services! Discount applied automatically.',
      type: 'promo_launch',
      targetAudience: 'all_visitors',
      priority: 'high',
      status: 'active',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      actionButtonText: 'Claim 50% Discount',
      actionButtonUrl: '#services',
      createdDate: '2026-01-01',
    },
    {
      id: 'ann-2',
      title: 'Express 24-Hour SLA Deadline Guarantee Notice',
      message: '⚡ Need urgent delivery? Our 24-Hour Express SLA is active for pitch decks and academic assignments.',
      type: 'banner_bar',
      targetAudience: 'all_visitors',
      priority: 'urgent',
      status: 'active',
      startDate: '2026-03-01',
      endDate: '2026-12-31',
      actionButtonText: 'Order Express SLA',
      actionButtonUrl: '#calculator',
      createdDate: '2026-03-01',
    },
    {
      id: 'ann-3',
      title: 'Scheduled System Maintenance Window',
      message: 'Notice: Brief database sync scheduled on Sunday 02:00 AM PKT. Client Portal order placement remains fully operational.',
      type: 'maintenance',
      targetAudience: 'clients_only',
      priority: 'normal',
      status: 'scheduled',
      startDate: '2026-08-01',
      endDate: '2026-08-02',
      actionButtonText: 'View Details',
      actionButtonUrl: '/portal/status',
      createdDate: '2026-07-20',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnn, setEditingAnn] = useState<WebsiteAnnouncement | null>(null);

  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (ann?: WebsiteAnnouncement) => {
    setEditingAnn(
      ann || {
        id: `ann-${Date.now()}`,
        title: '',
        message: '',
        type: 'banner_bar',
        targetAudience: 'all_visitors',
        priority: 'high',
        status: 'draft',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '2026-12-31',
        actionButtonText: 'Learn More',
        actionButtonUrl: '#',
        createdDate: new Date().toISOString().split('T')[0],
      }
    );
    setIsModalOpen(true);
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnn || !editingAnn.title) return;

    const exists = announcements.some((a) => a.id === editingAnn.id);
    if (exists) {
      setAnnouncements((prev) => prev.map((a) => (a.id === editingAnn.id ? editingAnn : a)));
      if (onShowToast) onShowToast(`Updated announcement "${editingAnn.title}"`);
    } else {
      setAnnouncements((prev) => [editingAnn, ...prev]);
      if (onShowToast) onShowToast(`Created announcement "${editingAnn.title}"`);
    }
    setIsModalOpen(false);
  };

  const handleDeleteAnnouncement = (id: string, title: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    if (onShowToast) onShowToast(`Deleted announcement "${title}"`);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold border border-amber-500/30 uppercase">
                ANNOUNCEMENT & NOTIFICATION MANAGER
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <Bell className="w-3 h-3 text-[#28C76F]" />
                <span>DYNAMIC BROADCAST ACTIVE</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Global Homepage Banners, Promo Alerts & System Notices
            </h3>
            <p className="text-xs text-neutral-400">
              Manage top-bar promos, maintenance alerts, portal notifications, holiday greetings, and visibility rules.
            </p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Announcement</span>
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
              placeholder="Search announcements by title, type, or message content..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>
        </div>
      </div>

      {/* ANNOUNCEMENT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAnnouncements.map((ann) => (
          <div
            key={ann.id}
            className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12] hover:border-[#E5C158]/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[#E5C158] font-mono text-[10px] uppercase font-bold">
                  {ann.type.replace('_', ' ')}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase border ${
                    ann.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }`}
                >
                  {ann.status}
                </span>
              </div>

              <strong className="text-white text-base font-bold block leading-snug">
                {ann.title}
              </strong>

              <p className="text-xs text-neutral-300 font-sans p-3 rounded-2xl bg-white/[0.02] border border-white/5 leading-relaxed">
                {ann.message}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400 pt-1">
                <div>
                  <span className="text-neutral-500 block uppercase">Audience</span>
                  <strong className="text-white">{ann.targetAudience.replace('_', ' ')}</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase">Priority</span>
                  <strong className="text-amber-400 uppercase">{ann.priority}</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>Valid: <strong className="text-white">{ann.startDate} → {ann.endDate}</strong></span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenModal(ann)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-[#E5C158]/20 text-neutral-300 hover:text-[#E5C158] transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteAnnouncement(ann.id, ann.title)}
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
        {isModalOpen && editingAnn && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <Megaphone className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    Announcement Broadcast Configurator
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAnnouncement} className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Announcement Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAnn.title}
                    onChange={(e) => setEditingAnn({ ...editingAnn, title: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Broadcast Message Body
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingAnn.message}
                    onChange={(e) => setEditingAnn({ ...editingAnn, message: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Announcement Type
                    </label>
                    <select
                      value={editingAnn.type}
                      onChange={(e) => setEditingAnn({ ...editingAnn, type: e.target.value as any })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    >
                      <option value="banner_bar" className="bg-black">Top Header Promo Bar</option>
                      <option value="promo_launch" className="bg-black">50% Grand Launch Promo</option>
                      <option value="maintenance" className="bg-black">Maintenance Alert</option>
                      <option value="service_launch" className="bg-black">New Service Launch</option>
                      <option value="holiday" className="bg-black">Holiday Message</option>
                      <option value="client_portal" className="bg-black">Client Portal Alert</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Target Audience
                    </label>
                    <select
                      value={editingAnn.targetAudience}
                      onChange={(e) => setEditingAnn({ ...editingAnn, targetAudience: e.target.value as any })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    >
                      <option value="all_visitors" className="bg-black">All Website Visitors</option>
                      <option value="clients_only" className="bg-black">LoggedIn Clients Only</option>
                      <option value="admins_only" className="bg-black">Admins Only</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={editingAnn.startDate}
                      onChange={(e) => setEditingAnn({ ...editingAnn, startDate: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={editingAnn.endDate}
                      onChange={(e) => setEditingAnn({ ...editingAnn, endDate: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-neutral-300 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold shadow-lg cursor-pointer"
                  >
                    Publish Announcement
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
