'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';
import { useRichInteractions } from '@/lib/motion';

const RADIUS = 60;
const MAX_OFFSET = 12;

/* Притяжение к курсору в радиусе 60px, максимум 12px смещения, возврат — spring.
   Отключено на тач-устройствах, узких экранах и при reduced motion. */
export default function MagneticButton({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const rich = useRichInteractions();
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (!rich) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // порог считаем от края элемента, а не от центра
      const reach = RADIUS + Math.max(r.width, r.height) / 2;
      const dist = Math.hypot(dx, dy);

      if (dist > reach) {
        rawX.set(0);
        rawY.set(0);
        return;
      }

      const pull = 1 - dist / reach;
      rawX.set((dx / reach) * MAX_OFFSET * pull * 2.4);
      rawY.set((dy / reach) * MAX_OFFSET * pull * 2.4);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [rich, rawX, rawY]);

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}
