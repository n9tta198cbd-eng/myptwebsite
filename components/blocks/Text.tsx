import type { TextBlock } from '@/content/types';
import Section from './Section';
import type { BlockProps } from './props';

/* Свободный текст. */
export default function Text({ block, id, label, index }: BlockProps<TextBlock>) {
  return (
    <Section id={id} index={index} label={label} heading={block.heading}>
      <div className="max-w-[60ch] space-y-5 text-lg">
        {block.paragraphs.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
