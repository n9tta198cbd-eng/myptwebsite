'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import Sigil from './ornaments/Sigil';
import { useReducedMotion } from '@/lib/motion';

type Phase = 'load' | 'flash' | 'out' | 'done';

const ORDER: Record<Phase, number> = { load: 0, flash: 1, out: 2, done: 3 };

const RAMP_MS = 900;
const FLASH_MS = 190;
const CURTAIN_MS = 800;
/* Страховка: в фоновой вкладке requestAnimationFrame не тикает, поэтому
   прелоадер уводится по таймеру, иначе он висел бы до фокуса вкладки. */
const HARD_LIMIT_MS = 2000;

/* Чёрный экран, вращающийся сигил и счётчик процентов.
   На финале сигил вспыхивает красным, затем экран уходит шторкой вверх за 0.8s. */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('load');
  const [pct, setPct] = useState(0);

  // фазы только вперёд: страховочный таймер не должен откатываться rAF-циклом
  const advance = useCallback((next: Phase) => {
    setPhase((current) => (ORDER[next] > ORDER[current] ? next : current));
  }, []);

  useEffect(() => {
    if (reduced) return;

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / RAMP_MS, 1);
      setPct(Math.round((1 - (1 - p) ** 2) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else advance('flash');
    };
    raf = requestAnimationFrame(tick);

    const hardLimit = setTimeout(() => {
      setPct(100);
      advance('out');
    }, HARD_LIMIT_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hardLimit);
    };
  }, [advance, reduced]);

  // вспышка перед уходом
  useEffect(() => {
    if (phase !== 'flash') return;
    const t = setTimeout(() => advance('out'), FLASH_MS);
    return () => clearTimeout(t);
  }, [phase, advance]);

  // размонтирование гарантировано даже если анимация шторки не проигралась
  useEffect(() => {
    if (phase !== 'out') return;
    const t = setTimeout(() => advance('done'), CURTAIN_MS + 200);
    return () => clearTimeout(t);
  }, [phase, advance]);

  // пока прелоадер на экране — скролл заблокирован.
  // при reduced motion его нет, поэтому блокировать нечего.
  useEffect(() => {
    if (reduced || phase === 'done') return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev;
    };
  }, [phase, reduced]);

  // при reduced motion прелоадер не показывается вовсе
  if (reduced || phase === 'done') return null;

  const flashing = phase === 'flash';

  return (
    <motion.div
      id="preloader"
      className="fixed inset-0 z-[100] grid place-items-center bg-[#0b0906]"
      initial={{ y: 0 }}
      animate={{ y: phase === 'out' ? '-100%' : 0 }}
      transition={{ duration: CURTAIN_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase === 'out') advance('done');
      }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-8">
        <motion.div
          animate={
            flashing
              ? { scale: [1, 1.18, 1], color: 'var(--color-blood)' }
              : { scale: 1, color: 'var(--color-parchment)' }
          }
          transition={{ duration: FLASH_MS / 1000 }}
          className="text-parchment"
        >
          <div className="ring-spin">
            <Sigil size={92} strokeWidth={1} />
          </div>
        </motion.div>

        <span className="label text-parchment/70 tabular-nums">
          {String(pct).padStart(3, '0')} %
        </span>
      </div>
    </motion.div>
  );
}
