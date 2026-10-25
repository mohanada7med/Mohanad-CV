import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project, Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ProjectModal } from './ProjectModal';
import { Play, Sparkles, Filter, ArrowUpRight, Flame } from 'lucide-react';

interface SelectedWorkProps {
  lang: Language;
  selectedBrandFilter?: string;
  onClearBrandFilter?: () => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  lang,
  selectedBrandFilter,
  onClearBrandFilter,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const t = PORTFOLIO_DATA.ui[lang];

  // Category filter options
  const categories = [
    { id: 'All', label: t.filter_all },
    { id: 'Food & Beverage', label: t.filter_food },
    { id: 'Tech & Lifestyle', label: t.filter_tech },
    { id: 'UGC & Hooks', label: t.filter_ugc },
    { id: 'Fashion & Urban', label: t.filter_fashion },
    { id: 'Brand Story', label: t.filter_story },
  ];

  // Filter projects by brand filter and category
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
    setActiveModalProject(project);
  };

  const handleNavigateModal = (direction: 'next' | 'prev') => {
    if (!activeModalProject) return;
    const currentIndex = PORTFOLIO_DATA.projects.findIndex((p) => p.id === activeModalProject.id);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= PORTFOLIO_DATA.projects.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = PORTFOLIO_DATA.projects.length - 1;
    setActiveModalProject(PORTFOLIO_DATA.projects[nextIndex]);
  };

  // Featured project (e.g. B.Laban Pistachio Rush)
  const featuredProject = filteredProjects.find((p) => p.featured) || filteredProjects[0];
  const regularProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id);

  return (
    <section
      id="work"
      style={{
        position: 'relative',
        paddingTop: '120px',
        paddingBottom: '140px',
        backgroundColor: '#070709',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="app-container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '820px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '100px',
              backgroundColor: 'rgba(204, 255, 0, 0.08)',
              border: '1px solid rgba(204, 255, 0, 0.25)',
              color: '#ccff00',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginBottom: '16px',
              width: 'fit-content',
            }}
          >
            <Flame size={13} />
            <span>SELECTED CAMPAIGNS & SHORTS</span>
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: '#ffffff',
              marginBottom: '16px',
            }}
          >
            {t.work_heading}
          </h2>

          <p style={{ fontSize: '1.15rem', color: '#8d90a0', lineHeight: 1.6 }}>
            {t.work_sub}
          </p>
        </div>

        {/* Brand Filter Pill Indicator */}
        {selectedBrandFilter && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              borderRadius: '100px',
              backgroundColor: 'rgba(255, 85, 0, 0.12)',
              border: '1px solid #ff5500',
              color: '#ffffff',
              fontSize: '13px',
              marginBottom: '24px',
            }}
          >
            <span>
              {lang === 'en' ? `Filtered by brand: ` : `مصفى حسب البراند: `}
              <strong style={{ color: '#ff5500' }}>{selectedBrandFilter}</strong>
            </span>
            <button
              onClick={() => {
                sound.playClick();
                if (onClearBrandFilter) onClearBrandFilter();
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#ccff00',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {lang === 'en' ? 'Show All Brands' : 'عرض كل البراندات'}
            </button>
          </div>
        )}

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '60px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Filter size={14} color="#8d90a0" />
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={() => sound.playHover()}
                data-cursor="FILTER"
                style={{
                  padding: '8px 18px',
                  borderRadius: '100px',
                  backgroundColor: isActive ? '#ccff00' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#070709' : '#b0b4c5',
                  border: isActive ? '1px solid #ccff00' : '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '12px',
                  fontWeight: isActive ? 800 : 500,
                  fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 20px rgba(204, 255, 0, 0.3)' : 'none',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Editorial Dynamic Portfolio Layout */}
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#8d90a0' }}>
            <p style={{ fontSize: '18px' }}>
              {lang === 'en' ? 'No projects found matching this filter.' : 'لم يتم العثور على مشاريع تطابق هذا الفلتر.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            {/* 1. Oversized Featured Project Card */}
            {featuredProject && (
              <div
                onClick={() => handleOpenProject(featuredProject)}
                onMouseEnter={() => sound.playHover()}
                data-cursor="WATCH PROJECT"
                style={{
                  position: 'relative',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  backgroundColor: '#0d0e14',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
                }}
                className="featured-project-card"
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    alignItems: 'center',
                  }}
                >
                  {/* Left Featured Media */}
                  <div
                    style={{
                      position: 'relative',
                      height: 'clamp(360px, 50vw, 560px)',
                      overflow: 'hidden',
                      backgroundColor: '#000000',
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
                      className="project-image-zoom"
                    />

                    {/* Gradient Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(7, 7, 9, 0.8) 0%, transparent 60%)',
                      }}
                    />

                    {/* Featured Tag & Duration */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '24px',
                        left: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span
                        style={{
                          padding: '6px 14px',
                          borderRadius: '100px',
                          backgroundColor: '#ccff00',
                          color: '#070709',
                          fontSize: '11px',
                          fontWeight: 800,
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        FEATURED SHOWCASE
                      </span>
                      <span
                        style={{
                          padding: '6px 12px',
                          borderRadius: '100px',
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          backdropFilter: 'blur(8px)',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {featuredProject.duration}
                      </span>
                    </div>

                    {/* Center Floating Play Button */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '74px',
                        height: '74px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(204, 255, 0, 0.92)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#070709',
                        boxShadow: '0 0 35px rgba(204, 255, 0, 0.6)',
                      }}
                    >
                      <Play size={32} fill="#070709" />
                    </div>
                  </div>

                  {/* Right Featured Content */}
                  <div
                    style={{
                      padding: 'clamp(28px, 4vw, 56px)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontFamily: 'JetBrains Mono, monospace',
                          color: '#ccff00',
                          fontWeight: 700,
                        }}
                      >
                        01 • {lang === 'en' ? featuredProject.category : featuredProject.category_ar}
                      </span>
                      <span style={{ fontSize: '13px', color: '#8d90a0', fontFamily: 'JetBrains Mono, monospace' }}>
                        {featuredProject.year}
                      </span>
                    </div>

                    <div style={{ fontSize: '18px', color: '#ff5500', fontWeight: 800, fontFamily: 'Syne, sans-serif' }}>
                      {lang === 'en' ? featuredProject.brand : featuredProject.brand_ar}
                    </div>

                    <h3
                      className="font-heading"
                      style={{
                        fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        color: '#ffffff',
                      }}
                    >
                      {lang === 'en' ? featuredProject.title_en : featuredProject.title_ar}
                    </h3>

                    <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#b0b4c5' }}>
                      {lang === 'en' ? featuredProject.description_en : featuredProject.description_ar}
                    </p>

                    {/* Creative Hook Preview */}
                    <div
                      style={{
                        padding: '16px',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(204, 255, 0, 0.05)',
                        border: '1px solid rgba(204, 255, 0, 0.2)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ccff00', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, marginBottom: '6px' }}>
                        <Sparkles size={13} />
                        <span>{lang === 'en' ? 'CREATIVE HOOK' : 'الهوك الإبداعي'}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#f5f6fa' }}>
                        {lang === 'en' ? featuredProject.creative_concept_en : featuredProject.creative_concept_ar}
                      </p>
                    </div>

                    {/* Bottom CTA trigger */}
                    <div style={{ marginTop: '10px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#ccff00',
                          fontSize: '13px',
                          fontWeight: 700,
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        <span>{t.btn_view_project}</span>
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Asymmetric Secondary Projects Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                gap: '28px',
              }}
            >
              {regularProjects.map((project, idx) => (
                <div
                  key={project.id}
                  onClick={() => handleOpenProject(project)}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="WATCH PROJECT"
                  style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(14, 15, 21, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                  className="project-card"
                >
                  {/* Thumbnail Video Panel */}
                  <div
                    style={{
                      position: 'relative',
                      height: '360px',
                      overflow: 'hidden',
                      backgroundColor: '#000000',
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
                      className="project-image-zoom"
                    />

                    {/* Gradient Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(7, 7, 9, 0.9) 0%, transparent 55%)',
                      }}
                    />

                    {/* Badges */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(7, 7, 9, 0.8)',
                          backdropFilter: 'blur(8px)',
                          color: '#ccff00',
                          fontSize: '11px',
                          fontWeight: 700,
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {project.aspect_ratio}
                      </span>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(7, 7, 9, 0.8)',
                          backdropFilter: 'blur(8px)',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {project.duration}
                      </span>
                    </div>

                    {/* Floating Play Button on Hover */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: '#ccff00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#070709',
                        boxShadow: '0 0 20px rgba(204, 255, 0, 0.4)',
                      }}
                    >
                      <Play size={18} fill="#070709" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontFamily: 'JetBrains Mono, monospace',
                          color: '#ccff00',
                          fontWeight: 700,
                        }}
                      >
                        0{idx + 2} • {lang === 'en' ? project.brand : project.brand_ar}
                      </span>
                      <span style={{ fontSize: '11px', color: '#717588', fontFamily: 'JetBrains Mono, monospace' }}>
                        {project.year}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontSize: '22px',
                        fontWeight: 800,
                        color: '#ffffff',
                        fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                        lineHeight: 1.25,
                      }}
                    >
                      {lang === 'en' ? project.title_en : project.title_ar}
                    </h4>

                    <p
                      style={{
                        fontSize: '13px',
                        lineHeight: 1.6,
                        color: '#8d90a0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
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

      {/* Project Detail Overlay Modal */}
      <ProjectModal
        project={activeModalProject}
        lang={lang}
        onClose={() => setActiveModalProject(null)}
        onNavigate={handleNavigateModal}
      />

      <style>{`
        .featured-project-card:hover {
          border-color: #ccff00 !important;
          box-shadow: 0 25px 70px rgba(204, 255, 0, 0.15) !important;
        }
        .featured-project-card:hover .project-image-zoom {
          transform: scale(1.05);
        }
        .project-card:hover {
          transform: translateY(-6px);
          border-color: rgba(204, 255, 0, 0.4) !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6) !important;
        }
        .project-card:hover .project-image-zoom {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
};
