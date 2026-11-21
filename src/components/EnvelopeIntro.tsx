import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { WEDDING_CONFIG } from '../config/wedding';
import type { Language, TranslationContent } from '../i18n/translations';

interface EnvelopeIntroProps {
  t: TranslationContent;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenStart: () => void;
  onOpenComplete: () => void;
}

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
const FLAP_EASE = [0.28, 0.06, 0.2, 1] as const;

const espressoEnvelopeStyle: React.CSSProperties = {
  backgroundImage: `url('${WEDDING_CONFIG.assets.envelopeTexture}')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'grayscale(0.55) sepia(0.38) brightness(0.84) contrast(1.06)',
};

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({
  t,
  language,
  onLanguageChange,
  onOpenStart,
  onOpenComplete,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isAr = language === 'ar';

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Warm image decode cache so the first click animates with zero frame drops
    [WEDDING_CONFIG.assets.envelopeTexture, WEDDING_CONFIG.assets.monogramLogo].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleOpen = () => {
    if (isOpening) return;

    // Trigger music synchronously inside user tap handler
    onOpenStart();
    setIsOpening(true);

    if (shouldReduceMotion) {
      setIsRevealing(true);
      window.setTimeout(() => onOpenComplete(), 380);
      return;
    }

    // Single smooth continuous choreography:
    // Flaps glide open (0.08s - 1.35s), inner card & calligraphy reveal (0.65s - 2.4s),
    // then gentle cross-dissolve into the main invitation (2.6s - 3.45s)
    window.setTimeout(() => setIsRevealing(true), 2650);
    window.setTimeout(() => onOpenComplete(), 3480);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#281E1A] overflow-hidden select-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: isRevealing ? 0 : 1, scale: isRevealing ? 1.025 : 1 }}
      transition={{ duration: 0.82, ease: LUXURY_EASE }}
      style={{
        pointerEvents: isRevealing ? 'none' : 'auto',
        willChange: 'opacity, transform',
      }}
    >
      {/* Top Language Switcher Floating Cleanly Over Envelope */}
      <motion.div
        className="fixed top-4 inset-x-0 z-40 px-4 sm:px-8 flex items-center justify-between max-w-5xl mx-auto"
        animate={{ opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <span
          className={`text-sm sm:text-base text-[#F1EDE6] tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)] ${
            isAr ? 'font-ar-serif' : 'font-en-serif uppercase tracking-[0.2em]'
          }`}
        >
          {t.envelope.invitationTag}
        </span>

        <div
          className="inline-flex items-center rounded-md border border-[#CBAD8D]/45 bg-[#3A2D28]/85 p-0.5 backdrop-blur-md shadow-md"
          role="group"
          aria-label="Language switcher"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLanguageChange('ar');
            }}
            className={`px-3 py-1.5 text-xs sm:text-sm font-ar-sans rounded transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
              language === 'ar'
                ? 'bg-[#F1EDE6] text-[#3A2D28] font-semibold'
                : 'text-[#EBE3DB] hover:text-white'
            }`}
          >
            {t.nav.toggleAr}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLanguageChange('en');
            }}
            className={`px-3 py-1.5 text-xs sm:text-sm font-en-serif tracking-wider rounded transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
              language === 'en'
                ? 'bg-[#F1EDE6] text-[#3A2D28] font-semibold'
                : 'text-[#EBE3DB] hover:text-white'
            }`}
          >
            {t.nav.toggleEn}
          </button>
        </div>
      </motion.div>

      {/* Full-Height Embossed Envelope Stage */}
      <div className="envelope-stage relative w-full h-full max-w-[500px] mx-auto overflow-hidden sm:my-6 sm:h-[min(92dvh,840px)] sm:rounded-[10px] sm:shadow-[0_36px_90px_rgba(14,10,8,0.82)]">
        <div
          role="button"
          tabIndex={0}
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          aria-label={t.envelope.ariaOpen}
          className={`relative w-full h-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CBAD8D] ${
            isOpening ? 'cursor-default' : 'cursor-pointer group'
          }`}
        >
          {/* 1. Deep Velvet Espresso Inner Card Cavity (#3A2D28) */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 py-10 text-center overflow-hidden"
            style={{
              zIndex: 5,
              background:
                'radial-gradient(ellipse 88% 72% at 50% 45%, #4A3932 0%, #3A2D28 56%, #261D19 100%)',
              willChange: 'transform, opacity',
            }}
            initial={{ scale: 0.94 }}
            animate={
              isOpening
                ? { scale: 1 }
                : { scale: 0.94 }
            }
            transition={{ duration: 1.5, ease: LUXURY_EASE }}
          >
            {/* Subtle Embossed Floral Corners on Inner Card */}
            <div
              className="absolute top-0 left-0 w-40 h-48 pointer-events-none opacity-[0.2] mix-blend-screen"
              style={{
                ...espressoEnvelopeStyle,
                maskImage: 'radial-gradient(circle at top left, #000 28%, transparent 76%)',
                WebkitMaskImage: 'radial-gradient(circle at top left, #000 28%, transparent 76%)',
              }}
            />
            <div
              className="absolute top-0 right-0 w-40 h-48 pointer-events-none opacity-[0.2] mix-blend-screen"
              style={{
                ...espressoEnvelopeStyle,
                maskImage: 'radial-gradient(circle at top right, #000 28%, transparent 76%)',
                WebkitMaskImage: 'radial-gradient(circle at top right, #000 28%, transparent 76%)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-40 h-48 pointer-events-none opacity-[0.2] mix-blend-screen"
              style={{
                ...espressoEnvelopeStyle,
                maskImage: 'radial-gradient(circle at bottom left, #000 28%, transparent 76%)',
                WebkitMaskImage: 'radial-gradient(circle at bottom left, #000 28%, transparent 76%)',
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-40 h-48 pointer-events-none opacity-[0.2] mix-blend-screen"
              style={{
                ...espressoEnvelopeStyle,
                maskImage: 'radial-gradient(circle at bottom right, #000 28%, transparent 76%)',
                WebkitMaskImage: 'radial-gradient(circle at bottom right, #000 28%, transparent 76%)',
              }}
            />

            {/* Delicate Inner Champagne Hairline Border (#CBAD8D) */}
            <motion.div
              className="absolute inset-5 sm:inset-7 border border-[#CBAD8D]/30 pointer-events-none"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: isOpening ? 1 : 0, scale: isOpening ? 1 : 0.98 }}
              transition={{ duration: 1.0, delay: 0.45, ease: LUXURY_EASE }}
            />

            {/* Monogram & Calligraphic "You're Invited!" Script Reveal */}
            <div className="relative z-10 flex flex-col items-center justify-center max-w-sm">
              <motion.div
                className="w-16 h-12 mb-5 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.88, y: 6 }}
                animate={
                  isOpening
                    ? { opacity: 0.95, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.88, y: 6 }
                }
                transition={{ duration: 0.85, delay: 0.72, ease: LUXURY_EASE }}
              >
                <img
                  src={WEDDING_CONFIG.assets.monogramLogo}
                  alt="R & M"
                  className="w-full h-full object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
                />
              </motion.div>

              <motion.div
                className="overflow-hidden px-3 py-1"
                initial={{
                  opacity: 0,
                  clipPath: isAr ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
                }}
                animate={
                  isOpening
                    ? { opacity: 1, clipPath: 'inset(0 0% 0 0%)' }
                    : {
                        opacity: 0,
                        clipPath: isAr ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
                      }
                }
                transition={{ duration: 1.15, delay: 0.9, ease: LUXURY_EASE }}
              >
                <h2
                  className={
                    isAr
                      ? 'font-ar-calligraphy text-3xl sm:text-4xl text-[#F1EDE6] leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]'
                      : 'font-en-script text-5xl sm:text-6xl text-[#F1EDE6] leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]'
                  }
                  dir={isAr ? 'rtl' : 'ltr'}
                  lang={isAr ? 'ar' : 'en'}
                >
                  {t.envelope.youreInvited}
                </h2>
              </motion.div>

              <motion.div
                className="flex flex-col items-center mt-4"
                initial={{ opacity: 0, y: 12 }}
                animate={isOpening ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.9, delay: 1.32, ease: LUXURY_EASE }}
              >
                <div className="w-16 h-px bg-[#CBAD8D]/55 mb-3" />
                <p
                  className="font-ar-calligraphy text-xl sm:text-2xl text-[#EBE3DB]"
                  dir="rtl"
                  lang="ar"
                >
                  روان علاء الدين &amp; محمد هلال
                </p>
                <p className="text-xs sm:text-sm text-[#CBAD8D] tracking-[0.22em] uppercase mt-1.5 font-en-serif">
                  {t.envelope.date}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* 2A. Bottom Triangular Flap — Glides Smoothly Downward Out of Frame */}
          <motion.div
            className="envelope-flap-wing absolute inset-0 pointer-events-none"
            style={{ zIndex: 14 }}
            initial={{ y: '0%', opacity: 1 }}
            animate={isOpening ? { y: '105%', opacity: 0.9 } : { y: '0%', opacity: 1 }}
            transition={{
              duration: 1.35,
              delay: 0.08,
              ease: FLAP_EASE,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                ...espressoEnvelopeStyle,
                clipPath: 'polygon(50% 51%, 100.5% 100.5%, -0.5% 100.5%)',
              }}
            />
            <div
              className="absolute inset-x-0 top-[50%] h-8 pointer-events-none opacity-45"
              style={{
                background: 'linear-gradient(180deg, rgba(20,14,12,0.55) 0%, transparent 100%)',
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
              }}
            />
          </motion.div>

          {/* 2B. Left Triangular Flap — Glides Smoothly Left Out of Frame */}
          <motion.div
            className="envelope-flap-wing absolute inset-0 pointer-events-none"
            style={{ zIndex: 18 }}
            initial={{ x: '0%', opacity: 1 }}
            animate={isOpening ? { x: '-106%', opacity: 0.92 } : { x: '0%', opacity: 1 }}
            transition={{
              duration: 1.3,
              delay: 0.1,
              ease: FLAP_EASE,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                ...espressoEnvelopeStyle,
                clipPath: 'polygon(-0.5% -0.5%, 50.6% 51.5%, -0.5% 100.5%)',
              }}
            />
          </motion.div>

          {/* 2C. Right Triangular Flap — Glides Smoothly Right Out of Frame */}
          <motion.div
            className="envelope-flap-wing absolute inset-0 pointer-events-none"
            style={{ zIndex: 18 }}
            initial={{ x: '0%', opacity: 1 }}
            animate={isOpening ? { x: '106%', opacity: 0.92 } : { x: '0%', opacity: 1 }}
            transition={{
              duration: 1.3,
              delay: 0.1,
              ease: FLAP_EASE,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                ...espressoEnvelopeStyle,
                clipPath: 'polygon(100.5% -0.5%, 49.4% 51.5%, 100.5% 100.5%)',
              }}
            />
          </motion.div>

          {/* 2D. Top Triangular Flap + Attached Wax Seal — Smooth Silk Lift Upward */}
          <motion.div
            className="envelope-flap absolute inset-0 pointer-events-none"
            style={{ zIndex: 25 }}
            initial={{ y: '0%', rotateX: 0 }}
            animate={isOpening ? { y: '-78%', rotateX: 24 } : { y: '0%', rotateX: 0 }}
            transition={{
              duration: 1.42,
              delay: 0.05,
              ease: FLAP_EASE,
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                ...espressoEnvelopeStyle,
                clipPath: 'polygon(-0.5% -0.5%, 100.5% -0.5%, 50% 52%)',
              }}
            >
              {/* Soft Champagne Specular Highlight as Top Flap Tilts Upward */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(235, 227, 219, 0.25) 0%, rgba(203, 173, 141, 0.14) 55%, transparent 100%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpening ? 1 : 0 }}
                transition={{ duration: 0.9, ease: LUXURY_EASE }}
              />
            </div>

            {/* Sculpted Espresso-Bronze Wax Seal Attached to Tip of Top Flap */}
            <motion.div
              className="absolute left-1/2 top-[51.5%] -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
              animate={isOpening ? { scale: 1.04 } : { scale: 1 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full olive-wax-seal flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.04]">
                <div
                  className="absolute -inset-1.5 rounded-full opacity-85 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 38% 30%, rgba(164,131,116,0.45), rgba(30,22,19,0.9))',
                    clipPath:
                      'polygon(50% 0%, 64% 3%, 78% 8%, 90% 19%, 97% 34%, 100% 50%, 96% 66%, 89% 81%, 77% 92%, 63% 98%, 50% 100%, 35% 97%, 20% 91%, 9% 79%, 3% 65%, 0% 50%, 4% 34%, 11% 19%, 23% 8%, 36% 2%)',
                    zIndex: -1,
                  }}
                />
                <div className="w-[84%] h-[84%] rounded-full wax-seal-inner-ring flex items-center justify-center border border-[#CBAD8D]/45 p-2">
                  <img
                    src={WEDDING_CONFIG.assets.monogramLogo}
                    alt="R & M Monogram Seal"
                    className="w-full h-full object-contain object-center drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.65)]"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 3. Bottom Scrim & Couple Names / Tap Prompt Over Closed Envelope */}
          <motion.div
            className="absolute inset-x-0 bottom-0 pt-24 pb-8 sm:pb-10 px-6 pointer-events-none text-center flex flex-col items-center gap-2.5"
            style={{
              zIndex: 31,
              background:
                'linear-gradient(to top, rgba(28, 21, 18, 0.88) 0%, rgba(28, 21, 18, 0.44) 55%, transparent 100%)',
            }}
            animate={{ opacity: isOpening ? 0 : 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <p
              className="font-ar-calligraphy text-2xl sm:text-3xl text-[#F1EDE6] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              dir="rtl"
              lang="ar"
            >
              روان علاء الدين &amp; محمد هلال
            </p>

            <span
              className={`text-sm sm:text-base text-[#EBE3DB] tracking-[0.24em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] ${
                isAr ? 'font-ar-serif tracking-normal text-lg' : 'font-en-serif uppercase'
              }`}
            >
              {isOpening ? t.envelope.openingStatus : t.envelope.tapPrompt}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
