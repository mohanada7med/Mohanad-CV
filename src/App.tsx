import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type Language, type Project } from './data/portfolioData';
import { sound } from './utils/audio';

gsap.registerPlugin(ScrollTrigger);
import { CustomCursor } from './components/CustomCursor';
import { FloatingDock } from './components/FloatingDock';
import { MasterScrollytelling } from './components/MasterScrollytelling';
import { Footer } from './components/Footer';

export function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('mohanad_lang');
    return saved === 'ar' ? 'ar' : 'en';
  });

  const [isAudioActive, setIsAudioActive] = useState<boolean>(() => {
    return localStorage.getItem('mohanad_sound_fx') === 'true';
  });

  const [, setSelectedBrandFilter] = useState<string>('');
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Synchronize lang with <html> attribute for proper RTL/LTR styling
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('mohanad_lang', lang);
  }, [lang]);

  // Master Global Scrollytelling Progress Bar
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.15,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
  };

  const handleAudioToggle = () => {
    const newState = sound.toggle();
    setIsAudioActive(newState);
  };

  const handleSelectBrand = (brandName: string) => {
    setSelectedBrandFilter(brandName);
    const target = document.querySelector('#work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };


  function handleOpenProjectModal(_project: Project): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#070709' }}>
      {/* Master Scrollytelling Film Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          zIndex: 10001,
          backgroundColor: '#000000',
          borderBottom: '1px solid #000000',
          pointerEvents: 'none',
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: '100%',
            width: '100%',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
            background: 'linear-gradient(90deg, #ccff00 0%, #ffe600 50%, #ccff00 100%)',
            boxShadow: '0 0 12px rgba(204, 255, 0, 0.9)',
          }}
        />
      </div>



      {/* Analog Cinematic Film Grain Texture */}
      <div className="film-grain" />

      {/* Desktop Fluid Custom Cursor */}
      <CustomCursor />

      {/* Dynamic Floating Capsule Dock */}
      <FloatingDock
        lang={lang}
        onLanguageChange={handleLanguageChange}
        isAudioActive={isAudioActive}
        onAudioToggle={handleAudioToggle}
      />

      {/* Main Experience Flow */}
      <main>
        {/* Master Scrollytelling Narrative Engine (5 Pinned / Fluid Scenes) */}
        <MasterScrollytelling
          lang={lang}
          onOpenProject={handleOpenProjectModal}
          onSelectBrand={handleSelectBrand}
        />


      </main>


      {/* Footer Colophon */}
      <Footer lang={lang} />
    </div>
  );
}

export default App;
