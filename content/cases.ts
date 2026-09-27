import type { Lang } from './types';

/* Кейсы портфолио — общий архив для всех страниц.
   Блок works выбирает из него по id (cases) или по тегам (tags).
   Перевод кейса — в поле i18n; чего нет в переводе, берётся из русского. */

type CaseText = Pick<
  Case,
  'title' | 'subtitle' | 'category' | 'tag' | 'role' | 'services' | 'summary' | 'challenge' | 'approach' | 'outcome'
>;

export type Case = {
  id: string;
  num: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  /** Короткая подпись для плашки карточки — полная категория туда не влезает. */
  tag: string;
  year: string;
  client: string;
  role: string;
  cover: string;
  services: string[];
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  /** Теги для фильтра в блоке works: branding, music, ai, merch, community, systems… */
  tags: string[];
  i18n?: Partial<Record<Lang, Partial<CaseText>>>;
};

export const cases: Case[] = [
  {
    id: 'case-cyberclub',
    tags: ['branding'],
    num: '01',
    slug: 'konsol-kiberklub',
    title: 'Консоль Киберклуб',
    subtitle: 'Полный брендинг: концепция и визуальный стиль',
    category: 'Брендинг',
    tag: 'Брендинг',
    year: '2026',
    client: 'Консоль',
    role: 'Дизайнер айдентики, автор концепции',
    cover: '/assets/card-01.webp',
    services: ['Концепция бренда', 'Визуальный стиль', 'Логотип / знак', 'Айдентика', 'Носители'],
    summary: 'Полноценный брендинг киберклуба: концепция, визуальный стиль и айдентика, собранные в одну систему.',
    challenge: 'Собрать бренд киберклуба с нуля — концепцию и визуальный стиль — не скатываясь в шаблонную «киберспортивную» эстетику с неоном и агрессией по умолчанию.',
    approach: 'Сначала концепция, потом стиль. Знак, типографика, цвет и графические приёмы выводятся из идеи бренда, а не из модных референсов — поэтому система разворачивается на любые носители без потери характера.',
    outcome: 'Цельный бренд с собственным характером: концепция, логотип и визуальный стиль, готовые к масштабированию на digital и офлайн-носители.',
  },
  {
    id: 'case-gazgolder',
    tags: ['music', 'ai', 'video'],
    num: '02',
    slug: 'gazgolder',
    title: 'BabyCute (Gazgolder)',
    subtitle: 'Два клипа и собственный AI-релайт пайплайн',
    category: 'Арт-дирекшн',
    tag: 'Арт-дирекшн',
    year: '2026',
    client: 'BabyCute / Gazgolder',
    role: 'AI-видео инженер, визуальный художник',
    cover: '/assets/card-02.webp',
    services: ['AI video pipeline', 'Relight-автоматизация', '4K генерация', 'Визуал для клипов'],
    summary: 'Два клипа для BabyCute. Для производства разработана автоматизация релайта видео любой длительности в 4K на бесплатном API Google — сгенерировано больше 1000 кадров, вошедших в финальные клипы.',
    challenge: 'Пересветить видео любой длительности в 4K без бюджета на коммерческие инструменты — и сделать это стабильно и масштабируемо.',
    approach: 'Вместо ручной обработки собрана собственная автоматизация на бесплатном API Google: пайплайн релайта, который выдерживает полную длительность клипа в 4K и работает как конвейер, а не как разовый трюк.',
    outcome: 'Больше 1000 сгенерированных кадров легли в два готовых клипа BabyCute.',
    i18n: {
      en: {
        subtitle: 'Two music videos and a custom AI relight pipeline',
        category: 'Art direction',
        tag: 'Art direction',
        role: 'AI video engineer, visual artist',
        services: ['AI video pipeline', 'Relight automation', '4K generation', 'Music video visuals'],
        summary: 'Two music videos for BabyCute. For production I built an automation that relights video of any length in 4K on a free Google API — over 1000 generated frames made it into the final cuts.',
        challenge: 'Relight footage of any length in 4K with no budget for commercial tools, and make it stable and scalable.',
        approach: 'Instead of manual grading I built a relight pipeline on a free Google API that handles a full-length clip in 4K and runs like a conveyor, not a one-off trick.',
        outcome: 'Over 1000 generated frames in two finished BabyCute videos.',
      },
    },
  },
  {
    id: 'case-glebkostin',
    tags: ['creators', 'ai', 'systems'],
    num: '03',
    slug: 'gleb-kostin',
    title: 'Глеб Костин',
    subtitle: 'Иконки, маскот, liveweeks и AI-пайплайны',
    category: 'Социовизуальная инженерия',
    tag: 'Социовизуальное',
    year: '2026',
    client: 'Глеб Костин',
    role: 'Арт-директор, дизайнер, AI-пайплайн',
    cover: '/assets/card-03.webp',
    services: ['Icon-система macOS / iOS', 'Маскот и 3D-модель', 'Сайт liveweeks', 'AI image pipeline', 'Telegram-бот с голосом'],
    summary: 'Анти-дофаминовые иконки для macOS/iOS, брендированный маскот на базе Уитли из Portal 2, сайт liveweeks и собственные AI-пайплайны генерации изображений.',
    challenge: 'Четыре разных вселенные в одном проекте: иконки, маскот, сайт и AI-инструментарий. Каждая требовала полноценного ресерча, а не косметики.',
    approach: 'Каждый блок строился от исследования: полная история дизайна иконок с 1980 года, глубочайший разбор Уитли по архиву Valve, собственное приложение для установки иконок, обученные модели генерации. Ничего «на глаз».',
    outcome: '4 концепции, 4 цветовые темы и 50 визуальных стилистик на 9 иконок; полностью функциональная анимированная 3D-модель маскота с голосом и Telegram-ботом; сайт, превращающий обои айфона в недельный отсчёт времени.',
    i18n: {
      en: {
        title: 'Gleb Kostin',
        subtitle: 'Icons, a mascot, liveweeks and AI pipelines',
        category: 'Socio-visual engineering',
        tag: 'Socio-visual',
        role: 'Art director, designer, AI pipeline',
        services: ['macOS / iOS icon system', 'Mascot and 3D model', 'liveweeks website', 'AI image pipeline', 'Voiced Telegram bot'],
        summary: 'Anti-dopamine icons for macOS/iOS, a branded mascot based on Wheatley from Portal 2, the liveweeks website and custom AI image pipelines.',
        challenge: 'Four different universes in one project: icons, a mascot, a website and AI tooling. Each needed real research, not cosmetics.',
        approach: 'Every part started with research: the full history of icon design since 1980, a deep dive into Wheatley through the Valve archive, a custom icon installer app, trained generation models.',
        outcome: '4 concepts, 4 colour themes and 50 visual styles for 9 icons; a fully animated, voiced 3D mascot with a Telegram bot; a site that turns an iPhone wallpaper into a weekly countdown.',
      },
    },
  },
  {
    id: 'case-raindays',
    tags: ['music', 'merch'],
    num: '04',
    slug: 'tri-dnya-dozhdya',
    title: 'Три дня дождя',
    subtitle: 'Мерч-коллекция в гранж-стилистике',
    category: 'Арт-дирекшн',
    tag: 'Арт-дирекшн',
    year: '2025',
    client: 'Три дня дождя',
    role: 'Дизайнер мерча, связка с производством',
    cover: '/assets/card-04.webp',
    services: ['Коллекция мерча', 'Концепции принтов', 'Гранж визуальный стиль', 'Техэскизы для производства', 'Материалы и методы нанесения'],
    summary: 'Коллекция мерча в гранж-стилистике: футболки, поло, лонгсливы, худи и кепки — от концепций принтов до технических эскизов для производства.',
    challenge: 'Из хаотичного потока идей заказчика собрать цельную коллекцию в духе группы: рок-стилистика, принты спереди и сзади, настроение нового альбома и личная история фронтмена.',
    approach: 'Базовым языком выбран гранж. Дальше — серия концепций принтов: портрет в духе «Реквиема», дизайн с городами тура, строчки из хайповых треков, многоязычные надписи (мотив, который группа выводила на концертные экраны на китайском, английском, французском), и отдельная линия вокруг темы «12 шагов» и сообщества анонимных — болезненно важной для фронтмена. Параллельно подбирались идеальные бланки по крою: футболка, поло, лонгслив, худи, кепка; чёрный и серый garment-цвета.',
    outcome: 'Заказчик отобрал финальные варианты из серии концепций. Дальше работа шла уже с производством: ТЗ для фабрики, технические эскизы, обсуждение материалов и методов нанесения, правки, подстроенные под реальные ограничения печати.',
  },
  {
    id: 'case-32inches',
    tags: ['branding', 'community', 'strategy'],
    num: '05',
    slug: '32inches',
    title: '32inches',
    subtitle: 'Пересборка бренда: стиль, позиционирование, комьюнити',
    category: 'Социовизуальная инженерия',
    tag: 'Социовизуальное',
    year: '2022 — н.в.',
    client: '32inches',
    role: 'Арт-директор бренда',
    cover: '/assets/card-05.svg',
    services: ['Ребрендинг', 'Концепция и позиционирование', 'Маркетинговая стратегия', 'Комьюнити-механика'],
    summary: 'Полная пересборка бренда: фирменный стиль, концепция, позиционирование, маркетинговая стратегия и механика роста комьюнити через молодых дизайнеров.',
    challenge: 'Начинал как внешний дизайнер: проблемы айдентики и позиционирования были обозначены давно, но годами не внедрялись — бренд не был готов меняться.',
    approach: 'Когда владелец созрел к изменениям, бренд был пересобран целиком: фирменный стиль, концепция, позиционирование и маркетинговая стратегия. Отдельно выстроена механика роста комьюнити — молодые дизайнеры получают практику в обмен на участие в проектной работе.',
    outcome: 'Долгосрочная роль арт-директора бренда и живая лаборатория: экспериментальные технические системы, спекулятивные и эзотерические концепции, визуальное влияние, медиа и механизмы убеждения, когнитивная нейронаука.',
  },
  {
    id: 'case-elysium',
    tags: ['systems', 'studio'],
    num: '06',
    slug: 'elysium-studio',
    title: 'Elysium Studio',
    subtitle: 'Операционная система студии',
    category: 'Социовизуальная инженерия',
    tag: 'Социовизуальное',
    year: '2026',
    client: 'Elysium Studio',
    role: 'Арт-директор студии',
    cover: '/assets/card-06.svg',
    services: ['Внутренняя система работы', 'Пайплайн заказов', 'Сайт студии', 'Командная структура', 'Система вовлечения'],
    summary: 'Проектирование студии как системы: роли и обязанности, пайплайн выполнения заказов, шаблоны, сайт и механика привлечения людей.',
    challenge: 'Собрать работающую студию из людей и процессов — там, где обычно есть только чат и энтузиазм.',
    approach: 'Создана внутренняя система работы: распределение ролей и обязанностей, рабочая структура, пайплайн выполнения заказов и набор шаблонов для повседневной работы. Разработаны сайт студии и его структура, разобрана сопутствующая документация. Выстроена координация между отделами и система привлечения людей к развитию студии на проектной и добровольной основе.',
    outcome: 'Действующая студия с управляемой командой дизайнеров и воспроизводимыми процессами вместо хаоса.',
    i18n: {
      en: {
        subtitle: 'An operating system for a studio',
        category: 'Socio-visual engineering',
        tag: 'Socio-visual',
        role: 'Studio art director',
        services: ['Internal workflow', 'Order pipeline', 'Studio website', 'Team structure', 'Engagement system'],
        summary: 'Designing a studio as a system: roles, an order pipeline, templates, a website and a way to bring people in.',
        challenge: 'Build a working studio out of people and processes where usually there is only a group chat and enthusiasm.',
        approach: 'Roles and responsibilities, a working structure, an order pipeline and everyday templates. The studio website and its structure, the documentation around it, coordination between departments and a way to involve people on a project and volunteer basis.',
        outcome: 'A functioning studio with a managed team of designers and repeatable processes instead of chaos.',
      },
    },
  },
];

/** Кейсы для блока works на нужном языке. */
export function pickCases(lang: Lang, ids?: string[], tags?: string[]): Case[] {
  let list = cases;
  if (ids?.length) {
    list = ids.flatMap((id) => cases.filter((c) => c.id === id));
  } else if (tags?.length) {
    list = cases.filter((c) => c.tags.some((t) => tags.includes(t)));
  }
  return list.map((c) => ({ ...c, ...c.i18n?.[lang] }));
}
