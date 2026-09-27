import type { ProcessBlock } from '@/content/types';
import Section from './Section';
import type { BlockProps } from './props';

/* Процесс лестницей: каждый шаг сдвинут правее предыдущего. */
export default function Process({ block, id, label, index }: BlockProps<ProcessBlock>) {
  return (
    <Section id={id} index={index} label={label} heading={block.heading}>
      <ol className="space-y-8">
        {block.steps.map((step, i) => (
          <li
            key={step.title}
            className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-t-2 border-ink pt-4 md:grid-cols-[5rem_1fr]"
            style={{ marginLeft: `min(${i * 8}%, 30%)` }}
          >
            <span className="display text-4xl text-signal md:text-6xl">{i + 1}</span>
            <div>
              <h3 className="display text-2xl md:text-3xl">{step.title}</h3>
              <p className="mt-2 max-w-[52ch] text-lg">{step.text}</p>
              {step.term && <p className="label mt-3 text-ash">{step.term}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
