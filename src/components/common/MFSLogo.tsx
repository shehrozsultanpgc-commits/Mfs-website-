import React from 'react';

interface MFSLogoProps {
  className?: string;
  size?: number | string;
}

export const MFSLogo: React.FC<MFSLogoProps> = ({ className = '', size = 48 }) => {
  return (
    <div 
      className={`relative rounded-full flex items-center justify-center flex-shrink-0 select-none overflow-hidden shadow-lg shadow-[#E5C158]/20 ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        background: 'radial-gradient(circle at 35% 35%, #F5D77F 0%, #E5C158 45%, #C89F2A 80%, #906D14 100%)',
        border: '1.5px solid rgba(255, 235, 170, 0.4)',
        boxShadow: '0 4px 20px rgba(229, 193, 88, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.4)'
      }}
    >
      {/* Subtle metallic sheen overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.5) 100%)'
        }}
      />
      
      {/* Bold MFS text matching brand image */}
      <span 
        className="text-black font-black tracking-tight z-10 leading-none uppercase"
        style={{
          fontFamily: "'Poppins', 'Arial Black', sans-serif",
          fontSize: typeof size === 'number' ? `${Math.round(size * 0.36)}px` : '18px',
          letterSpacing: '-0.02em',
          fontWeight: 900,
          textShadow: '0 1px 1px rgba(255,255,255,0.3)'
        }}
      >
        MFS
      </span>
    </div>
  );
};
