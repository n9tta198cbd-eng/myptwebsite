import type { FaqBlock } from '@/content/types';
import Section from './Section';

/* Возражения в форме вопросов. Нативный <details> — без JS. */
export default function Faq({ block, id, label }: { block: FaqBlock; id: string; label: string }) {
  return (
    <Section id={id} label={label} heading={block.heading}>
      <div className="mx-auto max-w-[900px] divide-y divide-gold/25 border-y border-gold/30">
        {block.items.map((item) => (
          <details key={item.q} className="group py-5">
            <summary
              data-cursor="link"
              className="flex cursor-pointer list-none items-start justify-between gap-6 font-antiqua text-2xl leading-snug [&::-webkit-details-marker]:hidden"
            >
              {item.q}
              <span className="pt-1 font-mono text-base text-blood transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 max-w-[64ch] text-bone/80">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
