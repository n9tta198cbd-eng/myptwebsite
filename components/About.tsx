'use client';

import Image from 'next/image';
import Corner from './ornaments/Corner';
import Divider from './ornaments/Divider';
import DrawnOrnament from './ui/DrawnOrnament';
import ScrambleHeading from './ui/ScrambleHeading';
import { ABOUT } from '@/lib/site';

export default function About() {
  return (
    <section id="about" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <DrawnOrnament className="flex justify-center">
          <Divider />
        </DrawnOrnament>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* портрет в гравюрной рамке */}
          <figure className="mx-auto w-full max-w-[440px]">
            <div className="relative aspect-4/5 border border-gold/60 bg-charcoal">
              <div className="absolute inset-2 border border-bone/15" />
              <Image
                src="/assets/portrait.svg"
                alt="Портрет — процедурная гравюра"
                fill
                unoptimized
                sizes="(max-width: 1023px) 90vw, 440px"
                className="object-cover p-3"
              />
              <Corner size={38} className="absolute top-0 left-0 text-gold" />
              <Corner size={38} className="absolute top-0 right-0 rotate-90 text-gold" />
              <Corner size={38} className="absolute right-0 bottom-0 rotate-180 text-gold" />
              <Corner size={38} className="absolute bottom-0 left-0 -rotate-90 text-gold" />
            </div>
            <figcaption className="mt-4 font-antiqua text-lg text-bone/60 italic">
              {ABOUT.caption}
            </figcaption>
          </figure>

          {/* текст */}
          <div>
            <ScrambleHeading
              text={ABOUT.heading}
              className="font-antiqua text-section leading-[0.95]"
            />

            <p className="mt-8 font-antiqua text-2xl leading-snug md:text-[30px]">{ABOUT.lead}</p>

            <div className="mt-6 max-w-[62ch] space-y-5 text-bone/85">
              {ABOUT.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-gold/30 pt-6">
              {ABOUT.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-mono text-4xl leading-none tabular-nums md:text-5xl">
                    {s.value}
                  </dt>
                  <dd className="label mt-2 text-bone/45">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
