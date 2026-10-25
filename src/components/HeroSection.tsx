import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Hero3D } from './Hero3D';
import { Play, Sparkles, ShieldCheck, Film, Compass } from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const t = PORTFOLIO_DATA.ui[lang];

  const handleScrollTo = (id: string) => {
    sound.playClick();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '110px',
        paddingBottom: '40px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(20, 22, 32, 0.6) 0%, rgba(7, 7, 9, 1) 75%)',
      }}
    >
      {/* Real 3D Canvas Background */}
      <Hero3D />

      {/* Top Banner Tagline & Verified Audience Pill */}
      <div
        className="app-container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {/* Creator Identity Label */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '100px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <span
            style={{
              position: 'relative',
              display: 'flex',
              height: '8px',
              width: '8px',
            }}
          >
            <span
              className="beacon-ring"
              style={{
                position: 'absolute',
                display: 'inline-flex',
                height: '100%',
                width: '100%',
                borderRadius: '50%',
                backgroundColor: '#ccff00',
                opacity: 0.75,
              }}
            />
            <span
              style={{
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '50%',
                height: '8px',
                width: '8px',
                backgroundColor: '#ccff00',
              }}
            />
          </span>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              color: '#f5f6fa',
              letterSpacing: '0.06em',
              fontWeight: 600,
            }}
          >
            {lang === 'en' ? PORTFOLIO_DATA.creator.role_en : PORTFOLIO_DATA.creator.role_ar}
          </span>
        </div>

        {/* Verified 100K+ Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '100px',
            backgroundColor: 'rgba(204, 255, 0, 0.08)',
            border: '1px solid rgba(204, 255, 0, 0.3)',
            color: '#ccff00',
          }}
        >
          <ShieldCheck size={14} />
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            {PORTFOLIO_DATA.creator.audience_count} VERIFIED CREATOR
          </span>
          <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
          <span style={{ fontSize: '11px', color: '#ffffff', fontWeight: 500 }}>
            {lang === 'en' ? PORTFOLIO_DATA.creator.location_en : PORTFOLIO_DATA.creator.location_ar}
          </span>
        </div>
      </div>

      {/* Center Kinetic Typography & Big Headline Composition */}
      <div
        className="app-container"
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: 'auto',
          marginBottom: 'auto',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        {/* Massive Name Layering Behind Scene */}
        <div
          style={{
            userSelect: 'none',
            pointerEvents: 'none',
            marginBottom: '-10px',
            opacity: 0.85,
          }}
        >
          <div
            className="font-heading"
            style={{
              fontSize: 'clamp(3rem, 11vw, 9.5rem)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              textTransform: 'uppercase',
              textShadow: '0 20px 40px rgba(0,0,0,0.8)',
            }}
          >
            {lang === 'en' ? (
              <>
                <span style={{ color: '#ffffff', display: 'block' }}>MOHANAD</span>
                <span className="text-stroke-subtle" style={{ display: 'block' }}>AHMED</span>
              </>
            ) : (
              <>
                <span style={{ color: '#ffffff', display: 'block' }}>مهند</span>
                <span className="text-stroke-subtle" style={{ display: 'block' }}>أحمد</span>
              </>
            )}
          </div>
        </div>

        {/* Core Experimental Headline */}
        <div style={{ maxWidth: '820px', marginTop: '28px' }}>
          <h1
            className="font-heading"
            style={{
              fontSize: 'clamp(2rem, 5.2vw, 4.4rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: '20px',
              color: '#f5f6fa',
            }}
          >
            <span>{t.hero_title_line1} </span>
            <span
              style={{
                color: '#ccff00',
                display: 'inline-block',
                textShadow: '0 0 30px rgba(204, 255, 0, 0.4)',
              }}
            >
              {t.hero_title_line2}
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.35vw, 1.25rem)',
              lineHeight: 1.6,
              color: '#b0b4c5',
              maxWidth: '680px',
              marginBottom: '36px',
            }}
          >
            {t.hero_intro}
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <button
              onClick={() => handleScrollTo('#work')}
              onMouseEnter={() => sound.playHover()}
              data-cursor="WORK"
              className="magnetic-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                borderRadius: '100px',
                backgroundColor: '#ccff00',
                color: '#070709',
                fontSize: '14px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                boxShadow: '0 0 35px rgba(204, 255, 0, 0.35)',
              }}
            >
              <Play size={16} fill="#070709" />
              <span>{t.hero_cta_explore}</span>
            </button>

            <button
              onClick={() => handleScrollTo('#contact')}
              onMouseEnter={() => sound.playHover()}
              data-cursor="CONNECT"
              className="magnetic-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 30px',
                borderRadius: '100px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 700,
                border: '1px solid rgba(255, 255, 255, 0.18)',
                cursor: 'pointer',
                fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#ff5500';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 25px rgba(255, 85, 0, 0.3)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.18)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <Sparkles size={16} color="#ff5500" />
              <span>{t.hero_cta_create}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Interactive Scroll Prompt & Creator Stats Marquee */}
      <div
        className="app-container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.07)',
          paddingTop: '20px',
        }}
      >
        {/* Scroll Prompt with Animated Indicator */}
        <button
          onClick={() => handleScrollTo('#brands')}
          onMouseEnter={() => sound.playHover()}
          data-cursor="SCROLL"
          style={{
            background: 'none',
            border: 'none',
            color: '#8d90a0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '12px',
            fontFamily: 'JetBrains Mono, monospace',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <div
            style={{
              width: '26px',
              height: '42px',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '8px',
                backgroundColor: '#ccff00',
                borderRadius: '2px',
                animation: 'pulse-ring 1.8s infinite',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ color: '#ffffff', fontWeight: 600 }}>{t.hero_scroll_prompt}</span>
            <span style={{ fontSize: '10px', color: '#ccff00' }}>3D INTERACTIVE WORLD</span>
          </div>
        </button>

        {/* Quick Capabilities Highlights */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            color: '#8d90a0',
            fontSize: '11px',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Film size={13} color="#ccff00" />
            <span>4K SHORT-FORM</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Compass size={13} color="#ff5500" />
            <span>CREATIVE DIRECTION</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={13} color="#00f0ff" />
            <span>UGC & HOOKS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
