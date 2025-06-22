import React from "react";
import NextHead from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { siteConfig } from "@/config/site";

interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

export const Head = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  noindex = false,
}: HeadProps) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const siteTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const siteDescription = description || t("description");
  const siteImage = image || "/BOTTLE-CODE-LOGO.png";
  const siteUrl =
    url ||
    `${process.env.NEXT_PUBLIC_SITE_URL || "https://bottlecode.app"}${router.asPath}`;
  const siteKeywords =
    keywords ||
    "маркировка, честный знак, пиво, сидр, производство, сериализация, агрегация, автоматизация, marking, fair sign, beer, cider, production, serialization, aggregation, automation";

  return (
    <NextHead>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta content={siteDescription} name="description" />
      <meta content={siteKeywords} name="keywords" />
      <meta content="BOTTLE [CODE]" name="author" />
      <meta
        content={noindex ? "noindex, nofollow" : "index, follow"}
        name="robots"
      />
      <meta content={router.locale || "ru"} name="language" />
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"
        name="viewport"
      />

      {/* Mobile specific optimizations */}
      <meta content="telephone=no" name="format-detection" />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta
        content="black-translucent"
        name="apple-mobile-web-app-status-bar-style"
      />
      <meta content="BOTTLE [CODE]" name="apple-mobile-web-app-title" />

      {/* PWA support */}
      <link href="/manifest.json" rel="manifest" />
      <meta content="#8B5CF6" name="theme-color" />
      <meta content="#FFFFFF" name="background-color" />

      {/* iOS specific */}
      <meta content="app-id=bottle-code" name="apple-itunes-app" />
      <link
        href="/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/apple-touch-icon-152x152.png"
        rel="apple-touch-icon"
        sizes="152x152"
      />
      <link
        href="/apple-touch-icon-120x120.png"
        rel="apple-touch-icon"
        sizes="120x120"
      />
      <link
        href="/apple-touch-icon-76x76.png"
        rel="apple-touch-icon"
        sizes="76x76"
      />

      {/* Canonical URL */}
      <link href={siteUrl} rel="canonical" />

      {/* Alternate languages */}
      <link
        href={siteUrl.replace(/\/en\//, "/ru/")}
        hrefLang="ru"
        rel="alternate"
      />
      <link
        href={siteUrl.replace(/\/ru\//, "/en/")}
        hrefLang="en"
        rel="alternate"
      />
      <link
        href={siteUrl.replace(/\/(ru|en)\//, "/")}
        hrefLang="x-default"
        rel="alternate"
      />

      {/* Open Graph / Facebook */}
      <meta content={type} property="og:type" />
      <meta content={siteTitle} property="og:title" />
      <meta content={siteDescription} property="og:description" />
      <meta content={siteImage} property="og:image" />
      <meta content={siteUrl} property="og:url" />
      <meta content={siteConfig.name} property="og:site_name" />
      <meta
        content={router.locale === "en" ? "en_US" : "ru_RU"}
        property="og:locale"
      />

      {/* Twitter */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={siteTitle} name="twitter:title" />
      <meta content={siteDescription} name="twitter:description" />
      <meta content={siteImage} name="twitter:image" />
      <meta content="@bottlecode" name="twitter:creator" />

      {/* Additional SEO */}
      <meta content="#8B5CF6" name="msapplication-TileColor" />

      {/* Favicons */}
      <link href="/favicon.ico" rel="icon" />
      <link href="/favicon.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="/favicon.png" rel="apple-touch-icon" />

      {/* Preconnects for performance */}
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link
        crossOrigin="anonymous"
        href="https://fonts.gstatic.com"
        rel="preconnect"
      />

      {/* Structured Data */}
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: siteConfig.name,
            description: siteDescription,
            url: siteUrl,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Windows, Linux, Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "RUB",
              priceValidUntil: "2025-12-31",
              availability: "https://schema.org/InStock",
            },
            author: {
              "@type": "Organization",
              name: "BOTTLE [CODE]",
              url: siteUrl,
              email: siteConfig.links.email,
            },
            screenshot: siteImage,
            featureList: [
              "Веб-интерфейс для управления",
              "Настольное приложение",
              "Интеграция с внешними системами",
              "Автоматизация маркировки",
              "Сериализация кодов",
              "Техническая поддержка",
            ],
          }),
        }}
        type="application/ld+json"
      />
    </NextHead>
  );
};
