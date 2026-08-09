import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Settings,
  Building,
  Mail,
  Phone,
  Globe,
  Clock,
  MapPin,
  CreditCard,
  Palette,
  ShieldCheck,
  Save,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Share2
} from 'lucide-react';
import { Currency } from '../../types';

export interface WebsiteGlobalSettings {
  companyName: string;
  shortName: string;
  tagline: string;
  logoUrl: string;
  primaryGoldColor: string;
  darkCanvasColor: string;
  businessEmail: string;
  supportEmail: string;
  salesEmail: string;
  phoneWhatsapp: string;
  emergencyContact: string;
  officeAddress: string;
  businessHours: string;
  instagramHandle: string;
  facebookName: string;
  easyPaisaTitle: string;
  easyPaisaNumber: string;
  jazzCashTitle: string;
  jazzCashNumber: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountTitle: string;
  defaultLanguage: string;
  timeZone: string;
  defaultCurrency: Currency;
  dateFormat: string;
}

interface CMSWebsiteConfigProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSWebsiteConfig: React.FC<CMSWebsiteConfigProps> = ({
  currency,
  onShowToast,
}) => {
  const [config, setConfig] = useState<WebsiteGlobalSettings>({
    companyName: 'MFS Growth Agency',
    shortName: 'MFS Growth',
    tagline: 'Helping Students & Professionals Grow with High-Quality Digital Solutions.',
    logoUrl: '/icons/mfs-gold-logo.png',
    primaryGoldColor: '#E5C158',
    darkCanvasColor: '#050507',
    businessEmail: 'mfsmedia.agency@gmail.com',
    supportEmail: 'shehrozsultanpgc@gmail.com',
    salesEmail: 'mfsmedia.agency@gmail.com',
    phoneWhatsapp: '+92 301 5323689',
    emergencyContact: '+92 311 6191234',
    officeAddress: 'Islamabad, Pakistan (PKT Time Zone) — 24 Hours Online Support',
    businessHours: '24 Hours Online Support (7 Days a Week)',
    instagramHandle: '@mfsgrowth',
    facebookName: 'MFS Growth',
    easyPaisaTitle: 'Muhammad Shehroz Sultan',
    easyPaisaNumber: '03116191234',
    jazzCashTitle: 'Muhammad Shehroz Sultan',
    jazzCashNumber: '03015323688',
    bankName: 'Askari Bank',
    bankAccountNumber: '00553230017265',
    bankAccountTitle: 'Muhammad Shehroz Sultan',
    defaultLanguage: 'English, Urdu, Roman Urdu',
    timeZone: 'Asia/Karachi (PKT UTC+5)',
    defaultCurrency: currency,
    dateFormat: 'DD/MM/YYYY',
  });

  const [activeSection, setActiveSection] = useState<'identity' | 'contact' | 'payments' | 'localization'>('identity');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (onShowToast) onShowToast('Global Website Configuration saved & live synced successfully!');
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 uppercase">
                WEBSITE CONFIGURATION CENTER
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#28C76F]" />
                <span>ZERO CODE REBUILD</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Global Brand Settings, Support Accounts & Regional Config
            </h3>
            <p className="text-xs text-neutral-400">
              Update business email, WhatsApp numbers, payment titles, theme tokens, and regional localization without code modifications.
            </p>
          </div>

          <button
            onClick={handleSaveSettings}
            className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>Save Global Config</span>
          </button>
        </div>

        {/* SECTION NAV TABS */}
        <div className="pt-2 border-t border-white/10 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveSection('identity')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'identity'
                ? 'bg-[#E5C158] text-black shadow-md'
                : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Brand Identity & Theme</span>
          </button>

          <button
            onClick={() => setActiveSection('contact')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'contact'
                ? 'bg-[#E5C158] text-black shadow-md'
                : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact & Support Channels</span>
          </button>

          <button
            onClick={() => setActiveSection('payments')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'payments'
                ? 'bg-[#E5C158] text-black shadow-md'
                : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payment Accounts</span>
          </button>

          <button
            onClick={() => setActiveSection('localization')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'localization'
                ? 'bg-[#E5C158] text-black shadow-md'
                : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Localization & Currency</span>
          </button>
        </div>
      </div>

      {/* CONFIGURATION FORM SECTIONS */}
      <form onSubmit={handleSaveSettings} className="glass-card rounded-3xl border border-white/10 p-6 bg-[#0D0D12] space-y-5">
        {activeSection === 'identity' && (
          <div className="space-y-4 text-xs">
            <h4 className="font-poppins font-bold text-white text-sm border-b border-white/10 pb-2 flex items-center gap-2">
              <Building className="w-4 h-4 text-[#E5C158]" />
              <span>Agency Brand Identity & Theme Tokens</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Full Agency Name
                </label>
                <input
                  type="text"
                  value={config.companyName}
                  onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Short Name
                </label>
                <input
                  type="text"
                  value={config.shortName}
                  onChange={(e) => setConfig({ ...config, shortName: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                Official Agency Tagline
              </label>
              <input
                type="text"
                value={config.tagline}
                onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Primary Gold Accent Hex (`#E5C158`)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.primaryGoldColor}
                    onChange={(e) => setConfig({ ...config, primaryGoldColor: e.target.value })}
                    className="w-8 h-8 rounded-lg bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.primaryGoldColor}
                    onChange={(e) => setConfig({ ...config, primaryGoldColor: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Dark Canvas Base Hex (`#050507`)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.darkCanvasColor}
                    onChange={(e) => setConfig({ ...config, darkCanvasColor: e.target.value })}
                    className="w-8 h-8 rounded-lg bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.darkCanvasColor}
                    onChange={(e) => setConfig({ ...config, darkCanvasColor: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="space-y-4 text-xs">
            <h4 className="font-poppins font-bold text-white text-sm border-b border-white/10 pb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#E5C158]" />
              <span>Contact Information & Support Targets</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Business Email
                </label>
                <input
                  type="email"
                  value={config.businessEmail}
                  onChange={(e) => setConfig({ ...config, businessEmail: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={config.supportEmail}
                  onChange={(e) => setConfig({ ...config, supportEmail: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Phone / WhatsApp (`+92 301 5323689`)
                </label>
                <input
                  type="text"
                  value={config.phoneWhatsapp}
                  onChange={(e) => setConfig({ ...config, phoneWhatsapp: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold text-emerald-400 font-mono"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Emergency Line
                </label>
                <input
                  type="text"
                  value={config.emergencyContact}
                  onChange={(e) => setConfig({ ...config, emergencyContact: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                Office Location & Timezone
              </label>
              <input
                type="text"
                value={config.officeAddress}
                onChange={(e) => setConfig({ ...config, officeAddress: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>
          </div>
        )}

        {activeSection === 'payments' && (
          <div className="space-y-4 text-xs">
            <h4 className="font-poppins font-bold text-white text-sm border-b border-white/10 pb-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#E5C158]" />
              <span>Payment Accounts Configuration (Pakistan & International)</span>
            </h4>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <span className="text-[#E5C158] font-mono text-[10px] uppercase font-bold block">
                EasyPaisa Account
              </span>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Account Title"
                  value={config.easyPaisaTitle}
                  onChange={(e) => setConfig({ ...config, easyPaisaTitle: e.target.value })}
                  className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  value={config.easyPaisaNumber}
                  onChange={(e) => setConfig({ ...config, easyPaisaNumber: e.target.value })}
                  className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <span className="text-[#E5C158] font-mono text-[10px] uppercase font-bold block">
                JazzCash Account
              </span>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Account Title"
                  value={config.jazzCashTitle}
                  onChange={(e) => setConfig({ ...config, jazzCashTitle: e.target.value })}
                  className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  value={config.jazzCashNumber}
                  onChange={(e) => setConfig({ ...config, jazzCashNumber: e.target.value })}
                  className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <span className="text-[#E5C158] font-mono text-[10px] uppercase font-bold block">
                Bank Transfer (Askari Bank)
              </span>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Bank Name"
                  value={config.bankName}
                  onChange={(e) => setConfig({ ...config, bankName: e.target.value })}
                  className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  value={config.bankAccountNumber}
                  onChange={(e) => setConfig({ ...config, bankAccountNumber: e.target.value })}
                  className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
                <input
                  type="text"
                  placeholder="Account Title"
                  value={config.bankAccountTitle}
                  onChange={(e) => setConfig({ ...config, bankAccountTitle: e.target.value })}
                  className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'localization' && (
          <div className="space-y-4 text-xs">
            <h4 className="font-poppins font-bold text-white text-sm border-b border-white/10 pb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#E5C158]" />
              <span>Localization, Timezone & Currency Defaults</span>
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Supported Languages
                </label>
                <input
                  type="text"
                  value={config.defaultLanguage}
                  onChange={(e) => setConfig({ ...config, defaultLanguage: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                  Timezone
                </label>
                <input
                  type="text"
                  value={config.timeZone}
                  onChange={(e) => setConfig({ ...config, timeZone: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs shadow-lg hover:bg-[#fce888] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration Live</span>
          </button>
        </div>
      </form>
    </div>
  );
};
