import React, { useState } from 'react';
import { REVIEWS } from '../data/content';
import { ReviewItem } from '../types';
import {
  Star,
  CheckCircle2,
  Filter,
  Search,
  MessageSquarePlus,
  X,
  Send,
  ThumbsUp,
  Globe,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

interface ReviewsPageProps {
  onOpenOrderModal: () => void;
  onShowToast?: (msg: string) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  onOpenOrderModal,
  onShowToast,
}) => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pakistan' | 'me' | 'western' | 'academic' | 'career'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New review state
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewCountry, setNewReviewCountry] = useState('Pakistan');
  const [newReviewService, setNewReviewService] = useState('Presentation Design');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');

  const filterCategories = [
    { id: 'all', label: 'All Reviews (18+)' },
    { id: 'pakistan', label: '🇵🇰 Pakistan' },
    { id: 'me', label: '🇦🇪 🇸🇦 Middle East' },
    { id: 'western', label: '🌐 International (UK, US, EU, AU)' },
    { id: 'academic', label: '🎓 Academic Services' },
    { id: 'career', label: '💼 Career & Business' },
  ];

  const filteredReviews = reviewsList.filter((rev) => {
    // Search query filter
    const matchesSearch =
      rev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rev.service && rev.service.toLowerCase().includes(searchQuery.toLowerCase())) ||
      rev.text.toLowerCase().includes(searchQuery.toLowerCase());

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

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-custom-${Date.now()}`,
      name: newReviewName,
      location: `${newReviewCountry}`,
      country: newReviewCountry,
      countryFlag: newReviewCountry === 'Pakistan' ? '🇵🇰' : '🌐',
      service: newReviewService,
      date: 'Just now',
      rating: newReviewRating,
      text: newReviewText,
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
    <div className="w-full pt-28 pb-20 animate-fadeIn">
      {/* 1. Reviews Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          <span>VERIFIED CLIENT REVIEWS & FEEDBACK</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
          What Our <span className="gradient-gold-text">Global Clients</span> Say About Our Work
        </h1>

        <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
          Read genuine reviews from students, job seekers, researchers, and corporate professionals across Pakistan, Middle East, Europe, and North America.
        </p>

        {/* Aggregate Rating Banner */}
        <div className="max-w-3xl mx-auto glass-card p-6 rounded-2xl border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-1 text-[#E5C158] mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#E5C158]" />
              ))}
            </div>
            <span className="text-2xl font-poppins font-extrabold text-white">4.98 / 5.0</span>
            <span className="text-[11px] text-neutral-400 mt-0.5 text-center">Average rating from 1,200+ verified post-delivery client surveys</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 sm:pt-2">
            <span className="text-2xl font-poppins font-extrabold text-[#28C76F]">100% Verified</span>
            <span className="text-[11px] text-neutral-400 mt-0.5 text-center">Linked directly to MFS Order Reference IDs</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 sm:pt-2">
            <span className="text-2xl font-poppins font-extrabold text-[#E5C158]">1,200+</span>
            <span className="text-[11px] text-neutral-400 mt-0.5 text-center">Projects delivered across PK, UAE, UK, US & KSA</span>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="glass-card rounded-2xl border border-white/10 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews by name, service, country..."
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shrink-0"
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
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
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
          <div className="text-center py-16 glass-card rounded-2xl border border-white/10">
            <p className="text-neutral-400 text-sm mb-4">No client reviews matched your filter or search criteria.</p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#E5C158] text-[#050507] text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="glass-card rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-[#E5C158]/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] group"
              >
                <div>
                  {/* Header & Avatar */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {review.avatarUrl ? (
                          <img
                            src={review.avatarUrl}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#E5C158] shadow-sm"
                            onError={(e) => {
                              // Fallback image if unsplash URL fails
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="w-12 h-12 rounded-full border-2 border-[#E5C158] bg-[#1A1A1D] flex items-center justify-center text-white font-bold text-sm">${review.name.charAt(
                                  0
                                )}</div>`;
                              }
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full border-2 border-[#E5C158] bg-[#1A1A1D] flex items-center justify-center text-white font-bold text-sm">
                            {review.name.charAt(0)}
                          </div>
                        )}
                        {review.countryFlag && (
                          <span className="absolute -bottom-1 -right-1 text-sm bg-black/80 rounded-full px-1 border border-white/10">
                            {review.countryFlag}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="font-poppins font-bold text-white text-sm group-hover:text-[#E5C158] transition-colors">
                          {review.name}
                        </h3>
                        <span className="text-[11px] text-neutral-400 block">{review.location}</span>
                        {review.date && (
                          <span className="text-[10px] text-neutral-500 block mt-0.5">{review.date}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <div className="flex items-center text-[#E5C158]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#E5C158]" />
                        ))}
                      </div>
                      {review.verified && review.orderRef ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#28C76F] bg-[#28C76F]/10 border border-[#28C76F]/20 px-2 py-0.5 rounded-full font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified ({review.orderRef})</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded-full font-medium">
                          <span>Client Review</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Service Badge */}
                  {review.service && (
                    <div className="mb-3">
                      <span className="inline-block text-[10px] font-semibold text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/20 px-2.5 py-1 rounded-md">
                        Service: {review.service}
                      </span>
                    </div>
                  )}

                  {/* Review Text */}
                  <p className="text-xs text-neutral-300 leading-relaxed italic mb-4">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500">
                  <span className="flex items-center gap-1">
                    <UserCheck className={`w-3 h-3 ${review.verified ? 'text-[#28C76F]' : 'text-neutral-500'}`} />
                    <span>{review.verified && review.orderRef ? 'Verified Client Order' : 'Client Feedback'}</span>
                  </span>
                  <span>MFS Growth Review</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Bottom CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-r from-[#E5C158]/10 via-transparent to-black">
          <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white mb-4">
            Ready to Work with MFS Growth Agency?
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Join hundreds of satisfied clients in Pakistan, UAE, UK, US, and Saudi Arabia today.
          </p>

          <button
            onClick={onOpenOrderModal}
            className="px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
          >
            <span>Place Your Order Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. Submit Review Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card rounded-2xl border border-white/20 p-6 sm:p-8 max-w-md w-full relative">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-poppins font-bold text-white mb-2">Leave a Customer Review</h3>
            <p className="text-xs text-neutral-400 mb-6">
              Share your genuine experience with MFS Growth Agency services.
            </p>

            <form onSubmit={handleAddReview} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="e.g. Sarah Ahmed"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Country</label>
                  <select
                    value={newReviewCountry}
                    onChange={(e) => setNewReviewCountry(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
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
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Service</label>
                  <select
                    value={newReviewService}
                    onChange={(e) => setNewReviewService(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
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
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setNewReviewRating(s)}
                      className="p-1 cursor-pointer"
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
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Review Comments</label>
                <textarea
                  required
                  rows={4}
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Describe your project experience and turnaround time..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Submit Verified Review</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
