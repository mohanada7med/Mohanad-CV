import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language, type Project } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { ComicBadge, ComicBurst } from '../comic/ComicElements';
import { Play, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface Scene06ProjectsProps {
  lang: Language;
  onOpenProject: (project: Project) => void;
  activeProjectIndex?: number;
  onSelectProject?: (index: number) => void;
}

export const Scene06Projects: React.FC<Scene06ProjectsProps> = ({
  lang,
  onOpenProject,
  activeProjectIndex,
  onSelectProject,
}) => {
  const isAr = lang === 'ar';
  const projects = PORTFOLIO_DATA.projects;
  const [internalIndex, setInternalIndex] = useState<number>(0);

  const activeIndex =
    activeProjectIndex !== undefined && activeProjectIndex >= 0 && activeProjectIndex < projects.length
      ? activeProjectIndex
      : internalIndex;
  const currentProject = projects[activeIndex] || projects[0];

  const handleSelect = (idx: number) => {
    sound.playClick();
    if (onSelectProject) {
      onSelectProject(idx);
    } else {
      setInternalIndex(idx);
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % projects.length;
    handleSelect(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + projects.length) % projects.length;
    handleSelect(prevIdx);
  };

  const soundEffects = ['BOOM!', 'POW!', 'CRUNCH!', 'VIRAL!'];

  return (
    <section
      id="scene-projects"
      className="master-scene-stage comic-halftone-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '110px clamp(16px, 4vw, 50px) 70px',
        borderBottom: '4px solid var(--border-comic)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-page)',
        color: 'var(--text-main)',
        boxSizing: 'border-box',
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
            <ComicBadge text="ACT #06" subtext={isAr ? 'سينما المشاريع' : 'THE CINEMA'} bg="#4dd2ff" rotation={-2} />
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                fontWeight: 900,
                color: 'var(--text-main)',
                margin: 0,
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                filter: 'drop-shadow(3px 3px 0px var(--border-comic))',
              }}
            >
              {isAr ? 'معرض المشاريع والريلز الحقيقية' : 'REAL COMMERCIAL SHOWCASE'}
            </h2>
          </div>

          {/* Project Switcher Comic Pills */}
          <div
            className="touch-scroll-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--bg-card)',
              padding: '6px',
              borderRadius: '16px',
              border: '3px solid var(--border-comic)',
              boxShadow: '4px 4px 0px var(--shadow-comic)',
            }}
          >
            {projects.map((proj, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleSelect(idx)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '10px',
                    border: '2px solid var(--border-comic)',
                    backgroundColor: isSelected ? '#ccff00' : 'transparent',
                    color: '#000000',
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                    fontSize: '12px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: isSelected ? '2px 2px 0px var(--shadow-comic)' : 'none',
                    transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAr ? proj.brand_ar : proj.brand}
                </button>
              );
            })}
          </div>
        </div>

        {/* Centerpiece Showcase Stage */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(24px, 3.5vw, 40px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Phone Mockup Frame */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Sound FX Comic Bubble */}
            <div
              style={{
                position: 'absolute',
                top: '-15px',
                right: isAr ? 'auto' : '10px',
                left: isAr ? '10px' : 'auto',
                zIndex: 20,
              }}
            >
              <ComicBurst color="#ff4d8d" size={84}>
                <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: 900 }}>
                  {soundEffects[activeIndex % soundEffects.length]}
                </span>
              </ComicBurst>
            </div>

            {/* Cartoon Smartphone / Viewport Shell */}
            <div
              className="comic-panel"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '310px',
                aspectRatio: '9/16',
                borderRadius: '36px',
                border: '5px solid #000000',
                boxShadow: '10px 10px 0px var(--shadow-comic)',
                backgroundColor: '#000000',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => {
                sound.playWhoosh();
                onOpenProject(currentProject);
              }}
            >
              {/* Phone Speaker Notch */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '70px',
                  height: '14px',
                  backgroundColor: '#1a1a24',
                  borderRadius: '10px',
                  zIndex: 25,
                  border: '2px solid #000000',
                }}
              />

              {/* Poster Thumbnail / Video Snapshot */}
              <img
                src={currentProject.thumbnail}
                alt={isAr ? currentProject.title_ar : currentProject.title_en}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
              />

              {/* Gradient Dark Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.4) 100%)',
                  zIndex: 10,
                }}
              />

              {/* Center Cartoon Big Play Button */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  backgroundColor: '#ccff00',
                  border: '4px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="hover-bounce"
              >
                <Play size={32} color="#000000" fill="#000000" style={{ transform: isAr ? 'scaleX(-1)' : 'none', marginLeft: isAr ? 0 : '4px' }} />
              </div>

              {/* Bottom Phone Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '16px',
                  right: '16px',
                  zIndex: 20,
                  color: '#ffffff',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#ffd93d',
                    color: '#000000',
                    fontSize: '10px',
                    fontWeight: 900,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1.5px solid #000000',
                    display: 'inline-block',
                    marginBottom: '6px',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {currentProject.duration} • {currentProject.year}
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 900,
                    lineHeight: 1.2,
                    textShadow: '2px 2px 0px #000000',
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                  }}
                >
                  {isAr ? currentProject.title_ar : currentProject.title_en}
                </div>
              </div>
            </div>

            {/* Stepper Controls underneath phone */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '16px',
              }}
            >
              <button
                onClick={handlePrev}
                aria-label="Previous Project"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  border: '2.5px solid var(--border-comic)',
                  boxShadow: '3px 3px 0px var(--shadow-comic)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontWeight: 900,
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 900,
                  fontSize: '12px',
                  color: 'var(--text-main)',
                }}
              >
                {activeIndex + 1} / {projects.length}
              </span>

              <button
                onClick={handleNext}
                aria-label="Next Project"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  border: '2.5px solid var(--border-comic)',
                  boxShadow: '3px 3px 0px var(--shadow-comic)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontWeight: 900,
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Right Column: Project Brief & Campaign Breakdown Panel */}
          <div
            className="comic-panel"
            style={{
              padding: 'clamp(20px, 3.5vw, 36px)',
              backgroundColor: 'var(--bg-card)',
              borderRadius: '24px',
              border: '4px solid var(--border-comic)',
              boxShadow: '8px 8px 0px var(--shadow-comic)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Top Brand Tag */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    backgroundColor: '#ccff00',
                    color: '#000000',
                    fontSize: '12px',
                    fontWeight: 900,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: '2px solid #000000',
                    fontFamily: 'Bangers, Cairo, cursive',
                    letterSpacing: '1px',
                  }}
                >
                  {isAr ? currentProject.brand_ar : currentProject.brand}
                </span>
                <span
                  style={{
                    backgroundColor: 'var(--bg-page)',
                    color: 'var(--text-main)',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: '2px solid var(--border-comic)',
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                  }}
                >
                  {isAr ? currentProject.category_ar : currentProject.category}
                </span>
              </div>

              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  fontWeight: 800,
                }}
              >
                YEAR: {currentProject.year}
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h3
                style={{
                  fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                  fontWeight: 900,
                  color: 'var(--text-main)',
                  margin: '0 0 10px',
                  fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                  lineHeight: 1.25,
                }}
              >
                {isAr ? currentProject.title_ar : currentProject.title_en}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
                {isAr ? currentProject.description_ar : currentProject.description_en}
              </p>
            </div>

            {/* Creative Concept Box */}
            <div
              style={{
                padding: '16px',
                borderRadius: '16px',
                backgroundColor: 'var(--bg-page)',
                border: '3px solid var(--border-comic)',
                boxShadow: '4px 4px 0px var(--shadow-comic)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: 900,
                  color: 'var(--text-main)',
                  fontFamily: 'JetBrains Mono, monospace',
                  marginBottom: '6px',
                }}
              >
                <Sparkles size={14} color="#ff4d8d" />
                <span>{isAr ? 'الفكرة الإبداعية والتنفيذ' : 'CREATIVE CONCEPT & DIRECTION'}</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: 'var(--text-main)', fontWeight: 600 }}>
                {isAr ? currentProject.creative_concept_ar : currentProject.creative_concept_en}
              </p>
            </div>

            {/* Campaign Objective & Tags */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)' }}>
                {isAr ? 'العناصر التقنية المنفذة:' : 'KEY PRODUCTION ELEMENTS:'}
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {currentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '100px',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-main)',
                      border: '2px solid var(--border-comic)',
                      fontSize: '11px',
                      fontWeight: 800,
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA Button to Launch Video Modal */}
            <button
              onClick={() => {
                sound.playChime();
                onOpenProject(currentProject);
              }}
              style={{
                padding: '14px 24px',
                borderRadius: '16px',
                backgroundColor: '#ccff00',
                color: '#000000',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0px #000000',
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                fontSize: '16px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '10px',
                transition: 'transform 0.15s ease',
              }}
              className="hover-bounce"
            >
              <Play size={18} fill="#000000" color="#000000" />
              <span>{isAr ? 'مشاهدة الفيديو وتفاصيل المشروع' : 'WATCH REEL & CASE STUDY'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
