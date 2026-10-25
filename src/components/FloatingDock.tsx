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
  Sparkles,
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
      setIsScrolled(window.scrollY > 40);
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
      labelEn: 'WhatsApp Direct',
      labelAr: 'تواصل مباشر واتساب',
      icon: MessageCircle,
      bg: '#25D366',
      activeColor: '#000000',
      action: () => {
        sound.playClick();
        window.open(
          'https://wa.me/201023456789?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85%D9%87%D9%86%D8%AF%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%88%D9%86%20%D9%85%D8%B9%D9%83%20%D9%81%D9%8A%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D9%81%D9%8A%D8%AF%D9%8A%D9%88',
          '_blank'
        );
      },
    },
    {
      id: 'intro',
      labelEn: 'Scene 01 • Hero Splash',
      labelAr: 'المشهد 01 • البداية',
      icon: Film,
      bg: '#ffffff',
      activeColor: '#000000',
      action: () => handleScrollTo('#scene-intro'),
    },
    {
      id: 'about',
      labelEn: 'Scene 02 • Comic Story',
      labelAr: 'المشهد 02 • عن مهند',
      icon: User,
      bg: '#ffffff',
      activeColor: '#000000',
      action: () => handleScrollTo('#scene-about'),
    },
    {
      id: 'projects',
      labelEn: 'Scene 03 • Cinema Vault',
      labelAr: 'المشهد 03 • معرض المشاريع',
      icon: FolderKanban,
      bg: '#ccff00',
      activeColor: '#000000',
      action: () => handleScrollTo('#scene-projects'),
    },
    {
      id: 'arsenal',
      labelEn: 'Scene 04 • The Arsenal',
      labelAr: 'المشهد 04 • العتاد والمهارات',
      icon: LayoutGrid,
      bg: '#ffffff',
      activeColor: '#000000',
      action: () => handleScrollTo('#scene-arsenal'),
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isScrolled
          ? 'calc(14px + env(safe-area-inset-bottom, 0px))'
          : 'calc(20px + env(safe-area-inset-bottom, 0px))',
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 clamp(8px, 2vw, 16px)',
        pointerEvents: 'none',
        transition: 'bottom 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Floating Tooltip Banner */}
      {activeTooltip && (
        <div
          style={{
            marginBottom: '10px',
            padding: '5px 12px',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            border: '2.5px solid #000000',
            color: '#000000',
            fontSize: '11px',
            fontWeight: 900,
            fontFamily: lang === 'en' ? 'var(--font-mono)' : 'var(--font-display-ar)',
            whiteSpace: 'nowrap',
            boxShadow: '3px 3px 0px #000000',
            pointerEvents: 'none',
            transform: 'rotate(-1.5deg)',
            maxWidth: '90vw',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {activeTooltip}
        </div>
      )}

      <nav
        aria-label="Comic Quick Dock Bottom"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(4px, 1.2vw, 8px)',
          padding: 'clamp(5px, 1vw, 7px) clamp(8px, 1.5vw, 12px)',
          borderRadius: '20px',
          backgroundColor: '#0c0d16',
          border: '3px solid #000000',
          boxShadow: isScrolled
            ? '5px 5px 0px #000000, 5px 5px 0px 2.5px #ccff00'
            : '7px 7px 0px #000000, 7px 7px 0px 2.5px #ccff00',
          transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          maxWidth: 'calc(100vw - 16px)',
          boxSizing: 'border-box',
          overflowX: 'auto',
        }}
      >
        {/* Language switch button */}
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
            height: 'clamp(32px, 8.5vw, 36px)',
            padding: '0 clamp(8px, 2vw, 12px)',
            borderRadius: '10px',
            backgroundColor: '#ffe600',
            border: '2.5px solid #000000',
            color: '#000000',
            fontSize: 'clamp(11px, 2.8vw, 13px)',
            fontWeight: 900,
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '2.5px 2.5px 0px #000000',
            flexShrink: 0,
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translate(1.5px, 1.5px)';
            e.currentTarget.style.boxShadow = '1px 1px 0px #000000';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '2.5px 2.5px 0px #000000';
          }}
        >
          <Sparkles size={12} color="#000000" />
          <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
        </button>

        {/* Vertical divider */}
        <div style={{ width: '2px', height: '22px', backgroundColor: '#33374a', borderRadius: '1px', flexShrink: 0 }} />

        {/* Scene navigation buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px, 1vw, 8px)', flexShrink: 0 }}>
          {dockItems.map((item) => {
            const Icon = item.icon;
            const tooltipText = lang === 'en' ? item.labelEn : item.labelAr;
            return (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={(e) => {
                  sound.playHover();
                  setActiveTooltip(tooltipText);
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.06)';
                }}
                onMouseLeave={(e) => {
                  setActiveTooltip(null);
                  e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                }}
                aria-label={tooltipText}
                style={{
                  position: 'relative',
                  width: 'clamp(32px, 8.5vw, 38px)',
                  height: 'clamp(32px, 8.5vw, 38px)',
                  borderRadius: '10px',
                  backgroundColor: item.bg,
                  color: item.activeColor,
                  border: '2.5px solid #000000',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '2.5px 2.5px 0px #000000',
                  flexShrink: 0,
                  transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.15s ease',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translate(1.5px, 1.5px)';
                  e.currentTarget.style.boxShadow = '1px 1px 0px #000000';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.06)';
                  e.currentTarget.style.boxShadow = '2.5px 2.5px 0px #000000';
                }}
              >
                <Icon size={17} strokeWidth={2.6} />
              </button>
            );
          })}
        </div>

        {/* Vertical divider */}
        <div style={{ width: '2px', height: '22px', backgroundColor: '#33374a', borderRadius: '1px', flexShrink: 0 }} />

        {/* Audio Toggle Button */}
        <button
          onClick={() => {
            onAudioToggle();
          }}
          onMouseEnter={(e) => {
            sound.playHover();
            setActiveTooltip(
              isAudioActive
                ? lang === 'en'
                  ? 'Mute SFX 🔇'
                  : 'كتم المؤثرات 🔇'
                : lang === 'en'
                  ? 'Turn On SFX 🔊'
                  : 'تشغيل المؤثرات 🔊'
            );
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            setActiveTooltip(null);
            e.currentTarget.style.transform = 'translateY(0px)';
          }}
          aria-label={isAudioActive ? 'Sound On' : 'Sound Muted'}
          style={{
            height: 'clamp(32px, 8.5vw, 36px)',
            padding: '0 clamp(8px, 1.5vw, 10px)',
            borderRadius: '10px',
            backgroundColor: isAudioActive ? '#ccff00' : '#1b1d28',
            color: isAudioActive ? '#000000' : '#8d90a0',
            border: '2.5px solid #000000',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            boxShadow: '2.5px 2.5px 0px #000000',
            flexShrink: 0,
            transition: 'all 0.15s ease',
          }}
        >
          {isAudioActive ? (
            <Volume2 size={16} strokeWidth={2.6} color="#000000" />
          ) : (
            <VolumeX size={16} strokeWidth={2.4} color="#8d90a0" />
          )}
        </button>
      </nav>
    </div>
  );
};