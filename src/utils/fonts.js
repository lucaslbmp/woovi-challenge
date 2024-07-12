import { Nunito } from "next/font/google";

export const nunito_init = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: "600",
});

export const nunito_bold_init = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-bold",
  weight: "800",
});

export const nunito = nunito_init.variable;
export const nunitoBold = nunito_bold_init.variable;
