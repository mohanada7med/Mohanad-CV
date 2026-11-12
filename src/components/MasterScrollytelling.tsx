import React, { useRef, useState, useEffect, useCallback } from 'react';
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

/* ============ CARTOON THEME ============ */
const cartoonCss = `
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Lilita+One&family=Cairo:wght@700;900&display=swap');

:root {
  --ink: #000000;
  --lime: #ccff00;
  --pink: #ff4d8d;
  --sky: #4dd2ff;
  --sun: #ffd93d;
}

.halftone {
  background-image: radial-gradient(rgba(0,0,0,.28) 2px, transparent 2.5px);
  background-size: 16px 16px;
  mix-blend-mode: multiply;
}

.comic-title {
  font-family: 'Bangers', 'Cairo', cursive;
  letter-spacing: 2px;
  -webkit-text-stroke: 2px #000;
  text-shadow: 4px 4px 0 #000;
}
`;

const COLORS = {
  ink: '#000000',
  lime: '#ccff00',
  pink: '#ff4d8d',
  sun: '#ffd93d',
  white: '#ffffff',
};

interface MasterScrollytellingProps {
  lang: Language;
  onOpenProject: (project: Project) => void;
  onSelectBrand: (brandName: string) => void;
  onSceneChange?: (sceneIndex: number) => void;
  onRegisterJump?: (jumpFn: (index: number) => void) => void;
}

