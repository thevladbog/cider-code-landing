import { Card, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";

interface TestimonialProps {
  name: string;
  company: string;
  text: string;
  avatar?: string;
  companyLogo?: string;
}

// Иконка звезды для рейтинга
const StarIcon = () => (
  <svg
    className="w-4 md:w-5 h-4 md:h-5 text-yellow-400 fill-current"
    viewBox="0 0 20 20"
  >
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
  </svg>
);

// Иконка кавычек
const QuoteIcon = () => (
  <svg
    className="w-6 md:w-8 h-6 md:h-8 text-default-300 mb-3 md:mb-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
  </svg>
);

export const Testimonial = ({
  name,
  company,
  text,
  avatar,
  companyLogo,
}: TestimonialProps) => {
  return (
    <Card className="p-4 md:p-8 text-center h-full">
      <CardBody className="flex flex-col items-center justify-center">
        {/* Иконка кавычек */}
        <QuoteIcon />

        {/* Рейтинг звездами */}
        <div className="flex gap-1 mb-4 md:mb-6">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>

        {/* Текст отзыва */}
        <div className="mb-6 md:mb-8">
          <p className="text-default-600 italic text-sm md:text-lg leading-relaxed max-w-2xl px-2">
            &ldquo;{text}&rdquo;
          </p>
        </div>

        {/* Автор */}
        <div className="flex flex-col items-center gap-3 md:gap-4">
          <Avatar
            className="border-2 border-default-200"
            name={name}
            size="lg"
            src={companyLogo || avatar}
          />
          <div>
            <p className="font-semibold text-base md:text-lg">{name}</p>
            <p className="text-xs md:text-sm text-default-500">{company}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
