'use client';

import { useEffect, useState } from 'react';
import MagneticButton from './ui/MagneticButton';
import SealButton from './ui/SealButton';
import { CONTACTS } from '@/lib/site';

const LINKS = [
  { href: '#works', label: 'Works' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    if (window.__lenis) window.__lenis.scrollTo(target as HTMLElement, { offset: -20 });
    else target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-500 ${
        scrolled ? 'bg-parchment/95 backdrop-blur-[2px]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 md:px-10">
        <a
          href="#top"
          onClick={(e) => go(e, '#top')}
          data-cursor="link"
          className="font-blackletter text-2xl leading-none tracking-wide md:text-3xl"
        >
          N9TTA
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <MagneticButton>
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  data-cursor="link"
                  className="label relative block py-1 text-ink transition-colors duration-200 hover:text-blood"
                >
                  {l.label}
                </a>
              </MagneticButton>
            </li>
          ))}
        </ul>

        <SealButton href={`mailto:${CONTACTS.email}`} label="Написать" size={46} />
      </nav>

      {/* линия-орнамент появляется вместе с фоном */}
      <div
        className={`overflow-hidden transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg viewBox="0 0 1200 8" className="h-2 w-full text-ink" fill="none" aria-hidden="true">
          <path d="M0 4h520" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <path d="M680 4h520" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <path d="M540 4l8-3 8 3-8 3-8-3Z" stroke="var(--color-gold)" strokeWidth="1" />
          <path d="M644 4l8-3 8 3-8 3-8-3Z" stroke="var(--color-gold)" strokeWidth="1" />
          <path d="M592 1l8 3-8 3-8-3 8-3Z" fill="var(--color-blood)" />
        </svg>
      </div>
    </header>
  );
}
