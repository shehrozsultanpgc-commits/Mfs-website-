import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Zap,
  Activity,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  SlidersHorizontal,
  Play,
  Pause,
  RefreshCw,
  Settings2,
  Terminal,
  FileText,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  BrainCircuit,
  MessageSquare,
  Users,
  DollarSign,
  FileSearch,
  PenTool,
  SearchCheck,
  TrendingUp,
  Server,
  Globe,
  Radio,
  Sliders,
  Eye,
  SlidersVertical,
  Wrench,
  BarChart2,
  Database,
  ArrowUpRight,
  Send,
  AlertCircle
} from 'lucide-react';
import { Currency } from '../types';
import { AIProvidersPanel } from './ai/AIProvidersPanel';
import { PromptRegistryPanel } from './ai/PromptRegistryPanel';
import { KnowledgeEnginePanel } from './ai/KnowledgeEnginePanel';
import { ContextPipelineVisualizer } from './ai/ContextPipelineVisualizer';
import { AIGuardrailSecurityPanel } from './ai/AIGuardrailSecurityPanel';
import { AuditTrailGovernancePanel } from './ai/AuditTrailGovernancePanel';
import { SystemHealthDashboard } from './ai/SystemHealthDashboard';
import { EnterpriseConfigCenter } from './ai/EnterpriseConfigCenter';
import { FutureExpansionZone } from './ai/FutureExpansionZone';

interface AIControlCenterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
  onNavigateTab?: (tab: string) => void;
}

// ---------------------------------------------------------------------------
// TYPES & DATA STRUCTURES FOR ENTERPRISE AI ARCHITECTURE
// ---------------------------------------------------------------------------

export interface AIAgent {
  id: string;
  name: string;
  category: 'Support' | 'Operations' | 'Sales & Finance' | 'Content & Creative' | 'Analytics';
  description: string;
  status: 'active' | 'standby' | 'training' | 'paused' | 'degraded';
  healthScore: number; // 0 - 100
  uptimePercent: number;
  lastActivity: string;
  requests24h: number;
  avgLatencyMs: number;
  modelEngine: string;
  primaryCapability: string;
}

export interface AIActivityEvent {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  type: 'completed' | 'failed' | 'warning' | 'system';
  title: string;
  details: string;
  latencyMs?: number;
}

export interface AIProviderIntegration {
  id: string;
  provider: string;
  badge: string;
  status: 'connected' | 'configured' | 'standby' | 'planned';
  version: string;
  description: string;
  primaryRole: string;
  iconColor: string;
}

