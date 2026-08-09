import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BrainCircuit,
  Database,
  Layers,
  Cpu,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  Zap,
  Terminal,
  Shield,
  Filter,
  FileCode,
  FileText,
  Activity,
  Server
} from 'lucide-react';

interface ContextPipelineVisualizerProps {
  onShowToast?: (msg: string) => void;
}

export const ContextPipelineVisualizer: React.FC<ContextPipelineVisualizerProps> = ({ onShowToast }) => {
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [activeStep, setActiveStep] = useState<number>(2);
  const [testQuery, setTestQuery] = useState<string>('Assalam-o-Alaikum! Slide count per 10 slides pricing for Pitch Deck kya hai?');

  const pipelineSteps = [
    {
      step: 1,
      title: 'Knowledge Base & RAG Retrieval',
      icon: Database,
      iconColor: 'text-[#E5C158]',
      details: 'Searches Supabase pgvector embeddings for top-K relevant chunks matching user query intent.',
      outputSnippet: 'Found 3 vector chunks in "MFS_Presentation_Design_SOP_v2.pdf" (Similarity: 0.94)'
    },
    {
      step: 2,
      title: 'Context Builder Engine',
      icon: Layers,
      iconColor: 'text-purple-400',
      details: 'Assembles System Prompt (v2.1.0) + Retrieved RAG Chunks + Live PKR/USD Rates + Session History.',
      outputSnippet: 'Context payload generated: 1,420 tokens (System: 600, RAG: 520, History: 300)'
    },
    {
      step: 3,
      title: 'AI Provider Router',
      icon: Cpu,
      iconColor: 'text-emerald-400',
      details: 'Evaluates task latency threshold (<500ms) and routes query to primary target engine.',
      outputSnippet: 'Routed to Google AI Studio (Gemini 1.5 Flash) • Fallback target: OpenAI GPT-4o'
    },
    {
      step: 4,
      title: 'Response Generator & Guardrails',
      icon: Sparkles,
      iconColor: 'text-teal-400',
      details: 'Executes inference, applies 50% Grand Launch promo rules, and formats output in user language.',
      outputSnippet: 'Final response emitted in 340ms with 99.4% confidence rating.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* ENTERPRISE CROSS-SEARCH HEADER */}
      <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-2xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 font-mono text-[10px] font-bold uppercase">
            <Search className="w-3 h-3" />
            <span>Universal AI Control Center Search</span>
          </div>
          <h2 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-[#E5C158]" />
            <span>Enterprise Cross-Module AI Search & Context Visualizer</span>
          </h2>
          <p className="text-xs text-neutral-400">
            Unified search index across Prompts, Knowledge Files, Execution Logs, and Provider Configurations.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4.5 h-4.5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearch}
            onChange={e => setGlobalSearch(e.target.value)}
            placeholder="Search across all prompts, SOP knowledge files, AI logs, and LLM provider nodes..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] font-mono"
          />
        </div>

        {globalSearch.trim() && (
          <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-2 text-xs font-mono">
            <span className="text-[#E5C158] font-bold block">Search Results for "{globalSearch}":</span>
            <div className="space-y-1 text-neutral-300">
              <div className="flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-blue-400" />
                <span>Prompt Match: <strong>MFS_CHAT_VOICE_ASSISTANT_CORE (v2.1.0)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Knowledge Base Match: <strong>MFS_Presentation_Design_SOP_v2.pdf</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-purple-400" />
                <span>Provider Node Match: <strong>Google AI Studio (Gemini 1.5 Flash)</strong></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RAG CONTEXT INJECTION PIPELINE WORKFLOW */}
      <div className="p-6 rounded-3xl bg-[#0D0D12] border border-[#E5C158]/40 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#E5C158]" />
              <span>AI Context Injection & RAG Execution Pipeline</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Visual trace showing how knowledge is retrieved, combined with system prompts, and injected into the target AI model.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveStep((activeStep % 4) + 1);
              if (onShowToast) onShowToast(`Simulating Pipeline Step ${activeStep}`);
            }}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#E5C158] font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-[#E5C158]/30"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Step Through Pipeline</span>
          </button>
        </div>

        {/* PIPELINE CARDS STEP BY STEP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {pipelineSteps.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = activeStep === s.step;
            return (
              <div
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 relative ${
                  isCurrent
                    ? 'bg-[#E5C158]/10 border-[#E5C158] shadow-[0_0_20px_rgba(229,193,88,0.2)]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-white font-mono text-[10px] font-bold">
                    STEP #{s.step}
                  </span>
                  <Icon className={`w-5 h-5 ${s.iconColor}`} />
                </div>

                <strong className="text-white font-bold text-xs block leading-tight">
                  {s.title}
                </strong>

                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {s.details}
                </p>

                <div className="p-2 rounded-xl bg-black border border-white/5 font-mono text-[10px] text-emerald-400">
                  {s.outputSnippet}
                </div>
              </div>
            );
          })}
        </div>

        {/* TRACE SIMULATION CONSOLE */}
        <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-neutral-400 border-b border-white/10 pb-2">
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <strong className="text-white">Active RAG Trace Console</strong>
            </span>
            <span className="text-emerald-400 font-bold">Status: 200 OK (340ms)</span>
          </div>

          <p className="text-neutral-300">
            <span className="text-[#E5C158] font-bold">[QUERY]:</span> "{testQuery}"
          </p>
          <p className="text-teal-400">
            <span className="text-purple-400 font-bold">[PAYLOAD]:</span> RAG Vector Match + MFS_CHAT_VOICE_ASSISTANT_CORE v2.1.0 + Gemini 1.5 Flash
          </p>
          <p className="text-emerald-400">
            <span className="text-blue-400 font-bold">[OUTPUT]:</span> "Presentation Design service starts at PKR 3,000 per 10 slides under our 50% Grand Launch Offer."
          </p>
        </div>
      </div>
    </div>
  );
};
