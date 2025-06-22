import Head from "next/head";
import { useRouter } from "next/router";

interface HreflangProps {
  canonical?: string;
}

export const Hreflang = ({ canonical }: HreflangProps) => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bottlecode.app";

  const getLocalizedPath = (locale: string) => {
    const path = router.asPath;

    if (locale === "ru") {
      return path.replace(/^\/en\//, "/").replace(/^\/en$/, "/");
    }

    if (locale === "en") {
      if (path === "/") return "/en";
      if (path.startsWith("/en")) return path;

      return `/en${path}`;
    }

    return path;
  };

  const canonicalUrl = canonical || `${baseUrl}${router.asPath}`;
  const ruPath = getLocalizedPath("ru");
  const enPath = getLocalizedPath("en");

  return (
    <Head>
      <link href={canonicalUrl} rel="canonical" />
      <link href={`${baseUrl}${ruPath}`} hrefLang="ru" rel="alternate" />
      <link href={`${baseUrl}${enPath}`} hrefLang="en" rel="alternate" />
      <link href={`${baseUrl}${ruPath}`} hrefLang="x-default" rel="alternate" />
    </Head>
  );
};
