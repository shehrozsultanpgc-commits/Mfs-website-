import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Sparkles,
  CheckCircle2,
  X,
  Send,
  Award,
  ThumbsUp,
  Heart,
  ShieldCheck,
  MessageSquare,
  Gift,
} from 'lucide-react';

interface ClientSatisfactionSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
  serviceTitle?: string;
  clientName?: string;
  onSubmitted?: (feedback: { rating: number; review: string; nps: number }) => void;
  onShowToast?: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const ClientSatisfactionSurveyModal: React.FC<ClientSatisfactionSurveyModalProps> = ({
  isOpen,
  onClose,
  orderId = 'MFS-ORD-7892',
  serviceTitle = 'Executive Presentation Design',
  clientName = 'Client',
  onSubmitted,
  onShowToast,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [npsScore, setNpsScore] = useState<number>(10);
  const [reviewText, setReviewText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSubmitted) {
        onSubmitted({ rating, review: reviewText, nps: npsScore });
      }
      if (onShowToast) {
        onShowToast('Thank you! Your verified review and 15% loyalty bonus have been recorded.', 'success');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-3xl bg-[#0F0F16] border border-[#E5C158]/40 shadow-2xl p-6 sm:p-8 relative text-white"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-xl bg-white/5 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-0.5 rounded-full uppercase">
                {orderId}
              </span>
              <h3 className="text-xl font-bold font-poppins text-white mt-2">
                Rate Your Project Experience
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {serviceTitle}
              </p>
            </div>

            {/* 5-Star Rating Selector */}
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold text-neutral-300 block">
                Overall Quality & Craftsmanship:
              </span>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 cursor-pointer transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        (hoverRating || rating) >= star
                          ? 'fill-[#E5C158] text-[#E5C158]'
                          : 'text-neutral-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* NPS 1 to 10 Scale */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span>How likely are you to recommend MFS to a peer?</span>
                <span className="font-bold text-[#E5C158] font-mono">{npsScore}/10</span>
              </div>
              <div className="grid grid-cols-10 gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setNpsScore(num)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      npsScore === num
                        ? 'bg-[#E5C158] text-black shadow-md'
                        : 'bg-[#050507] text-neutral-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Testimonial / Feedback Text */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-300 block">
                Public Testimonial / Designer Feedback:
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience regarding turnaround speed, visual aesthetics, or formatting precision..."
                rows={3}
                required
                className="w-full bg-[#050507] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:from-[#F0D27A] hover:to-[#E5C158] text-black font-bold text-xs sm:text-sm font-poppins transition-all shadow-xl shadow-[#E5C158]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Publishing Review...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-black" />
                  <span>Submit Verified Review (+15% Bonus Credit)</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold font-poppins text-white">
              Thank You for Your Feedback!
            </h3>
            <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Your feedback has been verified and added to the MFS Growth public ledger. A 15% loyalty bonus credit is now active in your wallet.
            </p>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#E5C158] text-black font-bold text-xs hover:bg-[#F0D27A] transition-all cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
