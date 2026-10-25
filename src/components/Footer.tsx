import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ArrowUp, MapPin } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = PORTFOLIO_DATA.ui[lang];
  const creator = PORTFOLIO_DATA.creator;

  const handleScrollTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#040406',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '90px',
        paddingBottom: '50px',
        overflow: 'hidden',
      }}
    >
      <div className="app-container">
        {/* Massive Closing Monogram Typography */}
        <div
          style={{
            userSelect: 'none',
            textAlign: 'center',
            marginBottom: '60px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            paddingBottom: '50px',
          }}
        >
          <div
            className="font-heading"
            style={{
              fontSize: 'clamp(2.8rem, 11vw, 9.8rem)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: '#ffffff' }}>MOHANAD </span>
            <span className="text-stroke-subtle">AHMED</span>
          </div>
          <div
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              fontFamily: 'Alexandria, sans-serif',
              fontWeight: 800,
              color: '#ccff00',
              marginTop: '12px',
            }}
          >
            مهند أحمد
          </div>
        </div>

        {/* Footer Meta Split */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '30px',
          }}
        >
          {/* Creator & Location */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ccff00', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
              <MapPin size={14} />
              <span>{lang === 'en' ? t.footer_location : 'أسيوط، مصر — متاح للتعاون محلياً ودولياً'}</span>
            </div>
            <div style={{ color: '#8d90a0', fontSize: '13px', marginTop: '6px' }}>
              {t.footer_rights} © 2019 — {CURRENT_YEAR}
            </div>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a
              href={creator.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              style={{ color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}
            >
              TikTok
            </a>
            <a
              href={creator.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              style={{ color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}
            >
              Instagram
            </a>
            <a
              href={creator.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              style={{ color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${creator.email}`}
              onMouseEnter={() => sound.playHover()}
              style={{ color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}
            >
              Email
            </a>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={handleScrollTop}
            onMouseEnter={() => sound.playHover()}
            data-cursor="TOP"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '100px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} color="#ccff00" />
          </button>
        </div>
      </div>
    </footer>
  );
};
