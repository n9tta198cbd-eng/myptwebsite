/*
 * Webhook Telegram-бота «Цели».
 * Переменные окружения (Vercel → Settings → Environment Variables):
 *   TELEGRAM_BOT_TOKEN       — токен от @BotFather
 *   TELEGRAM_WEBHOOK_SECRET  — любая длинная случайная строка, та же, что в scripts/telegram-setup.sh
 *   KV_REST_API_URL / KV_REST_API_TOKEN — Upstash Redis (Vercel → Storage → Upstash)
 * Регистрация вебхука: scripts/telegram-setup.sh
 */
import { run, type Group } from '@/lib/tasks';

type Update = { message?: { text?: string; chat: { id: number } } };

const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

/* Upstash REST: команда Redis приходит JSON-массивом. */
async function redis(...cmd: string[]): Promise<string | null> {
  const res = await fetch(redisUrl!, {
    method: 'POST',
    headers: { Authorization: `Bearer ${redisToken}` },
    body: JSON.stringify(cmd),
  });
  const data = (await res.json()) as { result?: string | null; error?: string };
  if (data.error) throw new Error(data.error);
  return data.result ?? null;
}

async function send(chatId: number, text: string) {
  const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: true },
    }),
  });
  if (!res.ok) console.error('sendMessage failed', res.status, await res.text());
}

export async function POST(request: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || request.headers.get('x-telegram-bot-api-secret-token') !== secret) {
    return new Response('forbidden', { status: 403 });
  }

  const message = ((await request.json()) as Update).message;
  if (!message?.text) return new Response('ok');

  /* Всегда отвечаем 200: иначе Telegram будет повторять упавший апдейт. */
  try {
    const key = `goals:${message.chat.id}`;
    const stored = await redis('GET', key);
    const before: Group[] = stored ? JSON.parse(stored) : [];
    const result = run(before, message.text);
    /* run() возвращает тот же массив, если ничего не изменилось. */
    if (result.groups !== before) await redis('SET', key, JSON.stringify(result.groups));
    for (const text of result.messages) await send(message.chat.id, text);
  } catch (err) {
    console.error('telegram handler failed', err);
    await send(message.chat.id, 'Что-то пошло не так, попробуйте ещё раз.').catch(() => {});
  }
  return new Response('ok');
}
