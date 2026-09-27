import type { Metadata } from 'next';
import { Dela_Gothic_One, IBM_Plex_Mono, Spectral } from 'next/font/google';
import './globals.css';

import { PROFILE } from '@/content/profile';

/* Плакатный гротеск с кириллицей — заголовки и крупный набор. */
const dela = Dela_Gothic_One({
  weight: '400',
  subsets: ['latin', 'cyrillic'],
  variable: '--font-dela',
  display: 'swap',
});

/* Книжная антиква — тексты и цитаты. */
const spectral = Spectral({
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-spectral',
  display: 'swap',
});

/* Маргиналии, нумерация, символы. */
const plexMono = IBM_Plex_Mono({
  weight: ['400'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-plex-mono',
  display: 'swap',
});

/* Общие метаданные. Заголовок и описание каждая страница задаёт сама в content/. */
export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.url),
  keywords: ['арт-директор', 'брендинг', 'дизайн', 'айдентика', 'арт-дирекшн', 'N9TTA', 'Матвей Новик'],
  openGraph: { type: 'website', locale: 'ru_RU', siteName: PROFILE.name },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${dela.variable} ${spectral.variable} ${plexMono.variable}`}>
      <body>
        {/* меню, блоки и футер собирает PageRenderer из конфига страницы */}
        {children}
      </body>
    </html>
  );
}
