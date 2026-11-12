import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language, type Project } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { ComicBadge, ComicBurst } from '../comic/ComicElements';
import { Zap, Camera, Film, Layers, Flame, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';

interface Scene04ArsenalProps {
  lang: Language;
  onOpenProject?: (project: Project) => void;
  onSelectBrand?: (brandName: string) => void;
  controlledTab?: 'services' | 'gear' | 'partners';
}

export const Scene04Arsenal: React.FC<Scene04ArsenalProps> = ({
  lang,
  onSelectBrand,
  controlledTab,
}) => {
  const isAr = lang === 'ar';
  const brands = PORTFOLIO_DATA.brands;
  const [internalTab, setInternalTab] = useState<'services' | 'gear' | 'partners'>('services');
  const activeTab = controlledTab ?? internalTab;
  const [selectedGearIndex, setSelectedGearIndex] = useState<number>(0);

  const setActiveTab = (tab: 'services' | 'gear' | 'partners') => {
    setInternalTab(tab);
  };

  // Creative Gear list with practical specs
  const gearArsenal = [
    {
      name: 'Sony 4K Camera System',
      role: isAr ? 'الكاميرا والتصوير الأساسي' : 'Primary 4K Camera Rig',
      specs: isAr ? 'مستشعر فل فريم 4K • تصوير بدقة عالية وتفاصيل دقيقة • أداء ممتاز في مختلف ظروف الإضاءة' : 'Full-frame 4K capture • High dynamic range • Exceptional clarity in diverse lighting conditions',
      tag: '4K VIDEO',
      bg: '#ccff00',
      icon: <Camera size={24} color="#000000" />,
    },
    {
      name: 'Fast Cinema & Prime Lenses',
      role: isAr ? 'عدسات احترافية فائقة النقاء' : 'Sharp Prime & Zoom Optics',
      specs: isAr ? 'فتحة عدسة واسعة لعزل بصري ناعم • حدة ممتازة للقطات القريبة للمنتجات وتفاصيل الأماكن' : 'Wide aperture for natural depth of field • Crisp focus ideal for product details and venue angles',
      tag: 'OPTICS',
      bg: '#00e5ff',
      icon: <Film size={24} color="#000000" />,
    },
    {
      name: 'Post-Production & Editing Suite',
      role: isAr ? 'المونتاج وتصحيح الألوان والصوت' : 'Editing, Color & Sound Studio',
      specs: isAr ? 'مونتاج إيقاعي منظم • ضبط درجات الألوان لتناسب هوية البراند • تنقية وهندسة المؤثرات الصوتية' : 'Pacing-focused editing • Brand-matched color grading • Clean audio design and voice clarity',
      tag: 'EDITING',
      bg: '#ff3366',
      icon: <Layers size={24} color="#ffffff" />,
    },
    {
      name: '3-Axis Motorized Gimbal',
      role: isAr ? 'مانع اهتزاز وحركات كاميرا انسيابية' : '3-Axis Motorized Stabilizer',
      specs: isAr ? 'حركات سينمائية سلسة لتغطية الأماكن والمشروعات • ثبات كامل أثناء الحركة والتصوير الميداني' : 'Smooth cinematic motion for venue walkthroughs • Stable on-location and handheld coverage',
      tag: 'MOTION',
      bg: '#ffe600',
      icon: <Flame size={24} color="#000000" />,
    },
    {
      name: 'Location & Studio Lighting Rig',
      role: isAr ? 'إضاءة احترافية موجهة' : 'Key & Ambient Lighting Kit',
      specs: isAr ? 'إضاءة سوفت ومشتتات لنشر الضوء بنعومة • دقة لونية عالية تبرز ألوان المنتجات والأطعمة بجاذبية' : 'Soft diffused lighting • High CRI color accuracy making food, products, and faces look natural',
      tag: 'LIGHTING',
      bg: '#ffffff',
      icon: <Zap size={24} color="#000000" />,
    },
  ];

  const services = PORTFOLIO_DATA.services;

  return (
    <section
      id="scene-arsenal"
      className="master-scene-stage comic-halftone-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '110px clamp(16px, 4vw, 50px) 70px',
        backgroundColor: '#0c0d14',
        borderBottom: '4px solid #000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '1360px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header Strip */}
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
            <ComicBadge text="PANEL #04" subtext={isAr ? 'الخدمات' : 'SERVICES'} bg="#ff3366" textColor="#ffffff" rotation={-2} />
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                fontWeight: 900,
                color: '#ffffff',
                margin: 0,
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                filter: 'drop-shadow(3px 3px 0px #000000)',
              }}
            >
              {isAr ? 'الخدمات وصناعة المحتوى والعتاد' : 'SERVICES, GEAR & COLLABORATIONS'}
            </h2>
          </div>

          {/* Interactive Mode Comic Tabs */}
          <div
            style={{
              display: 'flex',
              padding: '4px',
              borderRadius: '16px',
              backgroundColor: '#161724',
              border: '3px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              gap: '6px',
              flexWrap: 'wrap',
              maxWidth: '100%',
            }}
          >
            {[
              { id: 'services', labelEn: 'Services & Scope', labelAr: 'الخدمات وصناعة المحتوى' },
              { id: 'gear', labelEn: 'Camera & Gear', labelAr: 'المعدات وأدوات العمل' },
              { id: 'partners', labelEn: 'Collaborations', labelAr: 'البراندات والشركاء' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tab.id as any);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '10px',
                    backgroundColor: isActive ? '#ccff00' : 'transparent',
                    color: isActive ? '#000000' : '#a1a3b5',
                    border: isActive ? '2px solid #000000' : 'none',
                    fontSize: '12px',
                    fontWeight: 900,
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'JetBrains Mono, monospace',
                    cursor: 'pointer',
                    boxShadow: isActive ? '2px 2px 0px #000000' : 'none',
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  {isAr ? tab.labelAr : tab.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: Real Services from PORTFOLIO_DATA */}
        {activeTab === 'services' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '20px',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            {services.map((srv) => (
              <div
                key={srv.id}
                className="comic-panel"
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  border: '3.5px solid #000000',
                  boxShadow: '6px 6px 0px #000000',
                  backgroundColor: '#151722',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseEnter={(e) => {
                  sound.playHover();
                  (e.currentTarget as HTMLElement).style.transform = 'translate(-4px, -4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '8px 8px 0px #ccff00';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #000000';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <ComicBadge text={`SERVICE #${srv.number}`} subtext={srv.id.toUpperCase()} bg="#ccff00" rotation={-2} />
                    <Sparkles size={18} color="#ccff00" />
                  </div>

                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 900,
                      color: '#ffffff',
                      fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                      marginBottom: '10px',
                      lineHeight: 1.25,
                      filter: 'drop-shadow(2px 2px 0px #000000)',
                    }}
                  >
                    {isAr ? srv.title_ar : srv.title_en}
                  </h3>

                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#d0d2e2',
                      marginBottom: '20px',
                      fontFamily: isAr ? 'var(--font-body-ar)' : 'var(--font-body-en)',
                    }}
                  >
                    {isAr ? srv.short_desc_ar : srv.short_desc_en}
                  </p>
                </div>

                {/* Deliverables Chips */}
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#ccff00', fontWeight: 900, marginBottom: '8px' }}>
                    {isAr ? 'مخرجات الخدمة والتسليم:' : 'DELIVERABLES:'}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(isAr ? srv.deliverables_ar : srv.deliverables_en).map((item, dIdx) => (
                      <span
                        key={dIdx}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '8px',
                          backgroundColor: '#0a0a0f',
                          border: '2px solid #000000',
                          color: '#f5f6fa',
                          fontSize: '11px',
                          fontWeight: 800,
                          fontFamily: isAr ? 'var(--font-body-ar)' : 'JetBrains Mono, monospace',
                          boxShadow: '2px 2px 0px #000000',
                        }}
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Cinema Rig & Weaponry Suite */}
        {activeTab === 'gear' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '24px',
              alignItems: 'center',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            {/* Gear Selector Comic Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {gearArsenal.map((item, idx) => {
                const isSelected = selectedGearIndex === idx;
                return (
                  <div
                    key={item.name}
                    onClick={() => {
                      sound.playClick();
                      setSelectedGearIndex(idx);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="comic-panel"
                    style={{
                      padding: '16px 20px',
                      borderRadius: '16px',
                      border: '3px solid #000000',
                      backgroundColor: isSelected ? '#ccff00' : '#141622',
                      color: isSelected ? '#000000' : '#ffffff',
                      boxShadow: isSelected ? '5px 5px 0px #000000' : '3px 3px 0px #000000',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transform: isSelected ? 'translateX(6px)' : 'none',
                      transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          backgroundColor: isSelected ? '#000000' : '#1e2130',
                          color: isSelected ? '#ccff00' : '#ffffff',
                          border: '2px solid #000000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.icon}
                      </div>

                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 900, fontFamily: 'Space Grotesk, sans-serif' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '12px', color: isSelected ? '#222' : '#8d90a0', fontWeight: 700 }}>
                          {item.role}
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: '#000000',
                        color: '#ccff00',
                        fontSize: '10px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 900,
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Weapon Detail Comic Blueprint Card */}
            <div
              className="comic-panel"
              style={{
                padding: '32px',
                borderRadius: '24px',
                border: '4px solid #000000',
                boxShadow: '8px 8px 0px #ccff00, 8px 8px 0px 4px #000000',
                backgroundColor: '#151722',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <ComicBadge text="GEAR SPECIFICATION" subtext={isAr ? 'مواصفات العتاد' : 'EQUIPMENT'} bg="#ffe600" rotation={-2} />
                <ComicBurst size={60} color="#ccff00">
                  <span style={{ fontSize: '10px', fontWeight: 900 }}>PRO</span>
                </ComicBurst>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                  fontWeight: 900,
                  color: '#ffffff',
                  fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                  marginBottom: '10px',
                  filter: 'drop-shadow(2px 2px 0px #000000)',
                }}
              >
                {gearArsenal[selectedGearIndex].name}
              </h3>

              <div style={{ fontSize: '15px', color: '#ccff00', fontWeight: 800, marginBottom: '20px' }}>
                {gearArsenal[selectedGearIndex].role}
              </div>

              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  backgroundColor: '#0a0a10',
                  border: '2.5px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  marginBottom: '24px',
                }}
              >
                <div style={{ fontSize: '11px', color: '#ccff00', fontFamily: 'JetBrains Mono, monospace', fontWeight: 900, marginBottom: '6px' }}>
                  {isAr ? 'المواصفات والقدرات الفنية' : 'TECHNICAL SPECIFICATIONS & CAPABILITIES'}
                </div>
                <div style={{ fontSize: '14px', color: '#ffffff', lineHeight: 1.6, fontWeight: 500 }}>
                  {gearArsenal[selectedGearIndex].specs}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ccff00', fontSize: '12px', fontWeight: 800 }}>
                <CheckCircle2 size={16} color="#ccff00" />
                <span>
                  {isAr
                    ? 'عتاد مخصص لإنتاج وتصوير محتوى احترافي يخدم هوية مشروعك'
                    : 'Deployed on-location and in studio for reliable, high-standard content'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Allied Brand Network */}
        {activeTab === 'partners' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '16px',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            {brands.map((b) => (
              <div
                key={b.id}
                onClick={() => {
                  sound.playClick();
                  if (onSelectBrand) onSelectBrand(b.name);
                }}
                onMouseEnter={() => sound.playHover()}
                className="comic-panel"
                style={{
                  padding: '22px',
                  borderRadius: '18px',
                  backgroundColor: '#141622',
                  border: '3px solid #000000',
                  boxShadow: '5px 5px 0px #000000',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseOver={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.transform = 'translate(-4px, -4px)';
                  e.currentTarget.style.boxShadow = '7px 7px 0px #ccff00';
                }}
                onMouseOut={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.transform = 'translate(0px, 0px)';
                  e.currentTarget.style.boxShadow = '5px 5px 0px #000000';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 900,
                      color: '#ffffff',
                      fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                    }}
                  >
                    {isAr ? b.name_ar : b.name}
                  </span>
                  <ArrowUpRight size={18} color="#ccff00" />
                </div>

                <div style={{ fontSize: '12px', color: '#a1a3b5', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
                  {isAr ? b.sector_ar : b.sector_en}
                </div>

                <div
                  style={{
                    display: 'inline-block',
                    marginTop: '12px',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#000000',
                    color: '#ccff00',
                    fontSize: '11px',
                    fontWeight: 900,
                    border: '1.5px solid #000000',
                  }}
                >
                  {b.badge}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
