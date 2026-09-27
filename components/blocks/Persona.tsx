import Image from 'next/image';
import type { PersonaBlock } from '@/content/types';
import Section from './Section';
import type { BlockProps } from './props';

/* Кто я: портрет, сдвинутый вбок и наезжающий на текст, история, факты, цифры. */
export default function Persona({ block, id, label, index }: BlockProps<PersonaBlock>) {
  return (
    <Section id={id} index={index} label={label} heading={block.heading}>
      <div className="grid gap-10 md:grid-cols-9">
        <div className="md:col-span-5">
          <p className="text-2xl leading-snug md:text-3xl">{block.lead}</p>
          {block.paragraphs && (
            <div className="mt-6 space-y-5 text-lg">
              {block.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          )}
        </div>

        {block.portrait && (
          <figure className={`md:col-span-4 ${block.flip ? 'md:order-first' : ''}`}>
            <div className="relative aspect-4/5 w-full rotate-[-2deg] border-2 border-ink bg-ink/5">
              <Image
                src={block.portrait.src}
                alt={block.portrait.alt}
                fill
                unoptimized={block.portrait.src.endsWith('.svg')}
                sizes="(max-width: 767px) 90vw, 30vw"
                className="object-cover grayscale"
              />
            </div>
            {block.portrait.caption && <figcaption className="label mt-4 text-ash">{block.portrait.caption}</figcaption>}
          </figure>
        )}

        {block.facts && (
          <dl className="grid gap-x-8 gap-y-4 md:col-span-9 md:grid-cols-2">
            {block.facts.map((f) => (
              <div key={f.k} className="border-t-2 border-ink pt-2">
                <dt className="label text-signal">{f.k}</dt>
                <dd className="mt-1 text-lg leading-snug">{f.v}</dd>
              </div>
            ))}
          </dl>
        )}

        {block.stats && <StatsRow items={block.stats} className="md:col-span-9" />}
      </div>
    </Section>
  );
}

export function StatsRow({
  items,
  className = '',
}: {
  items: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <dl className={`grid grid-cols-2 gap-6 sm:grid-cols-3 ${className}`}>
      {items.map((s) => (
        <div key={s.label}>
          <dt className="display text-5xl md:text-7xl">{s.value}</dt>
          <dd className="label mt-2 text-ash">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
