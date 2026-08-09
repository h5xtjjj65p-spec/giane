"use client";

import { useEffect, useState } from "react";

type Particle = {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
};

/**
 * Puntitos de luz flotando muy despacio, de fondo. Se generan en el
 * cliente (no en el server) para evitar cualquier mismatch de hidratación,
 * y respetan prefers-reduced-motion vía CSS global.
 */
export default function Fireflies({ count = 16, className = "" }: { count?: number; className?: string }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 7,
        duration: 5 + Math.random() * 5,
      }))
    );
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold-300 animate-drift"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: "0 0 8px 2px rgba(201, 166, 107, 0.5)",
          }}
        />
      ))}
    </div>
  );
}
