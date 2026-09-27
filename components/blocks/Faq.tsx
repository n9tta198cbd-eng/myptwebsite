import type { FaqBlock } from '@/content/types';
import Section from './Section';
import type { BlockProps } from './props';

/* Вопросы-возражения. Нативный <details> — без JS. */
export default function Faq({ block, id, label, index }: BlockProps<FaqBlock>) {
  return (
    <Section id={id} index={index} label={label} heading={block.heading}>
      <div className="border-b-2 border-ink">
        {block.items.map((item) => (
          <details key={item.q} className="group border-t-2 border-ink py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-xl leading-snug md:text-2xl [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="font-mono text-2xl text-signal transition-transform duration-200 group-open:rotate-45">
                ✚
              </span>
            </summary>
            <p className="mt-3 max-w-[60ch] text-lg md:ml-[15%]">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
