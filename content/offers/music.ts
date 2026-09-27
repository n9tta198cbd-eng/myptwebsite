import { LINKS, PERSONA } from '../profile';
import { definePage } from '../types';

/* Архетип: музыкант, лейбл, менеджер артиста.
   Язык: образ, релиз, мерч, клипы, фанаты. Можно резче и эмоциональнее. */

export default definePage({
  slug: 'music',
  lang: 'ru',
  title: 'Визуал для артистов — N9TTA',
  description: 'Мерч, визуал релизов, AI-клипы и образ артиста.',

  sections: [
    {
      type: 'hero',
      variant: 'statement',
      eyebrow: 'Для артистов и лейблов',
      title: 'Музыку слушают ушами. Выбирают — глазами.',
      lead: 'Мерч, который носят не из вежливости. Визуал релиза, который досматривают. AI-клипы без бюджета студии.',
      actions: [
        { label: 'Обсудить релиз', href: LINKS.telegram },
        { label: 'Смотреть работы', href: '#works' },
      ],
    },

    { type: 'marquee', text: 'MERCH ✦ MUSIC VIDEO ✦ AI RELIGHT ✦ ARTIST IDENTITY' },

    { type: 'works', nav: 'Работы', heading: 'Сцена', tags: ['music', 'merch', 'video'] },

    {
      type: 'services',
      nav: 'Что делаю',
      heading: 'Что делаю',
      items: [
        {
          title: 'Мерч-коллекция',
          text: 'От концепции принтов до техэскизов для фабрики — как с «Тремя днями дождя».',
          includes: ['Концепции принтов', 'Подбор бланков', 'Техэскизы и ТЗ производству'],
          price: '[впиши] от … ₽',
        },
        {
          title: 'AI-визуал для клипа',
          text: 'Свой пайплайн релайта и генерации в 4K — 1000+ кадров для BabyCute / Gazgolder.',
          includes: ['Концепция визуала', 'Пайплайн под ваш материал', 'Генерация и сборка кадров'],
          price: '[впиши] от … ₽',
        },
        {
          title: 'Образ артиста',
          text: 'Айдентика, обложки, нейростилизация образов — как для Toxi$.',
          includes: ['Визуальная система артиста', 'Обложки релизов', 'Шаблоны для соцсетей'],
          price: '[впиши] от … ₽',
        },
      ],
    },

    { ...PERSONA.ru, nav: undefined, heading: 'Кто делает' },

    {
      type: 'proof',
      heading: 'Уже звучало',
      names: ['Gazgolder', 'BabyCute', 'Три дня дождя', 'Toxi$', 'Mellstroy'],
    },

    {
      type: 'cta',
      heading: 'Скоро релиз?',
      text: 'Чем раньше подключаюсь, тем цельнее выходит история: обложка, мерч и клип говорят одним языком.',
      actions: [{ label: 'Написать в Telegram', href: LINKS.telegram }],
    },
  ],

  contact: {
    label: 'Связаться',
    heading: 'Скинь трек — предложу образ',
    primary: { label: 'Написать', href: LINKS.telegram },
  },
});
