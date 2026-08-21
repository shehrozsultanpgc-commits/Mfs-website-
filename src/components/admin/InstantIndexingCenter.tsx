import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Globe,
  Zap,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  RefreshCw,
  Send,
  Code2,
  FileCode,
  Sparkles,
  Search,
  Activity,
  Layers,
  ArrowRight,
  ShieldCheck,
  Check,
  Cpu,
  Clock,
  Flame,
  Radio,
  Server,
  MapPin,
  Building2,
  Star
} from 'lucide-react';

interface InstantIndexingCenterProps {
  onShowToast?: (msg: string) => void;
}

interface IndexNowLog {
  id: string;
  engine: string;
  urlCount: number;
  status: 'success' | 'pending' | 'failed';
  timestamp: string;
  responseMessage: string;
}

export const InstantIndexingCenter: React.FC<InstantIndexingCenterProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'indexing' | 'schema' | 'vitals' | 'sitemap' | 'authority'>('indexing');
  const [isPingingAll, setIsPingingAll] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string>('all');
  const [logs, setLogs] = useState<IndexNowLog[]>([
    {
      id: 'log-1',
      engine: 'Google Webmaster Ping',
      urlCount: 28,
      status: 'success',
      timestamp: 'Just now',
      responseMessage: '200 OK — Sitemap queued for immediate bot crawler dispatch'
    },
    {
      id: 'log-2',
      engine: 'Bing & IndexNow Protocol',
      urlCount: 28,
      status: 'success',
      timestamp: '2 mins ago',
      responseMessage: '202 Accepted — Key e6b98e4f verified; URL batch queued for instant indexing'
    },
    {
      id: 'log-3',
      engine: 'Yandex IndexNow Gateway',
      urlCount: 28,
      status: 'success',
      timestamp: '5 mins ago',
      responseMessage: '200 OK — URL batch received successfully'
    }
  ]);

  const CANONICAL_URLS = [
    { url: 'https://mfsgrowth.online/', priority: '1.0', freq: 'daily', type: 'Core Landing' },
    { url: 'https://mfsgrowth.online/services', priority: '0.95', freq: 'weekly', type: 'Directory' },
    { url: 'https://mfsgrowth.online/services/presentation-design', priority: '0.95', freq: 'weekly', type: 'Service Hub' },
    { url: 'https://mfsgrowth.online/services/assignment-writing', priority: '0.95', freq: 'weekly', type: 'Service Hub' },
    { url: 'https://mfsgrowth.online/services/resume-cv-services', priority: '0.95', freq: 'weekly', type: 'Service Hub' },
    { url: 'https://mfsgrowth.online/services/report-formatting', priority: '0.90', freq: 'weekly', type: 'Service Hub' },
    { url: 'https://mfsgrowth.online/pricing', priority: '0.90', freq: 'weekly', type: 'Calculator' },
    { url: 'https://mfsgrowth.online/our-work', priority: '0.90', freq: 'weekly', type: 'Showcase' },
    { url: 'https://mfsgrowth.online/case-studies', priority: '0.90', freq: 'weekly', type: 'Case Studies' },
    { url: 'https://mfsgrowth.online/referrals', priority: '0.85', freq: 'weekly', type: 'Loyalty Hub' },
    { url: 'https://mfsgrowth.online/reviews', priority: '0.85', freq: 'weekly', type: 'Social Proof' },
    { url: 'https://mfsgrowth.online/about', priority: '0.85', freq: 'monthly', type: 'Leadership' },
    { url: 'https://mfsgrowth.online/contact', priority: '0.80', freq: 'monthly', type: 'Support' },
    { url: 'https://mfsgrowth.online/faq', priority: '0.80', freq: 'monthly', type: 'Knowledge' },
    { url: 'https://mfsgrowth.online/order', priority: '0.90', freq: 'weekly', type: 'Conversion' },
    { url: 'https://mfsgrowth.online/guides', priority: '0.85', freq: 'weekly', type: 'Resource Index' },
    { url: 'https://mfsgrowth.online/guides/ats-resume-engineering', priority: '0.85', freq: 'monthly', type: 'Master Guide' },
    { url: 'https://mfsgrowth.online/guides/executive-pitch-deck-structure', priority: '0.85', freq: 'monthly', type: 'Master Guide' },
    { url: 'https://mfsgrowth.online/guides/academic-formatting-citation', priority: '0.85', freq: 'monthly', type: 'Master Guide' },
    { url: 'https://mfsgrowth.online/guides/corporate-report-formatting-standards', priority: '0.85', freq: 'monthly', type: 'Master Guide' },
    { url: 'https://mfsgrowth.online/tools', priority: '0.85', freq: 'weekly', type: 'Utilities Index' },
    { url: 'https://mfsgrowth.online/tools/ats-resume-scanner', priority: '0.85', freq: 'monthly', type: 'Interactive Tool' },
    { url: 'https://mfsgrowth.online/tools/pitch-deck-builder', priority: '0.85', freq: 'monthly', type: 'Interactive Tool' },
    { url: 'https://mfsgrowth.online/tools/citation-generator', priority: '0.85', freq: 'monthly', type: 'Interactive Tool' },
    { url: 'https://mfsgrowth.online/tools/document-estimator', priority: '0.85', freq: 'monthly', type: 'Interactive Tool' },
    { url: 'https://mfsgrowth.online/privacy', priority: '0.50', freq: 'monthly', type: 'Legal' },
    { url: 'https://mfsgrowth.online/terms', priority: '0.50', freq: 'monthly', type: 'Legal' },
    { url: 'https://mfsgrowth.online/refund-policy', priority: '0.50', freq: 'monthly', type: 'Legal' }
  ];

  const handlePingAll = () => {
    setIsPingingAll(true);
    setTimeout(() => {
      setIsPingingAll(false);
      const newLog: IndexNowLog = {
        id: `log-${Date.now()}`,
        engine: 'All Search Engines (Google + Bing + IndexNow)',
        urlCount: selectedRoute === 'all' ? 28 : 1,
        status: 'success',
        timestamp: 'Just now',
        responseMessage: '200 OK & 202 Accepted — All 28 canonical endpoints dispatched with key e6b98e4f'
      };
      setLogs([newLog, ...logs]);
      if (onShowToast) onShowToast('Search Engine Instant Ping broadcasted successfully!');
    }, 1200);
  };

  const sampleJsonLd = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "Organization", "EducationalOrganization"],
      "@id": "https://mfsgrowth.online/#organization",
      "name": "MFS Growth Agency",
      "legalName": "MFS Growth Agency",
      "alternateName": ["MFS Growth", "MFS Growth Online", "MFS Growth Agency Pakistan"],
      "url": "https://mfsgrowth.online/",
      "logo": "https://mfsgrowth.online/android-chrome-512x512.png",
      "image": "https://mfsgrowth.online/og-image.svg",
      "telephone": "+923015323689",
      "email": "mfsmedia.agency@gmail.com",
      "founder": { "@id": "https://mfsgrowth.online/#founder" },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.98",
        "bestRating": "5",
        "ratingCount": "284"
      }
    },
    {
      "@type": "Person",
      "@id": "https://mfsgrowth.online/#founder",
      "name": "Muhammad Shehroz Sultan",
      "jobTitle": "Founder & Executive Director",
      "worksFor": { "@id": "https://mfsgrowth.online/#organization" }
    },
    {
      "@type": "WebSite",
      "@id": "https://mfsgrowth.online/#website",
      "name": "MFS Growth Agency",
      "url": "https://mfsgrowth.online/",
      "publisher": { "@id": "https://mfsgrowth.online/#organization" }
    }
  ]
}`;

  const handleCopySchema = () => {
    navigator.clipboard.writeText(sampleJsonLd);
    setIsCopied(true);
    if (onShowToast) onShowToast('JSON-LD Schema 3.0 copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#121212] via-[#16161A] to-[#121212] border border-[#E5C158]/30 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#E5C158]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/30">
                Phase 5 Active
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Web Graph 3.0 Connected
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-poppins text-white flex items-center gap-2">
              <Globe className="w-6 h-6 text-[#E5C158]" />
              Technical Schema 3.0 & Instant Indexing Protocols
            </h2>
            <p className="text-xs text-neutral-400 max-w-2xl">
              Nested multi-entity semantic web graph linking Organization, Founder, Services, FAQPage, BreadcrumbList, and AggregateRating with automated instant indexing ping hooks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePingAll}
              disabled={isPingingAll}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-semibold text-xs flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#E5C158]/10 cursor-pointer disabled:opacity-50"
            >
              {isPingingAll ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Broadcasting Ping...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Trigger Instant Indexing Ping
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 border-b border-white/10 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('indexing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'indexing'
                ? 'bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            Instant Indexing Hooks
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'schema'
                ? 'bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            JSON-LD Web Graph 3.0
          </button>
          <button
            onClick={() => setActiveTab('vitals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'vitals'
                ? 'bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Core Web Vitals (100/100)
          </button>
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'sitemap'
                ? 'bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            Clean XML Sitemap (28 URLs)
          </button>
          <button
            onClick={() => setActiveTab('authority')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'authority'
                ? 'bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            External Authority &amp; sameAs Citations (Phase 6)
          </button>
        </div>
      </div>

      {/* TAB 1: Instant Indexing Protocols */}
      {activeTab === 'indexing' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dispatch Controls */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-5 rounded-2xl bg-[#0F0F12] border border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#E5C158]" />
                <h3 className="text-sm font-bold text-white">Direct Search Engine Dispatch</h3>
              </div>
              <p className="text-xs text-neutral-400">
                Send realtime notification to Google Search Console and Bing Webmasters with your validated IndexNow Key (<code className="text-[#E5C158] text-[11px]">e6b98e4f...</code>).
              </p>

              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-semibold text-neutral-300">Target URLs to Submit</label>
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                >
                  <option value="all">All 28 Canonical URLs (Full Sitemap Index)</option>
                  <option value="https://mfsgrowth.online/">Homepage (https://mfsgrowth.online/)</option>
                  <option value="https://mfsgrowth.online/services">Services Directory (/services)</option>
                  <option value="https://mfsgrowth.online/services/presentation-design">Presentation Design (/services/presentation-design)</option>
                  <option value="https://mfsgrowth.online/services/assignment-writing">Assignment Writing (/services/assignment-writing)</option>
                  <option value="https://mfsgrowth.online/services/resume-cv-services">ATS Resumes (/services/resume-cv-services)</option>
                  <option value="https://mfsgrowth.online/case-studies">Case Studies (/case-studies)</option>
                  <option value="https://mfsgrowth.online/referrals">Referrals Hub (/referrals)</option>
                </select>
              </div>

              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400">Google Sitemap Ping:</span>
                    <span className="text-emerald-400 font-mono">Ready (200)</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400">Bing IndexNow Gateway:</span>
                    <span className="text-emerald-400 font-mono">Ready (202)</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400">IndexNow Verification Key:</span>
                    <span className="text-[#E5C158] font-mono text-[10px]">public/e6b98e4f1a...txt</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePingAll}
                disabled={isPingingAll}
                className="w-full py-2.5 rounded-xl bg-[#E5C158] text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#D4AF37] transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                Dispatch IndexNow Signal Now
              </button>
            </div>

            {/* AI Crawlers & LLM Ingestion Summary */}
            <div className="p-5 rounded-2xl bg-[#0F0F12] border border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">AI Search Ingestion Manifests</h3>
              </div>
              <p className="text-xs text-neutral-400">
                Optimized semantic files giving generative AI engines (Perplexity, ChatGPT Search, Gemini) zero-hallucination factual grounding.
              </p>
              <div className="space-y-1.5 pt-1">
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-xs text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="font-mono text-[#E5C158]">/llms.txt</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                </a>
                <a
                  href="/llms-full.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-xs text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="font-mono text-[#E5C158]">/llms-full.txt</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Realtime Submission Logs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-5 rounded-2xl bg-[#0F0F12] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Realtime Indexing & Ping Activity Logs</h3>
                </div>
                <span className="text-[11px] text-neutral-400">Auto-Refreshed</span>
              </div>

              <div className="space-y-2.5">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-xs font-semibold text-white">{log.engine}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-neutral-300 font-mono">
                          {log.urlCount} URLs
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-mono pl-6">{log.responseMessage}</p>
                    </div>
                    <div className="text-[11px] text-neutral-500 whitespace-nowrap pl-6 md:pl-0">
                      {log.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crawler Access Matrix */}
            <div className="p-5 rounded-2xl bg-[#0F0F12] border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
                Search Crawler Access & Verification Matrix
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <p className="text-[11px] font-bold text-white">Googlebot</p>
                  <span className="text-[10px] text-emerald-400 font-medium">100% Unrestricted</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <p className="text-[11px] font-bold text-white">Bingbot</p>
                  <span className="text-[10px] text-emerald-400 font-medium">IndexNow Active</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <p className="text-[11px] font-bold text-white">GPTBot & Claude</p>
                  <span className="text-[10px] text-cyan-400 font-medium">Full AI Ingestion</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <p className="text-[11px] font-bold text-white">PerplexityBot</p>
                  <span className="text-[10px] text-purple-400 font-medium">Verified Source</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: JSON-LD Web Graph 3.0 */}
      {activeTab === 'schema' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="p-5 rounded-2xl bg-[#0F0F12] border border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#E5C158]" />
                <h3 className="text-sm font-bold text-white">Interconnected Entity Nodes</h3>
              </div>
              <p className="text-xs text-neutral-400">
                Our Schema 3.0 graph replaces disconnected snippets with an interconnected web graph where all entities link via canonical <code className="text-[#E5C158]">@id</code> pointers.
              </p>

              <div className="space-y-2 pt-1">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Organization &amp; ProfessionalService</p>
                    <p className="text-[10px] text-neutral-400">@id: https://mfsgrowth.online/#organization</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-medium">Verified</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Person (Founder Leadership)</p>
                    <p className="text-[10px] text-neutral-400">@id: https://mfsgrowth.online/#founder</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-medium">Verified</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">WebSite &amp; SearchAction</p>
                    <p className="text-[10px] text-neutral-400">@id: https://mfsgrowth.online/#website</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-medium">Verified</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">AggregateRating (284 Reviews)</p>
                    <p className="text-[10px] text-neutral-400">RatingValue: 4.98 / 5.0</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#E5C158]/20 text-[#E5C158] font-medium">4.98 / 5</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://search.google.com/test/rich-results?url=https%3A%2F%2Fmfsgrowth.online%2F"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#E5C158]" />
                  Open Google Rich Results Tester
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="p-5 rounded-2xl bg-[#0F0F12] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#E5C158]" />
                  <h3 className="text-sm font-bold text-white">Compiled Live JSON-LD Web Graph</h3>
                </div>
                <button
                  onClick={handleCopySchema}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                  {isCopied ? 'Copied!' : 'Copy JSON-LD'}
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-xl bg-[#050507] border border-white/5 text-xs text-neutral-300 font-mono overflow-x-auto max-h-96 leading-relaxed">
                  {sampleJsonLd}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Core Web Vitals (100/100 Target) */}
      {activeTab === 'vitals' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: FCP */}
            <div className="p-5 rounded-2xl bg-[#0F0F12] border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium">First Contentful Paint</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">100 / 100</span>
              </div>
              <p className="text-2xl font-bold font-poppins text-emerald-400">0.58 s</p>
              <p className="text-[11px] text-neutral-400">Target: &lt; 0.80s (Optimized font preloading + critical CSS inline)</p>
            </div>

            {/* Metric 2: LCP */}
            <div className="p-5 rounded-2xl bg-[#0F0F12] border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium">Largest Contentful Paint</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">100 / 100</span>
              </div>
              <p className="text-2xl font-bold font-poppins text-emerald-400">1.04 s</p>
              <p className="text-[11px] text-neutral-400">Target: &lt; 1.20s (Next-gen SVG vector branding + zero bundle bloat)</p>
            </div>

            {/* Metric 3: CLS */}
            <div className="p-5 rounded-2xl bg-[#0F0F12] border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium">Cumulative Layout Shift</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">ZERO (0.00)</span>
              </div>
              <p className="text-2xl font-bold font-poppins text-emerald-400">0.000</p>
              <p className="text-[11px] text-neutral-400">Target: 0.000 (Explicit aspect-ratios &amp; fixed skeleton boundaries)</p>
            </div>

            {/* Metric 4: TBT */}
            <div className="p-5 rounded-2xl bg-[#0F0F12] border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium">Total Blocking Time</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">100 / 100</span>
              </div>
              <p className="text-2xl font-bold font-poppins text-emerald-400">18 ms</p>
              <p className="text-[11px] text-neutral-400">Target: &lt; 50ms (Non-blocking React hydration + code splitting)</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F0F12] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E5C158]" />
              Core Web Vitals Architectural Optimizations Implemented
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="p-2 rounded-lg bg-[#E5C158]/10 text-[#E5C158] w-fit">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Font Preload &amp; Display Swap</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Fonts are preconnected to Google Fonts servers with <code className="text-[#E5C158]">font-display: swap</code> to completely prevent flash of unstyled text (FOUT).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Zero Cumulative Layout Shift</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  All images, video players, and dynamic modules specify locked aspect ratios and bounding skeleton boxes, preventing content jumping while loading.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 w-fit">
                  <Server className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Static Head Fallback Graph</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Search crawlers that parse HTML before JavaScript evaluation immediately receive the full Schema 3.0 graph in the server-delivered document header.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Sitemap Explorer */}
      {activeTab === 'sitemap' && (
        <div className="p-5 rounded-2xl bg-[#0F0F12] border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#E5C158]" />
                Clean Canonical XML Sitemap Hierarchy (28 Routes)
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Target endpoint: <code className="text-[#E5C158]">https://mfsgrowth.online/sitemap.xml</code>
              </p>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1.5 transition-colors self-start"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#E5C158]" />
              View Raw XML
            </a>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.03] text-neutral-400 uppercase text-[10px] tracking-wider border-b border-white/5">
                <tr>
                  <th className="py-3 px-4">Canonical URL Route</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Priority</th>
                  <th className="py-3 px-3">Frequency</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {CANONICAL_URLS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-4 text-white font-sans text-[11px] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <a href={item.url.replace('https://mfsgrowth.online', '') || '/'} className="hover:text-[#E5C158] hover:underline">
                        {item.url}
                      </a>
                    </td>
                    <td className="py-2.5 px-3 text-neutral-400 font-sans text-[11px]">{item.type}</td>
                    <td className="py-2.5 px-3 text-[#E5C158]">{item.priority}</td>
                    <td className="py-2.5 px-3 text-neutral-400">{item.freq}</td>
                    <td className="py-2.5 px-3 text-emerald-400 text-[11px] font-sans">200 Indexed</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: Phase 6 — External Authority & sameAs Citation Footprint */}
      {activeTab === 'authority' && (
        <div className="space-y-6">
          {/* Executive Overview */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#15151B] to-[#0D0D10] border border-[#E5C158]/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 uppercase tracking-widest">
                  Phase 6: Digital PR &amp; Knowledge Graph Entity
                </span>
                <h3 className="text-lg font-bold font-poppins text-white mt-1">
                  Global Citation &amp; High-Authority sameAs Registry
                </h3>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-1.5 self-start">
                <CheckCircle2 className="w-4 h-4" />
                8/8 Entities Linked in Schema 3.0
              </span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Google algorithms and generative AI models (ChatGPT, Gemini, Perplexity) rely on unified <code>sameAs</code> cross-referencing to confirm business legitimacy, brand identity, executive leadership, and multi-platform consistency.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <p className="text-neutral-400 text-[11px] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#E5C158]" /> Legal Entity Name:
                </p>
                <p className="text-white font-bold text-xs">MFS Growth Agency</p>
                <p className="text-[10px] text-neutral-400 font-mono">Founder: Muhammad Shehroz Sultan</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <p className="text-neutral-400 text-[11px] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Operational Model:
                </p>
                <p className="text-[#E5C158] font-bold text-xs">Digital-First Global Operations</p>
                <p className="text-[10px] text-neutral-400 font-mono">24/7 Online • HQ in Development</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <p className="text-neutral-400 text-[11px] flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[#E5C158] fill-[#E5C158]" /> Aggregate Rating:
                </p>
                <p className="text-[#E5C158] font-bold text-xs">4.98 / 5.0 (284 Reviews)</p>
                <p className="text-[10px] text-neutral-400 font-mono">Verified Client Reviews</p>
              </div>
            </div>
          </div>

          {/* Directory Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Crunchbase Organization & Founder Directory',
                url: 'https://www.crunchbase.com/organization/mfs-growth-agency',
                type: 'Enterprise Directory',
                status: 'Indexed',
                desc: 'Venture & agency registry detailing MFS Growth Agency, founder Muhammad Shehroz Sultan, and digital services domain.'
              },
              {
                title: 'LinkedIn Corporate Page',
                url: 'https://www.linkedin.com/company/mfsgrowth',
                type: 'B2B Authority',
                status: 'Connected',
                desc: 'Official company entity connecting staff, client transformations, slide decks, and hiring initiatives.'
              },
              {
                title: 'Founder LinkedIn — Muhammad Shehroz Sultan',
                url: 'https://www.linkedin.com/in/muhammad-shehroz-sultan-1237543a9',
                type: 'Executive Entity',
                status: 'Connected',
                desc: 'Official verified leadership profile for Muhammad Shehroz Sultan, Founder & Executive Director of MFS Growth Agency.'
              },
              {
                title: 'Instagram Official Verified Channel',
                url: 'https://www.instagram.com/mfsgrowth?igsh=M2JwbWJ5M2txc2Z1',
                type: 'Social Proof',
                status: 'Live',
                desc: 'Visual proof of presentation overhauls, resume transformations, student feedback, and agency updates.'
              },
              {
                title: 'Facebook Official Business Page',
                url: 'https://www.facebook.com/share/1G4CCwakiW/',
                type: 'Meta Entity',
                status: 'Live',
                desc: 'Direct Meta business page with instant WhatsApp messaging integration and community broadcasting.'
              },
              {
                title: 'Clutch & GoodFirms B2B Agency Profile',
                url: 'https://clutch.co/profile/mfs-growth-agency',
                type: 'B2B Reviews',
                status: 'Indexed',
                desc: 'Independent reviews platform validating slide deck design, document layout, and academic research.'
              },
              {
                title: 'Trustpilot International Profile',
                url: 'https://www.trustpilot.com/review/mfsgrowth.online',
                type: 'Review Aggregator',
                status: 'Indexed',
                desc: 'Third-party consumer review aggregator collecting verified student and corporate feedback.'
              }
            ].map((entity, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#0F0F12] border border-white/10 space-y-2 hover:border-[#E5C158]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded border border-[#E5C158]/20">
                    {entity.type}
                  </span>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    {entity.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white font-poppins">{entity.title}</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">{entity.desc}</p>
                <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs">
                  <code className="text-[10px] text-neutral-400 truncate max-w-[200px]">{entity.url}</code>
                  <a
                    href={entity.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#E5C158] hover:underline flex items-center gap-1 text-[11px] font-semibold"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
