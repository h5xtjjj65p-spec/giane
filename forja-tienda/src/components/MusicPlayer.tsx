"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Headphones, Pause, Play, Volume2 } from "lucide-react";

const TRACK_SRC = "/music/our-song.mp3";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tick = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("timeupdate", tick);
    return () => audio.removeEventListener("timeupdate", tick);
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };

  return (
    <div className={`soundtrack-player ${open ? "soundtrack-player-open" : ""}`}>
      <audio
        ref={audioRef}
        src={TRACK_SRC}
        loop
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      {open && (
        <div className="soundtrack-expanded" role="dialog" aria-label="Reproductor de música">
          <div className="soundtrack-cover">
            <div className={`soundtrack-disc ${playing ? "soundtrack-disc-spin" : ""}`}>
              <Headphones size={25} strokeWidth={1.5} />
            </div>
          </div>

          <div className="soundtrack-info">
            <span className="soundtrack-eyebrow">BANDA SONORA</span>
            <strong>Para acompañar tu historia</strong>
            <div className="soundtrack-wave" aria-hidden="true">
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <i key={n} className={playing ? "wave-playing" : ""} />
              ))}
            </div>
          </div>

          <button
            className="soundtrack-close"
            onClick={() => setOpen(false)}
            aria-label="Contraer reproductor"
          >
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
            <span className="soundtrack-volume"><Volume2 size={14} /></span>
            <button
              className="soundtrack-play"
              onClick={toggle}
              aria-label={playing ? "Pausar música" : "Reproducir música"}
            >
              {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
            <span className="soundtrack-loop">∞ LOOP</span>
          </div>
        </div>
      )}

      {!open && (
        <button
          className="soundtrack-pill"
          onClick={() => setOpen(true)}
          aria-label="Abrir reproductor de banda sonora"
        >
          <span className={`soundtrack-mini-icon ${playing ? "soundtrack-mini-playing" : ""}`}>
            <Headphones size={15} />
          </span>
          <span className="soundtrack-pill-copy">
            <b>Banda sonora</b>
            <small>{playing ? "Sonando..." : "Tocá para acompañar la historia"}</small>
          </span>
          <span className={`soundtrack-eq ${playing ? "eq-active" : ""}`}>
            <i /><i /><i /><i />
          </span>
        </button>
      )}

      {open && (
        <button
          className="soundtrack-mini-action"
          onClick={toggle}
          aria-label={playing ? "Pausar música" : "Reproducir música"}
        >
          {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
        </button>
      )}
    </div>
  );
}
