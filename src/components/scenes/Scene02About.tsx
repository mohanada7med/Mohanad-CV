import React from 'react';
import { PORTFOLIO_DATA, type Language } from '../../data/portfolioData';
import { Film, MapPin, Sparkles } from 'lucide-react';

interface Scene02AboutProps {
  lang: Language;
}

export const Scene02About: React.FC<Scene02AboutProps> = ({ lang }) => {
  const creator = PORTFOLIO_DATA.creator;
  const isAr = lang === 'ar';

  return (
    <section
      id="scene-about"
      className="master-scene-stage"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '110px clamp(16px, 5vw, 60px)',
        backgroundColor: '#080808',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
        {/* Editorial Two-Column Asymmetric Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(30px, 6vw, 70px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: BTS Production Imagery & Rig Composition */}
          <div className="about-visual-column" style={{ position: 'relative' }}>
            {/* Background Ambient Glow */}
            <div
              style={{
                position: 'absolute',
                inset: '-20px',
                borderRadius: '36px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
                filter: 'blur(30px)',
                pointerEvents: 'none',
              }}
            />

            {/* Overlapping Primary BTS Photography Card */}
            <div
              style={{
                position: 'relative',
                borderRadius: '28px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9)',
                backgroundColor: '#0c0c0e',
                height: 'clamp(360px, 45vw, 540px)',
              }}
            >
              <img
                src={creator.bts_image}
                alt="Mohanad directing on set in Egypt"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.05)',
                }}
              />

              {/* Gradient Scrim */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.25) 50%, transparent 80%)',
                }}
              />

              {/* Pinned Info Badge Inside Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                    <MapPin size={13} />
                    <span>{isAr ? creator.location_ar : creator.location_en}</span>
                  </div>
                  <h4 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif', marginTop: '4px' }}>
                    {isAr ? 'إنتاج سينمائي ميداني' : 'On-Set Cinema Direction'}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#a1a1aa', margin: 0 }}>
                    {isAr ? 'من أسيوط لكافة أنحاء مصر والشرق الأوسط' : 'Shooting across Egypt & the Middle East'}
                  </p>
                </div>

                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: '100px',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    fontSize: '11px',
                    fontWeight: 900,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  EST. {creator.since_year}
                </span>
              </div>
            </div>

            {/* Overlapping Secondary Gear Badge (Corner floating) */}
            <div
              className="glass-panel-elevated"
              style={{
                position: 'absolute',
                top: '-20px',
                right: isAr ? 'auto' : '-20px',
                left: isAr ? '-20px' : 'auto',
                padding: '16px 22px',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(15, 15, 17, 0.9)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.85)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Film size={20} />
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#a1a1aa', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                  CAMERA SPEC
                </div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                  Sony Cinema FX3 4K
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Kinetic Storytelling & Core Philosophy */}
          <div className="about-text-column" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Section Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
              <Sparkles size={14} />
              <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, letterSpacing: '0.08em' }}>
                SCENE 02 • THE PHILOSOPHY
              </span>
            </div>

            {/* Monumental Kinetic Manifesto Heading */}
            <h2
              className="about-headline"
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.15,
                fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {isAr
                ? 'لا نصنع فيديوهات عابرة، بل نبني مشاهد تلتصق بالذاكرة وتحقق المبيعات.'
                : 'I do not make forgettable clips. I engineer visuals that stop thumbs and convert audiences.'}
            </h2>

            {/* Core Narrative Paragraphs */}
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#d4d4d8', margin: 0 }}>
              {isAr
                ? 'بدأت رحلتي في عالم صناعة الفيديو عام 2019 برؤية واضحة: الدمج بين جودة الصورة السينمائية وسيكولوجية الانتباه السريع في عصر السوشيال ميديا. مع جمهور تجاوز 100 ألف متابع وأكثر من 20 مليون مشاهدة، تعلمت أن أول 3 ثوانٍ هي المعركة الحقيقية.'
                : 'Starting in 2019, my vision has been straightforward: fuse cinema-grade production with high-speed social media retention. With 100K+ followers and over 20M impressions, I engineer content that respects the viewer’s time while positioning brands at the center of culture.'}
            </p>

            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#a1a1aa', margin: 0 }}>
              {isAr
                ? 'من التعاون مع كبرى العلامات التجارية في مصر مثل بلبن، العربي جروب، دهانات جوتن، ودومتي—كل ثانية يتم حسابها بالميكروثانية لتقديم سرد أصيل (Authentic Storytelling) يرفع معدل التحويل والاستبقاء لأقصى حد.'
                : 'From iconic brand collaborations with B.Laban, ElAraby Group, Jotun, and Domty—every second is paced to maximize engagement, retention, and measurable business growth.'}
            </p>

            {/* Three Verified Pillar Markers */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '14px',
                marginTop: '12px',
              }}
            >
              {[
                { titleEn: 'High-Retention Hooks', titleAr: 'هوك عالي الاستبقاء', subEn: '400ms visual shock', subAr: 'كسر النمط في 400ms' },
                { titleEn: 'Cinema Color Grading', titleAr: 'تلوين سينمائي فاخر', subEn: 'DaVinci Resolve studio', subAr: 'ألوان دافينشي ريزولف' },
                { titleEn: 'Verified Viral Conversions', titleAr: 'تحويلات ومبيعات حقيقية', subEn: 'Over 20M impressions', subAr: 'أكثر من 20 مليون وصول' },
              ].map((pill, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: 800, fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif' }}>
                    {isAr ? pill.titleAr : pill.titleEn}
                  </div>
                  <div style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: 'JetBrains Mono, monospace', marginTop: '4px' }}>
                    {isAr ? pill.subAr : pill.subEn}
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
