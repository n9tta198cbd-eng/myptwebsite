import type { HeroBlock } from '@/content/types';
import Actions from '../ui/Actions';
import GlyphField from '../ui/GlyphField';
import type { BlockProps } from './props';

/* Первый экран коммерческой страницы: фраза на языке заказчика плакатным набором. */
export default function Hero({ block, id }: BlockProps<HeroBlock>) {
  return (
    <section id={id} className="relative overflow-hidden px-4 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24">
      <GlyphField seed={block.title.length * 31} count={22} className="left-[55%]" />

      <div className="relative grid gap-8 md:grid-cols-12">
        {block.eyebrow && (
          <p className="label md:col-span-3">
            <span className="text-signal">※ </span>
            {block.eyebrow}
          </p>
        )}
        <h1 className="display text-giant md:col-span-11 md:col-start-2">{block.title}</h1>
        {block.lead && (
          <p className="max-w-[46ch] text-xl leading-snug md:col-span-6 md:col-start-6 md:text-2xl">
            {block.lead}
          </p>
        )}
        <Actions items={block.actions} className="md:col-span-6 md:col-start-6" />
      </div>
    </section>
  );
}
