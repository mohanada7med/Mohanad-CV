import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(true);

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check target element for custom data-cursor
      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
        if (cursorEl) {
          const text = cursorEl.getAttribute('data-cursor') || '';
          setCursorText(text);
          setIsHovering(true);
        } else {
          const interactive = target.closest('a, button, input, select, textarea, [role="button"]');
          if (interactive) {
            setCursorText('');
            setIsHovering(true);
          } else {
            setCursorText('');
            setIsHovering(false);
          }
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isVisible]);

  // Smooth lerp for trailing ring
  useEffect(() => {
    if (isTouchDevice) return;

    const animateTrailing = () => {
      setTrailingPos(prev => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.22,
          y: prev.y + dy * 0.22,
        };
      });
      requestRef.current = requestAnimationFrame(animateTrailing);
    };

    requestRef.current = requestAnimationFrame(animateTrailing);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  const hasLabel = cursorText.length > 0;

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 10000, overflow: 'hidden' }}>
      {/* Central Sharp Dot */}
      <div
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: hasLabel ? '0px' : isHovering ? '6px' : '8px',
          height: hasLabel ? '0px' : isHovering ? '6px' : '8px',
          backgroundColor: '#ccff00',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          opacity: hasLabel ? 0 : 1,
          boxShadow: '0 0 10px #ccff00',
        }}
      />

      {/* Trailing Responsive Ring / Badge */}
      <div
        style={{
          position: 'fixed',
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: hasLabel ? '88px' : isHovering ? '48px' : '32px',
          height: hasLabel ? '88px' : isHovering ? '48px' : '32px',
          borderRadius: '50%',
          border: hasLabel ? '1px solid #ccff00' : isHovering ? '1.5px solid #ccff00' : '1px solid rgba(255, 255, 255, 0.4)',
          backgroundColor: hasLabel ? 'rgba(7, 7, 9, 0.92)' : isHovering ? 'rgba(204, 255, 0, 0.12)' : 'transparent',
          backdropFilter: hasLabel ? 'blur(8px)' : 'none',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : 1})`,
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, border-color 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hasLabel ? '0 0 24px rgba(204, 255, 0, 0.35)' : 'none',
        }}
      >
        {hasLabel && (
          <span
            style={{
              color: '#ccff00',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
