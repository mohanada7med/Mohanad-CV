import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  });

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTouchDevice) return;
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
  }, [isVisible, isTouchDevice]);

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
      {/* Central Sharp Comic Dot */}
      <div
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: hasLabel ? '0px' : isHovering ? '8px' : '10px',
          height: hasLabel ? '0px' : isHovering ? '8px' : '10px',
          backgroundColor: '#ccff00',
          border: '2px solid #000000',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          opacity: hasLabel ? 0 : 1,
          boxShadow: '2px 2px 0px #000000',
        }}
      />

      {/* Trailing Responsive Cartoon Ring / Badge */}
      <div
        style={{
          position: 'fixed',
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: hasLabel ? '92px' : isHovering ? '44px' : '30px',
          height: hasLabel ? '92px' : isHovering ? '44px' : '30px',
          borderRadius: '50%',
          border: '2.5px solid #000000',
          backgroundColor: hasLabel ? '#ccff00' : isHovering ? 'rgba(204, 255, 0, 0.25)' : 'transparent',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.82 : 1})`,
          transition: 'width 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hasLabel ? '4px 4px 0px #000000' : 'none',
        }}
      >
        {hasLabel && (
          <span
            style={{
              color: '#070709',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 900,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textAlign: 'center',
              userSelect: 'none',
              padding: '4px',
              lineHeight: 1.2,
            }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
