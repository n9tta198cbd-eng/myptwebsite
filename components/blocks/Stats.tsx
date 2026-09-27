import type { StatsBlock } from '@/content/types';
import { StatsRow } from './Persona';

/* Отдельная строка цифр — без заголовка, как пауза между блоками. */
export default function Stats({ block, id }: { block: StatsBlock; id: string }) {
  return (
    <section id={id} className="px-5 py-16 md:px-10">
      <StatsRow items={block.items} className="mx-auto max-w-[1100px] text-center" />
    </section>
  );
}
