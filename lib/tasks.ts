/* Логика бота целей: группы и задачи. Чистые функции, без сети и хранилища. */

export type Group = { name: string; tasks: string[] };

export type Result = {
  groups: Group[];
  /* Готовые к отправке сообщения (Telegram HTML), каждое влезает в лимит. */
  messages: string[];
};

const MAX_GROUPS = 20;
const MAX_TASKS = 15;
const MAX_NAME = 40;
const MAX_TASK = 200;
/* Лимит Telegram — 4096 знаков на сообщение, берём с запасом. */
const CHUNK = 3800;

const HELP = [
  '<b>Цели</b> — список задач по группам.',
  '',
  '/group <i>Здоровье</i> — создать группу',
  '/add <i>1 Бегать три раза в неделю</i> — добавить задачу в группу 1',
  '/del <i>1.2</i> — удалить задачу 2 из группы 1',
  '/list — показать всё',
  '',
  'Группу в /add можно указать и названием: <i>/add Здоровье: Бегать</i>',
].join('\n');

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Номер или название → группа. Название приоритетнее номера. */
function findGroup(groups: Group[], ref: string): Group | undefined {
  const byName = groups.find((g) => g.name.toLowerCase() === ref.toLowerCase());
  if (byName) return byName;
  return /^\d+$/.test(ref) ? groups[Number(ref) - 1] : undefined;
}

/* Список в виде статьи: заголовок группы, под ним цитата с задачами. */
export function render(groups: Group[]): string[] {
  if (!groups.length) {
    return ['<i>Пока пусто.</i>\nСоздайте первую группу: /group <i>Здоровье</i>'];
  }
  const blocks = groups.map((g, i) => {
    const body = g.tasks.length
      ? `<blockquote>${g.tasks
          .map((t, j) => `<code>${i + 1}.${j + 1}</code>  ${esc(t)}`)
          .join('\n')}</blockquote>`
      : '<i>пока пусто</i>';
    return `<b>${i + 1} · ${esc(g.name)}</b>\n${body}`;
  });
  return pack(['<b>🎯 Цели</b>', ...blocks]);
}

/* Склеивает блоки в сообщения, не разрывая блок: иначе порвётся HTML-разметка. */
function pack(blocks: string[]): string[] {
  const out: string[] = [];
  let cur = '';
  for (const b of blocks) {
    if (cur && cur.length + b.length + 2 > CHUNK) {
      out.push(cur);
      cur = b;
    } else {
      cur = cur ? `${cur}\n\n${b}` : b;
    }
  }
  if (cur) out.push(cur);
  return out;
}

/* Разбирает текст сообщения и применяет команду к списку. */
export function run(groups: Group[], text: string): Result {
  const m = text.trim().match(/^\/(\w+)(?:@\w+)?\s*([\s\S]*)$/);
  if (!m) return { groups, messages: [HELP] };
  const cmd = m[1].toLowerCase();
  const args = m[2].trim();
  const fail = (msg: string): Result => ({ groups, messages: [msg] });
  const done = (next: Group[], note: string): Result => {
    const [first, ...rest] = render(next);
    return { groups: next, messages: [`${note}\n\n${first}`, ...rest] };
  };

  switch (cmd) {
    case 'start':
    case 'help':
      return { groups, messages: [HELP] };

    case 'list':
      return { groups, messages: render(groups) };

    case 'group': {
      if (!args) return fail('Укажите название: /group <i>Здоровье</i>');
      if (args.length > MAX_NAME) return fail(`Название длиннее ${MAX_NAME} знаков.`);
      if (findGroup(groups, args)) return fail('Такая группа уже есть.');
      if (groups.length >= MAX_GROUPS) return fail(`Не больше ${MAX_GROUPS} групп.`);
      return done([...groups, { name: args, tasks: [] }], `✅ Группа «${esc(args)}» создана.`);
    }

    case 'add': {
      /* «1 текст», «1: текст» или «Название: текст» */
      const parts =
        args.match(/^(\d+)[:\s]\s*([\s\S]+)$/) ?? args.match(/^([^:]+):\s*([\s\S]+)$/);
      if (!parts) return fail('Формат: /add <i>1 Бегать три раза в неделю</i>');
      const target = findGroup(groups, parts[1].trim());
      const task = parts[2].trim();
      if (!target) return fail('Такой группы нет. Список: /list');
      if (task.length > MAX_TASK) return fail(`Задача длиннее ${MAX_TASK} знаков.`);
      if (target.tasks.length >= MAX_TASKS) return fail(`В группе не больше ${MAX_TASKS} задач.`);
      const next = groups.map((g) => (g === target ? { ...g, tasks: [...g.tasks, task] } : g));
      return done(next, `✅ Добавлено в «${esc(target.name)}».`);
    }

    case 'del': {
      /* «1.2» или «1 2»: группа, задача */
      const parts = args.match(/^(\d+)[.\s]\s*(\d+)$/);
      if (!parts) return fail('Формат: /del <i>1.2</i> — задача 2 из группы 1');
      const gi = Number(parts[1]) - 1;
      const ti = Number(parts[2]) - 1;
      const target = groups[gi];
      if (!target?.tasks[ti]) return fail('Такой задачи нет. Номера: /list');
      const next = groups.map((g, i) =>
        i === gi ? { ...g, tasks: g.tasks.filter((_, j) => j !== ti) } : g,
      );
      return done(next, `🗑 Удалено: ${esc(target.tasks[ti])}`);
    }

    default:
      return { groups, messages: [HELP] };
  }
}
