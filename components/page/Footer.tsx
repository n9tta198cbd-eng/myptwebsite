import GlyphField from '../ui/GlyphField';
import { LINKS, PROFILE } from '@/content/profile';
import type { Contact, Lang, Link } from '@/content/types';
import { UI_STRINGS } from '@/content/ui';

/* Финал любой страницы: призыв, контакты крупным набором, вордмарк во всю ширину на чёрном. */
export default function Footer({ contact, primary, lang }: { contact: Contact; primary: Link; lang: Lang }) {
  const ui = UI_STRINGS[lang];

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink px-4 pt-16 text-paper md:px-8 md:pt-24">
      <GlyphField seed={404} count={18} className="bottom-[35%] left-[62%] [&_span]:text-paper/70 [&_span.text-signal]:text-signal" />

      <div className="relative grid gap-10 md:grid-cols-12">
        <p className="label text-signal md:col-span-3">{contact.label}</p>
        <div className="md:col-span-9">
          {contact.heading && <h2 className="display text-giant">{contact.heading}</h2>}
          {contact.text && <p className="mt-6 max-w-[52ch] text-lg text-paper/80">{contact.text}</p>}

          <ul className="mt-10 space-y-2">
            <li>
              <a
                href={primary.href}
                target="_blank"
                rel="noreferrer"
                className="display ink-link text-3xl md:text-5xl"
              >
                {PROFILE.telegram}
              </a>
            </li>
            <li>
              <a href={LINKS.email} className="display ink-link text-xl break-all md:text-3xl" aria-label={`${ui.mail} ${PROFILE.email}`}>
                {PROFILE.email}
              </a>
            </li>
          </ul>
          <p className="label mt-8 text-paper/60">{PROFILE.location[lang]}</p>
        </div>
      </div>

      <p className="label relative mt-16 border-t border-paper/30 py-4 md:mt-24 text-paper/50">
        © {PROFILE.year} {PROFILE.name} — {PROFILE.footerNote}
      </p>
      <p aria-hidden="true" className="display relative -mb-[0.12em] text-[25vw] leading-[0.8] whitespace-nowrap">
        {PROFILE.name}
      </p>
    </footer>
  );
}
