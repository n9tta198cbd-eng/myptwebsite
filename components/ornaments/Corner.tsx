/* Геральдический уголок с флёр-де-лис. Ориентация — через rotate у родителя. */
export default function Corner({
  size = 64,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M1 64V10C1 5 5 1 10 1h54" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 58V17c0-3.4 2.8-6 6-6h42"
        stroke="var(--color-gold)"
        strokeWidth="1"
        opacity="0.75"
      />
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M20 20c-3.4 2.8-4.6 7-2.6 10.4" />
        <path d="M20 20c2.8 3.4 3.4 7.6 1 10.8" />
        <path d="M20 19v14" />
        <path d="M14.5 32h11" />
      </g>
    </svg>
  );
}
