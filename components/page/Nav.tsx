import { PROFILE } from '@/content/profile';
import type { Link } from '@/content/types';

/* Меню: вордмарк слева, пункты из блоков с nav, контакт справа.
   Без фона — поверх бумаги, с тонкой линией снизу. */
export default function Nav({ links, primary }: { links: Link[]; primary: Link }) {
  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b-2 border-ink bg-paper">
      <nav className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
        <a href="#top" className="display text-xl">
          {PROFILE.name}
        </a>

        {links.length > 0 && (
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="label ink-link">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <a
          href={primary.href}
          target={primary.href.startsWith('http') ? '_blank' : undefined}
          rel={primary.href.startsWith('http') ? 'noreferrer' : undefined}
          className="label bg-ink px-3 py-1.5 text-paper transition-colors hover:bg-signal"
        >
          {primary.label}
        </a>
      </nav>
    </header>
  );
}
