import { SCROLL_NAV_LANG } from "./accessibility/scroll-nav.lang";

export type ScrollNavLangs = keyof typeof SCROLL_NAV_LANG;
// "en" | "es" | "fr" | "it" | "de"

export interface ScrollNavCustomAria {
  navAriaLabel?: string;
  prevBtnAriaLabel?: string;
  nextBtnAriaLabel?: string;
  linksGroupAriaLabel?: string;
};
