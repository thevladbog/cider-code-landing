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
      { name: "Аутентификация", image: "auth_light.png" },
      { name: "Управление продукцией", image: "products_light.png" },
      { name: "Детали продукта", image: "products_detail_light.png" },
      { name: "Управление сменами", image: "shifts_light.png" },
      { name: "Детали смены", image: "shift_detail_light.png" },
      { name: "Управление пользователями", image: "users_light.png" },
    ],
    desktop: [
      { name: "Вход в систему", image: "login_light.png" },
      { name: "Проверка оборудования", image: "check_equipment_light.png" },
      { name: "Архив смен", image: "shifts_light.png" },
      {
        name: "Рабочий экран",
        image: "shift_screen_without_packing_light.png",
      },
      { name: "Режим упаковки", image: "shift_screen_with_packing_light.png" },
    ],
  };

  const handleImageClick = (imagePath: string) => {
    setSelectedImage(imagePath);
    onOpen();
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {screenshots[type].map((screenshot, index) => (
          <Card
            key={index}
            isPressable
            className="cursor-pointer hover:scale-105 transition-transform"
            onPress={() =>
              handleImageClick(`/screenshots/${type}/${screenshot.image}`)
            }
          >
            <CardBody className="p-0">
              <Image
                alt={screenshot.name}
                className="w-full h-32 object-cover rounded-lg"
                src={`/screenshots/${type}/${screenshot.image}`}
              />
              <div className="p-3">
                <p className="text-sm font-medium">{screenshot.name}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} size="5xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody className="p-0">
                <Image
                  alt="Screenshot"
                  className="w-full"
                  src={selectedImage}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
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
