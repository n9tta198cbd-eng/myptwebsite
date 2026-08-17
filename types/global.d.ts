import type Lenis from 'lenis';

declare global {
  interface Window {
    /* Экземпляр Lenis, поднятый в SmoothScroll. Нужен модалке и анкорным ссылкам. */
    __lenis?: Lenis;
  }
}

export {};
