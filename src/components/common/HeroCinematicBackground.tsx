import React from 'react';
import { HeroAmbientCanvas } from './HeroAmbientCanvas';

interface HeroCinematicBackgroundProps {
  className?: string;
  videoUrl?: string; // Kept as optional prop for interface compatibility
}

export const HeroCinematicBackground: React.FC<HeroCinematicBackgroundProps> = ({
  className = '',
  videoUrl = '/videos/hero-cinematic.mp4',
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* 1. Base Layer: Deep Charcoal/Black (#050507) Brand Background */}
      <div className="absolute inset-0 bg-[#050507] z-0" />

      {/* 2. Cinematic Background Video Layer (WebM / MP4) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen pointer-events-none z-[1]"
      >
        <source src={videoUrl} type="video/mp4" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* 3. Vibrant Deep Gold Ambient Radial Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E5C158]/35 via-[#121118] to-[#050507] opacity-80" />

      {/* 4. Luminous Technical Grid Pattern for Depth */}
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_right,#E5C15818_1px,transparent_1px),linear-gradient(to_bottom,#E5C15818_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_80%,transparent_100%)] opacity-80" />

      {/* 5. High-Performance Interactive Particle Canvas Layer */}
      <HeroAmbientCanvas className="absolute inset-0 z-[3] opacity-90 pointer-events-none" />

      {/* 6. Glowing Top Ambient Light Beam - Intense Gold Core */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(229,193,88,0.30)_0%,rgba(212,175,55,0.15)_40%,transparent_75%)] pointer-events-none z-[4]" />

      {/* 7. Gold Accent Vignette & Edge Blending Layers for Perfect Text Readability */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-tr from-[#E5C158]/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-[#050507]/40 via-transparent to-[#050507] pointer-events-none" />
      <div className="absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,5,7,0.55)_80%,#050507_100%)] pointer-events-none" />
    </div>
  );
};
