import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Megaphone,
  Plus,
  DollarSign,
  TrendingUp,
  Target,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  Edit3,
  Trash2,
  Save,
  X
} from 'lucide-react';
import { Currency } from '../../../types';

export interface MarketingCampaign {
  id: string;
  name: string;
  platform: 'Google Ads' | 'Meta Ads' | 'LinkedIn Ads' | 'TikTok Ads' | 'Email Campaigns' | 'Organic Campaigns';
  budgetPKR: number;
  status: 'Active' | 'Paused' | 'Planned' | 'Completed';
  clicks: number;
  leads: number;
  conversionRate: number; // percentage
  roi: number; // percentage
  startDate: string;
  endDate: string;
  manager: string;
}

interface CMSMarketingCampaignTrackerProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSMarketingCampaignTracker: React.FC<CMSMarketingCampaignTrackerProps> = ({
  currency,
  onShowToast,
}) => {
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([
    {
      id: 'camp-1',
      name: 'Grand Launch 50% Off Academic Campaign',
      platform: 'Meta Ads',
      budgetPKR: 150000,
      status: 'Active',
      clicks: 14200,
      leads: 380,
      conversionRate: 2.67,
      roi: 320,
      startDate: '2026-07-01',
      endDate: '2026-08-31',
      manager: 'Shehroz Sultan',
    },
    {
      id: 'camp-2',
      name: 'Executive Pitch Deck Search Ads',
      platform: 'Google Ads',
      budgetPKR: 250000,
      status: 'Active',
      clicks: 8400,
      leads: 290,
      conversionRate: 3.45,
      roi: 410,
      startDate: '2026-07-10',
      endDate: '2026-09-30',
      manager: 'Marketing Team',
    },
    {
      id: 'camp-3',
      name: 'ATS Resume Engineering LinkedIn Outreach',
      platform: 'LinkedIn Ads',
      budgetPKR: 100000,
      status: 'Active',
      clicks: 3200,
      leads: 110,
      conversionRate: 3.43,
      roi: 280,
      startDate: '2026-07-15',
      endDate: '2026-08-15',
      manager: 'Client Success Manager',
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPlatform, setNewPlatform] = useState<MarketingCampaign['platform']>('Meta Ads');
  const [newBudget, setNewBudget] = useState('100000');
  const [newManager, setNewManager] = useState('Shehroz Sultan');

  const formatAmount = (pkrAmount: number) => {
    if (currency.code === 'PKR') {
      return `PKR ${pkrAmount.toLocaleString()}`;
    }
    const converted = pkrAmount * currency.rate;
    return `${currency.symbol}${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newCamp: MarketingCampaign = {
      id: `camp-${Date.now()}`,
      name: newName,
      platform: newPlatform,
      budgetPKR: Number(newBudget) || 100000,
      status: 'Active',
      clicks: 0,
      leads: 0,
      conversionRate: 0,
      roi: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      manager: newManager,
    };
    setCampaigns((prev) => [newCamp, ...prev]);
    setIsAddModalOpen(false);
    setNewName('');
    if (onShowToast) {
      onShowToast(`Created new campaign "${newCamp.name}"!`);
    }
  };

  const handleToggleStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c
      )
    );
    if (onShowToast) onShowToast('Campaign status updated.');
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-[#121212] via-[#1A1024] to-[#0D0D12] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-poppins font-black text-xl text-white">
                  Marketing Campaign Tracker & ROI Center
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] font-mono font-bold">
                  {campaigns.length} Active Campaigns
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Monitor multi-channel ad campaigns (Google, Meta, LinkedIn, TikTok), tracking clicks, lead attribution, conversion rate, and net ROI.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.25)] shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* AI BUDGET RECOMMENDATION BOX */}
      <div className="p-4 rounded-2xl bg-[#E5C158]/5 border border-[#E5C158]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E5C158]/20 text-[#E5C158] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">AI Budget Reallocation Recommendation</div>
            <p className="text-[11px] text-neutral-300 mt-0.5">
              Google Search Ads are yielding +410% ROI vs LinkedIn at +280%. Reallocating 15% budget from LinkedIn to Google Ads is predicted to generate <span className="text-[#28C76F] font-bold">+22% more qualified leads</span>.
            </p>
          </div>
        </div>

        <button
          onClick={() => onShowToast?.('AI budget reallocation applied across active campaigns!')}
          className="px-3.5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all cursor-pointer shrink-0"
        >
          Apply AI Budget Shift
        </button>
      </div>

      {/* CAMPAIGNS TABLE */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4 bg-[#0D0D12]">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="font-poppins font-bold text-sm text-white">Active & Planned Campaigns</h3>
          <span className="text-[10px] text-neutral-400 font-mono">{currency.code} Display</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-mono text-neutral-400 uppercase">
                <th className="pb-3 font-normal">Campaign Name</th>
                <th className="pb-3 font-normal">Platform</th>
                <th className="pb-3 font-normal">Budget</th>
                <th className="pb-3 font-normal">Clicks / Leads</th>
                <th className="pb-3 font-normal">CVR %</th>
                <th className="pb-3 font-normal">ROI</th>
                <th className="pb-3 font-normal">Status</th>
                <th className="pb-3 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-sans font-bold text-white">{camp.name}</td>
                  <td className="py-3 text-neutral-300">{camp.platform}</td>
                  <td className="py-3 text-[#E5C158] font-bold">{formatAmount(camp.budgetPKR)}</td>
                  <td className="py-3 text-neutral-300">
                    {camp.clicks.toLocaleString()} / <span className="text-emerald-400 font-bold">{camp.leads}</span>
                  </td>
                  <td className="py-3 text-neutral-300">{camp.conversionRate}%</td>
                  <td className="py-3 text-[#28C76F] font-bold">+{camp.roi}%</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        camp.status === 'Active'
                          ? 'bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {camp.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleToggleStatus(camp.id)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[10px] transition-all cursor-pointer"
                    >
                      {camp.status === 'Active' ? 'Pause' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE CAMPAIGN MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-2xl border border-white/10 p-6 max-w-md w-full space-y-4 bg-[#121212]"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-poppins font-bold text-white text-base">Create Marketing Campaign</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddCampaign} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-300">Campaign Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g., Back to School Academic Offer"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#E5C158] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300">Platform</label>
                    <select
                      value={newPlatform}
                      onChange={(e) => setNewPlatform(e.target.value as any)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none font-mono"
                    >
                      <option value="Meta Ads" className="bg-black">Meta Ads</option>
                      <option value="Google Ads" className="bg-black">Google Ads</option>
                      <option value="LinkedIn Ads" className="bg-black">LinkedIn Ads</option>
                      <option value="TikTok Ads" className="bg-black">TikTok Ads</option>
                      <option value="Email Campaigns" className="bg-black">Email Campaigns</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300">Budget (PKR)</label>
                    <input
                      type="number"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#E5C158] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-neutral-300 text-xs font-bold hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#E5C158] text-black text-xs font-extrabold hover:bg-[#fce888]"
                  >
                    Launch Campaign
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
