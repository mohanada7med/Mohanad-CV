import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Language, Project } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ProjectModal } from './ProjectModal';
import { Play, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface Showreel3DProps {
  lang: Language;
}

export const Showreel3D: React.FC<Showreel3DProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const t = PORTFOLIO_DATA.ui[lang];

  const projects = PORTFOLIO_DATA.projects;
  const currentProject = projects[activeProjectIndex];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL
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
    scene.fog = new THREE.FogExp2(0x070709, 0.05);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.2);

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Ambient & Accent Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const limePoint = new THREE.PointLight(0xccff00, 3, 14);
    limePoint.position.set(0, 2, 4);
    scene.add(limePoint);

    const orangePoint = new THREE.PointLight(0xff5500, 2.5, 14);
    orangePoint.position.set(0, -2, 4);
    scene.add(orangePoint);

    // Curved Carousel 3D Screen Array
    const carouselGroup = new THREE.Group();
    scene.add(carouselGroup);

    const radius = 4.2;
    const screenGeo = new THREE.PlaneGeometry(1.4, 2.48);
    const screenMeshes: THREE.Mesh[] = [];

    const textures: THREE.Texture[] = [];
    const loader = new THREE.TextureLoader();

    projects.forEach((proj, i) => {
      const angle = (i / projects.length) * Math.PI * 2;
      const texture = loader.load(proj.thumbnail);
      textures.push(texture);

      const mat = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.2,
        metalness: 0.1,
      });

      const mesh = new THREE.Mesh(screenGeo, mat);
      mesh.position.x = Math.sin(angle) * radius;
      mesh.position.z = Math.cos(angle) * radius - radius + 1.2;
      mesh.rotation.y = angle;

      // Bezel edge
      const borderGeo = new THREE.BoxGeometry(1.44, 2.52, 0.03);
      const borderMat = new THREE.MeshStandardMaterial({ color: 0x161720, metalness: 0.9, roughness: 0.2 });
      const borderMesh = new THREE.Mesh(borderGeo, borderMat);
      borderMesh.position.z = -0.018;
      mesh.add(borderMesh);

      carouselGroup.add(mesh);
      screenMeshes.push(mesh);
    });

    // Drag Orbit & Inertia State
    let isDragging = false;
    let prevPointerX = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      prevPointerX = clientX;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - prevPointerX;
      prevPointerX = clientX;
      targetRotationY += deltaX * 0.005;
    };

    const onPointerUp = () => {
      isDragging = false;
      // Snap to closest screen angle
      const segment = (Math.PI * 2) / projects.length;
      const snappedIdx = Math.round(-targetRotationY / segment);
      targetRotationY = -snappedIdx * segment;
      const normalizedIdx = ((snappedIdx % projects.length) + projects.length) % projects.length;
      setActiveProjectIndex(normalizedIdx);
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    // Animation loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation lerp
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      carouselGroup.rotation.y = currentRotationY;

      // Gentle floating bobbing
      carouselGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.06;

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
      cancelAnimationFrame(animationId);
      dom.removeEventListener('mousedown', onPointerDown);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      screenGeo.dispose();
      textures.forEach((t) => t.dispose());
    };
  }, [projects]);

  const handlePrev = () => {
    sound.playClick();
    setActiveProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    sound.playClick();
    setActiveProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleOpenActive = () => {
    sound.playClick();
    setModalProject(currentProject);
  };

  return (
    <section
      id="showreel"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '100px',
        paddingBottom: '80px',
        backgroundColor: '#070709',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Top Header */}
      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '820px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '100px',
              backgroundColor: 'rgba(204, 255, 0, 0.08)',
              border: '1px solid rgba(204, 255, 0, 0.25)',
              color: '#ccff00',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={13} />
            <span>INTERACTIVE 3D SPATIAL REEL</span>
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              color: '#ffffff',
              marginBottom: '14px',
            }}
          >
            {t.showreel_heading}
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#8d90a0', lineHeight: 1.6 }}>
            {t.showreel_sub}
          </p>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '540px',
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
            transform: 'translateX(-50%)',
            padding: '8px 20px',
            borderRadius: '100px',
            backgroundColor: 'rgba(12, 13, 18, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#ccff00',
            fontSize: '11px',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700,
            pointerEvents: 'none',
            letterSpacing: '0.05em',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          {t.showreel_instruction}
        </div>
      </div>

      {/* Bottom Controls & Active Reel Card Preview */}
      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          className="glass-panel-elevated"
          style={{
            borderRadius: '24px',
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            border: '1px solid rgba(204, 255, 0, 0.25)',
          }}
        >
          {/* Active Reel Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#000000',
                border: '1px solid #ccff00',
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
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#ccff00',
                  fontWeight: 700,
                }}
              >
                0{activeProjectIndex + 1} OF 0{projects.length} • {lang === 'en' ? currentProject.brand : currentProject.brand_ar}
              </div>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 900,
                  fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                  color: '#ffffff',
                }}
              >
                {lang === 'en' ? currentProject.title_en : currentProject.title_ar}
              </h3>
            </div>
          </div>

          {/* Controls: Arrows + Open Fullscreen Video Modal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={handlePrev}
              onMouseEnter={() => sound.playHover()}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleOpenActive}
              onMouseEnter={() => sound.playHover()}
              data-cursor="PLAY REEL"
              className="magnetic-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 26px',
                borderRadius: '100px',
                backgroundColor: '#ccff00',
                color: '#070709',
                fontSize: '13px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                boxShadow: '0 0 25px rgba(204, 255, 0, 0.35)',
              }}
            >
              <Play size={16} fill="#070709" />
              <span>{lang === 'en' ? 'Play Current Reel' : 'تشغيل الريل الحالي'}</span>
            </button>

            <button
              onClick={handleNext}
              onMouseEnter={() => sound.playHover()}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for 3D Gallery project */}
      <ProjectModal
        project={modalProject}
        lang={lang}
        onClose={() => setModalProject(null)}
        onNavigate={(dir) => {
          if (!modalProject) return;
          const idx = projects.findIndex((p) => p.id === modalProject.id);
          const nextIdx = dir === 'next' ? (idx + 1) % projects.length : (idx - 1 + projects.length) % projects.length;
          setModalProject(projects[nextIdx]);
        }}
      />
    </section>
  );
};
