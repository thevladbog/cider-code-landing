import Head from "next/head";

interface JsonLdProps {
  data: Record<string, any>;
}

export const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <Head>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        type="application/ld+json"
      />
    </Head>
  );
};

// Predefined structured data generators
export const generateWebsiteJsonLd = (
  url: string,
  name: string,
  description: string,
) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url,
  name,
  description,
  inLanguage: ["ru", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

export const generateSoftwareJsonLd = (
  url: string,
  name: string,
  description: string,
  version?: string,
) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name,
  description,
  url,
  downloadUrl: url,
  softwareVersion: version || "1.0.0",
  applicationCategory: "BusinessApplication",
  operatingSystem: ["Windows", "Linux", "Web"],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "RUB",
    availability: "https://schema.org/InStock",
  },
  author: {
    "@type": "Organization",
    name: "BOTTLE [CODE]",
    url,
  },
});

export const generateBreadcrumbJsonLd = (
  items: Array<{ name: string; url: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateArticleJsonLd = (
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified?: string,
  author?: string,
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  url,
  datePublished,
  dateModified: dateModified || datePublished,
  author: {
    "@type": "Organization",
    name: author || "BOTTLE [CODE]",
  },
  publisher: {
    "@type": "Organization",
    name: "BOTTLE [CODE]",
    logo: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bottlecode.app"}/BOTTLE-CODE-LOGO.png`,
    },
  },
});
