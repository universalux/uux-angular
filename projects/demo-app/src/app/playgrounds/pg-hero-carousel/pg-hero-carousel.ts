import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgHeroCarousel, CarouselItem, SlideForDirective, AccessibilityOptions} from 'ng-hero-carousel';
import { heroCarouselMock } from './mock/hero-carousel.mock';

@Component({
  selector: 'pg-hero-carousel',
  imports: [NgHeroCarousel, SlideForDirective],
  templateUrl: './pg-hero-carousel.html',
  styleUrl: './pg-hero-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgHeroCarousel {
  items = signal<CarouselItem[]>(heroCarouselMock);

  selectedItem = signal<number>(0);


  accOpts = signal<AccessibilityOptions>({
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
  });
}
