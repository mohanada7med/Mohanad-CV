import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language, type Project } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { ComicBadge, ComicBurst } from '../comic/ComicElements';
import { Play, ChevronLeft, ChevronRight, Award, Zap } from 'lucide-react';

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

  // Sound effect words per project index
  const soundEffects = ['BOOM!', 'POW!', 'CRUNCH!', 'VIRAL!', 'SWEET!', 'ACTION!'];

  return (
    <section
      id="scene-projects"
      className="master-scene-stage comic-halftone-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '110px clamp(16px, 4vw, 50px) 70px',
        backgroundColor: '#0a0b10',
        borderBottom: '4px solid #000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '1360px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header Strip */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ComicBadge text="PANEL #03" subtext="VAULT" bg="#00e5ff" rotation={-2} />
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                fontWeight: 900,
                color: '#ffffff',
                margin: 0,
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                filter: 'drop-shadow(3px 3px 0px #000000)',
              }}
            >
              {isAr ? 'معرض المشاريع والريلز التجارية' : 'THE VIRAL REEL SHOWCASE'}
            </h2>
          </div>

          {/* Project Switcher Comic Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', maxWidth: '100%', padding: '4px 0' }}>
            {projects.map((proj, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveIndex(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '12px',
                    backgroundColor: isActive ? '#ccff00' : '#141622',
                    color: isActive ? '#000000' : '#a1a3b5',
                    border: '2.5px solid #000000',
                    fontSize: '12px',
                    fontWeight: 900,
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'JetBrains Mono, monospace',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transform: isActive ? 'rotate(-2deg) scale(1.05)' : 'rotate(0deg)',
                    boxShadow: isActive ? '4px 4px 0px #000000' : '2px 2px 0px #000000',
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  {isAr ? proj.brand_ar : proj.brand}
                </button>
              );
            })}
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
          {/* Left Column: Comic Vertical Video Frame */}
          <div
            className="project-visual-column"
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Corner Sound Effect Burst */}
            <div
              style={{
                position: 'absolute',
                top: '-24px',
                left: isAr ? 'auto' : '-24px',
                right: isAr ? '-24px' : 'auto',
                zIndex: 20,
                transform: 'rotate(-12deg)',
              }}
            >
              <ComicBurst size={110} color="#ffe600">
                <span style={{ fontSize: '14px', fontWeight: 900 }}>
                  {soundEffects[activeIndex % soundEffects.length]}
                </span>
              </ComicBurst>
            </div>

            {/* Vertical Video Phone Frame with Comic Outlines */}
            <div
              className="comic-panel"
              style={{
                width: '100%',
                maxWidth: '350px',
                height: 'clamp(460px, 52vw, 580px)',
                borderRadius: '30px',
                overflow: 'hidden',
                position: 'relative',
                border: '4.5px solid #000000',
                boxShadow: '10px 10px 0px #ccff00, 10px 10px 0px 4px #000000',
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
                  animation: 'fadeIn 0.35s ease',
                  transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  filter: 'contrast(1.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />

              {/* Viewfinder Scrim Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 40%, rgba(0,0,0,0.92) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '20px',
                  pointerEvents: 'none',
                }}
              >
                {/* Top Badge Strip */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '100px',
                      backgroundColor: '#000000',
                      color: '#ccff00',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      fontWeight: 900,
                      border: '2px solid #ccff00',
                    }}
                  >
                    ● 4K {currentProject.aspect_ratio}
                  </span>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      fontWeight: 900,
                      border: '2px solid #000000',
                    }}
                  >
                    {currentProject.duration}
                  </span>
                </div>

                {/* Center Pulsing Play Button */}
                <div
                  style={{
                    alignSelf: 'center',
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: '#ccff00',
                    border: '3.5px solid #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000000',
                    boxShadow: '5px 5px 0px #000000',
                    transform: 'scale(1)',
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  className="animate-comic-float"
                >
                  <Play size={26} fill="#000000" />
                </div>

                {/* Bottom Video HUD Label */}
                <div>
                  <div style={{ fontSize: '11px', color: '#ccff00', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                    {isAr ? currentProject.category_ar : currentProject.category}
                  </div>
                  <div
                    style={{
                      fontSize: '18px',
                      fontWeight: 900,
                      color: '#ffffff',
                      fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                      marginTop: '4px',
                    }}
                  >
                    {isAr ? currentProject.title_ar : currentProject.title_en}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Typography & Comic Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '10px',
                }}
              >
                <ComicBadge
                  text={`0${activeIndex + 1} / 0${projects.length}`}
                  subtext={currentProject.year}
                  bg="#ffffff"
                  rotation={-1}
                />
                <span style={{ fontSize: '14px', fontWeight: 900, color: '#ccff00', textTransform: 'uppercase' }}>
                  ✦ {isAr ? currentProject.brand_ar : currentProject.brand}
                </span>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: '#ffffff',
                  margin: 0,
                  fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                  filter: 'drop-shadow(3px 3px 0px #000000)',
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
                    padding: '4px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#161825',
                    border: '2px solid #000000',
                    color: '#d4d5e5',
                    fontSize: '11px',
                    fontWeight: 800,
                    fontFamily: 'JetBrains Mono, monospace',
                    boxShadow: '2px 2px 0px #000000',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#d4d5e2', margin: 0, fontFamily: isAr ? 'var(--font-body-ar)' : 'Space Grotesk, sans-serif' }}>
              {isAr ? currentProject.description_ar : currentProject.description_en}
            </p>

            {/* Creative Concept Box Styled as Comic Panel */}
            <div
              className="comic-panel"
              style={{
                padding: '20px',
                borderRadius: '16px',
                backgroundColor: '#151722',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0px #000000',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ccff00', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 900, marginBottom: '6px' }}>
                <Zap size={16} color="#ccff00" />
                <span>{isAr ? 'الهوك والفكرة الإبداعية' : 'THE CREATIVE HOOK & CONCEPT'}</span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#f5f6fa', margin: 0, fontWeight: 500 }}>
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
                  padding: '12px 18px',
                  borderRadius: '12px',
                  backgroundColor: '#000000',
                  border: '2px solid #ccff00',
                  boxShadow: '3px 3px 0px #000000',
                  fontSize: '13px',
                  color: '#ffffff',
                  fontWeight: 700,
                }}
              >
                <Award size={18} color="#ccff00" />
                <span>{isAr ? currentProject.results_ar : currentProject.results_en}</span>
              </div>
            )}

            {/* Primary Action Button & Previous/Next Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenProject(currentProject);
                }}
                onMouseEnter={() => sound.playHover()}
                className="comic-btn"
                data-cursor="WATCH REEL"
              >
                <Play size={18} fill="#070709" />
                <span>{isAr ? 'مشاهدة الريل بالكامل' : 'WATCH FULL REEL'}</span>
              </button>

              {/* Prev / Next Comic Circular Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={handlePrev}
                  onMouseEnter={() => sound.playHover()}
                  title="Previous Project"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    border: '3px solid #000000',
                    boxShadow: '3px 3px 0px #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  onMouseDown={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translate(2px, 2px)';
                  }}
                  onMouseUp={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)';
                  }}
                >
                  <ChevronLeft size={22} strokeWidth={3} />
                </button>

                <button
                  onClick={handleNext}
                  onMouseEnter={() => sound.playHover()}
                  title="Next Project"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    border: '3px solid #000000',
                    boxShadow: '3px 3px 0px #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  onMouseDown={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translate(2px, 2px)';
                  }}
                  onMouseUp={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)';
                  }}
                >
                  <ChevronRight size={22} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
