import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";

import ContactEmail from "../../emails/contact-email";
import { YandexTrackerService } from "../../lib/yandex-tracker";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, company, message } = req.body;

  // Валидация
  if (!email || !message) {
    return res.status(400).json({
      message: "Email и сообщение обязательны для заполнения",
    });
  }

  try {
    // Создаем задачу в Яндекс.Трекере
    let taskId = "";

    try {
      const trackerService = YandexTrackerService.getInstance();
      const trackerResponse = await trackerService.createContactFormIssue(
        email,
        company,
        message,
      );

      taskId = trackerResponse.key || "";
    } catch {
      // Продолжаем без ID задачи, если Трекер недоступен
    }

    // Создаем транспорт для отправки
    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Рендерим React Email в HTML
    const emailHtml = await render(
      ContactEmail({
        email,
        company,
        message,
        taskId,
      }),
    );

    // Формируем тему письма с ID задачи
    const subjectPrefix = taskId ? `[${taskId}] ` : "";
    const emailSubject = `${subjectPrefix}Ваше обращение получено - BOTTLE [CODE]`;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      bcc: "bottlecode@v-b.tech",
      subject: emailSubject,
      html: emailHtml,
    };

    // Отправляем письмо
    await transporter.sendMail(mailOptions);

    const successResponse = {
      message: "Письмо успешно отправлено",
      taskId: taskId || null,
      debug: {
        timestamp: new Date().toISOString(),
        emailSent: true,
        trackerTaskCreated: !!taskId,
      },
    };

    res.status(200).json(successResponse);
  } catch (error) {
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
