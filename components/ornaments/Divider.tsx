/* Орнаментальный разделитель-флёрон. Пути рисуются через DrawnOrnament
   (stroke-dashoffset по ScrollTrigger), поэтому у линий один общий класс. */
export default function Divider({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 40"
      fill="none"
      aria-hidden="true"
      className={`h-8 w-full max-w-[600px] text-ink ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        className="ornament-stroke"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M0 20h210" />
        <path d="M390 20h210" />
        <path d="M232 20c14-11 30-11 44 0-14 11-30 11-44 0Z" />
        <path d="M368 20c-14-11-30-11-44 0 14 11 30 11 44 0Z" />
        <path d="M300 6l9 14-9 14-9-14 9-14Z" />
        <path d="M276 20h15M309 20h15" />
      </g>
      <circle cx="300" cy="20" r="2.6" fill="var(--color-blood)" />
    </svg>
  );
}
