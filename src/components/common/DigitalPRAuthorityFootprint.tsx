import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Globe,
  MapPin,
  Building2,
  ExternalLink,
  Copy,
  CheckCircle2,
  Award,
  Share2,
  Sparkles,
  Search,
  Users,
  Check,
  Linkedin,
  Instagram,
  Facebook,
  FileCheck,
  Star,
  Compass,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface AuthorityProfile {
  name: string;
  category: 'business' | 'social' | 'directory' | 'founder';
  url: string;
  handleOrId: string;
  badge: string;
  status: 'active' | 'verified' | 'ready';
  description: string;
  icon: string;
  sameAsUrl: string;
}

const CITATION_REGISTRIES: AuthorityProfile[] = [
  {
    name: 'Google Business Profile & Maps',
    category: 'business',
    url: 'https://maps.google.com/?q=MFS+Growth+Agency+Islamabad',
    handleOrId: 'MFS Growth Agency (Islamabad HQ)',
    badge: 'Google Verified Place',
    status: 'verified',
    description: 'Official verified business profile with Blue Area Islamabad HQ address, 24/7 operating hours, local phone routing, and verified customer reviews.',
    icon: 'google',
    sameAsUrl: 'https://maps.google.com/?q=MFS+Growth+Agency+Islamabad'
  },
  {
    name: 'Crunchbase Organization Profile',
    category: 'business',
    url: 'https://www.crunchbase.com/organization/mfs-growth-agency',
    handleOrId: 'mfs-growth-agency',
    badge: 'Enterprise Listing',
    status: 'verified',
    description: 'International directory profiling MFS Growth Agency as an AI-powered digital services & presentation engineering firm founded by Muhammad Shehroz Sultan.',
    icon: 'crunchbase',
    sameAsUrl: 'https://www.crunchbase.com/organization/mfs-growth-agency'
  },
  {
    name: 'LinkedIn Official Company Page',
    category: 'social',
    url: 'https://www.linkedin.com/company/mfsgrowth',
    handleOrId: 'company/mfsgrowth',
    badge: 'Official Brand Entity',
    status: 'verified',
    description: 'Corporate organizational entity connecting executive talent, agency updates, client case studies, and recruitment initiatives.',
    icon: 'linkedin',
    sameAsUrl: 'https://www.linkedin.com/company/mfsgrowth'
  },
  {
    name: 'Founder LinkedIn — Muhammad Shehroz Sultan',
    category: 'founder',
    url: 'https://www.linkedin.com/in/muhammad-shehroz-sultan-1237543a9',
    handleOrId: 'in/muhammad-shehroz-sultan-1237543a9',
    badge: 'Founder & Executive Director',
    status: 'verified',
    description: 'Official verified leadership entity linking Muhammad Shehroz Sultan, Founder & Executive Director of MFS Growth Agency.',
    icon: 'linkedin',
    sameAsUrl: 'https://www.linkedin.com/in/muhammad-shehroz-sultan-1237543a9'
  },
  {
    name: 'Instagram Official Verified Channel',
    category: 'social',
    url: 'https://www.instagram.com/mfsgrowth?igsh=M2JwbWJ5M2txc2Z1',
    handleOrId: '@mfsgrowth',
    badge: 'Verified Community',
    status: 'active',
    description: 'Visual showcase of slide deck transformations, student success milestones, CV overhauls, and live agency announcements.',
    icon: 'instagram',
    sameAsUrl: 'https://www.instagram.com/mfsgrowth?igsh=M2JwbWJ5M2txc2Z1'
  },
  {
    name: 'Facebook Verified Business Page',
    category: 'social',
    url: 'https://www.facebook.com/share/1G4CCwakiW/',
    handleOrId: 'MFS Growth Official',
    badge: 'Verified Meta Page',
    status: 'active',
    description: 'Meta business entity providing direct customer support, event broadcasting, reviews aggregation, and WhatsApp order handoff.',
    icon: 'facebook',
    sameAsUrl: 'https://www.facebook.com/share/1G4CCwakiW/'
  },
  {
    name: 'Clutch & GoodFirms Agency Registry',
    category: 'directory',
    url: 'https://clutch.co/profile/mfs-growth-agency',
    handleOrId: 'mfs-growth-agency',
    badge: 'B2B Top Rated',
    status: 'verified',
    description: 'Independent client review platform validating presentation design, corporate report layout, and academic advisory ratings.',
    icon: 'clutch',
    sameAsUrl: 'https://clutch.co/profile/mfs-growth-agency'
  },
  {
    name: 'Trustpilot International Verified Profile',
    category: 'directory',
    url: 'https://www.trustpilot.com/review/mfsgrowth.online',
    handleOrId: 'mfsgrowth.online',
    badge: '4.98 / 5.0 TrustScore',
    status: 'verified',
    description: 'Third-party consumer review aggregator collecting verified student and corporate feedback with 99.4% satisfaction.',
    icon: 'trustpilot',
    sameAsUrl: 'https://www.trustpilot.com/review/mfsgrowth.online'
  }
];

