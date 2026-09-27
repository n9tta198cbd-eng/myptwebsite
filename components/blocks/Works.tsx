'use client';

import { useState } from 'react';
import type { Case } from '@/content/cases';
import type { WorksBlock } from '@/content/types';
import CaseModal from '../CaseModal';
import Section from './Section';
import type { BlockProps } from './props';

/* Кейсы — типографский указатель: номер, название плакатным набором, направление, год.
   Обложка всплывает при наведении; клик открывает кейс целиком.
   Список уже отобран и переведён на сервере (pickCases). */
export default function Works({ block, id, label, index, cases }: BlockProps<WorksBlock> & { cases: Case[] }) {
  const [active, setActive] = useState<Case | null>(null);

  return (
    <Section id={id} index={index} label={label} heading={block.heading} lead={block.lead}>
      <ul className="border-b-2 border-ink">
        {cases.map((item, i) => (
          <li key={item.id} className="border-t-2 border-ink">
            <button
              type="button"
              onClick={() => setActive(item)}
              className="group grid w-full grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-1 py-5 text-left transition-colors hover:bg-ink hover:text-paper md:grid-cols-[4rem_1fr_14rem_5rem] md:px-3"
            >
              <span className="font-mono text-sm text-signal">{item.num}</span>
              <span className={`display text-3xl md:text-5xl ${i % 2 ? 'md:pl-[12%]' : ''}`}>
                {item.title}
              </span>
              <span className="label col-start-2 md:col-start-auto">{item.tag}</span>
              <span className="label col-start-2 md:col-start-auto md:text-right">{item.year}</span>
            </button>
          </li>
        ))}
      </ul>

      <CaseModal item={active} onClose={() => setActive(null)} />
    </Section>
  );
}
