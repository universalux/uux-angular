import { ScrollNavCustomAria } from '../ng-scroll-nav.types';

export const SCROLL_NAV_LANG: Record<string, ScrollNavCustomAria> = {
  en: {
    navAriaLabel: 'Navigation bar',
    prevBtnAriaLabel: 'Scroll left',
    nextBtnAriaLabel: 'Scroll right',
    linksGroupAriaLabel: 'Links group',
  },
  es: {
    navAriaLabel: 'Barra de navegación',
    prevBtnAriaLabel: 'Desplazar a la izquierda',
    nextBtnAriaLabel: 'Desplazar a la derecha',
    linksGroupAriaLabel: 'Grupo de enlaces',
  },
  fr: {
    navAriaLabel: 'Barre de navigation',
    prevBtnAriaLabel: 'Faire défiler vers la gauche',
    nextBtnAriaLabel: 'Faire défiler vers la droite',
    linksGroupAriaLabel: 'Groupe de liens',
  },
  de: {
    navAriaLabel: 'Navigationsleiste',
    prevBtnAriaLabel: 'Nach links scrollen',
    nextBtnAriaLabel: 'Nach rechts scrollen',
    linksGroupAriaLabel: 'Link-Gruppe',
  },
  it: {
    navAriaLabel: 'Barra di navigazione',
    prevBtnAriaLabel: 'Scorri a sinistra',
    nextBtnAriaLabel: 'Scorri a destra',
    linksGroupAriaLabel: 'Gruppo di link',
  },
};
