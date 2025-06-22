import jwt from "jsonwebtoken";
import axios, { AxiosRequestConfig } from "axios";

interface JwtHeader {
  kid: string;
  alg: string;
}

interface JwtPayload {
  aud: string;
  iss: string;
  iat: number;
  exp: number;
}

interface IAMTokenResponse {
  iamToken: string;
  expiresAt: string;
}

interface TrackerIssue {
  summary: string;
  description: string;
  queue: string;
  type?: string;
  priority?: string;
  tags?: string[];
  email?: string; // Добавлено для поддержки email
  company?: string; // Добавлено для поддержки компании
}

export class YandexTrackerService {
  private static instance: YandexTrackerService;
  private cachedToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    // Singleton pattern для кеширования токена
  }

  static getInstance(): YandexTrackerService {
    if (!YandexTrackerService.instance) {
      YandexTrackerService.instance = new YandexTrackerService();
    }

    return YandexTrackerService.instance;
  }

  async getIAMToken(): Promise<string> {
    const now = Math.floor(Date.now() / 1000);

    // Проверяем кеш токена
    if (this.cachedToken && this.tokenExpiry > now + 300) {
      return this.cachedToken;
    }

    const privateKey = process.env.TRACKER_PRIVATE_KEY;
    const keyId = process.env.TRACKER_KEY_ID;
    const serviceAccountId = process.env.TRACKER_SERVICE_ACCOUNT_ID;

    if (!privateKey || !keyId || !serviceAccountId) {
      throw new Error("Не настроены переменные окружения для Яндекс.Трекера");
    }

    const header: JwtHeader = {
      kid: keyId,
      alg: "PS256",
    };

    const payload: JwtPayload = {
      aud: "https://iam.api.cloud.yandex.net/iam/v1/tokens",
      iss: serviceAccountId,
      iat: now,
      exp: now + 3600,
    };

    try {
      const jwtToken = jwt.sign(payload, privateKey, {
        algorithm: "PS256",
        header,
      });

      const iamUrl = "https://iam.api.cloud.yandex.net/iam/v1/tokens";
      const requestConfig: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post<IAMTokenResponse>(
        iamUrl,
        { jwt: jwtToken },
        requestConfig,
      );

      this.cachedToken = response.data.iamToken;
      this.tokenExpiry = now + 3300;

      return this.cachedToken;
    } catch (error) {
      throw new Error(`Ошибка получения IAM токена: ${error}`);
    }
  }

  async createIssue(issue: TrackerIssue): Promise<any> {
    const orgId = process.env.TRACKER_ORG_ID;

    if (!orgId) {
      throw new Error("Не настроена переменная TRACKER_ORG_ID");
    }

    try {
      const iamToken = await this.getIAMToken();
      const trackerUrl = "https://api.tracker.yandex.net/v2/issues";
      const requestConfig: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${iamToken}`,
          "X-Cloud-Org-ID": orgId,
        },
      };

      const issueData = {
        summary: issue.summary,
        description: issue.description,
        queue: issue.queue,
        tags: issue.tags || [],
        emailFromString: issue.email || "",
        company: issue.company || "",
      };

      const response = await axios.post(trackerUrl, issueData, requestConfig);

      return response.data;
    } catch (error) {
      throw new Error(`Ошибка создания задачи в Трекере: ${error}`);
    }
  }

  async createContactFormIssue(
    email: string,
    company: string | undefined,
    message: string,
  ): Promise<any> {
    const queueKey = process.env.TRACKER_QUEUE_KEY || "SUPPORT";
    const summary = `Новое обращение - ${company || "Без компании"}`;
    const description = `
С сайта [bottlecode.app](https://bottlecode.app) получено новое обращение!

---

**Email:** ${email}

**Компания:** ${company || "Не указана"}

{% note info "Сообщение" %}

${message}

{% endnote %}

---

Письмо также было отправлено на указанный email
    `.trim();

    return this.createIssue({
      summary,
      description,
      queue: queueKey,
      tags: ["from:site", "contact-form"],
      email,
      company,
    });
  }
}
