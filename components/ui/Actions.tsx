import type { Link } from '@/content/types';

/* Ряд кнопок-ссылок. Первая — залитая (главное действие), остальные — контурные. */
export default function Actions({
  items,
  className = '',
}: {
  items?: Link[];
  className?: string;
}) {
  if (!items?.length) return null;

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {items.map((a, i) => {
        const external = a.href.startsWith('http');
        return (
          <a
            key={a.href + a.label}
            href={a.href}
            data-cursor="link"
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            className={`border px-5 py-3 font-mono text-[11.5px] tracking-[0.16em] uppercase transition-colors duration-200 ${
              i === 0
                ? 'border-blood bg-blood text-bone hover:bg-transparent'
                : 'border-gold/70 text-bone hover:border-blood hover:bg-blood'
            }`}
          >
            {a.label}
          </a>
        );
      })}
    </div>
  );
}
