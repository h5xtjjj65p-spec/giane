"use client";

import { useEffect, useState } from "react";
import { relationship } from "@/data/relationship";
import { getElapsedSince, formatLongDate } from "@/lib/utils";
import Reveal from "./Reveal";
import ExperienceSection from "./ExperienceSection";

const UNITS: Array<{ key: "years" | "months" | "days" | "hours" | "minutes" | "seconds"; label: string }> = [
  { key: "years", label: "Años" },
  { key: "months", label: "Meses" },
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Minutos" },
  { key: "seconds", label: "Segundos" },
];

export default function RelationshipCounter() {
  const startDate = new Date(`${relationship.startDate}T00:00:00`);
  const [elapsed, setElapsed] = useState<ReturnType<typeof getElapsedSince> | null>(null);

  useEffect(() => {
    setElapsed(getElapsedSince(startDate));
    const id = setInterval(() => setElapsed(getElapsedSince(startDate)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relationship.startDate]);

  return (
    <ExperienceSection id="contador" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-gold-400">
            capítulo cuatro
          </span>
          <h2 className="mt-4 font-display text-4xl italic text-cream sm:text-5xl">
            Desde que nuestras vidas se cruzaron...
          </h2>
          <p className="mt-4 text-sm text-mist sm:text-base">
            {formatLongDate(relationship.startDate)}
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-14 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
            {UNITS.map((unit) => (
              <div key={unit.key} className="glass rounded-2xl px-2 py-6 sm:px-3 sm:py-8">
                <span className="block font-display text-3xl tabular-nums text-gradient-gold sm:text-4xl">
                  {elapsed ? String(elapsed[unit.key]).padStart(2, "0") : "00"}
                </span>
                <span className="mt-2 block text-[10px] uppercase tracking-widest text-mist sm:text-xs">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={250}>
          <p className="mx-auto mt-10 max-w-lg text-sm leading-relaxed text-mist sm:text-base">
            Y con cada segundo que pasa, sigo eligiéndote.
          </p>
        </Reveal>
      </div>
    </ExperienceSection>
  );
}
