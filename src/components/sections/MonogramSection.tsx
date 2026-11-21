import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { WEDDING_CONFIG } from '../../config/wedding';
import type { Language, TranslationContent } from '../../i18n/translations';

interface MonogramSectionProps {
  t: TranslationContent;
  language: Language;
}

const INK_EASE = [0.22, 1, 0.36, 1] as const;

export const MonogramSection: React.FC<MonogramSectionProps> = ({ t, language }) => {
  const isAr = language === 'ar';
  const shouldReduceMotion = useReducedMotion();

  const drawTransition = (delay: number, duration = 0.95) =>
    shouldReduceMotion
      ? { duration: 0 }
      : {
          pathLength: { delay, duration, ease: INK_EASE },
          opacity: { delay, duration: 0.2, ease: 'easeOut' as const },
        };

  const initialDraw = shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 };

  return (
    <section
      id="monogram"
      className="relative py-20 sm:py-28 px-5 sm:px-8 forest-paper-texture text-[#F1EDE6] overflow-hidden"
    >
      {/* Subtle architectural hairline border inset */}
      <div
        className="pointer-events-none absolute inset-4 sm:inset-8 border border-[#CBAD8D]/28 rounded-sm"
        aria-hidden="true"
      />

      {/* Ambient warm champagne-gold radial glow behind emblem */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(203, 173, 141, 0.16) 0%, rgba(164, 131, 116, 0.05) 40%, transparent 64%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center text-center">
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: INK_EASE }}
          className={`text-sm sm:text-base text-[#CBAD8D] mb-7 ${
            isAr ? 'font-ar-serif' : 'font-en-serif uppercase tracking-[0.24em]'
          }`}
        >
          {t.monogram.eyebrow}
        </motion.p>

        {/* Uploaded Gold Overlapping R & M Logo Framed by Calligraphic Ink-Flow Crest Ring */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Animated SVG Calligraphy Crest Frame */}
          <svg
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="monogramGoldFoil"
                x1="44"
                y1="36"
                x2="276"
                y2="284"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#F1EDE6" />
                <stop offset="50%" stopColor="#CBAD8D" />
                <stop offset="100%" stopColor="#A48374" />
              </linearGradient>
            </defs>

            <motion.circle
              cx="160"
              cy="160"
              r="146"
              stroke="url(#monogramGoldFoil)"
              strokeOpacity="0.42"
              strokeWidth="1.2"
              initial={initialDraw}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={drawTransition(0.05, 1.1)}
            />
            <motion.circle
              cx="160"
              cy="160"
              r="136"
              stroke="url(#monogramGoldFoil)"
              strokeOpacity="0.62"
              strokeWidth="1.2"
              strokeDasharray="3 5"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, rotate: -12 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0, delay: 0.2, ease: INK_EASE }}
              style={{ transformOrigin: '160px 160px' }}
            />

            {/* Botanical arcs hugging the logo medallion */}
            <g stroke="url(#monogramGoldFoil)" strokeWidth="1.2" strokeLinecap="round">
              <motion.path
                d="M42 224C18 188 18 132 42 96"
                initial={initialDraw}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={drawTransition(0.25, 0.9)}
              />
              <motion.path
                d="M278 224C302 188 302 132 278 96"
                initial={initialDraw}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={drawTransition(0.25, 0.9)}
              />
            </g>

            {/* Top & Bottom diamond stars */}
            <path
              d="M160 15L164 22L160 29L156 22Z"
              stroke="url(#monogramGoldFoil)"
              strokeWidth="1.1"
              fill="#CBAD8D"
              fillOpacity="0.28"
            />
            <path
              d="M160 291L164 298L160 305L156 298Z"
              stroke="url(#monogramGoldFoil)"
              strokeWidth="1.1"
              fill="#CBAD8D"
              fillOpacity="0.28"
            />
          </svg>

          {/* Transparent Gold Foil M&R Logo Floating Directly Over Espresso Canvas */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: shouldReduceMotion ? 0 : 0.25, ease: INK_EASE }}
            className="w-[68%] h-[52%] flex items-center justify-center"
          >
            <img
              src={WEDDING_CONFIG.assets.monogramLogo}
              alt="R & M Monogram Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain object-center drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
        </div>

        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.45, ease: INK_EASE }}
          className={`mt-7 text-base sm:text-lg text-[#EBE3DB]/92 max-w-md leading-relaxed ${
            isAr ? 'font-ar-serif text-lg sm:text-xl' : 'font-en-serif italic text-xl'
          }`}
        >
          {t.monogram.caption}
        </motion.p>
      </div>
    </section>
  );
};
