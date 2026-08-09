import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Server,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sliders,
  Shield,
  Key,
  Globe,
  Activity,
  ArrowRight,
  Database,
  Lock,
  Edit3,
  Layers,
  Settings2,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface AIProvidersPanelProps {
  onShowToast?: (msg: string) => void;
}

export interface AIProviderItem {
  id: string;
  name: string;
  slug: string;
  iconColor: string;
  badge: string;
  status: 'connected' | 'standby' | 'degraded' | 'disabled';
  activeModel: string;
  modelOptions: string[];
  latencyMs: number;
  healthScore: number;
  lastSync: string;
  usageTokens24h: string;
  quotaPercent: number;
  enabled: boolean;
  endpoint: string;
  apiKeyMasked: string;
  maxTokens: number;
  temperature: number;
}

export interface AIRoutingRule {
  id: string;
  useCase: string;
  description: string;
  primaryProvider: string;
  fallbackProvider: string;
  priority: number;
  latencyThresholdMs: number;
  autoFallbackEnabled: boolean;
}

const INITIAL_PROVIDERS: AIProviderItem[] = [
  {
    id: 'prov-gemini',
    name: 'Google AI Studio (Gemini)',
    slug: 'google-gemini',
    iconColor: 'text-[#E5C158]',
    badge: 'Primary Core Engine',
    status: 'connected',
    activeModel: 'gemini-1.5-pro-latest',
    modelOptions: ['gemini-1.5-pro-latest', 'gemini-1.5-flash-latest', 'gemini-2.0-flash-exp'],
    latencyMs: 320,
    healthScore: 99,
    lastSync: 'Just now',
    usageTokens24h: '1.42M tokens',
    quotaPercent: 28,
    enabled: true,
    endpoint: 'https://generativelanguage.googleapis.com/v1beta',
    apiKeyMasked: 'AIzaSy************************8a91',
    maxTokens: 8192,
    temperature: 0.4
  },
  {
    id: 'prov-openai',
    name: 'OpenAI Enterprise API',
    slug: 'openai',
    iconColor: 'text-emerald-400',
    badge: 'Secondary Reasoning',
    status: 'connected',
    activeModel: 'gpt-4o-2024-08-06',
    modelOptions: ['gpt-4o-2024-08-06', 'gpt-4o-mini', 'o3-mini-2025-01-31'],
    latencyMs: 380,
    healthScore: 98,
    lastSync: '2 mins ago',
    usageTokens24h: '890K tokens',
    quotaPercent: 42,
    enabled: true,
    endpoint: 'https://api.openai.com/v1',
    apiKeyMasked: 'sk-proj-************************3d02',
    maxTokens: 4096,
    temperature: 0.3
  },
  {
    id: 'prov-claude',
    name: 'Anthropic Claude SDK',
    slug: 'anthropic-claude',
    iconColor: 'text-purple-400',
    badge: 'Editorial & Academic',
    status: 'connected',
    activeModel: 'claude-3-5-sonnet-20241022',
    modelOptions: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022'],
    latencyMs: 410,
    healthScore: 97,
    lastSync: '5 mins ago',
    usageTokens24h: '520K tokens',
    quotaPercent: 18,
    enabled: true,
    endpoint: 'https://api.anthropic.com/v1',
    apiKeyMasked: 'sk-ant-api03-************************91bc',
    maxTokens: 8192,
    temperature: 0.2
  },
  {
    id: 'prov-deepseek',
    name: 'DeepSeek AI Engine',
    slug: 'deepseek',
    iconColor: 'text-blue-400',
    badge: 'Deep Reasoning & Code',
    status: 'standby',
    activeModel: 'deepseek-reasoner-r1',
    modelOptions: ['deepseek-reasoner-r1', 'deepseek-chat-v3'],
    latencyMs: 490,
    healthScore: 95,
    lastSync: '12 mins ago',
    usageTokens24h: '180K tokens',
    quotaPercent: 12,
    enabled: true,
    endpoint: 'https://api.deepseek.com/v1',
    apiKeyMasked: 'sk-ds-************************11f4',
    maxTokens: 4096,
    temperature: 0.1
  },
  {
    id: 'prov-grok',
    name: 'xAI Grok API',
    slug: 'xai-grok',
    iconColor: 'text-amber-400',
    badge: 'Real-time Trends',
    status: 'standby',
    activeModel: 'grok-2-1212',
    modelOptions: ['grok-2-1212', 'grok-vision-beta'],
    latencyMs: 520,
    healthScore: 94,
    lastSync: '30 mins ago',
    usageTokens24h: '65K tokens',
    quotaPercent: 8,
    enabled: true,
    endpoint: 'https://api.x.ai/v1',
    apiKeyMasked: 'xai-************************90aa',
    maxTokens: 4096,
    temperature: 0.5
  },
  {
    id: 'prov-azure',
    name: 'Azure OpenAI Cloud',
    slug: 'azure-openai',
    iconColor: 'text-[#28C76F]',
    badge: 'Enterprise Compliance',
    status: 'standby',
    activeModel: 'azure-gpt-4o-sweden',
    modelOptions: ['azure-gpt-4o-sweden', 'azure-gpt-35-turbo'],
    latencyMs: 340,
    healthScore: 99,
    lastSync: '1 hour ago',
    usageTokens24h: '310K tokens',
    quotaPercent: 15,
    enabled: false,
    endpoint: 'https://mfs-growth-ai.openai.azure.com',
    apiKeyMasked: 'az-kv-************************55bb',
    maxTokens: 4096,
    temperature: 0.3
  },
  {
    id: 'prov-local',
    name: 'Local LLMs (Ollama / On-Prem)',
    slug: 'local-llm',
    iconColor: 'text-rose-400',
    badge: 'Zero Data Retention',
    status: 'standby',
    activeModel: 'ollama-llama3.3-70b-q4',
    modelOptions: ['ollama-llama3.3-70b-q4', 'ollama-deepseek-r1-32b', 'vllm-mistral-nemo'],
    latencyMs: 650,
    healthScore: 92,
    lastSync: '2 hours ago',
    usageTokens24h: '95K tokens',
    quotaPercent: 0,
    enabled: false,
    endpoint: 'http://127.0.0.1:11434/api',
    apiKeyMasked: 'LOCAL_ON_PREM_NO_KEY_REQUIRED',
    maxTokens: 8192,
    temperature: 0.2
  }
];

