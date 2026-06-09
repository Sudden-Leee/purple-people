import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pale: "#F0ECF2",
        muted: "#D6C1E3",
        dark: "#6A5974",
        soft: "#F2DBFF",
        natural: "#B76DE2",
        deep: "#502668",
        bright: "#E0ACFF",
        vivid: "#9800FF",
        strong: "#3F0070",
        cream: "#FFF6E3",
        ink: "#211329",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(80, 38, 104, 0.14)",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
