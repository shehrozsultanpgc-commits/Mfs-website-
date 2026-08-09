import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layout,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit3,
  Save,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  Video,
  Globe,
  Sliders,
  DollarSign,
  Star,
  Shield,
  HelpCircle,
  Award,
  Layers,
  RefreshCw,
  Move
} from 'lucide-react';
import { Currency } from '../../types';

interface HomepageSection {
  id: string;
  name: string;
  type: 'hero' | 'stats' | 'services' | 'our_work' | 'why_us' | 'testimonials' | 'pricing' | 'faq' | 'cta_footer';
  enabled: boolean;
  order: number;
  description: string;
}

interface CMSHomepageManagerProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSHomepageManager: React.FC<CMSHomepageManagerProps> = ({
  currency,
  onShowToast,
}) => {
  // Homepage Sections Ordering & Visibility
  const [sections, setSections] = useState<HomepageSection[]>([
    {
      id: 'sec-1',
      name: 'Hero Banner & Grand Launch Offer',
      type: 'hero',
      enabled: true,
      order: 1,
      description: 'Primary headline, 50% Grand Launch discount pill, CTA buttons & video backdrop',
    },
    {
      id: 'sec-2',
      name: 'Executive Statistics Counters',
      type: 'stats',
      enabled: true,
      order: 2,
      description: '4 Key metrics (500+ Projects, 99.2% Satisfaction, 24/7 PKT Support, 100% On-Time SLA)',
    },
    {
      id: 'sec-3',
      name: 'Featured Digital Services Grid',
      type: 'services',
      enabled: true,
      order: 3,
      description: 'Presentation Design, Academic Writing, ATS Resumes, Report Formatting',
    },
    {
      id: 'sec-[#4]',
      name: 'Our Work Showcase (Secured Samples)',
      type: 'our_work',
      enabled: true,
      order: 4,
      description: 'Watermarked sample pitch decks & papers with copy protection warning toast',
    },
    {
      id: 'sec-5',
      name: 'Why Choose MFS Growth Agency',
      type: 'why_us',
      enabled: true,
      order: 5,
      description: '256-Bit confidentiality, PKT timezone 24/7 support, expert academic writers',
    },
    {
      id: 'sec-6',
      name: 'Verified Client Reviews & Testimonials',
      type: 'testimonials',
      enabled: true,
      order: 6,
      description: 'Star ratings and testimonials from student & corporate clients',
    },
    {
      id: 'sec-7',
      name: 'Interactive Price Calculator Preview',
      type: 'pricing',
      enabled: true,
      order: 7,
      description: 'Instant cost calculation with quantity sliders and speed multipliers',
    },
    {
      id: 'sec-8',
      name: 'Frequently Asked Questions (FAQ)',
      type: 'faq',
      enabled: true,
      order: 8,
      description: 'EasyPaisa/JazzCash/Bank payment guides, delivery SLAs & revision terms',
    },
    {
      id: 'sec-9',
      name: 'Bottom High-Conversion CTA Banner',
      type: 'cta_footer',
      enabled: true,
      order: 9,
      description: 'Direct WhatsApp CTA button (+92 301 5323689) and email launch trigger',
    },
  ]);

  // Hero Section Form State
  const [heroTitle, setHeroTitle] = useState(
    'Helping Students & Professionals Grow with High-Quality Digital Solutions.'
  );
  const [heroSubtitle, setHeroSubtitle] = useState(
    'Executive Presentation Design, Custom Academic Assignment Writing, ATS-Engineered Resumes, and Corporate Document Formatting with 24/7 Online Support.'
  );
  const [heroPromoBadge, setHeroPromoBadge] = useState('50% GRAND LAUNCH OFFER ACTIVE');
  const [primaryCtaText, setPrimaryCtaText] = useState('Calculate Price & Order');
  const [secondaryCtaText, setSecondaryCtaText] = useState('Explore Our Work');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('video');
  const [mediaUrl, setMediaUrl] = useState('https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-41555-large.mp4');

  // Stats Counters State
  const [stats, setStats] = useState([
    { id: 'st-1', label: 'Completed Projects', value: '500+', subtext: '100% On-Time SLA' },
    { id: 'st-2', label: 'Client Satisfaction', value: '99.2%', subtext: 'Verified 5-Star Reviews' },
    { id: 'st-3', label: 'Support SLA', value: '24/7 PKT', subtext: 'Instant WhatsApp Replies' },
    { id: 'st-4', label: 'Grand Launch Offer', value: '50% OFF', subtext: 'Active Across All Services' },
  ]);

  // Active Editing Tab
  const [activeTab, setActiveTab] = useState<'reorder' | 'hero' | 'stats' | 'reviews' | 'services'>('reorder');

  // Section Ordering Handlers
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    // Re-assign order numbers
    updated.forEach((sec, idx) => {
      sec.order = idx + 1;
    });
    setSections(updated);
    if (onShowToast) onShowToast(`Moved "${temp.name}" UP in section order`);
  };

  const handleMoveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    updated.forEach((sec, idx) => {
      sec.order = idx + 1;
    });
    setSections(updated);
    if (onShowToast) onShowToast(`Moved "${temp.name}" DOWN in section order`);
  };

  const handleToggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === id) {
          const nextState = !sec.enabled;
          if (onShowToast)
            onShowToast(
              `Homepage Section "${sec.name}" ${nextState ? 'ENABLED' : 'DISABLED'}`
            );
          return { ...sec, enabled: nextState };
        }
        return sec;
      })
    );
  };

  const handleSaveHeroChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (onShowToast) onShowToast('Homepage Hero Banner configuration saved dynamically!');
  };

  const handleStatChange = (id: string, field: 'label' | 'value' | 'subtext', val: string) => {
    setStats((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  return (
    <div className="space-y-6">
      {/* HOMEPAGE EDITOR SUB-NAV TABS */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-card rounded-3xl border border-white/10 p-4 bg-[#0D0D12]">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-white text-base">Dynamic Homepage Manager</h3>
            <p className="text-xs text-neutral-400">
              Customize hero content, section ordering, metrics & live badges without touching source code.
            </p>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex rounded-2xl bg-white/[0.04] p-1 border border-white/10 text-xs font-mono">
          <button
            onClick={() => setActiveTab('reorder')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reorder'
                ? 'bg-[#E5C158] text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Move className="w-3.5 h-3.5" />
            <span>Section Hierarchy</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'hero'
                ? 'bg-[#E5C158] text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hero & Headlines</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'stats'
                ? 'bg-[#E5C158] text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Stats Counters</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SECTION REORDERING & VISIBILITY TOGGLES */}
      {activeTab === 'reorder' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h4 className="font-poppins font-bold text-white text-sm">
                Homepage Section Layout & Flow Order
              </h4>
              <p className="text-xs text-neutral-400">
                Drag or use directional controls to change the sequence of sections on the live public homepage.
              </p>
            </div>
            <button
              onClick={() => {
                if (onShowToast) onShowToast('Homepage Section Hierarchy saved & applied live!');
              }}
              className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Apply Live Order</span>
            </button>
          </div>

          <div className="space-y-3">
            {sections.map((sec, idx) => (
              <div
                key={sec.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  sec.enabled
                    ? 'bg-white/[0.03] border-white/10 hover:border-[#E5C158]/40'
                    : 'bg-white/[0.01] border-white/5 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white/10 font-mono text-xs font-bold text-[#E5C158] flex items-center justify-center shrink-0">
                    #{sec.order}
                  </span>
                  <div>
                    <h5 className="font-poppins font-bold text-white text-sm flex items-center gap-2">
                      <span>{sec.name}</span>
                      {!sec.enabled && (
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                          HIDDEN
                        </span>
                      )}
                    </h5>
                    <p className="text-xs text-neutral-400">{sec.description}</p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Toggle Visibility */}
                  <button
                    onClick={() => handleToggleSection(sec.id)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      sec.enabled
                        ? 'bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 hover:bg-[#28C76F]/20'
                        : 'bg-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{sec.enabled ? 'VISIBLE' : 'HIDDEN'}</span>
                  </button>

                  {/* Move Up */}
                  <button
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Move Section Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  {/* Move Down */}
                  <button
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === sections.length - 1}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Move Section Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: HERO BANNER & HEADLINES EDITOR */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveHeroChanges} className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-[#0D0D12]">
          <div className="border-b border-white/10 pb-4">
            <h4 className="font-poppins font-bold text-white text-sm">
              Homepage Hero Section & Value Proposition
            </h4>
            <p className="text-xs text-neutral-400">
              Update main H1 headline, tagline, grand launch discount offer pill, CTA button copy, and background video asset.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                Grand Launch Promo Badge Text
              </label>
              <input
                type="text"
                value={heroPromoBadge}
                onChange={(e) => setHeroPromoBadge(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                Main H1 Headline *
              </label>
              <input
                type="text"
                required
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-poppins font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                Sub-headline & Description
              </label>
              <textarea
                rows={3}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                  Primary CTA Button Copy
                </label>
                <input
                  type="text"
                  value={primaryCtaText}
                  onChange={(e) => setPrimaryCtaText(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                  Secondary CTA Button Copy (Strict: "Our Work")
                </label>
                <input
                  type="text"
                  value={secondaryCtaText}
                  onChange={(e) => setSecondaryCtaText(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                Hero Background Media Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-white text-xs">
                  <input
                    type="radio"
                    name="media"
                    checked={mediaType === 'video'}
                    onChange={() => setMediaType('video')}
                    className="accent-[#E5C158]"
                  />
                  <span>Looping MP4 Video</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-white text-xs">
                  <input
                    type="radio"
                    name="media"
                    checked={mediaType === 'image'}
                    onChange={() => setMediaType('image')}
                    className="accent-[#E5C158]"
                  />
                  <span>High-Res Banner Image</span>
                </label>
              </div>

              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="Enter media asset URL..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-mono"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Hero Banner</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: STATS COUNTERS EDITOR */}
      {activeTab === 'stats' && (
        <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-5 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h4 className="font-poppins font-bold text-white text-sm">
                Executive Statistics Counters
              </h4>
              <p className="text-xs text-neutral-400">
                Edit key social proof numbers and highlights displayed under the main homepage hero banner.
              </p>
            </div>
            <button
              onClick={() => {
                if (onShowToast) onShowToast('Statistics Counters updated successfully!');
              }}
              className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Save Stats</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3"
              >
                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    Stat Metric Value
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-[#E5C158] font-poppins font-black focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    Label Name
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(stat.id, 'label', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">
                    Subtext Highlight
                  </label>
                  <input
                    type="text"
                    value={stat.subtext}
                    onChange={(e) => handleStatChange(stat.id, 'subtext', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