const INITIAL_ROUTING_RULES: AIRoutingRule[] = [
  {
    id: 'rule-chat',
    useCase: '24/7 Client Chat & Multi-Lingual Support',
    description: 'Direct response engine for customer support in English, Urdu, and Roman Urdu.',
    primaryProvider: 'Google AI Studio (Gemini)',
    fallbackProvider: 'OpenAI Enterprise API',
    priority: 1,
    latencyThresholdMs: 500,
    autoFallbackEnabled: true
  },
  {
    id: 'rule-pdf',
    useCase: 'Large PDF Briefs & Slide Outline Analysis',
    description: 'Requires 1M+ token context window to parse complex assignment research & slide decks.',
    primaryProvider: 'Google AI Studio (Gemini)',
    fallbackProvider: 'Anthropic Claude SDK',
    priority: 1,
    latencyThresholdMs: 800,
    autoFallbackEnabled: true
  },
  {
    id: 'rule-ocr',
    useCase: 'Payment Receipt OCR (EasyPaisa / JazzCash / Bank)',
    description: 'High precision vision analysis to verify transaction IDs and titles.',
    primaryProvider: 'Google AI Studio (Gemini)',
    fallbackProvider: 'OpenAI Enterprise API',
    priority: 1,
    latencyThresholdMs: 700,
    autoFallbackEnabled: true
  },
  {
    id: 'rule-writing',
    useCase: 'Academic Writing & Resume Formatting',
    description: 'Nuanced stylistic writing with strict APA/Harvard/MLA citation compliance.',
    primaryProvider: 'Anthropic Claude SDK',
    fallbackProvider: 'OpenAI Enterprise API',
    priority: 2,
    latencyThresholdMs: 600,
    autoFallbackEnabled: true
  },
  {
    id: 'rule-reasoning',
    useCase: 'Complex Pricing & Business Logic Calculations',
    description: 'Deterministic multi-factor discount & express speed calculations.',
    primaryProvider: 'OpenAI Enterprise API',
    fallbackProvider: 'DeepSeek AI Engine',
    priority: 2,
    latencyThresholdMs: 450,
    autoFallbackEnabled: true
  }
];

