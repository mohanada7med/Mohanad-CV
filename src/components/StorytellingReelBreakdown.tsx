import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import {
  Sparkles,
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
      icon: Zap,
      accent: '#ffffff',
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
      icon: Film,
      accent: '#ffffff',
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
      icon: Target,
      accent: '#ffffff',
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
      icon: TrendingUp,
      accent: '#ffffff',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    if (!container || !pinSection) return;

    // Use gsap.context for clean scoping and React 19 safety
    const ctx = gsap.context(() => {
      // Step cards scroll triggers
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

      // Subtle parallax on the phone container
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
      style={{
        position: 'relative',
        backgroundColor: '#070709',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '100px 24px',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ maxWidth: '850px', marginBottom: '70px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '100px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={13} />
            <span>SCROLLYTELLING BREAKDOWN</span>
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '18px',
            }}
          >
            {isAr ? 'تشريح الريلز الفيروسي — من الفكرة لملايين المشاهدات' : 'Anatomy of a Viral Reel — Built for High Retention'}
          </h2>

          <p style={{ fontSize: '16px', color: '#8d90a0', lineHeight: 1.7, margin: 0 }}>
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
            gap: '50px',
            alignItems: 'flex-start',
            position: 'relative',
          }}
        >
          {/* Column 1: Scrollytelling Story Cards that scrub on scroll */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '60px' }}>
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="scrolly-step-item"
                  onClick={() => {
                    sound.playClick();
                    setActiveStep(idx);
                  }}
                  style={{
                    padding: '36px',
                    borderRadius: '28px',
                    backgroundColor: isSelected ? 'rgba(20, 22, 30, 0.95)' : 'rgba(12, 13, 18, 0.6)',
                    border: isSelected ? `1px solid ${step.accent}` : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isSelected
                      ? `0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px ${step.accent}25`
                      : '0 10px 30px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {/* Step Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '12px',
                          backgroundColor: isSelected ? step.accent : 'rgba(255, 255, 255, 0.06)',
                          color: isSelected ? '#070709' : '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 900,
                          fontFamily: 'JetBrains Mono, monospace',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {step.id}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontFamily: 'JetBrains Mono, monospace',
                          color: isSelected ? step.accent : '#8d90a0',
                          fontWeight: 700,
                        }}
                      >
                        {step.tag}
                      </span>
                    </div>

                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '100px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '11px',
                        fontFamily: 'JetBrains Mono, monospace',
                        color: '#ccd5c9',
                      }}
                    >
                      {step.timecode}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3
                    style={{
                      fontSize: '24px',
                      fontWeight: 800,
                      color: '#ffffff',
                      fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                      marginBottom: '12px',
                    }}
                  >
                    {isAr ? step.titleAr : step.titleEn}
                  </h3>

                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#b0b4c5', margin: 0 }}>
                    {isAr ? step.descAr : step.descEn}
                  </p>

                  {/* Metric Ribbon */}
                  <div
                    style={{
                      marginTop: '20px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: step.accent,
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 700,
                    }}
                  >
                    <Icon size={14} />
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
                maxWidth: '340px',
                height: '600px',
                borderRadius: '36px',
                overflow: 'hidden',
                position: 'relative',
                border: '4px solid #1a1c26',
                backgroundColor: '#000000',
                boxShadow: `0 30px 90px rgba(0, 0, 0, 0.9), 0 0 50px ${currentStepData.accent}30`,
                transition: 'box-shadow 0.4s ease',
              }}
            >
              {/* Dynamic Video Reel Image (Fades based on active step) */}
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
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, transparent 40%, rgba(0,0,0,0.85) 100%)',
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff' }} />
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ffffff', fontWeight: 800 }}>
                        REC • 4K
                      </span>
                    </div>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ffffff' }}>
                      TC {currentStepData.timecode}
                    </span>
                  </div>

                  {/* Active Audio Waveform bars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '10px' }}>
                    <Volume2 size={12} color="#ffffff" />
                    <span className="bar-1" style={{ width: '2px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
                    <span className="bar-2" style={{ width: '2px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
                    <span className="bar-3" style={{ width: '2px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
                    <span className="bar-4" style={{ width: '2px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
                  </div>
                </div>

                {/* Center Framing Crosshairs */}
                <div style={{ alignSelf: 'center', opacity: 0.4 }}>
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <line x1="20" y1="5" x2="20" y2="15" stroke="#ffffff" strokeWidth="1.5" />
                    <line x1="20" y1="25" x2="20" y2="35" stroke="#ffffff" strokeWidth="1.5" />
                    <line x1="5" y1="20" x2="15" y2="20" stroke="#ffffff" strokeWidth="1.5" />
                    <line x1="25" y1="20" x2="35" y2="20" stroke="#ffffff" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Bottom Overlay Title & Live Tag */}
                <div>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: currentStepData.accent,
                      color: '#070709',
                      fontSize: '10px',
                      fontWeight: 800,
                      fontFamily: 'JetBrains Mono, monospace',
                      marginBottom: '8px',
                    }}
                  >
                    PHASE {currentStepData.id} • {currentStepData.tag}
                  </div>

                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: 800,
                      color: '#ffffff',
                      fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                      lineHeight: 1.3,
                    }}
                  >
                    {isAr ? currentStepData.titleAr : currentStepData.titleEn}
                  </div>

                  <div style={{ fontSize: '11px', color: '#b0b4c5', fontFamily: 'JetBrains Mono, monospace', marginTop: '4px' }}>
                    @{lang === 'en' ? 'mohanad.ahmed' : 'مهند.أحمد'}
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
                  height: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sound.playClick();
                    setActiveStep(i);
                  }}
                  style={{
                    width: activeStep === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '100px',
                    backgroundColor: activeStep === i ? '#ccff00' : 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
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
