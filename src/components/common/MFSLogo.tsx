import React, { useState } from 'react';

export type MFSLogoVariant = 'icon' | 'full' | 'compact' | 'full-brand';

export interface MFSLogoProps {
  className?: string;
  size?: number | string;
  variant?: MFSLogoVariant;
  showText?: boolean;
  showTagline?: boolean;
  textClassName?: string;
}

// Inline Hexa-Matrix Vector Symbol (100% Fail-Safe Fallback - Emblem 05)
const HexaMatrixSvg: React.FC<{ className?: string }> = ({ className = "w-full h-full object-contain" }) => (
  <svg 
    viewBox="0 0 512 512" 
    className={className}
    aria-label="MFS Growth Agency Hexa-Matrix Emblem"
  >
    <defs>
      <linearGradient id="topGoldFallback" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF5C8" />
        <stop offset="35%" stopColor="#FBE285" />
        <stop offset="100%" stopColor="#E0BD50" />
      </linearGradient>

      <linearGradient id="leftGoldFallback" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E5C158" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#9C720B" />
      </linearGradient>

      <linearGradient id="rightGoldFallback" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A2770C" />
        <stop offset="60%" stopColor="#735206" />
        <stop offset="100%" stopColor="#4B3402" />
      </linearGradient>

      <linearGradient id="specularGlowFallback" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FFF3C2" stopOpacity="0.3" />
      </linearGradient>
    </defs>

    <g transform="translate(0, 0)">
      <path d="M 256,52 L 436.5,156.2 L 256,260.4 L 75.5,156.2 Z M 256,126.8 L 143.2,191.6 L 256,256.4 L 368.8,191.6 Z" fill="url(#topGoldFallback)" fillRule="evenodd" />

      <polygon points="75.5,156.2 256,260.4 256,460 75.5,355.8" fill="url(#leftGoldFallback)" />
      <polygon points="143.2,191.6 256,256.4 256,381.2 143.2,316.4" fill="url(#rightGoldFallback)" opacity="0.85" />

      <polygon points="436.5,156.2 256,260.4 256,460 436.5,355.8" fill="url(#rightGoldFallback)" />
      <polygon points="368.8,191.6 256,256.4 256,381.2 368.8,316.4" fill="url(#leftGoldFallback)" opacity="0.85" />

      <polygon points="256,182 316,216.6 256,251.2 196,216.6" fill="url(#topGoldFallback)" />
      <polygon points="196,216.6 256,251.2 256,320.4 196,285.8" fill="url(#leftGoldFallback)" />
      <polygon points="256,251.2 316,216.6 316,285.8 256,320.4" fill="url(#rightGoldFallback)" />

      <line x1="256" y1="52" x2="256" y2="126.8" stroke="url(#specularGlowFallback)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="75.5" y1="156.2" x2="143.2" y2="191.6" stroke="url(#specularGlowFallback)" strokeWidth="2" />
      <line x1="436.5" y1="156.2" x2="368.8" y2="191.6" stroke="url(#specularGlowFallback)" strokeWidth="2" />
      
      <line x1="256" y1="182" x2="256" y2="251.2" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
      <line x1="196" y1="216.6" x2="256" y2="251.2" stroke="#FFF5C8" strokeWidth="1.5" />
      <line x1="316" y1="216.6" x2="256" y2="251.2" stroke="#FFF5C8" strokeWidth="1.5" />
      <line x1="256" y1="251.2" x2="256" y2="320.4" stroke="#FFF5C8" strokeWidth="2" />
    </g>
  </svg>
);

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

  const [imageSrc, setImageSrc] = useState<string>('/mfs-brand-mark.svg');
  const [useInlineSvg, setUseInlineSvg] = useState<boolean>(false);

  const handleImageError = () => {
    if (imageSrc === '/mfs-brand-mark.svg') {
      setImageSrc('/mfs-brand-mark.png');
    } else {
      setUseInlineSvg(true);
    }
  };

  const renderMark = () => {
    if (useInlineSvg) {
      return <HexaMatrixSvg />;
    }

    return (
      <img
        src={imageSrc}
        alt="MFS Growth Agency Hexa-Matrix Emblem"
        className="w-full h-full object-contain"
        loading="eager"
        decoding="async"
        onError={handleImageError}
      />
    );
  };

  // Icon-only rendering
  if (variant === 'icon' || !showText) {
    return (
      <div 
        className={`relative flex items-center justify-center flex-shrink-0 select-none ${className}`}
        style={{ width: iconPixelSize, height: iconPixelSize }}
      >
        {renderMark()}
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
          {renderMark()}
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
        {renderMark()}
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


