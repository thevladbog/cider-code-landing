export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "BOTTLE [CODE]",
  description:
    "Решение для сериализации и агрегации кодов системы Честного Знака на производстве пива, сидра и других продуктов.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bottlecode.app",
  ogImage: "/BOTTLE-CODE-LOGO.png",
  keywords: [
    "маркировка",
    "честный знак",
    "пиво",
    "сидр",
    "производство",
    "сериализация",
    "агрегация",
    "автоматизация",
    "BOTTLE CODE",
    "marking",
    "fair sign",
    "beer",
    "cider",
    "production",
    "serialization",
    "aggregation",
    "automation",
  ],
  author: {
    name: "BOTTLE [CODE]",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://bottlecode.app",
    email: "hello@bottlecode.app",
  },
  creator: "@bottlecode",
  navItems: [
    {
      label: "home",
      href: "/",
    },
    {
      label: "features",
      href: "#features",
    },
    {
      label: "demo",
      href: "#demo",
    },
    {
      label: "pricing",
      href: "#pricing",
    },
    {
      label: "contact",
      href: "#contact",
    },
  ],
  navMenuItems: [
    {
      label: "features",
      href: "#features",
    },
    {
      label: "demo",
      href: "#demo",
    },
    {
      label: "pricing",
      href: "#pricing",
    },
    {
      label: "contact",
      href: "#contact",
    },
  ],
  links: {
    email: "hello@bottlecode.app",
    docs: "#demo",
    demo: "#demo",
    contact: "#contact",
  },
};
