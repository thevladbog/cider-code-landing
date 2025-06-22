import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";
import { DocumentProps } from "next/document";

import { fontSans } from "@/config/fonts";

export default function Document(props: DocumentProps) {
  const { locale } = props.__NEXT_DATA__;

  return (
    <Html lang={locale || "ru"}>
      <Head>
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
        <link href="/favicon.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon.png" rel="apple-touch-icon" />
        <meta content="#8B5CF6" name="theme-color" />
        <meta content="#8B5CF6" name="msapplication-TileColor" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="default" name="apple-mobile-web-app-status-bar-style" />

        {/* Preconnect for performance */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />

        {/* Critical image preloads */}
        <link
          as="image"
          href="/BOTTLE-CODE-LOGO.png"
          rel="preload"
          type="image/png"
        />

        {/* Global structured data */}
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BOTTLE [CODE]",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://bottlecode.app",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bottlecode.app"}/BOTTLE-CODE-LOGO.png`,
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@bottlecode.app",
                contactType: "customer service",
                availableLanguage: ["Russian", "English"],
              },
              sameAs: [],
              foundingDate: "2024",
              founders: [
                {
                  "@type": "Organization",
                  name: "BOTTLE [CODE]",
                },
              ],
              description:
                "Решение для сериализации и агрегации кодов системы Честного Знака на производстве пива, сидра и других продуктов",
            }),
          }}
          type="application/ld+json"
        />
      </Head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
