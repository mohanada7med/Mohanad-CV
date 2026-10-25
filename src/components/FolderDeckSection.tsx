import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA, type Language, type Project } from '../data/portfolioData';
import { sound } from '../utils/audio';
import {
  Camera,
  Users,
  Sparkles,
  ArrowUpRight,
  Play,
  Film,
  CheckCircle2,
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
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
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

  // Creative Gear list for Folder 1 (Monochrome palette)
  const gearItems = [
    { name: 'Sony FX3', type: 'Cinema 4K', color: '#111215', accent: '#ffffff' },
    { name: 'DaVinci', type: 'Color Grade', color: '#16171b', accent: '#e4e4e7' },
    { name: 'DJI RS3', type: 'Stabilizer', color: '#1c1d22', accent: '#d4d4d8' },
    { name: 'Premiere', type: 'Rhythm Cut', color: '#18191f', accent: '#a1a1aa' },
    { name: 'Aputure', type: 'Studio Light', color: '#14151a', accent: '#71717a' },
  ];

  const handleLaunchWhatsAppBrief = () => {
    sound.playChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ffffff', '#a1a1aa', '#71717a', '#000000'],
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
      style={{
        position: 'relative',
        width: '100%',
        padding: '30px 24px 80px',
        backgroundColor: '#070709',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Responsive 4-Column Folder Grid (Exact Architecture from Reference Image) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '20px',
            alignItems: 'stretch',
          }}
        >
          {/* ========================================================================= */}
          {/* FOLDER 1: The Production Tools & Gear (Dark dossier with fanning cards) */}
          {/* ========================================================================= */}
          <div
            className="folder-dossier-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '24px',
              backgroundColor: '#121319',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            onClick={() => sound.playClick()}
          >
            {/* Folder Notch Tab */}
            <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'flex-start' }}>
              <div
                className="folder-tab-notch"
                style={{
                  backgroundColor: '#1a1c25',
                  color: '#ccd5c9',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderBottom: 'none',
                }}
              >
                <Camera size={13} color="#ffffff" />
                <span>{isAr ? 'عتاد الإنتاج والإخراج' : 'Production Gear & Suite'}</span>
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
                background: 'linear-gradient(180deg, #181922 0%, #101117 100%)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
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
                      border: `1px solid ${item.accent}55`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '12px 10px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: item.accent }} />
                      <span style={{ fontSize: '9px', color: '#9da598', fontFamily: 'JetBrains Mono, monospace' }}>
                        0{idx + 1}
                      </span>
                    </div>
                    <div>
                      <div style={{ color: '#ffffff', fontSize: '11px', fontWeight: 800 }}>{item.name}</div>
                      <div style={{ color: item.accent, fontSize: '9px', fontWeight: 600 }}>{item.type}</div>
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
                    fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                    marginBottom: '8px',
                    lineHeight: 1.25,
                  }}
                >
                  {isAr ? 'العدة اللي بصوّر وببني بيها.' : 'The Suite I Direct & Shoot With.'}
                </h3>
                <p style={{ fontSize: '13px', color: '#8d90a0', lineHeight: 1.6, margin: 0 }}>
                  {isAr
                    ? 'كاميرات سينمائية سوني، عدسات أنامورفيك، وألوان دافينشي ريزولف لضمان هوية بصرية لا تُنسى.'
                    : 'Cinema cameras, anamorphic glass, and DaVinci color grading engineered for maximum viral retention.'}
                </p>
              </div>

              {/* Tool Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '18px' }}>
                {['Sony FX3', 'DaVinci', 'DJI RS3', 'Premiere', '4K 60FPS'].map((tool, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#b0b4c5',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FOLDER 2: Projects Dossier (Frosted White Dossier with live preview) */}
          {/* ========================================================================= */}
          <div
            className="folder-dossier-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '24px',
              backgroundColor: '#f5f7fa',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.05)',
              overflow: 'hidden',
              color: '#0d0f14',
            }}
          >
            {/* Folder Notch Tab */}
            <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'flex-start' }}>
              <div
                className="folder-tab-notch"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#1a1d24',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderBottom: 'none',
                  boxShadow: '0 -2px 10px rgba(0,0,0,0.03)',
                }}
              >
                <Film size={13} color="#000000" />
                <span>{isAr ? currentProject.brand_ar : currentProject.brand} • {currentProject.duration}</span>
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
                background: 'linear-gradient(180deg, #ffffff 0%, #edf1f7 100%)',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
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
                  height: '140px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#000000',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
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
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#070709',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    }}
                  >
                    <Play size={18} fill="#070709" />
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
                  }}
                >
                  <span style={{ color: '#ffffff' }}>● {currentProject.aspect_ratio}</span>
                  <span>{isAr ? 'اضغط للمشاهدة' : 'Tap to Watch'}</span>
                </div>
              </div>

              {/* Title & Open Action */}
              <div>
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 900,
                    color: '#0a0d14',
                    fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                    marginBottom: '4px',
                  }}
                >
                  {isAr ? 'المشاريع' : 'Featured Works'}
                </h3>
                <p style={{ fontSize: '13px', color: '#555d6e', margin: 0, lineHeight: 1.5 }}>
                  {isAr ? 'افتح الفولدر، شوف التفاصيل والنتائج.' : 'Open dossier. Inspect campaigns & viral metrics.'}
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
                      padding: '4px 10px',
                      borderRadius: '100px',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      backgroundColor: activeProjectIndex === idx ? '#0d0f14' : '#ffffff',
                      color: activeProjectIndex === idx ? '#ffffff' : '#475569',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isAr ? proj.brand_ar : proj.brand}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FOLDER 3: 20+ Success Partners (Frosted White Dossier with brand proof) */}
          {/* ========================================================================= */}
          <div
            className="folder-dossier-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '24px',
              backgroundColor: '#f5f7fa',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.05)',
              overflow: 'hidden',
              color: '#0d0f14',
            }}
          >
            {/* Folder Notch Tab */}
            <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'flex-start' }}>
              <div
                className="folder-tab-notch"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#1a1d24',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderBottom: 'none',
                  boxShadow: '0 -2px 10px rgba(0,0,0,0.03)',
                }}
              >
                <Users size={13} color="#000000" />
                <span>{isAr ? 'حلول تناسب أعمالك' : 'Tailored Brand Solutions'}</span>
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
                background: 'linear-gradient(180deg, #ffffff 0%, #edf1f7 100%)',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              {/* Partner Badges Visual */}
              <div
                style={{
                  height: '140px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                  marginBottom: '16px',
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
                      padding: '10px 12px',
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, border-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = '#000000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0d0f14' }}>
                      {isAr ? b.name_ar : b.name}
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>
                      {isAr ? b.sector_ar : b.sector_en}
                    </div>
                  </div>
                ))}
              </div>

              {/* Title & Trust Statement */}
              <div>
                <h3
                  style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    color: '#0a0d14',
                    fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                    marginBottom: '4px',
                    lineHeight: 1.15,
                  }}
                >
                  {isAr ? '+20 شريك نجاح' : '20+ Success Partners'}
                </h3>
                <p style={{ fontSize: '14px', color: '#555d6e', margin: 0, fontWeight: 500 }}>
                  {isAr ? 'نبني الثقة، مشروعًا بمشروع.' : 'Building trust, project by project.'}
                </p>
              </div>

              {/* Quantitative Metrics Row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                  marginTop: '16px',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#475569',
                }}
              >
                <span>⭐ 100K+ Audience</span>
                <span style={{ color: '#000000', fontWeight: 700 }}>● 94% Avg Retention</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FOLDER 4: Got an Idea? Start Your Project (Frosted White Dossier CTA) */}
          {/* ========================================================================= */}
          <div
            className="folder-dossier-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '24px',
              backgroundColor: '#f5f7fa',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.05)',
              overflow: 'hidden',
              color: '#0d0f14',
            }}
          >
            {/* Folder Notch Tab */}
            <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'flex-start' }}>
              <div
                className="folder-tab-notch"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#1a1d24',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderBottom: 'none',
                  boxShadow: '0 -2px 10px rgba(0,0,0,0.03)',
                }}
              >
                <Sparkles size={13} color="#000000" />
                <span>{isAr ? 'اكتشف الحلول' : 'Explore Creative Direction'}</span>
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
                background: 'linear-gradient(180deg, #ffffff 0%, #edf1f7 100%)',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              {/* Interactive Quick Brief Selector */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  marginBottom: '16px',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>
                  {isAr ? 'اختر نوع التعاون المطلوب:' : 'Select campaign focus:'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { id: 'reel', labelEn: 'Viral Promo Reel', labelAr: 'ريلز إعلاني فيروسي' },
                    { id: 'campaign', labelEn: 'Integrated Campaign', labelAr: 'حملة إعلانية متكاملة' },
                    { id: 'ugc', labelEn: 'UGC & Hook Creation', labelAr: 'صناعة محتوى UGC وهوكس' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        sound.playClick();
                        setBriefGoal(opt.id as any);
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: briefGoal === opt.id ? '#0d0f14' : '#f8fafc',
                        color: briefGoal === opt.id ? '#ffffff' : '#334155',
                        border: briefGoal === opt.id ? '1px solid #0d0f14' : '1px solid rgba(0,0,0,0.06)',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: isAr ? 'right' : 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{isAr ? opt.labelAr : opt.labelEn}</span>
                      {briefGoal === opt.id && <CheckCircle2 size={13} color="#ffffff" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Action Question */}
              <div>
                <h3
                  style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    color: '#0a0d14',
                    fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                    marginBottom: '4px',
                    lineHeight: 1.15,
                  }}
                >
                  {isAr ? 'عندك فكرة؟' : 'Got an idea?'}
                </h3>
                <p style={{ fontSize: '14px', color: '#555d6e', margin: 0, fontWeight: 500 }}>
                  {isAr ? 'ابدأ مشروعك معنا.' : 'Start your project with us.'}
                </p>
              </div>

              {/* Direct Launch WhatsApp Button */}
              <button
                onClick={handleLaunchWhatsAppBrief}
                onMouseEnter={() => sound.playHover()}
                data-cursor="CHAT"
                style={{
                  marginTop: '16px',
                  padding: '12px 18px',
                  borderRadius: '100px',
                  backgroundColor: '#0d0f14',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                  transition: 'transform 0.2s, background-color 0.2s',
                }}
                className="magnetic-btn"
              >
                <span>{briefSent ? (isAr ? 'تم فتح المحادثة!' : 'Chat Opened!') : (isAr ? 'تواصل معي مباشرة' : 'Direct Quick Chat')}</span>
                <ArrowUpRight size={16} color="#ffffff" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
