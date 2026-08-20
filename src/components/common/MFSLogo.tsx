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
        <stop offset="0%" stopColor="#FDE895" />
        <stop offset="45%" stopColor="#F5D676" />
        <stop offset="100%" stopColor="#ECCB62" />
      </linearGradient>

      <linearGradient id="leftGoldFallback" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E5C158" />
        <stop offset="60%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#A57D13" />
      </linearGradient>

      <linearGradient id="rightGoldFallback" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#B88B22" />
        <stop offset="50%" stopColor="#916B10" />
        <stop offset="100%" stopColor="#5E4304" />
      </linearGradient>
    </defs>

    <g transform="translate(0, 0)">
      {/* OUTER HOLLOW HEXAMATRIX FRAME */}
      {/* Top Face (Hollow Chevron Surface) */}
      <polygon 
        points="102,167 256,78 410,167 358,197 256,138 154,197" 
        fill="url(#topGoldFallback)" 
      />

      {/* Left Outer Face */}
      <polygon 
        points="102,167 154,197 154,315 256,374 256,434 102,345" 
        fill="url(#leftGoldFallback)" 
      />

      {/* Right Outer Face */}
      <polygon 
        points="410,167 358,197 358,315 256,374 256,434 410,345" 
        fill="url(#rightGoldFallback)" 
      />

      {/* FLOATING SUSPENDED CORE CUBE IN OPEN SPACE */}
      {/* Center Cube Top Face */}
      <polygon 
        points="256,196 306,225 256,254 206,225" 
        fill="url(#topGoldFallback)" 
      />

      {/* Center Cube Left Face */}
      <polygon 
        points="206,225 256,254 256,314 206,285" 
        fill="url(#leftGoldFallback)" 
      />

      {/* Center Cube Right Face */}
      <polygon 
        points="256,254 306,225 306,285 256,314" 
        fill="url(#rightGoldFallback)" 
      />

      {/* CRISP SEPARATOR EDGES */}
      <line x1="102" y1="167" x2="154" y2="197" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
      <line x1="410" y1="167" x2="358" y2="197" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
      <line x1="256" y1="434" x2="256" y2="374" stroke="#121212" strokeWidth="2" strokeLinecap="round" />

      <line x1="206" y1="225" x2="256" y2="254" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="306" y1="225" x2="256" y2="254" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="256" y1="254" x2="256" y2="314" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
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

  // Full Brand Lockup (MFS Hexa-Matrix Emblem + MUHAMMAD SHEHROZ SULTAN + MFS GROWTH + DIGITAL AGENCY)
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

  // Primary / Full / Compact Lockup (MFS Hexa-Matrix Emblem + MFS Growth + Digital Agency)
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


