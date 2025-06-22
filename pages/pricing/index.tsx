import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function PricingPage() {
  return (
    <DefaultLayout
      description="Стоимость решения BOTTLE [CODE] для автоматизации маркировки. Гибкое ценообразование и индивидуальный расчет"
      keywords="стоимость, цена, тарифы, BOTTLE CODE, маркировка, расчет стоимости"
      title="Стоимость решения"
    >
      <section className="flex flex-col items-center justify-center gap-4 py-16 md:py-20">
        <div className="inline-block max-w-4xl text-center justify-center">
          <h1 className={title({ size: "lg" })}>Стоимость решения</h1>
          <div className={subtitle({ class: "mt-6 text-lg" })}>
            Гибкое ценообразование под ваши потребности
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <Card className="p-8 text-center">
            <CardBody>
              <h2 className="text-3xl font-bold mb-4">Индивидуальный расчет</h2>
              <p className="text-lg text-default-600 mb-8">
                Стоимость решения рассчитывается индивидуально в зависимости от
                объемов производства и требований к интеграции
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  В стоимость входит:
                </h3>
                <ul className="text-left max-w-md mx-auto space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Лицензия на использование
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Развертывание под заказчика
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Настройка интеграций
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Техническая поддержка
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Обучение сотрудников
                  </li>
                </ul>
              </div>

              <Button
                as="a"
                color="primary"
                href="#contact"
                radius="full"
                size="lg"
                variant="shadow"
              >
                Получить расчет
              </Button>
            </CardBody>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <CardBody>
              <h3 className="text-xl font-semibold mb-2">Быстрый старт</h3>
              <p className="text-default-600">
                Базовая настройка и запуск в течение 1-2 недель
              </p>
            </CardBody>
          </Card>

          <Card className="p-6 text-center">
            <CardBody>
              <h3 className="text-xl font-semibold mb-2">Интеграция</h3>
              <p className="text-default-600">
                Подключение к существующим ERP и MES системам
              </p>
            </CardBody>
          </Card>

          <Card className="p-6 text-center">
            <CardBody>
              <h3 className="text-xl font-semibold mb-2">Поддержка</h3>
              <p className="text-default-600">
                Техническая поддержка и обновления системы
              </p>
            </CardBody>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
  };
};
