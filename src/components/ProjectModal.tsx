import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project, Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Share2, Sparkles, Target, Layers, MessageCircle } from 'lucide-react';

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
  const isAr = lang === 'ar';

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

  const handleDiscussWhatsApp = () => {
    sound.playClick();
    const brandName = isAr ? project.brand_ar : project.brand;
    const text = isAr
      ? `مرحباً مهند، أود مناقشة إنتاج عمل إعلاني مشابه لمشروعك مع (${brandName})!`
      : `Hey Mohanad! I'd love to produce a project similar to what you did with (${brandName})!`;
    window.open(`https://wa.me/201023456789?text=${encodeURIComponent(text)}`, '_blank');
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
        padding: 'clamp(8px, 2.5vw, 20px)',
        backgroundColor: 'rgba(5, 5, 8, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
    >
      {/* Modal Comic Container */}
      <div
        className="comic-panel"
        style={{
          width: '100%',
          maxWidth: '1120px',
          maxHeight: '92vh',
          borderRadius: '26px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#12141f',
          border: '4px solid #000000',
          boxShadow: '12px 12px 0px #ccff00, 12px 12px 0px 4px #000000',
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
            borderBottom: '3.5px solid #000000',
            backgroundColor: '#0a0b12',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                padding: '4px 12px',
                borderRadius: '8px',
                backgroundColor: '#ccff00',
                color: '#000000',
                fontSize: '11px',
                fontWeight: 900,
                border: '2px solid #000000',
                fontFamily: 'JetBrains Mono, monospace',
                boxShadow: '2px 2px 0px #000000',
              }}
            >
              {project.aspect_ratio} • 4K
            </span>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 900,
                color: '#ffffff',
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
              }}
            >
              {isAr ? project.brand_ar : project.brand} • {project.year}
            </span>
          </div>

          {/* Close & Share */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleShare}
              onMouseEnter={() => sound.playHover()}
              title="Share Project"
              style={{
                padding: '7px 14px',
                borderRadius: '10px',
                backgroundColor: '#ffe600',
                border: '2px solid #000000',
                color: '#000000',
                fontSize: '12px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '3px 3px 0px #000000',
              }}
            >
              <Share2 size={14} color="#000000" />
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
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#ff3366',
                border: '2.5px solid #000000',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '3px 3px 0px #000000',
                fontWeight: 900,
              }}
            >
              <X size={20} color="#ffffff" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Modal Main Content: Split Video Display + Project Intel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            overflowY: 'auto',
            maxHeight: 'calc(92vh - 70px)',
          }}
        >
          {/* Left Column: Interactive 9:16 Video Canvas Player */}
          <div
            style={{
              padding: 'clamp(14px, 3vw, 28px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0a0b12',
              borderRight: isAr ? 'none' : '3px solid #000000',
              borderLeft: isAr ? '3px solid #000000' : 'none',
            }}
          >
            {/* Phone Bezel Frame */}
            <div
              style={{
                width: '100%',
                maxWidth: '330px',
                height: 'clamp(420px, 60vw, 580px)',
                borderRadius: '32px',
                overflow: 'hidden',
                position: 'relative',
                border: '4.5px solid #000000',
                boxShadow: '8px 8px 0px #ccff00, 8px 8px 0px 3px #000000',
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
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, transparent 35%, rgba(0,0,0,0.85) 100%)',
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
                      color: '#000000',
                      fontWeight: 900,
                      backgroundColor: '#ccff00',
                      border: '1.5px solid #000000',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      boxShadow: '2px 2px 0px #000000',
                    }}
                  >
                    ● PLAYING • 4K
                  </span>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      color: '#ffffff',
                      backgroundColor: '#000000',
                      border: '1.5px solid #000000',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontWeight: 800,
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
                      color: '#ccff00',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 800,
                    }}
                  >
                    @{PORTFOLIO_DATA.creator.name_en.toLowerCase().replace(' ', '.')}
                  </span>
                  <div
                    style={{
                      fontSize: '17px',
                      fontWeight: 900,
                      color: '#ffffff',
                      fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                      marginTop: '4px',
                      filter: 'drop-shadow(2px 2px 0px #000000)',
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
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      backgroundColor: '#ccff00',
                      border: '3px solid #000000',
                      boxShadow: '4px 4px 0px #000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000000',
                    }}
                  >
                    <Play size={30} fill="#000000" />
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
                  height: '5px',
                  backgroundColor: '#000000',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: '#ccff00',
                    boxShadow: '0 0 10px #ccff00',
                  }}
                />
              </div>
            </div>

            {/* Video Controls Under Phone */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '18px',
              }}
            >
              <button
                onClick={() => {
                  sound.playClick();
                  setIsPlaying(!isPlaying);
                }}
                style={{
                  padding: '8px 18px',
                  borderRadius: '10px',
                  backgroundColor: '#161826',
                  border: '2px solid #000000',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '2px 2px 0px #000000',
                }}
              >
                {isPlaying ? <Pause size={14} color="#ccff00" /> : <Play size={14} color="#ccff00" fill="#ccff00" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsMuted(!isMuted);
                }}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#161826',
                  border: '2px solid #000000',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '2px 2px 0px #000000',
                }}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} color="#ccff00" />}
              </button>
            </div>
          </div>

          {/* Right Column: Deep Creative Breakdown & Verified Metrics */}
          <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Title & Brand */}
            <div>
              <div
                style={{
                  fontSize: '13px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#ccff00',
                  fontWeight: 900,
                  marginBottom: '8px',
                }}
              >
                {lang === 'en' ? project.brand : project.brand_ar} • {lang === 'en' ? project.category : project.category_ar}
              </div>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  color: '#ffffff',
                  fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                  filter: 'drop-shadow(2px 2px 0px #000000)',
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
                    borderRadius: '8px',
                    backgroundColor: '#0a0a10',
                    border: '1.5px solid #000000',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#ccff00',
                    fontWeight: 800,
                    boxShadow: '2px 2px 0px #000000',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#d0d3e5',
                fontFamily: isAr ? 'var(--font-body-ar)' : 'Space Grotesk, sans-serif',
              }}
            >
              {lang === 'en' ? project.description_en : project.description_ar}
            </p>

            {/* Creative Concept */}
            <div
              style={{
                padding: '20px',
                borderRadius: '16px',
                backgroundColor: '#151724',
                border: '2.5px solid #000000',
                boxShadow: '4px 4px 0px #000000',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#ffe600' }}>
                <Sparkles size={16} color="#ffe600" />
                <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 900 }}>
                  {lang === 'en' ? 'CREATIVE HOOK & CONCEPT' : 'الفكرة الإبداعية والهوك'}
                </span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#f5f6fa', margin: 0, fontWeight: 500 }}>
                {lang === 'en' ? project.creative_concept_en : project.creative_concept_ar}
              </p>
            </div>

            {/* Campaign Objective */}
            <div
              style={{
                padding: '20px',
                borderRadius: '16px',
                backgroundColor: '#151724',
                border: '2.5px solid #000000',
                boxShadow: '4px 4px 0px #000000',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#00e5ff' }}>
                <Target size={16} color="#00e5ff" />
                <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 900 }}>
                  {lang === 'en' ? 'CAMPAIGN OBJECTIVE' : 'الهدف التسويقي للحملة'}
                </span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#f5f6fa', margin: 0, fontWeight: 500 }}>
                {lang === 'en' ? project.campaign_objective_en : project.campaign_objective_ar}
              </p>
            </div>

            {/* Verified Results */}
            {project.results_en && (
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  backgroundColor: '#0a0a10',
                  border: '2.5px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#ccff00' }}>
                  <Layers size={16} color="#ccff00" />
                  <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 900 }}>
                    {lang === 'en' ? 'VERIFIED PERFORMANCE' : 'النتائج والاستبقاء'}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#ccff00', margin: 0, fontWeight: 800 }}>
                  {lang === 'en' ? project.results_en : project.results_ar}
                </p>
              </div>
            )}

            {/* WhatsApp CTA inside modal */}
            <button
              onClick={handleDiscussWhatsApp}
              className="comic-btn"
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: '#25D366',
                color: '#000000',
                border: '3px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                fontWeight: 900,
                fontSize: '13px',
              }}
            >
              <MessageCircle size={18} color="#000000" />
              <span>{isAr ? 'اطلب فكرة إعلانية مماثلة لوجهتك' : 'Request Similar Campaign Concept'}</span>
            </button>

            {/* Navigation Buttons: Previous / Next Project */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 'auto',
                paddingTop: '20px',
                borderTop: '2px solid #000000',
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
                  borderRadius: '10px',
                  backgroundColor: '#161826',
                  border: '2px solid #000000',
                  boxShadow: '3px 3px 0px #000000',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 900,
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
                  borderRadius: '10px',
                  backgroundColor: '#ffe600',
                  color: '#000000',
                  fontSize: '12px',
                  fontWeight: 900,
                  border: '2px solid #000000',
                  boxShadow: '3px 3px 0px #000000',
                  cursor: 'pointer',
                  fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
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
