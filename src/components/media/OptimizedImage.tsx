import { useState, useCallback } from "react";
import { images, type ImageEntry } from "../../generated/image-manifest";

interface OptimizedImageProps {
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  onLoad?: () => void;
}

function buildSrcSet(urls: Record<number, string>): string {
  return Object.entries(urls)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([w, url]) => `${url} ${w}w`)
    .join(", ");
}

export function OptimizedImage({
  name,
  alt,
  sizes,
  className = "",
  imgClassName = "",
  priority = false,
  onLoad,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const entry: ImageEntry | undefined = images[name];

  const handleLoad = useCallback(() => {
    setLoaded(true);
    onLoad?.();
  }, [onLoad]);

  if (!entry) {
    console.warn(`[OptimizedImage] Image "${name}" not found in manifest`);
    return null;
  }

  const avifSrcSet = buildSrcSet(entry.avif);
  const webpSrcSet = buildSrcSet(entry.webp);

  return (
    <picture className={`optimized-image ${loaded ? "is-loaded" : ""} ${className}`}>
      {avifSrcSet && (
        <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      )}
      {webpSrcSet && (
        <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      )}
      <img
        src={entry.jpg}
        alt={alt}
        width={entry.width}
        height={entry.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        onLoad={handleLoad}
        className={`${imgClassName} transition-opacity duration-300 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </picture>
  );
}
