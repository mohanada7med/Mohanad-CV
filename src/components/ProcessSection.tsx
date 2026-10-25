import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { GitCommit, Check } from 'lucide-react';

interface ProcessSectionProps {
  lang: Language;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ lang }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const t = PORTFOLIO_DATA.ui[lang];
  const steps = PORTFOLIO_DATA.process;

  const handleStepClick = (index: number) => {
    sound.playClick();
    setActiveStepIndex(index);
  };

  return (
    <section
      id="process"
      style={{
        position: 'relative',
        paddingTop: '130px',
        paddingBottom: '130px',
        backgroundColor: '#070709',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="app-container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '60px' }}>
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
            <GitCommit size={13} />
            <span>THE CREATIVE ENGINE</span>
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              color: '#ffffff',
              marginBottom: '16px',
            }}
          >
            {t.process_heading}
          </h2>

          <p style={{ fontSize: '1.15rem', color: '#8d90a0', lineHeight: 1.6 }}>
            {t.process_sub}
          </p>
        </div>

        {/* Interactive Progress Line Navigation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
            gap: '12px',
            marginBottom: '40px',
            overflowX: 'auto',
            paddingBottom: '10px',
          }}
        >
          {steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;
            return (
              <button
                key={step.number}
                onClick={() => handleStepClick(idx)}
                onMouseEnter={() => sound.playHover()}
                data-cursor={`STEP ${step.number}`}
                style={{
                  padding: '16px 12px',
                  borderRadius: '16px',
                  backgroundColor: isActive ? 'rgba(204, 255, 0, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                  border: isActive ? '1.5px solid #ccff00' : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  textAlign: 'start',
                  transition: 'all 0.2s ease',
                  minWidth: '130px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace',
                      color: isActive ? '#ccff00' : '#717588',
                      fontWeight: 700,
                    }}
                  >
                    {step.number}
                  </span>
                  {isCompleted && <Check size={12} color="#ccff00" />}
                </div>

                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 800,
                    color: isActive ? '#ffffff' : '#b0b4c5',
                    fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                  }}
                >
                  {lang === 'en' ? step.title_en : step.title_ar}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Card */}
        {steps[activeStepIndex] && (
          <div
            className="glass-panel-elevated"
            style={{
              padding: 'clamp(28px, 4vw, 48px)',
              borderRadius: '28px',
              border: '1px solid rgba(204, 255, 0, 0.25)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(204, 255, 0, 0.1)',
                  color: '#ccff00',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                STAGE {steps[activeStepIndex].number} • {lang === 'en' ? steps[activeStepIndex].tag_en : steps[activeStepIndex].tag_ar}
              </div>

              <h3
                className="font-heading"
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                  fontWeight: 900,
                  color: '#ffffff',
                  marginBottom: '16px',
                }}
              >
                {lang === 'en' ? steps[activeStepIndex].title_en : steps[activeStepIndex].title_ar}
              </h3>

              <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#d0d4e4' }}>
                {lang === 'en' ? steps[activeStepIndex].description_en : steps[activeStepIndex].description_ar}
              </p>
            </div>

            {/* Visual Process Marker */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '36px',
                borderRadius: '24px',
                backgroundColor: 'rgba(7, 7, 9, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: '#ccff00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#070709',
                  fontSize: '26px',
                  fontWeight: 900,
                  fontFamily: 'JetBrains Mono, monospace',
                  marginBottom: '16px',
                  boxShadow: '0 0 30px rgba(204, 255, 0, 0.4)',
                }}
              >
                {steps[activeStepIndex].number}
              </div>
              <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '15px' }}>
                {lang === 'en' ? 'Quality Standard' : 'معيار الجودة والإتقان'}
              </div>
              <div style={{ color: '#8d90a0', fontSize: '12px', marginTop: '4px' }}>
                {lang === 'en' ? 'Engineered for retention & conversions' : 'مصمم لتحقيق أعلى مشاهدة وتأثير'}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
