import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Mono, IBM_Plex_Sans, Pirata_One } from 'next/font/google';
import './globals.css';

import CustomCursor from '@/components/ui/CustomCursor';
import Footer from '@/components/Footer';
import GrainOverlay from '@/components/ui/GrainOverlay';
import Nav from '@/components/Nav';
import PageBackdrop from '@/components/ui/PageBackdrop';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import { SITE } from '@/lib/site';

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

const description =
  'Портфолио арт-директора и дизайнера N9TTA: брендинг, арт-дирекшн и социовизуальная инженерия. Архив визуальных систем.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} — ${SITE.role} и дизайнер`,
  description,
  keywords: ['арт-директор', 'брендинг', 'дизайн', 'айдентика', 'арт-дирекшн', 'N9TTA'],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role} и дизайнер`,
    description,
  },
  twitter: { card: 'summary_large_image', title: SITE.name, description },
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

        <a
          href="#works"
          className="label sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:border focus:border-gold focus:bg-charcoal focus:px-4 focus:py-2"
        >
          К работам
        </a>

        <PageBackdrop />
        <Preloader />
        <SmoothScroll />
        <GrainOverlay />
        <CustomCursor />

        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
