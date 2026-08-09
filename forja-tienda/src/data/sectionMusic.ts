/**
 * ============================================================
 *  BANDA SONORA POR SECCIÓN
 * ============================================================
 * Cada apartado de la experiencia puede tener su propia canción.
 * Cuando el usuario llega a esa sección, la pista correspondiente
 * empieza a sonar automáticamente (con un crossfade suave) —
 * respetando siempre las restricciones de autoplay de iOS/Safari.
 *
 * Para agregar más canciones:
 * 1. Colocá el archivo .mp3 dentro de /public/music/
 * 2. Asigná su ruta acá abajo, en la sección que corresponda.
 *
 * Si dos secciones usan el mismo archivo, no hay crossfade entre
 * ellas (sigue sonando la misma pista sin cortes).
 */
export type SectionTrack = {
  src: string;
  title: string;
};

export const DEFAULT_TRACK: SectionTrack = {
  src: "/music/our-song.mp3",
  title: "Nuestra canción",
};

export const sectionMusic: Record<string, SectionTrack> = {
  inicio: { src: "/music/our-song.mp3", title: "Nuestra canción" },
  historia: { src: "/music/our-song.mp3", title: "Nuestra canción" },
  recuerdos: { src: "/music/our-song.mp3", title: "Nuestra canción" },
  carta: { src: "/music/our-song.mp3", title: "Nuestra canción" },
  contador: { src: "/music/our-song.mp3", title: "Nuestra canción" },
  razones: { src: "/music/our-song.mp3", title: "Nuestra canción" },
  futuro: { src: "/music/our-song.mp3", title: "Nuestra canción" },
  final: { src: "/music/our-song.mp3", title: "Nuestra canción" },
};
