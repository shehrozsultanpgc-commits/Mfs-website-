import React from 'react';
import { HeroAmbientCanvas } from './HeroAmbientCanvas';

interface HeroCinematicBackgroundProps {
  className?: string;
  videoUrl?: string; // Kept as optional prop for interface compatibility
}

export const HeroCinematicBackground: React.FC<HeroCinematicBackgroundProps> = ({
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* 1. Base Layer: Deep Charcoal/Black (#050507) Brand Background */}
      <div className="absolute inset-0 bg-[#050507] z-0" />

      {/* 2. Deep Gold Ambient Radial Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E5C158]/20 via-[#0D0D12] to-[#050507]" />

      {/* 3. Subtle Technical Grid Pattern for Depth */}
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,#E5C1580A_1px,transparent_1px),linear-gradient(to_bottom,#E5C1580A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

      {/* 4. High-Performance Interactive Particle Canvas Layer */}
      <HeroAmbientCanvas className="absolute inset-0 z-[2] opacity-60 pointer-events-none" />

      {/* 5. Glowing Top Ambient Light Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(229,193,88,0.15)_0%,rgba(212,175,55,0.05)_45%,transparent_70%)] pointer-events-none z-[3]" />

      {/* 6. Gold Accent Vignette & Edge Blending Layers for Perfect Text Readability */}
      <div className="absolute inset-0 z-[4] bg-gradient-to-tr from-[#E5C158]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[4] bg-gradient-to-b from-[#050507]/60 via-transparent to-[#050507] pointer-events-none" />
      <div className="absolute inset-0 z-[4] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,7,0.7)_80%,#050507_100%)] pointer-events-none" />
    </div>
  );
};
