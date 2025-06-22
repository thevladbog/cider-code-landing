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
      const transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Проверяем подключение (но не отправляем письмо)
      await transporter.verify();
      smtpCheck = "✓ SMTP connection successful";
    } else {
      smtpCheck = "✗ SMTP credentials missing";
    }
  } catch (error) {
    smtpCheck = {
      status: "✗ SMTP connection failed",
      error: error instanceof Error ? error.message : String(error),
    };
  }

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
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      userAgent: req.headers["user-agent"],
      origin: req.headers.origin,
    },
  };

  res.status(200).json({
    message: "Contact API debug information",
    debug: debugInfo,
  });
}
