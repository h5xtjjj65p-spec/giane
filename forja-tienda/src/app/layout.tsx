import type { Metadata } from "next";
import { Cormorant_Garamond, Petit_Formal_Script, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const script = Petit_Formal_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Para vos ♥",
  description: "Un rincón hecho especialmente para vos, lleno de recuerdos, palabras y momentos.",
  openGraph: { title: "Para vos ♥", description: "Un lugar hecho especialmente para vos." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${script.variable} ${body.variable}`}>
      <body className="bg-ink text-cream min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
