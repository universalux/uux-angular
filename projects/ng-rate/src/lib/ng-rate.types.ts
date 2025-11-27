import { RATE_LANG } from "./accessibility/rate.lang";

export type RateLangs = keyof typeof RATE_LANG;
// "en" | "es" | "fr" | "it" | "de"

export interface RateCustomAria {
  containerReadOnlyAriaLabel: string;
  containerInteractiveAriaLabel: string;
  buttonInteractiveAriaLabel: (value: number, total: number) => string;
};
