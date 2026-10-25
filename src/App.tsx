import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA, type Language, type Project } from './data/portfolioData';
import { sound } from './utils/audio';

gsap.registerPlugin(ScrollTrigger);
import { CustomCursor } from './components/CustomCursor';
import { FloatingDock } from './components/FloatingDock';
import { MasterScrollytelling } from './components/MasterScrollytelling';
import { FolderDeckSection } from './components/FolderDeckSection';
import { StorytellingReelBreakdown } from './components/StorytellingReelBreakdown';
import { SelectedWork } from './components/SelectedWork';
import { Showreel3D } from './components/Showreel3D';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';

export function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('mohanad_lang');
    return saved === 'ar' ? 'ar' : 'en';
  });

  const [isAudioActive, setIsAudioActive] = useState<boolean>(() => {
    return localStorage.getItem('mohanad_sound_fx') === 'true';
  });

  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
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

  const handleClearBrandFilter = () => {
    setSelectedBrandFilter('');
  };

  const handleOpenProjectModal = (project: Project) => {
    sound.playClick();
    setActiveModalProject(project);
  };

  const handleNavigateModal = (direction: 'next' | 'prev') => {
    if (!activeModalProject) return;
    const currentIndex = PORTFOLIO_DATA.projects.findIndex((p) => p.id === activeModalProject.id);
    if (currentIndex === -1) return;
    const total = PORTFOLIO_DATA.projects.length;
    const nextIndex = direction === 'next' ? (currentIndex + 1) % total : (currentIndex - 1 + total) % total;
    setActiveModalProject(PORTFOLIO_DATA.projects[nextIndex]);
  };

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

      {/* Dynamic Floating Capsule Dock (Matching Reference Image) */}
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

        {/* Deep-Dive Interactive Modules */}
        {/* GSAP Viral Reel Anatomy Scrollytelling Breakdown */}
        <StorytellingReelBreakdown lang={lang} />

        {/* 4-Folder Physical Dossier Deck (Inspired by Creative Reference) */}
        <FolderDeckSection
          lang={lang}
          onOpenProject={handleOpenProjectModal}
          onSelectBrand={handleSelectBrand}
        />

        {/* 3D Showreel Experience */}
        <div id="showreel">
          <Showreel3D lang={lang} />
        </div>

        {/* Full Editorial Selected Work Archive */}
        <div id="work">
          <SelectedWork
            lang={lang}
            selectedBrandFilter={selectedBrandFilter}
            onClearBrandFilter={handleClearBrandFilter}
            onOpenProject={handleOpenProjectModal}
          />
        </div>
      </main>

      {/* Global Project Detail Lightbox Modal */}
      {activeModalProject && (
        <ProjectModal
          key={activeModalProject.id}
          project={activeModalProject}
          lang={lang}
          onClose={() => setActiveModalProject(null)}
          onNavigate={handleNavigateModal}
        />
      )}

      {/* Footer Colophon */}
      <Footer lang={lang} />
    </div>
  );
}

export default App;
