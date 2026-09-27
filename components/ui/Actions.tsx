import type { Link } from '@/content/types';

/* Ряд кнопок-ссылок. Первая — залитая сигнальным, остальные — контурные. */
export default function Actions({ items, className = '' }: { items?: Link[]; className?: string }) {
  if (!items?.length) return null;

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {items.map((a, i) => {
        const external = a.href.startsWith('http');
        return (
          <a
            key={a.href + a.label}
            href={a.href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            className={`label border-2 px-5 py-3 transition-colors duration-200 ${
              i === 0
                ? 'border-signal bg-signal text-paper hover:border-ink hover:bg-ink'
                : 'border-ink hover:bg-ink hover:text-paper'
            }`}
          >
            {a.label} {i === 0 && '→'}
          </a>
        );
      })}
    </div>
  );
}
