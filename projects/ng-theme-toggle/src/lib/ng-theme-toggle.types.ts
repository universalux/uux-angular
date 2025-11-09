import { THEME_TOGGLE_LANG } from "./accessibility/theme-toggle.lang";

/** ACCESSIBILITY TYPES */

export type ThemeToggleLangs = keyof typeof THEME_TOGGLE_LANG;
// "en" | "es" | "fr" | "it" | "de"

export interface ThemeToggleCustomAria {
  ariaLabelDark?: string;
  ariaLabelLight?: string;
};
