"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

export type SectionMeta = {
  id: string;
  label: string;
};

type ExperienceContextValue = {
  sections: SectionMeta[];
  activeId: string;
  activeIndex: number;
  progress: number; // 0 - 100, position within the whole experience
  navigateTo: (id: string) => void;
  hasInteracted: boolean;
  registerInteraction: () => void;
  containerRef: RefObject<HTMLDivElement>;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error("useExperience debe usarse dentro de <ExperienceShell>");
  }
  return ctx;
}

export function ExperienceProvider({
  sections,
  children,
}: {
  sections: SectionMeta[];
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [hasInteracted, setHasInteracted] = useState(false);

  const registerInteraction = useCallback(() => {
    setHasInteracted((prev) => (prev ? prev : true));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    // El elemento más visible dentro del contenedor decide la sección activa.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = activeId;
        let bestRatio = -1;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestRatio > 0.15) {
          setActiveId(bestId);
        }
      },
      {
        root: container,
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  const navigateTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    registerInteraction();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [registerInteraction]);

  const activeIndex = useMemo(
    () => Math.max(0, sections.findIndex((s) => s.id === activeId)),
    [sections, activeId]
  );

  const progress = useMemo(() => {
    if (sections.length <= 1) return 0;
    return (activeIndex / (sections.length - 1)) * 100;
  }, [activeIndex, sections.length]);

  const value: ExperienceContextValue = {
    sections,
    activeId,
    activeIndex,
    progress,
    navigateTo,
    hasInteracted,
    registerInteraction,
    containerRef,
  };

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}
