'use client';

import Divider from '../ornaments/Divider';
import Sigil from '../ornaments/Sigil';
import DrawnOrnament from '../ui/DrawnOrnament';
import MagneticButton from '../ui/MagneticButton';
import SealButton from '../ui/SealButton';
import { useUI } from './PageContext';
import { LINKS, PROFILE } from '@/content/profile';
import type { Contact, Lang, Link } from '@/content/types';

/* Финал любой страницы: призыв, контакты, гигантский вордмарк. */
export default function Footer({
  contact,
  primary,
  lang,
}: {
  contact: Contact;
  primary: Link;
  lang: Lang;
}) {
  const ui = useUI();
  const socials = [
    { href: LINKS.telegram, label: `Telegram ${PROFILE.telegram}` },
    { href: LINKS.email, label: `${ui.mail} ${PROFILE.email}` },
  ];

  return (
    <footer id="contact" className="relative overflow-hidden px-5 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <DrawnOrnament className="flex justify-center">
          <Divider />
        </DrawnOrnament>

        <div className="mt-16 flex flex-col items-center gap-8 text-center">
          <span className="label text-blood">{contact.label}</span>

          {contact.heading && (
            <h2 className="max-w-[18ch] font-antiqua text-section leading-[0.95]">{contact.heading}</h2>
          )}
          {contact.text && <p className="max-w-[52ch] text-bone/75">{contact.text}</p>}

          <MagneticButton>
            <a
              href={LINKS.email}
              data-cursor="link"
              className="block text-2xl leading-tight font-medium break-all transition-colors duration-200 hover:text-blood md:text-5xl"
            >
              {PROFILE.email}
            </a>
          </MagneticButton>

          <SealButton href={primary.href} label={primary.label} size={64} />

          <ul className="mt-2 flex items-center gap-5">
            {socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  data-cursor="link"
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="grid size-12 place-items-center rounded-full border border-gold/50 text-bone/70 transition-colors duration-300 hover:border-blood hover:bg-blood hover:text-bone"
                >
                  <Sigil size={22} />
                </a>
              </li>
            ))}
          </ul>

          <p className="label text-bone/45">{PROFILE.location[lang]}</p>
        </div>

        {/* гигантский вордмарк, частично уходит за нижний край */}
        <div className="mt-16 select-none md:mt-24" aria-hidden="true">
          <span className="block translate-y-[0.14em] text-center font-blackletter text-wordmark leading-[0.72] whitespace-nowrap">
            {PROFILE.name}
          </span>
        </div>

        <div className="flex items-center justify-center border-t border-gold/30 py-5">
          <p className="label text-center text-bone/45">
            © {PROFILE.year} {PROFILE.name} — {PROFILE.footerNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
