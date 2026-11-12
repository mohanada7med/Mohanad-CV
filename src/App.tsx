import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA, type Language, type Project } from './data/portfolioData';
import { sound } from './utils/audio';

gsap.registerPlugin(ScrollTrigger);
import { CustomCursor } from './components/CustomCursor';
import { FloatingDock } from './components/FloatingDock';
import { MasterScrollytelling } from './components/MasterScrollytelling';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';

const CARTOON = {
  ink: '#000000',
  lime: '#ccff00',
  pink: '#ff4d8d',
  sun: '#ffd93d',
};

export function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('mohanad_lang');
    return saved === 'ar' ? 'ar' : 'en';
  });

  const [isAudioActive, setIsAudioActive] = useState<boolean>(() => {
    return localStorage.getItem('mohanad_sound_fx') === 'true';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [, setSelectedBrandFilter] = useState<string>('');
  const progressBarRef = useRef<HTMLDivElement>(null);
  const jumpSceneRef = useRef<((index: number) => void) | null>(null);

  // Synchronize lang with <html> attribute for proper RTL/LTR styling
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('mohanad_lang', lang);

    // dir changed -> recalculate pin positions
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);

  // Global scroll progress bar
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
    const matched = PORTFOLIO_DATA.projects.find(
      (p) => p.brand.toLowerCase() === brandName.toLowerCase() || p.brand_ar === brandName
    );
    if (matched) {
      setSelectedProject(matched);
    } else if (jumpSceneRef.current) {
      jumpSceneRef.current(2); // Jump to Projects scene
    }
  };

  const handleOpenProjectModal = (project: Project): void => {
    sound.playClick();
    setSelectedProject(project);
  };

  const handleCloseProjectModal = (): void => {
    sound.playClick();
    setSelectedProject(null);
  };

  const handleNavigateModal = (direction: 'next' | 'prev'): void => {
    if (!selectedProject) return;
    const projects = PORTFOLIO_DATA.projects;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= projects.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = projects.length - 1;
    setSelectedProject(projects[nextIndex]);
  };

  // Stable reference so MasterScrollytelling's effect doesn't re-run every render
  const handleRegisterJump = useCallback((fn: (index: number) => void) => {
    jumpSceneRef.current = fn;
  }, []);

  const handleNavigateToScene = useCallback((idx: number) => {
    jumpSceneRef.current?.(idx);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: CARTOON.sun,
      }}
    >
      {/* Cartoon scroll progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '14px',
          zIndex: 10001,
          backgroundColor: '#ffffff',
          borderBottom: `4px solid ${CARTOON.ink}`,
          pointerEvents: 'none',
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: '100%',
            width: '100%',
            transformOrigin: lang === 'ar' ? 'right center' : 'left center',
            transform: 'scaleX(0)',
            backgroundColor: CARTOON.pink,
            borderRight: lang === 'ar' ? 'none' : `4px solid ${CARTOON.ink}`,
            borderLeft: lang === 'ar' ? `4px solid ${CARTOON.ink}` : 'none',
          }}
        />
      </div>

      {/* Halftone texture instead of film grain */}
      <div
        aria-hidden
        className="halftone"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9990,
          pointerEvents: 'none',
          opacity: 0.12,
        }}
      />

      {/* Desktop custom cursor */}
      <CustomCursor />

      {/* Floating dock */}
      <FloatingDock
        lang={lang}
        onLanguageChange={handleLanguageChange}
        isAudioActive={isAudioActive}
        onAudioToggle={handleAudioToggle}
        activeSceneIndex={activeSceneIndex}
        onNavigateToScene={handleNavigateToScene}
      />

      {/* Main experience */}
      <main>
        <MasterScrollytelling
          lang={lang}
          onOpenProject={handleOpenProjectModal}
          onSelectBrand={handleSelectBrand}
          onSceneChange={setActiveSceneIndex}
          onRegisterJump={handleRegisterJump}
        />
      </main>

      {/* Project modal */}
      <ProjectModal
        project={selectedProject}
        lang={lang}
        onClose={handleCloseProjectModal}
        onNavigate={handleNavigateModal}
      />

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}

export default App;