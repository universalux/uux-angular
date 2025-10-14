import { MENU_BUTTON_LANG } from "./i18n/menu-button.lang";

/** ACCESSIBILITY TYPES */

export type MenuButtonLangs = keyof typeof MENU_BUTTON_LANG;
// "en" | "es" | "fr" | "it" | "de"

export interface MenuButtonCustomAria {
  ariaLabelOpened: string;
  ariaLabelClosed: string;
}
