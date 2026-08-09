/**
 * FONDO ANIMADO — fotos flotantes
 *
 * Estas son versiones recortadas en cuadrado (centradas automáticamente
 * sobre las caras mediante detección facial) de algunas fotos del álbum,
 * pensadas para flotar suavemente de fondo en toda la página dentro de
 * marcos circulares/orgánicos con bordes difuminados.
 *
 * shape: alterna entre distintas formas orgánicas ("blob") para que no
 * se vean todas como círculos perfectos.
 */
export type FloatingPhoto = {
  image: string;
  shape: 1 | 2 | 3 | 4;
};

export const floatingPhotos: FloatingPhoto[] = [
  { image: "/images/floating/camino-de-noche.jpg", shape: 1 },
  { image: "/images/floating/sonrisa-de-noche.jpg", shape: 2 },
  { image: "/images/floating/primer-cafe-2.jpg", shape: 3 },
  { image: "/images/floating/detalle-manos.jpg", shape: 4 },
  { image: "/images/floating/sombrero-1.jpg", shape: 2 },
  { image: "/images/floating/sombrero-2.jpg", shape: 1 },
  { image: "/images/floating/cafe-y-croissants.jpg", shape: 3 },
  { image: "/images/floating/mesa-cafe.jpg", shape: 4 },
  { image: "/images/floating/noche-de-juegos.jpg", shape: 1 },
  { image: "/images/floating/sonrisa-cafe.jpg", shape: 2 },
  { image: "/images/floating/viaje-en-auto.jpg", shape: 3 },
  { image: "/images/floating/momento-divertido.jpg", shape: 4 },
];
