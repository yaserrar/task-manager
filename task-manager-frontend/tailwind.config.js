/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0ea5e9",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        radius: {
          small: "8px",
          medium: "12px",
          large: "16px",
        },
      },
      themes: {
        light: {
          colors: {
            secondary: {
              DEFAULT: "#000000",
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#22c55e",
              foreground: "#FFFFFF",
            },
            danger: {
              DEFAULT: "#ef4444",
              foreground: "#FFFFFF",
            },
            warning: {
              DEFAULT: "#eab308",
              foreground: "#FFFFFF",
            },
          },
        },
        dark: {},
      },
    }),
  ],
};
