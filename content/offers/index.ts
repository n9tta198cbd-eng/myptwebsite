import type { Page } from '../types';
import culture from './culture';
import festival from './festival';
import gaming from './gaming';
import launch from './launch';
import media from './media';
import music from './music';
import product from './product';
import streetwear from './streetwear';
import tech from './tech';
import template from './_template';

/* Коммерческие страницы: n9tta.art/for/<slug>.
   Новая страница: скопировать _template.ts, поменять slug и тексты, добавить сюда.
   Общие куски (процесс, FAQ, «Почему N9TTA», контакты) — в shared.ts. */
export const OFFERS: Page[] = [
  launch, // стартапы перед запуском
  music, // артисты и лейблы
  streetwear,
  gaming,
  culture, // выставки, институции, книги
  tech, // IT-продукты
  festival,
  media,
  product, // независимые продуктовые бренды
  // витрина всех блоков — только при локальной разработке: /for/_template
  ...(process.env.NODE_ENV === 'development' ? [template] : []),
];

export const findOffer = (slug: string) => OFFERS.find((p) => p.slug === slug);
