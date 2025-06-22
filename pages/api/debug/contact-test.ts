import { NextApiRequest, NextApiResponse } from "next";

/**
 * Тестовый endpoint для проверки доступности contact API
 * Вызовите GET /api/debug/contact-test для проверки окружения
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Проверяем все переменные окружения
  const envCheck = {
    NODE_ENV: process.env.NODE_ENV,
    SMTP_USER: process.env.SMTP_USER ? "✓ set" : "✗ missing",
    SMTP_PASS: process.env.SMTP_PASS ? "✓ set" : "✗ missing",
    YANDEX_TRACKER_TOKEN: process.env.YANDEX_TRACKER_TOKEN
      ? "✓ set"
      : "✗ missing",
    YANDEX_TRACKER_ORG_ID: process.env.YANDEX_TRACKER_ORG_ID
      ? "✓ set"
      : "✗ missing",
    // Новые переменные для Яндекс.Трекера
    TRACKER_PRIVATE_KEY: process.env.TRACKER_PRIVATE_KEY
      ? "✓ set"
      : "✗ missing",
    TRACKER_PRIVATE_KEY_B64: process.env.TRACKER_PRIVATE_KEY_B64
      ? "✓ set"
      : "✗ missing",
    TRACKER_KEY_ID: process.env.TRACKER_KEY_ID ? "✓ set" : "✗ missing",
    TRACKER_SERVICE_ACCOUNT_ID: process.env.TRACKER_SERVICE_ACCOUNT_ID
      ? "✓ set"
      : "✗ missing",
    TRACKER_ORG_ID: process.env.TRACKER_ORG_ID ? "✓ set" : "✗ missing",
    TRACKER_QUEUE_KEY: process.env.TRACKER_QUEUE_KEY ? "✓ set" : "✗ missing",
  };

  // Проверяем доступность модулей
  let modulesCheck;

  try {
    const nodemailer = await import("nodemailer");
    const reactEmail = await import("@react-email/render");
    const trackerLib = await import("../../../lib/yandex-tracker");
    const contactEmail = await import("../../../emails/contact-email");

    modulesCheck = {
      nodemailer: nodemailer ? "✓ available" : "✗ not found",
      "@react-email/render": reactEmail ? "✓ available" : "✗ not found",
      "yandex-tracker lib": trackerLib ? "✓ available" : "✗ not found",
      "contact-email template": contactEmail ? "✓ available" : "✗ not found",
    };
  } catch (error) {
    modulesCheck = {
      error: "Failed to load modules",
      details: error instanceof Error ? error.message : String(error),
    };
  }

  // Проверяем доступность SMTP
  let smtpCheck;

  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = await import("nodemailer");

      // Расширенная диагностика SMTP
      const smtpDiagnostics = {
        user: process.env.SMTP_USER,
        userLength: process.env.SMTP_USER.length,
        passLength: process.env.SMTP_PASS.length,
        userDomain: process.env.SMTP_USER.includes("@")
          ? process.env.SMTP_USER.split("@")[1]
          : "no domain",
        passStartsWith: process.env.SMTP_PASS.substring(0, 3) + "***",
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
      };

      const transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        // Добавляем дополнительные опции для диагностики
        debug: true,
        logger: false,
      });

      // Проверяем подключение (но не отправляем письмо)
      await transporter.verify();
      smtpCheck = {
        status: "✓ SMTP connection successful",
        diagnostics: smtpDiagnostics,
      };
    } else {
      smtpCheck = "✗ SMTP credentials missing";
    }
  } catch (error) {
    const errorDetails: any = {
      status: "✗ SMTP connection failed",
      error: error instanceof Error ? error.message : String(error),
      errorCode:
        error instanceof Error && "code" in error ? error.code : "unknown",
      errorType: error instanceof Error ? error.constructor.name : "unknown",
    };

    // Дополнительная диагностика для частых проблем
    if (errorDetails.error.includes("authentication failed")) {
      errorDetails.possibleCauses = [
        "1. Неверный email адрес",
        "2. Неверный пароль приложения",
        "3. Не включена двухфакторная аутентификация",
        "4. Пароль приложения не для Почта",
        "5. Аккаунт заблокирован или ограничен",
      ];
      errorDetails.solutions = [
        "1. Проверьте правильность email в SMTP_USER",
        "2. Создайте новый пароль приложения для Почта",
        "3. Включите 2FA в Яндекс.Паспорт",
        "4. Попробуйте зайти в почту через веб-интерфейс",
      ];
    }

    smtpCheck = errorDetails;
  }

  // Простая проверка Yandex Tracker
  const trackerCheck =
    process.env.TRACKER_OAUTH_TOKEN && process.env.TRACKER_ORG_ID
      ? "✓ Tracker credentials present"
      : "✗ Tracker credentials missing";

  const debugInfo = {
    timestamp: new Date().toISOString(),
    server: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
    },
    environment: envCheck,
    modules: modulesCheck,
    smtp: smtpCheck,
    tracker: trackerCheck,
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      userAgent: req.headers["user-agent"],
      origin: req.headers.origin,
    },
    debugTools: {
      testPage: "/debug/contact - интерактивная форма для тестирования",
      localSmtpTest: "smtp-yandex-test.js - локальный тест SMTP",
      documentation: [
        "docs/FINAL-ACTION-PLAN.md - план устранения проблем",
        "docs/YANDEX-SMTP-TROUBLESHOOTING.md - решение SMTP ошибок",
      ],
      troubleshooting: {
        step1: "Запустите локально: node smtp-yandex-test.js",
        step2: "Если не работает - создайте новый пароль приложения Яндекс",
        step3: "Обновите GitHub Secrets и передеплойте",
        step4: "Проверьте этот endpoint после изменений",
      },
    },
  };

  res.status(200).json({
    message: "Contact API debug information",
    debug: debugInfo,
  });
}
