import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { type Language } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { ComicBadge, ComicStars, DoodleArrow } from '../comic/ComicElements';
import { ArrowDown, Film, Zap, Flame, Video, Award, Target } from 'lucide-react';

interface Scene01IntroProps {
  lang: Language;
  onExplore?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export const Scene01Intro: React.FC<Scene01IntroProps> = ({ lang, onExplore }) => {
  const isAr = lang === 'ar';

  const introRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sunburstRef = useRef<HTMLDivElement>(null);
  const leftNameRef = useRef<HTMLDivElement>(null);
  const rightNameRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  // حالات التأثيرات التفاعلية عند النقر
  const [sfxWord, setSfxWord] = useState<{ text: string; id: number } | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  const firstName = isAr ? 'مُــــهَـنَّـد' : 'MOHANAD';
  const lastName = isAr ? 'أحْـمَــــد' : 'AHMED';

  // 1. الدخول الأولي الساحر بـ GSAP (Cinematic Slam & Expand)
  useEffect(() => {
    const el = introRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // دوران الخلفية الإشعاعية المستمر
      gsap.to(sunburstRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });

      const tl = gsap.timeline({ defaults: { ease: 'back.out(2.2)' } });

      // هبوط البورتريه مع ارتداد قوي كأنه ارتطم بالأرض
      tl.fromTo(
        cardRef.current,
        { scale: 0.1, y: -400, opacity: 0, rotate: -15 },
        { scale: 1, y: 0, opacity: 1, rotate: 0, duration: 1.1 }
      )
        // تفجير الاسم من اليمين واليسار في نفس اللحظة
        .fromTo(
          leftNameRef.current,
          { x: isAr ? 200 : -200, opacity: 0, scale: 0.6 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8 },
          '-=0.7'
        )
        .fromTo(
          rightNameRef.current,
          { x: isAr ? -200 : 200, opacity: 0, scale: 0.6 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8 },
          '-=0.8'
        )
        // فرقعة فقاعة الكلام والأوسمة
        .fromTo(
          bubbleRef.current,
          { scale: 0, opacity: 0, rotate: -25 },
          { scale: 1, opacity: 1, rotate: 2, duration: 0.6, ease: 'elastic.out(1.2, 0.5)' },
          '-=0.4'
        )
        .fromTo(
          '.comic-float-badge',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08 },
          '-=0.3'
        );
    }, el);

    return () => ctx.revert();
  }, [lang, isAr]);

  // 2. محاكاة الجيروسكوب والـ 3D Parallax بالماوس
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!introRef.current || !cardRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xRatio = (clientX / innerWidth - 0.5) * 2;
    const yRatio = (clientY / innerHeight - 0.5) * 2;

    // إمالة الكارت والظلال المجسمة
    gsap.to(cardRef.current, {
      rotateY: xRatio * 18,
      rotateX: -yRatio * 18,
      boxShadow: `${-xRatio * 25 + 18}px ${-yRatio * 25 + 18}px 0px #000000, ${-xRatio * 35 + 24}px ${-yRatio * 35 + 24}px 0px #ccff00`,
      duration: 0.35,
      ease: 'power2.out',
    });

    // تحريك الاسم يميناً ويساراً بعمق مختلف (Parallax)
    if (leftNameRef.current && rightNameRef.current) {
      gsap.to(leftNameRef.current, { x: xRatio * 20, y: yRatio * 15, duration: 0.4 });
      gsap.to(rightNameRef.current, { x: xRatio * -20, y: yRatio * 15, duration: 0.4 });
    }
  }, []);

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateY: 0,
        rotateX: 0,
        boxShadow: '18px 18px 0px #000000, 24px 24px 0px #ccff00',
        duration: 0.7,
        ease: 'back.out(2)',
      });
    }
    if (leftNameRef.current && rightNameRef.current) {
      gsap.to([leftNameRef.current, rightNameRef.current], { x: 0, y: 0, duration: 0.6 });
    }
  };

  // 3. تريك النقر المتفجر (Explosion Effect & Comic Dust Particles)
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    sound.playPop();

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // توليد شظايا كرتونية متطايرة
    const colors = ['#ccff00', '#ff2a5f', '#ffe600', '#ffffff'];
    const newParticles: Particle[] = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: clickX,
      y: clickY,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.floor(Math.random() * 14) + 8,
    }));

    setParticles(newParticles);

    // ظهور كلمة مؤثرات صوتية عشوائية
    const words = isAr
      ? ['بـووووم! 💥', 'طرااااخ! ⚡', 'أكـشـن! 🎬', 'عـااااش! 🔥', 'فـيـرم! 🚀']
      : ['BOOOOM! 💥', 'KABOOM! ⚡', 'ACTION! 🎬', 'SMASH! 🔨', 'UNREAL! 🚀'];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSfxWord({ text: randomWord, id: Date.now() });

    // زلزال الشاشة الكرتوني
    gsap.fromTo(
      introRef.current,
      { x: () => (Math.random() - 0.5) * 20, y: () => (Math.random() - 0.5) * 20 },
      { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(2.5, 0.15)' }
    );

    setTimeout(() => setSfxWord(null), 700);
    setTimeout(() => setParticles([]), 800);
  };

  return (
    <section
      ref={introRef}
      id="scene-intro"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="master-scene-stage comic-halftone-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#07080d',
        borderBottom: '6px solid #000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '90px 20px 40px',
        perspective: '1400px',
        direction: isAr ? 'rtl' : 'ltr',
      }}
    >
      {/* 1. خلفية الأشعة الدوارة الساحرة (Hypnotic Sunburst Background) */}
      <div
        ref={sunburstRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '180vw',
          height: '180vw',
          maxWidth: '2200px',
          maxHeight: '2200px',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.12,
          backgroundImage: `repeating-conic-gradient(
            from 0deg,
            #ccff00 0deg 15deg,
            transparent 15deg 30deg
          )`,
        }}
      />

      {/* الشريط العلوي الاحترافي */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: 'clamp(12px, 3.5vw, 50px)',
          right: 'clamp(12px, 3.5vw, 50px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          zIndex: 35,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <ComicBadge text="SPECIAL EDITION" subtext="2026" bg="#ccff00" rotation={-2} />
          <div
            className="hidden sm:block"
            style={{
              padding: '6px 14px',
              backgroundColor: '#121422',
              border: '2.5px solid #000000',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 900,
              boxShadow: '3px 3px 0px #000000',
            }}
          >
            ★ SUPREME HERO SPREAD
          </div>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 16px',
            backgroundColor: '#000000',
            border: '2.5px solid #ccff00',
            borderRadius: '100px',
            color: '#ffffff',
            fontSize: '11px',
            fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display)',
            fontWeight: 800,
            boxShadow: '0 0 18px rgba(204, 255, 0, 0.45)',
          }}
        >
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ccff00', animation: 'comic-pulse 1.3s infinite' }} />
          <span>{isAr ? 'متاح لتصوير الإعلانات الكبرى' : 'OPEN FOR BIG PRODUCTIONS'}</span>
        </div>
      </div>

      {/* نجوم ديكورية عائمة ثلاثية الأبعاد */}
      <div style={{ position: 'absolute', top: '16%', left: '6%', pointerEvents: 'none', zIndex: 4 }}>
        <ComicStars size={42} color="#ffe600" />
      </div>
      <div style={{ position: 'absolute', top: '24%', right: '7%', pointerEvents: 'none', zIndex: 4 }}>
        <ComicStars size={38} color="#ff2a5f" />
      </div>

      {/* 2. المحور المركزي الخارق: الاسم العملاق المشطور يميناً ويساراً مع الصورة البطلة بالوسط */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1440px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <div
          className="scene-intro-hero-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            position: 'relative',
            gap: 'clamp(14px, 2.5vw, 40px)',
          }}
        >
          {/* الجانب الأول: النصف الأول من الاسم + شارات حركية */}
          <div
            ref={leftNameRef}
            className="scene-intro-name-col"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: isAr ? 'flex-start' : 'flex-end',
              textAlign: isAr ? 'right' : 'right',
              zIndex: 12,
            }}
          >
            {/* شارة فوقية مائلة */}
            <div
              className="comic-float-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                backgroundColor: '#ff2a5f',
                border: '3px solid #000000',
                borderRadius: '8px',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '13px',
                fontFamily: 'JetBrains Mono, monospace',
                boxShadow: '4px 4px 0px #000000',
                transform: 'rotate(-4deg)',
                marginBottom: '10px',
              }}
            >
              <Flame size={16} color="#ffe600" />
              <span>{isAr ? 'المخرج السينمائي' : 'FILM DIRECTOR'}</span>
            </div>

            {/* الاسم الأول الضخم بتأثير 3D Block Typography */}
            <h1
              style={{
                fontSize: 'clamp(3.8rem, 8.5vw, 8.5rem)',
                fontWeight: 900,
                lineHeight: 0.85,
                color: '#ffffff',
                margin: 0,
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                textShadow: '8px 8px 0px #000000, 14px 14px 0px #ff2a5f',
                letterSpacing: isAr ? 'normal' : '-0.04em',
                userSelect: 'none',
              }}
            >
              {firstName}
            </h1>

            {/* شارة إحصائية متوهجة */}
            <div
              className="comic-float-badge"
              style={{
                marginTop: '16px',
                padding: '10px 18px',
                backgroundColor: '#ffffff',
                border: '3.5px solid #000000',
                borderRadius: '14px',
                boxShadow: '5px 5px 0px #000000',
                color: '#000000',
                fontWeight: 900,
                fontSize: '14px',
                fontFamily: 'JetBrains Mono, monospace',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transform: 'rotate(2.5deg)',
              }}
            >
              <Award size={18} color="#ff2a5f" />
              <span>20M+ VIEWS IMPACT</span>
            </div>
          </div>

          {/* المركز: الصورة الكرتونية العملاقة مع تأثير كسر الإطار والتفاعل */}
          <div
            ref={cardContainerRef}
            style={{
              position: 'relative',
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 15,
            }}
          >
            {/* بطاقة الصورة الكرتونية ثلاثية الأبعاد */}
            <div
              ref={cardRef}
              onClick={handleCardClick}
              style={{
                position: 'relative',
                width: 'clamp(290px, 32vw, 440px)',
                height: 'clamp(380px, 42vw, 570px)',
                borderRadius: '38px',
                border: '7px solid #000000',
                backgroundColor: '#111320',
                boxShadow: '18px 18px 0px #000000, 24px 24px 0px #ccff00',
                overflow: 'hidden',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                transition: 'border-color 0.2s ease',
              }}
            >
              {/* الصورة */}
              <img
                src="/assets/images/mohanad_cartoon_avatar.jpg"
                alt="Mohanad Ahmed — Cartoon Avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />

              {/* شريط معلومات سينمائي تفاعلي أسفل الصورة */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  padding: '10px 14px',
                  backgroundColor: 'rgba(5, 7, 14, 0.92)',
                  backdropFilter: 'blur(8px)',
                  border: '3px solid #000000',
                  borderRadius: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 900,
                  boxShadow: '3px 3px 0px #000000',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Film size={16} color="#ccff00" />
                  <span style={{ color: '#ccff00' }}>FX3 RIG / MASTER</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Target size={14} color="#ffe600" />
                  <span>4K 10-BIT</span>
                </div>
              </div>

              {/* الشظايا المتطايرة عند النقر على الصورة (Comic Burst Particles) */}
              {particles.map((p) => (
                <div
                  key={p.id}
                  style={{
                    position: 'absolute',
                    left: `${p.x}px`,
                    top: `${p.y}px`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                    border: '2px solid #000',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    animation: 'comic-particle 0.7s ease-out forwards',
                  }}
                />
              ))}
            </div>

            {/* كلمة المؤثرات الصوتية المتفجرة (BOOM / ACTION) عند الضغط */}
            {sfxWord && (
              <div
                key={sfxWord.id}
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-10deg)',
                  zIndex: 30,
                  pointerEvents: 'none',
                  backgroundColor: '#ffe600',
                  color: '#000000',
                  border: '5px solid #000000',
                  borderRadius: '20px',
                  padding: '14px 30px',
                  fontSize: 'clamp(28px, 4vw, 46px)',
                  fontWeight: 900,
                  fontFamily: 'JetBrains Mono, monospace',
                  boxShadow: '10px 10px 0px #000000, 10px 10px 0px 4px #ff2a5f',
                  animation: 'comic-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                  whiteSpace: 'nowrap',
                }}
              >
                {sfxWord.text}
              </div>
            )}

            {/* فقاعة الحوار الكرتونية الطافية أعلى الرأس */}
            <div
              ref={bubbleRef}
              style={{
                position: 'absolute',
                top: '-42px',
                zIndex: 25,
                transform: 'rotate(-2deg)',
              }}
            >

            </div>
          </div>

          {/* الجانب الثاني: النصف الثاني من الاسم + شارات حركية */}
          <div
            ref={rightNameRef}
            className="scene-intro-name-col"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: isAr ? 'flex-end' : 'flex-start',
              textAlign: isAr ? 'left' : 'left',
              zIndex: 12,
            }}
          >
            {/* شارة نوع المحتوى */}
            <div
              className="comic-float-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                backgroundColor: '#ccff00',
                border: '3px solid #000000',
                borderRadius: '8px',
                color: '#000000',
                fontWeight: 900,
                fontSize: '13px',
                fontFamily: 'JetBrains Mono, monospace',
                boxShadow: '4px 4px 0px #000000',
                transform: 'rotate(4deg)',
                marginBottom: '10px',
              }}
            >
              <Video size={16} color="#000000" />
              <span>{isAr ? 'صانع محتوى UGC' : 'VIRAL UGC CREATOR'}</span>
            </div>

            {/* الاسم الثاني الضخم */}
            <h1
              style={{
                fontSize: 'clamp(3.8rem, 8.5vw, 8.5rem)',
                fontWeight: 900,
                lineHeight: 0.85,
                color: '#ccff00',
                margin: 0,
                fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                textShadow: '8px 8px 0px #000000, 14px 14px 0px #ffe600',
                letterSpacing: isAr ? 'normal' : '-0.04em',
                userSelect: 'none',
              }}
            >
              {lastName}
            </h1>

            {/* شارة إحصائية ثانية */}
            <div
              className="comic-float-badge"
              style={{
                marginTop: '16px',
                padding: '10px 18px',
                backgroundColor: '#ffe600',
                border: '3.5px solid #000000',
                borderRadius: '14px',
                boxShadow: '5px 5px 0px #000000',
                color: '#000000',
                fontWeight: 900,
                fontSize: '14px',
                fontFamily: 'JetBrains Mono, monospace',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transform: 'rotate(-3deg)',
              }}
            >
              <Zap size={18} color="#000000" />
              <span>100K+ COMMUNITY</span>
            </div>
          </div>
        </div>

        {/* 3. صندوق السرد والوصف (Comic Narrative Box) */}
        <div
          className="comic-float-badge"
          style={{
            backgroundColor: '#151726',
            border: '3.5px solid #000000',
            borderRadius: '18px',
            padding: '14px 32px',
            boxShadow: '7px 7px 0px #ccff00, 7px 7px 0px 3.5px #000000',
            maxWidth: '720px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              lineHeight: 1.6,
              color: '#f0f1f8',
              fontWeight: 600,
              fontFamily: isAr ? 'var(--font-body-ar)' : 'Space Grotesk, sans-serif',
            }}
          >
            {isAr
              ? 'صناعة إعلانات سينمائية ومحتوى فائق الجاذبية يحول المشاهدات إلى مبيعات حقيقية.'
              : 'Fusing cinema-grade direction with high-retention UGC hooks for Egypt and Middle East’s biggest brands.'}
          </p>
        </div>

        {/* 4. زر الاستكشاف والتمرير التفاعلي */}
        <div
          onClick={() => {
            sound.playClick();
            if (onExplore) {
              onExplore();
            } else {
              const next = document.querySelector('#scene-about');
              if (next) next.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            marginTop: '2px',
          }}
        >
          <button
            className="comic-btn"
            data-cursor="NEXT PANEL"
            style={{
              padding: '14px 36px',
              fontSize: '16px',
              boxShadow: '6px 6px 0px #000000',
            }}
          >
            <span>{isAr ? 'تصفح القصة كاملة' : 'ENTER EPISODE'}</span>
            <ArrowDown size={20} strokeWidth={3} />
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#ccff00',
              fontSize: '12px',
              fontWeight: 900,
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            <DoodleArrow direction="right" width={40} height={18} color="#ccff00" />
            <span>{isAr ? 'مرر للأسفل للمزيد' : 'SCROLL DOWN'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};