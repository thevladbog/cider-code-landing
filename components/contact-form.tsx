import { useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { useTranslation } from "next-i18next";
import toast from "react-hot-toast";

export const ContactForm = () => {
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();

        setFormData({ email: "", company: "", message: "" });
        toast.success(t("contact.sent") || "Сообщение отправлено!");
      } else {
        let error;
        const contentType = response.headers.get("content-type");

        try {
          if (contentType && contentType.includes("application/json")) {
            error = await response.json();
          } else {
            const textError = await response.text();

            error = { message: textError || "Unknown error" };
          }
        } catch {
          error = { message: "Failed to parse error response" };
        }

        toast.error(error.message || "Произошла ошибка при отправке");
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        toast.error("Ошибка сети. Проверьте подключение к интернету.");
      } else {
        toast.error("Произошла ошибка при отправке. Попробуйте позже.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-4 md:p-6">
      <CardBody>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            isRequired
            className="text-sm md:text-base"
            label={t("contact.email") || "Рабочий Email"}
            type="email"
            value={formData.email}
            onValueChange={handleChange("email")}
          />

          <Input
            className="text-sm md:text-base"
            label={t("contact.company") || "Компания"}
            value={formData.company}
            onValueChange={handleChange("company")}
          />

          <Textarea
            isRequired
            className="text-sm md:text-base"
            label={t("contact.message") || "Сообщение"}
            minRows={4}
            value={formData.message}
            onValueChange={handleChange("message")}
          />

          <Button
            className="w-full min-h-12"
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
