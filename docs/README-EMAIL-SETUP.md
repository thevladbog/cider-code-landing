# Создайте файл .env.local со следующими переменными:

# SMTP Configuration для отправки писем

# Для Яндекс.Почты (рекомендуется):
# 1. Включите двухфакторную аутентификацию в Яндекс ID
# 2. Создайте пароль приложения: https://yandex.ru/support/id/authorization/app-passwords.html
# 3. Используйте этот пароль приложения в SMTP_PASS

SMTP_USER=your-email@yandex.ru
SMTP_PASS=your-app-password

# Для Gmail:
# 1. Включите двухфакторную аутентификацию в Google аккаунте
# 2. Создайте пароль приложения: https://support.google.com/accounts/answer/185833
# 3. Используйте этот пароль приложения в SMTP_PASS

# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password

# Next.js configuration
NEXTAUTH_URL=http://localhost:3000

# Пример для других SMTP серверов:
# Для Mail.ru:
# SMTP_HOST=smtp.mail.ru  
# SMTP_PORT=465
# SMTP_SECURE=true
