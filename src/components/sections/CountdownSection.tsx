import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WEDDING_CONFIG } from '../../config/wedding';
import type { Language, TranslationContent } from '../../i18n/translations';
import { BotanicalDivider } from '../BotanicalDivider';

interface CountdownSectionProps {
  t: TranslationContent;
  language: Language;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasStarted: boolean;
}

function getTimeRemaining(): TimeRemaining {
  // Exact Cairo timestamp: 2026-12-18T18:00:00+02:00 (Africa/Cairo UTC+2 in December)
  const targetMs = new Date(WEDDING_CONFIG.eventIsoCairo).getTime();
  const nowMs = Date.now();
  const diff = targetMs - nowMs;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, hasStarted: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.max(0, Math.floor(totalSeconds / 86400));
  const hours = Math.max(0, Math.floor((totalSeconds % 86400) / 3600));
  const minutes = Math.max(0, Math.floor((totalSeconds % 3600) / 60));
  const seconds = Math.max(0, totalSeconds % 60);

  return { days, hours, minutes, seconds, hasStarted: false };
}

const padTwo = (n: number): string => String(n).padStart(2, '0');

export const CountdownSection: React.FC<CountdownSectionProps> = ({ t, language }) => {
  const [time, setTime] = useState<TimeRemaining>(() => getTimeRemaining());
  const isAr = language === 'ar';

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { key: 'days', value: padTwo(time.days), label: t.countdown.days },
    { key: 'hours', value: padTwo(time.hours), label: t.countdown.hours },
    { key: 'minutes', value: padTwo(time.minutes), label: t.countdown.minutes },
    { key: 'seconds', value: padTwo(time.seconds), label: t.countdown.seconds },
  ];

  return (
    <section id="countdown" className="py-16 sm:py-24 px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto text-center"
      >
        <p
          className={`text-sm sm:text-base text-[#A48374] mb-2 ${
            isAr ? 'font-ar-serif' : 'font-en-serif uppercase tracking-[0.22em]'
          }`}
        >
          {t.countdown.eyebrow}
        </p>

        <h2
          className={`text-3xl sm:text-5xl text-[#3A2D28] mb-10 ${
            isAr ? 'font-ar-calligraphy' : 'font-en-serif italic font-normal'
          }`}
          style={{ textWrap: 'balance' }}
        >
          {t.countdown.title}
        </h2>

        {time.hasStarted ? (
          <div className="py-10 px-6 bg-[#EBE3DB]/85 border border-[#D1C7BD] rounded-[6px]">
            <p
              className={`text-2xl sm:text-4xl text-[#3A2D28] ${
                isAr ? 'font-ar-calligraphy' : 'font-en-serif italic'
              }`}
            >
              {t.countdown.startedMessage}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 max-w-2xl mx-auto">
            {units.map((unit) => (
              <div
                key={unit.key}
                className="bg-[#F1EDE6]/95 border border-[#D1C7BD] rounded-[6px] py-5 sm:py-6 px-3 flex flex-col items-center justify-center shadow-[0_10px_28px_-14px_rgba(58,45,40,0.14)]"
              >
                <div className="h-12 sm:h-14 flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={unit.value}
                      initial={{ y: 8, opacity: 0.3 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="block text-3xl sm:text-5xl font-en-serif font-medium text-[#3A2D28] tabular-figures leading-none"
                    >
                      {unit.value}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="w-8 h-px bg-[#CBAD8D]/65 my-2.5" aria-hidden="true" />
                <span
                  className={`text-xs sm:text-sm text-[#A48374] ${
                    isAr ? 'font-ar-sans font-medium' : 'font-en-serif uppercase tracking-[0.16em]'
                  }`}
                >
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <p
          className={`mt-7 text-xs sm:text-sm text-[#A48374] ${
            isAr ? 'font-ar-sans' : 'font-en-serif tracking-wide'
          }`}
        >
          {t.countdown.cairoNote}
        </p>

        <BotanicalDivider tone="olive" className="mt-14" />
      </motion.div>
    </section>
  );
};