// SAMPLE AGENTS LIST
const INITIAL_AGENTS: AIAgent[] = [
  {
    id: 'agent-cs',
    name: 'Customer Support AI',
    category: 'Support',
    description: 'Dual Voice & Chat AI agent providing 24/7 client query responses in English, Urdu, and Roman Urdu.',
    status: 'active',
    healthScore: 99,
    uptimePercent: 99.9,
    lastActivity: '2 mins ago',
    requests24h: 1240,
    avgLatencyMs: 380,
    modelEngine: 'Google Gemini 1.5 Pro / Flash',
    primaryCapability: 'Multi-lingual FAQ & Order Support'
  },
  {
    id: 'agent-pm',
    name: 'Project Manager AI',
    category: 'Operations',
    description: 'Auto-allocates client projects to internal specialists based on workload, deadlines, and expertise.',
    status: 'active',
    healthScore: 97,
    uptimePercent: 99.8,
    lastActivity: '12 mins ago',
    requests24h: 310,
    avgLatencyMs: 420,
    modelEngine: 'Gemini 1.5 Pro',
    primaryCapability: 'Task Dispatch & Deadline Tracking'
  },
  {
    id: 'agent-sales',
    name: 'Sales & Lead Converter AI',
    category: 'Sales & Finance',
    description: 'Engages prospective clients, calculates live service estimates with 50% discount, and qualifies high-value leads.',
    status: 'active',
    healthScore: 98,
    uptimePercent: 99.7,
    lastActivity: '5 mins ago',
    requests24h: 890,
    avgLatencyMs: 350,
    modelEngine: 'Gemini Flash 1.5',
    primaryCapability: 'Instant Quoting & Discount Pitching'
  },
  {
    id: 'agent-pay',
    name: 'Payment Assistant AI',
    category: 'Sales & Finance',
    description: 'Optical Character Recognition (OCR) and transaction verification engine for EasyPaisa, JazzCash, and Askari Bank slips.',
    status: 'active',
    healthScore: 96,
    uptimePercent: 99.5,
    lastActivity: '1 min ago',
    requests24h: 412,
    avgLatencyMs: 610,
    modelEngine: 'Gemini Vision 1.5',
    primaryCapability: 'Payment Proof OCR & Fraud Audit'
  },
  {
    id: 'agent-req',
    name: 'Requirement Analyzer AI',
    category: 'Operations',
    description: 'Deeply parses client assignment briefs, PowerPoint slide outlines, and research notes to extract citation styles and scope.',
    status: 'standby',
    healthScore: 95,
    uptimePercent: 99.4,
    lastActivity: '28 mins ago',
    requests24h: 185,
    avgLatencyMs: 540,
    modelEngine: 'Gemini 1.5 Pro',
    primaryCapability: 'Academic & Pitch Deck Brief Parsing'
  },
  {
    id: 'agent-writer',
    name: 'Content & Research Writer AI',
    category: 'Content & Creative',
    description: 'Assists staff writers with research structures, document formatting guidelines, and ATS resume keyword mappings.',
    status: 'active',
    healthScore: 98,
    uptimePercent: 99.9,
    lastActivity: '8 mins ago',
    requests24h: 620,
    avgLatencyMs: 490,
    modelEngine: 'Gemini 1.5 Pro',
    primaryCapability: 'Structural Outlining & ATS Engineering'
  },
  {
    id: 'agent-seo',
    name: 'SEO & Meta Optimization AI',
    category: 'Content & Creative',
    description: 'Generates optimized meta titles, descriptions, and keyword clusters for agency service pages and blog releases.',
    status: 'standby',
    healthScore: 92,
    uptimePercent: 98.9,
    lastActivity: '1 hour ago',
    requests24h: 94,
    avgLatencyMs: 310,
    modelEngine: 'Gemini Flash',
    primaryCapability: 'Meta Generation & Search Rank Tuning'
  },
  {
    id: 'agent-mkt',
    name: 'Marketing Assistant AI',
    category: 'Content & Creative',
    description: 'Drafts Instagram captions, Facebook promo announcements, and email campaign copys for agency promotions.',
    status: 'paused',
    healthScore: 90,
    uptimePercent: 98.2,
    lastActivity: '3 hours ago',
    requests24h: 42,
    avgLatencyMs: 290,
    modelEngine: 'Gemini Flash',
    primaryCapability: 'Social Campaign & Email Drafting'
  },
  {
    id: 'agent-analytics',
    name: 'Analytics AI',
    category: 'Analytics',
    description: 'Analyzes financial revenue trends, predicts client churn, and suggests pricing adjustments for maximum yield.',
    status: 'active',
    healthScore: 100,
    uptimePercent: 100.0,
    lastActivity: '15 mins ago',
    requests24h: 215,
    avgLatencyMs: 680,
    modelEngine: 'Gemini 1.5 Pro Analytics Engine',
    primaryCapability: 'Predictive Yield & Churn Forecasting'
  },
  {
    id: 'agent-uiux',
    name: 'UI/UX Consultant AI',
    category: 'Content & Creative',
    description: 'Audits presentation slide layouts, typography hierarchy, and visual color contrast for executive client decks.',
    status: 'active',
    healthScore: 96,
    uptimePercent: 99.6,
    lastActivity: '20 mins ago',
    requests24h: 180,
    avgLatencyMs: 340,
    modelEngine: 'Gemini 1.5 Vision Pro',
    primaryCapability: 'Slide Design Audit & Color Pairing'
  },
  {
    id: 'agent-dev',
    name: 'Web Developer AI',
    category: 'Operations',
    description: 'Generates custom component code, inspects client web portal requests, and verifies API payload structures.',
    status: 'active',
    healthScore: 98,
    uptimePercent: 99.9,
    lastActivity: '4 mins ago',
    requests24h: 410,
    avgLatencyMs: 290,
    modelEngine: 'DeepSeek-V3 / Gemini Pro',
    primaryCapability: 'Full-Stack Code Generation & Refactoring'
  },
  {
    id: 'agent-copy',
    name: 'Copywriting AI',
    category: 'Content & Creative',
    description: 'Crafts high-converting ATS resume headlines, pitch deck elevator copy, and persuasive call-to-actions.',
    status: 'active',
    healthScore: 97,
    uptimePercent: 99.5,
    lastActivity: '10 mins ago',
    requests24h: 530,
    avgLatencyMs: 310,
    modelEngine: 'Gemini 1.5 Pro',
    primaryCapability: 'Conversion Copywriting & ATS Positioning'
  },
  {
    id: 'agent-finance',
    name: 'Finance AI',
    category: 'Sales & Finance',
    description: 'Reconciles EasyPaisa, JazzCash, and Askari Bank ledger balances and tracks 50% Grand Launch promo margins.',
    status: 'active',
    healthScore: 99,
    uptimePercent: 100.0,
    lastActivity: '3 mins ago',
    requests24h: 320,
    avgLatencyMs: 220,
    modelEngine: 'Gemini 1.5 Pro',
    primaryCapability: 'Automated Bank Ledger Reconciliation'
  }
];