export const AIProvidersPanel: React.FC<AIProvidersPanelProps> = ({ onShowToast }) => {
  const [providers, setProviders] = useState<AIProviderItem[]>(INITIAL_PROVIDERS);
  const [routingRules, setRoutingRules] = useState<AIRoutingRule[]>(INITIAL_ROUTING_RULES);
  const [editingProvider, setEditingProvider] = useState<AIProviderItem | null>(null);
  const [activeTab, setActiveTab] = useState<'providers' | 'routing'>('providers');

  // Toggle Provider Active Status
  const handleToggleEnable = (id: string) => {
    setProviders(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextState = !p.enabled;
          if (onShowToast) {
            onShowToast(`${p.name} is now ${nextState ? 'ENABLED' : 'DISABLED'}`);
          }
          return {
            ...p,
            enabled: nextState,
            status: nextState ? 'connected' : 'disabled'
          };
        }
        return p;
      })
    );
  };

  // Change Model for Provider
  const handleModelChange = (id: string, newModel: string) => {
    setProviders(prev =>
      prev.map(p => {
        if (p.id === id) {
          if (onShowToast) {
            onShowToast(`Active model for ${p.name} set to ${newModel}`);
          }
          return { ...p, activeModel: newModel };
        }
        return p;
      })
    );
  };

  // Save Settings Modal Changes
  const handleSaveProviderSettings = () => {
    if (!editingProvider) return;
    setProviders(prev =>
      prev.map(p => (p.id === editingProvider.id ? editingProvider : p))
    );
    if (onShowToast) {
      onShowToast(`Encrypted credentials & settings saved for ${editingProvider.name}`);
    }
    setEditingProvider(null);
  };

  // Toggle Auto-Fallback for Routing Rule
  const handleToggleFallback = (ruleId: string) => {
    setRoutingRules(prev =>
      prev.map(r => {
        if (r.id === ruleId) {
          const next = !r.autoFallbackEnabled;
          if (onShowToast) {
            onShowToast(`Auto-fallback for "${r.useCase}" ${next ? 'enabled' : 'disabled'}`);
          }
          return { ...r, autoFallbackEnabled: next };
        }
        return r;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* MODULE NAVIGATION BAR */}
      <div className="p-4 rounded-3xl bg-[#0D0D12] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#E5C158]" />
          <div>
            <h2 className="font-poppins font-bold text-white text-base">AI Providers & Smart Routing Gateway</h2>
            <p className="text-xs text-neutral-400">Manage multi-LLM vendor APIs, API health, model endpoints, and intelligent failover routing.</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('providers')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'providers'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>AI Providers ({providers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('routing')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'routing'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Routing Rules ({routingRules.length})</span>
          </button>
        </div>
      </div>

      {/* TABS CONTENT */}
      {activeTab === 'providers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {providers.map(prov => (
            <div
              key={prov.id}
              className={`p-5 rounded-3xl bg-[#0D0D12] border transition-all shadow-xl space-y-4 relative overflow-hidden group ${
                prov.enabled
                  ? 'border-white/10 hover:border-[#E5C158]/50'
                  : 'border-white/5 opacity-60'
              }`}
            >
              {/* TOP HEADER */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Server className={`w-4 h-4 ${prov.iconColor}`} />
                    <strong className="text-white font-bold text-sm group-hover:text-[#E5C158] transition-colors">
                      {prov.name}
                    </strong>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-[#E5C158] font-mono text-[9px] font-bold border border-white/10">
                    {prov.badge}
                  </span>
                </div>

                {/* ENABLE TOGGLE SWITCH */}
                <button
                  onClick={() => handleToggleEnable(prov.id)}
                  title={prov.enabled ? 'Disable Provider' : 'Enable Provider'}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                    prov.enabled ? 'bg-[#28C76F]' : 'bg-neutral-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-black transition-transform ${
                      prov.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* ACTIVE MODEL SELECTOR */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-neutral-400 block uppercase font-bold">
                  Active Model Engine
                </label>
                <select
                  value={prov.activeModel}
                  disabled={!prov.enabled}
                  onChange={e => handleModelChange(prov.id, e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#E5C158] disabled:opacity-50 cursor-pointer"
                >
                  {prov.modelOptions.map(m => (
                    <option key={m} value={m} className="bg-[#0D0D12] font-mono">
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* METRICS ROW */}
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                  <span className="text-[9px] text-neutral-400 block">Health</span>
                  <strong className="text-emerald-400 font-bold">{prov.healthScore}%</strong>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                  <span className="text-[9px] text-neutral-400 block">Latency</span>
                  <strong className="text-purple-400 font-bold">{prov.latencyMs}ms</strong>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                  <span className="text-[9px] text-neutral-400 block">24h Volume</span>
                  <strong className="text-[#E5C158] font-bold text-[10px]">{prov.usageTokens24h}</strong>
                </div>
              </div>

              {/* QUOTA BAR */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>Quota Consumed:</span>
                  <strong className="text-white">{prov.quotaPercent}%</strong>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E5C158] to-[#28C76F] rounded-full"
                    style={{ width: `${prov.quotaPercent}%` }}
                  />
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span>Sync: {prov.lastSync}</span>
                </span>

                <button
                  onClick={() => setEditingProvider(prov)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold flex items-center gap-1.5 cursor-pointer transition-all border border-white/10"
                >
                  <Settings2 className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Settings & Key</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: AI ROUTING ENGINE */}
      {activeTab === 'routing' && (
        <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="space-y-1">
              <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#E5C158]" />
                <span>Smart Multi-LLM Routing Engine Rules</span>
              </h3>
              <p className="text-xs text-neutral-400">Define primary AI providers and automated fallback paths based on task type and latency thresholds.</p>
            </div>

            <button
              onClick={() => {
                if (onShowToast) onShowToast('New Routing Rule Modal (Frontend Shell Active)');
              }}
              className="px-3.5 py-2 rounded-xl bg-[#E5C158] hover:bg-[#d4af37] text-black font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Create Routing Rule</span>
            </button>
          </div>

          <div className="space-y-4">
            {routingRules.map(rule => (
              <div
                key={rule.id}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#E5C158]/40 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#E5C158]/20 text-[#E5C158] font-mono font-bold text-[10px]">
                        PRIORITY #{rule.priority}
                      </span>
                      <strong className="text-white font-bold text-sm">{rule.useCase}</strong>
                    </div>
                    <p className="text-xs text-neutral-400">{rule.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-neutral-400">
                      Threshold: <strong className="text-purple-400">{rule.latencyThresholdMs}ms</strong>
                    </span>

                    <button
                      onClick={() => handleToggleFallback(rule.id)}
                      className={`px-3 py-1 rounded-xl text-[10px] font-mono font-bold border cursor-pointer transition-all ${
                        rule.autoFallbackEnabled
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {rule.autoFallbackEnabled ? 'AUTO-FALLBACK ON' : 'FALLBACK OFF'}
                    </button>
                  </div>
                </div>

                {/* ROUTING FLOW CARDS */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 text-[10px] uppercase font-bold">Primary Target:</span>
                    <strong className="text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-1 rounded-lg border border-[#E5C158]/30">
                      {rule.primaryProvider}
                    </strong>
                  </div>

                  <ArrowRight className="w-4 h-4 text-neutral-500 hidden md:block" />

                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 text-[10px] uppercase font-bold">Fallback Target:</span>
                    <strong className="text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                      {rule.fallbackProvider}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ENCRYPTED CREDENTIAL & SETTINGS MODAL */}
      <AnimatePresence>
        {editingProvider && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl p-6 rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 space-y-5 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#E5C158]" />
                    <span>{editingProvider.name} Credentials & Settings</span>
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">AES-256 GCM Encrypted Vault Token Configuration</span>
                </div>

                <button
                  onClick={() => setEditingProvider(null)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* ENCRYPTED API KEY FIELD */}
                <div className="space-y-1">
                  <label className="text-neutral-300 font-mono font-bold flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Encrypted API Key Fingerprint</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={editingProvider.apiKeyMasked}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2.5 text-xs text-neutral-300 font-mono focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        if (onShowToast) onShowToast('API key rotation initiated (Secure Admin Vault)');
                      }}
                      className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold whitespace-nowrap cursor-pointer"
                    >
                      Rotate Key
                    </button>
                  </div>
                  <p className="text-[10px] text-neutral-500 font-mono">Keys are encrypted with server-side secrets and never exposed to browser context.</p>
                </div>

                {/* API ENDPOINT */}
                <div className="space-y-1">
                  <label className="text-neutral-300 font-mono font-bold block">Base API Endpoint URL</label>
                  <input
                    type="text"
                    value={editingProvider.endpoint}
                    onChange={e =>
                      setEditingProvider({ ...editingProvider, endpoint: e.target.value })
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                {/* TEMPERATURE & MAX TOKENS */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-neutral-300 font-mono font-bold block">Temperature ({editingProvider.temperature})</label>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={editingProvider.temperature}
                      onChange={e =>
                        setEditingProvider({ ...editingProvider, temperature: parseFloat(e.target.value) })
                      }
                      className="w-full accent-[#E5C158] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-mono font-bold block">Max Response Tokens</label>
                    <input
                      type="number"
                      value={editingProvider.maxTokens}
                      onChange={e =>
                        setEditingProvider({ ...editingProvider, maxTokens: parseInt(e.target.value) || 2048 })
                      }
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Vault Encryption Verified</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingProvider(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProviderSettings}
                    className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-bold text-xs hover:bg-[#d4af37] cursor-pointer shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
