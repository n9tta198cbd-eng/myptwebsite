import type { PainBlock } from '@/content/types';
import Section from './Section';

/* Боль → ответ. Заказчик должен узнать себя в левой колонке раньше,
   чем прочитает хоть слово обо мне. */
export default function Pain({ block, id, label }: { block: PainBlock; id: string; label: string }) {
  return (
    <Section id={id} label={label} heading={block.heading}>
      <ul className="mx-auto max-w-[1100px] divide-y divide-gold/25 border-y border-gold/30">
        {block.items.map((item) => (
          <li key={item.pain} className="grid gap-4 py-8 md:grid-cols-2 md:gap-12">
            <p className="font-antiqua text-2xl leading-snug text-bone/60 italic md:text-[28px]">
              «{item.pain}»
            </p>
            <p className="text-bone/90 md:pt-1.5">
              <span className="text-blood">→ </span>
              {item.answer}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
