import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageRenderer from '@/components/page/PageRenderer';
import { OFFERS, findOffer } from '@/content/offers';

/* Коммерческие страницы /for/<slug>. Все собираются статически;
   адреса, которых нет в content/offers/index.ts, отдают 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return OFFERS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = findOffer((await params).slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      locale: page.lang === 'ru' ? 'ru_RU' : 'en_US',
    },
    // страницы раздаются по прямой ссылке и в поиск не попадают, если не указано index: true
    robots: { index: page.index ?? false, follow: page.index ?? false },
  };
}

export default async function OfferPage({ params }: Props) {
  const page = findOffer((await params).slug);
  if (!page) notFound();
  return <PageRenderer page={page} />;
}
