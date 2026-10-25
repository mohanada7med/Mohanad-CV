import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  lang: Language;
  onStartProject?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, onStartProject }) => {
  const creator = PORTFOLIO_DATA.creator;
  const isAr = lang === 'ar';

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      // Scrollytelling split typography outward momentum
      gsap.to('.hero-right-word', {
        x: isAr ? -100 : 100,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero-left-word', {
        x: isAr ? 100 : -100,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Portrait subtle depth float
      gsap.to('.hero-portrait-stage', {
        y: 40,
        scale: 0.94,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, hero);

    return () => ctx.revert();
  }, [isAr]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleCtaClick = () => {
    sound.playChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ccd5c9', '#ff5500', '#ccff00', '#ffffff'],
    });

    if (onStartProject) {
      onStartProject();
    } else {
      const el = document.querySelector('#contact') || document.querySelector('#folder-deck');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Parallax calculations
  const textShiftX = mousePos.x * 22;
  const textShiftY = mousePos.y * 14;
  const portraitRotateY = mousePos.x * 12;
  const portraitRotateX = -mousePos.y * 10;

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      id="hero"
      className="studio-hero-gradient"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '92vh',
        paddingTop: '90px',
        paddingBottom: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Ambient Radial Vignette Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 40%, rgba(68, 42, 28, 0.35) 0%, rgba(18, 12, 9, 0.8) 60%, #070709 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle Studio Floating Dust & Horizon Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(140, 85, 52, 0.22) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Floating Mini Metric Badges (Discreet and slick) */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '100px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            fontSize: '12px',
            color: '#ccd5c9',
            fontFamily: isAr ? 'IBM Plex Sans Arabic, sans-serif' : 'JetBrains Mono, monospace',
          }}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#ccff00', boxShadow: '0 0 10px #ccff00' }} />
          <span>{isAr ? 'متاح للتعاقد مع البراندات والشركات' : 'Available for Brand Campaigns & UGC'}</span>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '100px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '12px',
            color: '#ccd5c9',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          <Eye size={13} color="#ff7a00" />
          <span>20M+ Views Across Socials</span>
        </div>
      </div>

      {/* Monumental Hero Stage Container (Split Typography + Center Portrait) */}
      <div
        className="perspective-container"
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Right Word in RTL (e.g. "مهند") or Left Word in LTR ("MOHANAD") */}
        <div
          className="hero-right-word"
          style={{
            flex: 1,
            textAlign: isAr ? 'left' : 'right',
            transform: `translate3d(${isAr ? textShiftX : -textShiftX}px, ${textShiftY}px, 0)`,
            transition: 'transform 0.15s ease-out',
            zIndex: 5,
          }}
        >
          <h1
            className="monumental-name"
            style={{
              fontSize: 'clamp(3.5rem, 9.5vw, 9.5rem)',
              margin: 0,
            }}
          >
            {isAr ? 'مـهـنـد' : 'MOHANAD'}
          </h1>
        </div>

        {/* Center Creator Portrait with Dynamic Studio Vignette */}
        <div
          className="hero-portrait-stage"
          style={{
            position: 'relative',
            zIndex: 15,
            width: 'clamp(240px, 26vw, 360px)',
            height: 'clamp(320px, 35vw, 480px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `perspective(1000px) rotateY(${portraitRotateY}deg) rotateX(${portraitRotateX}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* Subtle Silhouette Rim Backlight */}
          <div
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '32px',
              background: 'radial-gradient(circle at center, rgba(204, 213, 201, 0.18) 0%, rgba(255, 122, 0, 0.12) 50%, transparent 75%)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
            }}
          />

          {/* Portrait Container with Soft Arch / Vignette Cutout */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(48, 29, 20, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backgroundColor: '#0c0a09',
            }}
          >
            <img
              src={creator.portrait_image}
              alt={creator.name_en}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            {/* Bottom Gradient Fade */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(14, 10, 8, 0.85) 0%, rgba(14, 10, 8, 0.1) 40%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Live Camera HUD Graphic in Corner */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                color: '#ccff00',
                fontWeight: 700,
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ff2200' }} />
              <span>4K • 60FPS</span>
            </div>
          </div>
        </div>

        {/* Left Word in RTL (e.g. "أحمد") or Right Word in LTR ("AHMED") */}
        <div
          className="hero-left-word"
          style={{
            flex: 1,
            textAlign: isAr ? 'right' : 'left',
            transform: `translate3d(${isAr ? -textShiftX : textShiftX}px, ${textShiftY}px, 0)`,
            transition: 'transform 0.15s ease-out',
            zIndex: 5,
          }}
        >
          <h1
            className="monumental-name"
            style={{
              fontSize: 'clamp(3.5rem, 9.5vw, 9.5rem)',
              margin: 0,
            }}
          >
            {isAr ? 'أحـمـد' : 'AHMED'}
          </h1>
        </div>
      </div>

      {/* Central Interactive Call-To-Action Button (Directly inspired by reference) */}
      <div
        style={{
          position: 'relative',
          zIndex: 30,
          marginTop: '28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <button
          onClick={handleCtaClick}
          onMouseEnter={() => sound.playHover()}
          data-cursor="START"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 24px 10px 18px',
            borderRadius: '100px',
            backgroundColor: '#ccd5c9',
            color: '#0d0f0c',
            border: 'none',
            fontSize: '15px',
            fontWeight: 800,
            fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
            cursor: 'pointer',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(204, 213, 201, 0.3)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="magnetic-btn"
        >
          {/* Circular dark arrow button */}
          <span
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#0f110e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ccd5c9',
            }}
          >
            {isAr ? <ArrowLeft size={16} strokeWidth={2.5} /> : <ArrowRight size={16} strokeWidth={2.5} />}
          </span>
          <span>{isAr ? 'ابدأ مشروعك' : 'Start Your Project'}</span>
        </button>

        {/* Short Subtitle Role Indicator */}
        <p
          style={{
            fontSize: '14px',
            color: '#8d90a0',
            fontFamily: isAr ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Grotesk, sans-serif',
            margin: 0,
            textAlign: 'center',
          }}
        >
          {isAr
            ? 'صانع محتوى وفيديو سينمائي • بالتعاون مع كبرى العلامات التجارية في مصر'
            : 'Creative Video Storyteller • Collaborating with Egypt\'s Leading Brands'}
        </p>
      </div>
    </section>
  );
};
