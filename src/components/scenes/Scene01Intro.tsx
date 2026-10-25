import React, { useRef } from 'react';
import { PORTFOLIO_DATA, type Language } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { ArrowDown, Volume2 } from 'lucide-react';

interface Scene01IntroProps {
  lang: Language;
  onExplore?: () => void;
}

export const Scene01Intro: React.FC<Scene01IntroProps> = ({ lang, onExplore }) => {
  const creator = PORTFOLIO_DATA.creator;
  const isAr = lang === 'ar';
  const introRef = useRef<HTMLDivElement>(null);

  // Split name for masked kinetic letters
  const firstName = isAr ? 'مـهـنـد' : 'MOHANAD';
  const lastName = isAr ? 'أحـمـد' : 'AHMED';

  return (
    <section
      ref={introRef}
      id="scene-intro"
      className="master-scene-stage"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#050505',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px 20px 80px',
      }}
    >
      {/* HUD Framing Corner Brackets */}
      <div className="hud-corner hud-tl" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />
      <div className="hud-corner hud-tr" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />
      <div className="hud-corner hud-bl" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />
      <div className="hud-corner hud-br" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />

      {/* Atmospheric Radial Studio Backdrop */}
      <div
        className="cinema-flare-glow"
        style={{
          width: '700px',
          height: '500px',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
      />

      {/* Top HUD Telemetry Strip */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: 'clamp(20px, 4vw, 50px)',
          right: 'clamp(20px, 4vw, 50px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 20,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          color: '#a1a1aa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff' }} />
          <span style={{ color: '#ffffff', fontWeight: 800 }}>REC • 4K 60FPS</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>/</span>
          <span>S-LOG3 CINETONE</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffffff' }}>
            <Volume2 size={12} />
            <span className="bar-1" style={{ width: '2px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
            <span className="bar-2" style={{ width: '2px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
            <span className="bar-3" style={{ width: '2px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
          </div>
          <span>TC 00:00:01:24</span>
        </div>
      </div>

      {/* Monumental Kinetic Typography Container */}
      <div
        className="perspective-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1440px',
          padding: '0 clamp(16px, 3vw, 40px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          gap: 'clamp(10px, 2vw, 30px)',
        }}
      >
        {/* First Name (Masked kinetic reveal) */}
        <div
          className="intro-first-name"
          style={{
            flex: 1,
            textAlign: isAr ? 'left' : 'right',
            zIndex: 5,
            willChange: 'transform, opacity',
          }}
        >
          <div className="text-mask-wrapper">
            <span
              className="monumental-name text-mask-inner"
              style={{
                fontSize: 'clamp(3rem, 8.5vw, 9.5rem)',
                display: 'block',
                color: '#ffffff',
                fontWeight: 900,
                letterSpacing: '-0.03em',
              }}
            >
              {firstName}
            </span>
          </div>
        </div>

        {/* Center Creator Viewfinder Portal */}
        <div
          className="intro-center-portal"
          style={{
            position: 'relative',
            zIndex: 15,
            width: 'clamp(200px, 22vw, 340px)',
            height: 'clamp(280px, 32vw, 460px)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform, scale',
          }}
        >
          {/* Ambient Rim Backlight */}
          <div
            style={{
              position: 'absolute',
              inset: '-12px',
              borderRadius: '34px',
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 75%)',
              filter: 'blur(24px)',
              pointerEvents: 'none',
            }}
          />

          {/* Central Frame Box with Cinema Camera HUD */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '26px',
              overflow: 'hidden',
              boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.15)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: '#0a0a0c',
            }}
          >
            <img
              src={creator.portrait_image}
              alt={creator.name_en}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                filter: 'contrast(1.05)',
              }}
            />

            {/* Cinema Scrim Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 75%)',
                pointerEvents: 'none',
              }}
            />

            {/* Lens Grid Crosshairs */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                opacity: 0.4,
              }}
            >
              <svg width="60" height="60" viewBox="0 0 60 60">
                <line x1="30" y1="10" x2="30" y2="22" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="30" y1="38" x2="30" y2="50" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="10" y1="30" x2="22" y2="30" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="38" y1="30" x2="50" y2="30" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="30" cy="30" r="14" stroke="#ffffff" strokeWidth="1" fill="none" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Bottom Overlay Info Tag */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                pointerEvents: 'none',
              }}
            >
              <div>
                <span style={{ fontSize: '10px', color: '#ffffff', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                  CINEMA RIG
                </span>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>
                  SONY FX3 • 24-70 GM II
                </div>
              </div>
              <span
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                100K+
              </span>
            </div>
          </div>
        </div>

        {/* Last Name (Masked kinetic reveal) */}
        <div
          className="intro-last-name"
          style={{
            flex: 1,
            textAlign: isAr ? 'right' : 'left',
            zIndex: 5,
            willChange: 'transform, opacity',
          }}
        >
          <div className="text-mask-wrapper">
            <span
              className="monumental-name text-mask-inner"
              style={{
                fontSize: 'clamp(3rem, 8.5vw, 9.5rem)',
                display: 'block',
                color: '#ffffff',
                fontWeight: 900,
                letterSpacing: '-0.03em',
              }}
            >
              {lastName}
            </span>
          </div>
        </div>
      </div>

      {/* Kinetic Subtitle Statement */}
      <div
        className="intro-sub-statement"
        style={{
          position: 'relative',
          zIndex: 20,
          marginTop: '32px',
          textAlign: 'center',
          maxWidth: '800px',
          padding: '0 20px',
        }}
      >
        <p
          style={{
            fontSize: 'clamp(14px, 1.8vw, 18px)',
            color: '#d4d4d8',
            fontFamily: isAr ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Grotesk, sans-serif',
            fontWeight: 500,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {isAr
            ? 'صانع محتوى سينمائي • متخصص UGC وهوكس • نصنع قصصاً تلتصق بالأذهان وتحقق ملايين المشاهدات'
            : 'Creative Director & Video Storyteller • Engineered for Viral Retention & Commercial Impact'}
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '16px',
            fontSize: '12px',
            fontFamily: 'JetBrains Mono, monospace',
            color: '#a1a1aa',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#ffffff', fontWeight: 800 }}>⭐ 100K+ FOLLOWERS</span>
          <span>•</span>
          <span style={{ color: '#ffffff' }}>20M+ VIEWS</span>
          <span>•</span>
          <span style={{ color: '#e4e4e7' }}>94% AVG RETENTION</span>
        </div>
      </div>

      {/* Interactive Bottom Scroll Cue */}
      <div
        className="scroll-cue-indicator"
        onClick={() => {
          sound.playClick();
          if (onExplore) {
            onExplore();
          } else {
            const next = document.querySelector('#scene-about');
            if (next) next.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        style={{ cursor: 'pointer', marginTop: '28px' }}
      >
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'JetBrains Mono, monospace',
            color: '#ffffff',
            letterSpacing: '0.14em',
            fontWeight: 700,
          }}
        >
          {isAr ? 'مرر للأسفل لاستكشاف الرحلة' : 'SCROLL TO EXPLORE'}
        </span>
        <ArrowDown size={14} color="#ffffff" className="animate-bounce" />
      </div>
    </section>
  );
};
