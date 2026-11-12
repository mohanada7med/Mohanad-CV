import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { ComicBadge } from '../comic/ComicElements';
import {
  Film,
  Camera,
  Layers,
  Target,
  Zap,
  Sliders,
  Radio,
  Flame,
  CheckCircle2,
  Cpu,
  Palette,
  Volume2,
} from 'lucide-react';

interface Scene05SkillsProps {
  lang: Language;
}

export const Scene05Skills: React.FC<Scene05SkillsProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const skills = PORTFOLIO_DATA.skills;
  const t = PORTFOLIO_DATA.ui[lang];

  // Interactive test knob state
  const [knobValues, setKnobValues] = useState<Record<string, number>>({
    hook: 94,
    camera: 92,
    pacing: 90,
    color: 88,
    sound: 86,
    ugc: 91,
  });
  const [activeDeckMode, setActiveDeckMode] = useState<'visual' | 'gear' | 'workflow'>('visual');

  const handleKnobTweak = (key: string, delta: number) => {
    sound.playClick();
    setKnobValues((prev) => {
      const current = prev[key] || 90;
      const nextVal = Math.min(100, Math.max(50, current + delta));
      return { ...prev, [key]: nextVal };
    });
  };

  const gearTools = [
    {
      titleEn: '4K Cinema Camera Rig',
      titleAr: 'كاميرا فل فريم 4K',
      descEn: 'Full-frame sensor capture, crisp high bitrates, reliable low-light performance on real sets.',
      descAr: 'مستشعر فل فريم لتسجيل أدق التفاصيل بألوان نقية وأداء عالي في مختلف ظروف الإضاءة.',
      spec: '4K 10-BIT • LOG',
      color: '#ccff00',
      icon: Camera,
    },
    {
      titleEn: 'Fast Prime Optics & Macros',
      titleAr: 'عدسات سينمائية وماكرو',
      descEn: 'Ultra-fast aperture for creamy depth of field; macro focal lengths for appetizing food textures.',
      descAr: 'فتحات عدسة واسعة لعزل بصري ناعم، وعدسات ماكرو مخصصة للقطات الأطعمة والمنتجات.',
      spec: 'F/1.4 - F/1.8 • MACRO',
      color: '#4dd2ff',
      icon: Target,
    },
    {
      titleEn: '3-Axis Dynamic Gimbal',
      titleAr: 'مانع اهتزاز ميكانيكي',
      descEn: 'Fluid parallax tracking shots through bustling restaurants, venues, and product displays.',
      descAr: 'حركات سينمائية سلسة ومتابعة ديناميكية للأماكن والمشروعات بدون أي اهتزاز.',
      spec: '3-AXIS GIMBAL',
      color: '#ffd93d',
      icon: Flame,
    },
    {
      titleEn: 'High-CRI Diffused Lighting',
      titleAr: 'إضاءة سينمائية موجهة',
      descEn: 'Soft daylight diffusion and directional key-lights to reveal food colors and venue warmth.',
      descAr: 'إضاءة سوفت ومشتتات دقيقة تبرز ألوان المنتجات الطبيعية وأجواء المكان الدافئة.',
      spec: 'CRI 96+ • SOFTBOX',
      color: '#ff4d8d',
      icon: Zap,
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      titleEn: 'Concept Hook (0-3s)',
      titleAr: 'هندسة الافتتاحية (0-3 ثوانٍ)',
      descEn: 'Crafting visual curiosity so the viewer immediately pauses their scroll.',
      descAr: 'بناء مشهد افتتاحي سريع يجذب العين فوراً ويمنع المشاهد من تجاوز الفيديو.',
      bg: '#ccff00',
    },
    {
      step: '02',
      titleEn: 'Dynamic Movement & Framing',
      titleAr: 'حركة الكاميرا وتكوين الكادر',
      descEn: 'Deliberate camera movements that showcase products and venue spaces naturally.',
      descAr: 'لقطات متحركة مدروسة تعكس فخامة المكان أو تفاصيل المنتج بجاذبية.',
      bg: '#4dd2ff',
    },
    {
      step: '03',
      titleEn: 'Rhythmic Pacing & Sound Foley',
      titleAr: 'المونتاج الإيقاعي وهندسة الصوت',
      descEn: 'Tight cuts aligned with audio cues, ASMR sizzles, and crisp sound effects.',
      descAr: 'قطعات متوافقة مع إيقاع الموسيقى ومؤثرات صوتية حية تزيد تفاعل المشاهد.',
      bg: '#ffd93d',
    },
    {
      step: '04',
      titleEn: 'Clean Color Grade & Export',
      titleAr: 'تدريج الألوان والتصدير للنشر',
      descEn: 'Vibrant, true-to-life tones optimized for Instagram Reels and TikTok algorithms.',
      descAr: 'ألوان مشرقة وطبيعية جاهزة للعرض بدقة كاملة على منصات التواصل.',
      bg: '#ff4d8d',
    },
  ];

  return (
    <section
      id="scene-skills"
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
            <ComicBadge text="ACT #05" subtext={isAr ? 'العتاد والمهارات' : 'ARSENAL'} bg="#ccff00" rotation={-2} />
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
              {t.skills_heading}
            </h2>
          </div>

          {/* Interactive Deck Mode Switcher */}
          <div
            className="touch-scroll-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--bg-card)',
              padding: '6px',
              borderRadius: '16px',
              border: '3px solid var(--border-comic)',
              boxShadow: '4px 4px 0px var(--shadow-comic)',
            }}
          >
            <button
              onClick={() => {
                sound.playClick();
                setActiveDeckMode('visual');
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                border: '2px solid var(--border-comic)',
                backgroundColor: activeDeckMode === 'visual' ? '#ccff00' : 'transparent',
                color: '#000000',
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                fontSize: '12px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease',
              }}
            >
              <Sliders size={14} />
              <span>{isAr ? 'لوحة التحكم والمهارات' : 'SKILL CONSOLE'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveDeckMode('gear');
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                border: '2px solid var(--border-comic)',
                backgroundColor: activeDeckMode === 'gear' ? '#4dd2ff' : 'transparent',
                color: '#000000',
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                fontSize: '12px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease',
              }}
            >
              <Camera size={14} />
              <span>{isAr ? 'العتاد والتجهيزات' : 'GEAR RACK'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveDeckMode('workflow');
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                border: '2px solid var(--border-comic)',
                backgroundColor: activeDeckMode === 'workflow' ? '#ffd93d' : 'transparent',
                color: '#000000',
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                fontSize: '12px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease',
              }}
            >
              <Cpu size={14} />
              <span>{isAr ? 'منهجية العمل' : 'WORKFLOW'}</span>
            </button>
          </div>
        </div>

        {/* MODE 1: VISUAL CARTOON CONTROL CONSOLE (No boring progress bars!) */}
        {activeDeckMode === 'visual' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '24px',
            }}
          >
            {/* Studio Dials & Gauges Panel */}
            <div
              className="comic-panel"
              style={{
                padding: '24px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: '24px',
                border: '4px solid var(--border-comic)',
                boxShadow: '8px 8px 0px var(--shadow-comic)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Radio size={20} color="#ccff00" />
                  <span
                    style={{
                      fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                      fontSize: '18px',
                      fontWeight: 900,
                      color: 'var(--text-main)',
                    }}
                  >
                    {isAr ? 'عدادات الإنتاج التفاعلية' : 'LIVE PRODUCTION METERS'}
                  </span>
                </div>
                <span
                  style={{
                    backgroundColor: '#ccff00',
                    color: '#000000',
                    fontSize: '10px',
                    fontWeight: 900,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: '1.5px solid #000000',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  CALIBRATED
                </span>
              </div>

              {/* Interactive Knobs & Meters Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                }}
              >
                {/* Meter 1: Hook Retention */}
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--bg-page)',
                    borderRadius: '16px',
                    border: '3px solid var(--border-comic)',
                    boxShadow: '4px 4px 0px var(--shadow-comic)',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {isAr ? 'قوة الافتتاحية' : 'HOOK POWER'}
                  </div>
                  {/* Gauge Ring */}
                  <div
                    style={{
                      width: '74px',
                      height: '74px',
                      margin: '0 auto 10px',
                      borderRadius: '50%',
                      border: '4px solid var(--border-comic)',
                      backgroundColor: 'var(--bg-card)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                      position: 'relative',
                    }}
                  >
                    <span style={{ fontSize: '20px', fontWeight: 900, color: '#ccff00' }}>
                      {knobValues.hook}%
                    </span>
                    <span style={{ fontSize: '8px', fontWeight: 800, color: 'var(--text-muted)' }}>0-3 SEC</span>
                  </div>
                  {/* Tweaker Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                    <button
                      onClick={() => handleKnobTweak('hook', -2)}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '2px solid var(--border-comic)',
                        backgroundColor: 'var(--bg-card)',
                        cursor: 'pointer',
                        fontWeight: 900,
                        fontSize: '12px',
                        color: 'var(--text-main)',
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleKnobTweak('hook', 2)}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '2px solid var(--border-comic)',
                        backgroundColor: '#ccff00',
                        cursor: 'pointer',
                        fontWeight: 900,
                        fontSize: '12px',
                        color: '#000000',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Meter 2: 4K Framing Clarity */}
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--bg-page)',
                    borderRadius: '16px',
                    border: '3px solid var(--border-comic)',
                    boxShadow: '4px 4px 0px var(--shadow-comic)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {isAr ? 'نقاء كادر 4K' : '4K CLARITY'}
                  </div>
                  <div
                    style={{
                      width: '74px',
                      height: '74px',
                      margin: '0 auto 10px',
                      borderRadius: '50%',
                      border: '4px solid var(--border-comic)',
                      backgroundColor: 'var(--bg-card)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    <span style={{ fontSize: '20px', fontWeight: 900, color: '#4dd2ff' }}>
                      {knobValues.camera}%
                    </span>
                    <span style={{ fontSize: '8px', fontWeight: 800, color: 'var(--text-muted)' }}>OPTICS</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                    <button
                      onClick={() => handleKnobTweak('camera', -2)}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '2px solid var(--border-comic)',
                        backgroundColor: 'var(--bg-card)',
                        cursor: 'pointer',
                        fontWeight: 900,
                        fontSize: '12px',
                        color: 'var(--text-main)',
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleKnobTweak('camera', 2)}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '2px solid var(--border-comic)',
                        backgroundColor: '#4dd2ff',
                        cursor: 'pointer',
                        fontWeight: 900,
                        fontSize: '12px',
                        color: '#000000',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Meter 3: Pacing Tempo */}
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--bg-page)',
                    borderRadius: '16px',
                    border: '3px solid var(--border-comic)',
                    boxShadow: '4px 4px 0px var(--shadow-comic)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {isAr ? 'إيقاع التقطيع' : 'CUT PACING'}
                  </div>
                  <div
                    style={{
                      width: '74px',
                      height: '74px',
                      margin: '0 auto 10px',
                      borderRadius: '50%',
                      border: '4px solid var(--border-comic)',
                      backgroundColor: 'var(--bg-card)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    <span style={{ fontSize: '20px', fontWeight: 900, color: '#ffd93d' }}>
                      {knobValues.pacing}%
                    </span>
                    <span style={{ fontSize: '8px', fontWeight: 800, color: 'var(--text-muted)' }}>TEMPO</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                    <button
                      onClick={() => handleKnobTweak('pacing', -2)}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '2px solid var(--border-comic)',
                        backgroundColor: 'var(--bg-card)',
                        cursor: 'pointer',
                        fontWeight: 900,
                        fontSize: '12px',
                        color: 'var(--text-main)',
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleKnobTweak('pacing', 2)}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '2px solid var(--border-comic)',
                        backgroundColor: '#ffd93d',
                        cursor: 'pointer',
                        fontWeight: 900,
                        fontSize: '12px',
                        color: '#000000',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Meter 4: Color Grading Saturation */}
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--bg-page)',
                    borderRadius: '16px',
                    border: '3px solid var(--border-comic)',
                    boxShadow: '4px 4px 0px var(--shadow-comic)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {isAr ? 'تناغم الألوان' : 'COLOR MOOD'}
                  </div>
                  <div
                    style={{
                      width: '74px',
                      height: '74px',
                      margin: '0 auto 10px',
                      borderRadius: '50%',
                      border: '4px solid var(--border-comic)',
                      backgroundColor: 'var(--bg-card)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    <span style={{ fontSize: '20px', fontWeight: 900, color: '#ff4d8d' }}>
                      {knobValues.color}%
                    </span>
                    <span style={{ fontSize: '8px', fontWeight: 800, color: 'var(--text-muted)' }}>DAVINCI</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                    <button
                      onClick={() => handleKnobTweak('color', -2)}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '2px solid var(--border-comic)',
                        backgroundColor: 'var(--bg-card)',
                        cursor: 'pointer',
                        fontWeight: 900,
                        fontSize: '12px',
                        color: 'var(--text-main)',
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleKnobTweak('color', 2)}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '2px solid var(--border-comic)',
                        backgroundColor: '#ff4d8d',
                        cursor: 'pointer',
                        fontWeight: 900,
                        fontSize: '12px',
                        color: '#ffffff',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Soundboard FX Row */}
              <div
                style={{
                  padding: '14px',
                  backgroundColor: 'var(--bg-page)',
                  borderRadius: '16px',
                  border: '3px solid var(--border-comic)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Volume2 size={18} color="#ccff00" />
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-main)' }}>
                    {isAr ? 'مؤثرات الإنتاج الصوتية' : 'STUDIO FOLEY SOUND'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['CLAP!', 'ZOOM!', 'BASS!'].map((fx) => (
                    <button
                      key={fx}
                      onClick={() => {
                        sound.playChime();
                      }}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        border: '2px solid var(--border-comic)',
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-main)',
                        fontFamily: 'Bangers, Cairo, cursive',
                        fontSize: '12px',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 0px var(--shadow-comic)',
                      }}
                    >
                      {fx}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Creative Visual Badges & Craft Cards */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {skills.map((skill, idx) => {
                const colors = ['#ccff00', '#4dd2ff', '#ffd93d', '#ff4d8d', '#ffffff', '#ccff00'];
                const cardColor = colors[idx % colors.length];

                return (
                  <div
                    key={skill.name_en}
                    className="comic-panel"
                    style={{
                      padding: '16px 20px',
                      backgroundColor: 'var(--bg-card)',
                      borderRadius: '18px',
                      border: '3px solid var(--border-comic)',
                      boxShadow: '5px 5px 0px var(--shadow-comic)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '14px',
                          backgroundColor: cardColor,
                          border: '2.5px solid #000000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '3px 3px 0px #000000',
                          flexShrink: 0,
                        }}
                      >
                        {idx === 0 && <Film size={22} color="#000000" />}
                        {idx === 1 && <Camera size={22} color="#000000" />}
                        {idx === 2 && <Layers size={22} color="#000000" />}
                        {idx === 3 && <Palette size={22} color="#000000" />}
                        {idx === 4 && <Target size={22} color="#000000" />}
                        {idx === 5 && <Zap size={22} color="#000000" />}
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: '15px',
                            fontWeight: 900,
                            color: 'var(--text-main)',
                            fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                          }}
                        >
                          {isAr ? skill.name_ar : skill.name_en}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                          {isAr ? skill.role_ar : skill.role_en}
                        </div>
                      </div>
                    </div>

                    {/* Tool Badges Pill Row */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {skill.tools.slice(0, 2).map((tool) => (
                        <span
                          key={tool}
                          style={{
                            padding: '3px 9px',
                            borderRadius: '100px',
                            border: '1.5px solid var(--border-comic)',
                            backgroundColor: 'var(--bg-page)',
                            color: 'var(--text-main)',
                            fontSize: '10px',
                            fontWeight: 800,
                            fontFamily: 'JetBrains Mono, monospace',
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 2: GEAR RACK CARDS */}
        {activeDeckMode === 'gear' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '20px',
            }}
          >
            {gearTools.map((gear) => {
              const Icon = gear.icon;
              return (
                <div
                  key={gear.titleEn}
                  className="comic-panel"
                  style={{
                    padding: '24px',
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: '20px',
                    border: '3.5px solid var(--border-comic)',
                    boxShadow: '6px 6px 0px var(--shadow-comic)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '12px',
                          backgroundColor: gear.color,
                          border: '2.5px solid #000000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '3px 3px 0px #000000',
                        }}
                      >
                        <Icon size={22} color="#000000" />
                      </div>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1.5px solid var(--border-comic)',
                          backgroundColor: 'var(--bg-page)',
                          fontSize: '10px',
                          fontWeight: 800,
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {gear.spec}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: '17px',
                        fontWeight: 900,
                        margin: '0 0 8px',
                        color: 'var(--text-main)',
                        fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                      }}
                    >
                      {isAr ? gear.titleAr : gear.titleEn}
                    </h3>
                    <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-muted)', margin: 0 }}>
                      {isAr ? gear.descAr : gear.descEn}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: 'var(--text-main)',
                      paddingTop: '10px',
                      borderTop: '2px dashed var(--border-comic)',
                    }}
                  >
                    <CheckCircle2 size={14} color="#ccff00" />
                    <span>{isAr ? 'مملوكة ومجهزة لمواقع العمل' : 'ON-SET READY KIT'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODE 3: WORKFLOW CARTOON PIPELINE */}
        {activeDeckMode === 'workflow' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '20px',
            }}
          >
            {workflowSteps.map((ws) => (
              <div
                key={ws.step}
                className="comic-panel"
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: '20px',
                  border: '3.5px solid var(--border-comic)',
                  boxShadow: '6px 6px 0px var(--shadow-comic)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-14px',
                    right: isAr ? 'auto' : '20px',
                    left: isAr ? '20px' : 'auto',
                    backgroundColor: ws.bg,
                    border: '2.5px solid #000000',
                    color: '#000000',
                    padding: '2px 10px',
                    borderRadius: '8px',
                    fontFamily: 'Bangers, Cairo, cursive',
                    fontSize: '16px',
                    fontWeight: 900,
                    boxShadow: '2.5px 2.5px 0px #000000',
                  }}
                >
                  STAGE {ws.step}
                </div>

                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 900,
                    marginTop: '8px',
                    marginBottom: '4px',
                    color: 'var(--text-main)',
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                  }}
                >
                  {isAr ? ws.titleAr : ws.titleEn}
                </h3>
                <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-muted)', margin: 0 }}>
                  {isAr ? ws.descAr : ws.descEn}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
