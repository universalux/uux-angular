import { HERO_CAROUSEL_LANG } from "./accessibility/hero-carousel.lang";

export interface HeroCarouselItem {
  image_url?: string;
  backgroundColor?: string;
  title?: string;
  subtitle?: string;
};

export type HeroCarouselLangs = keyof typeof HERO_CAROUSEL_LANG;
// "en" | "es" | "fr" | "it" | "de"

export interface HeroCarouselCustomAria {
  hostAriaLabel?: string;
  autoplayPauseLabel?: string;
  autoplayPlayLabel?: string;
  prevBtnAriaLabel?: string;
  nextBtnAriaLabel?: string;
  slidesRegionAriaLabel?: string;
  slidesRegionRoleDescription?: string;
  slideAriaLabel?: (currentSlide: number, total: number) => string;
  slideRoleDescription?: string;
};
