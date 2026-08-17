/* Зерно на весь сайт: SVG feTurbulence, opacity 0.06, multiply.
   Сдвиг кадров ~8 fps даёт эффект старой плёнки (см. globals.css). */
export default function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden opacity-[0.06] mix-blend-multiply"
      aria-hidden="true"
    >
      <svg className="grain-layer absolute -inset-[6%] h-[112%] w-[112%]">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
