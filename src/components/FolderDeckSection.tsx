import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA, type Language, type Project } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ComicBadge } from './comic/ComicElements';
import {
  Camera,
  Users,
  Sparkles,
  ArrowUpRight,
  Play,
  Film,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FolderDeckSectionProps {
  lang: Language;
  onOpenProject: (project: Project) => void;
  onSelectBrand?: (brandName: string) => void;
}

export const FolderDeckSection: React.FC<FolderDeckSectionProps> = ({
  lang,
  onOpenProject,
  onSelectBrand,
}) => {
  const isAr = lang === 'ar';
  const projects = PORTFOLIO_DATA.projects;
  const brands = PORTFOLIO_DATA.brands;
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const ctx = gsap.context(() => {
      gsap.from('.folder-dossier-card', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: deck,
          start: 'top 85%',
        },
      });
    }, deck);

    return () => ctx.revert();
  }, []);

  // Selected project for preview in Folder 2
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const currentProject = projects[activeProjectIndex] || projects[0];

  // Interactive Quick Brief state for Folder 4
  const [briefGoal, setBriefGoal] = useState<'reel' | 'campaign' | 'ugc'>('reel');
  const [briefSent, setBriefSent] = useState<boolean>(false);

  // Creative Gear list for Folder 1
  const gearItems = [
    { name: 'Sony FX3', type: 'Cinema 4K', color: '#161826', accent: '#ccff00' },
    { name: 'DaVinci', type: 'Color Grade', color: '#1b1424', accent: '#ff3366' },
    { name: 'DJI RS3', type: 'Stabilizer', color: '#141e24', accent: '#00e5ff' },
    { name: 'Premiere', type: 'Rhythm Cut', color: '#241e14', accent: '#ffe600' },
    { name: 'Aputure', type: 'Studio Light', color: '#1a1b24', accent: '#ffffff' },
  ];

  const handleLaunchWhatsAppBrief = () => {
    sound.playChime();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ccff00', '#00e5ff', '#ffe600', '#ff3366'],
    });

    const goalText =
      briefGoal === 'reel'
        ? (isAr ? 'ريلز إعلاني فيروسي' : 'Viral Promo Reel')
        : briefGoal === 'campaign'
        ? (isAr ? 'حملة تسويقية متكاملة' : 'Full Brand Campaign')
        : (isAr ? 'محتوى UGC عالي التحويل' : 'High-Conversion UGC');

    const message = isAr
      ? `مرحباً مهند، أود بدء مشروع فيديو جديد معكم:\nنوع المشروع: ${goalText}\nأرجو تزويدي بالخطة وعرض الأسعار.`
      : `Hello Mohanad, I'd like to collaborate on a new video project:\nProject Type: ${goalText}\nPlease share your workflow and quote.`;

    window.open(`https://wa.me/201023456789?text=${encodeURIComponent(message)}`, '_blank');
    setBriefSent(true);
    setTimeout(() => setBriefSent(false), 3000);
  };

  return (
    <section
      ref={deckRef}
      id="folder-deck"
      className="comic-halftone-bg"
      style={{
        position: 'relative',
        width: '100%',
        padding: '110px clamp(16px, 4vw, 50px) 90px',
        backgroundColor: '#0a0b12',
        borderTop: '4px solid #000000',
        borderBottom: '4px solid #000000',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '880px', marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <ComicBadge text="CLASSIFIED ARCHIVE" subtext="DOSSIER DECK" bg="#ffe600" rotation={-2} />
            <span
              style={{
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#ccff00',
                fontWeight: 900,
                textTransform: 'uppercase',
              }}
            >
              ★ 4 PHYSICAL TACTICAL DOSSIERS
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
            {isAr ? 'ملفات العمليات السرية — غرف الإنتاج والمشاريع' : 'THE CLASSIFIED PRODUCTION DOSSIERS'}
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.3vw, 17px)',
              color: '#c5c8dc',
              lineHeight: 1.7,
              margin: 0,
              fontWeight: 600,
              fontFamily: isAr ? 'var(--font-body-ar)' : 'Space Grotesk, sans-serif',
            }}
          >
            {isAr
              ? 'أربع ملفات حية تجمع بين عتاد التصوير السينمائي، أرشيف المشاريع المصورة، شبكة الشركاء الحليفة، ومحرك الاتفاق الفوري.'
              : 'Four physical tactical dossiers containing cinema hardware specs, project previews, brand constellation, and instant launch brief.'}
          </p>
        </div>

        {/* Responsive 4-Column Folder Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {/* ========================================================================= */}
          {/* FOLDER 1: The Production Tools & Gear */}
          {/* ========================================================================= */}
          <div
            className="folder-dossier-card comic-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '24px',
              backgroundColor: '#141622',
              border: '3.5px solid #000000',
              boxShadow: '6px 6px 0px #000000',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            onMouseEnter={(e) => {
              sound.playHover();
              (e.currentTarget as HTMLElement).style.transform = 'translate(-4px, -4px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '8px 8px 0px #ff3366';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #000000';
            }}
            onClick={() => sound.playClick()}
          >
            {/* Folder Notch Tab */}
            <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '10px 10px 0 0',
                  backgroundColor: '#ff3366',
                  color: '#ffffff',
                  border: '2.5px solid #000000',
                  borderBottom: 'none',
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: 'JetBrains Mono, monospace',
                  boxShadow: '2px -2px 0px #000000',
                }}
              >
                <Camera size={14} color="#ffffff" />
                <span>{isAr ? 'عتاد الإنتاج والإخراج' : 'PRODUCTION RIG'}</span>
              </div>
            </div>

            {/* Folder Interior Content */}
            <div
              style={{
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#12131d',
                borderTop: '3px solid #000000',
              }}
            >
              {/* Interactive Fanning Gear Cards */}
              <div className="gear-fan-container" style={{ margin: '15px 0 25px' }}>
                {gearItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="gear-fan-card"
                    style={{
                      backgroundColor: item.color,
                      border: '2px solid #000000',
                      boxShadow: '3px 3px 0px #000000',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '12px 10px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.accent }} />
                      <span style={{ fontSize: '9px', color: item.accent, fontFamily: 'JetBrains Mono, monospace', fontWeight: 900 }}>
                        0{idx + 1}
                      </span>
                    </div>
                    <div>
                      <div style={{ color: '#ffffff', fontSize: '11px', fontWeight: 900 }}>{item.name}</div>
                      <div style={{ color: item.accent, fontSize: '9px', fontWeight: 700 }}>{item.type}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    color: '#ffffff',
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                    marginBottom: '8px',
                    lineHeight: 1.25,
                    filter: 'drop-shadow(2px 2px 0px #000000)',
                  }}
                >
                  {isAr ? 'العدة اللي بصوّر وببني بيها.' : 'The Suite I Direct & Shoot With.'}
                </h3>
                <p style={{ fontSize: '13px', color: '#c5c8dc', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  {isAr
                    ? 'كاميرات سينمائية سوني، عدسات أنامورفيك، وألوان دافينشي ريزولف لضمان هوية بصرية لا تُنسى.'
                    : 'Cinema cameras, anamorphic glass, and DaVinci color grading engineered for maximum viral retention.'}
                </p>
              </div>

              {/* Tool Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '18px' }}>
                {['Sony FX3', 'DaVinci', 'DJI RS3', 'Premiere', '4K 120FPS'].map((tool, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#000000',
                      border: '1.5px solid #000000',
                      color: '#ccff00',
                      fontSize: '11px',
                      fontWeight: 800,
                      fontFamily: 'JetBrains Mono, monospace',
                      boxShadow: '2px 2px 0px #000000',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FOLDER 2: Projects Dossier */}
          {/* ========================================================================= */}
          <div
            className="folder-dossier-card comic-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '24px',
              backgroundColor: '#141622',
              border: '3.5px solid #000000',
              boxShadow: '6px 6px 0px #000000',
              overflow: 'hidden',
              transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            onMouseEnter={(e) => {
              sound.playHover();
              (e.currentTarget as HTMLElement).style.transform = 'translate(-4px, -4px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '8px 8px 0px #00e5ff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #000000';
            }}
          >
            {/* Folder Notch Tab */}
            <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '10px 10px 0 0',
                  backgroundColor: '#00e5ff',
                  color: '#000000',
                  border: '2.5px solid #000000',
                  borderBottom: 'none',
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: 'JetBrains Mono, monospace',
                  boxShadow: '2px -2px 0px #000000',
                }}
              >
                <Film size={14} color="#000000" />
                <span>
                  {isAr ? currentProject.brand_ar : currentProject.brand} • {currentProject.duration}
                </span>
              </div>
            </div>

            {/* Folder Interior Content */}
            <div
              style={{
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#12131d',
                borderTop: '3px solid #000000',
              }}
            >
              {/* Mini Preview Box */}
              <div
                onClick={() => {
                  sound.playClick();
                  onOpenProject(currentProject);
                }}
                style={{
                  position: 'relative',
                  height: '145px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#000000',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  marginBottom: '16px',
                }}
              >
                <img
                  src={currentProject.thumbnail}
                  alt={currentProject.title_en}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: '#ccff00',
                      border: '2.5px solid #000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000000',
                      boxShadow: '3px 3px 0px #000000',
                    }}
                  >
                    <Play size={20} fill="#000000" />
                  </div>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '12px',
                    right: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 900,
                  }}
                >
                  <span style={{ color: '#ccff00' }}>● {currentProject.aspect_ratio}</span>
                  <span>{isAr ? 'اضغط للمشاهدة 🎬' : 'Tap to Watch 🎬'}</span>
                </div>
              </div>

              {/* Title & Open Action */}
              <div>
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    color: '#ffffff',
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                    marginBottom: '6px',
                    filter: 'drop-shadow(2px 2px 0px #000000)',
                  }}
                >
                  {isAr ? 'أرشيف المشاريع' : 'Featured Works'}
                </h3>
                <p style={{ fontSize: '13px', color: '#c5c8dc', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                  {isAr ? 'افتح الفولدر، وتعرّف على تفاصيل الحملة وأرقام الاستبقاء.' : 'Open dossier. Inspect campaigns & viral metrics.'}
                </p>
              </div>

              {/* Quick Project Switcher Pills */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
                {projects.slice(0, 4).map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveProjectIndex(idx);
                    }}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '8px',
                      border: '2px solid #000000',
                      backgroundColor: activeProjectIndex === idx ? '#00e5ff' : '#0a0a10',
                      color: activeProjectIndex === idx ? '#000000' : '#c5c8dc',
                      fontSize: '11px',
                      fontWeight: 900,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxShadow: activeProjectIndex === idx ? '2px 2px 0px #000000' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isAr ? proj.brand_ar : proj.brand}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FOLDER 3: 20+ Success Partners */}
          {/* ========================================================================= */}
          <div
            className="folder-dossier-card comic-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '24px',
              backgroundColor: '#141622',
              border: '3.5px solid #000000',
              boxShadow: '6px 6px 0px #000000',
              overflow: 'hidden',
              transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            onMouseEnter={(e) => {
              sound.playHover();
              (e.currentTarget as HTMLElement).style.transform = 'translate(-4px, -4px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '8px 8px 0px #ffe600';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #000000';
            }}
          >
            {/* Folder Notch Tab */}
            <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '10px 10px 0 0',
                  backgroundColor: '#ffe600',
                  color: '#000000',
                  border: '2.5px solid #000000',
                  borderBottom: 'none',
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: 'JetBrains Mono, monospace',
                  boxShadow: '2px -2px 0px #000000',
                }}
              >
                <Users size={14} color="#000000" />
                <span>{isAr ? 'شبكة الشركاء' : 'BRAND ALLIES'}</span>
              </div>
            </div>

            {/* Folder Interior Content */}
            <div
              style={{
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#12131d',
                borderTop: '3px solid #000000',
              }}
            >
              {/* Partner Badges Visual */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                {brands.slice(0, 4).map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      sound.playClick();
                      if (onSelectBrand) onSelectBrand(b.name);
                    }}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      backgroundColor: '#0a0b12',
                      border: '2px solid #000000',
                      boxShadow: '3px 3px 0px #000000',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translate(-2px, -2px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0px #ffe600';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '3px 3px 0px #000000';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#ffffff' }}>
                        {isAr ? b.name_ar : b.name}
                      </span>
                      <ArrowUpRight size={14} color="#ffe600" />
                    </div>
                    <span style={{ fontSize: '10px', color: '#ccff00', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                      {b.badge}
                    </span>
                  </div>
                ))}
              </div>

              {/* Title & Trust Metric */}
              <div>
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    color: '#ffffff',
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                    marginBottom: '6px',
                    filter: 'drop-shadow(2px 2px 0px #000000)',
                  }}
                >
                  {isAr ? '+20 شريك نجاح' : '20+ Success Partners'}
                </h3>
                <p style={{ fontSize: '13px', color: '#c5c8dc', margin: 0, fontWeight: 500 }}>
                  {isAr ? 'نبني الثقة، ونحقق أعلى عائد على الاستثمار الإعلاني.' : 'Building trust, project by project.'}
                </p>
              </div>

              {/* Quantitative Metrics Row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '2px solid #000000',
                  marginTop: '16px',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#ffe600',
                  fontWeight: 900,
                }}
              >
                <span>⭐ 100K+ Followers</span>
                <span style={{ color: '#ccff00' }}>● 94% Avg Retention</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FOLDER 4: Start Your Campaign Direct Brief */}
          {/* ========================================================================= */}
          <div
            className="folder-dossier-card comic-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '24px',
              backgroundColor: '#141622',
              border: '3.5px solid #000000',
              boxShadow: '6px 6px 0px #000000',
              overflow: 'hidden',
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
            {/* Folder Notch Tab */}
            <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '10px 10px 0 0',
                  backgroundColor: '#ccff00',
                  color: '#000000',
                  border: '2.5px solid #000000',
                  borderBottom: 'none',
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: 'JetBrains Mono, monospace',
                  boxShadow: '2px -2px 0px #000000',
                }}
              >
                <Sparkles size={14} color="#000000" />
                <span>{isAr ? 'ابدأ مشروعك' : 'START CAMPAIGN'}</span>
              </div>
            </div>

            {/* Folder Interior Content */}
            <div
              style={{
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#12131d',
                borderTop: '3px solid #000000',
              }}
            >
              {/* Interactive Quick Brief Selector */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: '#0a0b12',
                  border: '2.5px solid #000000',
                  boxShadow: '3px 3px 0px #000000',
                  marginBottom: '16px',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 900, color: '#ccff00', marginBottom: '10px', fontFamily: 'JetBrains Mono, monospace' }}>
                  {isAr ? 'اختر هدف الحملة:' : 'SELECT CAMPAIGN FOCUS:'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: 'reel', labelEn: 'Viral Promo Reel', labelAr: 'ريلز إعلاني فيروسي' },
                    { id: 'campaign', labelEn: 'Integrated Campaign', labelAr: 'حملة إعلانية متكاملة' },
                    { id: 'ugc', labelEn: 'UGC & Hook Creation', labelAr: 'صناعة محتوى UGC وهوكس' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        sound.playClick();
                        setBriefGoal(opt.id as 'reel' | 'campaign' | 'ugc');
                      }}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: briefGoal === opt.id ? '#ccff00' : '#141624',
                        color: briefGoal === opt.id ? '#000000' : '#ffffff',
                        border: '2px solid #000000',
                        fontSize: '12px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        textAlign: isAr ? 'right' : 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: briefGoal === opt.id ? '2px 2px 0px #000000' : 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{isAr ? opt.labelAr : opt.labelEn}</span>
                      {briefGoal === opt.id && <CheckCircle2 size={14} color="#000000" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Action Question */}
              <div>
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    color: '#ffffff',
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                    marginBottom: '6px',
                    filter: 'drop-shadow(2px 2px 0px #000000)',
                  }}
                >
                  {isAr ? 'عندك فكرة إعلان؟' : 'Ready to collaborate?'}
                </h3>
                <p style={{ fontSize: '13px', color: '#c5c8dc', margin: 0, fontWeight: 500 }}>
                  {isAr ? 'اضغط وتواصل مع مهند واتساب مباشرة.' : 'Let’s shoot something iconic together.'}
                </p>
              </div>

              {/* Direct Launch WhatsApp Button */}
              <button
                onClick={handleLaunchWhatsAppBrief}
                className="comic-btn"
                style={{
                  marginTop: '18px',
                  width: '100%',
                  padding: '12px 18px',
                  backgroundColor: briefSent ? '#22c55e' : '#25D366',
                  color: '#000000',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  fontWeight: 900,
                  fontSize: '13px',
                }}
              >
                <MessageCircle size={18} color="#000000" />
                <span>{briefSent ? (isAr ? 'تم الإرسال!' : 'Sent!') : (isAr ? 'تواصل واتساب مباشر' : 'Launch WhatsApp')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};