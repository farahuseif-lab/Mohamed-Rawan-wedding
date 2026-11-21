import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { Language, TranslationContent } from '../../i18n/translations';

interface WelcomeSectionProps {
  t: TranslationContent;
  language: Language;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ t, language }) => {
  const isAr = language === 'ar';

  return (
    <section
      id="welcome"
      className="relative min-h-[calc(100dvh-4rem)] flex items-center justify-center py-16 sm:py-24 px-6 sm:px-10 overflow-hidden"
    >
      <div className="max-w-xl mx-auto w-full flex flex-col items-center text-center">
        {/* Bismillah Arabic Calligraphy Header with Hairline & Diamond Rules */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 sm:gap-4 w-full max-w-sm mb-5"
        >
          <span className="h-px flex-1 bg-[#CBAD8D]/65" aria-hidden="true" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#A48374]" aria-hidden="true" />
          <p
            className="font-ar-serif text-lg sm:text-xl text-[#3A2D28] tracking-normal whitespace-nowrap"
            dir="rtl"
            lang="ar"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <span className="w-1.5 h-1.5 rotate-45 bg-[#A48374]" aria-hidden="true" />
          <span className="h-px flex-1 bg-[#CBAD8D]/65" aria-hidden="true" />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className={`text-sm sm:text-base text-[#A48374] mb-6 ${
            isAr ? 'font-ar-serif text-lg sm:text-xl' : 'font-en-serif uppercase tracking-[0.26em]'
          }`}
        >
          {t.welcome.eyebrow}
        </motion.p>

        {/* Stacked Romantic Calligraphic Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="my-2 flex flex-col items-center"
        >
          {isAr ? (
            <>
              <h1 className="font-ar-calligraphy text-4xl sm:text-5xl md:text-6xl text-[#3A2D28] leading-snug">
                روان علاء الدين
              </h1>
              <span className="font-en-script text-4xl sm:text-5xl text-[#A48374] my-1">
                &amp;
              </span>
              <p className="font-ar-calligraphy text-4xl sm:text-5xl md:text-6xl text-[#3A2D28] leading-snug">
                محمد هلال
              </p>
            </>
          ) : (
            <>
              <h1 className="font-en-script text-6xl sm:text-7xl md:text-[5.25rem] text-[#3A2D28] leading-[0.95]">
                Rawan
              </h1>
              <span className="font-en-serif italic text-3xl sm:text-4xl text-[#A48374] my-2">
                &amp;
              </span>
              <p className="font-en-script text-6xl sm:text-7xl md:text-[5.25rem] text-[#3A2D28] leading-[0.95]">
                Mohamed
              </p>
            </>
          )}
        </motion.div>

        {/* Invitation Text + Date */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-7 text-lg sm:text-xl text-[#3A2D28]/90 max-w-md leading-relaxed ${
            isAr ? 'font-ar-serif' : 'font-en-serif uppercase tracking-[0.2em] text-sm sm:text-base'
          }`}
          style={{ textWrap: 'balance' }}
        >
          {t.welcome.lead}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className={`mt-3 text-base sm:text-lg text-[#A48374] ${
            isAr ? 'font-ar-serif font-bold' : 'font-en-serif tracking-[0.22em] uppercase text-sm sm:text-base font-medium'
          }`}
        >
          {t.welcome.date}
        </motion.p>

        {/* Subtle Hairline + Diamond Divider */}
        <div className="flex items-center justify-center gap-3 w-52 my-8" aria-hidden="true">
          <span className="h-px flex-1 bg-[#CBAD8D]/65" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#A48374]" />
          <span className="h-px flex-1 bg-[#CBAD8D]/65" />
        </div>

        {/* Scroll Down Indicator */}
        <a
          href="#monogram"
          className="inline-flex flex-col items-center gap-2 text-[#A48374] hover:text-[#3A2D28] transition-colors py-2"
          aria-label={t.welcome.scrollHint}
        >
          <span
            className={
              isAr
                ? 'font-ar-serif text-base'
                : 'font-en-serif uppercase tracking-[0.26em] text-xs sm:text-sm'
            }
          >
            {t.welcome.scrollHint}
          </span>
          <ChevronDown className="w-4 h-4 opacity-80" />
        </a>
      </div>
    </section>
  );
};
