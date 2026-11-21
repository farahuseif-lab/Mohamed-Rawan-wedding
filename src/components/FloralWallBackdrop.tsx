import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

type OrnamentVariant = 'taupePetal' | 'stonePetal' | 'champagneLeaf';

interface FloatingOrnamentSpec {
  id: string;
  variant: OrnamentVariant;
  positionClass: string;
  sizeClass: string;
  baseOpacity: number;
  driftX: number;
  driftY: number;
  driftRotate: number;
  duration: number;
  delay: number;
  parallaxRange: [number, number];
  initialRotate: number;
}

const FLOATING_ORNAMENTS: FloatingOrnamentSpec[] = [
  {
    id: 'petal-top-left',
    variant: 'stonePetal',
    positionClass: 'top-[14%] left-[2%] sm:left-[5%]',
    sizeClass: 'w-9 h-9 sm:w-11 sm:h-11',
    baseOpacity: 0.28,
    driftX: 10,
    driftY: -18,
    driftRotate: 10,
    duration: 16,
    delay: 0,
    parallaxRange: [-20, 85],
    initialRotate: -22,
  },
  {
    id: 'leaf-upper-right',
    variant: 'champagneLeaf',
    positionClass: 'top-[26%] right-[3%] sm:right-[7%]',
    sizeClass: 'w-9 h-9 sm:w-12 sm:h-12',
    baseOpacity: 0.24,
    driftX: -11,
    driftY: 20,
    driftRotate: -10,
    duration: 18,
    delay: 1.5,
    parallaxRange: [25, -80],
    initialRotate: 20,
  },
  {
    id: 'taupe-mid-left',
    variant: 'taupePetal',
    positionClass: 'hidden sm:block top-[48%] left-[4%] md:left-[7%]',
    sizeClass: 'w-9 h-9 md:w-11 md:h-11',
    baseOpacity: 0.22,
    driftX: 8,
    driftY: -14,
    driftRotate: 8,
    duration: 21,
    delay: 0.8,
    parallaxRange: [-30, 75],
    initialRotate: 14,
  },
  {
    id: 'petal-mid-right',
    variant: 'stonePetal',
    positionClass: 'top-[58%] right-[2%] sm:right-[5%]',
    sizeClass: 'w-8 h-8 sm:w-11 sm:h-11',
    baseOpacity: 0.26,
    driftX: -9,
    driftY: -18,
    driftRotate: -11,
    duration: 19,
    delay: 3.1,
    parallaxRange: [20, -90],
    initialRotate: 38,
  },
  {
    id: 'leaf-lower-left',
    variant: 'champagneLeaf',
    positionClass: 'hidden sm:block top-[72%] left-[5%] md:left-[8%]',
    sizeClass: 'w-9 h-9 md:w-11 md:h-11',
    baseOpacity: 0.22,
    driftX: 11,
    driftY: 16,
    driftRotate: 12,
    duration: 17,
    delay: 2.2,
    parallaxRange: [-25, 75],
    initialRotate: -28,
  },
];

const OrnamentGlyph: React.FC<{ variant: OrnamentVariant }> = ({ variant }) => {
  if (variant === 'champagneLeaf') {
    return (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" aria-hidden="true">
        <path
          d="M12 50C20 34 32 20 50 10C48 28 36 44 12 50Z"
          fill="#CBAD8D"
          fillOpacity="0.6"
          stroke="#A48374"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
        <path d="M13 49C25 36 37 24 49 11" stroke="#3A2D28" strokeOpacity="0.35" strokeWidth="0.9" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === 'taupePetal') {
    return (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" aria-hidden="true">
        <path
          d="M32 10C22 14 14 26 16 40C18 50 26 54 32 54C38 54 46 50 48 40C50 26 42 14 32 10Z"
          fill="#A48374"
          fillOpacity="0.58"
          stroke="#3A2D28"
          strokeOpacity="0.3"
          strokeWidth="0.95"
        />
        <path d="M32 16C30 28 30 40 32 51" stroke="#F1EDE6" strokeOpacity="0.45" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" aria-hidden="true">
      <path
        d="M32 10C22 14 14 26 16 40C18 50 26 54 32 54C38 54 46 50 48 40C50 26 42 14 32 10Z"
        fill="#D1C7BD"
        fillOpacity="0.68"
        stroke="#A48374"
        strokeOpacity="0.42"
        strokeWidth="0.95"
      />
      <path d="M32 15C30 28 30 40 32 51" stroke="#F1EDE6" strokeOpacity="0.72" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
};

interface FloatingBotanicalItemProps {
  spec: FloatingOrnamentSpec;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  shouldReduceMotion: boolean | null;
}

const FloatingBotanicalItem: React.FC<FloatingBotanicalItemProps> = ({
  spec,
  scrollYProgress,
  shouldReduceMotion,
}) => {
  const parallaxY = useTransform(scrollYProgress, [0, 1], spec.parallaxRange);

  return (
    <motion.div
      className={`absolute ${spec.positionClass} ${spec.sizeClass}`}
      style={{
        y: shouldReduceMotion ? 0 : parallaxY,
        opacity: spec.baseOpacity,
        rotate: spec.initialRotate,
        willChange: 'transform',
      }}
    >
      <motion.div
        className="w-full h-full"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, spec.driftX, -spec.driftX * 0.5, 0],
                y: [0, spec.driftY, spec.driftY * 0.35, 0],
                rotate: [0, spec.driftRotate, -spec.driftRotate * 0.6, 0],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: spec.duration,
                delay: spec.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      >
        <OrnamentGlyph variant={spec.variant} />
      </motion.div>
    </motion.div>
  );
};

export const FloralWallBackdrop: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {FLOATING_ORNAMENTS.map((spec) => (
        <FloatingBotanicalItem
          key={spec.id}
          spec={spec}
          scrollYProgress={scrollYProgress}
          shouldReduceMotion={shouldReduceMotion}
        />
      ))}
    </div>
  );
};
