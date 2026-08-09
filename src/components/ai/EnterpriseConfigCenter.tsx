import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sliders,
  Sparkles,
  Bot,
  UserCheck,
  Shield,
  Save,
  Cpu,
  Layers,
  Mic,
  Eye,
  Zap,
  Check,
  Settings,
  Globe,
  Lock,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

interface EnterpriseConfigCenterProps {
  onShowToast?: (msg: string) => void;
}

export const EnterpriseConfigCenter: React.FC<EnterpriseConfigCenterProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'client' | 'admin' | 'future'>('general');

  // General AI Settings
  const [defaultProvider, setDefaultProvider] = useState<string>('Google AI Studio (Gemini)');
  const [defaultModel, setDefaultModel] = useState<string>('gemini-1.5-flash-latest');
  const [temperature, setTemperature] = useState<number>(0.7);
  const [maxTokens, setMaxTokens] = useState<number>(2048);

  // Client AI Settings
  const [welcomeMessage, setWelcomeMessage] = useState<string>(
    'Assalam-o-Alaikum! Welcome to MFS Growth Agency. How can I help you today?'
  );
  const [aiPersonality, setAiPersonality] = useState<string>('Professional, Courteous, Helpful');
  const [clientAiEnabled, setClientAiEnabled] = useState<boolean>(true);

  // Admin AI Settings
  const [autoAnalysisEnabled, setAutoAnalysisEnabled] = useState<boolean>(true);
  const [strictPermissions, setStrictPermissions] = useState<boolean>(true);

  // Future Settings
  const [voiceAiEnabled, setVoiceAiEnabled] = useState<boolean>(true);
  const [visionAiEnabled, setVisionAiEnabled] = useState<boolean>(true);
  const [multiAgentCollab, setMultiAgentCollab] = useState<boolean>(true);

  const handleSaveSettings = () => {
    if (onShowToast) {
      onShowToast('Enterprise AI System Configurations saved successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER & TABS */}
      <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <h2 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#E5C158]" />
              <span>Enterprise AI System Configuration & Policy Engine</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Configure global default LLM engines, client widget behaviors, admin AI privileges, and future capabilities.
            </p>
          </div>

          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 rounded-xl bg-[#E5C158] hover:bg-[#d4af37] text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </button>
        </div>

        {/* SUB TABS */}
        <div className="flex flex-wrap items-center gap-2 p-1 rounded-2xl bg-black border border-white/10">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'general' ? 'bg-[#E5C158] text-black shadow-lg' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>General AI Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('client')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'client' ? 'bg-[#E5C158] text-black shadow-lg' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Client AI & Widget</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'admin' ? 'bg-[#E5C158] text-black shadow-lg' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin AI & Security</span>
          </button>

          <button
            onClick={() => setActiveTab('future')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'future' ? 'bg-[#E5C158] text-black shadow-lg' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Future Capabilities</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT: GENERAL AI */}
      {activeTab === 'general' && (
        <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-6 shadow-xl font-mono text-xs">
          <h3 className="font-poppins font-bold text-white text-base flex items-center gap-2 border-b border-white/10 pb-3">
            <Cpu className="w-4 h-4 text-[#E5C158]" />
            <span>Global Default LLM Provider & Hyperparameters</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-neutral-300 font-bold block">Primary AI Provider Platform</label>
              <select
                value={defaultProvider}
                onChange={e => setDefaultProvider(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] cursor-pointer"
              >
                <option value="Google AI Studio (Gemini)" className="bg-[#0D0D12]">Google AI Studio (Gemini 1.5)</option>
                <option value="OpenAI API" className="bg-[#0D0D12]">OpenAI API (GPT-4o / GPT-4o-mini)</option>
                <option value="Anthropic API" className="bg-[#0D0D12]">Anthropic Claude API</option>
                <option value="DeepSeek API" className="bg-[#0D0D12]">DeepSeek Reasoning API</option>
                <option value="Local Ollama Edge" className="bg-[#0D0D12]">Local Ollama Edge Server</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-neutral-300 font-bold block">Default Production Model Alias</label>
              <input
                type="text"
                value={defaultModel}
                onChange={e => setDefaultModel(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-neutral-300 font-bold">Temperature (Creativity): {temperature}</label>
                <span className="text-[10px] text-neutral-400">0.0 (Strict) - 1.0 (Creative)</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-[#E5C158] cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-neutral-300 font-bold block">Max Completion Tokens Per Call</label>
              <input
                type="number"
                value={maxTokens}
                onChange={e => setMaxTokens(parseInt(e.target.value) || 1024)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CLIENT AI */}
      {activeTab === 'client' && (
        <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-6 shadow-xl font-mono text-xs">
          <h3 className="font-poppins font-bold text-white text-base flex items-center gap-2 border-b border-white/10 pb-3">
            <Bot className="w-4 h-4 text-[#E5C158]" />
            <span>Public Client AI Widget & Multi-Language Settings</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <div>
                <strong className="text-white block font-bold text-xs">Public AI Widget Status</strong>
                <span className="text-neutral-400 text-[10px]">Enable floating Chat AI & Voice AI on homepage & client dashboard</span>
              </div>
              <input
                type="checkbox"
                checked={clientAiEnabled}
                onChange={e => setClientAiEnabled(e.target.checked)}
                className="w-5 h-5 accent-[#E5C158] cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-neutral-300 font-bold block">Default Welcome Greeting (Multilingual Auto-Detect)</label>
              <textarea
                value={welcomeMessage}
                onChange={e => setWelcomeMessage(e.target.value)}
                rows={3}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-[#E5C158] leading-relaxed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-neutral-300 font-bold block">AI Personality & Persona Directives</label>
              <input
                type="text"
                value={aiPersonality}
                onChange={e => setAiPersonality(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ADMIN AI */}
      {activeTab === 'admin' && (
        <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-6 shadow-xl font-mono text-xs">
          <h3 className="font-poppins font-bold text-white text-base flex items-center gap-2 border-b border-white/10 pb-3">
            <Shield className="w-4 h-4 text-[#E5C158]" />
            <span>Admin Dashboard AI Privileges & Governance</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <div>
                <strong className="text-white block font-bold text-xs">Automated Financial & Order Analysis</strong>
                <span className="text-neutral-400 text-[10px]">AI auto-scans new order attachments and flags urgent delivery dates</span>
              </div>
              <input
                type="checkbox"
                checked={autoAnalysisEnabled}
                onChange={e => setAutoAnalysisEnabled(e.target.checked)}
                className="w-5 h-5 accent-[#E5C158] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <div>
                <strong className="text-white block font-bold text-xs">Strict Role-Based AI Governance</strong>
                <span className="text-neutral-400 text-[10px]">Restrict prompt modification & API key exposure strictly to Master Admins</span>
              </div>
              <input
                type="checkbox"
                checked={strictPermissions}
                onChange={e => setStrictPermissions(e.target.checked)}
                className="w-5 h-5 accent-[#E5C158] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: FUTURE SETTINGS */}
      {activeTab === 'future' && (
        <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-6 shadow-xl font-mono text-xs">
          <h3 className="font-poppins font-bold text-white text-base flex items-center gap-2 border-b border-white/10 pb-3">
            <Sparkles className="w-4 h-4 text-[#E5C158]" />
            <span>Next-Gen AI Capabilities & Multimodal Toggles</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <Mic className="w-5 h-5 text-[#E5C158]" />
                <input
                  type="checkbox"
                  checked={voiceAiEnabled}
                  onChange={e => setVoiceAiEnabled(e.target.checked)}
                  className="w-5 h-5 accent-[#E5C158] cursor-pointer"
                />
              </div>
              <strong className="text-white block font-bold text-xs">Voice AI Assistant</strong>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                WebSpeech Speech-to-Text & Text-to-Speech audio synthesis pipeline.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <Eye className="w-5 h-5 text-teal-400" />
                <input
                  type="checkbox"
                  checked={visionAiEnabled}
                  onChange={e => setVisionAiEnabled(e.target.checked)}
                  className="w-5 h-5 accent-[#E5C158] cursor-pointer"
                />
              </div>
              <strong className="text-white block font-bold text-xs">Vision & OCR AI</strong>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                Extract text & design layout structure from uploaded sample PDFs and images.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <Layers className="w-5 h-5 text-purple-400" />
                <input
                  type="checkbox"
                  checked={multiAgentCollab}
                  onChange={e => setMultiAgentCollab(e.target.checked)}
                  className="w-5 h-5 accent-[#E5C158] cursor-pointer"
                />
              </div>
              <strong className="text-white block font-bold text-xs">Multi-Agent Swarm</strong>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                Autonomous agent-to-agent collaboration for complex assignment research.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
