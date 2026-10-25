import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  MessageCircle,
  Mail,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
  Send,
  MapPin,
  Clock,
  Flame,
} from 'lucide-react';

interface Scene05ContactProps {
  lang: Language;
}

export const Scene05Contact: React.FC<Scene05ContactProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const creator = PORTFOLIO_DATA.creator;

  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [selectedGoal, setSelectedGoal] = useState<'reel' | 'campaign' | 'ugc'>('reel');
  const [senderName, setSenderName] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('');

  const handleCopyEmail = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(creator.email);
      setCopiedEmail(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#ffffff', '#d4d4d8', '#71717a'],
      });
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const handleDirectWhatsApp = () => {
    sound.playChime();
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#ffffff', '#e4e4e7', '#27272a'],
    });

    const goalLabel =
      selectedGoal === 'reel'
        ? (isAr ? 'ريلز إعلاني فيروسي' : 'Viral Promo Reel')
        : selectedGoal === 'campaign'
        ? (isAr ? 'حملة إعلانية متكاملة' : 'Full Brand Campaign')
        : (isAr ? 'محتوى UGC عالي الاستبقاء' : 'High-Retention UGC & Hooks');

    const msg = isAr
      ? `مرحباً مهند! أنا ${senderName || 'مهتم بالتعاون'} من طرف ${brandName || 'علامة تجارية'}.\nحابين ننتج: ${goalLabel}.\nمحتاجين نعرف خطة العمل والتفاصيل.`
      : `Hello Mohanad! I'm ${senderName || 'inquiring'} representing ${brandName || 'our brand'}.\nWe want to produce: ${goalLabel}.\nLet's discuss timelines and the creative roadmap.`;

    window.open(`https://wa.me/201023456789?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section
      id="scene-contact"
      className="master-scene-stage"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '110px clamp(16px, 4vw, 50px) 90px',
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Monochrome Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', marginBottom: '16px' }}>
          <Sparkles size={14} />
          <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, letterSpacing: '0.08em' }}>
            SCENE 05 • THE FINALE & COLLABORATION
          </span>
        </div>

        {/* Monumental Kinetic Headline */}
        <div style={{ marginBottom: '40px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1.02,
              color: '#ffffff',
              fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            {isAr ? 'جاهز نعمل محتوى' : 'LET’S CREATE WHAT'}
            <br />
            <span
              style={{
                color: '#ffffff',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(255, 255, 255, 0.3)',
                textUnderlineOffset: '8px',
              }}
            >
              {isAr ? 'يـوقـف الـسـكـرول؟' : 'STOPS THE THUMB.'}
            </span>
          </h2>
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              color: '#a1a1aa',
              marginTop: '16px',
              maxWidth: '750px',
              lineHeight: 1.6,
            }}
          >
            {isAr
              ? 'سواء كنت براند يهدف للوصول لملايين المشاهدات أو تبحث عن هوية سينمائية لمنتجاتك، باب التعاون الإبداعي مفتوح الآن.'
              : 'Whether you want a viral high-conversion campaign or iconic visual direction for your product, let us direct your next breakthrough.'}
          </p>
        </div>

        {/* Dynamic Action Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            alignItems: 'stretch',
          }}
        >
          {/* Column 1: Direct Instant Brief Generator */}
          <div
            className="glass-panel-elevated"
            style={{
              padding: 'clamp(24px, 4vw, 36px)',
              borderRadius: '28px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#0c0c0e',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', marginBottom: '16px' }}>
                <Flame size={16} />
                <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                  INSTANT BRIEF BUILDER
                </span>
              </div>

              {/* Goal Type Picker */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontFamily: 'JetBrains Mono, monospace', marginBottom: '8px' }}>
                  {isAr ? 'نوع المشروع أو الحملة:' : 'Campaign objective:'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                  {[
                    { id: 'reel', labelEn: 'Viral Reel / Commercial', labelAr: 'ريلز إعلاني فيروسي' },
                    { id: 'campaign', labelEn: 'Full Multi-Platform Campaign', labelAr: 'حملة إعلانية متكاملة' },
                    { id: 'ugc', labelEn: 'UGC & High-Retention Hook Series', labelAr: 'سلسلة UGC وهوكس سريعة' },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedGoal(goal.id as any);
                      }}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '12px',
                        backgroundColor: selectedGoal === goal.id ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                        color: selectedGoal === goal.id ? '#000000' : '#d4d4d8',
                        border: selectedGoal === goal.id ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.08)',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: isAr ? 'right' : 'left',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {isAr ? goal.labelAr : goal.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fast Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontFamily: 'JetBrains Mono, monospace', marginBottom: '6px' }}>
                    {isAr ? 'اسمك:' : 'Your Name:'}
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder={isAr ? 'مثال: كريم' : 'e.g. Alex'}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontFamily: 'JetBrains Mono, monospace', marginBottom: '6px' }}>
                    {isAr ? 'اسم البراند:' : 'Brand Name:'}
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder={isAr ? 'اسم الشركة' : 'Company'}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Direct Launch WhatsApp Trigger */}
            <button
              onClick={handleDirectWhatsApp}
              onMouseEnter={() => sound.playHover()}
              data-cursor="WHATSAPP"
              className="magnetic-btn"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '100px',
                backgroundColor: '#ffffff',
                color: '#000000',
                border: 'none',
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                fontFamily: isAr ? 'Alexandria, sans-serif' : 'Syne, sans-serif',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.25)',
                transition: 'transform 0.2s ease, background-color 0.2s',
              }}
            >
              <MessageCircle size={18} />
              <span>{isAr ? 'إرسال البريف ومحادثة واتساب مباشرة' : 'Send Brief via WhatsApp'}</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Column 2: Official Channels, Location & Verified Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'space-between' }}>
            {/* Email Card */}
            <div
              className="glass-panel"
              style={{
                padding: '28px',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: '#0c0c0e',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                    OFFICIAL CORRESPONDENCE
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                    {creator.email}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="COPY"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '100px',
                    backgroundColor: copiedEmail ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
                    color: copiedEmail ? '#000000' : '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedEmail ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الإيميل' : 'Copy Email')}</span>
                </button>

                <a
                  href={`mailto:${creator.email}?subject=Project%20Collaboration`}
                  onClick={() => sound.playClick()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '100px',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  <Send size={13} />
                  <span>{isAr ? 'فتح الإيميل' : 'Open Email'}</span>
                </a>
              </div>
            </div>

            {/* Direct Social Links Matrix */}
            <div
              className="glass-panel"
              style={{
                padding: '24px',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: '#0c0c0e',
              }}
            >
              <div style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: 'JetBrains Mono, monospace', marginBottom: '12px', fontWeight: 800 }}>
                VERIFIED SOCIAL PORTALS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {[
                  { name: 'TikTok', count: '100K+ Followers', url: creator.socials.tiktok },
                  { name: 'Instagram', count: 'Creative Portfolio', url: creator.socials.instagram },
                  { name: 'YouTube', count: 'Director Cuts', url: creator.socials.youtube },
                  { name: 'Behance', count: 'Visual Architecture', url: creator.socials.behance },
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={(e) => {
                      sound.playHover();
                      e.currentTarget.style.borderColor = '#ffffff';
                    }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      textDecoration: 'none',
                      color: '#ffffff',
                      display: 'block',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 800, display: 'flex', justifyContent: 'space-between' }}>
                      <span>{s.name}</span>
                      <ArrowUpRight size={13} color="#ffffff" />
                    </div>
                    <div style={{ fontSize: '10px', color: '#a1a1aa', fontFamily: 'JetBrains Mono, monospace', marginTop: '2px' }}>
                      {s.count}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Location & Fast Turnaround Badge */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#a1a1aa',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={13} color="#ffffff" />
                <span>{isAr ? 'أسيوط والقاهرة، مصر' : 'Assiut & Cairo, Egypt'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={13} color="#ffffff" />
                <span>{isAr ? 'رد خلال ساعات قليلة' : 'Response < 4 Hours'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
