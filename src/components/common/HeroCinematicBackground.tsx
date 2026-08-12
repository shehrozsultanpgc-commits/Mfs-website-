import React, { useRef, useEffect, useState } from 'react';
import { HeroAmbientCanvas } from './HeroAmbientCanvas';

interface HeroCinematicBackgroundProps {
  videoUrl?: string;
  className?: string;
}

export const HeroCinematicBackground: React.FC<HeroCinematicBackgroundProps> = ({
  videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-41555-large.mp4',
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    setHasVideoError(false);

    // Strictly enforce muted & defaultMuted properties for mobile browser autoplay compliance
    videoEl.muted = true;
    videoEl.defaultMuted = true;

    const attemptPlay = async () => {
      try {
        await videoEl.play();
      } catch (err) {
        console.warn('Hero background video autoplay deferred by browser policy:', err);
      }
    };

    attemptPlay();
  }, [videoUrl]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Base Layer: Dark Canvas (#050507) matching MFS Growth Agency brand palette */}
      <div className="absolute inset-0 bg-[#050507] z-0" />

      {/* Fallback & Ambient Layer: Dark Gold Gradient for Maximum Contrast */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E5C158]/20 via-[#0A0A0F] to-[#050507]" />

      {/* HTML5 Video Layer: 100% Cross-Device Responsive Campus Interview Video */}
      {!hasVideoError && (
        <div className="absolute inset-0 z-[1] w-full h-full overflow-hidden opacity-75 sm:opacity-85 transition-opacity duration-700">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={() => {
              console.warn('Hero campus interview video load error, displaying dark gold gradient fallback.');
              setHasVideoError(true);
            }}
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105 saturate-105 pointer-events-none"
          >
            <source src={videoUrl} type="video/mp4" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Dark Gold Gradient Overlay Layer: Guarantees 100% Text Readability over Video */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/80 via-black/50 to-black/80 pointer-events-none" />

      {/* Interactive Ambient Particle Canvas Layer */}
      <HeroAmbientCanvas className="absolute inset-0 z-[3] opacity-30 pointer-events-none" />

      {/* Subtle Radial Gold Highlight & Top/Bottom Vignette Edge Blending */}
      <div className="absolute inset-0 z-[4] bg-gradient-to-tr from-[#E5C158]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[4] bg-gradient-to-b from-[#050507]/80 via-transparent to-[#050507] pointer-events-none" />
      <div className="absolute inset-0 z-[4] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,7,0.6)_80%,#050507_100%)] pointer-events-none" />
    </div>
  );
};
