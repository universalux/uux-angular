export const MENU_BUTTON_LANG = {
  en: {
    ariaLabelOpened: 'Close menu',
    ariaLabelClosed: 'Open menu',
  },
  es: {
    ariaLabelOpened: 'Cerrar menú',
    ariaLabelClosed: 'Abrir menú',
  },
  fr: {
    ariaLabelOpened: 'Fermer le menu',
    ariaLabelClosed: 'Ouvrir le menu',
  },
  it: {
    ariaLabelOpened: 'Chiudi menu',
    ariaLabelClosed: 'Apri menu',
  },
  de: {
    ariaLabelOpened: 'Menü schließen',
    ariaLabelClosed: 'Menü öffnen',
  },
} as const;

export type MenuButtonLangs = keyof typeof MENU_BUTTON_LANG;
// "en" | "es" | "fr" | "it" | "de"

export type MenuButtonLangValues = typeof MENU_BUTTON_LANG[MenuButtonLangs];
// { ariaLabelOpened: string; ariaLabelClosed: string; }
