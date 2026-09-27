'use client';

import type { ServicesBlock } from '@/content/types';
import { useUI } from '../page/PageContext';
import Section from './Section';

/* Услуги-пакеты: что получаешь, сколько стоит, сколько длится. */
export default function Services({
  block,
  id,
  label,
}: {
  block: ServicesBlock;
  id: string;
  label: string;
}) {
  const ui = useUI();

  return (
    <Section id={id} label={label} heading={block.heading} lead={block.lead}>
      <ul className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-2 xl:grid-cols-3">
        {block.items.map((item) => (
          <li key={item.title} className="flex flex-col border border-gold/50 bg-charcoal/70 p-6 md:p-8">
            <h3 className="font-antiqua text-3xl leading-[1.05]">{item.title}</h3>
            <p className="mt-4 text-bone/80">{item.text}</p>
            {item.includes && (
              <>
                <h4 className="label mt-6 text-bone/40">{ui.includes}</h4>
                <ul className="mt-3 flex-1 space-y-1.5 text-[15px] text-bone/80">
                  {item.includes.map((inc) => (
                    <li key={inc}>
                      <span className="text-gold">✦ </span>
                      {inc}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {(item.price || item.term) && (
              <div className="mt-8 flex items-end justify-between gap-4 border-t border-gold/30 pt-4">
                {item.price && <span className="font-mono text-xl">{item.price}</span>}
                {item.term && (
                  <span className="label text-bone/50">
                    {ui.term}: {item.term}
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {block.note && (
        <p className="mx-auto mt-10 max-w-[62ch] text-center text-[15px] text-bone/55">{block.note}</p>
      )}
    </Section>
  );
}
