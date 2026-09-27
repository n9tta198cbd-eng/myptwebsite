import type { MarqueeBlock } from '@/content/types';
import { GLYPHS } from '../ui/glyphs';

const REPEATS = 4;

/* Лента: слова вперемешку с символами, чёрная полоса на всю ширину. */
export default function Marquee({ block }: { block: MarqueeBlock }) {
  const words = block.text.split(/\s*✦\s*/).filter(Boolean);
  const line = Array.from({ length: REPEATS }, (_, r) =>
    words.map((w, i) => (
      <span key={`${r}-${i}`} className="flex items-center gap-6 pr-6">
        <span>{w}</span>
        <span className="text-signal">{GLYPHS[(r * words.length + i) % GLYPHS.length]}</span>
      </span>
    )),
  );

  return (
    <div className="overflow-hidden border-t-2 border-ink bg-ink py-3 text-paper" aria-hidden="true">
      <div className="ribbon-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="display flex shrink-0 text-2xl whitespace-nowrap md:text-4xl">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
