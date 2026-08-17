'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import Corner from './ornaments/Corner';
import type { Case } from '@/lib/cases';
import { useRichInteractions } from '@/lib/motion';

const MAX_TILT = 8;

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

  return (
    <motion.div variants={cardVariants} className="[perspective:1000px]">
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={rich ? { y: -8 } : undefined}
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
          className="relative block aspect-[2/3.5] w-full [transform-style:preserve-3d] transition-shadow duration-300 group-hover:shadow-[0_18px_40px_-12px_rgba(22,19,14,0.45)]"
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 130, damping: 18, duration: 0.6 }}
            className="relative size-full [transform-style:preserve-3d]"
          >
            {/* ЛИЦО */}
            <div className="face overflow-hidden border border-ink bg-bone">
              <div className="relative flex h-full flex-col">
                <div className="relative m-2 aspect-[3/4] overflow-hidden border border-ink/45">
                  <Image
                    src={item.cover}
                    alt={`${item.title} — обложка кейса`}
                    fill
                    unoptimized={item.cover.endsWith('.svg')}
                    sizes="(max-width: 767px) 90vw, (max-width: 1279px) 45vw, 30vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-2 px-3 pb-3">
                  <div>
                    <span className="label block text-blood">N° {item.num}</span>
                    <h3 className="mt-1 font-antiqua text-xl leading-tight md:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                  <p className="label text-ink/60">
                    {item.category} · {item.year}
                  </p>
                </div>
              </div>

              {/* орнаментальные уголки */}
              <Corner size={30} className="absolute top-0 left-0 text-ink/70" />
              <Corner size={30} className="absolute top-0 right-0 rotate-90 text-ink/70" />
              <Corner size={30} className="absolute right-0 bottom-0 rotate-180 text-ink/70" />
              <Corner size={30} className="absolute bottom-0 left-0 -rotate-90 text-ink/70" />

              {/* красное свечение по краю на hover */}
              <span className="pointer-events-none absolute inset-0 border border-blood/0 transition-colors duration-300 group-hover:border-blood/55" />
            </div>

            {/* ОБОРОТ */}
            <div className="face overflow-hidden border border-ink bg-ink [transform:rotateY(180deg)]">
              <svg
                viewBox="0 0 200 350"
                className="absolute inset-0 size-full text-parchment"
                fill="none"
                aria-hidden="true"
              >
                <g stroke="currentColor" strokeWidth="0.6" opacity="0.35">
                  {Array.from({ length: 15 }, (_, i) => (
                    <circle key={i} cx="100" cy="175" r={12 + i * 11} />
                  ))}
                  {Array.from({ length: 16 }, (_, i) => {
                    const a = (i / 16) * Math.PI * 2;
                    return (
                      <line
                        key={i}
                        x1={100 + Math.cos(a) * 12}
                        y1={175 + Math.sin(a) * 12}
                        x2={100 + Math.cos(a) * 170}
                        y2={175 + Math.sin(a) * 170}
                      />
                    );
                  })}
                </g>
                <path d="M100 120 L142 200 H58 Z" stroke="var(--color-gold)" strokeWidth="1.2" />
                <circle cx="100" cy="175" r="26" stroke="var(--color-blood)" strokeWidth="1.4" />
                <rect x="8" y="8" width="184" height="334" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              </svg>

              <div className="relative flex h-full flex-col items-center justify-end gap-4 p-5 text-center">
                <p className="font-antiqua text-lg text-parchment/85 italic">{item.subtitle}</p>
                <button
                  type="button"
                  data-cursor="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                  }}
                  className="label border border-parchment/60 px-4 py-2 text-parchment transition-colors duration-200 hover:border-blood hover:bg-blood"
                >
                  Открыть кейс
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
