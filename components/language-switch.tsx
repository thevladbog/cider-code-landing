import { useRouter } from "next/router";
import { Button } from "@heroui/button";

export const LanguageSwitch = () => {
  const router = useRouter();

  const toggleLanguage = () => {
    const newLocale = router.locale === "ru" ? "en" : "ru";

    // Получаем путь без хэша для предотвращения прокрутки
    const pathWithoutHash = router.asPath.split("#")[0];

    router.push(pathWithoutHash, pathWithoutHash, { locale: newLocale });
  };

  return (
    <Button
      className="min-w-unit-16 border-default-200 hover:border-primary transition-colors"
      color="default"
      size="sm"
      variant="bordered"
      onClick={toggleLanguage}
    >
      <div className="flex items-center gap-1">
        {/* Иконка глобуса */}
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" x2="22" y1="12" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="font-medium">
          {router.locale === "ru" ? "EN" : "RU"}
        </span>
      </div>
    </Button>
  );
};
