# 🔧 Исправление deploy.yml

## Проблема
Docker build падал с ошибкой:
```
ERROR: docker: 'docker buildx build' requires 1 argument
```

## Причина
В строке docker build отсутствовал правильный перенос строки:
```yaml
--build-arg SMTP_USER="$SMTP_USER" \            --build-arg SMTP_PASS="$SMTP_PASS" \
```

## Исправление
```yaml
--build-arg SMTP_USER="$SMTP_USER" \
--build-arg SMTP_PASS="$SMTP_PASS" \
```

## Дополнительные улучшения
1. ✅ Добавлена переменная `TRACKER_PRIVATE_KEY_B64` в debug секцию
2. ✅ Добавлена проверка длины `TRACKER_PRIVATE_KEY_B64` в логах
3. ✅ Исправлен синтаксис YAML файла

## Результат
Теперь deploy должен пройти успешно с правильной передачей всех переменных в Docker контейнер.

## Проверка
После успешного деплоя можно проверить:
```bash
curl https://bottlecode.app/api/debug/contact-test
```

Ожидаемый результат должен показать все переменные как установленные:
```json
{
  "environment": {
    "TRACKER_PRIVATE_KEY": "✓ set",
    "TRACKER_PRIVATE_KEY_B64": "✓ set"
  }
}
```
