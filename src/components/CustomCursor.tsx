
import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return true;

    return (
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );
  });

  useEffect(() => {
    if (isTouchDevice) return;

    document.body.classList.add('custom-cursor-active');

    let lastHover = false;
    let lastText = '';

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      setIsVisible(true);

      const target =
        event.target instanceof Element ? event.target : null;

      const labeled = target?.closest('[data-cursor]');
      const interactive = target?.closest(
        'a, button, input, select, textarea, [role="button"], [data-cursor]'
      );

      const nextText = labeled?.getAttribute('data-cursor') || '';
      const nextHover = Boolean(interactive);

      if (lastText !== nextText) {
        lastText = nextText;
        setCursorText(nextText);
      }

      if (lastHover !== nextHover) {
        lastHover = nextHover;
        setIsHovering(nextHover);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const animate = () => {
      if (cursorRef.current) {
        // The fingertip is aligned with the actual mouse position.
        cursorRef.current.style.transform =
          `translate3d(${mouse.current.x - 23}px, ${mouse.current.y - 5}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('blur', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('blur', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);

      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }

      document.body.classList.remove('custom-cursor-active');
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 10000,
          pointerEvents: 'none',
          opacity: isVisible ? 1 : 0,
          willChange: 'transform',
        }}
      >
        {/* Cartoon glove */}
        <svg
          width={isHovering ? 76 : 62}
          height={isHovering ? 76 : 62}
          viewBox="0 0 64 64"
          fill="none"
          style={{
            overflow: 'visible',
            transformOrigin: '23px 5px',
            transform: isClicking
              ? 'rotate(-12deg) scale(0.82)'
              : isHovering
                ? 'rotate(-5deg) scale(1.08)'
                : 'rotate(0deg) scale(1)',
            transition:
              'transform 140ms cubic-bezier(.2, 1.8, .4, 1), width 180ms, height 180ms',
            filter: 'drop-shadow(4px 5px 0px #080808)',
          }}
        >
          {/* Glove shadow */}
          <path
            d="M22 31V11.5C22 7.9 24.1 6 27 6s5 2.1 5 5.5V26V17.5c0-3.2 2-5.1 4.8-5.1 3 0 5.2 2 5.2 5.1V27V21c0-3.2 2-5 4.8-5s5.2 2 5.2 5v9V26c0-3.1 2-4.9 4.5-4.9S61 23 61 26v15c0 12.2-7.6 18-19 18h-5c-8.3 0-12.5-4.7-16.5-10.5L9 35.5c-2.1-2.6-1.1-5.5 1.3-6.8 2.2-1.1 4.4-.1 6.3 2l5.4 6V31Z"
            fill="#080808"
            stroke="#080808"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Main glove */}
          <path
            d="M21 30V11.5C21 8.3 23.1 6.5 26 6.5s5 2.1 5 5.5V26V17.5c0-3.2 2-5.1 4.8-5.1 3 0 5.2 2 5.2 5.1V27V21c0-3.2 2-5 4.8-5s5.2 2 5.2 5v9V26c0-3.1 2-4.9 4.5-4.9S60 23 60 26v15c0 12.2-7.6 18-19 18h-5c-8.3 0-12.5-4.7-16.5-10.5L8 35.5c-2.1-2.6-1.1-5.5 1.3-6.8 2.2-1.1 4.4-.1 6.3 2l5.4 6V30Z"
            fill="#FFFFFF"
            stroke="#080808"
            strokeWidth="2.7"
            strokeLinejoin="round"
          />

          {/* Finger crease details */}
          <path
            d="M31 27v-8M41 28v-6M51 31v-5"
            stroke="#B8B8B8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Yellow comic cuff */}
          <path
            d="M29 51l13-1 4 8-13 2-4-9Z"
            fill="#FFE600"
            stroke="#080808"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Cuff detail */}
          <path
            d="m33 53 2 5m3-6 2 5"
            stroke="#080808"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Red action mark */}
          {isHovering && (
            <g
              stroke="#FF4D00"
              strokeWidth="2.8"
              strokeLinecap="round"
            >
              <path d="M8 9 3 5" />
              <path d="M12 4 11 0" />
              <path d="M5 15 0 15" />
            </g>
          )}
        </svg>

        {/* Floating comic label */}
        {cursorText && (
          <div
            style={{
              position: 'absolute',
              top: 39,
              left: 39,
              padding: '7px 11px',
              background: '#ccff00',
              color: '#080808',
              border: '2px solid #080808',
              boxShadow: '3px 3px 0 #080808',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              transform: 'rotate(-6deg)',
              animation: 'glove-label-in 160ms ease-out',
            }}
          >
            {cursorText}
          </div>
        )}

        {/* Click comic burst */}
        {isClicking && (
          <svg
            key="click-burst"
            width="52"
            height="52"
            viewBox="0 0 52 52"
            style={{
              position: 'absolute',
              top: -9,
              left: -3,
              overflow: 'visible',
            }}
          >
            <path
              d="M26 1 31 15 45 8 38 22 51 27 37 32 44 46 30 39 25 52 20 38 6 45 13 31 0 26 14 21 7 7 21 14Z"
              fill="#FFE600"
              stroke="#080808"
              strokeWidth="2.5"
              strokeLinejoin="round"
              style={{
                transformOrigin: '26px 26px',
                animation: 'glove-impact 260ms ease-out forwards',
              }}
            />
          </svg>
        )}
      </div>

      <style>
        {`
          body.custom-cursor-active,
          body.custom-cursor-active a,
          body.custom-cursor-active button,
          body.custom-cursor-active input,
          body.custom-cursor-active textarea,
          body.custom-cursor-active select,
          body.custom-cursor-active [role="button"],
          body.custom-cursor-active [data-cursor] {
            cursor: none !important;
          }

          @keyframes glove-label-in {
            from {
              opacity: 0;
              transform: rotate(-6deg) scale(0.6);
            }
            to {
              opacity: 1;
              transform: rotate(-6deg) scale(1);
            }
          }

          @keyframes glove-impact {
            0% {
              opacity: 1;
              transform: scale(0.2) rotate(-20deg);
            }
            70% {
              opacity: 1;
              transform: scale(1.15) rotate(8deg);
            }
            100% {
              opacity: 0;
              transform: scale(1.5) rotate(20deg);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            body.custom-cursor-active * {
              scroll-behavior: auto;
            }
          }
        `}
      </style>
    </>
  );
};