export const MasterScrollytelling: React.FC<MasterScrollytellingProps> = ({
  lang,
  onOpenProject,
  onSelectBrand,
  onSceneChange,
  onRegisterJump,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const powRef = useRef<HTMLDivElement>(null);

  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLDivElement>(null);

  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const isAr = lang === 'ar';

  const sceneTitles = [
    { num: '01', titleEn: 'INTRO', titleAr: 'البداية', badge: 'HERO' },
    { num: '02', titleEn: 'STORY', titleAr: 'عن مهند', badge: 'ABOUT' },
    { num: '03', titleEn: 'WORK', titleAr: 'المشاريع', badge: 'WORK' },
    { num: '04', titleEn: 'SERVICES', titleAr: 'الخدمات', badge: 'SERVICES' },
    { num: '05', titleEn: 'CONTACT', titleAr: 'التواصل', badge: 'CONTACT' },
  ];

  const updateActiveScene = useCallback(
    (idx: number) => {
      setActiveSceneIndex(idx);
      onSceneChange?.(idx);
    },
    [onSceneChange]
  );

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: PINNED CARTOON TIMELINE
      mm.add('(min-width: 1024px)', () => {
        const s1 = scene1Ref.current;
        const s2 = scene2Ref.current;
        const s3 = scene3Ref.current;
        const s4 = scene4Ref.current;
        const s5 = scene5Ref.current;
        const pow = powRef.current;

        if (!s1 || !s2 || !s3 || !s4 || !s5 || !pow) return;

        gsap.set([s2, s3, s4, s5], {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        });

        gsap.set(s1, { position: 'relative', width: '100%', height: '100%', zIndex: 1 });
        gsap.set(s2, { yPercent: 100, rotate: isAr ? 6 : -6, scale: 0.85, zIndex: 2 });
        gsap.set(s3, { xPercent: isAr ? -100 : 100, rotate: isAr ? -4 : 4, scale: 0.85, zIndex: 3 });
        gsap.set(s4, { yPercent: -100, rotate: isAr ? -6 : 6, scale: 0.85, zIndex: 4 });
        gsap.set(s5, { scale: 0.5, rotate: -8, opacity: 0, zIndex: 5 });

        // POW bubble starting state
        gsap.set(pow, { xPercent: -50, yPercent: -50, scale: 0, rotate: -20, opacity: 0 });

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
              if (progress < 0.2) updateActiveScene(0);
              else if (progress < 0.42) updateActiveScene(1);
              else if (progress < 0.65) updateActiveScene(2);
              else if (progress < 0.88) updateActiveScene(3);
              else updateActiveScene(4);
            },
          },
        });

        // STEP 1: Scene 01 -> Scene 02 (page flip + bounce)
        masterTl
          .to(
            s1,
            { scale: 0.85, rotate: isAr ? 6 : -6, opacity: 0, duration: 1, ease: 'power2.in' },
            0.6
          )
          .to(
            s2,
            { yPercent: 0, rotate: 0, scale: 1, duration: 1.2, ease: 'back.out(2)' },
            0.6
          )

          // STEP 2: Scene 02 -> Scene 03
          .to(
            s2,
            { scale: 0.85, rotate: isAr ? -6 : 6, opacity: 0, duration: 1, ease: 'power2.in' },
            2.0
          )
          .to(
            s3,
            { xPercent: 0, rotate: 0, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.6)' },
            2.0
          )

          // STEP 3: Scene 03 -> Scene 04
          .to(
            s3,
            { scale: 0.85, rotate: isAr ? 6 : -6, opacity: 0, duration: 1, ease: 'power2.in' },
            3.4
          )
          .to(
            s4,
            { yPercent: 0, rotate: 0, scale: 1, duration: 1.2, ease: 'back.out(2)' },
            3.4
          )

          // STEP 4: Scene 04 -> Scene 05 (finale burst)
          .to(
            s4,
            { scale: 0.8, rotate: isAr ? -6 : 6, opacity: 0, duration: 1, ease: 'power2.in' },
            4.8
          )
          .to(
            s5,
            { scale: 1, rotate: 0, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
            4.8
          );

        // POW! bubble on every transition
        [0.9, 2.3, 3.7, 5.1].forEach((t) => {
          masterTl.fromTo(
            pow,
            { scale: 0, rotate: -20, opacity: 1 },
            {
              scale: 1.4,
              rotate: 8,
              opacity: 0,
              duration: 0.6,
              ease: 'back.out(3)',
              immediateRender: false,
            },
            t
          );
        });
      });

      // MOBILE: NATURAL SCROLL WITH BOUNCY COMIC REVEALS
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

          gsap.set(el, { position: 'relative', width: '100%', height: 'auto', opacity: 1, clearProps: 'transform' });

          if (idx > 0) {
            gsap.from(el, {
              scale: 0.85,
              rotate: idx % 2 === 0 ? 4 : -4,
              opacity: 0,
              duration: 0.7,
              ease: 'back.out(2)',
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
            });
          }

          ScrollTrigger.create({
            trigger: el,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => updateActiveScene(idx),
            onEnterBack: () => updateActiveScene(idx),
          });
        });
      });
    }, container);

    return () => ctx.revert();
  }, [isAr, updateActiveScene]);

  const handleJumpToScene = (index: number) => {
    sound.playClick();
    const isDesktop = window.innerWidth >= 1024;
    const container = containerRef.current;

    if (isDesktop && container) {
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

  useEffect(() => {
    if (onRegisterJump) {
      onRegisterJump(handleJumpToScene);
    }
  }, [onRegisterJump]);

  return (
    <div
      ref={containerRef}
      id="master-experience-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: COLORS.sun,
      }}
    >
      <style>{cartoonCss}</style>

      {/* Cartoon Lateral HUD Tracker (Desktop) */}
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
            borderRadius: '28px',
            backgroundColor: COLORS.white,
            border: '4px solid #000000',
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
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? COLORS.pink : COLORS.white,
                  color: isActive ? COLORS.white : COLORS.ink,
                  border: '3px solid #000000',
                  fontSize: '13px',
                  fontWeight: 900,
                  fontFamily: "'Bangers', 'Cairo', cursive",
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isActive ? 'scale(1.15) rotate(-6deg)' : 'scale(1)',
                  boxShadow: '4px 4px 0px #000000',
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
            bg={COLORS.lime}
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
          backgroundColor: COLORS.sun,
        }}
      >
        {/* SCENE 01: THE CARTOON INTRO */}
        <div ref={scene1Ref} id="scene-intro" style={{ width: '100%', height: '100%' }}>
          <Scene01Intro lang={lang} onExplore={() => handleJumpToScene(1)} />
        </div>

        {/* SCENE 02: MY STORY (MULTI-PANEL COMIC SPREAD) */}
        <div ref={scene2Ref} id="scene-about" style={{ width: '100%', height: '100%' }}>
          <Scene02About lang={lang} />
        </div>

        {/* SCENE 03: MY PROJECTS (VIRAL REEL VAULT) */}
        <div ref={scene3Ref} id="scene-projects" style={{ width: '100%', height: '100%' }}>
          <Scene03Projects lang={lang} onOpenProject={onOpenProject} />
        </div>

        {/* SCENE 04: MY SKILLS (CREATIVE WEAPONRY & ARSENAL) */}
        <div ref={scene4Ref} id="scene-arsenal" style={{ width: '100%', height: '100%' }}>
          <Scene04Arsenal lang={lang} onOpenProject={onOpenProject} onSelectBrand={onSelectBrand} />
        </div>

        {/* SCENE 05: CONTACT FINALE */}
        <div ref={scene5Ref} id="scene-contact" style={{ width: '100%', height: '100%' }}>
          <Scene05Contact lang={lang} />
        </div>

        {/* Halftone dots overlay */}
        <div
          aria-hidden
          className="halftone"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 59,
            pointerEvents: 'none',
            opacity: 0.35,
          }}
        />

        {/* Comic page frame */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 60,
            pointerEvents: 'none',
            border: '6px solid #000000',
            borderRadius: '28px',
            boxShadow: 'inset 0 0 0 4px #ccff00',
          }}
        />

        {/* POW! bubble (desktop transitions) */}
        <div
          ref={powRef}
          aria-hidden
          className="comic-title hidden lg:block"
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            zIndex: 70,
            opacity: 0,
            pointerEvents: 'none',
            fontSize: '120px',
            color: COLORS.pink,
            whiteSpace: 'nowrap',
          }}
        >
          {isAr ? 'بووم!' : 'POW!'}
        </div>
      </div>
    </div>
  );
};