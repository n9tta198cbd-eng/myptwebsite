/* Центральная «печать» hero-блока: кольца, лучи, ромб-сигил.
   Полностью процедурная графика, без внешних изображений. */
const RAYS = Array.from({ length: 36 }, (_, i) => (i / 36) * Math.PI * 2);
const TEETH = Array.from({ length: 24 }, (_, i) => (i / 24) * Math.PI * 2);

export default function Emblem({ size = 220, className = '' }: { size?: number; className?: string }) {
  const c = 120;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx={c} cy={c} r="118" fill="var(--color-bone)" />

      <g stroke="var(--color-ink)" strokeWidth="0.8" opacity="0.35">
        {RAYS.map((a, i) => (
          <line
            key={i}
            x1={(c + Math.cos(a) * 74).toFixed(2)}
            y1={(c + Math.sin(a) * 74).toFixed(2)}
            x2={(c + Math.cos(a) * 104).toFixed(2)}
            y2={(c + Math.sin(a) * 104).toFixed(2)}
          />
        ))}
      </g>

      <circle cx={c} cy={c} r="118" stroke="var(--color-ink)" strokeWidth="1.6" />
      <circle cx={c} cy={c} r="104" stroke="var(--color-gold)" strokeWidth="1" opacity="0.8" />
      <circle cx={c} cy={c} r="74" stroke="var(--color-ink)" strokeWidth="1.2" />

      <g stroke="var(--color-ink)" strokeWidth="1.1" opacity="0.7">
        {TEETH.map((a, i) => (
          <line
            key={i}
            x1={(c + Math.cos(a) * 60).toFixed(2)}
            y1={(c + Math.sin(a) * 60).toFixed(2)}
            x2={(c + Math.cos(a) * 74).toFixed(2)}
            y2={(c + Math.sin(a) * 74).toFixed(2)}
          />
        ))}
      </g>

      {/* ромб-сигил */}
      <path
        d={`M ${c} 52 L 180 ${c} L ${c} 188 L 60 ${c} Z`}
        fill="var(--color-parchment)"
        stroke="var(--color-ink)"
        strokeWidth="1.4"
      />
      <circle cx={c} cy={c} r="34" stroke="var(--color-blood)" strokeWidth="1.4" />
      <path d={`M ${c} 86 L 154 ${c + 20} H 86 Z`} stroke="var(--color-ink)" strokeWidth="1.2" />
      <path d={`M ${c} 94 v 52 M 94 ${c} h 52`} stroke="var(--color-ink)" strokeWidth="1" opacity="0.65" />
      <circle cx={c} cy={c} r="5" fill="var(--color-blood)" />
    </svg>
  );
}
