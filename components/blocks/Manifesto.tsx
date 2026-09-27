import type { ManifestoBlock } from '@/content/types';
import { glyphAt } from '../ui/glyphs';
import Section from './Section';
import type { BlockProps } from './props';

/* Манифест: главная фраза огромным кеглем, ниже тезисы лесенкой —
   каждый следующий сдвинут по сетке, чтобы колонка не выстраивалась в ровный список. */
const STEPS = ['md:col-start-1', 'md:col-start-3', 'md:col-start-2', 'md:col-start-4', 'md:col-start-1'];

export default function Manifesto({ block, id, label, index }: BlockProps<ManifestoBlock>) {
  return (
    <Section id={id} index={index} label={label} heading={block.heading}>
      {block.statement && (
        <p className="display mb-16 text-big text-signal md:mb-24">{block.statement}</p>
      )}

      <ol className="grid gap-12 md:grid-cols-9 md:gap-16">
        {block.lines.map((line, i) => {
          const item = typeof line === 'string' ? { title: '', text: line } : line;
          return (
            <li key={item.text.slice(0, 32)} className={`md:col-span-6 ${STEPS[i % STEPS.length]}`}>
              <span className="label flex items-center gap-3">
                <span className="text-2xl text-signal">{glyphAt(i * 3 + 1)}</span>
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.title && <h3 className="display mt-3 text-2xl md:text-4xl">{item.title}</h3>}
              <p className={`mt-3 ${item.title ? 'text-lg' : 'text-2xl leading-snug md:text-3xl'}`}>{item.text}</p>
            </li>
          );
        })}
      </ol>

      {block.signature && <p className="label mt-16 text-right">{block.signature}</p>}
    </Section>
  );
}
