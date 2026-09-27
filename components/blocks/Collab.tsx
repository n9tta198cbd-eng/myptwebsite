import type { CollabBlock } from '@/content/types';
import Section from './Section';
import type { BlockProps } from './props';

/* Коллаборации: зачем — крупным текстом, что получает каждый — две колонки
   разной ширины, условия — чёрная плашка. */
export default function Collab({ block, id, label, index }: BlockProps<CollabBlock>) {
  return (
    <Section id={id} index={index} label={label} heading={block.heading}>
      <div className="max-w-[44ch] space-y-5 text-xl leading-snug md:text-2xl">
        {block.why.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-9">
        {block.sides.map((side, i) => (
          <div key={side.title} className={i === 0 ? 'md:col-span-5' : 'md:col-span-4 md:mt-24'}>
            <h3 className="display text-3xl md:text-5xl">
              <span className="text-signal">{i === 0 ? '→ ' : '← '}</span>
              {side.title}
            </h3>
            <ul className="mt-6 divide-y divide-ink/25 border-y-2 border-ink">
              {side.items.map((it) => (
                <li key={it} className="py-3 text-lg leading-snug">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {block.terms && (
        <div className="mt-16 bg-ink p-6 text-paper md:-mr-8 md:ml-[20%] md:p-10">
          <h3 className="label text-signal">{block.terms.title}</h3>
          <ol className="mt-5 space-y-3">
            {block.terms.items.map((t, i) => (
              <li key={t} className="grid grid-cols-[2.5rem_1fr] text-lg leading-snug">
                <span className="font-mono text-signal">{String(i + 1).padStart(2, '0')}</span>
                {t}
              </li>
            ))}
          </ol>
        </div>
      )}
    </Section>
  );
}
