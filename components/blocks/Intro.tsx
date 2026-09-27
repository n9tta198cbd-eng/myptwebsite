import type { IntroBlock } from '@/content/types';
import Actions from '../ui/Actions';
import GlyphField from '../ui/GlyphField';
import type { BlockProps } from './props';

/* Знакомство. Огромный вордмарк, сдвинутый влево и срезанный краем,
   справа — поле символов; ниже текст сдвинут в правую часть сетки. */
export default function Intro({ block, id }: BlockProps<IntroBlock>) {
  return (
    <section id={id} className="relative overflow-hidden px-4 pt-24 pb-16 md:px-8 md:pt-28 md:pb-24">
      <GlyphField seed={93} count={28} className="bottom-[40%] left-[45%]" />

      <h1 className="display relative -ml-[0.04em] text-mega leading-[0.8]">{block.title}</h1>
      <p className="label relative mt-4 md:mt-6">{block.name}</p>

      <div className="relative mt-16 grid gap-10 md:mt-28 md:grid-cols-12">
        <p className="display text-big md:col-span-8 md:col-start-5">{block.lead}</p>

        {block.text && (
          <div className="space-y-5 text-lg md:col-span-5 md:col-start-5">
            {block.text.map((t) => (
              <p key={t.slice(0, 32)}>{t}</p>
            ))}
          </div>
        )}

        {block.facts && (
          <dl className="grid gap-4 self-start md:col-span-3 md:col-start-10">
            {block.facts.map((f) => (
              <div key={f.k} className="border-t border-ink pt-2">
                <dt className="label text-ash">{f.k}</dt>
                <dd className="mt-1 leading-snug">{f.v}</dd>
              </div>
            ))}
          </dl>
        )}

        <Actions items={block.actions} className="md:col-span-8 md:col-start-5" />
      </div>
    </section>
  );
}
