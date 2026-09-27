import type { CtaBlock } from '@/content/types';
import Actions from '../ui/Actions';
import Section from './Section';

/* Промежуточный призыв. Ставится после самого сильного блока. */
export default function Cta({ block, id, label }: { block: CtaBlock; id: string; label: string }) {
  return (
    <Section id={id} label={label} heading={block.heading}>
      <div className="flex flex-col items-center text-center">
        {block.text && <p className="max-w-[56ch] text-bone/80">{block.text}</p>}
        <Actions items={block.actions} className="mt-8 justify-center" />
      </div>
    </Section>
  );
}
