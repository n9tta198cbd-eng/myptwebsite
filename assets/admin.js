(() => {
  'use strict';

  const CONTENT_URL = 'content/content.json';
  const LS_KEY = 'n9tta_content_override';
  const PUBLISH_URL = '/api/publish';
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  let data = null;
  let activeCaseId = null;
  let activeTab = 'overview';
  let caseSearch = '';

  // Карта панелей: id вкладки -> функция рендера конкретной панели.
  const PANELS = {
    overview: () => overviewPanel(),
    hero: () => heroPanel(),
    intro: () => introPanel(),
    cases: () => casesPanel(),
    sections: () => sectionsPanel(),
    socio: () => socioPanel(),
    drafts: () => draftsPanel(),
    creative: () => creativePanel(),
    about: () => aboutPanel(),
    contacts: () => contactsPanel(),
    ui: () => uiPanel(),
  };

  // Опции для выпадающих списков.
  const STATUS_OPTIONS = [
    { value: 'draft', label: 'Черновик' },
    { value: 'published', label: 'Опубликован' },
  ];
  const SECTION_TYPE_OPTIONS = [
    { value: 'text', label: 'Текст' },
    { value: 'quote', label: 'Цитата' },
    { value: 'image', label: 'Одно изображение' },
    { value: 'gallery', label: 'Галерея' },
    { value: 'imageGrid', label: 'Сетка изображений' },
    { value: 'splitTextImage', label: 'Текст + изображение' },
    { value: 'metricRow', label: 'Показатели' },
    { value: 'processTimeline', label: 'Процесс / таймлайн' },
    { value: 'video', label: 'Видео (embed)' },
    { value: 'checklist', label: 'Чеклист' },
    { value: 'beforeAfter', label: 'До / После' },
  ];
  const categoryOptions = () => (data.categories || []).map((c) => ({ value: c.id, label: c.title }));
  const caseLinkOptions = () => [{ value: '', label: '— не привязан —' }].concat((data.cases || []).map((c) => ({ value: c.id, label: c.title })));
  const EMBEDDED_CONTENT = JSON.parse(JSON.stringify({
  "siteSettings": {
    "siteName": "N9TTA",
    "systemId": "N9TTA / архив визуальных систем",
    "location": "Москва / удалённо / worldwide",
    "status": "система в сети",
    "accessLevel": "уровень допуска: 3",
    "footerNote": "Построено для размышления, а не для листания.",
    "copyrightYear": "2026",
    "sectionsEnabled": {
      "hero": true,
      "intro": true,
      "featuredCases": true,
      "branding": true,
      "artDirection": true,
      "socioVisual": true,
      "drafts": true,
      "creativeWorks": true,
      "about": true
    },
  },
  "intro": {
    "heading": "Знакомство",
    "eyebrow": "профайл / кто за системой",
    "photo": "images/placeholders/about-portrait.svg",
    "lead": "Арт-директор с 5-летним опытом в креативной индустрии. Работал со стритвир-сценой Беларуси, крупными стримерами, музыкальными проектами и брендами. Меня интересует дизайн как инструмент влияния на мнение, эмоции, поведение и восприятие.",
    "facts": [
      { "label": "Опыт", "value": "5 лет в креативной индустрии" },
      { "label": "Сцены", "value": "Стритвир / стримеры / музыка" },
      { "label": "Метод", "value": "Ресерч + культурные коды" },
      { "label": "Фокус", "value": "Управление восприятием" }
    ],
    "manifesto": {
      "title": "МЫ БОЛЬШЕ НЕ ДИЗАЙНЕРЫ.",
      "body": "Долгое время рынок продавал одну и ту же устаревшую идею: будто главная ценность специалиста — это умение делать «крутой визуал». Красивую картинку до сих пор ставят на первое место, потому что так проще продавать услугу и так привычнее мыслить старой индустрии. Но это уже не реальное положение дел.\n\nНа самом деле визуал — это только поверхность.\n\nВ крупных компаниях на первом месте стоят не те, кто просто умеет рисовать красиво, а те, кто умеет думать. Нужны не оформители, а управленцы. Не исполнители вкуса, а люди, которые понимают, что именно стоит за визуальной оболочкой: стратегия, позиционирование, поведение аудитории, доверие, власть, контекст.\n\nКрасивый визуал можно сделать. Его можно сгенерировать. Его можно поручить нейросети. Но понять, зачем он нужен, что он должен скрывать, усиливать или менять, — это уже вопрос мышления.\n\nПоэтому мы отказываемся от роли дизайнеров в старом смысле.\n\n**Мы — Исследовательская Группа Социовизуальной Инженерии.**\n\nМы не спрашиваем: «как сделать красиво?»\nМы спрашиваем: «что должно быть спрятано за этой красотой?»\nМы не обслуживаем визуал.\nМы управляем восприятием.\n\n### Кто мы?\n\nПсиховизуальные инженеры. Люди, которые умеют мыслить системно и переводить бизнес-задачи в визуальные конструкции. Не оформители. Не подрядчики. Не те, кого зовут в конце, когда всё уже решено.\n\n### Что мы делаем?\n\n**Строим. Управляем. Внушаем.**\n\nМы создаём не просто визуал, а рамку, в которой визуал начинает работать как инструмент влияния. Мы меняем не только картинку, но и то, как к тебе относятся, сколько тебе платят и какое место ты занимаешь в системе.\n\nДля крупных фирм важен не тот, кто делает красиво.\nИм нужен тот, кто понимает, как устроено мышление, и умеет собирать из него результат.\n\nЕсли ты всё ещё продаёшь «красоту» — ты играешь в старую игру.\nЕсли ты продаёшь мышление и управление восприятием — ты уже в другой лиге.",
      "signature": "Добро пожаловать в СИГ"
    }
  },
  "hero": {
    "eyebrow": "N9TTA / архив визуальных систем и влияния",
    "titleLines": [
      "АРТ-ДИРЕКТОР",
      "ДИЗАЙНЕР",
      "СОЦИОВИЗУАЛЬНЫЙ ИНЖЕНЕР"
    ],
    "subtitle": "Проектирую визуальные системы, управляю вниманием, собираю среды влияния.",
    "rolesLabel": "РОЛИ",
    "roles": [
      "Арт-директор",
      "Дизайнер",
      "Социовизуальный инженер"
    ],
    "disciplinesLabel": "ДИСЦИПЛИНЫ",
    "disciplines": [
      "Арт-дирекшн",
      "Брендинг",
      "Визуальные системы",
      "Концепции",
      "AI + автоматизация",
      "2D / 3D / web"
    ]
  },
  "categories": [
    { "id": "branding", "title": "Брендинг и дизайн-системы" },
    { "id": "artdirection", "title": "Арт-дирекшн" },
    { "id": "socio", "title": "Социовизуальная инженерия" }
  ],
  "cases": [
    {
      "id": "case-cyberclub",
      "slug": "konsol-kiberklub",
      "visible": true,
      "featured": true,
      "status": "published",
      "order": 1,
      "category": "branding",
      "title": "Консоль Киберклуб",
      "subtitle": "Полный визуальный спектр для киберклуба",
      "year": "2026",
      "client": "Консоль",
      "role": "Арт-директор, дизайнер айдентики",
      "services": [
        "Визуальная система",
        "Логотип / знак",
        "Оформление среды",
        "Навигация",
        "Digital и офлайн-носители"
      ],
      "summary": "Айдентика, среда, графическая система, носители и визуальный язык пространства для киберклуба.",
      "challenge": "Собрать единый визуальный язык для пространства, который работает и в цифровой навигации, и в офлайн-среде клуба, не скатываясь в шаблонный киберспортивный стиль.",
      "approach": "Система строится на строгой сетке, резких контрастах и графической дисциплине пространства. Визуальный язык должен считываться с расстояния, переживать масштабирование и быть пригодным для экранов, стен, меню и навигации.",
      "outcome": "Получается узнаваемая среда с собственным тоном: не игровой аттракцион, а собранная технологическая сцена с ясным визуальным кодом.",
      "heroImage": "images/placeholders/cyberclub-hero.svg",
      "sections": [
        { "type": "text", "title": "Контекст", "content": "Клубу требовалась визуальная система, которая объединяет пространство, экраны и печатные материалы в единый язык без визуального шума." },
        { "type": "imageGrid", "title": "Визуальная система", "images": ["images/placeholders/grid-1.svg","images/placeholders/grid-2.svg","images/placeholders/grid-3.svg"] },
        { "type": "splitTextImage", "title": "Логотип и знак", "content": "Знак построен как модульный символ, который работает в крупном и микроформате: на фасаде, в интерфейсе, на меню и на предметных носителях.", "image": "images/placeholders/logo-block.svg" },
        { "type": "gallery", "title": "Применение в среде", "images": ["images/placeholders/env-1.svg","images/placeholders/env-2.svg","images/placeholders/env-3.svg","images/placeholders/env-4.svg"] },
        { "type": "quote", "content": "Система должна читаться и с экрана, и со стены зала — это и есть инженерная задача айдентики." },
        { "type": "metricRow", "title": "Параметры системы", "items": [{ "label": "Режим", "value": "Пространство + digital" },{ "label": "Язык", "value": "Индустриальный / архивный" },{ "label": "Сетка", "value": "Модульная" }] }
      ],
      "gallery": [],
      "videos": [],
      "notes": "Заменить placeholder-материалы на финальные рендеры, фото среды и макросъёмки носителей."
    },
    {
      "id": "case-raindays",
      "slug": "tri-dnya-dozhdya",
      "visible": true,
      "featured": true,
      "status": "published",
      "order": 2,
      "category": "artdirection",
      "title": "Три дня дождя",
      "subtitle": "Коллекция мерча и визуальный язык музыкального проекта",
      "year": "2026",
      "client": "Три дня дождя",
      "role": "Арт-директор, дизайнер",
      "services": [
        "Коллекция мерча",
        "Принты",
        "Логотип",
        "Бирки и упаковка",
        "Кампания"
      ],
      "summary": "Принты, логотип, одежда, production-thinking и носители для музыкального проекта.",
      "challenge": "Перевести атмосферу музыкального проекта в физическую коллекцию, сохранив цельность между графикой, вещью и подачей.",
      "approach": "Коллекция строится как единый визуальный организм: ткань, принт, бирка, упаковка и кампейн-кадры работают как одна фраза, а не как набор разрозненных объектов.",
      "outcome": "Кейс оформлен как модульная система, где можно отдельно вести изделия, принты, детали производства и кампанию.",
      "heroImage": "images/placeholders/raindays-hero.svg",
      "sections": [
        { "type": "text", "title": "Обзор коллекции", "content": "Коллекция построена вокруг состояния затяжного дождя как тягучего и вязкого образа, который можно буквально носить на себе." },
        { "type": "gallery", "title": "Garments", "images": ["images/placeholders/garment-1.svg","images/placeholders/garment-2.svg","images/placeholders/garment-3.svg"] },
        { "type": "imageGrid", "title": "Print closeups", "images": ["images/placeholders/print-1.svg","images/placeholders/print-2.svg"] },
        { "type": "text", "title": "Production details", "content": "Бирки, ярлыки, упаковка и конструктивные детали изделий разрабатываются как часть единой системы, а не как второстепенный слой." },
        { "type": "gallery", "title": "On-body visuals", "images": ["images/placeholders/campaign-1.svg","images/placeholders/campaign-2.svg"] }
      ],
      "gallery": [],
      "videos": [],
      "notes": "Добавить итоговые студийные и кампейн-кадры вместо временных заглушек."
    },
    {
      "id": "case-glebkostin",
      "slug": "gleb-kostin",
      "visible": true,
      "featured": true,
      "status": "published",
      "order": 3,
      "category": "socio",
      "title": "Глеб Костин",
      "subtitle": "Мультиформатная визуальная экосистема",
      "year": "2026",
      "client": "Глеб Костин",
      "role": "Арт-директор, дизайнер, AI-пайплайн",
      "services": [
        "macOS / iOS icons",
        "Маскот",
        "Сайт liveweeks",
        "AI image pipeline",
        "Physical collab elements"
      ],
      "summary": "Icons macOS / iOS, маскот, сайт liveweeks, AI image pipeline, физические коллаборации.",
      "challenge": "Собрать разрозненные форматы — иконки, сайт, маскота, AI-инструментарий и физические элементы — в единую узнаваемую систему.",
      "approach": "Кейс специально сделан модульным: каждая подсекция включается и выключается отдельно, поэтому проект можно показывать как digital-identity, как AI-процесс или как мультиформатную экосистему.",
      "outcome": "Редактор позволяет быстро скрывать целые подсекции, не ломая структуру кейса и не переписывая шаблон.",
      "heroImage": "images/placeholders/gleb-hero.svg",
      "sections": [
        { "type": "text", "title": "Project overview", "content": "Проект развивался поэтапно: от icon-системы до сайта и AI-инструмента.", "enabled": true },
        { "type": "imageGrid", "title": "Icon system", "images": ["images/placeholders/icon-1.svg","images/placeholders/icon-2.svg"], "enabled": true },
        { "type": "splitTextImage", "title": "Mascot", "content": "Маскот работает как узнаваемый персонаж и как носитель эмоциональной памяти бренда.", "image": "images/placeholders/mascot.svg", "enabled": true },
        { "type": "text", "title": "Website block", "content": "Сайт liveweeks оформлен как центральная digital-точка экосистемы.", "enabled": true },
        { "type": "text", "title": "AI styling / image generation workflow", "content": "Собственная модель используется для генерации изображений в узнаваемом стиле проекта, включая Telegram-форматы.", "enabled": true },
        { "type": "gallery", "title": "Physical applications", "images": ["images/placeholders/physical-1.svg","images/placeholders/physical-2.svg"], "enabled": true }
      ],
      "gallery": [],
      "videos": [],
      "notes": "Можно скрыть физический блок, AI-блок или сайт в редакторе без поломки кейса."
    },
    {
      "id": "case-gazgolder",
      "slug": "gazgolder",
      "visible": true,
      "featured": true,
      "status": "draft",
      "order": 4,
      "category": "artdirection",
      "title": "Gazgolder",
      "subtitle": "Визуальные материалы для культурной сцены",
      "year": "2026",
      "client": "Gazgolder",
      "role": "Дизайнер, участник визуальной подачи",
      "services": [
        "Визуальные материалы",
        "Медийная графика",
        "Merch-элементы"
      ],
      "summary": "Крупный культурный и музыкальный кейс: нейтральный редактируемый шаблон без выдуманных достижений и неуточнённых метрик.",
      "challenge": "Черновик. Нужно быстро дописать фактические детали после подтверждения объёма работ и роли.",
      "approach": "Секция построена как честный partially editable draft: можно менять текст, носители, галерею, блоки и статус публикации.",
      "outcome": "Готовый каркас кейса без сфабрикованных фактов — только безопасный placeholder для быстрой доработки.",
      "heroImage": "images/placeholders/gazgolder-hero.svg",
      "draftLabel": "частично готовый черновик",
      "sections": [
        { "type": "text", "title": "О проекте", "content": "Раздел intentionally оставлен нейтральным и не утверждает несказанные достижения. После уточнения кейс можно быстро наполнить через редактор." },
        { "type": "checklist", "title": "Что можно дописать позже", "items": ["Фактическую роль","Набор носителей","Изображения","Видео","Год и статус","Итоговую формулировку результата"] }
      ],
      "gallery": [],
      "videos": [],
      "notes": "Перед публикацией заменить placeholder-описания на подтверждённые факты."
    }
  ],
  "brandingProjects": [
    { "title": "Логотип Егор Жданович", "tags": ["Логотип","Айдентика"], "year": "2026", "linkedCase": null, "image": "images/placeholders/brand-1.svg" },
    { "title": "Консоль Киберклуб", "tags": ["Брендинг","Дизайн-система"], "year": "2026", "linkedCase": "case-cyberclub", "image": "images/placeholders/brand-2.svg" },
    { "title": "Три дня дождя", "tags": ["Мерч","Визуальная система"], "year": "2026", "linkedCase": "case-raindays", "image": "images/placeholders/brand-3.svg" },
    { "title": "Electroad", "tags": ["Брендинг"], "year": "2025", "linkedCase": null, "image": "images/placeholders/brand-4.svg" },
    { "title": "Gleb Kostin", "tags": ["Digital","Icon-система"], "year": "2026", "linkedCase": "case-glebkostin", "image": "images/placeholders/brand-5.svg" },
    { "title": "Telegram Noir", "tags": ["Визуальный язык"], "year": "2025", "linkedCase": null, "image": "images/placeholders/brand-6.svg" }
  ],
  "artDirectionProjects": [
    { "title": "Electroad", "role": "Арт-дирекшн / визуальное участие", "year": "2025", "image": "images/placeholders/art-1.svg" },
    { "title": "Консоль Киберклуб", "role": "Арт-директор", "year": "2026", "linkedCase": "case-cyberclub", "image": "images/placeholders/art-2.svg" },
    { "title": "Три дня дождя", "role": "Арт-директор", "year": "2026", "linkedCase": "case-raindays", "image": "images/placeholders/art-3.svg" },
    { "title": "Gleb Kostin", "role": "Арт-директор", "year": "2026", "linkedCase": "case-glebkostin", "image": "images/placeholders/art-4.svg" },
    { "title": "Elysium concept", "role": "Арт-дирекшн (черновик)", "year": "2025", "image": "images/placeholders/art-5.svg" }
  ],
  "socioVisualProjects": [
    { "title": "Визуальные системы влияния", "image": "images/placeholders/social-manifest.svg", "text": "**Визуальная плотность интерфейса** управляет скоростью принятия решений.\n\nПовторяющиеся графические паттерны повышают узнаваемость быстрее текста. Порядок предъявления визуальных элементов формирует иерархию доверия." }
  ],
  "drafts": [
    { "title": "Fadetaileur", "reason": "Проект приостановлен на этапе концепции", "year": "2025", "image": "images/placeholders/draft-1.svg" },
    { "title": "Платья супрематизм", "reason": "Не найден производственный партнёр", "year": "2025", "image": "images/placeholders/draft-2.svg" },
    { "title": "Мерч для Мелстроя", "reason": "Проект не вышел в производство", "year": "2024", "image": "images/placeholders/draft-3.svg" },
    { "title": "Сайт для Elysium", "reason": "Заморожен на этапе прототипа", "year": "2025", "image": "images/placeholders/draft-4.svg" }
  ],
  "creativeWorks": [
    { "title": "Пара постеров", "series": "Постеры", "year": "2026", "image": "images/placeholders/creative-1.svg", "youtubeUrl": "" },
    { "title": "Супрематизм / о бессмысле труда", "series": "Концептуальная серия", "year": "2025", "image": "images/placeholders/creative-2.svg", "youtubeUrl": "" },
    { "title": "Bulba", "series": "Графика", "year": "2025", "image": "images/placeholders/creative-3.svg", "youtubeUrl": "" },
    { "title": "PhoneCord", "series": "Объект / графика", "year": "2025", "image": "images/placeholders/creative-4.svg", "youtubeUrl": "" },
    { "title": "NADOENO", "series": "Серия", "year": "2024", "image": "images/placeholders/creative-5.svg", "youtubeUrl": "" },
    { "title": "Экспериментальная графика", "series": "Тесты", "year": "2024–2026", "image": "images/placeholders/creative-6.svg", "youtubeUrl": "" },
    { "title": "Архив визуальных тестов", "series": "Архив", "year": "2023–2026", "image": "images/placeholders/creative-7.svg", "youtubeUrl": "" }
  ],
  "about": {
    "heading": "Обо мне",
    "positioning": "Арт-директор с 5-летним опытом в креативной индустрии. Работал со стритвир-сценой Беларуси, крупными стримерами, музыкальными проектами и брендами. В работе опираюсь на исследование контекста, визуальную стратегию, культурные коды и глубокий ресерч. Меня интересует дизайн как инструмент влияния на мнение, эмоции, поведение и восприятие.",
    "photo": "images/placeholders/about-portrait.svg",
    "competenciesLabel": "Компетенции",
    "competencies": [
      "Арт-дирекшн",
      "Брендинг",
      "Визуальные системы",
      "Разработка концепций",
      "Визуальная стратегия",
      "Глубокий ресерч",
      "Визуальная коммуникация",
      "AI + автоматизация",
      "2D / 3D / web"
    ],
    "skillBlocksLabel": "Направления",
    "skillBlocks": [
      { "title": "Дизайн одежды", "note": "Коллекции, принты, производство" },
      { "title": "2D + 3D", "note": "Графика, рендер, композиция" },
      { "title": "Нейросети + автоматизация", "note": "AI-пайплайны, генерация, обучение моделей" },
      { "title": "Веб-дизайн", "note": "Интерфейсы, сайты, digital-продукты" }
    ],
    "experienceLabel": "Опыт",
    "experience": [
      { "period": "2021 — н.в.", "role": "Независимый арт-директор", "description": "Работа с музыкальными проектами, стритвир-брендами и цифровыми продуктами." },
      { "period": "2019 — 2021", "role": "Дизайнер / графика", "description": "Формирование визуальной практики и системного подхода." }
    ]
  },
  "contacts": {
    "heading": "Контакты",
    "email": "hello@n9tta.com",
    "telegram": "@n9tta",
    "location": "Москва / удалённо",
    "servicesLabel": "Услуги",
    "services": [
      "Арт-дирекшн",
      "Брендинг и дизайн-системы",
      "Digital-продукты",
      "Кампании и коммуникации",
      "Исследования и стратегия",
      "Кураторство визуальных проектов"
    ],
    "ctaLabel": "Написать"
  },
  "uiSettings": {
    "scanlines": true,
    "noise": true,
    "reducedMotionRespected": true
  }
  }));

  let persistTimer = null;
  let previewTimer = null;

  // persist — записать в localStorage (без перерисовки DOM). Ключ фикс потери фокуса:
  // ввод текста больше НЕ вызывает renderAll(), поэтому активное поле не пересоздаётся.
  function persist() {
    setStatus('saving');
    clearTimeout(persistTimer);
    persistTimer = setTimeout(() => {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(data, null, 2));
        setStatus('saved');
      } catch (e) {
        setStatus('error');
      }
      schedulePreviewReload();
    }, 220);
  }

  // saveLocal — совместимое имя для правок ТЕКСТА: только сохраняем, ничего не перерисовываем.
  function saveLocal() {
    persist();
  }

  // commit — для СТРУКТУРНЫХ действий (добавить/удалить/переместить/сменить тип):
  // сохранить и перерисовать только активную панель, а не все десять.
  function commit() {
    persist();
    renderActivePanel();
  }

  function renderActivePanel() {
    const fn = PANELS[activeTab];
    if (fn) fn();
  }

  function setStatus(state) {
    const el = document.getElementById('saveStatus');
    if (!el) return;
    const map = {
      saving: 'Сохранение…',
      saved: 'Сохранено локально',
      published: 'Опубликовано',
      error: 'Ошибка сохранения',
    };
    el.textContent = map[state] || '';
    el.dataset.state = state;
  }

  function schedulePreviewReload() {
    if (!document.body.classList.contains('preview-on')) return; // не трогаем скрытый iframe
    const frame = document.getElementById('livePreview');
    if (!frame) return;
    clearTimeout(previewTimer);
    previewTimer = setTimeout(() => {
      try { frame.contentWindow.location.reload(); } catch (e) { frame.src = frame.src; }
    }, 400);
  }

  function input(label, value, oninput, type = 'text', attrs = '') {
    return `<div class="field"><label>${esc(label)}</label><input type="${esc(type)}" value="${esc(value)}" data-bind="${esc(oninput)}" ${attrs}></div>`;
  }
  function textarea(label, value, oninput) {
    return `<div class="field"><label>${esc(label)}</label><textarea data-bind="${esc(oninput)}">${esc(value)}</textarea></div>`;
  }
  function select(label, value, path, options) {
    const opts = options.map((o) => `<option value="${esc(o.value)}" ${String(o.value) === String(value ?? '') ? 'selected' : ''}>${esc(o.label)}</option>`).join('');
    return `<div class="field"><label>${esc(label)}</label><select data-bind="${esc(path)}">${opts}</select></div>`;
  }
  // imageField — поле пути + миниатюра-превью + кнопка загрузки файла.
  function imageField(label, value, path) {
    const v = value || '';
    return `<div class="field img-field">
      <label>${esc(label)}</label>
      <div class="img-field__row">
        <div class="img-thumb" data-thumb>${thumbInner(v)}</div>
        <div class="img-field__ctrl">
          <input type="text" value="${esc(v)}" data-bind="${esc(path)}" data-image placeholder="images/…">
          <label class="small-btn img-upload">Загрузить<input type="file" accept="image/*" hidden data-upload="${esc(path)}"></label>
        </div>
      </div>
    </div>`;
  }
  function thumbInner(v) {
    if (v) return `<img src="${esc(v)}" alt="" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('img-thumb--empty')">`;
    return '';
  }

  function bindSimpleFields(scope = document) {
    $$('[data-bind]', scope).forEach((el) => {
      const handler = (e) => {
        const t = e.target;
        const path = t.getAttribute('data-bind');
        let val = t.value;
        if (t.dataset.type === 'array') {
          val = val.split(',').map((s) => s.trim()).filter(Boolean);
        }
        setByPath(data, path, val);
        if (t.hasAttribute('data-image')) updateThumb(t);
        saveLocal();
      };
      // input — для текста (без потери фокуса); change — гарантирует запись <select>
      // и срабатывает раньше data-refresh commit (обработчик навешан первым).
      el.addEventListener('input', handler);
      el.addEventListener('change', handler);
    });
    $$('[data-checked]', scope).forEach((el) => {
      el.addEventListener('change', (e) => {
        const path = e.target.getAttribute('data-checked');
        setByPath(data, path, e.target.checked);
        if (e.target.hasAttribute('data-refresh')) commit(); else saveLocal();
      });
    });
    // data-refresh: перерисовать активную панель ПОСЛЕ blur/выбора (не на каждую клавишу),
    // чтобы обновились подписи (пилюли кейсов) и тип-зависимые редакторы секций.
    $$('[data-refresh]', scope).forEach((el) => {
      if (el.hasAttribute('data-checked')) return; // уже обработан выше
      el.addEventListener('change', () => commit());
    });
    bindUploads(scope);
  }

  function updateThumb(inputEl) {
    const wrap = inputEl.closest('.img-field');
    const thumb = wrap && wrap.querySelector('[data-thumb]');
    if (!thumb) return;
    thumb.classList.remove('img-thumb--empty');
    thumb.innerHTML = thumbInner(inputEl.value);
  }

  const PW_KEY = 'n9tta_admin_pw';
  function getAdminPassword(force) {
    let p = sessionStorage.getItem(PW_KEY);
    if (p && !force) return p;
    p = prompt('Введите пароль администратора:');
    if (p) sessionStorage.setItem(PW_KEY, p);
    return p;
  }

  function bindUploads(scope = document) {
    $$('[data-upload]', scope).forEach((inp) => {
      inp.addEventListener('change', async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const path = inp.getAttribute('data-upload');
        const labelBtn = inp.closest('.img-upload');
        const textNode = labelBtn && labelBtn.firstChild;
        const orig = textNode ? textNode.textContent : 'Загрузить';
        if (textNode) textNode.textContent = 'Загрузка…';
        try {
          const prepared = await prepareImage(file);
          const result = await uploadImage(prepared, file.name);
          setByPath(data, path, result.path);
          persist();
          renderActivePanel();
        } catch (err) {
          alert('Ошибка загрузки: ' + (err && err.message ? err.message : err));
        } finally {
          if (textNode) textNode.textContent = orig;
          inp.value = '';
        }
      });
    });
  }

  // Клиентская подготовка: SVG — как есть; растр — уменьшаем до <=2000px и жмём в webp/jpeg,
  // чтобы уложиться в лимит тела Vercel (~4.5 МБ).
  function prepareImage(file) {
    return new Promise((resolve, reject) => {
      if (file.type === 'image/svg+xml' || /\.svg$/i.test(file.name)) {
        const r = new FileReader();
        r.onload = () => resolve({ dataBase64: btoa(unescape(encodeURIComponent(r.result))), contentType: 'image/svg+xml', ext: 'svg' });
        r.onerror = () => reject(new Error('не удалось прочитать файл'));
        r.readAsText(file);
        return;
      }
      const r = new FileReader();
      r.onload = () => {
        const img = new Image();
        img.onload = () => {
          const max = 2000;
          let { width, height } = img;
          if (width > max || height > max) {
            const s = Math.min(max / width, max / height);
            width = Math.round(width * s);
            height = Math.round(height * s);
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          let mime = 'image/webp';
          let dataUrl = canvas.toDataURL(mime, 0.85);
          if (dataUrl.indexOf('data:image/webp') !== 0) {
            mime = 'image/jpeg';
            dataUrl = canvas.toDataURL(mime, 0.85);
          }
          resolve({ dataBase64: dataUrl.split(',')[1], contentType: mime, ext: mime === 'image/webp' ? 'webp' : 'jpg' });
        };
        img.onerror = () => reject(new Error('не удалось декодировать изображение'));
        img.src = r.result;
      };
      r.onerror = () => reject(new Error('не удалось прочитать файл'));
      r.readAsDataURL(file);
    });
  }

  async function uploadImage(prepared, originalName) {
    const password = getAdminPassword();
    if (!password) throw new Error('нужен пароль');
    const slug = (originalName || 'image')
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'image';
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: `${Date.now()}-${slug}.${prepared.ext}`,
        dataBase64: prepared.dataBase64,
        contentType: prepared.contentType,
        password,
      }),
    });
    if (res.status === 401) {
      sessionStorage.removeItem(PW_KEY);
      throw new Error('неверный пароль');
    }
    const result = await res.json().catch(() => ({}));
    if (!res.ok || !result.path) throw new Error(result.error || 'сервер отклонил загрузку');
    return result;
  }

  function setByPath(obj, path, value) {
    const keys = path.split('.');
    let ref = obj;
    while (keys.length > 1) ref = ref[keys.shift()];
    ref[keys[0]] = value;
  }

  function overviewPanel() {
    const cases = data.cases || [];
    const total = cases.length;
    const visible = cases.filter((c) => c.visible).length;
    const featured = cases.filter((c) => c.featured).length;
    const drafts = cases.filter((c) => c.status === 'draft').length;
    $('#panel-overview').innerHTML = `
      <div class="admin-card">
        <h3>Обзор архива</h3>
        <div class="admin-grid cols-3">
          <div class="contact-box"><h5>Всего кейсов</h5><p>${total}</p></div>
          <div class="contact-box"><h5>Видимых кейсов</h5><p>${visible}</p></div>
          <div class="contact-box"><h5>Избранных кейсов</h5><p>${featured}</p></div>
        </div>
        <p class="import-note">Черновиков: ${drafts}. Локальные изменения сохраняются в браузере и сразу применяются на сайте. Для переноса на хостинг экспортируйте JSON и замените файл <code>content/content.json</code> на сервере.</p>
      </div>
      <div class="admin-card">
        <h3>Как редактировать</h3>
        <div class="repeater">
          <div class="repeater-item">1. Изменяйте поля в нужных разделах.</div>
          <div class="repeater-item">2. Правки автоматически сохраняются в localStorage.</div>
          <div class="repeater-item">3. Нажмите «Экспорт JSON», чтобы получить обновлённый контент-пак.</div>
          <div class="repeater-item">4. Подмените им файл <code>content/content.json</code> на хостинге или в локальной папке.</div>
        </div>
      </div>`;
  }

  function heroPanel() {
    const h = data.hero;
    $('#panel-hero').innerHTML = `
      <div class="admin-card">
        <h3>Главный экран</h3>
        ${input('Надстрочник', h.eyebrow, 'hero.eyebrow')}
        ${textarea('Подзаголовок', h.subtitle, 'hero.subtitle')}
        ${input('Метка ролей', h.rolesLabel, 'hero.rolesLabel')}
        ${input('Метка дисциплин', h.disciplinesLabel, 'hero.disciplinesLabel')}
      </div>
      <div class="admin-card">
        <h3>Строки заголовка</h3>
        <div class="repeater" id="heroLines"></div>
        <button class="small-btn" id="addHeroLine">Добавить строку</button>
      </div>
      <div class="admin-card">
        <h3>Дисциплины</h3>
        <div class="repeater" id="heroDisciplines"></div>
        <button class="small-btn" id="addDiscipline">Добавить дисциплину</button>
      </div>`;
    renderStringRepeater('#heroLines', data.hero.titleLines, 'hero.titleLines');
    renderStringRepeater('#heroDisciplines', data.hero.disciplines, 'hero.disciplines');
    $('#addHeroLine').onclick = () => { data.hero.titleLines.push('Новая строка'); commit(); };
    $('#addDiscipline').onclick = () => { data.hero.disciplines.push('Новая дисциплина'); commit(); };
    bindSimpleFields($('#panel-hero'));
  }

  function introPanel() {
    const it = data.intro;
    if (!it) { $('#panel-intro').innerHTML = '<div class="admin-card"><p>Раздел «Знакомство» не найден в контенте.</p></div>'; return; }
    const m = it.manifesto || (it.manifesto = {});
    $('#panel-intro').innerHTML = `
      <div class="admin-card">
        <h3>Знакомство / профайл</h3>
        ${input('Заголовок секции', it.heading, 'intro.heading')}
        ${input('Надстрочник', it.eyebrow, 'intro.eyebrow')}
        ${imageField('Фото', it.photo, 'intro.photo')}
        ${textarea('Лид (кто ты — 2-3 предложения)', it.lead, 'intro.lead')}
      </div>
      <div class="admin-card">
        <h3>Факты досье</h3>
        <div class="repeater" id="introFacts"></div>
        <button class="small-btn" id="addIntroFact">+ Факт</button>
      </div>
      <div class="admin-card">
        <h3>Манифест</h3>
        ${input('Заголовок манифеста', m.title || '', 'intro.manifesto.title')}
        ${textarea('Текст манифеста (markdown: ### подзаголовки, **жирный**)', m.body || '', 'intro.manifesto.body')}
        ${input('Подпись в конце', m.signature || '', 'intro.manifesto.signature')}
        <p class="import-note">На сайте манифест показывается свёрнутым с кнопкой «Читать полностью», чтобы кейсы оставались близко.</p>
      </div>`;
    renderObjectRepeater('#introFacts', it.facts = it.facts || [], 'intro.facts', ['label', 'value']);
    $('#addIntroFact').onclick = () => { it.facts.push({ label: 'Параметр', value: 'Значение' }); commit(); };
    bindSimpleFields($('#panel-intro'));
  }

  function renderStringRepeater(sel, arr, path) {
    const root = $(sel);
    root.innerHTML = arr.map((item, i) => `
      <div class="repeater-item">
        <div class="repeater-row">
          <input value="${esc(item)}" data-repeater="${esc(path)}" data-index="${i}">
          <button class="small-btn" data-remove="${esc(path)}" data-index="${i}">Удалить</button>
          <button class="small-btn" data-move="up" data-path="${esc(path)}" data-index="${i}">↑</button>
          <button class="small-btn" data-move="down" data-path="${esc(path)}" data-index="${i}">↓</button>
        </div>
      </div>`).join('');
    $$('input[data-repeater]', root).forEach((el) => {
      el.oninput = (e) => {
        const list = getByPath(data, e.target.dataset.repeater);
        list[Number(e.target.dataset.index)] = e.target.value;
        saveLocal();
      };
    });
    $$('[data-remove]', root).forEach((btn) => btn.onclick = () => {
      const list = getByPath(data, btn.dataset.remove);
      list.splice(Number(btn.dataset.index), 1);
      commit();
    });
    $$('[data-move]', root).forEach((btn) => btn.onclick = () => {
      moveInArray(getByPath(data, btn.dataset.path), Number(btn.dataset.index), btn.dataset.move === 'up' ? -1 : 1);
      commit();
    });
  }

  function getByPath(obj, path) {
    return path.split('.').reduce((acc, key) => acc[key], obj);
  }

  function moveInArray(arr, index, delta) {
    const next = index + delta;
    if (next < 0 || next >= arr.length) return;
    [arr[index], arr[next]] = [arr[next], arr[index]];
  }

  function casesPanel() {
    if (!activeCaseId) activeCaseId = data.cases[0]?.id || null;
    const current = data.cases.find((c) => c.id === activeCaseId) || data.cases[0];
    if (current) activeCaseId = current.id;
    const q = caseSearch.trim().toLowerCase();
    const filtered = q
      ? data.cases.filter((c) => `${c.title} ${c.client} ${c.category} ${c.year}`.toLowerCase().includes(q))
      : data.cases;
    $('#panel-cases').innerHTML = `
      <div class="admin-card">
        <div class="admin-toolbar">
          <button class="small-btn" id="addCase">+ Добавить кейс</button>
          <button class="small-btn" id="duplicateCase">Дублировать</button>
          <button class="small-btn" id="deleteCase">Удалить</button>
        </div>
        <div class="field case-search">
          <input type="search" id="caseSearchInput" placeholder="Поиск по кейсам…" value="${esc(caseSearch)}">
        </div>
        <div class="case-list">${filtered.map((c) => `
          <button class="case-item ${c.id === activeCaseId ? 'active' : ''}" data-case-select="${esc(c.id)}">
            <div class="case-head">
              <div>
                <h4>${esc(c.title)}</h4>
                <div class="note">${esc(c.client || 'Без клиента')} / ${esc(c.year || '—')}</div>
              </div>
              <div class="case-pills">
                ${c.status === 'draft' ? '<span class="status-pill pill-draft">draft</span>' : ''}
                ${c.featured ? '<span class="status-pill pill-featured">featured</span>' : ''}
                ${c.visible ? '<span class="status-pill">visible</span>' : '<span class="status-pill pill-hidden">hidden</span>'}
              </div>
            </div>
          </button>`).join('') || '<div class="empty-state">Ничего не найдено</div>'}</div>
      </div>
      ${current ? caseEditor(current) : '<div class="admin-card"><p>Нет кейсов</p></div>'}`;

    $$('[data-case-select]').forEach((btn) => btn.onclick = () => { activeCaseId = btn.dataset.caseSelect; renderActivePanel(); });
    const searchInput = $('#caseSearchInput');
    if (searchInput) searchInput.oninput = (e) => {
      caseSearch = e.target.value;
      const pos = e.target.selectionStart;
      renderActivePanel();
      const again = $('#caseSearchInput');
      if (again) { again.focus(); again.setSelectionRange(pos, pos); }
    };
    $('#addCase').onclick = addCase;
    $('#duplicateCase').onclick = duplicateCase;
    $('#deleteCase').onclick = deleteCase;
    bindCaseEditor(current);
  }

  function caseEditor(c) {
    return `
      <div class="admin-card">
        <h3>Кейс: ${esc(c.title)}</h3>
        <div class="admin-grid">
          ${input('ID', c.id, `cases.${idx(c.id)}.id`)}
          ${input('Slug', c.slug, `cases.${idx(c.id)}.slug`)}
          ${input('Название', c.title, `cases.${idx(c.id)}.title`, 'text', 'data-refresh')}
          ${input('Подзаголовок', c.subtitle, `cases.${idx(c.id)}.subtitle`)}
          ${input('Год', c.year, `cases.${idx(c.id)}.year`, 'text', 'data-refresh')}
          ${input('Клиент', c.client, `cases.${idx(c.id)}.client`, 'text', 'data-refresh')}
          ${select('Категория', c.category, `cases.${idx(c.id)}.category`, categoryOptions())}
          ${input('Роль', c.role, `cases.${idx(c.id)}.role`)}
          ${select('Статус', c.status, `cases.${idx(c.id)}.status`, STATUS_OPTIONS)}
        </div>
        ${imageField('Обложка кейса', c.heroImage, `cases.${idx(c.id)}.heroImage`)}
        ${textarea('Краткое описание', c.summary, `cases.${idx(c.id)}.summary`)}
        ${textarea('Задача', c.challenge, `cases.${idx(c.id)}.challenge`)}
        ${textarea('Подход', c.approach, `cases.${idx(c.id)}.approach`)}
        ${textarea('Результат / рефлексия', c.outcome, `cases.${idx(c.id)}.outcome`)}
        ${textarea('Заметка', c.notes || '', `cases.${idx(c.id)}.notes`)}
        <div class="switch"><input type="checkbox" ${c.visible ? 'checked' : ''} data-checked="cases.${idx(c.id)}.visible" data-refresh><span>Показывать кейс</span></div>
        <div class="switch"><input type="checkbox" ${c.featured ? 'checked' : ''} data-checked="cases.${idx(c.id)}.featured" data-refresh><span>Показывать в featured</span></div>
      </div>
      <div class="admin-card">
        <h3>Услуги</h3>
        <div class="repeater" id="caseServices"></div>
        <button class="small-btn" id="addCaseService">Добавить услугу</button>
      </div>
      <div class="admin-card">
        <h3>Секции кейса</h3>
        <div class="admin-toolbar">
          <button class="small-btn" id="addTextSection">Текст</button>
          <button class="small-btn" id="addGallerySection">Галерея</button>
          <button class="small-btn" id="addSplitSection">Текст + изображение</button>
          <button class="small-btn" id="addMetricSection">Показатели</button>
        </div>
        <div id="caseSections"></div>
      </div>`;
  }

  function idx(caseId) {
    return data.cases.findIndex((x) => x.id === caseId);
  }

  function bindCaseEditor(c) {
    if (!c) return;
    renderStringRepeater('#caseServices', c.services || [], `cases.${idx(c.id)}.services`);
    $('#addCaseService').onclick = () => { c.services = c.services || []; c.services.push('Новая услуга'); commit(); };
    renderCaseSections(c);
    $('#addTextSection').onclick = () => { c.sections.push({ type: 'text', title: 'Новый текстовый блок', content: 'Текст секции' }); commit(); };
    $('#addGallerySection').onclick = () => { c.sections.push({ type: 'gallery', title: 'Новая галерея', images: ['images/placeholders/gallery-1.svg'] }); commit(); };
    $('#addSplitSection').onclick = () => { c.sections.push({ type: 'splitTextImage', title: 'Новый split-блок', content: 'Описание блока', image: 'images/placeholders/section.svg' }); commit(); };
    $('#addMetricSection').onclick = () => { c.sections.push({ type: 'metricRow', title: 'Показатели', items: [{ label: 'Параметр', value: 'Значение' }] }); commit(); };
    bindSimpleFields($('#panel-cases'));
  }

  function renderCaseSections(c) {
    const root = $('#caseSections');
    root.innerHTML = c.sections.map((sec, i) => {
      const base = `cases.${idx(c.id)}.sections.${i}`;
      const typeLabel = (SECTION_TYPE_OPTIONS.find((o) => o.value === sec.type) || {}).label || sec.type;
      const common = `
        <div class="section-item__head">
          <span class="section-item__badge">${esc(typeLabel)}</span>
          <div class="admin-toolbar">
            <button class="small-btn" data-sec-move="up" data-index="${i}">↑</button>
            <button class="small-btn" data-sec-move="down" data-index="${i}">↓</button>
            <button class="small-btn danger" data-sec-remove="${i}">Удалить</button>
          </div>
        </div>
        <div class="admin-grid">
          ${select('Тип секции', sec.type, `${base}.type`, SECTION_TYPE_OPTIONS).replace('data-bind', 'data-refresh data-bind')}
          ${input('Заголовок', sec.title || '', `${base}.title`)}
        </div>
        <div class="switch"><input type="checkbox" ${sec.enabled === false ? '' : 'checked'} data-checked="${base}.enabled"><span>Секция включена</span></div>`;
      return `<div class="section-item">${common}${sectionBody(sec, base, i)}</div>`;
    }).join('') || '<div class="empty-state">Секций пока нет — добавьте выше</div>';

    $$('[data-sec-remove]').forEach((btn) => btn.onclick = () => { c.sections.splice(Number(btn.dataset.secRemove), 1); commit(); });
    $$('[data-sec-move]').forEach((btn) => btn.onclick = () => { moveInArray(c.sections, Number(btn.dataset.index), btn.dataset.secMove === 'up' ? -1 : 1); commit(); });
    $$('[data-add-image]').forEach((btn) => btn.onclick = () => { const sec = c.sections[Number(btn.dataset.addImage)]; sec.images = sec.images || []; sec.images.push(''); commit(); });
    $$('[data-add-metric]').forEach((btn) => btn.onclick = () => { const sec = c.sections[Number(btn.dataset.addMetric)]; sec.items = sec.items || []; sec.items.push({ label: 'Новый параметр', value: 'Значение' }); commit(); });
    $$('[data-add-step]').forEach((btn) => btn.onclick = () => { const sec = c.sections[Number(btn.dataset.addStep)]; sec.items = sec.items || []; sec.items.push({ step: 'Этап', text: 'Описание' }); commit(); });
    $$('[data-add-check]').forEach((btn) => btn.onclick = () => { const sec = c.sections[Number(btn.dataset.addCheck)]; sec.items = sec.items || []; sec.items.push('Новый пункт'); commit(); });

    c.sections.forEach((sec, i) => {
      if (sec.type === 'gallery' || sec.type === 'imageGrid') renderGalleryRepeater(c, sec, i);
      if (sec.type === 'metricRow') renderMetricRepeater(c, sec, i);
      if (sec.type === 'processTimeline') renderTimelineRepeater(c, sec, i);
      if (sec.type === 'checklist') renderChecklistRepeater(c, sec, i);
    });
    bindSimpleFields(root);
  }

  // Редактор тела секции — свой набор полей под каждый из 11 типов, что умеет рисовать main.js.
  function sectionBody(sec, base, i) {
    switch (sec.type) {
      case 'text':
      case 'quote':
        return textarea('Контент (markdown)', sec.content || '', `${base}.content`);
      case 'image':
        return imageField('Изображение', sec.image || '', `${base}.image`);
      case 'splitTextImage':
        return textarea('Контент (markdown)', sec.content || '', `${base}.content`) + imageField('Изображение', sec.image || '', `${base}.image`);
      case 'gallery':
      case 'imageGrid':
        return `<div class="repeater" data-gallery-root="${i}"></div><button class="small-btn" data-add-image="${i}">+ Изображение</button>`;
      case 'metricRow':
        return `<div class="repeater" data-metric-root="${i}"></div><button class="small-btn" data-add-metric="${i}">+ Показатель</button>`;
      case 'processTimeline':
        return `<div class="repeater" data-timeline-root="${i}"></div><button class="small-btn" data-add-step="${i}">+ Этап</button>`;
      case 'checklist':
        return `<div class="repeater" data-checklist-root="${i}"></div><button class="small-btn" data-add-check="${i}">+ Пункт</button>`;
      case 'video':
        return input('Embed URL (YouTube/Vimeo embed)', sec.url || '', `${base}.url`);
      case 'beforeAfter':
        return `<div class="admin-grid">${imageField('До', sec.before || '', `${base}.before`)}${imageField('После', sec.after || '', `${base}.after`)}</div>`;
      default:
        return '';
    }
  }

  function renderGalleryRepeater(c, sec, i) {
    const root = $(`[data-gallery-root="${i}"]`);
    const base = `cases.${idx(c.id)}.sections.${i}.images`;
    root.innerHTML = (sec.images || []).map((img, imgIndex) => `
      <div class="repeater-item">
        ${imageField(`Изображение ${imgIndex + 1}`, img, `${base}.${imgIndex}`)}
        <button class="small-btn danger" data-gallery-remove="${i}" data-gallery-index="${imgIndex}">Удалить</button>
      </div>`).join('');
    $$('[data-gallery-remove]', root).forEach((btn) => btn.onclick = () => { sec.images.splice(Number(btn.dataset.galleryIndex), 1); commit(); });
    bindSimpleFields(root);
  }

  function renderMetricRepeater(c, sec, i) {
    const root = $(`[data-metric-root="${i}"]`);
    root.innerHTML = (sec.items || []).map((it, itemIndex) => `
      <div class="repeater-item">
        <div class="field"><label>Название</label><input value="${esc(it.label)}" data-metric-label="${i}" data-metric-index="${itemIndex}"></div>
        <div class="field"><label>Значение</label><input value="${esc(it.value)}" data-metric-value="${i}" data-metric-index="${itemIndex}"></div>
        <button class="small-btn danger" data-metric-remove="${i}" data-metric-index="${itemIndex}">Удалить</button>
      </div>`).join('');
    $$('[data-metric-label]', root).forEach((el) => el.oninput = () => { sec.items[Number(el.dataset.metricIndex)].label = el.value; saveLocal(); });
    $$('[data-metric-value]', root).forEach((el) => el.oninput = () => { sec.items[Number(el.dataset.metricIndex)].value = el.value; saveLocal(); });
    $$('[data-metric-remove]', root).forEach((btn) => btn.onclick = () => { sec.items.splice(Number(btn.dataset.metricIndex), 1); commit(); });
  }

  function renderTimelineRepeater(c, sec, i) {
    const root = $(`[data-timeline-root="${i}"]`);
    root.innerHTML = (sec.items || []).map((it, itemIndex) => `
      <div class="repeater-item">
        <div class="field"><label>Этап</label><input value="${esc(it.step || '')}" data-tl-step="${i}" data-tl-index="${itemIndex}"></div>
        <div class="field"><label>Описание</label><input value="${esc(it.text || '')}" data-tl-text="${i}" data-tl-index="${itemIndex}"></div>
        <button class="small-btn danger" data-tl-remove="${i}" data-tl-index="${itemIndex}">Удалить</button>
      </div>`).join('');
    $$('[data-tl-step]', root).forEach((el) => el.oninput = () => { sec.items[Number(el.dataset.tlIndex)].step = el.value; saveLocal(); });
    $$('[data-tl-text]', root).forEach((el) => el.oninput = () => { sec.items[Number(el.dataset.tlIndex)].text = el.value; saveLocal(); });
    $$('[data-tl-remove]', root).forEach((btn) => btn.onclick = () => { sec.items.splice(Number(btn.dataset.tlIndex), 1); commit(); });
  }

  function renderChecklistRepeater(c, sec, i) {
    const root = $(`[data-checklist-root="${i}"]`);
    root.innerHTML = (sec.items || []).map((it, itemIndex) => `
      <div class="repeater-item">
        <div class="repeater-row">
          <input value="${esc(it)}" data-check-input="${i}" data-check-index="${itemIndex}">
          <button class="small-btn danger" data-check-remove="${i}" data-check-index="${itemIndex}">Удалить</button>
        </div>
      </div>`).join('');
    $$('[data-check-input]', root).forEach((el) => el.oninput = () => { sec.items[Number(el.dataset.checkIndex)] = el.value; saveLocal(); });
    $$('[data-check-remove]', root).forEach((btn) => btn.onclick = () => { sec.items.splice(Number(btn.dataset.checkIndex), 1); commit(); });
  }

  function sectionsPanel() {
    const s = data.siteSettings.sectionsEnabled;
    $('#panel-sections').innerHTML = `
      <div class="admin-card">
        <h3>Управление разделами</h3>
        ${Object.keys(s).map((key) => `<div class="switch"><input type="checkbox" ${s[key] ? 'checked' : ''} data-checked="siteSettings.sectionsEnabled.${key}"><span>${esc(key)}</span></div>`).join('')}
      </div>
      <div class="admin-card">
        <h3>Брендинг и дизайн-системы</h3>
        <div class="repeater" id="brandingList"></div>
        <button class="small-btn" id="addBrandingItem">Добавить проект</button>
      </div>
      <div class="admin-card">
        <h3>Арт-дирекшн</h3>
        <div class="repeater" id="artDirectionList"></div>
        <button class="small-btn" id="addArtDirectionItem">Добавить проект</button>
      </div>`;
    renderArchiveRepeater('#brandingList', data.brandingProjects, 'brandingProjects', ['title', 'tags', 'year', 'linkedCase', 'image']);
    renderArchiveRepeater('#artDirectionList', data.artDirectionProjects, 'artDirectionProjects', ['title', 'role', 'year', 'linkedCase', 'image']);
    $('#addBrandingItem').onclick = () => { data.brandingProjects.push({ title: 'Новый проект', tags: ['Тег'], year: '2026', linkedCase: null, image: '' }); commit(); };
    $('#addArtDirectionItem').onclick = () => { data.artDirectionProjects.push({ title: 'Новый проект', role: 'Роль', year: '2026', linkedCase: null, image: '' }); commit(); };
    bindSimpleFields($('#panel-sections'));
  }

  function socioPanel() {
    const root = $('#panel-socio');
    root.innerHTML = `
      <div class="admin-card">
        <h3>Социовизуальные проекты</h3>
        <div class="repeater" id="socioList"></div>
        <button class="small-btn" id="addSocioItem">Добавить проект</button>
      </div>`;
    renderSocioRepeater('#socioList', data.socioVisualProjects, 'socioVisualProjects');
    $('#addSocioItem').onclick = () => { data.socioVisualProjects.push({ title: 'Новый проект', image: '', text: 'Описание проекта.' }); commit(); };
  }

  function draftsPanel() {
    const root = $('#panel-drafts');
    root.innerHTML = `
      <div class="admin-card">
        <h3>Черновики</h3>
        <div class="repeater" id="draftsList"></div>
        <button class="small-btn" id="addDraftItem">Добавить черновик</button>
      </div>`;
    renderDraftsRepeater('#draftsList', data.drafts, 'drafts');
    $('#addDraftItem').onclick = () => { data.drafts.push({ title: 'Новый черновик', reason: 'Причина', year: '2026', image: '' }); commit(); };
  }

  function creativePanel() {
    const root = $('#panel-creative');
    root.innerHTML = `
      <div class="admin-card">
        <h3>Креативные работы</h3>
        <div class="repeater" id="creativeList"></div>
        <button class="small-btn" id="addCreativeItem">Добавить работу</button>
      </div>`;
    renderCreativeRepeater('#creativeList', data.creativeWorks, 'creativeWorks');
    $('#addCreativeItem').onclick = () => { data.creativeWorks.push({ title: 'Новая работа', series: 'Серия', year: '2026', image: '', youtubeUrl: '' }); commit(); };
  }

  function renderSocioRepeater(sel, arr, path) {
    const root = $(sel);
    root.innerHTML = arr.map((item, i) => `
      <div class="repeater-item">
        <div class="field"><label>Название</label><input value="${esc(item.title || '')}" data-bind="${path}.${i}.title"></div>
        ${imageField('Изображение', item.image || '', `${path}.${i}.image`)}
        <div class="field"><label>Текст (markdown)</label><textarea data-bind="${path}.${i}.text">${esc(item.text || '')}</textarea></div>
        <div class="admin-toolbar"><button class="small-btn" data-object-move="up" data-path="${path}" data-index="${i}">↑</button><button class="small-btn" data-object-move="down" data-path="${path}" data-index="${i}">↓</button><button class="small-btn danger" data-object-remove="${path}" data-index="${i}">Удалить</button></div>
      </div>`).join('');
    bindSimpleFields(root);
    $$('[data-object-move]', root).forEach((btn) => btn.onclick = () => { moveInArray(getByPath(data, btn.dataset.path), Number(btn.dataset.index), btn.dataset.objectMove === 'up' ? -1 : 1); commit(); });
    $$('[data-object-remove]', root).forEach((btn) => btn.onclick = () => { getByPath(data, btn.dataset.objectRemove).splice(Number(btn.dataset.index), 1); commit(); });
  }

  function renderDraftsRepeater(sel, arr, path) {
    const root = $(sel);
    root.innerHTML = arr.map((item, i) => `
      <div class="repeater-item">
        <div class="field"><label>Название</label><input value="${esc(item.title || '')}" data-bind="${path}.${i}.title"></div>
        <div class="field"><label>Причина</label><input value="${esc(item.reason || '')}" data-bind="${path}.${i}.reason"></div>
        <div class="field"><label>Год</label><input value="${esc(item.year || '')}" data-bind="${path}.${i}.year"></div>
        ${imageField('Изображение', item.image || '', `${path}.${i}.image`)}
        <div class="admin-toolbar"><button class="small-btn" data-object-move="up" data-path="${path}" data-index="${i}">↑</button><button class="small-btn" data-object-move="down" data-path="${path}" data-index="${i}">↓</button><button class="small-btn danger" data-object-remove="${path}" data-index="${i}">Удалить</button></div>
      </div>`).join('');
    bindSimpleFields(root);
    $$('[data-object-move]', root).forEach((btn) => btn.onclick = () => { moveInArray(getByPath(data, btn.dataset.path), Number(btn.dataset.index), btn.dataset.objectMove === 'up' ? -1 : 1); commit(); });
    $$('[data-object-remove]', root).forEach((btn) => btn.onclick = () => { getByPath(data, btn.dataset.objectRemove).splice(Number(btn.dataset.index), 1); commit(); });
  }

  function renderCreativeRepeater(sel, arr, path) {
    const root = $(sel);
    root.innerHTML = arr.map((item, i) => `
      <div class="repeater-item">
        <div class="field"><label>Название</label><input value="${esc(item.title || '')}" data-bind="${path}.${i}.title"></div>
        <div class="field"><label>Серия</label><input value="${esc(item.series || '')}" data-bind="${path}.${i}.series"></div>
        <div class="field"><label>Год</label><input value="${esc(item.year || '')}" data-bind="${path}.${i}.year"></div>
        ${imageField('Изображение', item.image || '', `${path}.${i}.image`)}
        <div class="field"><label>YouTube URL</label><input value="${esc(item.youtubeUrl || '')}" data-bind="${path}.${i}.youtubeUrl"></div>
        <div class="admin-toolbar"><button class="small-btn" data-object-move="up" data-path="${path}" data-index="${i}">↑</button><button class="small-btn" data-object-move="down" data-path="${path}" data-index="${i}">↓</button><button class="small-btn danger" data-object-remove="${path}" data-index="${i}">Удалить</button></div>
      </div>`).join('');
    bindSimpleFields(root);
    $$('[data-object-move]', root).forEach((btn) => btn.onclick = () => { moveInArray(getByPath(data, btn.dataset.path), Number(btn.dataset.index), btn.dataset.objectMove === 'up' ? -1 : 1); commit(); });
    $$('[data-object-remove]', root).forEach((btn) => btn.onclick = () => { getByPath(data, btn.dataset.objectRemove).splice(Number(btn.dataset.index), 1); commit(); });
  }

  const FIELD_LABELS = { title: 'Название', tags: 'Теги (через запятую)', role: 'Роль', year: 'Год', linkedCase: 'Связанный кейс', image: 'Изображение' };
  function renderArchiveRepeater(sel, arr, path, fields) {
    const root = $(sel);
    root.innerHTML = arr.map((item, i) => `
      <div class="repeater-item">
        ${fields.map((f) => {
          const val = item[f];
          const fieldPath = `${path}.${i}.${f}`;
          const label = FIELD_LABELS[f] || f;
          if (f === 'image') return imageField(label, val || '', fieldPath);
          if (f === 'linkedCase') return select(label, val || '', fieldPath, caseLinkOptions());
          const isArr = Array.isArray(val);
          if (isArr) return `<div class="field"><label>${esc(label)}</label><textarea data-type="array" rows="2" data-bind="${fieldPath}">${esc((val || []).join(', '))}</textarea></div>`;
          return `<div class="field"><label>${esc(label)}</label><input type="text" value="${esc(val || '')}" data-bind="${fieldPath}"></div>`;
        }).join('')}
        <div class="admin-toolbar"><button class="small-btn" data-archive-move="up" data-path="${path}" data-index="${i}">↑</button><button class="small-btn" data-archive-move="down" data-path="${path}" data-index="${i}">↓</button><button class="small-btn danger" data-archive-remove="${path}" data-index="${i}">Удалить</button></div>
      </div>`).join('');
    $$('[data-archive-move]', root).forEach((btn) => btn.onclick = () => { moveInArray(getByPath(data, btn.dataset.path), Number(btn.dataset.index), btn.dataset.archiveMove === 'up' ? -1 : 1); commit(); });
    $$('[data-archive-remove]', root).forEach((btn) => btn.onclick = () => { getByPath(data, btn.dataset.archiveRemove).splice(Number(btn.dataset.index), 1); commit(); });
    bindSimpleFields(root);
  }

  function aboutPanel() {
    const a = data.about;
    $('#panel-about').innerHTML = `
      <div class="admin-card">
        <h3>Обо мне</h3>
        ${input('Заголовок', a.heading, 'about.heading')}
        ${imageField('Портрет', a.photo, 'about.photo')}
        ${textarea('Позиционирование', a.positioning, 'about.positioning')}
        ${input('Метка компетенций', a.competenciesLabel, 'about.competenciesLabel')}
        ${input('Метка опыта', a.experienceLabel, 'about.experienceLabel')}
        ${input('Метка направлений', a.skillBlocksLabel, 'about.skillBlocksLabel')}
      </div>
      <div class="admin-card">
        <h3>Компетенции</h3>
        <div class="repeater" id="competenciesList"></div>
        <button class="small-btn" id="addCompetency">Добавить компетенцию</button>
      </div>
      <div class="admin-card">
        <h3>Направления</h3>
        <div class="repeater" id="skillBlocksList"></div>
        <button class="small-btn" id="addSkillBlock">Добавить блок</button>
      </div>`;
    renderStringRepeater('#competenciesList', a.competencies, 'about.competencies');
    renderObjectRepeater('#skillBlocksList', a.skillBlocks, 'about.skillBlocks', ['title', 'note']);
    $('#addCompetency').onclick = () => { a.competencies.push('Новая компетенция'); commit(); };
    $('#addSkillBlock').onclick = () => { a.skillBlocks.push({ title: 'Новый блок', note: 'Описание' }); commit(); };
    bindSimpleFields($('#panel-about'));
  }

  function renderObjectRepeater(sel, arr, path, keys) {
    const root = $(sel);
    root.innerHTML = arr.map((item, i) => `
      <div class="repeater-item">
        ${keys.map((k) => `<div class="field"><label>${esc(k)}</label><input value="${esc(item[k] || '')}" data-bind="${path}.${i}.${k}"></div>`).join('')}
        <div class="admin-toolbar"><button class="small-btn" data-object-move="up" data-path="${path}" data-index="${i}">↑</button><button class="small-btn" data-object-move="down" data-path="${path}" data-index="${i}">↓</button><button class="small-btn" data-object-remove="${path}" data-index="${i}">Удалить</button></div>
      </div>`).join('');
    $$('[data-object-move]', root).forEach((btn) => btn.onclick = () => { moveInArray(getByPath(data, btn.dataset.path), Number(btn.dataset.index), btn.dataset.objectMove === 'up' ? -1 : 1); commit(); });
    $$('[data-object-remove]', root).forEach((btn) => btn.onclick = () => { getByPath(data, btn.dataset.objectRemove).splice(Number(btn.dataset.index), 1); commit(); });
    bindSimpleFields(root);
  }

  function contactsPanel() {
    const c = data.contacts;
    $('#panel-contacts').innerHTML = `
      <div class="admin-card">
        <h3>Контакты</h3>
        ${input('Заголовок', c.heading, 'contacts.heading')}
        ${input('Email', c.email, 'contacts.email')}
        ${input('Telegram', c.telegram, 'contacts.telegram')}
        ${input('Локация', c.location, 'contacts.location')}
        ${input('Метка услуг', c.servicesLabel, 'contacts.servicesLabel')}
        ${input('Текст кнопки', c.ctaLabel, 'contacts.ctaLabel')}
      </div>
      <div class="admin-card">
        <h3>Услуги</h3>
        <div class="repeater" id="servicesList"></div>
        <button class="small-btn" id="addService">Добавить услугу</button>
      </div>`;
    renderStringRepeater('#servicesList', c.services, 'contacts.services');
    $('#addService').onclick = () => { c.services.push('Новая услуга'); commit(); };
    bindSimpleFields($('#panel-contacts'));
  }

  function uiPanel() {
    const u = data.uiSettings;
    $('#panel-ui').innerHTML = `
      <div class="admin-card">
        <h3>Системные настройки</h3>
        <div class="switch"><input type="checkbox" ${u.scanlines ? 'checked' : ''} data-checked="uiSettings.scanlines"><span>Эффект scanlines</span></div>
        <div class="switch"><input type="checkbox" ${u.noise ? 'checked' : ''} data-checked="uiSettings.noise"><span>Шумовой слой</span></div>
        <div class="switch"><input type="checkbox" ${u.reducedMotionRespected ? 'checked' : ''} data-checked="uiSettings.reducedMotionRespected"><span>Учитывать reduced motion</span></div>
      </div>
      <div class="admin-card">
        <h3>Настройки сайта</h3>
        ${input('Название сайта', data.siteSettings.siteName, 'siteSettings.siteName')}
        ${input('System ID', data.siteSettings.systemId, 'siteSettings.systemId')}
        ${input('Локация', data.siteSettings.location, 'siteSettings.location')}
        ${input('Статус', data.siteSettings.status, 'siteSettings.status')}
        ${input('Уровень допуска', data.siteSettings.accessLevel, 'siteSettings.accessLevel')}
        ${input('Текст футера', data.siteSettings.footerNote, 'siteSettings.footerNote')}
        ${input('Год копирайта', data.siteSettings.copyrightYear, 'siteSettings.copyrightYear')}
      </div>
      </div>`;
    bindSimpleFields($('#panel-ui'));
  }

  function addCase() {
    const id = `case-${Date.now()}`;
    data.cases.push({
      id,
      slug: `noviy-keis-${data.cases.length + 1}`,
      visible: true,
      featured: false,
      status: 'draft',
      order: data.cases.length + 1,
      category: 'branding',
      title: 'Новый кейс',
      subtitle: 'Краткое описание кейса',
      year: '2026',
      client: 'Новый клиент',
      role: 'Арт-директор',
      services: ['Новая услуга'],
      summary: 'Краткое описание проекта.',
      challenge: 'Какую задачу решал проект.',
      approach: 'Как был устроен подход.',
      outcome: 'Какой получился результат.',
      metrics: [],
      heroImage: 'images/placeholders/case-hero.svg',
      sections: [{ type: 'text', title: 'Контекст', content: 'Новый текстовый блок.' }],
      gallery: [],
      videos: [],
      notes: 'Заменить текст и изображения перед публикацией.'
    });
    activeCaseId = id;
    activeTab = 'cases';
    commit();
  }

  function duplicateCase() {
    const source = data.cases.find((c) => c.id === activeCaseId);
    if (!source) return;
    const copy = JSON.parse(JSON.stringify(source));
    copy.id = `case-${Date.now()}`;
    copy.slug = `${copy.slug}-copy`;
    copy.title = `${copy.title} (копия)`;
    copy.order = data.cases.length + 1;
    data.cases.push(copy);
    activeCaseId = copy.id;
    commit();
  }

  function deleteCase() {
    const index = data.cases.findIndex((c) => c.id === activeCaseId);
    if (index < 0) return;
    const ok = confirm(`Удалить кейс «${data.cases[index].title}»?`);
    if (!ok) return;
    data.cases.splice(index, 1);
    activeCaseId = data.cases[0]?.id || null;
    commit();
  }

  function bindTabs() {
    $$('.admin-tab').forEach((tab) => tab.onclick = () => {
      $$('.admin-tab').forEach((x) => x.classList.remove('active'));
      $$('.admin-panel').forEach((x) => x.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tab;
      const panel = $(`#panel-${activeTab}`);
      panel.classList.add('active');
      // Перерисовать актуальными данными и проиграть анимацию входа (один раз).
      renderActivePanel();
      panel.classList.remove('panel-enter');
      void panel.offsetWidth;
      panel.classList.add('panel-enter');
      setTimeout(() => panel.classList.remove('panel-enter'), 700);
    });
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJson(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        data = JSON.parse(reader.result);
        localStorage.setItem(LS_KEY, JSON.stringify(data, null, 2));
        renderAll();
        setStatus('saved');
        schedulePreviewReload();
      } catch (e) {
        alert('Не удалось прочитать JSON-файл.');
      }
    };
    reader.readAsText(file, 'utf-8');
  }

  async function publishToSite() {
    const password = getAdminPassword();
    if (!password) return;

    const btn = document.getElementById('publishBtn');
    const orig = btn.textContent;
    btn.textContent = 'Публикация...';
    btn.disabled = true;

    try {
      const res = await fetch(PUBLISH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: data, password }),
      });

      if (res.status === 401) {
        sessionStorage.removeItem(PW_KEY);
        alert('Неверный пароль администратора.');
        return;
      }

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus('published');
        alert('Готово! Сайт обновится через ~1-2 минуты после деплоя Vercel.');
      } else {
        alert('Ошибка: ' + (result.error || 'Неизвестная ошибка'));
      }
    } catch (err) {
      alert('Ошибка соединения: ' + err.message);
    } finally {
      btn.textContent = orig;
      btn.disabled = false;
    }
  }

  function renderAll() {
    overviewPanel();
    heroPanel();
    casesPanel();
    sectionsPanel();
    socioPanel();
    draftsPanel();
    creativePanel();
    aboutPanel();
    contactsPanel();
    uiPanel();
  }

  function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
      if (!(key in target)) {
        target[key] = JSON.parse(JSON.stringify(source[key]));
      } else if (
        source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) &&
        target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])
      ) {
        deepMerge(target[key], source[key]);
      }
    }
    return target;
  }

  async function loadData() {
    const local = localStorage.getItem(LS_KEY);
    if (local) {
      try { 
        const parsed = JSON.parse(local);
        if (parsed && parsed.cases) return parsed;
      } catch (e) { localStorage.removeItem(LS_KEY); }
    }
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType('application/json');
      xhr.open('GET', CONTENT_URL, true);
      xhr.onload = () => { 
        if (xhr.status === 200 || xhr.status === 0) { 
          try { 
            const parsed = JSON.parse(xhr.responseText);
            if (parsed && parsed.cases) { resolve(parsed); return; }
          } catch (e) {} 
        } 
        const fallback = JSON.parse(JSON.stringify(EMBEDDED_CONTENT));
        resolve(fallback); 
      };
      xhr.onerror = () => resolve(JSON.parse(JSON.stringify(EMBEDDED_CONTENT)));
      xhr.send();
    });
  }

  function bindPreview() {
    const toggle = $('#togglePreview');
    const refresh = $('#refreshPreview');
    const openTab = $('#openPreviewTab');
    if (toggle) toggle.onclick = () => {
      document.body.classList.toggle('preview-on');
      const on = document.body.classList.contains('preview-on');
      toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
      toggle.textContent = on ? 'Скрыть превью' : 'Показать превью';
      if (on) schedulePreviewReload();
    };
    if (refresh) refresh.onclick = () => { const f = $('#livePreview'); if (f) f.contentWindow.location.reload(); };
    if (openTab) openTab.onclick = () => window.open('index.html', '_blank');
  }

  async function init() {
    data = await loadData();
    data = deepMerge(data, JSON.parse(JSON.stringify(EMBEDDED_CONTENT)));
    const activeTabEl = $('.admin-tab.active');
    if (activeTabEl) activeTab = activeTabEl.dataset.tab;
    bindTabs();
    bindPreview();
    renderAll();
    setStatus('saved');
    $('#publishBtn').onclick = publishToSite;
    $('#exportJson').onclick = exportJson;
    $('#importJson').onchange = (e) => e.target.files[0] && importJson(e.target.files[0]);
    $('#resetLocal').onclick = () => {
      const ok = confirm('Сбросить все локальные правки и вернуть исходный content.json?');
      if (!ok) return;
      localStorage.removeItem(LS_KEY);
      location.reload();
    };
  }

  init();
})();
