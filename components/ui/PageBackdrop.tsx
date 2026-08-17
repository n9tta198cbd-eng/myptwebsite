/* Фон страницы: фиксированный слой под контентом.
   Отдельный слой, а не background-attachment: fixed на body — на iOS
   этот режим работает нестабильно, фиксированный элемент одинаков везде.
   Узким экранам отдаётся лёгкий вариант (53 КБ вместо 301 КБ). */
export default function PageBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 bg-[url('/assets/bg-page-sm.webp')] bg-cover bg-top bg-no-repeat md:bg-[url('/assets/bg-page.webp')]"
      aria-hidden="true"
    />
  );
}
