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
        setFormData({ email: "", company: "", message: "" });
        toast.success(t("contact.sent") || "Сообщение отправлено!");
      } else {
        const error = await response.json();

        toast.error(error.message || "Произошла ошибка при отправке");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Ошибка отправки:", error);
      toast.error("Произошла ошибка при отправке. Попробуйте позже.");
    } finally {
      setIsLoading(false);
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
