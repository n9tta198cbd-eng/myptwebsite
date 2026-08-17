'use client';

import MagneticButton from './MagneticButton';

/* Кнопка-«восковая печать»: круглая, --blood, с рельефом.
   Магнитная, с состоянием курсора data-cursor="seal". */
export default function SealButton({
  href,
  label,
  size = 56,
  className = '',
}: {
  href: string;
  label: string;
  size?: number;
  className?: string;
}) {
  return (
    <MagneticButton className={className}>
      <a
        href={href}
        data-cursor="seal"
        aria-label={label}
        title={label}
        style={{ width: size, height: size }}
        className="group relative grid place-items-center rounded-full bg-blood text-parchment shadow-[inset_0_2px_3px_rgba(255,255,255,0.28),inset_0_-3px_5px_rgba(0,0,0,0.42),0_3px_10px_rgba(22,19,14,0.35)] transition-transform duration-300 hover:scale-[1.06]"
      >
        {/* рельефный оттиск */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
          className="size-[62%] opacity-90"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="3 2.4"
            opacity="0.7"
          />
          <path d="M24 8 L38 32 H10 Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M24 15v18M15 26h18" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
          <circle cx="24" cy="24" r="3" fill="currentColor" />
        </svg>

        {/* тонкое кольцо, проявляется на hover */}
        <span className="pointer-events-none absolute inset-[-6px] rounded-full border border-blood/0 transition-colors duration-300 group-hover:border-blood/45" />
      </a>
    </MagneticButton>
  );
}
