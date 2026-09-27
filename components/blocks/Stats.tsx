import type { StatsBlock } from '@/content/types';
import { StatsRow } from './Persona';
import type { BlockProps } from './props';

/* Строка цифр без заголовка — пауза между блоками. */
export default function Stats({ block, id }: BlockProps<StatsBlock>) {
  return (
    <section id={id} className="border-t-2 border-ink px-4 py-12 md:px-8">
      <StatsRow items={block.items} className="md:ml-[25%]" />
    </section>
  );
}
