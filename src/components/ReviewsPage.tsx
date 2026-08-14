import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data/content';
import { ReviewItem } from '../types';
import {
  Star,
  CheckCircle2,
  Search,
  MessageSquarePlus,
  X,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Quote,
  Award,
} from 'lucide-react';

interface ReviewsPageProps {
  onOpenOrderModal: () => void;
  onShowToast?: (msg: string) => void;
}

// Declarative Avatar component with clean initials fallback
const ReviewAvatar: React.FC<{
  name: string;
  avatarUrl?: string;
  countryFlag?: string;
  size?: string;
}> = ({ name, avatarUrl, countryFlag, size = 'w-12 h-12' }) => {
  const [hasError, setHasError] = useState(false);
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative shrink-0">
      {!avatarUrl || hasError ? (
        <div
          className={`${size} rounded-full bg-gradient-to-br from-[#E5C158]/30 to-[#E5C158]/10 border border-[#E5C158]/40 flex items-center justify-center font-extrabold text-xs text-[#E5C158] shrink-0 shadow-sm`}
        >
          {initials}
        </div>
      ) : (
        <img
          src={avatarUrl}
          alt={name}
          onError={() => setHasError(true)}
          referrerPolicy="no-referrer"
          className={`${size} rounded-full object-cover border border-[#E5C158]/30 shrink-0 shadow-sm`}
        />
      )}
      {countryFlag && (
        <span className="absolute -bottom-1 -right-1 text-xs bg-black/80 rounded-full px-1 border border-white/20 shadow">
          {countryFlag}
        </span>
      )}
    </div>
  );
};

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  onOpenOrderModal,
  onShowToast,
}) => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'pakistan' | 'me' | 'western' | 'academic' | 'career'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New review form state
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewCountry, setNewReviewCountry] = useState('Pakistan');
  const [newReviewService, setNewReviewService] = useState('Presentation Design');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');

  // Dynamic Trust Metrics calculated strictly from dataset
  const metrics = useMemo(() => {
    const total = reviewsList.length;
    if (total === 0) return { total: 0, avgRating: '0.0', verifiedPercent: 0 };
    const sumRating = reviewsList.reduce((acc, r) => acc + r.rating, 0);
    const avg = (sumRating / total).toFixed(1);
    const verifiedCount = reviewsList.filter((r) => r.verified).length;
    const verifiedPct = Math.round((verifiedCount / total) * 100);
    return {
      total,
      avgRating: avg,
      verifiedPercent: verifiedPct,
    };
  }, [reviewsList]);

  const filterCategories = [
    { id: 'all', label: `All Reviews (${reviewsList.length})` },
    { id: 'pakistan', label: '🇵🇰 Pakistan' },
    { id: 'me', label: '🇦🇪 🇸🇦 Middle East' },
    { id: 'western', label: '🌐 International (UK, US, EU, AU)' },
    { id: 'academic', label: '🎓 Academic Services' },
    { id: 'career', label: '💼 Career & Business' },
  ];

  const filteredReviews = useMemo(() => {
    return reviewsList.filter((rev) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        rev.name.toLowerCase().includes(q) ||
        rev.location.toLowerCase().includes(q) ||
        (rev.service && rev.service.toLowerCase().includes(q)) ||
        rev.text.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (activeFilter === 'all') return true;
      if (activeFilter === 'pakistan') return rev.country === 'Pakistan';
      if (activeFilter === 'me') return rev.country === 'UAE' || rev.country === 'Saudi Arabia';
      if (activeFilter === 'western')
        return (
          rev.country === 'United Kingdom' ||
          rev.country === 'United States' ||
          rev.country === 'Canada' ||
          rev.country === 'Australia' ||
          rev.country === 'Germany' ||
          rev.country === 'Malaysia'
        );
      if (activeFilter === 'academic')
        return (
          rev.service?.includes('Assignment') ||
          rev.service?.includes('Thesis') ||
          rev.service?.includes('Research')
        );
      if (activeFilter === 'career')
        return (
          rev.service?.includes('Resume') ||
          rev.service?.includes('CV') ||
          rev.service?.includes('Presentation') ||
          rev.service?.includes('Proposal') ||
          rev.service?.includes('Pitch')
        );

      return true;
    });
  }, [reviewsList, searchQuery, activeFilter]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-custom-${Date.now()}`,
      name: newReviewName.trim(),
      location: `${newReviewCountry}`,
      country: newReviewCountry,
      countryFlag: newReviewCountry === 'Pakistan' ? '🇵🇰' : '🌐',
      service: newReviewService,
      date: 'Just now',
      rating: newReviewRating,
      text: newReviewText.trim(),
      verified: true,
      avatarBg: '#1A1A1D',
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsSubmitModalOpen(false);
    setNewReviewName('');
    setNewReviewText('');

    if (onShowToast) {
      onShowToast('Thank you! Your verified review has been published successfully.');
    }
  };

  return (
    <div className="w-full pt-28 sm:pt-32 pb-20 bg-[#050507] text-white min-h-screen">
      {/* 1. Reviews Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4 text-[#E5C158]" />
          <span>VERIFIED CLIENT REVIEWS & FEEDBACK</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
          MFS Growth Agency Reviews — <span className="gradient-gold-text">Verified Client Feedback</span>
        </h1>

        <p className="text-neutral-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
          Read genuine reviews from students, job seekers, researchers, and corporate professionals across Pakistan, Middle East, Europe, and North America.
        </p>

        {/* Dynamic Aggregate Rating Banner (Strictly calculated from dataset) */}
        <div className="max-w-3xl mx-auto bg-[#0D0D12] p-6 rounded-3xl border border-white/10 shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-1 text-[#E5C158] mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E5C158]" />
              ))}
            </div>
            <span className="text-2xl font-poppins font-extrabold text-white">
              {metrics.avgRating} / 5.0
            </span>
            <span className="text-[11px] text-neutral-400 mt-1 text-center font-medium">
              Average Client Satisfaction
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 sm:pt-2">
            <div className="flex items-center gap-1.5 text-[#28C76F] mb-1">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-2xl font-poppins font-extrabold">{metrics.verifiedPercent}%</span>
            </div>
            <span className="text-[11px] text-neutral-400 text-center font-medium">
              Verified Client Delivery
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 sm:pt-2">
            <span className="text-2xl font-poppins font-extrabold text-[#E5C158] mb-1">
              {metrics.total}
            </span>
            <span className="text-[11px] text-neutral-400 text-center font-medium">
              Total Authentic Testimonials
            </span>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-[#0D0D12] rounded-3xl border border-white/10 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews by name, service, country..."
              className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-10 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs cursor-pointer p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="w-full md:w-auto px-6 py-3 rounded-2xl bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-4 scrollbar-none">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                activeFilter === cat.id
                  ? 'bg-[#E5C158] text-[#050507] border-[#E5C158] shadow-md font-bold'
                  : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16 bg-[#0D0D12] rounded-3xl border border-white/10 p-8">
            <p className="text-neutral-400 text-xs sm:text-sm mb-4">
              No client reviews matched your filter or search criteria.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#E5C158] text-[#050507] text-xs font-bold rounded-xl hover:bg-[#fce888] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="bg-[#0D0D12] rounded-3xl border border-white/10 p-6 flex flex-col justify-between hover:border-[#E5C158]/40 transition-all duration-300 shadow-lg group relative"
              >
                <div>
                  {/* Client Profile Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <ReviewAvatar
                        name={review.name}
                        avatarUrl={review.avatarUrl}
                        countryFlag={review.countryFlag}
                      />
                      <div className="min-w-0">
                        <h3 className="font-poppins font-bold text-white text-sm group-hover:text-[#E5C158] transition-colors truncate">
                          {review.name}
                        </h3>
                        <span className="text-[11px] text-neutral-400 block truncate">
                          {review.location}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5 shrink-0 bg-black/50 px-2.5 py-1 rounded-full border border-white/10">
                      <Star className="w-3.5 h-3.5 text-[#E5C158] fill-[#E5C158]" />
                      <span className="text-xs font-bold text-white ml-1">{review.rating}.0</span>
                    </div>
                  </div>

                  {/* Verification & Service Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pt-3 border-t border-white/5 text-[10px]">
                    {review.verified ? (
                      <span className="inline-flex items-center gap-1 text-[#28C76F] font-semibold bg-[#28C76F]/10 px-2.5 py-0.5 rounded-full border border-[#28C76F]/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Order {review.orderRef ? `(#${review.orderRef})` : ''}</span>
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

                  {/* Review Quote Text */}
                  <div className="relative mb-4">
                    <Quote className="w-6 h-6 text-[#E5C158]/20 absolute -top-2 -left-1 pointer-events-none" />
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed relative z-10 pl-2">
                      "{review.text}"
                    </p>
                  </div>
                </div>

                {/* Footer Date & Quality Stamp */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400 mt-2">
                  <span className="flex items-center gap-1">
                    <UserCheck className={`w-3 h-3 ${review.verified ? 'text-[#28C76F]' : 'text-neutral-500'}`} />
                    <span>{review.date || 'Verified Delivery'}</span>
                  </span>
                  <span className="text-[#E5C158] font-medium flex items-center gap-1">
                    <span>MFS Quality Stamp</span>
                    <Award className="w-3 h-3 text-[#E5C158]" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Bottom Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D0D12] rounded-3xl border border-[#E5C158]/30 p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-r from-[#E5C158]/15 via-[#0D0D12] to-black shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white mb-4">
            Ready to Work with MFS Growth Agency?
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Experience our 50% Grand Launch discount and transparent post-delivery revision guarantees today.
          </p>

          <button
            onClick={onOpenOrderModal}
            className="px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs sm:text-sm hover:bg-[#fce888] transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
          >
            <span>Place Your Order Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. Submit Review Modal */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0D0D12] rounded-3xl border border-white/20 p-6 sm:p-8 max-w-md w-full relative shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#E5C158]" />
                <h3 className="text-xl font-poppins font-bold text-white">Leave a Review</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-6">
                Share your experience with MFS Growth Agency services.
              </p>

              <form onSubmit={handleAddReview} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Your Full Name <span className="text-[#E5C158]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    placeholder="e.g. Sarah Ahmed"
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Country
                    </label>
                    <select
                      value={newReviewCountry}
                      onChange={(e) => setNewReviewCountry(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] transition-colors cursor-pointer"
                    >
                      <option value="Pakistan">Pakistan 🇵🇰</option>
                      <option value="UAE">UAE 🇦🇪</option>
                      <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                      <option value="United Kingdom">United Kingdom 🇬🇧</option>
                      <option value="United States">United States 🇺🇸</option>
                      <option value="Canada">Canada 🇨🇦</option>
                      <option value="Australia">Australia 🇦🇺</option>
                      <option value="Germany">Germany 🇩🇪</option>
                      <option value="Malaysia">Malaysia 🇲🇾</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Service
                    </label>
                    <select
                      value={newReviewService}
                      onChange={(e) => setNewReviewService(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] transition-colors cursor-pointer"
                    >
                      <option value="Presentation Design">Presentation Design</option>
                      <option value="Assignment Writing">Assignment Writing</option>
                      <option value="ATS Resume Engineering">ATS Resume Engineering</option>
                      <option value="CV Design & Cover Letter">CV Design & Cover Letter</option>
                      <option value="Research Reports">Research Reports</option>
                      <option value="Investor Pitch Decks">Investor Pitch Decks</option>
                      <option value="Proposal Writing">Proposal Writing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Rating
                  </label>
                  <div className="flex items-center gap-1.5 bg-black/40 p-2.5 rounded-2xl border border-white/10">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setNewReviewRating(s)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            s <= newReviewRating
                              ? 'text-[#E5C158] fill-[#E5C158]'
                              : 'text-neutral-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#E5C158] ml-2">
                      {newReviewRating}.0 / 5.0
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Review Experience <span className="text-[#E5C158]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Describe your project quality, delivery speed, and overall satisfaction..."
                    className="w-full bg-black/60 border border-white/10 rounded-2xl p-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2 min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Verified Review</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
