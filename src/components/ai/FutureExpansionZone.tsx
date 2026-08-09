import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Boxes,
  Plug,
  Share2,
  Workflow,
  Bell,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Bot,
  Zap
} from 'lucide-react';

interface FutureExpansionZoneProps {
  onShowToast?: (msg: string) => void;
}

export const FutureExpansionZone: React.FC<FutureExpansionZoneProps> = ({ onShowToast }) => {
  const expansionItems = [
    {
      title: 'MCP (Model Context Protocol) Server Integration',
      badge: 'Roadmap Q4 2026',
      icon: Plug,
      color: 'text-[#E5C158]',
      description: 'Standardized open protocol connecting AI models directly to local file systems, databases, and enterprise tooling.',
      status: 'In Architecture Review'
    },
    {
      title: 'Custom AI Agent Marketplace & Plugin Store',
      badge: 'Roadmap Q4 2026',
      icon: Boxes,
      color: 'text-purple-400',
      description: 'Deploy specialized third-party agency micro-agents (e.g. Turnitin Plagiarism Checker AI, Canva Design Exporter).',
      status: 'Coming Soon'
    },
    {
      title: 'Google Workspace Enterprise Bridge',
      badge: 'OAuth Verified',
      icon: Share2,
      color: 'text-blue-400',
      description: 'Direct bi-directional sync with Google Docs, Sheets, Calendar, Gmail, and Google Drive for automated client deliverables.',
      status: 'Ready for Integration'
    },
    {
      title: 'Zapier & n8n Workflow Automation Nodes',
      badge: 'Webhook Ready',
      icon: Workflow,
      color: 'text-emerald-400',
      description: 'Trigger 5,000+ app workflows upon order creation, payment approval, or assignment status updates.',
      status: 'Preview Active'
    },
    {
      title: 'Slack & Microsoft Teams AI Bot Channels',
      badge: 'Enterprise Add-On',
      icon: Bot,
      color: 'text-teal-400',
      description: 'Internal team notifications and AI co-pilot commands inside agency Slack channels.',
      status: 'Coming Soon'
    },
    {
      title: 'Mobile Push Notifications & Webhook Gateways',
      badge: 'PWA Ready',
      icon: Bell,
      color: 'text-amber-400',
      description: 'Instant mobile app push alerts for incoming high-priority orders and client chat messages.',
      status: 'In Development'
    }
  ];

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="p-6 rounded-3xl bg-[#0D0D12] border border-[#E5C158]/40 space-y-3 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 font-mono text-[10px] font-bold uppercase">
          <Sparkles className="w-3 h-3" />
          <span>Next-Gen Enterprise Architecture Roadmap</span>
        </div>
        <h2 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
          <Boxes className="w-5 h-5 text-[#E5C158]" />
          <span>Future Expansion Zone & Ecosystem Integrations</span>
        </h2>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Architectural placeholders for future agency scalability including Model Context Protocol (MCP), external webhooks, Zapier/n8n triggers, and Google Workspace integrations.
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expansionItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => {
                if (onShowToast) onShowToast(`${item.title} — ${item.status}`);
              }}
              className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 hover:border-[#E5C158]/50 transition-all cursor-pointer space-y-4 shadow-xl relative group overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-105 transition-transform">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-300 font-mono text-[10px] font-bold border border-white/10">
                  {item.badge}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-poppins font-bold text-white text-sm group-hover:text-[#E5C158] transition-colors flex items-center gap-1">
                  <span>{item.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px]">
                <span className="text-neutral-500">Status:</span>
                <span className="text-[#E5C158] font-bold">{item.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
