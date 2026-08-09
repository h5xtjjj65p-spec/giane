"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Headphones, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useExperience } from "@/lib/experience-context";
import { sectionMusic, DEFAULT_TRACK } from "@/data/sectionMusic";

const TARGET_VOLUME = 0.55;
const FADE_MS = 900;
const MUTE_KEY = "para-ella-music-muted";

/** Sube o baja el volumen de un <audio> de forma suave a lo largo de `duration` ms. */
function fade(audio: HTMLAudioElement, from: number, to: number, duration: number, onDone?: () => void) {
  const start = performance.now();
  audio.volume = from;

  function step(now: number) {
    const t = Math.min(1, (now - start) / duration);
    audio.volume = from + (to - from) * t;
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      onDone?.();
    }
  }
  requestAnimationFrame(step);
}

export default function SectionMusicManager() {
  const { activeId, hasInteracted, registerInteraction, sections } = useExperience();
  const audioARef = useRef<HTMLAudioElement>(null);
  const audioBRef = useRef<HTMLAudioElement>(null);
  const activePlayerRef = useRef<"A" | "B">("A");
  const currentSrcRef = useRef<string | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(DEFAULT_TRACK.title);

  // Restaura preferencia de silencio guardada.
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(MUTE_KEY) : null;
    if (saved === "1") setMuted(true);
  }, []);

  const getActive = () => (activePlayerRef.current === "A" ? audioARef.current : audioBRef.current);
  const getInactive = () => (activePlayerRef.current === "A" ? audioBRef.current : audioARef.current);

  const playTrack = (src: string, title: string) => {
    const active = getActive();
    const inactive = getInactive();
    if (!active || !inactive) return;

    if (currentSrcRef.current === src) {
      // Misma pista: si por alguna razón está pausada, la retomamos sin reiniciarla.
      if (active.paused && hasInteracted && !muted) {
        active.play().catch(() => {});
      }
      return;
    }

    currentSrcRef.current = src;
    setCurrentTitle(title);

    if (!currentSrcRef.current || active.currentTime === 0) {
      // primera reproducción: no hay nada que crossfadear
      active.src = src;
      active.volume = 0;
      active.play().then(() => fade(active, 0, TARGET_VOLUME, FADE_MS)).catch(() => {});
      return;
    }

    inactive.src = src;
    inactive.volume = 0;
    inactive.play().catch(() => {});
    fade(inactive, 0, TARGET_VOLUME, FADE_MS);
    fade(active, active.volume, 0, FADE_MS, () => active.pause());
    activePlayerRef.current = activePlayerRef.current === "A" ? "B" : "A";
  };

  // Cuando cambia la sección activa, cambia (o no) la pista.
  useEffect(() => {
    if (!hasInteracted || muted) return;
    const track = sectionMusic[activeId] ?? DEFAULT_TRACK;
    playTrack(track.src, track.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, hasInteracted, muted]);

  // Primera interacción del usuario: desbloquea audio en iOS/Safari.
  useEffect(() => {
    if (!hasInteracted) return;
    const active = getActive();
    if (active && !currentSrcRef.current) {
      const track = sectionMusic[activeId] ?? DEFAULT_TRACK;
      playTrack(track.src, track.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasInteracted]);

  useEffect(() => {
    const a = audioARef.current;
    const b = audioBRef.current;
    if (!a || !b) return;
    const tick = () => {
      const active = getActive();
      if (active?.duration) setProgress((active.currentTime / active.duration) * 100);
      setPlaying(Boolean(active && !active.paused));
    };
    a.addEventListener("timeupdate", tick);
    b.addEventListener("timeupdate", tick);
    a.addEventListener("play", tick);
    b.addEventListener("play", tick);
    a.addEventListener("pause", tick);
    b.addEventListener("pause", tick);
    return () => {
      a.removeEventListener("timeupdate", tick);
      b.removeEventListener("timeupdate", tick);
      a.removeEventListener("play", tick);
      b.removeEventListener("play", tick);
      a.removeEventListener("pause", tick);
      b.removeEventListener("pause", tick);
    };
  }, []);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (typeof window !== "undefined") window.localStorage.setItem(MUTE_KEY, next ? "1" : "0");
    const active = getActive();
    if (!active) return;
    if (next) {
      fade(active, active.volume, 0, 400, () => active.pause());
    } else {
      registerInteraction();
      if (!currentSrcRef.current) {
        const track = sectionMusic[activeId] ?? DEFAULT_TRACK;
        playTrack(track.src, track.title);
      } else {
        active.play().catch(() => {});
        fade(active, active.volume, TARGET_VOLUME, 500);
      }
    }
  };

  const togglePlay = () => {
    if (muted) {
      toggleMute();
      return;
    }
    const active = getActive();
    if (!active) return;
    registerInteraction();
    if (active.paused) {
      if (!currentSrcRef.current) {
        const track = sectionMusic[activeId] ?? DEFAULT_TRACK;
        playTrack(track.src, track.title);
      } else {
        active.play().catch(() => {});
      }
    } else {
      active.pause();
    }
  };

  const seek = (value: number) => {
    const active = getActive();
    if (!active || !active.duration) return;
    active.currentTime = (value / 100) * active.duration;
    setProgress(value);
  };

  const sectionLabel = sections.find((s) => s.id === activeId)?.label ?? "";

  return (
    <div className="soundtrack-player">
      <audio ref={audioARef} preload="metadata" loop />
      <audio ref={audioBRef} preload="metadata" loop />

      {open && (
        <div className="soundtrack-expanded" role="dialog" aria-label="Reproductor de música">
          <div className="soundtrack-cover">
            <div className={`soundtrack-disc ${playing ? "soundtrack-disc-spin" : ""}`}>
              <Headphones size={25} strokeWidth={1.5} />
            </div>
          </div>

          <div className="soundtrack-info">
            <span className="soundtrack-eyebrow">SONANDO EN · {sectionLabel.toUpperCase()}</span>
            <strong>{currentTitle}</strong>
            <div className="soundtrack-wave" aria-hidden="true">
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <i key={n} className={playing ? "wave-playing" : ""} />
              ))}
            </div>
          </div>

          <button className="soundtrack-close" onClick={() => setOpen(false)} aria-label="Contraer reproductor">
            <ChevronDown size={17} />
          </button>

          <input
            className="soundtrack-progress"
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Progreso de la música"
          />

          <div className="soundtrack-controls">
            <button className="soundtrack-volume" onClick={toggleMute} aria-label={muted ? "Activar sonido" : "Silenciar"}>
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <button className="soundtrack-play" onClick={togglePlay} aria-label={playing ? "Pausar música" : "Reproducir música"}>
              {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
            <span className="soundtrack-loop">POR SECCIÓN</span>
          </div>
        </div>
      )}

      {!open && (
        <button className="soundtrack-pill" onClick={() => { registerInteraction(); setOpen(true); }} aria-label="Abrir reproductor de banda sonora">
          <span className={`soundtrack-mini-icon ${playing ? "soundtrack-mini-playing" : ""}`}>
            <Headphones size={15} />
          </span>
          <span className="soundtrack-pill-copy">
            <b>Banda sonora</b>
            <small>{!hasInteracted ? "Tocá para acompañar la historia" : playing ? currentTitle : "En pausa"}</small>
          </span>
          <span className={`soundtrack-eq ${playing ? "eq-active" : ""}`}>
            <i /><i /><i /><i />
          </span>
        </button>
      )}

      {open && (
        <button className="soundtrack-mini-action" onClick={togglePlay} aria-label={playing ? "Pausar música" : "Reproducir música"}>
          {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
        </button>
      )}
    </div>
  );
}
