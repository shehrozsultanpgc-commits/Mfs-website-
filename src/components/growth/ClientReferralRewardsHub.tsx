import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gift,
  Share2,
  Copy,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  Zap,
  TrendingUp,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Crown,
  ChevronRight,
  MessageSquare,
  Mail,
  Send,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { Currency } from '../../types';

interface ClientReferralRewardsHubProps {
  currency?: Currency;
  userEmail?: string;
  userName?: string;
  onOpenOrderModal: (serviceId?: string) => void;
  onShowToast?: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  onNavigatePage?: (page: string) => void;
}

export const ClientReferralRewardsHub: React.FC<ClientReferralRewardsHubProps> = ({
  currency = 'PKR',
  userEmail = 'client@example.com',
  userName = 'Client',
  onOpenOrderModal,
  onShowToast,
  onNavigatePage,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'referrals' | 'tiers' | 'wallet'>('referrals');

  // Generate deterministic referral code
  const referralCode = `MFS-${userName.slice(0, 3).toUpperCase()}${Math.floor(1000 + (userName.length * 137) % 9000)}`;
  const referralLink = `https://mfsgrowth.online/?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    if (onShowToast) {
      onShowToast('Unique referral link copied to clipboard!', 'success');
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! Get 50% OFF your presentations, assignments, and ATS resumes with MFS Growth Agency using my VIP referral link: ${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent('Exclusive 50% Discount at MFS Growth Agency');
    const body = encodeURIComponent(
      `Hi there,\n\nI recommend MFS Growth Agency for executive presentation design, ATS resume writing, academic assignments, and document formatting.\n\nUse my invite link to claim your 50% Grand Launch discount + priority queue:\n${referralLink}\n\nBest regards,\n${userName}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const TIERS = [
    {
      level: 'Bronze Member',
      icon: Award,
      color: 'text-amber-600 border-amber-600/30 bg-amber-600/10',
      minOrders: '1 - 2 Completed Orders',
      discount: 'Standard 50% Launch Promo',
      benefits: [
        '50% Grand Launch Discount on all services',
        'Direct Client Dashboard & File Tracking',
        'Standard 24-48h Delivery Options',
        '15% Referral Commission on every invite',
      ],
      current: true,
    },
    {
      level: 'Silver Growth',
      icon: Sparkles,
      color: 'text-neutral-300 border-neutral-300/30 bg-neutral-300/10',
      minOrders: '3 - 5 Orders OR 2 Referrals',
      discount: '+5% Extra Lifetime Discount (55% Total)',
      benefits: [
        'Extra 5% discount on all future services',
        'Free Turnitin / Plagiarism Similarity Reports',
        'Priority project queue allocation',
        'Free formatting adjustments up to 14 days',
      ],
      current: false,
    },
    {
      level: 'Gold Executive',
      icon: Crown,
      color: 'text-[#E5C158] border-[#E5C158]/30 bg-[#E5C158]/10',
      minOrders: '6 - 9 Orders OR 5 Referrals',
      discount: '+10% Extra Lifetime Discount (60% Total)',
      benefits: [
        'Extra 10% discount on all orders',
        'Complimentary 24-Hour Express delivery upgrade',
        'Dedicated Senior Art Director & Lead Editor',
        'Source editable files (.PPTX, .DOCX) included free',
      ],
      current: false,
    },
    {
      level: 'Diamond VIP Elite',
      icon: Zap,
      color: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
      minOrders: '10+ Orders OR 10 Referrals',
      discount: '+15% Extra Lifetime Discount (65% Total)',
      benefits: [
        'Maximum 65% total lifetime agency savings',
        'Free Same-Day Rush Turnaround (12h Delivery)',
        'Direct VIP WhatsApp Line with Founder',
        'Unlimited revisions & permanent priority queue',
      ],
      current: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <button
            onClick={() => onNavigatePage ? onNavigatePage('home') : null}
            className="hover:text-[#E5C158] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigatePage ? onNavigatePage('dashboard') : null}
            className="hover:text-[#E5C158] transition-colors cursor-pointer"
          >
            Client Portal
          </button>
          <span>/</span>
          <span className="text-[#E5C158]">Growth Rewards & Loyalty Program</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold uppercase tracking-wider mb-4">
            <Gift className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>MFS Client Growth & VIP Rewards Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins text-white tracking-tight leading-tight">
            Refer Classmates & Colleagues. <br />
            <span className="text-[#E5C158]">Earn 15% Lifetime Wallet Credit.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
            Give your peers an exclusive 50% Grand Launch discount. When they complete any presentation, assignment, or resume project, you automatically receive 15% in cash credit or order discount vouchers.
          </p>
        </div>

        {/* Top Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-[#0F0F16] border border-white/10 text-center relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase font-semibold text-neutral-400 block mb-1">
              Available Wallet Balance
            </span>
            <span className="text-3xl font-black font-poppins text-emerald-400">
              {currency === 'PKR' ? 'Rs. 4,500' : '$25.00'}
            </span>
            <span className="text-[11px] text-neutral-500 block mt-1">
              Auto-applies at checkout
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F0F16] border border-white/10 text-center relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase font-semibold text-neutral-400 block mb-1">
              Referred Colleagues
            </span>
            <span className="text-3xl font-black font-poppins text-[#E5C158]">
              3 Clients
            </span>
            <span className="text-[11px] text-neutral-500 block mt-1">
              2 Projects in production
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F0F16] border border-white/10 text-center relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-3">
              <Crown className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase font-semibold text-neutral-400 block mb-1">
              Current Loyalty Level
            </span>
            <span className="text-2xl font-black font-poppins text-purple-300">
              Silver Growth
            </span>
            <span className="text-[11px] text-neutral-500 block mt-1">
              +5% Extra Lifetime Discount
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="p-1 rounded-2xl bg-[#0F0F16] border border-white/10 inline-flex">
            <button
              onClick={() => setActiveTab('referrals')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'referrals'
                  ? 'bg-[#E5C158] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Share Referral Link
            </button>
            <button
              onClick={() => setActiveTab('tiers')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'tiers'
                  ? 'bg-[#E5C158] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              VIP Loyalty Tiers
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'wallet'
                  ? 'bg-[#E5C158] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Redeem Rewards
            </button>
          </div>
        </div>

        {/* Tab 1: Referral Link & Direct Sharing */}
        {activeTab === 'referrals' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-7 space-y-6">
              {/* Share Box */}
              <div className="p-8 rounded-3xl bg-[#0F0F16] border border-[#E5C158]/30 shadow-2xl space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#E5C158] uppercase tracking-wider block mb-1">
                    Your Personalized Referral Asset
                  </span>
                  <h3 className="text-xl font-bold font-poppins text-white">
                    Unique Referral Code & Invite Link
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1">
                    Share this unique link. Your referrals automatically trigger your 15% reward credit upon order verification.
                  </p>
                </div>

                {/* Copy Bar */}
                <div className="p-2 rounded-2xl bg-[#050507] border border-white/10 flex items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#E5C158] px-3 truncate select-all">
                    {referralLink}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="py-2.5 px-4 rounded-xl bg-[#E5C158] hover:bg-[#F0D27A] text-black font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-black" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-black" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 1-Click Social Shares */}
                <div>
                  <span className="text-xs font-semibold text-neutral-400 block mb-3">
                    Instant 1-Click Share to Peers:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleShareWhatsApp}
                      className="p-3.5 rounded-xl bg-[#08080C] hover:bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-500/50 text-emerald-400 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Share on WhatsApp</span>
                    </button>

                    <button
                      onClick={handleShareEmail}
                      className="p-3.5 rounded-xl bg-[#08080C] hover:bg-blue-950/40 border border-blue-500/20 hover:border-blue-500/50 text-blue-400 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Share via Email</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* How it Works 3 Steps */}
              <div className="p-6 rounded-3xl bg-[#0F0F16] border border-white/10 space-y-4">
                <h4 className="text-sm font-bold font-poppins text-white uppercase tracking-wider">
                  How Referral Rewards Work:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="p-4 rounded-xl bg-[#08080C] border border-white/5">
                    <span className="w-6 h-6 rounded-full bg-[#E5C158] text-black font-bold text-xs flex items-center justify-center mb-2">
                      1
                    </span>
                    <h5 className="text-xs font-bold text-white mb-1">Share Link</h5>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Send your link to friends needing presentations, assignments, or resumes.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#08080C] border border-white/5">
                    <span className="w-6 h-6 rounded-full bg-[#E5C158] text-black font-bold text-xs flex items-center justify-center mb-2">
                      2
                    </span>
                    <h5 className="text-xs font-bold text-white mb-1">They Order 50% OFF</h5>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      They receive 50% launch discount and an extra loyalty bonus credit.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#08080C] border border-white/5">
                    <span className="w-6 h-6 rounded-full bg-[#E5C158] text-black font-bold text-xs flex items-center justify-center mb-2">
                      3
                    </span>
                    <h5 className="text-xs font-bold text-white mb-1">Get 15% Credit</h5>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Receive 15% of their project value credited instantly to your wallet.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Referral Activity Log */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0F0F16] border border-white/10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h4 className="text-sm font-bold font-poppins text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#E5C158]" />
                  <span>Recent Referral Activity</span>
                </h4>
                <span className="text-[11px] text-[#E5C158] font-semibold">Live Sync</span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: 'Ahmed K. (LUMS)',
                    service: 'Academic Assignment & Referencing',
                    date: 'Yesterday',
                    reward: currency === 'PKR' ? '+Rs. 1,500' : '+$12.00',
                    status: 'Credited',
                  },
                  {
                    name: 'Sarah M. (Karachi)',
                    service: 'Executive ATS Resume Package',
                    date: '3 Days Ago',
                    reward: currency === 'PKR' ? '+Rs. 1,200' : '+$8.50',
                    status: 'Credited',
                  },
                  {
                    name: 'Hamza T. (London)',
                    service: '10-Slide Pitch Deck Design',
                    date: '5 Days Ago',
                    reward: currency === 'PKR' ? '+Rs. 1,800' : '+$15.00',
                    status: 'Credited',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#08080C] border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-neutral-400 block">
                        {item.service} • {item.date}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400 block font-mono">
                        {item.reward}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5 text-[11px] text-neutral-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Rewards never expire and can be applied to any future order.</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: VIP Loyalty Tiers */}
        {activeTab === 'tiers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {TIERS.map((tier, idx) => {
              const Icon = tier.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border flex flex-col justify-between transition-all relative ${
                    tier.current
                      ? 'bg-[#141422] border-[#E5C158] shadow-2xl shadow-[#E5C158]/10'
                      : 'bg-[#0F0F16] border-white/10 hover:border-white/20'
                  }`}
                >
                  {tier.current && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold bg-[#E5C158] text-black px-2.5 py-0.5 rounded-full uppercase">
                      Current Tier
                    </span>
                  )}

                  <div>
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 ${tier.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-base font-bold font-poppins text-white mb-1">
                      {tier.level}
                    </h3>
                    <span className="text-[11px] text-neutral-400 block mb-2 font-mono">
                      {tier.minOrders}
                    </span>
                    <span className="text-xs font-bold text-[#E5C158] block mb-4">
                      {tier.discount}
                    </span>

                    <div className="space-y-2 pt-4 border-t border-white/5 mb-6">
                      {tier.benefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenOrderModal()}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tier.current
                        ? 'bg-[#E5C158] text-black hover:bg-[#F0D27A]'
                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {tier.current ? 'Order at This Tier' : 'Upgrade via Orders'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Wallet Redemption */}
        {activeTab === 'wallet' && (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#0F0F16] border border-[#E5C158]/30 shadow-2xl text-center space-y-6 mb-16">
            <div className="w-16 h-16 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center mx-auto">
              <DollarSign className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-[#E5C158] tracking-wider block mb-1">
                Instant Checkout Credit
              </span>
              <h3 className="text-2xl font-bold font-poppins text-white">
                You Have {currency === 'PKR' ? 'Rs. 4,500' : '$25.00'} Ready to Apply
              </h3>
              <p className="text-xs text-neutral-300 mt-2 max-w-lg mx-auto leading-relaxed">
                Your wallet balance is linked directly to your email address ({userEmail}). When placing an order, this credit is seamlessly deducted from your final total.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#08080C] border border-white/5 text-left text-xs space-y-2">
              <div className="flex justify-between text-neutral-300">
                <span>Next Project Value:</span>
                <span>{currency === 'PKR' ? 'Rs. 9,000' : '$50.00'}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Wallet Credit Deduction:</span>
                <span>- {currency === 'PKR' ? 'Rs. 4,500' : '$25.00'}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white text-sm">
                <span>Net Payable:</span>
                <span className="text-[#E5C158]">{currency === 'PKR' ? 'Rs. 4,500' : '$25.00'}</span>
              </div>
            </div>

            <button
              onClick={() => onOpenOrderModal()}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:from-[#F0D27A] hover:to-[#E5C158] text-black font-bold text-xs sm:text-sm font-poppins transition-all shadow-xl shadow-[#E5C158]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-black" />
              <span>Apply Wallet Credit to New Order (50% OFF)</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
