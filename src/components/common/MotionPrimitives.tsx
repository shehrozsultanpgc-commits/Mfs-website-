import React from 'react';
import { motion, MotionProps, useReducedMotion } from 'motion/react';

// Centralized Motion Design Tokens
export const EASING = {
  smooth: [0.215, 0.61, 0.355, 1], // Cubic bezier for fluid enter
  expressive: [0.16, 1, 0.3, 1], // Luxurious smooth ease out
  spring: { type: 'spring', stiffness: 400, damping: 25 },
  subtleSpring: { type: 'spring', stiffness: 300, damping: 30 },
  bounce: { type: 'spring', stiffness: 500, damping: 20 },
};

export const DURATION = {
  micro: 0.15,
  fast: 0.22,
  normal: 0.35,
  slow: 0.5,
  hero: 0.7,
};

// Reusable Motion Component Props
interface BaseMotionProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Fade Up Reveal Component
export const FadeUp: React.FC<BaseMotionProps> = ({ children, className = '', delay = 0, ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: DURATION.normal, ease: EASING.expressive, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Simple Fade In Component
export const FadeIn: React.FC<BaseMotionProps> = ({ children, className = '', delay = 0, ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: DURATION.normal, ease: 'easeInOut', delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scale In Component for Modals & Cards
export const ScaleIn: React.FC<BaseMotionProps> = ({ children, className = '', delay = 0, ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: DURATION.normal, ease: EASING.expressive, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger Container for Grids and Lists
export const StaggerContainer: React.FC<BaseMotionProps> = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger Item Child Component
export const StaggerItem: React.FC<BaseMotionProps> = ({ children, className = '', ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.normal, ease: EASING.expressive },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Pressable Tactile Button Wrapper
interface PressableButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold';
  disabled?: boolean;
}

export const PressableButton: React.FC<PressableButtonProps> = ({
  children,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <button type={type} disabled={disabled} onClick={onClick} className={className} {...props}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ duration: DURATION.fast, ease: 'easeOut' }}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Tactile Hover Lift Container for Cards
export const HoverLift: React.FC<BaseMotionProps> = ({ children, className = '', ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: DURATION.fast, ease: 'easeOut' } }}
      whileTap={{ scale: 0.99 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Page Transition Container
export const PageTransition: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: DURATION.normal, ease: EASING.expressive }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
