"use client";

import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useExperience } from "@/lib/experience-context";

export default function SectionNavigator({ herName }: { herName: string }) {
  const { sections, activeId, navigateTo, progress } = useExperience();
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    navigateTo(id);
    setOpen(false);
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      {/* Nav flotante desktop */}
      <header className="fixed inset-x-0 top-0 z-50 hidden md:block">
        <div className="mx-auto mt-4 flex max-w-fit items-center gap-1 rounded-full nav-solid px-2 py-2">
          <button
            onClick={() => go("inicio")}
            className="group flex items-center gap-2 rounded-full px-3 py-1.5 text-cream"
            aria-label="Ir al inicio"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-300/25 bg-ink/40 transition group-hover:border-gold-300/60">
              <Heart size={12} className="text-rose-300" fill="currentColor" />
            </span>
            <span className="font-display text-base italic">{herName}</span>
          </button>
          <span className="mx-1 h-5 w-px bg-cream/10" />
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className={`nav-link ${activeId === s.id ? "bg-white/[.06] text-cream" : ""}`}
              aria-current={activeId === s.id ? "true" : undefined}
            >
              {s.label}
            </button>
          ))}
        </div>
      </header>

      {/* Nav flotante mobile */}
      <header className="fixed inset-x-0 top-0 z-50 md:hidden">
        <div className="nav-clear flex h-16 items-center justify-between px-5">
          <button onClick={() => go("inicio")} className="flex items-center gap-2 text-cream" aria-label="Ir al inicio">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-300/25 bg-ink/40">
              <Heart size={15} className="text-rose-300" fill="currentColor" />
            </span>
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/10 bg-ink/40 text-cream"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        <div className={`mobile-menu px-4 ${open ? "mobile-menu-open" : ""}`}>
          <nav className="mb-4 rounded-2xl border border-cream/10 bg-[#100c17]/95 p-2 shadow-glass backdrop-blur-xl">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`mobile-link w-full text-left ${activeId === s.id ? "bg-white/[.05] text-cream" : ""}`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Rail de puntos: indica la posición dentro de la experiencia */}
      <nav
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
        aria-label="Progreso de la experiencia"
      >
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            aria-label={s.label}
            aria-current={activeId === s.id ? "true" : undefined}
            className={`rounded-full transition-all duration-500 ${
              activeId === s.id ? "h-6 w-1.5 bg-gold-300 shadow-glow" : "h-1.5 w-1.5 bg-cream/25 hover:bg-cream/50"
            }`}
          />
        ))}
      </nav>
    </>
  );
}
