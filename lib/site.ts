/* Общие данные сайта. Правится вручную. */

export const SITE = {
  name: 'N9TTA',
  url: 'https://n9tta.art',
  role: 'Арт-директор',
  heroSubtitle: 'VISUAL DESIGN — BRANDING — N° 93',
  marquee: 'ART DIRECTION ✦ BRANDING ✦ VISUAL SYSTEMS ✦ ',
  ringText: 'VISUAL DESIGN ✦ ART DIRECTION ✦ BRANDING ✦ ',
  footerNote: 'MADE WITH INK & BLOOD',
  copyrightYear: '2026',
} as const;

export const CONTACTS = {
  email: 'hello@n9tta.com',
  telegram: '@n9tta',
  telegramUrl: 'https://t.me/n9tta',
  location: 'Москва / удалённо',
} as const;

/* Перенесено из intro.lead старого сайта. */
export const ABOUT = {
  heading: 'Обо мне',
  caption: 'Портрет — процедурная гравюра, заменяется на финальный снимок',
  lead: 'Арт-директор с 5-летним опытом в креативной индустрии. Гуманитарная база — социология и обществоведение.',
  paragraphs: [
    'Работал со стритвир-сценой Беларуси, крупными стримерами, музыкальными проектами и брендами. Меня интересует дизайн как инструмент влияния на мнение, эмоции, поведение и восприятие.',
    'Визуал — это поверхность. Под ней стратегия, позиционирование, поведение аудитории, доверие и контекст. Поэтому работа начинается с концепции, а не с подбора референсов.',
  ],
  stats: [
    { value: '5', label: 'лет в индустрии' },
    { value: '6', label: 'кейсов в архиве' },
    { value: '3', label: 'дисциплины' },
  ],
} as const;
