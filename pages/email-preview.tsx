import { render } from "@react-email/render";
import { GetServerSideProps } from "next";

import ContactEmail from "../emails/contact-email";

interface EmailPreviewProps {
  emailHtml: string;
}

export default function EmailPreview({ emailHtml }: EmailPreviewProps) {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
        <h1>Email Preview - Contact Form</h1>
        <p>Предварительный просмотр email-шаблона</p>
      </div>
      <iframe
        srcDoc={emailHtml}
        style={{
          width: "100%",
          height: "calc(100vh - 120px)",
          border: "none",
        }}
        title="Email Preview"
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Генерируем тестовые данные
  const testData = {
    email: "test@example.com",
    company: "Тестовая компания",
    message: "Это тестовое сообщение для проверки email-шаблона",
  };

  // Рендерим email в HTML
  const emailHtml = await render(ContactEmail(testData));

  return {
    props: {
      emailHtml,
    },
  };
};
