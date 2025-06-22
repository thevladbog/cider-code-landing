import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { LanguageSwitch } from "@/components/language-switch";
import { CriticalImage } from "@/components/critical-image";

export const Navbar = () => {
  const { t } = useTranslation("common");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HeroUINavbar
      className={clsx(
        "transition-shadow duration-300",
        isScrolled && "shadow-lg backdrop-blur-md bg-background/90",
      )}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent
        className="basis-1/3 sm:basis-1/5 md:basis-full"
        justify="start"
      >
        <NavbarBrand className="gap-2 md:gap-3 max-w-fit min-w-0 navbar-brand-mobile">
          <NextLink
            className="flex justify-start items-center gap-2 md:gap-3"
            href="/"
          >
            <CriticalImage
              alt="BOTTLE [CODE]"
              className="h-6 md:h-8 w-auto max-w-none responsive-image"
              fallbackSrc="/favicon.png"
              height={32}
              sizes="(max-width: 768px) 120px, 128px"
              src="/BOTTLE-CODE-LOGO.png"
              width={128}
            />
          </NextLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {t(`nav.${item.label.toLowerCase()}`)}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
          <LanguageSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            className="text-sm font-normal bg-primary text-white"
            href={siteConfig.links.contact}
            variant="flat"
          >
            {t("hero.getQuote")}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-auto pl-2" justify="end">
        <LanguageSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full py-2"
                color="foreground"
                href={item.href}
                size="lg"
              >
                {t(`nav.${item.label.toLowerCase()}`)}
              </Link>
            </NavbarMenuItem>
          ))}

          {/* Переключатель темы в мобильном меню */}
          <NavbarMenuItem>
            <div className="flex items-center gap-2 py-2">
              <span className="text-sm text-default-600">Тема:</span>
              <ThemeSwitch />
            </div>
          </NavbarMenuItem>

          {/* Добавляем кнопку "Получить расчет" в мобильное меню */}
          <NavbarMenuItem>
            <Button
              as={Link}
              className="w-full mt-4 bg-primary text-white"
              href={siteConfig.links.contact}
              size="lg"
              variant="flat"
            >
              {t("hero.getQuote")}
            </Button>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
