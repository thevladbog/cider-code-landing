import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function AboutPage() {
  return (
    <DefaultLayout
      description="О компании BOTTLE [CODE] - разработчике решений для автоматизации маркировки на производстве пива и сидра"
      keywords="о компании, BOTTLE CODE, разработка, маркировка, автоматизация, производство"
      title="О компании"
    >
      <section className="flex flex-col items-center justify-center gap-4 py-16 md:py-20">
        <div className="inline-block max-w-4xl text-center justify-center">
          <h1 className={title({ size: "lg" })}>О компании BOTTLE [CODE]</h1>
          <div className={subtitle({ class: "mt-6 text-lg" })}>
            Мы создаем современные решения для автоматизации процессов
            маркировки в производстве напитков. Наша миссия - сделать соблюдение
            требований системы &ldquo;Честный знак&rdquo; простым и эффективным.
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Наша миссия</h2>
              <p className="text-default-600">
                Упростить процессы маркировки для производителей пива, сидра и
                других напитков, обеспечив полное соответствие требованиям
                законодательства и максимальную автоматизацию производственных
                процессов.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Наши ценности</h2>
              <ul className="text-default-600 space-y-2">
                <li>• Простота использования</li>
                <li>• Надежность решений</li>
                <li>• Техническая поддержка</li>
                <li>• Постоянное развитие</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Экспертиза</h2>
            <p className="text-default-600">
              Команда BOTTLE [CODE] имеет многолетний опыт работы с системами
              маркировки и глубокое понимание специфики производства напитков.
              Мы знаем все тонкости интеграции с внешними системами и требования
              регуляторов.
            </p>
          </div>
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
