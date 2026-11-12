import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { ComicBadge, CartoonGraduationCap, ComicBurst } from '../comic/ComicElements';
import { GraduationCap, Award, Compass } from 'lucide-react';

interface Scene03EducationProps {
  lang: Language;
}

export const Scene03Education: React.FC<Scene03EducationProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const education = PORTFOLIO_DATA.education;
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const t = PORTFOLIO_DATA.ui[lang];

  return (
    <section
      id="scene-education"
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
        {/* Cartoon Header */}
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
            <ComicBadge text="ACT #03" subtext={isAr ? 'التعليم' : 'LEARNING'} bg="#4dd2ff" rotation={-2} />
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
              {t.education_heading}
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
              boxShadow: '3px 3px 0px var(--border-comic)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Compass size={14} color="#4dd2ff" />
            <span>★ {isAr ? 'التعلم المستمر • الممارسة الحرة' : 'CONTINUOUS FIELD MASTERY'}</span>
          </div>
        </div>

        {/* Scene Split: Illustrated Academy Lab & Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(24px, 3.5vw, 45px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Illustrated Cartoon Academy Spread */}
          <div
            className="comic-panel"
            style={{
              padding: 'clamp(20px, 3vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Corner Decorative Burst */}
            <div style={{ position: 'absolute', top: '12px', right: isAr ? 'auto' : '12px', left: isAr ? '12px' : 'auto' }}>
              <ComicBurst size={70} color="#ffd93d">
                <span style={{ fontSize: '10px', fontWeight: 900 }}>STUDY</span>
              </ComicBurst>
            </div>

            {/* Cartoon Graduation Cap & Book Stack SVG */}
            <div style={{ marginBottom: '14px' }} className="animate-comic-float">
              <CartoonGraduationCap size={140} />
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '8px',
                backgroundColor: '#4dd2ff',
                color: '#000000',
                border: '2px solid #000000',
                fontWeight: 900,
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                marginBottom: '10px',
                boxShadow: '2px 2px 0px #000000',
              }}
            >
              <GraduationCap size={15} />
              <span>THE VISUAL CRAFT LAB</span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
                fontWeight: 900,
                color: 'var(--text-main)',
                margin: '0 0 10px 0',
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
              }}
            >
              {isAr ? 'صنعة الكاميرا.. ممارسة وشغف' : 'PRACTICAL CRAFT & DEDICATED STUDY'}
            </h3>

            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                margin: '0 0 20px 0',
                fontFamily: isAr ? 'var(--font-body-ar)' : 'var(--font-body-en)',
                maxWidth: '480px',
              }}
            >
              {isAr
                ? 'السينما وصناعة الفيديو الحقيقية بتتبني من قلب موقع التصوير: فهم الضوء، وزوايا العدسات، وتحريك الكاميرا بحساب، ومونتاج يراعي إحساس المشاهد قبل أي قاعدة نظرية.'
                : 'True cinematography is forged through hands-on set experience: controlling natural light, deliberate lens selection, camera blocking, and editing that breathes with the viewer.'}
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Lighting Masterclasses', 'DaVinci Color Studies', 'Short-Form Narrative', 'Visual Geometry'].map((tag, i) => (
                <span
                  key={i}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--bg-card-alt)',
                    border: '1.5px solid var(--border-comic)',
                    color: 'var(--text-main)',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 800,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Educational Milestones Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {education.map((item, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedIdx(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="comic-panel"
                  style={{
                    padding: '24px',
                    cursor: 'pointer',
                    transform: isSelected ? (isAr ? 'translate(-4px, -4px) rotate(1deg)' : 'translate(-4px, -4px) rotate(-1deg)') : 'none',
                    boxShadow: isSelected
                      ? `8px 8px 0px ${item.color}, 8px 8px 0px 4px var(--border-comic)`
                      : '5px 5px 0px var(--border-comic)',
                    borderColor: isSelected ? 'var(--border-comic)' : 'var(--border-comic)',
                    backgroundColor: isSelected ? 'var(--bg-card-alt)' : 'var(--bg-card)',
                    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <ComicBadge text={item.badge} subtext={item.year} bg={item.color} textColor="#000000" rotation={-1} />
                    <span
                      style={{
                        fontSize: '12px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 900,
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Award size={14} color={item.color} />
                      {isAr ? item.institution_ar : item.institution_en}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: 'clamp(1.15rem, 1.8vw, 1.4rem)',
                      fontWeight: 900,
                      color: 'var(--text-main)',
                      marginBottom: '8px',
                      fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                      lineHeight: 1.25,
                    }}
                  >
                    {isAr ? item.degree_ar : item.degree_en}
                  </h3>

                  <p
                    style={{
                      fontSize: '13.5px',
                      lineHeight: 1.6,
                      color: 'var(--text-muted)',
                      marginBottom: '16px',
                      fontFamily: isAr ? 'var(--font-body-ar)' : 'var(--font-body-en)',
                    }}
                  >
                    {isAr ? item.description_ar : item.description_en}
                  </p>

                  {/* Focus areas pills */}
                  <div>
                    <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-main)', fontWeight: 900, marginBottom: '6px' }}>
                      {isAr ? 'محاور التركيز الفني:' : 'CORE COMPETENCY FOCUS:'}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {(isAr ? item.focus_areas_ar : item.focus_areas_en).map((f, fIdx) => (
                        <span
                          key={fIdx}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--bg-card)',
                            border: '2px solid var(--border-comic)',
                            color: 'var(--text-main)',
                            fontSize: '11px',
                            fontWeight: 800,
                            fontFamily: isAr ? 'var(--font-body-ar)' : 'JetBrains Mono, monospace',
                            boxShadow: '2px 2px 0px var(--border-comic)',
                          }}
                        >
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
