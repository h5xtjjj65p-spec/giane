"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { floatingPhotos } from "@/data/floatingPhotos";

/** Estilo con variables CSS custom (--float-x, --float-y, etc.) tipadas. */
type FloatingStyle = CSSProperties & {
  "--float-x"?: string;
  "--float-y"?: string;
  "--float-rot"?: string;
  "--float-rot-alt"?: string;
};

type Placed = {
  image: string;
  shape: 1 | 2 | 3 | 4;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  floatX: number;
  floatY: number;
  rot: number;
  rotAlt: number;
  opacity: number;
  blur: number;
};

/**
 * Fondo ambiental fijo, detrás de todo el sitio: las fotos del álbum
 * flotan muy despacio dentro de marcos orgánicos con los bordes
 * difuminados (como si fueran pequeñas "burbujas" de recuerdos).
 *
 * Los paneles "glass" que ya tiene el sitio (backdrop-blur) dejan ver
 * estas fotos difuminadas a través, como el fondo animado de Liquid Glass.
 *
 * Todo el posicionamiento aleatorio se calcula en el cliente (useEffect)
 * para evitar cualquier mismatch de hidratación entre server y browser.
 */
export default function FloatingBackground() {
  const [placed, setPlaced] = useState<Placed[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const count = isMobile ? 7 : floatingPhotos.length;
    const pool = [...floatingPhotos].sort(() => Math.random() - 0.5).slice(0, count);

    setPlaced(
      pool.map((photo) => ({
        image: photo.image,
        shape: photo.shape,
        left: Math.random() * 92,
        top: Math.random() * 100,
        size: isMobile ? 110 + Math.random() * 60 : 150 + Math.random() * 130,
        duration: 16 + Math.random() * 14,
        delay: Math.random() * -20,
        floatX: (Math.random() - 0.5) * 60,
        floatY: -(30 + Math.random() * 50),
        rot: (Math.random() - 0.5) * 10,
        rotAlt: (Math.random() - 0.5) * 14,
        opacity: 0.4 + Math.random() * 0.3,
        blur: Math.random() > 0.6 ? 1.5 : 0,
      }))
    );
  }, []);

  return (
    <div className="floating-bg" aria-hidden="true">
      <div className="floating-bg-scrim" />
      {placed.map((p, i) => (
        <div
          key={`${p.image}-${i}`}
          className={`floating-photo floating-photo-shape-${p.shape}`}
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              filter: p.blur ? `blur(${p.blur}px)` : undefined,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--float-x": `${p.floatX}px`,
              "--float-y": `${p.floatY}px`,
              "--float-rot": `${p.rot}deg`,
              "--float-rot-alt": `${p.rotAlt}deg`,
            } as FloatingStyle
          }
        >
          <Image src={p.image} alt="" fill sizes="280px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
