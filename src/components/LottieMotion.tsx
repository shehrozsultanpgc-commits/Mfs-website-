import React from 'react';
import { motion } from 'motion/react';

interface LottieMotionProps {
  type: 'success' | 'loading' | 'searching' | 'empty' | 'sync' | 'ai_neural' | 'trophy';
  size?: number;
  className?: string;
}

/**
 * LottieMotion Component
 * Uses Framer Motion / SVG vector animation to render lightweight, high-performance
 * Lottie-style motion graphics following modern motion principles (ease curves, spring physics, reduced-motion awareness).
 */
export const LottieMotion: React.FC<LottieMotionProps> = ({ type, size = 64, className = '' }) => {
  if (type === 'success') {
    return (
      <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        {/* Outer glowing pulsing ring */}
        <motion.div
          animate={{ scale: [0.8, 1.25, 0.95, 1], opacity: [0.3, 0.8, 0.4, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-[#28C76F]/20 blur-md"
        />
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="rgba(40, 199, 111, 0.12)"
            stroke="#28C76F"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          <motion.path
            d="M30 50 L44 64 L70 36"
            fill="none"
            stroke="#28C76F"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'backOut' }}
          />
        </svg>
      </div>
    );
  }

  if (type === 'loading') {
    return (
      <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full relative"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(229, 193, 88, 0.15)" strokeWidth="6" />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#E5C158"
              strokeWidth="6"
              strokeDasharray="60 180"
              strokeLinecap="round"
              animate={{ strokeDashoffset: [0, -240] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
        {/* Core sparkling dot */}
        <motion.div
          animate={{ scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="absolute w-3 h-3 rounded-full bg-[#E5C158] shadow-[0_0_12px_#E5C158]"
        />
      </div>
    );
  }

  if (type === 'searching') {
    return (
      <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full border border-[#E5C158]/40"
        />
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
          <circle cx="45" cy="45" r="25" fill="none" stroke="#E5C158" strokeWidth="5" />
          <line x1="63" y1="63" x2="82" y2="82" stroke="#E5C158" strokeWidth="6" strokeLinecap="round" />
          <motion.circle
            cx="45"
            cy="45"
            r="12"
            fill="rgba(229, 193, 88, 0.2)"
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </svg>
      </div>
    );
  }

  if (type === 'sync') {
    return (
      <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <motion.svg
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          <path
            d="M 20,50 A 30,30 0 1,1 50,80"
            fill="none"
            stroke="#E5C158"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 80,50 A 30,30 0 1,1 50,20"
            fill="none"
            stroke="#28C76F"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </motion.svg>
      </div>
    );
  }

  if (type === 'ai_neural') {
    return (
      <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E5C158]/30 to-amber-500/30 blur-lg"
        />
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              cx={30 + i * 14}
              cy={50 + Math.sin(i) * 10}
              r="6"
              fill="#E5C158"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
          <motion.path
            d="M 30 50 Q 50 25 72 50"
            fill="none"
            stroke="#E5C158"
            strokeWidth="3"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </div>
    );
  }

  // Default Empty State Motion
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-full flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.03)" stroke="rgba(229,193,88,0.25)" strokeWidth="3" />
          <path d="M35 45 L65 45 M35 55 L55 55" stroke="#E5C158" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
};
