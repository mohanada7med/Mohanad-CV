import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project, Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Share2, Sparkles, Target, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  lang: Language;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  lang,
  onClose,
  onNavigate,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(15);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(lang === 'ar' ? 'prev' : 'next');
      if (e.key === 'ArrowLeft') onNavigate(lang === 'ar' ? 'next' : 'prev');
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onNavigate, lang]);

  // Video progress simulation ticker
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!project) return null;

  const handleShare = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(5, 5, 8, 0.94)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
    >
      {/* Modal Container */}
      <div
        className="glass-panel-elevated"
        style={{
          width: '100%',
          maxWidth: '1100px',
          maxHeight: '92vh',
          borderRadius: '28px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(204, 255, 0, 0.1)',
          position: 'relative',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(12, 13, 18, 0.8)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                color: '#000000',
                fontSize: '11px',
                fontWeight: 800,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {project.aspect_ratio}
            </span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#ffffff',
                fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
              }}
            >
              {lang === 'en' ? project.brand : project.brand_ar} • {project.year}
            </span>
          </div>

          {/* Close & Share */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleShare}
              onMouseEnter={() => sound.playHover()}
              title="Share Project"
              style={{
                padding: '8px 14px',
                borderRadius: '100px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: copiedLink ? '#ccff00' : '#ffffff',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Share2 size={13} />
              <span>{copiedLink ? (lang === 'en' ? 'Copied!' : 'تم النسخ!') : (lang === 'en' ? 'Share' : 'مشاركة')}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="CLOSE"
              style={{
                width: '36px',
                height: '36px',
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
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Main Content: Split Video Display + Project Intel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            overflowY: 'auto',
            maxHeight: 'calc(92vh - 70px)',
          }}
        >
          {/* Left Column: Interactive 9:16 Video Canvas Player */}
          <div
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#050608',
              borderRight: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {/* Phone Bezel Frame */}
            <div
              style={{
                width: '100%',
                maxWidth: '320px',
                height: '570px',
                borderRadius: '32px',
                overflow: 'hidden',
                position: 'relative',
                border: '4px solid #1f212c',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(204, 255, 0, 0.2)',
                backgroundColor: '#000000',
              }}
            >
              {/* Media image / visual */}
              <img
                src={project.thumbnail}
                alt={project.title_en}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: isPlaying ? 'scale(1.03)' : 'scale(1)',
                  transition: 'transform 0.4s ease',
                }}
              />

              {/* Dynamic HUD Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 35%, rgba(0,0,0,0.7) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '20px',
                  pointerEvents: 'none',
                }}
              >
                {/* Top Live Timecode */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      color: '#ffffff',
                      fontWeight: 700,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    ● PLAYING • 4K
                  </span>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      color: '#ffffff',
                    }}
                  >
                    {project.duration}
                  </span>
                </div>

                {/* Bottom Overlay Title & Creator */}
                <div>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#ffffff',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 700,
                    }}
                  >
                    @{PORTFOLIO_DATA.creator.name_en.toLowerCase().replace(' ', '.')}
                  </span>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 800,
                      color: '#ffffff',
                      fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                      marginTop: '2px',
                    }}
                  >
                    {lang === 'en' ? project.title_en : project.title_ar}
                  </div>
                </div>
              </div>

              {/* Centered Play/Pause Click Overlay */}
              <button
                onClick={() => {
                  sound.playClick();
                  setIsPlaying(!isPlaying);
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {!isPlaying && (
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000000',
                      boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
                    }}
                  >
                    <Play size={28} fill="#000000" />
                  </div>
                )}
              </button>

              {/* Progress Scrubber */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: '#ffffff',
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                  }}
                />
              </div>
            </div>

            {/* Video Controls Under Phone */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginTop: '16px',
              }}
            >
              <button
                onClick={() => {
                  sound.playClick();
                  setIsPlaying(!isPlaying);
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '100px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsMuted(!isMuted);
                }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} color="#ffffff" />}
              </button>
            </div>
          </div>

          {/* Right Column: Deep Creative Breakdown & Verified Metrics */}
          <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Title & Brand */}
            <div>
              <div
                style={{
                  fontSize: '13px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#ffffff',
                  fontWeight: 700,
                  marginBottom: '6px',
                }}
              >
                {lang === 'en' ? project.brand : project.brand_ar} • {lang === 'en' ? project.category : project.category_ar}
              </div>
              <h2
                className="font-heading"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  color: '#ffffff',
                }}
              >
                {lang === 'en' ? project.title_en : project.title_ar}
              </h2>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#d4d4d8',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#e2e4ec' }}>
              {lang === 'en' ? project.description_en : project.description_ar}
            </p>

            {/* Creative Concept */}
            <div
              style={{
                padding: '20px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#ffffff' }}>
                <Sparkles size={16} />
                <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                  {lang === 'en' ? 'CREATIVE HOOK & CONCEPT' : 'الفكرة الإبداعية والهوك'}
                </span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#f5f6fa' }}>
                {lang === 'en' ? project.creative_concept_en : project.creative_concept_ar}
              </p>
            </div>

            {/* Campaign Objective */}
            <div
              style={{
                padding: '20px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#ffffff' }}>
                <Target size={16} />
                <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                  {lang === 'en' ? 'CAMPAIGN OBJECTIVE' : 'الهدف التسويقي للحملة'}
                </span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#f5f6fa' }}>
                {lang === 'en' ? project.campaign_objective_en : project.campaign_objective_ar}
              </p>
            </div>

            {/* Verified Results */}
            {project.results_en && (
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#ffffff' }}>
                  <Layers size={15} color="#ffffff" />
                  <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
                    {lang === 'en' ? 'VERIFIED PERFORMANCE' : 'النتائج والاستبقاء'}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#a1a1aa' }}>
                  {lang === 'en' ? project.results_en : project.results_ar}
                </p>
              </div>
            )}

            {/* Navigation Buttons: Previous / Next Project */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 'auto',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('prev');
                }}
                onMouseEnter={() => sound.playHover()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '100px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={16} />
                <span>{lang === 'en' ? 'Previous Project' : 'المشروع السابق'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('next');
                }}
                onMouseEnter={() => sound.playHover()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '100px',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  fontSize: '12px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                }}
              >
                <span>{lang === 'en' ? 'Next Project' : 'المشروع التالي'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
