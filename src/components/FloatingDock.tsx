import React, { useState, useEffect } from 'react';
import type { Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import {
  MessageCircle,
  User,
  Film,
  FolderKanban,
  Sliders,
  Award,
  Compass,
  GraduationCap,
  Video,
  Volume2,
  VolumeX,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';

interface FloatingDockProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isAudioActive: boolean;
  onAudioToggle: () => void;
  activeSceneIndex?: number;
  onNavigateToScene?: (index: number) => void;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  lang,
  onLanguageChange,
  isAudioActive,
  onAudioToggle,
  activeSceneIndex = 0,
  onNavigateToScene,
  theme = 'light',
  onThemeToggle,
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

  const handleJump = (index: number, fallbackId: string) => {
    sound.playClick();
    if (onNavigateToScene) {
      onNavigateToScene(index);
    } else {
      const el = document.querySelector(fallbackId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isAr = lang === 'ar';

  const dockScenes = [
    {
      id: 'scene-01',
      index: 0,
      labelEn: '01 • Hero Intro',
      labelAr: '01 • البداية',
      icon: Film,
      fallbackId: '#scene-intro',
      color: '#ccff00',
    },
    {
      id: 'scene-02',
      index: 1,
      labelEn: '02 • The Story',
      labelAr: '02 • عن مهند',
      icon: User,
      fallbackId: '#scene-about',
      color: '#ffd93d',
    },
    {
      id: 'scene-03',
      index: 2,
      labelEn: '03 • Education Lab',
      labelAr: '03 • الدراسة والتعلم',
      icon: GraduationCap,
      fallbackId: '#scene-education',
      color: '#4dd2ff',
    },
    {
      id: 'scene-04',
      index: 3,
      labelEn: '04 • Experience Sets',
      labelAr: '04 • مواقع العمل والخبرة',
      icon: Video,
      fallbackId: '#scene-experience',
      color: '#ff4d8d',
    },
    {
      id: 'scene-05',
      index: 4,
      labelEn: '05 • Skills & Gear',
      labelAr: '05 • العتاد والمهارات',
      icon: Sliders,
      fallbackId: '#scene-skills',
      color: '#ccff00',
    },
    {
      id: 'scene-06',
      index: 5,
      labelEn: '06 • Real Projects',
      labelAr: '06 • معرض المشاريع',
      icon: FolderKanban,
      fallbackId: '#scene-projects',
      color: '#4dd2ff',
    },
    {
      id: 'scene-07',
      index: 6,
      labelEn: '07 • Certifications',
      labelAr: '07 • الكفاءات المعتمدة',
      icon: Award,
      fallbackId: '#scene-certifications',
      color: '#ffd93d',
    },
    {
      id: 'scene-08',
      index: 7,
      labelEn: '08 • Reel Timeline',
      labelAr: '08 • مسيرة الرحلة',
      icon: Compass,
      fallbackId: '#scene-timeline',
      color: '#ff4d8d',
    },
    {
      id: 'scene-09',
      index: 8,
      labelEn: '09 • Direct Hotline',
      labelAr: '09 • تواصل معي',
      icon: MessageCircle,
      fallbackId: '#scene-contact',
      color: '#25D366',
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isScrolled
          ? 'calc(12px + env(safe-area-inset-bottom, 0px))'
          : 'calc(18px + env(safe-area-inset-bottom, 0px))',
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
      {/* Tooltip Pill */}
      {activeTooltip && (
        <div
          style={{
            marginBottom: '8px',
            padding: '4px 12px',
            borderRadius: '100px',
            backgroundColor: '#ffffff',
            border: '2.5px solid #000000',
            color: '#000000',
            fontSize: '11px',
            fontWeight: 900,
            fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-mono)',
            whiteSpace: 'nowrap',
            boxShadow: '3px 3px 0px #000000',
            pointerEvents: 'none',
            transform: 'rotate(-1deg)',
            maxWidth: '90vw',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {activeTooltip}
        </div>
      )}

      {/* Comic Dock Container */}
      <nav
        aria-label="Portfolio Navigation Dock"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(3px, 0.8vw, 6px)',
          padding: 'clamp(5px, 0.8vw, 7px) clamp(8px, 1.2vw, 14px)',
          borderRadius: '24px',
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
        {/* Language Switch Button */}
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
            height: 'clamp(30px, 7.5vw, 36px)',
            padding: '0 clamp(8px, 1.5vw, 12px)',
            borderRadius: '10px',
            backgroundColor: '#ffe600',
            border: '2.5px solid #000000',
            color: '#000000',
            fontSize: 'clamp(11px, 2.5vw, 12px)',
            fontWeight: 900,
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '2px 2px 0px #000000',
            flexShrink: 0,
            transition: 'transform 0.15s ease',
          }}
        >
          <Sparkles size={12} color="#000000" />
          <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
        </button>

        {/* Theme Switch Button (Sun / Moon) */}
        {onThemeToggle && (
          <button
            onClick={() => {
              sound.playClick();
              onThemeToggle();
            }}
            onMouseEnter={() => {
              sound.playHover();
              setActiveTooltip(
                theme === 'light'
                  ? isAr ? 'الوضع الليلي (السينما)' : 'Midnight Cinema Mode'
                  : isAr ? 'الوضع النهاري (الكرتون)' : 'Daylight Cartoon Mode'
              );
            }}
            onMouseLeave={() => setActiveTooltip(null)}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            style={{
              width: 'clamp(30px, 7.5vw, 36px)',
              height: 'clamp(30px, 7.5vw, 36px)',
              borderRadius: '10px',
              backgroundColor: theme === 'light' ? '#ffd93d' : '#23263b',
              border: '2.5px solid #000000',
              color: theme === 'light' ? '#000000' : '#ffd93d',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '2px 2px 0px #000000',
              flexShrink: 0,
              transition: 'transform 0.15s ease',
            }}
          >
            {theme === 'light' ? <Moon size={15} strokeWidth={2.6} /> : <Sun size={15} strokeWidth={2.6} />}
          </button>
        )}

        {/* Divider */}
        <div style={{ width: '2px', height: '22px', backgroundColor: '#33374a', borderRadius: '1px', flexShrink: 0 }} />

        {/* 9 Acts Jump Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(3px, 0.8vw, 6px)', flexShrink: 0 }}>
          {dockScenes.map((item) => {
            const Icon = item.icon;
            const isActive = activeSceneIndex === item.index;
            const tooltipText = isAr ? item.labelAr : item.labelEn;

            return (
              <button
                key={item.id}
                onClick={() => handleJump(item.index, item.fallbackId)}
                onMouseEnter={() => {
                  sound.playHover();
                  setActiveTooltip(tooltipText);
                }}
                onMouseLeave={() => setActiveTooltip(null)}
                aria-label={tooltipText}
                style={{
                  position: 'relative',
                  width: 'clamp(30px, 7.5vw, 36px)',
                  height: 'clamp(30px, 7.5vw, 36px)',
                  borderRadius: '10px',
                  backgroundColor: isActive ? item.color : '#ffffff',
                  color: '#000000',
                  border: '2.5px solid #000000',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isActive ? '2px 2px 0px #ffffff' : '2px 2px 0px #000000',
                  flexShrink: 0,
                  transform: isActive ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                  transition: 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
              >
                <Icon size={15} strokeWidth={2.8} />
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ width: '2px', height: '22px', backgroundColor: '#33374a', borderRadius: '1px', flexShrink: 0 }} />

        {/* Audio Toggle Button */}
        <button
          onClick={onAudioToggle}
          onMouseEnter={() => {
            sound.playHover();
            setActiveTooltip(
              isAudioActive
                ? isAr ? 'كتم المؤثرات 🔇' : 'Mute SFX 🔇'
                : isAr ? 'تشغيل المؤثرات 🔊' : 'Turn On SFX 🔊'
            );
          }}
          onMouseLeave={() => setActiveTooltip(null)}
          aria-label={isAudioActive ? 'Sound On' : 'Sound Muted'}
          style={{
            width: 'clamp(30px, 7.5vw, 36px)',
            height: 'clamp(30px, 7.5vw, 36px)',
            borderRadius: '10px',
            backgroundColor: isAudioActive ? '#ccff00' : '#1b1d28',
            color: isAudioActive ? '#000000' : '#8d90a0',
            border: '2.5px solid #000000',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '2px 2px 0px #000000',
            flexShrink: 0,
            transition: 'all 0.15s ease',
          }}
        >
          {isAudioActive ? (
            <Volume2 size={15} strokeWidth={2.8} color="#000000" />
          ) : (
            <VolumeX size={15} strokeWidth={2.4} color="#8d90a0" />
          )}
        </button>
      </nav>
    </div>
  );
};
