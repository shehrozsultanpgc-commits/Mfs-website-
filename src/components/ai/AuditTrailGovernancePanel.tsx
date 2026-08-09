import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  FileSpreadsheet,
  Download,
  Search,
  Filter,
  Clock,
  User,
  Laptop,
  Globe,
  FileCode,
  Server,
  Layers,
  Database,
  CheckCircle2,
  Info,
  ChevronRight
} from 'lucide-react';

interface AuditTrailGovernancePanelProps {
  onShowToast?: (msg: string) => void;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  category: 'Prompt' | 'Provider' | 'Knowledge' | 'Routing' | 'Security' | 'Config';
  previousValue: string;
  newValue: string;
  ipAddress: string;
  deviceFingerprint: string;
  notes: string;
}

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'audit-901',
    timestamp: 'Today at 01:14 AM',
    adminName: 'Shehroz Sultan (Admin)',
    action: 'Prompt Version Upgrade',
    category: 'Prompt',
    previousValue: 'MFS_CHAT_VOICE_ASSISTANT_CORE v2.0.0',
    newValue: 'MFS_CHAT_VOICE_ASSISTANT_CORE v2.1.0',
    ipAddress: '182.180.144.12',
    deviceFingerprint: 'MacBook Pro / Chrome 127.0',
    notes: 'Added Askari Bank account title and Roman Urdu fallback greetings.'
  },
  {
    id: 'audit-902',
    timestamp: 'Yesterday at 05:30 PM',
    adminName: 'Shehroz Sultan (Admin)',
    action: 'AI Provider Model Swapped',
    category: 'Provider',
    previousValue: 'Google AI Studio: gemini-1.5-flash-latest',
    newValue: 'Google AI Studio: gemini-1.5-pro-latest',
    ipAddress: '182.180.144.12',
    deviceFingerprint: 'MacBook Pro / Chrome 127.0',
    notes: 'Upgraded primary model to Pro for complex PDF research briefs.'
  },
  {
    id: 'audit-903',
    timestamp: '2026-07-25 11:10 AM',
    adminName: 'Shehroz Sultan (Admin)',
    action: 'Knowledge File Vectorized',
    category: 'Knowledge',
    previousValue: 'N/A (New Upload)',
    newValue: 'MFS_Presentation_Design_SOP_v2.pdf',
    ipAddress: '182.180.144.12',
    deviceFingerprint: 'MacBook Pro / Chrome 127.0',
    notes: 'Chunked into 128 vector embeddings in Supabase pgvector.'
  },
  {
    id: 'audit-904',
    timestamp: '2026-07-24 02:45 PM',
    adminName: 'System Auto-Governor',
    action: 'Multi-LLM Fallback Triggered',
    category: 'Routing',
    previousValue: 'Primary: Google Gemini (320ms)',
    newValue: 'Fallback: OpenAI GPT-4o (Latency Threshold Exceeded)',
    ipAddress: '127.0.0.1 (Internal System)',
    deviceFingerprint: 'Node.js Enterprise Service',
    notes: 'Auto-routed Academic Writing task during Gemini API maintenance window.'
  }
];

export const AuditTrailGovernancePanel: React.FC<AuditTrailGovernancePanelProps> = ({ onShowToast }) => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');

  const filteredLogs = logs.filter(l => {
    const matchesSearch =
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.notes.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'All Categories' || l.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const handleExport = (format: 'CSV' | 'JSON' | 'PDF') => {
    if (onShowToast) {
      onShowToast(`Exporting ${filteredLogs.length} audit trail logs as ${format}...`);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <h2 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#E5C158]" />
              <span>Enterprise AI System Audit Trail & Immutable Change Log</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Audit log tracking all prompt updates, provider switches, knowledge base vector indexing, and admin governance actions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport('CSV')}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              <Download className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => handleExport('JSON')}
              className="px-3 py-2 rounded-xl bg-[#E5C158] hover:bg-[#d4af37] text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export Audit JSON</span>
            </button>
          </div>
        </div>

        {/* SEARCH AND CATEGORY FILTER */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search audit trail by admin name, action, or notes..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#E5C158] cursor-pointer"
          >
            <option value="All Categories" className="bg-[#0D0D12]">All Categories</option>
            <option value="Prompt" className="bg-[#0D0D12]">Prompt Changes</option>
            <option value="Provider" className="bg-[#0D0D12]">Provider Updates</option>
            <option value="Knowledge" className="bg-[#0D0D12]">Knowledge Base</option>
            <option value="Routing" className="bg-[#0D0D12]">Smart Routing</option>
            <option value="Security" className="bg-[#0D0D12]">Security Rules</option>
          </select>
        </div>
      </div>

      {/* AUDIT LOG TABLE */}
      <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-mono text-neutral-400 uppercase">
              <th className="pb-3 font-bold">Timestamp</th>
              <th className="pb-3 font-bold">Admin / Operator</th>
              <th className="pb-3 font-bold">Action & Category</th>
              <th className="pb-3 font-bold">Value Transition</th>
              <th className="pb-3 font-bold">IP & Device</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs font-mono">
            {filteredLogs.map(log => (
              <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 text-neutral-400 text-[11px] whitespace-nowrap">{log.timestamp}</td>

                <td className="py-3">
                  <strong className="text-white block font-bold text-xs">{log.adminName}</strong>
                  <span className="text-[10px] text-emerald-400">Authenticated Admin</span>
                </td>

                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#E5C158]/10 text-[#E5C158] text-[9px] font-bold border border-[#E5C158]/30">
                      {log.category}
                    </span>
                    <strong className="text-white text-xs">{log.action}</strong>
                  </div>
                  <p className="text-neutral-400 text-[11px] mt-1">{log.notes}</p>
                </td>

                <td className="py-3 max-w-xs">
                  <div className="space-y-0.5 text-[10px]">
                    <span className="text-rose-400 line-through block truncate">From: {log.previousValue}</span>
                    <span className="text-emerald-400 font-bold block truncate">To: {log.newValue}</span>
                  </div>
                </td>

                <td className="py-3 text-[10px] text-neutral-500">
                  <span className="block font-bold text-neutral-400">{log.ipAddress}</span>
                  <span>{log.deviceFingerprint}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
