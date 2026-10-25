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
        bottom: isScrolled ? '18px' : '26px',
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 16px',
        pointerEvents: 'none',
        transition: 'bottom 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
    >
      {/* الـ Tooltip يطفو لأعلى فوق الـ Dock */}
      {activeTooltip && (
        <div
          style={{
            marginBottom: '12px',
            padding: '6px 14px',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            border: '2.5px solid #000000',
            color: '#000000',
            fontSize: '12px',
            fontWeight: 900,
            fontFamily: lang === 'en' ? 'JetBrains Mono, monospace' : 'var(--font-display-ar, sans-serif)',
            whiteSpace: 'nowrap',
            boxShadow: '4px 4px 0px #000000',
            pointerEvents: 'none',
            transform: 'rotate(-1.5deg)',
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
          gap: '8px',
          padding: '7px 12px',
          borderRadius: '20px',
          backgroundColor: '#0c0d16',
          border: '3px solid #000000',
          boxShadow: isScrolled
            ? '6px 6px 0px #000000, 6px 6px 0px 3px #ccff00'
            : '8px 8px 0px #000000, 8px 8px 0px 3px #ccff00',
          transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isScrolled ? 'scale(0.96)' : 'scale(1)',
        }}
      >
        {/* زر تبديل اللغة كملصق كرتوني */}
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
            height: '36px',
            padding: '0 14px',
            borderRadius: '10px',
            backgroundColor: '#ffe600',
            border: '2.5px solid #000000',
            color: '#000000',
            fontSize: '13px',
            fontWeight: 900,
            fontFamily: 'JetBrains Mono, monospace',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '3px 3px 0px #000000',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translate(2px, 2px)';
            e.currentTarget.style.boxShadow = '1px 1px 0px #000000';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
          }}
        >
          <Sparkles size={13} color="#000000" />
          <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
        </button>

        {/* فاصل كرتوني عمودي */}
        <div style={{ width: '3px', height: '24px', backgroundColor: '#000000', borderRadius: '2px' }} />

        {/* أزرار المشاهد والواتساب */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  setActiveTooltip(null);
                  e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                }}
                aria-label={tooltipText}
                style={{
                  position: 'relative',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: item.bg,
                  color: item.activeColor,
                  border: '2.5px solid #000000',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '3px 3px 0px #000000',
                  transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.15s ease',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translate(2px, 2px)';
                  e.currentTarget.style.boxShadow = '1px 1px 0px #000000';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
                  e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
                }}
              >
                <Icon size={19} strokeWidth={2.6} />
              </button>
            );
          })}
        </div>

        {/* فاصل كرتوني عمودي */}
        <div style={{ width: '3px', height: '24px', backgroundColor: '#000000', borderRadius: '2px' }} />

        {/* زر التحكم بالصوت */}
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
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            setActiveTooltip(null);
            e.currentTarget.style.transform = 'translateY(0px)';
          }}
          aria-label={isAudioActive ? 'Sound On' : 'Sound Muted'}
          style={{
            height: '36px',
            padding: '0 12px',
            borderRadius: '10px',
            backgroundColor: isAudioActive ? '#ccff00' : '#222538',
            border: '2.5px solid #000000',
            color: isAudioActive ? '#000000' : '#8c90a4',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '3px 3px 0px #000000',
            transition: 'all 0.2s ease',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translate(2px, 2px)';
            e.currentTarget.style.boxShadow = '1px 1px 0px #000000';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
          }}
        >
          {isAudioActive ? (
            <>
              <Volume2 size={17} strokeWidth={2.8} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '14px' }}>
                <span style={{ width: '3px', height: '12px', backgroundColor: '#000000', borderRadius: '2px', animation: 'comic-pulse 0.8s infinite' }} />
                <span style={{ width: '3px', height: '7px', backgroundColor: '#000000', borderRadius: '2px', animation: 'comic-pulse 0.6s infinite 0.2s' }} />
                <span style={{ width: '3px', height: '14px', backgroundColor: '#000000', borderRadius: '2px', animation: 'comic-pulse 0.9s infinite 0.4s' }} />
              </div>
            </>
          ) : (
            <VolumeX size={17} strokeWidth={2.6} />
          )}
        </button>
      </nav>
    </div>
  );
};