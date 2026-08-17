'use client';

import { motion } from 'framer-motion';
import Emblem from './ornaments/Emblem';
import EngravedFrame from './ornaments/EngravedFrame';
import RotatingRing from './RotatingRing';
import { SITE } from '@/lib/site';
import { useReducedMotion } from '@/lib/motion';

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-20 md:px-10"
    >
      <EngravedFrame />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* печать с вращающимся кольцом текста */}
        <div className="relative grid size-[260px] place-items-center md:size-[340px]">
          <RotatingRing size={340} />
          <Emblem size={186} className="relative" />
        </div>

        <h1 className="mt-6 font-blackletter text-hero leading-[0.82] tracking-[0.02em] md:mt-2">
          {SITE.name}
          <span className="sr-only"> — {SITE.role}</span>
        </h1>

        <p className="label mt-5 text-ink/75">{SITE.heroSubtitle}</p>
      </div>

      {/* подсказка скролла: линия с бегущей точкой */}
      <div className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <div className="relative h-14 w-px bg-ink/35">
          {reduced ? (
            <span className="absolute -left-[2.5px] top-0 size-[5px] rounded-full bg-blood" />
          ) : (
            <motion.span
              className="absolute -left-[2.5px] size-[5px] rounded-full bg-blood"
              animate={{ y: [0, 50, 0], opacity: [1, 1, 0.2, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
