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

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.1, 5.2);

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // إضاءة سينمائية متطابقة مع ألوان الهوية
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xccff00, 3.2, 18);
    keyLight.position.set(3, 3, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x00e5ff, 2.5, 18);
    rimLight.position.set(-3, -2, 3);
    scene.add(rimLight);

    // بناء هندسة ومجسمات البطاقات
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

    // تفاعل السحب بالأصابع والماوس
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
      targetIndexRef.current -= delta * 0.006;
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
      targetIndexRef.current -= delta * 0.008;
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

    // Animation Loop: توزيع Fan / Stacked Deck
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // تنعيم الحركة نحو البطاقة المستهدفة
      currentIndex += (targetIndexRef.current - currentIndex) * 0.1;

      screenMeshes.forEach((mesh, i) => {
        const diff = i - currentIndex;
        const absDiff = Math.abs(diff);

        // إزاحة أفقية منحنية مع تدوير في محور Z يشبه تفرع أوراق اللعب
        mesh.position.x = diff * 1.35;
        mesh.position.y = -Math.pow(diff, 2) * 0.12 + 0.1;
        mesh.position.z = -absDiff * 0.55;

        mesh.rotation.z = -diff * 0.09;
        mesh.rotation.y = -diff * 0.14;

        // تكبير البطاقة الأقرب للمركز
        const scale = Math.max(0.75, 1 - absDiff * 0.09);
        mesh.scale.setScalar(scale);

        // إخفاء الكروت البعيدة جدًا لتسريع الأداء
        mesh.visible = absDiff < 4.2;
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
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
        padding: '110px clamp(16px, 4vw, 50px) 90px',
        backgroundColor: '#0a0b12',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderTop: '4px solid #000000',
        borderBottom: '4px solid #000000',
      }}
    >
      {/* Comic Stars */}
      <div style={{ position: 'absolute', top: '40px', right: '5%', pointerEvents: 'none' }}>
        <ComicStars size={32} color="#00e5ff" />
      </div>

      {/* Top Header */}
      <div style={{ maxWidth: '1360px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '880px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <ComicBadge text="SPATIAL 3D STUDIO" subtext="FAN DECK" bg="#00e5ff" rotation={-2} />
            <span
              style={{
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#ccff00',
                fontWeight: 900,
                textTransform: 'uppercase',
              }}
            >
              ★ RADIAL STACKED REEL
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '16px',
              fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              filter: 'drop-shadow(3px 3px 0px #000000)',
            }}
          >
            {t.showreel_heading}
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.3vw, 17px)',
              color: '#c5c8dc',
              lineHeight: 1.7,
              margin: 0,
              fontWeight: 600,
              fontFamily: isAr ? 'var(--font-body-ar)' : 'Space Grotesk, sans-serif',
            }}
          >
            {t.showreel_sub}
          </p>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '560px',
          margin: '20px 0',
          cursor: 'grab',
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

        {/* Floating Instruction Banner */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-1deg)',
            padding: '8px 22px',
            borderRadius: '12px',
            backgroundColor: '#ffe600',
            border: '2.5px solid #000000',
            color: '#000000',
            fontSize: '12px',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 900,
            boxShadow: '4px 4px 0px #000000',
            pointerEvents: 'none',
            zIndex: 10,
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
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            backgroundColor: '#141622',
            border: '3.5px solid #000000',
            boxShadow: '6px 6px 0px #000000',
          }}
        >
          {/* Active Reel Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
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

            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#ccff00',
                  fontWeight: 900,
                  marginBottom: '4px',
                }}
              >
                0{activeProjectIndex + 1} OF 0{projects.length} • {lang === 'en' ? currentProject.brand : currentProject.brand_ar}
              </div>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 900,
                  fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                  color: '#ffffff',
                  filter: 'drop-shadow(2px 2px 0px #000000)',
                }}
              >
                {lang === 'en' ? currentProject.title_en : currentProject.title_ar}
              </h3>
            </div>
          </div>

          {/* Controls: Arrows + Open Video */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={handlePrev}
              onMouseEnter={() => sound.playHover()}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
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
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '5px 5px 0px #000000';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
              }}
              aria-label="Previous Project"
            >
              <ChevronLeft size={22} color="#000000" />
            </button>

            <button
              onClick={handleOpenActive}
              onMouseEnter={() => sound.playHover()}
              className="comic-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 26px',
                backgroundColor: '#ccff00',
                color: '#000000',
                fontSize: '13px',
                fontWeight: 900,
                border: '3px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                cursor: 'pointer',
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
              }}
            >
              <Play size={18} fill="#000000" />
              <span>{lang === 'en' ? 'Play Current Reel' : 'تشغيل الريل الحالي 🎬'}</span>
            </button>

            <button
              onClick={handleNext}
              onMouseEnter={() => sound.playHover()}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
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
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '5px 5px 0px #000000';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
              }}
              aria-label="Next Project"
            >
              <ChevronRight size={22} color="#000000" />
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