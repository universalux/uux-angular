import { RATING_LANG } from "./accessibility/rating.lang";

export type RatingLangs = keyof typeof RATING_LANG;
// "en" | "es" | "fr" | "it" | "de"

export interface RatingCustomAria {
  containerReadOnlyAriaLabel?: string;
  containerInteractiveAriaLabel?: string;
  buttonInteractiveAriaLabel?: (value: number, total: number) => string;
};
