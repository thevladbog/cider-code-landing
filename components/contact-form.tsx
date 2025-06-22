import { useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { useTranslation } from "next-i18next";
import toast from "react-hot-toast";

export const ContactForm = () => {
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // DEBUG: Логируем начало отправки
    console.group("🚀 BOTTLE [CODE] Contact Form Debug");
    console.log("📝 Form submission started");
    console.log("📊 Form data:", formData);
    console.log("🌍 User agent:", navigator.userAgent);
    console.log("📍 Current URL:", window.location.href);
    console.log("⏰ Timestamp:", new Date().toISOString());

    try {
      const requestPayload = JSON.stringify(formData);

      console.log("📤 Request payload:", requestPayload);
      console.log("📤 Request size:", new Blob([requestPayload]).size, "bytes");

      const startTime = performance.now();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestPayload,
      });

      const endTime = performance.now();

      console.log(
        "⏱️ Request duration:",
        Math.round(endTime - startTime),
        "ms",
      );
      console.log("📥 Response status:", response.status, response.statusText);
      console.log(
        "📥 Response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      if (response.ok) {
        const responseData = await response.json();

        console.log("✅ Success response:", responseData);

        setLastResponse(responseData);
        setFormData({ email: "", company: "", message: "" });
        toast.success(t("contact.sent") || "Сообщение отправлено!");

        console.log("🎉 Form submitted successfully");
        console.log("📧 Task ID:", responseData.taskId || "No task ID");
      } else {
        let error;
        const contentType = response.headers.get("content-type");

        console.log("❌ Error response content-type:", contentType);

        try {
          if (contentType && contentType.includes("application/json")) {
            error = await response.json();
            console.log("❌ Error response (JSON):", error);
          } else {
            const textError = await response.text();

            console.log("❌ Error response (Text):", textError);
            error = { message: textError || "Unknown error" };
          }
        } catch (parseError) {
          console.error("❌ Failed to parse error response:", parseError);
          error = { message: "Failed to parse error response" };
        }

        console.error("💥 Server error details:", {
          status: response.status,
          statusText: response.statusText,
          error: error,
          url: response.url,
        });

        toast.error(error.message || "Произошла ошибка при отправке");
      }
    } catch (error) {
      console.error("💥 Network/Client error:", error);
      console.error("🔍 Error details:", {
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        networkState: navigator.onLine ? "online" : "offline",
      });

      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.error("🌐 Network error detected - check connectivity");
        toast.error("Ошибка сети. Проверьте подключение к интернету.");
      } else {
        toast.error("Произошла ошибка при отправке. Попробуйте позже.");
      }
    } finally {
      setIsLoading(false);
      console.log("🏁 Form submission finished");
      console.groupEnd();
    }
  };

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6">
      <CardBody>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            isRequired
            label={t("contact.email") || "Рабочий Email"}
            type="email"
            value={formData.email}
            onValueChange={handleChange("email")}
          />

          <Input
            label={t("contact.company") || "Компания"}
            value={formData.company}
            onValueChange={handleChange("company")}
          />

          <Textarea
            isRequired
            label={t("contact.message") || "Сообщение"}
            minRows={4}
            value={formData.message}
            onValueChange={handleChange("message")}
          />

          <Button
            className="w-full"
            color="primary"
            isLoading={isLoading}
            size="lg"
            type="submit"
          >
            {t("contact.send") || "Отправить"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
