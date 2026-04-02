import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#00050A",
        cyan: {
          300: "#67F3FF",
          400: "#00E5FF",
          600: "#00A8BD",
        },
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      animation: {
        "text-shimmer": "textShimmer 4s linear infinite",
      },
      keyframes: {
        textShimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
