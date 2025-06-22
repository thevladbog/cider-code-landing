import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  email: string;
  company?: string;
  message: string;
  taskId?: string;
}

export const ContactEmail = ({
  email,
  company,
  message,
  taskId,
}: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>Ваше обращение получено - BOTTLE [CODE]</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Text style={logoText}>BOTTLE [CODE]</Text>
        </Section>

        {/* Content */}
        <Section style={content}>
          <Heading style={heading}>Ваше обращение получено</Heading>

          <Text style={paragraph}>
            Спасибо за обращение! Мы получили ваше сообщение через форму
            обратной связи на сайте BOTTLE [CODE] и свяжемся с вами в ближайшее
            время.
          </Text>

          {taskId && (
            <Section style={taskBox}>
              <Text style={taskTitle}>Номер вашего обращения:</Text>
              <Text style={taskNumber}>{taskId}</Text>
              <Text style={taskDescription}>
                Используйте этот номер при обращении
              </Text>
            </Section>
          )}

          <Section style={infoBox}>
            <Text style={infoTitle}>Контактная информация:</Text>
            <Text style={infoItem}>
              <strong>Email:</strong> {email}
            </Text>
            {company && (
              <Text style={infoItem}>
                <strong>Компания:</strong> {company}
              </Text>
            )}
          </Section>

          <Section style={messageBox}>
            <Text style={infoTitle}>Сообщение:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          {/* Urgent Contact Block */}
          <Section style={urgentBox}>
            <div style={urgentHeader}>
              <span style={lightningIcon}>⚡</span>
              <Text style={urgentTitle}>Срочный вопрос?</Text>
              <span style={lightningIcon}>⚡</span>
            </div>
            <Text style={urgentText}>
              Если ваш вопрос требует немедленного внимания, напишите напрямую
              на{" "}
              <Link href="mailto:hello@bottlecode.app" style={urgentLink}>
                hello@bottlecode.app
              </Link>
            </Text>
            {taskId && (
              <Text style={urgentImportant}>
                ⚠️{" "}
                <strong>ОБЯЗАТЕЛЬНО укажите в теме письма: [{taskId}]</strong>
              </Text>
            )}
            {!taskId && (
              <Text style={urgentImportant}>
                💡 При обращении укажите в теме номер вашего обращения для
                быстрой обработки
              </Text>
            )}
            <Text style={urgentSubtext}>Мы ответим в кратчайшие сроки! 🚀</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Это письмо отправлено автоматически с сайта{" "}
            <Link href="https://bottlecode.app" style={link}>
              bottlecode.app
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactEmail;

// Стили
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  padding: "32px 24px",
  textAlign: "center" as const,
  backgroundColor: "#fca311",
};

const logoText = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#ffffff",
  margin: "0",
  letterSpacing: "1px",
};

const content = {
  padding: "24px",
};

const heading = {
  fontSize: "24px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  margin: "0 0 24px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.4",
  color: "#484848",
  margin: "0 0 24px",
};

const infoBox = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
};

const messageBox = {
  backgroundColor: "#fff5e1",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
  border: "1px solid #fca311",
};

const infoTitle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#333333",
  margin: "0 0 12px",
};

const infoItem = {
  fontSize: "14px",
  lineHeight: "1.4",
  color: "#555555",
  margin: "0 0 8px",
};

const messageText = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#333333",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "32px 0",
};

const footer = {
  fontSize: "12px",
  lineHeight: "1.4",
  color: "#8898aa",
  textAlign: "center" as const,
};

const link = {
  color: "#fca311",
  textDecoration: "none",
};

const urgentBox = {
  backgroundColor: "#6366f1",
  borderRadius: "12px",
  padding: "20px",
  margin: "24px 0",
  textAlign: "center" as const,
};

const urgentHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "12px",
};

const lightningIcon = {
  fontSize: "20px",
  margin: "0 8px",
};

const urgentTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#ffffff",
  margin: "0",
};

const urgentText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#e0e7ff",
  margin: "0 0 8px",
};

const urgentLink = {
  color: "#fbbf24",
  textDecoration: "underline",
  fontWeight: "600",
};

const urgentSubtext = {
  fontSize: "12px",
  color: "#c7d2fe",
  margin: "0",
};

const urgentImportant = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#fbbf24",
  margin: "8px 0",
  fontWeight: "600",
};

const taskBox = {
  backgroundColor: "#e1f5fe",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
  textAlign: "center" as const,
  border: "2px solid #03a9f4",
};

const taskTitle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#0277bd",
  margin: "0 0 8px",
};

const taskNumber = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#01579b",
  margin: "0 0 8px",
  fontFamily: "monospace",
};

const taskDescription = {
  fontSize: "12px",
  color: "#0288d1",
  margin: "0",
};
