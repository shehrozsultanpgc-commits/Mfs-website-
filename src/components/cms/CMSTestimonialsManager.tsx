import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  Video,
  Building,
  UserCheck,
  ShieldCheck,
  ThumbsUp,
  X,
  Save,
  Sparkles,
  Award
} from 'lucide-react';
import { Currency } from '../../types';

export interface WebsiteTestimonial {
  id: string;
  clientName: string;
  designationOrUniversity: string;
  companyLogoOrAvatar?: string;
  rating: number; // 1-5
  reviewText: string;
  category: 'Presentation Design' | 'Assignment Writing' | 'Resume / CV' | 'Report Formatting';
  status: 'approved' | 'pending' | 'flagged' | 'archived';
  isFeaturedHomepage: boolean;
  isVideoTestimonial: boolean;
  videoUrl?: string;
  isVerifiedClient: boolean;
  submittedDate: string;
}

interface CMSTestimonialsManagerProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSTestimonialsManager: React.FC<CMSTestimonialsManagerProps> = ({
  currency,
  onShowToast,
}) => {
  const [testimonials, setTestimonials] = useState<WebsiteTestimonial[]>([
    {
      id: 'test-1',
      clientName: 'Tariq Al-Mansoor',
      designationOrUniversity: 'Founder, FinTech Series A Venture (Dubai)',
      rating: 5,
      reviewText: 'MFS Growth Agency transformed our pitch deck in 3 days. The custom gold visual design and executive structure directly helped us secure $3.5M Series A funding. Unmatched speed and quality!',
      category: 'Presentation Design',
      status: 'approved',
      isFeaturedHomepage: true,
      isVideoTestimonial: false,
      isVerifiedClient: true,
      submittedDate: '2026-07-20',
    },
    {
      id: 'test-2',
      clientName: 'Ayesha Malik',
      designationOrUniversity: 'MSc Scholar, University of Manchester (UK)',
      rating: 5,
      reviewText: 'The Harvard citation formatting and plagiarism check were flawless. Received an distinction on my Master thesis. Highly recommend MFS Growth for academic writing support!',
      category: 'Assignment Writing',
      status: 'approved',
      isFeaturedHomepage: true,
      isVideoTestimonial: false,
      isVerifiedClient: true,
      submittedDate: '2026-07-22',
    },
    {
      id: 'test-3',
      clientName: 'Hamza Chaudhry',
      designationOrUniversity: 'Lead Software Architect (PK)',
      rating: 5,
      reviewText: 'Engineered my ATS resume and LinkedIn profile. Passed ATS 98% scan rate and landed 4 US remote job interviews in 2 weeks. Best investment for career growth!',
      category: 'Resume / CV',
      status: 'approved',
      isFeaturedHomepage: true,
      isVideoTestimonial: true,
      videoUrl: 'https://youtube.com/watch?v=sample-proof',
      isVerifiedClient: true,
      submittedDate: '2026-07-24',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedTestimonial, setSelectedTestimonial] = useState<WebsiteTestimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesSearch =
      t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.designationOrUniversity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.reviewText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleToggleApprove = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'approved' ? 'pending' : 'approved';
          if (onShowToast) onShowToast(`Toggled review status for ${t.clientName} to ${nextStatus.toUpperCase()}`);
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleToggleFeatured = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          if (onShowToast) onShowToast(`Toggled homepage featured status for ${t.clientName}`);
          return { ...t, isFeaturedHomepage: !t.isFeaturedHomepage };
        }
        return t;
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
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold border border-amber-500/30 uppercase">
                TESTIMONIALS & REVIEWS MANAGER
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-[#28C76F]" />
                <span>VERIFIED REVIEWS ACTIVE</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Client Testimonials, Video Reviews & Social Proof
            </h3>
            <p className="text-xs text-neutral-400">
              Manage client success stories, rating stars, video proofs, university badges, and homepage featured reviews.
            </p>
          </div>

          <button
            onClick={() => {
              if (onShowToast) onShowToast('Add new testimonial modal opened');
            }}
            className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search testimonials by client name, university, or review text..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158] font-mono cursor-pointer"
          >
            <option value="all" className="bg-black">All Service Categories</option>
            <option value="Presentation Design" className="bg-black">Presentation Design</option>
            <option value="Assignment Writing" className="bg-black">Assignment Writing</option>
            <option value="Resume / CV" className="bg-black">Resume / CV</option>
            <option value="Report Formatting" className="bg-black">Report Formatting</option>
          </select>
        </div>
      </div>

      {/* REVIEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTestimonials.map((t) => (
          <div
            key={t.id}
            className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12] hover:border-[#E5C158]/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[#E5C158] font-mono text-[10px] font-bold uppercase">
                  {t.category}
                </span>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating ? 'text-[#E5C158] fill-[#E5C158]' : 'text-neutral-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <strong className="text-white text-base font-bold block leading-snug">
                  {t.clientName}
                </strong>
                <span className="text-xs text-neutral-400 block mt-0.5">
                  {t.designationOrUniversity}
                </span>
              </div>

              <p className="text-xs text-neutral-300 font-sans p-3 rounded-2xl bg-white/[0.02] border border-white/5 leading-relaxed">
                "{t.reviewText}"
              </p>

              {t.isVideoTestimonial && (
                <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center gap-2 text-purple-300 text-xs font-mono">
                  <Video className="w-3.5 h-3.5 text-purple-400" />
                  <span>Video Testimonial Attached</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleApprove(t.id)}
                  className={`px-2.5 py-1 rounded-xl font-mono text-[10px] font-bold uppercase cursor-pointer border ${
                    t.status === 'approved'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }`}
                >
                  {t.status}
                </button>

                <button
                  onClick={() => handleToggleFeatured(t.id)}
                  className={`px-2.5 py-1 rounded-xl font-mono text-[10px] font-bold uppercase cursor-pointer border ${
                    t.isFeaturedHomepage
                      ? 'bg-[#E5C158]/20 text-[#E5C158] border-[#E5C158]/30'
                      : 'bg-white/5 text-neutral-400 border-white/10'
                  }`}
                >
                  {t.isFeaturedHomepage ? 'Featured On Home' : 'Normal'}
                </button>
              </div>

              <span className="text-[10px] font-mono text-neutral-500">{t.submittedDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
