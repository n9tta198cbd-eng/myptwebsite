/* Орнаментальная рамка поверх контента: бордюр по периметру и две
   колонны вверху, середина прозрачная.

   Слой лежит НАД элементами дизайна (z-35 — выше навигации и секций),
   но ниже зерна, курсора, модалки и прелоадера: рамка не должна
   перекрывать открытый кейс и курсор.

   pointer-events: none — клики проходят насквозь.
   Узким экранам отдаётся лёгкий вариант, 146 КБ вместо 434 КБ. */
export default function FrameOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[35] bg-[url('/assets/bg-frame-sm.webp')] bg-top bg-no-repeat bg-cover md:bg-[url('/assets/bg-frame.webp')]"
      aria-hidden="true"
    />
  );
}
