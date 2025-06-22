# BOTTLE [CODE] Landing Page

Современный лендинг для решения автоматизации маркировки в производстве напитков.

## 🚀 Технологии

- **Next.js 15** - React фреймворк с поддержкой SSG
- **TypeScript** - строгая типизация
- **HeroUI** - современная UI библиотека
- **Tailwind CSS** - utility-first CSS фреймворк
- **Next-i18next** - интернационализация (русский/английский)
- **Framer Motion** - анимации
- **React Email + Nodemailer** - отправка писем с красивыми шаблонами
- **React Hot Toast** - стильные уведомления
- **Яндекс.Трекер API** - автоматическое создание задач
- **JWT + Axios** - авторизация и HTTP запросы

## 🌟 Функциональность

- ✅ Адаптивный дизайн
- ✅ Многоязычность (RU/EN)
- ✅ Темная/светлая тема
- ✅ Галерея скриншотов с модальными окнами
- ✅ Контактная форма с отправкой email
- ✅ Красивые email-уведомления
- ✅ Toast-уведомления
- ✅ Интеграция с Яндекс.Трекером
- ✅ Автоматическое создание задач
- ✅ SEO оптимизация
- ✅ Современный UI/UX

## 🎨 Секции

1. **Hero** - главный экран с описанием продукта
2. **Features** - возможности веб и desktop решений
3. **Demo** - галереи скриншотов интерфейсов
4. **Testimonials** - отзывы клиентов
5. **Pricing** - информация о стоимости
6. **Contact** - форма связи и контакты

## 🚀 Быстрый старт

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

### Сборка для продакшена
```bash
npm run build
npm start
```

## 📁 Структура проекта

```
├── components/          # React компоненты
│   ├── screenshot-gallery.tsx
│   ├── testimonial.tsx
│   ├── contact-form.tsx
│   ├── language-switch.tsx
│   └── footer.tsx
├── pages/              # Страницы Next.js
├── public/             # Статические файлы
│   ├── screenshots/    # Скриншоты продукта
│   └── locales/        # Файлы переводов
├── layouts/            # Компоненты макетов
└── config/             # Конфигурация
```

## 🌐 Интернационализация

Поддерживаемые языки:
- 🇷🇺 Русский (по умолчанию)
- 🇺🇸 English

Переводы находятся в:
- `public/locales/ru/common.json`
- `public/locales/en/common.json`

## 🎨 Дизайн система

### Цветовая схема
- **Primary**: #fca311 (оранжевый бренда)
- **Secondary**: #edf2f4 (светло-серый)

### Брендинг
- Логотип: `public/BOTLLE-CODE-LOGO.png`
- Иконка desktop приложения: `public/screenshots/desktop/BOTTLE-CODE-APP-Icon.png`

## 📱 Скриншоты

### Веб-интерфейс
- Аутентификация
- Управление продукцией
- Управление сменами
- Управление пользователями

### Desktop приложение
- Вход в систему
- Проверка оборудования
- Рабочие экраны
- Режим упаковки

## 🔧 Настройка

### Конфигурация сайта
Основные настройки в `config/site.ts`:
- Название сайта
- Навигация
- Ссылки на социальные сети
- Контактная информация

### Цветовая тема
Настройка в `tailwind.config.js` с кастомными цветами бренда.

## 📧 Настройка Email

Для работы контактной формы необходимо настроить SMTP:

### 1. Создайте файл `.env.local`
```bash
cp .env.local.example .env.local
```

### 2. Настройте SMTP переменные

**Для Яндекс.Почты (рекомендуется):**
1. Включите двухфакторную аутентификацию в Яндекс ID
2. Создайте пароль приложения: https://yandex.ru/support/id/authorization/app-passwords.html
3. Добавьте в `.env.local`:
```
SMTP_USER=your-email@yandex.ru
SMTP_PASS=your-app-password
```

**Для Gmail:**
1. Включите двухфакторную аутентификацию
2. Создайте пароль приложения: https://support.google.com/accounts/answer/185833
3. Добавьте в `.env.local`:
```
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Для других провайдеров** см. `README-EMAIL-SETUP.md`

### 3. Настройка Яндекс.Трекера (опционально)

Для автоматического создания задач в Трекере:

1. Настройте сервисный аккаунт в Яндекс.Облаке
2. Получите авторизованный ключ
3. Добавьте переменные в `.env.local`:
```
TRACKER_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
TRACKER_KEY_ID=your-key-id
TRACKER_SERVICE_ACCOUNT_ID=your-service-account-id
TRACKER_ORG_ID=your-organization-id
TRACKER_QUEUE_KEY=SUPPORT
```

**Подробная инструкция** в `README-TRACKER-SETUP.md`

### 4. Перезапустите сервер
```bash
npm run dev
```

Письма будут приходить на `hello@bottlecode.app` с красивым HTML-шаблоном.

## 📞 Контакты

- **Email**: hello@bottlecode.app
- **Website**: bottlecode.app
- **GitHub**: https://github.com/bottlecode

## 📄 Лицензия

© 2025 BOTTLE [CODE]. Все права защищены.
