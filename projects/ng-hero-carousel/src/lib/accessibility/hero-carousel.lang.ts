import { HeroCarouselCustomAria } from "../ng-hero-carousel.types";

export const HERO_CAROUSEL_LANG: Record<string, HeroCarouselCustomAria> = {
    en: {
        autoplayPauseLabel: 'Pause carousel autoplay',
        autoplayPlayLabel: 'Resume carousel autoplay',
        hostAriaLabel: 'Main carousel',
        prevBtnAriaLabel: 'Go to previous slide',
        nextBtnAriaLabel: 'Go to next slide',
        slidesRegionAriaLabel: 'Wide carousel',
        slidesRegionRoleDescription: 'Carousel',
        slideAriaLabel: (currentSlide: number, total: number) =>
            `Slide ${currentSlide} of ${total}`,
        slideRoleDescription: 'slide',
    },
    es: {
        autoplayPauseLabel: 'Pausar la reproducción automática del carrusel',
        autoplayPlayLabel: 'Reanudar la reproducción automática del carrusel',
        hostAriaLabel: 'Carrusel principal',
        prevBtnAriaLabel: 'Ir a la diapositiva anterior',
        nextBtnAriaLabel: 'Ir a la diapositiva siguiente',
        slidesRegionAriaLabel: 'Carrusel amplio',
        slidesRegionRoleDescription: 'carrusel',
        slideAriaLabel: (currentSlide: number, total: number) =>
            `Diapositiva ${currentSlide} de ${total}`,
        slideRoleDescription: 'diapositiva',
    },
    fr: {
        autoplayPauseLabel: 'Mettre en pause la lecture automatique du carrousel',
        autoplayPlayLabel: 'Reprendre la lecture automatique du carrousel',
        hostAriaLabel: 'Carrousel principal',
        prevBtnAriaLabel: 'Aller à la diapositive précédente',
        nextBtnAriaLabel: 'Aller à la diapositive suivante',
        slidesRegionAriaLabel: 'Carrousel large',
        slidesRegionRoleDescription: 'carrousel',
        slideAriaLabel: (currentSlide: number, total: number) =>
            `Diapositive ${currentSlide} sur ${total}`,
        slideRoleDescription: 'diapositive',
    },
    de: {
        autoplayPauseLabel: 'Automatische Wiedergabe des Karussells pausieren',
        autoplayPlayLabel: 'Automatische Wiedergabe des Karussells fortsetzen',
        hostAriaLabel: 'Hauptkarussell',
        prevBtnAriaLabel: 'Zur vorherigen Folie gehen',
        nextBtnAriaLabel: 'Zur nächsten Folie gehen',
        slidesRegionAriaLabel: 'Breites Karussell',
        slidesRegionRoleDescription: 'Karussell',
        slideAriaLabel: (currentSlide: number, total: number) =>
            `Folie ${currentSlide} von ${total}`,
        slideRoleDescription: 'Folie',
    },
    it: {
        autoplayPauseLabel: 'Metti in pausa la riproduzione automatica del carosello',
        autoplayPlayLabel: 'Riprendi la riproduzione automatica del carosello',
        hostAriaLabel: 'Carosello principale',
        prevBtnAriaLabel: 'Vai alla diapositiva precedente',
        nextBtnAriaLabel: 'Vai alla diapositiva successiva',
        slidesRegionAriaLabel: 'Carosello ampio',
        slidesRegionRoleDescription: 'carosello',
        slideAriaLabel: (currentSlide: number, total: number) =>
            `Diapositiva ${currentSlide} di ${total}`,
        slideRoleDescription: 'diapositiva',
    },
};
