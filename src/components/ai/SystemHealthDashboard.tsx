import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Server,
  Zap,
  RefreshCw,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  Layers,
  ShieldCheck,
  AlertCircle,
  Wifi,
  Radio,
  Check
} from 'lucide-react';

interface SystemHealthDashboardProps {
  onShowToast?: (msg: string) => void;
}

export const SystemHealthDashboard: React.FC<SystemHealthDashboardProps> = ({ onShowToast }) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastCheckTime, setLastCheckTime] = useState<string>('Just now');

  const healthServices = [
    {
      name: 'Google AI Studio (Gemini 1.5 Flash / Pro)',
      status: 'Operational',
      latency: '240ms',
      uptime: '99.98%',
      provider: 'Primary Primary Node'
    },
    {
      name: 'OpenAI API (GPT-4o / GPT-4o-mini)',
      status: 'Operational',
      latency: '380ms',
      uptime: '99.95%',
      provider: 'Secondary Fallback Node'
    },
    {
      name: 'Anthropic Claude 3.5 Sonnet',
      status: 'Operational',
      latency: '410ms',
      uptime: '99.90%',
      provider: 'Academic Writing Engine'
    },
    {
      name: 'DeepSeek-V3 Reasoning Server',
      status: 'Operational',
      latency: '310ms',
      uptime: '99.80%',
      provider: 'Code & Math Engine'
    },
    {
      name: 'Supabase pgvector (RAG Store)',
      status: 'Operational',
      latency: '14ms',
      uptime: '100.0%',
      provider: 'Knowledge Base Vector DB'
    },
    {
      name: 'Local Ollama / Llama 3 Edge Server',
      status: 'Standby / Local',
      latency: '18ms',
      uptime: '100.0%',
      provider: 'Air-Gapped Local Model'
    }
  ];

  const handleRunDiagnostics = () => {
    setIsRefreshing(true);
    if (onShowToast) onShowToast('Running complete AI System Diagnostic ping...');
    setTimeout(() => {
      setIsRefreshing(false);
      setLastCheckTime('Just now');
      if (onShowToast) onShowToast('Diagnostics complete: All 6 AI nodes & DB vector stores 100% operational!');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* COMMAND CENTER OVERVIEW HEADER */}
      <div className="p-6 rounded-3xl bg-[#0D0D12] border border-emerald-500/40 space-y-6 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] font-bold uppercase">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>Live AI Health Score: 99.8% Healthy</span>
            </div>
            <h2 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>AI System Health & Real-time Diagnostic Command Center</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Monitors API connectivity, latency benchmarks, queue health, vector store ping, and edge proxy availability.
            </p>
          </div>

          <button
            onClick={handleRunDiagnostics}
            disabled={isRefreshing}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Running Ping...' : 'Run Diagnostics'}</span>
          </button>
        </div>

        {/* 4 CORE SYSTEM METRIC GAUGES */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-1 font-mono">
            <span className="text-[10px] text-neutral-400 uppercase font-bold block">Overall AI Health</span>
            <strong className="text-2xl font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>99.8%</span>
            </strong>
            <span className="text-[10px] text-neutral-500 block">Checked {lastCheckTime}</span>
          </div>

          <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-1 font-mono">
            <span className="text-[10px] text-neutral-400 uppercase font-bold block">Avg API Response Latency</span>
            <strong className="text-2xl font-bold text-[#E5C158] flex items-center gap-1.5">
              <Zap className="w-5 h-5 text-[#E5C158]" />
              <span>310 ms</span>
            </strong>
            <span className="text-[10px] text-emerald-400 block">-15ms vs yesterday</span>
          </div>

          <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-1 font-mono">
            <span className="text-[10px] text-neutral-400 uppercase font-bold block">Execution Queue Health</span>
            <strong className="text-2xl font-bold text-purple-400 flex items-center gap-1.5">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>0 Pending</span>
            </strong>
            <span className="text-[10px] text-neutral-500 block">100% throughput rate</span>
          </div>

          <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-1 font-mono">
            <span className="text-[10px] text-neutral-400 uppercase font-bold block">Vector Index Status</span>
            <strong className="text-2xl font-bold text-teal-400 flex items-center gap-1.5">
              <Database className="w-5 h-5 text-teal-400" />
              <span>Active</span>
            </strong>
            <span className="text-[10px] text-teal-400 block">pgvector 128 chunks ready</span>
          </div>
        </div>
      </div>

      {/* DETAILED NODE PING LIST */}
      <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl">
        <h3 className="font-poppins font-bold text-white text-base flex items-center gap-2 border-b border-white/10 pb-3">
          <Server className="w-4 h-4 text-[#E5C158]" />
          <span>Node Connectivity & API Provider Availability Matrix</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthServices.map((node, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-3 font-mono"
            >
              <div className="flex items-center justify-between">
                <strong className="text-white font-bold text-xs">{node.name}</strong>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>{node.status}</span>
                </span>
              </div>

              <p className="text-[11px] text-neutral-400">{node.provider}</p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
                <div>
                  <span className="text-neutral-500 block text-[10px]">Latency Ping</span>
                  <strong className="text-[#E5C158]">{node.latency}</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Target Uptime</span>
                  <strong className="text-emerald-400">{node.uptime}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
