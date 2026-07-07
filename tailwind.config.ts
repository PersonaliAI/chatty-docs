import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Menlo", "Monaco", "monospace"],
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: theme("colors.neutral.700"),
            "h1,h2,h3,h4": { fontWeight: "700", scrollMarginTop: "5rem" },
            a: { color: theme("colors.brand.500"), textDecoration: "none", "&:hover": { textDecoration: "underline" } },
            code: { background: theme("colors.neutral.100"), borderRadius: "0.25rem", padding: "0.1em 0.3em", fontWeight: "400", "&::before": { content: '""' }, "&::after": { content: '""' } },
            pre: { background: "transparent", padding: "0", margin: "0" },
          },
        },
        invert: {
          css: {
            color: theme("colors.neutral.300"),
            code: { background: theme("colors.neutral.800") },
            "h1,h2,h3,h4": { color: theme("colors.neutral.100") },
            strong: { color: theme("colors.neutral.100") },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
