'use client';

import type { ServicesBlock } from '@/content/types';
import { useUI } from '../page/PageContext';
import Section from './Section';
import type { BlockProps } from './props';

/* Форматы работы. Первый — флагман: чёрная плашка на всю ширину, остальные — колонками. */
export default function Services({ block, id, label, index }: BlockProps<ServicesBlock>) {
  const ui = useUI();

  return (
    <Section id={id} index={index} label={label} heading={block.heading} lead={block.lead}>
      <ul className="grid gap-6 md:grid-cols-2">
        {block.items.map((item, i) => (
          <li
            key={item.title}
            className={`flex flex-col border-2 border-ink p-6 md:p-8 ${i === 0 ? 'bg-ink text-paper md:col-span-2' : ''}`}
          >
            <h3 className={`display ${i === 0 ? 'text-3xl md:text-6xl' : 'text-2xl md:text-3xl'}`}>{item.title}</h3>
            <p className="mt-4 max-w-[48ch] text-lg">{item.text}</p>
            {item.includes && (
              <ul className="label mt-6 flex flex-1 flex-wrap content-start gap-2">
                {item.includes.map((inc) => (
                  <li key={inc} className={`border px-2 py-1 ${i === 0 ? 'border-paper/60' : 'border-ink'}`}>
                    {inc}
                  </li>
                ))}
              </ul>
            )}
            {(item.price || item.term) && (
              <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 border-t-2 border-current pt-4">
                {item.price && <span className="display text-2xl">{item.price}</span>}
                {item.term && (
                  <span className="label">
                    {ui.term}: {item.term}
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {block.note && <p className="label mt-8 max-w-[60ch] text-ash">{block.note}</p>}
    </Section>
  );
}
