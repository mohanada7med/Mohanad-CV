
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  Suspense,
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { Language, Project } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ComicBadge } from './comic/ComicElements';

// Register GSAP plugin once at module level.
gsap.registerPlugin(ScrollTrigger);

// Lazy-loaded scenes
const Scene01Intro = React.lazy(() =>
  import('./scenes/Scene01Intro').then((m) => ({
    default: m.Scene01Intro,
  }))
);

const Scene02About = React.lazy(() =>
  import('./scenes/Scene02About').then((m) => ({
    default: m.Scene02About,
  }))
);

const Scene03Education = React.lazy(() =>
  import('./scenes/Scene03Education').then((m) => ({
    default: m.Scene03Education,
  }))
);

const Scene04Experience = React.lazy(() =>
  import('./scenes/Scene04Experience').then((m) => ({
    default: m.Scene04Experience,
  }))
);

const Scene05Skills = React.lazy(() =>
  import('./scenes/Scene05Skills').then((m) => ({
    default: m.Scene05Skills,
  }))
);

const Scene06Projects = React.lazy(() =>
  import('./scenes/Scene06Projects').then((m) => ({
    default: m.Scene06Projects,
  }))
);

const Scene07Certifications = React.lazy(() =>
  import('./scenes/Scene07Certifications').then((m) => ({
    default: m.Scene07Certifications,
  }))
);

const Scene08Timeline = React.lazy(() =>
  import('./scenes/Scene08Timeline').then((m) => ({
    default: m.Scene08Timeline,
  }))
);

const Scene09Contact = React.lazy(() =>
  import('./scenes/Scene09Contact').then((m) => ({
    default: m.Scene09Contact,
  }))
);

interface MasterScrollytellingProps {
  lang: Language;
  onOpenProject: (project: Project) => void;
  onSelectBrand?: (brandName: string) => void;
  onSceneChange?: (sceneIndex: number) => void;
  onRegisterJump?: (jumpFn: (index: number) => void) => void;
}

const SCENE_DATA = [
  { num: '01', titleEn: 'HERO', titleAr: 'البداية', badge: 'HERO' },
  { num: '02', titleEn: 'STORY', titleAr: 'عن مهند', badge: 'ABOUT' },
  { num: '03', titleEn: 'LEARNING', titleAr: 'التعليم', badge: 'LEARN' },
  { num: '04', titleEn: 'EXPERIENCE', titleAr: 'الخبرات', badge: 'SETS' },
  { num: '05', titleEn: 'SKILLS', titleAr: 'العتاد', badge: 'SKILLS' },
  { num: '06', titleEn: 'PROJECTS', titleAr: 'المشاريع', badge: 'WORK' },
  {
    num: '07',
    titleEn: 'CREDENTIALS',
    titleAr: 'الكفاءات',
    badge: 'BADGES',
  },
  { num: '08', titleEn: 'TIMELINE', titleAr: 'المسيرة', badge: 'REEL' },
  { num: '09', titleEn: 'CONTACT', titleAr: 'التواصل', badge: 'HOTLINE' },
];

const SceneFallback = ({ lang }: { lang: Language }) => (
  <div
    role="status"
    aria-live="polite"
    style={{
      minHeight: '40vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-main)',
      fontWeight: 700,
    }}
  >
    {lang === 'ar' ? 'جاري تحميل المشهد...' : 'Loading scene...'}
  </div>
);

export const MasterScrollytelling: React.FC<
  MasterScrollytellingProps
