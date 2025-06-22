import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";

export default function ContactDebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testContactAPI = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/debug/contact-test");
      const data = await response.json();

      setDebugInfo(data);
    } catch (error) {
      setDebugInfo({
        error: "Failed to fetch debug info",
        details: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testContactForm = async () => {
    setIsLoading(true);

    console.group("🧪 Manual Contact Form Test");
    console.log("Testing contact form with dummy data...");

    try {
      const testData = {
        email: "test@example.com",
        company: "Test Company",
        message: "This is a test message from debug page",
      };

      console.log("Test data:", testData);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      });

      const result = await response.json();

      console.log("Response status:", response.status);
      console.log("Response data:", result);

      setDebugInfo({
        testType: "Contact Form Test",
        status: response.status,
        success: response.ok,
        response: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Test error:", error);
      setDebugInfo({
        testType: "Contact Form Test",
        error: "Test failed",
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      });
    } finally {
      console.groupEnd();
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <h1 className="text-2xl font-bold">
              🔧 BOTTLE [CODE] Contact Debug
            </h1>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600 mb-4">
              Используйте эту страницу для отладки проблем с формой обратной
              связи
            </p>

            <div className="flex gap-4 mb-6">
              <Button
                color="primary"
                isLoading={isLoading}
                onClick={testContactAPI}
              >
                Проверить API Environment
              </Button>

              <Button
                color="secondary"
                isLoading={isLoading}
                onClick={testContactForm}
              >
                Тест отправки формы
              </Button>
            </div>

            <div className="text-sm text-gray-500">
              <p>• Откройте DevTools (F12) для просмотра подробных логов</p>
              <p>• Проверьте вкладку Console для отладочной информации</p>
              <p>• Проверьте вкладку Network для анализа запросов</p>
            </div>
          </CardBody>
        </Card>

        {debugInfo && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Результаты тестирования</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
