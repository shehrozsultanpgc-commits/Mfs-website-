import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  Compass,
  Link2,
  Plus,
  Trash2,
  Edit3,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Shield,
  Save,
  CheckCircle2,
  Globe,
  Share2,
  Info,
  Sliders,
  X,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Award,
  Lock
} from 'lucide-react';
import { Currency } from '../../types';

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  iconName?: string;
  isExternal: boolean;
  visibility: 'all' | 'guest' | 'authenticated';
  order: number;
}

interface CMSNavigationFooterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSNavigationFooter: React.FC<CMSNavigationFooterProps> = ({
  currency,
  onShowToast,
}) => {
  // Navigation Menus State
  const [activeMenuType, setActiveMenuType] = useState<
    'header' | 'footer' | 'client_portal' | 'admin'
  >('header');

  const [headerMenu, setHeaderMenu] = useState<MenuItem[]>([
    { id: 'm-1', label: 'Services & Pricing', path: '/services', isExternal: false, visibility: 'all', order: 1 },
    { id: 'm-2', label: 'Our Work', path: '/our-work', isExternal: false, visibility: 'all', order: 2 },
    { id: 'm-3', label: 'Order Now', path: '/order', isExternal: false, visibility: 'all', order: 3 },
    { id: 'm-4', label: 'Client Portal', path: '/portal', isExternal: false, visibility: 'authenticated', order: 4 },
    { id: 'm-5', label: 'Support WhatsApp', path: 'https://wa.me/923015323689', isExternal: true, visibility: 'all', order: 5 },
  ]);

  const [footerMenu, setFooterMenu] = useState<MenuItem[]>([
    { id: 'fm-1', label: 'Presentation Design', path: '/services#presentation', isExternal: false, visibility: 'all', order: 1 },
    { id: 'fm-2', label: 'Assignment Writing', path: '/services#assignment', isExternal: false, visibility: 'all', order: 2 },
    { id: 'fm-3', label: 'ATS Resume Engineering', path: '/services#resume', isExternal: false, visibility: 'all', order: 3 },
    { id: 'fm-4', label: 'Privacy Policy & Terms', path: '/privacy', isExternal: false, visibility: 'all', order: 4 },
  ]);

  // Footer Company Config State
  const [footerConfig, setFooterConfig] = useState({
    companyName: 'MFS Growth Agency',
    tagline: 'Helping Students & Professionals Grow with High-Quality Digital Solutions.',
    businessEmail: 'mfsmedia.agency@gmail.com',
    supportEmail: 'mfsmedia.agency@gmail.com',
    whatsappNumber: '+92 301 5323689',
    locationText: '24/7 Online Support',
    copyrightText: '© 2026 MFS Growth Agency. All Rights Reserved.',
    instagramHandle: '@mfsgrowth',
    facebookHandle: 'MFS Growth',
    easyPaisaAccount: '03116191234 (Muhammad Shehroz Sultan)',
    jazzCashAccount: '03015323688 (Muhammad Shehroz Sultan)',
    bankTransferAccount: 'Askari Bank • 00553230017265 (Muhammad Shehroz Sultan)',
  });

  // Modal State for Adding Navigation Item
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [newItemLabel, setNewItemLabel] = useState('');
  const [newItemPath, setNewItemPath] = useState('');
  const [newItemExternal, setNewItemExternal] = useState(false);

  // Active list reference
  const currentMenu = activeMenuType === 'header' ? headerMenu : footerMenu;
  const setCurrentMenu = activeMenuType === 'header' ? setHeaderMenu : setFooterMenu;

  // Move Item Up / Down
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...currentMenu];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    updated.forEach((item, idx) => (item.order = idx + 1));
    setCurrentMenu(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === currentMenu.length - 1) return;
    const updated = [...currentMenu];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    updated.forEach((item, idx) => (item.order = idx + 1));
    setCurrentMenu(updated);
  };

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemLabel || !newItemPath) return;
    const newItem: MenuItem = {
      id: `m-${Date.now()}`,
      label: newItemLabel,
      path: newItemPath,
      isExternal: newItemExternal,
      visibility: 'all',
      order: currentMenu.length + 1,
    };
    setCurrentMenu([...currentMenu, newItem]);
    setNewItemLabel('');
    setNewItemPath('');
    setNewItemExternal(false);
    setIsAddItemModalOpen(false);
    if (onShowToast) onShowToast(`Added menu item "${newItem.label}"`);
  };

  const handleDeleteItem = (id: string, label: string) => {
    setCurrentMenu(currentMenu.filter((item) => item.id !== id));
    if (onShowToast) onShowToast(`Removed menu item "${label}"`);
  };

  const handleSaveFooter = (e: React.FormEvent) => {
    e.preventDefault();
    if (onShowToast) onShowToast('Footer company details & payment accounts published!');
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-mono text-[10px] font-bold border border-purple-500/30 uppercase">
                NAVIGATION & FOOTER MANAGER
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30">
                STRICT "OUR WORK" NOMENCLATURE
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Visual Navigation Menu & Footer Configurator
            </h3>
            <p className="text-xs text-neutral-400">
              Manage main header links, footer quick links, company contacts, and payment account details displayed to clients.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (onShowToast) onShowToast('Navigation hierarchy & footer rules saved globally!');
              }}
              className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Save All Navigation</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* COLUMN 1: NAVIGATION MENU BUILDER */}
        <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#E5C158]" />
              <h3 className="font-poppins font-bold text-white text-base">
                Menu Item Structure
              </h3>
            </div>

            <button
              onClick={() => setIsAddItemModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#E5C158]" />
              <span>Add Link</span>
            </button>
          </div>

          {/* Menu Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveMenuType('header')}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                activeMenuType === 'header'
                  ? 'bg-[#E5C158] text-black'
                  : 'bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              Header Menu
            </button>
            <button
              onClick={() => setActiveMenuType('footer')}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                activeMenuType === 'footer'
                  ? 'bg-[#E5C158] text-black'
                  : 'bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              Footer Links
            </button>
          </div>

          {/* Draggable/Reorderable Item List */}
          <div className="space-y-2.5">
            {currentMenu.map((item, idx) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-white/10 font-mono text-xs font-bold text-[#E5C158] flex items-center justify-center shrink-0">
                    #{item.order}
                  </span>
                  <div>
                    <strong className="text-white text-xs font-bold block">{item.label}</strong>
                    <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                      <span>{item.path}</span>
                      {item.isExternal && <ExternalLink className="w-3 h-3 text-amber-400" />}
                    </span>
                  </div>
                </div>

                {/* Move Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === currentMenu.length - 1}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id, item.label)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 2: FOOTER & COMPANY CONTACTS EDITOR */}
        <form onSubmit={handleSaveFooter} className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#E5C158]" />
              <h3 className="font-poppins font-bold text-white text-base">
                Footer & Company Identity
              </h3>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs shadow-lg cursor-pointer"
            >
              Update Footer
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                Company Tagline
              </label>
              <input
                type="text"
                value={footerConfig.tagline}
                onChange={(e) => setFooterConfig({ ...footerConfig, tagline: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Business Email
                </label>
                <input
                  type="email"
                  value={footerConfig.businessEmail}
                  onChange={(e) => setFooterConfig({ ...footerConfig, businessEmail: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={footerConfig.supportEmail}
                  onChange={(e) => setFooterConfig({ ...footerConfig, supportEmail: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  WhatsApp Support Phone
                </label>
                <input
                  type="text"
                  value={footerConfig.whatsappNumber}
                  onChange={(e) => setFooterConfig({ ...footerConfig, whatsappNumber: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Location & Timezone
                </label>
                <input
                  type="text"
                  value={footerConfig.locationText}
                  onChange={(e) => setFooterConfig({ ...footerConfig, locationText: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                />
              </div>
            </div>

            {/* PAYMENT ACCOUNTS SHOWN IN FOOTER */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <label className="text-amber-400 font-mono text-[10px] font-bold uppercase block">
                Footer Verified Payment Account Labels
              </label>

              <div className="space-y-2">
                <input
                  type="text"
                  value={footerConfig.easyPaisaAccount}
                  onChange={(e) => setFooterConfig({ ...footerConfig, easyPaisaAccount: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-1.5 text-[11px] text-neutral-300 font-mono"
                />
                <input
                  type="text"
                  value={footerConfig.jazzCashAccount}
                  onChange={(e) => setFooterConfig({ ...footerConfig, jazzCashAccount: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-1.5 text-[11px] text-neutral-300 font-mono"
                />
                <input
                  type="text"
                  value={footerConfig.bankTransferAccount}
                  onChange={(e) => setFooterConfig({ ...footerConfig, bankTransferAccount: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-1.5 text-[11px] text-neutral-300 font-mono"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* ADD MENU ITEM MODAL */}
      <AnimatePresence>
        {isAddItemModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <Plus className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">Add Menu Link</h3>
                </div>
                <button
                  onClick={() => setIsAddItemModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddMenuItem} className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Link Label
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ATS Resume Engineering"
                    value={newItemLabel}
                    onChange={(e) => setNewItemLabel(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Path / URL
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/services#resume"
                    value={newItemPath}
                    onChange={(e) => setNewItemPath(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="extCheck"
                    checked={newItemExternal}
                    onChange={(e) => setNewItemExternal(e.target.checked)}
                    className="rounded bg-white/10 border-white/20 text-[#E5C158]"
                  />
                  <label htmlFor="extCheck" className="text-neutral-300 font-mono text-xs">
                    External Link (Opens in new tab)
                  </label>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddItemModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-neutral-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold shadow-lg"
                  >
                    Add Link
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
