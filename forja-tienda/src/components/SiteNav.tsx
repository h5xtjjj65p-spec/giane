"use client";

import { Heart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  ["historia", "Historia"],
  ["recuerdos", "Recuerdos"],
  ["carta", "Carta"],
  ["contador", "Nosotros"],
  ["razones", "Razones"],
];

export default function SiteNav({ herName }: { herName: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "nav-solid" : "nav-clear"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" className="group flex items-center gap-2.5 text-cream" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-300/25 bg-ink/40 transition group-hover:border-gold-300/60">
            <Heart size={15} className="text-rose-300" fill="currentColor" />
          </span>
          <span className="hidden font-display text-xl italic sm:block">{herName}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="nav-link">
              {label}
            </a>
          ))}
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/10 bg-ink/40 text-cream md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      <div className={`mobile-menu md:hidden ${open ? "mobile-menu-open" : ""}`}>
        <nav className="mx-4 mb-4 rounded-2xl border border-cream/10 bg-[#100c17]/95 p-2 shadow-glass backdrop-blur-xl">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="mobile-link" onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
