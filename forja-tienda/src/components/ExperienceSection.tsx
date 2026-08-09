"use client";

import { type ReactNode } from "react";
import { useExperience } from "@/lib/experience-context";
import { cn } from "@/lib/utils";

type ExperienceSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Si la sección tiene mucho contenido (galería, timeline), permite scroll interno. */
  scrollable?: boolean;
  /** Alinea el contenido verticalmente. Por defecto centrado. */
  align?: "center" | "start";
};

/**
 * Cada "apartado" de la experiencia (Historia, Recuerdos, Carta, etc.)
 * vive dentro de uno de estos paneles: ocupa la pantalla completa,
 * se ancla al scroll-snap del <ExperienceShell> y atenúa suavemente
 * su contenido cuando no es la sección activa, para que la transición
 * entre apartados se sienta cinematográfica en vez de un scroll plano.
 */
export default function ExperienceSection({
  id,
  children,
  className,
  scrollable = true,
  align = "center",
}: ExperienceSectionProps) {
  const { activeId } = useExperience();
  const isActive = activeId === id;

  return (
    <section
      id={id}
      data-app-section={id}
      className={cn(
        "app-section",
        align === "center" ? "app-section-center" : "app-section-start",
        scrollable ? "app-section-scrollable" : "",
        className
      )}
    >
      <div
        className={cn(
          "app-section-inner transition-[opacity,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          isActive ? "opacity-100 blur-0" : "opacity-[0.35]"
        )}
      >
        {children}
      </div>
    </section>
  );
}
