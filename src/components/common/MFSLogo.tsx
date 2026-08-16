import React from 'react';

export type MFSLogoVariant = 'icon' | 'full' | 'compact' | 'full-brand';

export interface MFSLogoProps {
  className?: string;
  size?: number | string;
  variant?: MFSLogoVariant;
  showText?: boolean;
  showTagline?: boolean;
  textClassName?: string;
}

export const MFSLogo: React.FC<MFSLogoProps> = ({
  className = '',
  size = 40,
  variant = 'icon',
  showText = true,
  showTagline = true,
  textClassName = '',
}) => {
  const numericSize = typeof size === 'number' ? size : parseInt(size as string, 10) || 40;
  const iconPixelSize = `${numericSize}px`;

  // Icon-only rendering
  if (variant === 'icon' || !showText) {
    return (
      <div 
        className={`relative flex items-center justify-center flex-shrink-0 select-none ${className}`}
        style={{ width: iconPixelSize, height: iconPixelSize }}
      >
        <img
          src="/mfs-brand-mark.svg"
          alt="MFS Growth Agency Brand Mark"
          className="w-full h-full object-contain"
          loading="eager"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('mfs-brand-mark.svg')) {
              target.src = '/mfs-brand-mark.png';
            }
          }}
        />
      </div>
    );
  }

  // Full Brand Lockup (MSS Monogram + MUHAMMAD SHEHROZ SULTAN + MFS GROWTH + DIGITAL AGENCY)
  if (variant === 'full-brand') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <div 
          className="relative flex items-center justify-center flex-shrink-0"
          style={{ width: iconPixelSize, height: iconPixelSize }}
        >
          <img
            src="/mfs-brand-mark.svg"
            alt="MFS Growth Agency Monogram"
            className="w-full h-full object-contain"
            loading="eager"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes('mfs-brand-mark.svg')) {
                target.src = '/mfs-brand-mark.png';
              }
            }}
          />
        </div>
        <div className={`flex flex-col text-left ${textClassName}`}>
          <span className="text-[9px] sm:text-[10px] font-semibold text-[#E5C158] tracking-[0.2em] uppercase font-poppins leading-none">
            Muhammad Shehroz Sultan
          </span>
          <span className="font-extrabold text-base sm:text-xl text-white font-poppins tracking-tight mt-0.5 leading-tight flex items-center gap-1.5">
            MFS <span className="gold-pure-gradient">GROWTH</span>
          </span>
          {showTagline && (
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-neutral-400 font-medium uppercase mt-0.5 font-poppins">
              Digital Agency
            </span>
          )}
        </div>
      </div>
    );
  }

  // Primary / Full / Compact Lockup (MSS Monogram + MFS Growth + Digital Agency)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div 
        className="relative flex items-center justify-center flex-shrink-0"
        style={{ width: iconPixelSize, height: iconPixelSize }}
      >
        <img
          src="/mfs-brand-mark.svg"
          alt="MFS Growth Agency Monogram"
          className="w-full h-full object-contain"
          loading="eager"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('mfs-brand-mark.svg')) {
              target.src = '/mfs-brand-mark.png';
            }
          }}
        />
      </div>
      <div className={`flex flex-col text-left ${textClassName}`}>
        <span className="font-extrabold text-base sm:text-lg text-white font-poppins tracking-tight leading-none flex items-center gap-1.5">
          MFS <span className="gold-pure-gradient">Growth</span>
        </span>
        {showTagline && (
          <span className="text-[10px] tracking-[0.2em] text-neutral-400 font-medium uppercase mt-0.5 font-poppins">
            Digital Agency
          </span>
        )}
      </div>
    </div>
  );
};

