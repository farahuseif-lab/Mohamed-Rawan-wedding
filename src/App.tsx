import { useEffect, useState } from 'react';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { FloralWallBackdrop } from './components/FloralWallBackdrop';
import { TopNavAndControls } from './components/TopNavAndControls';
import { AdultsOnlySection } from './components/sections/AdultsOnlySection';
import { ClosingSection } from './components/sections/ClosingSection';
import { CountdownSection } from './components/sections/CountdownSection';
import { DetailsSection } from './components/sections/DetailsSection';
import { MonogramSection } from './components/sections/MonogramSection';
import { RsvpSection } from './components/sections/RsvpSection';
import { VenueSection } from './components/sections/VenueSection';
import { WelcomeSection } from './components/sections/WelcomeSection';
import { WEDDING_CONFIG } from './config/wedding';
import { TRANSLATIONS, type Language } from './i18n/translations';
import { weddingAudio } from './utils/audioPlayer';

const SESSION_LANG_KEY = 'rawan_mohamed_wedding_lang';

function getInitialSessionLanguage(): Language {
  try {
    const saved = window.sessionStorage.getItem(SESSION_LANG_KEY);
    if (saved === 'en' || saved === 'ar') {
      return saved;
    }
  } catch {
    // Ignore storage access errors
  }
  return 'ar';
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => getInitialSessionLanguage());
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const t = TRANSLATIONS[language];

  // Sync HTML lang, RTL/LTR direction, page title, and session preference
  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = t.meta.title;
    try {
      window.sessionStorage.setItem(SESSION_LANG_KEY, language);
    } catch {
      // Ignore storage errors
    }
  }, [language, t.meta.title]);

  // Preload wedding song & subscribe to persistent audio state (does NOT restart on language change)
  useEffect(() => {
    weddingAudio.preload();
    return weddingAudio.subscribe(setIsMusicPlaying);
  }, []);

  const handleLanguageChange = (nextLang: Language) => {
    setLanguage(nextLang);
  };

  const handleEnvelopeOpenStart = () => {
    // Start wedding music synchronously inside the user's tap/click gesture
    weddingAudio.playFromUserGesture();
  };

  const handleEnvelopeOpenComplete = () => {
    setEnvelopeOpen(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleToggleMusic = () => {
    weddingAudio.toggle();
  };

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      lang={language}
      className="relative min-h-screen bg-[#F1EDE6] text-[#3A2D28]"
    >
      {/* Uploaded Floral & Embossed Relief Wall Background (Harmonized With Warm Neutral Palette) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 flex items-end justify-center overflow-hidden bg-[#F1EDE6]"
        aria-hidden="true"
      >
        <img
          src={WEDDING_CONFIG.assets.backgroundTexture}
          alt=""
          className="hidden sm:block h-full w-auto min-w-[36vw] max-w-none shrink-0 object-cover object-bottom -scale-x-100 sepia-[0.14] saturate-[0.76]"
        />
        <img
          src={WEDDING_CONFIG.assets.backgroundTexture}
          alt=""
          className="h-full w-full sm:w-auto sm:min-w-[36vw] max-w-none shrink-0 object-cover object-bottom sepia-[0.14] saturate-[0.76]"
        />
        <img
          src={WEDDING_CONFIG.assets.backgroundTexture}
          alt=""
          className="hidden sm:block h-full w-auto min-w-[36vw] max-w-none shrink-0 object-cover object-bottom -scale-x-100 sepia-[0.14] saturate-[0.76]"
        />
      </div>
      {/* Gentle Translucent Alabaster-Linen Glaze (#F1EDE6 -> #EBE3DB) Keeping Relief Soft & Florals Harmonized */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(241, 237, 230, 0.56) 0%, rgba(235, 227, 219, 0.44) 64%, rgba(241, 237, 230, 0.2) 100%)',
        }}
        aria-hidden="true"
      />

      {!envelopeOpen && (
        <EnvelopeIntro
          t={t}
          language={language}
          onLanguageChange={handleLanguageChange}
          onOpenStart={handleEnvelopeOpenStart}
          onOpenComplete={handleEnvelopeOpenComplete}
        />
      )}

      <div
        className={`relative transition-opacity duration-700 ${
          envelopeOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!envelopeOpen}
      >
        <FloralWallBackdrop />

        <TopNavAndControls
          t={t}
          language={language}
          onLanguageChange={handleLanguageChange}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
        />

        <main className="relative z-10">
          <WelcomeSection t={t} language={language} />
          <MonogramSection t={t} language={language} />
          <CountdownSection t={t} language={language} />
          <VenueSection t={t} language={language} />
          <AdultsOnlySection t={t} language={language} />
          <DetailsSection t={t} language={language} />
          <RsvpSection t={t} language={language} />
          <ClosingSection t={t} language={language} />
        </main>
      </div>
    </div>
  );
}
