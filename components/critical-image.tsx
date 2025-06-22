import Image from "next/image";
import { useState, useEffect } from "react";

interface CriticalImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  fallbackSrc?: string;
}

export const CriticalImage = ({
  src,
  alt,
  width,
  height,
  className,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
  sizes = "128px",
  fallbackSrc,
}: CriticalImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setHasError(false);
    setCurrentSrc(src);
  }, [src]);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);

    // Try fallback if available
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setTimeout(() => {
        setCurrentSrc(fallbackSrc);
        setHasError(false);
        setIsLoading(true);
      }, 100);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && !hasError && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded"
          style={{ width, height }}
        />
      )}

      {hasError && !fallbackSrc ? (
        <div
          className="flex items-center justify-center bg-gray-100 text-gray-400 rounded border-2 border-dashed border-gray-300"
          style={{ width, height }}
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
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
          className={`transition-opacity duration-200 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          height={height}
          placeholder={placeholder}
          priority={true}
          quality={quality}
          sizes={sizes}
          src={currentSrc}
          width={width}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
};
