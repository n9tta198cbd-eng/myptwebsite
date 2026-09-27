import type { PainBlock } from '@/content/types';
import Section from './Section';
import type { BlockProps } from './props';

/* Боль → ответ. Слова заказчика зачёркнуты, ответ — со сдвигом вправо. */
export default function Pain({ block, id, label, index }: BlockProps<PainBlock>) {
  return (
    <Section id={id} index={index} label={label} heading={block.heading}>
      <ul className="space-y-12">
        {block.items.map((item) => (
          <li key={item.pain} className="grid gap-4 md:grid-cols-9">
            <p className="text-2xl leading-snug italic md:col-span-6 md:text-3xl">«{item.pain}»</p>
            <p className="text-lg md:col-span-5 md:col-start-5">
              <span className="font-mono text-signal">→ </span>
              {item.answer}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
