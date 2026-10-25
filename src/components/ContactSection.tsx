import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Language } from '../data/portfolioData';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Mail, MessageCircle, Send, Copy, Check, Sparkles, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = PORTFOLIO_DATA.ui[lang];
  const creator = PORTFOLIO_DATA.creator;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'UGC & Hook Campaign',
    budget: '$1,000 - $3,000 / EGP 50k - 150k',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [submittedWhatsApp, setSubmittedWhatsApp] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(creator.email);
      setCopiedEmail(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ccff00', '#ff5500', '#ffffff'],
      });
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playChime();
    setSubmittedWhatsApp(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ccff00', '#25D366', '#ffffff'],
    });

    const lines = [
      `*New Collaboration Inquiry — Mohanad Ahmed Portfolio*`,
      `• *Name:* ${formData.name || 'Not specified'}`,
      `• *Brand/Company:* ${formData.company || 'Not specified'}`,
      `• *Email:* ${formData.email || 'Not specified'}`,
      `• *Phone/WhatsApp:* ${formData.phone || 'Not specified'}`,
      `• *Project Type:* ${formData.projectType}`,
      `• *Budget Range:* ${formData.budget}`,
      `• *Details:* ${formData.message || 'No additional details'}`,
    ];

    const encoded = encodeURIComponent(lines.join('\n'));
    const whatsappUrl = `https://wa.me/201023456789?text=${encoded}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => setSubmittedWhatsApp(false), 4000);
  };

  const handleEmailSubmit = () => {
    sound.playClick();
    const subject = encodeURIComponent(`Project Collaboration: ${formData.company || formData.name || 'Campaign'}`);
    const body = encodeURIComponent(
      `Hi Mohanad,\n\nI would like to discuss a project with you:\n\nName: ${formData.name}\nBrand: ${formData.company}\nProject Type: ${formData.projectType}\nBudget: ${formData.budget}\nDetails: ${formData.message}\n\nBest regards,\n${formData.name}`
    );
    window.location.href = `mailto:${creator.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        paddingTop: '130px',
        paddingBottom: '130px',
        backgroundColor: '#070709',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambience */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(204, 255, 0, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '60px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '100px',
              backgroundColor: 'rgba(255, 85, 0, 0.08)',
              border: '1px solid rgba(255, 85, 0, 0.3)',
              color: '#ff5500',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={13} />
            <span>START A CAMPAIGN</span>
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              color: '#ffffff',
              marginBottom: '16px',
            }}
          >
            {t.contact_heading}
          </h2>

          <p style={{ fontSize: '1.15rem', color: '#8d90a0', lineHeight: 1.6 }}>
            {t.contact_sub}
          </p>
        </div>

        {/* Content Split: Direct Reach & Interactive Inquiry Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Direct Fast Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Direct WhatsApp Card */}
            <div
              className="glass-panel-elevated"
              style={{
                padding: '30px',
                borderRadius: '24px',
                border: '1px solid rgba(37, 211, 102, 0.3)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                  }}
                >
                  <MessageCircle size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                    {lang === 'en' ? 'Direct WhatsApp Chat' : 'محادثة مباشرة على واتساب'}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#25D366', fontFamily: 'JetBrains Mono, monospace' }}>
                    {lang === 'en' ? 'Fastest Response Time' : 'أسرع طريقة للتواصل'}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '14px', color: '#b0b4c5', marginBottom: '20px', lineHeight: 1.6 }}>
                {lang === 'en'
                  ? 'Chat directly with Mohanad to discuss your concept, timeline, and brand requirements.'
                  : 'تواصل مباشرة مع مهند لمناقشة فكرتك، المواعيد، ومتطلبات الحملة.'}
              </p>

              <a
                href={creator.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                data-cursor="WHATSAPP"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '100px',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                  boxShadow: '0 0 25px rgba(37, 211, 102, 0.35)',
                }}
              >
                <span>{lang === 'en' ? 'Open WhatsApp' : 'فتح محادثة واتساب'}</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* Direct Email Card with Clipboard Copy */}
            <div
              className="glass-panel"
              style={{
                padding: '30px',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(204, 255, 0, 0.15)',
                    border: '1px solid #ccff00',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ccff00',
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                    {lang === 'en' ? 'Official Inquiries' : 'الاستفسارات الرسمية'}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#ccff00', fontFamily: 'JetBrains Mono, monospace' }}>
                    {creator.email}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="COPY"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    borderRadius: '100px',
                    backgroundColor: copiedEmail ? '#ccff00' : 'rgba(255, 255, 255, 0.08)',
                    color: copiedEmail ? '#070709' : '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedEmail ? t.form_copied_email : (lang === 'en' ? 'Copy Email' : 'نسخ الإيميل')}</span>
                </button>

                <button
                  onClick={handleEmailSubmit}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="EMAIL"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    borderRadius: '100px',
                    backgroundColor: 'transparent',
                    color: '#ccff00',
                    border: '1px solid rgba(204, 255, 0, 0.4)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <Send size={13} />
                  <span>{lang === 'en' ? 'Open Mail Client' : 'فتح تطبيق الإيميل'}</span>
                </button>
              </div>
            </div>

            {/* Social Links Pill Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                padding: '16px 20px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <span style={{ fontSize: '12px', color: '#717588', fontFamily: 'JetBrains Mono, monospace' }}>
                SOCIALS:
              </span>
              <a
                href={creator.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}
              >
                TikTok
              </a>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
              <a
                href={creator.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}
              >
                Instagram
              </a>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
              <span style={{ color: '#ccff00', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace' }}>
                {creator.location_en}
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Collaboration Inquiry Form */}
          <div
            className="glass-panel-elevated"
            style={{
              padding: 'clamp(28px, 4vw, 40px)',
              borderRadius: '28px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
            }}
          >
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 900,
                color: '#ffffff',
                fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                marginBottom: '24px',
              }}
            >
              {lang === 'en' ? 'Collaboration Brief Form' : 'نموذج طلب الحملة أو المشروع'}
            </h3>

            <form onSubmit={handleWhatsAppSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Row 1: Name & Company */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#ccff00', fontWeight: 700, marginBottom: '6px' }}>
                    {t.form_name} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={lang === 'en' ? 'e.g. Sarah Mansour' : 'مثال: أحمد محمود'}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#ccff00', fontWeight: 700, marginBottom: '6px' }}>
                    {t.form_company} *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={lang === 'en' ? 'e.g. Brand / Agency' : 'اسم البراند أو الشركة'}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#ccff00', fontWeight: 700, marginBottom: '6px' }}>
                    {t.form_email} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@brand.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#ccff00', fontWeight: 700, marginBottom: '6px' }}>
                    {t.form_phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+20 10..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Row 3: Project Type & Budget Range */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#ccff00', fontWeight: 700, marginBottom: '6px' }}>
                    {t.form_project_type}
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#13141b',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  >
                    <option value="UGC & Hook Campaign">{t.form_type_ugc}</option>
                    <option value="Brand Commercial Reel">{t.form_type_brand}</option>
                    <option value="Product Macro Showcase">{t.form_type_product}</option>
                    <option value="Full Production & Direction">{t.form_type_full}</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#ccff00', fontWeight: 700, marginBottom: '6px' }}>
                    {t.form_budget}
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#13141b',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  >
                    <option value="Under $1,000 / EGP 50,000">{t.form_budget_1}</option>
                    <option value="$1,000 - $3,000 / EGP 50k - 150k">{t.form_budget_2}</option>
                    <option value="$3,000+ / EGP 150k+">{t.form_budget_3}</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Message */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#ccff00', fontWeight: 700, marginBottom: '6px' }}>
                  {t.form_message}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.form_message_placeholder}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                <button
                  type="submit"
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="WHATSAPP SEND"
                  className="magnetic-btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '16px 28px',
                    borderRadius: '100px',
                    backgroundColor: '#ccff00',
                    color: '#070709',
                    fontSize: '14px',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                    boxShadow: '0 0 35px rgba(204, 255, 0, 0.35)',
                  }}
                >
                  <MessageCircle size={18} />
                  <span>{submittedWhatsApp ? (lang === 'en' ? 'Opening WhatsApp...' : 'جاري فتح واتساب...') : t.form_submit_whatsapp}</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="EMAIL SEND"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    borderRadius: '100px',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                  }}
                >
                  <Mail size={16} />
                  <span>{t.form_submit_email}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
