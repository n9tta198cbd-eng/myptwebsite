/* Фон страницы в два слоя, оба фиксированные и под контентом.
   Отдельные слои, а не background-attachment: fixed на body — на iOS
   этот режим работает нестабильно, фиксированный элемент одинаков везде.

   Низ  — равномерный шум. Исходник равномерен по всей площади
          (разброс яркости по зонам 0.0), поэтому мостится тайлом
          512×512 в 37 КБ вместо картинки на несколько сотен килобайт,
          и покрывает страницу любой высоты без растяжения.
   Верх — орнаментальная рамка с прозрачной серединой: бордюр по
          периметру и две колонны вверху. Узким экранам отдаётся
          лёгкий вариант (146 КБ вместо 434 КБ). */
export default function PageBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-20 bg-[url('/assets/bg-noise.webp')] bg-repeat [background-size:512px_512px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[url('/assets/bg-frame-sm.webp')] bg-top bg-no-repeat bg-cover md:bg-[url('/assets/bg-frame.webp')]"
        aria-hidden="true"
      />
    </>
  );
}
