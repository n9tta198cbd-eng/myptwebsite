/* Флёр-де-лис — метка в углу карточки и разделитель в плашке. */
export default function Fleur({
  size = 14,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M12 2c-2.2 2.6-2.9 6-1.2 8.6" />
        <path d="M12 2c2.2 2.6 2.9 6 1.2 8.6" />
        <path d="M12 1.5v17" />
        <path d="M6.4 11.4c1.6-1.4 3.6-1.2 4.6.6" />
        <path d="M17.6 11.4c-1.6-1.4-3.6-1.2-4.6.6" />
        <path d="M7 15.2h10" />
        <path d="M9.4 18.6h5.2" />
      </g>
    </svg>
  );
}
