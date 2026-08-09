import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  ShieldCheck,
  Building,
  CheckCircle2,
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  Sparkles,
  Lock,
  FileCheck,
  BadgeCheck
} from 'lucide-react';
import { Currency } from '../../types';

export interface PartnerOrCertification {
  id: string;
  title: string;
  category: 'tech_partner' | 'business_partner' | 'certification' | 'award' | 'security_badge' | 'compliance';
  organization: string;
  badgeImageUrl: string;
  issuedDate: string;
  verificationStatus: 'verified' | 'pending_stage2' | 'archived';
  showOnHomepage: boolean;
  description: string;
}

interface CMSPartnersCertificationsProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSPartnersCertifications: React.FC<CMSPartnersCertificationsProps> = ({
  currency,
  onShowToast,
}) => {
  const [items, setItems] = useState<PartnerOrCertification[]>([
    {
      id: 'pc-1',
      title: 'ATS Resume Parser 98% Compatibility Standard',
      category: 'certification',
      organization: 'Global Career Standards Institute',
      badgeImageUrl: '/badges/ats-certified.png',
      issuedDate: '2026-01-15',
      verificationStatus: 'verified',
      showOnHomepage: true,
      description: 'Certified ATS resume parsing architecture with Taleo, Workday, and Greenhouse optimization.',
    },
    {
      id: 'pc-2',
      title: 'Harvard & APA Academic Citation Compliance',
      category: 'compliance',
      organization: 'Academic Integrity Board',
      badgeImageUrl: '/badges/citation-compliant.png',
      issuedDate: '2026-02-10',
      verificationStatus: 'verified',
      showOnHomepage: true,
      description: 'Strict compliance with Harvard, APA 7th Edition, MLA, and Chicago academic referencing standards.',
    },
    {
      id: 'pc-3',
      title: 'Top Digital Growth & Presentation Design Agency 2026',
      category: 'award',
      organization: 'International Business Growth Awards',
      badgeImageUrl: '/badges/award-2026.png',
      issuedDate: '2026-05-01',
      verificationStatus: 'verified',
      showOnHomepage: true,
      description: 'Recognized for executive pitch deck design and student growth services in Pakistan & UAE.',
    },
    {
      id: 'pc-4',
      title: 'SSL Grade A+ 256-Bit Data Encryption',
      category: 'security_badge',
      organization: 'Cloud Security Guard',
      badgeImageUrl: '/badges/security-ssl.png',
      issuedDate: '2026-01-01',
      verificationStatus: 'verified',
      showOnHomepage: true,
      description: 'End-to-end data privacy for student assignment uploads and corporate pitch deck briefs.',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(
    (i) =>
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleHomepage = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (onShowToast) onShowToast(`Toggled homepage badge display for "${item.title}"`);
          return { ...item, showOnHomepage: !item.showOnHomepage };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-mono text-[10px] font-bold border border-purple-500/30 uppercase">
                PARTNERS, CERTIFICATIONS & TRUST BADGES
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <BadgeCheck className="w-3 h-3 text-[#28C76F]" />
                <span>AUTHENTICITY VERIFIED</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Certifications, Technology Partners & Security Badges
            </h3>
            <p className="text-xs text-neutral-400">
              Manage corporate certifications, ATS parser accreditations, security trust seals, and partner logos.
            </p>
          </div>

          <button
            onClick={() => {
              if (onShowToast) onShowToast('Add certification badge modal opened');
            }}
            className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Certification / Badge</span>
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="pt-2 border-t border-white/10">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certifications, partners, or security trust badges..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>
        </div>
      </div>

      {/* ITEMS LIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12] hover:border-[#E5C158]/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[#E5C158] font-mono text-[10px] font-bold uppercase">
                  {item.category.replace('_', ' ')}
                </span>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold border border-emerald-500/30 uppercase flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3 text-emerald-400" />
                  <span>{item.verificationStatus}</span>
                </span>
              </div>

              <div>
                <strong className="text-white text-base font-bold block leading-snug">
                  {item.title}
                </strong>
                <span className="text-xs text-neutral-400 block mt-0.5">
                  Issuer: <strong className="text-white">{item.organization}</strong>
                </span>
              </div>

              <p className="text-xs text-neutral-300 p-3 rounded-2xl bg-white/[0.02] border border-white/5 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => handleToggleHomepage(item.id)}
                className={`px-3 py-1 rounded-xl font-bold uppercase cursor-pointer border ${
                  item.showOnHomepage
                    ? 'bg-[#E5C158]/20 text-[#E5C158] border-[#E5C158]/30'
                    : 'bg-white/5 text-neutral-400 border-white/10'
                }`}
              >
                {item.showOnHomepage ? 'Homepage Seal Active' : 'Hidden'}
              </button>

              <span className="text-neutral-500 text-[10px]">Issued: {item.issuedDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
