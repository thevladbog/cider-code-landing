import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { Testimonial } from "@/components/testimonial";
import { ContactForm } from "@/components/contact-form";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const { t } = useTranslation("common");

  return (
    <DefaultLayout
      description={t("hero.description")}
      keywords="маркировка, честный знак, пиво, сидр, производство, автоматизация, BOTTLE CODE, сериализация, агрегация"
      title={t("hero.title")}
    >
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-4 py-12 md:py-20 px-4">
        <div className="inline-block max-w-4xl text-center justify-center">
          <span
            className={title({
              size: "lg",
              class: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
            })}
          >
            {t("hero.title")}
          </span>
          <div
            className={subtitle({
              class: "mt-4 md:mt-6 text-base md:text-lg px-2",
            })}
          >
            {t("hero.description")}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 md:mt-8 w-full sm:w-auto px-4 sm:px-0">
          <Button
            as={Link}
            className="w-full sm:w-auto min-h-12"
            color="primary"
            href="#demo"
            radius="full"
            size="lg"
            variant="shadow"
          >
            {t("hero.tryWeb")}
          </Button>
          <Button
            as={Link}
            className="w-full sm:w-auto min-h-12"
            href="#contact"
            radius="full"
            size="lg"
            variant="bordered"
          >
            {t("hero.getQuote")}
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-content1" id="features">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={title({ size: "md" })}>{t("features.title")}</h2>
            <p className={subtitle({ class: "mt-4" })}>
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            {/* Web Interface */}
            <Card className="p-4 md:p-6">
              <CardBody>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  {/* Иконка веб-приложения */}
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-primary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m9 9v-9a9 9 0 00-9-9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <Chip color="primary" variant="flat">
                      Web
                    </Chip>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold">
                    {t("features.webTitle")}
                  </h3>
                </div>
                <p className="text-default-600 mb-6 text-sm md:text-base">
                  {t("features.webDescription")}
                </p>
                <ul className="space-y-2">
                  {(
                    t("features.webFeatures", {
                      returnObjects: true,
                    }) as string[]
                  ).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm md:text-base"
                    >
                      <span className="text-primary mt-0.5 flex-shrink-0">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            {/* Desktop App */}
            <Card className="p-4 md:p-6">
              <CardBody>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  {/* Иконка desktop приложения */}
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-violet-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <Chip
                      className="bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-300"
                      variant="flat"
                    >
                      Desktop
                    </Chip>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold">
                    {t("features.desktopTitle")}
                  </h3>
                </div>
                <p className="text-default-600 mb-6 text-sm md:text-base">
                  {t("features.desktopDescription")}
                </p>
                <ul className="space-y-2">
                  {(
                    t("features.desktopFeatures", {
                      returnObjects: true,
                    }) as string[]
                  ).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm md:text-base"
                    >
                      <span className="text-violet-600 mt-0.5 flex-shrink-0">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Интеграция с внешними системами */}
            <Card className="p-4 md:p-6 text-center hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <svg
                      className="w-6 md:w-8 h-6 md:h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                </div>
                <h4 className="font-semibold text-base md:text-lg mb-2 text-center">
                  {t("features.integration")}
                </h4>
                <p className="text-xs md:text-sm text-default-600 text-center">
                  {t("features.integrationDesc")}
                </p>
              </CardBody>
            </Card>

            {/* Кроссплатформенность */}
            <Card className="p-4 md:p-6 text-center hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <svg
                      className="w-6 md:w-8 h-6 md:h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2zM8 5h8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                </div>
                <h4 className="font-semibold text-lg mb-2 text-center">
                  {t("features.crossPlatform")}
                </h4>
                <p className="text-sm text-default-600 text-center">
                  {t("features.crossPlatformDesc")}
                </p>
              </CardBody>
            </Card>

            {/* Современный дизайн */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5v12a2 2 0 002 2 2 2 0 002-2V3zM15 21h2a4 4 0 004-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4zM15 3h2v12a2 2 0 01-2 2 2 2 0 01-2-2V3z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                </div>
                <h4 className="font-semibold text-lg mb-2 text-center">
                  {t("features.modernDesign")}
                </h4>
                <p className="text-sm text-default-600 text-center">
                  {t("features.modernDesignDesc")}
                </p>
              </CardBody>
            </Card>

            {/* Возможность доработок */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                </div>
                <h4 className="font-semibold text-lg mb-2 text-center">
                  {t("features.customization")}
                </h4>
                <p className="text-sm text-default-600 text-center">
                  {t("features.customizationDesc")}
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 md:py-20" id="demo">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={title({ size: "md" })}>{t("demo.title")}</h2>
            <p className={subtitle({ class: "mt-4" })}>{t("demo.subtitle")}</p>
          </div>

          <div className="grid gap-8 md:gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m9 9v-9a9 9 0 00-9-9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">
                    {t("demo.webDemo")}
                  </h3>
                  <p className="text-sm text-default-500">
                    Интерфейс веб-приложения
                  </p>
                </div>
              </div>
              <ScreenshotGallery title={t("demo.webDemo")} type="web" />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-violet-100 dark:bg-violet-900 rounded-xl">
                  <svg
                    className="w-6 h-6 text-violet-600 dark:text-violet-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">
                    {t("demo.desktopDemo")}
                  </h3>
                  <p className="text-sm text-default-500">
                    Десктопное приложение
                  </p>
                </div>
              </div>
              <ScreenshotGallery title={t("demo.desktopDemo")} type="desktop" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-content1">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={title({ size: "md" })}>{t("testimonials.title")}</h2>
            <p className={subtitle({ class: "mt-4" })}>
              {t("testimonials.subtitle")}
            </p>
          </div>

          <Testimonial
            company={t("testimonials.company")}
            companyLogo="/feedback/REBEL-APPLE.png"
            name={t("testimonials.name")}
            text={t("testimonials.text")}
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-20 bg-content1" id="pricing">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className={title({ size: "md" })}>{t("pricing.title")}</h2>
          <p className={subtitle({ class: "mt-4 mb-8 md:mb-12" })}>
            {t("pricing.subtitle")}
          </p>

          <Card className="p-6 md:p-8">
            <CardBody>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                {/* Иконка ценообразования */}
                <svg
                  className="w-6 md:w-8 h-6 md:h-8 text-primary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <h3 className="text-xl md:text-2xl font-bold">
                  {t("pricing.custom")}
                </h3>
              </div>
              <p className="text-default-600 mb-6 md:mb-8 text-sm md:text-base">
                {t("pricing.description")}
              </p>

              <div className="mb-6 md:mb-8">
                <h4 className="font-semibold mb-4 md:mb-6 text-center text-base md:text-lg">
                  {t("pricing.includes")}
                </h4>
                <div className="relative max-w-4xl mx-auto">
                  <div className="grid gap-6 md:gap-8 lg:grid-cols-12 items-center">
                    {/* Список преимуществ */}
                    <div className="lg:col-span-8">
                      <ul className="space-y-3 md:space-y-4 text-left">
                        {(
                          t("pricing.features", {
                            returnObjects: true,
                          }) as string[]
                        ).map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="w-5 md:w-6 h-5 md:h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-3 md:w-3.5 h-3 md:h-3.5 text-primary"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M5 13l4 4L19 7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                  />
                                </svg>
                              </div>
                            </div>
                            <span className="text-left leading-relaxed text-sm md:text-base">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Большая декоративная иконка */}
                    <div className="lg:col-span-4 flex justify-center lg:justify-end">
                      <div className="relative">
                        <svg
                          className="w-24 md:w-32 h-24 md:h-32 text-primary/10"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {/* Дополнительная маленькая иконка поверх */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            className="w-6 md:w-8 h-6 md:h-8 text-primary/30"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                as={Link}
                className="w-full sm:w-auto"
                color="primary"
                href="#contact"
                size="lg"
                variant="shadow"
              >
                {t("pricing.getQuote")}
              </Button>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20" id="contact">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={title({ size: "md" })}>{t("contact.title")}</h2>
            <p className={subtitle({ class: "mt-4" })}>
              {t("contact.subtitle")}
            </p>
          </div>

          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-start">
            <div className="order-2 lg:order-1">
              <ContactForm />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {/* Иконка быстрой связи */}
                  <svg
                    className="w-5 h-5 text-primary flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <h3 className="text-lg md:text-xl font-semibold">
                    Быстрая связь
                  </h3>
                </div>
                <div className="space-y-4">
                  <Button
                    as={Link}
                    className="w-full"
                    color="primary"
                    href={`mailto:${siteConfig.links.email}`}
                    size="lg"
                    variant="shadow"
                  >
                    {t("contact.getDemo")}
                  </Button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  {/* Иконка контактной информации */}
                  <svg
                    className="w-5 h-5 text-primary flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <h3 className="text-lg md:text-xl font-semibold">
                    Контактная информация
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-default-600 flex items-center gap-2 text-sm md:text-base">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="break-all">
                      <strong>Email:</strong> {siteConfig.links.email}
                    </span>
                  </p>
                  <p className="text-default-600 flex items-center gap-2 text-sm md:text-base">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                        fillRule="evenodd"
                      />
                    </svg>
                    <span>
                      <strong>Сайт:</strong> bottlecode.app
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ru", ["common"])),
  },
});