// SAMPLE ACTIVITY EVENTS
const INITIAL_EVENTS: AIActivityEvent[] = [
  {
    id: 'EVT-901',
    timestamp: '11:28:14 AM',
    agentId: 'agent-pay',
    agentName: 'Payment Assistant AI',
    type: 'completed',
    title: 'Payment Verification OCR Passed',
    details: 'Verified EasyPaisa screenshot #TXN-908241 for Order #MFS-8912 with 99.2% match confidence.',
    latencyMs: 580
  },
  {
    id: 'EVT-902',
    timestamp: '11:24:02 AM',
    agentId: 'agent-cs',
    agentName: 'Customer Support AI',
    type: 'completed',
    title: 'Roman Urdu Query Answered',
    details: 'Responded to client inquiry regarding "Assignment delivery timeline" in Roman Urdu.',
    latencyMs: 340
  },
  {
    id: 'EVT-903',
    timestamp: '11:18:45 AM',
    agentId: 'agent-req',
    agentName: 'Requirement Analyzer AI',
    type: 'completed',
    title: 'APA 7th Brief Structural Extraction',
    details: 'Extracted 15 references and word count requirement (3,500 words) for Project #PRJ-402.',
    latencyMs: 620
  },
  {
    id: 'EVT-904',
    timestamp: '11:05:12 AM',
    agentId: 'agent-pay',
    agentName: 'Payment Assistant AI',
    type: 'warning',
    title: 'Low Contrast Slip Verification Flag',
    details: 'Askari Bank transfer receipt image had dark background. Flagged for manual admin sign-off.',
    latencyMs: 810
  },
  {
    id: 'EVT-905',
    timestamp: '10:42:30 AM',
    agentId: 'agent-analytics',
    agentName: 'Analytics AI',
    type: 'system',
    title: 'Q3 Financial Forecast Model Updated',
    details: 'Re-indexed 216 historical order records to project +32% Q4 academic revenue growth.',
    latencyMs: 1200
  },
  {
    id: 'EVT-906',
    timestamp: '10:15:00 AM',
    agentId: 'agent-mkt',
    agentName: 'Marketing Assistant AI',
    type: 'failed',
    title: 'Agent State Paused by Admin',
    details: 'Agent manually paused by Shehroz Sultan for schedule maintenance.',
    latencyMs: 0
  }
];

// FUTURE AI PROVIDER INTEGRATIONS (ARCHITECTURE)
const PROVIDER_INTEGRATIONS: AIProviderIntegration[] = [
  {
    id: 'prov-gemini',
    provider: 'Google Gemini SDK',
    badge: 'Primary Engine',
    status: 'connected',
    version: 'v1.5 Pro / Flash',
    description: 'Official Google GenAI SDK used for multimodal processing, chat, vision OCR, and structured JSON.',
    primaryRole: 'Core Platform AI & Multimodal Reasoning',
    iconColor: 'text-[#E5C158]'
  },
  {
    id: 'prov-openai',
    provider: 'OpenAI Enterprise API',
    badge: 'Secondary Fallback',
    status: 'configured',
    version: 'GPT-4o / o3-mini',
    description: 'High-throughput text completion and reasoning engine prepared for fallback failover.',
    primaryRole: 'Complex Logic & Coding Failover',
    iconColor: 'text-emerald-400'
  },
  {
    id: 'prov-claude',
    provider: 'Anthropic Claude SDK',
    badge: 'Editorial Engine',
    status: 'configured',
    version: 'Claude 3.5 Sonnet',
    description: 'Nuanced long-context writing and academic citation formatting engine.',
    primaryRole: 'Deep Research & Long-form Reports',
    iconColor: 'text-purple-400'
  },
  {
    id: 'prov-local',
    provider: 'Local AI / Ollama Bridge',
    badge: 'Private Server',
    status: 'standby',
    version: 'DeepSeek R1 / Llama 3',
    description: 'On-premise zero-data-retention AI model container for sensitive client documents.',
    primaryRole: 'Private On-Premise Audit & Compliance',
    iconColor: 'text-blue-400'
  },
  {
    id: 'prov-mcp',
    provider: 'MCP Tools Protocol',
    badge: 'Agentic Tools',
    status: 'planned',
    version: 'Model Context Protocol v1.0',
    description: 'Standardized agent protocol connecting AI Control Center to database, storage, and external APIs.',
    primaryRole: 'Universal Agentic Tool Calls',
    iconColor: 'text-rose-400'
  },
  {
    id: 'prov-automation',
    provider: 'Workflow Webhook Engine',
    badge: 'Automation',
    status: 'connected',
    version: 'N8N / Zapier Bridge',
    description: 'Real-time event dispatcher triggering automated client WhatsApp and email notifications.',
    primaryRole: 'Autonomous Multi-step Workflows',
    iconColor: 'text-amber-400'
  }
];

