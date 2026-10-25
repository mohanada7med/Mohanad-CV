import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Language, ServiceItem } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Plus, Minus, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';

interface ServicesSectionProps {
  lang: Language;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang }) => {
  const [expandedId, setExpandedId] = useState<string>('short-form');
  const t = PORTFOLIO_DATA.ui[lang];

  const handleToggle = (id: string) => {
    sound.playClick();
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  const handleDiscussService = (service: ServiceItem) => {
    sound.playClick();
    const serviceName = lang === 'en' ? service.title_en : service.title_ar;
    const msg = encodeURIComponent(`Hi Mohanad! I'm interested in collaborating on: ${serviceName}`);
    window.open(`https://wa.me/201023456789?text=${msg}`, '_blank');
  };

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        paddingTop: '130px',
        paddingBottom: '130px',
        backgroundColor: '#070709',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="app-container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '60px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '100px',
              backgroundColor: 'rgba(204, 255, 0, 0.08)',
              border: '1px solid rgba(204, 255, 0, 0.25)',
              color: '#ccff00',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={13} />
            <span>CREATIVE CAPABILITIES</span>
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
            {t.services_heading}
          </h2>

          <p style={{ fontSize: '1.15rem', color: '#8d90a0', lineHeight: 1.6 }}>
            {t.services_sub}
          </p>
        </div>

        {/* Large Typographic Interactive Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PORTFOLIO_DATA.services.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '28px',
                  paddingBottom: '28px',
                  transition: 'background-color 0.3s ease',
                  backgroundColor: isExpanded ? 'rgba(204, 255, 0, 0.02)' : 'transparent',
                }}
              >
                {/* Clickable Header Row */}
                <div
                  onClick={() => handleToggle(service.id)}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor={isExpanded ? 'COLLAPSE' : 'EXPAND'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none',
                    gap: '20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <span
                      style={{
                        fontSize: '16px',
                        fontFamily: 'JetBrains Mono, monospace',
                        color: isExpanded ? '#ccff00' : '#717588',
                        fontWeight: 700,
                      }}
                    >
                      {service.number}
                    </span>
                    <h3
                      className="font-heading"
                      style={{
                        fontSize: 'clamp(1.5rem, 3.2vw, 2.8rem)',
                        fontWeight: 900,
                        color: isExpanded ? '#ccff00' : '#ffffff',
                        transition: 'color 0.25s ease',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {lang === 'en' ? service.title_en : service.title_ar}
                    </h3>
                  </div>

                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: isExpanded ? '#ccff00' : 'rgba(255, 255, 255, 0.06)',
                      color: isExpanded ? '#070709' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </div>

                {/* Expanded Drawer Details */}
                {isExpanded && (
                  <div
                    style={{
                      marginTop: '24px',
                      paddingLeft: lang === 'ar' ? '0' : '50px',
                      paddingRight: lang === 'ar' ? '50px' : '0',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '30px',
                      alignItems: 'center',
                      animation: 'fadeIn 0.3s ease',
                    }}
                  >
                    {/* Explanation */}
                    <div>
                      <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#d0d4e4', marginBottom: '20px' }}>
                        {lang === 'en' ? service.short_desc_en : service.short_desc_ar}
                      </p>

                      <button
                        onClick={() => handleDiscussService(service)}
                        onMouseEnter={() => sound.playHover()}
                        data-cursor="WHATSAPP"
                        className="magnetic-btn"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 22px',
                          borderRadius: '100px',
                          backgroundColor: '#25D366',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: 700,
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: lang === 'en' ? 'Syne, sans-serif' : 'Alexandria, sans-serif',
                          boxShadow: '0 0 20px rgba(37, 211, 102, 0.3)',
                        }}
                      >
                        <MessageCircle size={15} />
                        <span>{lang === 'en' ? 'Inquire on WhatsApp' : 'استفسر عبر الواتساب'}</span>
                      </button>
                    </div>

                    {/* Key Deliverables Pills */}
                    <div
                      style={{
                        padding: '24px',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(14, 15, 21, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '11px',
                          fontFamily: 'JetBrains Mono, monospace',
                          color: '#ccff00',
                          fontWeight: 700,
                          marginBottom: '12px',
                        }}
                      >
                        {lang === 'en' ? 'KEY DELIVERABLES' : 'مخرجات الخدمة الأساسية'}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(lang === 'en' ? service.deliverables_en : service.deliverables_ar).map((deliv, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#f5f6fa' }}>
                            <CheckCircle2 size={14} color="#ccff00" />
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
