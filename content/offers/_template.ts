import { LINKS, PERSONA } from '../profile';
import { definePage } from '../types';

/* ШАБЛОН коммерческой страницы. Здесь есть все 16 блоков — копируй файл,
   удаляй лишнее, переставляй остальное. Живой просмотр при `npm run dev`:
   http://localhost:3000/for/_template

   Перед тем как писать тексты, ответь себе на три вопроса про архетип:
   1. Какими словами он сам описывает свою проблему? → hero.title и pain
   2. Чего он боится, когда нанимает дизайнера?      → process и faq
   3. Кому он уже доверяет?                           → proof и works */

export default definePage({
  slug: '_template',
  lang: 'ru',
  title: 'Шаблон страницы — N9TTA',
  description: 'Витрина всех блоков конструктора.',

  sections: [
    {
      type: 'intro', // знакомство — первый экран главной
      title: 'N9TTA',
      name: 'Имя — роль — город',
      lead: 'Одна мысль о себе.',
      text: ['Абзац.'],
      facts: [{ k: 'Факт', v: 'Значение' }],
    },
    {
      type: 'hero',
      eyebrow: 'Для кого страница',
      title: 'Главная фраза словами заказчика',
      lead: 'Одно предложение: что он получит, работая с тобой.',
      actions: [
        { label: 'Главное действие', href: LINKS.telegram },
        { label: 'Второе действие', href: '#works' },
      ],
    },
    { type: 'marquee', text: 'БЕГУЩАЯ СТРОКА ✦ ЛАТИНИЦЕЙ КРАСИВЕЕ' },
    {
      type: 'pain',
      heading: 'Боль → ответ',
      items: [{ pain: 'Как заказчик формулирует проблему', answer: 'Как ты её решаешь и чем это доказано.' }],
    },
    {
      type: 'manifesto',
      heading: 'Манифест',
      statement: 'Главная фраза огромным кеглем',
      lines: ['Тезис строкой.', { title: 'Или с заголовком', text: 'И пояснением.' }],
      signature: '— Подпись',
    },
    {
      type: 'works',
      nav: 'Кейсы',
      heading: 'Кейсы',
      tags: ['branding'], // или cases: ['case-gazgolder', ...] — точный список и порядок
    },
    {
      type: 'collab',
      heading: 'Коллаборация',
      why: ['Зачем делать вместе.'],
      sides: [
        { title: 'Тебе', items: ['Пункт'] },
        { title: 'Мне', items: ['Пункт'] },
      ],
      terms: { title: 'Условия', items: ['Пункт'] },
    },
    {
      type: 'ideas',
      heading: 'Идеи',
      items: [{ status: 'Статус', title: 'Название', text: 'Описание', need: 'Кто нужен' }],
    },
    {
      type: 'services',
      nav: 'Услуги',
      heading: 'Услуги',
      items: [{ title: 'Пакет', text: 'Для кого', includes: ['Что входит'], price: 'от … ₽', term: '2 недели' }],
      note: 'Примечание под пакетами.',
    },
    {
      type: 'process',
      heading: 'Процесс',
      steps: [
        { title: 'Шаг', text: 'Что происходит', term: 'Срок' },
        { title: 'Шаг', text: 'Что происходит' },
      ],
    },
    { ...PERSONA.ru, heading: 'Почему я' },
    { type: 'stats', items: [{ value: '5', label: 'лет' }, { value: '6', label: 'кейсов' }] },
    {
      type: 'proof',
      heading: 'Доверие',
      names: ['Клиент', 'Клиент'],
      quotes: [{ text: 'Цитата клиента', name: 'Имя', role: 'Должность' }],
    },
    { type: 'faq', heading: 'Вопросы', items: [{ q: 'Вопрос-возражение?', a: 'Ответ.' }] },
    {
      type: 'cta',
      heading: 'Промежуточный призыв',
      text: 'Ставь после самого сильного блока.',
      actions: [{ label: 'Написать', href: LINKS.telegram }],
    },
    { type: 'text', heading: 'Свободный текст', paragraphs: ['Абзац.'] },
  ],

  contact: {
    label: 'Связаться',
    heading: 'Финальный призыв',
    text: 'Что написать в первом сообщении.',
  },
});
