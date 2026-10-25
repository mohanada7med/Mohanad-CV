import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type Language, type Project } from '../data/portfolioData';
import { Scene01Intro } from './scenes/Scene01Intro';
import { Scene02About } from './scenes/Scene02About';
import { Scene03Projects } from './scenes/Scene03Projects';
import { Scene04Arsenal } from './scenes/Scene04Arsenal';
import { Scene05Contact } from './scenes/Scene05Contact';
import { sound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

interface MasterScrollytellingProps {
  lang: Language;
  onOpenProject: (project: Project) => void;
  onSelectBrand: (brandName: string) => void;
}

export const MasterScrollytelling: React.FC<MasterScrollytellingProps> = ({
  lang,
  onOpenProject,
  onSelectBrand,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLDivElement>(null);

  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const isAr = lang === 'ar';

  const sceneTitles = [
    { num: '01', titleEn: 'INTRO', titleAr: 'البداية', id: 'scene-intro' },
    { num: '02', titleEn: 'ABOUT', titleAr: 'عن مهند', id: 'scene-about' },
    { num: '03', titleEn: 'VAULT', titleAr: 'المشاريع', id: 'scene-projects' },
    { num: '04', titleEn: 'ARSENAL', titleAr: 'العتاد', id: 'scene-arsenal' },
    { num: '05', titleEn: 'COLLAB', titleAr: 'التعاون', id: 'scene-contact' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Setup ScrollTrigger observer for active scene telemetry tracking
      const scenes = [
        { el: scene1Ref.current, idx: 0 },
        { el: scene2Ref.current, idx: 1 },
        { el: scene3Ref.current, idx: 2 },
        { el: scene4Ref.current, idx: 3 },
        { el: scene5Ref.current, idx: 4 },
      ];

      scenes.forEach(({ el, idx }) => {
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveSceneIndex(idx),
          onEnterBack: () => setActiveSceneIndex(idx),
        });

        // Cinematic kinetic reveal on entry
        gsap.fromTo(
          el,
          { opacity: 0.9, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Subtle parallax & depth transforms between scenes on desktop
      if (window.innerWidth >= 1024) {
        if (scene1Ref.current) {
          gsap.to('.intro-first-name', {
            x: isAr ? 40 : -40,
            ease: 'none',
            scrollTrigger: {
              trigger: scene1Ref.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          });
          gsap.to('.intro-last-name', {
            x: isAr ? -40 : 40,
            ease: 'none',
            scrollTrigger: {
              trigger: scene1Ref.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          });
        }
      }
    }, container);

    return () => ctx.revert();
  }, [isAr]);

  const handleJumpToScene = (index: number) => {
    sound.playClick();
    const sceneRefs = [scene1Ref, scene2Ref, scene3Ref, scene4Ref, scene5Ref];
    const target = sceneRefs[index]?.current;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="master-experience-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#050505',
      }}
    >
      {/* Lateral Kinetic Scene Ticker (Desktop HUD) */}
      <aside
        aria-label="Scene Index Telemetry"
        className="hidden lg:flex"
        style={{
          position: 'fixed',
          right: isAr ? 'auto' : '28px',
          left: isAr ? '28px' : 'auto',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          flexDirection: 'column',
          gap: '14px',
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            padding: '10px 8px',
            borderRadius: '100px',
            backgroundColor: 'rgba(10, 10, 12, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
          }}
        >
          {sceneTitles.map((scene, idx) => {
            const isActive = activeSceneIndex === idx;
            return (
              <button
                key={scene.num}
                onClick={() => handleJumpToScene(idx)}
                onMouseEnter={() => sound.playHover()}
                title={`${scene.num} • ${isAr ? scene.titleAr : scene.titleEn}`}
                style={{
                  position: 'relative',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#000000' : '#a1a1aa',
                  border: isActive ? '2px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 0 16px rgba(255, 255, 255, 0.5)' : 'none',
                }}
              >
                {scene.num}
              </button>
            );
          })}
        </div>

        {/* Active Scene Label Indicator */}
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {sceneTitles[activeSceneIndex].num}
        </div>
      </aside>

      {/* Main Track Hosting All 5 Scenes in Flow */}
      <div style={{ position: 'relative', width: '100%' }}>
        {/* SCENE 01: CINEMATIC INTRODUCTION */}
        <div ref={scene1Ref} id="scene-intro" style={{ width: '100%' }}>
          <Scene01Intro
            lang={lang}
            onExplore={() => handleJumpToScene(1)}
          />
        </div>

        {/* SCENE 02: ABOUT ME & THE STORY */}
        <div ref={scene2Ref} id="scene-about" style={{ width: '100%' }}>
          <Scene02About lang={lang} />
        </div>

        {/* SCENE 03: SELECTED PROJECTS (CINEMA VAULT) */}
        <div ref={scene3Ref} id="scene-projects" style={{ width: '100%' }}>
          <Scene03Projects
            lang={lang}
            onOpenProject={onOpenProject}
          />
        </div>

        {/* SCENE 04: SKILLS & TECHNICAL ARSENAL */}
        <div ref={scene4Ref} id="scene-arsenal" style={{ width: '100%' }}>
          <Scene04Arsenal
            lang={lang}
            onOpenProject={onOpenProject}
            onSelectBrand={onSelectBrand}
          />
        </div>

        {/* SCENE 05: CONTACT & FINALE */}
        <div ref={scene5Ref} id="scene-contact" style={{ width: '100%' }}>
          <Scene05Contact lang={lang} />
        </div>
      </div>
    </div>
  );
};
