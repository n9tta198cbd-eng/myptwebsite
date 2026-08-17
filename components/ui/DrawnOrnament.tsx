'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

/* Гравюра «дорисовывается» при входе во вьюпорт: stroke-dashoffset по
   ScrollTrigger, 1.2s power2.out, триггер 75%. Анимируются потомки
   элемента с классом .ornament-stroke. */
export default function DrawnOrnament({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host || prefersReducedMotion()) return;

    const shapes = host.querySelectorAll<SVGGeometryElement>('.ornament-stroke > *');
    if (shapes.length === 0) return;

    const ctx = gsap.context(() => {
      shapes.forEach((shape) => {
        let length = 0;
        try {
          length = shape.getTotalLength();
        } catch {
          return;
        }
        if (!length) return;

        gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(shape, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: host, start: 'top 75%', once: true },
        });
      });
    }, host);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
