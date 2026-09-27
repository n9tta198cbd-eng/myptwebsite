import type { Lang } from './types';

/* Служебные надписи интерфейса. Тексты блоков лежат в самих страницах. */
const ru = {
  skip: 'К содержанию',
  write: 'Написать',
  open: 'Открыть',
  close: 'Закрыть',
  cover: 'обложка кейса',
  client: 'Клиент',
  year: 'Год',
  role: 'Роль',
  category: 'Направление',
  challenge: 'Вызов',
  approach: 'Подход',
  outcome: 'Результат',
  services: 'Услуги',
  includes: 'Входит',
  term: 'Срок',
  mail: 'Почта',
};

export type UI = typeof ru;

const en: UI = {
  skip: 'Skip to content',
  write: 'Write',
  open: 'Open',
  close: 'Close',
  cover: 'case cover',
  client: 'Client',
  year: 'Year',
  role: 'Role',
  category: 'Field',
  challenge: 'Challenge',
  approach: 'Approach',
  outcome: 'Outcome',
  services: 'Services',
  includes: 'Includes',
  term: 'Timeline',
  mail: 'Email',
};

export const UI_STRINGS: Record<Lang, UI> = { ru, en };
