import type { ReactNode } from 'react';
import Cta from '../blocks/Cta';
import Collab from '../blocks/Collab';
import Intro from '../blocks/Intro';
import Faq from '../blocks/Faq';
import Hero from '../blocks/Hero';
import Ideas from '../blocks/Ideas';
import Manifesto from '../blocks/Manifesto';
import Marquee from '../blocks/Marquee';
import Pain from '../blocks/Pain';
import Persona from '../blocks/Persona';
import Process from '../blocks/Process';
import Proof from '../blocks/Proof';
import Services from '../blocks/Services';
import Stats from '../blocks/Stats';
import Text from '../blocks/Text';
import Works from '../blocks/Works';
import Footer from './Footer';
import Nav from './Nav';
import { PageProvider } from './PageContext';
import { pickCases } from '@/content/cases';
import { LINKS } from '@/content/profile';
import type { Block, Page } from '@/content/types';
import { UI_STRINGS } from '@/content/ui';

type Ctx = { id: string; label: string; index: number; page: Page };

/* в компоненты уходит только то, что им нужно, — без всего конфига страницы */
const p = ({ id, label, index }: Ctx) => ({ id, label, index });

/* Реестр: тип блока → компонент. Новый блок = тип в content/types.ts,
   компонент в components/blocks и одна строка здесь. */
const REGISTRY: { [T in Block['type']]: (b: Extract<Block, { type: T }>, c: Ctx) => ReactNode } = {
  intro: (b, c) => <Intro block={b} {...p(c)} />,
  hero: (b, c) => <Hero block={b} {...p(c)} />,
  marquee: (b) => <Marquee block={b} />,
  manifesto: (b, c) => <Manifesto block={b} {...p(c)} />,
  collab: (b, c) => <Collab block={b} {...p(c)} />,
  works: (b, c) => <Works block={b} {...p(c)} cases={pickCases(c.page.lang, b.cases, b.tags)} />,
  persona: (b, c) => <Persona block={b} {...p(c)} />,
  ideas: (b, c) => <Ideas block={b} {...p(c)} />,
  pain: (b, c) => <Pain block={b} {...p(c)} />,
  services: (b, c) => <Services block={b} {...p(c)} />,
  process: (b, c) => <Process block={b} {...p(c)} />,
  proof: (b, c) => <Proof block={b} {...p(c)} />,
  stats: (b, c) => <Stats block={b} {...p(c)} />,
  faq: (b, c) => <Faq block={b} {...p(c)} />,
  cta: (b, c) => <Cta block={b} {...p(c)} />,
  text: (b, c) => <Text block={b} {...p(c)} />,
};

function renderBlock(block: Block, ctx: Ctx) {
  const render = REGISTRY[block.type] as (b: Block, c: Ctx) => ReactNode;
  return render(block, ctx);
}

/* Собирает страницу из конфига: меню из блоков с nav, блоки по порядку, футер. */
export default function PageRenderer({ page }: { page: Page }) {
  const ui = UI_STRINGS[page.lang];
  const blocks = page.sections.filter((b) => !b.hidden);
  const idOf = (b: Block) => b.id ?? b.type;

  const nav = blocks.filter((b) => b.nav).map((b) => ({ href: `#${idOf(b)}`, label: b.nav! }));
  const primary = page.contact.primary ?? { label: ui.write, href: LINKS.telegram };

  // сквозная нумерация «N° 01…» только по блокам с заголовком
  const UNNUMBERED: Block['type'][] = ['intro', 'hero', 'marquee', 'stats'];
  const labels = blocks.map(
    (b, i) =>
      b.label ??
      `N° ${String(blocks.slice(0, i + 1).filter((x) => !UNNUMBERED.includes(x.type)).length).padStart(2, '0')}`,
  );

  return (
    <PageProvider lang={page.lang}>
      <div lang={page.lang}>
        <a
          href="#content"
          className="label sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:bg-ink focus:text-paper focus:px-4 focus:py-2"
        >
          {ui.skip}
        </a>

        <Nav links={nav} primary={primary} />

        <main id="top">
          {blocks.map((block, i) => {
            return (
              <div key={`${block.type}-${i}`} id={i === 1 ? 'content' : undefined} data-block={block.type}>
                {renderBlock(block, { id: idOf(block), label: labels[i], index: i, page })}
              </div>
            );
          })}
        </main>

        <Footer contact={page.contact} primary={primary} lang={page.lang} />
      </div>
    </PageProvider>
  );
}
