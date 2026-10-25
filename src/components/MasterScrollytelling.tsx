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
import { ComicBadge } from './comic/ComicElements';

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
  const stageRef = useRef<HTMLDivElement>(null);

  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLDivElement>(null);

  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const isAr = lang === 'ar';

  const sceneTitles = [
    { num: '01', titleEn: 'INTRO', titleAr: 'البداية', badge: 'HERO' },
    { num: '02', titleEn: 'STORY', titleAr: 'عن مهند', badge: 'HOOK' },
    { num: '03', titleEn: 'VAULT', titleAr: 'المشاريع', badge: 'REELS' },
    { num: '04', titleEn: 'ARSENAL', titleAr: 'العتاد', badge: 'RIGS' },
    { num: '05', titleEn: 'FINALE', titleAr: 'التعاون', badge: 'ACTION' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP PINNED CONTINUOUS CARTOON TIMELINE
      mm.add('(min-width: 1024px)', () => {
        const s1 = scene1Ref.current;
        const s2 = scene2Ref.current;
        const s3 = scene3Ref.current;
        const s4 = scene4Ref.current;
        const s5 = scene5Ref.current;

        if (!s1 || !s2 || !s3 || !s4 || !s5) return;

        // Position scenes stacked inside the pinned stage
        gsap.set([s2, s3, s4, s5], {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        });

        gsap.set(s1, { position: 'relative', width: '100%', height: '100%', zIndex: 1 });
        gsap.set(s2, { yPercent: 100, rotate: isAr ? 3 : -3, scale: 0.92, zIndex: 2 });
        gsap.set(s3, { xPercent: isAr ? -100 : 100, scale: 0.9, zIndex: 3 });
        gsap.set(s4, { yPercent: -100, rotate: isAr ? -3 : 3, scale: 0.92, zIndex: 4 });
        gsap.set(s5, { scale: 0.7, opacity: 0, zIndex: 5 });

        // Master Scrubbed Timeline pinned for continuous storytelling
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=4200',
            pin: stage,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress < 0.2) setActiveSceneIndex(0);
              else if (progress < 0.42) setActiveSceneIndex(1);
              else if (progress < 0.65) setActiveSceneIndex(2);
              else if (progress < 0.88) setActiveSceneIndex(3);
              else setActiveSceneIndex(4);
            },
          },
        });

        // STEP 1: Hold Scene 01, then morph into Scene 02
        masterTl
          .to(s1, { scale: 0.92, opacity: 0.3, duration: 1, ease: 'power1.inOut' }, 0.6)
          .to(
            s2,
            {
              yPercent: 0,
              rotate: 0,
              scale: 1,
              duration: 1.2,
              ease: 'power2.out',
            },
            0.6
          )

          // STEP 2: Hold Scene 02, then morph into Scene 03 (Vault)
          .to(s2, { scale: 0.9, opacity: 0.2, duration: 1, ease: 'power1.inOut' }, 2.0)
          .to(
            s3,
            {
              xPercent: 0,
              scale: 1,
              duration: 1.2,
              ease: 'power2.out',
            },
            2.0
          )

          // STEP 3: Hold Scene 03, then transition into Scene 04 (Arsenal)
          .to(s3, { scale: 0.92, opacity: 0.2, duration: 1, ease: 'power1.inOut' }, 3.4)
          .to(
            s4,
            {
              yPercent: 0,
              rotate: 0,
              scale: 1,
              duration: 1.2,
              ease: 'power2.out',
            },
            3.4
          )

          // STEP 4: Climax burst into Scene 05 (Finale)
          .to(s4, { scale: 0.88, opacity: 0.15, duration: 1, ease: 'power1.inOut' }, 4.8)
          .to(
            s5,
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: 'back.out(1.5)',
            },
            4.8
          );
      });

      // MOBILE NATURAL SCROLL WITH SMOOTH COMIC REVEALS
      mm.add('(max-width: 1023px)', () => {
        const scenes = [
          { el: scene1Ref.current, idx: 0 },
          { el: scene2Ref.current, idx: 1 },
          { el: scene3Ref.current, idx: 2 },
          { el: scene4Ref.current, idx: 3 },
          { el: scene5Ref.current, idx: 4 },
        ];

        scenes.forEach(({ el, idx }) => {
          if (!el) return;

          gsap.set(el, { position: 'relative', width: '100%', height: 'auto', opacity: 1, transform: 'none' });

          ScrollTrigger.create({
            trigger: el,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => setActiveSceneIndex(idx),
            onEnterBack: () => setActiveSceneIndex(idx),
          });
        });
      });
    }, container);

    return () => ctx.revert();
  }, [isAr]);

  const handleJumpToScene = (index: number) => {
    sound.playClick();
    const isDesktop = window.innerWidth >= 1024;
    const container = containerRef.current;

    if (isDesktop && container) {
      // Calculate scroll offset based on timeline segment
      const totalScroll = 4200;
      const targetRatios = [0, 0.22, 0.45, 0.68, 0.95];
      const scrollPos = container.offsetTop + targetRatios[index] * totalScroll;
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    } else {
      const sceneRefs = [scene1Ref, scene2Ref, scene3Ref, scene4Ref, scene5Ref];
      const target = sceneRefs[index]?.current;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      id="master-experience-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#0a0b0f',
      }}
    >
      {/* Cartoon Lateral HUD Tracker (Desktop HUD) */}
      <aside
        aria-label="Scene Index Telemetry"
        className="hidden lg:flex"
        style={{
          position: 'fixed',
          right: isAr ? 'auto' : '24px',
          left: isAr ? '24px' : 'auto',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          flexDirection: 'column',
          gap: '12px',
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            padding: '12px 10px',
            borderRadius: '24px',
            backgroundColor: '#12141e',
            border: '3px solid #000000',
            boxShadow: '6px 6px 0px #000000',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
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
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor: isActive ? '#ccff00' : '#1e202f',
                  color: isActive ? '#000000' : '#a1a3b5',
                  border: '2.5px solid #000000',
                  fontSize: '12px',
                  fontWeight: 900,
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isActive ? 'scale(1.12) rotate(-3deg)' : 'scale(1)',
                  boxShadow: isActive ? '3px 3px 0px #000000' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {scene.num}
              </button>
            );
          })}
        </div>

        {/* Active Scene Comic Tag */}
        <div style={{ textAlign: 'center' }}>
          <ComicBadge
            text={sceneTitles[activeSceneIndex].num}
            subtext={isAr ? sceneTitles[activeSceneIndex].titleAr : sceneTitles[activeSceneIndex].titleEn}
            bg="#ccff00"
            rotation={isAr ? 3 : -3}
          />
        </div>
      </aside>

      {/* Main Pinned Stage on Desktop / Fluid on Mobile */}
      <div
        ref={stageRef}
        id="master-stage"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* SCENE 01: THE CARTOON INTRO */}
        <div ref={scene1Ref} id="scene-intro" style={{ width: '100%', height: '100%' }}>
          <Scene01Intro
            lang={lang}
            onExplore={() => handleJumpToScene(1)}
          />
        </div>

        {/* SCENE 02: MY STORY (MULTI-PANEL COMIC SPREAD) */}
        <div ref={scene2Ref} id="scene-about" style={{ width: '100%', height: '100%' }}>
          <Scene02About lang={lang} />
        </div>

        {/* SCENE 03: MY PROJECTS (VIRAL REEL VAULT) */}
        <div ref={scene3Ref} id="scene-projects" style={{ width: '100%', height: '100%' }}>
          <Scene03Projects
            lang={lang}
            onOpenProject={onOpenProject}
          />
        </div>

        {/* SCENE 04: MY SKILLS (CREATIVE WEAPONRY & ARSENAL) */}
        <div ref={scene4Ref} id="scene-arsenal" style={{ width: '100%', height: '100%' }}>
          <Scene04Arsenal
            lang={lang}
            onOpenProject={onOpenProject}
            onSelectBrand={onSelectBrand}
          />
        </div>

        {/* SCENE 05: CONTACT FINALE (MEMORABLE ANIMATED SHORT ENDING) */}
        <div ref={scene5Ref} id="scene-contact" style={{ width: '100%', height: '100%' }}>
          <Scene05Contact lang={lang} />
        </div>
      </div>
    </div>
  );
};
