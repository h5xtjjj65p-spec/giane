"use client";

import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { letter } from "@/data/letter";
import { relationship } from "@/data/relationship";
import Reveal from "./Reveal";
import ExperienceSection from "./ExperienceSection";

const FULL_TEXT = letter.paragraphs.join("\n\n");

export default function LoveLetter() {
  const [open, setOpen] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!open) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setTypedLength(FULL_TEXT.length);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTypedLength((len) => {
        if (len >= FULL_TEXT.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return len;
        }
        return len + 1;
      });
    }, 18);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open]);

  const typedText = FULL_TEXT.slice(0, typedLength);
  const isDone = typedLength >= FULL_TEXT.length;

  return (
    <ExperienceSection id="carta" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal className="mb-16 text-center sm:mb-20">
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-gold-400">
            capítulo tres
          </span>
          <h2 className="mt-4 font-display text-4xl italic text-cream sm:text-5xl">
            Una carta para vos
          </h2>
        </Reveal>

        <Reveal>
          {!open ? (
            <div className="glass flex flex-col items-center rounded-3xl px-8 py-16 text-center shadow-glass">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/30 text-gold-300">
                <Mail size={26} strokeWidth={1.5} />
              </div>
              <p className="font-display text-2xl italic text-cream sm:text-3xl">
                {letter.openingLine}
              </p>
              <button
                onClick={() => setOpen(true)}
                className="mt-10 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 px-9 py-4 text-sm font-medium uppercase tracking-widest text-cream shadow-glow-rose transition-transform duration-300 hover:scale-[1.03]"
              >
                Abrir carta
              </button>
            </div>
          ) : (
            <div
              className="glass-strong origin-top rounded-3xl px-7 py-10 shadow-glass animate-fade-up sm:px-12 sm:py-14"
              style={{ animationDuration: "900ms" }}
            >
              <p className="whitespace-pre-line font-display text-lg italic leading-relaxed text-cream/95 sm:text-xl">
                {typedText}
                {!isDone && <span className="animate-pulse text-gold-300">|</span>}
              </p>

              <div
                className={`mt-10 text-right transition-opacity duration-700 ${
                  isDone ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-sm text-mist">{letter.closing}</p>
                <p className="mt-1 font-script text-3xl text-gold-300">{relationship.myName}</p>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </ExperienceSection>
  );
}
