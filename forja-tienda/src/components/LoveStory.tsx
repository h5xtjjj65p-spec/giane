"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { loveStory } from "@/data/loveStory";
import Reveal from "./Reveal";
import PhotoFrame from "./PhotoFrame";
import ExperienceSection from "./ExperienceSection";

export default function LoveStory() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + loveStory.length) % loveStory.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % loveStory.length));

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  const active = openIndex !== null ? loveStory[openIndex] : null;

  return (
    <ExperienceSection id="historia" align="start" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center sm:mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-gold-400">
            capítulo uno
          </span>
          <h2 className="mt-4 font-display text-4xl italic text-cream sm:text-5xl">
            Nuestra historia
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-mist sm:text-base">
            Tocá cada momento para revivirlo.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loveStory.map((moment, i) => (
            <Reveal key={moment.title} delay={i * 70}>
              <button
                onClick={() => setOpenIndex(i)}
                className="glass group relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-[1.6rem] p-6 text-left transition-transform duration-700 hover:-translate-y-1.5"
              >
                {moment.image && (
                  <>
                    <PhotoFrame
                      src={moment.image}
                      alt={moment.title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="absolute inset-0 -z-10 transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
                    />
                    <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  </>
                )}
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold-300">
                  {String(i + 1).padStart(2, "0")} · {moment.date}
                </span>
                <h3 className="mt-2 font-display text-2xl italic text-cream">{moment.title}</h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-mist/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Ver momento <ArrowUpRight size={12} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07050b]/90 p-3 backdrop-blur-2xl sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 modal-noise" />
          <button
            onClick={close}
            aria-label="Cerrar"
            className="glass absolute right-4 top-4 z-10 rounded-full p-3 text-cream/75 transition hover:scale-105 hover:text-cream sm:right-7 sm:top-7"
          >
            <X size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Momento anterior"
            className="glass absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-cream/80 transition hover:scale-105 sm:left-7"
          >
            <ChevronLeft size={24} />
          </button>
          <div
            className="relative z-[1] flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.8rem] photo-glass glass-strong shadow-[0_40px_120px_rgba(0,0,0,.55)] animate-fade-up"
            style={{ animationDuration: "500ms" }}
            onClick={(e) => e.stopPropagation()}
          >
            {active.image && (
              <div className="relative min-h-[38vh] w-full flex-shrink-0 bg-black/20 sm:aspect-[16/9]">
                <PhotoFrame src={active.image} alt={active.title} sizes="90vw" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
            )}
            <div className="overflow-y-auto px-7 py-7 sm:px-9 sm:py-8">
              <span className="text-[10px] uppercase tracking-[.32em] text-gold-300">
                {String((openIndex ?? 0) + 1).padStart(2, "0")} / {String(loveStory.length).padStart(2, "0")} · {active.date}
              </span>
              <h3 className="mt-2 font-display text-3xl italic text-white sm:text-4xl">{active.title}</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-mist sm:text-base">{active.description}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Momento siguiente"
            className="glass absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-cream/80 transition hover:scale-105 sm:right-7"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </ExperienceSection>
  );
}
