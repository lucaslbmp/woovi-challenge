import { nunitoBold } from "@/utils/fonts";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {},
      fontFamily: {
        nunito: ["var(--font-nunito)"],
        nunitoBold: ["var(--font-nunito-bold)"],
      },
      colors: {
        primary: "#133A6F",
        secondary: "#E5E5E5",
        background: "white",
        textPrimary: "#4D4D4D",
        textSecondary: "#AFAFAF",
        textTerciary: "white",
        highlight: "#03D69D",
        highlightSecondary: "#F4FBF9",
      },
    },
  },
  plugins: [],
};
export default config;
