"use client";

import { ArrowUp } from "lucide-react";
import { relationship } from "@/data/relationship";
import Fireflies from "./Fireflies";
import Reveal from "./Reveal";
import ExperienceSection from "./ExperienceSection";
import { useExperience } from "@/lib/experience-context";

export default function FinalMessage() {
  const { navigateTo } = useExperience();

  return (
    <ExperienceSection id="final" scrollable={false} className="overflow-hidden px-6 py-16 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-600/15 blur-[130px]" />
      <Fireflies count={14} />

      <Reveal className="relative z-10">
        <h2 className="font-display text-4xl italic leading-tight text-cream sm:text-6xl">
          Te elegiría a vos.
          <br />
          Una y otra vez.
        </h2>

        <p className="mt-10 text-sm uppercase tracking-[0.3em] text-mist">Con amor,</p>
        <p className="mt-2 font-script text-4xl text-gold-300 sm:text-5xl">
          {relationship.myName} ❤
        </p>

        <button
          onClick={() => navigateTo("inicio")}
          className="glass mt-14 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-medium uppercase tracking-widest text-cream/80 transition-colors duration-300 hover:text-cream"
        >
          <ArrowUp size={14} />
          Volver al principio
        </button>
      </Reveal>
    </ExperienceSection>
  );
}
