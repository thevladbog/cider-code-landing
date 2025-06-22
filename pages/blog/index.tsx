import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { JsonLd, generateWebsiteJsonLd } from "@/components/json-ld";

export default function BlogPage() {
  const { t } = useTranslation("common");

  const jsonLd = generateWebsiteJsonLd(
    `${process.env.NEXT_PUBLIC_SITE_URL || "https://bottlecode.app"}/blog`,
    `${t("blog")} | BOTTLE [CODE]`,
    t("blogDescription") ||
      "Блог о маркировке, автоматизации производства и системе Честный Знак",
  );

  return (
    <DefaultLayout
      description={
        t("blogDescription") ||
        "Блог о маркировке, автоматизации производства и системе Честный Знак. Статьи, кейсы и новости от BOTTLE [CODE]."
      }
      keywords="блог, маркировка, честный знак, автоматизация, производство, статьи, кейсы, новости, blog, marking, fair sign, automation, production, articles, cases, news"
      title={t("blog") || "Блог"}
    >
      <JsonLd data={jsonLd} />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-4xl text-center justify-center">
          <h1 className={title()}>{t("blog") || "Блог"}</h1>
          <p className="mt-4 text-lg text-default-600">
            {t("blogDescription") ||
              "Статьи, кейсы и новости о маркировке и автоматизации производства"}
          </p>

          <div className="mt-8 text-center">
            <p className="text-default-500">
              {t("blogComingSoon") ||
                "Скоро здесь появятся интересные статьи о маркировке, автоматизации производства и внедрении системы Честный Знак."}
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
