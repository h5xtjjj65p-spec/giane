"use client";

import { type ReactNode } from "react";
import { ExperienceProvider, useExperience, type SectionMeta } from "@/lib/experience-context";

function ScrollCapture({ children }: { children: ReactNode }) {
  const { containerRef, registerInteraction } = useExperience();

  return (
    <div
      ref={containerRef}
      id="app-scroll"
      className="app-scroll"
      onPointerDown={registerInteraction}
      onWheel={registerInteraction}
      onTouchStart={registerInteraction}
      onKeyDown={registerInteraction}
    >
      {children}
    </div>
  );
}

export default function ExperienceShell({
  sections,
  overlay,
  children,
}: {
  sections: SectionMeta[];
  /** UI fija (nav, reproductor de música) que vive fuera del contenedor con scroll. */
  overlay?: ReactNode;
  children: ReactNode;
}) {
  return (
    <ExperienceProvider sections={sections}>
      <ScrollCapture>{children}</ScrollCapture>
      {overlay}
    </ExperienceProvider>
  );
}
