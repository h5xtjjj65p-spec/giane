import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0810",
          soft: "#14101c",
          card: "#1a1424",
        },
        rose: {
          50: "#fbeef0",
          200: "#e9b9c2",
          300: "#d99aa6",
          400: "#c47a8a",
          500: "#a85770",
          600: "#8a4560",
          700: "#6b3550",
        },
        gold: {
          200: "#e9dcb8",
          300: "#dcc691",
          400: "#c9a66b",
          500: "#b08d4f",
        },
        cream: "#f4ede4",
        mist: "#a79aa8",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        script: ["var(--font-script)"],
        sans: ["var(--font-body)"],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(201, 166, 107, 0.35)",
        "glow-rose": "0 0 70px -15px rgba(168, 87, 112, 0.45)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0) translateX(0)", opacity: "0.15" },
          "50%": { transform: "translateY(-18px) translateX(8px)", opacity: "0.55" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.22)" },
          "28%": { transform: "scale(0.96)" },
          "42%": { transform: "scale(1.14)" },
          "70%": { transform: "scale(1)" },
        },
        floatBlob: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(var(--float-rot, 0deg))" },
          "50%": { transform: "translate3d(var(--float-x, 12px), var(--float-y, -22px), 0) rotate(var(--float-rot-alt, 3deg))" },
        },
      },
      animation: {
        drift: "drift 7s ease-in-out infinite",
        "fade-in": "fade-in 1.2s ease forwards",
        "fade-up": "fade-up 1s cubic-bezier(0.22,1,0.36,1) forwards",
        shimmer: "shimmer 6s linear infinite",
        heartbeat: "heartbeat 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
