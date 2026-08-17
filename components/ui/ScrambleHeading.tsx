'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';
import { useRichInteractions } from '@/lib/motion';

const GLYPHS = ['☿', '♄', '♆', '⚚', 'ᚠ', 'ᚱ', '☾', '⚸', 'ᚦ', '♃', '⧉', 'ᛉ'];
const DURATION = 600;

/* Заголовок «собирается» из рун и алхимических знаков при входе во вьюпорт.
   Срабатывает один раз. При reduced motion и на мобильных сразу финальный текст. */
export default function ScrambleHeading({
  text,
  as: Tag = 'h2',
  className = '',
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const rich = useRichInteractions();
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(text);
  const played = useRef(false);

  useEffect(() => {
    if (!rich || played.current) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || played.current) return;
        played.current = true;
        observer.disconnect();

        const chars = [...text];
        const start = performance.now();
        let raf = 0;

        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const settled = Math.floor(progress * chars.length);

          setDisplay(
            chars
              .map((ch, i) => {
                if (ch === ' ') return ' ';
                if (i < settled) return ch;
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              })
              .join(''),
          );

          if (progress < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            setDisplay(text);
          }
        };

        raf = requestAnimationFrame(tick);
        // страховка: если компонент размонтируется во время анимации
        el.addEventListener('scramble-cancel', () => cancelAnimationFrame(raf), { once: true });
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      el.dispatchEvent(new Event('scramble-cancel'));
    };
  }, [rich, text]);

  return (
    <Tag ref={ref} className={className}>
      {/* доступное имя всегда финальное, независимо от фазы анимации */}
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
