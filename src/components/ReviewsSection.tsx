import React from 'react';
import { REVIEWS } from '../data/content';
import { CheckCircle2, Star, ArrowRight } from 'lucide-react';

interface ReviewsSectionProps {
  onViewAllReviews?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onViewAllReviews }) => {
  // Select top 6 featured reviews from diverse regions
  const featuredReviews = REVIEWS.slice(0, 6);

  return (
    <section id="reviews" className="py-24 relative bg-white/[0.01] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] block mb-2">
            Social Proof & Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-white mb-4">
            Verified Client <span className="gold-pure-gradient">Reviews</span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Genuine feedback from students and professionals across Pakistan, Middle East, Europe, and North America.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredReviews.map((review) => (
            <div
              key={review.id}
              className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between border border-white/10 hover:border-[#E5C158]/40 transition-all duration-300"
            >
              <div>
                {/* Review Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {review.avatarUrl ? (
                        <img
                          src={review.avatarUrl}
                          alt={review.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-[#E5C158] shrink-0"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-11 h-11 rounded-full border-2 border-[#E5C158] bg-[#1A1A1D] flex items-center justify-center text-white font-bold text-sm">${review.name.charAt(0)}</div>`;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full border-2 border-[#E5C158] bg-[#1A1A1D] flex items-center justify-center text-white font-bold text-sm">
                          {review.name.charAt(0)}
                        </div>
                      )}
                      {review.countryFlag && (
                        <span className="absolute -bottom-1 -right-1 text-xs bg-black/80 rounded-full px-1 border border-white/10">
                          {review.countryFlag}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-poppins font-bold text-white text-sm">
                        {review.name}
                      </h4>
                      <span className="text-xs text-neutral-400 block">
                        {review.location}
                      </span>
                    </div>
                  </div>

                  {/* Stars & Badge */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex items-center text-[#E5C158]">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#E5C158]" />
                      ))}
                    </div>
                    {review.verified && review.orderRef ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#28C76F] bg-[#28C76F]/10 border border-[#28C76F]/20 px-2 py-0.5 rounded-full font-semibold">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Verified ({review.orderRef})</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded-full font-medium">
                        <span>Client Review</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Service Tag */}
                {review.service && (
                  <div className="mb-3">
                    <span className="inline-block text-[10px] font-semibold text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/20 px-2 py-0.5 rounded-md">
                      Service: {review.service}
                    </span>
                  </div>
                )}

                {/* Review Body */}
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Reviews Button */}
        {onViewAllReviews && (
          <div className="text-center">
            <button
              onClick={onViewAllReviews}
              className="px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore All 18+ Client Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

