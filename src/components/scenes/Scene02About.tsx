import React from 'react';
import { PORTFOLIO_DATA, type Language } from '../../data/portfolioData';
import { ComicBadge, ComicBurst, SpeechBubble } from '../comic/ComicElements';
import { MapPin, Zap, Flame, Award } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Scene02AboutProps {
  lang: Language;
}

export const Scene02About: React.FC<Scene02AboutProps> = ({ lang }) => {
  const creator = PORTFOLIO_DATA.creator;
  const isAr = lang === 'ar';

  return (
    <section
      id="scene-about"
      className="master-scene-stage comic-halftone-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '110px clamp(16px, 5vw, 60px)',
        backgroundColor: '#0c0d13',
        borderBottom: '4px solid #000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '1360px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Comic Panel Header Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            marginBottom: '36px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ComicBadge text="PANEL #02" subtext="THE STORY" bg="#ffe600" rotation={-2} />
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
                fontWeight: 900,
                color: '#ffffff',
                margin: 0,
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                filter: 'drop-shadow(3px 3px 0px #000000)',
              }}
            >
              {isAr ? 'قصة الرحلة وسر الـ 3 ثواني' : 'ORIGINS & THE 3-SECOND SECRET'}
            </h2>
          </div>

          <div
            style={{
              padding: '6px 16px',
              backgroundColor: '#181a24',
              border: '2.5px solid #000000',
              borderRadius: '100px',
              color: '#ccff00',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 800,
              boxShadow: '3px 3px 0px #000000',
            }}
          >
            ★ CHAPTER: FROM 2019 TO 100K+
          </div>
        </div>

        {/* Multi-Panel Comic Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(28px, 4vw, 50px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Comic Illustration & Production Frame */}
          <div style={{ position: 'relative' }}>
            {/* Tilted Comic Frame */}
            <div
              className="comic-panel"
              style={{
                position: 'relative',
                borderRadius: '24px',
                border: '4px solid #000000',
                boxShadow: '8px 8px 0px #ccff00, 8px 8px 0px 4px #000000',
                backgroundColor: '#12131b',
                overflow: 'hidden',
                transform: 'rotate(-1.5deg)',
              }}
            >
              {/* Comic Top Bar */}
              <div
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#000000',
                  borderBottom: '3px solid #000000',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 900,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff3366' }} />
                  <span>ON-SET PRODUCTION • EGYPT</span>
                </div>
                <span style={{ color: '#ccff00' }}>EST. {creator.since_year}</span>
              </div>

              {/* BTS Photo with comic texture */}
              <div style={{ position: 'relative', height: 'clamp(300px, 36vw, 420px)' }}>
                <img
                  src={creator.bts_image}
                  alt="Mohanad Ahmed directing on set"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.1) brightness(0.95)',
                  }}
                />

                {/* Comic Halftone Dot Overlay on Bottom of Image */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.4) 40%, transparent 80%)',
                  }}
                />

                {/* Floating "POW!" Burst in corner */}
                <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
                  <ComicBurst size={85} color="#ccff00">
                    <span style={{ fontSize: '13px', fontWeight: 900 }}>BAM!</span>
                  </ComicBurst>
                </div>

                {/* Location and Camera info pinned in panel */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    zIndex: 5,
                  }}
                >
                  <div
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#070709',
                      border: '2px solid #000000',
                      borderRadius: '10px',
                      boxShadow: '3px 3px 0px #000000',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ccff00', fontSize: '11px', fontWeight: 800 }}>
                      <MapPin size={12} />
                      <span>{isAr ? creator.location_ar : creator.location_en}</span>
                    </div>
                    <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: 900, marginTop: '2px' }}>
                      {isAr ? 'تصوير ميداني لكافة المحافظات' : 'Shooting across Egypt & MENA'}
                    </div>
                  </div>

                  <ComicBadge text="FX3 4K" subtext="RIG" bg="#ffffff" rotation={4} />
                </div>
              </div>
            </div>

            {/* Talking Speech Bubble from the Photo */}
            <div
              style={{
                position: 'absolute',
                bottom: '-28px',
                right: isAr ? 'auto' : '-20px',
                left: isAr ? '-20px' : 'auto',
                maxWidth: '280px',
                zIndex: 20,
              }}
            >
              <SpeechBubble
                tailDirection={isAr ? 'bottom-right' : 'bottom-left'}
                bgColor="#ffffff"
                textColor="#070709"
                borderColor="#000000"
                shadowColor="#000000"
              >
                <div style={{ fontSize: '12px', lineHeight: 1.4, fontWeight: 800 }}>
                  {isAr
                    ? '🎯 "أول 3 ثوانٍ هي المعركة الحقيقية لجذب انتباه المشاهد."'
                    : '🎯 "The first 3 seconds are the entire battlefield for retention."'}
                </div>
              </SpeechBubble>
            </div>
          </div>

          {/* Right Column: Comic Story Panels & Core Philosophy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Monumental Kinetic Comic Manifesto */}
            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.15,
                margin: 0,
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                letterSpacing: '-0.02em',
                filter: 'drop-shadow(3px 3px 0px #000000)',
              }}
            >
              {isAr
                ? 'لا نصنع فيديوهات عابرة، بل نبني مشاهد تلتصق بالذاكرة وتصنع التريند.'
                : 'I do not make forgettable clips. I engineer visuals that stop thumbs & convert audiences.'}
            </h3>

            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#d4d5e2', margin: 0, fontFamily: isAr ? 'var(--font-body-ar)' : 'Space Grotesk, sans-serif' }}>
              {isAr
                ? 'بدأت رحلتي في عالم صناعة الفيديو عام 2019 برؤية واحدة: الدمج بين جودة الصورة السينمائية وسيكولوجية الانتباه السريع في عصر السوشيال ميديا. مع جمهور تجاوز 100 ألف متابع وأكثر من 20 مليون مشاهدة، أصبحت كل ثانية في الفيديو محسوبة لتحقيق أعلى استبقاء ممكن.'
                : 'Starting in 2019, my vision has been straightforward: fuse cinema-grade production with high-speed social media retention. With 100K+ followers and over 20M impressions, every second is paced to maximize thumb-stopping engagement and measurable brand growth.'}
            </p>

            {/* Three Comic Story Feature Panels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '6px' }}>
              {[
                {
                  icon: <Zap size={20} color="#000000" strokeWidth={2.5} />,
                  bg: '#ccff00',
                  badge: '400MS SHOCK',
                  titleEn: 'Visual Pattern Interruption',
                  titleAr: 'كسر النمط في 400ms',
                  descEn: 'Instant visual hooks that stop users from swiping in the first split-second.',
                  descAr: 'هوك بصري خاطف في أول كسر من الثانية يجبر المشاهد على التوقف ومتابعة القصة.',
                },
                {
                  icon: <Flame size={20} color="#ffffff" strokeWidth={2.5} />,
                  bg: '#ff3366',
                  badge: 'CINEMA RIG',
                  titleEn: 'DaVinci Cinema Color Grading',
                  titleAr: 'تلوين سينمائي احترافي',
                  descEn: 'Studio-grade lighting, S-Log3 dynamics, and tailored color palette matching brand identity.',
                  descAr: 'تصوير S-Log3 وألوان دافينشي ريزولف مخصصة تعكس فخامة وهوية كل علامة تجارية.',
                },
                {
                  icon: <Award size={20} color="#000000" strokeWidth={2.5} />,
                  bg: '#ffe600',
                  badge: '20M+ VIEWS',
                  titleEn: 'Proven Brand ROI & Sales',
                  titleAr: 'مبيعات وشهرة حقيقية',
                  descEn: 'Real measurable conversion for leading brands like B.Laban, ElAraby, Domty, and Jotun.',
                  descAr: 'شراكات ناجحة مع كبرى الشركات (بلبن، مجموعة العربي، دومتي، جوتن) حققت أرقاماً قياسية.',
                },
              ].map((panel, idx) => (
                <div
                  key={idx}
                  className="comic-panel"
                  style={{
                    padding: '16px 20px',
                    borderRadius: '16px',
                    border: '3px solid #000000',
                    backgroundColor: '#161724',
                    boxShadow: '4px 4px 0px #000000',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  onMouseEnter={(e) => {
                    sound.playHover();
                    (e.currentTarget as HTMLElement).style.transform = 'translate(-3px, -3px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #ccff00';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0px #000000';
                  }}
                >
                  {/* Icon badge */}
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: panel.bg,
                      border: '2.5px solid #000000',
                      boxShadow: '2px 2px 0px #000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {panel.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span
                        style={{
                          fontSize: '15px',
                          fontWeight: 900,
                          color: '#ffffff',
                          fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                        }}
                      >
                        {isAr ? panel.titleAr : panel.titleEn}
                      </span>
                      <span
                        style={{
                          fontSize: '9px',
                          backgroundColor: '#000000',
                          color: '#ccff00',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 900,
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {panel.badge}
                      </span>
                    </div>

                    <p style={{ fontSize: '12.5px', color: '#a1a3b5', margin: 0, lineHeight: 1.5 }}>
                      {isAr ? panel.descAr : panel.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
