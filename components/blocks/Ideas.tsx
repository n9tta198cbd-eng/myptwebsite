import type { IdeasBlock } from '@/content/types';
import Actions from '../ui/Actions';
import Section from './Section';
import type { BlockProps } from './props';

/* Открытые идеи — карточки разной высоты, сдвинутые по вертикали. */
export default function Ideas({ block, id, label, index }: BlockProps<IdeasBlock>) {
  return (
    <Section id={id} index={index} label={label} heading={block.heading} lead={block.lead}>
      <ul className="grid gap-6 md:grid-cols-3">
        {block.items.map((item, i) => (
          <li key={item.title} className={`border-2 border-ink p-5 ${i % 2 ? 'md:mt-16' : ''}`}>
            {item.status && <span className="label text-signal">{item.status}</span>}
            <h3 className="display mt-3 text-2xl md:text-3xl">{item.title}</h3>
            <p className="mt-3">{item.text}</p>
            {item.need && <p className="label mt-5 border-t border-ink pt-3">{item.need}</p>}
          </li>
        ))}
      </ul>
      {block.action && <Actions items={[block.action]} className="mt-12" />}
    </Section>
  );
}
