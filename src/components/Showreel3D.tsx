import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Language, Project } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ProjectModal } from './ProjectModal';
import { ComicBadge, ComicStars } from './comic/ComicElements';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface Showreel3DProps {
  lang: Language;
}

export const Showreel3D: React.FC<Showreel3DProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const t = PORTFOLIO_DATA.ui[lang];
  const isAr = lang === 'ar';

  const projects = PORTFOLIO_DATA.projects;
  const currentProject = projects[activeProjectIndex] || projects[0];

  const targetIndexRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0b12, 0.045);

    const getResponsiveCameraZ = (width: number) => {
      if (width < 440) return 7.8;
      if (width < 768) return 6.8;
      if (width < 1024) return 5.8;
      return 5.2;
    };

    const getResponsiveXSpacing = (width: number) => {
      if (width < 440) return 0.95;
      if (width < 768) return 1.1;
      return 1.35;
    };

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.1, getResponsiveCameraZ(container.clientWidth));

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Dynamic cinematic lighting matching theme colors
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xccff00, 3.2, 18);
    keyLight.position.set(3, 3, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x00e5ff, 2.5, 18);
    rimLight.position.set(-3, -2, 3);
    scene.add(rimLight);

    // Card geometry with responsive scaling
    const cardWidth = 1.7;
    const cardHeight = 2.65;
    const screenGeo = new THREE.PlaneGeometry(cardWidth, cardHeight);
    const borderGeo = new THREE.BoxGeometry(cardWidth + 0.06, cardHeight + 0.06, 0.035);
    const borderMat = new THREE.MeshStandardMaterial({
      color: 0x050508,
      metalness: 0.9,
      roughness: 0.2,
    });

    const loader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    const screenMeshes: THREE.Group[] = [];

    projects.forEach((proj) => {
      const cardGroup = new THREE.Group();
      const texture = loader.load(proj.thumbnail);
      textures.push(texture);

      const mat = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.2,
        metalness: 0.1,
      });

      const screenMesh = new THREE.Mesh(screenGeo, mat);
      cardGroup.add(screenMesh);

      const borderMesh = new THREE.Mesh(borderGeo, borderMat);
      borderMesh.position.z = -0.018;
      cardGroup.add(borderMesh);

      scene.add(cardGroup);
      screenMeshes.push(cardGroup);
    });

    // Touch and mouse drag interaction
    let currentIndex = targetIndexRef.current;
    let isDragging = false;
    let previousMouseX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - previousMouseX;
      targetIndexRef.current -= delta * 0.005;
      targetIndexRef.current = Math.max(0, Math.min(projects.length - 1, targetIndexRef.current));
      previousMouseX = e.clientX;
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      const snapped = Math.round(targetIndexRef.current);
      targetIndexRef.current = Math.max(0, Math.min(projects.length - 1, snapped));
      setActiveProjectIndex(targetIndexRef.current);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch Support
    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      const delta = e.touches[0].clientX - touchStartX;
      targetIndexRef.current -= delta * 0.007;
      targetIndexRef.current = Math.max(0, Math.min(projects.length - 1, targetIndexRef.current));
      touchStartX = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      const snapped = Math.round(targetIndexRef.current);
      targetIndexRef.current = Math.max(0, Math.min(projects.length - 1, snapped));
      setActiveProjectIndex(targetIndexRef.current);
    };

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    domEl.addEventListener('touchmove', onTouchMove, { passive: true });
    domEl.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animId: number;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const lerpSpeed = prefersReducedMotion ? 0.25 : 0.1;
      currentIndex += (targetIndexRef.current - currentIndex) * lerpSpeed;

      const currentWidth = container.clientWidth;
      const xSpacing = getResponsiveXSpacing(currentWidth);

      screenMeshes.forEach((mesh, i) => {
        const diff = i - currentIndex;
        const absDiff = Math.abs(diff);

        mesh.position.x = diff * xSpacing;
        mesh.position.y = -Math.pow(diff, 2) * 0.12 + 0.1;
        mesh.position.z = -absDiff * 0.55;

        mesh.rotation.z = -diff * 0.08;
        mesh.rotation.y = -diff * 0.12;

        const scale = Math.max(0.72, 1 - absDiff * 0.09);
        mesh.scale.setScalar(scale);

        mesh.visible = absDiff < 4.5;
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.position.z = getResponsiveCameraZ(width);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      domEl.removeEventListener('touchmove', onTouchMove);
      domEl.removeEventListener('touchend', onTouchEnd);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      screenGeo.dispose();
      borderGeo.dispose();
      borderMat.dispose();
      textures.forEach((t) => t.dispose());
    };
  }, [projects]);

  const handlePrev = () => {
    sound.playClick();
    const nextIdx = activeProjectIndex === 0 ? projects.length - 1 : activeProjectIndex - 1;
    targetIndexRef.current = nextIdx;
    setActiveProjectIndex(nextIdx);
  };

  const handleNext = () => {
    sound.playClick();
    const nextIdx = activeProjectIndex === projects.length - 1 ? 0 : activeProjectIndex + 1;
    targetIndexRef.current = nextIdx;
    setActiveProjectIndex(nextIdx);
  };

  const handleOpenActive = () => {
    sound.playClick();
    setModalProject(currentProject);
  };

  return (
    <section
      id="showreel"
      className="comic-halftone-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: 'clamp(80px, 10vh, 110px) clamp(16px, 4vw, 44px) clamp(60px, 8vh, 90px)',
        backgroundColor: '#0a0b12',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderTop: '4px solid #000000',
        borderBottom: '4px solid #000000',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      {/* Decorative Comic Stars */}
      <div style={{ position: 'absolute', top: '40px', right: '5%', pointerEvents: 'none' }}>
        <ComicStars size={32} color="#00e5ff" />
      </div>

      {/* Top Header */}
      <div style={{ maxWidth: '1360px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '880px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <ComicBadge text="SPATIAL 3D STUDIO" subtext="CYLINDER REEL" bg="#00e5ff" rotation={-2} />
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: '#ccff00',
                fontWeight: 900,
                textTransform: 'uppercase',
              }}
            >
              ★ INTERACTIVE 360° REEL CAROUSEL
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4.4vw, 3.8rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '14px',
              fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
              textTransform: 'uppercase',
              letterSpacing: isAr ? 'normal' : '-0.02em',
              filter: 'drop-shadow(3px 3px 0px #000000)',
            }}
          >
            {t.showreel_heading}
          </h2>

          <p
            style={{
              fontSize: 'clamp(14px, 1.25vw, 17px)',
              color: '#c5c8dc',
              lineHeight: 1.7,
              margin: 0,
              fontWeight: 500,
              fontFamily: isAr ? 'var(--font-body-ar)' : 'var(--font-body-en)',
            }}
          >
            {t.showreel_sub}
          </p>
        </div>
      </div>

      {/* 3D WebGL Canvas Container with fluid height */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
          height: 'clamp(380px, 48vh, 560px)',
          margin: '12px 0',
          cursor: 'grab',
          overflow: 'hidden',
        }}
        data-cursor="DRAG 3D"
      >
        <div
          ref={containerRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        />

        {/* Floating Instruction Comic Sticker Banner */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-1deg)',
            padding: '6px 16px',
            borderRadius: '12px',
            backgroundColor: '#ffe600',
            border: '2.5px solid #000000',
            color: '#000000',
            fontSize: 'clamp(10px, 2.5vw, 12px)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 900,
            boxShadow: '3px 3px 0px #000000',
            pointerEvents: 'none',
            zIndex: 10,
            whiteSpace: 'nowrap',
            maxWidth: '90%',
            textAlign: 'center',
          }}
        >
          {t.showreel_instruction}
        </div>
      </div>

      {/* Bottom Controls Panel */}
      <div style={{ maxWidth: '1360px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div
          className="comic-panel"
          style={{
            borderRadius: '24px',
            padding: 'clamp(16px, 3vw, 24px) clamp(16px, 4vw, 32px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            backgroundColor: '#141622',
            border: '3.5px solid #000000',
            boxShadow: '6px 6px 0px #000000',
          }}
        >
          {/* Active Reel Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '0', flex: '1 1 240px' }}>
            <div
              style={{
                width: 'clamp(52px, 10vw, 64px)',
                height: 'clamp(52px, 10vw, 64px)',
                borderRadius: '14px',
                overflow: 'hidden',
                backgroundColor: '#000000',
                border: '2.5px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                flexShrink: 0,
              }}
            >
              <img
                src={currentProject.thumbnail}
                alt={currentProject.title_en}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: '#ccff00',
                  fontWeight: 900,
                  marginBottom: '2px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                0{activeProjectIndex + 1} OF 0{projects.length} • {lang === 'en' ? currentProject.brand : currentProject.brand_ar}
              </div>
              <h3
                style={{
                  fontSize: 'clamp(16px, 2.5vw, 22px)',
                  fontWeight: 900,
                  fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                  color: '#ffffff',
                  filter: 'drop-shadow(2px 2px 0px #000000)',
                  lineHeight: 1.25,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {lang === 'en' ? currentProject.title_en : currentProject.title_ar}
              </h3>
            </div>
          </div>

          {/* Controls: Arrows + Open Video */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, flexWrap: 'wrap' }}>
            <button
              onClick={handlePrev}
              onMouseEnter={() => sound.playHover()}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#ffe600',
                border: '2.5px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              aria-label="Previous Project"
            >
              <ChevronLeft size={20} color="#000000" />
            </button>

            <button
              onClick={handleOpenActive}
              onMouseEnter={() => sound.playHover()}
              className="comic-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: '#ccff00',
                color: '#000000',
                fontSize: '12px',
                fontWeight: 900,
                border: '2.5px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                cursor: 'pointer',
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                whiteSpace: 'nowrap',
              }}
            >
              <Play size={16} fill="#000000" />
              <span>{lang === 'en' ? 'Play Reel' : 'تشغيل الريل 🎬'}</span>
            </button>

            <button
              onClick={handleNext}
              onMouseEnter={() => sound.playHover()}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#ffe600',
                border: '2.5px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              aria-label="Next Project"
            >
              <ChevronRight size={20} color="#000000" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={modalProject}
        lang={lang}
        onClose={() => setModalProject(null)}
        onNavigate={(dir) => {
          if (!modalProject) return;
          const idx = projects.findIndex((p) => p.id === modalProject.id);
          const nextIdx = dir === 'next' ? (idx + 1) % projects.length : (idx - 1 + projects.length) % projects.length;
          setModalProject(projects[nextIdx]);
          targetIndexRef.current = nextIdx;
          setActiveProjectIndex(nextIdx);
        }}
      />
    </section>
  );
};