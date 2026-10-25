import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { ComicBadge, ComicStars } from '../comic/ComicElements';
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
        width: '100%',
        backgroundColor: '#0a0b10',
        borderBottom: '4px solid #000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '40px 20px',
      }}
    >
      {/* Floating Decorative Comic Stars */}
      <div style={{ position: 'absolute', top: '8%', right: '5%', pointerEvents: 'none' }}>
        <ComicStars size={24} color="#ccff00" />
      </div>
      <div style={{ position: 'absolute', bottom: '8%', left: '4%', pointerEvents: 'none' }}>
        <ComicStars size={20} color="#ffe600" />
      </div>

      <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Comic Finale Eyebrow Banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <ComicBadge text="FINALE • EPISODE 05" subtext="THE END?" bg="#ccff00" rotation={-2} />
          <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#ccff00', fontWeight: 900 }}>
            ★ TO BE CONTINUED!
          </span>
        </div>

        {/* Monumental Kinetic Headline */}
        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3.2vw, 2.8rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#ffffff',
              fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
              letterSpacing: '-0.02em',
              margin: 0,
              filter: 'drop-shadow(3px 3px 0px #000000)',
            }}
          >
            {isAr ? 'جاهز نعمل محتوى' : 'READY TO CREATE WHAT'}{' '}
            <span
              style={{
                color: '#ccff00',
                display: 'inline-block',
                transform: 'rotate(-1deg)',
                textShadow: '3px 3px 0px #000000',
              }}
            >
              {isAr ? 'يـوقـف الـسـكـرول ويصنع التريند؟' : 'STOPS THUMBS & GOES VIRAL?'}
            </span>
          </h2>
          <p
            style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              color: '#d4d5e5',
              marginTop: '8px',
              maxWidth: '650px',
              lineHeight: 1.4,
              fontFamily: isAr ? 'var(--font-body-ar)' : 'var(--font-body-en)',
            }}
          >
            {isAr
              ? 'سواء كنت براند يهدف للوصول لملايين المشاهدات أو تبحث عن هوية سينمائية لمنتجاتك، باب التعاون الإبداعي مفتوح الآن.'
              : 'Whether you want a high-conversion viral campaign or iconic visual direction for your product, let us roll cameras on your next big hit.'}
          </p>
        </div>

        {/* Dynamic Action Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          {/* Column 1: Direct Comic Brief Generator */}
          <div
            className="comic-panel"
            style={{
              padding: '24px 18px',
              borderRadius: '16px',
              border: '3px solid #000000',
              boxShadow: '5px 5px 0px #ccff00, 5px 5px 0px 3px #000000',
              backgroundColor: '#141622',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff' }}>
                  <Flame size={16} color="#ccff00" />
                  <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 900 }}>
                    FAST BRIEF BUILDER
                  </span>
                </div>
                <ComicBadge text="INSTANT" bg="#ffe600" rotation={2} />
              </div>

              {/* Goal Type Picker */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a3b5', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, marginBottom: '6px' }}>
                  {isAr ? 'اختر هدف الحملة:' : 'SELECT OBJECTIVE:'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
                  {[
                    { id: 'reel', labelEn: 'Viral Promo Reel', labelAr: 'ريلز إعلاني فيروسي' },
                    { id: 'campaign', labelEn: 'Full Campaign', labelAr: 'حملة إعلانية متكاملة' },
                    { id: 'ugc', labelEn: 'UGC & Hooks Series', labelAr: 'سلسلة UGC وهوكس' },
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
                          padding: '8px 12px',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? '#ccff00' : '#0a0a0f',
                          color: isSelected ? '#000000' : '#f5f6fa',
                          border: '2px solid #000000',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          textAlign: isAr ? 'right' : 'left',
                          boxShadow: isSelected ? '3px 3px 0px #000000' : '1px 1px 0px #000000',
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', color: '#a1a3b5', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, marginBottom: '4px' }}>
                    {isAr ? 'اسمك:' : 'YOUR NAME:'}
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder={isAr ? 'أحمد' : 'Alex'}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#0a0b10',
                      border: '2px solid #000000',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 700,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10px', color: '#a1a3b5', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, marginBottom: '4px' }}>
                    {isAr ? 'الشركة:' : 'COMPANY:'}
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder={isAr ? 'اسم البراند' : 'Acme'}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#0a0b10',
                      border: '2px solid #000000',
                      color: '#ffffff',
                      fontSize: '12px',
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
                padding: '11px',
                fontSize: '13px',
              }}
            >
              <MessageCircle size={18} />
              <span>{isAr ? 'محادثة واتساب مباشرة' : 'Send via WhatsApp'}</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Column 2: Cartoon Finale Character Composition */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Clapperboard Character Card - تم تكبير الأبعاد وتدعيم الـ Shadow */}
            <div
              className="comic-panel animate-comic-float"
              style={{
                position: 'relative',
                width: 'clamp(240px, 32vw, 360px)',
                height: 'clamp(320px, 42vw, 460px)',
                borderRadius: '24px',
                border: '4px solid #000000',
                backgroundColor: '#161824',
                boxShadow: '8px 8px 0px #ffe600, 8px 8px 0px 4px #000000',
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
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  padding: '7px 10px',
                  backgroundColor: '#000000',
                  border: '2px solid #ccff00',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 900,
                }}
              >
                <span style={{ color: '#ccff00' }}>FINALE</span>
                <span>TAKE 01 • ACTION!</span>
              </div>
            </div>

            {/* Quick Email & Social Profiles Strip - تم تعديل العرض ليتناسق مع حجم الصورة الأكبر */}
            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '100%',
                maxWidth: 'clamp(240px, 32vw, 360px)',
              }}
            >
              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sound.playHover()}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '2.5px solid #000000',
                  boxShadow: '3px 3px 0px #000000',
                  fontWeight: 900,
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={15} />
                  <span>{copiedEmail ? (isAr ? 'تم النسخ!' : 'Copied!') : creator.email}</span>
                </div>
                {copiedEmail ? <Check size={15} color="#00aa44" /> : <Copy size={15} />}
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
                      padding: '5px 12px',
                      borderRadius: '8px',
                      backgroundColor: s.bg,
                      color: s.color,
                      border: '2px solid #000000',
                      boxShadow: '2px 2px 0px #000000',
                      fontSize: '11px',
                      fontWeight: 900,
                      textDecoration: 'none',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {s.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Scrollytelling Epilogue & Director's Colophon */}
        <div
          style={{
            marginTop: 'clamp(30px, 4.5vw, 55px)',
            paddingTop: '20px',
            borderTop: '3px solid #000000',
            position: 'relative',
          }}
        >

        </div>
      </div>
    </section>
  );
};