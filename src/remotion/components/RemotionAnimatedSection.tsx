
// remotion/components/RemotionAnimatedSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useCurrentFrame, useVideoConfig } from 'remotion';

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  fadeInScale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
};

interface RemotionAnimatedSectionProps {
  variant: 'fadeIn' | 'fadeInUp' | 'fadeInScale' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  className?: string;
  children: React.ReactNode;
  isVisible?: boolean;
}

export const RemotionAnimatedSection: React.FC<RemotionAnimatedSectionProps> = ({
  variant,
  delay = 0,
  className,
  children,
  isVisible = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate the start frame for the animation based on delay
  const startFrame = delay * fps;

  // Determine if the component should be visible based on the current frame and start frame
  const shouldBeVisible = frame >= startFrame;

  const animationState = shouldBeVisible && isVisible ? "visible" : "hidden";

  return (
    <motion.div
      variants={variants[variant]}
      initial="hidden"
      animate={animationState}
      transition={{
        delay: 0, // Delay is handled by `startFrame` calculation
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
