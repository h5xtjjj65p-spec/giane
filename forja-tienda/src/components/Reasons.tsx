"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { reasons } from "@/data/reasons";
import { relationship } from "@/data/relationship";
import Reveal from "./Reveal";
import ExperienceSection from "./ExperienceSection";

export default function Reasons() {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <ExperienceSection id="razones" align="start" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center sm:mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-gold-400">
            capítulo cinco
          </span>
          <h2 className="mt-4 font-display text-4xl italic text-cream sm:text-5xl">
            {reasons.length} razones por las que te elegiría otra vez
          </h2>
          <p className="mt-4 text-sm text-mist sm:text-base">
            Y todavía se me quedan muchas afuera, {relationship.herName}. Tocá las que más te lleguen.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {reasons.map((reason, i) => {
            const isSelected = selected.has(i);
            return (
              <Reveal key={i} delay={(i % 9) * 55}>
                <button
                  onClick={() => toggle(i)}
                  aria-pressed={isSelected}
                  className={`glass group flex h-full w-full items-start gap-3 rounded-2xl px-5 py-5 text-left transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/30 ${
                    isSelected ? "border-rose-400/50 shadow-glow-rose scale-[1.02]" : ""
                  }`}
                >
                  <Heart
                    size={16}
                    className={`mt-1 flex-shrink-0 transition-all duration-300 ${
                      isSelected ? "scale-125 text-rose-400" : "text-rose-400/70 group-hover:scale-110"
                    }`}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                  <p className="text-sm leading-relaxed text-cream/90 sm:text-[15px]">
                    {reason}
                  </p>
                </button>
              </Reveal>
            );
          })}
        </div>

        {selected.size > 0 && (
          <p className="mt-10 text-center text-xs uppercase tracking-[0.3em] text-gold-300 animate-fade-in">
            {selected.size} {selected.size === 1 ? "razón elegida" : "razones elegidas"} por vos ♥
          </p>
        )}
      </div>
    </ExperienceSection>
  );
}
