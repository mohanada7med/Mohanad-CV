import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA, type Language, type Project } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { ComicBadge, ComicBurst } from '../comic/ComicElements';
import { Zap, Camera, Film, Layers, Flame, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';

interface Scene04ArsenalProps {
  lang: Language;
  onOpenProject?: (project: Project) => void;
  onSelectBrand?: (brandName: string) => void;
  controlledTab?: 'skills' | 'gear' | 'partners';
}

export const Scene04Arsenal: React.FC<Scene04ArsenalProps> = ({
  lang,
  onSelectBrand,
  controlledTab,
}) => {
  const isAr = lang === 'ar';
  const brands = PORTFOLIO_DATA.brands;
  const [activeTab, setActiveTab] = useState<'skills' | 'gear' | 'partners'>('skills');
  const [selectedGearIndex, setSelectedGearIndex] = useState<number>(0);

  useEffect(() => {
    if (controlledTab) {
      setActiveTab(controlledTab);
    }
  }, [controlledTab]);

  // Creative Gear list with full cinema specs in comic styling
  const gearArsenal = [
    {
      name: 'Sony Cinema FX3',
      role: isAr ? 'السلاح السينمائي الرئيسي' : 'Primary Cinema Weapon',
      specs: isAr ? 'مستشعر فل فريم 4K 120fps • كوديك All-Intra 10-bit 4:2:2 • تصوير سينمائي في أصعب ظروف الإضاءة' : 'Full-Frame 4K 120fps • 10-bit 4:2:2 S-Log3 Cinetone • Extreme low-light performance',
      tag: '4K CINEMA',
      bg: '#ccff00',
      icon: <Camera size={24} color="#000000" />,
    },
    {
      name: 'Sony FE 24-70mm GM II',
      role: isAr ? 'عدسة سينمائية فائقة الحدة' : 'Master Flagship Optical Glass',
      specs: isAr ? 'فتحة F2.8 ثابتة • محركات XD Linear فائقة السرعة وبوكيه سينمائي كريمي يعزل الهدف تماماً' : 'Constant F2.8 • Ultra-fast Linear XD Motors & Creamy Bokeh for flawless subject isolation',
      tag: 'G-MASTER',
      bg: '#00e5ff',
      icon: <Film size={24} color="#000000" />,
    },
    {
      name: 'DaVinci Resolve Studio',
      role: isAr ? 'مختبر هندسة الألوان والخيمياء' : 'Color Alchemy & Mastering Studio',
      specs: isAr ? 'إدارة ألوان ACES احترافية • معايرة دقيقة لألوان البشرة وFilm Emulation يمنح طابعاً سينمائياً أصيلاً' : 'Node-based ACES / DWG Color Pipeline & Film Emulation for rich cinematic depth',
      tag: 'COLOR LAB',
      bg: '#ff3366',
      icon: <Layers size={24} color="#ffffff" />,
    },
    {
      name: 'DJI RS3 Pro Combo',
      role: isAr ? 'مانع اهتزاز ومحرك حركة كربوني' : 'Carbon-Fiber 3-Axis Stabilizer',
      specs: isAr ? 'فوكس ليدار آلي فائق الدقة • حركات كاميرا ناعمة ومعقدة تجعل اللقطة تبدو كإنتاج هوليوود' : 'LiDAR Range Finder Autofocus • Automated SuperSmooth Runs for Hollywood-scale camera blocking',
      tag: 'MOTION',
      bg: '#ffe600',
      icon: <Flame size={24} color="#000000" />,
    },
    {
      name: 'Aputure Amaran Studio Lighting',
      role: isAr ? 'هندسة الإضاءة الدرامية' : 'Studio Key Lighting Rig',
      specs: isAr ? 'سوفت بوكس 90 سم وفوانيس نشر ضوء • دقة ألوان CRI 95+ لألوان طعام وبشرة جذابة' : '90cm Lantern & Soft Dome • Studio CRI 95+ for appetizing food videography and flawless portraits',
      tag: 'LIGHTING',
      bg: '#ffffff',
      icon: <Zap size={24} color="#000000" />,
    },
  ];

  // Technical Competency Pillars
  const skillPillars = [
    {
      number: '01',
      tag: 'DIRECTION',
      tagBg: '#ccff00',
      titleEn: 'Cinema Direction & Cinematography',
      titleAr: 'الإخراج والتصوير السينمائي',
      descriptionEn: 'Lighting design, dynamic camera movement, anamorphic framing, and intentional mise-en-scène crafted for high-end commercials.',
      descriptionAr: 'توزيع إضاءة متقدم، حركات كاميرا انسيابية، وتكوينات كادر مدروسة لإنتاج إعلانات تجارية تعكس فخامة البراند.',
      skills: ['Sony Cinema FX3', 'Dynamic Camera Blocking', 'Lighting Architecture', 'Commercial Set Direction'],
    },
    {
      number: '02',
      tag: 'ALCHEMY',
      tagBg: '#ff3366',
      titleEn: 'Post-Production & Color Alchemy',
      titleAr: 'المونتاج والتلوين السينمائي',
      descriptionEn: 'Rhythm editing tuned to human attention spans, DaVinci Resolve color science, sound design, and impact SFX that reinforce each story beat.',
      descriptionAr: 'مونتاج إيقاعي يتماشى مع نبض المشاهد، تصحيح وتلوين ألوان دقيق على دافينشي ريزولف، وهندسة صوتية تبرز المشاعر.',
      skills: ['DaVinci Resolve', 'Adobe Premiere Pro', 'Sound Design & Mastering', 'S-Log3 Color Grading'],
    },
    {
      number: '03',
      tag: 'VIRAL HOOKS',
      tagBg: '#ffe600',
      titleEn: 'UGC & Viral Hook Engineering',
      titleAr: 'سيكولوجية الهوك والمحتوى الفيروسي',
      descriptionEn: 'Deconstructing viewer drop-off within the first 400ms. Structuring fast payoff loops, tension curves, and seamless CTA handoffs.',
      descriptionAr: 'تحليل دقيق لأول 400 ميلي ثانية لمنع تخطي الإعلان، بناء تصاعد درامي سريع، وتوجيه المشاهد للتحويل والشراء.',
      skills: ['Pattern Interrupts', '94% Retention Optimization', 'Short-Form Narrative', 'Conversion UGC'],
    },
  ];

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
            <ComicBadge text="PANEL #04" subtext="WEAPONS" bg="#ff3366" textColor="#ffffff" rotation={-2} />
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
              {isAr ? 'العتاد التقني والأسلحة الإبداعية' : 'THE CREATIVE WEAPONRY & ARSENAL'}
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
              { id: 'skills', labelEn: 'Superpower Matrix', labelAr: 'المهارات والخبرات' },
              { id: 'gear', labelEn: 'Cinema Rig Suite', labelAr: 'العتاد والكاميرات' },
              { id: 'partners', labelEn: 'Allied Brands', labelAr: 'شبكة الشركاء' },
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

        {/* TAB 1: Comic Superpower Skill Cards */}
        {activeTab === 'skills' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '20px',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            {skillPillars.map((pillar) => (
              <div
                key={pillar.number}
                className="comic-panel"
                style={{
                  padding: '28px',
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
                  (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${pillar.tagBg}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #000000';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <ComicBadge text={`POWER #${pillar.number}`} subtext={pillar.tag} bg={pillar.tagBg} rotation={-2} />
                    <Sparkles size={18} color="#ccff00" />
                  </div>

                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 900,
                      color: '#ffffff',
                      fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                      marginBottom: '12px',
                      lineHeight: 1.25,
                      filter: 'drop-shadow(2px 2px 0px #000000)',
                    }}
                  >
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h3>

                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: '#d0d2e2',
                      marginBottom: '24px',
                      fontFamily: isAr ? 'var(--font-body-ar)' : 'var(--font-body-en)',
                    }}
                  >
                    {isAr ? pillar.descriptionAr : pillar.descriptionEn}
                  </p>
                </div>

                {/* Comic Skill Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {pillar.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#0a0a0f',
                        border: '2px solid #000000',
                        color: '#f5f6fa',
                        fontSize: '11px',
                        fontWeight: 800,
                        fontFamily: 'JetBrains Mono, monospace',
                        boxShadow: '2px 2px 0px #000000',
                      }}
                    >
                      ✓ {skill}
                    </span>
                  ))}
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
                <ComicBadge text="GEAR SPECIFICATION" subtext="ACTIVE WEAPON" bg="#ffe600" rotation={-2} />
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
                  {isAr ? 'المواصفات الفنية المعتمدة' : 'TECHNICAL SPECIFICATIONS & CAPABILITIES'}
                </div>
                <div style={{ fontSize: '14px', color: '#ffffff', lineHeight: 1.6, fontWeight: 500 }}>
                  {gearArsenal[selectedGearIndex].specs}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ccff00', fontSize: '12px', fontWeight: 800 }}>
                <CheckCircle2 size={16} color="#ccff00" />
                <span>
                  {isAr
                    ? 'يتم استخدام هذا العتاد مباشرة في تصوير إعلانات البراندات'
                    : 'Deployed directly on set for commercial client productions'}
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