export const AIControlCenter: React.FC<AIControlCenterProps> = ({
  currency,
  onShowToast,
  onNavigateTab
}) => {
  // Navigation Sub-Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'overview' | 'providers' | 'prompts' | 'knowledge' | 'pipeline' | 'agents' | 'guardrails' | 'audit' | 'health' | 'config' | 'expansion' | 'activity' | 'testing'
  >('overview');

  // Agents State
  const [agents, setAgents] = useState<AIAgent[]>(INITIAL_AGENTS);
  const [events, setEvents] = useState<AIActivityEvent[]>(INITIAL_EVENTS);

  // Search and Filters State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');
  const [selectedActivityType, setSelectedActivityType] = useState<string>('All Events');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Testing Playground State (Frontend Architectural Preview)
  const [selectedTestingAgent, setSelectedTestingAgent] = useState<string>('agent-cs');
  const [testPromptInput, setTestPromptInput] = useState<string>('Assalam-o-Alaikum! Mujhe Presentation Design Service ki pricing aur deadline batadein.');
  const [testResponseOutput, setTestResponseOutput] = useState<string>('');
  const [isSimulatingTest, setIsSimulatingTest] = useState<boolean>(false);

  // Modal / Inspector State
  const [inspectingAgent, setInspectingAgent] = useState<AIAgent | null>(null);

  // KPI calculations
  const kpis = useMemo(() => {
    const totalAgents = agents.length;
    const activeAgents = agents.filter(a => a.status === 'active').length;
    const totalRequests = agents.reduce((acc, a) => acc + a.requests24h, 0);
    const avgResponseTime = Math.round(agents.reduce((acc, a) => acc + a.avgLatencyMs, 0) / totalAgents);
    const successRate = 99.4;
    const pendingTasks = 14;
    const failedTasks24h = 3;
    const automationReadinessScore = 96;

    return {
      servicesStatus: 'Operational',
      totalAgents,
      activeAgents,
      totalRequests,
      avgResponseTime,
      successRate,
      pendingTasks,
      failedTasks24h,
      automationReadinessScore
    };
  }, [agents]);

  // Filtered Agents
  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.primaryCapability.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All Categories' || agent.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'All Statuses' || agent.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [agents, searchQuery, selectedCategory, selectedStatus]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.agentName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedActivityType === 'All Events' || evt.type === selectedActivityType;

      return matchesSearch && matchesType;
    });
  }, [events, searchQuery, selectedActivityType]);

  // Handlers for Quick Actions
  const handleTogglePauseAgent = (agentId: string) => {
    setAgents((prev) =>
      prev.map((agent) => {
        if (agent.id === agentId) {
          const newStatus = agent.status === 'paused' ? 'active' : 'paused';
          if (onShowToast) {
            onShowToast(`${agent.name} is now ${newStatus.toUpperCase()}`);
          }
          return { ...agent, status: newStatus };
        }
        return agent;
      })
    );
  };

  const handleSimulateTestPrompt = () => {
    if (!testPromptInput.trim()) {
      if (onShowToast) onShowToast('Please enter a test prompt first');
      return;
    }

    setIsSimulatingTest(true);
    setTestResponseOutput('');

    setTimeout(() => {
      setIsSimulatingTest(false);
      const activeAgent = agents.find(a => a.id === selectedTestingAgent);
      const mockReply = `[MFS AI CONTROL CENTER PREVIEW - ${activeAgent?.name.toUpperCase()}]\n\n` +
        `Assalam-o-Alaikum! Welcome to MFS Growth Agency. Our Presentation Design service starts at PKR 3,000 per 10 slides under our active 50% Grand Launch Offer.\n\n` +
        `• Standard Turnaround: 24-48 Hours\n` +
        `• Express Options: Same-Day (+75%) & Priority (+50%) available\n\n` +
        `Would you like to review sample pitch decks under "Our Work" or calculate a live estimate?`;
      
      setTestResponseOutput(mockReply);
      if (onShowToast) onShowToast(`Test prompt processed successfully by ${activeAgent?.name}`);
    }, 700);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER & PHASE 14 BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] border border-[#E5C158]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] font-mono text-xs font-bold uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Admin Dashboard v2.0 • Phase 14</span>
          </div>
          <h1 className="font-poppins font-black text-2xl lg:text-3xl text-white tracking-tight flex items-center gap-3">
            AI Control Center & Orchestration
          </h1>
          <p className="text-xs text-neutral-400 max-w-2xl">
            Centralized command hub for multi-provider AI agents, automated workflow orchestration, real-time agent health monitoring, and enterprise prompt testing.
          </p>
        </div>

        {/* TOP LEVEL NAVIGATION SUB-TABS */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/10 z-10">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'overview'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveSubTab('providers')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'providers'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>AI Providers & Routing</span>
          </button>

          <button
            onClick={() => setActiveSubTab('prompts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'prompts'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Prompt Registry</span>
          </button>

          <button
            onClick={() => setActiveSubTab('knowledge')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'knowledge'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-teal-400" />
            <span>Knowledge Base</span>
          </button>

          <button
            onClick={() => setActiveSubTab('pipeline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'pipeline'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Context Pipeline</span>
          </button>

          <button
            onClick={() => setActiveSubTab('agents')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'agents'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>AI Fleet ({agents.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('guardrails')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'guardrails'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
            <span>Guardrails & Cyber Security</span>
          </button>

          <button
            onClick={() => setActiveSubTab('audit')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'audit'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Audit Trail</span>
          </button>

          <button
            onClick={() => setActiveSubTab('health')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'health'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>System Health</span>
          </button>

          <button
            onClick={() => setActiveSubTab('config')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'config'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Config & Policy</span>
          </button>

          <button
            onClick={() => setActiveSubTab('expansion')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'expansion'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Future Expansion</span>
          </button>

          <button
            onClick={() => setActiveSubTab('activity')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'activity'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Logs & Feed</span>
          </button>

          <button
            onClick={() => setActiveSubTab('testing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'testing'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Playground</span>
          </button>
        </div>
      </div>

      {/* EXECUTIVE AI OVERVIEW KPI CARDS (8 REUSABLE METRIC CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* KPI 1: AI SERVICES STATUS */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-emerald-500/40 space-y-1 hover:border-emerald-500 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">Services Status</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="font-poppins font-black text-base text-white">{kpis.servicesStatus}</div>
          <span className="text-[9px] text-emerald-400 font-mono font-bold">All Gateway Nodes Live</span>
        </div>

        {/* KPI 2: ACTIVE AI AGENTS */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-[#E5C158]/40 space-y-1 hover:border-[#E5C158] transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-[#E5C158] block">Active Agents</span>
          <div className="font-poppins font-black text-lg text-white">
            {kpis.activeAgents} <span className="text-xs text-neutral-400 font-normal">/ {kpis.totalAgents}</span>
          </div>
          <span className="text-[9px] text-neutral-400 font-mono">Specialized Bots</span>
        </div>

        {/* KPI 3: TOTAL REQUESTS (24H) */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-blue-500/30 space-y-1 hover:border-blue-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-blue-400 block">24h AI Requests</span>
          <div className="font-poppins font-black text-base text-blue-400">{kpis.totalRequests.toLocaleString()}</div>
          <span className="text-[9px] text-neutral-500 font-mono">+12% vs yesterday</span>
        </div>

        {/* KPI 4: AI SUCCESS RATE */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-teal-500/30 space-y-1 hover:border-teal-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-teal-400 block">Success Rate</span>
          <div className="font-poppins font-black text-base text-teal-400">{kpis.successRate}%</div>
          <span className="text-[9px] text-neutral-500 font-mono">SLA Guarantee</span>
        </div>

        {/* KPI 5: PENDING AI TASKS */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-amber-500/30 space-y-1 hover:border-amber-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block">Pending Queue</span>
          <div className="font-poppins font-black text-base text-amber-400">{kpis.pendingTasks}</div>
          <span className="text-[9px] text-neutral-500 font-mono">Tasks Processing</span>
        </div>

        {/* KPI 6: FAILED AI TASKS */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-rose-500/30 space-y-1 hover:border-rose-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-rose-400 block">Failed Tasks</span>
          <div className="font-poppins font-black text-base text-rose-400">{kpis.failedTasks24h}</div>
          <span className="text-[9px] text-neutral-500 font-mono">Auto-retried</span>
        </div>

        {/* KPI 7: AVG RESPONSE TIME */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-purple-500/30 space-y-1 hover:border-purple-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-purple-400 block">Avg Response</span>
          <div className="font-poppins font-black text-base text-purple-400">{kpis.avgLatencyMs} ms</div>
          <span className="text-[9px] text-neutral-500 font-mono">Ultra-fast response</span>
        </div>

        {/* KPI 8: AUTOMATION READINESS */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-[#E5C158]/30 space-y-1 hover:border-[#E5C158] transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-[#E5C158] block">Automation Score</span>
          <div className="font-poppins font-black text-base text-[#E5C158]">{kpis.automationReadinessScore} / 100</div>
          <span className="text-[9px] text-emerald-400 font-mono font-bold">Enterprise Tier</span>
        </div>
      </div>

      {/* GLOBAL SEARCH & FILTERS BAR */}
      <div className="p-4 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-3 shadow-xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* SEARCH INPUT */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI agents by name, capability, or prompt description..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          {/* QUICK DROPDOWN FILTERS */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#E5C158] cursor-pointer"
            >
              <option value="All Categories" className="bg-[#0D0D12]">All Categories</option>
              <option value="Support" className="bg-[#0D0D12]">Customer Support</option>
              <option value="Operations" className="bg-[#0D0D12]">Operations & Tasks</option>
              <option value="Sales & Finance" className="bg-[#0D0D12]">Sales & Finance</option>
              <option value="Content & Creative" className="bg-[#0D0D12]">Content & Creative</option>
              <option value="Analytics" className="bg-[#0D0D12]">Analytics & BI</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#E5C158] cursor-pointer"
            >
              <option value="All Statuses" className="bg-[#0D0D12]">All Agent Statuses</option>
              <option value="active" className="bg-[#0D0D12]">Active</option>
              <option value="standby" className="bg-[#0D0D12]">Standby</option>
              <option value="training" className="bg-[#0D0D12]">Training</option>
              <option value="paused" className="bg-[#0D0D12]">Paused</option>
            </select>

            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                showAdvancedFilters
                  ? 'bg-[#E5C158] text-black'
                  : 'bg-white/5 border border-white/10 text-neutral-300 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* ADVANCED FILTERS DRAWER */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/10 pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs"
            >
              <div>
                <label className="text-[11px] font-mono text-neutral-400 block font-bold mb-1">Activity Log Filter</label>
                <select
                  value={selectedActivityType}
                  onChange={(e) => setSelectedActivityType(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-[#E5C158]"
                >
                  <option value="All Events" className="bg-[#0D0D12]">All Event Types</option>
                  <option value="completed" className="bg-[#0D0D12]">Completed Tasks</option>
                  <option value="warning" className="bg-[#0D0D12]">Warnings & Flags</option>
                  <option value="failed" className="bg-[#0D0D12]">Failed Executions</option>
                  <option value="system" className="bg-[#0D0D12]">System Messages</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 block font-bold mb-1">Date Range</label>
                <select className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-[#E5C158]">
                  <option className="bg-[#0D0D12]">Last 24 Hours</option>
                  <option className="bg-[#0D0D12]">Last 7 Days</option>
                  <option className="bg-[#0D0D12]">Last 30 Days</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Categories');
                    setSelectedStatus('All Statuses');
                    setSelectedActivityType('All Events');
                    if (onShowToast) onShowToast('AI Control Center filters reset');
                  }}
                  className="w-full p-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SUB-TAB 1: OVERVIEW & AGENT SUMMARY GRID */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* QUICK AGENTS STATUS GRID PREVIEW */}
          <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="space-y-0.5">
                <h3 className="font-poppins font-bold text-white text-base flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-[#E5C158]" />
                  <span>AI Agent Network Fleet</span>
                </h3>
                <p className="text-xs text-neutral-400">9 Specialized autonomous AI agents configured for MFS Growth platform operations</p>
              </div>
              <button
                onClick={() => setActiveSubTab('agents')}
                className="text-xs font-bold text-[#E5C158] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Manage All Agents</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredAgents.slice(0, 6).map((agent) => (
                <div
                  key={agent.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#E5C158]/50 transition-all space-y-3 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      <strong className="text-white font-bold text-sm group-hover:text-[#E5C158] transition-colors block">
                        {agent.name}
                      </strong>
                      <span className="text-[10px] font-mono text-neutral-400">{agent.category}</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border ${
                        agent.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : agent.status === 'standby'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {agent.status}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {agent.description}
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>Uptime: <strong className="text-white">{agent.uptimePercent}%</strong></span>
                    <span>24h: <strong className="text-[#E5C158]">{agent.requests24h} reqs</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT AI ACTIVITY LOG PREVIEW */}
          <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="font-poppins font-bold text-white text-base">Live AI System Stream</h3>
              </div>
              <button
                onClick={() => setActiveSubTab('activity')}
                className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Full System Logs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {filteredEvents.slice(0, 4).map((evt) => (
                <div
                  key={evt.id}
                  className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    {evt.type === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                    {evt.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                    {evt.type === 'failed' && <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                    {evt.type === 'system' && <Bot className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />}

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <strong className="text-white font-bold">{evt.title}</strong>
                        <span className="text-[10px] text-neutral-400 font-mono">({evt.agentName})</span>
                      </div>
                      <p className="text-neutral-400 text-[11px]">{evt.details}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-0.5 font-mono text-[10px]">
                    <span className="text-neutral-500 block">{evt.timestamp}</span>
                    {evt.latencyMs !== undefined && evt.latencyMs > 0 && (
                      <span className="text-emerald-400 font-bold block">{evt.latencyMs} ms</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PHASE 14 PART 2 & PART 4 SUBCOMPONENTS */}
      {activeSubTab === 'providers' && <AIProvidersPanel onShowToast={onShowToast} />}
      {activeSubTab === 'prompts' && <PromptRegistryPanel onShowToast={onShowToast} />}
      {activeSubTab === 'knowledge' && <KnowledgeEnginePanel onShowToast={onShowToast} />}
      {activeSubTab === 'pipeline' && <ContextPipelineVisualizer onShowToast={onShowToast} />}
      {activeSubTab === 'guardrails' && <AIGuardrailSecurityPanel onShowToast={onShowToast} />}
      {activeSubTab === 'audit' && <AuditTrailGovernancePanel onShowToast={onShowToast} />}
      {activeSubTab === 'health' && <SystemHealthDashboard onShowToast={onShowToast} />}
      {activeSubTab === 'config' && <EnterpriseConfigCenter onShowToast={onShowToast} />}
      {activeSubTab === 'expansion' && <FutureExpansionZone onShowToast={onShowToast} />}

      {/* SUB-TAB 2: AI AGENTS FULL GRID & REUSABLE CARDS */}
      {activeSubTab === 'agents' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-[#E5C158]" />
              <span>Configured AI Agent Fleet ({filteredAgents.length})</span>
            </h2>

            <button
              onClick={() => {
                if (onShowToast) onShowToast('Agent provision modal open (Frontend Shell Only)');
              }}
              className="px-3.5 py-2 rounded-xl bg-[#E5C158] hover:bg-[#d4af37] text-black font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Deploy New Custom Agent</span>
            </button>
          </div>

          {filteredAgents.length === 0 ? (
            /* EMPTY STATE */
            <div className="p-12 text-center rounded-3xl bg-[#0D0D12] border border-white/10 space-y-3">
              <Bot className="w-12 h-12 text-neutral-600 mx-auto" />
              <h3 className="text-white font-bold text-base">No AI Agents Match Your Filter</h3>
              <p className="text-xs text-neutral-400">Try adjusting your search keywords or resetting category filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                  setSelectedStatus('All Statuses');
                }}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="p-5 rounded-3xl bg-[#0D0D12] border border-white/10 hover:border-[#E5C158]/50 transition-all shadow-xl space-y-4 relative overflow-hidden group"
                >
                  {/* HEALTH INDICATOR PULSE */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            agent.status === 'active'
                              ? 'bg-emerald-400 animate-pulse'
                              : agent.status === 'standby'
                              ? 'bg-blue-400'
                              : 'bg-amber-400'
                          }`}
                        />
                        <strong className="text-white font-bold text-base group-hover:text-[#E5C158] transition-colors">
                          {agent.name}
                        </strong>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 block">{agent.category} • Engine: {agent.modelEngine}</span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                        agent.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : agent.status === 'standby'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {agent.status}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-xs text-neutral-300 leading-relaxed min-h-[36px]">
                    {agent.description}
                  </p>

                  {/* CAPABILITY TAG */}
                  <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-0.5">
                    <span className="text-[9px] font-mono text-[#E5C158] uppercase font-bold block">Primary Capability</span>
                    <p className="text-xs font-semibold text-white">{agent.primaryCapability}</p>
                  </div>

                  {/* METRICS ROW */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                    <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[9px] text-neutral-400 block">Health</span>
                      <strong className="text-emerald-400 font-bold">{agent.healthScore}%</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[9px] text-neutral-400 block">Latency</span>
                      <strong className="text-purple-400 font-bold">{agent.avgLatencyMs}ms</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[9px] text-neutral-400 block">24h Reqs</span>
                      <strong className="text-[#E5C158] font-bold">{agent.requests24h}</strong>
                    </div>
                  </div>

                  {/* REUSABLE QUICK ACTIONS FOOTER */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-1.5">
                    <button
                      onClick={() => setInspectingAgent(agent)}
                      className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#E5C158]" />
                      <span>Inspect</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedTestingAgent(agent.id);
                        setActiveSubTab('testing');
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span>Test Prompt</span>
                    </button>

                    <button
                      onClick={() => handleTogglePauseAgent(agent.id)}
                      className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-all ${
                        agent.status === 'paused'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white'
                      }`}
                    >
                      {agent.status === 'paused' ? (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Resume</span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: SYSTEM ACTIVITY LOGS & STREAM */}
      {activeSubTab === 'activity' && (
        <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <span>AI Execution Event Stream & Audit Feed</span>
              </h3>
              <p className="text-xs text-neutral-400">Detailed real-time execution logs, OCR checks, and system events across all active AI agents.</p>
            </div>

            <button
              onClick={() => {
                if (onShowToast) onShowToast('System log stream refreshed');
              }}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Logs</span>
            </button>
          </div>

          <div className="space-y-3">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  {evt.type === 'completed' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
                  {evt.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
                  {evt.type === 'failed' && <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
                  {evt.type === 'system' && <Bot className="w-5 h-5 text-[#E5C158] shrink-0 mt-0.5" />}

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <strong className="text-white font-bold text-sm">{evt.title}</strong>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 font-mono text-[10px]">
                        {evt.agentName}
                      </span>
                    </div>
                    <p className="text-neutral-300 text-xs leading-relaxed">{evt.details}</p>
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono text-xs space-y-1">
                  <span className="text-neutral-400 block">{evt.timestamp}</span>
                  {evt.latencyMs !== undefined && evt.latencyMs > 0 && (
                    <span className="text-emerald-400 font-bold block">{evt.latencyMs} ms latency</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: FUTURE INTEGRATIONS ARCHITECTURE */}
      {activeSubTab === 'integrations' && (
        <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#E5C158]" />
                <span>AI Providers & Agentic Ecosystem Architecture</span>
              </h3>
              <p className="text-xs text-neutral-400">Scalable multi-provider architecture supporting Google Gemini, OpenAI, Anthropic, Local AI models, and MCP tools.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROVIDER_INTEGRATIONS.map((prov) => (
              <div
                key={prov.id}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#E5C158]/40 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className={`w-5 h-5 ${prov.iconColor}`} />
                    <strong className="text-white font-bold text-sm">{prov.provider}</strong>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[9px] font-bold border border-[#E5C158]/30">
                    {prov.badge}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed min-h-[36px]">
                  {prov.description}
                </p>

                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                  <span className="text-[9px] font-mono text-neutral-400 block uppercase">Primary Role</span>
                  <span className="text-xs font-semibold text-white">{prov.primaryRole}</span>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-neutral-400">Engine Version: <strong className="text-white">{prov.version}</strong></span>
                  <span className="text-emerald-400 font-bold uppercase">{prov.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: TESTING PLAYGROUND */}
      {activeSubTab === 'testing' && (
        <div className="p-6 rounded-3xl bg-[#0D0D12] border border-[#E5C158]/40 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E5C158]" />
                <span>AI Prompt & Agent Testing Console</span>
              </h3>
              <p className="text-xs text-neutral-400">Safely test prompt instructions, language response behavior, and fallback logic without altering live production queues.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT SIDE: PROMPT INPUT */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono font-bold text-neutral-300 block mb-1">Select Target AI Agent</label>
                <select
                  value={selectedTestingAgent}
                  onChange={(e) => setSelectedTestingAgent(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                >
                  {agents.map((a) => (
                    <option key={a.id} value={a.id} className="bg-[#0D0D12]">
                      {a.name} ({a.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-neutral-300 block mb-1">Test Prompt Input</label>
                <textarea
                  rows={5}
                  value={testPromptInput}
                  onChange={(e) => setTestPromptInput(e.target.value)}
                  placeholder="Enter sample user query in English, Urdu, or Roman Urdu..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] font-mono"
                />
              </div>

              <button
                disabled={isSimulatingTest}
                onClick={handleSimulateTestPrompt}
                className="w-full py-3 rounded-2xl bg-[#E5C158] hover:bg-[#d4af37] text-black font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isSimulatingTest ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Test Simulation...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Execute Test Prompt</span>
                  </>
                )}
              </button>
            </div>

            {/* RIGHT SIDE: RESPONSE PREVIEW */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-neutral-300 block">Agent Output Preview</label>
              <div className="p-4 rounded-2xl bg-black border border-white/10 min-h-[220px] text-xs font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed space-y-2">
                {testResponseOutput ? (
                  testResponseOutput
                ) : (
                  <span className="text-neutral-600 italic">
                    Agent simulation output will be generated here upon prompt execution...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INSPECT AGENT MODAL */}
      <AnimatePresence>
        {inspectingAgent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl p-6 rounded-3xl bg-[#0D0D12] border border-[#E5C158]/50 space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                    <Bot className="w-5 h-5 text-[#E5C158]" />
                    <span>{inspectingAgent.name}</span>
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">{inspectingAgent.category} Agent</span>
                </div>

                <button
                  onClick={() => setInspectingAgent(null)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <div>
                  <strong className="text-white block font-bold mb-0.5">Description:</strong>
                  <p className="text-neutral-400 leading-relaxed">{inspectingAgent.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 space-y-0.5">
                    <span className="text-[10px] font-mono text-neutral-400 block">Model Engine</span>
                    <strong className="text-white font-bold">{inspectingAgent.modelEngine}</strong>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 space-y-0.5">
                    <span className="text-[10px] font-mono text-neutral-400 block">Health Score</span>
                    <strong className="text-emerald-400 font-bold">{inspectingAgent.healthScore}%</strong>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30 space-y-1">
                  <span className="text-[10px] font-mono text-[#E5C158] uppercase font-bold block">Primary Capability</span>
                  <p className="text-white font-semibold">{inspectingAgent.primaryCapability}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setInspectingAgent(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
