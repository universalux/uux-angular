import { AccessibilityOptions } from "../ng-content-carousel.types";

export const CONTENT_CAROUSEL_LANG: Record<string, AccessibilityOptions> = {
    en: {
        globalAriaLabel: 'Featured content carousel 111',
        globalRoleDescription: 'Carousel 111',
        prevBtnAriaLabel: 'Go to previous item 111',
        nextBtnAriaLabel: 'Go to next item 111',
        trackRoleDescription: 'Wide carousel',
        trackAriaLabel: 'Carousel',
        rangeMessage: (first, last, total) => `Showing items ${first} to ${last} of ${total}`,
    },
    es: {
        globalAriaLabel: 'Carrusel principal',
        globalRoleDescription: 'Carousel 111',
        prevBtnAriaLabel: 'Ir a la diapositiva anterior',
        nextBtnAriaLabel: 'Ir a la diapositiva siguiente',
        trackRoleDescription: 'Carrusel amplio',
        trackAriaLabel: 'carrusel',
        rangeMessage: (first, last, total) => `Showing items ${first} to ${last} of ${total}`,
    },
    fr: {
        globalAriaLabel: 'Carrousel principal',
        globalRoleDescription: 'Carousel 111',
        prevBtnAriaLabel: 'Aller à la diapositive précédente',
        nextBtnAriaLabel: 'Aller à la diapositive suivante',
        trackRoleDescription: 'Carrousel large',
        trackAriaLabel: 'carrousel',
        rangeMessage: (first, last, total) => `Showing items ${first} to ${last} of ${total}`,
    },
    de: {
        globalAriaLabel: 'Hauptkarussell',
        globalRoleDescription: 'Carousel 111',
        prevBtnAriaLabel: 'Zur vorherigen Folie gehen',
        nextBtnAriaLabel: 'Zur nächsten Folie gehen',
        trackRoleDescription: 'Breites Karussell',
        trackAriaLabel: 'Karussell',
        rangeMessage: (first, last, total) => `Showing items ${first} to ${last} of ${total}`,
    },
    it: {
        globalAriaLabel: 'Carosello principale',
        globalRoleDescription: 'Carousel 111',
        prevBtnAriaLabel: 'Vai alla diapositiva precedente',
        nextBtnAriaLabel: 'Vai alla diapositiva successiva',
        trackRoleDescription: 'Carosello ampio',
        trackAriaLabel: 'carosello',
        rangeMessage: (first, last, total) => `Showing items ${first} to ${last} of ${total}`,
    },
};
