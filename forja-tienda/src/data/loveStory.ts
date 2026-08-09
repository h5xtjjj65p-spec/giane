/**
 * LÍNEA DE TIEMPO — "Nuestra historia"
 */
export type LoveStoryMoment = {
  date: string;
  title: string;
  description: string;
  image?: string;
};

export const loveStory: LoveStoryMoment[] = [
  {
    date: "El primer café",
    title: "La primera vez que nos vimos",
    description:
      "Esta fue la primera vez que nos vimos para tomar un café. Un momento que quizás parecía sencillo, pero que terminó siendo el comienzo de una historia muy especial.",
    image: "/images/story/primer-cafe.jpg",
  },
  {
    date: "Ese día",
    title: "Café, charla y una mesa para recordar",
    description:
      "A veces una historia empieza con algo tan simple como sentarse frente a frente, compartir algo rico y dejar que la charla haga lo suyo.",
    image: "/images/story/mesa-cafe.jpg",
  },
  {
    date: "Un recuerdo bonito",
    title: "Una sonrisa que quedó guardada",
    description:
      "Entre fotos y momentos espontáneos aparecen esas pequeñas escenas que, con el tiempo, se vuelven enormes recuerdos.",
    image: "/images/story/sonrisa-cafe.jpg",
  },
  {
    date: "En el camino",
    title: "También hubo aventuras",
    description:
      "No todo tenía que ser un lugar especial. A veces el camino, una charla y estar juntos alcanzaban para convertir cualquier momento en recuerdo.",
    image: "/images/story/viaje-en-auto.jpg",
  },
  {
    date: "Una noche diferente",
    title: "Luces, juegos y nuevas historias",
    description:
      "Entre luces de colores y diversión, seguimos sumando momentos que hacen que esta historia sea nuestra.",
    image: "/images/story/noche-de-juegos.jpg",
  },
  {
    date: "Y todos esos pequeños momentos",
    title: "Las fotos que nos hacen sonreír",
    description:
      "Porque al final también son importantes las tonterías, las fotos espontáneas y esos instantes que solo nosotros sabemos por qué significan tanto.",
    image: "/images/story/momento-divertido.jpg",
  },
];
