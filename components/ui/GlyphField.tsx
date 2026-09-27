import { GLYPHS, rng } from './glyphs';

/* Россыпь символов разного кегля и поворота. Чистая декорация:
   aria-hidden, pointer-events-none, раскладка детерминирована по seed. */
export default function GlyphField({
  seed = 1,
  count = 24,
  className = '',
}: {
  seed?: number;
  count?: number;
  className?: string;
}) {
  const r = rng(seed);
  const items = Array.from({ length: count }, (_, i) => {
    const size = r() < 0.12 ? 5 + r() * 7 : 0.9 + r() * 2.6; // редкие гиганты среди мелочи
    return {
      i,
      ch: GLYPHS[Math.floor(r() * GLYPHS.length)],
      left: r() * 96,
      top: r() * 94,
      size,
      rot: Math.round((r() - 0.5) * 60),
      signal: r() < 0.22,
    };
  });

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}>
      {items.map((g) => (
        <span
          key={g.i}
          className={`absolute font-mono leading-none ${g.signal ? 'text-signal' : 'text-ink/80'}`}
          style={{
            left: `${g.left}%`,
            top: `${g.top}%`,
            fontSize: `${g.size.toFixed(2)}rem`,
            transform: `rotate(${g.rot}deg)`,
          }}
        >
          {g.ch}
        </span>
      ))}
    </div>
  );
}
