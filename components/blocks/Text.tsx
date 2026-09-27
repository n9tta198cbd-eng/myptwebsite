import type { TextBlock } from '@/content/types';
import Section from './Section';

/* Свободный текст — для всего, что не укладывается в другие блоки. */
export default function Text({ block, id, label }: { block: TextBlock; id: string; label: string }) {
  return (
    <Section id={id} label={label} heading={block.heading}>
      <div className="mx-auto max-w-[62ch] space-y-5 text-bone/85">
        {block.paragraphs.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
