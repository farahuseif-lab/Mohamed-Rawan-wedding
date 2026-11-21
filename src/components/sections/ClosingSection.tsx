import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WEDDING_CONFIG } from '../../config/wedding';
import type { Language, TranslationContent } from '../../i18n/translations';
import { BotanicalDivider } from '../BotanicalDivider';

interface ClosingSectionProps {
  t: TranslationContent;
  language: Language;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ t, language }) => {
  const [imgError, setImgError] = useState(false);
  const isAr = language === 'ar';

  return (
    <section id="closing" className="relative pt-10 pb-20 sm:pt-14 sm:pb-28 px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto text-center flex flex-col items-center"
      >
        <p
          className={`text-sm sm:text-base text-[#A48374] mb-3 ${
            isAr ? 'font-ar-serif' : 'font-en-serif uppercase tracking-[0.22em]'
          }`}
        >
          {t.closing.eyebrow}
        </p>

        <h2
          className={`text-2xl sm:text-3xl md:text-4xl text-[#3A2D28] max-w-2xl leading-relaxed mb-10 ${
            isAr ? 'font-ar-serif' : 'font-en-serif italic font-normal'
          }`}
          style={{ textWrap: 'balance' }}
        >
          {t.closing.message}
        </h2>

        {/* Sunset Couple Silhouette Photograph (Portrait Archival Frame) */}
        <div className="w-full max-w-[400px] sm:max-w-[430px] p-3 sm:p-4 bg-[#F1EDE6]/95 border border-[#D1C7BD] rounded-[8px] shadow-[0_26px_64px_-20px_rgba(58,45,40,0.18)]">
          <div className="border border-[#CBAD8D]/50 border-dashed p-1.5 rounded-[4px] bg-[#EBE3DB]/55">
            {!imgError ? (
              <img
                src={WEDDING_CONFIG.assets.closingSunsetCouple}
                alt={t.closing.sunsetAlt}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full aspect-[3/4] object-cover object-center rounded-[2px]"
              />
            ) : (
              <div className="w-full aspect-[3/4] rounded-[2px] bg-gradient-to-b from-[#EBE3DB] to-[#CBAD8D] flex items-center justify-center p-6 text-[#3A2D28]">
                <p className="font-en-serif text-3xl tracking-[0.2em]">R &amp; M</p>
              </div>
            )}
          </div>
        </div>

        {/* Closing Logo Medallion & Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="w-40 sm:w-48 h-28 sm:h-32 mb-4 flex items-center justify-center">
            <img
              src={WEDDING_CONFIG.assets.monogramLogo}
              alt="R & M Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain object-center brightness-[0.66] contrast-[1.14] sepia-[0.18] drop-shadow-[0_4px_12px_rgba(58,45,40,0.18)]"
            />
          </div>

          <p
            className={`text-3xl sm:text-5xl text-[#3A2D28] ${
              isAr ? 'font-ar-calligraphy' : 'font-en-script text-5xl sm:text-6xl'
            }`}
          >
            {t.closing.coupleNames}
          </p>

          <p
            className={`mt-2.5 text-sm sm:text-base text-[#A48374] ${
              isAr ? 'font-ar-serif' : 'font-en-serif uppercase tracking-[0.22em]'
            }`}
          >
            {t.closing.date}
          </p>
        </motion.div>

        <BotanicalDivider tone="gold" className="mt-12 mb-8" />

        <footer className="text-xs sm:text-sm text-[#3A2D28]/75">
          <p className={isAr ? 'font-ar-serif' : 'font-en-serif tracking-wide'}>
            {t.closing.footerNote}
          </p>
        </footer>
      </motion.div>
    </section>
  );
};