export const DigitalPRAuthorityFootprint: React.FC<{
  onShowToast?: (msg: string) => void;
}> = ({ onShowToast }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'business' | 'social' | 'directory' | 'founder'>('all');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const filteredRegistries = filterCategory === 'all'
    ? CITATION_REGISTRIES
    : CITATION_REGISTRIES.filter(item => item.category === filterCategory);

  const handleCopy = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    if (onShowToast) onShowToast(`Copied ${name} citation link!`);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <section className="py-16 md:py-24 bg-[#050507] relative overflow-hidden border-t border-white/5">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E5C158]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Phase 6: Digital PR & External Authority Network
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-white tracking-tight">
            Verified Global Authority <br />
            <span className="bg-gradient-to-r from-[#E5C158] via-[#F3E2A9] to-[#D4AF37] bg-clip-text text-transparent">
              &amp; Citation Network
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            MFS Growth Agency operates with verified institutional credibility across international corporate registries, Google Map citations, and founder leadership profiles.
          </p>
        </div>

        {/* Local NAP Citation & Google Business Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#121215] to-[#0A0A0C] border border-[#E5C158]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5C158]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            {/* NAP Identity Details */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Google Business Profile &amp; Map Coordinates Verified
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-[#E5C158] bg-[#E5C158]/10">
                  NAP Consistency 100%
                </span>
              </div>

              <h3 className="text-2xl font-bold font-poppins text-white">
                MFS Growth Agency Headquarters &amp; Digital Hub
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <p className="text-neutral-400 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#E5C158]" /> Legal Entity Name:
                  </p>
                  <p className="text-white font-semibold text-sm">MFS Growth Agency</p>
                  <p className="text-[11px] text-neutral-400">Founder: Muhammad Shehroz Sultan</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <p className="text-neutral-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Physical &amp; Corporate Address:
                  </p>
                  <p className="text-white font-semibold text-sm">Blue Area Corporate Zone</p>
                  <p className="text-[11px] text-neutral-400">Islamabad, 44000, Pakistan (33.7294° N, 73.0931° E)</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <p className="text-neutral-400 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" /> Direct Contact &amp; Support:
                  </p>
                  <p className="text-white font-mono text-xs">+92 301 5323689</p>
                  <p className="text-[11px] text-neutral-400">mfsmedia.agency@gmail.com (24/7 Available)</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <p className="text-neutral-400 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-[#E5C158] fill-[#E5C158]" /> Verified Client Rating:
                  </p>
                  <p className="text-[#E5C158] font-bold text-sm">4.98 / 5.0 Star Rating</p>
                  <p className="text-[11px] text-neutral-400">284 Verified Reviews across Google &amp; Trustpilot</p>
                </div>
              </div>
            </div>

            {/* Quick Action Badge Card */}
            <div className="lg:col-span-1 p-6 rounded-2xl bg-black/40 border border-white/10 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(229,193,88,0.2)]">
                <Compass className="w-8 h-8 text-[#E5C158]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-poppins font-bold text-white text-base">Schema 3.0 sameAs Graph</h4>
                <p className="text-xs text-neutral-400">
                  Every external profile is hardcoded into JSON-LD Web Graph so search engines treat all accounts as a single authoritative entity.
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=MFS+Growth+Agency+Islamabad"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                View Google Business Profile
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Verified Networks (8)' },
            { id: 'business', label: 'Business & Maps' },
            { id: 'social', label: 'Social Networks' },
            { id: 'directory', label: 'B2B Directories' },
            { id: 'founder', label: 'Founder Profile' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filterCategory === tab.id
                  ? 'bg-[#E5C158] text-black shadow-lg shadow-[#E5C158]/20'
                  : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredRegistries.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-5 rounded-2xl bg-[#0F0F12] border border-white/10 hover:border-[#E5C158]/50 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/20">
                    {item.badge}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-poppins font-bold text-white text-sm group-hover:text-[#E5C158] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">{item.handleOrId}</p>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between gap-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#E5C158] hover:text-black text-neutral-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Visit Entity
                </a>

                <button
                  onClick={() => handleCopy(item.url, item.name)}
                  title="Copy Entity URL"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedUrl === item.url ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
