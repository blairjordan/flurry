import { heroui } from "@heroui/react"
import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ftsystem", "sans-serif"],
      },
      borderRadius: {
        default: "0.5rem",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#333",
            maxWidth: "65ch",
            h1: {
              color: "#333",
            },
            h2: {
              color: "#333",
            },
            h3: {
              color: "#333",
            },
            strong: {
              color: "#333",
            },
            a: {
              color: "#4e0d52",
              "&:hover": {
                color: "#ff2572",
              },
            },
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    typography,
    heroui({
      addBase: true,
      addComponents: true,
      addUtilities: true,
    }),
  ],
}
