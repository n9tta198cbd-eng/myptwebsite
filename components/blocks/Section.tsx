import type { ReactNode } from 'react';
import Divider from '../ornaments/Divider';
import DrawnOrnament from '../ui/DrawnOrnament';
import ScrambleHeading from '../ui/ScrambleHeading';

/* Общая оболочка блока: якорь, отступы, подпись, заголовок и флёрон.
   Все блоки кроме hero и marquee собираются на ней — поэтому их
   можно переставлять в любом порядке, ритм страницы не ломается. */
export default function Section({
  id,
  label,
  heading,
  lead,
  align = 'center',
  children,
}: {
  id: string;
  label?: string;
  heading?: string;
  lead?: string;
  align?: 'center' | 'left';
  children: ReactNode;
}) {
  const centered = align === 'center';

  return (
    <section id={id} className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        {(label || heading) && (
          <header className={`flex flex-col ${centered ? 'items-center text-center' : ''}`}>
            {label && <span className="label text-blood">{label}</span>}
            {heading && (
              <ScrambleHeading
                text={heading}
                className="mt-3 font-antiqua text-section leading-[0.95]"
              />
            )}
            {lead && (
              <p
                className={`mt-6 max-w-[60ch] font-antiqua text-xl leading-snug text-bone/75 md:text-2xl ${centered ? 'mx-auto' : ''}`}
              >
                {lead}
              </p>
            )}
          </header>
        )}

        <DrawnOrnament className="mt-10 flex justify-center">
          <Divider />
        </DrawnOrnament>

        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
