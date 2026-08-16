import React from 'react';

interface MFSLogoProps {
  className?: string;
  size?: number | string;
}

export const MFSLogo: React.FC<MFSLogoProps> = ({ className = '', size = 48 }) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div 
      className={`relative rounded-full flex items-center justify-center flex-shrink-0 select-none overflow-hidden ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
      }}
    >
      <img
        src="/mfs-logo.png"
        alt="MFS Growth Agency Logo"
        className="w-full h-full object-cover rounded-full"
        loading="eager"
        decoding="async"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.includes('mfs-logo.png')) {
            target.src = '/mfs-logo.svg';
          }
        }}
      />
    </div>
  );
};
