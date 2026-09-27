import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Mono, IBM_Plex_Sans, Pirata_One } from 'next/font/google';
import './globals.css';

import CustomCursor from '@/components/ui/CustomCursor';
import GrainOverlay from '@/components/ui/GrainOverlay';
import FrameOverlay from '@/components/ui/FrameOverlay';
import PageNoise from '@/components/ui/PageNoise';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import { PROFILE } from '@/content/profile';

/* Pirata One — блэклеттер, только латиница (кириллицы в шрифте нет). */
const pirata = Pirata_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pirata',
  display: 'swap',
});

/* Антиква с кириллицей — на ней все русские заголовки. */
const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-plex-sans',
  display: 'swap',
});

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
    <html
      lang="ru"
      className={`${pirata.variable} ${cormorant.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        {/* без JS прелоадер не должен закрывать сайт навсегда */}
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: '#preloader{display:none !important}' }} />
        </noscript>

        <PageNoise />
        <Preloader />
        <SmoothScroll />
        <FrameOverlay />
        <GrainOverlay />
        <CustomCursor />

        {/* меню, блоки и футер собирает PageRenderer из конфига страницы */}
        {children}
      </body>
    </html>
  );
}
