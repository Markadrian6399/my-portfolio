/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0D",
        foreground: "#ECECEE",
        muted: "#18181B",
        mutedForeground: "#8A8A92",
        accent: "#00DE51",
        accentForeground: "#000000",
        border: "#232327",
        input: "#141417",
        card: "#121215",
        cardForeground: "#ECECEE",
        ring: "#00DE51",
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        heading: ['"Space Grotesk"', '"Inter"', "system-ui", "sans-serif"],
        serif: ['"EB Garamond"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.4" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        xl: ["1.25rem", { lineHeight: "1.4" }],
        "2xl": ["1.5rem", { lineHeight: "1.3" }],
        "3xl": ["2rem", { lineHeight: "1.2" }],
        "4xl": ["2.5rem", { lineHeight: "1.15" }],
        "5xl": ["3.5rem", { lineHeight: "1.1" }],
        "6xl": ["4.5rem", { lineHeight: "1.1" }],
        "7xl": ["6rem", { lineHeight: "1" }],
      },
      transitionTimingFunction: {
        fast: "cubic-bezier(0.25, 0, 0, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "spin-slow": "spin 18s linear infinite",
      },
    },
  },
  plugins: [],
};
