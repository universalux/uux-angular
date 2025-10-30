import { AccessibilityOptions } from "../ng-content-carousel.types";

export const CONTENT_CAROUSEL_LANG: Record<string, AccessibilityOptions> = {
    en: {
      globalAriaLabel: 'Content carousel',
      globalRoleDescription: 'Carousel of content',
      prevBtnAriaLabel: 'Go to previous item',
      nextBtnAriaLabel: 'Go to next item',
      trackRoleDescription: 'Carousel track',
      trackAriaLabel: 'Carousel items',
      rangeMessage: (first, last, total) => `Showing items ${first} to ${last} of ${total}`,
    },
    es: {
      globalAriaLabel: 'Carrusel de contenido',
      globalRoleDescription: 'Carrusel de contenido',
      prevBtnAriaLabel: 'Ir al elemento anterior',
      nextBtnAriaLabel: 'Ir al siguiente elemento',
      trackRoleDescription: 'Pista del carrusel',
      trackAriaLabel: 'Elementos del carrusel',
      rangeMessage: (first, last, total) => `Mostrando elementos ${first} a ${last} de ${total}`,
    },
    fr: {
      globalAriaLabel: 'Carrousel de contenu',
      globalRoleDescription: 'Carrousel de contenu',
      prevBtnAriaLabel: 'Aller à l’élément précédent',
      nextBtnAriaLabel: 'Aller à l’élément suivant',
      trackRoleDescription: 'Piste du carrousel',
      trackAriaLabel: 'Éléments du carrousel',
      rangeMessage: (first, last, total) => `Affichage des éléments ${first} à ${last} sur ${total}`,
    },
    de: {
      globalAriaLabel: 'Inhaltskarussell',
      globalRoleDescription: 'Karussell mit Inhalten',
      prevBtnAriaLabel: 'Zum vorherigen Element gehen',
      nextBtnAriaLabel: 'Zum nächsten Element gehen',
      trackRoleDescription: 'Karussellspur',
      trackAriaLabel: 'Karussellelemente',
      rangeMessage: (first, last, total) => `Elemente ${first} bis ${last} von ${total} werden angezeigt`,
    },
    it: {
      globalAriaLabel: 'Carosello di contenuti',
      globalRoleDescription: 'Carosello di contenuti',
      prevBtnAriaLabel: 'Vai all’elemento precedente',
      nextBtnAriaLabel: 'Vai all’elemento successivo',
      trackRoleDescription: 'Traccia del carosello',
      trackAriaLabel: 'Elementi del carosello',
      rangeMessage: (first, last, total) => `Visualizzazione elementi da ${first} a ${last} di ${total}`,
    }
};
