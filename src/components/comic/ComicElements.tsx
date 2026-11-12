import React from 'react';

/**
 * Comic burst star / impact explosion SVG
 */
export interface ComicBurstProps {
  size?: number;
  color?: string;
  borderColor?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const ComicBurst: React.FC<ComicBurstProps> = ({
  size = 120,
  color = '#ccff00',
  borderColor = '#000000',
  className = '',
  style = {},
  children,
}) => {
  return (
    <div
      className={`comic-burst-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(4px 4px 0px #000000)',
          overflow: 'visible',
        }}
      >
        <polygon
          points="100,10 125,55 180,45 150,95 195,135 140,150 145,200 95,170 50,200 60,145 10,135 50,90 20,45 80,60"
          fill={color}
          stroke={borderColor}
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </svg>
      {children && (
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            fontWeight: 900,
            color: '#070709',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * Speech Bubble with directional cartoon tail
 */
export interface SpeechBubbleProps {
  tailDirection?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'left' | 'right';
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  shadowColor?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  tailDirection = 'bottom-left',
  bgColor = '#ffffff',
  textColor = '#0a0b10',
  borderColor = '#000000',
  shadowColor = '#000000',
  className = '',
  style = {},
  children,
}) => {
  return (
    <div
      className={`comic-speech-bubble ${className}`}
      style={{
        position: 'relative',
        backgroundColor: bgColor,
        color: textColor,
        border: `3px solid ${borderColor}`,
        borderRadius: '20px',
        padding: '14px 22px',
        boxShadow: `5px 5px 0px ${shadowColor}`,
        fontWeight: 700,
        ...style,
      }}
    >
      {children}

      {/* SVG Cartoon Bubble Tail */}
      {tailDirection === 'bottom-left' && (
        <svg
          width="26"
          height="20"
          viewBox="0 0 26 20"
          style={{
            position: 'absolute',
            bottom: '-19px',
            left: '26px',
            overflow: 'visible',
          }}
        >
          <polygon points="0,0 24,0 4,18" fill={bgColor} />
          <polyline points="0,0 4,18 24,0" stroke={borderColor} strokeWidth="3" fill="none" />
        </svg>
      )}

      {tailDirection === 'bottom-right' && (
        <svg
          width="26"
          height="20"
          viewBox="0 0 26 20"
          style={{
            position: 'absolute',
            bottom: '-19px',
            right: '26px',
            overflow: 'visible',
          }}
        >
          <polygon points="2,0 26,0 22,18" fill={bgColor} />
          <polyline points="2,0 22,18 26,0" stroke={borderColor} strokeWidth="3" fill="none" />
        </svg>
      )}

      {tailDirection === 'left' && (
        <svg
          width="20"
          height="26"
          viewBox="0 0 20 26"
          style={{
            position: 'absolute',
            left: '-19px',
            top: '50%',
            transform: 'translateY(-50%)',
            overflow: 'visible',
          }}
        >
          <polygon points="20,0 20,24 2,12" fill={bgColor} />
          <polyline points="20,0 2,12 20,24" stroke={borderColor} strokeWidth="3" fill="none" />
        </svg>
      )}

      {tailDirection === 'right' && (
        <svg
          width="20"
          height="26"
          viewBox="0 0 20 26"
          style={{
            position: 'absolute',
            right: '-19px',
            top: '50%',
            transform: 'translateY(-50%)',
            overflow: 'visible',
          }}
        >
          <polygon points="0,0 0,24 18,12" fill={bgColor} />
          <polyline points="0,0 18,12 0,24" stroke={borderColor} strokeWidth="3" fill="none" />
        </svg>
      )}
    </div>
  );
};

/**
 * Comic Sound Effect / Action Badge (e.g. "POW!", "BOOM!", "ACTION!", "4K!")
 */
export interface ComicBadgeProps {
  text: string;
  subtext?: string;
  bg?: string;
  textColor?: string;
  rotation?: number;
  scale?: number;
  style?: React.CSSProperties;
}

export const ComicBadge: React.FC<ComicBadgeProps> = ({
  text,
  subtext,
  bg = '#ccff00',
  textColor = '#0a0a0e',
  rotation = -4,
  style = {},
}) => {
  return (
    <div
      className="comic-badge inline-flex items-center gap-2 select-none"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        backgroundColor: bg,
        color: textColor,
        border: '3px solid #000000',
        borderRadius: '12px',
        boxShadow: '4px 4px 0px #000000',
        transform: `rotate(${rotation}deg)`,
        fontWeight: 900,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = `rotate(${rotation * -1.2}deg) scale(1.08)`;
        (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #000000';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = `rotate(${rotation}deg) scale(1)`;
        (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0px #000000';
      }}
    >
      <span style={{ fontSize: '12px' }}>{text}</span>
      {subtext && (
        <span
          style={{
            fontSize: '9px',
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '2px 6px',
            borderRadius: '6px',
          }}
        >
          {subtext}
        </span>
      )}
    </div>
  );
};

/**
 * Hand-drawn doodle curved arrow pointing in a given direction
 */
export const DoodleArrow: React.FC<{
  direction?: 'down-right' | 'down-left' | 'up-right' | 'right';
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ direction = 'down-right', color = '#ccff00', width = 60, height = 50, className = '', style = {} }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 80"
      fill="none"
      className={className}
      style={{ overflow: 'visible', filter: 'drop-shadow(2px 2px 0px #000000)', ...style }}
    >
      {direction === 'down-right' && (
        <>
          <path
            d="M10 20 C 35 10, 70 25, 75 60"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="4 1"
          />
          <path
            d="M58 55 L 75 64 L 78 45"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === 'down-left' && (
        <>
          <path
            d="M90 20 C 65 10, 30 25, 25 60"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="4 1"
          />
          <path
            d="M42 55 L 25 64 L 22 45"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === 'right' && (
        <>
          <path
            d="M10 40 Q 50 30 80 40"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M68 28 L 84 40 L 68 52"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};

/**
 * Comic Manga / Cartoon Speed Lines Background
 */
export const ActionLines: React.FC<{ opacity?: number; color?: string }> = ({
  opacity = 0.08,
  color = '#ccff00',
}) => {
  return (
    <svg
      viewBox="0 0 1000 1000"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
        zIndex: 1,
      }}
    >
      <defs>
        <radialGradient id="lineFade" cx="50%" cy="50%" r="50%">
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <g stroke="url(#lineFade)" strokeWidth="2.5">
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i * 360) / 48;
          const rad = (angle * Math.PI) / 180;
          const x1 = 500 + Math.cos(rad) * 160;
          const y1 = 500 + Math.sin(rad) * 160;
          const x2 = 500 + Math.cos(rad) * 750;
          const y2 = 500 + Math.sin(rad) * 750;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
    </svg>
  );
};

/**
 * Cartoon Star Accents
 */
export const ComicStars: React.FC<{ size?: number; color?: string; style?: React.CSSProperties }> = ({
  size = 28,
  color = '#ccff00',
  style = {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ overflow: 'visible', filter: 'drop-shadow(2px 2px 0px #000000)', ...style }}
    >
      <polygon
        points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38"
        fill={color}
        stroke="#000000"
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Interactive Cartoon Clapperboard
 */
export const CartoonClapperboard: React.FC<{
  scene?: string;
  take?: string;
  date?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}> = ({ scene = '01', take = 'A', date = '2026', onClick, style = {} }) => {
  const [clapped, setClapped] = React.useState(false);

  const handleClick = () => {
    setClapped(true);
    onClick?.();
    setTimeout(() => setClapped(false), 350);
  };

  return (
    <div
      onClick={handleClick}
      className="cartoon-clapper select-none"
      title="Click to Clap!"
      style={{
        position: 'relative',
        width: '160px',
        cursor: 'pointer',
        transform: clapped ? 'scale(0.96) rotate(-4deg)' : 'scale(1)',
        transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
        ...style,
      }}
    >
      {/* Top moving bar */}
      <div
        style={{
          width: '100%',
          height: '28px',
          backgroundColor: '#000000',
          border: '3.5px solid #000000',
          borderRadius: '8px 8px 0 0',
          display: 'flex',
          overflow: 'hidden',
          transformOrigin: 'bottom left',
          transform: clapped ? 'rotate(-24deg)' : 'rotate(-6deg)',
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '3px 3px 0px #000000',
          marginBottom: '2px',
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              backgroundColor: i % 2 === 0 ? '#ffffff' : '#000000',
              transform: 'skewX(-28deg)',
              borderRight: '1px solid #000000',
            }}
          />
        ))}
      </div>

      {/* Main clapper slate */}
      <div
        style={{
          backgroundColor: '#161824',
          border: '3.5px solid #000000',
          borderRadius: '0 0 14px 14px',
          padding: '10px 12px',
          color: '#ffffff',
          boxShadow: '5px 5px 0px #ccff00, 5px 5px 0px 3.5px #000000',
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px dashed rgba(255,255,255,0.2)', paddingBottom: '4px', marginBottom: '6px' }}>
          <span style={{ fontSize: '10px', color: '#ccff00', fontWeight: 900 }}>PROD: MOHANAD</span>
          <span style={{ fontSize: '10px', color: '#ff4d8d', fontWeight: 900 }}>4K</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>
          <div style={{ backgroundColor: '#0a0b12', padding: '3px', borderRadius: '4px', border: '1.5px solid #000' }}>
            <div style={{ fontSize: '8px', color: '#a1a3b5' }}>SCENE</div>
            <div style={{ color: '#ffffff' }}>{scene}</div>
          </div>
          <div style={{ backgroundColor: '#0a0b12', padding: '3px', borderRadius: '4px', border: '1.5px solid #000' }}>
            <div style={{ fontSize: '8px', color: '#a1a3b5' }}>TAKE</div>
            <div style={{ color: '#ffd93d' }}>{take}</div>
          </div>
          <div style={{ backgroundColor: '#0a0b12', padding: '3px', borderRadius: '4px', border: '1.5px solid #000' }}>
            <div style={{ fontSize: '8px', color: '#a1a3b5' }}>YEAR</div>
            <div style={{ color: '#ccff00' }}>{date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Illustrated Cartoon 4K Camera Rig
 */
export const CartoonCameraRig: React.FC<{ size?: number; color?: string; style?: React.CSSProperties }> = ({
  size = 140,
  color = '#ccff00',
  style = {},
}) => {
  return (
    <svg
      width={size}
      height={size * 0.85}
      viewBox="0 0 200 170"
      style={{ overflow: 'visible', filter: 'drop-shadow(4px 4px 0px #000000)', ...style }}
    >
      {/* Top handles & mic */}
      <rect x="55" y="15" width="80" height="14" rx="7" fill="#000000" stroke="#000000" strokeWidth="4" />
      <rect x="75" y="5" width="40" height="12" rx="4" fill="#ffd93d" stroke="#000000" strokeWidth="3" />
      {/* Camera body */}
      <rect x="40" y="32" width="110" height="95" rx="18" fill="#161826" stroke="#000000" strokeWidth="5" />
      {/* Viewfinder display */}
      <rect x="15" y="52" width="28" height="42" rx="6" fill="#000000" stroke="#000000" strokeWidth="3" />
      <rect x="18" y="56" width="20" height="34" rx="3" fill="#4dd2ff" />
      {/* Lens barrel */}
      <rect x="145" y="48" width="35" height="64" rx="8" fill="#000000" stroke="#000000" strokeWidth="4" />
      <rect x="175" y="42" width="18" height="76" rx="6" fill="#ffd93d" stroke="#000000" strokeWidth="4" />
      {/* Big lens glass with cartoon gleam */}
      <circle cx="95" cy="78" r="32" fill="#000000" stroke="#000000" strokeWidth="4" />
      <circle cx="95" cy="78" r="26" fill="#0a0b14" />
      <circle cx="95" cy="78" r="18" fill={color} />
      <ellipse cx="88" cy="72" rx="7" ry="4" fill="#ffffff" transform="rotate(-30 88 72)" />
      {/* Red record indicator button */}
      <circle cx="58" cy="48" r="6" fill="#ff4d8d" stroke="#000000" strokeWidth="2.5" />
      {/* Battery / SD card badge */}
      <rect x="52" y="105" width="32" height="12" rx="4" fill="#000000" />
      <text x="56" y="114" fill="#ccff00" fontSize="8" fontWeight="900" fontFamily="monospace">4K RAW</text>
    </svg>
  );
};

/**
 * Illustrated Cartoon Graduation & Knowledge Icon (Cap & Books)
 */
export const CartoonGraduationCap: React.FC<{ size?: number; style?: React.CSSProperties }> = ({
  size = 120,
  style = {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      style={{ overflow: 'visible', filter: 'drop-shadow(4px 4px 0px #000000)', ...style }}
    >
      {/* Stack of colorful books */}
      <g>
        {/* Book 1 (Bottom - Cyan) */}
        <rect x="30" y="115" width="100" height="22" rx="5" fill="#4dd2ff" stroke="#000000" strokeWidth="4" />
        <rect x="120" y="119" width="6" height="14" fill="#ffffff" />
        {/* Book 2 (Middle - Pink) */}
        <rect x="36" y="94" width="92" height="22" rx="5" fill="#ff4d8d" stroke="#000000" strokeWidth="4" />
        <rect x="118" y="98" width="6" height="14" fill="#ffffff" />
        {/* Book 3 (Top - Lime) */}
        <rect x="42" y="74" width="82" height="21" rx="5" fill="#ccff00" stroke="#000000" strokeWidth="4" />
      </g>
      {/* Mortarboard / Graduation Cap */}
      <g transform="translate(0, -6)">
        {/* Skull cap base */}
        <path d="M55 52 Q 80 62 105 52 L 105 66 Q 80 78 55 66 Z" fill="#000000" stroke="#000000" strokeWidth="3" />
        {/* Diamond top */}
        <polygon points="80,18 140,40 80,62 20,40" fill="#ffd93d" stroke="#000000" strokeWidth="4" />
        {/* Button & Tassel */}
        <circle cx="80" cy="40" r="5" fill="#000000" />
        <path d="M80 40 Q 110 44 116 70" stroke="#ff4d8d" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="116" cy="74" r="5" fill="#ff4d8d" stroke="#000000" strokeWidth="2" />
      </g>
    </svg>
  );
};

/**
 * Illustrated Cartoon Trophy Award
 */
export const CartoonTrophyAward: React.FC<{ size?: number; color?: string; style?: React.CSSProperties }> = ({
  size = 110,
  color = '#ffd93d',
  style = {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      style={{ overflow: 'visible', filter: 'drop-shadow(4px 4px 0px #000000)', ...style }}
    >
      {/* Handles */}
      <path
        d="M25 40 Q 10 60 30 75 L 42 70 Q 25 58 35 44 Z"
        fill="#000000"
        stroke="#000000"
        strokeWidth="2"
      />
      <path
        d="M115 40 Q 130 60 110 75 L 98 70 Q 115 58 105 44 Z"
        fill="#000000"
        stroke="#000000"
        strokeWidth="2"
      />
      {/* Cup body */}
      <path
        d="M32 25 L 108 25 Q 105 75 70 88 Q 35 75 32 25 Z"
        fill={color}
        stroke="#000000"
        strokeWidth="4.5"
      />
      {/* Star emblem */}
      <polygon
        points="70,42 74,54 86,54 76,62 80,74 70,66 60,74 64,62 54,54 66,54"
        fill="#ff4d8d"
        stroke="#000000"
        strokeWidth="2"
      />
      {/* Stem */}
      <rect x="63" y="88" width="14" height="20" fill="#000000" />
      {/* Base */}
      <polygon points="50,108 90,108 98,126 42,126" fill="#161824" stroke="#000000" strokeWidth="4" />
      <rect x="52" y="114" width="36" height="8" rx="2" fill="#ccff00" />
    </svg>
  );
};

/**
 * Illustrated Cartoon Director's Chair & Megaphone
 */
export const CartoonDirectorChair: React.FC<{ size?: number; style?: React.CSSProperties }> = ({
  size = 120,
  style = {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 150 150"
      style={{ overflow: 'visible', filter: 'drop-shadow(4px 4px 0px #000000)', ...style }}
    >
      {/* Crossed chair legs */}
      <line x1="35" y1="75" x2="105" y2="135" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
      <line x1="105" y1="75" x2="35" y2="135" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
      {/* Seat */}
      <rect x="30" y="68" width="80" height="12" rx="4" fill="#ff4d8d" stroke="#000000" strokeWidth="4" />
      {/* Backrest posts */}
      <line x1="40" y1="30" x2="40" y2="70" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      <line x1="100" y1="30" x2="100" y2="70" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
      {/* Backrest canvas */}
      <rect x="32" y="32" width="76" height="26" rx="4" fill="#ccff00" stroke="#000000" strokeWidth="4" />
      <text x="44" y="49" fill="#000000" fontSize="10" fontWeight="900" fontFamily="JetBrains Mono, monospace">DIRECTOR</text>
      {/* Megaphone next to chair */}
      <g transform="translate(90, 80) rotate(-20)">
        <polygon points="10,25 45,10 45,40" fill="#ffd93d" stroke="#000000" strokeWidth="3.5" />
        <rect x="5" y="20" width="8" height="10" rx="2" fill="#ff4d8d" stroke="#000000" strokeWidth="2.5" />
        <rect x="22" y="28" width="6" height="14" rx="2" fill="#000000" />
      </g>
    </svg>
  );
};
