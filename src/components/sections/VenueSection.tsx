import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { WEDDING_CONFIG } from '../../config/wedding';
import type { Language, TranslationContent } from '../../i18n/translations';
import { BotanicalDivider } from '../BotanicalDivider';

interface VenueSectionProps {
  t: TranslationContent;
  language: Language;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ t, language }) => {
  const [imgError, setImgError] = useState(false);
  const isAr = language === 'ar';

  return (
    <section id="venue" className="relative py-12 sm:py-20 px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto text-center"
      >
        <p
          className={`text-sm sm:text-base text-[#A48374] mb-2 ${
            isAr ? 'font-ar-serif' : 'font-en-serif uppercase tracking-[0.22em]'
          }`}
        >
          {t.venue.eyebrow}
        </p>

        <h2
          className={`text-3xl sm:text-5xl text-[#3A2D28] mb-9 ${
            isAr ? 'font-ar-calligraphy' : 'font-en-serif font-normal italic'
          }`}
        >
          {t.venue.heading}
        </h2>

        {/* Refined Alabaster Frame Displaying Venue Watercolor With Soft Torn-Paper Edge */}
        <div className="relative w-full max-w-2xl mx-auto p-2.5 sm:p-5 bg-[#F1EDE6]/95 border border-[#D1C7BD] rounded-[8px] shadow-[0_24px_58px_-18px_rgba(58,45,40,0.16)]">
          {/* Botanical corner line ornaments */}
          <svg
            className="pointer-events-none absolute top-2 left-2 w-6 h-6 sm:w-8 sm:h-8 text-[#CBAD8D]/80 z-10"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 18V2H18" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5 10C7 7 10 5 14 5" stroke="#A48374" strokeOpacity="0.6" strokeWidth="1" />
          </svg>
          <svg
            className="pointer-events-none absolute bottom-2 right-2 w-6 h-6 sm:w-8 sm:h-8 text-[#CBAD8D]/80 z-10"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path d="M30 14V30H14" stroke="currentColor" strokeWidth="1.2" />
            <path d="M27 22C25 25 22 27 18 27" stroke="#A48374" strokeOpacity="0.6" strokeWidth="1" />
          </svg>

          <div className="relative border border-[#D1C7BD]/70 p-2 sm:p-3.5 rounded-[4px] paper-texture overflow-hidden">
            {!imgError ? (
              <div className="relative w-full overflow-hidden">
                <img
                  src={WEDDING_CONFIG.assets.venueWatercolor}
                  alt={t.venue.imageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="venue-watercolor-torn-mask w-full h-auto block select-none"
                />
              </div>
            ) : (
              <div className="w-full aspect-[16/9] rounded-[2px] bg-[#EBE3DB] flex flex-col items-center justify-center p-6 text-[#A48374]">
                <MapPin className="w-7 h-7 text-[#A48374] mb-2" />
                <p className="font-semibold text-[#3A2D28]">{t.venue.venueName}</p>
                <p className="text-xs mt-1">{t.venue.venueLocation}</p>
              </div>
            )}
          </div>
        </div>

        {/* Verified Venue Name & Location */}
        <div className="mt-8">
          <h3
            className={`text-2xl sm:text-3xl text-[#3A2D28] ${
              isAr ? 'font-ar-serif font-bold' : 'font-en-serif font-medium'
            }`}
          >
            {t.venue.venueName}
          </h3>
          <p className={`text-sm sm:text-base text-[#A48374] mt-1 ${isAr ? 'font-ar-serif' : 'font-en-serif tracking-wide'}`}>
            {t.venue.venueLocation}
          </p>
          <p
            className={`mt-4 text-base sm:text-lg text-[#3A2D28]/80 max-w-lg mx-auto leading-relaxed ${
              isAr ? 'font-ar-serif' : 'font-en-serif italic text-xl'
            }`}
          >
            {t.venue.description}
          </p>
        </div>

        {/* Directions Button */}
        <div className="mt-7">
          <a
            href={WEDDING_CONFIG.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[5px] bg-[#3A2D28] text-[#F1EDE6] border border-[#CBAD8D]/55 hover:bg-[#4D3C36] transition-colors duration-200 shadow-[0_12px_26px_-10px_rgba(58,45,40,0.34)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A2D28] ${
              isAr ? 'font-ar-serif text-base' : 'font-en-serif text-sm tracking-[0.18em] uppercase font-semibold'
            }`}
          >
            <MapPin className="w-4 h-4 text-[#CBAD8D]" strokeWidth={1.8} />
            <span>{t.venue.button}</span>
          </a>
        </div>

        <BotanicalDivider tone="gold" className="mt-16" />
      </motion.div>
    </section>
  );
};
