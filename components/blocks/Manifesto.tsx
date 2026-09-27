import type { ManifestoBlock } from '@/content/types';
import Section from './Section';

/* Манифест: крупные строки-убеждения. Главный крючок личности —
   творец цепляется за взгляд, а не за список услуг. */
export default function Manifesto({
  block,
  id,
  label,
}: {
  block: ManifestoBlock;
  id: string;
  label: string;
}) {
  return (
    <Section id={id} label={label} heading={block.heading}>
      <ol className="mx-auto max-w-[1000px] space-y-10 md:space-y-14">
        {block.lines.map((line, i) => (
          <li key={line} className="grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[4rem_1fr]">
            <span className="label pt-3 text-blood tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            <p className="font-antiqua text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.12]">{line}</p>
          </li>
        ))}
      </ol>
      {block.signature && (
        <p className="mx-auto mt-14 max-w-[1000px] text-right font-antiqua text-2xl text-bone/60 italic">
          {block.signature}
        </p>
      )}
    </Section>
  );
}
