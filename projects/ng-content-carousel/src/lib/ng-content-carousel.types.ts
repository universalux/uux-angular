import { CONTENT_CAROUSEL_LANG } from "./accessibility/content-carousel.lang";

export type ContentCarouselLangs = keyof typeof CONTENT_CAROUSEL_LANG;
// "en" | "es" | "fr" | "it" | "de"

export interface ContentCarouselCustomAria {
  globalAriaLabel?: string;
  globalRoleDescription?: string;
  prevBtnAriaLabel?: string;
  nextBtnAriaLabel?: string;
  trackRoleDescription?: string;
  trackAriaLabel?: string;
  rangeMessage?: (first: number, last: number, total: number) => string;
};
