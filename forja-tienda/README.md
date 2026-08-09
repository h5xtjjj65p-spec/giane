# Para vos 💛

Una página web personalizada y romántica, construida con Next.js 14 + React + TypeScript + Tailwind CSS.

## Cómo ejecutarla

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

Para generar la versión de producción:

```bash
npm run build
npm run start
```

## Cómo personalizarla (sin tocar componentes)

Todo lo que probablemente quieras cambiar está en `src/data/`:

| Qué querés cambiar | Archivo |
|---|---|
| Nombre de tu novia, tu nombre y la fecha de inicio | `src/data/relationship.ts` |
| La línea de tiempo de "Nuestra historia" | `src/data/loveStory.ts` |
| Las fotos de la galería "Nuestros recuerdos" | `src/data/memories.ts` |
| El texto de la carta | `src/data/letter.ts` |
| Las razones por las que la elegirías otra vez | `src/data/reasons.ts` |

Cada archivo tiene comentarios explicando qué hace cada campo.

## Dónde poner las fotos

- Fotos de la línea de tiempo → `public/images/story/` (referenciadas en `loveStory.ts`)
- Fotos de la galería de recuerdos → `public/images/memories/` (referenciadas en `memories.ts`)

Si una foto todavía no existe, la página no se rompe: muestra un marco con un corazón en su lugar hasta que agregues el archivo real.

## Dónde poner la canción

Colocá tu canción en:

```
public/music/our-song.mp3
```

El reproductor flotante (abajo a la derecha) la detecta automáticamente. No suena sola: la persona que abre la página tiene que tocar play. Si el archivo no existe todavía, el botón se muestra deshabilitado sin romper nada.

## Fondo animado con fotos flotantes

Detrás de todo el sitio flotan versiones recortadas en cuadrado de algunas fotos del álbum, dentro de marcos orgánicos con los bordes difuminados (efecto "liquid glass"). Se combinan muy bien con los paneles translúcidos (`.glass`, `.photo-glass`) que ya tiene el diseño, porque el `backdrop-blur` de esos paneles deja ver las fotos borrosas de fondo.

- Qué fotos aparecen → `src/data/floatingPhotos.ts`
- Los archivos recortados en cuadrado están en `public/images/floating/`
- El componente que las anima → `src/components/FloatingBackground.tsx`

Los recortes de `public/images/floating/` se generaron centrando automáticamente el cuadrado sobre las caras detectadas en cada foto original (o, si no se detectó ninguna cara, con un recorte central). No es una eliminación de fondo real (recorte de la persona sin el fondo): es un recorte inteligente + un marco con bordes difuminados que da un efecto muy similar sin necesitar herramientas externas. Si más adelante querés el recorte "real" (persona sola, sin nada alrededor, fondo transparente), podés:

1. Usar una app como Photoroom, remove.bg o "Levantar sujeto" de iPhone (mantener presionado sobre la persona en Fotos → Copiar) para conseguir un PNG con fondo transparente de la foto que quieras.
2. Reemplazar el `.jpg` correspondiente en `public/images/floating/` por tu `.png` con fondo transparente.
3. El componente lo va a mostrar igual, sin cambiar nada más de código.

Para agregar o sacar fotos del fondo animado, edití el array en `floatingPhotos.ts` (cada entrada tiene `image` y `shape`, que es la forma orgánica del marco: 1 a 4).

## Cómo subirlo a GitHub y desplegarlo en Vercel

1. **Creá el repositorio en GitHub**
   - Entrá a [github.com/new](https://github.com/new), creá un repositorio (puede ser privado) y no marques ninguna opción de inicializarlo con README.

2. **Subí el proyecto** (desde la carpeta `forja-tienda/`, en tu terminal):
   ```bash
   git init
   git add .
   git commit -m "Para ella 💛"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```

3. **Desplegá en Vercel**
   - Entrá a [vercel.com/new](https://vercel.com/new) e iniciá sesión con tu cuenta de GitHub.
   - Elegí el repositorio que acabás de subir.
   - Vercel detecta automáticamente que es Next.js: no hace falta tocar ninguna configuración. Solo tocá **Deploy**.
   - En un par de minutos te da una URL pública (algo como `tu-repo.vercel.app`) para compartir.

4. **Cada vez que quieras actualizar algo** (cambiar una foto, un texto, la fecha, etc.): hacé el cambio en tu computadora y corré:
   ```bash
   git add .
   git commit -m "actualizo contenido"
   git push
   ```
   Vercel vuelve a desplegar solo, automáticamente, cada vez que hacés push a `main`.

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx          # arma todas las secciones en orden
│   ├── layout.tsx        # tipografías y metadata
│   └── globals.css
│
├── components/
│   ├── HeroLove.tsx              # portada
│   ├── LoveStory.tsx             # línea de tiempo
│   ├── Memories.tsx              # galería con lightbox
│   ├── LoveLetter.tsx            # carta con animación de apertura
│   ├── RelationshipCounter.tsx   # contador en tiempo real
│   ├── Reasons.tsx                # tarjetas de razones
│   ├── FutureReveal.tsx          # sección "botón especial"
│   ├── FinalMessage.tsx          # cierre + firma
│   ├── MusicPlayer.tsx           # reproductor flotante
│   ├── PhotoFrame.tsx            # imagen con fallback si falta el archivo
│   ├── Fireflies.tsx             # partículas ambientales
│   ├── FloatingBackground.tsx    # fondo animado con fotos flotando
│   └── Reveal.tsx                # animación al hacer scroll
│
└── data/
    ├── relationship.ts   # nombres y fecha
    ├── loveStory.ts
    ├── memories.ts
    ├── letter.ts
    ├── reasons.ts
    └── floatingPhotos.ts # fotos del fondo animado
```

## Qué se modificó respecto al proyecto original

El proyecto original era una tienda de ropa deportiva ("lil Peter"). Se eliminaron por completo las partes de e-commerce (productos, carrito, checkout, filtros, categorías, newsletter, header/footer de tienda) y se reemplazó la home por una experiencia romántica de una sola página, reutilizando la misma base técnica (Next.js 14 App Router, TypeScript, Tailwind).

Se mantuvo `next.config.js`, `tsconfig.json`, `postcss.config.js` y la configuración base de Tailwind, actualizando la paleta de colores y tipografías para la nueva identidad visual.
