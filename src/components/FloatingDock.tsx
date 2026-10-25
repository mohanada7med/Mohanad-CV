import React, { useState, useEffect } from 'react';
import { type Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import {
  MessageCircle,
  User,
  Film,
  FolderKanban,
  LayoutGrid,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface FloatingDockProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isAudioActive: boolean;
  onAudioToggle: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  lang,
  onLanguageChange,
  isAudioActive,
  onAudioToggle,
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    sound.playClick();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dockItems = [
    {
      id: 'whatsapp',
      labelEn: 'Chat on WhatsApp',
      labelAr: 'تواصل مباشر واتساب',
      icon: MessageCircle,
      bg: '#18181b',
      color: '#ffffff',
      action: () => {
        sound.playClick();
        window.open('https://wa.me/201023456789?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85%D9%87%D9%86%D8%AF%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%88%D9%86%20%D9%85%D8%B9%D9%83%20%D9%81%D9%8A%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D9%81%D9%8A%D8%AF%D9%8A%D9%88', '_blank');
      },
    },
    {
      id: 'intro',
      labelEn: 'Scene 01 • Intro',
      labelAr: 'المشهد 01 • البداية',
      icon: Film,
      bg: '#18181b',
      color: '#ffffff',
      action: () => handleScrollTo('#scene-intro'),
    },
    {
      id: 'about',
      labelEn: 'Scene 02 • About',
      labelAr: 'المشهد 02 • عن مهند',
      icon: User,
      bg: '#18181b',
      color: '#ffffff',
      action: () => handleScrollTo('#scene-about'),
    },
    {
      id: 'projects',
      labelEn: 'Scene 03 • Cinema Vault',
      labelAr: 'المشهد 03 • معرض المشاريع',
      icon: FolderKanban,
      bg: '#18181b',
      color: '#ffffff',
      action: () => handleScrollTo('#scene-projects'),
    },
    {
      id: 'arsenal',
      labelEn: 'Scene 04 • Arsenal & Suite',
      labelAr: 'المشهد 04 • العتاد والمهارات',
      icon: LayoutGrid,
      bg: '#18181b',
      color: '#ffffff',
      action: () => handleScrollTo('#scene-arsenal'),
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none',
      }}
    >
      <nav
        aria-label="Quick Actions Dock"
        className="floating-dock-pill"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 10px',
          borderRadius: '100px',
          backgroundColor: isScrolled ? 'rgba(12, 10, 9, 0.88)' : 'rgba(18, 14, 12, 0.72)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isScrolled ? 'scale(0.96)' : 'scale(1)',
        }}
      >
        {/* Language Switcher Pill */}
        <button
          onClick={() => {
            sound.playWhoosh();
            onLanguageChange(lang === 'en' ? 'ar' : 'en');
          }}
          onMouseEnter={() => {
            sound.playHover();
            setActiveTooltip(lang === 'en' ? 'التحويل للعربية' : 'Switch to English');
          }}
          onMouseLeave={() => setActiveTooltip(null)}
          title={lang === 'en' ? 'Switch to Arabic' : 'التحويل للإنجليزية'}
          style={{
            height: '34px',
            padding: '0 12px',
            borderRadius: '100px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#f5f5f7',
            fontSize: '12px',
            fontWeight: 800,
            fontFamily: 'JetBrains Mono, monospace',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s, transform 0.2s',
          }}
          className="magnetic-btn"
        >
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>

        {/* Separator hairline */}
        <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />

        {/* Dock App Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {dockItems.map((item) => {
            const Icon = item.icon;
            const tooltipText = lang === 'en' ? item.labelEn : item.labelAr;
            return (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => {
                  sound.playHover();
                  setActiveTooltip(tooltipText);
                }}
                onMouseLeave={() => setActiveTooltip(null)}
                aria-label={tooltipText}
                style={{
                  position: 'relative',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: item.bg,
                  color: item.color,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 14px ${item.bg}55`,
                  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
                }}
                className="magnetic-btn"
              >
                <Icon size={18} strokeWidth={2.4} />
              </button>
            );
          })}
        </div>

        {/* Separator hairline */}
        <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />

        {/* Sound FX Toggle with Interactive Waves */}
        <button
          onClick={() => {
            onAudioToggle();
          }}
          onMouseEnter={() => {
            sound.playHover();
            setActiveTooltip(
              isAudioActive
                ? (lang === 'en' ? 'Mute Sound FX' : 'كتم المؤثرات الصوتية')
                : (lang === 'en' ? 'Enable Sound FX' : 'تشغيل المؤثرات الصوتية')
            );
          }}
          onMouseLeave={() => setActiveTooltip(null)}
          aria-label={isAudioActive ? 'Sound On' : 'Sound Muted'}
          style={{
            height: '34px',
            padding: '0 10px',
            borderRadius: '100px',
            backgroundColor: isAudioActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.06)',
            border: isAudioActive ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
            color: isAudioActive ? '#ffffff' : '#8d90a0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
          }}
          className="magnetic-btn"
        >
          {isAudioActive ? (
            <>
              <Volume2 size={15} color="#ffffff" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '14px' }}>
                <span className="bar-1" style={{ width: '2px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
                <span className="bar-2" style={{ width: '2px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
                <span className="bar-3" style={{ width: '2px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
              </div>
            </>
          ) : (
            <VolumeX size={15} />
          )}
        </button>
      </nav>

      {/* Floating Floating Tooltip */}
      {activeTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '56px',
            padding: '5px 12px',
            borderRadius: '8px',
            backgroundColor: 'rgba(8, 7, 7, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#f5f5fa',
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: lang === 'en' ? 'Space Grotesk, sans-serif' : 'IBM Plex Sans Arabic, sans-serif',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8)',
            pointerEvents: 'none',
            animation: 'fadeIn 0.15s ease',
          }}
        >
          {activeTooltip}
        </div>
      )}
    </div>
  );
};
