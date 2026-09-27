import type { ReactNode } from 'react';
import ScrambleHeading from '../ui/ScrambleHeading';
import { glyphAt } from '../ui/glyphs';

/* Общая оболочка блока. Асимметрия задаётся порядком: у чётных блоков
   поле с номером и символом слева, у нечётных — справа. Поэтому блоки можно
   переставлять как угодно, а страница всё равно «качается» из стороны в сторону. */
export default function Section({
  id,
  index,
  label,
  heading,
  lead,
  children,
}: {
  id: string;
  index: number;
  label?: string;
  heading?: string;
  lead?: string;
  children: ReactNode;
}) {
  const flip = index % 2 === 1;

  return (
    <section id={id} className="relative border-t-2 border-ink px-4 py-14 md:px-8 md:py-24">
      <div className="grid gap-x-8 gap-y-8 md:grid-cols-12">
        <aside
          className={`flex items-start justify-between md:col-span-3 md:flex-col md:justify-start md:gap-6 ${
            flip ? 'md:order-last md:items-end md:text-right' : ''
          }`}
        >
          {label && <span className="label">{label}</span>}
          <span aria-hidden="true" className="font-mono text-6xl leading-none text-signal md:text-[7rem]">
            {glyphAt(index * 7 + 3)}
          </span>
        </aside>

        <div className="min-w-0 md:col-span-9">
          {heading && (
            <ScrambleHeading text={heading} className="display text-giant" />
          )}
          {lead && (
            <p className="mt-6 max-w-[40ch] text-xl leading-snug italic md:text-2xl">{lead}</p>
          )}
          <div className={heading || lead ? 'mt-12 md:mt-16' : ''}>{children}</div>
        </div>
      </div>
    </section>
  );
}
