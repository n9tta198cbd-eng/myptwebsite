import type { CtaBlock } from '@/content/types';
import Actions from '../ui/Actions';
import Section from './Section';
import type { BlockProps } from './props';

/* Промежуточный призыв. */
export default function Cta({ block, id, label, index }: BlockProps<CtaBlock>) {
  return (
    <Section id={id} index={index} label={label} heading={block.heading}>
      {block.text && <p className="max-w-[48ch] text-xl">{block.text}</p>}
      <Actions items={block.actions} className="mt-8" />
    </Section>
  );
}
