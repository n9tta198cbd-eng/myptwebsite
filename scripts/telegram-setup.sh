#!/usr/bin/env bash
# Регистрирует вебхук бота и меню команд.
# Запуск (токен и секрет не сохраняются в файлах):
#   TELEGRAM_BOT_TOKEN=... TELEGRAM_WEBHOOK_SECRET=... ./scripts/telegram-setup.sh https://ваш-домен
set -euo pipefail

: "${TELEGRAM_BOT_TOKEN:?нужен TELEGRAM_BOT_TOKEN}"
: "${TELEGRAM_WEBHOOK_SECRET:?нужен TELEGRAM_WEBHOOK_SECRET}"
base="${1:?укажите адрес сайта, например https://n9tta.art}"
api="https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}"

curl -sS "${api}/setWebhook" \
  --data-urlencode "url=${base%/}/api/telegram" \
  --data-urlencode "secret_token=${TELEGRAM_WEBHOOK_SECRET}" \
  --data-urlencode 'allowed_updates=["message"]'
echo

curl -sS "${api}/setMyCommands" \
  --data-urlencode 'commands=[
    {"command":"list","description":"Показать все цели"},
    {"command":"group","description":"Создать группу: /group Здоровье"},
    {"command":"add","description":"Добавить задачу: /add 1 Бегать"},
    {"command":"del","description":"Удалить задачу: /del 1.2"}
  ]'
echo
