import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language, type Project } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { Play, Sparkles, ArrowUpRight, ChevronLeft, ChevronRight, Film, Award } from 'lucide-react';

interface Scene03ProjectsProps {
  lang: Language;
  onOpenProject: (project: Project) => void;
}

export const Scene03Projects: React.FC<Scene03ProjectsProps> = ({ lang, onOpenProject }) => {
  const isAr = lang === 'ar';
  const projects = PORTFOLIO_DATA.projects;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const currentProject = projects[activeIndex] || projects[0];

  const handleNext = () => {
    sound.playClick();
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    sound.playClick();
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      id="scene-projects"
      className="master-scene-stage"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '110px clamp(16px, 4vw, 50px) 70px',
        backgroundColor: '#050505',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
        {/* Section Eyebrow & Project Index Navigator */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
            <Film size={14} />
            <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, letterSpacing: '0.08em' }}>
              SCENE 03 • CINEMA VAULT ({activeIndex + 1} OF {projects.length})
            </span>
          </div>

          {/* Project Switcher Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', maxWidth: '100%' }}>
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => {
                  sound.playClick();
                  setActiveIndex(idx);
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '100px',
                  backgroundColor: activeIndex === idx ? '#ffffff' : 'rgba(255, 255, 255, 0.06)',
                  color: activeIndex === idx ? '#000000' : '#a1a1aa',
                  border: activeIndex === idx ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '11px',
                  fontWeight: 800,
                  fontFamily: isAr ? 'Alexandria, sans-serif' : 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {isAr ? proj.brand_ar : proj.brand}
              </button>
            ))}
          </div>
        </div>

        {/* Big Asymmetrical Showcase Split */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(30px, 5vw, 60px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: 9:16 Vertical Cinema Phone Frame with Depth Parallax */}
          <div
            className="project-visual-column"
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Glowing Accent Ring Behind Phone */}
            <div
              style={{
                position: 'absolute',
                width: '320px',
                height: '500px',
                borderRadius: '40px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }}
            />

            {/* Vertical Video Frame */}
            <div
              style={{
                width: '100%',
                maxWidth: '340px',
                height: 'clamp(460px, 50vw, 580px)',
                borderRadius: '34px',
                overflow: 'hidden',
                position: 'relative',
                border: '3px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 255, 255, 0.08)',
                backgroundColor: '#000000',
                cursor: 'pointer',
              }}
              onClick={() => {
                sound.playClick();
                onOpenProject(currentProject);
              }}
            >
              <img
                key={currentProject.thumbnail}
                src={currentProject.thumbnail}
                alt={currentProject.title_en}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  animation: 'fadeIn 0.4s ease',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: 'contrast(1.05)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />

              {/* Viewfinder Scrim Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, transparent 40%, rgba(0,0,0,0.9) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '20px',
                  pointerEvents: 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '100px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: '#ffffff',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      fontWeight: 800,
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    ● 4K {currentProject.aspect_ratio}
                  </span>
                  <span style={{ color: '#ffffff', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>
                    {currentProject.duration}
                  </span>
                </div>

                {/* Center Pulsing Play Button */}
                <div
                  style={{
                    alignSelf: 'center',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000000',
                    boxShadow: '0 0 35px rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <Play size={24} fill="#000000" />
                </div>

                {/* Bottom Video HUD Label */}
                <div>
                  <div style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                    {isAr ? currentProject.category_ar : currentProject.category}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif' }}>
                    {isAr ? currentProject.title_ar : currentProject.title_en}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Typography, Concept Breakdown, & Direct Triggers */}
          <div className="project-text-column" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#ffffff',
                  fontWeight: 800,
                  marginBottom: '8px',
                }}
              >
                0{activeIndex + 1} • {isAr ? currentProject.brand_ar : currentProject.brand} • {currentProject.year}
              </div>

              <h3
                style={{
                  fontSize: 'clamp(2.2rem, 4.2vw, 3.8rem)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: '#ffffff',
                  fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                  margin: 0,
                }}
              >
                {isAr ? currentProject.title_ar : currentProject.title_en}
              </h3>
            </div>

            {/* Tags Ribbon */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {currentProject.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#d4d4d8',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#d4d4d8', margin: 0 }}>
              {isAr ? currentProject.description_ar : currentProject.description_en}
            </p>

            {/* Creative Concept Box */}
            <div
              style={{
                padding: '20px',
                borderRadius: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, marginBottom: '6px' }}>
                <Sparkles size={14} />
                <span>{isAr ? 'الهوك والفكرة الإبداعية' : 'THE CREATIVE HOOK & CONCEPT'}</span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#f4f4f5', margin: 0 }}>
                {isAr ? currentProject.creative_concept_ar : currentProject.creative_concept_en}
              </p>
            </div>

            {/* Verified Performance Metrics */}
            {currentProject.results_en && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '13px',
                  color: '#a1a1aa',
                }}
              >
                <Award size={16} color="#ffffff" />
                <span>{isAr ? currentProject.results_ar : currentProject.results_en}</span>
              </div>
            )}

            {/* Primary Action Button & Previous/Next Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenProject(currentProject);
                }}
                onMouseEnter={() => sound.playHover()}
                data-cursor="WATCH"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  borderRadius: '100px',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                  boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)',
                  transition: 'transform 0.2s ease, background-color 0.2s',
                }}
                className="magnetic-btn"
              >
                <span>{isAr ? 'مشاهدة تفاصيل الفيديو الكاملة' : 'Watch Full Project Breakdown'}</span>
                <ArrowUpRight size={16} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={handlePrev}
                  onMouseEnter={() => sound.playHover()}
                  aria-label="Previous Project"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  onMouseEnter={() => sound.playHover()}
                  aria-label="Next Project"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
