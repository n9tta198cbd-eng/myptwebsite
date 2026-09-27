import type { ProofBlock } from '@/content/types';
import { glyphAt } from '../ui/glyphs';
import Section from './Section';
import type { BlockProps } from './props';

/* Имена сплошным набором через символы и цитаты. */
export default function Proof({ block, id, label, index }: BlockProps<ProofBlock>) {
  return (
    <Section id={id} index={index} label={label} heading={block.heading}>
      {block.names && (
        <p className="display text-3xl leading-[1.15] md:text-5xl">
          {block.names.map((name, i) => (
            <span key={name}>
              {i > 0 && <span className="mx-3 font-mono text-signal">{glyphAt(i * 5)}</span>}
              {name}
            </span>
          ))}
        </p>
      )}
      {block.quotes && (
        <ul className="mt-14 grid gap-10 md:grid-cols-2">
          {block.quotes.map((q) => (
            <li key={q.name} className="border-l-4 border-signal pl-5">
              <blockquote className="text-2xl leading-snug italic">«{q.text}»</blockquote>
              <p className="label mt-4">
                {q.name}
                {q.role && <span className="text-ash"> — {q.role}</span>}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
