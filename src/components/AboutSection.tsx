import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Camera, MapPin, Film, PlayCircle } from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = PORTFOLIO_DATA.ui[lang];
  const creator = PORTFOLIO_DATA.creator;

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        paddingTop: '130px',
        paddingBottom: '130px',
        backgroundColor: '#070709',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(204, 255, 0, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '70px' }}>
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
            <Camera size={13} />
            <span>THE PERSON BEHIND THE LENS</span>
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              color: '#ffffff',
              marginBottom: '16px',
            }}
          >
            {t.about_heading}
          </h2>

          <p style={{ fontSize: '1.15rem', color: '#8d90a0', lineHeight: 1.6 }}>
            {t.about_sub}
          </p>
        </div>

        {/* Editorial Split: Portrait & Bio + Production BTS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
            marginBottom: '90px',
          }}
        >
          {/* Creator Portrait Composition */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '32px',
                overflow: 'hidden',
                border: '2px solid rgba(204, 255, 0, 0.3)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(204, 255, 0, 0.15)',
                backgroundColor: '#0a0b10',
                aspectRatio: '3/4',
                maxHeight: '560px',
              }}
            >
              <img
                src={creator.portrait_image}
                alt={creator.name_en}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Bottom Tag Label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  padding: '16px 20px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(7, 7, 9, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      fontFamily: 'Syne, sans-serif',
                      color: '#ffffff',
                    }}
                  >
                    {lang === 'en' ? creator.name_en : creator.name_ar}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ccff00', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }}>
                    <MapPin size={12} />
                    <span>{lang === 'en' ? creator.location_en : creator.location_ar}</span>
                  </div>
                </div>

                <div
                  style={{
                    padding: '6px 12px',
                    borderRadius: '100px',
                    backgroundColor: '#ccff00',
                    color: '#070709',
                    fontSize: '11px',
                    fontWeight: 800,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  SINCE {creator.since_year}
                </div>
              </div>
            </div>

            {/* Overlapping Floating BTS Badge Card */}
            <div
              className="glass-panel-elevated"
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                padding: '14px 20px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 85, 0, 0.4)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                zIndex: 2,
              }}
            >
              <Film size={18} color="#ff5500" />
              <div>
                <div style={{ fontSize: '11px', color: '#ff5500', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
                  PRODUCTION RIG
                </div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                  Cinema Line 4K
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & Philosophy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <span
                style={{
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#ccff00',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                THE CREATOR PERSPECTIVE
              </span>
              <h3
                className="font-heading"
                style={{
                  fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  color: '#ffffff',
                  marginTop: '8px',
                }}
              >
                {lang === 'en'
                  ? 'Turning fleeting attention into loyal brand advocacy.'
                  : 'تحويل ثواني الانتباه الخاطفة لولاء حقيقي للبراند.'}
              </h3>
            </div>

            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#d0d4e4' }}>
              {t.about_p1}
            </p>

            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#b0b4c5' }}>
              {t.about_p2}
            </p>

            {/* BTS Card Banner */}
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                height: '180px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <img
                src={creator.bts_image}
                alt="Behind the scenes on set"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, rgba(7, 7, 9, 0.9) 0%, rgba(7, 7, 9, 0.3) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '24px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ccff00', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
                    <PlayCircle size={14} />
                    <span>ON SET IN EGYPT</span>
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                    {lang === 'en' ? 'Authentic Production Quality' : 'جودة تصوير احترافية وميدانية'}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Timeline Milestones */}
        <div style={{ marginTop: '40px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontFamily: 'JetBrains Mono, monospace',
              color: '#ccff00',
              fontWeight: 800,
              letterSpacing: '0.1em',
              marginBottom: '36px',
              textAlign: 'center',
            }}
          >
            ✦ {t.timeline_title} (2019 — PRESENT) ✦
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              position: 'relative',
            }}
          >
            {PORTFOLIO_DATA.timeline.map((item) => (
              <div
                key={item.year}
                onMouseEnter={() => sound.playHover()}
                style={{
                  padding: '30px 24px',
                  borderRadius: '24px',
                  backgroundColor: 'rgba(14, 15, 21, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
                className="timeline-card"
              >
                {/* Year Marker */}
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#ccff00',
                    marginBottom: '12px',
                  }}
                >
                  {item.year}
                </div>

                <h4
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#ffffff',
                    fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                    marginBottom: '10px',
                  }}
                >
                  {lang === 'en' ? item.title_en : item.title_ar}
                </h4>

                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#8d90a0' }}>
                  {lang === 'en' ? item.description_en : item.description_ar}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .timeline-card:hover {
          border-color: #ccff00 !important;
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(204, 255, 0, 0.15) !important;
        }
      `}</style>
    </section>
  );
};
