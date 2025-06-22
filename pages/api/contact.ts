import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";

import ContactEmail from "../../emails/contact-email";
import { YandexTrackerService } from "../../lib/yandex-tracker";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // DEBUG: Логируем начало обработки запроса
  // eslint-disable-next-line no-console
  console.group("🔧 BOTTLE [CODE] API Contact Debug");
  // eslint-disable-next-line no-console
  console.log("📍 Request received:", {
    method: req.method,
    url: req.url,
    headers: req.headers,
    timestamp: new Date().toISOString(),
    userAgent: req.headers["user-agent"],
    origin: req.headers.origin,
    referer: req.headers.referer,
  });

  if (req.method !== "POST") {
    // eslint-disable-next-line no-console
    console.warn("❌ Method not allowed:", req.method);
    // eslint-disable-next-line no-console
    console.groupEnd();

    return res.status(405).json({ message: "Method not allowed" });
  }

  // eslint-disable-next-line no-console
  console.log("📊 Request body:", req.body);

  const { email, company, message } = req.body;

  // Валидация
  if (!email || !message) {
    // eslint-disable-next-line no-console
    console.warn("❌ Validation failed:", {
      email: email ? "✓" : "✗ missing",
      message: message ? "✓" : "✗ missing",
      company: company || "not provided",
    });
    // eslint-disable-next-line no-console
    console.groupEnd();

    return res.status(400).json({
      message: "Email и сообщение обязательны для заполнения",
    });
  }

  // eslint-disable-next-line no-console
  console.log("✅ Validation passed");
  // eslint-disable-next-line no-console
  console.log("🔧 Environment check:", {
    nodeEnv: process.env.NODE_ENV,
    smtpUser: process.env.SMTP_USER ? "✓ set" : "✗ missing",
    smtpPass: process.env.SMTP_PASS ? "✓ set" : "✗ missing",
    // Legacy Yandex Tracker vars (старые)
    yandexToken: process.env.YANDEX_TRACKER_TOKEN ? "✓ set" : "✗ missing",
    yandexOrgId: process.env.YANDEX_TRACKER_ORG_ID ? "✓ set" : "✗ missing",
    // New Tracker vars (новые)
    trackerPrivateKey: process.env.TRACKER_PRIVATE_KEY ? "✓ set" : "✗ missing",
    trackerPrivateKeyB64: process.env.TRACKER_PRIVATE_KEY_B64
      ? "✓ set"
      : "✗ missing",
    trackerKeyId: process.env.TRACKER_KEY_ID ? "✓ set" : "✗ missing",
    trackerServiceAccount: process.env.TRACKER_SERVICE_ACCOUNT_ID
      ? "✓ set"
      : "✗ missing",
    trackerOrgId: process.env.TRACKER_ORG_ID ? "✓ set" : "✗ missing",
    trackerQueue: process.env.TRACKER_QUEUE_KEY ? "✓ set" : "✗ missing",
  });

  try {
    // Сначала создаем задачу в Яндекс.Трекере
    let taskId = "";

    try {
      // eslint-disable-next-line no-console
      console.log("🎯 Creating Yandex Tracker task...");

      const trackerService = YandexTrackerService.getInstance();
      const trackerResponse = await trackerService.createContactFormIssue(
        email,
        company,
        message,
      );

      taskId = trackerResponse.key || ""; // Получаем ID задачи
      // eslint-disable-next-line no-console
      console.log("✅ Tracker task created:", {
        taskId,
        response: trackerResponse,
      });
    } catch (trackerError) {
      // eslint-disable-next-line no-console
      console.warn("⚠️ Failed to create tracker task:", {
        error: trackerError,
        message:
          trackerError instanceof Error
            ? trackerError.message
            : String(trackerError),
        stack: trackerError instanceof Error ? trackerError.stack : undefined,
      });
      // Продолжаем без ID задачи, если Трекер недоступен
    }

    // eslint-disable-next-line no-console
    console.log("📧 Setting up email transport...");

    // Создаем транспорт для отправки (используем Яндекс.Почта SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true, // true для 465, false для других портов
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // eslint-disable-next-line no-console
    console.log("📧 Transport configured:", {
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS ? "***set***" : "***missing***",
      },
    });

    // eslint-disable-next-line no-console
    console.log("🎨 Rendering email template...");

    // Рендерим React Email в HTML
    const emailHtml = await render(
      ContactEmail({
        email,
        company,
        message,
        taskId, // Передаем ID задачи в email
      }),
    );

    // eslint-disable-next-line no-console
    console.log("✅ Email template rendered, size:", emailHtml.length, "chars");

    // Формируем тему письма с ID задачи
    const subjectPrefix = taskId ? `[${taskId}] ` : "";
    const emailSubject = `${subjectPrefix}Ваше обращение получено - BOTTLE [CODE]`;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email, // Отправляем пользователю
      bcc: "bottlecode@v-b.tech", // Скрытая копия на новый email
      subject: emailSubject,
      html: emailHtml,
    };

    // eslint-disable-next-line no-console
    console.log("📬 Sending email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      bcc: mailOptions.bcc,
      subject: mailOptions.subject,
      htmlSize: emailHtml.length,
    });

    // Отправляем письмо пользователю со скрытой копией на bottlecode@v-b.tech
    const emailResult = await transporter.sendMail(mailOptions);

    // eslint-disable-next-line no-console
    console.log("✅ Email sent successfully:", {
      messageId: emailResult.messageId,
      response: emailResult.response,
      accepted: emailResult.accepted,
      rejected: emailResult.rejected,
    });

    const successResponse = {
      message: "Письмо успешно отправлено",
      taskId: taskId || null,
      debug: {
        timestamp: new Date().toISOString(),
        emailSent: true,
        trackerTaskCreated: !!taskId,
      },
    };

    // eslint-disable-next-line no-console
    console.log("🎉 Success response:", successResponse);
    // eslint-disable-next-line no-console
    console.groupEnd();

    res.status(200).json(successResponse);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("💥 Server error occurred:", {
      error: error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    // eslint-disable-next-line no-console
    console.groupEnd();

    const errorResponse = {
      message: "Ошибка отправки письма. Попробуйте позже.",
      debug: {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      },
    };

    res.status(500).json(errorResponse);
  }
}
