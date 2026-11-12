import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { ComicBadge, CartoonDirectorChair, CartoonClapperboard } from '../comic/ComicElements';
import { Video, Film, MapPin, Camera, Sparkles, Check, ArrowUpRight } from 'lucide-react';

interface Scene04ExperienceProps {
  lang: Language;
  onExploreProjects?: () => void;
}

export const Scene04Experience: React.FC<Scene04ExperienceProps> = ({ lang, onExploreProjects }) => {
  const isAr = lang === 'ar';
  const experiences = PORTFOLIO_DATA.experience;
  const [activeExpIndex, setActiveExpIndex] = useState<number>(0);

  const t = PORTFOLIO_DATA.ui[lang];
  const currentExp = experiences[activeExpIndex] || experiences[0];

  return (
    <section
      id="scene-experience"
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
      }}
    >
      <div style={{ maxWidth: '1360px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
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
            <ComicBadge text="ACT #04" subtext={isAr ? 'الخبرات' : 'SETS'} bg="#ffd93d" rotation={-2} />
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
              {t.experience_heading}
            </h2>
          </div>

          {/* Interactive Role Switcher Pills */}
          <div
            className="touch-scroll-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px',
              backgroundColor: 'var(--bg-card)',
              border: '3px solid var(--border-comic)',
              borderRadius: '16px',
              boxShadow: '4px 4px 0px var(--border-comic)',
            }}
          >
            {experiences.map((exp, idx) => {
              const isActive = activeExpIndex === idx;
              return (
                <button
                  key={exp.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveExpIndex(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    backgroundColor: isActive ? exp.color : 'transparent',
                    color: isActive ? '#000000' : 'var(--text-main)',
                    border: isActive ? '2px solid #000000' : 'none',
                    fontSize: '11px',
                    fontWeight: 900,
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'JetBrains Mono, monospace',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? '2px 2px 0px #000000' : 'none',
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  {isAr ? exp.badge_ar : exp.badge_en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Big Cartoon Experience Set Spread */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(28px, 4vw, 55px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Illustrated Cartoon Director Chair & Clapper */}
          <div
            className="comic-panel"
            style={{
              padding: 'clamp(24px, 3.5vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            <div style={{ position: 'absolute', top: '16px', left: isAr ? 'auto' : '16px', right: isAr ? '16px' : 'auto' }}>
              <ComicBadge text="ON SET" subtext="ACTION" bg="#ff4d8d" textColor="#ffffff" rotation={-3} />
            </div>

            {/* Illustrated Cartoon Director's Chair */}
            <div className="animate-comic-float" style={{ marginTop: '10px', marginBottom: '14px' }}>
              <CartoonDirectorChair size={135} />
            </div>

            {/* Interactive Clapperboard */}
            <div style={{ marginBottom: '16px' }}>
              <CartoonClapperboard
                scene={`0${activeExpIndex + 1}`}
                take="01"
                date={currentExp.period_en.slice(-4)}
                onClick={() => sound.playPop()}
              />
            </div>

            <div
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 800,
              }}
            >
              🎬 {isAr ? 'اضغط على لوحة الكلاكيت لسماع صوت المشهد!' : 'CLICK THE SLATE TO CLAP!'}
            </div>
          </div>

          {/* Right Column: Detailed Experience Blueprint */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              className="comic-panel"
              style={{
                padding: 'clamp(22px, 3vw, 32px)',
                borderLeft: isAr ? '4px solid var(--border-comic)' : `8px solid ${currentExp.color}`,
                borderRight: isAr ? `8px solid ${currentExp.color}` : '4px solid var(--border-comic)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                <ComicBadge text={currentExp.period_en} subtext={isAr ? currentExp.type_ar : currentExp.type_en} bg={currentExp.color} textColor="#000000" rotation={-1} />
                <span style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                  ★ {isAr ? currentExp.company_ar : currentExp.company_en}
                </span>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                  fontWeight: 900,
                  color: 'var(--text-main)',
                  margin: '0 0 12px 0',
                  fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                  lineHeight: 1.2,
                }}
              >
                {isAr ? currentExp.role_ar : currentExp.role_en}
              </h3>

              <p
                style={{
                  fontSize: '14.5px',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                  margin: '0 0 20px 0',
                  fontFamily: isAr ? 'var(--font-body-ar)' : 'var(--font-body-en)',
                }}
              >
                {isAr ? currentExp.description_ar : currentExp.description_en}
              </p>

              {/* Highlights Checklist with Cartoon styling */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-main)', fontWeight: 900 }}>
                  {isAr ? 'أبرز مخرجات ونتائج العمل:' : 'PRODUCTION HIGHLIGHTS & DELIVERABLES:'}
                </div>
                {(isAr ? currentExp.highlights_ar : currentExp.highlights_en).map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '10px 14px',
                      backgroundColor: 'var(--bg-card-alt)',
                      borderRadius: '10px',
                      border: '2px solid var(--border-comic)',
                      boxShadow: '2px 2px 0px var(--border-comic)',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      fontFamily: isAr ? 'var(--font-body-ar)' : 'var(--font-body-en)',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: currentExp.color,
                        color: '#000000',
                        fontWeight: 900,
                        fontSize: '11px',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      ✓
                    </span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Fast Action CTA button */}
              {onExploreProjects && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onExploreProjects();
                  }}
                  className="comic-btn"
                  style={{
                    backgroundColor: currentExp.color,
                    color: '#000000',
                    fontSize: '12px',
                    padding: '10px 22px',
                  }}
                >
                  <span>{isAr ? 'مشاهدة المشاريع المرتبطة' : 'SEE CONNECTED PROJECTS'}</span>
                  <ArrowUpRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

