import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgContentCarousel, ContentCarouselItemDirective, ContentCarouselCustomAria, ContentCarouselLangs } from 'ng-content-carousel';
import { NgContentCard } from 'ng-content-card';

@Component({
  selector: 'pg-content-carousel',
  imports: [
    NgContentCarousel,
    NgContentCard,
    ContentCarouselItemDirective
  ],
  templateUrl: './pg-content-carousel.html',
  styleUrl: './pg-content-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgContentCarousel {
  cardList = [
    {
        image_url: 'https://image.tmdb.org/t/p/w342/fjgSlNGECNgVeMJaOdDAXmGh7ZM.jpg',
    },
    {
        image_url: 'https://image.tmdb.org/t/p/w342/iWLV12z9oexSRLz2WKyqCZbKoPA.jpg',
    },
    {
        image_url: 'https://image.tmdb.org/t/p/w342/dyW5mX4wwDoZWgTYObx6pg9V0i9.jpg',
        title: 'Mini Slider Mock 3',
    },
    {
        image_url: 'https://image.tmdb.org/t/p/w342/nYqEQ3ltw0hHc1kBaNWr7Rb8WNZ.jpg',
    },
    {
        image_url: 'https://image.tmdb.org/t/p/w342/aYPlrLJWjVkixwrJXA0f4V3D7Ab.jpg',
    },
    {
        image_url: 'https://image.tmdb.org/t/p/w342/8hrrdAShrWXCnZn8qRQS2h9L7vg.jpg',
    },
    {
        image_url: 'https://image.tmdb.org/t/p/w342/7dMoQsJ4Mxom4HwD2I0obFIxOAb.jpg',
    },
  ]

  lang = signal<ContentCarouselLangs>('es');

  customAccesibilityOptions : ContentCarouselCustomAria = {
    globalAriaLabel: 'EDIT Content carousel',
    globalRoleDescription: 'EDIT Carousel of content',
    prevBtnAriaLabel: 'EDIT Go to previous item',
    nextBtnAriaLabel: 'EDIT Go to next item',
    trackRoleDescription: 'EDIT Carousel track',
    trackAriaLabel: 'EDIT Carousel items',
    rangeMessage: (first, last, total) => `EDIT Showing items ${first} to ${last} of ${total}`,
  }
}
