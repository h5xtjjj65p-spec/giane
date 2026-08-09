"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import ExperienceSection from "./ExperienceSection";
import Fireflies from "./Fireflies";

export default function FutureReveal() {
  const [revealed, setRevealed] = useState(false);

  return (
    <ExperienceSection id="futuro" scrollable={false} className="overflow-hidden px-6 py-16">
      <Fireflies count={16} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/10 blur-[110px]" />

      <div className="relative mx-auto max-w-xl text-center">
        <Reveal>
          <p className="font-display text-2xl italic text-cream sm:text-3xl">
            Y si alguna vez te preguntás qué quiero para el futuro...
          </p>

          {!revealed && (
            <button
              onClick={() => setRevealed(true)}
              className="glass group mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest text-cream transition-all duration-300 hover:shadow-glow"
            >
              <Sparkles size={16} className="text-gold-300" />
              Descubrirlo
            </button>
          )}
        </Reveal>

        {revealed && (
          <div className="mt-10 animate-fade-up" style={{ animationDuration: "900ms" }}>
            <p className="font-display text-3xl italic text-gradient-gold sm:text-4xl">
              Quiero seguir escribiendo nuestra historia con vos.
            </p>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-mist sm:text-base">
              Una página nunca va a alcanzar para contar todo lo que significás para mí.
            </p>
          </div>
        )}
      </div>
    </ExperienceSection>
  );
}
