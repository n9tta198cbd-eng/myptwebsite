'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

/** Читается вне React — например при инициализации Lenis и GSAP. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* Media query как внешний источник состояния: useSyncExternalStore даёт
   корректное значение с первого клиентского рендера и не требует setState
   в эффекте. На сервере снапшот всегда false — тяжёлые эффекты включаются
   уже на клиенте, гидрация остаётся согласованной. */
function useMediaQuery(query: string): boolean {
  const mql = useMemo(
    () => (typeof window === 'undefined' ? null : window.matchMedia(query)),
    [query],
  );

  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!mql) return () => {};
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [mql],
  );

  return useSyncExternalStore(
    subscribe,
    () => (mql ? mql.matches : false),
    () => false,
  );
}

/** Точный указатель — мышь или трекпад. На тач-устройствах false. */
export function usePointerFine(): boolean {
  return useMediaQuery('(pointer: fine)');
}

export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** Ширина от 768px: ниже отключаем tilt, magnetic, scramble и кастомный курсор. */
export function useDesktopViewport(): boolean {
  return useMediaQuery('(min-width: 768px)');
}

/**
 * Все «дорогие» эффекты включены: широкий экран, точный указатель,
 * пользователь не просил уменьшить анимацию.
 */
export function useRichInteractions(): boolean {
  const fine = usePointerFine();
  const wide = useDesktopViewport();
  const reduced = useReducedMotion();
  return fine && wide && !reduced;
}