> = ({
  lang,
  onOpenProject,
  onSceneChange,
  onRegisterJump,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scene01Ref = useRef<HTMLDivElement>(null);
    const scene02Ref = useRef<HTMLDivElement>(null);
    const scene03Ref = useRef<HTMLDivElement>(null);
    const scene04Ref = useRef<HTMLDivElement>(null);
    const scene05Ref = useRef<HTMLDivElement>(null);
    const scene06Ref = useRef<HTMLDivElement>(null);
    const scene07Ref = useRef<HTMLDivElement>(null);
    const scene08Ref = useRef<HTMLDivElement>(null);
    const scene09Ref = useRef<HTMLDivElement>(null);

    const [activeSceneIndex, setActiveSceneIndex] = useState(0);

    const isAr = lang === 'ar';

    const sceneRefs = useMemo(
      () => [
        scene01Ref,
        scene02Ref,
        scene03Ref,
        scene04Ref,
        scene05Ref,
        scene06Ref,
        scene07Ref,
        scene08Ref,
        scene09Ref,
      ],
      []
    );

    const sceneTitles = useMemo(
      () =>
        SCENE_DATA.map((scene, index) => ({
          ...scene,
          ref: sceneRefs[index],
        })),
      [sceneRefs]
    );

    const updateActiveScene = useCallback(
      (index: number) => {
        setActiveSceneIndex((previous) => {
          if (previous === index) return previous;
          return index;
        });

        onSceneChange?.(index);
      },
      [onSceneChange]
    );

    const handleJumpToScene = useCallback(
      (index: number) => {
        const targetRef = sceneRefs[index];

        if (!targetRef?.current) return;

        sound.playClick();

        targetRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      },
      [sceneRefs]
    );

    useEffect(() => {
      onRegisterJump?.(handleJumpToScene);
    }, [onRegisterJump, handleJumpToScene]);

    // Scroll tracking and animations
    useEffect(() => {
      const container = containerRef.current;

      if (!container) return;

      const ctx = gsap.context(() => {
        sceneTitles.forEach((scene, index) => {
          const element = scene.ref.current;

          if (!element) return;

          ScrollTrigger.create({
            trigger: element,
            start: 'top 45%',
            end: 'bottom 45%',
            onEnter: () => updateActiveScene(index),
            onEnterBack: () => updateActiveScene(index),
          });

          if (index > 0) {
            gsap.fromTo(
              element,
              {
                opacity: 0.85,
                y: 40,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }
        });
      }, container);

      ScrollTrigger.refresh();

      return () => {
        ctx.revert();
      };
    }, [sceneTitles, updateActiveScene]);

    return (
      <div
        ref={containerRef}
        id="master-experience-wrapper"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: 'var(--bg-page)',
          color: 'var(--text-main)',
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* Desktop Scene Tracker */}
        <aside
          aria-label="Scene Index Telemetry"
          className="hidden xl:flex"
          style={{
            position: 'fixed',
            right: isAr ? 'auto' : '24px',
            left: isAr ? '24px' : 'auto',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 100,
            flexDirection: 'column',
            gap: '10px',
            pointerEvents: 'auto',
          }}
        >
          <div
            style={{
              padding: '10px 8px',
              borderRadius: '24px',
              backgroundColor: 'var(--bg-card)',
              border: '3.5px solid var(--border-comic)',
              boxShadow: '5px 5px 0px var(--shadow-comic)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            {sceneTitles.map((scene, index) => {
              const isActive = activeSceneIndex === index;

              return (
                <button
                  key={scene.num}
                  type="button"
                  onClick={() => handleJumpToScene(index)}
                  onMouseEnter={() => sound.playHover()}
                  title={`${scene.num} • ${isAr ? scene.titleAr : scene.titleEn
                    }`}
                  aria-label={`Go to scene ${scene.num}`}
                  aria-current={isActive ? 'step' : undefined}
                  style={{
                    position: 'relative',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: isActive
                      ? '#ff4d8d'
                      : 'var(--bg-page)',
                    color: isActive
                      ? '#ffffff'
                      : 'var(--text-main)',
                    border: '2.5px solid var(--border-comic)',
                    fontSize: '12px',
                    fontWeight: 900,
                    fontFamily: "'Bangers', 'Cairo', cursive",
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: isActive
                      ? 'scale(1.15) rotate(-4deg)'
                      : 'scale(1)',
                    boxShadow: isActive
                      ? '3px 3px 0px var(--shadow-comic)'
                      : 'none',
                    transition:
                      'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  {scene.num}
                </button>
              );
            })}
          </div>

          <div style={{ textAlign: 'center' }}>
            <ComicBadge
              text={sceneTitles[activeSceneIndex]?.num || '01'}
              subtext={
                isAr
                  ? sceneTitles[activeSceneIndex]?.titleAr
                  : sceneTitles[activeSceneIndex]?.titleEn
              }
              bg="#ccff00"
              rotation={isAr ? 3 : -3}
            />
          </div>
        </aside>

        {/* Main Sequential Experience */}
        <div
          id="master-stage"
          style={{
            position: 'relative',
            width: '100%',
          }}
        >
          <Suspense fallback={<SceneFallback lang={lang} />}>
            <div ref={scene01Ref} id="scene-intro">
              <Scene01Intro
                lang={lang}
                onExplore={() => handleJumpToScene(1)}
              />
            </div>

            <div ref={scene02Ref} id="scene-about">
              <Scene02About lang={lang} />
            </div>

            <div ref={scene03Ref} id="scene-education">
              <Scene03Education lang={lang} />
            </div>

            <div ref={scene04Ref} id="scene-experience">
              <Scene04Experience
                lang={lang}
                onExploreProjects={() => handleJumpToScene(5)}
              />
            </div>

            <div ref={scene05Ref} id="scene-skills">
              <Scene05Skills lang={lang} />
            </div>

            <div ref={scene06Ref} id="scene-projects">
              <Scene06Projects
                lang={lang}
                onOpenProject={onOpenProject}
              />
            </div>

            <div ref={scene07Ref} id="scene-certifications">
              <Scene07Certifications lang={lang} />
            </div>

            <div ref={scene08Ref} id="scene-timeline">
              <Scene08Timeline lang={lang} />
            </div>

            <div ref={scene09Ref} id="scene-contact">
              <Scene09Contact lang={lang} />
            </div>
          </Suspense>
        </div>
      </div>
    );
  };
