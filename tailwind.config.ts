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
        fb: {
          blue: "#0866FF",
          "blue-hover": "#0055d4",
          "blue-light": "#E7F3FF",
          text: "#1C1E21",
          muted: "#65676B",
          subtle: "#8A8D91",
          border: "#CCD0D5",
          "border-focus": "#0866FF",
          bg: "#FFFFFF",
          "card-bg": "#FFFFFF",
        },
        ig: {
          bg: "#000000",
          surface: "#12151a",
          card: "#12151a",
          input: "#12171e",
          "input-border": "#283445",
          "input-focus": "#38475c",
          primary: "#0064e0",
          "primary-hover": "#1877f2",
          "secondary-btn": "#1b232f",
          "secondary-btn-hover": "#253040",
          "outline-border": "#2c394c",
          muted: "#7c899c",
          subtle: "#505c6e",
          text: "#F5F5F5",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
