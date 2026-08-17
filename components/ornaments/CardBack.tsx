/* Оборот таро-карты: орнаментальная рамка и всевидящее око в круге.
   Полностью процедурный SVG — внешних изображений нет. */
const RAYS = Array.from({ length: 24 }, (_, i) => (i / 24) * Math.PI * 2);

export default function CardBack({ className = '' }: { className?: string }) {
  const cx = 100;
  const cy = 175;

  return (
    <svg
      viewBox="0 0 200 350"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="200" height="350" fill="var(--color-ink)" />

      {/* двойная рамка */}
      <rect x="7" y="7" width="186" height="336" stroke="var(--color-parchment)" strokeWidth="1.4" opacity="0.55" />
      <rect x="13" y="13" width="174" height="324" stroke="var(--color-gold)" strokeWidth="0.9" opacity="0.6" />

      {/* лучи от центра */}
      <g stroke="var(--color-parchment)" strokeWidth="0.6" opacity="0.32">
        {RAYS.map((a, i) => (
          <line
            key={i}
            x1={(cx + Math.cos(a) * 50).toFixed(1)}
            y1={(cy + Math.sin(a) * 50).toFixed(1)}
            x2={(cx + Math.cos(a) * 78).toFixed(1)}
            y2={(cy + Math.sin(a) * 78).toFixed(1)}
          />
        ))}
      </g>

      <circle cx={cx} cy={cy} r="50" stroke="var(--color-gold)" strokeWidth="1.1" opacity="0.85" />
      <circle cx={cx} cy={cy} r="44" stroke="var(--color-parchment)" strokeWidth="0.8" opacity="0.5" />

      {/* треугольник со всевидящим оком */}
      <path d={`M ${cx} ${cy - 30} L ${cx + 27} ${cy + 18} H ${cx - 27} Z`} stroke="var(--color-parchment)" strokeWidth="1.2" opacity="0.9" />
      <ellipse cx={cx} cy={cy + 2} rx="15" ry="8.5" stroke="var(--color-parchment)" strokeWidth="1.1" />
      <circle cx={cx} cy={cy + 2} r="4" fill="var(--color-blood)" />

      {/* флёроны сверху и снизу */}
      {[78, 272].map((y, i) => (
        <g key={y} stroke="var(--color-parchment)" strokeWidth="0.9" opacity="0.6" transform={i ? `translate(0 ${y}) scale(1 -1) translate(0 ${-y})` : undefined}>
          <path d={`M ${cx} ${y - 14} c 14 6 22 16 22 26 c -10 0 -18 -8 -22 -18`} />
          <path d={`M ${cx} ${y - 14} c -14 6 -22 16 -22 26 c 10 0 18 -8 22 -18`} />
          <path d={`M ${cx - 30} ${y + 16} h 60`} />
          <path d={`M ${cx} ${y - 18} v 10`} />
        </g>
      ))}

      {/* угловые ромбы */}
      {[
        [26, 26],
        [174, 26],
        [26, 324],
        [174, 324],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M ${x} ${y - 6} L ${x + 6} ${y} L ${x} ${y + 6} L ${x - 6} ${y} Z`}
          stroke="var(--color-gold)"
          strokeWidth="0.9"
          opacity="0.8"
        />
      ))}
    </svg>
  );
}
