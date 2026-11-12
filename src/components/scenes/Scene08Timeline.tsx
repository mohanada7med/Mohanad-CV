import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { ComicBadge, CartoonClapperboard } from '../comic/ComicElements';
import { Compass, CheckCircle2 } from 'lucide-react';

interface Scene08TimelineProps {
  lang: Language;
}

export const Scene08Timeline: React.FC<Scene08TimelineProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const timeline = PORTFOLIO_DATA.timeline;
  const t = PORTFOLIO_DATA.ui[lang];
  const [activeStepIndex, setActiveStepIndex] = useState<number>(timeline.length - 1);

  const activeMilestone = timeline[activeStepIndex] || timeline[0];

  const handleSelectMilestone = (idx: number) => {
    sound.playClick();
    setActiveStepIndex(idx);
  };

  const milestoneColors = ['#ccff00', '#ffd93d', '#4dd2ff', '#ff4d8d'];

  return (
    <section
      id="scene-timeline"
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
        {/* Header Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ComicBadge text="ACT #08" subtext={isAr ? 'رحلة المحتوى' : 'THE REEL'} bg="#ff4d8d" rotation={-2} />
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
              {t.timeline_heading}
            </h2>
          </div>

          <div
            style={{
              padding: '6px 16px',
              backgroundColor: 'var(--bg-card)',
              border: '2.5px solid var(--border-comic)',
              borderRadius: '100px',
              color: 'var(--text-main)',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 800,
              boxShadow: '3px 3px 0px var(--shadow-comic)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Compass size={14} color="#ff4d8d" />
            <span>★ {isAr ? '2019 — حتى الآن • شغف مستمر خلف العدسة' : '2019 — PRESENT • CONSTANT EVOLUTION'}</span>
          </div>
        </div>

        {/* Illustrated Filmstrip Navigation Strip */}
        <div
          className="comic-panel"
          style={{
            position: 'relative',
            backgroundColor: '#000000',
            borderRadius: '24px',
            padding: '24px 20px',
            border: '4px solid #000000',
            boxShadow: '8px 8px 0px var(--shadow-comic)',
            marginBottom: '32px',
            overflow: 'hidden',
          }}
        >
          {/* Top Film Sprocket Holes */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '16px',
              padding: '0 8px',
            }}
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '12px',
                  height: '8px',
                  backgroundColor: '#ffffff',
                  borderRadius: '2px',
                  opacity: 0.8,
                }}
              />
            ))}
          </div>

          {/* Milestone Stop Buttons along the strip */}
          <div
            className="touch-scroll-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: '12px',
              padding: '8px 0',
            }}
          >
            {timeline.map((item, idx) => {
              const isSelected = idx === activeStepIndex;
              const color = milestoneColors[idx % milestoneColors.length];

              return (
                <button
                  key={item.year}
                  onClick={() => handleSelectMilestone(idx)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '16px',
                    border: '3px solid #000000',
                    backgroundColor: isSelected ? color : '#1a1b26',
                    color: isSelected ? '#000000' : '#cbd5e1',
                    fontFamily: 'Bangers, Cairo, cursive',
                    fontSize: '18px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: isSelected ? '4px 4px 0px #ffffff' : 'none',
                    transform: isSelected ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.year}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: isAr ? 'var(--font-display-ar)' : 'JetBrains Mono, monospace',
                      opacity: isSelected ? 1 : 0.8,
                    }}
                  >
                    {isAr ? item.tag_ar : item.tag_en}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Film Sprocket Holes */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '16px',
              padding: '0 8px',
            }}
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '12px',
                  height: '8px',
                  backgroundColor: '#ffffff',
                  borderRadius: '2px',
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        </div>

        {/* Active Milestone Detailed Cartoon Scene Card */}
        <div
          className="comic-panel"
          style={{
            padding: 'clamp(24px, 4vw, 44px)',
            backgroundColor: 'var(--bg-card)',
            borderRadius: '28px',
            border: '4px solid var(--border-comic)',
            boxShadow: '8px 8px 0px var(--shadow-comic)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '32px',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Left Column: Milestone Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span
                style={{
                  backgroundColor: milestoneColors[activeStepIndex % milestoneColors.length],
                  color: '#000000',
                  fontSize: '16px',
                  fontWeight: 900,
                  padding: '4px 14px',
                  borderRadius: '10px',
                  border: '2.5px solid #000000',
                  fontFamily: 'Bangers, Cairo, cursive',
                }}
              >
                EPISODE {activeMilestone.year}
              </span>

              <span
                style={{
                  backgroundColor: 'var(--bg-page)',
                  color: 'var(--text-main)',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--border-comic)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {isAr ? activeMilestone.tag_ar : activeMilestone.tag_en}
              </span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                fontWeight: 900,
                color: 'var(--text-main)',
                margin: '0 0 14px',
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                lineHeight: 1.25,
              }}
            >
              {isAr ? activeMilestone.title_ar : activeMilestone.title_en}
            </h3>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                margin: '0 0 24px',
              }}
            >
              {isAr ? activeMilestone.description_ar : activeMilestone.description_en}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 800,
                color: 'var(--text-main)',
              }}
            >
              <CheckCircle2 size={16} color="#ccff00" />
              <span>{isAr ? 'مرحلة حقيقية في مسيرة صناعة المحتوى' : 'AUTHENTIC CAREER MILESTONE'}</span>
            </div>
          </div>

          {/* Right Column: Cartoon Visual Graphic for this Episode */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              backgroundColor: 'var(--bg-page)',
              borderRadius: '20px',
              border: '3px solid var(--border-comic)',
              boxShadow: '5px 5px 0px var(--shadow-comic)',
              textAlign: 'center',
            }}
          >
            <div style={{ marginBottom: '16px', width: '100%', maxWidth: '240px' }}>
              <CartoonClapperboard
                scene={activeMilestone.year}
                take="01"
                date={activeMilestone.year}
              />
            </div>

            <div
              style={{
                fontFamily: 'Bangers, Cairo, cursive',
                fontSize: '22px',
                color: 'var(--text-main)',
                marginBottom: '4px',
              }}
            >
              {activeMilestone.year} • {isAr ? 'مشهد مسجل' : 'TAKE RECORDED'}
            </div>

            <div
              style={{
                fontSize: '12px',
                fontWeight: 800,
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {isAr ? 'أسيوط • مصر • صناعة مستمرة' : 'ASSIUT • EGYPT • ONGOING'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
