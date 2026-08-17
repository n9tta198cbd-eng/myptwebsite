'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import CardBack from './ornaments/CardBack';
import Fleur from './ornaments/Fleur';
import type { Case } from '@/lib/cases';
import { useRichInteractions } from '@/lib/motion';

const MAX_TILT = 8;
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export const cardVariants: Variants = {
  hidden: { y: 64, opacity: 0, rotate: -1.5 },
  visible: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Карточка-таро: 3D-tilt за курсором, флип на 180° по клику,
   повторный клик (или кнопка на обороте) открывает кейс. */
export default function TarotCard({ item, onOpen }: { item: Case; onOpen: () => void }) {
  const rich = useRichInteractions();
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const rotateX = useSpring(tiltXRaw, { stiffness: 220, damping: 20, mass: 0.4 });
  const rotateY = useSpring(tiltYRaw, { stiffness: 220, damping: 20, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rich) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltYRaw.set(px * MAX_TILT * 2);
    tiltXRaw.set(-py * MAX_TILT * 2);
  };

  const reset = () => {
    tiltXRaw.set(0);
    tiltYRaw.set(0);
  };

  const activate = () => {
    if (!flipped) setFlipped(true);
    else onOpen();
  };

  const numeral = ROMAN[Number(item.num) - 1] ?? item.num;

  return (
    <motion.div variants={cardVariants} className="[perspective:1000px]">
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={rich ? { y: -10 } : undefined}
        className="group relative"
      >
        <div
          role="button"
          tabIndex={0}
          data-cursor="card"
          aria-label={`${item.title} — ${item.subtitle}`}
          onClick={activate}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              activate();
            }
          }}
          className="relative block aspect-[2/3.5] w-full [transform-style:preserve-3d] transition-shadow duration-300 group-hover:shadow-[0_0_0_1px_var(--color-blood),0_0_30px_-4px_color-mix(in_srgb,var(--color-blood)_50%,transparent),0_24px_50px_-20px_var(--color-ink)]"
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 130, damping: 18, duration: 0.6 }}
            className="relative size-full [transform-style:preserve-3d]"
          >
            {/* ЛИЦО */}
            <div className="face flex flex-col overflow-hidden border border-gold/60 bg-charcoal">
              {/* внутренние рамки */}
              <span className="pointer-events-none absolute inset-[6px] z-10 border border-bone/18" />
              <span className="pointer-events-none absolute inset-[11px] z-10 border border-gold/30" />

              {/* римская цифра и флёр */}
              <div className="relative z-10 flex items-start justify-between px-5 pt-5">
                <span className="grid size-[26px] place-items-center border border-bone/35 font-antiqua text-[13px] leading-none text-bone">
                  {numeral}
                </span>
                <Fleur size={16} className="text-gold" />
              </div>

              {/* иллюстрация */}
              <div className="relative mx-5 mt-3 flex-1 overflow-hidden border border-gold/30">
                <Image
                  src={item.cover}
                  alt={`${item.title} — обложка кейса`}
                  fill
                  unoptimized={item.cover.endsWith('.svg')}
                  sizes="(max-width: 767px) 88vw, (max-width: 1279px) 44vw, 344px"
                  className="object-cover"
                />
                {/* гравюра уходит в фон карты */}
                <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-charcoal via-transparent to-transparent" />
              </div>

              {/* плашка */}
              <div className="relative z-10 mx-5 mt-3 mb-5 flex min-h-[92px] flex-col items-center justify-center gap-1.5 border border-ink/60 bg-bone px-3 py-3 text-center">
                <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-blood">
                  <Fleur size={10} />
                  {item.num}
                  <Fleur size={10} />
                </span>
                {/* плашка светлая, поэтому текст на ней тёмный */}
                <h3 className="font-antiqua text-[17px] leading-[1.14] tracking-[0.05em] text-ink uppercase">
                  {item.title}
                </h3>
                <p className="font-mono text-[9.5px] tracking-[0.16em] text-ink/55 uppercase">
                  {item.tag}
                </p>
              </div>
            </div>

            {/* ОБОРОТ */}
            <div className="face overflow-hidden border border-gold/60 bg-charcoal [transform:rotateY(180deg)]">
              <CardBack className="absolute inset-0 size-full" />

              <div className="relative flex h-full flex-col items-center justify-end gap-4 p-6 pb-8 text-center">
                <p className="font-antiqua text-[18px] leading-snug text-bone/85 italic">
                  {item.subtitle}
                </p>
                <button
                  type="button"
                  data-cursor="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                  }}
                  className="border border-gold/70 px-4 py-2 font-mono text-[10.5px] tracking-[0.16em] text-bone uppercase transition-colors duration-200 hover:border-blood hover:bg-blood"
                >
                  Открыть
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
