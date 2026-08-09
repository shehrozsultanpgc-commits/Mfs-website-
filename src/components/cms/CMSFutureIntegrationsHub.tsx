import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Search,
  Lock,
  Sparkles,
  ExternalLink,
  Info,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  ShieldAlert,
  Sliders,
  Settings
} from 'lucide-react';
import { Currency } from '../../types';

export interface EnterpriseIntegration {
  id: string;
  name: string;
  category: 'Analytics & Search' | 'Advertising & Pixel' | 'Marketing Automation' | 'CRM & Workflow' | 'Team Communication' | 'Project Management';
  description: string;
  status: 'coming_stage_2';
  icon: string; // Emoji / Icon label
  expectedCapabilities: string[];
}

interface CMSFutureIntegrationsHubProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSFutureIntegrationsHub: React.FC<CMSFutureIntegrationsHubProps> = ({
  currency,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIntegration, setSelectedIntegration] = useState<EnterpriseIntegration | null>(null);

  const integrations: EnterpriseIntegration[] = [
    {
      id: 'int-ga4',
      name: 'Google Analytics 4 (GA4)',
      category: 'Analytics & Search',
      description: 'Track visitor traffic, conversion funnels, quote calculator events, and service page engagement.',
      status: 'coming_stage_2',
      icon: '📊',
      expectedCapabilities: ['Real-time traffic stream', 'Custom event tracking', 'Conversion goal attribution', 'E-commerce tracking for order placement'],
    },
    {
      id: 'int-gsc',
      name: 'Google Search Console',
      category: 'Analytics & Search',
      description: 'Indexation monitoring, search query performance, sitemap submission, and SEO health alerts.',
      status: 'coming_stage_2',
      icon: '🔍',
      expectedCapabilities: ['Organic search keyword reports', 'Automatic URL inspection', 'Core Web Vitals telemetry', 'Mobile usability diagnostics'],
    },
    {
      id: 'int-meta',
      name: 'Meta Pixel & Conversions API',
      category: 'Advertising & Pixel',
      description: 'Server-side Meta pixel for Facebook & Instagram retargeting ads and lead generation measurement.',
      status: 'coming_stage_2',
      icon: '♾️',
      expectedCapabilities: ['Server-to-server CAPI events', 'Custom audience building', 'Quote submit lead pixel', 'Value-based optimization'],
    },
    {
      id: 'int-linkedin',
      name: 'LinkedIn Insight Tag',
      category: 'Advertising & Pixel',
      description: 'B2B audience demographic tracking, executive conversion attribution, and corporate account targeting.',
      status: 'coming_stage_2',
      icon: '💼',
      expectedCapabilities: ['Company size & job title analytics', 'Conversion tracking for pitch deck inquiries', 'Website retargeting'],
    },
    {
      id: 'int-tiktok',
      name: 'TikTok Pixel',
      category: 'Advertising & Pixel',
      description: 'Student audience campaign attribution, assignment service ads, and video conversion tracking.',
      status: 'coming_stage_2',
      icon: '🎵',
      expectedCapabilities: ['Complete registration pixel', 'Order initiation tracking', 'Custom student event parameters'],
    },
    {
      id: 'int-gtm',
      name: 'Google Tag Manager (GTM)',
      category: 'Analytics & Search',
      description: 'Centralized container for dynamic marketing scripts, web triggers, and custom data layer variables.',
      status: 'coming_stage_2',
      icon: '🏷️',
      expectedCapabilities: ['Data Layer integration', 'Zero-code script deployments', 'Consent Mode v2 compliance'],
    },
    {
      id: 'int-mailchimp',
      name: 'Mailchimp',
      category: 'Marketing Automation',
      description: 'Automated email newsletter drip campaigns for 50% Grand Launch promo leads and student discount codes.',
      status: 'coming_stage_2',
      icon: '🐵',
      expectedCapabilities: ['Audience sync on form submit', 'Automated welcome sequence', 'Abandoned quote recovery email'],
    },
    {
      id: 'int-brevo',
      name: 'Brevo (formerly Sendinblue)',
      category: 'Marketing Automation',
      description: 'Transactional email delivery, SMS WhatsApp order status alerts, and client newsletter marketing.',
      status: 'coming_stage_2',
      icon: '✉️',
      expectedCapabilities: ['SMTP transactional relays', 'Order ID confirmation emails', 'SMS & WhatsApp alert triggers'],
    },
    {
      id: 'int-hubspot',
      name: 'HubSpot CRM',
      category: 'CRM & Workflow',
      description: 'Two-way synchronization of website leads, pitch deck quotes, and corporate client deal pipelines.',
      status: 'coming_stage_2',
      icon: '🟠',
      expectedCapabilities: ['Deal stage two-way sync', 'Contact activity timeline', 'Sales pipeline automation'],
    },
    {
      id: 'int-zapier',
      name: 'Zapier',
      category: 'CRM & Workflow',
      description: 'Connect MFS Growth Agency operating system to 5,000+ web applications via automated webhooks.',
      status: 'coming_stage_2',
      icon: '⚡',
      expectedCapabilities: ['Instant lead webhook triggers', 'Custom Zap webhooks', 'Multi-step automation flows'],
    },
    {
      id: 'int-make',
      name: 'Make.com (Integromat)',
      category: 'CRM & Workflow',
      description: 'Visual workflow automation for automated PDF generation, invoice dispatch, and client notifications.',
      status: 'coming_stage_2',
      icon: '🌀',
      expectedCapabilities: ['Complex scenario blueprints', 'PDF report auto-generator', 'Google Drive asset upload automation'],
    },
    {
      id: 'int-slack',
      name: 'Slack',
      category: 'Team Communication',
      description: 'Real-time internal Slack notifications for new orders, urgent client inquiries, and payment proof uploads.',
      status: 'coming_stage_2',
      icon: '💬',
      expectedCapabilities: ['#inquiries channel alerts', 'Urgent SLA lead notifications', 'Payment proof verification buttons'],
    },
    {
      id: 'int-discord',
      name: 'Discord',
      category: 'Team Communication',
      description: 'Internal agency team bot notifications for assignment queue updates and quality review alerts.',
      status: 'coming_stage_2',
      icon: '👾',
      expectedCapabilities: ['Webhook channel notifications', 'Order status embed cards', 'Role-based notifications'],
    },
    {
      id: 'int-teams',
      name: 'Microsoft Teams',
      category: 'Team Communication',
      description: 'Corporate client collaboration channels, executive project updates, and meeting scheduling.',
      status: 'coming_stage_2',
      icon: '🟦',
      expectedCapabilities: ['Teams channel webhook relays', 'Meeting calendar integration', 'Document co-authoring alerts'],
    },
    {
      id: 'int-notion',
      name: 'Notion',
      category: 'Project Management',
      description: 'Sync case study drafts, internal SOP guides, and client project briefs directly to agency Notion workspace.',
      status: 'coming_stage_2',
      icon: '📝',
      expectedCapabilities: ['Knowledge Base two-way sync', 'Project brief database entries', 'Client onboarding templates'],
    },
    {
      id: 'int-trello',
      name: 'Trello',
      category: 'Project Management',
      description: 'Kanban card creation for assignment queue items, presentation design slides, and resume revisions.',
      status: 'coming_stage_2',
      icon: '📋',
      expectedCapabilities: ['Auto-create Trello cards on order', 'Due date SLA sync', 'Label mapping for services'],
    },
    {
      id: 'int-clickup',
      name: 'ClickUp',
      category: 'Project Management',
      description: 'Enterprise task tracking, team workload allocation, time tracking, and client deliverable sign-offs.',
      status: 'coming_stage_2',
      icon: '🎯',
      expectedCapabilities: ['Task auto-creation with attachments', 'Custom field mapping', 'Team workload balancing'],
    },
    {
      id: 'int-monday',
      name: 'Monday.com',
      category: 'Project Management',
      description: 'Visual work OS board synchronization for agency operations, resource planning, and financial tracking.',
      status: 'coming_stage_2',
      icon: '📊',
      expectedCapabilities: ['Order column updates', 'Automated status changes', 'Revenue dashboard feeds'],
    },
    {
      id: 'int-jira',
      name: 'Jira Software',
      category: 'Project Management',
      description: 'Issue tracking and quality assurance workflow for complex corporate document formatting and software audits.',
      status: 'coming_stage_2',
      icon: '🔷',
      expectedCapabilities: ['QA ticket creation', 'SLA resolution timer', 'Customer bug & revision tracking'],
    },
  ];

  const categories = [
    'all',
    'Analytics & Search',
    'Advertising & Pixel',
    'Marketing Automation',
    'CRM & Workflow',
    'Team Communication',
    'Project Management',
  ];

  const filteredIntegrations = integrations.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-[10px] font-bold border border-indigo-500/30 uppercase">
                FUTURE ENTERPRISE INTEGRATIONS HUB
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#E5C158]" />
                <span>STAGE 2 ARCHITECTURE READY</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Third-Party Integrations, Webhooks & Marketing Automation
            </h3>
            <p className="text-xs text-neutral-400">
              Architectural connectors for Analytics, CRM, Ad Pixels, Messaging Bots, and Project Management tools.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-amber-400 shrink-0">
            <span>Total Prepared Hubs: <strong>{integrations.length} Integrations</strong></span>
          </div>
        </div>

        {/* SEARCH & CATEGORY FILTERS */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search integrations by name or capabilities..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158] font-mono cursor-pointer"
          >
            <option value="all" className="bg-black">All Categories ({integrations.length})</option>
            {categories.slice(1).map((cat) => (
              <option key={cat} value={cat} className="bg-black">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* INTEGRATION CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredIntegrations.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12] hover:border-[#E5C158]/50 transition-all flex flex-col justify-between group opacity-90 hover:opacity-100"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl">{item.icon}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[9px] font-bold border border-[#E5C158]/30 uppercase flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-[#E5C158]" />
                  <span>Coming in Stage 2</span>
                </span>
              </div>

              <div>
                <strong className="text-white text-base font-bold block leading-snug group-hover:text-[#E5C158] transition-colors">
                  {item.name}
                </strong>
                <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                  Category: {item.category}
                </span>
              </div>

              <p className="text-xs text-neutral-300 font-sans p-3 rounded-2xl bg-white/[0.02] border border-white/5 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => setSelectedIntegration(item)}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/5"
              >
                <span>View Stage 2 API Specs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* INTEGRATION DETAIL MODAL */}
      <AnimatePresence>
        {selectedIntegration && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <span className="text-2xl">{selectedIntegration.icon}</span>
                  <div>
                    <h3 className="font-poppins font-bold text-white text-base">
                      {selectedIntegration.name}
                    </h3>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {selectedIntegration.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#E5C158]/5 border border-[#E5C158]/20 flex items-center gap-2 text-[#E5C158] font-mono text-[11px]">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>
                    This connector is architected and reserved for <strong>Stage 2 – Real Implementation</strong>.
                  </span>
                </div>

                <p className="text-neutral-300 leading-relaxed">
                  {selectedIntegration.description}
                </p>

                <div className="space-y-1.5">
                  <span className="text-neutral-400 font-mono text-[10px] uppercase block">
                    Target Integration Capabilities:
                  </span>
                  <div className="space-y-1">
                    {selectedIntegration.expectedCapabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-neutral-300 font-mono text-[11px]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      if (onShowToast) onShowToast(`Integration spec acknowledged for ${selectedIntegration.name}`);
                      setSelectedIntegration(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold cursor-pointer"
                  >
                    Got It
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
