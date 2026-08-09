"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type PhotoFrameProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
};

/**
 * Muestra una foto con next/image. Si el archivo todavía no fue
 * colocado en /public, en vez de romper o mostrar un ícono roto,
 * muestra un placeholder elegante a juego con el diseño.
 */
export default function PhotoFrame({ src, alt, className, sizes }: PhotoFrameProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-700/30 via-ink-card to-gold-500/10",
          className
        )}
      >
        <Heart className="text-gold-300/50" size={28} strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? "(min-width: 640px) 50vw, 100vw"}
      className={cn("object-cover", className)}
      onError={() => setHasError(true)}
    />
  );
}
