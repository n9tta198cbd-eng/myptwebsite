'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { Case } from '@/content/cases';
import { useUI } from './page/PageContext';

/* Кейс целиком. Esc и клик по фону закрывают, скролл страницы блокируется. */
export default function CaseModal({ item, onClose }: { item: Case | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const ui = useUI();

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      html.style.overflow = prev;
    };
  }, [item, onClose]);

  const blocks = item
    ? [
        { title: ui.challenge, body: item.challenge },
        { title: ui.approach, body: item.approach },
        { title: ui.outcome, body: item.outcome },
      ].filter((b) => b.body)
    : [];

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[90] overflow-y-auto overscroll-contain bg-paper"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="label fixed top-4 right-4 z-10 bg-ink px-4 py-2 text-paper hover:bg-signal md:right-8"
          >
            {ui.close} ✕
          </button>

          <article className="px-4 pt-20 pb-20 md:px-8">
            <p className="label text-signal">N° {item.num} — {item.category}</p>
            <h2 className="display mt-4 text-giant">{item.title}</h2>
            <p className="mt-4 max-w-[40ch] text-2xl italic md:ml-[25%]">{item.subtitle}</p>

            <div className="relative mt-12 aspect-[16/9] w-full border-2 border-ink md:w-[75%]">
              <Image
                src={item.cover}
                alt={`${item.title} — ${ui.cover}`}
                fill
                unoptimized={item.cover.endsWith('.svg')}
                sizes="(max-width: 767px) 100vw, 75vw"
                className="object-cover"
              />
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-12">
              <dl className="grid grid-cols-2 gap-4 self-start md:col-span-3 md:grid-cols-1">
                {[
                  [ui.client, item.client],
                  [ui.year, item.year],
                  [ui.role, item.role],
                ].map(([k, v]) => (
                  <div key={k} className="border-t-2 border-ink pt-2">
                    <dt className="label text-ash">{k}</dt>
                    <dd className="mt-1 leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="md:col-span-8 md:col-start-5">
                <p className="text-2xl leading-snug md:text-3xl">{item.summary}</p>
                {blocks.map((b) => (
                  <section key={b.title} className="mt-10">
                    <h3 className="label text-signal">{b.title}</h3>
                    <p className="mt-2 text-lg">{b.body}</p>
                  </section>
                ))}
                {item.services.length > 0 && (
                  <ul className="mt-10 flex flex-wrap gap-2">
                    {item.services.map((s) => (
                      <li key={s} className="label border-2 border-ink px-3 py-1.5">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
