import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  FileText,
  Lock,
  Globe,
  Eye,
  BarChart2,
  Copy,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  ShieldAlert,
  Upload,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Currency } from '../../../types';

interface CMSDownloadCenterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export interface DownloadableResource {
  id: string;
  title: string;
  category: 'company' | 'service' | 'pricing' | 'contract' | 'case-study' | 'marketing';
  fileFormat: string;
  fileSize: string;
  version: string;
  downloadsCount: number;
  visibility: 'public' | 'private' | 'client-only';
  lastDownloaded: string;
  url: string;
}

export const CMSDownloadCenter: React.FC<CMSDownloadCenterProps> = ({
  currency,
  onShowToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [resources, setResources] = useState<DownloadableResource[]>([
    {
      id: 'res-1',
      title: 'MFS Growth Agency Corporate Profile 2026',
      category: 'company',
      fileFormat: 'PDF',
      fileSize: '5.6 MB',
      version: 'v2026.2',
      downloadsCount: 1420,
      visibility: 'public',
      lastDownloaded: '12 mins ago',
      url: '/downloads/MFS-Corporate-Profile-2026.pdf',
    },
    {
      id: 'res-2',
      title: 'Grand Launch Service Rate & Pricing Brochure',
      category: 'pricing',
      fileFormat: 'PDF',
      fileSize: '2.4 MB',
      version: 'v1.4',
      downloadsCount: 3890,
      visibility: 'public',
      lastDownloaded: '2 mins ago',
      url: '/downloads/MFS-Pricing-Brochure.pdf',
    },
    {
      id: 'res-3',
      title: 'Non-Disclosure Agreement (NDA) Standard Template',
      category: 'contract',
      fileFormat: 'DOCX / PDF',
      fileSize: '410 KB',
      version: 'v3.1',
      downloadsCount: 512,
      visibility: 'client-only',
      lastDownloaded: '1 hour ago',
      url: '/downloads/MFS-Standard-NDA.docx',
    },
    {
      id: 'res-4',
      title: 'Master Client Services Contract (MSA)',
      category: 'contract',
      fileFormat: 'PDF',
      fileSize: '1.2 MB',
      version: 'v2.0',
      downloadsCount: 284,
      visibility: 'private',
      lastDownloaded: '4 hours ago',
      url: '/downloads/MFS-Master-Services-Contract.pdf',
    },
    {
      id: 'res-5',
      title: 'FinTech Executive Pitch Deck Case Study',
      category: 'case-study',
      fileFormat: 'PDF (Watermarked)',
      fileSize: '8.1 MB',
      version: 'v1.1',
      downloadsCount: 940,
      visibility: 'public',
      lastDownloaded: '25 mins ago',
      url: '/downloads/MFS-Fintech-Case-Study.pdf',
    },
    {
      id: 'res-6',
      title: 'Marketing Kit & Press Release Assets',
      category: 'marketing',
      fileFormat: 'ZIP',
      fileSize: '24.5 MB',
      version: 'v1.0',
      downloadsCount: 195,
      visibility: 'public',
      lastDownloaded: 'Yesterday',
      url: '/downloads/MFS-Press-Kit.zip',
    },
  ]);

  const toggleVisibility = (id: string) => {
    setResources(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextVis =
            item.visibility === 'public'
              ? 'client-only'
              : item.visibility === 'client-only'
              ? 'private'
              : 'public';
          if (onShowToast) onShowToast(`Updated visibility for ${item.title} to ${nextVis}`);
          return { ...item, visibility: nextVis };
        }
        return item;
      })
    );
  };

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || res.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalDownloads = resources.reduce((sum, r) => sum + r.downloadsCount, 0);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-[#121212] via-[#121A20] to-[#0D0D12] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-poppins font-black text-xl text-white">
                  Enterprise Resource & Document Download Center
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold">
                  Analytics & Access Protected
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Manage company brochures, pricing sheets, NDAs, proposals, and marketing kits with version control.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onShowToast?.('Uploading new public document...')}
              className="px-3.5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(229,193,88,0.2)] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Resource</span>
            </button>
          </div>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl border border-white/10 p-4 space-y-1">
          <div className="text-[11px] text-neutral-400 font-mono">Total Downloaded</div>
          <div className="text-xl font-black text-[#28C76F] font-poppins">{totalDownloads.toLocaleString()} Times</div>
        </div>

        <div className="glass-card rounded-xl border border-white/10 p-4 space-y-1">
          <div className="text-[11px] text-neutral-400 font-mono">Public Resources</div>
          <div className="text-xl font-black text-blue-400 font-poppins">
            {resources.filter(r => r.visibility === 'public').length} Active
          </div>
        </div>

        <div className="glass-card rounded-xl border border-white/10 p-4 space-y-1">
          <div className="text-[11px] text-neutral-400 font-mono">Client Protected</div>
          <div className="text-xl font-black text-[#E5C158] font-poppins">
            {resources.filter(r => r.visibility !== 'public').length} Confidential
          </div>
        </div>

        <div className="glass-card rounded-xl border border-white/10 p-4 space-y-1">
          <div className="text-[11px] text-neutral-400 font-mono">Avg Daily Downloads</div>
          <div className="text-xl font-black text-white font-poppins">245 / Day</div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
          <input
            type="text"
            placeholder="Search downloadable files..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
          {['all', 'company', 'pricing', 'contract', 'case-study', 'marketing'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer border shrink-0 ${
                categoryFilter === cat
                  ? 'bg-blue-500 text-white border-blue-500 font-extrabold'
                  : 'glass-card text-neutral-400 border-white/10 hover:text-white'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* RESOURCES TABLE */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-neutral-400 font-mono text-[11px]">
              <tr>
                <th className="p-4">RESOURCE TITLE</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4">FORMAT & SIZE</th>
                <th className="p-4">VERSION</th>
                <th className="p-4">DOWNLOADS</th>
                <th className="p-4">VISIBILITY</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredResources.map(res => (
                <tr key={res.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#E5C158] shrink-0" />
                      <div>
                        <div className="font-bold text-white">{res.title}</div>
                        <div className="text-[10px] text-neutral-500 font-mono">Last download: {res.lastDownloaded}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-neutral-300 font-mono text-[10px] capitalize border border-white/10">
                      {res.category.replace('-', ' ')}
                    </span>
                  </td>

                  <td className="p-4 font-mono text-neutral-300">
                    {res.fileFormat} • {res.fileSize}
                  </td>

                  <td className="p-4 font-mono text-[#E5C158] font-bold">
                    {res.version}
                  </td>

                  <td className="p-4 font-mono text-white font-bold">
                    {res.downloadsCount.toLocaleString()}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleVisibility(res.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                        res.visibility === 'public'
                          ? 'bg-[#28C76F]/10 text-[#28C76F] border-[#28C76F]/30'
                          : res.visibility === 'client-only'
                          ? 'bg-[#E5C158]/10 text-[#E5C158] border-[#E5C158]/30'
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}
                    >
                      {res.visibility === 'public' ? (
                        <Globe className="w-3 h-3" />
                      ) : (
                        <Lock className="w-3 h-3" />
                      )}
                      <span className="capitalize">{res.visibility}</span>
                    </button>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(res.url);
                          onShowToast?.(`Copied link for ${res.title}`);
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white cursor-pointer"
                        title="Copy URL"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onShowToast?.(`Initiated download for ${res.title}...`)}
                        className="px-2.5 py-1 rounded-lg bg-[#E5C158] text-black font-extrabold text-[11px] hover:bg-[#fce888] cursor-pointer"
                      >
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
