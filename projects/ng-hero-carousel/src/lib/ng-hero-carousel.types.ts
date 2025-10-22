export interface CarouselItem {
  image_url?: string;
  backgroundColor?: string;
  title?: string;
  subtitle?: string;
};

export interface AccessibilityOptions {
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
