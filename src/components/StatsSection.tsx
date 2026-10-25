import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Language } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface StatsSectionProps {
  lang: Language;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ lang }) => {
  return (
    <section
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
            gap: '30px',
          }}
        >
          {PORTFOLIO_DATA.stats.map((stat, i) => (
            <div
              key={i}
              onMouseEnter={() => sound.playHover()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '24px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'border-color 0.2s ease',
              }}
              onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(204, 255, 0, 0.3)')}
              onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.05)')}
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
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#ffffff',
                  fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                }}
              >
                {lang === 'en' ? stat.label_en : stat.label_ar}
              </div>

              <div
                style={{
                  fontSize: '12px',
                  color: '#717588',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                {lang === 'en' ? stat.sub_en : stat.sub_ar}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
