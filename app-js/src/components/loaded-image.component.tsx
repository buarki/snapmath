export interface LoadedImageProps {
  src: string;
  alt: string;
  className?: string,
}

export function LoadedImage({ src, alt, className }: LoadedImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`${className} mt-2 w-36`}
    />
  );
}
