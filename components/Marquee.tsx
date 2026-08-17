'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { SITE } from '@/lib/site';

const REPEATS = 6;

/* Бегущая строка между hero и работами. Наклон -2deg, фон --ink.
   Скорость и направление зависят от velocity скролла. */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const slide = gsap.to(track, {
      xPercent: -50,
      duration: 28,
      ease: 'none',
      repeat: -1,
    });

    let idle: ReturnType<typeof setTimeout>;

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const scale = gsap.utils.clamp(-10, 10, 1 + velocity / 180);
        gsap.to(slide, { timeScale: scale, duration: 0.3, overwrite: true });

        clearTimeout(idle);
        idle = setTimeout(() => {
          gsap.to(slide, { timeScale: 1, duration: 0.9, overwrite: true });
        }, 140);
      },
    });

    return () => {
      clearTimeout(idle);
      trigger.kill();
      slide.kill();
    };
  }, []);

  const line = SITE.marquee.repeat(REPEATS);

  return (
    <div className="relative -my-2 w-screen overflow-hidden py-6 md:py-10">
      <div className="-mx-[4vw] w-[108vw] -rotate-2 overflow-hidden border-y border-gold/40 bg-blood py-3 md:py-4">
        <div ref={trackRef} className="flex w-max will-change-transform">
          <span
            className="shrink-0 font-blackletter text-3xl whitespace-nowrap text-bone md:text-5xl"
            aria-hidden="true"
          >
            {line}
          </span>
          <span
            className="shrink-0 font-blackletter text-3xl whitespace-nowrap text-bone md:text-5xl"
            aria-hidden="true"
          >
            {line}
          </span>
        </div>
      </div>
    </div>
  );
}
