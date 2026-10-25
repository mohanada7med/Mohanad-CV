import { useState, useEffect } from 'react';
import type { Language } from './data/portfolioData';
import { sound } from './utils/audio';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandConstellation } from './components/BrandConstellation';
import { SelectedWork } from './components/SelectedWork';
import { Showreel3D } from './components/Showreel3D';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { StatsSection } from './components/StatsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('mohanad_lang');
    return saved === 'ar' ? 'ar' : 'en';
  });

  const [isAudioActive, setIsAudioActive] = useState<boolean>(() => {
    return localStorage.getItem('mohanad_sound_fx') === 'true';
  });

  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('');

  // Synchronize lang with <html> attribute for proper RTL/LTR styling
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('mohanad_lang', lang);
  }, [lang]);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
  };

  const handleAudioToggle = () => {
    const newState = sound.toggle();
    setIsAudioActive(newState);
  };

  const handleSelectBrand = (brandName: string) => {
    setSelectedBrandFilter(brandName);
  };

  const handleClearBrandFilter = () => {
    setSelectedBrandFilter('');
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#070709' }}>
      {/* Analog Cinematic Film Grain Texture */}
      <div className="film-grain" />

      {/* Desktop Fluid Custom Cursor */}
      <CustomCursor />

      {/* Top Floating Glass Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        isAudioActive={isAudioActive}
        onAudioToggle={handleAudioToggle}
      />

      {/* Main Experience Sections */}
      <main>
        {/* 04. Hero — The First 5 Seconds */}
        <HeroSection lang={lang} />

        {/* 06. Brand Collaborations — The Brand Constellation */}
        <BrandConstellation
          lang={lang}
          onSelectBrand={handleSelectBrand}
        />

        {/* 07. Selected Work — The Heart of the Website */}
        <SelectedWork
          lang={lang}
          selectedBrandFilter={selectedBrandFilter}
          onClearBrandFilter={handleClearBrandFilter}
        />

        {/* 08. The 3D Showreel Experience */}
        <Showreel3D lang={lang} />

        {/* 09. About — The Person Behind the Camera */}
        <AboutSection lang={lang} />

        {/* 10. Services — What We Can Create Together */}
        <ServicesSection lang={lang} />

        {/* 11. Creative Process — From Idea to Final Reel */}
        <ProcessSection lang={lang} />

        {/* 12. Social Proof & Verified Statistics */}
        <StatsSection lang={lang} />

        {/* 13. Contact — The Final Impression */}
        <ContactSection lang={lang} />
      </main>

      {/* Footer Colophon */}
      <Footer lang={lang} />
    </div>
  );
}

export default App;
