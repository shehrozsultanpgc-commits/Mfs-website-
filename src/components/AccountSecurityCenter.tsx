import React, { useState } from 'react';
import { Currency } from '../types';
import {
  User,
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  Globe,
  Clock,
  Key,
  CheckCircle2,
  Smartphone,
  Laptop,
  AlertTriangle,
  Download,
  Trash2,
  Edit3,
  Search,
  Bell,
  Eye,
  EyeOff,
  Check,
  X,
  ExternalLink,
  Shield,
  Activity,
  LogOut,
  Sparkles,
  HelpCircle,
  Copy,
  Info
} from 'lucide-react';

interface AccountSecurityCenterProps {
  currency: Currency;
  customerName?: string;
  customerEmail?: string;
  clientId?: string;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (
    page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard',
    targetSection?: string
  ) => void;
  setActiveTab?: (tab: string) => void;
}

export const AccountSecurityCenter: React.FC<AccountSecurityCenterProps> = ({
  currency,
  customerName = 'Muhammad Shehroz Sultan',
  customerEmail = 'shehrozsultanpgc@gmail.com',
  clientId = 'CLI-MFS-98421',
  onShowToast,
  onNavigatePage,
  setActiveTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'security' | 'google' | 'privacy' | 'activity'>('profile');
  const [searchQuery, setSearchQuery] = useState('');

  // Editable Profile State
  const [fullName, setFullName] = useState(customerName);
  const [email, setEmail] = useState(customerEmail);
  const [phone, setPhone] = useState('+92 301 5323689');
  const [country, setCountry] = useState('Pakistan (Islamabad)');
  const [language, setLanguage] = useState('English (US) / Roman Urdu');
  const [timezone, setTimezone] = useState('Asia/Karachi (PKT - UTC+5)');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Google SSO State
  const [isGoogleConnected, setIsGoogleConnected] = useState(true);

  // Notification Preferences
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [whatsappNotifs, setWhatsappNotifs] = useState(true);
  const [projectUpdatesNotifs, setProjectUpdatesNotifs] = useState(true);
  const [marketingNotifs, setMarketingNotifs] = useState(false);

  // Modals
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    if (onShowToast) onShowToast(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    if (onShowToast) onShowToast('Profile information updated successfully!');
  };

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* TOP HEADER BANNER */}
      <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(229,193,88,0.12)]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center shrink-0">
            <User className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#28C76F]" />
                <span>ACCOUNT & SECURITY CENTER • VERIFIED IDENTITY</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                {clientId}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-poppins font-bold text-white tracking-tight">
              Profile, Account & Security
            </h1>
            <p className="text-xs text-neutral-300">
              Manage personal credentials, Google SSO connections, notification channels, and active security sessions.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)] flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4 fill-black" />
            <span>{isEditingProfile ? 'Cancel Edit' : 'Edit Profile Details'}</span>
          </button>

          <button
            onClick={() => setShowRoadmapModal(true)}
            className="px-3 py-2.5 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/40 text-[#28C76F] font-bold text-xs hover:bg-[#28C76F]/20 transition-all cursor-pointer flex items-center gap-1"
          >
            <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
            <span>Phase 9 Complete</span>
          </button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Security Score', value: '98% Excellent', sub: '2FA & SSO Active', icon: ShieldCheck, color: 'text-[#28C76F]' },
          { label: 'Account Status', value: 'Verified Client', sub: 'Identity Verified', icon: CheckCircle2, color: 'text-[#E5C158]' },
          { label: 'Google Connection', value: isGoogleConnected ? 'Connected' : 'Disconnected', sub: isGoogleConnected ? customerEmail : 'Not linked', icon: Globe, color: 'text-blue-400' },
          { label: 'Active Devices', value: '2 Devices', sub: 'Chrome Mac / Android', icon: Laptop, color: 'text-purple-400' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 bg-black/60 relative overflow-hidden">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 font-medium text-[11px]">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-xl sm:text-2xl font-poppins font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <span className="text-[10px] text-neutral-400 font-mono block">{stat.sub}</span>
            </div>
          );
        })}
      </div>

      {/* SUBTAB CONTROL BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-4 bg-black/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl p-1 overflow-x-auto scrollbar-none">
            {[
              { id: 'profile', label: 'Personal Information', icon: User },
              { id: 'security', label: 'Security & Auth', icon: Lock },
              { id: 'google', label: 'Google Account', icon: Globe },
              { id: 'privacy', label: 'Notifications & Privacy', icon: Bell },
              { id: 'activity', label: 'Security Activity Log', icon: Activity },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeSubTab === tab.id
                      ? 'bg-[#E5C158] text-black shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search security settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
          </div>

        </div>
      </div>

      {/* SUBTAB 1: PERSONAL INFORMATION */}
      {activeSubTab === 'profile' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 bg-black/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-2xl flex items-center justify-center shrink-0 border-2 border-white/20 shadow-md">
                {fullName.substring(0, 2).toUpperCase()}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-poppins font-bold text-white">{fullName}</h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold">
                    VERIFIED CLIENT
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-mono">{email} • {clientId}</p>
                <p className="text-[10px] text-neutral-400">Member since January 2026</p>
              </div>
            </div>

            <button
              onClick={() => handleCopy(clientId, 'Client ID')}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 text-xs hover:text-white hover:bg-white/10 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
            >
              {copiedField === 'Client ID' ? <Check className="w-3.5 h-3.5 text-[#28C76F]" /> : <Copy className="w-3.5 h-3.5 text-[#E5C158]" />}
              <span>Copy Client ID</span>
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400 uppercase">Full Name</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400 uppercase">Email Address (Primary)</label>
                <input
                  type="email"
                  disabled={!isEditingProfile}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400 uppercase">Phone / WhatsApp Number</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400 uppercase">Country / City</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400 uppercase">Preferred Language</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400 uppercase">Timezone</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

            </div>

            {isEditingProfile && (
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* SUBTAB 2: SECURITY & AUTH */}
      {activeSubTab === 'security' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 bg-black/80">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <h3 className="font-poppins font-bold text-white text-base">Password & Authentication</h3>
                <p className="text-xs text-neutral-400">Manage account security keys, password updates, and multi-factor authentication.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 font-bold text-[10px]">
                HIGH PROTECTION LEVEL
              </span>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div className="space-y-0.5">
                  <strong className="text-white block text-sm">Account Password</strong>
                  <span className="text-neutral-400">Last changed 14 days ago • Strong 16-character phrase</span>
                </div>
                <button
                  onClick={() => {
                    if (onShowToast) onShowToast('Password reset link dispatched to shehrozsultanpgc@gmail.com');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 cursor-pointer"
                >
                  Change Password
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div className="space-y-0.5">
                  <strong className="text-white block text-sm">Two-Factor Authentication (2FA)</strong>
                  <span className="text-neutral-400">Authenticator App / SMS Verification active</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#28C76F]/20 text-[#28C76F] font-bold text-[10px]">
                  ENABLED
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div className="space-y-0.5">
                  <strong className="text-white block text-sm">Active Sessions & Trusted Devices</strong>
                  <span className="text-neutral-400">Chrome macOS (Current session) • Android App (Islamabad, PK)</span>
                </div>
                <button
                  onClick={() => {
                    if (onShowToast) onShowToast('Logged out of all other remote active devices.');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/20 cursor-pointer"
                >
                  Sign Out Other Devices
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: GOOGLE ACCOUNT SSO */}
      {activeSubTab === 'google' && (
        <div className="glass-card rounded-3xl border border-blue-500/30 p-6 sm:p-8 space-y-6 bg-gradient-to-br from-black via-[#0B0F1A] to-black">
          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-poppins font-bold text-white text-base">Google Authentication Integration</h3>
              <p className="text-xs text-neutral-300">Single Sign-On (SSO) connected with Google Workspace for one-click secure access.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-black border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-base flex items-center justify-center">
                  G
                </div>
                <div>
                  <strong className="text-white block text-sm">{customerName}</strong>
                  <span className="text-neutral-400 text-xs font-mono">{customerEmail}</span>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                isGoogleConnected
                  ? 'bg-[#28C76F]/20 text-[#28C76F] border-[#28C76F]/40'
                  : 'bg-white/10 text-neutral-400 border-white/20'
              }`}>
                {isGoogleConnected ? 'CONNECTED & SYNCED' : 'DISCONNECTED'}
              </span>
            </div>

            <p className="text-xs text-neutral-400">
              Your MFS Growth Agency account is authenticated via Google. Profile image, full name, and email updates sync directly with your primary Google account.
            </p>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  setIsGoogleConnected(!isGoogleConnected);
                  if (onShowToast) onShowToast(isGoogleConnected ? 'Google Account disconnected.' : 'Google Account connected successfully!');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                  isGoogleConnected
                    ? 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isGoogleConnected ? 'Disconnect Google SSO' : 'Connect Google Account'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: PRIVACY & NOTIFICATIONS */}
      {activeSubTab === 'privacy' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 bg-black/80">
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-poppins font-bold text-white text-base">Notification Channels & Privacy</h3>
            <p className="text-xs text-neutral-400">Choose how MFS Growth sends project updates, milestone alerts, and invoices.</p>
          </div>

          <div className="space-y-4 text-xs">
            
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div>
                <strong className="text-white block text-sm">Email Alerts (mfsmedia.agency@gmail.com)</strong>
                <span className="text-neutral-400">Order confirmations, tax invoices, and final deliverable links.</span>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                className="w-5 h-5 accent-[#E5C158] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div>
                <strong className="text-white block text-sm">WhatsApp Live Direct Dispatch (+92 301 5323689)</strong>
                <span className="text-neutral-400">Instant milestone updates and direct designer questions via WhatsApp.</span>
              </div>
              <input
                type="checkbox"
                checked={whatsappNotifs}
                onChange={(e) => setWhatsappNotifs(e.target.checked)}
                className="w-5 h-5 accent-[#E5C158] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div>
                <strong className="text-white block text-sm">AI Daily Project Briefings</strong>
                <span className="text-neutral-400">Receive morning summary cards for active project progress.</span>
              </div>
              <input
                type="checkbox"
                checked={projectUpdatesNotifs}
                onChange={(e) => setProjectUpdatesNotifs(e.target.checked)}
                className="w-5 h-5 accent-[#E5C158] cursor-pointer"
              />
            </div>

          </div>
        </div>
      )}

      {/* SUBTAB 5: ACTIVITY LOG */}
      {activeSubTab === 'activity' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-5 bg-black/80">
          <div className="border-b border-white/10 pb-3">
            <h3 className="font-poppins font-bold text-white text-base">Security Activity & Login Audit Log</h3>
            <p className="text-xs text-neutral-400">Real-time log of security events, profile updates, and active session sign-ins.</p>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { event: 'Google SSO Authentication Success', ip: '111.68.102.14 (Islamabad, PK)', date: 'Today • 10:30 AM', status: 'Success', device: 'Chrome macOS' },
              { event: 'Profile Details Updated', ip: '111.68.102.14 (Islamabad, PK)', date: 'Yesterday • 04:15 PM', status: 'Verified', device: 'Chrome macOS' },
              { event: 'Invoice #INV-849201 Paid & Verified', ip: '111.68.102.14 (Islamabad, PK)', date: 'Yesterday • 04:30 PM', status: 'Verified', device: 'EasyPaisa API' },
              { event: 'Password Verification Checked', ip: '111.68.102.14 (Islamabad, PK)', date: '3 days ago', status: 'Passed', device: 'Android Mobile' },
            ].map((log, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <strong className="text-white block text-xs font-poppins">{log.event}</strong>
                  <span className="text-[10px] text-neutral-400 font-mono">{log.device} • IP: {log.ip}</span>
                </div>
                <div className="text-right space-y-0.5">
                  <span className="text-[10px] text-[#28C76F] font-bold block">{log.status}</span>
                  <span className="text-[10px] text-neutral-400">{log.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PHASE 9 ROADMAP CHECKLIST MODAL */}
      {showRoadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl border border-[#E5C158]/40 p-6 sm:p-8 max-w-2xl w-full space-y-6 bg-[#0F0F0F] relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#28C76F]/20 text-[#28C76F]">
                  <CheckCircle2 className="w-6 h-6 text-[#28C76F]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block">
                    CLIENT DASHBOARD ROADMAP COMPLETE
                  </span>
                  <h3 className="text-xl font-poppins font-bold text-white">
                    Phase 9 Completed • Account & Security Center
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="text-neutral-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Complete Roadmap Checklist */}
            <div className="space-y-2 text-xs">
              {[
                { phase: 'Phase 1: Client Dashboard Core Shell', desc: 'Sidebar, header, currency switch & navigation' },
                { phase: 'Phase 2: Dashboard Home Experience', desc: 'AI Daily Briefing, metrics, quick shortcuts & activities' },
                { phase: 'Phase 3: AI Live Project Tracking', desc: 'Vertical timeline, AI health score & Cinematic Movie' },
                { phase: 'Phase 4: Project Details Center', desc: 'Project overview, brief, specs, file attachments & deliverables' },
                { phase: 'Phase 5: AI Assistant Center', desc: 'AI chat hub, document search, voice AI & multi-language support' },
                { phase: 'Phase 6: Messages & Communication Center', desc: 'Real-time chat, AI summarizer, file sharing & reaction cards' },
                { phase: 'Phase 7: Files & Documents Center', desc: 'Grid/List view, drag & drop upload, encrypted preview & version history' },
                { phase: 'Phase 8: Billing, Payments & Invoices Center', desc: 'Tax invoices, verified receipts, payment history & approved MFS account cards' },
              ].map((p, idx) => (
                <div key={idx} className="p-2 bg-[#28C76F]/10 border border-[#28C76F]/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#28C76F]" />
                    <strong className="text-white text-[11px]">{p.phase}</strong>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[9px]">COMPLETED</span>
                </div>
              ))}

              <div className="p-3 rounded-2xl bg-[#28C76F]/15 border border-[#28C76F]/40 flex items-center justify-between shadow-[0_0_15px_rgba(40,199,111,0.2)]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold text-xs">Phase 9: Profile, Account & Security Center</strong>
                    <span className="text-neutral-400 text-[11px]">Editable profile, Google SSO integration, security audit log & privacy preferences</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED NOW</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="w-full py-3 rounded-full bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] cursor-pointer"
              >
                Acknowledge Phase 9 Completion
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
