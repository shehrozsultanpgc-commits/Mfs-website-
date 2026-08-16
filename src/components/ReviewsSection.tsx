import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { REVIEWS } from '../data/content';
import { ReviewSubmissionModal } from './ReviewsPage';
import {
  Star,
  CheckCircle2,
  Quote,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Filter,
  MessageSquare,
  MessageSquarePlus,
  Award,
  ChevronRight,
} from 'lucide-react';

interface ReviewsSectionProps {
  onNavigatePage?: (
    page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard' | 'admin'
  ) => void;
  onOpenOrderModal?: (serviceId?: string) => void;
}

// Declarative avatar component with initials fallback (no DOM mutation)
const ReviewAvatar: React.FC<{ name: string; avatarUrl?: string; size?: string }> = ({
  name,
  avatarUrl,
  size = 'w-11 h-11',
}) => {
  const [hasError, setHasError] = useState(false);
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  if (!avatarUrl || hasError) {
    return (
      <div
        className={`${size} rounded-full bg-gradient-to-br from-[#E5C158]/30 to-[#E5C158]/10 border border-[#E5C158]/40 flex items-center justify-center font-extrabold text-xs text-[#E5C158] shrink-0 shadow-sm`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={avatarUrl}
      alt={`${name} - Verified Client Review for MFS Growth Agency`}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      referrerPolicy="no-referrer"
      className={`${size} rounded-full object-cover border border-[#E5C158]/30 shrink-0 shadow-sm`}
    />
  );
};

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  onNavigatePage,
  onOpenOrderModal,
}) => {
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>('All');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Dynamic Metrics derived strictly from existing dataset
  const metrics = useMemo(() => {
    const total = REVIEWS.length;
    if (total === 0) return { total: 0, avgRating: '0.0', verifiedPercent: 0 };
    const sumRating = REVIEWS.reduce((acc, r) => acc + r.rating, 0);
    const avg = (sumRating / total).toFixed(1);
    const verifiedCount = REVIEWS.filter((r) => r.verified).length;
    const verifiedPct = Math.round((verifiedCount / total) * 100);
    return {
      total,
      avgRating: avg,
      verifiedPercent: verifiedPct,
    };
  }, []);

  // Filter categories dynamically
  const uniqueCategories = useMemo(() => {
    const set = new Set<string>();
    REVIEWS.forEach((r) => {
      if (r.service) set.add(r.service);
    });
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered reviews
  const displayedReviews = useMemo(() => {
    if (selectedServiceFilter === 'All') return REVIEWS.slice(0, 6);
    return REVIEWS.filter((r) => r.service === selectedServiceFilter).slice(0, 6);
  }, [selectedServiceFilter]);

  return (
    <section className="w-full py-20 sm:py-28 bg-[#050507] relative overflow-hidden text-white border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E5C158]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Header Hierarchy */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
            <span>SOCIAL PROOF & TRUST</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-poppins font-bold text-white tracking-tight leading-tight mb-4"
          >
            Client Proof. <span className="gradient-gold-text">Real Experiences.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-neutral-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Verified feedback from students, working professionals, and businesses who accelerated their goals with MFS Growth Agency.
          </motion.p>
        </div>

        {/* 2. Dynamic Trust Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#0D0D12] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-10 sm:mb-12 shadow-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10 text-center sm:text-left">
            {/* Metric 1: Avg Rating */}
            <div className="pt-2 sm:pt-0 sm:px-4 flex items-center justify-center sm:justify-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] shrink-0">
                <Star className="w-6 h-6 fill-[#E5C158]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <span className="text-2xl sm:text-3xl font-poppins font-extrabold text-white">
                    {metrics.avgRating}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">/ 5.0</span>
                </div>
                <span className="text-xs text-neutral-400 block mt-0.5">Average Client Rating</span>
              </div>
            </div>

            {/* Metric 2: Verified Order Percentage */}
            <div className="pt-4 sm:pt-0 sm:px-6 flex items-center justify-center sm:justify-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-center text-[#28C76F] shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <span className="text-2xl sm:text-3xl font-poppins font-extrabold text-white">
                    {metrics.verifiedPercent}%
                  </span>
                  <span className="text-xs text-[#28C76F] font-bold">Verified</span>
                </div>
                <span className="text-xs text-neutral-400 block mt-0.5">Verified Delivery Proof</span>
              </div>
            </div>

            {/* Metric 3: Total Dataset Reviews */}
            <div className="pt-4 sm:pt-0 sm:px-6 flex items-center justify-center sm:justify-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white shrink-0">
                <MessageSquare className="w-6 h-6 text-[#E5C158]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <span className="text-2xl sm:text-3xl font-poppins font-extrabold text-white">
                    {metrics.total}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">Reviews</span>
                </div>
                <span className="text-xs text-neutral-400 block mt-0.5">Authentic Client Testimonials</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. Category Filter Chips */}
        {uniqueCategories.length > 2 && (
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            {uniqueCategories.map((cat) => {
              const isSelected = selectedServiceFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedServiceFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E5C158] text-[#050507] shadow-md'
                      : 'bg-[#0D0D12] text-neutral-400 border border-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* 4. Review Cards Grid (Uniform Card Height & Clean Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="bg-[#0D0D12] rounded-3xl border border-white/10 p-6 flex flex-col justify-between hover:border-[#E5C158]/40 transition-all duration-300 relative group shadow-lg"
            >
              <div>
                {/* Header: Avatar, Name, Location, Verified Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <ReviewAvatar name={review.name} avatarUrl={review.avatarUrl} />
                    <div className="min-w-0">
                      <h4 className="font-poppins font-bold text-sm text-white truncate group-hover:text-[#E5C158] transition-colors">
                        {review.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                        <span className="truncate">{review.location}</span>
                        {review.role && (
                          <>
                            <span>•</span>
                            <span className="text-neutral-300 truncate">{review.role}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 shrink-0 bg-black/50 px-2.5 py-1 rounded-full border border-white/10">
                    <Star className="w-3.5 h-3.5 text-[#E5C158] fill-[#E5C158]" />
                    <span className="text-xs font-bold text-white ml-1">{review.rating}.0</span>
                  </div>
                </div>

                {/* Sub-header: Verified Order & Service Tag */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pt-3 border-t border-white/5 text-[10px]">
                  {review.verified ? (
                    <span className="inline-flex items-center gap-1 text-[#28C76F] font-semibold bg-[#28C76F]/10 px-2.5 py-0.5 rounded-full border border-[#28C76F]/30">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Order {review.orderRef ? `#${review.orderRef}` : ''}</span>
                    </span>
                  ) : (
                    <span className="text-neutral-500 italic">Client Review</span>
                  )}

                  {review.service && (
                    <span className="text-[#E5C158] font-bold bg-[#E5C158]/10 px-2.5 py-0.5 rounded-full border border-[#E5C158]/30">
                      {review.service}
                    </span>
                  )}
                </div>

                {/* Review Content Quote */}
                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-[#E5C158]/20 absolute -top-2 -left-1 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed relative z-10 pl-2">
                    "{review.text || (review as any).content}"
                  </p>
                </div>
              </div>

              {/* Date Footer */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400 mt-2">
                <span>{review.date || 'Verified Delivery'}</span>
                <span className="text-[#E5C158] font-medium flex items-center gap-1">
                  <span>MFS Quality Guaranteed</span>
                  <Award className="w-3 h-3 text-[#E5C158]" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 5. Navigation & Review Action CTAs */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs sm:text-sm hover:bg-[#fce888] transition-all shadow-[0_0_25px_rgba(229,193,88,0.25)] cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>

            {onNavigatePage && (
              <button
                onClick={() => onNavigatePage('reviews')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/15 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>View All Verified Reviews</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {onOpenOrderModal && (
              <button
                onClick={() => onOpenOrderModal('presentation')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/15 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Place Your Project Order</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <p className="text-xs text-neutral-400 text-center">
            Completed an order with MFS Growth? Share your experience.
          </p>
        </div>

        {/* 6. Review Submission Modal */}
        <ReviewSubmissionModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
        />

      </div>
    </section>
  );
};
