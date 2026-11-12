import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { ComicBadge } from '../comic/ComicElements';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Scene07CertificationsProps {
  lang: Language;
}

export const Scene07Certifications: React.FC<Scene07CertificationsProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const certs = PORTFOLIO_DATA.certifications;
  const t = PORTFOLIO_DATA.ui[lang];
  const [inspectedCertId, setInspectedCertId] = useState<string | null>(null);

  const handleInspect = (id: string) => {
    sound.playChime();
    setInspectedCertId(id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ffd93d', '#ccff00', '#ff4d8d', '#4dd2ff'],
    });
  };

  return (
    <section
      id="scene-certifications"
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
            <ComicBadge text="ACT #07" subtext={isAr ? 'الكفاءات المعتمدة' : 'CREDENTIALS'} bg="#ffd93d" rotation={-2} />
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
              {t.certifications_heading}
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
            <ShieldCheck size={14} color="#ccff00" />
            <span>★ {isAr ? 'كفاءة ميدانية ومعايير تقنية موثقة' : 'VERIFIED TECHNICAL MASTERY'}</span>
          </div>
        </div>

        {/* Certificate Display Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
            gap: 'clamp(20px, 3vw, 32px)',
          }}
        >
          {certs.map((cert) => {
            const isInspected = inspectedCertId === cert.id;
            return (
              <div
                key={cert.id}
                className="comic-panel"
                onClick={() => handleInspect(cert.id)}
                style={{
                  position: 'relative',
                  padding: '28px 24px',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: '24px',
                  border: '4px solid var(--border-comic)',
                  boxShadow: isInspected
                    ? '8px 8px 0px #ff4d8d, 8px 8px 0px 4px var(--border-comic)'
                    : '6px 6px 0px var(--shadow-comic)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transform: isInspected ? 'scale(1.02) rotate(-1deg)' : 'scale(1)',
                  transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative Comic Diploma Corners */}
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    width: '16px',
                    height: '16px',
                    borderTop: '3px solid var(--border-comic)',
                    borderLeft: '3px solid var(--border-comic)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '16px',
                    height: '16px',
                    borderTop: '3px solid var(--border-comic)',
                    borderRight: '3px solid var(--border-comic)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    width: '16px',
                    height: '16px',
                    borderBottom: '3px solid var(--border-comic)',
                    borderLeft: '3px solid var(--border-comic)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    width: '16px',
                    height: '16px',
                    borderBottom: '3px solid var(--border-comic)',
                    borderRight: '3px solid var(--border-comic)',
                  }}
                />

                {/* Top Badge Stamp */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '18px',
                    }}
                  >
                    {/* Golden Wax Seal SVG */}
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        backgroundColor: cert.badge_color,
                        border: '3px solid #000000',
                        boxShadow: '3px 3px 0px #000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'rotate(-8deg)',
                      }}
                    >
                      <Award size={26} color="#000000" />
                    </div>

                    <div style={{ textAlign: isAr ? 'left' : 'right' }}>
                      <span
                        style={{
                          backgroundColor: 'var(--bg-page)',
                          color: 'var(--text-main)',
                          fontSize: '11px',
                          fontWeight: 900,
                          padding: '3px 9px',
                          borderRadius: '8px',
                          border: '2px solid var(--border-comic)',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {cert.year}
                      </span>
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 900,
                      margin: '0 0 6px',
                      color: 'var(--text-main)',
                      fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                      lineHeight: 1.3,
                    }}
                  >
                    {isAr ? cert.title_ar : cert.title_en}
                  </h3>

                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#ff4d8d',
                      marginBottom: '14px',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    ★ {isAr ? cert.issuer_ar : cert.issuer_en}
                  </div>

                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.55,
                      color: 'var(--text-muted)',
                      margin: '0 0 16px',
                    }}
                  >
                    {isAr ? cert.credential_ar : cert.credential_en}
                  </p>
                </div>

                {/* Skills tags footer */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginBottom: '14px',
                    }}
                  >
                    {cert.skills.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: 'var(--bg-page)',
                          color: 'var(--text-main)',
                          border: '1.5px solid var(--border-comic)',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Verified Ribbon Bottom */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '10px',
                      borderTop: '2px dashed var(--border-comic)',
                      fontSize: '11px',
                      fontWeight: 900,
                      color: 'var(--text-main)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <CheckCircle2 size={14} color="#ccff00" />
                      <span>{isAr ? 'كفاءة ميدانية معتمدة' : 'FIELD ACCREDITED'}</span>
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {isAr ? 'انقر للاحتفال' : 'TAP TO STAMP'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
