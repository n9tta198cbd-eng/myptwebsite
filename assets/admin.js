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

  function saveLocal() {
    localStorage.setItem(LS_KEY, JSON.stringify(data, null, 2));
    renderAll();
  }

  function input(label, value, oninput, type = 'text') {
    return `<div class="field"><label>${esc(label)}</label><input type="${esc(type)}" value="${esc(value)}" data-bind="${esc(oninput)}"></div>`;
  }
  function textarea(label, value, oninput) {
    return `<div class="field"><label>${esc(label)}</label><textarea data-bind="${esc(oninput)}">${esc(value)}</textarea></div>`;
  }

  function bindSimpleFields(scope = document) {
    $$('[data-bind]', scope).forEach((el) => {
      el.addEventListener('input', (e) => {
        const path = e.target.getAttribute('data-bind');
        let val = e.target.value;
        if (e.target.dataset.type === 'array') {
          val = val.split(',').map((s) => s.trim()).filter(Boolean);
        }
        setByPath(data, path, val);
        saveLocal();
      });
    });
    $$('[data-checked]', scope).forEach((el) => {
      el.addEventListener('change', (e) => {
        const path = e.target.getAttribute('data-checked');
        setByPath(data, path, e.target.checked);
        saveLocal();
      });
    });
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
    $('#addHeroLine').onclick = () => { data.hero.titleLines.push('Новая строка'); saveLocal(); };
    $('#addDiscipline').onclick = () => { data.hero.disciplines.push('Новая дисциплина'); saveLocal(); };
    bindSimpleFields($('#panel-hero'));
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
      saveLocal();
    });
    $$('[data-move]', root).forEach((btn) => btn.onclick = () => {
      moveInArray(getByPath(data, btn.dataset.path), Number(btn.dataset.index), btn.dataset.move === 'up' ? -1 : 1);
      saveLocal();
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
    $('#panel-cases').innerHTML = `
      <div class="admin-card">
        <div class="admin-toolbar">
          <button class="small-btn" id="addCase">Добавить кейс</button>
          <button class="small-btn" id="duplicateCase">Дублировать кейс</button>
          <button class="small-btn" id="deleteCase">Удалить кейс</button>
        </div>
        <div class="case-list">${data.cases.map((c, i) => `
          <button class="case-item ${c.id === activeCaseId ? 'active' : ''}" data-case-select="${esc(c.id)}">
            <div class="case-head">
              <div>
                <h4>${esc(c.title)}</h4>
                <div class="note">${esc(c.client || 'Без клиента')} / ${esc(c.year || '—')}</div>
              </div>
              <div>
                ${c.featured ? '<span class="status-pill">featured</span>' : ''}
                ${c.visible ? '<span class="status-pill">visible</span>' : '<span class="status-pill">hidden</span>'}
              </div>
            </div>
          </button>`).join('')}</div>
      </div>
      ${current ? caseEditor(current) : '<div class="admin-card"><p>Нет кейсов</p></div>'}`;

    $$('[data-case-select]').forEach((btn) => btn.onclick = () => { activeCaseId = btn.dataset.caseSelect; renderAll(); });
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
          ${input('Название', c.title, `cases.${idx(c.id)}.title`)}
          ${input('Подзаголовок', c.subtitle, `cases.${idx(c.id)}.subtitle`)}
          ${input('Год', c.year, `cases.${idx(c.id)}.year`)}
          ${input('Клиент', c.client, `cases.${idx(c.id)}.client`)}
          ${input('Категория', c.category, `cases.${idx(c.id)}.category`)}
          ${input('Роль', c.role, `cases.${idx(c.id)}.role`)}
          ${input('Статус', c.status, `cases.${idx(c.id)}.status`)}
          ${input('Путь к обложке', c.heroImage, `cases.${idx(c.id)}.heroImage`)}
        </div>
        ${textarea('Краткое описание', c.summary, `cases.${idx(c.id)}.summary`)}
        ${textarea('Задача', c.challenge, `cases.${idx(c.id)}.challenge`)}
        ${textarea('Подход', c.approach, `cases.${idx(c.id)}.approach`)}
        ${textarea('Результат / рефлексия', c.outcome, `cases.${idx(c.id)}.outcome`)}
        ${textarea('Заметка', c.notes || '', `cases.${idx(c.id)}.notes`)}
        <div class="switch"><input type="checkbox" ${c.visible ? 'checked' : ''} data-checked="cases.${idx(c.id)}.visible"><span>Показывать кейс</span></div>
        <div class="switch"><input type="checkbox" ${c.featured ? 'checked' : ''} data-checked="cases.${idx(c.id)}.featured"><span>Показывать в featured</span></div>
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
    $('#addCaseService').onclick = () => { c.services = c.services || []; c.services.push('Новая услуга'); saveLocal(); };
    renderCaseSections(c);
    $('#addTextSection').onclick = () => { c.sections.push({ type: 'text', title: 'Новый текстовый блок', content: 'Текст секции' }); saveLocal(); };
    $('#addGallerySection').onclick = () => { c.sections.push({ type: 'gallery', title: 'Новая галерея', images: ['images/placeholders/gallery-1.svg'] }); saveLocal(); };
    $('#addSplitSection').onclick = () => { c.sections.push({ type: 'splitTextImage', title: 'Новый split-блок', content: 'Описание блока', image: 'images/placeholders/section.svg' }); saveLocal(); };
    $('#addMetricSection').onclick = () => { c.sections.push({ type: 'metricRow', title: 'Показатели', items: [{ label: 'Параметр', value: 'Значение' }] }); saveLocal(); };
    bindSimpleFields($('#panel-cases'));
  }

  function renderCaseSections(c) {
    const root = $('#caseSections');
    root.innerHTML = c.sections.map((sec, i) => {
      const base = `cases.${idx(c.id)}.sections.${i}`;
      const common = `
        <div class="field"><label>Тип секции</label><input value="${esc(sec.type)}" data-bind="${base}.type"></div>
        <div class="field"><label>Заголовок</label><input value="${esc(sec.title || '')}" data-bind="${base}.title"></div>
        <div class="switch"><input type="checkbox" ${sec.enabled === false ? '' : 'checked'} data-checked="${base}.enabled"><span>Секция включена</span></div>`;
      let body = '';
      if (sec.type === 'text' || sec.type === 'quote') body = textarea('Контент', sec.content || '', `${base}.content`);
      if (sec.type === 'splitTextImage') body = textarea('Контент', sec.content || '', `${base}.content`) + input('Путь к изображению', sec.image || '', `${base}.image`);
      if (sec.type === 'gallery' || sec.type === 'imageGrid') {
        body = `<div class="repeater" data-gallery-root="${i}"></div><button class="small-btn" data-add-image="${i}">Добавить изображение</button>`;
      }
      if (sec.type === 'metricRow') {
        body = `<div class="repeater" data-metric-root="${i}"></div><button class="small-btn" data-add-metric="${i}">Добавить показатель</button>`;
      }
      return `<div class="section-item"><div class="admin-toolbar"><button class="small-btn" data-sec-move="up" data-index="${i}">↑</button><button class="small-btn" data-sec-move="down" data-index="${i}">↓</button><button class="small-btn" data-sec-remove="${i}">Удалить секцию</button></div>${common}${body}</div>`;
    }).join('');

    $$('[data-sec-remove]').forEach((btn) => btn.onclick = () => { c.sections.splice(Number(btn.dataset.secRemove), 1); saveLocal(); });
    $$('[data-sec-move]').forEach((btn) => btn.onclick = () => { moveInArray(c.sections, Number(btn.dataset.index), btn.dataset.secMove === 'up' ? -1 : 1); saveLocal(); });
    $$('[data-add-image]').forEach((btn) => btn.onclick = () => { const sec = c.sections[Number(btn.dataset.addImage)]; sec.images = sec.images || []; sec.images.push('images/placeholders/gallery-new.svg'); saveLocal(); });
    $$('[data-add-metric]').forEach((btn) => btn.onclick = () => { const sec = c.sections[Number(btn.dataset.addMetric)]; sec.items = sec.items || []; sec.items.push({ label: 'Новый параметр', value: 'Значение' }); saveLocal(); });

    c.sections.forEach((sec, i) => {
      if (sec.type === 'gallery' || sec.type === 'imageGrid') renderGalleryRepeater(c, sec, i);
      if (sec.type === 'metricRow') renderMetricRepeater(c, sec, i);
    });
    bindSimpleFields(root);
  }

  function renderGalleryRepeater(c, sec, i) {
    const root = $(`[data-gallery-root="${i}"]`);
    root.innerHTML = (sec.images || []).map((img, imgIndex) => `
      <div class="repeater-item">
        <div class="repeater-row">
          <input value="${esc(img)}" data-gallery-input="${i}" data-gallery-index="${imgIndex}">
          <button class="small-btn" data-gallery-remove="${i}" data-gallery-index="${imgIndex}">Удалить</button>
        </div>
      </div>`).join('');
    $$('input[data-gallery-input]', root).forEach((el) => el.oninput = () => { sec.images[Number(el.dataset.galleryIndex)] = el.value; saveLocal(); });
    $$('[data-gallery-remove]', root).forEach((btn) => btn.onclick = () => { sec.images.splice(Number(btn.dataset.galleryIndex), 1); saveLocal(); });
  }

  function renderMetricRepeater(c, sec, i) {
    const root = $(`[data-metric-root="${i}"]`);
    root.innerHTML = (sec.items || []).map((it, itemIndex) => `
      <div class="repeater-item">
        <div class="field"><label>Название</label><input value="${esc(it.label)}" data-metric-label="${i}" data-metric-index="${itemIndex}"></div>
        <div class="field"><label>Значение</label><input value="${esc(it.value)}" data-metric-value="${i}" data-metric-index="${itemIndex}"></div>
        <button class="small-btn" data-metric-remove="${i}" data-metric-index="${itemIndex}">Удалить</button>
      </div>`).join('');
    $$('[data-metric-label]', root).forEach((el) => el.oninput = () => { sec.items[Number(el.dataset.metricIndex)].label = el.value; saveLocal(); });
    $$('[data-metric-value]', root).forEach((el) => el.oninput = () => { sec.items[Number(el.dataset.metricIndex)].value = el.value; saveLocal(); });
    $$('[data-metric-remove]', root).forEach((btn) => btn.onclick = () => { sec.items.splice(Number(btn.dataset.metricIndex), 1); saveLocal(); });
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
    $('#addBrandingItem').onclick = () => { data.brandingProjects.push({ title: 'Новый проект', tags: ['Тег'], year: '2026', linkedCase: null, image: 'images/placeholders/brand-new.svg' }); saveLocal(); };
    $('#addArtDirectionItem').onclick = () => { data.artDirectionProjects.push({ title: 'Новый проект', role: 'Роль', year: '2026', image: 'images/placeholders/art-new.svg' }); saveLocal(); };
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
    $('#addSocioItem').onclick = () => { data.socioVisualProjects.push({ title: 'Новый проект', image: 'images/placeholders/social-manifest.svg', text: 'Описание проекта.' }); saveLocal(); };
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
    $('#addDraftItem').onclick = () => { data.drafts.push({ title: 'Новый черновик', reason: 'Причина', year: '2026', image: 'images/placeholders/draft-new.svg' }); saveLocal(); };
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
    $('#addCreativeItem').onclick = () => { data.creativeWorks.push({ title: 'Новая работа', series: 'Серия', year: '2026', image: 'images/placeholders/creative-new.svg', youtubeUrl: '' }); saveLocal(); };
  }

  function renderSocioRepeater(sel, arr, path) {
    const root = $(sel);
    root.innerHTML = arr.map((item, i) => `
      <div class="repeater-item">
        <div class="field"><label>Название</label><input value="${esc(item.title || '')}" data-bind="${path}.${i}.title"></div>
        <div class="field"><label>Изображение</label><input value="${esc(item.image || '')}" data-bind="${path}.${i}.image"></div>
        <div class="field"><label>Текст (markdown)</label><textarea data-bind="${path}.${i}.text">${esc(item.text || '')}</textarea></div>
        <div class="admin-toolbar"><button class="small-btn" data-object-move="up" data-path="${path}" data-index="${i}">↑</button><button class="small-btn" data-object-move="down" data-path="${path}" data-index="${i}">↓</button><button class="small-btn" data-object-remove="${path}" data-index="${i}">Удалить</button></div>
      </div>`).join('');
    bindSimpleFields(root);
    $$('[data-object-move]', root).forEach((btn) => btn.onclick = () => { moveInArray(getByPath(data, btn.dataset.path), Number(btn.dataset.index), btn.dataset.objectMove === 'up' ? -1 : 1); saveLocal(); });
    $$('[data-object-remove]', root).forEach((btn) => btn.onclick = () => { getByPath(data, btn.dataset.objectRemove).splice(Number(btn.dataset.index), 1); saveLocal(); });
  }

  function renderDraftsRepeater(sel, arr, path) {
    const root = $(sel);
    root.innerHTML = arr.map((item, i) => `
      <div class="repeater-item">
        <div class="field"><label>Название</label><input value="${esc(item.title || '')}" data-bind="${path}.${i}.title"></div>
        <div class="field"><label>Причина</label><input value="${esc(item.reason || '')}" data-bind="${path}.${i}.reason"></div>
        <div class="field"><label>Год</label><input value="${esc(item.year || '')}" data-bind="${path}.${i}.year"></div>
        <div class="field"><label>Изображение</label><input value="${esc(item.image || '')}" data-bind="${path}.${i}.image"></div>
        <div class="admin-toolbar"><button class="small-btn" data-object-move="up" data-path="${path}" data-index="${i}">↑</button><button class="small-btn" data-object-move="down" data-path="${path}" data-index="${i}">↓</button><button class="small-btn" data-object-remove="${path}" data-index="${i}">Удалить</button></div>
      </div>`).join('');
    bindSimpleFields(root);
    $$('[data-object-move]', root).forEach((btn) => btn.onclick = () => { moveInArray(getByPath(data, btn.dataset.path), Number(btn.dataset.index), btn.dataset.objectMove === 'up' ? -1 : 1); saveLocal(); });
    $$('[data-object-remove]', root).forEach((btn) => btn.onclick = () => { getByPath(data, btn.dataset.objectRemove).splice(Number(btn.dataset.index), 1); saveLocal(); });
  }

  function renderCreativeRepeater(sel, arr, path) {
    const root = $(sel);
    root.innerHTML = arr.map((item, i) => `
      <div class="repeater-item">
        <div class="field"><label>Название</label><input value="${esc(item.title || '')}" data-bind="${path}.${i}.title"></div>
        <div class="field"><label>Серия</label><input value="${esc(item.series || '')}" data-bind="${path}.${i}.series"></div>
        <div class="field"><label>Год</label><input value="${esc(item.year || '')}" data-bind="${path}.${i}.year"></div>
        <div class="field"><label>Изображение</label><input value="${esc(item.image || '')}" data-bind="${path}.${i}.image"></div>
        <div class="field"><label>YouTube URL</label><input value="${esc(item.youtubeUrl || '')}" data-bind="${path}.${i}.youtubeUrl"></div>
        <div class="admin-toolbar"><button class="small-btn" data-object-move="up" data-path="${path}" data-index="${i}">↑</button><button class="small-btn" data-object-move="down" data-path="${path}" data-index="${i}">↓</button><button class="small-btn" data-object-remove="${path}" data-index="${i}">Удалить</button></div>
      </div>`).join('');
    bindSimpleFields(root);
    $$('[data-object-move]', root).forEach((btn) => btn.onclick = () => { moveInArray(getByPath(data, btn.dataset.path), Number(btn.dataset.index), btn.dataset.objectMove === 'up' ? -1 : 1); saveLocal(); });
    $$('[data-object-remove]', root).forEach((btn) => btn.onclick = () => { getByPath(data, btn.dataset.objectRemove).splice(Number(btn.dataset.index), 1); saveLocal(); });
  }

  function renderArchiveRepeater(sel, arr, path, fields) {
    const root = $(sel);
    root.innerHTML = arr.map((item, i) => `
      <div class="repeater-item">
        ${fields.map((f) => {
          const val = item[f];
          const isArr = Array.isArray(val);
          const inputType = isArr ? 'textarea' : 'input';
          const inputAttrs = isArr ? `data-type="array" rows="2"` : `type="text"`;
          const displayVal = isArr ? (val || []).join(', ') : esc(val || '');
          return `<div class="field"><label>${esc(f)}</label><${inputType} ${inputAttrs} value="${isArr ? '' : displayVal}" data-bind="${path}.${i}.${f}">${isArr ? displayVal : ''}</${inputType}></div>`;
        }).join('')}
        <div class="admin-toolbar"><button class="small-btn" data-archive-move="up" data-path="${path}" data-index="${i}">↑</button><button class="small-btn" data-archive-move="down" data-path="${path}" data-index="${i}">↓</button><button class="small-btn" data-archive-remove="${path}" data-index="${i}">Удалить</button></div>
      </div>`).join('');
    $$('[data-archive-move]', root).forEach((btn) => btn.onclick = () => { moveInArray(getByPath(data, btn.dataset.path), Number(btn.dataset.index), btn.dataset.archiveMove === 'up' ? -1 : 1); saveLocal(); });
    $$('[data-archive-remove]', root).forEach((btn) => btn.onclick = () => { getByPath(data, btn.dataset.archiveRemove).splice(Number(btn.dataset.index), 1); saveLocal(); });
    bindSimpleFields(root);
  }

  function aboutPanel() {
    const a = data.about;
    $('#panel-about').innerHTML = `
      <div class="admin-card">
        <h3>Обо мне</h3>
        ${input('Заголовок', a.heading, 'about.heading')}
        ${input('Путь к портрету', a.photo, 'about.photo')}
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
    $('#addCompetency').onclick = () => { a.competencies.push('Новая компетенция'); saveLocal(); };
    $('#addSkillBlock').onclick = () => { a.skillBlocks.push({ title: 'Новый блок', note: 'Описание' }); saveLocal(); };
    bindSimpleFields($('#panel-about'));
  }

  function renderObjectRepeater(sel, arr, path, keys) {
    const root = $(sel);
    root.innerHTML = arr.map((item, i) => `
      <div class="repeater-item">
        ${keys.map((k) => `<div class="field"><label>${esc(k)}</label><input value="${esc(item[k] || '')}" data-bind="${path}.${i}.${k}"></div>`).join('')}
        <div class="admin-toolbar"><button class="small-btn" data-object-move="up" data-path="${path}" data-index="${i}">↑</button><button class="small-btn" data-object-move="down" data-path="${path}" data-index="${i}">↓</button><button class="small-btn" data-object-remove="${path}" data-index="${i}">Удалить</button></div>
      </div>`).join('');
    $$('[data-object-move]', root).forEach((btn) => btn.onclick = () => { moveInArray(getByPath(data, btn.dataset.path), Number(btn.dataset.index), btn.dataset.objectMove === 'up' ? -1 : 1); saveLocal(); });
    $$('[data-object-remove]', root).forEach((btn) => btn.onclick = () => { getByPath(data, btn.dataset.objectRemove).splice(Number(btn.dataset.index), 1); saveLocal(); });
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
    $('#addService').onclick = () => { c.services.push('Новая услуга'); saveLocal(); };
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
    saveLocal();
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
    saveLocal();
  }

  function deleteCase() {
    const index = data.cases.findIndex((c) => c.id === activeCaseId);
    if (index < 0) return;
    const ok = confirm(`Удалить кейс «${data.cases[index].title}»?`);
    if (!ok) return;
    data.cases.splice(index, 1);
    activeCaseId = data.cases[0]?.id || null;
    saveLocal();
  }

  function bindTabs() {
    $$('.admin-tab').forEach((tab) => tab.onclick = () => {
      $$('.admin-tab').forEach((x) => x.classList.remove('active'));
      $$('.admin-panel').forEach((x) => x.classList.remove('active'));
      tab.classList.add('active');
      $(`#panel-${tab.dataset.tab}`).classList.add('active');
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
      } catch (e) {
        alert('Не удалось прочитать JSON-файл.');
      }
    };
    reader.readAsText(file, 'utf-8');
  }

  async function publishToSite() {
    const password = prompt('Введите пароль администратора для публикации:');
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

      const result = await res.json();

      if (res.ok && result.success) {
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

  async function init() {
    data = await loadData();
    data = deepMerge(data, JSON.parse(JSON.stringify(EMBEDDED_CONTENT)));
    bindTabs();
    renderAll();
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
