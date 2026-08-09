"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Heart, Sparkles } from "lucide-react";
import Fireflies from "./Fireflies";
import ExperienceSection from "./ExperienceSection";
import { useExperience } from "@/lib/experience-context";

export default function HeroLove({ herName }: { herName: string }) {
  const [mounted, setMounted] = useState(false);
  const { navigateTo } = useExperience();

  useEffect(() => setMounted(true), []);

  return (
    <ExperienceSection id="inicio" scrollable={false} className="hero overflow-hidden px-6 py-16">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[480px] w-[480px] rounded-full bg-gold-400/10 blur-[130px]" />
      <Fireflies count={28} />

      <div className={`relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-gold-300/15 bg-white/[0.03] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.32em] text-gold-200/80">
          <Sparkles size={12} />
          un lugar hecho solo para vos
        </div>

        <div className="relative">
          <div className="absolute -inset-10 rounded-full bg-rose-500/10 blur-3xl" />
          <h1 className="relative font-display text-6xl italic leading-[.95] text-cream sm:text-7xl md:text-8xl lg:text-9xl">
            Para{" "}
            <span className="text-gradient-gold not-italic animate-shimmer">{herName}</span>
            <span className="ml-2 inline-block align-super text-3xl text-rose-400 animate-heartbeat sm:text-5xl">♥</span>
          </h1>
        </div>

        <p className="mx-auto mt-9 max-w-2xl text-pretty text-base leading-8 text-mist sm:text-lg">
          No es una página más. Es un pequeño rincón para guardar lo que siento,
          nuestros recuerdos y todo lo que todavía nos queda por vivir.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button onClick={() => navigateTo("historia")} className="hero-cta group">
            <Heart size={16} fill="currentColor" />
            Entrar a nuestra historia
            <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
          </button>
          <button onClick={() => navigateTo("recuerdos")} className="hero-secondary">
            Ver nuestros recuerdos
          </button>
        </div>

        <button
          onClick={() => navigateTo("historia")}
          className="mt-16 flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-mist/60 transition hover:text-mist"
          aria-label="Descubrir la siguiente sección"
        >
          <span className="h-px w-10 bg-gold-400/30" />
          deslizá para descubrir
          <span className="h-px w-10 bg-gold-400/30" />
        </button>
      </div>
    </ExperienceSection>
  );
}
