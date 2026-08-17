'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Corner from './ornaments/Corner';
import type { Case } from '@/lib/cases';

/* Модалка кейса: полный текст, перенесённый со старого сайта.
   Esc и клик по фону закрывают, скролл страницы блокируется. */
export default function CaseModal({
  item,
  onClose,
}: {
  item: Case | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    window.__lenis?.stop();
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      window.__lenis?.start();
      html.style.overflow = prevOverflow;
    };
  }, [item, onClose]);

  const blocks = item
    ? [
        { title: 'Вызов', body: item.challenge },
        { title: 'Подход', body: item.approach },
        { title: 'Результат', body: item.outcome },
      ].filter((b) => b.body)
    : [];

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto overscroll-contain p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="fixed inset-0 -z-10 block size-full cursor-default bg-ink/85 backdrop-blur-[2px]"
          />

          <motion.article
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-auto w-full max-w-[880px] border border-gold/60 bg-charcoal"
          >
            <Corner size={40} className="absolute top-0 left-0 z-10 text-gold" />
            <Corner size={40} className="absolute top-0 right-0 z-10 rotate-90 text-gold" />
            <Corner size={40} className="absolute right-0 bottom-0 z-10 rotate-180 text-gold" />
            <Corner size={40} className="absolute bottom-0 left-0 z-10 -rotate-90 text-gold" />

            <button
              ref={closeRef}
              type="button"
              data-cursor="link"
              onClick={onClose}
              className="label absolute top-4 right-5 z-20 text-bone/70 transition-colors duration-200 hover:text-blood"
            >
              Закрыть ✕
            </button>

            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-gold/40">
              <Image
                src={item.cover}
                alt={`${item.title} — обложка кейса`}
                fill
                unoptimized={item.cover.endsWith('.svg')}
                sizes="(max-width: 880px) 100vw, 880px"
                className="object-cover"
              />
            </div>

            <div className="px-6 py-8 md:px-12 md:py-12">
              <span className="label text-blood">N° {item.num}</span>
              <h2 className="mt-3 font-antiqua text-4xl leading-[1.05] md:text-6xl">{item.title}</h2>
              <p className="mt-3 font-antiqua text-xl text-bone/65 italic md:text-2xl">
                {item.subtitle}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-gold/30 py-5 md:grid-cols-4">
                {[
                  ['Клиент', item.client],
                  ['Год', item.year],
                  ['Роль', item.role],
                  ['Направление', item.category],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="label text-bone/40">{k}</dt>
                    <dd className="mt-1 text-[15px] leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 font-antiqua text-2xl leading-snug md:text-[28px]">{item.summary}</p>

              <div className="mt-10 space-y-8">
                {blocks.map((b) => (
                  <section key={b.title}>
                    <h3 className="label text-blood">{b.title}</h3>
                    <p className="mt-2 max-w-[62ch] text-bone/85">{b.body}</p>
                  </section>
                ))}
              </div>

              {item.services.length > 0 && (
                <div className="mt-10">
                  <h3 className="label text-bone/40">Услуги</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {item.services.map((s) => (
                      <li
                        key={s}
                        className="border border-gold/40 px-3 py-1.5 text-[13px] text-bone/75"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
