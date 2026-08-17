/* Процедурный фон: чёрный с зерном, без единого килобайта картинок.

   color-interpolation-filters="sRGB" здесь обязателен. По умолчанию
   SVG-фильтры считают в linearRGB, и та же формула даёт среднюю
   яркость 90 из 255 вместо 25 — фон выходит серым вместо чёрного.

   Шум не подмешивается прозрачностью, а сразу рисуется в тёмном
   диапазоне: feComponentTransfer сжимает выход feTurbulence в 0–0.20.
   Замерено: средняя 24.9, разброс 8–41 — присланная текстура давала
   среднюю 21.7, чистый фон ink даёт 13.

   Слой фиксирован к окну (шум равномерный, привязывать его к странице
   незачем) и лежит под контентом. */
export default function PageNoise() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-ink" aria-hidden="true">
      <svg className="size-full">
        <filter id="page-noise-filter" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.20" intercept="0" />
            <feFuncG type="linear" slope="0.20" intercept="0" />
            <feFuncB type="linear" slope="0.184" intercept="0" />
            <feFuncA type="linear" slope="0" intercept="1" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#page-noise-filter)" />
      </svg>
    </div>
  );
}
