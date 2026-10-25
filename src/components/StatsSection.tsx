import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA, type Language } from '../data/portfolioData';
import { sound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

interface StatsSectionProps {
  lang: Language;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ lang }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isAr = lang === 'ar';

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('.scrolly-stat-card', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      style={{
        position: 'relative',
        paddingTop: '80px',
        paddingBottom: '80px',
        backgroundColor: '#0a0b10',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="app-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}
        >
          {PORTFOLIO_DATA.stats.map((stat, i) => (
            <div
              key={i}
              className="scrolly-stat-card"
              onMouseEnter={() => sound.playHover()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '28px 24px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(204, 255, 0, 0.3)';
                el.style.transform = 'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                  fontWeight: 900,
                  fontFamily: 'JetBrains Mono, monospace',
                  color: i === 0 ? '#ccff00' : i === 1 ? '#ff5500' : '#ffffff',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}
              >
                {stat.value}
              </div>

              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#ffffff',
                  fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                }}
              >
                {isAr ? stat.label_ar : stat.label_en}
              </div>

              <div
                style={{
                  fontSize: '12px',
                  color: '#8d90a0',
                  lineHeight: 1.5,
                  fontFamily: isAr ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Grotesk, sans-serif',
                }}
              >
                {isAr ? stat.sub_ar : stat.sub_en}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
