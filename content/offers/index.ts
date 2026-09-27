import type { Page } from '../types';
import brand from './brand';
import music from './music';
import studio from './studio';
import template from './_template';

/* Коммерческие страницы: n9tta.art/for/<slug>.
   Новая страница: скопировать _template.ts, поменять slug и тексты, добавить сюда. */
export const OFFERS: Page[] = [
  brand,
  music,
  studio,
  // витрина всех блоков — только при локальной разработке: /for/_template
  ...(process.env.NODE_ENV === 'development' ? [template] : []),
];

export const findOffer = (slug: string) => OFFERS.find((p) => p.slug === slug);
