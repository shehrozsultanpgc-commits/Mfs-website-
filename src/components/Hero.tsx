import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenOrderModal: () => void;
  onViewWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal, onViewWork }) => {
  return (
    <section id="hero" className="pt-32 pb-20 md:pt-44 md:pb-28 relative overflow-hidden">
      {/* Background ambient light orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E5C158]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top promo badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/20 text-[#E5C158] text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>50% Grand Launch Discount Active</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-poppins leading-[1.15] mb-6">
              Professional Presentations &{' '}
              <span className="gold-pure-gradient">Assignments</span> Delivered with Excellence.
            </h1>

            <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              MFS Growth Agency delivers premium, custom-formatted documents, presentations, resumes, and reports to help students and professionals excel globally.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-[#050507] font-extrabold text-sm tracking-wide shadow-[0_4px_25px_rgba(229,193,88,0.25)] hover:shadow-[0_8px_35px_rgba(229,193,88,0.4)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Order Now (50% OFF)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewWork}
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card hover:border-[#E5C158]/50 text-white font-semibold text-sm hover:bg-white/[0.04] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Our Work</span>
              </button>
            </div>

            {/* Quick feature checklist */}
            <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
                <span>24-Hour Express Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
                <span>100% Plagiarism Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
                <span>Free Revisions Included</span>
              </div>
            </div>
          </div>

          {/* Hero Illustration Right */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none h-[380px] sm:h-[440px] rounded-2xl border border-white/10 bg-radial from-[#E5C158]/10 via-[#0b0b0e] to-[#050507] p-6 flex items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden glass-card">
              
              {/* SVG Isometric Artwork */}
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Grid */}
                <path d="M 0,50 L 400,50 M 0,100 L 400,100 M 0,150 L 400,150 M 0,200 L 400,200 M 0,250 L 400,250 M 0,300 L 400,300 M 0,350 L 400,350" stroke="rgba(229,193,88,0.04)" strokeWidth="1"/>
                <path d="M 50,0 L 50,400 M 100,0 L 100,400 M 150,0 L 150,400 M 200,0 L 200,400 M 250,0 L 250,400 M 300,0 L 300,400 M 350,0 L 350,400" stroke="rgba(229,193,88,0.04)" strokeWidth="1"/>
                
                {/* Floating Isometric Deck */}
                <g className="animate-float-deck">
                  {/* Lower card layer */}
                  <rect x="100" y="160" width="190" height="135" rx="14" fill="rgba(13,13,16,0.9)" stroke="rgba(229,193,88,0.15)" strokeWidth="1.5"/>
                  <line x1="120" y1="190" x2="220" y2="190" stroke="rgba(255,255,255,0.2)" strokeWidth="6" strokeLinecap="round"/>
                  <line x1="120" y1="210" x2="260" y2="210" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="120" y1="228" x2="240" y2="228" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="120" y1="245" x2="180" y2="245" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round"/>
                  
                  {/* Upper glassy slide deck layer */}
                  <rect x="125" y="105" width="190" height="135" rx="14" fill="rgba(26,26,32,0.8)" stroke="rgba(229,193,88,0.35)" strokeWidth="1.5"/>
                  <line x1="145" y1="135" x2="265" y2="135" stroke="#E5C158" strokeWidth="6" strokeLinecap="round"/>
                  <line x1="145" y1="155" x2="285" y2="155" stroke="rgba(255,255,255,0.5)" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="145" y1="172" x2="245" y2="172" stroke="rgba(255,255,255,0.25)" strokeWidth="4" strokeLinecap="round"/>
                  
                  {/* Accent geometry inside glass card */}
                  <rect x="145" y="190" width="45" height="28" rx="5" fill="rgba(229,193,88,0.15)" stroke="rgba(229,193,88,0.3)" strokeWidth="1"/>
                  <circle cx="265" cy="204" r="12" fill="#E5C158"/>
                </g>

                {/* Orbiting Badges */}
                <g className="animate-float-badge">
                  <circle cx="85" cy="115" r="22" fill="rgba(40,199,111,0.18)" stroke="rgba(40,199,111,0.35)" strokeWidth="1.2"/>
                  <text x="85" y="120" fontFamily="Inter, sans-serif" fontSize="15" fill="#28C76F" textAnchor="middle" fontWeight="bold">✓</text>
                  
                  <circle cx="315" cy="280" r="28" fill="rgba(229,193,88,0.15)" stroke="rgba(229,193,88,0.4)" strokeWidth="1.2"/>
                  <text x="315" y="285" fontFamily="Poppins, sans-serif" fontSize="13" fill="#E5C158" textAnchor="middle" fontWeight="bold">50%</text>
                </g>
              </svg>

              {/* Glass subtle tag */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] text-neutral-300 backdrop-blur-md">
                ⚡ Executive Quality Guaranteed
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
