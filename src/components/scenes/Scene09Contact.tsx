import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Language } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { ComicBadge } from '../comic/ComicElements';
import { MessageCircle, Mail, Copy, Check, Flame, Send, Sparkles } from 'lucide-react';

interface Scene09ContactProps {
  lang: Language;
}

export const Scene09Contact: React.FC<Scene09ContactProps> = ({ lang }) => {
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
        colors: ['#ccff00', '#ffffff', '#ffd93d', '#ff4d8d'],
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
      colors: ['#ccff00', '#00e5ff', '#ffd93d'],
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
      handleSendEmail();
    }
  };

  return (
    <section
      id="scene-contact"
      className="master-scene-stage comic-halftone-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '110px clamp(16px, 4vw, 50px) 70px',
        borderBottom: '4px solid var(--border-comic)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-page)',
        color: 'var(--text-main)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header Strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <ComicBadge text="ACT #09" subtext={isAr ? 'الخط الساخن' : 'HOTLINE'} bg="#ccff00" rotation={-2} />
          <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-main)', fontWeight: 900 }}>
            ★ {isAr ? 'تواصل مباشر • بدون وسطاء' : 'DIRECT LINE • TO BE CONTINUED!'}
          </span>
        </div>

        {/* Section Headline */}
        <div style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              color: 'var(--text-main)',
              fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
              letterSpacing: '-0.02em',
              margin: 0,
              filter: 'drop-shadow(3px 3px 0px var(--border-comic))',
            }}
          >
            {isAr ? 'جاهز نحكي حكاية مشروعك الجاي؟' : 'READY TO TELL YOUR NEXT STORY?'}{' '}
            <span
              style={{
                color: '#ff4d8d',
                display: 'inline-block',
                transform: 'rotate(-1deg)',
              }}
            >
              {isAr ? 'بمحتوى بصري حقيقي يوصل للناس' : 'WITH AUTHENTIC COMMERCIAL VISUALS'}
            </span>
          </h2>
          <p
            style={{
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              color: 'var(--text-muted)',
              marginTop: '12px',
              maxWidth: '700px',
              lineHeight: 1.6,
            }}
          >
            {isAr
              ? 'سواء كان عندك براند أو مطعم أو مشروع محلي في أسيوط أو أي مكان في مصر — خلينا نتناقش في نوع المحتوى والتصوير الأنسب ليك.'
              : 'Whether you run a dessert brand, restaurant, or local venue in Assiut or across Egypt — let’s create visuals that genuinely resonate.'}
          </p>
        </div>

        {/* Action Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '28px',
            alignItems: 'start',
          }}
        >
          {/* Column 1: Interactive Cartoon Brief Builder */}
          <div
            className="comic-panel"
            style={{
              padding: 'clamp(20px, 3vw, 32px)',
              borderRadius: '24px',
              border: '4px solid var(--border-comic)',
              boxShadow: '8px 8px 0px var(--shadow-comic)',
              backgroundColor: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#ccff00" />
                <span
                  style={{
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                    fontSize: '17px',
                    fontWeight: 900,
                    color: 'var(--text-main)',
                  }}
                >
                  {isAr ? 'تجهيز فكرة التعاون' : 'PROJECT SCOPE GENERATOR'}
                </span>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  backgroundColor: '#ccff00',
                  color: '#000000',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1.5px solid #000000',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                FAST DISPATCH
              </span>
            </div>

            {/* Content Type Selector Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'reel', labelEn: 'Reels / Short-Form', labelAr: 'ريلز وفيديوهات قصيرة' },
                { id: 'campaign', labelEn: 'Venue / Place Coverage', labelAr: 'تغطية مكان أو مطعم' },
                { id: 'ugc', labelEn: 'Creator / Product Showcase', labelAr: 'استعراض منتج' },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedGoal(g.id as any);
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '2px solid var(--border-comic)',
                    backgroundColor: selectedGoal === g.id ? '#ffd93d' : 'var(--bg-page)',
                    color: '#000000',
                    fontSize: '11px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: selectedGoal === g.id ? '2px 2px 0px var(--shadow-comic)' : 'none',
                    transform: selectedGoal === g.id ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAr ? g.labelAr : g.labelEn}
                </button>
              ))}
            </div>

            {/* Input: Sender Name */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--text-muted)',
                  marginBottom: '6px',
                }}
              >
                {isAr ? 'اسمك أو صفتك' : 'YOUR NAME / TITLE'}
              </label>
              <input
                type="text"
                placeholder={isAr ? 'مثال: محمد - مدير التسويق' : 'e.g. John - Brand Manager'}
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '2.5px solid var(--border-comic)',
                  backgroundColor: 'var(--bg-page)',
                  color: 'var(--text-main)',
                  fontSize: '13px',
                  fontWeight: 700,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Input: Brand / Venue Name */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--text-muted)',
                  marginBottom: '6px',
                }}
              >
                {isAr ? 'اسم البراند أو المكان' : 'BRAND / VENUE NAME'}
              </label>
              <input
                type="text"
                placeholder={isAr ? 'مثال: مطعم / كافيه بأسيوط' : 'e.g. Venue / Brand in Egypt'}
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '2.5px solid var(--border-comic)',
                  backgroundColor: 'var(--bg-page)',
                  color: 'var(--text-main)',
                  fontSize: '13px',
                  fontWeight: 700,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Input: Notes */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--text-muted)',
                  marginBottom: '6px',
                }}
              >
                {isAr ? 'فكرة سريعة أو تفاصيل إضافية' : 'BRIEF PROJECT NOTES'}
              </label>
              <textarea
                rows={3}
                placeholder={isAr ? 'حابب نصور تغطية أو فيديو ريلز للمنتج...' : 'Looking for high-impact commercial video...'}
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '2.5px solid var(--border-comic)',
                  backgroundColor: 'var(--bg-page)',
                  color: 'var(--text-main)',
                  fontSize: '13px',
                  fontWeight: 700,
                  resize: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Submit Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button
                onClick={handleSendEmail}
                style={{
                  flex: 1,
                  padding: '12px 18px',
                  borderRadius: '14px',
                  backgroundColor: '#ccff00',
                  color: '#000000',
                  border: '3px solid #000000',
                  fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                  fontSize: '15px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '4px 4px 0px #000000',
                }}
                className="hover-bounce"
              >
                <Send size={16} color="#000000" />
                <span>{isAr ? 'إرسال عبر الإيميل' : 'SEND DISPATCH'}</span>
              </button>

              <button
                onClick={handleDirectWhatsApp}
                style={{
                  padding: '12px 18px',
                  borderRadius: '14px',
                  backgroundColor: '#25D366',
                  color: '#000000',
                  border: '3px solid #000000',
                  fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                  fontSize: '15px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '4px 4px 0px #000000',
                }}
                className="hover-bounce"
              >
                <MessageCircle size={18} color="#000000" />
                <span>{isAr ? 'واتساب' : 'WHATSAPP'}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Direct Contact Card & Location Badge */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Direct Email Card */}
            <div
              className="comic-panel"
              style={{
                padding: '24px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: '24px',
                border: '4px solid var(--border-comic)',
                boxShadow: '8px 8px 0px var(--shadow-comic)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={20} color="#ff4d8d" />
                <span
                  style={{
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                    fontSize: '17px',
                    fontWeight: 900,
                    color: 'var(--text-main)',
                  }}
                >
                  {isAr ? 'البريد الإلكتروني المباشر' : 'DIRECT INBOX'}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  border: '2.5px solid var(--border-comic)',
                  backgroundColor: 'var(--bg-page)',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '13px',
                    fontWeight: 900,
                    color: 'var(--text-main)',
                  }}
                >
                  {creator.email}
                </span>

                <button
                  onClick={handleCopyEmail}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: '2px solid #000000',
                    backgroundColor: copiedEmail ? '#ccff00' : '#ffffff',
                    color: '#000000',
                    fontSize: '11px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '2px 2px 0px #000000',
                  }}
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedEmail ? (isAr ? 'تم النسخ!' : 'COPIED!') : (isAr ? 'نسخ' : 'COPY')}</span>
                </button>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {isAr
                  ? 'يتم الرد والتنسيق المباشر على جميع الاستفسارات ومقترحات المشروعات الإعلانية.'
                  : 'Fast direct response for commercial collaborations, brand reels, and filming schedules.'}
              </div>
            </div>

            {/* Location & Studio Stamp Card */}
            <div
              className="comic-panel"
              style={{
                padding: '24px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: '24px',
                border: '4px solid var(--border-comic)',
                boxShadow: '8px 8px 0px var(--shadow-comic)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: '#4dd2ff',
                  border: '3px solid #000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '3px 3px 0px #000000',
                  flexShrink: 0,
                }}
              >
                <Flame size={28} color="#000000" />
              </div>

              <div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 900,
                    color: 'var(--text-main)',
                    fontFamily: isAr ? 'var(--font-display-ar)' : 'var(--font-display-en)',
                  }}
                >
                  {isAr ? 'أسيوط • متاح للتنفيذ في كل محافظات مصر' : 'BASE: ASSIUT • DEPLOYING ACROSS EGYPT'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {isAr
                    ? 'جاهز للسفر والتصوير الميداني للمطاعم والبراندات والمشروعات الكبرى.'
                    : 'Available for on-location filming, venue coverage, and multi-day commercial shoots.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
