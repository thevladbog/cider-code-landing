import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          primary: {
            50: "#fef9e6",
            100: "#fcefc1",
            200: "#f9e39b",
            300: "#f6d775",
            400: "#f4cb4e",
            500: "#fca311", // Основной цвет бренда
            600: "#e3920f",
            700: "#ca820e",
            800: "#b1710c",
            900: "#98610a",
            DEFAULT: "#fca311",
            foreground: "#FFFFFF",
          },
          secondary: {
            50: "#f8fafc",
            100: "#f1f5f9", 
            200: "#e2e8f0",
            300: "#cbd5e1",
            400: "#94a3b8",
            500: "#edf2f4", // Темная тема цвет
            600: "#475569",
            700: "#334155",
            800: "#1e293b",
            900: "#0f172a",
            DEFAULT: "#edf2f4",
            foreground: "#000000",
          }
        }
      },
      dark: {
        colors: {
          primary: {
            50: "#fef9e6",
            100: "#fcefc1",
            200: "#f9e39b",
            300: "#f6d775",
            400: "#f4cb4e",
            500: "#fca311",
            600: "#e3920f",
            700: "#ca820e",
            800: "#b1710c",
            900: "#98610a",
            DEFAULT: "#fca311",
            foreground: "#000000",
          },
          secondary: {
            50: "#f8fafc",
            100: "#f1f5f9",
            200: "#e2e8f0", 
            300: "#cbd5e1",
            400: "#94a3b8",
            500: "#edf2f4",
            600: "#475569",
            700: "#334155",
            800: "#1e293b",
            900: "#0f172a",
            DEFAULT: "#edf2f4",
            foreground: "#000000",
          }
        }
      }
    }
  })],
}

export default config;