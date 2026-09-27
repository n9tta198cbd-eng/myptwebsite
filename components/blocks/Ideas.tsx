import type { IdeasBlock } from '@/content/types';
import Actions from '../ui/Actions';
import Section from './Section';

/* Открытые идеи: проекты, под которые ищу соавторов. Даёт творцу
   конкретный повод написать, а не абстрактное «давай что-нибудь сделаем». */
export default function Ideas({
  block,
  id,
  label,
}: {
  block: IdeasBlock;
  id: string;
  label: string;
}) {
  return (
    <Section id={id} label={label} heading={block.heading} lead={block.lead}>
      <ul className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-2 xl:grid-cols-3">
        {block.items.map((item) => (
          <li key={item.title} className="flex flex-col border border-gold/40 bg-charcoal/60 p-6">
            {item.status && <span className="label text-blood">{item.status}</span>}
            <h3 className="mt-3 font-antiqua text-3xl leading-[1.05]">{item.title}</h3>
            <p className="mt-4 flex-1 text-bone/80">{item.text}</p>
            {item.need && (
              <p className="mt-6 border-t border-gold/25 pt-4 text-[15px] text-bone/65">
                <span className="text-gold">✦ </span>
                {item.need}
              </p>
            )}
          </li>
        ))}
      </ul>
      {block.action && <Actions items={[block.action]} className="mt-12 justify-center" />}
    </Section>
  );
}
