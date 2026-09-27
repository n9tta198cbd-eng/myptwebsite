'use client';

import { motion } from 'framer-motion';
import Emblem from '../ornaments/Emblem';
import EngravedFrame from '../ornaments/EngravedFrame';
import RotatingRing from '../RotatingRing';
import Actions from '../ui/Actions';
import type { HeroBlock } from '@/content/types';
import { useReducedMotion } from '@/lib/motion';

/* Первый экран в двух вариантах:
   emblem — печать с кольцом и вордмарком (главная, узнавание личности);
   statement — крупная фраза на языке заказчика (коммерческие страницы). */
export default function Hero({ block, id }: { block: HeroBlock; id: string }) {
  const statement = block.variant === 'statement';

  return (
    <section
      id={id}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-20 md:px-10"
    >
      <EngravedFrame />

      {statement ? (
        <div className="relative z-10 mx-auto w-full max-w-[1100px]">
          {block.eyebrow && <p className="label text-blood">{block.eyebrow}</p>}
          <h1 className="mt-5 font-antiqua text-[clamp(2.4rem,7.4vw,6.6rem)] leading-[0.98]">
            {block.title}
          </h1>
          {block.lead && (
            <p className="mt-8 max-w-[56ch] font-antiqua text-xl leading-snug text-bone/75 md:text-[26px]">
              {block.lead}
            </p>
          )}
          <Actions items={block.actions} className="mt-10" />
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative grid size-[260px] place-items-center md:size-[340px]">
            <RotatingRing size={340} text={block.ring ?? block.eyebrow ?? ''} />
            <Emblem size={186} className="relative" />
          </div>

          <h1 className="mt-6 font-blackletter text-hero leading-[0.82] tracking-[0.02em] md:mt-2">
            {block.title}
          </h1>

          {block.eyebrow && <p className="label mt-5 text-bone/70">{block.eyebrow}</p>}
          {block.lead && (
            <p className="mt-8 max-w-[44ch] font-antiqua text-xl leading-snug text-bone/80 md:text-2xl">
              {block.lead}
            </p>
          )}
          <Actions items={block.actions} className="mt-8 justify-center" />
        </div>
      )}

      <ScrollHint />
    </section>
  );
}

/* подсказка скролла: линия с бегущей точкой */
function ScrollHint() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 md:block">
      <div className="relative h-14 w-px bg-bone/25">
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
  );
}
