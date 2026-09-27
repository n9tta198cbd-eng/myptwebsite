import type { Metadata } from 'next';
import PageRenderer from '@/components/page/PageRenderer';
import home from '@/content/home';

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
  openGraph: { title: home.title, description: home.description },
};

export default function Home() {
  return <PageRenderer page={home} />;
}
