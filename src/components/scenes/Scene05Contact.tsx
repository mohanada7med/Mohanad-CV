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
  const [projectNotes, setProjectNotes] = useState<string>('');

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

  const getGoalLabel = () => {
    if (selectedGoal === 'reel') return isAr ? 'فيديوهات قصيرة وريلز' : 'Short-Form Reels';
    if (selectedGoal === 'campaign') return isAr ? 'تصوير وتغطية لمشروع أو مكان' : 'Venue or Brand Coverage';
    return isAr ? 'استعراض منتج ومحتوى صانع محتوى' : 'Product Showcase & Creator Video';
  };

  const handleSendEmail = () => {
    sound.playChime();
    confetti({
      particleCount: 80,
      spread: 85,
      origin: { y: 0.7 },
      colors: ['#ccff00', '#00e5ff', '#ffe600'],
    });

    const goalLabel = getGoalLabel();
    const subject = isAr
      ? `طلب تعاون محتوى: ${brandName || 'مشروع جديد'} - ${senderName || 'استفسار'}`
      : `Collaboration Inquiry: ${brandName || 'New Project'} - ${senderName || 'Contact'}`;

    const body = isAr
      ? `مرحباً مهند،\n\nأنا: ${senderName || 'مهتم بالتعاون'}\nاسم البراند أو المشروع: ${brandName || 'غير محدد'}\nنوع المحتوى المطلوب: ${goalLabel}\n\nتفاصيل إضافية:\n${projectNotes || 'أود مناقشة تفاصيل العمل والميزانية والمواعيد المناسبة.'}\n\nشكراً لك.`
      : `Hi Mohanad,\n\nName: ${senderName || 'Not specified'}\nBrand / Venue: ${brandName || 'Not specified'}\nRequested Service: ${goalLabel}\n\nProject Details:\n${projectNotes || 'I would like to discuss project details, timeline, and scope.'}\n\nBest regards.`;

    window.location.href = `mailto:${creator.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDirectWhatsApp = () => {
    sound.playChime();
    const goalLabel = getGoalLabel();
    const msg = isAr
      ? `مرحباً مهند، أنا ${senderName || 'مهتم بالتعاون'} بخصوص مشروع (${brandName || 'عمل جديد'}).\nالخدمة المطلوبة: ${goalLabel}.\n${projectNotes ? `تفاصيل: ${projectNotes}` : 'حابب نتفق على التفاصيل والموعد المناسب.'}`
      : `Hi Mohanad, I'm ${senderName || 'reaching out'} regarding ${brandName || 'a new project'}.\nRequested: ${goalLabel}.\n${projectNotes ? `Notes: ${projectNotes}` : "Let's connect and discuss the next steps."}`;

    if (creator.whatsapp && creator.whatsapp.trim().length > 5) {
      const cleanPhone = creator.whatsapp.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    } else {
      // If no WhatsApp number configured, fallback smoothly to email inquiry
      handleSendEmail();
    }
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
            {isAr ? 'جاهز نحكي حكاية مشروعك الجاي؟' : 'READY TO TELL YOUR STORY?'}{' '}
            <span
              style={{
                color: '#ccff00',
                display: 'inline-block',
                transform: 'rotate(-1deg)',
                textShadow: '3px 3px 0px #000000',
              }}
            >
              {isAr ? 'بمحتوى بصري حقيقي يوصل للناس' : 'WITH REAL, ENGAGING VISUALS'}
            </span>
          </h2>
          <p
            style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              color: '#d4d5e5',
              marginTop: '8px',
              maxWidth: '650px',
              lineHeight: 1.5,
              fontFamily: isAr ? 'var(--font-body-ar)' : 'var(--font-body-en)',
            }}
          >
            {isAr
              ? 'سواء كان عندك براند أو مطعم أو مشروع محلي في أسيوط أو أي مكان في مصر — خلينا نتناقش في نوع المحتوى والتصوير الأنسب ليك.'
              : 'Whether you run a brand, restaurant, or local business in Assiut or anywhere in Egypt — let’s create visuals that truly represent your work.'}
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
                    {isAr ? 'تجهيز تفاصيل المشروع' : 'PROJECT BRIEF BUILDER'}
                  </span>
                </div>
                <ComicBadge text={isAr ? 'تواصل مباشر' : 'DIRECT'} bg="#ffe600" rotation={2} />
              </div>

              {/* Goal Type Picker */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a3b5', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, marginBottom: '6px' }}>
                  {isAr ? 'نوع المحتوى المطلوب:' : 'SELECT SERVICE:'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
                  {[
                    { id: 'reel', labelEn: 'Short-Form Reels', labelAr: 'فيديوهات قصيرة وريلز' },
                    { id: 'campaign', labelEn: 'Venue & Business Coverage', labelAr: 'تصوير وتغطية لمكان أو مشروع' },
                    { id: 'ugc', labelEn: 'Product Showcase & Creator Video', labelAr: 'استعراض منتج / محتوى صانع محتوى' },
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', color: '#a1a3b5', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, marginBottom: '4px' }}>
                    {isAr ? 'اسمك:' : 'YOUR NAME:'}
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder={isAr ? 'مثال: أحمد' : 'Alex'}
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
                    {isAr ? 'البراند أو المكان:' : 'BRAND / VENUE:'}
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder={isAr ? 'اسم المشروع' : 'Brand name'}
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

              {/* Project notes field */}
              <div>
                <label style={{ display: 'block', fontSize: '10px', color: '#a1a3b5', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, marginBottom: '4px' }}>
                  {isAr ? 'تفاصيل الفكرة (اختياري):' : 'PROJECT NOTES (OPTIONAL):'}
                </label>
                <input
                  type="text"
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  placeholder={isAr ? 'عايز أصور ريلز لمنتج جديد في أسيوط...' : 'Need a short-form video for...'}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    backgroundColor: '#0a0b10',
                    border: '2px solid #000000',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 500,
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={handleSendEmail}
                data-cursor="EMAIL"
                className="comic-btn"
                style={{
                  width: '100%',
                  padding: '11px',
                  fontSize: '13px',
                  backgroundColor: '#ccff00',
                  color: '#000000',
                }}
              >
                <Mail size={17} />
                <span>{isAr ? 'إرسال التفاصيل بالإيميل المباشر' : 'Send via Direct Email'}</span>
                <ArrowUpRight size={16} />
              </button>

              <button
                onClick={handleDirectWhatsApp}
                data-cursor="WHATSAPP"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: '#25D366',
                  color: '#000000',
                  border: '2.5px solid #000000',
                  boxShadow: '3px 3px 0px #000000',
                  fontWeight: 900,
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                <MessageCircle size={16} />
                <span>{isAr ? 'تواصل عبر واتساب' : 'Chat via WhatsApp'}</span>
              </button>
            </div>
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

              {/* Social Channels Comic Badges / Location Tag */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { name: 'Instagram', url: creator.socials.instagram, bg: '#ff3366', color: '#ffffff' },
                  { name: 'TikTok', url: creator.socials.tiktok, bg: '#000000', color: '#ccff00' },
                  { name: 'YouTube', url: creator.socials.youtube, bg: '#ffe600', color: '#000000' },
                  { name: 'Behance', url: creator.socials.behance, bg: '#00e5ff', color: '#000000' },
                ]
                  .filter((s) => Boolean(s.url && s.url.trim().length > 0))
                  .map((s) => (
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

                <div
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#121422',
                    border: '2px solid #000000',
                    color: '#ccff00',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 800,
                    boxShadow: '2px 2px 0px #000000',
                  }}
                >
                  📍 {isAr ? creator.location_ar : creator.location_en} • {isAr ? 'متاح للتعاون' : 'Open for Projects'}
                </div>
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