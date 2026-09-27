import type { Lang, PersonaBlock } from './types';

/* Ядро личности — одно на все страницы. Меняешь здесь, меняется везде.
   Места, которые ждут твоего текста, помечены «[впиши]» — ищи по файлам. */

export const PROFILE = {
  /** Вордмарк. Набирается блэклеттером, поэтому только латиница. */
  name: 'N9TTA',
  /** Настоящее имя — в тексте и метаданных. */
  person: { ru: 'Матвей Новик', en: 'Matvey Novik' } satisfies Record<Lang, string>,
  url: 'https://n9tta.art',
  email: 'hello@n9tta.com',
  telegram: '@n9tta',
  telegramUrl: 'https://t.me/n9tta',
  location: { ru: 'Санкт-Петербург / удалённо', en: 'Saint Petersburg / remote' } satisfies Record<Lang, string>,
  footerNote: 'MADE WITH INK & BLOOD',
  year: '2026',
} as const;

export const LINKS = {
  telegram: PROFILE.telegramUrl,
  email: `mailto:${PROFILE.email}`,
} as const;

/* С кем работал. На сайте появляются только имена с cleared: true —
   после того как проверены разрешения, NDA и формулировка твоей роли.
   Отзывы и скриншоты — тоже только реальные и с согласия на публикацию. */
export const CLIENTS: { name: string; cleared: boolean }[] = [
  { name: 'Elysium Studio', cleared: true }, // твоя текущая роль
  { name: '32inches', cleared: true }, // твоя текущая роль
  { name: 'Сколково', cleared: false },
  { name: 'Mellstroy', cleared: false },
  { name: 'Gazgolder', cleared: false },
  { name: 'Три дня дождя', cleared: false },
  { name: 'Toxi$', cleared: false },
  { name: 'Глеб Костин', cleared: false },
];

/** Имена для блока proof: только проверенные клиенты плюс описания без имён. */
export const publicClients = (...extra: string[]) => [
  ...CLIENTS.filter((c) => c.cleared).map((c) => c.name),
  ...extra,
];

/* Блок «Кто я» на каждом языке. Страница может взять его целиком
   или переопределить отдельные поля: { ...PERSONA.ru, heading: 'Почему я' }. */
export const PERSONA: Record<Lang, PersonaBlock> = {
  ru: {
    type: 'persona',
    nav: 'About',
    heading: 'Кто стоит за N9TTA',
    lead: 'N9TTA — визуальный мир. За ним стоит Матвей Новик, арт-директор с гуманитарной базой: социология и обществоведение. Меня интересует сторона дизайна, где визуал становится инструментом влияния на мнение, эмоции, ценности и восприятие реальности.',
    paragraphs: [
      'Пять лет в креативной индустрии: стритвир-сцена Беларуси, крупные стримеры, музыкальные проекты, бренды. Работа начинается с глубокого ресерча — контекст, архивы, культурные слои и скрытая логика проекта. Только потом форма.',
      'Сейчас арт-директор Elysium Studio и бренда 32inches. Параллельно строю собственные AI-пайплайны: если рутину можно автоматизировать, я её автоматизирую.',
      '[впиши] Личное: откуда ты, что тебя сформировало, почему именно эта эстетика. Две-три фразы о человеке, а не о специалисте.',
    ],
    portrait: {
      src: '/assets/portrait.svg',
      alt: 'Портрет',
      caption: 'Портрет — процедурная гравюра, заменяется на финальный снимок',
    },
    facts: [
      { k: 'Одержим', v: 'Спекулятивные и эзотерические концепции, механизмы убеждения, когнитивная нейронаука' },
      { k: 'Метод', v: 'Ресерч до дна: история дизайна иконок с 1980 года, архив Valve ради одного маскота' },
      { k: 'Инструменты', v: 'Figma, Blender, TouchDesigner, After Effects, свои AI-пайплайны' },
      { k: 'Не делаю', v: '[впиши] то, от чего отказываешься принципиально' },
    ],
    stats: [
      { value: '5', label: 'лет в индустрии' },
      { value: '6', label: 'кейсов в архиве' },
      { value: '1000+', label: 'AI-кадров в клипах' },
    ],
  },
  en: {
    type: 'persona',
    nav: 'About',
    heading: 'Who is behind N9TTA',
    lead: 'N9TTA is a visual world. Behind it is Matvey Novik, an art director trained in sociology. I care about the side of design where visuals shape opinion, emotion, values and the way people read reality.',
    paragraphs: [
      'Five years in the creative industry: the Belarusian streetwear scene, major streamers, music projects, brands. Every project starts with deep research into context, archives and cultural layers. Form comes after.',
      'Currently art director of Elysium Studio and the 32inches brand. I also build my own AI pipelines: if routine can be automated, I automate it.',
    ],
    portrait: { src: '/assets/portrait.svg', alt: 'Portrait' },
    facts: [
      { k: 'Obsessed with', v: 'Speculative and esoteric concepts, persuasion, cognitive neuroscience' },
      { k: 'Method', v: 'Research to the bottom: the full history of icon design since 1980, the Valve archive for a single mascot' },
      { k: 'Tools', v: 'Figma, Blender, TouchDesigner, After Effects, custom AI pipelines' },
    ],
    stats: [
      { value: '5', label: 'years in the industry' },
      { value: '6', label: 'cases in the archive' },
      { value: '1000+', label: 'AI frames in music videos' },
    ],
  },
};
