'use client';

import Divider from './ornaments/Divider';
import Sigil from './ornaments/Sigil';
import DrawnOrnament from './ui/DrawnOrnament';
import MagneticButton from './ui/MagneticButton';
import SealButton from './ui/SealButton';
import { CONTACTS, SITE } from '@/lib/site';

const SOCIALS = [
  { href: CONTACTS.telegramUrl, label: `Telegram ${CONTACTS.telegram}` },
  { href: `mailto:${CONTACTS.email}`, label: `Почта ${CONTACTS.email}` },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden px-5 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <DrawnOrnament className="flex justify-center">
          <Divider />
        </DrawnOrnament>

        <div className="mt-16 flex flex-col items-center gap-8 text-center">
          <span className="label text-blood">Связаться</span>

          <MagneticButton>
            <a
              href={`mailto:${CONTACTS.email}`}
              data-cursor="link"
              className="block text-2xl leading-tight font-medium break-all transition-colors duration-200 hover:text-blood md:text-5xl"
            >
              {CONTACTS.email}
            </a>
          </MagneticButton>

          <SealButton href={`mailto:${CONTACTS.email}`} label="Написать письмо" size={64} />

          <ul className="mt-2 flex items-center gap-5">
            {SOCIALS.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  data-cursor="link"
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="grid size-12 place-items-center rounded-full border border-ink/50 text-ink transition-colors duration-300 hover:border-blood hover:bg-blood hover:text-parchment"
                >
                  <Sigil size={22} />
                </a>
              </li>
            ))}
          </ul>

          <p className="label text-ink/55">{CONTACTS.location}</p>
        </div>

        {/* гигантский вордмарк, частично уходит за нижний край */}
        <div className="mt-16 select-none md:mt-24" aria-hidden="true">
          <span className="block translate-y-[0.14em] text-center font-blackletter text-wordmark leading-[0.72] whitespace-nowrap">
            {SITE.name}
          </span>
        </div>

        <div className="flex items-center justify-center border-t border-ink/25 py-5">
          <p className="label text-center text-ink/55">
            © {SITE.copyrightYear} {SITE.name} — {SITE.footerNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
