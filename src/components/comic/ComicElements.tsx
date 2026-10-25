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
