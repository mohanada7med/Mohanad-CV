import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { ComicBadge, ComicStars, SpeechBubble } from '../comic/ComicElements';
import { MessageCircle, Mail, Copy, Check, ArrowUpRight, Flame } from 'lucide-react';

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
        particleCount: 70,
        spread: 80,
        origin: { y: 0.8 },
        colors: ['#ccff00', '#ffffff', '#ffe600', '#ff3366'],
      });
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const handleDirectWhatsApp = () => {
    sound.playChime();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#ccff00', '#00e5ff', '#ffe600', '#ff3366'],
    });

    const goalLabel =
      selectedGoal === 'reel'
        ? (isAr ? 'ريلز إعلاني فيروسي' : 'Viral Promo Reel')
        : selectedGoal === 'campaign'
        ? (isAr ? 'حملة إعلانية متكاملة' : 'Full Brand Campaign')
        : (isAr ? 'محتوى UGC عالي الاستبقاء' : 'High-Retention UGC & Hooks');

    const msg = isAr
      ? `مرحباً كابتن مهند! أنا ${senderName || 'مهتم بالتعاون'} من طرف ${brandName || 'علامة تجارية'}.\nحابين ننتج: ${goalLabel}.\nمحتاجين نحدد موعد ونبدأ التصوير!`
      : `Hey Mohanad! I'm ${senderName || 'reaching out'} from ${brandName || 'our brand'}.\nWe want to collaborate on: ${goalLabel}.\nLet's roll cameras and make something iconic!`;

    window.open(`https://wa.me/201023456789?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section
      id="scene-contact"
      className="master-scene-stage comic-halftone-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '110px clamp(16px, 4vw, 50px) 90px',
        backgroundColor: '#0a0b10',
        borderBottom: '4px solid #000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Floating Decorative Comic Stars */}
      <div style={{ position: 'absolute', top: '12%', right: '8%', pointerEvents: 'none' }}>
        <ComicStars size={36} color="#ccff00" />
      </div>
      <div style={{ position: 'absolute', bottom: '15%', left: '6%', pointerEvents: 'none' }}>
        <ComicStars size={30} color="#ffe600" />
      </div>

      <div style={{ maxWidth: '1360px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Comic Finale Eyebrow Banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <ComicBadge text="FINALE • EPISODE 05" subtext="THE END?" bg="#ccff00" rotation={-3} />
          <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', color: '#ccff00', fontWeight: 900 }}>
            ★ TO BE CONTINUED ON YOUR NEXT CAMPAIGN!
          </span>
        </div>

        {/* Monumental Kinetic Headline */}
        <div style={{ marginBottom: '36px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.6rem, 5.8vw, 5.2rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: '#ffffff',
              fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
              letterSpacing: '-0.02em',
              margin: 0,
              filter: 'drop-shadow(4px 4px 0px #000000)',
            }}
          >
            {isAr ? 'جاهز نعمل محتوى' : 'READY TO CREATE WHAT'}
            <br />
            <span
              style={{
                color: '#ccff00',
                display: 'inline-block',
                transform: 'rotate(-1deg)',
                textShadow: '4px 4px 0px #000000',
              }}
            >
              {isAr ? 'يـوقـف الـسـكـرول ويصنع التريند؟' : 'STOPS THUMBS & GOES VIRAL?'}
            </span>
          </h2>
          <p
            style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: '#d4d5e5',
              marginTop: '14px',
              maxWidth: '750px',
              lineHeight: 1.6,
              fontFamily: isAr ? 'var(--font-body-ar)' : 'Space Grotesk, sans-serif',
            }}
          >
            {isAr
              ? 'سواء كنت براند يهدف للوصول لملايين المشاهدات أو تبحث عن هوية سينمائية لمنتجاتك، باب التعاون الإبداعي مفتوح الآن.'
              : 'Whether you want a high-conversion viral campaign or iconic visual direction for your product, let us roll cameras on your next big hit.'}
          </p>
        </div>

        {/* Dynamic Action Grid: Brief Generator + Clapperboard Action Avatar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            alignItems: 'center',
          }}
        >
          {/* Column 1: Direct Comic Brief Generator */}
          <div
            className="comic-panel"
            style={{
              padding: 'clamp(24px, 4vw, 36px)',
              borderRadius: '24px',
              border: '4px solid #000000',
              boxShadow: '8px 8px 0px #ccff00, 8px 8px 0px 4px #000000',
              backgroundColor: '#141622',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                  <Flame size={18} color="#ccff00" />
                  <span style={{ fontSize: '13px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 900 }}>
                    FAST COLLAB BRIEF BUILDER
                  </span>
                </div>
                <ComicBadge text="INSTANT" bg="#ffe600" rotation={2} />
              </div>

              {/* Goal Type Picker */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#a1a3b5', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, marginBottom: '8px' }}>
                  {isAr ? 'اختر هدف الحملة أو الفيديو:' : 'SELECT CAMPAIGN OBJECTIVE:'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                  {[
                    { id: 'reel', labelEn: 'Viral Promo Reel / Commercial', labelAr: 'ريلز إعلاني فيروسي' },
                    { id: 'campaign', labelEn: 'Full Multi-Platform Campaign', labelAr: 'حملة إعلانية متكاملة' },
                    { id: 'ugc', labelEn: 'UGC & High-Retention Hook Series', labelAr: 'سلسلة UGC وهوكس سريعة' },
                  ].map((goal) => {
                    const isSelected = selectedGoal === goal.id;
                    return (
                      <button
                        key={goal.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedGoal(goal.id as any);
                        }}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '12px',
                          backgroundColor: isSelected ? '#ccff00' : '#0a0a0f',
                          color: isSelected ? '#000000' : '#f5f6fa',
                          border: '2.5px solid #000000',
                          fontSize: '13px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          textAlign: isAr ? 'right' : 'left',
                          boxShadow: isSelected ? '4px 4px 0px #000000' : '2px 2px 0px #000000',
                          transform: isSelected ? 'translateX(4px)' : 'none',
                          transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                      >
                        {isSelected ? '★ ' : '○ '}
                        {isAr ? goal.labelAr : goal.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fast Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a3b5', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, marginBottom: '6px' }}>
                    {isAr ? 'اسمك:' : 'YOUR NAME:'}
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder={isAr ? 'مثال: أحمد' : 'e.g. Alex'}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#0a0b10',
                      border: '2px solid #000000',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 700,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a3b5', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, marginBottom: '6px' }}>
                    {isAr ? 'اسم البراند / الشركة:' : 'BRAND / COMPANY:'}
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder={isAr ? 'مثال: شركة براند' : 'e.g. Acme Studio'}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#0a0b10',
                      border: '2px solid #000000',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 700,
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Direct Action Button Trigger */}
            <button
              onClick={handleDirectWhatsApp}
              data-cursor="WHATSAPP"
              className="comic-btn"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '15px',
              }}
            >
              <MessageCircle size={20} />
              <span>{isAr ? 'إرسال البريف ومحادثة واتساب مباشرة' : 'Send Brief via WhatsApp'}</span>
              <ArrowUpRight size={18} />
            </button>
          </div>

          {/* Column 2: Cartoon Finale Character Composition (Action Pose holding Clapperboard) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Clapperboard Character Card */}
            <div
              className="comic-panel animate-comic-float"
              style={{
                position: 'relative',
                width: 'clamp(240px, 30vw, 340px)',
                height: 'clamp(320px, 38vw, 440px)',
                borderRadius: '28px',
                border: '4.5px solid #000000',
                backgroundColor: '#161824',
                boxShadow: '10px 10px 0px #ffe600, 10px 10px 0px 4px #000000',
                overflow: 'hidden',
                zIndex: 4,
              }}
            >
              <img
                src="/assets/images/mohanad_action_pose.jpg"
                alt="Mohanad Ahmed — Director Action Finale"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Bottom Cut Ribbon */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  right: '12px',
                  padding: '8px 12px',
                  backgroundColor: '#000000',
                  border: '2px solid #ccff00',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 900,
                }}
              >
                <span style={{ color: '#ccff00' }}>SCENE: FINALE</span>
                <span>TAKE 01 • ACTION!</span>
              </div>
            </div>

            {/* Speech Bubble coming from Mohanad */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: isAr ? 'auto' : '-30px',
                left: isAr ? '-30px' : 'auto',
                maxWidth: '240px',
                zIndex: 10,
              }}
            >
              <SpeechBubble
                tailDirection={isAr ? 'bottom-right' : 'bottom-left'}
                bgColor="#ffe600"
                textColor="#000000"
                borderColor="#000000"
                shadowColor="#000000"
              >
                <div style={{ fontSize: '12px', lineHeight: 1.4, fontWeight: 900 }}>
                  {isAr
                    ? '🎬 "فركش المشهد! جاهزين نصنع إعلانك اللي هيقلب السوشيال ميديا!"'
                    : '🎬 "That’s a wrap! Let’s roll cameras & make your brand go viral!"'}
                </div>
              </SpeechBubble>
            </div>

            {/* Quick Email & Social Profiles Strip */}
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
                maxWidth: '340px',
              }}
            >
              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sound.playHover()}
                style={{
                  padding: '12px 18px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  fontWeight: 900,
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0px #ccff00';
                }}
                onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.transform = 'translate(0px, 0px)';
                  e.currentTarget.style.boxShadow = '4px 4px 0px #000000';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={16} />
                  <span>{copiedEmail ? (isAr ? 'تم نسخ الإيميل!' : 'Email Copied!') : creator.email}</span>
                </div>
                {copiedEmail ? <Check size={16} color="#00aa44" /> : <Copy size={16} />}
              </button>

              {/* Social Channels Comic Badges */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { name: 'Instagram', url: creator.socials.instagram, bg: '#ff3366', color: '#ffffff' },
                  { name: 'TikTok', url: creator.socials.tiktok, bg: '#000000', color: '#ccff00' },
                  { name: 'YouTube', url: creator.socials.youtube, bg: '#ffe600', color: '#000000' },
                  { name: 'Behance', url: creator.socials.behance, bg: '#00e5ff', color: '#000000' },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      backgroundColor: s.bg,
                      color: s.color,
                      border: '2px solid #000000',
                      boxShadow: '2px 2px 0px #000000',
                      fontSize: '11px',
                      fontWeight: 900,
                      textDecoration: 'none',
                      fontFamily: 'JetBrains Mono, monospace',
                      transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                    onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.currentTarget.style.transform = 'translate(-2px, -2px) scale(1.08)';
                    }}
                    onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.currentTarget.style.transform = 'translate(0px, 0px) scale(1)';
                    }}
                  >
                    {s.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
