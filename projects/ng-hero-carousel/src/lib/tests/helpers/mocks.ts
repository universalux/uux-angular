import { HeroCarouselCustomAria, HeroCarouselItem } from "../../ng-hero-carousel.types"

export const carouselItemsMock: HeroCarouselItem[] = [
    {
        image_url: 'https://image.tmdb.org/t/p/w1280/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg',
        backgroundColor: 'red',
        title: 'Slide 1',
        subtitle: 'Subtitle 1',
    },
    {
        image_url: 'https://image.tmdb.org/t/p/w1280/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg',
        backgroundColor: 'green',
        title: 'Slide 2',
        subtitle: 'Subtitle 2',
    }
];

export const accessibilityOptionsMock: HeroCarouselCustomAria = {
    autoplayPauseLabel: 'Pause carousel autoplay CHANGED',
    autoplayPlayLabel: 'Resume carousel autoplay CHANGED',
    hostAriaLabel: 'Main carousel CHANGED',
    prevBtnAriaLabel: 'Go to previous slide CHANGED',
    nextBtnAriaLabel: 'Go to next slide CHANGED',
    slidesRegionAriaLabel: 'Wide carousel CHANGED',
    slidesRegionRoleDescription: 'Carousel CHANGED',
    slideAriaLabel: (currentSlide: number, total: number) =>
        `CHANGED - Slide ${currentSlide} of ${total}`,
    slideRoleDescription: 'slide',
};
