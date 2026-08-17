/* Оккультный сигил: кольцо, вписанный треугольник, луч-крест.
   Используется в прелоадере, курсоре и иконках соцсетей. */
export default function Sigil({
  size = 48,
  className = '',
  strokeWidth = 1.2,
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.6" />
      <path d="M24 4 L41 34 H7 Z" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M24 13v22M13 24h22" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.75" />
      <circle cx="24" cy="24" r="3.2" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}
