# 🔍 Проверка деплоя и переменных окружения

## Проблемы найденные в deploy.yml

### 1. Отсутствует TRACKER_PRIVATE_KEY_B64 в debug секции
В секции "Debug secrets and build context" проверяется `TRACKER_PRIVATE_KEY`, но не `TRACKER_PRIVATE_KEY_B64`.

### 2. В build секции не передается TRACKER_PRIVATE_KEY
В build секции используется только `TRACKER_PRIVATE_KEY_B64`, но не `TRACKER_PRIVATE_KEY`.

## Исправления

### 1. Обновить секцию Debug
```yaml
- name: Debug secrets and build context
  env:
    # ...existing vars...
    TRACKER_PRIVATE_KEY: ${{ secrets.TRACKER_PRIVATE_KEY }}
    TRACKER_PRIVATE_KEY_B64: ${{ secrets.TRACKER_PRIVATE_KEY_B64 }}
    # ...other vars...
  run: |
    echo "Checking secrets (length only, not values):"
    # ...existing checks...
    echo "TRACKER_PRIVATE_KEY length: ${#TRACKER_PRIVATE_KEY}"
    echo "TRACKER_PRIVATE_KEY_B64 length: ${#TRACKER_PRIVATE_KEY_B64}"
```

### 2. Обновить build args
```yaml
docker build \
  # ...existing args...
  --build-arg TRACKER_PRIVATE_KEY="$TRACKER_PRIVATE_KEY" \
  --build-arg TRACKER_PRIVATE_KEY_B64="$TRACKER_PRIVATE_KEY_B64" \
  # ...other args...
```

## Тестирование на продакшене

### 1. Проверить через debug endpoint
```bash
curl https://bottlecode.app/api/debug/contact-test
```

### 2. Ожидаемые переменные
```json
{
  "environment": {
    "TRACKER_PRIVATE_KEY": "✓ set",
    "TRACKER_PRIVATE_KEY_B64": "✓ set",
    "TRACKER_KEY_ID": "✓ set",
    "TRACKER_SERVICE_ACCOUNT_ID": "✓ set",
    "TRACKER_ORG_ID": "✓ set",
    "TRACKER_QUEUE_KEY": "✓ set"
  }
}
```

## Альтернативные решения

### Если base64 не нужен
Можно использовать только `TRACKER_PRIVATE_KEY` и убрать `TRACKER_PRIVATE_KEY_B64`:

1. Убрать из Dockerfile:
```dockerfile
# ARG TRACKER_PRIVATE_KEY_B64  # удалить
# ENV TRACKER_PRIVATE_KEY_B64=$TRACKER_PRIVATE_KEY_B64  # удалить
```

2. Убрать из deploy.yml:
```yaml
# TRACKER_PRIVATE_KEY_B64: ${{ secrets.TRACKER_PRIVATE_KEY_B64 }}  # удалить
# --build-arg TRACKER_PRIVATE_KEY_B64="$TRACKER_PRIVATE_KEY_B64" \  # удалить
```

### Если base64 обязателен
Убрать `TRACKER_PRIVATE_KEY` и использовать только `TRACKER_PRIVATE_KEY_B64`.

## Рекомендации

1. **Выберите один формат** - либо обычный ключ, либо base64
2. **Обновите все места** - Dockerfile, deploy.yml, код
3. **Протестируйте локально** перед деплоем
4. **Проверьте логи** после деплоя

## Быстрое исправление

Обновить только deploy.yml (не меняя код):
```yaml
# В debug секции добавить
echo "TRACKER_PRIVATE_KEY_B64 length: ${#TRACKER_PRIVATE_KEY_B64}"

# В build секции добавить
--build-arg TRACKER_PRIVATE_KEY="$TRACKER_PRIVATE_KEY" \
```
