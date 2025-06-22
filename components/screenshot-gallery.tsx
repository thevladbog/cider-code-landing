import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Image } from "@heroui/image";

interface ScreenshotGalleryProps {
  type: "web" | "desktop";
  title: string;
}

export const ScreenshotGallery = ({ type, title }: ScreenshotGalleryProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string>("");

  const screenshots = {
    web: [
      {
        name: "Аутентификация",
        image: "auth_light.png",
        description:
          "Безопасный вход в систему с двухфакторной аутентификацией",
        category: "Безопасность",
        categoryColor:
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      },
      {
        name: "Управление продукцией",
        image: "products_light.png",
        description:
          "Создание, редактирование и управление товарами и рецептурами",
        category: "Каталог",
        categoryColor:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      },
      {
        name: "Детали продукта",
        image: "products_detail_light.png",
        description:
          "Подробная информация о продукте, ингредиенты и характеристики",
        category: "Каталог",
        categoryColor:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      },
      {
        name: "Управление сменами",
        image: "shifts_light.png",
        description: "Планирование рабочих смен и распределение персонала",
        category: "Производство",
        categoryColor:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      },
      {
        name: "Детали смены",
        image: "shift_detail_light.png",
        description: "Детальная информация о смене, показатели и результаты",
        category: "Производство",
        categoryColor:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      },
      {
        name: "Управление пользователями",
        image: "users_light.png",
        description: "Администрирование пользователей, роли и права доступа",
        category: "Администрирование",
        categoryColor:
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      },
    ],
    desktop: [
      {
        name: "Вход в систему",
        image: "login_light.png",
        description: "Авторизация оператора на рабочем месте",
        category: "Авторизация",
        categoryColor:
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      },
      {
        name: "Проверка оборудования",
        image: "check_equipment_light.png",
        description:
          "Диагностика и проверка состояния производственного оборудования",
        category: "Диагностика",
        categoryColor:
          "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      },
      {
        name: "Архив смен",
        image: "shifts_light.png",
        description: "История завершённых смен с детальной статистикой",
        category: "Отчёты",
        categoryColor:
          "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      },
      {
        name: "Рабочий экран",
        image: "shift_screen_without_packing_light.png",
        description:
          "Основной интерфейс оператора во время производственной смены",
        category: "Производство",
        categoryColor:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      },
      {
        name: "Режим упаковки",
        image: "shift_screen_with_packing_light.png",
        description:
          "Специализированный интерфейс для операций упаковки продукции",
        category: "Упаковка",
        categoryColor:
          "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
      },
    ],
  };

  const handleImageClick = (imagePath: string) => {
    setSelectedImage(imagePath);
    onOpen();
  };

  return (
    <>
      {/* Мобильная версия - список карточек */}
      <div className="block md:hidden space-y-4">
        {screenshots[type].map((screenshot, index) => (
          <Card
            key={index}
            isPressable
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 border border-divider hover:border-primary/40 backdrop-blur-sm"
            onPress={() =>
              handleImageClick(`/screenshots/${type}/${screenshot.image}`)
            }
          >
            <CardBody className="p-0">
              <div className="flex flex-col gap-0">
                {/* Миниатюра изображения */}
                <div className="relative overflow-hidden w-full h-40 flex-shrink-0">
                  <Image
                    alt={screenshot.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    src={`/screenshots/${type}/${screenshot.image}`}
                  />
                  {/* Градиент поверх изображения */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Иконка увеличения */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/95 dark:bg-black/95 rounded-full p-2 shadow-lg">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>
                  </div>
                  {/* Категория */}
                  <div className="absolute top-2 left-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium shadow-sm ${screenshot.categoryColor}`}
                    >
                      {screenshot.category}
                    </span>
                  </div>
                </div>

                {/* Информация */}
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-sm leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {screenshot.name}
                    </h4>
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-default-400 group-hover:text-primary transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-default-600 line-clamp-2 leading-relaxed mb-2">
                    {screenshot.description}
                  </p>
                  <div className="pt-2 border-t border-divider/50">
                    <span className="text-xs text-default-500 font-medium">
                      Нажмите для увеличения
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Десктопная версия - компактная сетка */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
        {screenshots[type].map((screenshot, index) => (
          <Card
            key={index}
            isPressable
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 border border-divider hover:border-primary/40 backdrop-blur-sm overflow-hidden"
            onPress={() =>
              handleImageClick(`/screenshots/${type}/${screenshot.image}`)
            }
          >
            <CardBody className="p-0">
              {/* Изображение */}
              <div className="relative overflow-hidden aspect-[4/3] w-full">
                <Image
                  alt={screenshot.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={`/screenshots/${type}/${screenshot.image}`}
                />

                {/* Категория */}
                <div className="absolute top-2 left-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium shadow-sm ${screenshot.categoryColor}`}
                  >
                    {screenshot.category}
                  </span>
                </div>

                {/* Иконка увеличения */}
                <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                  <svg
                    className="w-3 h-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
              </div>

              {/* Информация под изображением - максимально компактно */}
              <div className="px-3 py-2">
                <h4 className="font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
                  {screenshot.name}
                </h4>
                <p className="text-xs text-default-600 line-clamp-2 leading-snug">
                  {screenshot.description}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal
        classNames={{
          backdrop: "bg-black/70 backdrop-blur-sm",
          base: "mx-4 my-4 sm:mx-8 sm:my-8",
        }}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="5xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="bg-background/95 backdrop-blur-md border border-default-200">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg md:text-xl px-6 py-4 border-b border-default-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-default-500">
                      Детальный просмотр
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody className="p-6">
                <div className="relative group">
                  <Image
                    alt="Screenshot"
                    className="w-full rounded-xl shadow-lg"
                    src={selectedImage}
                  />
                  {/* Градиент снизу для лучшего восприятия */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </ModalBody>
              <ModalFooter className="px-6 py-4 border-t border-default-200">
                <Button
                  className="min-h-11"
                  color="danger"
                  startContent={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  }
                  variant="light"
                  onPress={onClose}
                >
                  Закрыть
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
