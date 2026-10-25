import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ComicBadge, ComicStars } from './comic/ComicElements';
import {
  Zap,
  Film,
  TrendingUp,
  Target,
  Volume2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StorytellingReelBreakdownProps {
  lang: Language;
}

export const StorytellingReelBreakdown: React.FC<StorytellingReelBreakdownProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: '01',
      timecode: '00:01.20',
      titleEn: 'The Pattern Interrupt Hook',
      titleAr: 'الهوك: كسر النمط في أول 3 ثوانٍ',
      descEn:
        'Stopping the scroll in less than 400 milliseconds using unexpected visual framing, punchy sound design, and micro-suspense before introducing the brand.',
      descAr:
        'إيقاف التمرير في أقل من 400 جزء من الثانية باستخدام زاوية تصوير غير متوقعة، تصميم صوتي مكثف، ولحظة ترقّب بصرية قبل ذكر اسم البراند.',
      image: '/assets/images/blaban_dessert.jpg',
      metricEn: '96% Hook Retention',
      metricAr: '96% نسبة البقاء بعد أول 3 ثوانٍ',
      tag: 'VISUAL SHOCK',
      burst: 'BOOM!',
      icon: Zap,
      accent: '#ccff00',
    },
    {
      id: '02',
      timecode: '00:08.50',
      titleEn: 'Macro Cinematography & Tactile Flow',
      titleAr: 'التصوير السينمائي الماكرو وتدفق المشاهد',
      descEn:
        'Engaging the viewer’s senses through extreme close-ups, slow-motion fluid movements, and continuous rhythmic camera motion with the Sony FX3.',
      descAr:
        'مخاطبة حواس المشاهد بلقطات ماكرو فائقة الدقة وحركة كاميرا انسيابية بدون توقف بالكاميرا السينمائية Sony FX3 لإبراز جودة المنتج.',
      image: '/assets/images/vandoti_waffle.jpg',
      metricEn: '4K • 120FPS Slow-Mo',
      metricAr: 'تصوير بطيء 4K 120FPS',
      tag: 'SENSORY FLOW',
      burst: 'SMOOTH!',
      icon: Film,
      accent: '#00e5ff',
    },
    {
      id: '03',
      timecode: '00:17.15',
      titleEn: 'Organic Brand Integration',
      titleAr: 'الدمج الإعلاني الذكي داخل السرد',
      descEn:
        'Weaving the product seamlessly into an entertaining narrative so it feels like a lifestyle experience rather than an intrusive commercial sponsor.',
      descAr:
        'دمج المنتج كعنصر أساسي في القصة والتجربة الحقيقية، بحيث يشعر المشاهد بمتعة المحتوى دون الإحساس بأنه إعلان تجاري تقليدي.',
      image: '/assets/images/elaraby_tech.jpg',
      metricEn: '3.4x Higher Comments',
      metricAr: '3.4 أضعاف تفاعل وتعليقات عضوية',
      tag: 'NATIVE STORY',
      burst: 'ORGANIC!',
      icon: Target,
      accent: '#ffe600',
    },
    {
      id: '04',
      timecode: '00:29.80',
      titleEn: 'The Conversion & Retention Engine',
      titleAr: 'محرك التحويل والاستبقاء الفيروسي',
      descEn:
        'Ending with a memorable punchline and frictionless call-to-action engineered to drive direct saves, shares, and real customer footfall.',
      descAr:
        'الختام بنهاية ذكية ومحفّزة للحفظ والمشاركة، مع توجيه سلس يدفع الجمهور للزيارة والشراء وتحقيق أعلى وصول عضوي.',
      image: '/assets/images/domty_dairy.jpg',
      metricEn: '2M+ Viral Reach',
      metricAr: '+2 مليون وصول وتحويل مباشر',
      tag: 'VIRAL IMPACT',
      burst: 'VIRAL!',
      icon: TrendingUp,
      accent: '#ff3366',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    if (!container || !pinSection) return;

    const ctx = gsap.context(() => {
      const stepElements = gsap.utils.toArray<HTMLElement>('.scrolly-step-item');

      stepElements.forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            setActiveStep(index);
            sound.playHover();
          },
          onEnterBack: () => {
            setActiveStep(index);
            sound.playHover();
          },
        });
      });

      gsap.to('.scrolly-phone-mockup', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const currentStepData = steps[activeStep] || steps[0];

  return (
    <section
      ref={containerRef}
      id="scrolly-reel"
      className="comic-halftone-bg"
      style={{
        position: 'relative',
        backgroundColor: '#0a0b12',
        borderTop: '4px solid #000000',
        borderBottom: '4px solid #000000',
        padding: '110px clamp(16px, 4vw, 50px) 90px',
        overflow: 'hidden',
      }}
    >
      {/* Floating Decorative Comic Stars */}
      <div style={{ position: 'absolute', top: '40px', right: '5%', pointerEvents: 'none' }}>
        <ComicStars size={32} color="#ccff00" />
      </div>
      <div style={{ position: 'absolute', bottom: '60px', left: '4%', pointerEvents: 'none' }}>
        <ComicStars size={28} color="#ffe600" />
      </div>

      <div style={{ maxWidth: '1360px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '880px', marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <ComicBadge text="DEEP DIVE • LAB" subtext="REEL ANATOMY" bg="#ccff00" rotation={-2} />
            <span
              style={{
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#ffe600',
                fontWeight: 900,
                textTransform: 'uppercase',
              }}
            >
              ★ 4-PHASE VIRAL HOOK BLUEPRINT
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '16px',
              fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              filter: 'drop-shadow(3px 3px 0px #000000)',
            }}
          >
            {isAr ? 'تشريح الريلز الفيروسي — من الفكرة لملايين المشاهدات' : 'ANATOMY OF A VIRAL REEL — HIGH RETENTION BLUEPRINT'}
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.3vw, 17px)',
              color: '#d0d3e5',
              lineHeight: 1.7,
              margin: 0,
              fontWeight: 600,
              fontFamily: isAr ? 'var(--font-body-ar)' : 'Space Grotesk, sans-serif',
            }}
          >
            {isAr
              ? 'كيف نحول ثواني الفيديو المعدودة إلى قصة تلتصق بالأذهان وتحقق أعلى معدلات حفظ وتفاعل للعلامة التجارية؟ سكرول لاكتشاف الخطوات الأربع.'
              : 'Scroll to explore the 4-phase cinematic storytelling framework engineered to hook viewers instantly and deliver verified brand impact.'}
          </p>
        </div>

        {/* Scrollytelling Two-Column Layout */}
        <div
          ref={pinSectionRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(30px, 4vw, 60px)',
            alignItems: 'flex-start',
            position: 'relative',
          }}
        >
          {/* Column 1: Scrollytelling Comic Story Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', paddingBottom: '60px' }}>
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="comic-panel scrolly-step-item"
                  onClick={() => {
                    sound.playClick();
                    setActiveStep(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    padding: '32px',
                    borderRadius: '24px',
                    backgroundColor: isSelected ? '#151724' : '#10111a',
                    border: '3.5px solid #000000',
                    boxShadow: isSelected ? `8px 8px 0px ${step.accent}` : '5px 5px 0px #000000',
                    transform: isSelected ? (isAr ? 'translateX(-6px)' : 'translateX(6px)') : 'none',
                    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {/* Step Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          backgroundColor: step.accent,
                          color: '#000000',
                          border: '2.5px solid #000000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px',
                          fontWeight: 900,
                          fontFamily: 'JetBrains Mono, monospace',
                          boxShadow: '2px 2px 0px #000000',
                        }}
                      >
                        {step.id}
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          fontFamily: 'JetBrains Mono, monospace',
                          color: step.accent,
                          fontWeight: 900,
                        }}
                      >
                        {step.tag}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: '8px',
                          backgroundColor: '#000000',
                          border: '2px solid #000000',
                          fontSize: '11px',
                          fontFamily: 'JetBrains Mono, monospace',
                          color: '#ffffff',
                          fontWeight: 800,
                          boxShadow: '2px 2px 0px #000000',
                        }}
                      >
                        {step.timecode}
                      </span>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3
                    style={{
                      fontSize: 'clamp(20px, 2.2vw, 24px)',
                      fontWeight: 900,
                      color: '#ffffff',
                      fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                      marginBottom: '12px',
                      filter: 'drop-shadow(2px 2px 0px #000000)',
                    }}
                  >
                    {isAr ? step.titleAr : step.titleEn}
                  </h3>

                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: '#c5c8dc',
                      margin: 0,
                      fontFamily: isAr ? 'var(--font-body-ar)' : 'Space Grotesk, sans-serif',
                    }}
                  >
                    {isAr ? step.descAr : step.descEn}
                  </p>

                  {/* Metric Ribbon */}
                  <div
                    style={{
                      marginTop: '22px',
                      padding: '10px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#08080f',
                      border: '2.5px solid #000000',
                      boxShadow: '3px 3px 0px #000000',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: step.accent,
                      fontSize: '13px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 900,
                    }}
                  >
                    <Icon size={16} color={step.accent} />
                    <span>{isAr ? step.metricAr : step.metricEn}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 2: Pinned 9:16 Interactive Viewfinder & Reel HUD */}
          <div
            className="scrolly-phone-mockup"
            style={{
              position: 'sticky',
              top: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Phone Bezel Container */}
            <div
              style={{
                width: '100%',
                maxWidth: '350px',
                height: '610px',
                borderRadius: '34px',
                overflow: 'hidden',
                position: 'relative',
                border: '4.5px solid #000000',
                backgroundColor: '#000000',
                boxShadow: `10px 10px 0px ${currentStepData.accent}, 10px 10px 0px 4px #000000`,
                transition: 'box-shadow 0.35s ease',
              }}
            >
              {/* Dynamic Video Reel Image */}
              <img
                key={currentStepData.image}
                src={currentStepData.image}
                alt="Reel frame"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  animation: 'fadeIn 0.35s ease',
                }}
              />

              {/* Viewfinder Scrim & Cinematic Overlays */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 40%, rgba(0,0,0,0.88) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '22px',
                  pointerEvents: 'none',
                }}
              >
                {/* Top Viewfinder HUD */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        backgroundColor: '#000000',
                        border: '2px solid #000000',
                        boxShadow: '2px 2px 0px #000000',
                      }}
                    >
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#ff3366',
                          boxShadow: '0 0 8px #ff3366',
                        }}
                      />
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ffffff', fontWeight: 900 }}>
                        REC • 4K 120FPS
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '11px',
                        color: '#ccff00',
                        fontWeight: 900,
                        padding: '4px 8px',
                        borderRadius: '6px',
                        backgroundColor: '#000000',
                        border: '1.5px solid #000000',
                      }}
                    >
                      TC {currentStepData.timecode}
                    </span>
                  </div>

                  {/* Active Audio Waveform bars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px' }}>
                    <Volume2 size={14} color="#ccff00" />
                    <span className="bar-1" style={{ width: '3px', backgroundColor: '#ccff00', borderRadius: '1px' }} />
                    <span className="bar-2" style={{ width: '3px', backgroundColor: '#ccff00', borderRadius: '1px' }} />
                    <span className="bar-3" style={{ width: '3px', backgroundColor: '#ccff00', borderRadius: '1px' }} />
                    <span className="bar-4" style={{ width: '3px', backgroundColor: '#ccff00', borderRadius: '1px' }} />
                  </div>
                </div>

                {/* Center Framing Crosshairs */}
                <div style={{ alignSelf: 'center', opacity: 0.5 }}>
                  <svg width="44" height="44" viewBox="0 0 40 40">
                    <line x1="20" y1="5" x2="20" y2="15" stroke="#ccff00" strokeWidth="2" />
                    <line x1="20" y1="25" x2="20" y2="35" stroke="#ccff00" strokeWidth="2" />
                    <line x1="5" y1="20" x2="15" y2="20" stroke="#ccff00" strokeWidth="2" />
                    <line x1="25" y1="20" x2="35" y2="20" stroke="#ccff00" strokeWidth="2" />
                  </svg>
                </div>

                {/* Bottom Overlay Title & Live Tag */}
                <div>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      backgroundColor: currentStepData.accent,
                      color: '#000000',
                      border: '2px solid #000000',
                      fontSize: '11px',
                      fontWeight: 900,
                      fontFamily: 'JetBrains Mono, monospace',
                      boxShadow: '3px 3px 0px #000000',
                      marginBottom: '10px',
                    }}
                  >
                    PHASE {currentStepData.id} • {currentStepData.tag}
                  </div>

                  <div
                    style={{
                      fontSize: '17px',
                      fontWeight: 900,
                      color: '#ffffff',
                      fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                      lineHeight: 1.3,
                      filter: 'drop-shadow(2px 2px 0px #000000)',
                    }}
                  >
                    {isAr ? currentStepData.titleAr : currentStepData.titleEn}
                  </div>

                  <div style={{ fontSize: '11px', color: '#ccff00', fontFamily: 'JetBrains Mono, monospace', marginTop: '6px', fontWeight: 800 }}>
                    @{lang === 'en' ? 'mohanad.ahmed' : 'مهند.أحمد'} • 100K+ CREATOR
                  </div>
                </div>
              </div>

              {/* Progress Scrubber Bar at Bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '5px',
                  backgroundColor: '#000000',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${((activeStep + 1) / steps.length) * 100}%`,
                    backgroundColor: currentStepData.accent,
                    boxShadow: `0 0 10px ${currentStepData.accent}`,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* Quick Step Indicators */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sound.playClick();
                    setActiveStep(i);
                  }}
                  style={{
                    width: activeStep === i ? '32px' : '12px',
                    height: '12px',
                    borderRadius: '6px',
                    backgroundColor: activeStep === i ? s.accent : '#222533',
                    border: '2px solid #000000',
                    boxShadow: activeStep === i ? '2px 2px 0px #000000' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  aria-label={`Jump to step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
