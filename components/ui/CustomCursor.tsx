'use client';

import { useEffect, useRef } from 'react';
import { useRichInteractions } from '@/lib/motion';

/* Кастомный курсор: точка 8px (blood) + кольцо 36px (ink), кольцо догоняет
   с lerp 0.15. Состояния читаются из data-cursor у элемента под курсором.
   На тач-устройствах и при reduced motion не монтируется вовсе. */
export default function CustomCursor() {
  const rich = useRichInteractions();
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rich) return;

    document.body.dataset.cursorActive = 'true';

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      const el = e.target instanceof Element ? e.target.closest('[data-cursor]') : null;
      const state = (el instanceof HTMLElement && el.dataset.cursor) || 'default';
      const wrap = wrapRef.current;
      if (wrap && wrap.dataset.state !== state) wrap.dataset.state = state;
    };

    const onLeave = () => {
      if (wrapRef.current) wrapRef.current.dataset.visible = 'false';
    };
    const onEnter = () => {
      if (wrapRef.current) wrapRef.current.dataset.visible = 'true';
    };

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.15;
      ring.y += (target.y - ring.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      delete document.body.dataset.cursorActive;
    };
  }, [rich]);

  if (!rich) return null;

  return (
    <div
      ref={wrapRef}
      data-state="default"
      data-visible="true"
      className="group/cursor pointer-events-none fixed inset-0 z-[70] data-[visible=false]:opacity-0"
      aria-hidden="true"
    >
      {/* кольцо */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 size-9 rounded-full border border-bone transition-[width,height,border-color,background-color] duration-200 ease-out group-data-[state=card]/cursor:size-14 group-data-[state=card]/cursor:border-blood group-data-[state=link]/cursor:size-14 group-data-[state=link]/cursor:border-blood group-data-[state=seal]/cursor:size-14 group-data-[state=seal]/cursor:border-blood group-data-[state=seal]/cursor:bg-blood/10"
      />

      {/* центральный слой: кинжал по умолчанию, сигил над интерактивом */}
      <div ref={dotRef} className="fixed top-0 left-0 grid size-6 place-items-center">
        <span className="absolute transition-opacity duration-150 group-data-[state=card]/cursor:opacity-0 group-data-[state=link]/cursor:opacity-0 group-data-[state=seal]/cursor:opacity-0">
          <svg width="10" height="22" viewBox="0 0 10 22" fill="none" aria-hidden="true">
            <path d="M5 0 L7.4 6 V14 H2.6 V6 Z" fill="var(--color-blood)" />
            <path d="M0.6 14.6h8.8" stroke="var(--color-bone)" strokeWidth="1.4" />
            <path d="M5 15v6.4" stroke="var(--color-bone)" strokeWidth="1.4" />
          </svg>
        </span>

        <span className="absolute opacity-0 transition-opacity duration-150 group-data-[state=card]/cursor:opacity-100 group-data-[state=link]/cursor:opacity-100 group-data-[state=seal]/cursor:opacity-100">
          <svg width="16" height="16" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M24 4 L41 34 H7 Z" stroke="var(--color-blood)" strokeWidth="3" />
            <circle cx="24" cy="24" r="4" fill="var(--color-blood)" />
          </svg>
        </span>
      </div>
    </div>
  );
}
