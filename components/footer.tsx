import { Link } from "@heroui/link";
import { useTranslation } from "next-i18next";

import { CriticalImage } from "@/components/critical-image";
import { siteConfig } from "@/config/site";

export const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer className="bg-content2 border-t border-divider">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <CriticalImage
                alt="BOTTLE [CODE]"
                className="h-8 w-auto"
                height={32}
                src="/BOTTLE-CODE-LOGO.png"
                width={128}
              />
            </div>
            <p className="text-default-600 mb-4">{t("footer.description")}</p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.solutions")}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-default-600 hover:text-primary text-sm"
                  href="#features"
                >
                  {t("footer.webInterface")}
                </Link>
              </li>
              <li>
                <Link
                  className="text-default-600 hover:text-primary text-sm"
                  href="#features"
                >
                  {t("footer.desktopApp")}
                </Link>
              </li>
              <li>
                <Link
                  className="text-default-600 hover:text-primary text-sm"
                  href="#demo"
                >
                  {t("nav.demo")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-default-600 hover:text-primary text-sm"
                  href={`mailto:${siteConfig.links.email}`}
                >
                  {siteConfig.links.email}
                </Link>
              </li>
              <li>
                <Link
                  className="text-default-600 hover:text-primary text-sm"
                  href="#contact"
                >
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link
                  className="text-default-600 hover:text-primary text-sm"
                  href="#pricing"
                >
                  {t("nav.pricing")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-divider mt-8 pt-8 text-center">
          <p className="text-default-500 text-sm">
            © {t("footer.year")} BOTTLE [CODE]. {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
};
