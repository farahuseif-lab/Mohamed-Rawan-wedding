import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import type { Language, TranslationContent } from '../i18n/translations';

interface TopNavAndControlsProps {
  t: TranslationContent;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const TopNavAndControls: React.FC<TopNavAndControlsProps> = ({
  t,
  language,
  onLanguageChange,
  isMusicPlaying,
  onToggleMusic,
}) => {
  const isAr = language === 'ar';

  return (
    <>
      {/* Minimal Sticky Editorial Header */}
      <header className="sticky top-0 z-40 w-full bg-[#F1EDE6]/90 backdrop-blur-md border-b border-[#D1C7BD]/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single-line Couple Wordmark */}
          <a
            href="#welcome"
            className={`text-lg sm:text-xl text-[#3A2D28] whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity ${
              isAr ? 'font-ar-calligraphy' : 'font-en-script text-2xl sm:text-3xl'
            }`}
          >
            {t.nav.coupleShort}
          </a>

          {/* Zone 2: Clean Typography Nav Links (Desktop) */}
          <nav
            className={`hidden md:flex items-center gap-6 text-[#A48374] ${
              isAr ? 'font-ar-serif text-base' : 'font-en-serif text-sm tracking-wide uppercase'
            }`}
            aria-label="Primary"
          >
            <a
              href="#welcome"
              className="hover:text-[#3A2D28] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.welcome}
            </a>
            <a
              href="#countdown"
              className="hover:text-[#3A2D28] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.countdown}
            </a>
            <a
              href="#venue"
              className="hover:text-[#3A2D28] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.venue}
            </a>
            <a
              href="#details"
              className="hover:text-[#3A2D28] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.details}
            </a>
            <a
              href="#rsvp"
              className="hover:text-[#3A2D28] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.rsvp}
            </a>
          </nav>

          {/* Zone 3: Language Switcher (عربي | EN) */}
          <div
            className="inline-flex items-center rounded-md border border-[#D1C7BD]/70 bg-[#EBE3DB]/85 p-0.5 shrink-0"
            role="group"
            aria-label="Language toggle"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('ar')}
              className={`px-2.5 py-1 text-xs font-ar-sans rounded transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                language === 'ar'
                  ? 'bg-[#3A2D28] text-[#F1EDE6] font-medium'
                  : 'text-[#3A2D28]/75 hover:text-[#3A2D28]'
              }`}
            >
              {t.nav.toggleAr}
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-en-serif tracking-wider rounded transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                language === 'en'
                  ? 'bg-[#3A2D28] text-[#F1EDE6] font-medium'
                  : 'text-[#3A2D28]/75 hover:text-[#3A2D28]'
              }`}
            >
              {t.nav.toggleEn}
            </button>
          </div>
        </div>
      </header>

      {/* Elegant Floating Music Control (44x44px touch target) */}
      <button
        type="button"
        onClick={onToggleMusic}
        aria-label={isMusicPlaying ? t.music.pause : t.music.play}
        title={isMusicPlaying ? t.music.pause : t.music.play}
        className={`fixed bottom-5 ${
          isAr ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
        } z-40 w-11 h-11 rounded-full border border-[#CBAD8D]/60 bg-[#3A2D28]/92 text-[#F1EDE6] shadow-[0_8px_24px_rgba(58,45,40,0.28)] backdrop-blur-md flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CBAD8D] cursor-pointer`}
      >
        {isMusicPlaying ? (
          <Volume2 className="w-4 h-4" strokeWidth={1.8} />
        ) : (
          <VolumeX className="w-4 h-4 opacity-80" strokeWidth={1.8} />
        )}
      </button>
    </>
  );
};
