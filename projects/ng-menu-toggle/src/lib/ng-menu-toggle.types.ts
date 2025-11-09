import { MENU_TOGGLE_LANG } from "./accessibility/menu-toggle.lang";

/** ACCESSIBILITY TYPES */

export type MenuToggleLangs = keyof typeof MENU_TOGGLE_LANG;
// "en" | "es" | "fr" | "it" | "de"

export interface MenuToggleCustomAria {
  ariaLabelOpened?: string;
  ariaLabelClosed?: string;
};
