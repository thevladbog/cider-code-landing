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
    // Сначала создаем задачу в Яндекс.Трекере
    let taskId = "";

    try {
      const trackerService = YandexTrackerService.getInstance();
      const trackerResponse = await trackerService.createContactFormIssue(
        email,
        company,
        message,
      );

      taskId = trackerResponse.key || ""; // Получаем ID задачи
    } catch (trackerError) {
      // eslint-disable-next-line no-console
      console.warn("Не удалось создать задачу в Трекере:", trackerError);
      // Продолжаем без ID задачи, если Трекер недоступен
    }

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

    // Рендерим React Email в HTML
    const emailHtml = await render(
      ContactEmail({
        email,
        company,
        message,
        taskId, // Передаем ID задачи в email
      }),
    );

    // Формируем тему письма с ID задачи
    const subjectPrefix = taskId ? `[${taskId}] ` : "";
    const emailSubject = `${subjectPrefix}Ваше обращение получено - BOTTLE [CODE]`;

    // Отправляем письмо пользователю со скрытой копией на bottlecode@v-b.tech
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email, // Отправляем пользователю
      bcc: "bottlecode@v-b.tech", // Скрытая копия на новый email
      subject: emailSubject,
      html: emailHtml,
    });

    res.status(200).json({
      message: "Письмо успешно отправлено",
      taskId: taskId || null,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Ошибка отправки письма:", error);
    res.status(500).json({
      message: "Ошибка отправки письма. Попробуйте позже.",
    });
  }
}
