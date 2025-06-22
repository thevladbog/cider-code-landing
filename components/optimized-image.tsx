import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && !hasError && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ width, height }}
        />
      )}

      {hasError ? (
        <div
          className="flex items-center justify-center bg-gray-100 text-gray-400 rounded"
          style={{ width, height }}
        >
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              fillRule="evenodd"
            />
          </svg>
        </div>
      ) : (
        <Image
          alt={alt}
          blurDataURL={blurDataURL}
          className={`transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          height={height}
          placeholder={placeholder}
          priority={priority}
          quality={quality}
          sizes={sizes}
          src={src}
          width={width}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  );
};
