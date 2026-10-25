import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA, type Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { VolumeX, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isAudioActive: boolean;
  onAudioToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  isAudioActive,
  onAudioToggle,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = PORTFOLIO_DATA.ui[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#work', label: t.nav_work },
    { href: '#brands', label: t.nav_brands },
    { href: '#showreel', label: t.nav_showreel },
    { href: '#about', label: t.nav_about },
    { href: '#services', label: t.nav_services },
    { href: '#process', label: t.nav_process },
    { href: '#contact', label: t.nav_contact },
  ];

  const handleNavClick = (href: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLangToggle = () => {
    sound.playWhoosh();
    onLanguageChange(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          transition: 'all 0.3s ease',
          padding: isScrolled ? '12px 20px' : '22px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 22px',
            borderRadius: '100px',
            backgroundColor: isScrolled ? 'rgba(9, 10, 15, 0.85)' : 'rgba(14, 15, 21, 0.5)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: isScrolled ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Logo Brand Mark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              sound.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            data-cursor="HOME"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: '#ffffff',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#ccff00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#070709',
                fontWeight: 900,
                fontSize: '15px',
                fontFamily: 'Syne, sans-serif',
                boxShadow: '0 0 16px rgba(204, 255, 0, 0.4)',
              }}
            >
              M
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '15px',
                  letterSpacing: lang === 'en' ? '-0.02em' : '0',
                  fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                }}
              >
                {lang === 'en' ? PORTFOLIO_DATA.creator.name_en : PORTFOLIO_DATA.creator.name_ar}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  color: '#ccff00',
                  letterSpacing: '0.08em',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 500,
                }}
              >
                {PORTFOLIO_DATA.creator.audience_count} AUDIENCE
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              gap: '24px',
              alignItems: 'center',
            }}
            className="desktop-nav-links"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => sound.playHover()}
                data-cursor="GO"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#b2b5c4',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '6px 4px',
                  transition: 'color 0.2s ease',
                  letterSpacing: lang === 'en' ? '0.02em' : 'normal',
                }}
                onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.color = '#ccff00')}
                onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.color = '#b2b5c4')}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Controls: Audio, Language & CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Audio Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                onAudioToggle();
              }}
              onMouseEnter={() => sound.playHover()}
              title={isAudioActive ? t.sound_toggle_on : t.sound_toggle_off}
              data-cursor={isAudioActive ? 'MUTE' : 'SOUND'}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: isAudioActive ? 'rgba(204, 255, 0, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: isAudioActive ? '1px solid #ccff00' : '1px solid rgba(255, 255, 255, 0.1)',
                color: isAudioActive ? '#ccff00' : '#888b9c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {isAudioActive ? (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px' }}>
                  <div className="bar-1" style={{ width: '2px', backgroundColor: '#ccff00' }} />
                  <div className="bar-2" style={{ width: '2px', backgroundColor: '#ccff00' }} />
                  <div className="bar-3" style={{ width: '2px', backgroundColor: '#ccff00' }} />
                  <div className="bar-4" style={{ width: '2px', backgroundColor: '#ccff00' }} />
                </div>
              ) : (
                <VolumeX size={15} />
              )}
            </button>

            {/* Bilingual Switcher */}
            <button
              onClick={handleLangToggle}
              onMouseEnter={() => sound.playHover()}
              data-cursor="LANG"
              style={{
                padding: '6px 14px',
                borderRadius: '100px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#ccff00')}
              onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.12)')}
            >
              <span style={{ color: lang === 'en' ? '#ccff00' : '#888b9c' }}>EN</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>/</span>
              <span style={{ color: lang === 'ar' ? '#ccff00' : '#888b9c', fontFamily: 'Alexandria, sans-serif' }}>عربي</span>
            </button>

            {/* Talk / Direct CTA */}
            <button
              onClick={() => handleNavClick('#contact')}
              onMouseEnter={() => sound.playHover()}
              data-cursor="TALK"
              className="magnetic-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '100px',
                backgroundColor: '#ccff00',
                color: '#070709',
                fontSize: '12px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                boxShadow: '0 0 20px rgba(204, 255, 0, 0.3)',
              }}
              id="desktop-cta-btn"
            >
              <span>{t.nav_cta}</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              data-cursor="MENU"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              className="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 490,
            backgroundColor: 'rgba(7, 7, 9, 0.98)',
            backdropFilter: 'blur(30px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 24px',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center', width: '100%', maxWidth: '360px' }}>
            {navLinks.map((link, idx) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '26px',
                  fontWeight: 800,
                  fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                  padding: '10px',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{link.label}</span>
                <span style={{ fontSize: '12px', color: '#ccff00', fontFamily: 'JetBrains Mono, monospace' }}>0{idx + 1}</span>
              </button>
            ))}

            <button
              onClick={() => handleNavClick('#contact')}
              style={{
                marginTop: '20px',
                padding: '16px',
                borderRadius: '16px',
                backgroundColor: '#ccff00',
                color: '#070709',
                fontSize: '16px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Sparkles size={18} />
              <span>{t.nav_cta}</span>
            </button>
          </div>
        </div>
      )}

      {/* Style tweaks for media queries */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav-links {
            display: flex !important;
          }
          #desktop-cta-btn {
            display: inline-flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
