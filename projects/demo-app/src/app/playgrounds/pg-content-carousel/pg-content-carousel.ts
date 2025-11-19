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
      header: 'CARD 1',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'CARD 2',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'CARD 3',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    // {
    //   header: 'CARD 4',
    //   image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
    //   body: 'This is the content for the body of the card',
    //   footer: 'Card footer content'
    // },
    // {
    //   header: 'CARD 5',
    //   image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
    //   body: 'This is the content for the body of the card',
    //   footer: 'Card footer content'
    // },
    // {
    //   header: 'CARD 6',
    //   image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
    //   body: 'This is the content for the body of the card',
    //   footer: 'Card footer content'
    // },
    // {
    //   header: 'CARD 7',
    //   image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
    //   body: 'This is the content for the body of the card',
    //   footer: 'Card footer content'
    // },
    // {
    //   header: 'CARD 8',
    //   image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
    //   body: 'This is the content for the body of the card',
    //   footer: 'Card footer content'
    // },
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
