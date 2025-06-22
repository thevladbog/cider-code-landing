import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { JsonLd, generateWebsiteJsonLd } from "@/components/json-ld";

export default function DocsPage() {
  const { t } = useTranslation("common");

  const jsonLd = generateWebsiteJsonLd(
    `${process.env.NEXT_PUBLIC_SITE_URL || "https://bottlecode.app"}/docs`,
    `${t("docs")} | BOTTLE [CODE]`,
    t("docsDescription") ||
      "Документация по использованию BOTTLE [CODE] для маркировки и автоматизации производства",
  );

  return (
    <DefaultLayout
      description={
        t("docsDescription") ||
        "Полная документация по использованию BOTTLE [CODE]. Руководства по установке, настройке и использованию системы маркировки."
      }
      keywords="документация, руководство, инструкция, маркировка, честный знак, установка, настройка, использование, documentation, guide, manual, marking, fair sign, installation, setup, usage"
      title={t("docs") || "Документация"}
    >
      <JsonLd data={jsonLd} />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-4xl text-center justify-center">
          <h1 className={title()}>{t("docs") || "Документация"}</h1>
          <p className="mt-4 text-lg text-default-600">
            {t("docsDescription") ||
              "Полное руководство по использованию BOTTLE [CODE]"}
          </p>

          <div className="mt-8 text-center">
            <p className="text-default-500">
              {t("docsComingSoon") ||
                "Подробная документация готовится к публикации. Здесь будут руководства по установке, настройке и использованию системы."}
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
