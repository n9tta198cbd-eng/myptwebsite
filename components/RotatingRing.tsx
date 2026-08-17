'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { SITE } from '@/lib/site';

const PATH_ID = 'hero-ring-path';

/* Кольцо текста вокруг эмблемы: базовое вращение 20s linear, скорость и
   направление дополнительно реагируют на velocity скролла. */
export default function RotatingRing({ size = 340 }: { size?: number }) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const spin = gsap.to(el, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
      transformOrigin: '50% 50%',
    });

    let idle: ReturnType<typeof setTimeout>;

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const scale = gsap.utils.clamp(-8, 8, 1 + velocity / 250);
        gsap.to(spin, { timeScale: scale, duration: 0.3, overwrite: true });

        clearTimeout(idle);
        idle = setTimeout(() => {
          gsap.to(spin, { timeScale: 1, duration: 0.9, overwrite: true });
        }, 140);
      },
    });

    return () => {
      clearTimeout(idle);
      trigger.kill();
      spin.kill();
    };
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      className="absolute inset-0 m-auto"
    >
      <defs>
        <path id={PATH_ID} d="M 200,28 A 172,172 0 1,1 199.9,28" fill="none" />
      </defs>
      <g ref={ref}>
        <text
          fill="var(--color-bone)"
          fontSize="13.5"
          letterSpacing="3.1"
          style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}
        >
          <textPath href={`#${PATH_ID}`} startOffset="0">
            {SITE.ringText.repeat(2)}
          </textPath>
        </text>
      </g>
    </svg>
  );
}
