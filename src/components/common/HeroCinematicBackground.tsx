import React, { useRef, useEffect } from 'react';
import { HeroAmbientCanvas } from './HeroAmbientCanvas';

interface HeroCinematicBackgroundProps {
  videoUrl?: string;
  className?: string;
}

export const HeroCinematicBackground: React.FC<HeroCinematicBackgroundProps> = ({
  videoUrl = '/videos/hero-cinematic.mp4',
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Explicitly set muted & defaultMuted for browser autoplay compliance
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
      {/* Layer 1: Dark Base Canvas (#050507) matching MFS Growth Agency brand theme */}
      <div className="absolute inset-0 bg-[#050507] z-0" />

      {/* Layer 2: Main Background Video (Always Mounted, Direct Source, Zero Fallback Image Overrides) */}
      <div className="absolute inset-0 z-[1] opacity-75 sm:opacity-85 transition-opacity duration-500">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={() => {
            const mediaError = videoRef.current?.error;
            if (mediaError && mediaError.code) {
              console.warn(
                'Hero video media error:',
                mediaError.code,
                mediaError.message,
                videoRef.current?.currentSrc
              );
            }
          }}
          className="w-full h-full object-cover object-center sm:object-[center_35%] filter brightness-95 contrast-105 saturate-100 pointer-events-none"
        />
      </div>

      {/* Layer 3: Interactive Ambient Canvas Particles */}
      <HeroAmbientCanvas className="absolute inset-0 z-[2] opacity-35 pointer-events-none" />

      {/* Layer 4: Subtle Gold Ambient Radial Highlight */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-tr from-[#E5C158]/5 via-transparent to-transparent pointer-events-none" />

      {/* Layer 5: Edge Blending & Soft Radial Vignette for High Text Readability */}
      <div className="absolute inset-0 z-[4] bg-gradient-to-b from-[#050507]/80 via-[#050507]/30 to-[#050507] pointer-events-none" />
      <div className="absolute inset-0 z-[4] bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,5,7,0.5)_75%,#050507_100%)] pointer-events-none" />
    </div>
  );
};
