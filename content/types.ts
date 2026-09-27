/* Типы конструктора. Страница = метаданные + упорядоченный список блоков.
   Порядок блоков в массиве sections = порядок на странице. */

/** Язык страницы. Новый язык: добавить сюда и в словарь content/ui.ts. */
export type Lang = 'ru' | 'en';

export type Link = { label: string; href: string };

type Base = {
  /** Якорь блока (#id). По умолчанию — тип блока. Задать, если два блока одного типа. */
  id?: string;
  /** Если задано — блок попадает в меню с этой подписью. */
  nav?: string;
  /** Подпись над заголовком. По умолчанию — «N° 02» по порядку блока. */
  label?: string;
  /** Скрыть блок, не удаляя его из конфига. */
  hidden?: boolean;
};

/** Первый экран. emblem — печать с кольцом и именем; statement — крупная фраза. */
export type HeroBlock = Base & {
  type: 'hero';
  variant?: 'emblem' | 'statement';
  /** Для emblem — имя блэклеттером (только латиница!). Для statement — главная фраза. */
  title: string;
  eyebrow?: string;
  lead?: string;
  /** Текст на вращающемся кольце (emblem). */
  ring?: string;
  actions?: Link[];
};

/** Бегущая строка-разделитель. */
export type MarqueeBlock = Base & { type: 'marquee'; text: string };

/** Манифест: во что я верю. Главный блок личности — крупные строки. */
export type ManifestoBlock = Base & {
  type: 'manifesto';
  heading?: string;
  lines: string[];
  signature?: string;
};

/** Кейсы картами таро. cases — id и порядок; tags — фильтр. Без обоих — все кейсы. */
export type WorksBlock = Base & {
  type: 'works';
  heading: string;
  lead?: string;
  cases?: string[];
  tags?: string[];
};

/** Кто я. Портрет, история, факты не из резюме, цифры. */
export type PersonaBlock = Base & {
  type: 'persona';
  heading: string;
  lead: string;
  paragraphs?: string[];
  portrait?: { src: string; alt: string; caption?: string };
  facts?: { k: string; v: string }[];
  stats?: { value: string; label: string }[];
  /** Портрет справа. */
  flip?: boolean;
};

/** Обмен для коллабы: что я приношу / кого ищу. */
export type ExchangeBlock = Base & {
  type: 'exchange';
  heading: string;
  give: { title: string; items: string[] };
  seek: { title: string; items: string[] };
};

/** Открытые идеи, под которые ищу соавторов. */
export type IdeasBlock = Base & {
  type: 'ideas';
  heading: string;
  lead?: string;
  items: { title: string; text: string; status?: string; need?: string }[];
  action?: Link;
};

/** Боль заказчика → мой ответ. Первый блок после hero на коммерческих страницах. */
export type PainBlock = Base & {
  type: 'pain';
  heading: string;
  items: { pain: string; answer: string }[];
};

/** Услуги / пакеты. */
export type ServicesBlock = Base & {
  type: 'services';
  heading: string;
  lead?: string;
  items: { title: string; text: string; includes?: string[]; price?: string; term?: string }[];
  note?: string;
};

/** Процесс по шагам. */
export type ProcessBlock = Base & {
  type: 'process';
  heading: string;
  steps: { title: string; text: string; term?: string }[];
};

/** Доказательства: имена, с кем работал, и цитаты. */
export type ProofBlock = Base & {
  type: 'proof';
  heading: string;
  names?: string[];
  quotes?: { text: string; name: string; role?: string }[];
};

export type StatsBlock = Base & { type: 'stats'; items: { value: string; label: string }[] };

export type FaqBlock = Base & { type: 'faq'; heading: string; items: { q: string; a: string }[] };

/** Промежуточный призыв посреди страницы. */
export type CtaBlock = Base & { type: 'cta'; heading: string; text?: string; actions: Link[] };

/** Свободный текст — для всего, что не влезло в остальные блоки. */
export type TextBlock = Base & { type: 'text'; heading?: string; paragraphs: string[] };

export type Block =
  | HeroBlock
  | MarqueeBlock
  | ManifestoBlock
  | WorksBlock
  | PersonaBlock
  | ExchangeBlock
  | IdeasBlock
  | PainBlock
  | ServicesBlock
  | ProcessBlock
  | ProofBlock
  | StatsBlock
  | FaqBlock
  | CtaBlock
  | TextBlock;

export type BlockType = Block['type'];

/** Финал страницы: контакты и вордмарк. */
export type Contact = {
  label: string;
  heading?: string;
  text?: string;
  /** Куда ведёт печать в меню и футере. По умолчанию — Telegram. */
  primary?: Link;
};

export type Page = {
  /** Адрес: '' — главная, иначе /for/<slug>. */
  slug: string;
  lang: Lang;
  title: string;
  description: string;
  /** Показывать поисковикам. Коммерческие страницы по умолчанию скрыты. */
  index?: boolean;
  sections: Block[];
  contact: Contact;
};

/** Обёртка ради автодополнения и проверки типов в файлах страниц. */
export const definePage = (page: Page) => page;
