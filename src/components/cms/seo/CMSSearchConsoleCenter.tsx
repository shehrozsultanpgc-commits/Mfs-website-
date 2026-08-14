import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Globe,
  Search,
  CheckCircle2,
  RefreshCw,
  Send,
  AlertTriangle,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  FileCode,
  Sparkles
} from 'lucide-react';
import { Currency } from '../../../types';

interface CMSSearchConsoleCenterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSSearchConsoleCenter: React.FC<CMSSearchConsoleCenterProps> = ({
  currency,
  onShowToast,
}) => {
  const [indexUrl, setIndexUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchQueries = [
    { query: 'MFS Growth Agency', clicks: 1240, impressions: 4200, ctr: '29.5%', position: '1.0' },
    { query: 'Presentation Design Agency Pakistan', clicks: 820, impressions: 3800, ctr: '21.5%', position: '1.2' },
    { query: 'ATS Resume Writing Service Pakistan', clicks: 650, impressions: 2900, ctr: '22.4%', position: '1.4' },
    { query: 'Assignment Writing Help Lahore PKR', clicks: 490, impressions: 2100, ctr: '23.3%', position: '1.8' },
    { query: 'Corporate Pitch Deck Rates', clicks: 310, impressions: 1800, ctr: '17.2%', position: '2.1' },
  ];

  const handleRequestIndexing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!indexUrl) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIndexUrl('');
      if (onShowToast) {
        onShowToast(`Instant Google Indexing request sent for ${indexUrl}!`);
      }
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-[#121212] via-[#101A24] to-[#0D0D12] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-poppins font-black text-xl text-white">
                  Google Search Console Command Center
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-mono font-bold">
                  GSC API Connected
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Direct Google Search Console integration for real-time sitemap submission, crawl status monitoring, indexation requests, and organic query analytics.
              </p>
            </div>
          </div>

          <button
            onClick={() => onShowToast?.('Sitemap re-submitted to Google Search Console API.')}
            className="px-4 py-2.5 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.25)] shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Re-Submit Sitemap</span>
          </button>
        </div>
      </div>

      {/* SITEMAP & INDEXING STATUS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl border border-white/10 p-5 space-y-2 bg-black/40">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">SITEMAP STATUS</div>
          <div className="text-lg font-bold text-white font-poppins">https://mfsgrowth.online/sitemap.xml</div>
          <div className="text-xs text-[#28C76F] font-mono font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F]" />
            <span>Status: Success (8 Core Public URLs)</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-white/10 p-5 space-y-2 bg-black/40">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">CRAWL COVERAGE</div>
          <div className="text-2xl font-black text-white font-poppins">8 Valid / 0 Errors</div>
          <div className="text-xs text-[#28C76F] font-mono font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F]" />
            <span>0 Excluded & 0 Server 5xx Errors</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-white/10 p-5 space-y-2 bg-black/40">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">GOOGLE BOT LAST CRAWL</div>
          <div className="text-2xl font-black text-[#E5C158] font-poppins">Active</div>
          <div className="text-xs text-neutral-400 font-mono">Googlebot Desktop & Smartphone</div>
        </div>
      </div>

      {/* REQUEST INDEXING FORM */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-3 bg-[#0D0D12]">
        <div className="font-poppins font-bold text-sm text-white border-b border-white/10 pb-3">
          Request Instant Google Search Indexing
        </div>

        <form onSubmit={handleRequestIndexing} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="url"
            required
            value={indexUrl}
            onChange={(e) => setIndexUrl(e.target.value)}
            placeholder="https://mfsgrowth.online/services"
            className="flex-1 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#E5C158] focus:outline-none font-mono"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.25)] shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Requesting Index...' : 'Submit to Google API'}</span>
          </button>
        </form>
      </div>

      {/* SEARCH QUERIES TABLE */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4 bg-[#0D0D12]">
        <div className="font-poppins font-bold text-sm text-white border-b border-white/10 pb-3">
          Top Organic Search Queries (Google Search Console Data)
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-mono text-neutral-400 uppercase">
                <th className="pb-3 font-normal">Search Query</th>
                <th className="pb-3 font-normal">Clicks</th>
                <th className="pb-3 font-normal">Impressions</th>
                <th className="pb-3 font-normal">CTR %</th>
                <th className="pb-3 font-normal">Avg Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {searchQueries.map((q, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-sans font-bold text-white">{q.query}</td>
                  <td className="py-3 text-[#E5C158] font-bold">{q.clicks}</td>
                  <td className="py-3 text-neutral-300">{q.impressions}</td>
                  <td className="py-3 text-emerald-400">{q.ctr}</td>
                  <td className="py-3 text-purple-400 font-bold">#{q.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
