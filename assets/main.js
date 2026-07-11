(() => {
  'use strict';

  const CONTENT_URL = 'content/content.json';
  const LS_KEY = 'n9tta_content_override';
  const state = {
    data: null,
    cases: [],
    currentCaseIndex: -1,
    currentType: null,
    currentItemIndex: -1,
  };

  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const byId = (id) => document.getElementById(id);
  const placeholder = (label = 'Материал для замены') => `<div class="placeholder-media">${esc(label)}</div>`;
  const imageTag = (src, alt = '', cls = '', lazy = true) => src ? `<img ${lazy ? 'loading="lazy"' : ''} src="${esc(src)}" alt="${esc(alt)}" class="${cls}">` : placeholder(alt || 'Изображение отсутствует');
  const EMBEDDED_CONTENT = {
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
      "featuredCases": true,
      "branding": true,
      "artDirection": true,
      "socioVisual": true,
      "drafts": true,
      "creativeWorks": true,
      "about": true
    },
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
    { "title": "Пара постеров", "series": "Постеры", "year": "2026", "image": "images/placeholders/creative-1.svg" },
    { "title": "Супрематизм / о бессмысле труда", "series": "Концептуальная серия", "year": "2025", "image": "images/placeholders/creative-2.svg" },
    { "title": "Bulba", "series": "Графика", "year": "2025", "image": "images/placeholders/creative-3.svg" },
    { "title": "PhoneCord", "series": "Объект / графика", "year": "2025", "image": "images/placeholders/creative-4.svg" },
    { "title": "NADOENO", "series": "Серия", "year": "2024", "image": "images/placeholders/creative-5.svg" },
    { "title": "Экспериментальная графика", "series": "Тесты", "year": "2024–2026", "image": "images/placeholders/creative-6.svg" },
    { "title": "Архив визуальных тестов", "series": "Архив", "year": "2023–2026", "image": "images/placeholders/creative-7.svg" }
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
};
  const safeParse = (s) => { try { return JSON.parse(s); } catch (e) { return JSON.parse(JSON.stringify(EMBEDDED_CONTENT)); } };

  function getItemsByType(type) {
    const data = state.data;
    switch (type) {
      case 'case': return state.cases;
      case 'creative': return data.creativeWorks || [];
      case 'draft': return data.drafts || [];
      case 'brand': return data.brandingProjects || [];
      case 'art': return data.artDirectionProjects || [];
      default: return [];
    }
  }

  function markdownToHtml(md) {
    if (!md) return '';
    let html = esc(md);
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^# (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    const parts = html.split('\n');
    const out = [];
    let inUl = false;
    for (const part of parts) {
      if (part.trim().startsWith('<li>')) {
        if (!inUl) { out.push('<ul>'); inUl = true; }
        out.push(part);
      } else {
        if (inUl) { out.push('</ul>'); inUl = false; }
        out.push(part);
      }
    }
    if (inUl) out.push('</ul>');
    html = out.join('\n').replace(/\n/g, '<br>');
    return html;
  }

  async function loadContent() {
    const cached = localStorage.getItem(LS_KEY);
    if (cached) {
      try { 
        const parsed = JSON.parse(cached);
        return parsed;
      } catch (e) { localStorage.removeItem(LS_KEY); }
    }
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType('application/json');
      xhr.open('GET', CONTENT_URL, true);
      xhr.onload = () => { 
        if (xhr.status === 200 || xhr.status === 0) { 
          try { 
            const d = JSON.parse(xhr.responseText); 
            if (d && typeof d === 'object') { 
              resolve(d); 
              return; 
            } 
          } catch (e) {} 
        } 
        const fallback = JSON.parse(JSON.stringify(EMBEDDED_CONTENT));
        resolve(fallback); 
      };
      xhr.onerror = () => resolve(JSON.parse(JSON.stringify(EMBEDDED_CONTENT)));
      xhr.send();
    });
  }

  function systemBarMarkup(s) {
    return `
      <div class="system-bar__group">
        <span class="system-bar__brand">${esc(s.siteName)}</span>
        <span>${esc(s.systemId)}</span>
      </div>
      <div class="system-bar__group">
        <span><span class="dot"></span>${esc(s.status)}</span>
        <span class="system-bar__hide-mobile">${esc(s.location)}</span>
        <span>${esc(s.accessLevel)}</span>
      </div>`;
  }

  function navMarkup(data) {
    const sections = [
      ['hero','Главный экран'],
      ['intro','Знакомство / манифест'],
      ['featured-cases','Избранные кейсы'],
      ['branding','Брендинг и дизайн-системы'],
      ['artdirection','Арт-дирекшн'],
      ['socio','Социовизуальная инженерия'],
      ['drafts','Черновики / не вышло в сеть'],
      ['creative','Креативные работы'],
      ['about','Обо мне / контакты']
    ];
    const enabled = data.siteSettings.sectionsEnabled || {};
    const list = sections.filter(([id]) => id === 'intro' ? (data.intro && enabled.intro !== false) : id === 'featured-cases' ? enabled.featuredCases !== false : id === 'artdirection' ? enabled.artDirection !== false : id === 'creative' ? enabled.creativeWorks !== false : id === 'socio' ? enabled.socioVisual !== false : id === 'about' ? enabled.about !== false : enabled[id] !== false)
      .map((s, i) => `<a href="#${s[0]}"><span class="n">${String(i + 1).padStart(2,'0')}</span>${esc(s[1])}</a>`).join('');
    return `
      <div class="nav-col__brand">${esc(data.siteSettings.siteName)}</div>
      <div class="nav-col__tag">арт-директор<br>дизайнер<br>социовизуальный инженер</div>
      <div class="nav-col__label">Навигация</div>
      <nav class="nav-list">${list}</nav>
      <div class="nav-col__foot">${esc(data.siteSettings.footerNote)}</div>`;
  }

  function heroPanel(data) {
    const h = data.hero;
    return `
    <section class="section hero" id="hero">
      <div class="eyebrow">${esc(h.eyebrow)}</div>
      <div class="hero__grid">
        <div>
          <h1 class="hero__title">${h.titleLines.map((x) => `<span>${esc(x)}</span>`).join('')}</h1>
          <p class="hero__subtitle">${markdownToHtml(h.subtitle)}</p>
          <div class="hero__meta">
            <div class="hero__box">
              <b>${esc(h.rolesLabel)}</b>
              <ul class="hero__roles">${(h.roles || []).map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
            </div>
            <div class="hero__box">
              <b>${esc(h.disciplinesLabel)}</b>
              <div class="hero__disciplines">${(h.disciplines || []).map((r) => `<span class="chip">${esc(r)}</span>`).join('')}</div>
            </div>
          </div>
        </div>
        <div class="construct" aria-hidden="true">
          <div class="construct__caption">f10.01<br><b>Visual system construction</b></div>
          <svg viewBox="0 0 800 600" role="presentation">
            <rect x="0" y="0" width="800" height="600" fill="transparent"></rect>
            <rect x="420" y="80" width="140" height="300" fill="#ccc" opacity=".95"></rect>
            <rect x="300" y="210" width="160" height="160" fill="#555"></rect>
            <circle cx="510" cy="240" r="72" fill="#000"></circle>
            <line x1="100" y1="250" x2="680" y2="250" stroke="#aaa" stroke-opacity=".25"></line>
            <line x1="490" y1="40" x2="490" y2="560" stroke="#aaa" stroke-opacity=".22"></line>
            <line x1="120" y1="120" x2="720" y2="510" stroke="#aaa" stroke-opacity=".12" stroke-dasharray="5 6"></line>
            <line x1="180" y1="110" x2="180" y2="160" stroke="#aaa" stroke-opacity=".38"></line>
            <line x1="155" y1="135" x2="205" y2="135" stroke="#aaa" stroke-opacity=".38"></line>
            <line x1="660" y1="350" x2="660" y2="400" stroke="#aaa" stroke-opacity=".38"></line>
            <line x1="635" y1="375" x2="685" y2="375" stroke="#aaa" stroke-opacity=".38"></line>
            <rect x="548" y="312" width="12" height="12" fill="#555"></rect>
          </svg>
        </div>
      </div>
    </section>`;
  }

  // Блок знакомства: профайл-досье + манифест СИГ. Стоит между hero и кейсами.
  function introSection(data) {
    const it = data.intro;
    if (!it) return '';
    const m = it.manifesto || {};
    const facts = (it.facts || []).map((f) => `<div><b>${esc(f.label || '')}</b><span>${esc(f.value || '')}</span></div>`).join('');
    return `<section class="section intro" id="intro">${sectionHead('00', it.heading || 'Знакомство')}
      <div class="intro-grid">
        <div class="intro-profile">
          <div class="about-photo intro-photo">${imageTag(it.photo, 'Портрет', '', true)}</div>
          ${facts ? `<div class="metric-row intro-facts">${facts}</div>` : ''}
        </div>
        <div class="intro-main">
          ${it.eyebrow ? `<div class="eyebrow">${esc(it.eyebrow)}</div>` : ''}
          ${it.lead ? `<p class="intro-lead">${markdownToHtml(it.lead)}</p>` : ''}
          ${m.body ? `
          <article class="manifesto" data-collapsed="true">
            ${m.title ? `<h3 class="manifesto__title">${esc(m.title)}</h3>` : ''}
            <div class="manifesto__body">${markdownToHtml(m.body)}</div>
            <div class="manifesto__fade" aria-hidden="true"></div>
          </article>
          <div class="manifesto__foot">
            <button class="btn manifesto__toggle" id="manifestoToggle" aria-expanded="false">Читать манифест полностью</button>
            ${m.signature ? `<span class="status-line manifesto__sign">${esc(m.signature)}</span>` : ''}
          </div>` : ''}
        </div>
      </div>
    </section>`;
  }

  function bindManifesto() {
    const btn = byId('manifestoToggle');
    if (!btn) return;
    const box = document.querySelector('.manifesto');
    btn.addEventListener('click', () => {
      const collapsed = box.getAttribute('data-collapsed') !== 'false';
      box.setAttribute('data-collapsed', collapsed ? 'false' : 'true');
      btn.setAttribute('aria-expanded', collapsed ? 'true' : 'false');
      btn.textContent = collapsed ? 'Свернуть манифест' : 'Читать манифест полностью';
      if (!collapsed) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function cardCase(c, i, large = false) {
    const media = imageTag(c.heroImage, c.title, '', true);
    return `
      <article class="card ${large ? 'featured-card' : ''}" role="button" tabindex="0" data-case-id="${esc(c.id)}" data-case-index="${i}" aria-label="Открыть кейс ${esc(c.title)}">
        <span class="card__index">${String(i + 1).padStart(2, '0')}</span>
        ${c.status === 'draft' ? `<span class="draft-tag">${esc(c.draftLabel || 'черновик')}</span>` : ''}
        <div class="card__media">${media}</div>
        <div class="card__body">
          <h3 class="card__title">${esc(c.title)}</h3>
          <p class="card__text">${esc(c.summary || c.subtitle || '')}</p>
          <div class="card__meta">${esc(c.year || '')} / ${esc(c.category || '')}</div>
          <span class="card__btn" aria-hidden="true">+</span>
        </div>
      </article>`;
  }

  function sectionHead(n, title, actionHref = null, actionText = null) {
    return `<div class="section__head"><h2 class="section__title"><span class="n">${esc(n)}</span>${esc(title)}</h2>${actionHref ? `<a href="${esc(actionHref)}" class="section__viewall">${esc(actionText || 'Открыть')}</a>` : ''}</div>`;
  }

  function featuredSection(cases) {
    if (!cases.length) return '';
    return `<section class="section" id="featured-cases">${sectionHead('01', 'Избранные кейсы')}
      <div class="featured-grid">${cases.map((c, i) => cardCase(c, i, true)).join('')}</div>
    </section>`;
  }

  function archiveRows(items, title, id, n, mapRow) {
    if (!items?.length) return '';
    return `<section class="section" id="${esc(id)}">${sectionHead(n, title)}<div class="brand-list">${items.map(mapRow).join('')}</div></section>`;
  }

  function socioSection(items) {
    if (!items?.length) return '';
    const it = items[0];
    return `<section class="section" id="socio">${sectionHead('04', 'Социовизуальная инженерия')}
      <article class="socio-manifest">
        ${it.image ? `<div class="socio-manifest__media">${imageTag(it.image, it.title, '', true)}</div>` : ''}
        <div class="socio-manifest__body">
          <h3>${esc(it.title)}</h3>
          <p>${markdownToHtml(it.text || '')}</p>
        </div>
      </article>
    </section>`;
  }

  function draftsSection(items) {
    if (!items?.length) return '';
    return `<section class="section" id="drafts">${sectionHead('05', 'Черновики / не вышло в сеть')}
      <div class="draft-list">${items.map((it, i) => `
        <article class="archive-card" data-draft-index="${i}">
          ${it.image ? `<div class="archive-card__media">${imageTag(it.image, it.title, '', true)}</div>` : ''}
          <div class="archive-card__body">
            <div class="archive-card__title">${esc(it.title)}</div>
            <div class="archive-card__text">${esc(it.reason)}</div>
            <div class="archive-card__meta">${esc(it.year || '')}</div>
          </div>
        </article>`).join('')}</div>
    </section>`;
  }

  function creativeSection(items) {
    if (!items?.length) return '';
    return `<section class="section" id="creative">${sectionHead('06', 'Креативные работы')}
      <div class="creative-grid">${items.map((it, i) => `
        <article class="archive-card" data-creative-index="${i}">
          ${it.image ? `<div class="archive-card__media">${imageTag(it.image, it.title, '', true)}</div>` : ''}
          <div class="archive-card__body">
            <div class="archive-card__title">${esc(it.title)}</div>
            <div class="archive-card__text">${esc(it.series)} / ${esc(it.year)}</div>
          </div>
        </article>`).join('')}</div>
    </section>`;
  }

  function aboutSection(data) {
    const a = data.about;
    const c = data.contacts;
    return `<section class="section" id="about">${sectionHead('07', 'Обо мне / опыт / контакты')}
      <div class="about-grid">
        <div class="about-photo">${imageTag(a.photo, 'Портрет', '', true)}</div>
        <div class="about-text">
          <div class="eyebrow">${esc(a.heading)}</div>
          <p>${markdownToHtml(a.positioning)}</p>
          <div class="about-columns">
            <div>
              <h5>${esc(a.competenciesLabel)}</h5>
              <ul>${(a.competencies || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
            </div>
            <div>
              <h5>${esc(a.experienceLabel)}</h5>
              <ul>${(a.experience || []).map((x) => `<li><strong>${esc(x.period)}</strong><br>${esc(x.role)}<br>${esc(x.description)}</li>`).join('')}</ul>
            </div>
            <div>
              <h5>${esc(c.heading)}</h5>
              <ul>
                <li>${esc(c.email)}</li>
                <li>${esc(c.telegram)}</li>
                <li>${esc(c.location)}</li>
              </ul>
            </div>
          </div>
          <div class="skillblocks">${(a.skillBlocks || []).map((s) => `<div class="skillblock"><b>${esc(s.title)}</b><span>${esc(s.note)}</span></div>`).join('')}</div>
          <div class="contact-panel">
            <div class="contact-box">
              <h5>${esc(c.servicesLabel)}</h5>
              <ul>${(c.services || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
            </div>
            <div class="contact-box">
              <h5>Системный статус</h5>
              <p class="status-line">Онлайн / открыт к проектам</p>
              <a class="btn" href="mailto:${esc(c.email)}">${esc(c.ctaLabel || 'Написать')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  }

  function footerMarkup(data) {
    return `<footer class="sitefoot"><span>© ${esc(data.siteSettings.copyrightYear)} ${esc(data.siteSettings.siteName)}</span><span>${esc(data.siteSettings.footerNote)}</span><a href="admin.html">Редактор</a></footer>`;
  }

  function renderMain(data) {
    state.cases = (data.cases || []).filter((c) => c.visible !== false).sort((a, b) => (a.order || 0) - (b.order || 0));
    const featured = state.cases.filter((c) => c.featured);
    const branding = (data.brandingProjects || []).map((it, i) => `
      <article class="archive-card" data-brand-index="${i}">
        ${it.image ? `<div class="archive-card__media">${imageTag(it.image, it.title, '', true)}</div>` : ''}
        <div class="archive-card__body">
          <div class="archive-card__title">${esc(it.title)}</div>
          <div class="archive-card__tags">${(it.tags || []).map((x) => `<span class="tag-sm">${esc(x)}</span>`).join('')}</div>
          <div class="archive-card__meta">${esc(it.year || '')}</div>
        </div>
      </article>`).join('');
    const artdirection = (data.artDirectionProjects || []).map((it, i) => `
      <article class="archive-card" data-art-index="${i}">
        ${it.image ? `<div class="archive-card__media">${imageTag(it.image, it.title, '', true)}</div>` : ''}
        <div class="archive-card__body">
          <div class="archive-card__title">${esc(it.title)}</div>
          <div class="archive-card__text">${esc(it.role)}</div>
          <div class="archive-card__meta">${esc(it.year || '')}</div>
        </div>
      </article>`).join('');

    const enabled = data.siteSettings.sectionsEnabled || {};
    byId('systemBar').innerHTML = systemBarMarkup(data.siteSettings);
    byId('navCol').innerHTML = navMarkup(data);
    byId('main').innerHTML = `
      ${enabled.hero !== false ? heroPanel(data) : ''}
      ${enabled.intro !== false ? introSection(data) : ''}
      ${enabled.featuredCases !== false ? featuredSection(featured) : ''}
      ${enabled.branding !== false ? `<section class="section" id="branding">${sectionHead('02','Брендинг и дизайн-системы')}<div class="brand-list">${branding || '<div class="empty-state">Нет материалов</div>'}</div></section>` : ''}
      ${enabled.artDirection !== false ? `<section class="section" id="artdirection">${sectionHead('03','Арт-дирекшн')}<div class="brand-list">${artdirection || '<div class="empty-state">Нет материалов</div>'}</div></section>` : ''}
      ${enabled.socioVisual !== false ? socioSection(data.socioVisualProjects) : ''}
      ${enabled.drafts !== false ? draftsSection(data.drafts) : ''}
      ${enabled.creativeWorks !== false ? creativeSection(data.creativeWorks) : ''}
      ${enabled.about !== false ? aboutSection(data) : ''}
      ${footerMarkup(data)}`;

    bindCards();
    bindNav();
    bindManifesto();
  }

  function bindNav() {
    const navCol = byId('navCol');
    const toggle = byId('navToggle');
    toggle?.addEventListener('click', () => {
      const open = navCol.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    navCol.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navCol.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
      });
    });
    const links = [...navCol.querySelectorAll('a')];
    const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-30% 0px -55% 0px' });
    sections.forEach((s) => observer.observe(s));
  }

  function bindCards() {
    document.querySelectorAll('[data-case-id]').forEach((card) => {
      const open = () => openDrawer('case', parseInt(card.dataset.caseIndex));
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
    document.querySelectorAll('[data-creative-index]').forEach((card) => {
      const open = () => openDrawer('creative', parseInt(card.dataset.creativeIndex));
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
    document.querySelectorAll('[data-draft-index]').forEach((card) => {
      const open = () => openDrawer('draft', parseInt(card.dataset.draftIndex));
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
    document.querySelectorAll('[data-brand-index]').forEach((card) => {
      const open = () => openDrawer('brand', parseInt(card.dataset.brandIndex));
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
    document.querySelectorAll('[data-art-index]').forEach((card) => {
      const open = () => openDrawer('art', parseInt(card.dataset.artIndex));
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
  }

  function renderSection(sec) {
    if (sec.enabled === false) return '';
    if (sec.type === 'text') return `<section class="drawer-section"><h4>${esc(sec.title || 'Текст')}</h4><p>${markdownToHtml(sec.content || '')}</p></section>`;
    if (sec.type === 'quote') return `<section class="drawer-section"><blockquote>«${markdownToHtml(sec.content || '')}»</blockquote></section>`;
    if (sec.type === 'image') return `<section class="drawer-section"><h4>${esc(sec.title || 'Изображение')}</h4>${imageTag(sec.image, sec.title || 'Изображение', 'zoomable')}</section>`;
    if (sec.type === 'imageGrid' || sec.type === 'gallery') return `<section class="drawer-section"><h4>${esc(sec.title || 'Галерея')}</h4><div class="img-grid">${(sec.images || []).map((src, i) => src ? `<img loading="lazy" class="zoomable" src="${esc(src)}" alt="${esc(sec.title || 'Материал')} ${i + 1}">` : placeholder(`${sec.title || 'Материал'} ${i + 1}`)).join('')}</div></section>`;
    if (sec.type === 'splitTextImage') return `<section class="drawer-section"><h4>${esc(sec.title || 'Блок')}</h4><div class="drawer-split"><div><p>${markdownToHtml(sec.content || '')}</p></div><div>${imageTag(sec.image, sec.title || 'Изображение', 'zoomable')}</div></div></section>`;
    if (sec.type === 'metricRow') return `<section class="drawer-section"><h4>${esc(sec.title || 'Показатели')}</h4><div class="metric-row">${(sec.items || []).map((it) => `<div><b>${esc(it.label || '')}</b><span>${esc(it.value || '')}</span></div>`).join('')}</div></section>`;
    if (sec.type === 'processTimeline') return `<section class="drawer-section"><h4>${esc(sec.title || 'Процесс')}</h4><ul class="timeline">${(sec.items || []).map((it) => `<li><div class="t">${esc(it.step || '')}</div><div>${esc(it.text || '')}</div></li>`).join('')}</ul></section>`;
    if (sec.type === 'video') {
      const embed = sec.url ? `<div class="drawer-section"><h4>${esc(sec.title || 'Видео')}</h4><div class="construct"><iframe src="${esc(sec.url)}" title="${esc(sec.title || 'Видео')}" loading="lazy" style="width:100%;height:100%;border:0"></iframe></div></div>` : '';
      return embed;
    }
    if (sec.type === 'checklist') return `<section class="drawer-section"><h4>${esc(sec.title || 'Список')}</h4><div class="brand-list">${(sec.items || []).map((it) => `<div class="case-item">${esc(it)}</div>`).join('')}</div></section>`;
    if (sec.type === 'beforeAfter') return `<section class="drawer-section"><h4>${esc(sec.title || 'Сравнение')}</h4><div class="drawer-split"><div>${imageTag(sec.before, 'До', 'zoomable')}</div><div>${imageTag(sec.after, 'После', 'zoomable')}</div></div></section>`;
    return '';
  }

  function renderCaseDrawer(c, prev, next, index) {
    const prevIndex = prev ? index - 1 : -1;
    const nextIndex = next ? index + 1 : -1;
    return `
      <div class="drawer__top"><span>Архив кейса / ${esc(c.title)}</span><button class="drawer__close" id="drawerClose" aria-label="Закрыть кейс">×</button></div>
      <div class="drawer__hero">${imageTag(c.heroImage, c.title, 'zoomable', false)}</div>
      <div class="drawer__body">
        <div class="eyebrow">${esc(c.client || 'Проект')}</div>
        <h3 class="drawer__title">${esc(c.title)}</h3>
        <p class="drawer__subtitle">${markdownToHtml(c.subtitle || c.summary || '')}</p>
        <div class="drawer__meta">
          <div><b>Клиент</b>${esc(c.client || '—')}</div>
          <div><b>Год</b>${esc(c.year || '—')}</div>
          <div><b>Роль</b>${esc(c.role || '—')}</div>
          <div><b>Категория</b>${esc(c.category || '—')}</div>
        </div>
        <div class="case-summary">
          <div class="summary-box"><h5>Кратко</h5><p>${markdownToHtml(c.summary || '')}</p></div>
          <div class="summary-box"><h5>Услуги</h5><p>${(c.services || []).map(esc).join(' / ')}</p></div>
        </div>
        <section class="drawer-section"><h4>Задача</h4><p>${markdownToHtml(c.challenge || '')}</p></section>
        <section class="drawer-section"><h4>Подход</h4><p>${markdownToHtml(c.approach || '')}</p></section>
        ${(c.sections || []).map(renderSection).join('')}
        <section class="drawer-section"><h4>Результат / рефлексия</h4><p>${markdownToHtml(c.outcome || '')}</p></section>
        ${c.notes ? `<section class="drawer-section"><h4>Заметка</h4><p>${markdownToHtml(c.notes)}</p></section>` : ''}
      </div>
      <nav class="drawer-nav">
        <a href="#" data-nav-item="prev" data-type="case" data-index="${prevIndex}">${prev ? `← ${esc(prev.title)}` : '← Нет предыдущего'}</a>
        <a href="#" data-nav-item="next" data-type="case" data-index="${nextIndex}">${next ? `${esc(next.title)} →` : 'Нет следующего →'}</a>
      </nav>`;
  }

  function renderCreativeDrawer(item, index, total) {
    return `
      <div class="drawer__top"><span>Креативная работа / ${esc(item.title)}</span><button class="drawer__close" id="drawerClose" aria-label="Закрыть">×</button></div>
      <div class="drawer__hero">${item.image ? imageTag(item.image, item.title, 'zoomable', false) : ''}</div>
      <div class="drawer__body">
        <div class="eyebrow">${esc(item.series || 'Работа')}</div>
        <h3 class="drawer__title">${esc(item.title)}</h3>
        <div class="drawer__meta">
          <div><b>Год</b>${esc(item.year || '—')}</div>
        </div>
        ${item.youtubeUrl ? `<div class="drawer-section"><h4>Видео</h4><div class="construct"><iframe src="${esc(item.youtubeUrl)}" title="${esc(item.title)}" loading="lazy" style="width:100%;height:100%;border:0" allowfullscreen></iframe></div></div>` : ''}
        <section class="drawer-section"><h4>Описание</h4><p>${markdownToHtml(item.description || '')}</p></section>
      </div>
      <nav class="drawer-nav">
        <a href="#" data-nav-item="prev" data-type="creative" data-index="${index - 1}">${index > 0 ? '← Предыдущая' : '← Нет предыдущей'}</a>
        <a href="#" data-nav-item="next" data-type="creative" data-index="${index + 1}">${index < total - 1 ? 'Следующая →' : 'Нет следующей →'}</a>
      </nav>`;
  }

  function renderDraftDrawer(item, index, total) {
    return `
      <div class="drawer__top"><span>Черновик / ${esc(item.title)}</span><button class="drawer__close" id="drawerClose" aria-label="Закрыть">×</button></div>
      <div class="drawer__hero">${item.image ? imageTag(item.image, item.title, 'zoomable', false) : ''}</div>
      <div class="drawer__body">
        <div class="eyebrow">Черновик</div>
        <h3 class="drawer__title">${esc(item.title)}</h3>
        <div class="drawer__meta">
          <div><b>Год</b>${esc(item.year || '—')}</div>
          <div><b>Причина</b>${esc(item.reason || '—')}</div>
        </div>
        <section class="drawer-section"><h4>Описание</h4><p>${markdownToHtml(item.description || '')}</p></section>
      </div>
      <nav class="drawer-nav">
        <a href="#" data-nav-item="prev" data-type="draft" data-index="${index - 1}">${index > 0 ? '← Предыдущий' : '← Нет предыдущего'}</a>
        <a href="#" data-nav-item="next" data-type="draft" data-index="${index + 1}">${index < total - 1 ? 'Следующий →' : 'Нет следующего →'}</a>
      </nav>`;
  }

  function renderBrandDrawer(item, index, total) {
    return `
      <div class="drawer__top"><span>Брендинг / ${esc(item.title)}</span><button class="drawer__close" id="drawerClose" aria-label="Закрыть">×</button></div>
      <div class="drawer__hero">${item.image ? imageTag(item.image, item.title, 'zoomable', false) : ''}</div>
      <div class="drawer__body">
        <div class="eyebrow">Брендинг и дизайн-системы</div>
        <h3 class="drawer__title">${esc(item.title)}</h3>
        <div class="drawer__meta">
          <div><b>Год</b>${esc(item.year || '—')}</div>
          <div><b>Теги</b>${(item.tags || []).map(esc).join(', ')}</div>
        </div>
        ${item.linkedCase ? `<section class="drawer-section"><h4>Связанный кейс</h4><p>${esc(item.linkedCase)}</p></section>` : ''}
        <section class="drawer-section"><h4>Описание</h4><p>${markdownToHtml(item.description || '')}</p></section>
      </div>
      <nav class="drawer-nav">
        <a href="#" data-nav-item="prev" data-type="brand" data-index="${index - 1}">${index > 0 ? '← Предыдущий' : '← Нет предыдущего'}</a>
        <a href="#" data-nav-item="next" data-type="brand" data-index="${index + 1}">${index < total - 1 ? 'Следующий →' : 'Нет следующего →'}</a>
      </nav>`;
  }

  function renderArtDrawer(item, index, total) {
    return `
      <div class="drawer__top"><span>Арт-дирекшн / ${esc(item.title)}</span><button class="drawer__close" id="drawerClose" aria-label="Закрыть">×</button></div>
      <div class="drawer__hero">${item.image ? imageTag(item.image, item.title, 'zoomable', false) : ''}</div>
      <div class="drawer__body">
        <div class="eyebrow">Арт-дирекшн</div>
        <h3 class="drawer__title">${esc(item.title)}</h3>
        <div class="drawer__meta">
          <div><b>Год</b>${esc(item.year || '—')}</div>
          <div><b>Роль</b>${esc(item.role || '—')}</div>
        </div>
        ${item.linkedCase ? `<section class="drawer-section"><h4>Связанный кейс</h4><p>${esc(item.linkedCase)}</p></section>` : ''}
        <section class="drawer-section"><h4>Описание</h4><p>${markdownToHtml(item.description || '')}</p></section>
      </div>
      <nav class="drawer-nav">
        <a href="#" data-nav-item="prev" data-type="art" data-index="${index - 1}">${index > 0 ? '← Предыдущий' : '← Нет предыдущего'}</a>
        <a href="#" data-nav-item="next" data-type="art" data-index="${index + 1}">${index < total - 1 ? 'Следующий →' : 'Нет следующего →'}</a>
      </nav>`;
  }

  function openDrawer(type, index) {
    const drawer = byId('caseDrawer');
    const overlay = byId('drawerOverlay');
    const items = getItemsByType(type);
    const item = items[index];
    if (!item) return;
    
    state.currentType = type;
    state.currentItemIndex = index;
    
    let html = '';
    
    if (type === 'case') {
      const cases = state.cases;
      const prev = cases[index - 1];
      const next = cases[index + 1];
      html = renderCaseDrawer(item, prev, next, index);
    } else if (type === 'creative') {
      html = renderCreativeDrawer(item, index, items.length);
    } else if (type === 'draft') {
      html = renderDraftDrawer(item, index, items.length);
    } else if (type === 'brand') {
      html = renderBrandDrawer(item, index, items.length);
    } else if (type === 'art') {
      html = renderArtDrawer(item, index, items.length);
    }
    
    if (!html) return;
    
    drawer.innerHTML = html;
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    byId('drawerClose').addEventListener('click', closeDrawer);
    
    drawer.querySelectorAll('[data-nav-item]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const newIndex = parseInt(btn.dataset.index);
        if (!isNaN(newIndex)) {
          const newItems = getItemsByType(type);
          if (newIndex >= 0 && newIndex < newItems.length) {
            openDrawer(type, newIndex);
          }
        }
      });
    });
    
    bindZoomables(drawer);
    history.replaceState(null, '', `${location.pathname}${location.search}#${type}-${index}`);
  }

  function openCase(caseId) {
    const idx = state.cases.findIndex((c) => c.id === caseId);
    if (idx < 0) return;
    openDrawer('case', idx);
  }

  function closeDrawer() {
    byId('caseDrawer').classList.remove('open');
    byId('drawerOverlay').classList.remove('open');
    byId('caseDrawer').setAttribute('aria-hidden', 'true');
    byId('drawerOverlay').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    history.replaceState(null, '', location.pathname + location.search);
  }

  function bindZoomables(scope = document) {
    const lightbox = byId('lightbox');
    const img = byId('lightboxImage');
    scope.querySelectorAll('.zoomable').forEach((node) => {
      node.addEventListener('click', () => {
        if (node.tagName !== 'IMG') return;
        img.src = node.currentSrc || node.src;
        img.alt = node.alt || 'Увеличенное изображение';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });
  }

  function bindGlobal() {
    byId('drawerOverlay').addEventListener('click', closeDrawer);
    byId('lightboxClose').addEventListener('click', () => {
      byId('lightbox').classList.remove('open');
      byId('lightbox').setAttribute('aria-hidden', 'true');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDrawer();
        byId('lightbox').classList.remove('open');
      }
    });
  }

  async function init() {
    bindGlobal();
    try {
      const data = await loadContent();
      state.data = data;
      if (data.uiSettings?.scanlines === false || data.uiSettings?.noise === false) document.body.classList.add('no-fx');
      renderMain(data);
      bindZoomables(document);
      
      const hash = location.hash.slice(1);
      const [type, indexStr] = hash.split('-');
      const index = parseInt(indexStr);
      if (type && !isNaN(index) && ['case','creative','draft','brand','art'].includes(type)) {
        setTimeout(() => openDrawer(type, index), 50);
      }
      
      let suppressHash = false;
      window.addEventListener('hashchange', () => {
        if (suppressHash) return;
        const hash = location.hash.slice(1);
        const [type, indexStr] = hash.split('-');
        const index = parseInt(indexStr);
        if (type && !isNaN(index) && ['case','creative','draft','brand','art'].includes(type)) {
          suppressHash = true;
          openDrawer(type, index);
          suppressHash = false;
        }
      });
    } catch (err) {
      byId('main').innerHTML = `<section class="section"><div class="empty-state">Ошибка загрузки контента: ${esc(err.message)}</div></section>`;
    }
  }

  init();
})();
