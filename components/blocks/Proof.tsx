import type { ProofBlock } from '@/content/types';
import Section from './Section';

/* Доказательства: имена, с кем работал, и слова людей. */
export default function Proof({ block, id, label }: { block: ProofBlock; id: string; label: string }) {
  return (
    <Section id={id} label={label} heading={block.heading}>
      {block.names && (
        <ul className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {block.names.map((name, i) => (
            <li key={name} className="flex items-center gap-8 font-antiqua text-2xl text-bone/80 md:text-3xl">
              {i > 0 && <span aria-hidden="true" className="text-base text-gold">✦</span>}
              {name}
            </li>
          ))}
        </ul>
      )}
      {block.quotes && (
        <ul className="mx-auto mt-14 grid max-w-[1200px] gap-6 md:grid-cols-2">
          {block.quotes.map((q) => (
            <li key={q.name} className="border-l-2 border-blood pl-6">
              <blockquote className="font-antiqua text-2xl leading-snug italic">«{q.text}»</blockquote>
              <p className="label mt-4 text-bone/55">
                {q.name}
                {q.role && <span className="text-bone/35"> — {q.role}</span>}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
