export const RATING_LANG = {
  en: {
    containerReadOnlyAriaLabel: 'Average rating',
    containerInteractiveAriaLabel: 'Rating selector',
    buttonInteractiveAriaLabel: (value: number, total: number) =>
      `Select ${value} of ${total}`,
  },
  es: {
    containerReadOnlyAriaLabel: 'Valoración media',
    containerInteractiveAriaLabel: 'Selector de valoración',
    buttonInteractiveAriaLabel: (value: number, total: number) =>
      `Seleccionar ${value} de ${total}`,
  },
  fr: {
    containerReadOnlyAriaLabel: 'Note moyenne',
    containerInteractiveAriaLabel: 'Sélecteur de note',
    buttonInteractiveAriaLabel: (value: number, total: number) =>
      `Sélectionner ${value} sur ${total}`,
  },
  de: {
    containerReadOnlyAriaLabel: 'Durchschnittliche Bewertung',
    containerInteractiveAriaLabel: 'Bewertungsauswahl',
    buttonInteractiveAriaLabel: (value: number, total: number) =>
      `${value} von ${total} auswählen`,
  },
  it: {
    containerReadOnlyAriaLabel: 'Valutazione media',
    containerInteractiveAriaLabel: 'Selettore di valutazione',
    buttonInteractiveAriaLabel: (value: number, total: number) =>
      `Seleziona ${value} su ${total}`,
  },
} as const;
