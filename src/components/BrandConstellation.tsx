import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ArrowUpRight, Sparkles, Orbit, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BrandConstellationProps {
  lang: Language;
  onSelectBrand?: (brandName: string) => void;
}

export const BrandConstellation: React.FC<BrandConstellationProps> = ({
  lang,
  onSelectBrand,
}) => {
  const [activeBrandId, setActiveBrandId] = useState<string>('b-laban');
  const sectionRef = useRef<HTMLElement>(null);
  const t = PORTFOLIO_DATA.ui[lang];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('.scrolly-brand-card', {
        scale: 0.85,
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.65,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      });

      gsap.from('.scrolly-brand-spotlight', {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const handleBrandClick = (brandName: string, id: string) => {
    sound.playClick();
    setActiveBrandId(id);
    if (onSelectBrand) {
      onSelectBrand(brandName);
    }
    const workSection = document.querySelector('#work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeBrand = PORTFOLIO_DATA.brands.find((b) => b.id === activeBrandId) || PORTFOLIO_DATA.brands[0];

  return (
    <section
      ref={sectionRef}
      id="brands"
      style={{
        position: 'relative',
        paddingTop: '120px',
        paddingBottom: '120px',
        backgroundColor: '#070709',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(204, 255, 0, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 85, 0, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '800px', marginBottom: '60px' }}>
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
            }}
          >
            <Orbit size={13} />
            <span>THE BRAND CONSTELLATION</span>
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              color: '#ffffff',
              marginBottom: '16px',
            }}
          >
            {t.brands_heading}
          </h2>

          <p
            style={{
              fontSize: '1.1rem',
              color: '#8d90a0',
              lineHeight: 1.6,
            }}
          >
            {t.brands_sub}
          </p>
        </div>

        {/* Brand Grid Constellation & Active Detail Preview */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            alignItems: 'start',
          }}
        >
          {/* Brand Interactive Nodes */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {PORTFOLIO_DATA.brands.map((brand, idx) => {
              const isSelected = brand.id === activeBrandId;
              return (
                <div
                  key={brand.id}
                  onClick={() => handleBrandClick(brand.name, brand.id)}
                  onMouseEnter={() => {
                    sound.playHover();
                    setActiveBrandId(brand.id);
                  }}
                  data-cursor="EXPLORE"
                  className="scrolly-brand-card"
                  style={{
                    padding: '24px',
                    borderRadius: '20px',
                    backgroundColor: isSelected ? 'rgba(20, 22, 32, 0.95)' : 'rgba(14, 15, 21, 0.6)',
                    border: isSelected ? '1.5px solid #ccff00' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isSelected ? '0 10px 30px rgba(204, 255, 0, 0.15)' : 'none',
                    transform: isSelected ? 'translateY(-4px)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top Badge & Index */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontFamily: 'JetBrains Mono, monospace',
                        color: isSelected ? '#ccff00' : '#717588',
                        fontWeight: 700,
                      }}
                    >
                      0{idx + 1} • {brand.badge}
                    </span>
                    <ArrowUpRight
                      size={18}
                      style={{
                        color: isSelected ? '#ccff00' : '#717588',
                        transform: isSelected ? 'translate(2px, -2px)' : 'none',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </div>

                  {/* Brand Typographic Name */}
                  <div style={{ marginBottom: '8px' }}>
                    <h3
                      style={{
                        fontSize: '26px',
                        fontWeight: 900,
                        fontFamily: 'Syne, sans-serif',
                        color: isSelected ? '#ffffff' : '#e2e4ec',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {brand.name}
                    </h3>
                    <div
                      style={{
                        fontSize: '16px',
                        fontFamily: 'Alexandria, sans-serif',
                        color: isSelected ? '#ccff00' : '#8d90a0',
                        fontWeight: 700,
                      }}
                    >
                      {brand.name_ar}
                    </div>
                  </div>

                  {/* Sector */}
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#8d90a0',
                      fontFamily: lang === 'en' ? 'Space Grotesk, sans-serif' : 'IBM Plex Sans Arabic, sans-serif',
                    }}
                  >
                    {lang === 'en' ? brand.sector_en : brand.sector_ar}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Brand Showcase Card */}
          <div
            className="glass-panel-elevated scrolly-brand-spotlight"
            style={{
              padding: '36px',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(204, 255, 0, 0.3)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Ambient Corner Accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, rgba(204, 255, 0, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Sparkles size={16} color="#ccff00" />
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#ccff00',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                COLLABORATION HIGHLIGHT
              </span>
            </div>

            <h3
              style={{
                fontSize: '36px',
                fontWeight: 900,
                fontFamily: 'Syne, sans-serif',
                color: '#ffffff',
                marginBottom: '4px',
              }}
            >
              {activeBrand.name}{' '}
              <span style={{ fontSize: '24px', color: '#8d90a0', fontFamily: 'Alexandria, sans-serif' }}>
                / {activeBrand.name_ar}
              </span>
            </h3>

            <div
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: '#ccff00',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                marginBottom: '20px',
              }}
            >
              {lang === 'en' ? activeBrand.sector_en : activeBrand.sector_ar}
            </div>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#d0d4e4',
                marginBottom: '30px',
              }}
            >
              {lang === 'en' ? activeBrand.description_en : activeBrand.description_ar}
            </p>

            {/* Direct Project Action */}
            <button
              onClick={() => handleBrandClick(activeBrand.name, activeBrand.id)}
              onMouseEnter={() => sound.playHover()}
              data-cursor="VIEW REEL"
              className="magnetic-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                borderRadius: '100px',
                backgroundColor: '#ccff00',
                color: '#070709',
                fontSize: '13px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                boxShadow: '0 0 25px rgba(204, 255, 0, 0.3)',
              }}
            >
              <Compass size={16} />
              <span>
                {lang === 'en' ? `View ${activeBrand.name} Projects` : `عرض مشاريع ${activeBrand.name_ar}`}
              </span>
            </button>
          </div>
        </div>

        {/* Kinetic Marquee of Brands */}
        <div
          style={{
            marginTop: '80px',
            paddingTop: '40px',
            paddingBottom: '40px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            overflow: 'hidden',
          }}
        >
          <div className="animate-marquee">
            {[...PORTFOLIO_DATA.brands, ...PORTFOLIO_DATA.brands].map((brand, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '30px',
                  paddingRight: '60px',
                  userSelect: 'none',
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                    fontWeight: 900,
                    fontFamily: 'Syne, sans-serif',
                    color: i % 2 === 0 ? '#ffffff' : 'transparent',
                    WebkitTextStroke: i % 2 === 0 ? 'none' : '1px rgba(255,255,255,0.3)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {brand.name.toUpperCase()}
                </span>
                <span style={{ color: '#ccff00', fontSize: '18px' }}>✦</span>
                <span
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                    fontWeight: 800,
                    fontFamily: 'Alexandria, sans-serif',
                    color: '#8d90a0',
                  }}
                >
                  {brand.name_ar}
                </span>
                <span style={{ color: '#ff5500', fontSize: '18px' }}>✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
