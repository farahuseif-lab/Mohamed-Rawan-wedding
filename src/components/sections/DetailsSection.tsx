import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, CalendarPlus, Check, Clock, ExternalLink } from 'lucide-react';
import type { Language, TranslationContent } from '../../i18n/translations';
import { downloadWeddingIcs, getGoogleCalendarUrl } from '../../utils/calendar';
import { BotanicalDivider } from '../BotanicalDivider';

interface DetailsSectionProps {
  t: TranslationContent;
  language: Language;
}

export const DetailsSection: React.FC<DetailsSectionProps> = ({ t, language }) => {
  const [downloaded, setDownloaded] = useState(false);
  const isAr = language === 'ar';

  const handleDownloadIcs = () => {
    downloadWeddingIcs(language);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 3500);
  };

  return (
    <section id="details" className="py-12 sm:py-20 px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl mx-auto text-center"
      >
        <p
          className={`text-sm sm:text-base text-[#A48374] mb-2 ${
            isAr ? 'font-ar-serif' : 'font-en-serif uppercase tracking-[0.22em]'
          }`}
        >
          {t.details.eyebrow}
        </p>

        <h2
          className={`text-3xl sm:text-5xl text-[#3A2D28] mb-8 ${
            isAr ? 'font-ar-calligraphy' : 'font-en-serif tracking-[0.16em] uppercase font-normal'
          }`}
        >
          {t.details.heading}
        </h2>

        {/* Architectural Luxury Date & Time Card */}
        <div className="relative bg-[#F1EDE6]/95 border border-[#D1C7BD] rounded-[6px] p-7 sm:p-10 shadow-[0_20px_50px_-18px_rgba(58,45,40,0.14)]">
          <div className="border border-[#CBAD8D]/45 rounded-[4px] py-8 px-5 sm:px-8 flex flex-col items-center">
            {/* Ornamental Calendar Icon */}
            <div className="w-12 h-12 rounded-full border border-[#CBAD8D]/55 bg-[#EBE3DB] flex items-center justify-center mb-5">
              <Calendar className="w-5 h-5 text-[#A48374]" strokeWidth={1.6} />
            </div>

            <p
              className={`text-sm text-[#A48374] mb-1 ${
                isAr ? 'font-ar-sans font-medium' : 'font-en-serif uppercase tracking-[0.2em]'
              }`}
            >
              {t.details.dayOfWeek}
            </p>

            <p
              className={`text-2xl sm:text-3xl text-[#3A2D28] mb-5 ${
                isAr ? 'font-ar-serif font-bold' : 'font-en-serif font-medium'
              }`}
            >
              {t.details.date}
            </p>

            {/* Hairline diamond separator */}
            <div className="flex items-center justify-center gap-3 w-44 my-1" aria-hidden="true">
              <span className="h-px flex-1 bg-[#CBAD8D]/60" />
              <span className="w-2 h-2 rotate-45 border border-[#CBAD8D]" />
              <span className="h-px flex-1 bg-[#CBAD8D]/60" />
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-[#3A2D28]">
              <Clock className="w-4 h-4 text-[#A48374] shrink-0" strokeWidth={1.8} />
              <p
                className={`text-lg sm:text-xl font-semibold ${
                  isAr ? 'font-ar-sans' : 'font-en-serif tracking-[0.14em] uppercase'
                }`}
              >
                {t.details.time}
              </p>
            </div>

            <p
              className={`mt-2 text-xs sm:text-sm text-[#A48374] ${
                isAr ? 'font-ar-sans' : 'font-en-serif'
              }`}
            >
              {t.details.timezoneNote}
            </p>

            {/* Functional Add to Calendar Controls */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              <button
                type="button"
                onClick={handleDownloadIcs}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[5px] bg-[#3A2D28] text-[#F1EDE6] border border-[#CBAD8D]/55 hover:bg-[#4D3C36] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A2D28] ${
                  isAr ? 'font-ar-sans text-sm font-medium' : 'font-en-serif text-sm tracking-[0.14em] uppercase font-semibold'
                }`}
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4 text-[#CBAD8D]" />
                    <span>{t.details.icsDownloaded}</span>
                  </>
                ) : (
                  <>
                    <CalendarPlus className="w-4 h-4 text-[#CBAD8D]" strokeWidth={1.8} />
                    <span>{t.details.addToCalendar}</span>
                  </>
                )}
              </button>

              <a
                href={getGoogleCalendarUrl(language)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[5px] bg-transparent text-[#3A2D28] border border-[#D1C7BD] hover:bg-[#EBE3DB]/75 transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A2D28] ${
                  isAr ? 'font-ar-sans text-sm font-medium' : 'font-en-serif text-sm tracking-[0.12em] uppercase font-semibold'
                }`}
              >
                <span>{t.details.googleCalendar}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#A48374]" />
              </a>
            </div>
          </div>
        </div>

        <BotanicalDivider tone="gold" className="mt-16" />
      </motion.div>
    </section>
  );
};
