"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Heart, Camera } from "lucide-react";
import { memories } from "@/data/memories";
import Reveal from "./Reveal";
import PhotoFrame from "./PhotoFrame";
import ExperienceSection from "./ExperienceSection";

export default function Memories() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + memories.length) % memories.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % memories.length));

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  const active = openIndex !== null ? memories[openIndex] : null;

  return (
    <ExperienceSection id="recuerdos" align="start" className="overflow-hidden px-5 py-24 sm:px-6 sm:py-28">
      <div className="memory-orb memory-orb-one" />
      <div className="memory-orb memory-orb-two" />
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 flex flex-col items-center text-center sm:mb-20">
          <div className="section-kicker"><Camera size={13} /> capítulo dos · álbum</div>
          <h2 className="mt-5 font-display text-5xl italic leading-none text-cream sm:text-6xl">Nuestros recuerdos</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-mist/80 sm:text-base">
            Instantes pequeños, guardados como si fueran páginas de un álbum. Tocá cualquier foto para verla en detalle.
          </p>
          <div className="mt-7 flex items-center gap-3 text-[9px] uppercase tracking-[.32em] text-mist/45">
            <span className="h-px w-8 bg-gold-400/30" /> {memories.length} recuerdos <span className="h-px w-8 bg-gold-400/30" />
          </div>
        </Reveal>

        <div className="memory-grid">
          {memories.map((memory, i) => (
            <Reveal key={`${memory.image}-${i}`} delay={(i % 6) * 60} className={`memory-item memory-item-${i % 6}`}>
              <button
                onClick={() => setOpenIndex(i)}
                aria-label={`Abrir ${memory.title}`}
                className="photo-glass memory-card group relative block w-full overflow-hidden rounded-[1.55rem] text-left transition-all duration-700 hover:-translate-y-1.5 focus-visible:-translate-y-1"
              >
                <PhotoFrame
                  src={memory.image}
                  alt={memory.title}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
                />
                <span className="memory-shine" />
                <span className="memory-number">{String(i + 1).padStart(2, "0")}</span>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="memory-caption">
                    <span className="text-[9px] font-medium uppercase tracking-[.3em] text-gold-300">{memory.date}</span>
                    <span className="mt-1 block font-display text-xl italic text-cream sm:text-2xl">{memory.title}</span>
                  </div>
                  <span className="memory-open"><Maximize2 size={14} /></span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07050b]/90 p-3 backdrop-blur-2xl sm:p-8" onClick={close} role="dialog" aria-modal="true">
          <div className="absolute inset-0 modal-noise" />
          <button onClick={close} aria-label="Cerrar" className="glass absolute right-4 top-4 z-10 rounded-full p-3 text-cream/75 transition hover:scale-105 hover:text-cream sm:right-7 sm:top-7"><X size={20} /></button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Anterior" className="glass absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-cream/80 transition hover:scale-105 sm:left-7"><ChevronLeft size={24} /></button>
          <div className="relative z-[1] flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[1.8rem] photo-glass glass-strong shadow-[0_40px_120px_rgba(0,0,0,.55)]" onClick={(e) => e.stopPropagation()}>
            <div className="relative min-h-[48vh] w-full flex-1 bg-black/20 sm:min-h-0 sm:aspect-[16/10]">
              <PhotoFrame src={active.image} alt={active.title} sizes="90vw" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between sm:bottom-6 sm:left-7 sm:right-7">
                <div>
                  <span className="text-[9px] uppercase tracking-[.32em] text-gold-300">{active.date}</span>
                  <h3 className="mt-1 font-display text-3xl italic text-white sm:text-4xl">{active.title}</h3>
                </div>
                <span className="hidden rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[9px] tracking-[.2em] text-white/55 sm:block">{String((openIndex ?? 0) + 1).padStart(2, "0")} / {String(memories.length).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="border-t border-white/[.07] bg-white/[.025] px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex items-start gap-3"><Heart className="mt-1 shrink-0 text-rose-400/80" size={15} fill="currentColor" /><p className="max-w-2xl text-sm leading-7 text-mist">{active.description}</p></div>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Siguiente" className="glass absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-cream/80 transition hover:scale-105 sm:right-7"><ChevronRight size={24} /></button>
        </div>
      )}
    </ExperienceSection>
  );
}
