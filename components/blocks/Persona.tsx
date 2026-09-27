import Image from 'next/image';
import Corner from '../ornaments/Corner';
import Divider from '../ornaments/Divider';
import DrawnOrnament from '../ui/DrawnOrnament';
import ScrambleHeading from '../ui/ScrambleHeading';
import type { PersonaBlock } from '@/content/types';

/* Кто я: портрет в гравюрной рамке, история, факты не из резюме, цифры. */
export default function Persona({
  block,
  id,
  label,
}: {
  block: PersonaBlock;
  id: string;
  label: string;
}) {
  return (
    <section id={id} className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <DrawnOrnament className="flex justify-center">
          <Divider />
        </DrawnOrnament>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          {block.portrait && (
            <figure className={`mx-auto w-full max-w-[440px] ${block.flip ? 'lg:order-2' : ''}`}>
              <div className="relative aspect-4/5 border border-gold/60 bg-charcoal">
                <div className="absolute inset-2 border border-bone/15" />
                <Image
                  src={block.portrait.src}
                  alt={block.portrait.alt}
                  fill
                  unoptimized={block.portrait.src.endsWith('.svg')}
                  sizes="(max-width: 1023px) 90vw, 440px"
                  className="object-cover p-3"
                />
                <Corner size={38} className="absolute top-0 left-0 text-gold" />
                <Corner size={38} className="absolute top-0 right-0 rotate-90 text-gold" />
                <Corner size={38} className="absolute right-0 bottom-0 rotate-180 text-gold" />
                <Corner size={38} className="absolute bottom-0 left-0 -rotate-90 text-gold" />
              </div>
              {block.portrait.caption && (
                <figcaption className="mt-4 font-antiqua text-lg text-bone/60 italic">
                  {block.portrait.caption}
                </figcaption>
              )}
            </figure>
          )}

          <div>
            <span className="label text-blood">{label}</span>
            <ScrambleHeading
              text={block.heading}
              className="mt-3 font-antiqua text-section leading-[0.95]"
            />

            <p className="mt-8 font-antiqua text-2xl leading-snug md:text-[30px]">{block.lead}</p>

            {block.paragraphs && (
              <div className="mt-6 max-w-[62ch] space-y-5 text-bone/85">
                {block.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            )}

            {block.facts && (
              <dl className="mt-10 divide-y divide-gold/20 border-y border-gold/30">
                {block.facts.map((f) => (
                  <div key={f.k} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="label pt-1 text-bone/45">{f.k}</dt>
                    <dd className="text-[15px] leading-snug">{f.v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {block.stats && <StatsRow items={block.stats} className="mt-10" />}
          </div>
        </div>
      </div>
    </section>
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
    <dl
      className={`grid grid-cols-2 gap-6 border-t border-gold/30 pt-6 sm:grid-cols-3 ${className}`}
    >
      {items.map((s) => (
        <div key={s.label}>
          <dt className="font-mono text-4xl leading-none tabular-nums md:text-5xl">{s.value}</dt>
          <dd className="label mt-2 text-bone/45">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
