import type { ExchangeBlock } from '@/content/types';
import Section from './Section';

/* Обмен для коллабы: что приношу я / кого ищу. Честная сделка между творцами. */
export default function Exchange({
  block,
  id,
  label,
}: {
  block: ExchangeBlock;
  id: string;
  label: string;
}) {
  return (
    <Section id={id} label={label} heading={block.heading}>
      <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-2">
        {[block.give, block.seek].map((col, i) => (
          <div key={col.title} className="border border-gold/40 bg-charcoal/60 p-6 md:p-10">
            <h3 className={`label ${i === 0 ? 'text-blood' : 'text-gold'}`}>{col.title}</h3>
            <ul className="mt-6 space-y-4">
              {col.items.map((item) => (
                <li key={item} className="flex gap-3 font-antiqua text-xl leading-snug md:text-2xl">
                  <span aria-hidden="true" className="text-gold">
                    {i === 0 ? '→' : '←'}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
