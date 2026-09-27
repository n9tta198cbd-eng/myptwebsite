'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { UI_STRINGS, type UI } from '@/content/ui';
import type { Lang } from '@/content/types';

const PageContext = createContext<Lang>('ru');

/* Язык текущей страницы — для служебных надписей в клиентских компонентах. */
export function PageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <PageContext.Provider value={lang}>{children}</PageContext.Provider>;
}

export const useUI = (): UI => UI_STRINGS[useContext(PageContext)];
