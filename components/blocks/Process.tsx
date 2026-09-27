import type { ProcessBlock } from '@/content/types';
import Section from './Section';

/* Процесс по шагам: снимает страх «а что будет после того, как я напишу». */
export default function Process({
  block,
  id,
  label,
}: {
  block: ProcessBlock;
  id: string;
  label: string;
}) {
  return (
    <Section id={id} label={label} heading={block.heading}>
      <ol className="mx-auto grid max-w-[1200px] gap-px border border-gold/30 bg-gold/30 md:grid-cols-2 xl:grid-cols-4">
        {block.steps.map((step, i) => (
          <li key={step.title} className="flex flex-col bg-ink p-6 md:p-8">
            <span className="font-antiqua text-5xl text-blood">{['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][i] ?? i + 1}</span>
            <h3 className="mt-4 font-antiqua text-2xl leading-tight">{step.title}</h3>
            <p className="mt-3 flex-1 text-[15px] text-bone/75">{step.text}</p>
            {step.term && <span className="label mt-6 text-bone/45">{step.term}</span>}
          </li>
        ))}
      </ol>
    </Section>
  );
}
