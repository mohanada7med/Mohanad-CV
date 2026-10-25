import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project, Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ProjectModal } from './ProjectModal';
import { Play, Sparkles, Filter, ArrowUpRight, Flame, Film, Star, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SelectedWorkProps {
  lang: Language;
  selectedBrandFilter?: string;
  onClearBrandFilter?: () => void;
  onOpenProject?: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  lang,
  selectedBrandFilter,
  onClearBrandFilter,
  onOpenProject: externalOpenProject,
}) => {
  const isAr = lang === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [internalModalProject, setInternalModalProject] = useState<Project | null>(null);
  const workRef = useRef<HTMLElement>(null);
  const t = PORTFOLIO_DATA.ui[lang];

  useEffect(() => {
    const el = workRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('.scrolly-featured-card', {
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: 'back.out(1.8)',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        },
      });

      gsap.from('.comic-project-tile', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: '.scrolly-projects-grid',
          start: 'top 85%',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [activeCategory, selectedBrandFilter]);

  const categories = [
    { id: 'All', label: t.filter_all, color: '#ccff00' },
    { id: 'Food & Beverage', label: t.filter_food, color: '#ffe600' },
    { id: 'Tech & Lifestyle', label: t.filter_tech, color: '#00e5ff' },
    { id: 'UGC & Hooks', label: t.filter_ugc, color: '#ff2a5f' },
    { id: 'Fashion & Urban', label: t.filter_fashion, color: '#b388ff' },
    { id: 'Brand Story', label: t.filter_story, color: '#ffffff' },
  ];

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (selectedBrandFilter && p.brand !== selectedBrandFilter) {
      return false;
    }
    if (activeCategory !== 'All' && p.category !== activeCategory) {
      return false;
    }
    return true;
  });

  const handleOpenProject = (project: Project) => {
    sound.playClick();
    if (externalOpenProject) {
      externalOpenProject(project);
    } else {
      setInternalModalProject(project);
    }
  };

  const handleNavigateModal = (direction: 'next' | 'prev') => {
    if (!internalModalProject) return;
    const currentIndex = PORTFOLIO_DATA.projects.findIndex((p) => p.id === internalModalProject.id);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= PORTFOLIO_DATA.projects.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = PORTFOLIO_DATA.projects.length - 1;
    setInternalModalProject(PORTFOLIO_DATA.projects[nextIndex]);
  };

  const featuredProject = filteredProjects.find((p) => p.featured) || filteredProjects[0];
  const regularProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id);

  return (
    <section
      ref={workRef}
      id="work"
      className="master-scene-stage comic-halftone-bg"
      style={{
        position: 'relative',
        paddingTop: '110px',
        paddingBottom: '140px',
        backgroundColor: '#090a12',
        borderTop: '5px solid #000000',
        borderBottom: '5px solid #000000',
        direction: isAr ? 'rtl' : 'ltr',
      }}
    >
      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* رأس القسم بنمط ملصقات وأغلفة مجلات القصص المصورة */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '880px',
            marginBottom: '40px',
          }}
        >
          {/* شارة علوية كرتونية */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '8px',
              backgroundColor: '#ff2a5f',
              border: '3px solid #000000',
              color: '#ffffff',
              fontSize: '12px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 900,
              boxShadow: '4px 4px 0px #000000',
              marginBottom: '16px',
              width: 'fit-content',
              transform: 'rotate(-2deg)',
            }}
          >
            <Flame size={15} color="#ffe600" />
            <span>SELECTED CAMPAIGNS & REELS • أرشيف الأعمال</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.6rem, 5.8vw, 4.8rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: '#ffffff',
              marginBottom: '16px',
              fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
              textShadow: '5px 5px 0px #000000',
            }}
          >
            {isAr ? (
              <>
                أقوى الحملات — <span style={{ color: '#ccff00' }}>سينما واستبقاء فائق</span>
              </>
            ) : (
              <>
                The Vault of Hits — <span style={{ color: '#ccff00' }}>Cinema & Viral Hooks</span>
              </>
            )}
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              color: '#c2c5d8',
              lineHeight: 1.65,
              margin: 0,
              fontWeight: 600,
              fontFamily: isAr ? 'var(--font-body-ar)' : 'Space Grotesk, sans-serif',
            }}
          >
            {t.work_sub}
          </p>
        </div>

        {/* مؤشر فلترة البراندات إن وجد */}
        {selectedBrandFilter && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 18px',
              borderRadius: '12px',
              backgroundColor: '#ffe600',
              border: '3px solid #000000',
              color: '#000000',
              fontSize: '13px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 900,
              boxShadow: '4px 4px 0px #000000',
              marginBottom: '30px',
            }}
          >
            <span>
              {lang === 'en' ? `Filtered Brand: ` : `مصفى حسب البراند: `}
              <strong style={{ textDecoration: 'underline' }}>{selectedBrandFilter}</strong>
            </span>
            <button
              onClick={() => {
                sound.playClick();
                if (onClearBrandFilter) onClearBrandFilter();
              }}
              style={{
                background: '#000000',
                border: 'none',
                borderRadius: '6px',
                color: '#ccff00',
                padding: '4px 10px',
                fontWeight: 900,
                cursor: 'pointer',
              }}
            >
              {lang === 'en' ? 'Show All ✕' : 'عرض الكل ✕'}
            </button>
          </div>
        )}

        {/* أزرار الفلاتر بنمط الملصقات الكرتونية الملونة (Comic Category Badges) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '55px',
            paddingBottom: '20px',
            borderBottom: '3.5px dashed rgba(255, 255, 255, 0.15)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#ffe600',
              fontWeight: 900,
              fontSize: '13px',
              fontFamily: 'JetBrains Mono, monospace',
              marginLeft: isAr ? '10px' : '0',
              marginRight: isAr ? '0' : '10px',
            }}
          >
            <Filter size={16} />
            <span>{isAr ? 'التصنيف:' : 'GENRE:'}</span>
          </div>

          {categories.map((cat, i) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={() => sound.playHover()}
                style={{
                  padding: '8px 20px',
                  borderRadius: '12px',
                  backgroundColor: isActive ? cat.color : '#161826',
                  color: isActive ? '#000000' : '#ffffff',
                  border: '3px solid #000000',
                  fontSize: '13px',
                  fontWeight: 900,
                  fontFamily: isAr ? 'var(--font-display-ar)' : 'Space Grotesk, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: isActive ? '4px 4px 0px #000000' : '2px 2px 0px #000000',
                  transform: isActive ? 'scale(1.04) rotate(-1deg)' : 'scale(1)',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translate(2px, 2px)';
                  e.currentTarget.style.boxShadow = '1px 1px 0px #000000';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = isActive ? 'scale(1.04) rotate(-1deg)' : 'scale(1)';
                  e.currentTarget.style.boxShadow = isActive ? '4px 4px 0px #000000' : '2px 2px 0px #000000';
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* شبكة الأعمال الكرتونية */}
        {filteredProjects.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              backgroundColor: '#121420',
              borderRadius: '24px',
              border: '4px solid #000000',
              boxShadow: '6px 6px 0px #000000',
            }}
          >
            <p style={{ fontSize: '18px', color: '#f0f1f8', fontWeight: 800, margin: 0 }}>
              {lang === 'en' ? 'No issues found in this vault category.' : 'لم يتم العثور على أعمال تطابق هذا التصنيف.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            {/* 1. كارت المشروع المميز (Featured Comic Cover) */}
            {featuredProject && (
              <div
                onClick={() => handleOpenProject(featuredProject)}
                onMouseEnter={() => sound.playHover()}
                className="scrolly-featured-card"
                style={{
                  position: 'relative',
                  borderRadius: '34px',
                  overflow: 'hidden',
                  backgroundColor: '#131524',
                  border: '5px solid #000000',
                  cursor: 'pointer',
                  boxShadow: '12px 12px 0px #000000, 12px 12px 0px 4px #ccff00',
                  transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                    alignItems: 'stretch',
                  }}
                >
                  {/* قسم الصورة / الغلاف */}
                  <div
                    style={{
                      position: 'relative',
                      minHeight: '400px',
                      height: 'clamp(380px, 46vw, 560px)',
                      overflow: 'hidden',
                      backgroundColor: '#000000',
                      borderRight: isAr ? 'none' : '5px solid #000000',
                      borderLeft: isAr ? '5px solid #000000' : 'none',
                    }}
                  >
                    <img
                      src={featuredProject.thumbnail}
                      alt={featuredProject.title_en}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      className="project-comic-zoom"
                    />

                    {/* تراكب كرتوني خفيف */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                      }}
                    />

                    {/* شارة الغلاف الرئيسية */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '20px',
                        left: isAr ? 'auto' : '20px',
                        right: isAr ? '20px' : 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#ccff00',
                          border: '2.5px solid #000000',
                          color: '#000000',
                          fontSize: '11px',
                          fontWeight: 900,
                          fontFamily: 'JetBrains Mono, monospace',
                          boxShadow: '3px 3px 0px #000000',
                        }}
                      >
                        ★ MASTERPIECE OF THE MONTH
                      </span>

                      <span
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          backgroundColor: '#ffffff',
                          border: '2.5px solid #000000',
                          color: '#000000',
                          fontSize: '11px',
                          fontWeight: 900,
                          fontFamily: 'JetBrains Mono, monospace',
                          boxShadow: '3px 3px 0px #000000',
                        }}
                      >
                        ⏱ {featuredProject.duration}
                      </span>
                    </div>

                    {/* زر تشغيل كرتوني عائم بالمنتصف */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: '#ffe600',
                        border: '4px solid #000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#000000',
                        boxShadow: '6px 6px 0px #000000',
                        transition: 'transform 0.25s ease',
                      }}
                      className="comic-play-btn"
                    >
                      <Play size={36} fill="#000000" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }} />
                    </div>
                  </div>

                  {/* قسم معلومات المشروع */}
                  <div
                    style={{
                      padding: 'clamp(28px, 4vw, 50px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '20px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#000000',
                          border: '2px solid #ccff00',
                          color: '#ccff00',
                          fontSize: '12px',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontWeight: 900,
                        }}
                      >
                        ISSUE 01 • {lang === 'en' ? featuredProject.category : featuredProject.category_ar}
                      </span>
                      <span style={{ fontSize: '13px', color: '#ffe600', fontFamily: 'JetBrains Mono, monospace', fontWeight: 900 }}>
                        {featuredProject.year}
                      </span>
                    </div>

                    <div style={{ fontSize: '18px', color: '#ff2a5f', fontWeight: 900, fontFamily: 'JetBrains Mono, monospace' }}>
                      @{lang === 'en' ? featuredProject.brand : featuredProject.brand_ar}
                    </div>

                    <h3
                      style={{
                        fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                        textShadow: '3px 3px 0px #000000',
                      }}
                    >
                      {lang === 'en' ? featuredProject.title_en : featuredProject.title_ar}
                    </h3>

                    <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#d0d3e5', margin: 0, fontWeight: 500 }}>
                      {lang === 'en' ? featuredProject.description_en : featuredProject.description_ar}
                    </p>

                    {/* صندوق الهوك الإبداعي بنمط الـ Comic Box */}
                    <div
                      style={{
                        padding: '16px 20px',
                        borderRadius: '16px',
                        backgroundColor: '#0b0c14',
                        border: '3px solid #000000',
                        boxShadow: '4px 4px 0px #ffe600',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffe600', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 900, marginBottom: '6px' }}>
                        <Sparkles size={14} />
                        <span>{lang === 'en' ? 'THE CREATIVE HOOK' : 'الهوك الإبداعي'}</span>
                      </div>
                      <p style={{ fontSize: '14px', color: '#ffffff', margin: 0, fontWeight: 600 }}>
                        {lang === 'en' ? featuredProject.creative_concept_en : featuredProject.creative_concept_ar}
                      </p>
                    </div>

                    {/* زر استعراض المشروع */}
                    <div style={{ marginTop: '8px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 22px',
                          borderRadius: '10px',
                          backgroundColor: '#ffffff',
                          border: '3px solid #000000',
                          color: '#000000',
                          fontSize: '13px',
                          fontWeight: 900,
                          fontFamily: 'JetBrains Mono, monospace',
                          boxShadow: '4px 4px 0px #000000',
                        }}
                      >
                        <span>{t.btn_view_project}</span>
                        <ArrowUpRight size={18} strokeWidth={3} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. شبكة المشاريع الثانوية بنمط البانلز الكوميكس (Comic Grid Tiles) */}
            <div
              className="scrolly-projects-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: '32px',
              }}
            >
              {regularProjects.map((project, idx) => (
                <div
                  key={project.id}
                  onClick={() => handleOpenProject(project)}
                  onMouseEnter={() => sound.playHover()}
                  className="comic-project-tile"
                  style={{
                    borderRadius: '26px',
                    overflow: 'hidden',
                    backgroundColor: '#121422',
                    border: '4px solid #000000',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: '7px 7px 0px #000000',
                    transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  }}
                >
                  {/* بانل الفيديو / الصورة */}
                  <div
                    style={{
                      position: 'relative',
                      height: '380px',
                      overflow: 'hidden',
                      backgroundColor: '#000000',
                      borderBottom: '4px solid #000000',
                    }}
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.title_en}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      className="project-comic-zoom"
                    />

                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)',
                      }}
                    />

                    {/* شارات كرتونية أعلى الصورة */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: isAr ? 'auto' : '14px',
                        right: isAr ? '14px' : 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#000000',
                          border: '2px solid #ccff00',
                          color: '#ccff00',
                          fontSize: '11px',
                          fontWeight: 900,
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {project.aspect_ratio}
                      </span>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#ffffff',
                          border: '2px solid #000000',
                          color: '#000000',
                          fontSize: '11px',
                          fontWeight: 900,
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {project.duration}
                      </span>
                    </div>

                    {/* زر التشغيل العائم الصغير */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        right: isAr ? 'auto' : '16px',
                        left: isAr ? '16px' : 'auto',
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: '#ccff00',
                        border: '3px solid #000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#000000',
                        boxShadow: '3px 3px 0px #000000',
                      }}
                    >
                      <Play size={20} fill="#000000" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }} />
                    </div>
                  </div>

                  {/* تفاصيل الكارت */}
                  <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontFamily: 'JetBrains Mono, monospace',
                          color: '#ffe600',
                          fontWeight: 900,
                        }}
                      >
                        {lang === 'en' ? project.brand : project.brand_ar}
                      </span>
                      <span style={{ fontSize: '11px', color: '#8b8ea0', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
                        {project.year}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontSize: '22px',
                        fontWeight: 900,
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: isAr ? 'var(--font-display-ar)' : 'Space Grotesk, sans-serif',
                        lineHeight: 1.25,
                      }}
                    >
                      {lang === 'en' ? project.title_en : project.title_ar}
                    </h4>

                    <p
                      style={{
                        fontSize: '13px',
                        lineHeight: 1.6,
                        color: '#b0b4c8',
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontWeight: 500,
                      }}
                    >
                      {lang === 'en' ? project.description_en : project.description_ar}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* النافذة المنبثقة للتفاصيل */}
      {!externalOpenProject && internalModalProject && (
        <ProjectModal
          key={internalModalProject.id}
          project={internalModalProject}
          lang={lang}
          onClose={() => setInternalModalProject(null)}
          onNavigate={handleNavigateModal}
        />
      )}

      {/* حركات الـ Hover التفاعلية */}
      <style>{`
        .scrolly-featured-card:hover {
          transform: translateY(-5px);
          box-shadow: 16px 16px 0px #000000, 16px 16px 0px 4px #ffe600 !important;
        }
        .scrolly-featured-card:hover .project-comic-zoom {
          transform: scale(1.05);
        }
        .scrolly-featured-card:hover .comic-play-btn {
          transform: translate(-50%, -50%) scale(1.15) rotate(-6deg);
        }
        .comic-project-tile:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 10px 10px 0px #000000, 10px 10px 0px 3px #ccff00 !important;
        }
        .comic-project-tile:hover .project-comic-zoom {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
};