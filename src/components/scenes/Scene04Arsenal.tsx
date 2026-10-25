import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language, type Project } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import {
  CheckCircle2,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';

interface Scene04ArsenalProps {
  lang: Language;
  onOpenProject?: (project: Project) => void;
  onSelectBrand?: (brandName: string) => void;
}

export const Scene04Arsenal: React.FC<Scene04ArsenalProps> = ({
  lang,
  onSelectBrand,
}) => {
  const isAr = lang === 'ar';
  const brands = PORTFOLIO_DATA.brands;
  const [activeTab, setActiveTab] = useState<'skills' | 'gear' | 'partners'>('skills');
  const [selectedGearIndex, setSelectedGearIndex] = useState<number>(0);

  // Creative Gear list with full cinema specs in monochrome styling
  const gearArsenal = [
    {
      name: 'Sony Cinema FX3',
      role: isAr ? 'الكاميرا السينمائية الرئيسية' : 'Primary Cinema Body',
      specs: isAr ? 'مستشعر فل فريم 4K 120fps • كوديك All-Intra 10-bit 4:2:2' : 'Full-Frame 4K 120fps • 10-bit 4:2:2 S-Log3 Cinetone',
      tag: '4K CINEMA',
    },
    {
      name: 'Sony FE 24-70mm GM II',
      role: isAr ? 'عدسة سينمائية فائقة الحدة' : 'Master Flagship Glass',
      specs: isAr ? 'فتحة F2.8 ثابتة • تركيز بؤري فائق السرعة وبوكيه سينمائي' : 'Constant F2.8 • Ultra-fast Linear XD Motors & Creamy Bokeh',
      tag: 'G-MASTER',
    },
    {
      name: 'DaVinci Resolve Studio',
      role: isAr ? 'جناح التلوين وهندسة الصورة' : 'Color Grading & Mastering',
      specs: isAr ? 'كولور مانجمنت احترافي • تصحيح ألوان دقيق ومعايرة سينمائية' : 'Node-based ACES / DWG Color Pipeline & Film Emulation',
      tag: 'GRADING',
    },
    {
      name: 'DJI RS3 Pro Combo',
      role: isAr ? 'مانع اهتزاز ومحرك حركة' : '3-Axis Carbon Stabilizer',
      specs: isAr ? 'تتبع ليدار آلي • أذرع كربونية لحركات كاميرا ناعمة ومعقدة' : 'LiDAR Range Finder Autofocus • Automated SuperSmooth Runs',
      tag: 'MOTION',
    },
    {
      name: 'Aputure Amaran 200x Bi-Color',
      role: isAr ? 'هندسة الإضاءة الدرامية' : 'Studio Key Lighting',
      specs: isAr ? 'سوفت بوكس 90 سم • CRI 95+ لألوان بشرة طبيعية وفخمة' : '90cm Lantern & Dome • Studio CRI 95+ for Flawless Skin Tones',
      tag: 'LIGHTING',
    },
  ];

  // Technical Competency Pillars
  const skillPillars = [
    {
      number: '01',
      titleEn: 'Cinema Direction & Cinematography',
      titleAr: 'الإخراج والتصوير السينمائي',
      descriptionEn: 'Lighting design, dynamic camera movement, anamorphic framing, and intentional mise-en-scène crafted for high-end commercials.',
      descriptionAr: 'توزيع إضاءة متقدم، حركات كاميرا انسيابية، وتكوينات كادر مدروسة لإنتاج إعلانات تجارية تعكس فخامة البراند.',
      skills: ['Sony Cinema FX3', 'Dynamic Camera Blocking', 'Lighting Architecture', 'Commercial Set Direction'],
    },
    {
      number: '02',
      titleEn: 'Post-Production & Color Alchemy',
      titleAr: 'المونتاج والتلوين السينمائي',
      descriptionEn: 'Rhythm editing tuned to human attention spans, DaVinci Resolve color science, sound design, and impact SFX that reinforce each story beat.',
      descriptionAr: 'مونتاج إيقاعي يتماشى مع نبض المشاهد، تصحيح وتلوين ألوان دقيق على دافينشي ريزولف، وهندسة صوتية تبرز المشاعر.',
      skills: ['DaVinci Resolve', 'Adobe Premiere Pro', 'Sound Design & Mastering', 'S-Log3 Color Grading'],
    },
    {
      number: '03',
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
      className="master-scene-stage"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '110px clamp(16px, 4vw, 50px) 70px',
        backgroundColor: '#080808',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
        {/* Scene Header with Expressive Kinetic Typography */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', marginBottom: '8px' }}>
              <Cpu size={14} />
              <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, letterSpacing: '0.08em' }}>
                SCENE 04 • TECHNICAL ARSENAL & SKILL MATRIX
              </span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                color: '#ffffff',
                fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {isAr ? 'العتاد التقني والخبرة الإنتاجية' : 'The Creative Arsenal & Weaponry'}
            </h2>
          </div>

          {/* Interactive Mode Tabs */}
          <div
            style={{
              display: 'flex',
              padding: '4px',
              borderRadius: '100px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {[
              { id: 'skills', labelEn: 'Skill Matrix', labelAr: 'المهارات والخبرات' },
              { id: 'gear', labelEn: 'Cinema Rig Suite', labelAr: 'العتاد والكاميرات' },
              { id: 'partners', labelEn: 'Brand Network', labelAr: 'شبكة الشركاء' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as any);
                }}
                onMouseEnter={() => sound.playHover()}
                style={{
                  padding: '8px 18px',
                  borderRadius: '100px',
                  backgroundColor: activeTab === tab.id ? '#ffffff' : 'transparent',
                  color: activeTab === tab.id ? '#000000' : '#a1a1aa',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 800,
                  fontFamily: isAr ? 'Alexandria, sans-serif' : 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {isAr ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: Core Skill Matrix (Dynamic Layout & Staggered Reveal) */}
        {activeTab === 'skills' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              animation: 'fadeIn 0.4s ease',
            }}
          >
            {skillPillars.map((pillar) => (
              <div
                key={pillar.number}
                className="glass-panel"
                style={{
                  padding: '32px 28px',
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#0c0c0e',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                {/* Accent Top Border Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: '#ffffff',
                  }}
                />

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 900,
                        color: '#ffffff',
                      }}
                    >
                      PILLAR {pillar.number}
                    </span>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        fontSize: '10px',
                        fontFamily: 'JetBrains Mono, monospace',
                        color: '#d4d4d8',
                      }}
                    >
                      VERIFIED
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      color: '#ffffff',
                      fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                      marginBottom: '12px',
                      lineHeight: 1.25,
                    }}
                  >
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h3>

                  <p
                    style={{
                      fontSize: '14px',
                      color: '#a1a1aa',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {isAr ? pillar.descriptionAr : pillar.descriptionEn}
                  </p>
                </div>

                {/* Sub-skills pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
                  {pillar.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#e4e4e7',
                        fontSize: '11px',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Cinema Gear Suite (Interactive Studio Rig Inspector) */}
        {activeTab === 'gear' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              alignItems: 'center',
              animation: 'fadeIn 0.4s ease',
            }}
          >
            {/* Gear Selector List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {gearArsenal.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setSelectedGearIndex(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    padding: '18px 22px',
                    borderRadius: '18px',
                    backgroundColor: selectedGearIndex === idx ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                    border: selectedGearIndex === idx ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: 900,
                        fontSize: '12px',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    >
                      0{idx + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '2px' }}>{item.role}</div>
                    </div>
                  </div>

                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      fontSize: '10px',
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#ffffff',
                      fontWeight: 700,
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Gear Detail Display Card */}
            <div
              className="glass-panel"
              style={{
                padding: '36px',
                borderRadius: '28px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#0c0c0e',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#a1a1aa', fontWeight: 800, marginBottom: '8px' }}>
                HARDWARE SPEC SHEET • ITEM 0{selectedGearIndex + 1}
              </div>

              <h3
                style={{
                  fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                  fontWeight: 900,
                  color: '#ffffff',
                  fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                  marginBottom: '10px',
                }}
              >
                {gearArsenal[selectedGearIndex].name}
              </h3>

              <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: 700, marginBottom: '16px' }}>
                {gearArsenal[selectedGearIndex].role}
              </div>

              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '24px',
                }}
              >
                <div style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: 'JetBrains Mono, monospace', marginBottom: '6px' }}>
                  {isAr ? 'المواصفات الفنية المعتمدة' : 'TECHNICAL SPECIFICATIONS'}
                </div>
                <div style={{ fontSize: '15px', color: '#ffffff', lineHeight: 1.6, fontWeight: 500 }}>
                  {gearArsenal[selectedGearIndex].specs}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a1a1aa', fontSize: '12px' }}>
                <CheckCircle2 size={14} color="#ffffff" />
                <span>
                  {isAr
                    ? 'يتم استخدام هذا العتاد مباشرة في تصوير إعلانات البراندات'
                    : 'Deployed directly on set for commercial client productions'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Brand Constellation Network */}
        {activeTab === 'partners' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              animation: 'fadeIn 0.4s ease',
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
                style={{
                  padding: '22px',
                  borderRadius: '18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                className="magnetic-btn"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif' }}>
                    {isAr ? b.name_ar : b.name}
                  </span>
                  <ArrowUpRight size={16} color="#ffffff" />
                </div>
                <div style={{ fontSize: '12px', color: '#a1a1aa', fontFamily: 'JetBrains Mono, monospace' }}>
                  {isAr ? b.sector_ar : b.sector_en}
                </div>
                <div style={{ fontSize: '11px', color: '#ffffff', marginTop: '10px', fontWeight: 700 }}>
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
