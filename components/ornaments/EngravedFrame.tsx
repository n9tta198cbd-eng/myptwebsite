import Corner from './Corner';

/* Гравюрная рамка по периметру блока. На мобильных (< 768px) остаётся
   только тонкая линия с уголками — по п. 7 ТЗ. */
export default function EngravedFrame({
  inset = 'inset-4 md:inset-8',
  cornerSize = 56,
}: {
  inset?: string;
  cornerSize?: number;
}) {
  return (
    <div className={`pointer-events-none absolute ${inset} z-0`} aria-hidden="true">
      <div className="absolute inset-0 border border-gold/40" />
      <div className="absolute inset-2 hidden border border-bone/12 md:block" />

      <Corner size={cornerSize} className="absolute -top-px -left-px text-gold" />
      <Corner size={cornerSize} className="absolute -top-px -right-px rotate-90 text-gold" />
      <Corner size={cornerSize} className="absolute -right-px -bottom-px rotate-180 text-gold" />
      <Corner size={cornerSize} className="absolute -bottom-px -left-px -rotate-90 text-gold" />
    </div>
  );
}
