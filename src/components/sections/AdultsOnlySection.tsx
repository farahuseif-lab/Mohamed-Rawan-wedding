import React from 'react';
import { motion } from 'motion/react';
import type { Language, TranslationContent } from '../../i18n/translations';
import { BotanicalDivider } from '../BotanicalDivider';

interface AdultsOnlySectionProps {
  t: TranslationContent;
  language: Language;
}

export const AdultsOnlySection: React.FC<AdultsOnlySectionProps> = ({ t, language }) => {
  const isAr = language === 'ar';

  return (
    <section id="adults-only" className="py-12 sm:py-20 px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative bg-[#F1EDE6]/95 border border-[#D1C7BD] rounded-[8px] px-6 py-10 sm:px-12 sm:py-14 text-center shadow-[0_18px_46px_-20px_rgba(58,45,40,0.14)]">
          {/* Delicate botanical evening olive-and-star SVG illustration */}
          <div className="flex justify-center mb-5" aria-hidden="true">
            <svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 36C22 33 28 27 32 18C36 27 42 33 52 36"
                stroke="#A48374"
                strokeOpacity="0.7"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M21 32C19 26 23 22 28 24C27 28 25 31 21 32Z"
                stroke="#A48374"
                strokeWidth="1.1"
                fill="#A48374"
                fillOpacity="0.14"
              />
              <path
                d="M43 32C45 26 41 22 36 24C37 28 39 31 43 32Z"
                stroke="#A48374"
                strokeWidth="1.1"
                fill="#A48374"
                fillOpacity="0.14"
              />
              <path
                d="M32 6L34.2 11.2L39.5 13.5L34.2 15.8L32 21L29.8 15.8L24.5 13.5L29.8 11.2L32 6Z"
                stroke="#CBAD8D"
                strokeWidth="1.1"
                fill="#CBAD8D"
                fillOpacity="0.24"
              />
            </svg>
          </div>

          <p
            className={`text-sm sm:text-base text-[#A48374] mb-2 ${
              isAr ? 'font-ar-serif' : 'font-en-serif uppercase tracking-[0.22em]'
            }`}
          >
            {t.adultsOnly.eyebrow}
          </p>

          <h2
            className={`text-2xl sm:text-4xl text-[#3A2D28] mb-5 ${
              isAr ? 'font-ar-calligraphy' : 'font-en-serif italic font-normal'
            }`}
          >
            {t.adultsOnly.heading}
          </h2>

          <p
            className={`text-base sm:text-lg text-[#3A2D28]/85 max-w-xl mx-auto leading-loose ${
              isAr ? 'font-ar-serif' : 'font-en-serif italic'
            }`}
          >
            «{t.adultsOnly.message}»
          </p>
        </div>

        <BotanicalDivider tone="olive" className="mt-16" />
      </motion.div>
    </section>
  );
};
